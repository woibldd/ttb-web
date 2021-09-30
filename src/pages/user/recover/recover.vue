<template>
  <div class="page page-login recover-container">
    <div
      class="panel"
      v-if="step < 4">
      <div class="title-wrap">
        <div
          class="panel-title"
          v-t="'if_forgot'"/>
        <div class="by-links">
          <router-link
            class="by-link ibt"
            to="email">{{ $t('register_by_email') }}</router-link>
          <span class="sp-line"/>
          <router-link
            class="by-link ibt"
            to="phone">{{ $t('register_by_phone') }}</router-link>
        </div>
      </div>
      <form
        class="form pt-10"
        autocomplete="off"
        onsubmit="return false">
        <!-- <div
          v-if="step < 3"
          class="field">
          <ix-input
            ref="recoverPhone"
            v-model.trim="phone"
            :required='true'
            :empty-err-tips="$t('bind_phone_err_empty')"
            :rule="validateRules.phone"
            :placeholder="$t('bind_phone_input')"
            :label="$t('phone_number')"
          />
        </div> -->
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
        <div class="nc-box"><div id="nc"></div></div>
        <div
          v-if="step===1"
          class="field recover__validate mt-17"
        >
          <slide-validate @validateDone="validateDone"/>
        </div>
        <div
          v-if="step===2"
          class="field recover__validate"
        >
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
              :class="{disabled: sms.status === 1 || !isnc}"
              @click.prevent="getSmsCode">
              {{ smsBtnText }}</a>
          </div>
        </div>
        <!-- 输入密码 -->
        <div
          v-if="step===2"
          :class="['field']">
          <div class="input-box">
            <ix-input
              ref="recoverPassword"
              v-model.trim="password"
              autocomplete="off"
              type="password"
              :required='true'
              @input="password=$event;pwChange($event)"
              @focus="active(true)"
              @blur="active(false)"
              :empty-err-tips="$t('login_ph_pw')"
              :rule="validateRules.password"
              :placeholder="$t('change_password_new')"
              :label="$t('change_password_new')"
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
        <div
          v-if="step===2"
          :class="['field']">
          <div class="input-box">
            <ix-input
              ref="recoverPassword2"
              v-model.trim="password2"
              type="password"
              autocomplete="off"
              :required='true'
              @input="password2=$event"
              :empty-err-tips="$t('change_password_diff')"
              :rule="validateRules.password2"
              :placeholder="$t('change_password_repeat')"
              :label="$t('change_password_repeat')"
            />
          </div>
        </div>

        <div class="field submit mt-16">
          <v-btn
            class="submit-btn"
            :label="$t('reset_password')"
            height="40"
            :loading="loading"
            :disabled="disableNextBtn"
            @click="nextstep"/>
        </div>
      </form>
    </div>
    <div class="panel">
      <div
        class="recover-success"
        v-if="step === 4">
        <icon name="reset-psw-success"/>
        <div class="success__text">
          {{ $t('reset_success') }}
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import slideValidate from '@/components/common/slide-validate/slide-validate.vue'
import service from '@/modules/service'
import { state } from '@/modules/store'
import pwChecker from '@/modules/pw-checker'
import ixInput from '@/components/common/ix-input/ix-input.vue'
import utils from '@/modules/utils'
import _ from 'lodash'
import responsive from '@/mixins/responsive'
import nc from '@/mixins/createnc'

export default {
  mixins: [responsive, nc],
  name: 'Recover',
  components: {
    slideValidate,
    ixInput
  },
  props: ['by'],
  data () {
    return {
      state,
      email: '',
      regionId: '',
      step: 2,
      phone: '',
      atPw: false,
      regionOptions: [],
      pwCheckList: pwChecker.getState(''),
      loading: false,
      disableNextBtn: false,
      password: '',
      password2: '',
      captcha: '',
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
          validateFunc: num => {
            return !/\d+$/.test(num)
          }
        },
        email: {
          errTips: this.$t('err_invalid_email'),
          validateFunc: email => {
            return !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
          }
        },
        password: {
          errTips: this.$t('err_weak_password'),
          validateFunc: pswd => {
            const pwCheckList = pwChecker.getState(pswd)
            return _.filter(pwCheckList, r => r.pass).length < 4
          }
        },
        password2: {
          errTips: this.$i18n.t('change_password_diff'),
          validateFunc: () => {
            return this.password !== this.password2
          }
        }
      },
      triggerValidate: false
    }
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
    params () {
      const params = {
        by: this.by,
        email: this.email,
        password: this.password,
        code: this.captcha
      }
      if (this.by === 'phone') {
        params.region = this.regionId
        params.phone = this.phone
      }
      return params
    },
    // 密码强度值
    pwLevel () {
      return _.filter(this.pwCheckList, r => r.pass).length
    }
  },
  methods: {
    async nextstep () {
      const check = this.checkParams()
      if (!check.ok || !!this.triggerValidate) {
        if (check.em) {
          utils.alert(check.em)
        }
        // this.errmsg = check.em
        return false
      }
      this.loading = true
      const res = await service.resetPassword(this.params)
      if (res.code) {
        // 错误信息
        utils.alert(res.message)
        this.loading = false
        return false
      }

      utils.success(this.$i18n.t('reset_success'))
      this.$router.push({
        name: 'login'
      })
      // this.step = 4
      // // 第一步，未正确输入手机号
      // if (this.step === 1 && !this.$refs.recoverPhone.validateSuccess) {
      //   return false
      // }

      // // 第二步，未填写手机验证码
      // if (this.step === 2 && !this.captcha) {
      //   return false
      // }
      // this.step++
      // this.disableNextBtn = false
    },
    checkParams () {
      const err = (em, field) => ({ ok: false, em, field })
      if (this.by === 'phone') {
        if (!this.regionId) {
          // 这里默认选择中国86了吧，可以不需要这个验证了？
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
        if (
          !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
            this.email
          )
        ) {
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
        return err(this.$i18n.t('change_password_diff'), 'password2')
      }

      return { ok: true }
    },
    pwChange () {
      this.pwCheckList = pwChecker.getState(this.password)
    },
    validateDone () {
      this.disableNextBtn = false
    },
    active (active) {
      this.atPw = active
    },
    resetError () {
      this.errmsg = ''
      this.triggerValidate = false
    },
    async getSmsCode () {
      if (this.sms.status === 1 || this.sms.loading || this.loading || !this.isnc) {
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
      const res = await service.resetPaswordCode({
        by: this.by,
        region: this.regionId,
        email: this.email,
        phone: this.phone,
        lang: state.locale,
        ...this.ncData
      })
      this.ncreset();
      if (res.code) {
        this.errmsg = res.message
      } else {
        this.errmsg = ''
      }
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
  async created () {
    const res = await service.getRegionList()
    if (!res.code) {
      this.regionOptions = res.data
    }
    if (state.locale === 'zh-CN') {
      this.regionId = 86
    }
  },
  mounted() {
    this.initnc();
  }
}
</script>
<style scoped lang="scss">
@import "./recover";
</style>
