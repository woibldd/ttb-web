<template>
  <div class="register-container">
    <bubble v-if="!isMobile"/>
    <div class="register-box" ref="container">
      <div v-if="step===1" class="wrap">
        <div class="register-title">
          <h3>
            {{$t('customer.registerAccount', {siteName: state.siteNameText})}}
          </h3>
        </div>
        <div class="register-content">
          <el-menu :default-active="by" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="phone">
              <router-link
                class="by-link ibt"
                to="phone">{{ $t('customer.registerByPhone') }}</router-link>  
            </el-menu-item> 
            <el-menu-item index="email" >
              <router-link
                class="by-link ibt"
                to="email">{{ $t('customer.registerByEmail') }}</router-link>
            </el-menu-item> 
          </el-menu> 
          <el-form :model="form" ref="form" :rules="validateRules" class="mt-20">
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
                <el-input v-model="form.phone" :placeholder="$t('register_by_phone')"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item v-if="by==='email'" prop="email"> 
              <el-input v-model="form.email" :placeholder="$t('register_by_email')"></el-input> 
            </el-form-item>
            <el-form-item prop="password">
              <el-input 
                v-model="form.password" 
                :placeholder="$t('password')"
                :type="pwdType"
                @focus="active(true)"
                @blur="active(false)">  
                <i @click="hendleSwitchPwdType" slot="suffix" class="mr-10"> 
                  <icon :name="pwdType==='password' ? 'eye-off' :'eye-on'" /> 
                </i>
                <!-- <i slot="append"> <icon name="" /> </i>  -->
              </el-input> 
              <div
                class="pw-helps"
                :class="{show: atPw}">
                <div
                  class="title"
                  v-t="'pwcheck_guide'"/>
                <ul class="pw-checks">
                  <li
                    v-for="(check, index) in pwCheckList"
                    class="pw-check"
                    :key="index">
                    <span
                      class="pw-state"
                      :class="{pass: check.pass}"/>
                    <span class="desc">{{ $t(check.desc) }}</span>
                  </li>
                </ul>
              </div>
            </el-form-item>
            <!-- <el-form-item class="mb-1">
              <el-input v-model="form.whatsapp" :placeholder="$t('bachex.gift.placeholder')"></el-input>
              <div class="text-danger label" > 
                {{$t('bachex.gift.note')}}
              </div>
            </el-form-item>  -->
            <el-form-item prop="invitor">
              <el-input-number 
                :disabled="hasInvitor"
                :step="1"
                :step-strictly="true"
                :controls="false"
                v-model="form.invitor" 
                :placeholder="$t('invitor')"></el-input-number>
            </el-form-item>

            <!-- 代翔: 滑动验证组件 -->
            <el-form-item>
              <nc ref="nc" :mask="!((form.phone || form.email) && form.password)" @getnc="getnc"/>
            </el-form-item>

            <el-form-item prop="agree">
              <div class="label">
                <input
                  v-model="form.agree"
                  class="checkbox"
                  type="checkbox"
                  name="accept"
                  id="accept">
                <label 
                  for="accept"
                  v-html="$t('agreement', {agreement: '/services', privacyPolicy: '/privacypolicy'})"/>
              </div>
              <!-- <el-checkbox v-model="form.agree">
              <span v-html="$t('agreement', {agreement: '/services', privacyPolicy: '/privacypolicy'})"></span></el-checkbox> -->
              <div class="mt-5">
                <el-button :type="isnc?'primary':'info'" style="width:100%;" :disabled="!isnc"@click="handleSubmit">
                  {{$t('signup_title')}}
                </el-button> 
              </div>
            </el-form-item> 
          </el-form>
        </div>
        <div class="register-footer">
          <span>{{$t('customer.hasAccount')}}</span>
          <router-link to="/user/login">{{$t('signin')}}</router-link>
        </div> 
      </div>
      <div v-else-if="step===2" class="wrap">
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
          <div class="message" flex="box:first cross:center">
            <div class="img mr-20">
              <icon name="message" />
            </div>
            <div class="text">
              {{$t('customer.tip1', {contact: by==='phone'? $t('register_by_phone')+form.phone:$t('email') + form.email})}}
            </div>
          </div>
          <div class="mt-30 pb-15 mb-5">
            <label v-if="by==='phone'">{{$t('phone_verification_code')}}</label>
            <label v-else>{{$t('email_code')}}</label>
          </div>
          <div>
            <CodeInput :loading="false" class="input" v-on:change="onChange" v-on:complete="onComplete" />
          </div>
          <div class="mt-20">
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
import { state } from '@/modules/store'
import utils from '@/modules/utils'
import service from '@/modules/service'
import pwChecker from '@/modules/pw-checker' 
import responsive from '@/mixins/responsive'
import VDownload2 from '@/components/VDownload'
import bubble from '@/components/Bubble'
import nc from '@/components/createnc'

