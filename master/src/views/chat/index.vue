<template lang="pug">
    .container
        .chat
            div(v-for="(oldItem, index) in oldChat" v-bind:keys="index")
                .youChat(v-if="oldItem.isCustomer == 1")
                    van-image(:src="yourImage" @click="viewInfo(oldItem)")
                    .your_text {{ oldItem.content }}
                        .time {{ oldItem.createTime }}
                .meChat(v-else)
                    .me_text {{ oldItem.content }}
                        .time {{ oldItem.createTime }}
            div(v-for="(item, index) in myChat" v-bind:keys="index")
                .youChat(v-if="item.isCustomer == 1")
                    van-image(:src="yourImage")
                    .your_text {{ item.content }}
                        .time {{ item.createTime }}
                .meChat(v-else)
                    .me_text {{ item.content }}
                        .time {{ item.createTime }}
            //- .old_time 2020-08-13
        .send
            van-image(:src="photo" @click="show = true")
            van-field(type="text" v-model="chatText" placeholder="输入内容")
            van-button(color="#A4ABC0" @click="websocketsend") 发送
        van-action-sheet(v-model="show" :actions="actions" @select="onSelect")
        input(type="file" accept="image/*,video/*" style="display: none" id="file2")
        input(type="file" accept="image/*,video/*" multiple style="display: none" id="file1")
        van-popup(v-model="clientShow" position="top")
            van-image(:src="clientBg" class="client")
                .client_message(style="position: absolute; top:20px; left: 0; width: 100%;")
                    van-image(:src="client.headImgUrl" width="80" height="80")
                    p(style="margin: 5px 0; color: white") {{ client.adminName }}
                    p(style="margin: 0; color: white") {{ client.phone }}
                van-cell(center title="消息推送" style="text-align: left")
                    template(right-icon)
                        van-switch(v-model="checked" size="24" active-color="#07c160")

</template>

<script>
export default {
    name: 'chat',
    data () {
        return {
            yourImage: '/static/images/you_image.png',
            photo: '/static/images/photo.png',
            clientBg: '/static/images/client_bg.png',
            chatText: '',
            myChat: [],
            youChat: [],
            oldChat: [],
            bscok: null,
            num: 1,
            show: false,
            clientShow: false,
            checked: false,
            client: {},
            actions: [
                { name: '拍照', id: 1 },
                { name: '相册', id: 2 }
            ]
        }
    },
    methods: {
        onSelect (params) {
            document.querySelector(`#file${params.id}`).click()
            document.querySelector(`#file${params.id}`).onchange = (file) => {
                console.log(file)
                console.log(file.srcElement.files)
            }
        },
        viewInfo (params) {
            this.api.httpRequest({url: 'view_user_info', methods: 'GET', data: {workId: params.workId, senderId: params.senderId, isCustomer: params.isCustomer}})
            .then(params => {
                if (params.data.state != 200) {//eslint-disable-line
                    this.$toast(params.data.msg)
                    return false
                }
                this.client = params.data.data
            })
            this.clientShow = true
        },
        initWebSocket () {
            const ws = `${this.URL.ws + this.$route.query.workId}?token=${JSON.parse(sessionStorage.getItem('token')).asset.secret}`
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
            this.autoHeight()
        },
        websocketsend (Data) { // 数据发送
            if (!this.chatText) {
                return false
            }
            this.bscok.send(JSON.stringify({
                content: this.chatText
            }))
            this.chatText = ''
        },
        websocketclose (e) { // 关闭
            console.log('断开连接', e)
        },
        autoHeight () {
            setTimeout(() => {
                var t = document.querySelector('.chat').offsetHeight
                window.scroll({ top: t, left: 0, behavior: 'smooth' })
            }, 1000)
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
                workId: this.$route.query.workId,
                page: this.num,
                pageSize: 10
            }
        })
        .then(params => {
            if (params.data.state != 200) {//eslint-disable-line
                this.$toast(params.data.msg)
                return false
            }
            this.oldChat = params.data.page.records.reverse()
            this.autoHeight()
        })
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
                    color: #999999;
                }
            }
        }
        .meChat{
            width: 100%;
            height: auto;
            overflow: hidden;
            padding: 20px 10px;
            box-sizing: border-box;
            color: white;
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
                    color: #999999;
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
