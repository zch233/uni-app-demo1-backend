<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="image"
        label="图片"
        width="120">
      </el-table-column>
      <el-table-column
        prop="title"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="discounted_price"
        label="折扣价格">
      </el-table-column>
      <el-table-column
        prop="number"
        label="销量">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" size="mini" type="primary">查看</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
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
  import { getProductList } from './api.js'

  export default {
    name: 'ProductManage',
    data() {
      return {
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    created () {
      this.getProductList()
    },
    methods: {
      async getProductList () {
        const data = await getProductList({ page_size: this.pageSize, current_page: this.currentPage })
        this.tableData = data.data
        this.total = data.total_page * data.page_size
      },
      initProductList () {
        this.currentPage = 1
        this.getProductList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initProductList()
      },
      handleCurrentChange(val) {
        this.pageSize = val
        this.getProductList()
      },
    }
  }
</script>
