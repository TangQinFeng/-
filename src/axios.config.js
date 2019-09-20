import axios from 'axios'
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('login-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
export default {
  install (Vue) {
    axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
    Vue.prototype.$axios = axios
  }
}
