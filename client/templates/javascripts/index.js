"use strict";
import '../stylesheets/style.min.css';
import './router';
import axios from 'axios';
import qs from 'qs';

const URLs = `https://admin.api.zgksx.com/`;
const URLFiles = `https://file.zgksx.com/`;
const wxUri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx998479db1176209a&redirect_uri=
                ${ process.env.NODE_ENV == "development" ? "http://zgksx.com/por/anchor/" : location.href.split('?')[0]}
                &response_type=code&scope=snsapi_userinfo&state=
                ${ process.env.NODE_ENV == "development" ? location.href.split('?')[0] : null}
                #wechat_redirect`.replace(/ /g, '');

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
            setTimeout(() => {
                if(/未登录/.test(response.data.msg)){
                    localStorage.clear();
                    location.href = location.href.replace(location.href.substring(location.href.lastIndexOf('/')), '/index.html');
                };
            }, 1000)
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
                    active: /order/.test(location.href) ? 1 : /user/.test(location.href) ? 2 : 0,
                    username: '',
                    password: '',
                    phone: '',
                    oldpwd: '',
                    image: '../images/banner.png',
                    contentMsg: false,
                    items: [],
                    activeId: 1,
                    activeIndex: 0,
                    tag: 0,
                    num: 1,
                    machineList: [],
                    shopName: '',
                    contactName: '',
                    contactPhone: '',
                    faultContent: '',
                    machine: {
                        machineName: '选择设备'
                    },
                    list: [],
                    loading: false,
                    finished: false,
                    refreshing: false,
                    fileList: [{
                        status: 'uploading',
                        message: '上传中...',
                    }],
                    fileLists: [],
                    fileListss: [],
                    fileImages: [],
                    handling: false,
                    loadingShow: false,
                    show: true,
                    workList: [],
                    logs: [],
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
                    ]),
                    creationType: new Map([
                        [1, '手动提交(管理端)'],
                        [2, '个人用户提交(小程序)'],
                        [3, '企业用户提交(公众号)']
                    ]),
                    status: new Map([
                        [1, '待沟通'],
                        [2, '待派单'],
                        [3, '已派单'],
                        [4, '已完成'],
                        [18, '已提交'],
                        [19, '已取消']
                    ]),
                    search: "",  //工单列表的查询字段
                    secrHeight: `height:${window.innerHeight - 151 }px;overflow: auto;`,  //工单内容高度
                },
                created: function () {
                    this.loadingShow = true;
                    let _arr_ = [];
                    if (/content/.test(location.href)) {
                        this.containers();
                        this.thisPosition();
                        axios.get('wechat_machine_list')
                            .then(params => {
                                setTimeout(() => {
                                    this.show = false;
                                    this.loadingShow = false;
                                }, 1000)
                                if (params.data.state == 200) {
                                    axios.post('sys_repairs_type_list', qs.stringify({
                                        page: 1,
                                        pageSize: 1000
                                    }))
                                        .then(res => {
                                            if (res.data.state == 200) {
                                                params.data.list.map((item, index) => {
                                                    _arr_.push({ text: item.machineName })
                                                    _arr_[index]['children'] = [];
                                                    res.data.page.records.forEach(element => {
                                                        _arr_[index]['children'].push({
                                                            text: element.repairsTypeName,
                                                            id: element.repairsTypeId,
                                                            parentId: item.machineId,
                                                            parentName: item.machineName
                                                        })
                                                    })

                                                })
                                                this.items = _arr_;

                                            } else {
                                                vant.Toast(params.data.msg)
                                            };
                                        });
                                } else {
                                    vant.Toast(params.data.msg)
                                };
                            }).catch((error) => {
                                console.info(error)
                                this.loadingShow = false;
                                vant.Toast('发生错误' + JSON.stringify(error))
                            })
                    } else if (/order/.test(location.href)) {
                        this.containers();
                        this.thisPosition();
                        this.onLoad();
                    } else if (/user/.test(location.href)) {
                        this.containers();
                        this.thisPosition();
                        axios.get('sys_admin_detail').then(params => {
                            setTimeout(() => {
                                this.show = false;
                                this.loadingShow = false;
                            }, 1000)
                            if (params.data.state == 200) {
                                this.username = params.data.data.adminName;
                                this.phone = params.data.data.phone;
                            } else {
                                vant.Toast(params.data.msg)
                            }
                        })
                    } else if (/details/.test(location.href)) {
                        this.containers();
                        axios.get('sys_work_detail?workId='+ this.getQueryString('workId')).then(params => {
                            setTimeout(() => {
                                this.show = false;
                                this.loadingShow = false;
                            }, 1000)
                            if (params.data.state == 200) {
                                this.workList = [];
                                Object.keys(params.data.data).forEach((element, index) => {
                                    if(this.alias.get(element)){
                                        if(element == 'machineBrandPic'|| element == 'machineOverallPic'|| element == 'faultPartPic'){
                                            this.workList.push({name: this.alias.get(element), value: '', view: Object.values(params.data.data)[index]})
                                        }else{
                                            if(element == 'creationType'){
                                                this.workList.push({name: this.alias.get(element), value: this.creationType.get(parseInt(Object.values(params.data.data)[index]))})
                                            }else{
                                                if(element == 'status'){
                                                    this.workList.push({name: this.alias.get(element), value: this.status.get(Object.values(params.data.data)[index]), anchor: Object.values(params.data.data)[index]})
                                                }else{
                                                    this.workList.push({name: this.alias.get(element), value: Object.values(params.data.data)[index] == -1 ? '无': Object.values(params.data.data)[index], tag: element})
                                                }
                                            }
                                            
                                        }
                                    }
                                })
                            } else {
                                vant.Toast('获取数据异常！请重试');
                                setTimeout(() => {
                                    location.href = './order.html';
                                }, 500)
                            }
                        })
                    } else if (/logs/.test(location.href)) {
                        this.containers();
                        axios.get('work_log_list?workId='+ this.getQueryString('workId')).then(params => {
                            setTimeout(() => {
                                this.show = false;
                                this.loadingShow = false;
                            }, 1000)
                            if (params.data.state == 200) {
                                this.logs = [];
                                this.logs = params.data.list;
                            } else {
                                vant.Toast('获取数据异常！请重试')
                                setTimeout(() => {
                                    location.href = './order.html';
                                }, 500)
                            }
                        })
                    } else {
                        setTimeout(() => { this.show = false; }, 1200);
                        this.containers();
                        if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != 'micromessenger') return false;
                        localStorage.getItem('secret') ? (() => {
                            // 0 未绑定 1 已绑定
                            if (/hasBind/g.test(localStorage.getItem('secret'))) {
                                if (JSON.parse(localStorage.getItem('secret')).hasBind < 1) return false;
                                localStorage.setItem('secret', JSON.parse(localStorage.getItem('secret')).loginResult.secret);
                            }
                            location.href = `./content.html`;
                        })() : !/code/g.test(location.href) ? location.href = wxUri : (() => {
                            axios.post('admin_repairs_wechat_login', qs.stringify({
                                code: this.getQueryString("code")
                            }))
                                .then(params => {
                                    if (params.data.state == 200) {
                                        if (params.data.data.hasBind < 1) {
                                            localStorage.setItem('secret', JSON.stringify(params.data.data));
                                            return false;
                                        }
                                        localStorage.setItem('secret', params.data.data.loginResult.secret);
                                        location.href = `./content.html`;
                                    } else {
                                        if (/code/.test(params.data.msg)) {
                                            vant.Toast('获取的指令已失效！请退出重试');
                                            return false;
                                        }
                                        vant.Toast(params.data.msg);
                                        setTimeout(() => {
                                            /未绑定/g.test(params.data.msg) ? location.href = `./index.htm?outch_wx=${location.href.split('?')[0]}` : null;
                                        }, 1000);
                                    }
                                }).catch((error) => {
                                    console.info(error)
                                    vant.Toast('发生错误' + JSON.stringify(error))
                                })
                        })();
                    }
                },
                methods: {
                    containers(){
                        setTimeout(() => {
                            document.querySelector('.container').style.display = 'block';
                        }, 1000)
                    },
                    href(){
                        location.href = './logs.html?workId=' + this.getQueryString('workId');
                    },
                    thisPosition(){
                        if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
                            setTimeout(() => {
                                this.$nextTick(function () {
                                    document.querySelector('.van-tabbar').style.position = 'absolute';
                                })
                            }, 1100)
                        }
                    },
                    getQueryString(n) {
                        var reg = new RegExp("(^|&)" + n + "=([^&]*)(&|$)", "i");
                        var e = window.location.search.substr(1).match(reg);
                        if (e) return unescape(e[2]);
                        return null;
                    },
                    onSelect(params) {
                        this.machine = {
                            machineId: params.parentId,
                            repairsTypeId: params.id,
                            machineName: params.parentName + '>' + params.text || '选择设备'
                        };
                        this.contentMsg = false;
                    },

                    submit() {
                        this.handling = true;
                        let pic = {
                            machineBrandPic: [],
                            machineOverallPic: [],
                            faultPartPic: []
                        }
                        if (this.fileImages.length > 0) {
                            this.fileImages.forEach(item => {
                                pic[item.isImage.key].push(item.url);
                            })
                        }
                        axios.post('wechat_commit_work', qs.stringify({
                            machineId: this.machine.machineId,
                            repairsTypeId: this.machine.repairsTypeId,
                            shopName: this.shopName,
                            contactName: this.contactName,
                            contactPhone: this.contactPhone,
                            faultContent: this.faultContent,
                            machineBrandPic: pic.machineBrandPic.toString(),
                            machineOverallPic: pic.machineOverallPic.toString(),
                            faultPartPic: pic.faultPartPic.toString()
                        }))
                            .then(params => {
                                setTimeout(() => {
                                    this.handling = false;
                                }, 1000);
                                if (params.data.state == 200) {
                                    vant.Toast(params.data.msg);
                                    location.href = './order.html';
                                } else {
                                    vant.Toast(params.data.msg)
                                };
                            })
                    },

                    onSubmit(values) {
                        this.handling = true;
                        let wechatIds = "";
                        if(localStorage.getItem('secret')){
                            try {
                                if(JSON.parse(localStorage.getItem('secret')).wechatResult) wechatIds = JSON.parse(localStorage.getItem('secret')).wechatResult.wechatId;
                            } catch (error) {
                                console.info(error);
                            }
                            
                        }
                        axios.post('admin_account_login', qs.stringify({
                            account: values.user,
                            password: values.pass,
                            wechatId: wechatIds,
                        }))
                            .then(params => {
                                this.handling = false;
                                if (params.data.state == 200) {
                                    localStorage.setItem('secret', params.data.data.secret);
                                    location.href = './content.html';
                                } else {
                                    vant.Toast(params.data.msg)
                                };
                            });
                    },

                    preview(params) {
                        vant.ImagePreview(params.split(','))
                    },

                    updataSubmit() {
                        this.handling = true;
                        axios.post('edit_current_admin', qs.stringify({
                            adminName: this.username,
                            phone: this.phone,
                            originPassword: this.oldpwd,
                            password: this.password
                        }))
                            .then(params => {
                                this.handling = false;
                                if (params.data.state == 200) {
                                    localStorage.clear();
                                    vant.Toast(params.data.msg + '，修改成功，请重新登陆');
                                    setTimeout(() => {
                                        location.href = './index.html';
                                    }, 1500);
                                } else {
                                    vant.Toast(params.data.msg)
                                };
                            });
                    },

                    ourHref(params) {
                        params < 1 ? location.href = './content.html' : params > 1 ? location.href = './user.html' : location.href = './order.html';
                    },

                    page(params){
                        location.href = `./details.html?workId=${params}`
                    },

                    onLoad() {
                        if (this.refreshing) {
                            this.list = [];
                            this.refreshing = false;
                        }
                        axios.get('wechat_admin_work_list', {
                            params: {
                                status: this.tag > 0 ? this.tag : '',
                                page: this.num,
                                pageSize: 20,
                                key: this.search
                            }
                        })
                            .then(params => {
                                this.show = false;
                                this.loadingShow = false;
                                if (params.data.state == 200) {
                                    params.data.page.records.map((element, index) => {
                                        params.data.page.records[index]['work'] = '工单号：' + element.workId;
                                        params.data.page.records[index]['contact'] = '联系人：' + element.contactName + '，联系电话：' + element.contactPhone;
                                        params.data.page.records[index]['src'] = 'https://www.zgksx.com/file/machinePic/041509001276628133.png';
                                    })
                                    this.list.length > 0 ? this.list = this.list.concat(params.data.page.records) : this.list = params.data.page.records;

                                    // 加载状态结束
                                    this.loading = false;
                                    this.removex();
                                    this.num++;

                                    if (params.data.page.records.length < 10) this.finished = true;

                                } else if (params.data.state == 300) {   //数据空
                                    this.loading = false;
                                    this.finished = true;
                                } else {
                                    this.loading = false;
                                    this.finished = true;
                                    this.num = 1;
                                    vant.Toast(params.data.msg)
                                };
                            });
                    },

                    removex() {
                        this.$nextTick(function () {
                            let x = document.querySelectorAll('.van-card__num');
                            x.forEach(element => {
                                element.innerHTML = element.innerHTML.replace(/x/g, '');
                            })
                        })
                    },

                    onRefresh() {
                        // 清空列表数据
                        this.finished = false;
                        // 重新加载数据
                        // 将 loading 设置为 true，表示处于加载状态
                        this.loading = true;
                        this.num = 1;
                        this.onLoad();
                    },

                    test(file){
                        console.log(file)
                        file.status = 'uploading';
                        file.message = '上传中...';
                    },

                    updataFile(params) {
                        
                        return file => {
                            console.log(file)
                            file.status = 'uploading';
                            file.message = '上传中...';

                            return false;
                            
                            file.status = 'uploading';
                            var localFile = file.file;
                            var reader = new FileReader();
                            var content;
                            let arr = [];
                            reader.onload = (event) => {
                                content = event.target.result;
                                compress(content, 450, (contentFile) => {
                                    let _$file = new FormData();
                                    _$file.append('file', contentFile, 'machineNumber_' + Math.random() + '.png');
                                    axios({
                                        method: "POST",
                                        url: URLFiles + 'picture_file_upload',
                                        data: _$file,
                                        processData: false,
                                        traditional: true,
                                        contentType: false,
                                        headers: {
                                            "Content-Type": false
                                        },
                                        transformRequest: [function (data) {
                                            return data
                                        }],
                                        onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
                                            if (progressEvent.lengthComputable) {
                                            }
                                        }
                                    }).then(
                                        response => {
                                            if (response.data.state == 200) {
                                                setTimeout(() => {
                                                    file.status = 'done';
                                                    // this.fileImages.forEach(element => {
                                                    //     arr = this.fileList.concat(this.fileLists, this.fileListss);  //合并数组
                                                    //     arr.forEach(repeat => {
                                                    //         console.log(repeat.file.name)
                                                    //         console.log(element.isImage.localName)
                                                    //         if(repeat.file.name == element.isImage.localName){
                                                    //             vant.Toast('这个图片已经上传过了!');
                                                    //             return false;
                                                    //         }
                                                    //     })
                                                    // })
                                                    this.fileImages.push({ url: response.data.data.path, isImage: { key: params, localName: file.file.name } });
                                                }, 1000)
                                            } else {
                                                vant.Toast(response.data.msg)
                                            }
                                        }
                                    ).catch((error) => {
                                        console.log(error);
                                    })
                                })
                            };
                            reader.onerror = function () {
                                alert("error");
                            };
                            reader.readAsDataURL(localFile, "UTF-8");
                            function compress(content, size, callback) {  //压缩拍摄上传
                                if (content.length <= size * 1024) {
                                    callback(dataURItoBlob(content));
                                    return;
                                }
                                let canvas = document.createElement("canvas");
                                let ctx = canvas.getContext("2d");
                                let img = new Image();
                                img.src = content;
                                img.onload = function () {
                                    let width = img.width;
                                    let height = img.height;
                                    canvas.width = width;
                                    canvas.height = height;
                                    // 铺底色
                                    ctx.fillStyle = "#fff";
                                    ctx.fillRect(0, 0, width, height);
                                    ctx.drawImage(img, 0, 0, width, height);
                                    let rate = (1024 * size) / content.length;
                                    console.log(content.length * 1024);
                                    //进行压缩
                                    content = canvas.toDataURL("image/jpeg", 0.2);
                                    //压缩后
                                    console.log(content.length * 1024);
                                    let blob = dataURItoBlob(content);
                                    callback(blob);
                                };
                            }
                            /**
                             * base64 转二进制文件
                             * @param {*} base64Data 
                             */
                            function dataURItoBlob(base64Data) {
                                var bytes = window.atob(base64Data.split(',')[1]); //去掉url的头，并转换为byte

                                //处理异常,将ascii码小于0的转换为大于0
                                var ab = new ArrayBuffer(bytes.length);
                                var ia = new Uint8Array(ab);
                                for (var i = 0; i < bytes.length; i++) {
                                    ia[i] = bytes.charCodeAt(i);
                                }
                                return new Blob([ab], {
                                    type: 'image/png'
                                });
                            }
                        }

                    },

                    deleteFn(params) {
                        return file => {
                            let _arr_ = [];
                            this.fileImages.forEach(element => {
                                if (file.file.name != element.isImage.localName) {
                                    _arr_.push(element)
                                }
                            })
                            this.fileImages = _arr_;
                            return true;
                        }
                    }

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
            console.info(error);
        }
    }, 500)
}