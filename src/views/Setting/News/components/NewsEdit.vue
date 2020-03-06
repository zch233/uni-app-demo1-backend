<template>
  <el-dialog title="编辑消息模版" @closed="resetForm" width="600px" :visible.sync="formVisible" :close-on-click-modal="false" :show-close="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="消息主题" prop="content">
            <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="消息备注" prop="remark">
            <el-input type="textarea" v-model="form.remark" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容"></el-input>
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
  import { editNews, addNews } from '../api.js'

  export default {
    name: 'ProductEdit',
    props: {
      formVisible: Boolean,
      currentEditData: Object
    },
    data() {
      return {
        form: {},
        rules: {
          content: [{ required: true, message: '消息主题不能为空' }],
          remark: [{ required: true, message: '消息备注不能为空' }],
        },
      }
    },
    watch: {
      currentEditData: {
        deep: true,
        immediate: true,
        handler () {
          this.form = Object.assign({}, this.currentEditData)
        }
      }
    },
    methods: {
      async save () {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            let formData = this.form
            formData.new ? await addNews(formData) : await editNews(formData)
            this.$emit('confirm')
          } else {
            this.$message({ message: '请输入正确的表单内容', type: 'error' })
            return false;
          }
        });

      },
      async cropSuccess (imageDataUrl) {
        this.form.image = imageDataUrl
      },
      resetForm() {
        this.$refs.form.resetFields();
      }
    }
  }
</script>
