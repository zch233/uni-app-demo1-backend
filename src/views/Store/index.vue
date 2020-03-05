<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
      <el-col :span="12">
        <el-avatar :size="70" :src="storeInfo.image"></el-avatar>
        <el-tag v-if="storeInfo.status === 1">运营中</el-tag>
        <el-tag type="danger" v-else>停运</el-tag>
        <el-button type="primary" size="small" icon="el-icon-s-tools" circle  @click="storeEditFormVisible = true"></el-button>
      </el-col>
      <el-col :span="12" style="text-align:right;">
        <el-input placeholder="请输入运单号" v-model="mail_no" @keydown.13="signOrder">
          <template slot="append"><el-button type="primary" @click="signOrder">签收</el-button></template>
        </el-input>
      </el-col>
    </el-row>
    <el-form ref="searchForm" :inline="true" :model="searchForm">
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
      <el-form-item label="状态：" prop="status">
        <el-select v-model.number="searchForm.status" placeholder="请选择">
          <el-option label="全部" :value="undefined"></el-option>
          <el-option v-for="(item, index) in status" :key="item" :label="item" :value="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运单号：" prop="mail_id">
        <el-input v-model="searchForm.mail_id" placeholder="请输入运单号"></el-input>
      </el-form-item>
      <el-form-item label="订单号：" prop="order_id">
        <el-input v-model="searchForm.order_id" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="initStoreOrderList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button>
      </el-form-item>
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
        width="150">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.status !== 4" size="mini" type="success" @click="sendOrder(scope.row)">发货</el-button>
          <el-button size="mini" type="primary" @click="viewOrderDetail(scope.row)">详情</el-button>
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
      :current-edit-data="storeInfo"
      @cancel="storeEditFormVisible=false"
      @confirm="storeEditFormVisible=false, getStoreInfo()"
    ></store-edit>
    <order-detail
      :form-visible="orderDetailVisible"
      :current-edit-data="currentEditData"
      :props-status="status"
      @cancel="orderDetailVisible=false"
    ></order-detail>
  </div>
</template>

<script>
  import { getStoreOrderList, signOrder, sendOrder } from './api.js'
  import { getStoreList } from '../StoreManage/api.js'
  import StoreEdit from '../StoreManage/components/StoreEdit'
  import OrderDetail from '../OrderManage/components/OrderDetail'
  import { getOrderList } from '../OrderManage/api.js'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Store',
    components: { StoreEdit, OrderDetail },
    computed: {
      ...mapGetters(['shop_id'])
    },
    data() {
      return {
        storeEditFormVisible: false,
        orderDetailVisible: false,
        currentEditData: {},
        storeInfo: {},
        searchForm: {},
        mail_no: '',
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
        status: ['订单已取消', '未付款', '已付款', '已揽件', '门店签收', '门店发货', '用户收货'],
      }
    },
    created () {
      this.getStoreOrderList()
      this.getStoreInfo(this.shop_id)
    },
    methods: {
      async getStoreOrderList () {
        ['start_time_js', 'end_time_js'].map(v => this.searchForm[v] && (this.searchForm[v.slice(0, -3)] = this.searchForm[v] / 1000))
        const data = await getStoreOrderList({ page_size: this.pageSize, page: this.currentPage, ...this.searchForm })
        this.tableData = data.data
        this.total = data.total_num
      },
      async getStoreInfo (id) {
        const data = await getStoreList({ id })
        this.storeInfo = data.data[0]
        this.storeInfo.image = process.env.VUE_APP_IMG_API + this.storeInfo.image
      },
      async signOrder () {
        if (this.mail_no === '') {
          this.$message({ message: '请输入运单号！', type: 'error' })
          return
        }
        await signOrder({ mail_no: this.mail_no })
        this.$message({ message: '签收成功！', type: 'success' })
        this.initStoreOrderList()
      },
      async viewOrderDetail ({ id }) {
        const { data } = await getOrderList({ id })
        this.orderDetailVisible = true
        this.currentEditData = data[0]
      },
      sendOrder ({ order_id }) {
        this.$confirm('点击确认将发货并自动生成运单号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await sendOrder({ order_id })
          this.$message({
            type: 'success',
            message: '发货成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发货'
          });          
        });
      },
      initStoreOrderList () {
        this.currentPage = 1
        this.getStoreOrderList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initStoreOrderList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getStoreOrderList()
      },
    }
  }
</script>
