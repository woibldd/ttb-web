<template>
  <div class="proposer">
    <div><img :src="`@/assets/images/banner_${isZhCN?'zhongwen':'yingwen'}.png`" width="100%" alt=""></div>
    <div class="form-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center">
          {{$t('Proposer.title')}}
        </div>
        <customForm ref="customForm"  :errorMassage="$t('Proposer.errorMassage')" :schema="schema" label-position="top" />
        <customForm ref="customForm1" :errorMassage="$t('Proposer.errorMassage')" :schema="schema1" label-position="top" />
        <el-button style="width:100%" type="primary" @click="handleClick">{{$t('Proposer.submit')}}</el-button>
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
    return {
      isZhCN,
      schema: [
        { fieldType: 'input', prefix: 'avatar', placeholder: vm.$t('Proposer.name'), label: vm.$t('Proposer.name'), vModel: 'name', default: '', required: true },
        { fieldType: 'input', prefix: 'phone', placeholder: vm.$t('Proposer.phone'), label: vm.$t('Proposer.phone'), vModel: 'phone', default: '', required: true },
        { fieldType: 'input', prefix: 'wechat', placeholder: vm.$t('Proposer.wechat'), label: vm.$t('Proposer.wechat'), vModel: 'wechat', default: '' },
        { fieldType: 'input', prefix: 'article', placeholder: vm.$t('Proposer.telegram'), label: vm.$t('Proposer.telegram'), vModel: 'telegram', default: '' },
        { fieldType: 'input', prefix: 'email', placeholder: vm.$t('Proposer.email'),validate: obj => validEmail(obj.email),errorMassage:vm.$t('Proposer.verifyText'), label:vm.$t('Proposer.email'), vModel: 'email', default: '', required: true },
        { fieldType: 'radio-group', prefixIcon: 'el-icon-search', options: vm.$t('Proposer.projectOptions'), label: vm.$t('Proposer.project'), vModel: 'project', default: 1, required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.project_name'), label: vm.$t('Proposer.project_name'), vModel: 'project_name', default: '', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.url'), label: vm.$t('Proposer.url'), vModel: 'url', default: '', required: true },
        { fieldType: 'upload', onSuccess: (res, files) => {
          this.schemaWhite[this.schemaWhite.vModel] = this.schemaWhite.data.key + files.name
        }, data: {}, slotDefault: `<i class="el-icon-plus avatar-uploader-icon"></i><span style="color:#999">${vm.$t('Proposer.white')}<span>`, action: '', label: vm.$t('Proposer.white'), vModel: 'white', required: true },
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.white_url'), label: vm.$t('Proposer.white_url'), vModel: 'white_url', default: '', required: true },
        { fieldType: 'input',type:'textarea', prefixIcon: 'el-icon-search', placeholder: vm.$t('Proposer.synopsis'), label: vm.$t('Proposer.synopsis'), vModel: 'synopsis', default: '', required: true },
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
        { fieldType: 'radio-group', prefixIcon: 'el-icon-search', options: vm.$t('Proposer.startingOptions'), optValue: 'index', label:vm.$t('Proposer.starting'), vModel: 'starting', default: 0, required: true },
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
          this.$message.success(this.$t('Proposer.applySuccess'))
          this.$router.push('/')
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@media screen and (max-width:1000px){
  .form-content{
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top:-5%
    // margin-top: -400px;
  }
}		
@media screen and (min-width:768px){
  
}	
@media screen and (min-width:1200px){
  .form-content{
    position: absolute;
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
    margin-top:-5%
    // margin-top: -400px;
  }
}



</style>
