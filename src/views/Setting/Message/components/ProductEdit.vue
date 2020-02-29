<template>
  <el-dialog title="编辑商品" @closed="resetForm" width="800px" :visible.sync="formVisible" :close-on-click-modal="false" :show-close="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="form.title" placeholder="请输入商品名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付方式" prop="sales_status">
            <el-radio-group v-model="form.sales_status">
              <el-radio :label="1">微信支付</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="sales_status">
            <el-radio-group v-model="form.sales_status">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="短信内容" prop="title">
              <el-input type="textarea" v-model="remarkForm.in_remark" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容,100字以内" maxlength="100" show-word-limit></el-input>
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
  import { editProduct, addProduct } from '../api.js'

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
          title: [{ required: true, message: '商品名称不能为空' }],
          desc: [{ required: true, message: '商品副标题不能为空' }],
          unit: [{ required: true, message: '商品单位不能为空' }],
          price: [{ required: true, message: '商品价格不能为空' }],
          image: [{ required: true, message: '商品图片不能为空' }],
          price: [{ required: true, message: '商品价格不能为空' }],
          number: [{ required: true, message: '商品价销量不能为空' }],
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
            if (formData.image.indexOf(';base64,') >= 0) {
              const data = await uploadImg(formData.image)
              formData = Object.assign({}, formData, { image: data.image })
            } else {
              formData = Object.assign({}, formData, { image: formData.image.replace(process.env.VUE_APP_IMG_API, '')})
            }
            formData.new ? await addProduct(formData) : await editProduct(formData)
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
