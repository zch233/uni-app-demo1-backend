<template>
  <div class="app-container">
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="优惠券码：" prop="coupon_code">
        <el-input v-model.number="searchForm.coupon_code" placeholder="请输入优惠券码"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="initProductList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom:20px;">
      <el-col :span="12">
        <el-input v-model="useVerifyCode" @keydown.native.13="useVerify" placeholder="请输入优惠券码">
          <template slot="append">
            <el-button @click="useVerify" icon="el-icon-s-claim" type="success">核销</el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      ref="table"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="coupon_name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="title"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="condition"
        label="使用门槛">
        <template slot-scope="scope">
          满 {{ scope.row.condition }}
        </template>
      </el-table-column>
      <el-table-column
        prop="coupon_price"
        label="面值">
      </el-table-column>
      <el-table-column
        prop="user_type"
        label="会员等级">
        <template slot-scope="scope">
          {{ scope.row.user_type === 1 ? '所有会员' : '黄金会员' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="优惠券码">
      </el-table-column>
      <el-table-column
        prop="name"
        label="会员">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="use_time"
        label="使用时间">
        <template slot-scope="scope">
          {{ scope.row.use_time ? new Date(scope.row.use_time).toLocaleString() : '无' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          {{ scope.row.status === 3 ? '已使用' : '未使用' }}
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
  import { getVerifyList, useVerify } from './api.js'

  export default {
    name: 'Verify',
    data() {
      return {
        searchForm: {},
        tableData: [],
        useVerifyCode: '',
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    created () {
      this.getVerifyList()
    },
    methods: {
      async getVerifyList () {
        const data = await getVerifyList({ page_size: this.pageSize, current_page: this.currentPage, ...this.searchForm })
        this.tableData = data.data
        this.total = data.total_num
      },
      async useVerify () {
        if (this.useVerifyCode === '') {
          this.$message({ message: '请输入正确的优惠券码！', type: 'error' })
          return
        }
        await useVerify({ coupon_code: this.useVerifyCode })
        this.$message({ message: '核销成功！', type: 'success' })
      },
      initProductList () {
        this.currentPage = 1
        this.getVerifyList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initProductList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getVerifyList()
      },
    }
  }
</script>
