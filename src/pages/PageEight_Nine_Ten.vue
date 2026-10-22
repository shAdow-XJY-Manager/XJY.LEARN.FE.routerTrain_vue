<template>
  <section class="panel">
    <p class="eyebrow">05 / Dynamic Route</p>
    <h2>动态路由 · {{ $route.params.id }}</h2>
    <p class="description">
      路径中的 id
      会保持不变，子路由在下方切换。点击一个页面，观察实时路由的变化。
    </p>
    <div class="actions">
      <router-link
        v-for="item in items"
        :key="item"
        class="button"
        :to="{ name: 'page' + item, params: { id: $route.params.id } }"
        >Page{{ item }}</router-link
      ><router-link class="button quiet" to="/pageSix"
        >返回嵌套实验</router-link
      >
    </div>
    <div class="nested">
      <router-view />
      <p v-if="$route.name === 'PageEight_Nine_Ten'" class="muted">
        选择上方的 PageEight、PageNine 或 PageTen 开始。
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "PageEight_Nine_Ten",
  data() {
    return { items: ["Eight", "Nine", "Ten"] };
  },
};
</script>

<style scoped>
.router-link-active {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
