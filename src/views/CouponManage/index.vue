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
        <el-button type="primary" @click="initCouponList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom:20px;">
      <el-col :span="24">
        <el-button @click="showCouponEditForm({new:1})" type="success">新增优惠券</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      ref="table"
      border
      style="width: 100%">
      <el-table-column
        prop="coupon_name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="coupon_number"
        label="发行量">
      </el-table-column>
      <el-table-column
        prop="gain_number"
        label="已领取">
      </el-table-column>
      <el-table-column
        prop="used_number"
        label="已使用">
      </el-table-column>
      <el-table-column
        prop="condition"
        label="使用门槛">
        <template slot-scope="scope">
          <div>满{{ scope.row.condition }}元可用</div>
          <div>{{ scope.row.user_type === 1 ? '所有会员' : '黄金会员' }}可用</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="coupon_price"
        label="面值">
      </el-table-column>
      <el-table-column
        prop="date"
        label="有效期">
        <template slot-scope="scope">
          {{ new Date(scope.row.coupon_start).toLocaleDateString() }} 至 {{ new Date(scope.row.coupon_end).toLocaleDateString() }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="140">
        <template slot-scope="scope">
          <el-switch
            style="display:block;"
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#aaa"
            active-text="上架"
            inactive-text="下架"
            :active-value="1"
            :inactive-value="2"
            @change="changeCouponStatus($event, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button @click="showCouponUserDetail(scope.row)" size="mini" type="success">领取详情</el-button>
          <el-button @click="showCouponEditForm(scope.row)" size="mini" type="primary">编辑</el-button>
          <el-popconfirm title="确认要删除吗？" @onConfirm="deleteCoupon(scope.row, scope.$index)">
            <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference"></el-button>
          </el-popconfirm>
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
    <coupon-edit
      :form-visible="couponEditFormVisible"
      :current-edit-data="currentEditData"
      @cancel="couponEditFormVisible=false"
      @confirm="couponEditFormVisible=false, initCouponList()"
    ></coupon-edit>
    <coupon-user-detail
      :form-visible="couponUserDetailVisible"
      :current-edit-data="currentEditData"
      @cancel="couponUserDetailVisible=false"
    ></coupon-user-detail>
  </div>
</template>

<script>
  import { getCouponList, deleteCoupon, editCoupon } from './api.js'
  import CouponEdit from './components/CouponEdit'
  import CouponUserDetail from './components/CouponUserDetail'

  export default {
    name: 'CouponManage',
    components: { CouponEdit, CouponUserDetail },
    data() {
      return {
        couponEditFormVisible: false,
        couponUserDetailVisible: false,
        currentEditData: {},
        searchForm: {},
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    watch: {
      '$route.meta.type': {
        immediate: true,
        handler: function() {
          this.initCouponList()
        }
      }
    },
    methods: {
      async getCouponList () {
        const data = await getCouponList({ page_size: this.pageSize, current_page: this.currentPage, type: this.$route.meta.type, ...this.searchForm })
        this.tableData = data.data.map(v => (v.coupon_start = v.coupon_start * 1000) && ((v.coupon_end = v.coupon_end * 1000)) && v)
        this.total = data.total_num
      },
      async deleteCoupon ({ id }, index) {
        await deleteCoupon({ id })
        this.$message({ message: '删除成功！', type: 'success' })
        this.tableData.splice(index, 1)
      },
      async changeCouponStatus (status, { id }) {
        await editCoupon({ id, status })
        this.$message({ message: '修改成功！', type: 'success' })
      },
      showCouponEditForm (data) {
        this.couponEditFormVisible = true
        this.currentEditData = data
      },
      showCouponUserDetail (data) {
        this.couponUserDetailVisible = true
        this.currentEditData = data
      },
      initCouponList () {
        this.currentPage = 1
        this.getCouponList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initCouponList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getCouponList()
      },
    }
  }
</script>
