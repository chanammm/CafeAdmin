import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index'
import Login from '@/views/login/index'

Vue.use(Router)

const URL = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登陆'
      }
    }
  ]
})
URL.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  return next()
})

export default URL
