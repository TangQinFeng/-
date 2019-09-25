import layoutAside from './home/layout-aside'
import layoutHeder from './home/layout-header'
import breadCrumb from './comon/bread-crumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeder)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)
  }
}
