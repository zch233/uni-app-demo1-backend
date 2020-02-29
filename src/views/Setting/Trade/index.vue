<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="0">
      <el-row>
        <el-col style="margin:20px 0;" :span="20">自动关闭未付款订单</el-col>
        <el-col :span="20">
          <el-form-item label="" prop="goods_code">
            <el-input :disabled="formDisabled" v-model="form.goods_code" placeholder="请输入天数，空为不关闭">
              <template slot="prepend">下单</template>
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col style="margin:20px 0;" :span="20">未付款订单关闭前发送推送消息</el-col>
        <el-col :span="20">
          <el-form-item label="" prop="goods_code">
            <el-input :disabled="formDisabled" v-model="form.goods_code" placeholder="请输入天数，空为不关闭">
              <template slot="prepend">关闭前</template>
              <template slot="append">分钟</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button type="success" v-show="formDisabled" @click="formDisabled = false">编 辑</el-button>
      <el-button v-show="!formDisabled" @click="formDisabled = true">取 消</el-button>
      <el-button v-show="!formDisabled" type="primary" @click="save">保 存</el-button>
    </div>
  </div>
</template>

<script>
  import { editProduct, addProduct } from './api.js'

  export default {
    name: 'TradeSetting',
    data() {
      return {
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
    }
  }
</script>
