<template>
  <div class="h5-login-container ">
    <div class="panel">
      <div class="title-wrap">
        <div class="panel-title"/>
        <div class="panel-head-text">
          {{ isLoginPage ? '登录' : '注册' }}后领取镰刀割大庄，666万奖励等你拿！
        </div>
        <!--
        <div class="panel-head-text">
          <p class="hold-coin">持有比特币</p>
          <p class="hold-share">每天分平台收入20%</p>
        </div>
        -->
      </div>
      <div
        v-if="isLoginPage">
        <login/>
      </div>
      <form
        v-if="!isLoginPage"
        class="form"
        onsubmit="return false"
        autocomplete="off">
        <div
          class="field"
          v-show="by === 'phone'">
          <div class="input-box">
            <v-loading
              v-if="!regionOptions.length"
              color="gray"/>
            <select
              class="select item"
              v-else
              v-model="regionId">
              <option value="">{{ $t('region_ph') }}</option>
              <option
                :value="option.id"
                v-for="option in regionOptions"
                :key="option.id">
                <span>+{{ option.id }}</span>
                <template >{{ option.cname }}</template>
              </option>
            </select>
          </div>
        </div>
        <div
          :class="['field']"
          v-show="by === 'phone'">
          <div class="input-box">
            <ix-input
              ref="phone"
              v-model.trim="phone"
              @input="phone=$event"
              @focus="resetError"
              :trigger-validate="triggerValidate"
              :required='true'
              :empty-err-tips="$t('bind_phone_err_empty')"
              :rule="validateRules.phone"
              :placeholder="$t('bind_phone_input')"
              :label="$t('phone_number')"
            />
          </div>
        </div>
        <div
          :class="['field']"
          v-show="by === 'email'">
          <div class="input-box">
            <ix-input
              class=""
              ref="email"
              v-model.trim="email"
              @input="email=$event"
              @focus="resetError"
              :trigger-validate="triggerValidate"
              :required='true'
              :empty-err-tips="$t('err_empty_email')"
              :rule="validateRules.email"
              placeholder="you@example.com"
              :label="$t('email')"
            />
          </div>
        </div>
        <div :class="['field']">
          <div class="input-box">
            <ix-input
              class="register__input-captcha"
              ref="captcha"
              v-model.trim="captcha"
              :trigger-validate="triggerValidate"
              :required='true'
              @input="captcha=$event"
              @focus="resetError"
              :empty-err-tips="$t('err_captcha_empty')"
              :rule="validateRules.captcha"
              :placeholder="$t('captcha')"
              :can-delete="false"
              :label="$t('captcha')"
            />

            <a
              class="sms-btn"
              :class="{disabled: sms.status === 1}"
              @click.prevent="getSmsCode">
              {{ smsBtnText }}</a>
          </div>
        </div>
        <div :class="['field']">
          <div class="input-box">
            <ix-input
              ref="password"
              v-model.trim="password"
              @input="password=$event;pwChange($event)"
              :trigger-validate="triggerValidate"
              type="password"
              :required='true'
              @focus="active(true)"
              @blur="active(false)"
              :empty-err-tips="$t('err_empty_password')"
              :rule="validateRules.password"
              :placeholder="$t('pwcheck_ph')"
              :label="$t('password')"
            />
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
          </div>
        </div>
        <div :class="['field']">
          <div class="input-box">
            <ix-input
              ref="password2"
              v-model.trim="password2"
              @input="password2=$event"
              @focus="resetError"
              :trigger-validate="triggerValidate"
              :required='true'
              type="password"
              :empty-err-tips="$t('change_password_diff')"
              :rule="validateRules.password2"
              :placeholder="$t('pwcheck_ph2')"
              :label="$t('password2')"
            />
          </div>
        </div>
        <div :class="['field']">
          <div class="input-box">
            <ix-input
              ref="invitor"
              v-model.trim="invitorId"
              @input="invitorId=$event"
              @focus="resetError"
              :rule="validateRules.invitor"
              :placeholder="$t('invitor_ph')"
              :label="$t('invitor')"
            />
          </div>
        </div>
        <div class="agreement">
          <input
            v-model="accept"
            class="checkbox"
            type="checkbox"
            name="accept"
            id="accept">
          <label for="accept">
            我已阅读并同意
            <a
              href="https://www.ix.com/services"
              target="_blank">服务条款</a>
            <a
              href="https://www.ix.com/PrivacyPolicy"
              target="_blank">隐私协议</a>
          </label>
        </div>
        <div class="field submit">
          <v-btn
            label="立即注册"
            :loading="loading"
            height="40"
            width="390"
            class="submit-btn"
            @click="submit"/>
          <div
            class="switch-btn"
            @click="switchRegister">
            {{ by === 'phone' ? '邮箱': '手机' }}注册
          </div>
        </div>
      </form>
    </div>
    <div class="h5__panel-next">
      <p>IX-全球首家</p>
      <p>支持比特币作为平台权益证明</p>
      <p>数字货币交易平台</p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import utils from '@/modules/utils'
