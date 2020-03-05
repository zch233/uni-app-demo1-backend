<template>
  <div class="app-container">
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="UID：" prop="uid">
        <el-input v-model="searchForm.id" placeholder="请输入会员UID"></el-input>
      </el-form-item>
      <el-form-item label="等级：" prop="type">
        <el-select v-model.number="searchForm.type" placeholder="请选择">
          <el-option label="全部" :value="undefined"></el-option>
          <el-option label="普通会员" :value="1"></el-option>
          <el-option label="黄金会员" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input v-model.number="searchForm.mobile" placeholder="请输入会员手机号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="initVipList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button>
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
          <el-avatar shape="square" :src="scope.row.image"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
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
        prop="uid"
        label="UID">
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="deal"
        label="成交">
        <template slot-scope="scope">
          <p>订单：{{ scope.row.total_order }}</p>
          <p>金额：{{ scope.row.total_price }}</p>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="showVipDetail(scope.row)" size="mini" type="primary">会员详情</el-button>
          <el-button @click="viewVipOrderList(scope.row)" size="mini" type="success">订单详情</el-button>
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
    <vip-detail
      :form-visible="vipDetailVisible"
      :current-edit-data="currentEditData"
      @cancel="vipDetailVisible=false"
      @confirm="initVipList()"
    ></vip-detail>
  </div>
</template>

<script>
  import { getVipList } from './api.js'
  import VipDetail from './components/VipDetail'

  export default {
    name: 'VipManage',
    components: { VipDetail },
    data() {
      return {
        vipDetailVisible: false,
        currentEditData: {},
        searchForm: {},
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    created () {
      this.getVipList()
    },
    methods: {
      async getVipList () {
        const data = await getVipList({ page_size: this.pageSize, page: this.currentPage, ...this.searchForm })
        this.tableData = data.data
        this.total = data.total_num
      },
      showVipDetail (data) {
        this.vipDetailVisible = true
        this.currentEditData = data
      },
      viewVipOrderList ({ uid }) {
        this.$router.push({
          path: '/order-manage/index',
          query: { user_id: uid },
        })
      },
      initVipList () {
        this.currentPage = 1
        this.getVipList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initVipList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getVipList()
      },
    }
  }
</script>
