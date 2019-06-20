
<template>
  <div class="profile-container" 
style="margin-left: 0px">
    <div class="title-box">
      {{ $t('collection') }}
      <!-- <span class="chose_txt"> {{ $t('collection_cs') }}</span>
      <em class="cs">
        {{ $t('collection_all') }} -->
        <!--<el-dropdown @command="handleCommand">-->
  <!--<span class="el-dropdown-link">-->
    <!--{{currency}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
  <!--</span>-->
          <!--<el-dropdown-menu slot="dropdown">-->
            <!--<el-dropdown-item v-for="(item, index) in dropList" :key="index" :command="item.currency">{{item.currency}}</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->

      </em>
      <div class="add_collection" 
@click="handle('add')">
        {{ $t('collection_add') }}
      </div>
    </div>
    <div class="invinfo-box">
      <ul>
        <li v-for="(item, index) in list" 
:key="index">
          <div class="type">
            <icon
              class="icon"
              :class="'type-' + item.payment_type"
              :name="item.payment_type === 1 ? 'bank-card' : item.payment_type === 2 ? 'alipay' : 'wechat'"/>
            {{ item.payment_type | type }}
          </div>
          <div class="mes">
            <template v-if="item.payment_type === 1">
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
            <template v-else-if="item.payment_type === 2">
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
                  <i class="el-icon-picture" 
@click="handleCol(item, 'img')"/>
                </dd>
              </dl>
            </template>
            <template v-else>
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
                    <icon name="fund-history-copy" 
@click="handleCol(item, 'img')"/>
                  </button>
                  <i class="el-icon-picture"/>
                </dd>
              </dl>
            </template>
          </div>
          <div class="btn">
            <el-switch v-model="item.state" 
@change="change(item)" size="small"/>
            <!--<span class="close cs" @click="handle('update')">修改</span>-->
            <span class="close cs" 
@click="handleCol(item, 'remove')">删除</span>
          </div>
        </li>
      </ul>
    </div>
    <!--弹出框-->
    <el-dialog 
@close="bock()"
                 :title="type"
                 :visible.sync="dialogVisible"
                 :close-on-click-modal="modal"
                 width="426px">
      <el-form :model="ruleForm" 
:rules="rules" ref="ruleForm" class="demo-ruleForm">
        <template v-if="type === '添加收款方式'">
          <el-form-item :label="this.$t('collection')" 
prop="payment_type">
            <el-select v-model="ruleForm.payment_type" 
style="width: 100%;" size="small" @change="bankHanle">
              <el-option value="1" 
:label="this.$t('payment_nameyhk')"/>
              <el-option value="2" 
:label="this.$t('payment_namezfb')"/>
              <el-option value="3" 
:label="this.$t('payment_weChat_adasunt')"/>
            </el-select>
            <!--<el-input v-model="ruleForm.payment_type"></el-input>-->
          </el-form-item>
          <el-form-item :label="this.$t('name')" 
prop="name">
            <el-input v-model="ruleForm.name" 
size="small"/>
          </el-form-item>
          <template v-if="ruleForm.payment_type === '1'">
            <el-form-item :label="this.$t('otc_side_99')" 
prop="deposit_bank">
              <el-input v-model="ruleForm.deposit_bank" 
size="small"/>
            </el-form-item>
            <el-form-item :label="this.$t('otc_side_98')" 
prop="sub_branch">
              <el-input v-model="ruleForm.sub_branch" 
size="small"/>
            </el-form-item>
            <el-form-item :label="this.$t('payment_card_number')" 
prop="card_number">
              <el-input v-model="ruleForm.card_number" 
size="small"/>
            </el-form-item>
          </template>
          <template v-if="ruleForm.payment_type !== '1'">
            <template v-if="ruleForm.payment_type === '2'">
              <el-form-item label="支付宝账号" 
prop="alipay_account">
                <el-input v-model="ruleForm.alipay_account" 
size="small"/>
              </el-form-item>
            </template>
            <template v-if="ruleForm.payment_type === '3'">
              <el-form-item label="微信账号" 
prop="weChat_account">
                <el-input v-model="ruleForm.weChat_account" 
size="small"/>
              </el-form-item>
            </template>
            <el-form-item label="收款二维码" 
prop="collection_img">
              <image-upload
                type="hold"
                :url="hold.url"
                :host="uploadConfig.host"
                :config="holdConfig"
                @uploadSuccess="uploadSuccess"
                @uploadError="uploadError"
                @uploadStart="uploadStart">
                <template v-if="hold.url">
                  <img :src="hold.url" 
alt="" style="width: 100%;height: 90px;">
                </template>
                <template v-else>
                  <i class="el-icon-upload"/>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" 
slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </template>
              </image-upload>
            </el-form-item>
          </template>
        </template>
        <template v-else-if="type === '查看图片'">
          <img :src="url" 
alt="" style="width: 386px;height: 423px;zoom: 1">
        </template>
        <template v-else>您确定要删除收款方式？</template>
        <el-form-item style="text-align: right" 
v-if="type !== '查看图片'">
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button @click="submitForm('ruleForm')" 
type="primary" v-html="type !== '删除收款方式' ? '确定设置' : '删除'"/>
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
        currency: ''
      },
      currency: 'CNY',
      dropList: [],
      id_type: '1',
      rules: {
        payment_type: [
          {required: true, message: '请选择收款方式', trigger: 'change'}
        ],
        name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        deposit_bank: [
          {required: true, message: '开户银行不能为空', trigger: 'blur'}
        ],
        card_number: [
          {required: true, message: '银行卡号不能为空', trigger: 'blur'}
        ],
        alipay_account: [
          {required: true, message: '支付宝账号不能为空', trigger: 'blur'}
        ],
        weChat_account: [
          {required: true, message: '微信账号不能为空', trigger: 'blur'}
        ],
        collection_img: [
          {required: true, message: '收款二维码不能为空', trigger: 'blur'}
        ]
      },
      dialogVisible: false,
      type: '',
      filedir: '',
      policy: {},
      list: [],
      hold: {
        loading: false,
        error: false,
        url: ''
      }
    }
  },
  filters: {
    type (e) {
      return e === 1 ? '银行卡' : e === 2 ? '支付宝' : '微信'
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
      this.$refs['ruleForm'].resetFields()
      this.ruleForm.payment_type = codeName
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
        user_id: state.userInfo.id,
        collection_id: item.collection_id
      }
      if (item.state) {
        service.orderBind(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '绑定成功'
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
              message: '解绑成功'
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
      alert('复制成功')
    },
    onError: function (e) {
      console.log(e)
      alert('复制失败')
    },
    handleCommand (command) {
      this.currency = command
      this.init()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === '添加收款方式') {
            let params = {
              user_id: state.userInfo.id,
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
              console.log(res)
              if (res.code === 0) {
                this.init()
                // this.$message.success('添加成功')
                this.$message({
                  type: 'success',
                  message: '添加成功'
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
              console.log(res)
              if (res.code === 0) {
                this.init()
                // this.$message.success('删除成功')
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.dialogVisible = false
              } else {
                this.$message.warning(res.message)
              }
            })
          }
        } else {
          return false
        }
      })
    },
    bankHanle () {
      this.$refs['ruleForm'].resetFields()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    },
    handle (even) {
      this.dialogVisible = true
      this.type = even === 'update' ? '编辑' : even === 'add' ? '添加收款方式' : even === 'remove' ? '删除收款方式' : '查看图片'
    },
    handleCol (item, even) {
      this.dialogVisible = true
      this.collection_id = item.collection_id
      this.type = even === 'remove' ? '删除收款方式' : '查看图片'
      if (even === 'img') {
        this.url = item.collection_img
      }
    },
    async init () {
      const params = {
        userId: state.userInfo.id,
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
    this.init()
    this.symbolList()
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
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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
        padding-left: 30px;
        color: $primary;
        top: 0;
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
</style>
