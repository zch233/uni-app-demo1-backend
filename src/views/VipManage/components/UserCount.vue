<template>
  <el-table
    :data="tableData"
    ref="table"
    border
    style="width: 100%">
    <el-table-column
      prop="count"
      label="总订单">
    </el-table-column>
    <el-table-column
      prop="sum1"
      label="线上洗衣">
    </el-table-column>
    <el-table-column
      prop="last_time1"
      label="上次洗衣订单的时间">
    </el-table-column>
    <el-table-column
      prop="sum2"
      label="会员升级">
    </el-table-column>
    <el-table-column
      prop="last_time2"
      label="会员升级最新下单的时间">
    </el-table-column>
    <el-table-column
      prop="sum3"
      label="核销优惠券的金额">
    </el-table-column>
    <el-table-column
      prop="last_time3"
      label="最近核销的时间">
    </el-table-column>
  </el-table>
</template>

<script>
  import { userCount } from '../api.js'

  export default {
    name: 'UserCount',
    props: {
      userData: Object,
    },
    data() {
      return {
        tableData: [],
      }
    },
    created () {
      this.userCount()
    },
    methods: {
      async userCount () {
        const data = await userCount({ user_id: this.userData.id })
        this.tableData = [data]
      },
    }
  }
</script>
