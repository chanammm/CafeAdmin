<template lang="pug">
  //- iframe(:src="path")
  .container
    van-skeleton(title :row="20" :loading="show")
      van-swipe(class="my-swipe" :autoplay="3000" indicator-color="white" :show-indicators=false)
        van-swipe-item
            img(:src="detailsImages" style="width: 100%;")
      van-cell-group
        van-cell(class="cell_border" title="工单号" :value="workList.workId")
        div(style="width: 100%; height: 20px; background-color: #eeeeee")
        van-cell(class="cell_border")
          template(title)
            div(class="red_left")
            span(class="custom-title" style="font-weight: blod;") 需求信息
        van-cell(title="需求名称" :value="workList.demandChargeName != '-1' ? workList.demandChargeName: '无'")
        van-cell(title="报修类型名称" :value="workList.repairsTypeName")
        van-cell(title="产品名称" :value="workList.facilityName != '-1' ? workList.facilityName : '无'")
        van-cell(title="备注" :value="workList.faultContent")
        van-cell(v-if="workList.video != '-1'")
          template(title)
            span(class="custom-title" style="font-weight: blod;") 视频附件
            video(:src="workList.video" controls="controls" width="200" height="200" style="display: block;")
        div(style="width: 100%; height: 20px; background-color: #eeeeee")
        van-cell(class="cell_border")
          template(title)
            div(class="red_left")
            span(class="custom-title" style="font-weight: blod;") 门店信息
        van-cell(title="门店名称" :value="workList.shopName")
        van-cell(title="门店地址" :value="workList.province+'/'+workList.city+'/'+workList.district+'/'+workList.address")
        div(style="width: 100%; height: 20px; background-color: #eeeeee")
        van-cell(class="cell_border")
          template(title)
            div(class="red_left")
            span(class="custom-title" style="font-weight: blod;") 联系人信息
        van-cell(title="联系人名称" :value="workList.contactName")
        van-cell(title="联系人电话" :value="workList.contactPhone")
        div(style="width: 100%; height: 20px; background-color: #eeeeee")
        van-cell(class="cell_border")
          template(title)
            div(class="red_left")
            span(class="custom-title" style="font-weight: blod;") 师傅信息
        van-cell(title="维修师傅" :value="workList.maintainerName")
        van-cell(title="维修师傅电话" :value="workList.maintainerPhone")
        div(style="width: 100%; height: 20px; background-color: #eeeeee")
        van-cell(class="cell_border")
          template(title)
            div(class="red_left")
            span(class="custom-title" style="font-weight: blod;") 订单信息
        van-cell(title="创建时间" :value="workList.createTime")
        van-cell(title="设备名称" :value="workList.machineName")
        van-cell(title="创建类型" :value="workList.creationType")
        van-cell(title="微信昵称" :value="workList.nickName")
        van-cell(title="维修金额" :value="workList.maintainPaymentStr")
        van-cell(title="预支付费用" :value="workList.visitCostStr")
        van-cell(title="配件费用" :value="workList.partPaymentStr")
        van-cell(title="服务费" :value="workList.serviceCharge")
        van-cell(title="检测费" :value="workList.testingCharge")
        van-cell(title="期待上门时间" :value="workList.visitingTime")
        van-cell(title="状态" :value="workList.status")
      div(style="width: 100%; height: 60px;")
      footer
        van-button(type="info" icon="replay" plain @click="() => { this.$router.push('/order') }") 返回上一页
        van-button(type="info" @click="page" icon="chat-o") 在线沟通
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      // path: 'http://192.168.0.168:8080/cafeadmin/client/templates/build/details.html?workId=2020081900005'
      workList: {},
      show: false,
      detailsImages: './static/images/details.png'
    }
  },
  methods: {
    page () {
      if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != 'micromessenger'){//eslint-disable-line
        this.$router.push({path: '/winchat', query: {workId: this.$route.query.workId}})
      } else {
        this.$router.push({path: '/chat', query: {workId: this.$route.query.workId}})
      }
    }
  },
  created () {
    this.api.httpRequest({url: 'work_details', methods: 'GET', data: {workId: this.$route.query.workId}})
    .then(response => {
      this.workList = response.data.data
    })
  }
}
</script>

<style lang="scss">
    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
    .van-cell-group{
      .van-cell__title{
        text-align: left;
      }
    }
    .red_left{
      width: 4px;
      background: #498FE1;
      height: 100%;
      float: left;
      margin-right: 6px;
    }
    footer{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background-color: white;
      padding: 10px 0;
      box-sizing: border-box;
      border-top: 1px solid #ebedf0;
      overflow: hidden;
      .van-button{
        height: 40px;
        font-size: 12px;
        margin:0 5px;
      }
    }
</style>
