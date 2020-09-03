<template lang="pug">
    .container#login(style="display: none;")
      mixin article(title)
        .article
            .article-wrapper
            if !block
                block
            else
                p 没有提供任何内容。
      +article()
      .logo
        van-image(:src="logo"  width="193" height="185")
      .logind
        van-field(v-model="user.name" input-align="center" placeholder="请输入账号")
        van-field(v-model="user.pwd" type="password" input-align="center" placeholder="请输入密码")
        van-button(type="primary" block @click="submit" :loading="handling ? true : false") 登陆
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      logo: './static/images/logo.png',
      user: {
        name: '',
        pwd: ''
      },
      handling: false
    }
  },
  methods: {
    submit (wechatId) {
      this.handling = true
      try {
        wechatId = JSON.parse(sessionStorage.getItem('token')).asset.wechatResult.wechatId
      } catch (error) {
        wechatId = ''
      }
      this.api.httpRequest({
        url: 'maintainer_account_login',
        methods: 'POST',
        data: {
          account: this.user.name,
          password: this.user.pwd,
          wechatId: wechatId
        }
      })
      .then(res => {
        if (res.data.state != 200) {//eslint-disable-line
          this.$toast('登陆失败，请联系管理员')
          this.handling = false
          return false
        }
        sessionStorage.setItem('token', JSON.stringify({asset: res.data.data}))
        location.href = this.URL.proxy + 'order'
      })
    }
  },
  created () {
    console.log(this.getQueryStringFn)
    setTimeout(() => {
      if (sessionStorage.getItem('token') && JSON.parse(sessionStorage.getItem('token')).bool) {//eslint-disable-line
          document.querySelector('#login').setAttribute('style', 'display: block;')
      } else if (sessionStorage.getItem('token')) {
        location.href = process.env.NODE_ENV == 'development'/*eslint-disable-line*/ ? location.origin+'/#/order': this.URL.proxy+ 'order' // 待定
      }
      if (!/Android|iPhone/g.test(navigator.userAgent)) {
        document.querySelector('#login').setAttribute('style', 'display: block;')
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
  .container{
    background: linear-gradient(180deg,rgba(84,207,238,1) 0%,rgba(74,144,226,1) 100%) no-repeat;
    .logind{
      padding: 16%;
      box-sizing: border-box;
      .van-field{
        border-radius: 20px;
        text-align: center;
        font-size: 14px;
        margin-bottom: 20px;
        ::placeholder{
          color: #4EADE7;
        }
      }
      .van-button{
        background: #74C2F2;
        color: white;
        border-color: #74C2F2;
        border-radius: 20px;
      }
    }
  }
</style>
