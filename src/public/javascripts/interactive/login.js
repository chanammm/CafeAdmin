if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    window.onload = function (params) {
        document.getElementsByClassName('login')[0].style.width = '100%';
        document.getElementsByClassName('login')[0].style.background = 'none';
    }
}
new Vue({
    el: '#app',
    data: () => {
        return {
            remember: false,  //记住缓存
            user: {
                name: '',  //用户
                pwd: ''		//密码
            },
            loading: false
        }
    },
    created: function () {
        const user = document.getElementById("user"), pwd = document.getElementById("pwd"), itself = this;
        document.addEventListener('DOMContentLoaded', function () {
            sessionStorage.removeItem("token");
            if (localStorage.getItem('remember')) {  //历史账号回显
                itself.remember = true;
                itself.user.name = ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem('remember')).name);
                itself.user.pwd = ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem('remember')).pwd);
            }

            document.onkeydown = function (event) {  //键盘回车出发
                event = event ? event : (window.event ? window.event : null);
                if (event.keyCode == 13) {
                    itself.login();
                };
            };
        });
    },
    methods: {
        IError(err) {
            this.$message.error('错了哦，' + err);
        },
        login() {
            const itself = this;
            itself.loading = true;
            let datra = qs.stringify({
                account: user.value,
                password: pwd.value
            });
            axios.post('admin_account_login', datra)
                .then(params => {
                    params = params.data;
                    if (params.state == 200) {
                        if (!itself.remember) {
                            localStorage.removeItem('remember')
                        } else {
                            localStorage.setItem("remember", JSON.stringify({ name: ym.init.COMPILESTR.encryption(user.value), pwd: ym.init.COMPILESTR.encryption(pwd.value) }));
                        };
                        localStorage.setItem('uri', JSON.stringify({ uri: '../index.htm?hash:ix', title: '首页' }));
                        sessionStorage.setItem("token", JSON.stringify({ asset: params.data }));
                        ym.init.GETURI('outch_wx') ? location.href = ym.init.GETURI('outch_wx'): null;
                        axios.defaults.headers.common['Authorization'] = JSON.parse(sessionStorage.getItem('token')).asset.secret; // 设置请求头为 Authorization
                        axios.post('admin_role_permissions').then(params => {  // 页面权限
                            if(params.data.data.pagePermissions.length < 1){
                                this.IError("无法获取配置，请联系管理员");
                                this.loading = false;
                                return false;
                            }
                            sessionStorage.setItem('_a', JSON.stringify({ _u: ':hash(iox*)', _i: user.value }))  //管理员信息
                            sessionStorage.setItem('tag', JSON.stringify(params.data.data.pagePermissions));
                            setTimeout(() => {
                                location.href = "./views/common/index.htm?hash:" + ym.init.GETRANDOM(8);
                            }, 500);
                        })
                    } else {
                        itself.IError(params.msg);
                        setTimeout(() => {
                            itself.loading = false;
                        }, 500)
                    };
                });
        }
    }
});

function Vercode(params = {}) {  //初始对象方法
    let p = Object.assign({
        lineWidth: 0.5,  // 线条宽度
        lineNum: 2,  // 线条数量
        dotNum: 20, // 点的数量
        dotR: 1, // 点的半径
        foregroundColor: [10, 80], // 前景色区间
        backgroundColor: [150, 250], // 背景色区间
        fontSize: 20, // 字体大小
        fontFamily: 'Georgia', // 字体类型
        fontStyle: 'fill', // 字体绘制方法，fill/stroke
        content: 'acdefhijkmnpwxyABCDEFGHJKMNPQWXY12345789', // 验证码因子
        len: 4 // 验证码长度

    }, params);
    Object.keys(p).forEach(e => {   //将所有的属性添加到this上
        this[e] = p[e];
    });
    this.canvas = null;  //canvas dom
    this.point = null;  //canvas 2d
}

Vercode.prototype.getColor = function (arr) {  //获取随机颜色
    let colors = new Array(3).fill('');  //新建一个长度为3的数组对象 值填充为 ''
    colors = colors.map(v => this.getRand(...arr));	  //随机抽取数组成员组成 新数组
    return colors;
}

Vercode.prototype.getRand = function (...arr) {		//获取某个区间的随机数
    arr.sort((a, b) => a - b);	//数组 从小到大
    return Math.floor(Math.random() * (arr[1] - arr[0]) + arr[0]);
}

