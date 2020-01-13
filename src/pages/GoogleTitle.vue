<template>
  <div class="profile-container">
    <div class="title-box">{{$t('profile_left_invite_safety')}}<span>{{$t('bind_google_title')}}</span></div>
    <div class="invinfo-box">
        <p class="gt_txt">{{$t('bind_google_title')}}</p>
        <div class="gt_ewm">
          <div class="pd-10" style="background:#fff; height: 160px; box-sizing: border-box">
            <canvas
                class="qr-img"
                ref="qr"/>
          </div>
        </div>
        <p class="gt_t">{{$t('google_skey')}}</p>
        <span class="gt_yz">{{google_key}}</span>
        <ul>
            <li><i>1</i>{{$t('bind_google_hint_1')}}</li>
            <li><i>2</i>{{$t('bind_google_hint_2')}}</li>
            <li><i>3</i>{{$t('bind_google_hint_3')}}</li>
            <li><i>4</i>{{$t('bind_google_hint_4')}}</li>
        </ul>
        <p class="gt_btxt">{{$t('confirm_please')}}</p>
        <div class="gt_lb">
            <input type="checkbox" v-model="checkbox1">
            <label for="asda">{{$t('bind_google_confirm_1')}}</label>
        </div>
        <div class="gt_lb">
            <input type="checkbox" v-model="checkbox2">
            <label for="asd">{{$t('bind_google_confirm_2')}}</label>
        </div>
    </div>
    <div class="inp_box">
      <!--<label>谷歌验证码</label>-->
      <input type="text" v-model="verifyCode" :placeholder="verify_type === 'phone' ? $t('phone_code') : $t('email_code')" />
      <div class="count-down-container">
        <count-down
          :send-text="$t('hq_send')"
          :send-code-func="currentGetCodeFunc"
        />
      </div>
    </div>
    <div class="inp_box">
        <input type="text" v-model="code" :placeholder="$t('bind_google_ph')" />
    </div>
    <div class="inp_box">
        <v-btn class="submit-btn" :label="$t('bind')"
        @click="submit"></v-btn>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import {state, actions} from '@/modules/store'
import utils from '@/modules/utils'
import countDown from '@/components/common/countdown-code-button'
const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')

