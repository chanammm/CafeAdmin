import Vue from 'vue'
import Router from 'vue-router'
import Order from '@/views/Order/index'
import Login from '@/views/login/index'
import Details from '@/views/details/index'
import User from '@/views/user/index'
import Chat from '@/views/chat/index'
import Winchat from '@/views/winchat/index'

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
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      meta: {
        title: '在线沟通'
      }
    },
    {
      path: '/winchat',
      name: 'winchat',
      component: Winchat,
      meta: {
        title: '在线沟通'
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
