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
            .meChat(v-for="(item, index) in myChat")
                .me_text {{ item.content }}
                    .time {{ item.createTime }}
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
            van-button(color="#A4ABC0" @click="websocketsend") 发送
</template>

<script>
export default {
    name: 'chat',
    data () {
        return {
            yourImage: '/static/images/you_image.png',
            photo: '/static/images/photo.png',
            chatText: '',
            myChat: [],
            youChat: [],
            bscok: null
        }
    },
    methods: {
        initWebSocket () {
            // const ws = `ws://192.168.0.112:8089/websocket/051410000312476666?token=${JSON.parse(sessionStorage.getItem('token')).asset.secret}`
            const ws = `ws://192.168.0.112:8089/websocket/051410000312476666?token=b3eee0eef3ca01d9fdf64edaae33e9e0 `
            this.bscok = new WebSocket(ws)
            this.bscok.onmessage = this.websocketonmessage
            this.bscok.onopen = this.websocketonopen
            this.bscok.onerror = this.websocketonerror
            this.bscok.onclose = this.websocketclose
        },
        websocketonopen () {},
        websocketonerror () { // 连接建立失败重连
            this.initWebSocket()
        },
        websocketonmessage (e) { // 数据接收
            const redata = JSON.parse(e.data)
            this.myChat.length > 0 ? this.myChat = this.myChat.concat(redata) : this.myChat.push(redata)
        },
        websocketsend (Data) { // 数据发送
            this.bscok.send(JSON.stringify({
                content: this.chatText
            }))
            this.chatText = ''
        },
        websocketclose (e) { // 关闭
            console.log('断开连接', e)
        }
    },
    destroyed () {
        this.bscok.close() // 离开路由之后断开websocket连接
    },
    created () {
        this.initWebSocket()
        this.api.httpRequest({
            url: 'communication_page',
            methods: 'GET',
            data: {
                workId: '051410000312476666',
                page: 1,
                pageSize: 20
            }
        })
        .then(params => {})
    }
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
                    width: 100px;
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
                    width: 100px;
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
        display: flex;
        .van-image{
            margin: 8px;
            flex: 1;
        }
        .van-field{
            background: #D9DBE7;
            border-radius: 20px;
            margin-top: 6px;
            margin-bottom: 6px;
            padding: 6px 16px;
            flex: 7;
        }
        .van-button{
            margin: 6px 10px;
            height: 35px;
            flex: 1;
        }
    }
}
</style>
