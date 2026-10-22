<template>
  <section class="panel">
    <p class="eyebrow">02 / Parameters</p>
    <h2>把消息带到下一页</h2>
    <p class="description">
      Query 附在问号后面，Params
      属于路径的一部分。输入相同内容，分别试试两种传递方式。
    </p>
    <label class="field-label" for="message">传给 PageFour 的内容</label
    ><input id="message" v-model="pageInfo" maxlength="120" />
    <div class="actions">
      <router-link
        class="primary button"
        :to="{ path: '/pageFour', query: { queryPass: pageInfo } }"
        >通过 Query 发送</router-link
      ><router-link
        class="button"
        :to="{
          name: 'pageFour',
          params: { paramsPass: pageInfo || '示例消息' },
        }"
        >通过 Params 发送</router-link
      >
    </div>
    <code class="code"
      >Query: /pageFour?queryPass=你的消息 Params: /pageFour/你的消息</code
    >
    <p class="note">
      Params 需要在路由定义中声明动态段。这里保留 /pageFour，并使用可选的
      :paramsPass? 接收参数。
    </p>
  </section>
</template>

<script>
export default {
  name: "PageThree",
  data() {
    return { pageInfo: "你好，下一页。" };
  },
};
</script>
