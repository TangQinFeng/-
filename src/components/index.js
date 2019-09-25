import layoutAside from './home/layout-aside'
import layoutHeder from './home/layout-header'
import breadCrumb from './comon/bread-crumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import coverImage from './publish/cover-image'
import selectImage from './publish/select-image'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeder)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)// 注册富文本编辑器
    Vue.component('cover-image', coverImage)
    Vue.component('select-image', selectImage)
  }
}
