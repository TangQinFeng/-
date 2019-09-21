<template>
  <el-card shadow="never">
    <bread-crumb>
    <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column  label="标题" prop="title" width="600px"></el-table-column>
      <el-table-column align='center' label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column align='center' label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column align='center' label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column align='center' label="操作" ></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []

    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        console.log(result)
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
