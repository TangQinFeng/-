<template>
  <div class="cover-image">
      <div class="image" v-for="(item , index) in images" :key="index">
          <img :src="item ? item : defaultImg" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/avatar.jpg')
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
        margin: 15px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
