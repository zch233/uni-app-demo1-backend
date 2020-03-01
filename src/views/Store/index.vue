<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
      <el-col :span="24">
        <el-button @click="showProductEditForm({new:1})" type="success">新增门店</el-button>
      </el-col>
    </el-row>
    <el-form ref="searchForm" :model="searchForm" label-width="80px">
      <el-col :span="11">
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
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态：" prop="status">
            <el-select v-model.number="searchForm.status" placeholder="请选择">
              <el-option label="全部" :value="undefined"></el-option>
              <el-option v-for="(item, index) in status" :key="item" :label="item" :value="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      <el-row>
        <el-col :span="6">
          <el-form-item label="运单号：" prop="mail_id">
            <el-input v-model="searchForm.mail_id" placeholder="请输入运单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单号：" prop="order_id">
            <el-input v-model="searchForm.order_id" placeholder="请输入订单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align:right;"><el-button type="primary" @click="initProductList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button></el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      ref="table"
      border
      style="width: 100%">
      <el-table-column
        prop="product"
        label="商品">
        <template slot-scope="scope">
          <p v-for="item in scope.row.goods_detail" :key="item.id">{{ item.title }}x{{ item.buy_number }} ￥{{ (item.price * item.buy_number).toFixed(2) * 1 }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="vip"
        label="会员"
        width="60">
        <template slot-scope="scope">
          <el-avatar shape="square" :src="scope.row.avatar"></el-avatar>
          <div>{{ scope.row.nickname }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="mailno"
        label="运单号">
        <template slot-scope="scope">
          <p v-if="scope.row.mailno1">收：{{ scope.row.mailno1 }}</p>
          <p v-if="scope.row.mailno2">发：{{ scope.row.mailno2 }}</p>
          <p v-if="!scope.row.mailno1 && !scope.row.mailno2">暂无</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="下单时间">
      </el-table-column>
      <el-table-column
        prop="total_price"
        label="合计">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <el-tag>{{ status[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button @click="showProductEditForm(scope.row)" size="mini" type="success">发货</el-button>
          <el-button @click="showProductEditForm(scope.row)" size="mini" type="primary">详情</el-button>
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
    <store-edit
      :form-visible="storeEditFormVisible"
      :current-edit-data="currentEditData"
      @cancel="storeEditFormVisible=false"
      @confirm="storeEditFormVisible=false, initProductList()"
    ></store-edit>
  </div>
</template>

<script>
  import { getStoreOrderList } from './api.js'
  import StoreEdit from './components/StoreEdit'

  export default {
    name: 'Store',
    components: { StoreEdit },
    data() {
      return {
        storeEditFormVisible: false,
        currentEditData: {},
        searchForm: {},
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
        status: ['订单已取消', '未付款', '已付款', '已揽件', '门店签收', '门店发货', '用户收货'],
      }
    },
    created () {
      this.getStoreOrderList()
    },
    methods: {
      async getStoreOrderList () {
        const data = await getStoreOrderList({ page_size: this.pageSize, current_page: this.currentPage, ...this.searchForm })
        this.tableData = data.data
        this.total = data.total_num
      },
      showProductEditForm (data) {
        this.storeEditFormVisible = true
        this.currentEditData = data
      },
      initProductList () {
        this.currentPage = 1
        this.getStoreOrderList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initProductList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getStoreOrderList()
      },
    }
  }
</script>
