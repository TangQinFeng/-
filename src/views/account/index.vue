<template>
  <el-card class="userInfo" v-loading="loading">
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
      <el-form :model="formData" :rules="accountRules" ref="accountForm" style="margin-left:60px" label-width="100px">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="简介">
            <el-input v-model="formData.intro" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="手机号">
            <el-input disabled v-model="formData.mobile" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="margin-left:60px;width:100px" @click="saveUser">保存信息</el-button>
        </el-form-item>
      </el-form>
      <el-upload action="" :show-file-list="false" :http-request="uploadImg">
         <img :src="formData.photo?formData.photo:defaultImg" class="userImg">
      </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../untils/eventBus'
export default {
  data () {
    return {
      formData: {
      },
      accountRules: {
        name: [{ require: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '用户名为1~7个字符' }],
        email: [{ require: true, message: '邮箱不能为空' },
          { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }]
      },
      defaultImg: require('../../assets/img/avatar.jpg'),
      loading: false
    }
  },
  methods: {
    // 用户信息获取
    getUserInfo () {
      this.loading = true
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
        this.loading = false
      })
    },
    // 数据保存
    saveUser () {
      this.$refs.accountForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: 'user/profile',
            method: 'patch',
            data: this.formData
          }
          ).then(() => {
            eventBus.$emit('updataUserInfo')
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    // 头像上传
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: 'user/photo',
        method: 'patch',
        data
      }).then(result => {
        eventBus.$emit('updataUserInfo')
        this.formData.photo = result.data.photo
        this.loading = false
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
    .userInfo{
        position: relative;
         .userImg{
             position: absolute;
             top: 100px;
             right:   350px;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 2px solid #000;
            background-color: #fff;
        }
    }

</style>
