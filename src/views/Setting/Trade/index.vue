<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="0">
      <el-row>
        <el-col style="margin:20px 0;" :span="20">自动关闭未付款订单</el-col>
        <el-col :span="20">
          <el-form-item label="" prop="order_close.value">
            <el-input :disabled="formDisabled" v-model="form.order_close.value" placeholder="请输入天数，空为不关闭">
              <template slot="prepend">下单</template>
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col style="margin:20px 0;" :span="20">未付款订单关闭前发送推送消息</el-col>
        <el-col :span="20">
          <el-form-item label="" prop="order_close_time.value">
            <el-input :disabled="formDisabled" v-model="form.order_close_time.value" placeholder="0为空，默认30分钟">
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
  import { getGlobalConfig, editGlobalConfig } from '../Basic/api'

  export default {
    name: 'TradeSetting',
    data() {
      return {
        formDisabled: true,
        form: { order_close: {}, order_close_time: {} },
      }
    },
    created () {
      this.getGlobalConfig()
    },
    methods: {
      async getGlobalConfig() {
        const data = await getGlobalConfig()
        this.form = data
      },
      async editGlobalConfig (form) {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            await editGlobalConfig(this.form)
            this.$message({ message: '修改配置成功', type: 'success' })
          } else {
            this.$message({ message: '请输入正确的表单内容', type: 'error' })
            return false;
          }
        });
      },
    }
  }
</script>
