<template>
  <div id="chart" style="height: 560px" />
</template>

<script>
import echarts from 'echarts'
import { getUserLineData } from './api.js'

export default {
  data() {
    return {
      chart: null,
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async initChart() {
      this.chart = echarts.init(document.getElementById('chart'))
      const data = await this.getUserLineData()
      this.chart.setOption({
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
