<template>
  <div class="page page-register">
    <resbg/>
    <bubble  v-if='!isMobile'/>
    <div
      class="panel_box"
      ref="container">
      <div class="panel">
        <div class="title-wrap">
          <div
            class="panel-title"
            v-t="'signup_title'"/>
          <div
            class="by-links"
            v-if="state.enablePhoneSignup">
            <router-link
              :to="{
                path: '/user/register/email' + routerParams,
              }"
              class="by-link ibt"
              >
              {{ $t('register_by_email') }}
            </router-link>
            <span class="sp-line"/>
            <router-link
              class="by-link ibt"
              :to="{
                path: '/user/register/phone' + routerParams,
              }">
              {{ $t('register_by_phone') }}
            </router-link>
          </div>
        </div>
        <!-- <div class="error-block" v-show="errmsg">{{ errmsg }}</div> -->
        <form
          class="form"
          @keydown.enter.stop.prevent="submit"
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
                  <template v-if="state.locale === 'zh-CN'">{{ option.cname }}</template>
                  <template v-else>{{ option.fullname }}</template>
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
                :empty-err-tips="$t('err_captcha_empty')"
                :rule="validateRules.captcha"
                :placeholder="$t('captcha')"
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
                :type.sync="pwdType"
                :show-eye="true"
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
                :trigger-validate="triggerValidate"
                :required='true'
                :type.sync="pwdType2"
                :show-eye="true"
                :empty-err-tips="$t('change_password_diff')"
                :rule="validateRules.password2"
                :placeholder="$t('pwcheck_ph2')"
                :label="$t('password2')"
              />
            </div>
          </div>
          <div :class="['field']"
              v-if="!hasAgent">
            <div class="input-box" >
              <ix-input
                ref="invitor" 
                :clientClass="'invitor-input'"
                :disabled="hasInvitor"
                v-model.trim="invitorId"
                @input="invitorId=$event"
                :rule="validateRules.invitor"
                :placeholder="$t('invitor_ph')"
                :label="$t('invitor')"
              />
            </div>
          </div>
          <div class="field submit">
            <v-btn
              :label="$t('signup_submit')"
              :loading="loading"
              height="40"
              width="390"
              class="submit-btn"
              @click="submit"/>
            <div class="agreement">
              <input
                v-model="accept"
                class="checkbox"
                type="checkbox"
                name="accept"
                id="accept">
              <label
                for="accept"
                v-html="$t('agreement', {agreement: goAgreement(), privacyPolicy: goPrivacy()})"/>
            </div>
          </div>
        </form>
      </div>
    </div>
    <v-download />
    <div>
      <v-modal
       @close="closeSafe"
      class="safe-modal"
      :open.sync="safe">
      <safeModal @close="closeSafe" />
    </v-modal>
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
import responsive from '@/mixins/responsive'
import bubble from '@/components/Bubble'
import VDownload from '@/components/VDownload'
import safeModal from '@/pages/login/safeModal'
import { mapState } from 'vuex'
// import { MdField } from 'vue-material/dist/components'
// import gtMixin from '@/mixins/gt'

