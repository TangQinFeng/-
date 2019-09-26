<template>
  <el-card class="userInfo">
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
      <el-form style="margin-left:60px" label-width="100px">
        <el-form-item label="用户名">
            <el-input v-model="formData.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="简介">
            <el-input v-model="formData.intro" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="邮箱">
            <el-input v-model="formData.email" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="手机号">
            <el-input disabled v-model="formData.mobile" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="margin-left:60px;width:100px">保存</el-button>
        </el-form-item>
      </el-form>
      <img :src="formData.photo?formData.photo:defaultImg" class="userImg">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
      },
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        console.log(result)
        this.formData = result.data
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
             right: 350px;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 2px solid #000;
            background-color: #fff;
        }
    }

</style>
