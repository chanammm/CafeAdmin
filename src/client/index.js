"use strict";
import axios from 'axios';
import qs from 'qs';

const URLs = `https://api.zgksx.com:8080/`;
const OpenWechat = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx998479db1176209a&redirect_uri=${ encodeURI(location.href.split('?')[0]) }&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;

axios.defaults.baseURL = URLs;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization
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
        localStorage.setItem('_data_', this.GETURI('_data_'));
        if(!this.GETURI('code')){
            location.href = OpenWechat;
        }else{
            console.log(localstorage.getItem('_data_'));
            let data = JSON.parse(localstorage.getItem('_data_'));
            axios.post("create_admin_wechat" , qs.stringify({code: this.code}))

            .then(function(response){

                data['wechatId'] = response.data.data.wechatId;
                data['workPush'] = 1;

                axios.post("update_admin", qs.stringify(data))
                .then(function(response){
                    alert("ok");
                    localstorage.clear();
                    WeixinJSBridge.call('closeWindow');
                    console.log(response)
                })

            })
        }
    }

}

window.addEventListener('DOMContentLoaded', new init());