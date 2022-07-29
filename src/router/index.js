import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "../views/HomePage";
import personal from "../views/personal";

Vue.use(VueRouter)


const routes = [

   {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "user" */ '../views/login.vue')
   },
   {
    path: '/',
    name: '/',
    redirect: '/login',
    //redirect   表示当路径使用到‘/’是，就自动跳转到路径为‘/login’
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
  },
  {
    path: '/personal',
    name: 'personal',
    component: personal,
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
  },

]

const router = new VueRouter({
  routes
})

export default router

//登录拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 如果被拦截
      
      if (localStorage.token) {  //如果有token
          next();
      }
      else {      //如果无token              
          next({
              path: '/login',//返回登录界面
          })
          }
  }
  else {     //如果不被拦截
      next();
  }
})

