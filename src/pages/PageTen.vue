<template>
  <section class="panel">
    <h3>PageTen · 子路由已激活</h3>
    <p class="feedback" role="status">
      当前父级 id：{{ $route.params.id }}，当前子页面：PageTen。
    </p>
    <img class="route-image" alt="子路由示例 10" src="../assets/10.png" />
  </section>
</template>

<script>
export default { name: "PageTen" };
</script>
