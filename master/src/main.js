// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/plugin/index'
import getQueryStringFn from '@/api/wxlogin'
import api from './api'

Vue.config.productionTip = false

Vue.mixin({
  data () {
    return {
      getQueryStringFn: '',
      api: ''
    }
  },
  methods: {},
  created () {
      this.getQueryStringFn = getQueryStringFn
      this.api = api
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
