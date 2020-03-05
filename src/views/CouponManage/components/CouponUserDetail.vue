<template>
  <el-dialog title="领取详情" @closed="resetForm" width="900px" :visible.sync="formVisible" :close-on-click-modal="false" :before-close="() => $emit('cancel')">
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="日期：" prop="start_time_js">
        <el-date-picker
          v-model.number="searchForm.start_time_js"
          value-format="timestamp"
          type="date"
          placeholder="开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="至" prop="end_time_js">
        <el-date-picker
          v-model.number="searchForm.end_time_js"
          value-format="timestamp"
          type="date"
          placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="initCouponUserList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button>
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
        prop="name"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="type"
        label="等级">
        <template slot-scope="scope">
          {{ scope.row.type === 1 ? '普通会员' : '黄金会员' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="user_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="used"
        label="使用">
        <template slot-scope="scope">
          {{ scope.row.status === 3 ? '已使用' : '未使用' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="get"
        label="领取">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '未领取' : '已领取' }}
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import { getCouponUserList } from '../api.js'

  export default {
    name: 'CouponUserDetail',
    props: {
      formVisible: Boolean,
      currentEditData: Object
    },
    data() {
      return {
        status: { 1: '未领取', 2: '已领取', 3: '已使用', 4: '已过期' },
        searchForm: {},
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    watch: {
      formVisible: {
        immediate: true,
        handler () {
          if (this.formVisible === true) {
            this.getCouponUserList()
          }
        }
      }
    },
    methods: {
      async getCouponUserList () {
        ['start_time_js', 'end_time_js'].map(v => this.searchForm[v] && (this.searchForm[v.slice(0, -3)] = this.searchForm[v] / 1000))
        const data = await getCouponUserList({ page_size: this.pageSize, page: this.currentPage, id: this.currentEditData.id, ...this.searchForm })
        this.tableData = data.data
        this.total = data.total_num
      },
      initCouponUserList () {
        this.currentPage = 1
        this.getCouponUserList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initCouponUserList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getCouponUserList()
      },
      resetForm() {
        this.$refs.searchForm.resetFields();
      }
    }
  }
</script>
