<template>
  <div class="page page-login recover-container">
    <div
      class="panel"
      v-if="step < 4">
      <div class="title-wrap">
        <div
          class="panel-title"
          v-t="'if_forgot'"/>
      </div>
      <form
        class="form pt-10"
        autocomplete="off"
        onsubmit="return false">
        <div
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
        </div>
        <div
          v-if="step===1"
          class="field recover__validate mt-17"
          :class="[{active: activeList['captcha'].active}]">
          <slide-validate @validateDone="validateDone"/>
        </div>
        <div
          v-if="step===2"
          class="field recover__validate mt-17"
          :class="[{active: activeList['captcha'].active}]">
          <div class="input-box">
            <input
              v-model.trim="captcha"
              @focus="active('captcha', true)"
              @blur="active('captcha', false)"
              @input="input('captcha')"
              ref="captcha"
              class="input captcha item"
              type="text"
              name="captcha"
              :placeholder="$t('phone_code')"
              :disabled="loading">

            <a
              class="sms-btn"
              :class="{disabled: sms.status === 1}"
              @click.prevent="getSmsCode">
              {{ smsBtnText }}</a>
          </div>
        </div>
        <!-- 输入密码 -->
        <div
          v-if="step===3"
          :class="['field']">
          <ix-input
            ref="recoverPassword"
            v-model.trim="password"
            autocomplete="off"
            :required='true'
            :empty-err-tips="$t('login_ph_pw')"
            :rule="validateRules.password"
            :placeholder="$t('change_password_new')"
            :label="$t('change_password_new')"
          />
        </div>
        <div
          v-if="step===3"
          :class="['field']">
          <ix-input
            ref="recoverPassword2"
            v-model.trim="password2"
            autocomplete="off"
            :required='true'
            :empty-err-tips="$t('change_password_diff')"
            :rule="validateRules.password2"
            :placeholder="$t('change_password_repeat')"
            :label="$t('change_password_repeat')"
          />
        </div>
        <div class="field submit mt-16">
          <v-btn
            class="submit-btn"
            :label="$t('nextstep')"
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
        <svg class="icon-reset-psw-success" ><use xlink:href="#icon-reset-psw-success" /></svg>
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
import {state} from '@/modules/store'
import pwChecker from '@/modules/pw-checker'
import ixInput from '@/components/common/ix-input/ix-input.vue'

export default {
  name: 'Recover',
  components: {
    slideValidate,
    ixInput
  },
  data () {
    return {
      step: 1,
      phone: '',
      loading: false,
      disableNextBtn: true,
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
          errTips: '', // 空值，表示跳过校验
          validateFunc: (num) => {
            return !(/^1[34578]\d{9}$/.test(num))
          }
        },
        password: {
          errTips: this.$i18n.t('change_password_diff'),
          validateFunc: (text) => { // text 表示当前input绑定的值

          }
        }
      },
      activeList: {
        'email': {
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
        }
      }
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
    }
  },
  methods: {
    nextstep () {
      // 第一步，未正确输入手机号
      if (this.step === 1 && !this.$refs.recoverPhone.validateSuccess) {
        return false
      }

      // 第二步，未填写手机验证码
      if (this.step === 2 && !this.captcha) {
        return false
      }
      this.step++
      this.disableNextBtn = false
    },

    pwChange () {
      this.pwCheckList = pwChecker.getState(this.password)
    },
    validateDone () {
      this.disableNextBtn = false
    },
    input (field) {
      let text = this[field]
      this.activeList[field].qd = !!text
      this.errmsg = ''
    },
    active (field, active) {
      this.activeList[field].active = active
      if (field === 'password') {
        this.atPw = active
      }
    },
    async getSmsCode () {
      if (this.sms.status === 1 || this.sms.loading || this.loading) {
        return false
      }
      // if (!this.regionId) {
      //   this.errmsg = this.$i18n.t('region_ph')
      //   return false
      // }
      if (!this.phone) {
        this.errmsg = this.$i18n.t('bind_phone_err_empty')
        return false
      }
      this.sms.status = 1
      this.sms.countDown = 60
      this.startCountDown()
      const res = await service.sendCode({
        by: 'phone',
        // region: this.regionId,
        phone: this.phone,
        lang: state.locale
      })
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
    }
  },
  mounted () {

  }
}
</script>
<style scoped lang="scss">
 @import "./recover";
</style>
