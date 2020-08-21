
import axios from "axios"
import { Toast } from "vant"
import qs from "qs";
// axios默认配置
axios.defaults.timeout = 10000 // 超时时间
axios.defaults.baseURL = "https://wechat.hiroiachina.com/api/";

const URLFiles = `https://file.zgksx.com/`;
const wxUri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx998479db1176209a&redirect_uri=
                ${ process.env.NODE_ENV == "development" ? "http://zgksx.com/por/anchor/" : location.href.split('?')[0]}
                &response_type=code&scope=snsapi_userinfo&state=
                ${ process.env.NODE_ENV == "development" ? location.href.split('?')[0] : null}
                #wechat_redirect`.replace(/ /g, '');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')).asset.secret : ''; // 设置请求头为 Authorization
                
// http request 拦截器
axios.interceptors.request.use(config => {
  if (config.method === "post") {
    config.data = qs.stringify(config.data);
  }
  return config
},
  error => {
    return Promise.reject(error.response)
  })
// http response 拦截器
axios.interceptors.response.use(
  async response => {
    if (response.data.state === 201) {
      return await Promise.resolve(response)
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    if (error.response.status === 404) {
      Toast("请求地址出错")
    } else if (error.response.status === 401) {
      Toast(error.response.data.message)
      sessionStorage.clear()
      setTimeout(() => {
        location.reload()
      }, 3000)
    }
    return Promise.reject(error.response) // 返回接口返回的错误信息
  })
const Fn = {
  async httpRequest(option = {}) {
    if (option.methods == 'GET' || option.methods == 'get') {
      return await axios.get(
        option.url, {
        params: option.data
      }
      )
    } else if (option.methods == 'POST' || option.methods == 'post') {
      return await axios.post(
        option.url, option.data
      )
    } else {
      console.log('method not allow!')
    }
  }
}
export default Fn
