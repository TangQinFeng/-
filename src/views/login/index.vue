<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" />
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:70%"></el-input>
          <el-button style="float:right">获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="loginForm.agree">是否已经阅读并同意用户保密协议</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click="login">主要按钮</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    let validator = (rule, value, callback) => {
    //   if (value) {
    //     callback()
    //   } else {
    //     callback(new Error('您还没有同意协议'))
    //   }
      value ? callback() : callback(new Error('您还没有同意协议'))
    }
    return {
      // 表单数据 mobile 手机号 code 验证码
      loginForm: {
        mobile: '',
        code: '',
        agree: false
      },
      //   表单校验
      loginRules: {
        mobile: [ { required: true, message: '手机号格式错误' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' } ],
        code: [{ required: true, message: '验证码错误' },
          { pattern: /^\d{6}$/, message: '验证码错误' }],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('login-token', result.data.token)
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
// lang='less' 允许使用less
// scoped 样式只在本组件中生效
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 480px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
