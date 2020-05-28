"use strict";
import '../stylesheets/style.min.css';
import './router';
import axios from 'axios';
import qs from 'qs';

const URLs = `https://admin.api.zgksx.com/`;

axios.defaults.baseURL = URLs;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = localStorage.getItem('secret') || ''; // 设置请求头为 Authorization
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
                    active: /order/.test(location.href) ? 1 : 0,
                    username: '',
                    password: '',
                    image: '../images/banner.png',
                    show: false,
                    actions: [],
                    radio: "",
                    contentMsg: true,
                    result: [],
                    tag: 0,
                    machineList: []
                },
                created: function () {
                    document.querySelector('.module').style.display = 'none';
                    let item = this;
                    if (/machine/.test(location.href)) {
                        axios.get('/wechat_machine_list')
                            .then(params => {
                                if (params.data.state == 200) {
                                    item.machineList = params.data.list;
                                } else {
                                    vant.Toast(params.data.msg)
                                };
                            });
                    } else if (/content/.test(location.href)) {
                        axios.get('/wechat_demand_list?repairsTypeId=' + JSON.parse(sessionStorage.getItem('machine')).repairsTypeId)
                            .then(params => {
                                if (params.data.state == 200) {
                                    params.data.list.map(element => {
                                        if (element.isMultiple > 0) {  //多选

                                        } else {
                                            this.machineList = element.items
                                        }
                                    })
                                    console.info(this.machineList)
                                } else {
                                    vant.Toast(params.data.msg)
                                };
                            });
                    }
                },
                methods: {
                    changMachine(params) {
                        let _arr_ = [];
                        params.items.map(item => {
                            _arr_.push({ name: item.repairsTypeName, repairsTypeId: item.repairsTypeId, machineId: params.machineId })
                        })
                        this.actions = _arr_;
                        this.show = true;
                    },

                    onSelect(params) {
                        // 默认情况下点击选项时不会自动收起
                        // 可以通过 close-on-click-action 属性开启自动收起
                        this.show = false;
                        sessionStorage.setItem('machine', JSON.stringify({ repairsTypeId: params.repairsTypeId, machineId: params.machineId }))
                        location.href = `./content.html`;
                    },
                    radiofn(params) {
                        console.log(params);
                        // this.radio = params.toString();
                    },

                    checkboxfn(params) {
                        // this.$refs.checkboxGroup[params].toggle()
                    },

                    onSubmit(values) {
                        axios.post('admin_account_login', qs.stringify({
                            account: values.user,
                            password: values.pass
                        }))
                            .then(params => {
                                if (params.data.state == 200) {
                                    localStorage.setItem('secret', params.data.data.secret);
                                    location.href = './machine.html';
                                } else {
                                    vant.Toast(params.data.msg)
                                };
                            });
                    },

                    ourHref(params) {
                        params < 1 ? location.href = './machine.html' : location.href = './order.html';
                    }
                }
            });
            // 通过 CDN 引入时不会自动注册 Lazyload 组件
            // 可以通过下面的方式手动注册
            Vue.use(vant.Lazyload);
        } catch (error) {
            if(/vant/.test(error)){
                location.href = location.href;
            }
            console.info(error);
        }
    }, 0)
}