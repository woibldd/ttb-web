<template>
  <div class="proposer">
    <div><img src="@/assets/images/banner_zhongwen.png" width="100%" alt=""></div>
    <div class="container form-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center">
          请填写以下内容提交上币申请，收到申请后我们将尽快联系您
        </div>
        <div flex="main:justify box:mean">
          <customForm ref="customForm" :schema="schema" label-position="top" />
          <customForm ref="customForm1" style="padding-left:20px;margin-left:20px;border-left:1px solid #f0f0f0" :schema="schema1" label-position="top" />
        </div>
        <el-button style="width:100%" type="primary" @click="handleClick">提交</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
import customForm from '@/components/customForm'
import { validEmail, validPhone, validURL } from '@/utils/validate'
import { insertCoinApply, getPolicy } from '@/api/baseApi'
export default {
  components: {
    customForm
  },
  data() {
    return {
      actionUrl: '',
      schema: [
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '联系人姓名', label: '联系人', vModel: 'name', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '请输入手机号', errorMassage: '请输入正确手机号码', validate: obj => validPhone(obj.phone), label: '手机号', vModel: 'phone', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '请输入微信号', label: '微信号', vModel: 'wechat', default: '' },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '请输入电报', label: '电报', vModel: 'telegram', default: '' },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '请输入邮箱', errorMassage: '请输入正确邮箱', validate: obj => validEmail(obj.email), label: '邮箱', vModel: 'email', default: '', required: true },
        { fieldType: 'radio-group', prefixIcon: 'el-icon-search', options: [{ label: '项目方', value: 1 }, { label: '项目推荐人', value: 2 }], label: '请注明您是项目方，还是项目推荐人', vModel: 'project', default: 1, required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '项目全称', label: '项目全称', vModel: 'project_name', default: '项目全称', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '以http开头', label: '官方网站', errorMassage: '请输入正确的网站', vModel: 'url', validate: obj => validURL(obj.url), default: '', required: true },
        { fieldType: 'upload', onSuccess: (res, files) => {
          this.schemaWhite[this.schemaWhite.vModel] = this.schemaWhite.data.key + files.name
        }, data: {}, slotDefault: `<i class="el-icon-plus avatar-uploader-icon"></i><span style="color:#999">点击上传<span>`, errorMassage: '此项必传', action: '', label: '项目白皮书', vModel: 'white', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '最新版白皮书链接', label: '最新版白皮书链接', validate: obj => validURL(obj.white_url), vModel: 'white_url', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '项目简介', label: '项目简介', vModel: 'synopsis', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '代币全称和代币简称', label: '代币全称和代币简称', vModel: 'currency', default: '', required: true }
      ],
      schema1: [
        { fieldType: 'radio-group', prefixIcon: 'el-icon-search', options: ['是', '否'], label: '是否为ERC20代币', vModel: 'type', optValue: 'index', default: 0, required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '最新代币合约地址', label: '最新代币合约地址', vModel: 'future_url', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '代币总量', label: '代币总量', vModel: 'total', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '代币流通量', label: '代币流通量', vModel: 'amount', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '代币分配方案', label: '代币分配方案', vModel: 'scheme', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '代币币种精度', label: '代币币种精度', vModel: 'precision', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '代币锁仓方案及解锁周期', label: '代币锁仓方案及解锁周期', vModel: 'locked', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '代币智能合约安全审计报告地址', label: '代币智能合约安全审计报告地址', vModel: 'report_url', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '1ETH或1BTC对应的对少代币，务必准确填写，如没有私募，填写：无', label: '私募价格', vModel: 'price', default: '', required: true },
        { fieldType: 'radio-group', prefixIcon: 'el-icon-search', options: ['是', '否'], placeholder: '1ETH或1', optValue: 'index', label: '是否首发', vModel: 'starting', default: 0, required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '非首发，请填写已上币的交易所', label: '上币的交易所', vModel: 'bourse', default: '' },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '社群平台及用户数', label: '社群平台及用户数', vModel: 'user_number', default: '', required: true },
        { fieldType: 'date-picker', prefixIcon: 'el-icon-search', valueFormat: 'timestamp', placeholder: '计划上币时间', label: '计划上币时间', vModel: 'plan_time', default: '', required: true }
      ]
    }
  },
  computed: {
    schemaWhite() {
      return this.schema.find(item => item.vModel === 'white')
    }
  },
  created() {
    getPolicy().then(res => {
      const data = JSON.parse(res.data)
      const obj = {
        'key': data.dir, // data.dir,
        'policy': data.policy,
        'OSSAccessKeyId': data.accessid,
        'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
        'signature': data.signature,
        'dir': data.dir
      }
      this.schemaWhite.action = data.host
      this.schemaWhite.data = obj
    })
  },
  methods: {
    handleClick() {
      const isok = this.$refs['customForm'].verifyAll()
      const isok1 = this.$refs['customForm1'].verifyAll()
      if (isok && isok1) {
        insertCoinApply(Object.assign(isok, isok1)).then(res => {
          this.$message.success('申请成功')
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form-content{
  position: absolute;
  top: 350px;
  left: 50%;
  transform: translateX(-50%)
  // margin-top: -400px;
}
</style>
