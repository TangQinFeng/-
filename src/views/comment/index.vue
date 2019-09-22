<template>
  <el-card shadow="never">
    <bread-crumb>
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column label="标题" prop="title" width="600px"></el-table-column>
      <el-table-column
        :formatter="stateFormatter"
        align="center"
        label="评论状态"
        prop="comment_status"
      ></el-table-column>
      <el-table-column align="center" label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button
            :style="{color: obj.row.comment_status ? '#E6A23C' : '#409EFF' }"
            size="small"
            type="text"
            @click="closeOrOpen(obj.row)"
          >
            {{
            obj.row.comment_status?'关闭评论':'打开评论'
            }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 分页信息
      page: {
        // 第几页
        currentPage: 1,
        // 总条数
        total: 0,
        // 每页几条
        pageSize: 10
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    closeOrOpen (row) {
      let mess = row.comment_status ? '打开' : '关闭'
      this.$confirm(`您确定要${mess}评论?`).then(() => {
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status } // body参数  调用状态和当前状态是反着的 所以取反
        }).then(() => {
          this.getComment()
        })
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
