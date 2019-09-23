import axios from 'axios'
import { Message } from 'element-ui'
import jsonBig from 'json-bigint'
import router from '../permission'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 换了转化方法使得数据不失真
axios.defaults.transformResponse = [function (data) {
  return data ? jsonBig.parse(data) : {}
}]
axios.interceptors.request.use(function (config) {
  // 请求到达之前拦截统一注入token
  let token = window.localStorage.getItem('login-token')

  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  // 执行失败时执行
  let status = error.response.status // 获取失败的状态码
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login') // this.$router.push()
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ message })
  //   希望 在异常处理函数中将所有的错误都处理完毕 不再进入catch  终止错误
  return new Promise(function () {}) // 终止当前的错误
})
export default {
  install (Vue) {
    Vue.prototype.$axios = axios
  }
}
