<template>
  <div class="app-container">
    <el-form ref="searchForm" :model="searchForm" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="ID：" prop="id">
            <el-input v-model.number="searchForm.id" placeholder="请输入门店ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align:right;"><el-button type="primary" @click="initProductList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button></el-col>
      </el-row>
    </el-form>
    <el-row style="margin-bottom:20px;">
      <el-col :span="24">
        <el-button @click="showProductEditForm({new:1})" type="success">新增门店</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      ref="table"
      border
      style="width: 100%">
      <el-table-column
        prop="image"
        label="图片"
        width="60">
        <template slot-scope="scope">
          <el-avatar shape="square" :src="scope.row.image"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="shop_name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
        <template slot-scope="scope">
          {{ scope.row.province + scope.row.city + scope.row.county + scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="160">
        <template slot-scope="scope">
          <el-switch
            style="display:block;"
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#aaa"
            active-text="运营中"
            inactive-text="停运"
            :active-value="1"
            :inactive-value="2"
            @change="changeProductStatus($event, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button @click="showProductEditForm(scope.row)" size="mini" type="primary">编辑</el-button>
          <el-popconfirm title="确认要删除吗？" @onConfirm="deleteStore(scope.row, scope.$index)">
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
    <store-edit
      :form-visible="storeEditFormVisible"
      :current-edit-data="currentEditData"
      @cancel="storeEditFormVisible=false"
      @confirm="storeEditFormVisible=false, initProductList()"
    ></store-edit>
  </div>
</template>

<script>
  import { getStoreList, deleteStore, editStore } from './api.js'
  import StoreEdit from './components/StoreEdit'

  export default {
    name: 'StoreManage',
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
      }
    },
    created () {
      this.getStoreList()
    },
    methods: {
      async getStoreList () {
        const data = await getStoreList({ page_size: this.pageSize, current_page: this.currentPage, ...this.searchForm })
        this.tableData = data.data.map(v => (v.image = process.env.VUE_APP_IMG_API + v.image) && v)
        this.total = data.total_num
      },
      async deleteStore ({ id }, index) {
        await deleteStore({ id })
        this.$message({ message: '删除成功！', type: 'success' })
        this.tableData.splice(index, 1)
      },
      async changeProductStatus (status, { id }) {
        await editStore({ id, status })
        this.$message({ message: '修改成功！', type: 'success' })
      },
      showProductEditForm (data) {
        this.storeEditFormVisible = true
        this.currentEditData = data
      },
      initProductList () {
        this.currentPage = 1
        this.getStoreList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initProductList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getStoreList()
      },
    }
  }
</script>
