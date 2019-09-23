<template>
  <el-card>
    <bread-crumb slot="header">
        <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form style="margin-left:100px;margin-top:30px">
        <!-- 标题 -->
      <el-form-item label="标题">
          <el-input placeholder="文章标题" style="width:400px"></el-input>
      </el-form-item>
      <!-- 内容 -->
      <el-form-item label="内容">
          <el-input type="textarea" :rows="4"></el-input>
      </el-form-item>
      <!-- 封面 -->
      <el-form-item label="封面">
          <el-radio-group >
            <el-radio >单选</el-radio>
            <el-radio >三图</el-radio>
            <el-radio >无图</el-radio>
            <el-radio >自动</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
          <el-select>
            <el-option v-for="item in channels" :key="item.id">{{item.name}}</el-option>
          </el-select>
      </el-form-item>
      <el-form-item >
          <el-button type="primary">发表</el-button>
          <el-button > 存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
