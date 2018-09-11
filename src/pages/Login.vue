<template>
  <div class="page page-login" ref="container">
    <resbg></resbg>
    <div class="panel_box" ref="containera">
    <div class="panel">
      <div class="title-wrap">
        <div class="panel-title" v-t="'signin'"></div>
        <div class="by-links" v-if="state.enablePhoneSignup">
          <router-link class="by-link ibt" to="email">{{ $t('login_by_email') }}</router-link>
          <span class="sp-line"></span>
          <router-link class="by-link ibt" to="phone">{{ $t('login_by_phone') }}</router-link>
        </div>
      </div>
      <div class="error-block" v-show="errmsg">{{ errmsg }}</div>
      <form class="form" onsubmit="return false">
        <div :class="['field']" v-show="by === 'phone'">
          <div class="input-box">
            <div class="label">{{ $t('region_label') }}</div>
            <v-loading v-if="!regionOptions.length" color="gray"></v-loading>
            <select class="select" v-else v-model="regionId">
              <option value="">{{ $t('region_ph') }}</option>
              <option :value="option.id" v-for="option in regionOptions" :key="option.id">
                <span>+{{ option.id }}</span>
                <template v-if="state.locale === 'zh-CN'">{{ option.cname }}</template>
                <template v-else>{{ option.fullname }}</template>
              </option>
            </select>
          </div>
        </div>
        <div class="field" v-show="by === 'phone'" :class="{active: activeList['phone'].active}">
          <div class="input-box">
            <div class="label">{{ $t('phone_number') }}</div>
            <input class="input item" type="text"
              name="phone"
              @focus="active('phone', true)" @blur="active('phone', false)"
              @input="input('phone')"
              :placeholder="$t('bind_phone_input')"
              :disabled="loading"
              v-model.trim="phone" />
          </div>
        </div>
        <div :class="['field', {active: activeList['email'].active}]" v-show="by === 'email'">
          <div class="input-box">
            <div class="label" v-t="'login_label_mail'"></div>
            <input v-model.trim="email"
              class="input item"
              @focus="active('email', true)" @blur="active('email', false)"
              @input="input('email')"
              type="email"
              placeholder="you@example.com"
              name="email"
              :disabled="loading"
              >
            <span class="quick-delete" :data-enable="activeList['email'].qd" @click="quickDelete('email')"></span>
          </div>
        </div>
        <div :class="['field', {active: activeList['password'].active}]">
          <div class="input-box">
            <div class="label" v-t="'login_label_pw'"></div>
            <input v-model.trim="password"
              class="input item"
              type="password"
              :placeholder="$t('login_ph_pw')"
              name="password"
              :disabled="loading"
              @keyup.enter="submit"
              @focus="active('password', true)" @blur="active('password', false)"
              @input="input('password')">
          </div>
        </div>
        <div class="field submit">
          <v-btn class="submit-btn" :label="$t('signin')"
            height="40"
            width="290"
            :loading="loading"
            @click="submit"></v-btn>
          <div class="to-others">
            <router-link :to="{name: 'registerBy', params: $route.params, query: $route.query}">{{ $t('signup') }}</router-link>
            <router-link class="ml-5" :to="{name: 'recover'}">{{ $t('if_forgot') }}</router-link>
          </div>
        </div>
      </form>
    </div>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import {state, actions, local} from '@/modules/store'
import utils from '@/modules/utils'
import resbg from '@/components/resbg'
import ixInput from '@/components/common/ix-input/ix-input.vue'

export default {
  name: 'login',
  components: {
    VBtn,
    resbg,
    ixInput
  },
  props: ['by'],
  data () {
    return {
      local,
      state,
      regionId: '',
      errmsg: '',
      email: '',
      password: '',
      loading: false,
      phone: '',
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
        'phone': {
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
  beforeRouteEnter (to, from, next) {
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

      // 无二步验证
      if (!res.data.phone && !res.data.google) {
        // actions.resetStatus()
        // if (typeof state.loginBack === 'string') {
        //   location.href = state.loginBack
        // } else {
        //   this.$router.push(state.loginBack)
        // }
        // return actions.setLoginBack(null)
      }

      // 去二次验证
      // actions.setFa2(res.data)
      this.$router.push({
        name: 'invite'
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
      this.errmsg = ''
    },
    quickDelete (field) {
      this[field] = ''
      this.activeList[field].qd = false
    },
    fixPosition () {
      this.$refs.container.style.minHeight = window.innerHeight - ( 110 ) - ( 80 ) + 'px'
      this.$refs.containera.style.minHeight = window.innerHeight - ( 110 ) - ( 80 ) + 'px'
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
  destroyed() {
    this.$eh.$off('app:resize')
  }
}
</script>

<style scoped lang="scss">
@import "../styles/login";
</style>
