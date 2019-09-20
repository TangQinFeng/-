<template>
  <!-- 右侧头部 -->
  <el-row type="flex" justify="space-between" class="layout-header">
    <!-- 左侧 -->
    <el-col :span="6">
      <i class="el-icon-s-fold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="4">
      <img class="head-img" src="../../assets/img/avatar.jpg" alt />

      <!-- 下拉菜单 -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            唐清风
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >个人信息</el-dropdown-item>
            <el-dropdown-item >地址</el-dropdown-item>
            <el-dropdown-item >退出</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

  </el-row>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
 .layout-header{
     height: 50px;
     margin-top: 20px;
     .title{
         margin-left: 4px;
     }
     .head-img{
         height: 40px;
         width: 40px;
         border-radius: 50%;
         margin-right: 4px;
         vertical-align: middle;
     }

 }
</style>