export default {
  name: "register",
  components: {CodeInput,  VDownload2, bubble, nc},
  props: ['by'],
  mixins: [responsive],
  data() { 
    return {
      state,
      ncData: {}, isnc: false, shownc: false,
      pwdType: 'password', //密码输入框状态
      step: 1, 
      atPw: false, 
      invitorId: undefined, 
      // 密码强度校验结果
      pwCheckList: pwChecker.getState(''),
      selectRegion: {
        "id": 86,
        "name": "CN",
        "fullname": "China",
        "cname": "中国"
      },
      form: { 
        phone: '',
        email: '',
        password: '',
        // whatsapp: '',
        agree: false,
        captcha: '',
        invitor: undefined,
      },
      regionOptions: [],
      sms: {
        // 0:可以发送, 1:倒计时, 2:重新发送
        loading: false,
        status: 0,
        countDown: 0,
        timer: null
      },
      hasInvitor: false,
      hasAgent: false, 
      validateRules: {
        phone: [{ 
          validator: (rule, num, callback) => {  
            if (!(/\d+$/.test(num)))
              callback(new Error(this.$t('bind_phone_err_format')));
            else {
              callback();
            }
          }, 
          trigger: 'blur'
        }],
        email: [{ 
          validator: (rule, email, callback) => {
            if (!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)))
              callback(new Error(this.$t('err_invalid_email')));
            else {
              callback();
            }
          }, 
          trigger: 'blur'
        }],
        password:[ 
          {  required: true, trigger: 'blur', message: this.$t('login_ph_pw'), },
          {
            message: this.$t('err_weak_password'),
            trigger: 'change',
            validator: (rule, pswd, callback) => {
              this.pwCheckList = pwChecker.getState(pswd) 
              if (this.pwCheckList.filter(r => r.pass).length < 4) {
                callback(new Error(this.$t('err_weak_password')));
              }
              else {
                callback();
              } 
            }
          }
        ], 
        captcha: [{
          message: this.$t('phone_code_ph'),
          validator: (captcha) => {
            return !(captcha && captcha.length === 6)
          }, trigger: 'blur'
        }],
        // invitor: [  
        //   { 
        //     validator: (rule, invitorId, callback) => {  
        //       // return !invitorId
        //       if (!invitorId) {
        //         callback(new Error(this.$t('invitor')));
        //       }
        //       else {
        //         callback();
        //       } 
        //     }, 
        //     trigger: 'blur'
        //   }
        // ],
        agree: [{
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error(this.$t('err_check_agreement')))
            } else {
              callback()
            }
          }
        }]
      }, 
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
    isMobile(){
      return utils.isMobile()
    },
    smsBtnText () {
      if (this.sms.status === 0) {
        return this.$i18n.t('sms_send')
      }
      if (this.sms.status === 2) {
        return this.$i18n.t('sms_retry')
      }
      return `${this.$i18n.t('sms_retry')}(${this.sms.countDown})`
    },
  },
  methods: {
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

    active (active) {
      //显示密码辅助弹窗
      this.atPw = active
    }, 
    pwChange (password) {
      // this.password 比 时间传过来的password更新慢一些
      this.pwCheckList = pwChecker.getState(password)
    },
    onChange(v) {
      this.form.captcha = v
      // console.log("onChange ", v);
    },
    onComplete(v) {
      this.form.captcha = v
      // console.log("onComplete ", v);
      this.fetchRegister()

    }, 
    async fetchRegister() {
      const params = {
        email: this.form.email,
        password: this.form.password,
        code: this.form.captcha, 
        // twitter: this.form.whatsapp
      }
      if (this.by === 'phone') {
        params.region = this.selectRegion.id
        params.phone = this.form.phone
      }
      if (this.form.invitor) {
        params.invitor_id = this.form.invitor
      }
      const res = await service.register(params)
      
      if (res.code) {
        utils.alert(res.message) 
        return false
      }
      utils.eraseCookie('invitor')
      utils.success(this.$i18n.t('register_success')) 
      this.$router.push({
        name: 'login'
      })
    },
    handleSelect(key, keyPath) { 
      this.by = keyPath[0]
    },
    handleSelectRegion(option) {
      this.selectRegion = option 
      this.$refs['popover-region'].doClose()
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.getSmsCode()
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
      const res = await service.sendCode({
        by: this.by,
        region: this.selectRegion.id,
        phone: this.form.phone,
        email: this.form.email,
        lang: state.locale,
        ...this.ncData
      })
      if (res.code) {
        utils.alert(res.message)
        this.sms.countDown = 0
        this.sms.status = 2
        // this.errmsg = res.message
      } else {
        this.errmsg = '' 
        this.step = 2
        this.startCountDown()
      }
      this.ncreset(); // 重置滑动验证模块
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
    handleCloseSmsCode () { 
      this.step = 1
      this.clearCountDown()
    },
    fixPosition () {
      try {
        if (utils.isMobile()) {
          this.$refs.container.style.width = '100%'
          this.$refs.container.style.marginTop = '0'
        } else {
          this.$refs.container.style.width = '500px'
          this.$refs.container.style.marginTop = '100px'
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
  mounted () {
    this.initnc(); // 代翔: 初始化滑动验证组件
    this.$eh.$on('app:resize', () => this.fixPosition())
    this.$nextTick(this.fixPosition)
  },
  async created() {
    const res = await service.getRegionList()
    if (!res.code) {
      this.regionOptions = res.data
    }
    // if (state.locale === 'zh-CN') {
    //   this.regionId = 86
    // } 
    
    let invitorId = this.$route.query.invitor
    if (invitorId) {
      utils.setCookie('invitor', invitorId)
      this.hasInvitor = true
      this.routerParams = `?invitor=${invitorId}`
    } else {
      invitorId = utils.getCookie('invitor')
    }
    if (invitorId && /^[A-Za-z0-9]+$/.test(invitorId)) {
      this.form.invitor = invitorId
    }
  }
}
</script>

<style lang="scss" scope>

@import "../styles/register";
@import "../styles/_countryselect";
.register-container { 
  width:100%;
  padding-top: 1px;
  height: 650px;
  .register-box {
    margin: 0 auto;
    width: 500px;
    border-radius: 10px;
    background-color: #ffffff;
    .wrap {
      position: relative;
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
  } 
  .el-input-number {
    width: 100%;
    input {
      text-align: left;
    }
  }
} 
</style>
 