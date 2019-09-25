<template>
  <div class="cover-image">
      <div @click="openLayer(index)" class="image" v-for="(item , index) in images" :key="index">
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <el-dialog :visible='dialogVisible' @close="dialogVisible=false">
        <select-image @selectOneImg='receiveImg'></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {
    openLayer (index) {
      this.dialogVisible = true
      this.selectIndex = index // 将当前点击的图片索引值给data中一个属性
    },
    receiveImg (url) {
      this.$emit('selectImg', url, this.selectIndex)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image{
    display: flex;
   margin-left: 100px;
    .image{
        width: 200px;
        height: 200px;
        border: 1px solid #ccc;
        margin: 10px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
