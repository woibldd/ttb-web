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
const isZhCN = localStorage.getItem("locale") === 'zh-CN'
export default {
  name:'Proposer',
  components: {
    customForm
  },
  data(vm) {
    console.log();
    
    return {
      actionUrl: '',
      schema: [
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.name'), label: vm.$t('Proposer.name'), vModel: 'name', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.phone'), errorMassage: "输入正确的手机号", validate: obj => validPhone(obj.phone), label: vm.$t('Proposer.phone'), vModel: 'phone', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.wechat'), label: vm.$t('Proposer.wechat'), vModel: 'wechat', default: '' },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.telegram'), label: vm.$t('Proposer.telegram'), vModel: 'telegram', default: '' },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.email'), errorMassage: '请输入正确邮箱', validate: obj => validEmail(obj.email), label:vm.$t('Proposer.email'), vModel: 'email', default: '', required: true },
        { fieldType: 'radio-group', prefixIcon: 'el-icon-search', options: vm.$t('Proposer.projectOptions'), label: vm.$t('Proposer.project'), vModel: 'project', default: 1, required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.project_name'), label: vm.$t('Proposer.project_name'), vModel: 'project_name', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.url'), label: vm.$t('Proposer.url'), errorMassage: '请输入正确的网站', vModel: 'url', validate: obj => validURL(obj.url), default: '', required: true },
        { fieldType: 'upload', onSuccess: (res, files) => {
          this.schemaWhite[this.schemaWhite.vModel] = this.schemaWhite.data.key + files.name
        }, data: {}, slotDefault: `<i class="el-icon-plus avatar-uploader-icon"></i><span style="color:#999">${vm.$t('Proposer.white')}<span>`, errorMassage: '此项必传', action: '', label: vm.$t('Proposer.white'), vModel: 'white', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.white_url'), label: vm.$t('Proposer.white_url'), validate: obj => validURL(obj.white_url), vModel: 'white_url', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.synopsis'), label: vm.$t('Proposer.synopsis'), vModel: 'synopsis', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.currency'), label: vm.$t('Proposer.currency'), vModel: 'currency', default: '', required: true }
      ],
      schema1: [
        { fieldType: 'radio-group', prefixIcon: 'el-icon-search', options: vm.$t('Proposer.typeOptions'), label: vm.$t('Proposer.type'), vModel: 'type', optValue: 'index', default: 0, required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.future_url'), label: vm.$t('Proposer.future_url'), vModel: 'future_url', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.total'), label: vm.$t('Proposer.total'), vModel: 'total', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.amount'), label: vm.$t('Proposer.amount'), vModel: 'amount', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.scheme'), label: vm.$t('Proposer.scheme'), vModel: 'scheme', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.precision'), label: vm.$t('Proposer.precision'), vModel: 'precision', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.locked'), label: vm.$t('Proposer.locked'), vModel: 'locked', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.report_url'), label: vm.$t('Proposer.report_url'), vModel: 'report_url', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.price'), label: vm.$t('Proposer.price'), vModel: 'price', default: '', required: true },
        { fieldType: 'radio-group', prefixIcon: 'el-icon-search', options: ['是', '否'], optValue: 'index', label:vm.$t('Proposer.starting'), vModel: 'starting', default: 0, required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.bourse'), label:vm.$t('Proposer.bourse'), vModel: 'bourse', default: '' },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder:vm.$t('Proposer.user_number'), label: vm.$t('Proposer.user_number'), vModel: 'user_number', default: '', required: true },
        { fieldType: 'date-picker', prefixIcon: 'el-icon-search', valueFormat: 'timestamp', placeholder: vm.$t('Proposer.plan_time'), label: vm.$t('Proposer.plan_time'), vModel: 'plan_time', default: '', required: true }
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
