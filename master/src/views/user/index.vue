<template lang="pug">
    .container
        van-swipe(class="my-swipe" :autoplay="3000" indicator-color="white" :show-indicators=false)
          van-swipe-item
              img(:src="image")
        van-cell-group
          van-field(v-model="user.adminName" label="名称" left-icon="manager" placeholder="请输入用户名称")
          van-field(v-model="user.phone" label="手机号" left-icon="phone-circle" placeholder="请输入手机号码")
          van-field(v-model="user.oldpwd" label="旧密码" type="password" left-icon="lock" placeholder="请输入旧密码")
          van-field(v-model="user.password" label="新密码" type="password" left-icon="lock" placeholder="请输入新密码")

        van-button(round type="info" style="margin-top:60px;" size="normal" block @click="submit" :loading="handling ? true : false" ) 确定

        van-tabbar(v-model="active")
            van-tabbar-item(name="order" replace icon="balance-list" to="/order") 工单
            van-tabbar-item(name="user" replace icon="manager" to="/user") 我的
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      active: 'user',
      image: '/static/images/user_background.png',
      user: {},
      handling: false
    }
  },
  methods: {
    submit () {
      this.api.httpRequest({
        url: 'modify_personal_info',
        methods: 'POST',
        data: {
          adminName: this.user.adminName,
          newPassword: this.user.password,
          password: this.user.oldpwd,
          phone: this.user.phone
        }
      })
      .then(response => {
        if (response.data.state != 200) {//eslint-disable-line
          this.$toast(response.data.msg)
          return false
        }
        this.$router.push('/')
      })
    }
  },
  created () {
    this.api.httpRequest({
      url: 'view_personal_info',
      methods: 'GET'
    })
    .then(response => {
      if (response.data.state != 200) {//eslint-disable-line
        this.$toast(response.data.msg)
        return false
      }
      this.user = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
    .container {
        img{
            width: 100%;
        }
        .van-button{
            width: 60%;
            margin: 0 auto;
        }
    }
</style>
