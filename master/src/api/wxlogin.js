import axios from 'axios'
import URL from './url'
import qs from 'qs'
axios.defaults.baseURL = URL.fxab
const getQueryStringFn = {
    getQueryString (n) {
        var reg = new RegExp('(^|&)' + n + '=([^&]*)(&|$)', 'i')
        var e = window.location.search.substr(1).match(reg)
        if (e) return unescape(e[2])
        return null
    }
}
export default getQueryStringFn
if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {//eslint-disable-line
    if (!sessionStorage.getItem('token')) {
      if (!getQueryStringFn.getQueryString('code')) {
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx998479db1176209a&redirect_uri=
        ${process.env.NODE_ENV == 'development' ? 'http://zgksx.com/por/anchor/' : encodeURIComponent(location.href.split('?')[0]) /*eslint-disable-line*/}
        &response_type=code&scope=snsapi_userinfo&state=
        ${process.env.NODE_ENV == 'development' ? location.href.split('?')[0] : null /*eslint-disable-line*/}
        #wechat_redirect`.replace(/ /g, '')
      } else {
        axios.post('maintainer_repairs_wechat_login', qs.stringify({code: getQueryStringFn.getQueryString('code')}))
        .then(async params => {
          if (params.data.state != 200) {//eslint-disable-line
            if (/code/g.test(params.data.msg)) {
              location.href = location.href.split('?')[0]
              return false
            };
            sessionStorage.setItem('token', JSON.stringify({asset: { secret: '' }, bool: true}))
            alert('登陆异常，请尝试账号登陆')
            return false
          } else {
            if (params.data.data.hasBind < 1) {//eslint-disable-line
              sessionStorage.setItem('token', JSON.stringify({asset: params.data.data, bool: true}))
              location.href = process.env.NODE_ENV == 'development'/*eslint-disable-line*/ ? location.origin: URL.proxy // 待定
            } else {
              // 直接登陆 保存 sessionstrong secret
              params.data.data['secret'] = params.data.data.loginResult.secret// 提取层级
              params.data.data['adminId'] = params.data.data.loginResult.adminId// 提取层级
              sessionStorage.setItem('token', JSON.stringify({asset: params.data.data}))
              location.href = process.env.NODE_ENV == 'development'/*eslint-disable-line*/ ? location.origin+'/#/order': URL.proxy+ 'order' // 待定
            }
          }
        })
      }
    }
}
