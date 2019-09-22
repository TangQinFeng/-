<template>
  <el-card shadow="never">
    <bread-crumb>
    <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column  label="标题" prop="title" width="600px"></el-table-column>
      <el-table-column :formatter="stateFormatter" align='center' label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column align='center' label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column align='center' label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column align='center' label="操作"  >
        <template slot-scope="obj">
            <el-button size="small" type="text">修改</el-button>
        <el-button size="small" type="text" @click='closeOrOpen(obj.row)'>
          {{
            obj.row.comment_status?'关闭评论':'打开评论'
          }}
          </el-button>
        </template>
      </el-table-column>
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
    },
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    closeOrOpen (row) {
      // let mess = row.comment_status ? '打开' : '关闭'
      this.$axios({
        url: 'comments/status',
        method: 'put',
        params: { article_id: row.id },
        data: { allow_comment: !row.comment_status } // body参数  调用状态和当前状态是反着的 所以取反
      }).then(() => {
        this.getComment()
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
