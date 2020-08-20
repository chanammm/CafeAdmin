<template lang="pug">
    .container
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
        van-field(v-model="user" input-align="center" placeholder="请输入账号")
        van-field(v-model="pwd" type="password" input-align="center" placeholder="请输入密码")
        van-button(type="primary" block @click="submit") 登陆
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      logo: './static/images/logo.png',
      user: '',
      pwd: ''
    }
  },
  methods: {
    submit () {
      this.$router.push('order')
    }
  },
  created () {}
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
