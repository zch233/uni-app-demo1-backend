<template>
  <el-dialog title="编辑操作员" @closed="resetForm" width="800px" :visible.sync="formVisible" :close-on-click-modal="false" :show-close="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="user_login">
            <el-input v-model="form.user_login" placeholder="请输入操作员用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="user_password">
            <el-input v-model="form.user_password" placeholder="请输入操作员密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属角色" prop="role_id">
            <el-select v-model.number="form.role_id" placeholder="请选择操作员所属角色">
              <el-option v-for="item in propsRoleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入操作员姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入操作员电话"></el-input>
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
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { editAdmin, addAdmin } from '../api.js'

  export default {
    name: 'RoleEdit',
    props: {
      formVisible: Boolean,
      currentEditData: Object,
      propsRoleList: Array,
    },
    data() {
      return {
        form: {},
        rules: {
          user_login: [{ required: true, message: '管理员登录账号不能为空' }],
          user_password: [{ required: false, message: '管理员登录密码不能为空' }],
          role_id: [{ required: true, message: '角色ID不能为空' }],
        },
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
    methods: {
      async save () {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            let formData = this.form
            formData.new ? await addAdmin(formData) : await editAdmin(formData)
            this.$emit('confirm')
          } else {
            this.$message({ message: '请输入正确的表单内容', type: 'error' })
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.form.resetFields();
      }
    }
  }
</script>
