<template>
  <el-container>
    <el-aside style="width:200px;backgroundColor:#323745">
      <layout-aside ></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style lang='less' scoped>

</style>