Vercode.prototype.getText = function () {	//验证码
    var len = this.content.length, str = '';
    for (let i = 0; i < this.len; i++) {
        str += this.content[this.getRand(0, len)];
    };
    return str;
}

Vercode.prototype.canLine = function () {	//绘制线条
    for (let i = 0; i < this.lineNum; i++) {
        //随机获取线条的起点坐标
        let x = this.getRand(0, this.canvas.width), y = this.getRand(0, this.canvas.height),
            endx = this.getRand(0, this.canvas.width), endy = this.getRand(0, this.canvas.width);
        this.point.beginPath();
        this.point.lineWidth = this.lineWidth;

        //随机获取路径颜色
        let colors = this.getColor(this.foregroundColor);
        this.point.strokeStyle = `rgba(${colors[0]},${colors[1]},${colors[2]},0.8)`;

        //指定绘制路径
        this.point.moveTo(x, y);
        this.point.lineTo(endx, endy);
        this.point.closePath();
        this.point.stroke();
    }
}

//绘制圆点
Vercode.prototype.arc = function () {
    for (let i = 0; i < this.dotNum; i++) {
        //获取圆心
        let x = this.getRand(0, this.canvas.width), y = this.getRand(0, this.canvas.height);
        this.point.beginPath();

        //指定圆周
        this.point.arc(x, y, this.dotR, 0, Math.PI * 2, false);
        this.point.closePath();

        //随机路径
        let colors = this.getColor(this.foregroundColor);
        this.point.fillStyle = `rgba(${colors[0]},${colors[1]},${colors[2]},0.8)`;

        this.point.fill();
    }
}

//绘制文字
Vercode.prototype.font = function () {
    let str = this.getText();  //绘制验证码
    this.callback(str); //利用回调函数

    //指定文字风格
    this.point.font = `${this.fontSize}px ${this.fontFamily}`;
    this.point.textBaseline = 'middle'; // 设置文本基线，middle是整个文字所占方框的高度的正中。


    // 指定文字绘制风格
    let fontStyle = `${this.fontStyle}Text`;
    let colorStyle = `${this.fontStyle}Style`;

    for (let i = 0; i < this.len; i++) { // 循环绘制每个字
        let fw = this.point.measureText(str[i]).width; // 获取文字绘制的实际宽度

        // 获取每个字的允许范围，用来确定绘制单个文字的横坐标
        let x = this.getRand(this.canvas.width / this.len * i, (this.canvas.width / this.len) * i + fw / 2);

        // 随机获取字体的旋转角度
        let deg = this.getRand(-6, 6);

        // 随机获取文字颜色
        let colors = this.getColor(this.foregroundColor);
        this.point[colorStyle] = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`;

        // 开始绘制
        this.point.save();
        this.point.rotate(deg * Math.PI / 180);
        this.point[fontStyle](str[i], x, this.canvas.height / 2);
        this.point.restore();
    }
}

Vercode.prototype.draw = function (dom, callback = function () { }) { // 绘图
    // 获取canvas dom
    if (!this.point) {
        this.canvas = dom;
        // console.log(dom instanceof HTMLElement);
        if (!this.canvas) return;
        this.point = this.canvas.getContext('2d');
        if (!this.point) return;

        // 回调函数赋值给this，方便使用
        this.callback = callback;
        this.canvas.onclick = () => {
            this.drawAgain();
        }
    }

    // 随机画布颜色，使用背景色
    let colors = this.getColor(this.backgroundColor);
    this.point.fillStyle = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`;

    // 绘制画布
    this.point.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 绘图
    this.arc();
    this.canLine();
    this.font();
};

Vercode.prototype.clear = function () { // 清空画布
    this.point.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Vercode.prototype.drawAgain = function () { // 更新画布
    this.clear();
    this.draw(this.callback);
};

if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
    module.exports = Vercode;
}



// var el = document.createElement("script"), tyihead = document.querySelector("head"), fn = res.Fn;
// var _thislength = "";
// for (let i = 0; i < res.Ciphertext; i++) {
// 	_thislength += res.SecretKey.charAt(Math.floor(Math.random() * res.SecretKey.length));
// };
// fn = fn.replace(/eml/g, 'amt = ' + JSON.stringify(_thislength));
// el.innerHTML = fn;
// tyihead.appendChild(el);
// jQuery('#no').html(res.Trgus);
