<template>
  <section>
    <p v-if="$route.query.notice" class="notice" role="status">
      {{ $route.query.notice }}
    </p>
    <h2>选择一个实验</h2>
    <p class="description">
      每个实验保留真实的路由行为。建议按顺序完成，也可以直接从感兴趣的部分开始。
    </p>
    <div class="lesson-list">
      <router-link v-for="item in lessons" :key="item.path" :to="item.path"
        ><span class="number">{{ item.number }}</span>
        <div>
          <strong>{{ item.title }}</strong
          ><small>{{ item.description }}</small>
        </div>
        <span aria-hidden="true">进入</span></router-link
      >
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      lessons: [
        {
          number: "01",
          title: "页面导航",
          description: "通过 Options API 与 Composition API 前进和返回",
          path: "/pageOne",
        },
        {
          number: "02",
          title: "Query 与 Params",
          description: "输入一段文字，观察 URL 与接收状态",
          path: "/pageThree",
        },
        {
          number: "03",
          title: "路由守卫",
          description: "对比允许通过和被拦截的两种结果",
          path: "/pageFive",
        },
        {
          number: "04",
          title: "嵌套与动态路由",
          description: "从合法入口进入父页面，再切换子页面",
          path: "/pageSix",
        },
      ],
    };
  },
};
</script>
