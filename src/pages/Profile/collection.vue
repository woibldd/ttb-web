
<template>
  <div class="profile-container">
    <div class="title-box">

      {{ $t('collection') }}
      <!-- <span class="chose_txt"> {{ $t('collection_cs') }}</span>
      <em class="cs">
        {{ $t('collection_all') }}
      </em> -->
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
              :class="'type-' + item.payment_type"
              :name="paytype[item.payment_type]"/>
            <!-- {{ item.payment_type | type }} -->
            <!-- {{typeState(item.payment_type)}} -->
            {{$t(payName( item.payment_type))}}
          </div>
          <div class="mes">
            <template v-if="item.payment_type === 1  || item.payment_type === 4 || item.payment_type === 5">
              <dl>
                <dd class="cs">{{ item.currency }}</dd>
                <dd>{{ item.name }}</dd>
                <dd>{{ item.bank }}</dd>
                <dd>{{ item.deposit_bank }}</dd>
                <dd v-if="item.card_number">
                  {{ item.card_number }}
                  <button
                    type="text"
                    v-clipboard:copy="item.card_number"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                    <icon name="fund-history-copy"/>
                  </button>
                </dd>
              </dl>
            </template>
            <template v-else>
              <dl>
                <dd class="cs">{{ item.currency }}</dd>
                <dd>{{ item.name }}</dd>
                <dd>{{ item.alipay_account }}</dd>
                <dd v-if="item.collection_img">
                  <button
                    type="text"
                    v-clipboard:copy="item.alipay_account"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                    <icon name="fund-history-copy"/>
                  </button>
                  <i
                    class="el-icon-picture"
                    @click="handleCol(item, 'img')"/>
                </dd>
              </dl>
            </template>
            <!-- <template v-else>
              <dl>
                <dd class="cs">{{ item.currency }}</dd>
                <dd>{{ item.name }}</dd>
                <dd>{{ item.weChat_account }}</dd>
                <dd v-if="item.collection_img">
                  <button
                    type="text"
                    v-clipboard:copy="item.weChat_account"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                    <icon
                      name="fund-history-copy"
                      @click="handleCol(item, 'img')"/>
                  </button>
                  <i class="el-icon-picture"/>
                </dd>
              </dl>
            </template> -->
          </div>
          <div class="btn">
            <el-switch
              v-model="item.state"
              @change="change(item)"/>
            <!--<span class="close cs" @click="handle('update')">修改</span>-->
            <span
              class="close cs"
              @click="handleCol(item, 'remove')">{{$t('remove')}}</span>
          </div>
        </li>
      </ul>
    </div>
    <!--弹出框-->
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
            :label="'币种'"
            prop='currency'>
            <el-select
              v-model="ruleForm.currency"
              style="width: 100%;"
              size="small">
              <el-option
                value="CNY"
                :label="this.$t('CNY')"/>
              <el-option
                value="SGD"
               :label="this.$t('SGD')"/> 
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
                value="1"
                :label="this.$t('payment_nameyhk')"/>
              <el-option
                value="2"
               :label="this.$t('payment_namezfb')"/>
              <el-option
                value="3"
                :label="this.$t('payment_weChat_adasunt')"/>
              <el-option
                value="4"
                :label="this.$t('Paynow')"/>
              <el-option
                value="5"
                :label="this.$t('Paylah')"/>
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
          <template v-if="ruleForm.payment_type === '1'">
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
              <number-input
                class="inputc"
                style="border: 1px solid #DCDFE6 !important;"
                v-model="ruleForm.card_number"
                size="small"/> 
            </el-form-item>
          </template>
          <template v-if="ruleForm.payment_type === '2' || ruleForm.payment_type === '3'">
            <template v-if="ruleForm.payment_type === '2'">
              <el-form-item
               :label="this.$t('payment_alipay_account')"
                prop="alipay_account">
                <el-input
                  v-model="ruleForm.alipay_account"
                  size="small"/>
              </el-form-item>
            </template>
            <template v-if="ruleForm.payment_type === '3'">
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
          <template v-if="ruleForm.payment_type === '4' || ruleForm.payment_type === '5'">
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
          </template>
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
        payment_type: '1',
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
      dropList: [],
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
      paytype: {
        1: "bank-card",
        2: "alipay",
        3: "wechat",
        4: "paynow",
        5: "paylah"
      }
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
    
    payName(type){
      return {
          1: "payment_nameyhk",
          2: "payment_namezfb",
          3: "payment_weChat_adasunt",
          4: "Paynow",
          5: "Paylah",
        }[type]
    },
    // typeState (e) {
    //   return e === 1 ?this.$t('payment_nameyhk') : e === 2 ? this.$t('payment_namezfb') : this.$t('payment_weChat_adasunt')
    // },
    bock () {
      this.ruleForm = {
        payment_type: '1',
        name: '',
        deposit_bank: '',
        sub_branch: '',
        card_number: '',
        alipay_account: '',
        weChat_account: '',
        collection_img: '',
        currency: ''
      }
      this.$refs['ruleForm'].resetFields()
    },
    bankHandle (code) {
      let codeName = code
      let currency = this.ruleForm.currency 
      this.$refs['ruleForm'].resetFields()
      this.ruleForm.payment_type = codeName
      this.ruleForm.currency = currency
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
        item.state = !item.state
        service.orderUnbind(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: this.$t('otc_seiitm_5')
            })
            this.init()
          } else {
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
      console.log(e)
      alert(this.$t('otc_otutcol_9'))
    },
    onError: function (e) {
      console.log(e)
     alert(this.$t('otc_otutcol_10'))
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
            let params = {
              //user_id: state.userInfo.id,
              payment_type: this.ruleForm.payment_type,
              name: this.ruleForm.name,
              deposit_bank: this.ruleForm.deposit_bank,
              sub_branch: this.ruleForm.sub_branch,
              card_number: this.ruleForm.card_number,
              alipay_account: this.ruleForm.alipay_account,
              weChat_account: this.ruleForm.weChat_account,
              collection_img: this.ruleForm.collection_img,
              currency: this.ruleForm.currency
            }
            service.addOtcCollection(params).then(res => { 
              this.loading = false
              if (res.code === 0) {
                this.init() 
                this.$message({
                  type: 'success',
                  message: this.$t('add_withdraw_success')
                })
                this.dialogVisible = false
              } else {
                this.$message.warning(res.message)
              }
            })
          } else {
            service.delOtcCollection({
              collection_id: this.collection_id
            }).then(res => { 
              this.loading = false
              console.log(res)
              if (res.code === 0) {
                this.init()
                // this.$message.success('删除成功')
                this.$message({
                  type: 'success',
                   message: this.$t('del_withdraw_success')
                })
                this.dialogVisible = false
              } else {
                this.$message.warning(res.message)
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
      this.collection_id = item.collection_id
      console.log({item, even})
      //this.type = even === 'remove' ? this.$t('otc_seiitm_2') : this.$t('otc_kvcoc_7')
      this.handle(even)
      if (even === 'img') {
        this.url = item.collection_img
      }
    },
    async init () {
      const params = {
        //userId: state.userInfo.id,
        currency: this.currency
      }
      try {
        const res = await service.getOtcCollection(params)
        if (res && !res.code) {
          this.list = res.data
          // this.forEach((item) => {
          //   const flag = item.state === 1 ? true : false
          //   Vue.set(item, 'state', flag)
          // })
        }
      } catch (e) {
        console.log(e, 'error')
      }
    },
    async symbolList () {
      try {
        const res = await service.getPairList()
        if (res && !res.code) {
          this.dropList = res.data.items
        }
      } catch (e) {
        console.log(e, 'error')
      }
    }
  },
  async created () {
    //console.log(this.id)
    this.init()
    this.symbolList()
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

  .type-1 {
    color: #FDB62D
  }

  .type-2 {
    color: green
  }

  .type-3 {
    color: blue
  }

  .profile-container {
    width: 960px;
    margin-left: 60px;
    float: left;

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
