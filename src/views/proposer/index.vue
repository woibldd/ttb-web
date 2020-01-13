<template>
  <div class="proposer">
    <div><img :src="imgsrc" width="100%" alt=""></div>
    <div class="form-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center;width:60%;margin:0 auto">
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
  data() {
    return {
      imgsrc:isZhCN?require('@/assets/images/banner_zhongwen.png'):require('@/assets/images/banner_yingwen.png'),
      schema: [],
      schema1: []
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
      this.fileName = 'currency_' + this.generateToken(32)
      const obj = {
        key: data.dir + this.fileName, // data.dir,
        policy: data.policy,
        OSSAccessKeyId: data.accessid,
        success_action_status: '200', // 让服务端返回200,不然，默认会返回204
        signature: data.signature,
        dir: data.dir
      }
      // this.schemaWhite.action = data.host
      // this.schemaWhite.data = obj

      this.schema = [
        { fieldType: 'input', prefix: 'avatar',  label: this.$t('Proposer.name'), vModel: 'name', default: '', required: true },
        { fieldType: 'input', prefix: 'phone', label: this.$t('Proposer.phone'), vModel: 'phone', default: '', required: true },
        { fieldType: 'input', prefix: 'wechat',label: this.$t('Proposer.wechat'), vModel: 'wechat', default: '' },
        { fieldType: 'input', prefix: 'article', label: this.$t('Proposer.telegram'), vModel: 'telegram', default: '' },
        { fieldType: 'input', prefix: 'email',validate: obj => validEmail(obj.email),errorMassage:this.$t('Proposer.verifyText'), label:this.$t('Proposer.email'), vModel: 'email', default: '', required: true },
        { fieldType: 'radio-group',  options: this.$t('Proposer.projectOptions'), label: this.$t('Proposer.project'), vModel: 'project', default: 1, required: true },
        { fieldType: 'input', label: this.$t('Proposer.project_name'), vModel: 'project_name', default: '', required: true },
        { fieldType: 'input', label: this.$t('Proposer.url'), vModel: 'url', default: '', required: true },
        { fieldType: 'upload', onSuccess: (res, files) => {
          const data = this.schemaWhite.data
          this.schemaWhite[this.schemaWhite.vModel] = `${this.schemaWhite.action}/${data.dir}${this.fileName}`
          console.log(`${this.schemaWhite.action}/${data.dir}${this.fileName}`)
        }, data: {},beforeRemove:()=>{
          this.schemaWhite[this.schemaWhite.vModel] = ''
          return true
        },data:obj, slotDefault: `<i class="el-icon-plus avatar-uploader-icon"></i><span style="color:#999">${this.$t('Proposer.white')}<span>`, action: data.host, label: this.$t('Proposer.white'), vModel: 'white',multiple:false, required: true },
        { fieldType: 'input', label: this.$t('Proposer.white_url'), vModel: 'white_url', default: '', required: true },
        { fieldType: 'input',type:'textarea', label: this.$t('Proposer.synopsis'), vModel: 'synopsis', default: '', required: true },
        { fieldType: 'input', label: this.$t('Proposer.currency'), vModel: 'currency', default: '', required: true }
      ]
      this.schema1 = [
        { fieldType: 'radio-group',  options: this.$t('Proposer.typeOptions'), label: this.$t('Proposer.type'), vModel: 'type', optValue: 'index', default: 0, required: true },
        { fieldType: 'input', label: this.$t('Proposer.future_url'), vModel: 'future_url', default: '', required: true },
        { fieldType: 'input',label: this.$t('Proposer.total'), vModel: 'total', default: '', required: true },
        { fieldType: 'input',  label: this.$t('Proposer.amount'), vModel: 'amount', default: '', required: true },
        { fieldType: 'input', label: this.$t('Proposer.scheme'), vModel: 'scheme', default: '', required: true },
        { fieldType: 'input', label: this.$t('Proposer.precision'), vModel: 'precision', default: '', required: true },
        { fieldType: 'input', label: this.$t('Proposer.locked'), vModel: 'locked', default: '', required: true },
        { fieldType: 'input', labelHtml: this.$t('Proposer.report_url'), vModel: 'report_url', default: ''},
        { fieldType: 'input', labelHtml: this.$t('Proposer.price'), vModel: 'price', default: '', required: true },
        { fieldType: 'radio-group',  options: this.$t('Proposer.startingOptions'), optValue: 'index', label:this.$t('Proposer.starting'), vModel: 'starting', default: 0, required: true },
        { fieldType: 'input', labelHtml:this.$t('Proposer.bourse'), vModel: 'bourse', default: '' },
        { fieldType: 'input', label: this.$t('Proposer.user_number'), vModel: 'user_number', default: '', required: true },
        { fieldType: 'date-picker',  valueFormat: 'timestamp',label: this.$t('Proposer.plan_time'), vModel: 'plan_time', default: '', required: true }
      ]
    })
  },
  methods: {
    handleClick() {
      const isok = this.$refs['customForm'].verifyAll()
      const isok1 = this.$refs['customForm1'].verifyAll()
      if (isok && isok1) {
        console.log(Object.assign(isok, isok1));

        insertCoinApply(Object.assign(isok, isok1)).then(res => {
          this.$message.success(this.$t('Proposer.applySuccess'))
          this.$router.push('/')
        })
      }
    },

    generateToken(len = 16) {
      const source = '1234567890qwertyuiopasdfghjklzxcvbnm'
      let token = ''
      for (let i = 0; i < len; i += 1) {
        token += source[Math.floor(Math.random() * 36)]
      }
      return token
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
