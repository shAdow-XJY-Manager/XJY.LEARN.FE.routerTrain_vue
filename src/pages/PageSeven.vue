<template>
  <section class="panel">
    <p class="eyebrow">04 / Nested Routes</p>
    <h2>PageSeven · 父页面</h2>
    <p class="description">
      选择图片编号，让子路由接收 Query 并在父页面内渲染。也可以进入带 id
      的动态路由。
    </p>
    <label class="field-label" for="image-number">子页面图片编号（1–10）</label
    ><input
      id="image-number"
      type="number"
      min="1"
      max="10"
      v-model="pageInfo"
    />
    <div class="actions">
      <button class="primary" :disabled="!valid" @click="routeQueryTo">
        打开子页面</button
      ><router-link class="button" to="/pageEight_Nine_Ten/id1"
        >进入动态路由</router-link
      ><router-link class="button quiet" to="/pageSix"
        >返回合法入口</router-link
      >
    </div>
    <p v-if="!valid" class="feedback" role="status">请输入 1–10 之间的整数。</p>
    <div class="nested"><router-view /></div>
  </section>
</template>

<script>
export default {
  name: "PageSeven",
  data() {
    return { pageInfo: 7 };
  },
  computed: {
    valid() {
      return (
        Number.isInteger(Number(this.pageInfo)) &&
        Number(this.pageInfo) >= 1 &&
        Number(this.pageInfo) <= 10
      );
    },
  },
  methods: {
    routeQueryTo() {
      if (this.valid)
        this.$router.push({
          path: "/pageSevenChildren",
          query: { srcPath: this.pageInfo },
        });
    },
  },
};
</script>
