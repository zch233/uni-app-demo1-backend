<template>
  <el-dialog title="会员详情" @closed="resetForm" width="1000px" :visible.sync="formVisible" :close-on-click-modal="false" :before-close="() => $emit('cancel')">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-card class="box-card">
                <div>
                  <img :src="form.avatar" alt="头像">
                </div>
                <p>昵称：{{ form.nickname }}</p>
                <p>UID：{{ form.uid }}</p>
                <p style="color:#0052cc;cursor:pointer;">优惠券领取详情</p>
              </el-card>
            </el-col>
            <el-col :span="15" :offset="1">
              <el-card class="box-card">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="会员等级" prop="type">
                      <el-select :disabled="formDisabled" v-model="form.type" placeholder="请选择">
                        <el-option label="普通会员" :value="1"></el-option>
                        <el-option label="黄金会员" :value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="真实姓名" prop="true_name">
                      <el-input :disabled="formDisabled" v-model="form.true_name" placeholder="请输入用户真实姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="微信号" prop="wechat">
                      <el-input :disabled="formDisabled" v-model="form.wechat" placeholder="请输入微信号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                      <el-input :disabled="formDisabled" type="textarea" v-model="form.remark" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容,100字以内" maxlength="100" show-word-limit></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-button type="primary" v-show="formDisabled" @click="formDisabled = false">编 辑</el-button>
                    <el-button type="info" v-show="!formDisabled" @click="formDisabled = true">取 消</el-button>
                    <el-button type="success" v-show="!formDisabled" @click="save">确 定</el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="交易信息"><user-count :user-data="currentEditData"></user-count></el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
  import { editVip } from '../api.js'
  import UserCount from './UserCount'

  export default {
    name: 'ProductEdit',
    components: { UserCount },
    props: {
      formVisible: Boolean,
      currentEditData: Object
    },
    data() {
      return {
        formDisabled: true,
        form: {},
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
            await editVip(this.form)
            this.formDisabled = true
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
