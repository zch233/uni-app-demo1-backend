<template>
  <el-dialog title="编辑商品" @closed="resetForm" width="800px" :visible.sync="formVisible" :close-on-click-modal="false" :show-close="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="可用权限" prop="right">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="checkedRights" @change="handleCheckedRightChange">
                <el-checkbox v-for="item in rights" :label="item" :key="item">{{ item }}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { editRole, addRole, getRightList } from '../api.js'

  export default {
    name: 'RoleEdit',
    props: {
      formVisible: Boolean,
      currentEditData: Object
    },
    data() {
      return {
        form: {},
        rules: {
          name: [{ required: true, message: '角色名称不能为空' }],
          status: [{ required: true, message: '状态不能为空' }],
        },
        checkAll: false,
        checkedRights: [],
        rights: [],
        isIndeterminate: false,
        rightList: [],
      }
    },
    watch: {
      formVisible: {
        immediate: true,
        handler () {
          if (this.formVisible) {
            this.form = Object.assign({}, this.currentEditData)
            this.checkedRights = this.currentEditData.right_arr ? this.currentEditData.right_arr.map(v => v.name) : []
            this.isIndeterminate = !!this.checkedRights.length
          }
        }
      }
    },
    created () {
      this.getRightList()
    },
    methods: {
      async getRightList () {
        const data = await getRightList({ page_size: 999, current_page: 1 })
        this.rightList = data.data
        this.rights = data.data.map(v => v.name)
      },
      async save () {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            let formData = this.form
            formData.new ? await addRole(formData) : await editRole(formData)
            this.$emit('confirm')
          } else {
            this.$message({ message: '请输入正确的表单内容', type: 'error' })
            return false;
          }
        });
      },
      handleCheckAllChange(val) {
        if (val) {
          this.checkedRights = this.rights;
          this.$set(this.form, 'right', this.getRealRight(this.rights))
        } else {
          this.checkedRights = [];
          this.$set(this.form, 'right', [])
        }
        this.isIndeterminate = false;
      },
      handleCheckedRightChange(value) {
        this.$set(this.form, 'right', this.getRealRight(value))
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.rights.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.rights.length;
      },
      getRealRight (right) {
        return right.map(v => this.rightList.map(v2 => v === v2.name && v2).filter(Boolean)).reduce((a, b) => a.concat(b), [])
      },
      resetForm() {
        this.$refs.form.resetFields();
      }
    }
  }
</script>
