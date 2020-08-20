<template lang="pug">
    .container
        header
            .box
                van-image(:src="yourImage")
                span cocococococococo
            .files
                van-icon(name="paid")
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
            van-field(type="textarea" v-model="chatText" placeholder="输入内容")
            van-button(color="#A4ABC0") 发送
</template>

<script>
export default {
  name: 'winchat',
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

<style lang="scss">
body{
    max-width: 100%;
}
.container {
    header{
        height: 80px;
        width: 100%;
        background-color: #5E636D;
        color: white;
        line-height: 80px;
        .box{
            width: 100px;
            margin: 0 auto;
            position: relative;
            .van-image{
                width: 50px;
                height: 50px;
                margin-top: 15px;
                float: left;
            }
            span{
                position: absolute;
                left: 60px;
                top: 0px;
            }
        }
        .files{
            float: right;
            margin-right: 30px;
            font-size: 30px;
        }
    }
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
        height: 250px;
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
        .van-field{
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            textarea{
                height: 250px;
            }
        }
        .van-button{
            position: absolute;
            right: 20px;
            bottom: 0;
            margin: 8px 10px;
            width: 20%;
            height: 35px;
        }
    }
}
</style>
