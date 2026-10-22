<template>
  <section>
    <h2>PageFive · 让守卫做一次判断</h2>
    <p class="description">
      下面两次导航都前往 PageSix。携带 no=no
      的请求会被单路由守卫拦截，并返回目录。
    </p>
    <div class="two-col">
      <section class="panel">
        <h3>本页接收状态</h3>
        <label class="field-label">Query / queryPass</label
        ><output class="value">{{
          $route.query.queryPass || "无 Query 参数，可从参数实验发送。"
        }}</output
        ><label class="field-label">Params / paramsPass</label
        ><output class="value">{{
          $route.params.paramsPass || "无 Params 参数，可从参数实验发送。"
        }}</output>
      </section>
      <section class="panel">
        <h3>对比两种导航结果</h3>
        <p class="muted">通过时进入 PageSix；拦截时在目录显示原因。</p>
        <div class="actions">
          <router-link class="button primary" :to="{ name: 'pageSix' }"
            >允许通过</router-link
          ><router-link
            class="button"
            :to="{ path: '/pageSix', query: { no: 'no' } }"
            >测试拦截</router-link
          >
        </div>
        <code class="code"
          >if (to.query.no === 'no') { return next('/') } next()</code
        >
      </section>
    </div>
  </section>
</template>

<script>
export default { name: "PageFive" };
</script>
