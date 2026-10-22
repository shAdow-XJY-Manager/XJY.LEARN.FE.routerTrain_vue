<template>
  <section>
    <h2>PageFour · 参数已接收</h2>
    <div class="two-col">
      <section class="panel">
        <h3>接收到的消息</h3>
        <label class="field-label">Query / queryPass</label
        ><output class="value">{{
          $route.query.queryPass || "本次没有 Query 参数"
        }}</output
        ><label class="field-label">Params / paramsPass</label
        ><output class="value">{{
          $route.params.paramsPass || "本次没有 Params 参数"
        }}</output>
      </section>
      <section class="panel">
        <h3>再传递一次</h3>
        <p class="muted">通过 useRouter() 将新消息传给 PageFive。</p>
        <label class="field-label" for="forward-message">下一条消息</label
        ><input id="forward-message" v-model="message" maxlength="120" />
        <div class="actions">
          <button class="primary" @click="routeQueryTo">发送 Query</button
          ><button @click="routeParamTo">发送 Params</button>
        </div>
        <code class="code"
          >router.push({ name: 'pageFive', params: { paramsPass: message }
          })</code
        >
      </section>
    </div>
    <div class="actions">
      <router-link class="button quiet" to="/pageThree"
        >返回参数实验</router-link
      >
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "PageFour",
  setup() {
    const router = useRouter();
    const message = ref("消息继续前进。");
    return {
      message,
      routeQueryTo: () =>
        router.push({ path: "/pageFive", query: { queryPass: message.value } }),
      routeParamTo: () =>
        router.push({
          name: "pageFive",
          params: { paramsPass: message.value || "示例消息" },
        }),
    };
  },
};
</script>
