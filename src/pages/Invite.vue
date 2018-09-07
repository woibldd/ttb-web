<template>
  <div style="page-invite-wrap">
    <profile-left></profile-left>
    <div class="user-center-right">
      <div class="profile-container">
        <div class="title-box">{{$t('profile_left_invite')}}</div>
        <div class="invite-wrap">
          <div class="share_style login_show">
            <div class="post_btn share_div"><p>{{$t('profile_left_invite_qrcode')}}</p>
              <div class="btn_select" @click="showQrcode">{{$t('profile_left_invite_qrcode')}}</div>
              <div class="qrcode" v-show="show">
                <canvas class="qr-img" ref="qr"></canvas>
              </div>
            </div>
            <div class="user_url share_div"><p>{{$t("profile_left_invite_link")}}</p>
              <div class="share_code_wrap">
                <p class="url">
                  <input type="text" class="share_link" v-model="inviteLink">
                </p>
                <a @click.prevent="copy('inviteLink')" class="copy_url copy_btn copy_url_2" data-clipboard-target=".share_link">{{$t('profile_left_copy_invite_link')}}</a>
              </div>
            </div>
            <div class="user_code share_div"><p>{{$t('profile_left_invite_code')}}</p>
              <div class="share_code_wrap"><p class="share_code">{{inviteCode}}</p>
                <a @click.prevent="copy('inviteCode')" class="copy_url copy_btn copy_url_1" data-clipboard-target=".share_code">{{$t('profile_left_copy_invite_code')}}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="title-box">{{$t('invite_history_text')}}</div>
        <div class="invite-list ">
          <div class="empty">
            <span class="text">{{$t("invite_reward_text")}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileLeft from './ProfileLeft'
  import copyToClipboard from 'copy-to-clipboard'
  import service from '@/modules/service'
  import utils from '@/modules/utils'
  import {state} from '@/modules/store'
  const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')

  export default {
    name: 'invite',
    components: {
      ProfileLeft
    },
    data () {
      return {
        state,
        show: false,
        qrReady: false
      }
    },
    computed: {
      inviteLink() {
        return `${location.protocol}//${location.host}/user/register/?invitor=${this.inviteCode}`
      },
      inviteCode() {
        if (this.state.userInfo)
          return this.state.userInfo.id
        return ''
      }
    },
    async created () {
      this.setQr(this.inviteLink)
    },
    methods: {
      showQrcode () {
        this.show = !this.show
      },
      copy (key) {
        copyToClipboard(this[key])
        utils.success(this.$i18n.t('copyed'))
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
      }
    }
  }
</script>
<style lang="scss">
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
      }
      .invite-wrap {
        margin-top: 24px;
        @include clearfix();
        height: 150px;
        .share_style .post_btn {
          padding: 0;
          width: 160px;
          display: inline-block;

          .qrcode {
            width: 136px;
            height: 136px;
            margin-top: 10px;
            border: 10px solid $primary;
            border-radius: 4px;
            padding: 12px;
            position: absolute;
            background: #fff;
          }
        }
        .btn_select {
          margin-top: 10px;
          background: $primary;
          color: #fff;
          width: 160px;
          font-size: 16px;
          line-height: 40px;
          display: inline-block;
          text-align: center;
          border-radius: 4px;
          cursor: pointer;
          user-select: none;
        }
        .share_div {
          display: inline-block;
          float: left;
          color: $text-weak;
          font-size: 14px;

          &.user_code {
            padding: 0 0 0 60px;
            width: 190px;
          }
          &.user_url {
            width: 450px;
            display: inline-block;
            padding: 0 0 0 60px;

            .share_code_wrap {
              padding-left: 14px;
              margin-top: 10px;
              border: 1px solid $text-normal;
              border-radius: 3px;
              height: 40px;
              width: 450px;
              line-height: 40px;
              font-size: 14px;
            }
            .url {
              display: inline-block;
              .share_link {
                  width: 316px;
                  color: $text-strong;
                  margin-top: 2px;
                  height: 35px;
                  border: 0;
                  outline: none;
                  font-size: 14px;
              }
            }
          }
          .share_code_wrap {
            margin-top: 10px;
            border: 1px solid $text-normal;
            border-radius: 3px;
            height: 40px;
            width: 190px;
            line-height: 40px;
            font-size: 14px;

            .share_code {
              font-size: 16px;
              margin-left: 20px;
              line-height: 40px;
              width: 64px;
              color: $text-strong;
              display: inline-block;
            }
            .copy_url {
              line-height: 30px;
              display: inline-block;
              height: 30px;
              border-left: 1px solid $text-normal;
              text-align: center;
            }
            .copy_url_1 {
              width: 100px;
            }
            .copy_url_2 {
              width: 110px;
            }
          }
        }
      }
      .invite-list {
        .empty {
          margin: 50px auto;
          text-align: center;

          .text {
            display: block;
            color: $text-weak;
          }
        }
      }
    }
  }
</style>

