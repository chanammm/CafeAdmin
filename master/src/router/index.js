import Vue from 'vue'
import Router from 'vue-router'
import Order from '@/views/Order/index'
import Login from '@/views/login/index'
import Details from '@/views/details/index'

Vue.use(Router)

const URL = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        title: '工单'
      }
    },
    {
      path: '/details',
      name: 'details',
      component: Details,
      meta: {
        title: '工单详情'
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
