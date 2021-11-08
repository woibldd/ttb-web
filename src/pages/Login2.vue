<template>
  <div class="register-container"> 
    <div class="register-box" ref="container" flex="box:last">
      <!-- <div class="corner-icon-view view-type-password" v-if="step===1">  
        <div class="label" @click="handleChangeLoginType">
          <div class="qrcode" v-if="loginType==='password'" @click="loginType='qrcode'">
            <icon style="font-size: 60px;" name="login-qrcode" />
          </div> 
          <div class="qrcode pt-7 pr-7" v-else @click="loginType='password'">
            <icon style="font-size: 38px;" name="compute" />
          </div> 
          <div class="mask"></div>
        </div>
      </div> -->
      <!-- <div v-if="loginType==='qrcode'" class="wrap">
        <div class="register-title">
          <h3>手机扫码，安全登录</h3>
        </div>
        <div class="register-content">
          <div class="scan-before" v-if="qrStatus===1">
            <div class="login-qrcode mt-30 pt-30 txc"> 
              <canvas
                class="qr-img"
                ref="qr"/> 
              <div class="qr-mask" v-if="!qrEnable">
                <div class="text mt-30 mb-10">二维码已失效</div>
                <el-button type="primary" @click="freshQrcode">刷新二维码</el-button>
              </div>
            </div>
            <div class="login-tip  mt-15" flex="main:center cross:center">
              <span class="f20 text-primary" >
                <icon class="f20"  name="scan" />
              </span>
              打开 IXX App 扫一扫登录
            </div> 
          </div>
          <div class="scan-after" v-else-if="qrStatus===2">
            <div class="scan-result">
              <div class="result-img txc pd-30 text-success">
                <icon style="font-size: 40px;" name="duigou" />
              </div>
              <div class="result-text txc">扫描成功！</div>
            </div>
            <div class="scan-tips txc mt-20">请在手机上根据提示确认登录</div> 
          </div>
        </div>
        <div class="register-footer mt-20 text-primary" flex="main:right">
          <label  @click="handleChangeLoginType">密码登录</label>
        </div>
      </div> -->
      <div v-if="step===1" class="wrap"  flex-box="1">
        <div class="register-title">
          <h3>
            {{$t('customer.loginAccount', {siteName: 'IXX'})}}
          </h3>
        </div>
        <div class="register-content"> 
          <el-menu :default-active="by" class="el-menu-demo" mode="horizontal" @select="handleSelect"> 
            <el-menu-item index="phone">
              <router-link
                class="by-link ibt"
                to="phone">{{ $t('customer.loginByPhone') }}</router-link>  
            </el-menu-item> 
            <el-menu-item index="email" >
              <router-link
                class="by-link ibt"
                to="email">{{ $t('customer.loginByEmail') }}</router-link>
            </el-menu-item> 
          </el-menu> 
          <el-form :model="form" ref="form" :rules="validateRules"  class="mt-20">
            <el-form-item v-if="by==='phone'" prop="phone">
              <el-col :span="7">
                <el-popover
                  placement="bottom-start" 
                  ref="popover-region"
                  width="160"
                  trigger="click">
                  <el-button slot="reference" style="width: 100%; height: 40px; padding:12px 0;">
                    <span class="components-countryselect-index-flag"
                      :class="`components-countryselect-index-flag-${selectRegion.name.toLowerCase()}`"></span>
                    <span class=".components-countryselect-index-code">+{{ selectRegion.id }}</span> 
                    <icon name="arrow-down" />
                  </el-button>
                  <div class="components-countryselect-dropdown dropdown-menu">
                    <div class="dropdown-item"
                      v-for="option in regionOptions"  
                      :key="option.id"
                      @click="handleSelectRegion(option)">
                      <span 
                        class="components-countryselect-index-flag"
                        :class="`components-countryselect-index-flag-${option.name.toLowerCase()}`"></span>
                      <span class="components-countryselect-index-code">+{{ option.id }}</span>
                      <span class="components-countryselect-index-name">
                        <template v-if="state.locale === 'zh-CN'">{{ option.cname }}</template>
                        <template v-else>{{ option.fullname }}</template>
                      </span>
                    </div> 
                  </div>
                </el-popover>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="16">
                <el-input v-model="form.phone" :placeholder="$t('bind_phone_input')"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item v-if="by==='email'" prop="email"> 
              <el-input v-model="form.email" :placeholder="$t('bind_email_input')"></el-input> 
            </el-form-item>
            <el-form-item prop="password">
              <el-input 
                v-model="form.password" 
                :placeholder="$t('password')"
                :type="pwdType">  
                <i @click="hendleSwitchPwdType" slot="suffix" class="mr-10"> 
                  <icon :name="pwdType==='password' ? 'eye-off' :'eye-on'" /> 
                </i>
                <!-- <i slot="append"> <icon name="" /> </i>  -->
              </el-input>  
            </el-form-item>
            <!-- 代翔: 滑动验证组件 -->
            <el-form-item>
              <nc ref="nc" :mask="!((form.phone || form.email) && form.password)" @getnc="getnc"/>
            </el-form-item>
            <el-form-item prop="agree">   
              <div>
                <el-button :type="isnc?'primary':'info'" style="width:100%;" :disabled="!isnc" @click="handleSubmit">
                  {{$t('signin')}}
                </el-button> 
              </div>
            </el-form-item> 
          </el-form>
        </div>
        <div class="register-footer" flex="main:justify"> 
          <router-link
                :to="{name: 'recover'}"
                class="ml-5">{{ $t('if_forgot') }}?</router-link>
          <router-link to="/user/register">{{$t('customer.freeRegistre')}}</router-link>
        </div> 
      </div>
      <div v-if="step===1 && !isMobile" class="wrap-right"> 
        <div class="register-content">
          <div class="scan-before">
            <div flex="main:center">
              <div class="login-qrcode txc"> 
                <canvas
                  class="qr-img"
                  ref="qr"/>  
                <div class="qr-mask" v-if="qrStatus===2">
                  <div class="scan-result">
                    <div class="result-img txc text-success">
                      <icon style="font-size: 40px;" name="shigou" />
                    </div>
                    <div class="result-text mt-5 txc" v-html="$t('customer.goLogin')">去登陆</div>
                  </div>
                </div>
              </div> 
            </div>
            <div class="login-tip  mt-15" flex="main:center dir:top cross:center"> 
              <p class="text1" v-html="$t('customer.qrLogin')">使用二维码登录</p>
              <p class="text2 mt-10" v-html="$t('customer.useLogin')">使用IXX手机App扫描二维码</p>
            </div> 
          </div> 
        </div>
      </div>
    </div>  
    <div class="register-box" ref="container2"> 
      <div v-if="step===2" class="wrap"> 
        <div class="close"> 
          <label @click="handleCloseSmsCode">
            <!-- <icon name="close" /> -->
            x
          </label> 
        </div>
        <div class="register-title">
          <h3>{{$t('customer.accountVerification')}}</h3>
        </div>
        <div class="register-content">
          <div v-if="verify_type==='phone' || verify_type==='email'" class="message" flex="box:first cross:center">
            <div class="img mr-20">
              <icon name="message" />
            </div>
            <div class="text" >
              <!-- 请输入您在{{by==='phone'?'手机号 '+form.phone:'邮箱' + form.email}}  收到的6位验证码，验证 码30分钟有效 -->
              {{$t('customer.tip1', {contact: verify_type==='phone'? $t('register_by_phone')+form.phone:$t('email') + form.email})}}
            </div>
          </div>
          <div class="mt-30 pb-15 mb-5">
            <label v-if="verify_type==='phone'">{{$t('phone_code')}}</label>
            <label v-else-if="verify_type==='email'">{{$t('email_code')}}</label>
            <label v-else-if="verify_type==='google'">{{$t('fa2_google_code_mobile')}}</label>
          </div>
          <div>
            <CodeInput :loading="false" class="input" v-on:change="onChange" v-on:complete="onComplete" />
          </div>
          <div class="mt-20" v-if="verify_type==='phone' || verify_type==='email'">
            <label v-show="!shownc" class="sms-btn" :class="{disabled: sms.status === 1}" @click.prevent="getSmsCode2">
              {{smsBtnText}}
            </label>
            <nc v-show="shownc" ref="ncvalid" :mask="false" @getnc="getnc2"/> 
          </div>
        </div>
      </div>
    </div>
    <v-download2 />
  </div>
