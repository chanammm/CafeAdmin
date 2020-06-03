"use strict";
import '../stylesheets/style.min.css';
import './router';
import axios from 'axios';
import qs from 'qs';

const URLs = `https://admin.api.zgksx.com/`;
const wxUri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx998479db1176209a&redirect_uri=
                ${ process.env.NODE_ENV == "development" ? "http://zgksx.com/por/anchor/" : location.href.split('?')[0]}
                &response_type=code&scope=snsapi_base&state=
                ${ process.env.NODE_ENV == "development" ? location.href.split('?')[0] : null}
                #wechat_redirect`.replace(/ /g, '');

axios.defaults.baseURL = URLs;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')).asset.secret : ''; // 设置请求头为 Authorization
//配置发送请求前的拦截器 可以设置token信息 
axios.interceptors.request.use(
    config => {
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')).asset.secret : ''; // 设置请求头为 Authorization
        console.log(sessionStorage.getItem('token'))
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
            // /未登录/.test(response.data.msg) ? location.href = location.href.replace(location.href.substring(location.href.lastIndexOf('/')), '/index.html') : [];
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
if (!Object.values) Object.values = function (obj) {  //对于 object values 的支持
    if (obj !== Object(obj))
        throw new TypeError('Object.values called on a non-object');
    var val = [], key;
    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            val.push(obj[key]);
        }
    }
    return val;
}

window.onload = function (params) {
    setTimeout(() => {
        try {
            new Vue({
                el: '#app',
                data: {
                    show: true,
                    handling: false,
                    workList: [],
                    alias: new Map([
                        ['workId', '工单号'],
                        ['nickName', '微信昵称'],
                        ['machineName', '设备名称'],
                        ['facilityName', '设备别名'],
                        ['repairsTypeName', '报修类型名称'],
                        ['demandChargeName', '需求名称'],
                        ['visitCostStr', '预支付费用'],
                        ['shopName', '门店名称'],
                        ['contactName', '联系人名称'],
                        ['contactPhone', '联系人电话'],
                        ['province', '省'],
                        ['city', '市'],
                        ['district', '区'],
                        ['address', '详细地址'],
                        ['faultContent', '故障描述'],
                        ['machineBrandPic', '机器铭牌图片'],
                        ['machineOverallPic', '机器整体图片'],
                        ['faultPartPic', '故障部分图'],
                        ['status', '状态'],
                        ['maintainPaymentStr', '维修费用'],
                        ['partPaymentStr', '配件费用'],
                        ['maintainerName', '维修师傅'],
                        ['maintainerPhone', '维修师傅电话'],
                        ['creationType', '创建类型'],
                        ['createTime', '创建时间']
                    ])
                },
                created: function () {
                    document.querySelector('.container').style.display = 'block';
                    if (!/work_id/.test(location.href) && !sessionStorage.getItem('work_id')) {
                        vant.Toast('非法进入！');
                        return false;
                    }else{
                        /work_id/.test(location.href) ? sessionStorage.setItem('work_id', this.getQueryString('work_id')) : null;
                    }
                    setTimeout(() => {
                        sessionStorage.getItem('token') ? this.orderDirection() :!/code/g.test(location.href) ? location.href = wxUri : (() => {
                            axios.post('admin_wechat_login', qs.stringify({
                                code: this.getQueryString("code")
                            }))
                            .then(params => {
                                if(params.data.state == 200){
                                    sessionStorage.setItem('token', JSON.stringify({asset: params.data.data}))
                                    this.orderDirection();
                                }else{
                                    if(/code/.test(params.data.msg)){
                                        vant.Toast('获取的指令已失效！请退出重试');
                                        return false;
                                    }
                                    vant.Toast(params.data.msg);
                                }
                            }).catch((error) => {
                                vant.Toast('发生错误'+ JSON.stringify(error))
                            })
                        })();
                        this.show = false;
                    }, 1000);
                },
                methods: {
                    getQueryString(n){
                        var reg = new RegExp("(^|&)" + n + "=([^&]*)(&|$)", "i");
                        var e = window.location.search.substr(1).match(reg);
                        if(e) return unescape(e[2]);
                        return null;
                    },
                    orderDirection: function(){
                        if(sessionStorage.getItem('work_id')){
                            axios.get('sys_work_detail', {
                                params: {
                                    workId: sessionStorage.getItem('work_id')
                                }
                            }).then(params => {
                                if (params.data.state == 200) {
                                    Object.keys(params.data.data).forEach((element, index) => {
                                        if(this.alias.get(element)){
                                            this.workList.push({name: this.alias.get(element), value: Object.values(params.data.data)[index] == -1 ? '无': Object.values(params.data.data)[index]})
                                        }
                                    })
                                    // this.workList = params.data.data;
                                }else{
                                    vant.Toast(params.data.msg);
                                }
                            }).catch(err =>{
                                vant.Toast(JSON.stringify(err));
                            })
                        }
                        // vant.ImagePreview(['https://img.yzcdn.cn/vant/apple-1.jpg'])
                    },
                    preview(params) {
                        console.log(params);
                    },
                },
            });
            // 通过 CDN 引入时不会自动注册 Lazyload 组件
            // 可以通过下面的方式手动注册
            Vue.use(vant.Lazyload);
        } catch (error) {
            if (/vant/.test(error)) {
                let e = '?isNot=1';
                if (/isNot/.test(location.href)) { //存在计数器
                    let n = location.href.substring(location.href.lastIndexOf('?'));
                    n = n.split('=')[1];
                    n = parseInt(n) + 1;
                    e = '?isNot=' + n;
                    if (n > 2) {
                        vant.Toast('貌似网络有点问题！');
                        return false;
                    };
                }
                location.href = location.href.split('?')[0] + e;
            }
        }
    }, 0)
}