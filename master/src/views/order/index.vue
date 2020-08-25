<template lang="pug">
  div
    van-search(v-model="search" placeholder='请输入搜索关键词' @input="num = 1;lists = []; orderList()")
    van-tabs(v-model="tags" sticky @click="num = 1;lists = []; orderList()")
      each item in [{name:'全部', id: 0},{name: "待上门", id: 1},{name: "维修中", id: 2},{name: "已完成", id: 3}]
        van-tab(title=item.name)
          van-pull-refresh(v-model="refreshing" @refresh="onRefresh")
            //- finished-text="没有更多了"
            van-list(v-model="loading" :finished="finished" @load="orderList()")
              ul
                li(v-for="(list, index) in lists" v-bind:key="index")
                  .title
                    p 服务类型：{{ list.repairsTypeName }}
                    p 工单号：{{ list.workId }}
                      a(@click="page(list.workId)") 查看详情
                  p 联系人名称：{{ list.contactName }}
                  p 联系人电话：{{ list.contactPhone }}
                  p 设备名称：{{ list.facilityName != -1 ? list.facilityName : '无' }}
                  p 联系地址：{{ list.province+list.city+list.district+list.address }}
                  van-button(round type='info' block @click="goToHome(list.workId)") 已上门
          van-empty(description="暂无工单" :image="empty" v-if="lists.length < 1")
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
      loading: false,
      finished: false,
      refreshing: false,
      num: 1,
      search: '',
      tags: 0,
      lists: [],
      empty: '/static/images/empty.png'
    }
  },
  methods: {
    page (params) {
      this.$router.push({path: 'details', query: { workId: params }})
    },
    goToHome (params) {
      this.api.httpRequest({
        url: 'work_complete_repair',
        methods: 'POST',
        data: {
              workId: params
          }
      })
      .then(params => {
        if (params.data.state != 200) {//eslint-disable-line
          this.$toast(params.data.msg)
          return false
        }
        this.onRefresh()
      })
    },
    onRefresh () {
        this.finished = false
        this.loading = true
        this.lists = []
        this.num = 1
        this.orderList()
    },
    orderList () {
      if (this.refreshing) {
          this.lists = []
          this.refreshing = false
      }
      this.api.httpRequest({
        url: 'work_page',
        methods: 'GET',
        data: {
              status: this.tags,
              page: this.num,
              pageSize: 10,
              workId: this.search
          }
      })
        .then(params => {
            this.show = false
            this.loadingShow = false
            if (params.data.state == 200) {//eslint-disable-line
                this.lists.length > 0 ? this.lists = this.lists.concat(params.data.page.records) : this.lists = params.data.page.records
                // 加载状态结束
                this.loading = false
                this.num++
                if (params.data.page.records.length < 10) this.finished = true
            } else if (params.data.state == 300) {//eslint-disable-line
                this.loading = false
                this.finished = true
            } else {
                this.loading = false
                this.finished = true
                this.num = 1
                this.$toast(params.data.msg)
            }
        })
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
