<template>
  <div class="app-container">
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="状态：" prop="status">
        <el-select v-model.number="searchForm.status" placeholder="请选择">
          <el-option label="全部" :value="undefined"></el-option>
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词：" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="initAdminList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom:20px;">
      <el-col :span="24">
        <el-button @click="showAdminEditForm({new:1})" type="success">新增操作员</el-button>
        <el-button v-show="selectedColumn.length" @click="batchAdmin" type="warning">启用</el-button>
        <el-button v-show="selectedColumn.length" @click="batchAdmin" type="warning">禁用</el-button>
        <el-button v-show="selectedColumn.length" @click="batchAdmin" type="warning">删除</el-button>
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
        prop="user_login"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="所属角色">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
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
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="2"
            @change="changeAdminStatus($event, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button @click="showAdminEditForm(scope.row)" size="mini" type="primary">编辑</el-button>
          <el-popconfirm title="确认要删除吗？" @onConfirm="deleteAdmin(scope.row, scope.$index)">
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
    <admin-edit
      :form-visible="adminEditFormVisible"
      :current-edit-data="currentEditData"
      :props-role-list="roleList"
      @cancel="adminEditFormVisible=false"
      @confirm="adminEditFormVisible=false, initAdminList()"
    ></admin-edit>
  </div>
</template>

<script>
  import { getAdminList, deleteAdmin, editAdmin, batchAdmin } from './api.js'
  import { getRoleList } from '../Role/api.js'
  import AdminEdit from './components/AdminEdit'

  export default {
    name: 'Operation',
    components: { AdminEdit },
    data() {
      return {
        adminEditFormVisible: false,
        currentEditData: {},
        searchForm: {},
        selectedColumn: [],
        tableData: [],
        roleList: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    created () {
      this.getAdminList()
    },
    methods: {
      async getAdminList () {
        const data = await getAdminList({ page_size: this.pageSize, current_page: this.currentPage, ...this.searchForm })
        await this.getRoleList()
        this.tableData = data.data.map(v => (v.role_name = this.roleList.map(v2 => v.role_id === v2.id && v2.name).filter(Boolean).join()) && v)
      },
      async getRoleList () {
        const data = await getRoleList({ page_size: 999, current_page: 1 })
        this.roleList = data.data
      },
      async deleteAdmin ({ id }, index) {
        await deleteAdmin({ id })
        this.$message({ message: '删除成功！', type: 'success' })
        this.tableData.splice(index, 1)
      },
      async changeAdminStatus (status, { id }) {
        await editAdmin({ id, status })
        this.$message({ message: '修改成功！', type: 'success' })
      },
      async batchAdmin () {
        await batchAdmin({ goods_id_arr: this.selectedColumn.map(v => v.id), status: 2 })
        this.$message({ message: '批量下架成功！', type: 'success' })
        this.$refs.table.setCurrentRow()
        this.getAdminList()
      },
      showAdminEditForm (data) {
        this.adminEditFormVisible = true
        this.currentEditData = data
      },
      initAdminList () {
        this.currentPage = 1
        this.getAdminList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initAdminList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getAdminList()
      },
    }
  }
</script>
