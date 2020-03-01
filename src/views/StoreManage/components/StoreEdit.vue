<template>
  <el-dialog title="编辑门店" @closed="resetForm" width="800px" :visible.sync="formVisible" :close-on-click-modal="false" :show-close="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="form.id" label="门店ID" prop="id">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="门店名称" prop="shop_name">
            <el-input v-model="form.shop_name" placeholder="请输入门店名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="省市区" prop="addressData">
              <el-cascader
                :options="options"
                v-model="form.addressData">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运营状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="门店图片" prop="image">
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { editStore, addStore } from '../api.js'
  import { uploadImg } from '@/api/user.js'
  import myUpload from 'vue-image-crop-upload'
  import { regionData, CodeToText, TextToCode } from 'element-china-area-data'

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
        options: regionData,
        form: {},
        rules: {
          shop_name: [{ required: true, message: '门店名称不能为空' }],
          image: [{ required: true, message: '门店图片不能为空' }],
          address: [{ required: true, message: '门店地址不能为空' }],
          phone: [{ required: true, message: '门店电话不能为空' }],
        },
      }
    },
    watch: {
      currentEditData: {
        deep: true,
        handler () {
          const addressData = this.currentEditData.new ? {} : { addressData: [TextToCode[this.currentEditData.province].code, TextToCode[this.currentEditData.province][this.currentEditData.city].code, TextToCode[this.currentEditData.province][this.currentEditData.city][this.currentEditData.county].code] }
          this.form = Object.assign({}, this.currentEditData, addressData)
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
            formData = Object.assign({}, formData, { province: CodeToText[formData.addressData[0]], city: CodeToText[formData.addressData[1]], county: CodeToText[formData.addressData[2]] })
            formData.new ? await addStore(formData) : await editStore(formData)
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
