"use strict";
import axios from 'axios';
import qs from 'qs';

const URLs = `https://admin.api.zgksx.com/`;
const OpenWechat = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx998479db1176209a&redirect_uri=${ encodeURI(location.href.split('?')[0]) }&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;

axios.defaults.baseURL = URLs;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
//配置发送请求前的拦截器 可以设置token信息 
axios.interceptors.request.use(
    config => {
        // 在发送请求之前做什么
        if (config.method === "post") {
            
        } else {
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    })
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log(error)
        return Promise.reject(error.response);
    }
)
if (!Object.values) Object.values = function(obj) {  //对于 object values 的支持
    if (obj !== Object(obj))
        throw new TypeError('Object.values called on a non-object');
    var val=[],key;
    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj,key)) {
            val.push(obj[key]);
        }
    }
    return val;
}
class init {
    constructor() {
        this.data = {};
        this.push();
    }

    GETURI(){
		var req = new RegExp("(^|&)" + arguments[0] + "=([^&]*)(&|$)", "i") ,res = window.location.search.substr(1).match(req);
		if(res != null) return decodeURI(res[2]);
		return null;
    }
    
    push(){
        if(!this.GETURI('code')){
            localStorage.setItem('_data_', this.GETURI('_data_'));
            location.href = OpenWechat;
        }else{
            console.log(localStorage.getItem('_data_'));
            let data = JSON.parse(localStorage.getItem('_data_'));

            axios.defaults.headers.common['Authorization'] = data.token; // 设置请求头为 Authorization

            axios.post("create_admin_wechat" , qs.stringify({code: this.GETURI('code')}))
            .then(function(response){

                if(response.data.state != 200){
                    alert("服务异常！请退出重试");
                }

                data['wechatId'] = response.data.data.wechatId;
                data['workPush'] = 1;

                axios.post("update_admin", qs.stringify(data))
                .then(function(response){
                    if(response.data.state == 200){
                        alert('绑定成功！');
                    }else{
                        alert("更新失败："+ response.data.msg);
                    }
                    localStorage.clear();
                    WeixinJSBridge.call('closeWindow');
                })

            })
        }
    }

}

window.addEventListener('DOMContentLoaded', new init());