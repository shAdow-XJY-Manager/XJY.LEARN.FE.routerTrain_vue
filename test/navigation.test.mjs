import test from 'node:test';
import assert from 'node:assert/strict';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createLessonScrollBehavior } from '../src/route/navigation.mjs';

function fixture() {
  const rendered = { render() {} };
  const router = createRouter({ history: createMemoryHistory(), routes: [
    { path: '/first', name: 'first', component: rendered },
    { path: '/second/:message?', name: 'second', component: rendered },
    { path: '/parent', name: 'parent', component: rendered, children: [
      { path: 'one', name: 'child-one', component: rendered },
      { path: 'two', name: 'child-two', component: rendered },
    ] },
  ] });
  const focusCalls = [];
  const page = { body: {}, activeElement: null };
  function element(name) {
    return { name, isConnected: true, tabIndex: 0,
      focus(options) { page.activeElement = this; focusCalls.push({ name, options }); } };
  }
  const heading = element('lesson heading'), nested = element('nested heading');
  const content = { querySelector: () => heading, querySelectorAll: () => [nested] };
  page.querySelector = selector => selector === '#lesson-content' ? content : null;
  page.activeElement = page.body;
  return { router, page, heading, nested, focusCalls, element, behavior: createLessonScrollBehavior({ document: page }) };
}

async function navigate(context, path) {
  const from = context.router.currentRoute.value;
  await context.router.push(path);
  return { to: context.router.currentRoute.value, from };
}

test('forward navigation focuses the new content heading without implicit scrolling', async () => {
  const context = fixture();
  await navigate(context, '/first');
  const { to, from } = await navigate(context, '/second');
  const position = await context.behavior(to, from, null);
  assert.equal(context.page.activeElement, context.heading);
  assert.equal(context.heading.tabIndex, -1);
  assert.deepEqual(context.focusCalls, [{ name: 'lesson heading', options: { preventScroll: true } }]);
  assert.deepEqual(position, { el: context.heading, top: 16, behavior: 'auto' });
});

test('history traversal restores the supplied scroll position after focus moves', async () => {
  const context = fixture();
  await navigate(context, '/first');
  const first = context.router.currentRoute.value;
  await navigate(context, '/second');
  const second = context.router.currentRoute.value;
  const saved = { left: 0, top: 436 };
  const position = await context.behavior(first, second, saved);
  assert.deepEqual(position, { ...saved, behavior: 'auto' });
  assert.equal(context.page.activeElement, context.heading);
  assert.deepEqual(saved, { left: 0, top: 436 });
});

test('nested navigation preserves parent focus/scroll; removed child focus has a local fallback', async () => {
  const context = fixture();
  await navigate(context, '/parent');
  context.page.activeElement = context.element('parent button');
  const parentButton = context.page.activeElement;
  let transition = await navigate(context, '/parent/one');
  assert.equal(await context.behavior(transition.to, transition.from, null), false);
  assert.equal(context.page.activeElement, parentButton);
  transition = await navigate(context, '/parent/two');
  context.page.activeElement = context.page.body; // The old child button was removed.
  assert.equal(await context.behavior(transition.to, transition.from, null), false);
  assert.equal(context.page.activeElement, context.nested);
  assert.deepEqual(context.focusCalls.at(-1).options, { preventScroll: true });
});

test('same route and parameter changes preserve the current editor context', async () => {
  const context = fixture();
  await navigate(context, '/second/one');
  context.page.activeElement = context.element('editor');
  const editor = context.page.activeElement, original = context.router.currentRoute.value;
  assert.equal(await context.behavior(original, original, null), false);
  const { to, from } = await navigate(context, '/second/two?mode=query');
  assert.equal(await context.behavior(to, from, null), false);
  assert.equal(context.page.activeElement, editor);
  assert.equal(context.focusCalls.length, 0);
});

test('rapid navigation cancels stale focus and reduced-motion never depends on smooth scrolling', async () => {
  const context = fixture();
  const first = context.router.resolve('/first'), second = context.router.resolve('/second');
  const stale = context.behavior(second, first, null);
  const latest = context.behavior(first, second, { left: 0, top: 12 });
  assert.equal(await stale, false);
  assert.deepEqual(await latest, { left: 0, top: 12, behavior: 'auto' });
  assert.equal(context.focusCalls.length, 1);
});
