"use strict";
import '../stylesheets/style.min.css';
import './router';
import axios from 'axios';
import qs from 'qs';

// const URLs = `http://39.108.49.246`;
// const URLfiles = `http://120.24.108.93`;

const URLs = `http://sapi.coffeedz.com/`;
const URLfiles = `http://sfile.coffeedz.com/`;




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
        this.dom = document.querySelector('.submit');
        this.clone = document.querySelector('.module');
        this._submit_ = this._submit_(location.href.substring(location.href.lastIndexOf('/') + 1).split('.')[0]);
        this.bool = true;
    }

    GETURI(){
		var req = new RegExp("(^|&)" + arguments[0] + "=([^&]*)(&|$)", "i") ,res = window.location.search.substr(1).match(req);
		if(res != null) return decodeURI(res[2]);
		return null;
	}

    _input_() {
        document.querySelectorAll('input').forEach((element, index) => {
            if (element.name != 'installPic' && element.name != 'nameplatePic') {  //这里排除对图片的 校验提示 
                this.data[element.name] = element.value.replace(/\s+/g, '') + `|${element.getAttribute('placeholder')}`;
            }
        });
    }

    _submit_(params) {

        try {
            switch (params) {
                case 'index':
                    document.querySelector('input[name=machineSn]').value = this.GETURI('machineSn');
                    document.querySelectorAll('.pullimage').forEach((element, index) => {  // 图片上传
                        document.querySelectorAll('.pullimage')[index].onclick = domain => {
                            this._image_(element.name, index);  //触发图片上传
                        }
                    });
                    document.querySelectorAll('input[name=address]')[0].onclick = this._address_(); //地址选择事件
                    document.querySelector('#ifremes').onclick = () => {
                        this._show_('.iframes');
                    };
                    document.querySelector('.sub').onclick = () => {
                        document.querySelector('input[name=success]').checked = "checked";
                        document.querySelector('.submit').style.backgroundColor = '#dc282a';
                        this._clone_('.iframes');
                    }
                    this._enlarge_(); //注册示意图放大事件

                    // 《延保协议》窗口高度
                    this.h = window.innerHeight - (window.innerHeight / 4);
                    document.querySelector('.iframes').style.height = this.h + 'px';

                    break;
                default:
                    throw new Error('not page action!');
                    
            }
            this.dom.onclick = (param = {}) => {  //提交
                try {
                    this._input_();  //输出表单 内容
                    Object.keys(this.data).forEach((element, index) => {  //检测 表单内容
                        if (Object.values(this.data)[index].split('|')[0] != '') {
                            if (params == 'login') {
                                if (!this.bool) {
                                    throw new Error('进行中,可能网络稍有延迟~~~');
                                }
                                this.bool = false;
                                axios.get('check_activate?machineSn=' + Object.values(this.data)[index].split('|')[0]).then((params) => {
                                    this.bool = true;
                                    if (params.data.state == 200) {
                                        sessionStorage.setItem('sn', params.data.data.machineSn);
                                        if (params.data.data.isActivate == 0) {
                                            location.href = `./index.html?machineSn=${this.data['machineSn'].split('|')[0]}`;
                                        } else {
                                            location.href = `./quality.html?machineSn=${this.data['machineSn'].split('|')[0]}`;
                                        }
                                    } else {
                                        this._alert_(params.data.msg, 1000);
                                    }
                                })
                            }
                        } else {
                            throw new Error(Object.values(this.data)[index].split('|')[1] != 'null' ? Object.values(this.data)[index].split('|')[1] : `'${element}' cannot be empty!`);
                        }
                    });
                    
                    Object.keys(this.data).forEach((element, index) => {
                        param[element] = Object.values(this.data)[index].split('|')[0];
                    });

                    if (params == 'index') {
                        if(document.querySelector('input[name=success]').checked != true){
                            // this._alert_('请同意服务协议', 1000);
                            this._show_('.iframes');  //显示 条款内容
                            return false;
                        }
                        param['district'] = param['province'].split(',')[2] || -1;
                        param['city'] = param['province'].split(',')[1] || -1;
                        param['province'] = param['province'].split(',')[0] || -1;
                        if (!this.bool) {
                            throw new Error('进行中,可能网络稍有延迟~~~');
                        }
                        this.bool = false;
                        axios.post('commit_activate', qs.stringify(param)).then(params => {
                            this.bool = true;
                            if (params.data.state == 200) {
                                // this._alert_(params.data.msg, 1000);
                                this._show_('.alx-module');
                                document.querySelector('.alx-module').onclick = function () {   // 点击任何都跳转 设备状态详情
                                    location.href = `./quality.html?machineSn=${param.machineSn}`;
                                }
                                this.clone.onclick = () => {
                                    location.href = `./quality.html?machineSn=${param.machineSn}`;
                                };
                                sessionStorage.setItem('page', true);
                            } else {
                                this._alert_(params.data.msg, 1000);
                                // if(sessionStorage.getItem('page')){
                                //     this._show_('.alx-module');
                                // }
                            }
                        })
                            .catch(function (error) {
                                console.log(error)
                            })
                    }else if(params == 'repair'){
                        if(document.querySelector('textarea').value == ''){
                            throw new Error('请填写故障内容！');
                        }

                        if(!(/^1[3456789]\d{9}$/.test(param.contactPhone))){
                            throw new Error('请输入正确的手机号码！');
                        }

                        param['faultComment'] = document.querySelector('textarea').value;

                        axios.post('commit_repairs', qs.stringify(param)).then(params => {
                            this.bool = true;
                            if (params.data.state == 200) {
                                location.href = location.href + `?successfull=${ params.data.data.dealer }*${ params.data.data.dealerPhone }`;
                            } else {
                                // this._alert_(params.data.msg, 1000);
                                this._show_('.alx-module');
                                document.querySelector('.show').onclick = () => {
                                    this._clone_('.alx-module');
                                }
                            }
                        })
                            .catch(function (error) {
                                console.log(error)
                            })
                    }
                } catch (error) {
                    this._alert_(error, 1000);
                }
            };
        } catch (error) {
            console.log(error);
        }
    }

    _address_() {  // 地址选择
        let that = this;
        new PickerExtend({
            trigger: '#address',
            title: '单项选择',
            wheels: [{ data: city }],
            position: [1], //初始化定位
            callback: function (indexArr, data) {
                document.querySelectorAll('input[name=province]')[0].value = (() => {
                    let code = [];
                    data.forEach(element => {
                        code.push(element.value);
                    });
                    that.data['address'] = code.join(',');
                    return code;
                })()
            }
        });
    }

    _enlarge_(params) {  //放大图片
        document.querySelectorAll('.sketchmap').forEach((element, index) => {
            element.onclick = domain => {
                this._show_('.image-show');
                let srcurl = document.querySelectorAll('.sketchmap>img')[index].getAttribute('src');
                document.querySelectorAll('.image-show>img')[0].setAttribute('src', srcurl);
            }
        })
    }

    _alert_(xml, timeout, timer = null) {  //提示框
        document.querySelector('.text-mudule').innerHTML = xml;
        document.querySelector('.text-mudule').style.display = 'block';
        timer = setTimeout(() => {
            document.querySelector('.text-mudule').style.display = 'none';
            timer = null;
        }, timeout)
    }

    _show_(className) {  //显示方法
        document.querySelector('.module').style.display = 'block';
        document.querySelectorAll(className).forEach((element, index) => {
            document.querySelectorAll(className)[index].style.display = 'block';
        });
        this.clone.onclick = () => {
            this._clone_(className);
        };
    }

    _clone_(className) {  //隐藏方法
        document.querySelector('.module').style.display = 'none';
        document.querySelectorAll(className).forEach((element, index) => {
            document.querySelectorAll(className)[index].style.display = 'none';
        });
    }

    _image_(name, index) {
        let that = this;
        // document.getElementsByClassName(name)[0].click();
        document.querySelector(`input[name=${name}]`).click();
        document.querySelector(`input[name=${name}]`).onchange = function (e) {
            var localFile = this.files[0];
            var reader = new FileReader();
            var content;
            reader.onload = function (event) {
                content = event.target.result;
                document.querySelectorAll('.pullimage')[index].setAttribute('src', content);
                compress(content, 450, function (contentFile) {
                    let _$file = new FormData();
                    _$file.append('file', contentFile, 'machineNumber_' + Math.random() + '.png');
                    axios({
                        method: "POST",
                        url: URLfiles + 'picture_file_upload',
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
                                // document.querySelectorAll('.pullimage')[index].nextElementSibling.innerHTML = '上传图片进度' + (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';
                                // if (progressEvent.total % progressEvent.loaded == +false) {
                                //     setTimeout(() => {
                                //         document.querySelectorAll('.pullimage')[index].nextElementSibling.innerHTML = '';
                                //     }, 2000)
                                // }
                            }
                        }
                    }).then(
                        response => {
                            if (response.data.state == 200) {
                                // document.querySelectorAll('.pullimage')[index].setAttribute('src', response.data.data.path);
                                that.data[name] = response.data.data.path;
                            } else {
                                document.querySelectorAll('.pullimage')[index].setAttribute('src', '');
                                that._alert_(response.data.msg, 1000);
                            }
                        }
                    ).catch((error) => {
                        console.log(error);
                    })
                });
            };
            reader.onerror = function () {
                alert("error");
            };
            reader.readAsDataURL(localFile, "UTF-8");
        }
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
}

window.addEventListener('DOMContentLoaded', new init());

window.onload = function (params) {
    new Vue({
        el: '#app',
        template: `<van-button>按钮</van-button>`
      });
      // 调用函数组件，弹出一个 Toast
      vant.Toast('提示');

      // 通过 CDN 引入时不会自动注册 Lazyload 组件
      // 可以通过下面的方式手动注册
      Vue.use(vant.Lazyload);

      Vue.use(vant.Lazyload, {
        lazyComponent: true
        });
}