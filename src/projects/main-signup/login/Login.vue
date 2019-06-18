<template>
  <div class="page page-login">
    <div
      class="panel_box"
      ref="container">
      <form
        class="form"
        onsubmit="return false"
        @keydown.enter.stop.prevent="submit"
        autocomplete="off">
        <div
          :class="['field']"
          v-show="by === 'phone'">
          <div class="input-box">
            <div class="label">{{ $t('region_label') }}</div>
            <v-loading
              v-if="!regionOptions.length"
              color="gray"/>
            <select
              class="select"
              v-else
              v-model="regionId"
              tabindex="1"
            >
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
          class="field"
          v-show="by === 'phone'">
          <div class="input-box">
            <!-- <div class="label">{{ $t('phone_number') }}</div> -->
            <ix-input
              class=""
              ref="phone"
              tabindex="2"
              v-model.trim="phone"
              :required='true'
              :empty-err-tips="$t('bind_phone_err_empty')"
              :rule="validateRules.phone"
              :placeholder="$t('bind_phone_input')"
              :label="$t('phone_number')"
            />
            <!-- <input class="input item" type="text"
              name="phone"
              @focus="active('phone', true)" @blur="active('phone', false)"
              @input="input('phone')"
              :placeholder="$t('bind_phone_input')"
              :disabled="loading"
              v-model.trim="phone" /> -->
          </div>
        </div>
        <div
          :class="['field']"
          v-show="by === 'email'">
          <div class="input-box">
            <!-- <div class="label" v-t="'login_label_mail'"></div> -->
            <ix-input
              class=""
              tabindex="2"
              ref="email"
              v-model.trim="email"
              :required='true'
              :empty-err-tips="$t('err_empty_email')"
              :rule="validateRules.email"
              :placeholder="$t('err_empty_email')"
              :label="$t('login_label_mail')"
            />
          </div>
        </div>
        <div :class="['field']">
          <div class="input-box">
            <!-- <div class="label" v-t="'login_label_pw'"></div> -->
            <ix-input
              class=""
              ref="password"
              tabindex="3"
              v-model.trim="password"
              :required='true'
              type="password"
              :empty-err-tips="$t('err_empty_password')"
              :rule="validateRules.password"
              :placeholder="$t('err_empty_password')"
              :label="$t('login_label_pw')"
            />
          </div>
        </div>
        <div class="field submit">
          <v-btn
            tabindex="4"
            class="submit-btn"
            :label="$t('signin')"
            height="40"
            width="290"
            :loading="loading"
            @click="submit"/>
          <div class="to-others">
            <a :href="signupLink"><span class="white">新用户</span>注册</a>
            <div class="by-links">
              <span
                class="by-link"
                v-if="by === 'phone'"
                @click="by = 'email'">{{ $t('login_by_email') }}</span>
              <span
                v-if="by === 'email'"
                class="by-link"
                @click="by = 'phone'">{{ $t('login_by_phone') }}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
    <v-modal
      :open.sync="showModal"
      :backdrop="false"
      @click="hideModal">
      <div class="ensure-modal">
        <div class="modal__title mb-30">{{ $t('security_verification') }}</div>
        <div class="modal__content">
          <div
            class="modal__row mt-12 mb-25"
            v-if="verify_google">
            <div class="row__label mb-9">{{ $t('fa2_google_code_mobile') }}</div>
            <div class="row__input" >
              <input
                v-model="googleCode"
                @input="keyPress"
                v-focus
                maxlength="6"
                @keydown.enter.stop.prevent="toVerifyCode"
                class="input-validate google mr-14">
            </div>
          </div>
          <div
            class="modal_phone"
            v-else-if="verify_phone">
            <div class="modal__row" >
              <div class="row__label mb-9">{{ $t('register_by_phone') }}</div>
              <div class="row__input" >{{ phone }} </div>
            </div>
            <div class="modal__row mt-12 mb-25">
              <div class="row__label mb-9">{{ $t('phone_code') }}</div>
              <div class="row__input" >
                <input
                  v-model="phoneCode"
                  @input="keyPress"
                  maxlength="6"
                  @keydown.enter.stop.prevent="toVerifyCode"
                  class="input-validate mr-14">
                <count-down
                  :send-text="$t('hq_send')"
                  :start-when-loaded="showModal"
                  :send-code-func="getPhoneVerifyCode"
                />
              </div>
            </div>
          </div>
          <div
            class="modal_phone"
            v-else-if="verify_email">
            <div class="modal__row" >
              <div class="row__label mb-9">{{ $t('register_by_email') }}</div>
              <div class="row__input" >{{ email }} </div>
            </div>
            <div class="modal__row mt-12 mb-25">
              <div class="row__label mb-9">{{ $t('email_code') }}</div>
              <div class="row__input" >
                <input
                  v-model="emailCode"
                  @input="keyPress"
                  maxlength="6"
                  @keydown.enter.stop.prevent="toVerifyCode"
                  class="input-validate mr-14">
                <count-down
                  :send-text="$t('hq_send')"
                  :start-when-loaded="showModal"
                  :send-code-func="getEmailVerifyCode"
                />
              </div>
            </div>
          </div>

          <v-btn
            class="w-340"
            @click="toVerifyCode"
            :label="$t('signin')"/>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
