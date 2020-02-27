<template>
  <el-dialog title="编辑优惠券" @closed="resetForm" width="800px" :visible.sync="formVisible" :close-on-click-modal="false" :show-close="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" prop="coupon_name">
            <el-input v-model="form.coupon_name" placeholder="请输入优惠券名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总发行量" prop="coupon_number">
            <el-input v-model.number="form.coupon_number" placeholder="请输入总发行量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="面值" prop="coupon_price">
            <el-input v-model.number="form.coupon_price" placeholder="请输入优惠券面值"><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用门槛" prop="condition">
            <el-input v-model.number="form.condition" placeholder="请输入优惠券使用门槛"><template slot="prepend">满</template><template slot="append">元可用</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="适用等级" prop="user_type">
            <el-radio-group v-model="form.user_type">
              <el-radio :label="1">所有会员</el-radio>
              <el-radio :label="2">黄金会员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开始时间" prop="coupon_start">
            <el-date-picker
              v-model.number="form.coupon_start"
              value-format="timestamp"
              type="date"
              placeholder="开始日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="coupon_end">
            <el-date-picker
              v-model.number="form.coupon_end"
              value-format="timestamp"
              type="date"
              placeholder="开始日期">
            </el-date-picker>
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
  import { editCoupon, addCoupon } from '../api.js'

  export default {
    name: 'ProductEdit',
    props: {
      formVisible: Boolean,
      currentEditData: Object
    },
    data() {
      return {
        myUploadVisible: false,
        form: {},
        rules: {
          coupon_name: [{ required: true, message: '优惠券不能为空' }],
          coupon_number: [{ required: true, message: '优惠券数量不能为空' }, { type: 'number', message: '优惠券数量必须为数字值'}],
          coupon_price: [{ required: true, message: '优惠券金额不能为空' }],
          condition: [{ required: true, message: '满减条件不能为空' }, { type: 'number', message: '满减条件必须为数字值'}],
          coupon_start: [{ required: true, message: '开始时间不能为空' }],
          coupon_end: [{ required: true, message: '结束时间不能为空' }],
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
            const formData = Object.assign({}, this.form, { type: this.$route.meta.type, coupon_start: this.form.coupon_start / 1000, coupon_end: this.form.coupon_end / 1000 })
            formData.new ? await addCoupon(formData) : await editCoupon(formData)
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
