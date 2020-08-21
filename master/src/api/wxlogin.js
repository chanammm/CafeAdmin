// import axios from 'axios'
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
    if (!getQueryStringFn.getQueryString('code')) {
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx998479db1176209a&redirect_uri=
        ${process.env.NODE_ENV == 'development' ? 'http://zgksx.com/por/anchor/' : location.href.split('?')[0] /*eslint-disable-line*/}
        &response_type=code&scope=snsapi_userinfo&state=
        ${process.env.NODE_ENV == 'development' ? location.href.split('?')[0] : null /*eslint-disable-line*/}
        #wechat_redirect`.replace(/ /g, '')
      } else {
        // axios.post('admin_wechat_login', {code: getQueryStringFn.getQueryString('code')})
        // .then(async params => {
        //   if (params.data.state != 200) {//eslint-disable-line
        //     if (/code/g.test(params.data.msg)) {
        //       location.href = location.href.split('?')[0]
        //       return false
        //     };
        //     return false
        //   }
        // })
      }
}