import qs from 'query-string'
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import {state, actions, local} from '@/modules/store'
import utils from '@/modules/utils'
import ixInput from '@/components/common/ix-input/ix-input.vue'
import countDown from '@/components/common/countdown-code-button'
import responsive from '@/mixins/responsive'
const {mytoken} = qs.parse(location.search)

export default {
  mixins: [responsive],
  name: 'Login',
  components: {
    VBtn,
    ixInput,
    countDown
  },
  data () {
    return {
      local,
      state,
      regionId: 86,
      errmsg: '',
      email: '',
      password: '',
      loading: false,
      showModal: false,
      google_key_bound: 0,
      phoneCode: '',
      emailCode: '',
      googleCode: '',
      phone: '',
      verify_phone: 0,
      verify_email: 0,
      verify_google: 0,
      regionOptions: [],
      validateRules: {
        phone: {
          errTips: this.$t('bind_phone_err_format'), // 空值，表示跳过校验
          validateFunc: (num) => {
            return !(/\d+$/.test(num))
          }
        },
        email: {
          errTips: this.$t('err_invalid_email'), // 空值，表示跳过校验
          validateFunc: (email) => {
            return !(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email))
          }
        }
      },
      by: 'phone'
    }
  },
  computed: {
    params () {
      const params = {
        password: this.password
      }
      if (this.by === 'email') {
        params.email = this.email
      } else if (this.by === 'phone') {
        params.phone = this.phone
        params.region = this.regionId
      }
      return params
    },
    signupLink () {
      return location.origin + `/main-signup.html${mytoken ? '?mytoken=1' : ''}`
    }
  },
  watch: {
    params () {
      this.errmsg = ''
    }
  },
  methods: {
    async fetchRegion () {
      const res = await service.getRegionList()
      if (!res.code) {
        this.regionOptions = res.data
        if (!+this.local.regionId) {
          if (state.locale === 'zh-CN' && !this.local.regionId) {
            this.regionId = 86
          } else if (state.locale === 'ja' && !this.local.regionId) {
            this.regionId = 81
          }
        } else {
          this.regionId = +this.local.regionId
        }
      }
    },
    checkParams () {
      if (this.$refs.password.validateSuccess) {
        if (this.by === 'phone' && this.$refs.phone.validateSuccess) {
          return true
        } else if (this.by === 'email' && this.$refs.email.validateSuccess) {
          return true
        }
      }

      return false
    },
    hideModal () {
      this.showModal = false
    },
    keyPress ($event) {
      let code = $event.srcElement.value
      if (code && code.length === 6 && /^\d{6}$/.test(code)) {
        this.toVerifyCode()
      }
    },
    async submit (e) { 
      // 本地校验
      const check = this.checkParams()
      if (!check) {
        return false
      }
      this.errmsg = ''

      this.loading = true

      const res = await service.login(this.params)
      if (res.code) {
        this.loading = false
        utils.alert(res.message)
        return false
      }

      if (this.by === 'phone') {
        this.local.regionId = this.regionId
      }

      utils.eraseCookie('invitor')

      if (res.data.google_key_bound || res.data.phone || res.data.email) {
        this.google_key_bound = res.data.google_key_bound
        this.phone = res.data.phone
        this.email = res.data.email
        this.verify_phone = res.data.verify_phone
        this.verify_email = res.data.verify_email
        this.verify_google = res.data.verify_google
        this.showModal = true
      } else {
      // 未开启二步认证
        this.loginSuccess(res.data)
      }
      // 无二步验证
      // if (!res.data.phone && !res.data.google) {
      // actions.resetStatus()
      // if (typeof state.loginBack === 'string') {
      //   location.href = state.loginBack
      // } else {
      //   this.$router.push(state.loginBack)
      // }
      // return actions.setLoginBack(null)
      // }

      // 去二次验证
      // actions.setFa2(res.data)
    },
    fixPosition () {
      try {
        if (utils.isMobile) {
          this.$refs.container.style.height = screen.availHeight - (205) + 'px'
        } else {
          this.$refs.container.style.height = window.innerHeight - (110) - (80) + 'px'
        }
      } catch (e) {
        console.log(e)
      }
    },
    async toVerifyCode () {
      let type = 'google'
      let params = {
      }
      if (this.verify_google) {
        params = {
          code: this.googleCode
        }
      } else if (this.verify_phone) {
        params = {
          phone: this.phone,
          code: this.phoneCode
        }
        type = 'phone'
      } else {
        params = {
          email: this.email,
          code: this.emailCode
        }
        type = 'email'
      }
      if (!params.code) {
        utils.alert(this.$i18n.t('err_captcha_empty'))
        return
      }
      let resp = await service.verifyLoginVerifyCode(params, type)
      if (!resp.code) {
        if (resp.data && resp.data.verified) {
          this.loginSuccess(resp.data)
        }
      } else {
        utils.alert(resp.message)
      }
    },
    async loginSuccess (userInfo) {
      actions.setUserInfo(userInfo)
      actions.resetStatus()
      if (mytoken) {
        location.href = 'https://h5-cn-east.mytokenapi.com/activity/d11/?channel=20181111_ix'
      } else {
        location.href = 'https://ix.com/user/login/email'
      }
    },
    getPhoneVerifyCode () {
      const param = {
        region: this.regionId,
        phone: this.phone,
        email: this.email
      }
      service.getLoginVerifyCode(param, 'phone').then(res => {
        console.log(res)
      })
    },
    getEmailVerifyCode () {
      const param = {
        region: this.regionId,
        email: this.email
      }
      service.getLoginVerifyCode(param, 'email').then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.$eh.$on('app:resize', () => this.fixPosition())
    this.$nextTick(this.fixPosition)
  },
  created () { 
    this.fetchRegion()

    const returnTo = this.$route.query.return_to
    if (returnTo && returnTo.indexOf('https://ix.zendesk.com/') > -1) {
      actions.setLoginBack('/zendesk/auth' + location.search)
    }
    const backTo = this.$route.query.from
    if (backTo && (/^\/campaigns\//.test(backTo) || /^\/activity\//.test(backTo))) {
      actions.setLoginBack(backTo)
    }
  },
  destroyed () {
    this.$eh.$off('app:resize')
  }
}
</script>

<style scoped lang="scss">
@import "./login";
</style>
