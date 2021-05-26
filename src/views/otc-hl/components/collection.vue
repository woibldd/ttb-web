
<template>
  <div class="profile-container">
    <div class="title-box"> 
      {{ $t('collection') }} 
      <div
        class="add_collection"
        @click="handle('add')">
        {{ $t('collection_add') }}
      </div>
    </div> 
    <div class="invinfo-box">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index">
          <div class="type">
            <icon
              class="icon"
              :class="'type-' + item.payMode"
              :name="payTypeList[item.payMode].icon"/>  
            {{$t(payTypeList[item.payMode].text)}} 
          </div>
          <div class="mes">
            <!-- payMode 0支付宝，1微信，2银行卡 -->
            <template v-if="item.payMode ===  2">
              <dl>
                <dd class="cs">{{ item.localCurrency }}</dd>
                <dd>{{ item.realName }}</dd>
                <dd>{{ item.bank }}</dd>
                <dd>{{ item.branch }}</dd>
                <dd v-if="item.cardNo">
                  {{ item.cardNo }}
                  <button
                    type="text"
                    v-clipboard:copy="item.cardNo"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                    <icon name="fund-history-copy"/>
                  </button>
                </dd>
              </dl>
            </template>
            <template v-else-if="item.payMode===0">
              <dl>
                <dd class="cs">{{ item.currency }}</dd>
                <dd>{{ item.realName }}</dd>
                <dd>{{ item.aliNo }}</dd>
                <dd v-if="item.qrCodeUrl"> 
                  <i
                    class="el-icon-picture"
                    @click="handleCol(item, 'img')"/>
                </dd>
              </dl>
            </template>
            <template  v-else-if="item.payMode===1">
              <dl>
                <dd class="cs">{{ item.currency }}</dd>
                <dd>{{ item.realName }}</dd>
                <dd>{{ item.wechat }}</dd>
                <dd v-if="item.qrWeCodeUrl"> 
                  <i
                    class="el-icon-picture"
                    @click="handleCol(item, 'img')"/>
                </dd>
              </dl>
            </template>
          </div>
          <div class="btn">
            <!-- <el-switch
              v-model="item.state"
              @change="change(item)"/> -->
            <!--<span class="close cs" @click="handle('update')">修改</span>-->
            <span
              class="close cs"
              @click="handleCol(item, 'remove')">{{$t('remove')}}</span>
          </div>
        </li>
      </ul>
    </div>
    <!--弹出窗口-->
    <el-dialog
      @close="bock()"
      :title="type_text"
      :visible.sync="dialogVisible"
      :close-on-click-modal="modal"
      width="426px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm">
        <template v-if="type === 'add'">
          <el-form-item
            :label="$t('currency')"
            prop='currency'>
            <el-select
              v-model="ruleForm.currency"
              style="width: 100%;"
              :placeholder="$t('please_choose')"
              size="small">
              <el-option
                value="CNY"
                :label="this.$t('CNY')"/> 
            </el-select>
          </el-form-item>
          <el-form-item
            :label="this.$t('collection')"
            prop="payment_type">
            <el-select
              v-model="ruleForm.payment_type"
              style="width: 100%;"
              size="small"
              @change="bankHandle">
              <el-option
                value="EBANK"
                :label="this.$t('payment_nameyhk')"/>
              <el-option
                value="ALIPAY"
               :label="this.$t('payment_namezfb')"/>
              <el-option
                value="WEIXIN"
                :label="this.$t('payment_weChat_adasunt')"/> 
            </el-select>
            <!--<el-input v-model="ruleForm.payment_type"></el-input>-->
          </el-form-item>
          <el-form-item
           :label="this.$t('name')"
            prop="name">
            <el-input
              v-model="ruleForm.name"
              size="small"/>
          </el-form-item>
          <template v-if="ruleForm.payment_type === 'EBANK'">
            <el-form-item
             :label="this.$t('otc_kvcoc_2')"
              prop="deposit_bank">
              <el-input
                v-model="ruleForm.deposit_bank"
                size="small"/>
            </el-form-item>
            <el-form-item
             :label="this.$t('otc_kvcoc_3')"
              prop="sub_branch">
              <el-input
                v-model="ruleForm.sub_branch"
                size="small"/>
            </el-form-item>
            <el-form-item
              :label="this.$t('payment_card_number')"
              prop="card_number">
              <br>
              <!-- <number-input
                class="inputc"
                style="border: 1px solid #DCDFE6 !important;"
                v-model="ruleForm.card_number"
                size="small"/>  -->
              <el-input
                v-model="ruleForm.card_number"
                size="small"/>
            </el-form-item>
          </template>
          <template v-if="ruleForm.payment_type === 'WEIXIN' || ruleForm.payment_type === 'ALIPAY'">
            <template v-if="ruleForm.payment_type === 'ALIPAY'">
              <el-form-item
               :label="this.$t('payment_alipay_account')"
                prop="alipay_account">
                <el-input
                  v-model="ruleForm.alipay_account"
                  size="small"/>
              </el-form-item>
            </template>
            <template v-if="ruleForm.payment_type === 'WEIXIN'">
              <el-form-item :label="this.$t('payment_weChat_account')"
                prop="weChat_account">
                <el-input
                  v-model="ruleForm.weChat_account"
                  size="small"/>
              </el-form-item>
            </template>
            <el-form-item :label="this.$t('payment_collection_img')"
              prop="collection_img">
              <image-upload 
                type="hold"
                :url="hold.url"
                :host="uploadConfig.host"
                :config="holdConfig"
                @uploadSuccess="uploadSuccess"
                @uploadError="uploadError"
                @uploadStart="uploadStart">
                <template v-if="hold.url" >
                  <img
                    :src="hold.url"
                    alt=""
                    style="width: 100%;height: 285px;">
                </template>
                <template v-else>
                  <i class="el-icon-upload"/>
                  <div class="el-upload__text">{{$t('otc_kvcoc_4')}}<em>{{$t('otc_kvcoc_5')}}</em></div>
                  <div
                    class="el-upload__tip"
                    slot="tip">{{$t('otc_kvcoc_6')}}</div>
                </template>
              </image-upload>
            </el-form-item>
          </template>
          <!-- <template v-if="ruleForm.payment_type === '4' || ruleForm.payment_type === '5'">
            <el-form-item
              :label="ruleForm.payment_type === '4' ? this.$t('Paynow') + ' ' + this.$t('account') : this.$t('Paylah')  + ' ' + this.$t('account')"
              prop="card_number">
              <br>
              <number-input
                class="inputc"
                style="border: 1px solid #DCDFE6 !important;"
                v-model="ruleForm.card_number"
                size="small"/> 
            </el-form-item>
          </template> -->
        </template>
        <template v-else-if="type === 'img'">
          <img
            :src="url"
            alt=""
            style="width: 386px;height: 423px;zoom: 1">
        </template>
        <template v-else>{{$t('otc_seiitm_1')}}</template>
        <el-form-item
          style="text-align: right"
          v-if="type !== 'img'">
          <el-button @click="resetForm('ruleForm')">{{$t('cancel')}}</el-button>
          <el-button
            @click="submitForm('ruleForm')"
            v-loading="loading"
            type="primary"
            v-html="type !== 'remove' ? this.$t('otc_ziurec_20') : this.$t('remove')"/>
        </el-form-item>
      </el-form>
      <!--<span class="dialog-footer" slot="footer" >-->
      <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
      <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
