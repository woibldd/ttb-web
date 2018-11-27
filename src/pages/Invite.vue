<template>
  <div class="user-center-right">
    <div class="profile-container">
      <div class="title-box">{{ $t('profile_left_invite') }}</div>
      <div class="invite-wrap">
        <div class="share_style login_show">
          <div class="post_btn share_div"><p>{{ $t('profile_left_invite_qrcode') }}</p>
            <div
              class="btn_select"
              @click="showQrcode">{{ $t('profile_left_invite_qrcode') }}</div>
            <div
              class="qrcode"
              v-show="show">
              <canvas
                class="qr-img"
                ref="qr"/>
            </div>
          </div>
          <div class="user_url share_div"><p>{{ $t("profile_left_invite_link") }}</p>
            <div class="share_code_wrap">
              <p class="url">
                <input
                  type="text"
                  class="share_link"
                  v-model="inviteLink">
              </p>
              <a
                @click.prevent="copy('inviteLink')"
                class="copy_url copy_btn copy_url_2"
                data-clipboard-target=".share_link">{{ $t('profile_left_copy_invite_link') }}</a>
            </div>
          </div>
          <div class="user_code share_div"><p>{{ $t('profile_left_invite_code') }}</p>
            <div class="share_code_wrap"><p class="share_code">{{ inviteCode }}</p>
              <a
                @click.prevent="copy('inviteCode')"
                class="copy_url copy_btn copy_url_1"
                data-clipboard-target=".share_code">{{ $t('profile_left_copy_invite_code') }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="invite-container mb-30">
        <!-- 邀请记录 -->
        <div class="invite-wrap left">
          <div class="title-box">{{ $t('invite_history_text') }}</div>
          <div class="invite-list">
            <div class="th pd-15">
              <div class="td">{{ $t('username') }}</div>
              <div class="td">{{ $t('invite_kyc2') }}</div>
              <div class="td">{{ $t('time') }}</div>
            </div>
            <div class="tbody pb-20">
              <div
                class="empty"
                v-if="invitationList.list.length === 0">
                <span
                  class="text"
                  @click="goInvite"
                  v-html="$t('invite_reward_text')"/>
              </div>
              <div
                v-else
                class="row pt-20 pl-20 pr-20"
                v-for="item in invitationList.list"
                :key="item.id">
                <div class="td">{{ item.phone || item.email }}</div>
                <div class="td">{{ item.state === 2 ? $t('invite_kyc2_pass') : $t('invite_kyc2_deniel') }}</div>
                <div class="td">{{ item.register_time | ts2date }}</div>
              </div>
            </div>
            <div
              class="pagination mt-10"
              v-if="!invitationList.isEnd"
            >
              <a @click.prevent="getInviteList">[{{ $t('more_record') }}]</a>
            </div>
          </div>
        </div>
        <!-- 返佣记录
        <div class="invite-wrap right">
          <div class="title-box">{{ $t('commission_history_text') }}</div>
          <div class="invite-list ">
            <div class="th pd-15 pl-20 pr-20">
              <div class="td username">{{ $t('username') }}</div>
              <div class="td amount">{{ $t('commission_amount') }}</div>
              <div class="td time">{{ $t('time') }}</div>
              <div class="td state">{{ $t('status') }}</div>
            </div>
            <div class="tbody pb-20">
              <div
                class="empty"
                v-if="commissionList.list.length === 0">
                <span
                  class="text"
                  v-html="$t('invite_commission_text')"/>
              </div>
              <div
                v-else
                class="row pt-20 pl-20 pr-20"
                v-for="item in commissionList.list"
                :key="item.id">
                <div class="td username">{{ item.phone || item.email }}</div>
                <div class="td amount"><span class="text">{{ item.amount | round(4) }}</span> IXX</div>
                <div
                  class="td time"
                  v-if="item.release_time">
                  {{ item.release_time | ts2date('M-D H:m') }}</div>
                <div
                  class="td time"
                  v-else>--</div>
                <div
                  class="td state"
                  :class="{done: item.state===1, expect: item.state === 0}">{{ item.state===0 ? $t('waiting_for_release') : $t('done') }}</div>
              </div>
            </div>
            <div
              class="pagination mt-10"
              v-if="!commissionList.isEnd"
            >
              <a @click.prevent="getCommissionList">[{{ $t('more_record') }}]</a>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import copyToClipboard from 'copy-to-clipboard'
import service from '@/modules/service'
import utils from '@/modules/utils'
import {state} from '@/modules/store'
const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')

const PageSize = 10

export default {
  name: 'Invite',
  components: {
  },
  data () {
    return {
      state,
      show: false,
      qrReady: false,
      invitationList: {
        list: [],
        page: 1,
        size: PageSize + 1,
        isEnd: true
      },
      commissionList: {
        list: [],
        page: 1,
        size: PageSize + 1,
        isEnd: true
      },
      isLastInvitation: false,
      isLastCommission: false
    }
  },
  computed: {
    inviteLink () {
      return `${location.protocol}//${location.host}/user/register/?invitor=${this.inviteCode}`
    },
    inviteCode () {
      if (this.state.userInfo) { return this.state.userInfo.id }
      return ''
    }
  },
  async created () {
    this.setQr(this.inviteLink)
    this.getInviteList()
    this.getCommissionList()
  },
  methods: {
    showQrcode () {
      this.show = !this.show
    },
    copy (key) {
      copyToClipboard(this[key])
      utils.success(this.$i18n.t('copyed'))
    },
    goInvite () {
      copyToClipboard(this.inviteLink)
      utils.success(this.$i18n.t('link_copyed'))
    },
    async getInviteList () {
      let result = await service.getMyInviteList({
        page: this.invitationList.page++,
        size: PageSize
      })
      if (result && !result.code) {
        if (!result.data || result.data.length < PageSize) {
          this.invitationList.isEnd = true
        } else {
          this.invitationList.isEnd = false
        }
        if (this.invitationList.list.length > 0) {
          this.invitationList.list = this.invitationList.list.concat(result.data)
        } else {
          this.invitationList.list = result.data
        }
      } else {
        utils.alert(result.message)
      }
    },
    async getCommissionList () {
      let result = await service.getCommissionList({
        page: this.commissionList.page++,
        size: PageSize
      })
      if (!result.code) {
        if (!result.data || result.data.length < PageSize) {
          this.commissionList.isEnd = true
        } else {
          this.commissionList.isEnd = false
        }

        if (this.commissionList.list.length >= 0) {
          this.commissionList.list = this.commissionList.list.concat(result.data)
        } else {
          this.commissionList.list = result.data
        }
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
    }
  }
}
</script>
<style lang="scss" scoped>

  @import '../styles/mixins';

  .user-center-right {
    padding-left: 60px;
    float: left;
    .profile-container {
      max-width: 920px;
      position: relative;

      .invite-container {
        display: flex;
        flex-direction: row;
        @include clearfix();

        .invite-wrap {
          flex: 1;
          &.right {
            margin-left: 40px;
          }
        }
      }
      .title-box {
        width: 100%;
        height: 40px;
        font-size: 18px;
        font-weight: 600;
        color: $text-strong;
        border-bottom: 1px solid #e6e6e6;
      }
      .invite-wrap {
         .notice {
            background-image: url(~@/assets/invite-notice-bg.png);
            background-size: cover;
            height: 90 / 980 * 920px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            color: #ffffff;
            font-weight: 400;
            margin-bottom: 40px;

            .title {
              max-width: 600px;
            }
         }
        margin-top: 24px;
        min-height: 100px;
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
        .th, .row{
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: $text-light;

          .username {
            width: 20%;
            @include limit(1)
          }
          .amount, .time {
            width: 30%;
            text-align: center;

            .text {
              color: $primary;
            }
          }
          .state {
            width: 20%;
            text-align: right;

            &.done {
              color: #09C989;
            }
            &.expect {
              color: #EBB166;
            }
          }
        }

        .row {
          color: $text-weak;
        }
        .tbody {
          background: #E2FFFF;
          border: 1px solid $text-normal;
          border-radius:4px;
          min-height: 161px;
          box-sizing: border-box;
        }
        .empty {
          margin: 60px auto;
          text-align: center;

          .text {
            display: block;
            color: $text-weak;
          }
        }
      }
      .pagination {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
