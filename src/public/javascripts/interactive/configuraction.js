import style from '../../stylesheets/base/style.min.css';
import app from '../../../app.js';
import json from '../config/json/configuraction.json';
import "babel-polyfill";


import axios from 'axios';
import qs from 'qs';
axios.defaults.baseURL = json.URLS.Development_Server_;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')).asset.secret : ''; // 设置请求头为 Authorization

axios.interceptors.request.use(
	config => {
		// 在发送请求之前做什么
		if (config.method === "post") {
			// 序列化
			config.data = decodeURIComponent(config.data).replace(/无/g, '-1');
			// config.data = qs.stringify(config.data);
			// config.data = JSON.stringify(config.data);
			// 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
		} else {
				// 若是有做鉴权token , 就给头部带上token
				// 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
				// 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage (隐身模式)的使用
			
		}
		return config;
	},
	error => {
		// 对请求错误做些什么，自己定义

		return Promise.reject(error);
	})
axios.interceptors.response.use(
	response => {
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
		// 否则的话抛出错误
		if (response.status === 200) {
			if(response.data.state === 201){
				window.ym.init.MBOX('事务提示：登陆已失效，请重新登陆');
				setTimeout(function () {
					if(process.env.NODE_ENV == "production"){
						// parent.location.href = 'http://s.coffeedz.com/work/admin/login.htm?redirect[x*]';
					}else{
						parent.location.href = 'http://192.168.0.168:8080/cafeadmin/src/dist/login.htm';
					}
				},500)
			}
			if(response.config.url == "sys_machine_instance_detail" || response.config.url == "sys_machine_detail" || response.config.url == "repairs_detail"){
				Object.keys(response.data.data).forEach((element, index) => {
					if(Object.values(response.data.data)[index] == -1){
						response.data.data[element] = '无';
					}else{
						response.data.data[element] = Object.values(response.data.data)[index];
					}
				})
			}
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	// 服务器状态码不是2开头的的情况
	// 这里可以跟你们的后台开发人员协商好统一的错误状态码
	// 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
	// 下面列举几个常见的操作，其他需求可自行扩展
	error => {
		console.log(error)
		// if (error.response.status) {
		// 	switch (error.response.status) {
		// 		// 401: 未登录
		// 		// 未登录则跳转登录页面，并携带当前页面的路径
		// 		// 在登录成功后返回当前页面，这一步需要在登录页操作。
		// 		case 401:
		// 			break;
		// 		// 403 token过期
		// 		// 登录过期对用户进行提示
		// 		// 清除本地token和清空vuex中token对象
		// 		// 跳转登录页面
		// 		case 403:
		// 			break;
		// 		// 404请求不存在
		// 		case 404:
		// 			break;
		// 		// 其他错误，直接抛出错误提示
		// 		default:

		// 	}
			return Promise.reject(error.response);
		// }
	}
)
window.qs = qs;
window.axios = axios;

localStorage.setItem('_e', JSON.stringify(json));

ym.init = {
	plugin: {
		fn: function () { },
		bool: false,
		loading: `<div class="k-ball7a"></div><div class="k-ball7b"></div><div class="k-ball7c"></div><div class="k-ball7d"></div>`,
		ui: function () {
			return this.arguments;
		}
	},
	XML: function (ent) {
		/* 封装ajax函数
			* {string} ent.type http连接的方式，包括POST和GET两种方式
		  	* {string} ent.url 发送请求的url
		  	* {boolean} ent.async 是否为异步请求，true为异步的，false为同步的
		  	* {object} ent.data 发送的参数，格式为对象类型
		  	* {function} ent.success ajax发送并接收成功调用的回调函数
		*/
		ent = ent || {};
		ent.method = ent.method.toUpperCase() || "POST";
		ent.uri = ent.uri || '';
		ent.async = ent.async || true;
		ent.xmldata = ent.xmldata || {};
		ent.success = ent.success || function () { };
		var xml = null, params = [], postData;
		if (window.XMLHttpRequest) {
			xml = new XMLHttpRequest();
		} else {
			xml = new ActiveXObject("Microsoft.XMLHTTP");
		};
		for (let key in ent.xmldata) {
			params.push(key + '=' + ent.xmldata[key]);
		}
		postData = params.join('&');


		console.log(JSON.parse(sessionStorage.getItem('token')))
		// JSON.parse(sessionStorage.getItem('token')) ? xml.setRequestHeader('Authorization', JSON.parse(sessionStorage.getItem('token')).asset.secret) : null;

		if (ent.method.toUpperCase() === "POST") {
			xml.open(ent.method, ent.uri, ent.async);
			xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
			// xml.setRequestHeader('Authorization', '123123');
			JSON.parse(sessionStorage.getItem('token')) ? xml.setRequestHeader('Authorization', JSON.parse(sessionStorage.getItem('token')).asset.secret) : null;
			xml.send(postData);
		} else if (ent.method.toUpperCase() === "GET") {
			xml.open(ent.method, ent.uri + '?' + postData, ent.async);
			xml.send(null);
		}
		xml.onreadystatechange = function () {
			if (xml.readyState == 4 && xml.status == 200) {
				ent.done(JSON.parse(xml.responseText));
			}
		}
	},
	GETURI: function () {
		var req = new RegExp("(^|&)" + arguments[0] + "=([^&]*)(&|$)", "i"), res = window.location.search.substr(1).match(req);
		if (res != null) return decodeURI(res[2]);
		return null;
	},
	GETRANDOM: function (n) {
		n = arguments[0] || 12;
		var m = "", i = 0, str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		for (let i = 0; i < n; i++) {
			m += str.charAt(Math.floor(Math.random() * str.length));
		}
		return m;
	},
	ERROR: function () {
		var code = {};
		if (typeof arguments[0] === 'function') {
			code = {
				start: 200,
				msg: arguments[0].msg
			}
		} else {
			code = {
				start: 400,
				msg: '状态错误'
			}
		}
		return code;
	},
	LOADING: function () {
		//  按钮动画  
		//  模态四角动画  
		switch (typeof arguments[0]) {
			case 'object':
				jQuery(arguments[0].tap).html(`<div class="k-ball-holder" style="${arguments[0].style}">${ym.init.plugin.loading}<div style="margin-left:60%;">${arguments[0].select}</div></div>`);  //改变提交的方式
				break;
			default:
				console.log(2);
		}
	},
	getDateTime: function (data) {
		var date = new Date(data);   //如果date为10位不需要乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

		return Y + M + D + h + m + s;
	},
	// MBOX: function () {
	// 	if (arguments[0].redom) {
	// 		jQuery(arguments[0].redom).html(arguments[0].resetdom.inner);
	// 		jQuery(arguments[0].resetdom.tag).html(arguments[0].resetdom.inner);
	// 	}
	// 	var dom = `<div class="module">${arguments[0].msg}</div>`;
	// 	jQuery('body').append(dom);
	// 	jQuery('.module').css({
	// 		'marginLeft': '-' + jQuery('.module').innerWidth() / 2 + 'px',
	// 		'marginTop': '-' + jQuery('.module').innerWidth() / 2 + 'px',
	// 	})
	// 	setTimeout(function () {
	// 		jQuery('.module').remove();
	// 	}, arguments[0].dely);
	// },
	MBOX: function (params) {
		var dom = document.createElement('div');
		dom.setAttribute('class', 'mbox');
		dom.innerText = params;
		dom.style.background = '#000';
		dom.style.color = "#fff";
		dom.style.textAlign = 'center';
		dom.style.lineHeight = '40px';
		dom.style.position = 'fixed';
		dom.style.top = '110px';
		dom.style.left = window.innerWidth / 2 +'px';
		dom.style.marginLeft = '-104px';
		dom.style.zIndex = '99999';
		dom.style.padding = '0 8px';
		dom.style.boxSizing = 'border-box';
		dom.style.borderRadius = '10px';
		parent.document.querySelector('body').append(dom);
		// setTimeout(function () {
		// 	parent.document.querySelector('.mbox').removeChild();
		// }, 1000);
	},
	COMPILESTR: {
		encryption: function (_e) {
			var c = String.fromCharCode(_e.charCodeAt(0) + _e.length);
			for (var i = 1; i < _e.length; i++) {
				c += String.fromCharCode(_e.charCodeAt(i) + _e.charCodeAt(i - 1));
			}
			return escape(c);
		},
		decrypt: function (_e) {
			_e = unescape(_e);
			var c = String.fromCharCode(_e.charCodeAt(0) - _e.length);
			for (var i = 1; i < _e.length; i++) {
				c += String.fromCharCode(_e.charCodeAt(i) - c.charCodeAt(i - 1));
			}
			return c;
		}
	},
	_COLUMN: {
		template: function (template) {
			const evalExpr = /<%=(.+?)%>/g; //解码
			const expr = /<%([\s\S]+?)%>/g; //解码
			template = template
				.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`') //echo
				.replace(expr, '`); \n $1 \n  echo(`'); //expr


			template = 'echo(`' + template + '`);';
			let script =
				`(function parse(data){
			    		let output = "";
			
					    function echo(html){
					      output += html;
					    }
			    		${ template}
			
			    	return output;
			  	})`;
			return script;
		},
		varel: function (_e, column) {
			let template = `
					<ul>
					  	<% for(let i = 0; i < data.supplies.length; i++) { %>
						    <% for(let key in data.supplies[i]) { %>
						    	<% if((data.supplies[i][key]).constructor === Object){ %>
										<% for(let o in data.supplies[i][key]){ %>
											<li><%= data.supplies[i][key][o] %></li>
										<% } %>
								<% }else{ %>
									<li><%= data.supplies[i][key] %></li>
								<% } %>
						    <% } %>
					  	<% } %>
						<% if(data.ace){ %>
							<li><%= data.ace %></li>
						<% } %>
					</ul>
				`;
			var parse = eval(ym.init._COLUMN.template(template));
			document.getElementById(column)
				.innerHTML = parse({
					supplies: _e,
					ace: column
				});
		}
	},
	RegCode(e) {
		return new RegExp(e);
	},
	getAllDate(begin, end) {   //提取指定日期
		var dtemp = [];
		var ab = begin.split("-");
		var ae = end.split("-");
		var db = new Date();
		db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
		var de = new Date();
		de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
		var unixDb = db.getTime();
		var unixDe = de.getTime();
		for (var k = unixDb; k <= unixDe;) {
			dtemp.push((new Date(parseInt(k))).format());
			k = k + 24 * 60 * 60 * 1000;
		}
		return dtemp;
	}
};
Date.prototype.format = function () {  //原型
	var s = '';
	var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1));
	var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate());
	s += this.getFullYear() + '-'; // 获取年份。
	s += mouth + "-"; // 获取月份。
	s += day; // 获取日。
	return (s); // 返回日期。
};

window.addEventListener('pageshow', function (e) {
	if (e.persisted) {
		location.reload();
	}
})