import service from '@/modules/service'
import {state} from '@/modules/store'
import Vue from 'vue'
import VueClipboards from 'vue-clipboard2'
import utils from '@/modules/utils'
import ImageUpload from '@/components/common/ix-upload'
import { setTimeout } from 'timers'
import api from '@/modules/api/hl-otc'

Vue.use(VueClipboards)
export default {
  components: {
    ImageUpload
  },
  data () {
    return {
      modal: false,
      uploadConfig: {
        host: '//ix-test.oss-cn-beijing.aliyuncs.com'
      },
      url: '',
      collection_id: '',
      ruleForm: {
        payment_type: 'EBANK',
        name: '',
        deposit_bank: '',
        sub_branch: '',
        card_number: '',
        alipay_account: '',
        weChat_account: '',
        collection_img: '',
        currency: 'CNY'
      },
      currency: 'CNY', 
      id_type: '1',
      rules: {
        payment_type: [
          {required: true, message: this.$t('otc_kvcoc_8'), trigger: 'change'}
        ],
        name: [
          {required: true, message: this.$t('otc_kvcoc_9'), trigger: 'blur'}
        ],
        deposit_bank: [
          {required: true, message: this.$t('otc_kvcoc_10'), trigger: 'blur'}
        ],
        card_number: [
          {required: true, message: this.$t('otc_kvcec_11'), trigger: 'blur'}
        ],
        alipay_account: [
          {required: true, message: this.$t('otc_kvcoc_12'), trigger: 'blur'}
        ],
        weChat_account: [
          {required: true, message: this.$t('otc_kvcoc_13'), trigger: 'blur'}
        ],
        collection_img: [
          {required: true, message: this.$t('otc_kvcoc_14'), trigger: 'blur'}
        ]
      },
      dialogVisible: false,
      type: '',
      type_text: '',
      filedir: '',
      policy: {},
      list: [],
      hold: {
        loading: false,
        error: false,
        url: ''
      },
      loading: false,  
      payTypeList: {
        0: { name: 'ALIPAY', icon:'alipay', text: 'but_aliPay'},
        1: { name: 'WEIXIN', icon:'wechat', text: 'but_wechat' },
        2: { name: 'EBANK', icon:'bank-card', text: 'but_bank' }, 
      },
    }
  }, 
  computed: {
    userInfo () {
      return state.userInfo || {}
    },
    id () {
      return this.userInfo.id
    },
    holdConfig () {
      let policy = Object.assign({}, this.policy)
      let newKey = policy.key
      if (newKey) {
        newKey = newKey.replace('${filename}', '_hold_${filename}')
        policy.key = newKey
        return policy
      }
      return {}
    }
  },
  methods: {  
    // typeState (e) {
    //   return e === 1 ?this.$t('payment_nameyhk') : e === 2 ? this.$t('payment_namezfb') : this.$t('payment_weChat_adasunt')
    // },
    bock () {
      this.ruleForm = {
        payment_type: 'EBANK',
        name: '',
        deposit_bank: '',
        sub_branch: '',
        card_number: '',
        alipay_account: '',
        weChat_account: '',
        collection_img: '',
        currency: 'CNY'
      }
      // this.$refs['ruleForm'].resetFields()
    },
    bankHandle (code) {
      // let codeName = code
      // let currency = this.ruleForm.currency 
      // this.$refs['ruleForm'].resetFields()
      // this.ruleForm.payment_type = codeName
      // this.ruleForm.currency = currency
      this.ruleForm = {
        payment_type: code || 'EBANK',
        name: '',
        deposit_bank: '',
        sub_branch: '',
        card_number: '',
        alipay_account: '',
        weChat_account: '',
        collection_img: '',
        currency: this.ruleForm.currency 
      }
    },
    uploadStart ({type}) {
    },
    uploadSuccess ({type, file}) {
      this[type].url = `${this.uploadConfig.host}/${this.policy.dir}${this.filedir}_${type}_${file.name}`
      this.ruleForm.collection_img = this[type].url
    },
    uploadError ({type, message}) {
      this[type].error = message
      utils.alert(message)
    },
    handleAvatarSuccess (res, file) {
    },
    change (item) {
      let params = {
        //user_id: state.userInfo.id,
        collection_id: item.collection_id
      }
      if (item.state) {
        service.orderBind(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: this.$t('otc_seiitm_4')
            })
            this.init()
          } else {
            this.$message({
              type: 'warning',
              message: `${res.message}`
            })
          }
        })
      } else {
        service.orderUnbind(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: this.$t('otc_seiitm_5')
            })
            this.init()
          } else {
            item.state = !item.state
            this.$message({
              type: 'warning',
              message: `${res.message}`
            })
          }
        }).catch(err => {
        })
      }
    },
    onCopy: function (e) { 
      utils.success(this.$t('otc_otutcol_9'))
    },
    onError: function (e) { 
      utils.alert(this.$t('otc_otutcol_10'))
    },
    handleCommand (command) {
      this.currency = command
      this.init()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.type === 'add') { 
            const params = {
              pay_mode: this.ruleForm.payment_type, //EBANK":银行卡 "WEIXIN":微信支付 "ALIPAY":支付宝支付
              currency: this.ruleForm.currency, //币种(非必须 ,默认CNY)
              bank: this.ruleForm.deposit_bank, //开户银行
              branch: this.ruleForm.sub_branch, //开户支行(选填)
              cardNo:  this.ruleForm.card_number, //银行卡号
              aliNo: this.ruleForm.alipay_account, //支付宝账号
              qrCodeUrl: this.ruleForm.collection_img, //支付宝二维码
              wechat: this.ruleForm.weChat_account, //微信账号
              qrWeCodeUrl: this.ruleForm.collection_img, //微信二维码
              realName: this.ruleForm.name, //真实名字
            } 
            api.sethlSavePayInfo(params).then(res => {
              if (!res.code && !res.status) {
                this.init() 
                utils.success(this.$t('add_withdraw_success')) 
                this.dialogVisible = false
                this.loading = false
              } else {
                utils.alert(res.message)
                this.loading = false
              }
            })

          } else { 
            api.sethlDeletePayInfo({
              pay_mode: this.payTypeList[this.collection_id].name 
            }).then(res => { 
              this.loading = false 
              if (!res.code && !res.status) {
                this.init()
                // this.$message.success('删除成功')
                this.$message({
                  type: 'success',
                   message: this.$t('del_withdraw_success')
                })
                this.dialogVisible = false
              } else {
                this.$message.warning(res.message)
                this.loading = false
              }
            })
          }
        } else {
          setTimeout(() => {
            this.$refs[formName].resetFields()
          }, 300)
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    },
    handle (even) {
      this.dialogVisible = true 
      //this.type = even === 'update' ? '编辑' : even === 'add' ? '添加收款方式' : even === 'remove' ? '删除收款方式' : this.$t('otc_kvcoc_7') 
      this.type = even
      switch (even) {
        case 'update':
          this.type_text = this.$t('modify')
          break
        case 'add':
          this.type_text = this.$t('otc_seiitm_3') 
          break
        case 'remove':
          this.type_text = this.$t('otc_seiitm_2')  
          break
        default:
          this.type_text = this.$t('otc_kvcoc_7') 
      }
    },
    handleCol (item, even) {
      this.dialogVisible = true
      this.collection_id = item.payMode 
      //this.type = even === 'remove' ? this.$t('otc_seiitm_2') : this.$t('otc_kvcoc_7')
      this.handle(even)
      if (even === 'img') {
        this.url = item.qrCodeUrl || item.qrWeCodeUrl
      }
    },
    async init () { 
      try { 
        const res = await api.gethlUserPayInfo()
        if (!res.code && !res.status) {
          this.list = res.data 
        }
      } catch (e) {
        console.log(e, 'error')
      }
    }, 
  },
  watch: {
    'ruleForm.card_number': function (newVal, oldVal) {
      const rex = /^[\s\d]*$/
      if (!rex.test(newVal)) {
        this.ruleForm.card_number = oldVal
      }
    }
  },
  async created () {
    //console.log(this.id)
    this.init() 
    try {
      this.filedir = this.id + '_' + utils.generateToken(32)
      let policy = await service.getOSSPolicy()
      if (!policy.code) {
        this.policy = JSON.parse(policy.data)
        this.uploadConfig.host = this.policy.host
        let obj = {
          'key': this.policy.dir + this.filedir + '${filename}', // this.policy.dir,
          'policy': this.policy.policy,
          'OSSAccessKeyId': this.policy.accessid,
          'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
          'signature': this.policy.signature,
          'dir': this.policy.dir
        } 
        this.policy = obj
      } else {
        utils.alert('获取服务端签名失败')
      } 
    } catch (error) {
      
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .inputc{ 
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    border-top-color: rgb(220, 223, 230);
    border-right-color: rgb(220, 223, 230);
    border-bottom-color: rgb(220, 223, 230);
    border-left-color: rgb(220, 223, 230);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .inputc:hover {
    border-color: #C0C4CC;
  }

  .cs {
    color: $primary
  }
 

  .profile-container {
    width: 1200px;
    margin: 50px auto;  
    .title-box {
      width: 100%;
      height: 40px;
      font-size: 18px;
      font-weight: 600;
      color: $text-strong;
      border-bottom: 1px solid #e6e6e6;
      position: relative;

      .add_collection {
        position: absolute;
        right: 0;
        top: 0;
        padding-left: 30px;
        color: $primary; 
        cursor: pointer;
      }

      span, .cs {
        font-weight: normal !important;
        color: #999;
        font-size: 14px;
        display: inline-block;
        margin-left: 40px;
      }
    }

    .invinfo-box {
      li {
        width: 100%;
        height: 50px;
        position: relative;
        display: flex;
        font-size: 12px;
        justify-items: center;
        align-items: center;

        .type {
          flex: 200px 0 0 0;
          width: 200px;

          .icon {
            font-size: 16px;
            margin-right: 10px;
          }
        }

        .btn {
          flex: 0 0 0 200px;
          width: 200px;
          text-align: right;

          .close {
            padding-left: 16px;
          }
        }

        .mes {
          flex: 1;

          dd {
            display: inline-block;
            margin-right: 30px;
          }
        }
      }
    }
  }
  .el-form-item {
    margin-bottom: 0;
  }
</style>
