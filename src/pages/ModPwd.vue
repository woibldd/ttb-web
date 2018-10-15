<template>
  <div class="profile-container">
    <div class="title-box">{{ $t('profile_left_invite_safety') }}<span>{{ $t('change_password') }}</span></div>
    <el-form
      class="invinfo-box"
      ref="form"
      :rules="rules"
      label-position="left"
      :model="form"
      label-width="104px">
      <el-form-item
        prop="password_orig"
        class="inp_box"
        :label="$t('change_password_orig')">
        <el-input
          type="password"
          v-model="form.password_orig"/>
      </el-form-item>
      <el-form-item
        prop="password_new"
        class="inp_box"
        :label="$t('change_password_new')">
        <el-input
          type="password"
          @input="pwChange"
          @focus="focus"
          @blur="blur"
          v-model="form.password_new"/>
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
      </el-form-item>
      <el-form-item
        prop="password_repeat"
        class="inp_box"
        :label="$t('change_password_repeat')">
        <el-input
          type="password"
          v-model="form.password_repeat"/>
      </el-form-item>
      <el-form-item class="inp_box">
        <v-btn
          class="submit-btn"
          :label="$t('modify')"
          :loading="loading"
          @click="submit"/>
      </el-form-item>
    </el-form>
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
            :label="$t('modify')"/>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import pwChecker from '@/modules/pw-checker'
import utils from '@/modules/utils'
import countDown from '@/components/common/countdown-code-button'
import { state, actions} from '@/modules/store'

