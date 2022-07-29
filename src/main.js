import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/axios'

// require("./mock/mock")

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// 在请求头中加token
axios.interceptors.request.use(
  config => {

    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token');

      // alert(localStorage.getItem('token'));
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });  


// Axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem("token")) {
//       config.headers.Authorization = "JWT " + localStorage.getItem("token");
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );


// 拦截器
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if (localStorage.token) { // 判断当前的user_id是否存在 ； 登录存入的user_id
      next();
    }
    else {
      next({
        path: '/home',
        query: {redirect: to.fullPath} // 将要跳转路由的path作为参数，传递到登录页面
      })
    }
  }
  else {
    next();
  }
})


