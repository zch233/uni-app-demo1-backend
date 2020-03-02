<template>
  <div class="app-container">
    <el-form ref="imageForm" :model="imageForm" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="LOGO设置" prop="logo">
            <img width="150" style="vertical-align:center;" v-show="imageForm.logo" :src="imageForm.logo">
            <el-button :disabled="imageFormDisabled" type="primary" @click="showSmallUploader('logo')">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="加载图标" prop="icon">
            <img width="150" style="vertical-align:center;" v-show="imageForm.icon" :src="imageForm.icon">
            <el-button :disabled="imageFormDisabled" type="primary" @click="showSmallUploader('icon')">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="海报轮播1" prop="image1">
            <img width="150" style="vertical-align:center;" v-show="imageForm.image1" :src="imageForm.image1">
            <el-button :disabled="imageFormDisabled" type="primary" @click="showBigUploader('image1')">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="轮播地址1" prop="url1">
            <el-input :disabled="imageFormDisabled" v-model="imageForm.url1" placeholder="请输入轮播地址1"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="海报轮播2" prop="image2">
            <img width="150" style="vertical-align:center;" v-show="imageForm.image2" :src="imageForm.image2">
            <el-button :disabled="imageFormDisabled" type="primary" @click="showBigUploader('image2')">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="轮播地址2" prop="url2">
            <el-input :disabled="imageFormDisabled" v-model="imageForm.url2" placeholder="请输入轮播地址2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="海报轮播3" prop="image3">
            <img width="150" style="vertical-align:center;" v-show="imageForm.image3" :src="imageForm.image3">
            <el-button :disabled="imageFormDisabled" type="primary" @click="showBigUploader('image3')">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="轮播地址3" prop="url3">
            <el-input :disabled="imageFormDisabled" v-model="imageForm.url3" placeholder="请输入轮播地址3"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="margin-bottom:40px;">
      <el-button type="success" v-show="imageFormDisabled" @click="imageFormDisabled = false">编 辑</el-button>
      <el-button v-show="!imageFormDisabled" @click="imageFormDisabled = true">取 消</el-button>
      <el-button v-show="!imageFormDisabled" type="primary" @click="editImageConfig">保 存</el-button>
    </div>
    <el-form ref="configForm" :model="configForm" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="手机号绑定" prop="bind_phone.value">
            <el-radio-group :disabled="configFormDisabled" v-model="configForm.bind_phone.value">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="门店抵用券金额" prop="shop_coupon.value">
            <el-input :disabled="configFormDisabled" v-model.number="configForm.shop_coupon.value" placeholder="请输入会员每月可领取的金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="全年最高可领" prop="shop_coupon_year.value">
            <el-input :disabled="configFormDisabled" v-model.number="configForm.shop_coupon_year.value" placeholder="请输入全年最高可领"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="洗涤抵用券金额" prop="wash_coupon.value">
            <el-input :disabled="configFormDisabled" v-model.number="configForm.wash_coupon.value" placeholder="请输入会员每月可领取的金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="全年最高可领" prop="wash_coupon_year.value">
            <el-input :disabled="configFormDisabled" v-model.number="configForm.wash_coupon_year.value" placeholder="请输入全年最高可领"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-button type="success" v-show="configFormDisabled" @click="configFormDisabled = false">编 辑</el-button>
      <el-button v-show="!configFormDisabled" @click="configFormDisabled = true">取 消</el-button>
      <el-button v-show="!configFormDisabled" type="primary" @click="editGlobalConfig">保 存</el-button>
    </div>
    <my-upload
      @crop-success="cropSuccess"
      v-model="myUploadVisible"
      :key="myUploadKey"
      :width="cropShapeWidth"
      :height="cropShapeHeight"
      img-format="png">
    </my-upload>
  </div>
</template>

<script>
  import { getImageConfig, editImageConfig, getGlobalConfig, editGlobalConfig } from './api.js'
  import { uploadImg } from '@/api/user.js'
  import myUpload from 'vue-image-crop-upload'

  export default {
    name: 'BasicSetting',
    components: { myUpload },
    data() {
      return {
        currentImage: '',
        myUploadVisible: false,
        myUploadKey: 0,
        imageFormDisabled: true,
        configFormDisabled: true,
        cropShapeWidth: 100,
        cropShapeHeight: 100,
        imageForm: {},
        imageArr: ['logo', 'icon', 'image1', 'image2', 'image3'],
        configForm: { shop_coupon: {}, wash_coupon: {}, bind_phone: {} },
      }
    },
    created () {
      this.getImageConfig()
      this.getGlobalConfig()
    },
    methods: {
      async getImageConfig () {
        const data = await getImageConfig()
        this.imageForm = data
        this.imageArr.map(v => (data[v] = process.env.VUE_APP_IMG_API + data[v]))
      },
      async getGlobalConfig () {
        const data = await getGlobalConfig()
        this.configForm = data
      },
      async editImageConfig (form) {
        this.$refs.imageForm.validate(async (valid) => {
          if (valid) {
            let formData = this.imageForm
            for (let v = 0; v < this.imageArr.length; v ++) {
              if (formData[this.imageArr[v]].indexOf(';base64,') >= 0) {
                const data = await uploadImg(formData[this.imageArr[v]])
                formData = Object.assign({}, formData, { [this.imageArr[v]]: data.image })
              } else {
                formData = Object.assign({}, formData, { [this.imageArr[v]]: formData[this.imageArr[v]].replace(process.env.VUE_APP_IMG_API, '')})
              }
            }
            await editImageConfig(formData)
            this.imageFormDisabled = true
            this.$message({ message: '修改图片配置成功', type: 'success' })
          } else {
            this.$message({ message: '请输入正确的表单内容', type: 'error' })
            return false;
          }
        });
      },
      async editGlobalConfig (form) {
        this.$refs.configForm.validate(async (valid) => {
          if (valid) {
            const formData = {}
            for (let i in this.configForm) {
              formData[i] = this.configForm[i].value
            }
            await editGlobalConfig(formData)
            this.configFormDisabled = true
            this.$message({ message: '修改配置成功', type: 'success' })
          } else {
            this.$message({ message: '请输入正确的表单内容', type: 'error' })
            return false;
          }
        });
      },
      async cropSuccess (imageDataUrl) {
        this.imageForm[this.currentImage] = imageDataUrl
        this.myUploadVisible = false
        this.myUploadKey += 1
      },
      showUploader (image) {
        this.currentImage = image
        this.myUploadKey += 1
        this.myUploadVisible = true
      },
      showSmallUploader (image) {
        this.cropShapeWidth = 100
        this.cropShapeHeight = 100
        this.showUploader(image)
      },
      showBigUploader (image) {
        this.cropShapeWidth = 750
        this.cropShapeHeight = 350
        this.showUploader(image)
      },
    }
  }
</script>
