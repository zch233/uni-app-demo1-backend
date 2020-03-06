<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
      <el-col :span="24">
        <el-button @click="showNewsEditForm({new:1})" type="success">新增模版消息</el-button>
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
        prop="content"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button @click="showNewsEditForm(scope.row)" size="mini" type="primary">编辑</el-button>
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
    <news-edit
      :form-visible="newsEditFormVisible"
      :current-edit-data="currentEditData"
      @cancel="newsEditFormVisible=false"
      @confirm="newsEditFormVisible=false, initNewsList()"
    ></news-edit>
  </div>
</template>

<script>
  import { getNewsList } from './api.js'
  import NewsEdit from './components/NewsEdit'

  export default {
    name: 'NewsSetting',
    components: { NewsEdit },
    data() {
      return {
        newsEditFormVisible: false,
        currentEditData: {},
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    created () {
      this.getNewsList()
    },
    methods: {
      async getNewsList () {
        const data = await getNewsList({ page_size: this.pageSize, page: this.currentPage })
        this.tableData = data.data
        this.total = data.total_num
      },
      showNewsEditForm (data) {
        this.newsEditFormVisible = true
        this.currentEditData = data
      },
      initNewsList () {
        this.currentPage = 1
        this.getNewsList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initNewsList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getNewsList()
      },
    }
  }
</script>
