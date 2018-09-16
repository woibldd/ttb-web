<template>
  <div class="profile-container">
    <div class="title-box">{{$t('profile_left_invite_safety')}}<span>{{$t('bind_google_title')}}</span></div>
    <div class="invinfo-box">
        <p class="gt_txt">{{$t('bind_google_title')}}</p>
        <div class="gt_ewm">
            <canvas
                class="qr-img"
                ref="qr"/>
        </div>
        <p class="gt_t">验证码密钥</p>
        <span class="gt_yz">{{google_key}}</span>
        <ul>
            <li><i>1</i>使用没有越狱或者Root过的手机，在App Store 或应用市场内搜索 Google Authenticator 并安装；</li>
            <li><i>2</i>使用 Google Authenticator 扫描二维码；</li>
            <li><i>3</i>请手写或打印16位密钥，放置到安全的地方。如果你的手机被盗或抹掉内容，你可以使用16位密钥进行恢复；</li>
            <li><i>4</i>不要把密钥告诉别人！IX 客服不会索取你的密钥。</li>
        </ul>
        <p class="gt_btxt">请确认</p>
        <div class="gt_lb">
            <input type="checkbox" v-model="checkbox1">
            <label for="asda">我的iPhone或Android手机没有经过越狱、Root或任何形式的破解</label>
        </div>
        <div class="gt_lb">
            <input type="checkbox" v-model="checkbox2">
            <label for="asd">已经手写或打印16位密钥，放到安全的地方</label>
        </div>
    </div>
    <div class="inp_box">
        <input type="text" v-model="code" placeholder="6位谷歌验证码" />
    </div>
    <div class="inp_box">
        <v-btn class="submit-btn" :label="$t('bind')"
        :loading="loading"
        @click="submit"></v-btn>
    </div>
  </div>
</template>

<script>
  import service from '@/modules/service'
  import VBtn from '@/components/VBtn'
  import {state} from '@/modules/store'
  const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')

  export default {
    name: 'SafeVerified',
    components: {
      VBtn
    },
    data () {
      return {
        state,
        google_key: '',
        code: '',
        checkbox1: false,
        checkbox2: false
      }
    },
    computed: {
      username () {
        if (this.state.userInfo) {
          return this.state.userInfo.phone || this.state.userInfo.email
        }
        return ''
      },
    },
    async created () {
      this.getGoogleKey()
    },
    methods: {
      async getGoogleKey() {
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
            width: 136,
            height: 136,
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
        if (this.checkbox1 && this.checkbox2) {
          if (this.code.length == 6) {
            let params = {
              google_key: this.google_key,
              code: this.code
            }
            let result = await service.bindGoogleKey(params)
            if (result && !result.code) {
              this.$router.push({
                name: 'Safety'
              })
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
</script>
<style lang="scss" scoped>
  @import "../styles/vars";
  @import '../styles/mixins';

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
            input{
                display: block;
                width: 100%;
                height: 34px;
                text-indent: 1em;
                border: 1px solid $c;
            }
        }
    }
    .profile-container{
        margin-bottom: 100px;
    }
  }
</style>
