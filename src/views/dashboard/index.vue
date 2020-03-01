<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="11">
        <el-card class="box-card">
          <div id="orderChart" style="height: 560px" />
        </el-card>
      </el-col>
      <el-col :span="12" :offset="1">
        <el-card class="box-card">
          <div id="vipChart" style="height: 560px" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getOrderLineData } from './api.js'
import { getUserLineData } from '@/views/Statistics/Vip/api.js'

export default {
  name: 'Dashboard',
  data() {
    return {
      orderChart: null,
      vipChart: null,
    }
  },
  mounted() {
    this.initOrderChart()
    this.initVipChart()
  },
  beforeDestroy() {
    if (!this.orderChart) {
      return
    }
    this.orderChart.dispose()
    this.orderChart = null
    if (!this.vipChart) {
      return
    }
    this.vipChart.dispose()
    this.vipChart = null
  },
  methods: {
     async initOrderChart() {
      this.orderChart = echarts.init(document.getElementById('orderChart'))
      const data = await this.getOrderLineData()
      this.orderChart.setOption({
        title: {
          text: '线上收益'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: data[0]
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data[1],
          type: 'line'
        }]
      })
    },
    async getOrderLineData () {
      const data = await getOrderLineData()
      return [ Object.keys(data), Object.values(data) ]
    },
    async initVipChart() {
      this.vipChart = echarts.init(document.getElementById('vipChart'))
      const data = await this.getUserLineData()
      this.vipChart.setOption({
        title: {
          text: '会员统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: data[0]
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data[1],
          type: 'line'
        }]
      })
    },
    async getUserLineData () {
      const data = await getUserLineData()
      return [ Object.keys(data), Object.values(data) ]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
