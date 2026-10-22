<template>
  <section class="panel">
    <p class="eyebrow">Navigation</p>
    <h2>02 · Composition API 导航</h2>
    <p class="description">
      useRouter() 提供同样的导航能力。继续前往参数实验。
    </p>
    <code class="code"
      >const router = useRouter() router.push('/pageThree')</code
    >
    <div class="actions">
      <button class="quiet" @click="routeBack">返回上一页</button
      ><button class="primary" @click="routeTo"
        >继续下一步</button
      >
    </div>
  </section>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "PageTwo",
  setup() {
    const router = useRouter();
    return {
      routeBack: () => router.back(),
      routeTo: () => router.push("/pageThree"),
    };
  },
};
</script>
