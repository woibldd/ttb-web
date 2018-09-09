<template>
 <div class="page page-login recover-container">
    <div class="panel" v-if="step < 4">
      <div class="title-wrap">
        <div class="panel-title" v-t="'if_forgot'"></div>
      </div>
      <form class="form pt-10" autocomplete="off" onsubmit="return false">
        <!-- <div v-if="step < 3" class="field" >
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
        </div> -->
        <!--  -->
        <div v-if="step < 3" class="field">
            <ix-input
                v-model.trim="phone"
                :placeholder="$t('bind_phone_input')"
                :label="$t('phone_number')"
                >
                </ix-input>
        </div>
        <!--  -->
        <div v-if="step===1" class="field recover__validate mt-17" :class="[{active: activeList['captcha'].active}]">
          <slide-validate @validateDone="validateDone"></slide-validate>
        </div>
        <div v-if="step===2" class="field recover__validate mt-17" :class="[{active: activeList['captcha'].active}]">
          <div class="input-box">
            <input v-model.trim="captcha" @focus="active('captcha', true)" @blur="active('captcha', false)"
              @input="input('captcha')"
              ref="captcha"
              class="input captcha item"
              type="text"
              name="captcha"
              :placeholder="$t('phone_code')"
              :disabled="loading">

              <a class="sms-btn"
              :class="{disabled: sms.status === 1}"
              @click.prevent="getSmsCode">
              {{smsBtnText}}</a>
          </div>
        </div>
        <div v-if="step===3" :class="['field', {active: activeList['password'].active}]">
          <div class="input-box">
            <div class="label" v-t="'password'"></div>
            <input v-model.trim="password"
              :disabled="loading"
              autocomplete="off"
              type="password"
              name="password"
              class="input item"
              :placeholder="$t('change_password_new')"
              @focus="active('password', true)" @blur="active('password', false)"
              @input="pwChange"
              @keyup.enter="submit" />
            <!-- <div class="pw-helps" :class="{show: atPw}">
              <div class="title" v-t="'pwcheck_guide'"></div>
              <ul class="pw-checks">
                <li v-for="(check, index) in pwCheckList"
                  class="pw-check" :key="index">
                  <span class="pw-state" :class="{pass: check.pass}"></span>
                  <span class="desc">{{ $t(check.desc) }}</span>
                </li>
              </ul>
            </div> -->
          </div>
        </div>
        <div v-if="step===3" :class="['field', {active: activeList['password2'].active}]">
          <div class="input-box">
            <div class="label" v-t="'password2'"></div>
            <input v-model.trim="password2"
              :disabled="loading"
              autocomplete="off"
              type="password"
              name="password2"
              class="input item"
              :placeholder="$t('change_password_repeat')"
              @focus="active('password2', true)" @blur="active('password2', false)"
              @keyup.enter="submit" />
          </div>
        </div>
        <div class="field submit mt-16">
          <v-btn class="submit-btn" :label="$t('nextstep')"
            height="40"
            :loading="loading"
            :disabled="disableNextBtn"
            @click="nextstep"></v-btn>
        </div>
      </form>
    </div>
    <div class="panel">
      <div class="recover-success" v-if="step === 4">
        <svg class="icon-reset-psw-success" ><use xlink:href="#icon-reset-psw-success" /></svg>
        <div class="success__text">
          {{$t('reset_success')}}
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import './recover.scss'
import slideValidate from '@/components/common/slide-validate/slide-validate.vue'
import service from '@/modules/service'
import {state} from '@/modules/store'
import pwChecker from '@/modules/pw-checker'
import ixInput from '@/components/common/ix-input/ix-input.vue'

export default {
  name: 'recover',
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
      errmsg: '格式错误',
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
      if (!this.phone) {
        this.errmsg = this.$i18n.t('bind_phone_err_empty')
        return false
      }
      console.log(this.phone, 'phone')
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
