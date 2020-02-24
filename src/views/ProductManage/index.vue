<template>
  <div class="app-container" v-loading="pageLoading">
    <el-form ref="searchForm" :model="searchForm" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="状态：" prop="status">
            <el-select v-model="searchForm.status" placeholder="请选择">
              <el-option label="全部" :value="undefined"></el-option>
              <el-option label="上架中" :value="1"></el-option>
              <el-option label="下架中" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="ID：" prop="id">
            <el-input v-model="searchForm.id" placeholder="请输入商品ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align:right;"><el-button type="primary" @click="initProductList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button></el-col>
      </el-row>
    </el-form>
    <el-row style="margin-bottom:20px;">
      <el-col :span="24">
        <el-button @click="showProductEditForm({new:1})" type="success">新增商品</el-button>
        <el-button v-show="selectedColumn.length" @click="batchProduct" type="warning">批量下架</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      ref="table"
      border
      style="width: 100%"
      @selection-change="selectedColumn=$event">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="order"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="image"
        label="图片"
        width="120">
        <template slot-scope="scope">
          <el-avatar shape="square" :src="scope.row.image"></el-avatar>
        </template>
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
        prop="number"
        label="销量">
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
          <el-popconfirm title="确认要删除吗？" @onConfirm="deleteProduct(scope.row, scope.$index)">
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
    <product-edit
      :form-visible="productEditFormVisible"
      :current-edit-data="currentEditData"
      @cancel="productEditFormVisible=false"
      @confirm="productEditFormVisible=false, initProductList()"
    ></product-edit>
  </div>
</template>

<script>
  import { getProductList, deleteProduct, editProduct, batchProduct } from './api.js'
  import ProductEdit from './components/ProductEdit'

  export default {
    name: 'ProductManage',
    components: { ProductEdit },
    data() {
      return {
        pageLoading: false,
        productEditFormVisible: false,
        currentEditData: {},
        searchForm: {},
        selectedColumn: [],
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
        status: { 1: '上架', 2: '下架', 3: '删除' },
      }
    },
    created () {
      this.getProductList()
    },
    methods: {
      async getProductList () {
        const data = await getProductList({ page_size: this.pageSize, current_page: this.currentPage, ...this.searchForm })
        this.tableData = data.data.map(v => (v.image = process.env.VUE_APP_IMG_API + v.image) && v)
        this.total = data.total_page * data.page_size
      },
      async deleteProduct ({ id }, index) {
        await deleteProduct({ id })
        this.$message({ message: '删除成功！', type: 'success' })
        this.tableData.splice(index, 1)
      },
      async changeProductStatus (status, { id }) {
        await editProduct({ id, status })
        this.$message({ message: '修改成功！', type: 'success' })
      },
      async batchProduct () {
        await batchProduct({ goods_id_arr: this.selectedColumn.map(v => v.id), status: 2 })
        this.$message({ message: '批量下架成功！', type: 'success' })
        this.$refs.table.setCurrentRow()
        this.getProductList()
      },
      showProductEditForm (data) {
        this.productEditFormVisible = true
        this.currentEditData = data
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
