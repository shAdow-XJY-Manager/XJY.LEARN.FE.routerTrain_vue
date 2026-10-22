<template>
  <section class="panel">
    <p class="eyebrow">Navigation</p>
    <h2>01 · Options API 导航</h2>
    <p class="description">
      使用 this.$router.push 前往下一页，或返回实验目录。
    </p>
    <code class="code">this.$router.push('/pageTwo')</code>
    <div class="actions">
      <button class="quiet" @click="routeBack">返回上一页</button
      ><button class="primary" @click="routeTo"
        >继续下一步</button
      >
    </div>
  </section>
</template>

<script>
export default {
  name: "PageOne",
  methods: {
    routeBack() { this.$router.back(); },
    routeTo() { this.$router.push("/pageTwo"); },
  },
};
</script>
