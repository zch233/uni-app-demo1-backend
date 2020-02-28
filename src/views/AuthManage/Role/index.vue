<template>
  <div class="app-container">
    <el-form ref="searchForm" :model="searchForm" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="状态：" prop="status">
            <el-select v-model.number="searchForm.status" placeholder="请选择">
              <el-option label="全部" :value="undefined"></el-option>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="ID：" prop="id">
            <el-input v-model.number="searchForm.id" placeholder="请输入关键词"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align:right;"><el-button type="primary" @click="initRoleList">搜索</el-button><el-button @click="$refs.searchForm.resetFields()">重置</el-button></el-col>
      </el-row>
    </el-form>
    <el-row style="margin-bottom:20px;">
      <el-col :span="24">
        <el-button @click="showRoleEditForm({new:1})" type="success">新增角色</el-button>
        <el-button v-show="selectedColumn.length" @click="batchRole" type="warning">启用</el-button>
        <el-button v-show="selectedColumn.length" @click="batchRole" type="warning">禁用</el-button>
        <el-button v-show="selectedColumn.length" @click="batchRole" type="warning">删除</el-button>
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
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="admin_total"
        label="操作员数量">
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
            @change="changeRoleStatus($event, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button @click="showRoleEditForm(scope.row)" size="mini" type="primary">编辑</el-button>
          <el-popconfirm title="确认要删除吗？" @onConfirm="deleteRole(scope.row, scope.$index)">
            <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <role-edit
      :form-visible="roleEditFormVisible"
      :current-edit-data="currentEditData"
      @cancel="roleEditFormVisible=false"
      @confirm="roleEditFormVisible=false, initRoleList()"
    ></role-edit>
  </div>
</template>

<script>
  import { getRoleList, deleteRole, editRole, batchRole } from './api.js'
  import RoleEdit from './components/RoleEdit'

  export default {
    name: 'Role',
    components: { RoleEdit },
    data() {
      return {
        roleEditFormVisible: false,
        currentEditData: {},
        searchForm: {},
        selectedColumn: [],
        tableData: [],
      }
    },
    created () {
      this.getRoleList()
    },
    methods: {
      async getRoleList () {
        const data = await getRoleList({ page_size: 999, current_page: 1, ...this.searchForm })
        this.tableData = data.data
      },
      async deleteRole ({ id }, index) {
        await deleteRole({ id })
        this.$message({ message: '删除成功！', type: 'success' })
        this.tableData.splice(index, 1)
      },
      async changeRoleStatus (status, { id }) {
        await editRole({ id, status })
        this.$message({ message: '修改成功！', type: 'success' })
      },
      async batchRole () {
        await batchRole({ goods_id_arr: this.selectedColumn.map(v => v.id), status: 2 })
        this.$message({ message: '批量下架成功！', type: 'success' })
        this.$refs.table.setCurrentRow()
        this.getRoleList()
      },
      showRoleEditForm (data) {
        this.roleEditFormVisible = true
        this.currentEditData = data
      },
      initRoleList () {
        this.currentPage = 1
        this.getRoleList()
      },
    }
  }
</script>