</template>

<script>
import CodeInput from 'vue-verification-code-input'
import { local, state, actions } from '@/modules/store'
import utils from '@/modules/utils'
import service from '@/modules/service'
import responsive from '@/mixins/responsive'
import VDownload2 from '@/components/VDownload'
import _ from 'lodash'
import nc from '@/components/createnc'
const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')

export default {
  name: "login",
  components: {CodeInput, VDownload2, nc},
  props: ['by'],
  mixins: [responsive],
  data() {
    return {
      state,
      loginType: 'password',
      by: 'phone', 
      pwdType: 'password', //密码输入框状态
      step: 1, 
      verify_phone: '',
      verify_email: '',
      verify_google: '', 
      selectRegion: {
        "id": 86,
        "name": "CN",
        "fullname": "China",
        "cname": "中国"
      },
      regionOptions: [],
      form: { 
        phone: '',
        email: '',
        password: '', 
        captcha: '',
      },
      sms: {
        // 0:可以发送, 1:倒计时, 2:重新发送
        loading: false,
        status: 0,
        countDown: 0,
        timer: null
      },
      validateRules: {
        phone: [ {  required: true, trigger: 'blur', message: this.$t('bind_phone_input'), }],
        email: [ {  required: true, trigger: 'blur', message: this.$t('bind_email_input'), },],
        password:[{  required: true, trigger: 'blur', message: this.$t('login_ph_pw'), },],  
      },
      ncData: {}, 
      isnc: false, 
      shownc: false,
      qrUrl: '',
      qrStatus: 1,
      qrTimer: null,
      qrAmount: 0,
      qrEnable: false
    }
  },
  beforeRouteEnter(to, from, next) {  
    if (to.params.by === 'email') {
      return next()
    }
    if (to.params.by === 'phone' && state.enablePhoneSignup) {
      return next()
    }
    next({
      name: 'login2By',
      params: {
        by: 'phone'
      },
      query: to.query
    })
  },
  computed: { 
    smsBtnText () {
      if (this.sms.status === 0) {
        return this.$i18n.t('sms_send')
      }
      if (this.sms.status === 2) {
        return this.$i18n.t('sms_retry')
      }
      return `${this.$i18n.t('sms_retry')}(${this.sms.countDown})`
    },
    verify_type() {
      let type = 'email' 
       if (this.verify_google === 1) {
        type = 'google'
      } else if (this.verify_phone) {
        type = 'phone'
      } else if (this.verify_email) {
        type = 'email'
      }
      return type
    },
    isMobile() {
      return utils.isMobile()
    }
    
  },
  methods: {
    async setQr (url) {
      const QRCode = await qrcode()
      QRCode.toCanvas(
        this.$refs.qr,
        url,
        {
          margin: 0,
          width: 160,
          height: 160,
          errorCorrectionLevel: 'H'
        },
        (err) => {
          if (err) {
            // @improve
            return utils.log('qrcode error')
          }
          this.qrReady = true
        }
      )
    },
    handleChangeLoginType() {
      if (this.loginType==='password') {
        this.loginType = 'qrcode'
        this.freshQrcode()
      } else {
        this.loginType = 'password'
        this.qrUrl = ''
        this.qrStatus = 1
        clearInterval(this.qrTimer)
      }
    },
    async freshQrcode() { 
      await this.fetchGetQrcode()
      if (this.qrUrl) {
        this.qrEnable = true
        this.qrTimer = setInterval(()=>{
          if (this.qrAmount < 100) {
            this.qrAmount++
            if (this.step===1) {
              this.fetchGetQrcode() 
            }
          } else { 
            this.qrEnable = false
            this.qrStatus = 1
            this.qrAmount = 0  
            this.qrUrl = '' 
            // clearInterval(this.qrTimer)
          }
        }, 1000)
      } 
    },
    async fetchGetQrcode(reset) { 
      const params = {
        device: navigator.userAgent
      }
      if (this.qrUrl && !reset){
        params.code = this.qrUrl
      } 
      let res = await service.getQrcodeGenerate(params)  
      if (!res.code) {
        this.qrUrl = res.url
        this.qrStatus = +res.status
        this.setQr(this.qrUrl)
        if (this.qrStatus===3) { 
          clearInterval(this.qrTimer) 
          params.token = res.token
          res = await service.setQrcodeLogin(params) 
          if (!res.code) {
            this.loginSuccess(res.data) 
          }
        }
      } else {
        this.qrEnable = false
        this.qrStatus = 1
        this.qrAmount = 0  
        this.qrUrl = '' 
      }
    },
    getnc(data) {
      this.ncData = data;
      this.isnc = true;
    },
    getnc2(data) {
      this.ncData = data;
      this.shownc = false;
      this.getSmsCode();
    },
    ncreset() {
      this.$refs.nc.ncreset();
      this.$refs.ncvalid.ncreset();
      this.isnc = false;
      this.shownc = false;
    },
    getSmsCode2() {
      if (this.sms.status === 0 || this.sms.status === 2) {
        this.$refs.ncvalid.ncreset();
        this.shownc = true;
      }
    }, 
    onChange(v) {
      this.form.captcha = v
      // console.log("onChange ", v);
    },
    onComplete(v) {
      this.form.captcha = v
      // console.log("onComplete ", v); 
      this.fetchVerifyCode()
    }, 
    fetchVerifyCode:_.throttle(async function() { 
      const type = this.verify_type
      let params = {
        code: this.form.captcha
      }
      if (!params.code) {
        utils.alert(this.$i18n.t('err_captcha_empty'))
        return
      }
      if (type === 'phone') {
        params.phone = this.form.phone 
        params.region = this.selectRegion.id
      } else if (type==='email') {
        params.email =  this.form.email 
      }

      const resp = await service.verifyLoginVerifyCode(params, type)
      if (!resp.code) {
        if (resp.data && resp.data.verified) {
          this.loginSuccess(resp.data)
        }
      } else {
        utils.alert(resp.message)
      }
    }, 2000), 
    async loginSuccess(userInfo) {
      local.newLogin = true
      actions.setUserInfo(userInfo)
      actions.resetStatus()

      if (typeof state.loginBack === 'string') {
        location.href = state.loginBack
      } else {
        this.$router.push(state.loginBack)
      } 
      this.$router.push({
        name: 'home'
      })
      setTimeout(()=>{
        this.$eventBus.$emit('handleFirstLogin')
      },100)
    },
    handleSelect(key, keyPath) { 
      this.by = keyPath[0]
    },
    handleSelectRegion(option) {
      this.selectRegion = option 
      this.$refs['popover-region'].doClose()
    },
    async handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) { 
          const params = {
            password: this.form.password
          }
          if (this.by === 'email') {
            params.email = this.form.email
          } else if (this.by === 'phone') {
            params.phone = this.form.phone
            params.region = this.selectRegion.id
          }
          const res = await service.login({...params, ...this.ncData})
          if (res.code) {
            this.loading = false
            utils.alert(res.message)
            this.ncreset(); // 重置滑动验证模块
            return false
          }   
          if (res.data.google_key_bound || res.data.phone || res.data.email) { 
            this.form.phone = res.data.phone
            this.form.email = res.data.email
            this.verify_phone = res.data.verify_phone
            this.verify_email = res.data.verify_email
            this.verify_google = res.data.verify_login_google
            if (this.verify_type === 'email' || this.verify_type === 'phone') {
              this.getSmsCode()
            } else if (this.verify_type === 'google') { 
              this.step = 2
            }
          }
        } else {
          utils.alert('error submit!!');
          return false;
        }
      })
    },
    hendleSwitchPwdType() {
      if (this.pwdType==='password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    }, 
    async getSmsCode () { 
      if (this.sms.status === 1 || this.sms.loading || this.loading) {
        return false
      }
      if (this.by === 'phone') {
        if (!this.selectRegion.id) {
          utils.alert(this.$i18n.t('region_ph'))
          return false
        }
        if (!this.form.phone) {
          utils.alert(this.$i18n.t('bind_phone_err_empty')) 
          return false
        }
      } else {
        if (!this.form.email) { 
          utils.alert(this.$i18n.t('err_empty_email')) 
          return false
        }
      }
      this.sms.status = 1
      this.sms.countDown = 60
      const param = {
        region: this.selectRegion.id,
        phone: this.form.phone,
        email: this.form.email,
      }  
      service.getLoginVerifyCode(param, this.verify_type).then(res => { 
        if (res.code) {
          utils.alert(res.message)
          this.sms.status = 2
        } else { 
          this.step = 2
          this.startCountDown() 
        }
      }) 
    },
    startCountDown () {
      clearInterval(this.sms.timer)
      this.sms.timer = setInterval(() => {
        this.sms.countDown -= 1
        if (this.sms.countDown <= 0) {
          this.sms.countDown = 0
          this.sms.status = 2
          clearInterval(this.sms.timer)
        }
      }, 1000)
    },
    clearCountDown () {
      this.sms.status = 0
      clearInterval(this.sms.timer)
    },
    fixPosition () {
      try { 
        if (this.isMobile) {
          this.$refs.container.style.width = '100%'
          this.$refs.container.style.marginTop = '0'
          this.$refs.container2.style.width = '100%'
          this.$refs.container2.style.marginTop = '0'
        } else {
          this.$refs.container.style.width = '900px'
          this.$refs.container.style.marginTop = '100px'
          this.$refs.container2.style.width = '500px'
          this.$refs.container2.style.marginTop = '100px'
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleCloseSmsCode() {
      this.step = 1
      this.clearCountDown()
    }
  },
  mounted () {
    this.$eh.$on('app:resize', () => this.fixPosition())
    this.$nextTick(this.fixPosition)
  },
  async created() {
    const res = await service.getRegionList()
    this.freshQrcode()
    if (!res.code) {
      this.regionOptions = res.data
    } 
  }
}
</script>

<style lang="scss">
@import "../styles/_countryselect";
.register-container {
  width:100%;
  // padding-top: 100px;
  height: 650px;
  .register-box {
    margin: 0 auto;
    // width: 500px;
    width:900px;
    border-radius: 10px;
    background-color: #ffffff;
    .wrap {
      position:relative;
      padding: 30px 50px 40px;
      .sms-btn{color: $primary; cursor: pointer;}
      .close {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 20px;
        label{cursor: pointer;}
      }
      .register-title {
        margin-bottom: 25px;
        text-align: center;
        color: #353535;
        font-size: 20px;
      } 
      .pw-helps {
        line-height: 25px;
        border: 1px solid rgb(220, 223, 230); 
      }
      .register-content {
        color: #596A7A;
        .message {
          font-size: 14px;
          .img {
            font-size: 36px;
          }
        }
        .react-code-input-container {
          width: 100%;
          .react-code-input {
            display: flex;
            input {
              flex: 1;
              margin-left: 11px;
              border-right: 1px solid #a8adb7; 
              border-radius: 6px;
              &:first-child {
                margin-left: 0;
              }
              &:focus+input {
                border-left: 1px solid #a8adb7; 
              }
              &:focus {
                border-right: 1px solid #006fff; 
              }
            }
          } 
        }
      }
      .label {
        line-height: 1.5em;
      }
    }
    .wrap-right {
      width: 320px; 
      padding-right: 50px;
      padding-top: 140px;
      .login-qrcode {
        position:relative;
        padding:10px;
        width: 160px;
        border: 1px solid #f1f1f1;
        border-radius: 10px;
        .qr-img {
          vertical-align: bottom;
        }
        .qr-mask {
          position:absolute;
          top: 0;
          left: 0;
          height: 160px;
          width: 100%;
          background-color: rgba(255,255,255, 0.95);
          .text {
            font-size: 14px;
            color: #3c3c3c;
            font-weight: 700;
          }
          .result-img {
            margin-top: 55px;
          }
        }
        .result-text {
          color: #2F2F2F;
          font-size: 14px;
          // font-weight: 600;
        }
      }
      .login-tip {
        .text1 {
          color: #2F2F2F;
          font-size: 16px; 
        } 
      }
    }
  } 
  .corner-icon-view {
    position: relative;
    color: $primary;
    text-align: right;
    .label {
      position: absolute;
      top: 0;
      right: 0;
      height: 60px;
      width: 60px; 
      cursor: pointer;
      z-index: 10; 
    } 
    .mask {
      position: absolute; 
      top: 0;
      right: 0;
      height: 0;
      width: 0;
      border-right: 60px solid transparent;
      border-bottom: 60px solid white;
      cursor: pointer;
    }
  }
} 
  
</style>