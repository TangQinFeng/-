import layoutAside from './home/layout-aside'
import layoutHeder from './home/layout-header'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeder)
  }
}
