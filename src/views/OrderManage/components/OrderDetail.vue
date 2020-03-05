<template>
  <el-dialog title="订单详情" width="800px" top="5vh" :visible.sync="formVisible" :close-on-click-modal="false" :before-close="() => $emit('cancel')">
    <el-steps :active="currentEditData.status" finish-status="success">
      <el-step :title="item" v-for="item in status" :key="item"></el-step>
    </el-steps>
    <el-row style="margin: 20px 0;">
      <el-col :span="11">
        <el-card class="box-card">
          <p>订单编号：{{ currentEditData.order_id }}</p>
          <p>运单号（收）：{{ currentEditData.mailno1 || '暂无' }}</p>
          <p>运单号（发）：{{ currentEditData.mailno2 || '暂无' }}</p>
          <p>付款方式：微信</p>
          <p>买家：{{ currentEditData.nickname || '暂无' }}</p>
          <p>电话：{{ currentEditData.mobile || '暂无' }}</p>
          <p>收货地址：{{ (currentEditData.province + currentEditData.city + currentEditData.district + currentEditData.address) || '暂无' }}</p>
          <el-button size="small" type="primary" @click="orderFormVisible = true, orderForm = Object.assign({}, currentEditData)">修改订单信息</el-button>
        </el-card>
      </el-col>
      <el-col :span="12" :offset="1">
        <el-card class="box-card">
          <div>订单状态：<h1>{{ propsStatus[currentEditData.status] }}</h1></div>
          <div>
            <el-button size="small" type="primary" v-if="currentEditData.status <= 1" @click="confirmOrder">确认付款</el-button>
            <el-button size="small" type="primary" v-if="currentEditData.status <= 1" @click="modifyOrderPrice">订单改价</el-button>
            <el-button size="small" type="primary" @click="remarkFormVisible = true, remarkForm = Object.assign({}, currentEditData)">添加备注</el-button>
          </div>
          <p v-for="item in currentEditData.order_log" :key="item.desc">{{ item.desc }}：{{ item.created_time }}</p>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin: 20px 0;">
      <el-col :span="24">
        <el-card class="box-card" header="商品信息">
          <el-row style="border-bottom:1px solid #f2f2f2;padding-bottom:15px;margin-bottom:10px;">
            <el-col :span="8">商品</el-col>
            <el-col :span="8">单价</el-col>
            <el-col :span="8">数量</el-col>
          </el-row>
          <el-row v-for="item in currentEditData.goods_detail" :key="item.id">
            <el-col :span="8">{{ item.title }}</el-col>
            <el-col :span="8">{{ item.price }}</el-col>
            <el-col :span="8">{{ item.buy_number }}</el-col>
          </el-row>
          <el-row style="padding-top:15px;border-top:1px solid #f2f2f2;margin-top:10px;">
            <el-col :span="16">
              <div>取件时间：{{ currentEditData.get_time && new Date(currentEditData.get_time * 1000).toLocaleString() }}</div>
              <div>买家备注：{{ currentEditData.remark || '无' }}</div>
              <div>订单备注：{{ currentEditData.in_remark || '无' }}</div>
            </el-col>
            <el-col :span="8">
              <div>总价：{{ currentEditData.total_price }}</div>
              <div>商品小计：{{ currentEditData.goods_detail && currentEditData.goods_detail.map(v => (v.price * v.buy_number).toFixed(2) * 1).reduce((a, b) => a + b, 0) }}</div>
              <div v-if="currentEditData.coupon_price">优惠券：{{ currentEditData.coupon_price }}</div>
              <div>运费：0</div>
              <div>合计：{{ currentEditData.real_price }}</div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog width="400px" title="编辑收货信息" @closed="resetForm('orderForm')" append-to-body :visible.sync="orderFormVisible" :close-on-click-modal="false" :show-close="false">
      <el-form ref="orderForm" :model="orderForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="收货人" prop="nickname">
              <el-input v-model="orderForm.nickname" placeholder="请输入收货人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="orderForm.mobile" placeholder="请输入手机"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="原地址">
              <el-input disabled :value="(currentEditData.province + currentEditData.city + currentEditData.district + currentEditData.address) || '暂无'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="省市区" prop="addressData">
              <el-cascader
                :options="options"
                v-model="orderForm.addressData">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="addressInfo">
              <el-input v-model="orderForm.addressInfo" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyOrderDetail">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog width="400px" title="修改备注" @closed="resetForm('remarkForm')" append-to-body :visible.sync="remarkFormVisible" :close-on-click-modal="false" :show-close="false">
      <el-form ref="remarkForm" :model="remarkForm" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="收货人" prop="in_remark">
              <el-input type="textarea" v-model="remarkForm.in_remark" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容,100字以内" maxlength="100" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="remarkFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyOrderRemark">确 定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import { editOrder } from '../api.js'
  import { regionData, CodeToText } from 'element-china-area-data'

  export default {
    name: 'OrderDetail',
    props: {
      formVisible: Boolean,
      currentEditData: Object,
      propsStatus: Array,
    },
    data() {
      return {
        orderForm: {},
        orderFormVisible: false,
        remarkForm: {},
        remarkFormVisible: false,
        options: regionData,
        selectedOptions: [],
        status: ['买家下单', '买家付款', '上门揽件', '门店签收', '门店处理', '门店发货', '买家收货'],
        rules: {
          nickname: [{ required: true, message: '收货人不能为空' }],
          mobile: [{ required: true, message: '手机不能为空' }],
        },
      }
    },
    methods: {
      async modifyOrderDetail () {
        this.$refs.orderForm.validate(async (valid) => {
          if (valid) {
            const orderFormData = this.orderForm
            const newAddressData = (orderFormData.addressData && orderFormData.addressData.length > 0) ? { province: CodeToText[orderFormData.addressData[0]], city: CodeToText[orderFormData.addressData[1]], district: CodeToText[orderFormData.addressData[2]] } : {}
            const newAddressInfo = orderFormData.addressInfo ? { address: orderFormData.addressInfo } : {}
            const data = Object.assign({ id: orderFormData.id, nickname: this.orderForm.nickname, mobile: this.orderForm.mobile }, newAddressData, newAddressInfo)
            await editOrder(data)
            Object.assign(this.currentEditData, data)
            this.orderFormVisible = false
            this.$message({ message: '修改成功', type: 'success' })
          } else {
            this.$message({ message: '请输入正确的表单内容', type: 'error' })
            return false;
          }
        });
      },
      async modifyOrderRemark () {
        this.$refs.remarkForm.validate(async (valid) => {
          if (valid) {
            await editOrder({ id: this.remarkForm.id, in_remark: this.remarkForm.in_remark })
            this.currentEditData.in_remark = this.remarkForm.in_remark
            this.remarkFormVisible = false
            this.$message({ message: '修改成功', type: 'success' })
          } else {
            this.$message({ message: '请输入正确的表单内容', type: 'error' })
            return false;
          }
        });
      },
      modifyOrderPrice () {
        this.$prompt('请输入价格', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: this.currentEditData.total_price,
          inputPattern: /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/,
          inputErrorMessage: '价格格式不正确'
        }).then(async ({ value }) => {
          await editOrder({ id: this.currentEditData.id, total_price: value })
          this.currentEditData.total_price = value
          this.$message({
            type: 'success',
            message: '改价成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消改价'
          });
        });
      },
      confirmOrder () {
        this.$confirm('此操作将订单状态更改为 确认收货, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await editOrder({ id: this.currentEditData.id, status: 2 })
          this.currentEditData.status = 2
          this.$message({ type: 'success', message: '更改成功!' });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消更改'
          });
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
