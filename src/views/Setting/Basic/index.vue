<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="LOGO设置" prop="image">
            <img width="150" style="vertical-align:center;" v-show="form.image" :src="form.image">
            <el-button :disabled="formDisabled" type="primary" @click="myUploadVisible=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="加载图标" prop="image">
            <img width="150" style="vertical-align:center;" v-show="form.image" :src="form.image">
            <el-button :disabled="formDisabled" type="primary" @click="myUploadVisible=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="海报轮播1" prop="image">
            <img width="150" style="vertical-align:center;" v-show="form.image" :src="form.image">
            <el-button :disabled="formDisabled" type="primary" @click="myUploadVisible=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="轮播地址1" prop="goods_code">
            <el-input :disabled="formDisabled" v-model="form.goods_code" placeholder="请输入商品编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="海报轮播2" prop="image">
            <img width="150" style="vertical-align:center;" v-show="form.image" :src="form.image">
            <el-button :disabled="formDisabled" type="primary" @click="myUploadVisible=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="轮播地址2" prop="goods_code">
            <el-input :disabled="formDisabled" v-model="form.goods_code" placeholder="请输入商品编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="海报轮播3" prop="image">
            <img width="150" style="vertical-align:center;" v-show="form.image" :src="form.image">
            <el-button :disabled="formDisabled" type="primary" @click="myUploadVisible=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="轮播地址3" prop="goods_code">
            <el-input :disabled="formDisabled" v-model="form.goods_code" placeholder="请输入商品编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号绑定" prop="sales_status">
            <el-radio-group :disabled="formDisabled" v-model="form.sales_status">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="门店抵用券金额" prop="goods_code">
            <el-input :disabled="formDisabled" v-model.number="form.goods_code" placeholder="请输入商品编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="全年最高可领" prop="goods_code">
            <el-input :disabled="formDisabled" v-model.number="form.goods_code" placeholder="请输入商品编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="洗涤抵用券金额" prop="goods_code">
            <el-input :disabled="formDisabled" v-model.number="form.goods_code" placeholder="请输入商品编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="全年最高可领" prop="goods_code">
            <el-input :disabled="formDisabled" v-model.number="form.goods_code" placeholder="请输入商品编码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button type="success" v-show="formDisabled" @click="formDisabled = false">编 辑</el-button>
      <el-button v-show="!formDisabled" @click="formDisabled = true">取 消</el-button>
      <el-button v-show="!formDisabled" type="primary" @click="save">保 存</el-button>
    </div>
    <my-upload
      @crop-success="cropSuccess"
      v-model="myUploadVisible"
      :key="myUploadKey"
      :width="100"
      :height="100"
      img-format="png">
    </my-upload>
  </div>
</template>

<script>
  import { editProduct, addProduct } from './api.js'
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
        myUploadKey: 0,
        formDisabled: true,
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
      async cropSuccess (imageDataUrl) {
        this.form.image = imageDataUrl
      },
      resetForm() {
        this.$refs.form.resetFields();
      }
    }
  }
</script>
