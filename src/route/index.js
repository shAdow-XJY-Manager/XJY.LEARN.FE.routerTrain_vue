import {createRouter, createWebHashHistory} from "vue-router";
const homePage = () => import("../pages/HomePage")
const pageOne = () => import("../pages/PageOne")
const pageTwo = () => import("../pages/PageTwo")
const pageThree = () => import("../pages/PageThree")
const pageFour = () => import("../pages/PageFour")
const pageFive = () => import("../pages/PageFive")

const routes = [
    // {path: "/",redirect: "/pageOne" },
    {
        path: "/",
        name: "homePage",
        component: homePage
    },
    {
        path: "/pageOne",
        name: "pageOne",
        component: pageOne
    },
    {
        path: "/pageTwo",
        name: "pageTwo",
        component: pageTwo
    },
    {
        path: "/pageThree",
        name: "pageThree",
        component: pageThree
    },
    {
        path: "/pageFour/:paramsPass?",
        name: "pageFour",
        component: pageFour
    },
    {
        path: "/pageFive/:paramsPass?",
        name: "pageFive",
        component: pageFive,
    },
    {
        path: "/pageSix",
        name: "pageSix",
        //慢import也是懒加载的一种
        component: () => import("../pages/PageSix"),
        //beforeEnter : 进入PageSix单路由守卫/拦截
        beforeEnter: (to,from,next) => {
            //console.log(to.query)
            if(to.query.no === 'no') {
                return next({path:'/',query:{notice:'单路由守卫已拦截：PageSix 不接受 no=no。请重试允许通过的入口。'}});
            }
            next();
        }
    },
    {
        path: "/pageSeven",
        name: "pageSeven",
        component: () => import("../pages/PageSeven"),
        children: [
            {
                path:'/pageSevenChildren',
                name:'pageSevenChildren',
                component: () => import("../pages/PageSevenChildren")
            },
        ]
    },
    {
        //动态匹配：id要确定才可以进入/pageEight_Nine_Ten/:id/{}
        path: "/pageEight_Nine_Ten/:id",
        name: "PageEight_Nine_Ten",
        component: () => import("../pages/PageEight_Nine_Ten"),
        children: [
            {
                path: "pageEight",
                name: "pageEight",
                component: () => import("../pages/PageEight"),
            },
            {
                path: "pageNine",
                name: "pageNine",
                component: () => import("../pages/PageNine"),
            },
            {
                path: "pageTen",
                name: "pageTen",
                component: () => import("../pages/PageTen"),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

//全局路由守卫,进入pageSeven需要从pageSix或者pageSevenChildren进入
router.beforeEach((to,from,next)=>{
    if(to.path === '/pageSeven'){
        if(from.path === '/pageSix' || from.path === '/pageSevenChildren'){
            return next();
        } else {
            return next({path:'/',query:{notice:'全局守卫已拦截：请先进入 PageSix，再访问 PageSeven。'}});
        }
    }
    return next();
})

export default router
