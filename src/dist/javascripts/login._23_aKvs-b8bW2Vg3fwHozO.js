/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public/javascripts/interactive/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (module) {\n  if (!module.webpackPolyfill) {\n    module.deprecate = function () {};\n\n    module.paths = []; // module.parent = undefined by default\n\n    if (!module.children) module.children = [];\n    Object.defineProperty(module, \"loaded\", {\n      enumerable: true,\n      get: function get() {\n        return module.l;\n      }\n    });\n    Object.defineProperty(module, \"id\", {\n      enumerable: true,\n      get: function get() {\n        return module.i;\n      }\n    });\n    module.webpackPolyfill = 1;\n  }\n\n  return module;\n};\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/public/javascripts/interactive/login.js":
/*!*****************************************************!*\
  !*** ./src/public/javascripts/interactive/login.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nif (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {\n  window.onload = function (params) {\n    document.getElementsByClassName('login')[0].style.width = '100%';\n    document.getElementsByClassName('login')[0].style.background = 'none';\n  };\n}\n\nnew Vue({\n  el: '#app',\n  data: function data() {\n    return {\n      remember: false,\n      //记住缓存\n      user: {\n        name: '',\n        //用户\n        pwd: '' //密码\n\n      },\n      loading: false\n    };\n  },\n  created: function created() {\n    var user = document.getElementById(\"user\"),\n        pwd = document.getElementById(\"pwd\"),\n        itself = this;\n    document.addEventListener('DOMContentLoaded', function () {\n      sessionStorage.removeItem(\"token\");\n\n      if (localStorage.getItem('remember')) {\n        //历史账号回显\n        itself.remember = true;\n        itself.user.name = ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem('remember')).name);\n        itself.user.pwd = ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem('remember')).pwd);\n      }\n\n      document.onkeydown = function (event) {\n        //键盘回车出发\n        event = event ? event : window.event ? window.event : null;\n\n        if (event.keyCode == 13) {\n          itself.login();\n        }\n\n        ;\n      };\n    });\n  },\n  methods: {\n    IError: function IError(err) {\n      this.$message.error('错了哦，' + err);\n    },\n    login: function login() {\n      var _this = this;\n\n      var itself = this;\n      itself.loading = true;\n      var datra = qs.stringify({\n        account: user.value,\n        password: pwd.value\n      });\n      axios.post('admin_account_login', datra).then(function (params) {\n        params = params.data;\n\n        if (params.state == 200) {\n          if (!itself.remember) {\n            localStorage.removeItem('remember');\n          } else {\n            localStorage.setItem(\"remember\", JSON.stringify({\n              name: ym.init.COMPILESTR.encryption(user.value),\n              pwd: ym.init.COMPILESTR.encryption(pwd.value)\n            }));\n          }\n\n          ;\n          localStorage.setItem('uri', JSON.stringify({\n            uri: '../index.htm?hash:ix',\n            title: '首页'\n          }));\n          sessionStorage.setItem(\"token\", JSON.stringify({\n            asset: params.data\n          }));\n          ym.init.GETURI('outch_wx') ? location.href = ym.init.GETURI('outch_wx') : null;\n          axios.defaults.headers.common['Authorization'] = JSON.parse(sessionStorage.getItem('token')).asset.secret; // 设置请求头为 Authorization\n\n          axios.post('admin_role_permissions').then(function (params) {\n            // 页面权限\n            if (params.data.data.pagePermissions.length < 1) {\n              _this.IError(\"无法获取配置，请联系管理员\");\n\n              _this.loading = false;\n              return false;\n            }\n\n            sessionStorage.setItem('_a', JSON.stringify({\n              _u: ':hash(iox*)',\n              _i: user.value\n            })); //管理员信息\n\n            sessionStorage.setItem('tag', JSON.stringify(params.data.data.pagePermissions));\n            setTimeout(function () {\n              location.href = \"./views/common/index.htm?hash:\" + ym.init.GETRANDOM(8);\n            }, 500);\n          });\n        } else {\n          itself.IError(params.msg);\n          setTimeout(function () {\n            itself.loading = false;\n          }, 500);\n        }\n\n        ;\n      });\n    }\n  }\n});\n\nfunction Vercode() {\n  var _this2 = this;\n\n  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  //初始对象方法\n  var p = Object.assign({\n    lineWidth: 0.5,\n    // 线条宽度\n    lineNum: 2,\n    // 线条数量\n    dotNum: 20,\n    // 点的数量\n    dotR: 1,\n    // 点的半径\n    foregroundColor: [10, 80],\n    // 前景色区间\n    backgroundColor: [150, 250],\n    // 背景色区间\n    fontSize: 20,\n    // 字体大小\n    fontFamily: 'Georgia',\n    // 字体类型\n    fontStyle: 'fill',\n    // 字体绘制方法，fill/stroke\n    content: 'acdefhijkmnpwxyABCDEFGHJKMNPQWXY12345789',\n    // 验证码因子\n    len: 4 // 验证码长度\n\n  }, params);\n  Object.keys(p).forEach(function (e) {\n    //将所有的属性添加到this上\n    _this2[e] = p[e];\n  });\n  this.canvas = null; //canvas dom\n\n  this.point = null; //canvas 2d\n}\n\nVercode.prototype.getColor = function (arr) {\n  var _this3 = this;\n\n  //获取随机颜色\n  var colors = new Array(3).fill(''); //新建一个长度为3的数组对象 值填充为 ''\n\n  colors = colors.map(function (v) {\n    return _this3.getRand.apply(_this3, _toConsumableArray(arr));\n  }); //随机抽取数组成员组成 新数组\n\n  return colors;\n};\n\nVercode.prototype.getRand = function () {\n  for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {\n    arr[_key] = arguments[_key];\n  }\n\n  //获取某个区间的随机数\n  arr.sort(function (a, b) {\n    return a - b;\n  }); //数组 从小到大\n\n  return Math.floor(Math.random() * (arr[1] - arr[0]) + arr[0]);\n};\n\nVercode.prototype.getText = function () {\n  //验证码\n  var len = this.content.length,\n      str = '';\n\n  for (var i = 0; i < this.len; i++) {\n    str += this.content[this.getRand(0, len)];\n  }\n\n  ;\n  return str;\n};\n\nVercode.prototype.canLine = function () {\n  //绘制线条\n  for (var i = 0; i < this.lineNum; i++) {\n    //随机获取线条的起点坐标\n    var x = this.getRand(0, this.canvas.width),\n        y = this.getRand(0, this.canvas.height),\n        endx = this.getRand(0, this.canvas.width),\n        endy = this.getRand(0, this.canvas.width);\n    this.point.beginPath();\n    this.point.lineWidth = this.lineWidth; //随机获取路径颜色\n\n    var colors = this.getColor(this.foregroundColor);\n    this.point.strokeStyle = \"rgba(\".concat(colors[0], \",\").concat(colors[1], \",\").concat(colors[2], \",0.8)\"); //指定绘制路径\n\n    this.point.moveTo(x, y);\n    this.point.lineTo(endx, endy);\n    this.point.closePath();\n    this.point.stroke();\n  }\n}; //绘制圆点\n\n\nVercode.prototype.arc = function () {\n  for (var i = 0; i < this.dotNum; i++) {\n    //获取圆心\n    var x = this.getRand(0, this.canvas.width),\n        y = this.getRand(0, this.canvas.height);\n    this.point.beginPath(); //指定圆周\n\n    this.point.arc(x, y, this.dotR, 0, Math.PI * 2, false);\n    this.point.closePath(); //随机路径\n\n    var colors = this.getColor(this.foregroundColor);\n    this.point.fillStyle = \"rgba(\".concat(colors[0], \",\").concat(colors[1], \",\").concat(colors[2], \",0.8)\");\n    this.point.fill();\n  }\n}; //绘制文字\n\n\nVercode.prototype.font = function () {\n  var str = this.getText(); //绘制验证码\n\n  this.callback(str); //利用回调函数\n  //指定文字风格\n\n  this.point.font = \"\".concat(this.fontSize, \"px \").concat(this.fontFamily);\n  this.point.textBaseline = 'middle'; // 设置文本基线，middle是整个文字所占方框的高度的正中。\n  // 指定文字绘制风格\n\n  var fontStyle = \"\".concat(this.fontStyle, \"Text\");\n  var colorStyle = \"\".concat(this.fontStyle, \"Style\");\n\n  for (var i = 0; i < this.len; i++) {\n    // 循环绘制每个字\n    var fw = this.point.measureText(str[i]).width; // 获取文字绘制的实际宽度\n    // 获取每个字的允许范围，用来确定绘制单个文字的横坐标\n\n    var x = this.getRand(this.canvas.width / this.len * i, this.canvas.width / this.len * i + fw / 2); // 随机获取字体的旋转角度\n\n    var deg = this.getRand(-6, 6); // 随机获取文字颜色\n\n    var colors = this.getColor(this.foregroundColor);\n    this.point[colorStyle] = \"rgba(\".concat(colors[0], \", \").concat(colors[1], \", \").concat(colors[2], \", 0.8)\"); // 开始绘制\n\n    this.point.save();\n    this.point.rotate(deg * Math.PI / 180);\n    this.point[fontStyle](str[i], x, this.canvas.height / 2);\n    this.point.restore();\n  }\n};\n\nVercode.prototype.draw = function (dom) {\n  var _this4 = this;\n\n  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};\n\n  // 绘图\n  // 获取canvas dom\n  if (!this.point) {\n    this.canvas = dom; // console.log(dom instanceof HTMLElement);\n\n    if (!this.canvas) return;\n    this.point = this.canvas.getContext('2d');\n    if (!this.point) return; // 回调函数赋值给this，方便使用\n\n    this.callback = callback;\n\n    this.canvas.onclick = function () {\n      _this4.drawAgain();\n    };\n  } // 随机画布颜色，使用背景色\n\n\n  var colors = this.getColor(this.backgroundColor);\n  this.point.fillStyle = \"rgba(\".concat(colors[0], \", \").concat(colors[1], \", \").concat(colors[2], \", 0.8)\"); // 绘制画布\n\n  this.point.fillRect(0, 0, this.canvas.width, this.canvas.height); // 绘图\n\n  this.arc();\n  this.canLine();\n  this.font();\n};\n\nVercode.prototype.clear = function () {\n  // 清空画布\n  this.point.clearRect(0, 0, this.canvas.width, this.canvas.height);\n};\n\nVercode.prototype.drawAgain = function () {\n  // 更新画布\n  this.clear();\n  this.draw(this.callback);\n};\n\nif ( true && !module.nodeType && module.exports) {\n  module.exports = Vercode;\n} // var el = document.createElement(\"script\"), tyihead = document.querySelector(\"head\"), fn = res.Fn;\n// var _thislength = \"\";\n// for (let i = 0; i < res.Ciphertext; i++) {\n// \t_thislength += res.SecretKey.charAt(Math.floor(Math.random() * res.SecretKey.length));\n// };\n// fn = fn.replace(/eml/g, 'amt = ' + JSON.stringify(_thislength));\n// el.innerHTML = fn;\n// tyihead.appendChild(el);\n// jQuery('#no').html(res.Trgus);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/public/javascripts/interactive/login.js?");

/***/ })

/******/ });