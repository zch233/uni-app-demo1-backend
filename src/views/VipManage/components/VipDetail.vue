<template>
  <el-dialog title="会员详情" @closed="resetForm" width="800px" :visible.sync="formVisible" :close-on-click-modal="false" :show-close="false">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="排序" prop="order">
                <el-input v-model.number="form.order" placeholder="数字越大，排名越靠前，默认为创建时间"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品名称" prop="title">
                <el-input v-model="form.title" placeholder="请输入商品名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位" prop="unit">
                <el-input v-model="form.unit" placeholder="单位：如个/包/件"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="副标题" prop="desc">
                <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容,100字以内" maxlength="100" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="销量" prop="number">
                <el-input v-model.number="form.number" placeholder="请输入商品销量"><template slot="append">件</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示销量" prop="sales_status">
                <el-radio-group v-model="form.sales_status">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品价格" prop="price">
                <el-input v-model.number="form.price" placeholder="请输入商品价格"><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品编码" prop="goods_code">
                <el-input v-model="form.goods_code" placeholder="请输入商品编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品图片" prop="image">
                <my-upload
                  @crop-success="cropSuccess"
                  v-model="myUploadVisible"
                  :width="150"
                  :height="150"
                  img-format="png">
                </my-upload>
                <img width="150" style="vertical-align:center;" v-show="form.image" :src="form.image">
                <el-button type="primary" @click="myUploadVisible=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="交易信息">配置管理</el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getProductList, editProduct, addProduct } from '../api.js'
  import { uploadImg } from '@/api/user.js'
  import myUpload from 'vue-image-crop-upload'

  export default {
    name: 'ProductEdit',
    components: { myUpload },
    props: {
      formVisible: Boolean,
      currentEditData: Object
    },
    data() {
      return {
        myUploadVisible: false,
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
            this.resetForm()
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
