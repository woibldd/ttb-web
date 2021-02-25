<template>
  <div class="page page-login">
    <bubble v-if="!isMobile"/>
    <resbg/>
    <div ref="container" class="panel_box">
      <div class="panel">
        <div class="title-wrap">
          <div
            v-t="'signin'"
            class="panel-title"/>
          <div
            v-if="state.enablePhoneSignup"
            class="by-links ibt">
            <router-link
              class="by-link ibt"
              to="email">{{ $t('login_by_email') }}</router-link>
            <span class="sp-line"/>
            <router-link class="by-link ibt" to="phone">{{ $t('login_by_phone') }}</router-link>
          </div>
        </div>
        <form
          class="form"
          onsubmit="return false"
          autocomplete="on"
          @keydown.enter.stop.prevent="submit">
          <div
            v-show="by === 'phone'"
            :class="['field']">
            <div class="input-box">
              <div class="label">{{ $t('region_label') }}</div>
              <v-loading
                v-if="!regionOptions.length"
                color="gray"/>
              <select
                v-else
                v-model="regionId"
                class="select"
                tabindex="1">
                <option value="">{{ $t('region_ph') }}</option>
                <option
                  v-for="option in regionOptions"
                  :value="option.id"
                  :key="option.id">
                  <span>+{{ option.id }}</span>
                  <template v-if="state.locale === 'zh-CN'">{{ option.cname }}</template>
                  <template v-else>{{ option.fullname }}</template>
                </option>
              </select>
            </div>
          </div>
          <div
            v-show="by === 'phone'"
            class="field">
            <div class="input-box">
              <!-- <div class="label">{{ $t('phone_number') }}</div> -->
              <ix-input
                ref="phone"
                v-model.trim="phone"
                :required="true"
                :empty-err-tips="$t('bind_phone_err_empty')"
                :rule="validateRules.phone"
                :placeholder="$t('bind_phone_input')"
                :label="$t('phone_number')"
                class=""
                tabindex="2"
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
            v-show="by === 'email'"
            :class="['field']">
            <div class="input-box">
              <!-- <div class="label" v-t="'login_label_mail'"></div> -->
              <ix-input
                ref="email"
                v-model.trim="email"
                :required="true"
                :empty-err-tips="$t('err_empty_email')"
                :rule="validateRules.email"
                :placeholder="$t('err_empty_email')"
                :label="$t('login_label_mail')"
                class=""
                tabindex="2"
              />
            </div>
          </div>
          <div :class="['field']">
            <div class="input-box">
              <!-- <div class="label" v-t="'login_label_pw'"></div> -->
              <ix-input
                ref="password"
                v-model.trim="password"
                :autocomplete="autocomplete"
                :required="true"
                :type.sync="pwdType"
                :show-eye="true"
                :empty-err-tips="$t('err_empty_password')"
                :rule="validateRules.password"
                :placeholder="$t('err_empty_password')"
                :label="$t('login_label_pw')"
                class=""
                tabindex="3"
                @input="password=$event"
              />
            </div>
          </div>
          <div class="field submit">
            <v-btn
              :label="$t('signin')"
              :loading="loading"
              tabindex="4"
              class="submit-btn"
              height="40"
              width="290"
              @click="submit"/>
            <div class="to-others">
              <div class="mr-10">
                <router-link
                  :to="{name: 'recover'}">{{ $t('if_forgot') }}?
                </router-link>
              </div>
              <div class="mr-10 mt-6">
                <span style="font-size:14px; color: #999;">  {{ $t('no_account') }} </span>
                <router-link :to="{name: 'registerBy', params: $route.params, query: $route.query}">{{ $t('signup') }}
                </router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <v-download />
    <v-modal
      :open.sync="showModal"
      :backdrop="false"
      @click="hideModal">
      <div class="ensure-modal">
        <div class="modal__title mb-30">{{ $t('security_verification') }}</div>
        <div class="modal__content">
          <div
            v-if="verify_type==='google'"
            class="modal__row mt-12 mb-25">
            <div class="row__label mb-9">{{ $t('fa2_google_code_mobile') }}</div>
            <div class="row__input" >
              <input
                ref="googleCode"
                v-model="googleCode"
                maxlength="6"
                class="input-validate google mr-14"
                @input="keyPress"
                @keydown.enter.stop.prevent="toVerifyCode">
            </div>
          </div>
          <div
            v-else-if="verify_type==='phone'"
            class="modal_phone">
            <div class="modal__row" >
              <div class="row__label mb-9">{{ $t('register_by_phone') }}</div>
              <div class="row__input" >{{ phone }} </div>
            </div>
            <div class="modal__row mt-12 mb-25">
              <div class="row__label mb-9">{{ $t('phone_code') }}</div>
              <div class="row__input" >
                <input
                  ref="phoneCode"
                  v-model="phoneCode"
                  maxlength="6"
                  class="input-validate mr-14"
                  @input="keyPress"
                  @keydown.enter.stop.prevent="toVerifyCode">
                <count-down
                  :send-text="$t('hq_send')"
                  :start-when-loaded="showModal"
                  :send-code-func="getPhoneVerifyCode"
                />
              </div>
            </div>
          </div>
          <div
            v-else-if="verify_type==='email'"
            class="modal_phone">
            <div class="modal__row" >
              <div class="row__label mb-9">{{ $t('register_by_email') }}</div>
              <div class="row__input" >{{ email }} </div>
            </div>
            <div class="modal__row mt-12 mb-25">
              <div class="row__label mb-9">{{ $t('email_code') }}</div>
              <div class="row__input" >
                <input
                  ref="emailCode"
                  v-model="emailCode"
                  maxlength="6"
                  class="input-validate mr-14"
                  @input="keyPress"
                  @keydown.enter.stop.prevent="toVerifyCode">
                <count-down
                  :send-text="$t('hq_send')"
                  :start-when-loaded="showModal"
                  :send-code-func="getEmailVerifyCode"
                />
              </div>
            </div>
          </div>

          <v-btn
            :label="$t('signin')"
            class="w-340"
            @click="toVerifyCode"/>
        </div>
      </div>
    </v-modal>
    <div>
     <!-- <v-modal
       @close="closeSafe"
      class="safe-modal"
      :open.sync="safe">
      <safeModal @close="closeSafe" />
    </v-modal> -->
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import { state, actions, local } from '@/modules/store'
import utils from '@/modules/utils'
import resbg from '@/components/resbg'
import ixInput from '@/components/common/ix-input/ix-input.vue'
import countDown from '@/components/common/countdown-code-button'
import responsive from '@/mixins/responsive'
import bubble from '@/components/Bubble'
import VDownload from '@/components/VDownload'
import { activeShareAccount } from '@/api/share_option'
import safeModal from '@/pages/login/safeModal'
import { mapState } from 'vuex'
export default {
  name: 'Login',
  components: {
    VBtn,
    resbg,
    ixInput,
    countDown,
    bubble,
    VDownload,
    safeModal
  },
  mixins: [responsive],
  props: ['by'],
  data() {
    return {
      autocomplete: 'on',
      local,
      state,
      utils,
      pwdType: 'password',
      regionId: '',
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
        },
        password: {

        }
      },
      prevent: false,
      showSafeModal: true
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
      name: 'loginBy',
      params: {
        by: 'email'
      },
      query: to.query
    })
  },
   beforeDestroy: function () { 
    if(this.$route.path !== '/user/login/phone' && this.$route.path !== '/user/login/email') {
      this.$store.dispatch('safeHanle', true)
    }
  },
  computed: {
    ...mapState(['safe']),
    params() {
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
    verify_type() {
      let type = 'email'
      // 优先google验证
      // if (this.verify_google) {
      //   type = 'google'
      // } else if (this.by === 'email') {
      //   if (this.verify_email) {
      //     type = 'email'
      //   } else if (this.verify_phone) {
      //     type = 'phone'
      //   }
      // } else if (this.by === 'phone') {
      //   if (this.verify_phone) {
      //     type = 'phone'
      //   } else if (this.verify_email) {
      //     type = 'email'
      //   }
      // }
      if (this.verify_google === 1) {
        type = 'google'
      } else if (this.verify_phone) {
        type = 'phone'
      } else if (this.verify_email) {
        type = 'email'
      }
      return type
    },
    isMobile(){
      return this.utils.isMobile()
    }
  },
  watch: {
    showModal(val) {
      if (!val) {
        this.loading = val
      }
    },
    params() {
      this.errmsg = ''
    }
  },
  mounted() {
    this.$eh.$on('app:resize', () => this.fixPosition())
    this.$nextTick(this.fixPosition)
  },
  created() {
    this.fetchRegion()
    let $this = this
    setTimeout(function () {
      if (state.userInfo) {
        $this.$router.push('/')
      }
    }, 500)

    const returnTo = this.$route.query.return_to
    if (returnTo && returnTo.indexOf('https://ix.zendesk.com/') > -1) {
      actions.setLoginBack('/zendesk/auth' + location.search)
    }
    const backTo = this.$route.query.from
    if (backTo && (/^\/campaigns\//.test(backTo) || /^\/activity\//.test(backTo))) {
      actions.setLoginBack(backTo)
    }
  },
  destroyed() {
    this.$eh.$off('app:resize')
  },
  methods: {
    download (type) {
      let url = 'https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/ixx.apk'
      if (type === 'ios') {
        // url = 'itms-services://?action=download-manifest&url=https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/install-manifest.plist'
        url = 'https://kkwxsign.com/1rsNn.html' 
      }
      window.location.href = url
    },
    async fetchRegion() {
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
    checkParams() {
      if (this.$refs.password.validateSuccess) {
        if (this.by === 'phone' && this.$refs.phone.validateSuccess) {
          return true
        } else if (this.by === 'email' && this.$refs.email.validateSuccess) {
          return true
        }
      }

      return false
    },
    hideModal() {
      this.showModal = false
    },
    keyPress($event) {
      const code = $event.srcElement.value
      if (code && code.length === 6 && /^\d{6}$/.test(code)) {
        this.toVerifyCode()
      }
    },
    async submit(e) {
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
        this.verify_google = res.data.verify_login_google
        this.showModal = true
        this.$nextTick(() => {
          const type = this.verify_type
          console.log(type)
          if (type === 'google') {
            this.$refs.googleCode.focus()
          } else if (type === 'phone') {
            this.$refs.phoneCode.focus()
          } else {
            this.$refs.emailCode.focus()
          }
        })
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
    fixPosition() {
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
    async toVerifyCode() {
      if (this.prevent == true) return
      setTimeout(() => { this.prevent = false }, 2000)
      this.prevent = true

      // let type = 'google'
      const type = this.verify_type
      let params = {
      }
      console.log({ verify_type: this.verify_type })
      if (type === 'google') {
        params = {
          code: this.googleCode
        }
        this.$refs.googleCode.focus()
      } else if (type === 'phone') {
        params = {
          phone: this.phone,
          code: this.phoneCode
        }
        this.$refs.phoneCode.focus()
        // type = 'phone'
      } else {
        params = {
          email: this.email,
          code: this.emailCode
        }
        this.$refs.emailCode.focus()
        // type = 'email'
      }
      if (!params.code) {
        utils.alert(this.$i18n.t('err_captcha_empty'))
        return
      }
      const resp = await service.verifyLoginVerifyCode(params, type)
      if (!resp.code) {
        if (resp.data && resp.data.verified) {
          this.loginSuccess(resp.data)
        }
      } else {
        utils.alert(resp.message)
      }
    },
    async loginSuccess(userInfo) {
      actions.setUserInfo(userInfo)
      actions.resetStatus()

      if (typeof state.loginBack === 'string') {
        location.href = state.loginBack
      } else {
        this.$router.push(state.loginBack)
      }
      actions.setLoginBack(null)
      setTimeout(()=>{
        // activeShareAccount(userInfo.id)
        this.$eventBus.$emit('handleFirstLogin')
      },100)
    },
    getPhoneVerifyCode() {
      const param = {
        region: this.regionId,
        phone: this.phone,
        email: this.email
      }
      service.getLoginVerifyCode(param, 'phone').then(res => { 
        if (res.code) {
          utils.alert(res.message)
        }
      })
    },
    getEmailVerifyCode() {
      const param = {
        region: this.regionId,
        email: this.email
      }
      service.getLoginVerifyCode(param, 'email').then(res => { 
        if (res.code) {
          utils.alert(res.message)
        }
      })
    },
    closeSafe () {
      // this.showSafeModal = false
      this.$store.dispatch('safeHanle', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/login";
</style>
