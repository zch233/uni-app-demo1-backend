<template>
  <div class="app-container">
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="日期：" prop="status">
        <el-date-picker
          v-model.number="searchForm.start_time"
          value-format="timestamp"
          type="date"
          placeholder="开始日期">
        </el-date-picker>
        至
        <el-date-picker
          v-model.number="searchForm.end_time"
          value-format="timestamp"
          type="date"
          placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="initOrderList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      ref="table"
      border
      style="width: 100%">
      <el-table-column
        prop="month"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="total_orders"
        label="订单数">
      </el-table-column>
      <el-table-column
        prop="total_price"
        label="成交额">
        <template slot-scope="scope">
          ￥{{ scope.row.total_price }}
        </template>
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
  import { getOrderList } from './api.js'

  export default {
    name: 'OrderStatistics',
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
      this.getOrderList()
    },
    methods: {
      async getOrderList () {
        Object.keys(this.searchForm).map(v => (this.searchForm[v] = this.searchForm[v] / 1000))
        const data = await getOrderList({ page_size: this.pageSize, current_page: this.currentPage, ...this.searchForm })
        this.tableData = [data]
        this.total = data.total_num
      },
      initOrderList () {
        this.currentPage = 1
        this.getOrderList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initOrderList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getOrderList()
      },
    }
  }
</script>
