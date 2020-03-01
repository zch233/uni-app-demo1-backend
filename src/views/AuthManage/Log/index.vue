<template>
  <div class="app-container">
    <el-form ref="searchForm" :model="searchForm" label-width="100px">
      <el-form-item label="管理员名称：" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入管理员名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="initLogList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      ref="table"
      border
      style="width: 100%">
      <el-table-column
        prop="admin_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="route"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="input"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="操作IP">
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="操作时间">
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
  import { getLogList } from './api.js'

  export default {
    name: 'Operation',
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
      this.getLogList()
    },
    methods: {
      async getLogList () {
        const data = await getLogList({ page_size: this.pageSize, current_page: this.currentPage, ...this.searchForm })
        this.tableData = data.data
      },
      initLogList () {
        this.currentPage = 1
        this.getLogList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initLogList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getLogList()
      },
    }
  }
</script>
