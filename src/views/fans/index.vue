<template>
<el-card>
    <bread-crumb slot="header">
        <template slot="title">图文数据</template>
    </bread-crumb>
    <el-row type="flex" justify="space-between">
        <!-- 工作表 -->
        <div ref="workChart" class="echarts"></div>
        <!-- 生活表 -->
        <div ref="liftChart" class="echarts"></div>
    </el-row>
</el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      liftData: [10, 52, 200, 334, 390, 330, 220], // 初始值
      workData: [820, 932, 901, 934, 1290, 1330, 1320] // 初始值
    }
  },
  created () {
    setInterval(() => {
      this.updateData()
    }, 1000)
  },
  mounted () {
    //   图表初识化
    this.workChart = echarts.init(this.$refs.workChart)
    this.liftChart = echarts.init(this.$refs.liftChart)
    this.setWorkOption()
    this.setLiftOption()
  },
  watch: {
    workData (newValue) {
      this.setWorkOption()
    }
  },
  methods: {
    //   更新数据
    updateData () {
      this.workData = this.workData.map(item => {
        return item * (Math.random() + 7 * 0.4)
      })
    },
    setWorkOption () {
      this.workChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.workData,
          type: 'line'
        }]
      })
    },
    setLiftOption () {
      this.liftChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.echarts{
    width: 600px;
    height: 400px;
}
</style>