export default {
  mixins: [responsive],
  name: 'Register',
  components: {
    VBtn,
    resbg,
    ixInput,
    bubble,
    VDownload,
    safeModal
  },
  props: ['by'],
  data () {
    return {
      state,
      utils,
      errmsg: '',
      email: '',
      invitorId: '',
      hasInvitor: false,
      hasAgent: false,
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
      regionId: '',
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
      triggerValidate: false,
      showTutorialArrow: false,
      pwdType: 'password',
      pwdType2: 'password',
      routerParams: '',
      showSafeModal: true
    }
  },
  /* beforeRouteEnter (to, from, next) {
    if (to.params.by === 'email') {
      return next()
    }
    if (to.params.by === 'phone' && state.enablePhoneSignup) {
      return next()
    }
    next({
      name: 'loginBy',
      params: {
        by: 'email'
      },
      query: to.query
    })
  }, */
  computed: {
    ...mapState(['safe']),
    // 表单数据
    params () {
      const params = {
        email: this.email,
        password: this.password,
        code: this.captcha,
      }
      if (this.by === 'phone') {
        params.region = this.regionId
        params.phone = this.phone
      }
      if (this.invitorId) {
        params.invitor_id = this.invitorId
      }
      if(this.utm_source) {
        params.utm_source = this.utm_source
      }
      return params
    },
    utm_source () {
      if(location.search.length > 0) {
        let para = utils.parseQueryString(location.search)
        return para['utm_source'] || ''
      }
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
    isMobile() {
      return this.utils.isMobile()
    }
  },
  beforeDestroy: function () {
    console.log(11111)
    if(this.$route.path !== '/user/login/phone' && this.$route.path !== '/user/login/email') {
      this.$store.dispatch('safeHanle', true)
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
          utils.alert(check.em)
        }
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
        utils.alert(res.message)
        this.loading = false
        return false
      }
      utils.eraseCookie('invitor')
      utils.success(this.$i18n.t('register_success'))
      // 激活邮箱
      // this.state.verifyEmail = this.email
      this.$router.push({
        name: 'login'
      })
    },
    active (active) {
      this.atPw = active
    },
    input (field, value) {
      this[field] = value
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
          utils.alert(this.$i18n.t('region_ph'))
          return false
        }
        if (!this.phone) {
          utils.alert(this.$i18n.t('bind_phone_err_empty'))
          // this.triggerValidate = true
          // this.errmsg = this.$i18n.t('bind_phone_err_empty')
          return false
        }
      } else {
        if (!this.email) {
          // this.triggerValidate = true
          utils.alert(this.$i18n.t('err_empty_email'))
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
        utils.alert(res.message)
        // this.errmsg = res.message
      } else {
        this.errmsg = ''
      }
    },
    goAgreement () {
      return '/services'
    },
    goPrivacy () {
      return '/privacypolicy'
    },
    resetError () {
      this.errmsg = ''
      this.triggerValidate = false
    },
    fixPosition () {
      try {
        if (utils.isMobile) {
          this.$refs.container.style.minHeight = screen.availHeight + (82) - (205) + 'px'
        } else {
          this.$refs.container.style.minHeight = window.innerHeight + (82) - (110) - (80) + 'px'
        }
      } catch (e) {
        console.log(e)
      }
    },
    closeSafe () {
      this.$store.dispatch('safeHanle', false)
      // this.showSafeModal = false
    }

  },
  mounted () {
    this.$eh.$on('app:resize', () => this.fixPosition())
    this.$nextTick(this.fixPosition)
  },
  async created () {

    //如果地址带有邀请码信息则将邀请码写入cookie中，有效期为10天  2019/10/16 yzf
    let invitorId = this.$route.query.invitor
    let agentId = this.$route.query.agent
    if (invitorId) {
      utils.setCookie('invitor', invitorId, 10)
      this.hasInvitor = true
      this.routerParams = `?invitor=${invitorId}`
    } else if (agentId) {
      utils.setCookie('invitor', agentId, 10)
      this.hasAgent = true
      this.routerParams = `?agent=${agentId}`
      invitorId = agentId;
    } else {
      invitorId = utils.getCookie('invitor')
    }
    if (invitorId && /^[A-Za-z0-9]+$/.test(invitorId)) {
      this.invitorId = invitorId
    }

    // if (agentId) {
    //   utils.setCookie('invitor', agentId)
    //   this.hasAgent = true
    //   this.routerParams = `?agent=${agentId}`
    // } else {
    //   agentId = utils.getCookie('agent')
    // }
    // if (agentId && /^[A-Za-z0-9]+$/.test(agentId)) {
    //   this.invitorId = agentId
    // }



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

<style scoped lang="scss">
@import "../styles/register";

.page-register {
  /deep/ .invitor-input{
    color:#6c7378;
  } 
}
</style>
