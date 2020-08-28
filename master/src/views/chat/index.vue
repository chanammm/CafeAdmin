<template lang="pug">
    .container
        .chat
            van-popup(v-model="pageTop" position="top")
                div(style="margin: 10px 0" @click="num = num + 1;page(true);") 查看上一页记录
            div(v-for="(oldItem, index) in oldChat" v-bind:keys="index")
                .youChat(v-if="oldItem.isCustomer == 1")
                    van-image(:src="yourImage" @click="viewInfo(oldItem)")
                    .your_text
                        span(v-if="oldItem.contentType == 0") {{ oldItem.content }}
                        img(:src="oldItem.content" v-if="oldItem.contentType == 1" style="width: 200px;")
                        video(:src="oldItem.content" v-if="oldItem.contentType == 2" controls="controls" style="width: 200px;" x5-video-player-type="h5-page" x5-video-orientation="landscape|portrait")
                        .time {{ oldItem.createTime }}
                .meChat(v-else)
                    .me_text
                        span(v-if="oldItem.contentType == 0") {{ oldItem.content }}
                        img(:src="oldItem.content" v-if="oldItem.contentType == 1" style="width: 200px;")
                        video(:src="oldItem.content" v-if="oldItem.contentType == 2" controls="controls" style="width: 200px;"  x5-video-player-type="h5-page" x5-video-orientation="landscape|portrait")
                        .time {{ oldItem.createTime }}
            div(v-for="(item, index) in myChat" v-bind:keys="index")
                .youChat(v-if="item.isCustomer == 1")
                    van-image(:src="yourImage")
                    .your_text
                        span(v-if="item.contentType == 0") {{ item.content }}
                        img(:src="item.content" v-if="item.contentType == 1" style="width: 200px;")
                        video(:src="item.content" v-if="item.contentType == 2" controls="controls" style="width: 200px;"  x5-video-player-type="h5-page" x5-video-orientation="landscape|portrait")
                        .time {{ item.createTime }}
                .meChat(v-else)
                    .me_text
                        span(v-if="item.contentType == 0") {{ item.content }}
                        img(:src="item.content" v-if="item.contentType == 1" style="width: 200px;")
                        video(:src="item.content" v-if="item.contentType == 2" controls="controls" style="width: 200px;"  x5-video-player-type="h5-page" x5-video-orientation="landscape|portrait")
                        .time {{ item.createTime }}
        div(style="width: 100%; height: 60px;")
            //- .old_time 2020-08-13
        .send
            van-image(:src="photo" @click="show = true" style="max-width: 50px;")
            van-field(type="text" v-model="chatText" placeholder="输入内容")
            van-button(color="#A4ABC0" @click="websocketsend") 发送
        van-action-sheet(v-model="show" :actions="actions" @select="onSelect")
        input(type="file" accept="image/*,video/*" style="display: none" id="file2")
        input(type="file" accept="video/*" capture="camcorder" style="display: none" id="file1")
        van-popup(v-model="clientShow" position="top")
            van-image(:src="clientBg" class="client")
                .client_message(style="position: absolute; top:20px; left: 0; width: 100%;")
                    van-image(:src="client.headImgUrl" width="80" height="80")
                    p(style="margin: 5px 0; color: white") {{ client.adminName }}
                    p(style="margin: 0; color: white") {{ client.phone }}
                van-cell(center title="消息推送" style="text-align: left")
                    template(right-icon)
                        van-switch(v-model="checked" size="24" active-color="#07c160")
        van-dialog(v-model="file.bool" :title="file.title" show-cancel-button style="height: 300px" @confirm="websocketsend")
            van-loading(v-if='file.load')
            img(:src="file.value" style="height: 155px" v-if="file.type == 1")
            video(:src="file.value" controls="controls" style="height: 155px" v-if="file.type == 2")

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
            pageTop: false,
            client: {},
            actions: [
                { name: '视频', id: 1 },
                { name: '相机', id: 2 }
            ],
            formData: new FormData(),
            file: {
                bool: false,
                load: true,
                type: 2,
                title: '上传中',
                value: ''
            }
        }
    },
    methods: {
        onSelect (params) {
            document.querySelector(`#file${params.id}`).click()
            document.querySelector(`#file${params.id}`).onchange = (file) => {
                // console.log(file)
                // console.log(file.srcElement.files[0])
                // console.log(file.srcElement.files[0].type) // video image
                this.file.bool = true
                this.formData.append('file', file.srcElement.files[0], 'machine_' + Math.random())
                var xml = new XMLHttpRequest()
                xml.open('post', `https://file.zgksx.com/${/video/g.test(file.srcElement.files[0].type) ? 'video_file_upload' : 'picture_file_upload'}`, true)
                xml.onreadystatechange = () => {
                    if (xml.readyState == 4 && xml.status == 200) {//eslint-disable-line
                        let $ms = JSON.parse(xml.responseText)
                        if ($ms.state != 200) {//eslint-disable-line
                            this.$toast('上传失败!')
                            this.file = {
                                load: false,
                                title: '上传失败',
                                value: ''
                            }
                            return false
                        }
                        this.file = {
                            type: /video/g.test(file.srcElement.files[0].type) ? 2 : 1,
                            value: $ms.data.path,
                            load: false,
                            title: '上传成功!, 是否发送',
                            bool: true
                        }
                    }
                }
                xml.send(this.formData)
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
            const ws = `${this.URL.ws + this.$route.query.workId}?token=${sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')).asset.secret : ''}`
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
            if (!this.chatText && !this.file.value) {
                return false
            }
            this.bscok.send(JSON.stringify({
                content: this.file.value ? this.file.value : this.chatText,
                contentType: this.file.value ? this.file.type : 0
            }))
            this.chatText = ''
            this.file = {
                title: '上传中',
                bool: false
            }
        },
        websocketclose (e) { // 关闭
            console.log('断开连接', e)
        },
        autoHeight () {
            setTimeout(() => {
                var t = document.querySelector('.chat').offsetHeight
                window.scroll({ top: t, left: 0, behavior: 'smooth' })
            }, 1000)
        },
        pageTopFn () {
            let top = document.documentElement.scrollTop || document.body.scrollTop
            if (this.oldChat.length < 10) {
                return
            }
            if (top < 10) {//eslint-disable-line
                this.pageTop = true
            } else {
                this.pageTop = false
            }
        },
        page (param) {
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
                // params.data.page.records = [{
                //     content: 'https://www.zgksx.com/file/workVideo/082316001825795129.mp4',
                //     contentType: 2,
                //     createTime: '123123123',
                //     isCustomer: 1,
                //     senderId: 0,
                //     senderName: '123',
                //     workId: '12313'
                // }, {
                //     content: 'https://img.yzcdn.cn/vant/apple-3.jpg',
                //     contentType: 1,
                //     createTime: '123123123',
                //     isCustomer: 0,
                //     senderId: 0,
                //     senderName: '123',
                //     workId: '12313'
                // }, {
                //     content: '阿萨大大撒旦大苏打实打实的啊实打实的阿萨大大撒旦大苏打实打实的啊实打实的阿萨大大撒旦大苏打实打实的啊实打实的',
                //     contentType: 0,
                //     createTime: '123123123',
                //     isCustomer: 1,
                //     senderId: 0,
                //     senderName: '123',
                //     workId: '12313'
                // }, {
                //     content: 'https://www.zgksx.com/file/workVideo/082316001825795129.mp4',
                //     contentType: 2,
                //     createTime: '123123123',
                //     isCustomer: 0,
                //     senderId: 0,
                //     senderName: '123',
                //     workId: '12313'
                // }, {
                //     content: 'https://img.yzcdn.cn/vant/apple-3.jpg',
                //     contentType: 1,
                //     createTime: '123123123',
                //     isCustomer: 1,
                //     senderId: 0,
                //     senderName: '123',
                //     workId: '12313'
                // }, {
                //     content: '阿萨大大撒旦大苏打实打实的啊实打实的阿萨大大撒旦大苏打实打实的啊实打实的阿萨大大撒旦大苏打实打实的啊实打实的',
                //     contentType: 0,
                //     createTime: '123123123',
                //     isCustomer: 1,
                //     senderId: 0,
                //     senderName: '123',
                //     workId: '12313'
                // }]
                this.oldChat.length > 0 ? this.oldChat = params.data.page.records.reverse().concat(this.oldChat) : this.oldChat = params.data.page.records.reverse()
                // this.oldChat.length > 0 ? this.oldChat = this.oldChat.concat(params.data.page.records) : this.oldChat = params.data.page.records
                if (param) {
                    this.pageTop = false
                } else {
                    this.autoHeight()
                }
            })
        }
    },
    destroyed () {
        this.bscok.close() // 离开路由之后断开websocket连接
    },
    created () {
        window.onscroll = () => {
            this.pageTopFn()
        }
        this.initWebSocket()
        this.page()
    }
}
</script>

<style lang="scss" scoped>
.container {
    .chat{
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
                    width: 300px;
                    text-align: left;
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
                text-align: left;
                .time{
                    font-size: 10px;
                    position: absolute;
                    bottom: -20px;
                    right: 0;
                    width: 300px;
                    text-align: right;
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
        z-index: 999;
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
            flex: 2;
        }
    }
}
</style>