import service from '@/modules/service'
import pwChecker from '@/modules/pw-checker'
import VBtn from '@/components/VBtn'
import {state} from '@/modules/store'
import resbg from '@/components/resbg'
import ixInput from '@/components/common/ix-input/ix-input.vue'
import 'mint-ui/lib/style.css'
import { Toast } from 'mint-ui'
import responsiveMixin from '@/mixins/responsive'
import qs from 'query-string'
import Login from './login/Login.vue'
const {mytoken} = qs.parse(location.search)
// import { MdField } from 'vue-material/dist/components'
// import gtMixin from '@/mixins/gt'

export default {
  name: 'H5SignUp',
  components: {
    VBtn,
    resbg,
    ixInput,
    Toast,
    Login
  },
  mixins: [responsiveMixin],
  data () {
    return {
      state,
      by: 'phone',
      errmsg: '',
      email: '',
      invitorId: '',
      password: '',
      captcha: '',
      password2: '',
      // 密码栏激活状态
      atPw: false,
      accept: true,
      loading: false,
      // 密码强度校验结果
      pwCheckList: pwChecker.getState(''),

      // 手机注册相关
      phone: '',
      regionId: 86,
      regionOptions: [],
      sms: {
        // 0:可以发送, 1:倒计时, 2:重新发送
        loading: false,
        status: 0,
        countDown: 0,
        timer: null
      },
      validateRules: {
        phone: {
          errTips: this.$t('bind_phone_err_format'),
          validateFunc: (num) => {
            return !(/\d+$/.test(num))
          }
        },
        email: {
          errTips: this.$t('err_invalid_email'),
          validateFunc: (email) => {
            return !(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email))
          }
        },
        password: {
          errTips: this.$t('err_weak_password'),
          validateFunc: (pswd) => {
            const pwCheckList = pwChecker.getState(pswd)
            return _.filter(pwCheckList, r => r.pass).length < 4
          }
        },
        password2: {
          errTips: this.$i18n.t('change_password_diff'),
          validateFunc: () => {
            return this.password !== this.password2
          }
        },
        captcha: {
          errTips: this.$t('phone_code_ph'),
          validateFunc: (captcha) => {
            return !(captcha && captcha.length === 6)
          }
        }
      },
      triggerValidate: false
    }
  },
  beforeRouteEnter (to, from, next) {
    let ele = document.getElementsByTagName('head')[0]
    let meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    ele.appendChild(meta)
    meta.name = 'x5-orientation'
    meta.content = 'portrait'
    ele.appendChild(meta)
    meta.name = 'renderer'
    meta.content = 'webkit'
    ele.appendChild(meta)
    let title = document.createElement('title')
    title.append('IX | 持BTC躺赚20%高额分红！')
    ele.getElementsByTagName('title')[0].remove()
    ele.appendChild(title)
    next()
  },
  computed: {
    // 表单数据
    params () {
      const params = {
        email: this.email,
        password: this.password,
        code: this.captcha
      }
      if (this.by === 'phone') {
        params.region = this.regionId
        params.phone = this.phone
      }
      if (this.invitorId) {
        params.invitor_id = this.invitorId
      }
      return params
    },
    // 密码强度值
    pwLevel () {
      return _.filter(this.pwCheckList, r => r.pass).length
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
    isLoginPage () {
      return this.$route.params.action === 'login'
    }
  },
  watch: {
    params () {
      this.resetError()
    },
    $route () {
      this.resetError()
      this.clearCountDown()
    }
  },
  methods: {
    async submit (e) {
      // 本地校验
      const check = this.checkParams()
      if (!check.ok || !!this.triggerValidate) {
        if (check.em) {
          Toast(check.em)
        }
        // Toast('请按照提示修改表单内容')
        // this.errmsg = check.em
        return false
      }
      this.resetError()
      this.loading = true
      const res = await service.register(this.params)
      this.loading = false
      if (res.code) {
        // 错误信息
        // this.errmsg = res.message
        Toast(res.message)
        this.loading = false
        return false
      }
      utils.eraseCookie('invitor')
      Toast(this.$i18n.t('register_success'))
      if (mytoken) {
        location.href = 'https://h5-cn-east.mytokenapi.com/activity/d11/?channel=20181111_ix'
      } else {
        location.href = 'https://ix.com/user/login/email'
      }
    },
    active (active) {
      this.atPw = active
      this.resetError()
    },
    input (field, value) {
      this[field] = value
    },
    switchRegister () {
      this.by = this.by === 'phone' ? 'email' : 'phone'
      let ele = document.scrollingElement || document.body
      ele.scrollTop = 0
    },
    checkParams () {
      const err = (em, field) => ({ok: false, em, field})
      if (this.by === 'phone') {
        if (!this.regionId) { // 这里默认选择中国86了吧，可以不需要这个验证了？
          return err(this.$i18n.t('region_ph'), 'regionId')
        }
        if (!this.phone) {
          this.triggerValidate = true
        }
      }
      if (this.by === 'email') {
        if (!this.email) {
          this.triggerValidate = true
        }
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
          this.triggerValidate = true
        }
      }
      if (!this.password) {
        this.triggerValidate = true
      }
      if (this.pwLevel < 4) {
        this.triggerValidate = true
      }
      // console.log(this.password, this.password2)
      if (this.password !== this.password2) {
        this.triggerValidate = true
        // return err(this.$i18n.t('change_password_diff'), 'password2')
      }
      if (!this.accept) { // 这里要不要弹框提示，或者把 注册按钮  置灰 ？
        return err(this.$i18n.t('err_check_agreement'), 'accept')
      }
      return {ok: true}
    },
    pwChange (password) {
      // this.password 比 时间传过来的password 更新慢一些
      this.pwCheckList = pwChecker.getState(password)
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
    async getSmsCode () {
      if (this.sms.status === 1 || this.sms.loading || this.loading) {
        return false
      }
      if (this.by === 'phone') {
        if (!this.regionId) {
          Toast(this.$i18n.t('region_ph'))
          return false
        }
        if (!this.phone) {
          Toast(this.$i18n.t('bind_phone_err_empty'))
          // this.triggerValidate = true
          // this.errmsg = this.$i18n.t('bind_phone_err_empty')
          return false
        }
      } else {
        if (!this.email) {
          // this.triggerValidate = true
          Toast(this.$i18n.t('err_empty_email'))
          // this.errmsg = this.$i18n.t('err_empty_email')
          return false
        }
      }
      this.sms.status = 1
      this.sms.countDown = 60
      this.startCountDown()
      const res = await service.sendCode({
        by: this.by,
        region: this.regionId,
        phone: this.phone,
        email: this.email,
        lang: state.locale
      })
      if (res.code) {
        Toast(res.message)
        // this.errmsg = res.message
      } else {
        this.errmsg = ''
      }
    },
    resetError () {
      this.errmsg = ''
      this.triggerValidate = false
    }
  },
  async created () {
    let invitorId = this.$route.query.invitor
    if (!invitorId) {
      invitorId = utils.getCookie('invitor')
    }
    if (invitorId && /^[A-Za-z0-9]+$/.test(invitorId)) {
      this.invitorId = invitorId
    }

    const res = await service.getRegionList()
    if (!res.code) {
      this.regionOptions = res.data
    }
    if (state.locale === 'zh-CN') {
      this.regionId = 86
    }
  },
  destroyed () {
    this.$eh.$off('app:resize')
  }
}
</script>
<style lang="scss" scoped>
@import './main-signup.scss';
</style>
