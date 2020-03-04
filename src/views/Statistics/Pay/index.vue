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
      <el-form-item label="">
        <el-button type="primary" @click="initPayList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button>
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
        prop="total_coupon"
        label="张数">
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
  import { getPayList } from './api.js'

  export default {
    name: 'PayStatistics',
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
      this.getPayList()
    },
    methods: {
      async getPayList () {
        ['start_time_js', 'end_time_js'].map(v => this.searchForm[v] && (this.searchForm[v.slice(0, -3)] = this.searchForm[v] / 1000))
        const data = await getPayList({ page_size: this.pageSize, page: this.currentPage, ...this.searchForm })
        this.tableData = [data]
        this.total = data.total_num
      },
      initPayList () {
        this.currentPage = 1
        this.getPayList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initPayList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getPayList()
      },
    }
  }
</script>