export default {
  name: 'SafeVerified',
  components: {
    VBtn, countDown
  },
  data () {
    const validataPswRepeat = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$i18n.t('err_empty_password')))
      } else {
        if (value !== this.form.password_new) {
          return callback(new Error(this.$t('change_password_diff')))
        }
      }
      return callback()
    }
    const validataPswStrong = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$i18n.t('err_empty_password')))
      }
      const pwCheckList = pwChecker.getState(value)
      if (_.filter(pwCheckList, r => r.pass).length < 4) {
        return callback(new Error(this.$i18n.t('err_weak_password')))
      }
      callback()
    }
    return {
      loading: false,
      form: {},
      atPw: false,
      pwCheckList: pwChecker.getState(''),
      rules: {
        password_repeat: [
          { validator: validataPswRepeat, trigger: 'blur' }
        ],
        password_new: [
          { validator: validataPswStrong, trigger: 'change' }
        ],
        password_orig: [
          { required: true, message: this.$i18n.t('err_empty_password'), trigger: 'blur' }
        ]
      },
      showModal: false,
      phoneCode: '',
      emailCode: '',
      googleCode: '',
      state
    }
  },
  computed: {
    userInfo () {
      return this.state.userInfo || {}
    },
    phone () {
      return this.userInfo.phone
    },
    regionId () {
      return this.userInfo.region
    },
    email () {
      return this.userInfo.email
    },
    verify_email () {
      return this.userInfo && this.state.userInfo.verify_email
    },
    verify_phone () {
      return this.userInfo && this.state.userInfo.verify_phone
    },
    verify_google () {
      return this.userInfo && this.state.userInfo.verify_google
    }
  },
  methods: {
    toLogin () {
      utils.success(this.$i18n.t('reset_success'))
      actions.setUserInfo(null)
      service.signout()
      this.$router.push({
        name: 'login'
      })
    },
    async submit () {
      if (this.form.password_new === this.form.password_repeat) {
        if (this.verify_phone || this.verify_email || this.verify_google) {
          this.showModal = true
        } else {
          const verifyObj = this.verifyCode()
          let params = {
            old_password: this.form.password_orig,
            new_password: this.form.password_new
          }
          params = Object.assign(verifyObj)
          let result = await service.changePassword(params)
          if (result && !result.code) {
            this.toLogin()
          } else {
            utils.alert(result.message)
          }
        }
      } else {
        console.log('error submit!!')
        return false
      }
    },
    hideModal () {
      this.showModal = false
    },
    pwChange () {
      this.pwCheckList = pwChecker.getState(this.form.password_new || '')
    },
    focus () {
      this.atPw = true
    },
    blur () {
      this.atPw = false
    },
    getPhoneVerifyCode () {
      const param = {
        region: this.regionId,
        phone: this.phone
      }
      service.getCode4modifyPhonePassword(param).then(resp => {
        if (resp.code) {
          utils.alert(resp.message)
        }
      })
    },
    getEmailVerifyCode () {
      const param = {
        email: this.email
      }
      service.getCode4modifyEmailPassword(param).then(resp => {
        if (resp.code) {
          utils.alert(resp.message)
        }
      })
    },
    keyPress ($event) {
      let code = $event.srcElement.value
      if (code && code.length === 6 && /^\d{6}$/.test(code)) {
        this.toVerifyCode()
      }
    },
    async toVerifyCode () {
      const verifyObj = this.verifyCode()
      let params = {
        old_password: this.form.password_orig,
        new_password: this.form.password_new
      }
      params = Object.assign(params, verifyObj)
      let result = await service.changePassword(params)
      if (result && !result.code) {
        this.toLogin()
      } else {
        utils.alert(result.message)
      }
    },
    verifyCode () {
      let verifyObj = {}

      if (this.verify_google) {
        verifyObj = {
          google_code: this.googleCode
        }
      } else if (this.verify_phone) {
        verifyObj = {
          phone_code: this.phoneCode
        }
      } else {
        verifyObj = {
          email_code: this.emailCode
        }
      }
      return verifyObj
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../styles/vars";
  @import '../styles/mixins';

  .user-center-right {
    float: left;
    .profile-container {
      width: 960px;
      position: relative;

      .title-box {
        width: 100%;
        height: 40px;
        font-size: 18px;
        font-weight: 600;
        color: $text-strong;
        border-bottom: 1px solid #e6e6e6;
        span{
            color: #666;
            font-size: 18px;
            font-weight: lighter;
            padding-left: 10px;
            i{
                color: #EB5757;
            }
            &:before{
                content: ">";
                color: #333;
                font-size: 18px;
                margin-right: 10px;
            }
        }
      }
      .invinfo-box {
        width: 445px;
        margin: 50px auto;
        div.inp_box{
            width:100%;
            height: 40px;
            margin-bottom: 30px;
            position: relative;
            p{
                float: left;
                width: 104px;
                height: 40px;
                line-height: 40px;
                color: #999;
            }
            input{
                display: block;
                width: 340px;
                height: 40px;
                float: left;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                border-radius: 4px;
                border:none;
            }
            .submit-btn{
                width: 340px;
                height: 40px;
            }
            span.tips{
                display: block;
                width: 300px;
                height: 30px;
                line-height: 20px;
                position: absolute;
                left: 104px;
                top: 40px;
                font-size: 10px;
                color: #EB5757;
            }
        }
      }
    }
  }
  .pw-helps {
    border-radius: 3px;
    position: absolute;
    right: -229px;
    transform: translateX(10px);
    top: 0;
    width: 216px;
    min-height: 160px;
    color: #000;
    background-color: white;
    box-sizing: border-box;
    padding: 16px;
    font-size: 12px;
    opacity: 0;
    transition: visibility 300ms 300ms, transform 300ms, opacity 300ms;
    &.show {
        opacity: 1;
        transition: visibility 300ms, transform 300ms, opacity 300ms;
        right: -223px;
        transform: translateX(0);
        visibility: visible;
    }
    .pw-state {
        width: 20px;
        height: 20px;
        margin-right: 4px;
        background-color: white;
        border: 1px solid #979797;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        border-radius: 2px;
        transition: background-color 300ms;
        &.pass {
        @include bg-retina('../assets/check', 'png', 12px, 9px);
        width: 20px;
        height: 20px;
        border: 1px solid $primary;
        background-color: $primary;
        }
    }
    .title {
        margin-bottom: 10px;
        font-weight: bold;
    }
    .desc {
        width: 160px;
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        line-height: 20px;
        white-space: normal;
    }
    .pw-check {
        font-size: 0;
        white-space: nowrap;
        margin-bottom: 4px;
    }
}

.ensure-modal {
  width:541px;
  background:rgba(255,255,255,1);
  border-radius:8px;
  padding-bottom: 50px;
  padding-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .modal__title {
      font-size:20px;
      font-weight:bold;
      color:$text-strong;
  }
  .modal__row {
      box-sizing: border-box;
      .row__label {
          font-size:14px;
          font-weight:400;
          color:$text-weak;
      }
      .row__input {
          box-sizing: border-box;
          border: 1px solid $text-normal;
          width: 340px;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          color: $text-weak;
          padding-left: 10px;
      }
      .input-validate {
          width: 220px;
          border: 0;
          border-right: 1px solid $text-normal;

          &.google {
              border: 0;
          }

          &:focus{
              outline: none;
          }
      }

  }
  .w-340 {
      width: 340px;
  }

    }
</style>
