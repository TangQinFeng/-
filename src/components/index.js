import layoutAside from './home/layout-aside'
import layoutHeder from './home/layout-header'
import breadCrumb from './comon/bread-crumb'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeder)
    Vue.component('bread-crumb', breadCrumb)
  }
}
