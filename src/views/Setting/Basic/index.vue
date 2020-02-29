<template>
  <div class="app-container">
    <el-form ref="imageForm" :model="imageForm" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="LOGO设置" prop="logo">
            <img width="150" style="vertical-align:center;" v-show="imageForm.logo" :src="imageForm.logo">
            <el-button :disabled="imageFormDisabled" type="primary" @click="currentImage='logo',myUploadVisible=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="加载图标" prop="icon">
            <img width="150" style="vertical-align:center;" v-show="imageForm.icon" :src="imageForm.icon">
            <el-button :disabled="imageFormDisabled" type="primary" @click="currentImage='icon',myUploadVisible=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="海报轮播1" prop="image1">
            <img width="150" style="vertical-align:center;" v-show="imageForm.image1" :src="imageForm.image1">
            <el-button :disabled="imageFormDisabled" type="primary" @click="currentImage='image1',myUploadVisible=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
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
            <el-button :disabled="imageFormDisabled" type="primary" @click="currentImage='image2',myUploadVisible=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
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
            <el-button :disabled="imageFormDisabled" type="primary" @click="currentImage='image3',myUploadVisible=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
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
          <el-form-item label="手机号绑定" prop="goods_code">
            <el-radio-group :disabled="configFormDisabled" v-model="configForm.goods_code">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
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
      :width="100"
      :height="100"
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
        imageForm: {},
        configForm: { shop_coupon: {}, wash_coupon: {} },
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
      },
      async getGlobalConfig () {
        const data = await getGlobalConfig()
        this.configForm = data
      },
      async editImageConfig (form) {
        this.$refs.imageForm.validate(async (valid) => {
          if (valid) {
            let formData = this.imageForm
            const imageArr = ['logo', 'icon', 'image1', 'image2', 'image3']
            for (let v = 0; v < imageArr.length; v ++) {
              if (formData[imageArr[v]].indexOf(';base64,') >= 0) {
                const data = await uploadImg(formData[imageArr[v]])
                formData = Object.assign({}, formData, { [imageArr[v]]: data.image })
              } else {
                formData = Object.assign({}, formData, { [imageArr[v]]: formData[imageArr[v]].replace(process.env.VUE_APP_IMG_API, '')})
              }
            }
            await editImageConfig(formData)
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
            await editGlobalConfig(this.configForm)
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
    }
  }
</script>
