<template>
  <el-card >
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form
      style="margin-left:100px;margin-top:30px"
      ref="pubForm"
      label-width="100px"
      :model="formData"
      :rules="rules"
      v-loading='loading'
    >
      <!-- 标题 -->
      <el-form-item label="标题" prop="title">
        <el-input placeholder="文章标题" style="width:400px" v-model="formData.title"></el-input>
      </el-form-item>
      <!-- 内容 -->
      <el-form-item label="内容" prop="content">
        <quill-editor style="height:300px" v-model="formData.content"></quill-editor>
      </el-form-item>
      <!-- 封面 -->
      <el-form-item label="封面" prop="cover" style="margin-top:120px">
        <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <cover-image :images='formData.cover.images' @selectImg='changeImg'></cover-image>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="pulish(false)">发表</el-button>
        <el-button @click="pulish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      rules: {
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '标题在5~30个字符之间' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '请选择频道' }]
      },
      loading: false,
      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 内容
        channel_id: null, // 频道id
        cover: {
          type: 0,
          images: []
        }// 封面类型 -1:自动，0-无图，1-1张，3-3张

      }
    }
  },
  methods: {
    changeImg (url, index) {
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    // 类型改变事件
    changeType () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 根据ID获取文章详情
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
        this.loading = false
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    pulish (draft) {
      this.$refs.pubForm.validate((isOK) => {
        if (isOK) {
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>
</style>
