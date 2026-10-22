<template>
  <div class="shell">
    <aside class="sidebar">
      <a class="brand" href="/">频率实验室<small>FREQUENCY / LEARN</small></a>
      <nav aria-label="路由课程">
        <router-link
          to="/"
          exact-active-class="router-link-active"
          :class="{ inactive: $route.path !== '/' }"
          ><span>00</span> 实验目录</router-link
        ><router-link to="/pageOne" :class="{ 'router-link-active': ['pageOne', 'pageTwo'].includes($route.name) }"><span>01</span> 页面导航</router-link
        ><router-link to="/pageThree" :class="{ 'router-link-active': ['pageThree', 'pageFour'].includes($route.name) }"><span>02</span> 传递参数</router-link
        ><router-link to="/pageFive"><span>03</span> 路由守卫</router-link
        ><router-link to="/pageSix" :class="{ 'router-link-active': ['pageSix', 'pageSeven', 'pageSevenChildren', 'PageEight_Nine_Ten', 'pageEight', 'pageNine', 'pageTen'].includes($route.name) }"><span>04</span> 嵌套与动态路由</router-link>
      </nav>
      <a class="back-link" href="/">返回工作室</a>
    </aside>
    <main class="main">
      <header class="page-header">
        <p class="eyebrow">Vue Router 4 · Routing Lab</p>
        <h1>每一次跳转，都看得见。</h1>
        <p>
          从页面导航到参数、守卫与嵌套路由，逐步探索。下方实时状态会跟随每一次操作更新。
        </p>
      </header>
      <router-view />
      <aside class="inspector" aria-label="当前路由状态">
        <h3>LIVE ROUTE / 实时路由</h3>
        <dl>
          <dt>当前路径</dt>
          <dd>{{ $route.path }}</dd>
          <dt>路由名称</dt>
          <dd>{{ $route.name }}</dd>
          <dt>Query</dt>
          <dd>{{ JSON.stringify($route.query) }}</dd>
          <dt>Params</dt>
          <dd>{{ JSON.stringify($route.params) }}</dd>
        </dl>
      </aside>
    </main>
  </div>
</template>

<script>
import "./workbench.css";
export default { name: "App" };
</script>

<style>
.sidebar nav a.inactive {
  background: transparent;
  color: var(--muted);
  box-shadow: none;
}
</style>
