<template>
    <el-tabs>
      <el-tab-pane label="素材库">
        <!-- 全部素材 -->
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img @click="clickImg(item)" :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination @current-change="changePage" background layout="prev, pager, next" :total="page.total"
           :current-page="page.currentPage"
           :page-size="page.pageSize"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    <el-tab-pane label="上传图片">
        <!-- 自定义上传 -->
        <el-upload :show-file-list="false" action="" :http-request="uploadImg">
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-tab-pane>

    </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 定义一个list接收数据
      //   分页信息
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 12
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        this.$emit('selectOneImg', result.data.url)
      })
    },
    clickImg (item) {
      this.$emit('selectOneImg', item.url)
    },
    getMaterial () {
      // this.activeName === 'collect' 相当于去找收藏的数据
      // 如果不等于collect 相等于去找全部的数据
      this.$axios({
        url: '/user/images',
        params: { collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 赋值总数  每次总条数都会重新赋值
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage // 将最新页码赋值给currentPage
      this.getMaterial() // 获取最新数据
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
    .img-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .img-item{
            width: 180px;
            height: 180px;
            margin: 10px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
