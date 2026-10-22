<template>
  <section class="panel">
    <h3>子页面已渲染 · 图片 {{ imageNumber }}</h3>
    <p class="muted">父页面保持显示，子页面读取 srcPath 并响应 Query 变化。</p>
    <img
      class="route-image"
      :alt="`路由示例图片 ${imageNumber}`"
      :src="require('../assets/' + imageNumber + '.png')"
    />
  </section>
</template>

<script>
export default {
  name: "PageSevenChildren",
  beforeRouteEnter(to, from, next) {
    if (from.name !== "pageSeven" && from.name !== "pageSevenChildren") {
      next({
        path: "/",
        query: {
          notice: "子页面守卫：请先从 PageSix 进入 PageSeven，再打开子页面。",
        },
      });
    } else next();
  },
  computed: {
    imageNumber() {
      const n = Number(this.$route.query.srcPath);
      return Number.isInteger(n) && n >= 1 && n <= 10 ? n : 1;
    },
  },
};
</script>