export default {
  name: 'SafeVerified',
  components: {
    VBtn,
    countDown
  },
  data () {
    return {
      state,
      google_key: '',
      code: '',
      checkbox1: false,
      checkbox2: false,
      verifyCode: ''
    }
  },
  computed: {
    username () {
      if (this.state.userInfo) {
        return this.state.userInfo.phone || this.state.userInfo.email
      }
      return ''
    },
    resetCode () {
      return this.$route.query.reset
    },
    verify_phone () {
      if (state.userInfo && state.userInfo.verify_phone) {
        return true
      }
      return false
    },
    verify_email () {
      if (state.userInfo && state.userInfo.verify_email) {
        return true
      }
      return false
    },
    verify_type () {
      let type = ''
      if (this.verify_phone) {
        type = 'phone'
      } else if (this.verify_email) {
        type = 'email'
      }
      return type
    }
  },
  async created () {
    this.getGoogleKey()
  },
  methods: {
    async currentGetCodeFunc () {
      if (this.verify_type === 'phone') {
        let res = await service.getPhoneCode(
          {
            region: state.userInfo.region,
            phone: state.userInfo.phone
          }
        )
        if (res.code) {
          utils.alert(res.message)
        }
      } else {
        let res = await service.getEmailCode({
          email: state.userInfo.email
        })
        if (res.code) {
          utils.alert(res.message)
        }
      }
    },
    async getGoogleKey () {
      let result = await service.getGoogleKey()
      if (result && !result.code) {
        this.google_key = result.data.google_key
        let qrurl = "otpauth://totp/"+this.username+"?secret="+this.google_key+"&issuer="+location.hostname
        this.setQr(qrurl)
      } else {
        utils.alert(result.message)
      }
    },
    async setQr (url) {
      const QRCode = await qrcode()
      QRCode.toCanvas(
        this.$refs.qr,
        url,
        {
          margin: 0,
          width: 140,
          height: 140,
          errorCorrectionLevel: 'H'
        },
        (err) => {
          if (err) {
            // @improve
            return utils.log('qrcode error')
          }
          this.qrReady = true
        }
      )
    },
    async submit () {
      let query = {}
      if (this.verify_type === 'phone') {
        query = {
          phone_code: this.verifyCode
        }
      } else {
        query = {
          email_code: this.verifyCode
        }
      }

      if (this.resetCode) {
        if (this.checkbox1 && this.checkbox2) {
          if (this.code.length === 6) {
            let params = {
              google_key_type: 'reset',
              google_key: this.google_key,
              code: this.code,
              ...query
            }
            let result = await service.bindGoogleKey(params)
            if (result && !result.code) {
              await actions.updateSession()
              this.$router.push({
                name: 'Safety'
              })
              window.localStorage.setItem('refere', true)
            } else {
              utils.alert(result.message)
            }
          } else {
            utils.alert(this.$i18n.t('invalid_google_code'))
            return false;
          }
        } else {
          utils.alert(this.$i18n.t('err_check_google_code'))
          return false
        }
      } else {
        if (this.checkbox1 && this.checkbox2) {
          if (this.code.length === 6) {
            let params = {
              google_key: this.google_key,
              code: this.code,
              ...query
            }
            let result = await service.bindGoogleKey(params)
            if (result && !result.code) {
              await actions.updateSession()
              this.$router.push({
                name: 'Safety'
              })
              window.localStorage.setItem('refere', true)
            } else {
              utils.alert(result.message)
            }
          } else {
            utils.alert(this.$i18n.t('invalid_google_code'))
            return false;
          }
        } else {
          utils.alert(this.$i18n.t('err_check_google_code'))
          return false
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

  .user-center-right {
    padding-left: 60px;
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
      .invinfo-box{
          width: 650px;
          margin: 17px auto;
          .gt_txt{
            height: 63px;
            line-height: 63px;
            color: #666;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
          }
          .gt_ewm{
              width: 180px;
              height: 180px;
              margin: 0 auto;
              background: #C2A538;
              padding: 10px;
              box-sizing: border-box;
          }
          .gt_t{
              font-size: 14px;
              color: #666;
              text-align: center;
              margin-top: 17px;
              height: 22px;
              line-height: 22px;
          }
          .gt_yz{
              height: 30px;
              line-height: 30px;
              color: #C2A538;
              border-bottom: 1px solid #C2A538;
              margin: 0 auto;
              display: table;
              font-size: 16px;
              font-weight: bold;
          }
          ul{
              margin-top: 25px;
              margin-bottom: 15px;
              li{
                  font-size: 14px;
                  line-height: 23px;
                  color: #666;
                  margin-bottom: 5px;
                  position: relative;
                  padding-left: 25px;
                  i{
                      width: 15px;
                      height: 23px;
                      display: block;
                      position: absolute;
                      left: 0;
                      top: 0;
                  }
              }
          }
          .gt_btxt{
              font-size: 16px;
              font-weight: bold;
              color: #666;
              margin-bottom: 5px;
          }
          .gt_lb{
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              color: #666;
              input{
                  display: block;
                  float: left;
                  width: 14px;
                  height: 14px;
                  margin-top: 8px;
                  margin-right: 15px;
              }
          }
      }
      .inp_box{
            width: 340px;
            height: 40px;
            margin: 30px auto;
            position: relative;
            input{
                display: block;
                width: 100%;
                height: 34px;
                text-indent: 1em;
                border: 1px solid $c;
            }
        .count-down-container {
          position: absolute;
          right: 8px;
          top: 8px;
        }
        }
    }
    .profile-container{
        margin-bottom: 100px;
    }
  }
</style>
