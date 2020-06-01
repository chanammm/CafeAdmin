"use strict";
import '../stylesheets/style.min.css';
import './router';
import axios from 'axios';
import qs from 'qs';

const URLs = `https://admin.api.zgksx.com/`;
const URLFiles = `https://file.zgksx.com/`;

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
            /未登录/.test(response.data.msg) ? location.href = location.href.replace(location.href.substring(location.href.lastIndexOf('/')), '/index.html') : [];
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
                    items: [{
                        text: '杭州',
                        children: [],
                    },
                    ],
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
                    fileList: [],
                    fileLists: [],
                    fileListss: [],
                    fileImages: [],
                    handling: false
                },
                created: function () {
                    document.querySelector('.module').style.display = 'none';
                    let _arr_ = [];
                    if (/content/.test(location.href)) {
                        axios.get('wechat_machine_list')
                            .then(params => {
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
                            });
                    } else if (/order/.test(location.href)) {
                        this.onLoad();
                    } else if (/user/.test(location.href)) {
                        axios.get('sys_admin_detail').then(params => {
                            if (params.data.state == 200){
                                this.username = params.data.data.adminName;
                                this.phone = params.data.data.phone;
                            }else{
                                vant.Toast(params.data.msg)
                            }
                        })
                    }
                    if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
                        this.$nextTick(function () {
                            document.querySelector('.van-tabbar').style.position = 'absolute';
                        })
                    }
                },
                methods: {
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
                        if(this.fileImages.length > 0){
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
                                this.handling = false;
                                if (params.data.state == 200) {
                                    vant.Toast(params.data.msg);
                                    setTimeout(() => {
                                        location.href = './order.html';
                                    }, 1000);
                                } else {
                                    vant.Toast(params.data.msg)
                                };
                            })
                    },

                    onSubmit(values) {
                        this.handling = true;
                        axios.post('admin_account_login', qs.stringify({
                            account: values.user,
                            password: values.pass
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

                    updataSubmit(){
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
                                    vant.Toast(params.data.msg+ '，修改成功，请重新登陆');
                                    setTimeout(() => {
                                        location.href = './index.html';
                                    },1500);
                                } else {
                                    vant.Toast(params.data.msg)
                                };
                            });
                    },

                    ourHref(params) {
                        params < 1 ? location.href = './content.html' : params > 1 ? location.href = './user.html' : location.href = './order.html';
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
                                pageSize: 10
                            }
                        })
                            .then(params => {
                                if (params.data.state == 200) {
                                    params.data.page.records.map((element, index) => {
                                        params.data.page.records[index]['work'] = '工单号：' + element.workId;
                                        params.data.page.records[index]['contact'] = '联系人：' + element.contactName + '，联系电话：' + element.contactPhone;
                                        params.data.page.records[index]['src'] = 'https://www.zgksx.com/file/machinePic/041509001276628133.png';
                                    })
                                    this.list = params.data.page.records;
                                    // 加载状态结束
                                    this.loading = false;
                                    this.removex();
                                    this.num++;
                                    if (params.data.page.records.length < 10) this.finished = true;

                                } else if (params.data.state == 300) {   //数据空
                                    this.loading = false;
                                    this.finished = true;
                                    this.list = [];
                                    this.num = 1;
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
                        this.onLoad();
                    },

                    updataFile(params) {
                        return file => {
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
                                                    this.fileImages.push({ url: response.data.data.path, isImage: {key: params, localName: file.file.name} });
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
                        return file =>{
                            let _arr_ = [];
                            this.fileImages.forEach(element => {
                                if(file.file.name != element.isImage.localName){
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
    }, 0)
}