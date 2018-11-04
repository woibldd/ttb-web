<template>
  <div>
    <div
      class="invite-signup-container mt-20 invite-con"
      v-if="isInvite">
      <div class="banner">
        <div class="banner-text">
          <p class="f71">你敢邀请我敢送!</p>
          <p class="mt-10 f44">邀请好友注册比特币随你拿</p>
        </div>
      </div>
      <form
        class="form form_invite"
        onsubmit="return false"
        autocomplete="off">
        <div class="invite__field">
          <div class="input-box input-box__with-btn">
            <input
              class="input_invite"
              readonly
              v-model.trim="inviteLink"
              placeholder="邀请地址"
            >

            <span
              class="sms-btn"
              @click.prevent="copyLink('inviteLink')">
              复制链接</span>
          </div>
        </div>
        <div class="f28 invite__field invite-code">
          <div class="invite__field__left">
            我的邀请码：<span class="c-ff7">{{ inviteCode }}</span>
          </div>
          <div
            class="invite__field__right"
            @click.prevent="copyLink('inviteCode')">
            复制邀请码
          </div>
        </div>
        <div class="invite__field">
          <div
            class="sign-up__btn"
            @click="sharePage">
            马上邀请好友加入
          </div>
        </div>

        <div class="invite__field">
          <div class="activity-detail">
            （详情请查看<a
              class="c-ff7"
              href="https://www.ix.com"
              target="_blank">IX.com</a>官方公告）
          </div>
        </div>
      </form>
    </div>
    <div
      class="invite-signup-container mt-20 "
      v-if="!isInvite">
      <div class="banner">
        <div class="banner-top">
          IX 大狂欢
        </div>
        <div class="banner-text">
          <p>注册邀请</p>
          <p class="mt-10">BTC红包撒不停</p>
        </div>
      </div>
      <form
        class="form"
        onsubmit="return false"
        autocomplete="off">
        <div
          class="field"
          v-show="by === 'phone'">
          <div class="input-box">
            <select
              class="select item"
              v-model="regionId">
              <option value=""> 请选择手机号码归属地</option>
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
              :trigger-validate="triggerValidate"
              :required='true'
              :empty-err-tips="$t('bind_phone_err_empty')"
              :rule="validateRules.phone"
              placeholder="请输入手机号码"
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
              placeholder="请输入邮箱账号"
              :label="$t('email')"
            />
          </div>
        </div>
        <div :class="['field']">
          <div class="input-box input-box__with-btn">
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
          <div class="input-box input-box__password">
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
              :rule="validateRules.invitor"
              :placeholder="$t('invitor_ph')"
              :label="$t('invitor')"
            />
          </div>
        </div>
        <div class="field agreement">
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
              target="_blank">《服务条款》</a>
            <a
              href="https://www.ix.com/PrivacyPolicy"
              target="_blank">《隐私协议》</a>
          </label>
        </div>
        <div class="field">
          <div
            class="sign-up__btn"
            @click="submit">
            立即注册
          </div>
        </div>
        <div class="field">
          <div
            class="switch-btn"
            @click="switchRegister">
            {{ by === 'phone' ? '邮箱': '手机' }}注册>
          </div>
        </div>
      </form>
      <div class="activity-note">
        <p class="mb-40">活动时间：2018年11月5号00:00-2018年11月25号24:00</p>
        <p>活动规则：</p>
        <p>1.邀请好友注册IX.COM并完成KYC2高级认证，建立邀请关系的双方各获得 0.5 个BTC碎片奖励。</p>
        <p>2.被邀请者注册当天完成5000个IX的净买入量，建立邀请关系的双方各获得 0.5 个BTC碎片奖励。</p>
        <p>3.集齐10个BTC碎片即可兑换0.01BTC。</p>
        <p>4.每个用户最多可获得10个BTC碎片。</p>
        <p>5.如无法在活动期间集齐10个BTC碎片，也可用BTC碎片兑换IX，1个BTC碎片=200个IX。</p>
        <div class="activity-detail">
          （详情请查看<a
            class="c-ff7"
            href="https://www.ix.com"
            target="_blank">IX.com</a>官方公告）
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ixInput from './ix-input/ix-input.vue'
import pwChecker from '@/modules/pw-checker'
import service from '@/modules/service'
import utils from '@/modules/utils'
import copyToClipboard from 'copy-to-clipboard'
import { Toast, MessageBox } from 'mint-ui'
import {state} from '@/modules/store'
import 'mint-ui/lib/style.css'

import _ from 'lodash'

export default {
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
      form: {},
      inviteCodeBySignup: '',
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
  components: {
    ixInput,
    Toast,
    MessageBox
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
    inviteLink () {
      return `${location.protocol}//${location.host}/user/register/?invitor=${this.inviteCode}`
    },
    inviteCode () {
      if (this.state.userInfo) { return this.state.userInfo.id }
      return this.inviteCodeBySignup
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
    isInvite () {
      return this.$route.params.source === 'invite'
    }
  },
  methods: {
    copyLink (key) {
      copyToClipboard(this[key])
      Toast({
        message: '已复制',
        position: 'middle',
        duration: 15000
      })
    },
    resetError () {
      this.errmsg = ''
      this.triggerValidate = false
    },
    switchRegister () {
      this.by = this.by === 'phone' ? 'email' : 'phone'
      let ele = document.scrollingElement || document.body
      ele.scrollTop = 0
    },
    active (active) {
      this.atPw = active
    },
    pwChange (password) {
      // this.password 比 时间传过来的password 更新慢一些
      this.pwCheckList = pwChecker.getState(password)
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
    async submit (e) {
    // 本地校验
      const check = this.checkParams()
      if (!check.ok || !!this.triggerValidate) {
        if (check.em) {
          Toast(check.em)
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
        Toast(res.message)
        this.loading = false
        return false
      } else {
        this.inviteCodeBySignup = res.data.id
      }
      utils.eraseCookie('invitor')
      // 激活邮箱
      // this.state.verifyEmail = this.email
      this.$router.push('/invite')
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
        lang: 'zh-CN'
      })
      if (res.code) {
        Toast(res.message)
        // this.errmsg = res.message
      } else {
        this.errmsg = ''
      }
    },
    sharePage () {
      MessageBox.confirm('复制邀请链接并发送给好友').then(action => {
        this.copyLink('inviteLink')
      }).catch(err => {
        console.log(err)
        Toast('已取消')
      })
    }

  },
  async created () {
    const res = await service.getRegionList()
    if (!res.code) {
      this.regionOptions = res.data
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/vars";
@import "~@/styles/mixins";
@import "./index.scss"
</style>
