import { nextTick } from 'vue';

// Vue Router supplies savedPosition for browser history traversal. Keep it
// authoritative; focusing a heading must never overwrite that position.
export function createLessonScrollBehavior({ document: page = globalThis.document } = {}) {
  let navigationVersion = 0;
  return async function lessonScrollBehavior(to, from, savedPosition) {
    const version = ++navigationVersion;
    if (to.fullPath === from.fullPath) return false;
    if (!from.matched.length) return savedPosition || false;
    const sameLesson = to.matched[0] === from.matched[0];
    // Updating a parameter in the current example is not a new page.
    if (sameLesson && to.name === from.name) return savedPosition || false;
    await nextTick();
    if (version !== navigationVersion || !page) return false;
    const content = page.querySelector('#lesson-content');
    if (!content) return savedPosition || false;
    const heading = content.querySelector('h2, h1') || content;
    const lostFocus = !page.activeElement || page.activeElement === page.body || !page.activeElement.isConnected;
    if (!sameLesson) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    } else if (lostFocus) {
      // Only a removed nested control needs replacement focus. A surviving
      // parent button/tab keeps its focus and the surrounding scroll context.
      const nested = [...content.querySelectorAll('.nested h2, .nested h3')].at(-1) || heading;
      nested.tabIndex = -1;
      nested.focus({ preventScroll: true });
    }
    if (savedPosition) return { ...savedPosition, behavior: 'auto' };
    if (sameLesson) return false;
    // Instant navigation also respects reduced-motion and works at narrow
    // viewport sizes; no animation delays access to the next lesson.
    return { el: heading, top: 16, behavior: 'auto' };
  };
}
