<template lang="pug">
  div
    van-search(v-model="search" placeholder='请输入搜索关键词')
    van-tabs(v-model="tags" sticky)
      van-tab(title='全部')
        ul
          li(v-for="(list, index) in lists" v-bind:key="index")
            .title
              p 服务类型：{{ list.title }}
              p 工单号：{{ list.workId }}
                a(@click="page(list.workId)") 查看详情
            p 联系人名称：{{ list.name }}
            p 联系人电话：{{ list.phone }}
            p 设备名称：{{ list.productName }}
            p 联系地址：{{ list.address }}
            van-button(round type='info' block) 已上门
      van-tab(title='待上门')
        van-empty(description="暂无工单" :image="empty")
      van-tab(title="维修中")
        van-empty(description="暂无工单" :image="empty")
      van-tab(title="已完成")
        van-empty(description="暂无工单" :image="empty")
    van-tabbar(v-model="active")
      van-tabbar-item(name="order" replace icon="balance-list" to="/order") 工单
      van-tabbar-item(name="user" replace icon="manager" to="/user") 我的
</template>

<script>
export default {
  name: 'order',
  data () {
    return {
      active: 'order',
      search: '',
      tags: '',
      lists: [{
        title: 'labu',
        workId: 20202020202020,
        name: 'labuy',
        phone: 13111111111,
        productName: 'lay content active',
        address: 'GDS tianhequ Ns 888'
      }, {
        title: 'labu',
        workId: 20202020202020,
        name: 'labuy',
        phone: 13111111111,
        productName: 'lay content active',
        address: 'GDS tianhequ Ns 888'
      }, {
        title: 'labu',
        workId: 20202020202020,
        name: 'labuy',
        phone: 13111111111,
        productName: 'lay content active',
        address: 'GDS tianhequ Ns 888'
      }],
      empty: '/static/images/empty.png'
    }
  },
  methods: {
    page (params) {
      this.$router.push({path: 'details', query: { workId: params }})
    }
  },
  created () {}
}
</script>

<style lang="scss">
  body{
    background: #EEEEEE;
    ul{
      height: auto;
      overflow: hidden;
      padding: 10px;
      box-sizing: border-box;
      margin-bottom: 60px;
      li{
        border-radius:4px;
        background: white;
        text-align: left;
        font-size: 12px;
        height: auto;
        overflow: hidden;
        margin-bottom: 10px;
        box-shadow:0px 3px 10px rgba(34,24,21,0.17);
        .title{
          height: auto;
          overflow: hidden;
          background: linear-gradient(270deg,rgba(74,144,226,1) 0%,rgba(101,166,241,1) 100%);
          color: white;
        }
        p{
          padding-left: 10px;
          box-sizing: border-box;
          a{
            float: right;
            margin-right: 10px;
            text-decoration: underline;
          }
        }
        .van-button{
          width: 80%;
          margin: 10px auto;
          text-align: center;
          background-color: #498FE1;
        }
      }
    }
  }
</style>
