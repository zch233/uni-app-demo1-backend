<template>
  <div class="app-container">
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="日期：" prop="status">
        <el-date-picker
          v-model.number="searchForm.start_time_js"
          value-format="timestamp"
          type="date"
          placeholder="开始日期">
        </el-date-picker>
        至
        <el-date-picker
          v-model.number="searchForm.end_time_js"
          value-format="timestamp"
          type="date"
          placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单号：" prop="order_id">
        <el-input v-model="searchForm.order_id" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="充值号：" prop="out_trade_no">
        <el-input v-model="searchForm.out_trade_no" placeholder="请输入充值号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="initFinanceList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      ref="table"
      border
      style="width: 100%">
      <el-table-column
        prop="avatar"
        label="头像"
        width="60">
        <template slot-scope="scope">
          <el-avatar shape="square" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="out_trade_no"
        label="充值号">
      </el-table-column>
      <el-table-column
        prop="type"
        label="等级">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1" type="info">普通会员</el-tag>
          <el-tag v-if="scope.row.type === 2">黄金会员</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="等级">
      </el-table-column>
      <el-table-column
        prop="real_price"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="pay_type"
        label="支付方式">
        <template slot-scope="scope">
          {{ scope.row.pay_type === 1 && '微信支付' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import { getFinanceList } from './api.js'

  export default {
    name: 'Finance',
    data() {
      return {
        searchForm: {},
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    created () {
      this.getFinanceList()
    },
    methods: {
      async getFinanceList () {
        ['start_time_js', 'end_time_js'].map(v => this.searchForm[v] && (this.searchForm[v.slice(0, -3)] = this.searchForm[v] / 1000))
        const data = await getFinanceList({ page_size: this.pageSize, page: this.currentPage, ...this.searchForm })
        this.tableData = data.data
        this.total = data.total_num
      },
      initFinanceList () {
        this.currentPage = 1
        this.getFinanceList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initFinanceList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getFinanceList()
      },
    }
  }
</script>
