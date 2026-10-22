<template>
  <section class="panel">
    <p class="eyebrow">03 / Route Guard</p>
    <h2>PageSix · 守卫已放行</h2>
    <p class="description">
      PageSeven 的全局守卫只允许从本页或它的子页面进入。你现在位于合法入口。
    </p>
    <p class="feedback" role="status">当前导航条件满足，可以继续。</p>
    <code class="code">from.path === '/pageSix' → 允许进入 /pageSeven</code>
    <div class="actions">
      <router-link class="button primary" to="/pageSeven"
        >进入父页面</router-link
      ><router-link class="button quiet" to="/pageFive"
        >返回守卫实验</router-link
      >
    </div>
  </section>
</template>

<script>
export default { name: "PageSix" };
</script>
