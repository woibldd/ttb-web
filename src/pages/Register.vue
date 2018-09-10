<template>
  <div class="page page-register " ref="container" >
    <resbg></resbg>
    <div class="panel">
      <div class="title-wrap">
        <div class="panel-title" v-t="'signup_title'"></div>
        <div class="by-links" v-if="state.enablePhoneSignup">
          <router-link class="by-link ibt" to="email">{{ $t('register_by_email') }}</router-link>
          <span class="sp-line"></span>
          <router-link class="by-link ibt" to="phone">{{ $t('register_by_phone') }}</router-link>
        </div>
      </div>
      <div class="error-block" v-show="errmsg">{{ errmsg }}</div>
      <form class="form" onsubmit="return false" autocomplete="off">
        <div class="field" v-show="by === 'phone'">
          <div class="input-box">
            <v-loading v-if="!regionOptions.length" color="gray"></v-loading>
            <select class="select item" v-else v-model="regionId">
              <option value="">{{ $t('region_ph') }}</option>
              <option :value="option.id" v-for="option in regionOptions" :key="option.id">
                <span>+{{ option.id }}</span>
                <template v-if="state.locale === 'zh-CN'">{{ option.cname }}</template>
                <template v-else>{{ option.fullname }}</template>
              </option>
            </select>
          </div>
        </div>
        <div :class="['field', {active: activeList['phone'].active}]" v-show="by === 'phone'">
          <div class="input-box">
            <div class="label">{{ $t('phone_number') }}</div>
            <input class="input item" type="text"
              @focus="active('phone', true)" @blur="active('phone', false)"
              @input="input('phone')"
              name="phone"
              :placeholder="$t('bind_phone_input')"
              :disabled="loading"
              v-model.trim="phone" />
          </div>
        </div>
        <div :class="['field', {active: activeList['email'].active}]" v-show="by === 'email'">
          <div class="input-box">
            <div class="label" v-t="'email'"></div>
            <input v-model.trim="email" @focus="active('email', true)" @blur="active('email', false)"
              @input="input('email')"
              ref="email"
              class="input item"
              type="email"
              name="email"
              placeholder="you@example.com"
              :disabled="loading">
            <span class="quick-delete" :data-enable="activeList['email'].qd" @click="quickDelete('email')"></span>
          </div>
          <!-- <span class="error-tips" v-show="activeList['email'].error">{{activeList['email'].error}}</span> -->
        </div>
        <div :class="['field', {active: activeList['captcha'].active}]">
          <div class="input-box">
            <div class="label" v-t="'captcha'"></div>
            <input v-model.trim="captcha" @focus="active('captcha', true)" @blur="active('captcha', false)"
              @input="input('captcha')"
              ref="captcha"
              class="input captcha item"
              type="text"
              name="captcha"
              :placeholder="$t('captcha')"
              :disabled="loading">

              <a class="sms-btn"
              :class="{disabled: sms.status === 1}"
              @click.prevent="getSmsCode">
              {{smsBtnText}}</a>
          </div>
          <!-- <span class="error-tips" v-show="activeList['email'].error">{{activeList['email'].error}}</span> -->
        </div>
        <div :class="['field', {active: activeList['password'].active}]">
          <div class="input-box">
            <div class="label" v-t="'password'"></div>
            <input v-model.trim="password"
              :disabled="loading"
              autocomplete="off"
              type="password"
              name="password"
              class="input item"
              :placeholder="$t('pwcheck_ph')"
              @focus="active('password', true)" @blur="active('password', false)"
              @input="pwChange"
              @keyup.enter="submit" />
            <div class="pw-helps" :class="{show: atPw}">
              <div class="title" v-t="'pwcheck_guide'"></div>
              <ul class="pw-checks">
                <li v-for="(check, index) in pwCheckList"
                  class="pw-check" :key="index">
                  <span class="pw-state" :class="{pass: check.pass}"></span>
                  <span class="desc">{{ $t(check.desc) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div :class="['field', {active: activeList['password2'].active}]">
          <div class="input-box">
            <div class="label" v-t="'password2'"></div>
            <input v-model.trim="password2"
              :disabled="loading"
              autocomplete="off"
              type="password"
              name="password2"
              class="input item"
              :placeholder="$t('pwcheck_ph2')"
              @focus="active('password2', true)" @blur="active('password2', false)"
              @keyup.enter="submit" />
          </div>
        </div>
        <div :class="['field', {active: activeList['invitor'].active}]">
          <div class="input-box">
            <div class="label" v-t="'invitor'"></div>
            <input class="input item"
              type="text"
              ref="invitor"
              @focus="active('invitor', true)" @blur="active('invitor', false)"
              @input="input('invitor')"
              :placeholder="$t('invitor_ph')"
              v-model.trim="invitorId"
              :disabled="loading">
          </div>
        </div>
        <div class="field submit">
          <v-btn :label="$t('signup_submit')" :loading="loading"
            height="40"
            width="390"
            class="submit-btn" @click="submit">
          </v-btn>
          <div class="agreement">
            <input v-model="accept"
              class="checkbox"
              type="checkbox"
              name="accept"
              id="accept">
            <label for="accept" v-html="$t('agreement', {agreement: goAgreement(), privacyPolicy: goPrivacy()})">
            </label>
          </div>
          <!-- <div class="to-login">
            <span v-t="'signup_has_account'"></span>
            <router-link :to="{name: 'loginBy', query: $route.query, params: $route.params}">{{ $t('signin') }}</router-link>
          </div> -->
        </div>
      </form>
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
// import { MdField } from 'vue-material/dist/components'
// import gtMixin from '@/mixins/gt'

export default {
  name: 'register',
  components: {
    VBtn,
    resbg
  },
  props: ['by'],
  data () {
    return {
      state,
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
      regionId: '',
      regionOptions: [],
      sms: {
        // 0:可以发送, 1:倒计时, 2:重新发送
        loading: false,
        status: 0,
        countDown: 0,
        timer: null
      },

      activeList: {
        'email': {
          active: false,
          qd: false,
          error: ''
        },
        'password': {
          active: false,
          qd: false,
          error: ''
        },
        'password2': {
          active: false,
          qd: false,
          error: ''
        },
        'phone': {
          active: false,
          qd: false,
          error: ''
        },
        'invitor': {
          active: false,
          qd: false,
          error: ''
        },
        'captcha': {
          active: false,
          qd: false,
          error: ''
        }
      }
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
    }
  },
  watch: {
    params () {
      this.resetError()
    }
  },
  methods: {
    async submit (e) {
      // 本地校验
      const check = this.checkParams()
      if (!check.ok) {
        this.errmsg = check.em
        // this.activeList[check.field].error = check.em
        return false
      }
      this.resetError()
      const res = await service.register(this.params)

      if (res.code) {
        // 错误信息
        this.errmsg = res.message
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
    active (field, active) {
      this.activeList[field].active = active
      if (field === 'password') {
        this.atPw = active
      }
    },
    input (field) {
      let text = this[field]
      this.activeList[field].qd = !!text
    },
    quickDelete (field) {
      this[field] = ''
      // this.activeList[field].active = true
      this.activeList[field].qd = false
    },
    checkParams () {
      const err = (em, field) => ({ok: false, em, field})
      if (this.by === 'phone') {
        if (!this.regionId) {
          return err(this.$i18n.t('region_ph'), 'regionId')
        }
        if (!this.phone) {
          return err(this.$i18n.t('bind_phone_err_empty'), 'phone')
        }
      }
      if (this.by === 'email') {
        if (!this.email) {
          return err(this.$i18n.t('err_empty_email'), 'email')
        }
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
          return err(this.$i18n.t('err_invalid_email'), 'email')
        }
      }
      if (!this.password) {
        return err(this.$i18n.t('err_empty_password'), 'password')
      }
      if (this.pwLevel < 4) {
        return err(this.$i18n.t('err_weak_password'), 'password')
      }
      if (this.password !== this.password2) {
        return err(this.$i18n.t('change_password_diff'), 'password2')
      }
      if (!this.accept) {
        return err(this.$i18n.t('err_check_agreement'), 'accept')
      }
      return {ok: true}
    },
    pwChange () {
      this.pwCheckList = pwChecker.getState(this.password)
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
    async getSmsCode () {
      if (this.sms.status === 1 || this.sms.loading || this.loading) {
        return false
      }
      if (this.by === 'phone') {
        if (!this.regionId) {
          this.errmsg = this.$i18n.t('region_ph')
          return false
        }
        if (!this.phone) {
          this.errmsg = this.$i18n.t('bind_phone_err_empty')
          return false
        }
      } else {
        if (!this.email) {
          this.errmsg = this.$i18n.t('err_empty_email')
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
        this.errmsg = res.message
      } else {
        this.errmsg = ''
      }
    },
    goAgreement () {
      return '/terms'
    },
    goPrivacy () {
      return '/privacypolicy'
    },
    resetError () {
      this.errmsg = ''
    },
    fixPosition () {
      this.$refs.container.style.minHeight = window.innerHeight - ( 110 ) - ( 80 ) + 'px'
    }
  },
  mounted () {
    this.$eh.$on('app:resize', () => this.fixPosition())
    this.$nextTick(this.fixPosition)
  },
  async created () {
    // this.gtInit()

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
  }
}
</script>

<style scoped lang="scss">
@import "../styles/register";
</style>
