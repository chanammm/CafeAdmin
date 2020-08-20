<template lang="pug">
    .container
        .chat
            .youChat
                van-image(:src="yourImage")
                .your_text 你快点
                    .time 10:00
            .youChat
                van-image(:src="yourImage")
                .your_text 你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来
                    .time 10:00
            .meChat
                .me_text 你快点
                    .time 10:00
            .meChat
                .me_text 你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来
                    .time 10:00
            .youChat
                van-image(:src="yourImage")
                .your_text 你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来
                    .time 10:00
            .meChat
                .me_text 你快点派个师傅过来
                    .time 10:00
            .old_time 2020-08-13
            .youChat
                van-image(:src="yourImage")
                .your_text 你快点
                    .time 10:00
            .youChat
                van-image(:src="yourImage")
                .your_text 你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来
                    .time 10:00
            .meChat
                .me_text 你快点
                    .time 10:00
            .meChat
                .me_text 你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来
                    .time 10:00
            .youChat
                van-image(:src="yourImage")
                .your_text 你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来你快点派个师傅过来
                    .time 10:00
            .meChat
                .me_text 你快点派个师傅过来
                    .time 10:00
            .old_time 2020-08-13
        .send
            van-image(:src="photo")
            van-field(type="text" v-model="chatText" placeholder="输入内容")
            van-button(color="#A4ABC0") 发送
</template>

<script>
export default {
  name: 'chat',
  data () {
    return {
      yourImage: '/static/images/you_image.png',
      photo: '/static/images/photo.png',
      chatText: ''
    }
  },
  methods: {},
  created () {}
}
</script>

<style lang="scss" scoped>
.container {
    .chat{
        margin-bottom: 60px;
        .youChat {
            width: 100%;
            padding: 20px 10px;
            box-sizing: border-box;
            height: auto;
            overflow: hidden;
            .van-image{
                width: 50px;
                height: 50px;
                float: left;
            }
            .your_text{
                background-color: white;
                border-radius: 0 10px 10px 10px;
                padding: 10px;
                box-sizing: border-box;
                margin-right: 10px;
                margin-left: 60px;
                margin-top: 20px;
                text-align: left;
                position: relative;
                display: table;
                .time{
                    font-size: 10px;
                    position: absolute;
                    bottom: -20px;
                    left: 0;
                }
            }
        }
        .meChat{
            width: 100%;
            height: auto;
            overflow: hidden;
            padding: 20px 10px;
            box-sizing: border-box;
            .me_text{
                background: #A4ABC0;
                float: right;
                border-radius:10px 0 10px 10px;
                display: table;
                padding: 10px;
                position: relative;
                box-sizing: border-box;
                .time{
                    font-size: 10px;
                    position: absolute;
                    bottom: -20px;
                    right: 0;
                }
            }
        }
        .old_time{
            width: 100%;
            height: auto;
            overflow: hidden;
            font-size: 14px;
            color: #C4C4C4;
        }
    }
    .send {
        width: 100%;
        height: 50px;
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
        .van-image{
            float: left;
            width: 35px;
            height: 35px;
            margin: 8px;
        }
        .van-field{
            float: left;
            width: 62%;
            background: #D9DBE7;
            border-radius: 20px;
            margin-top: 8px;
            padding: 6px 16px;
        }
        .van-button{
            float: right;
            margin: 8px 10px;
            width: 20%;
            height: 35px;
        }
    }
}
</style>
