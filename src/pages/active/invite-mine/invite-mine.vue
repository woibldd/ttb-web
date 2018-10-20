<template>
  <div class="invite-mine-container">
    <div class="header">
      <v-nav
        is-home="true"
      />
    </div>
    <div class="banner"/>
    <div
      class="content"
      v-if="!isLogin">
      <div class="content__title">
        <i class="arrow left"/>
        {{ $t('how_to_get_reward') }}
        <i class="arrow right"/>

      </div>
      <ul class="content__questions">
        <li
          class="question-item"
          :class="[hoveringQuestion == 0 && 'focus']"
          @mouseenter="showDetail(0)">
          <div class="summary">
            <div class="symbol">01</div>
            {{ $t('activity_invite_mine_question_a') }}
          </div>
          <div
            class="detail">
            <div class="text">
              {{ $t('activity_invite_mine_question_a_expand') }}
            </div>
          </div>
        </li>
        <li
          class="question-item"
          :class="[hoveringQuestion == 1 && 'focus']"
          @mouseenter="showDetail(1)">
          <div class="summary">
            <div class="symbol">02</div>
            {{ $t('activity_invite_mine_question_b') }}
          </div>
          <div
            class="detail">
            <div class="text">
              {{ $t('activity_invite_mine_question_b_expand') }}

            </div>
          </div>
        </li>
        <li
          class="question-item"
          :class="[hoveringQuestion == 2 && 'focus']"

          @mouseenter="showDetail(2)">
          <div class="summary">
            <div class="symbol">03</div>
            {{ $t('activity_invite_mine_question_c') }}
          </div>
          <div
            class="detail">
            <div class="text">
              {{ $t('activity_invite_mine_question_c_expand') }}

            </div>
          </div>
        </li>
        <li
          class="question-item"
          :class="[hoveringQuestion == 3 && 'focus']"
          @mouseenter="showDetail(3)">
          <div class="summary">
            <div class="symbol">04</div>
            {{ $t('activity_invite_mine_question_d') }}
          </div>
          <div class="detail">
            <div class="text">
              {{ $t('activity_invite_mine_question_d_expand') }}

            </div>
          </div>
        </li>

      </ul>
      <div
        class="conent__login-button">
        <div class="mask"/>
        <div
          class="button"
          @click="doUnLock">{{ $t('signin') }}</div>
      </div>
    </div>

    <!-- 已登录显示 -->
    <div
      class="content login"
      v-if="isLogin">
      <div class="invite-summary invite-info-row">
        <div class="invite-item">
          <span class="num">{{ myInvite.invites }}</span>
          {{ $t('invite_all_people') }}
        </div>
        <div class="invite-item">
          <div class="num">{{ myInvite.total }} <span class="unit">IX</span></div>
          {{ $t('invite_all_reward') }}
        </div>
      </div>

      <!-- 我的邀请信息 -->
      <div class="my-invite-info invite-info-row">
        <div class="box-head">
          <div class="head__stick"/>
          <div class="head_text">
            <span>{{ $t('my_invite_solution') }}</span>
          </div>

        </div>
        <div class="invite_boxs">
          <div class="invite_box link">
            <div class="box_title">{{ $t('profile_left_invite_link') }}</div>
            <div class="box_body">
              <div class="input_box mt-18">
                <div class="link-content">{{ inviteLink }}</div>
                <a
                  class="copy_button"
                  @click.prevent="copy('inviteLink')">{{ $t('profile_left_copy_invite_link') }}</a>
              </div>
            </div>
          </div>
          <div class="invite_box code ml-20">
            <div class="box_title">{{ $t('profile_left_invite_code') }}</div>
            <div class="box_body">
              <div class="input_box mt-18">
                <p class="link-content">{{ inviteCode }}</p>
                <a
                  class="copy_button"
                  @click.prevent="copy('inviteCode')">{{ $t('profile_left_copy_invite_code') }}</a>
              </div>
            </div>
          </div>
          <div class="invite_box qrcode ml-20">
            <div class="box_title">{{ $t('profile_left_invite_qrcode') }}</div>
            <div class="box_body">
              <div
                class="btn_select mt-18"
                @click="showQrCode"
                @mouseover="showQrCode(true)"
                @mouseout="showQrCode(false)">{{ $t('profile_left_invite_qrcode') }}</div>
              <div
                class="qrcode"
                v-show="showCode"
              >
                <canvas
                  class="qr-img"
                  ref="qr"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 邀请记录 -->
      <div class="invite-history-row">
        <div class="history-box record">
          <div class="box-head">
            <div class="head__stick"/>
            <div class="head_text">
              <span>{{ $t('invite_history_text') }}</span>
              <span class="total-people-num">{{ $t('invite_total_people_num', {num: myInvite.invites }) }}</span>
            </div>

          </div>
          <div class="box-table">
            <div class="box-table-th">
              <span class="th_td">{{ $t('username') }}</span>
              <span class="invite-time">{{ $t('time') }}</span>
            </div>
            <div
              class="box-table-tr"
              :key="index"
              v-for="(item,index) in invitationList.list">
              <span class="td">{{ item.phone || item.email }}</span>
              <span class="td">{{ item.register_time | ts2date }}</span>
            </div>
          </div>
        </div>

        <div class="history-box">
          <div class="box-head">
            <div class="head__stick"/>
            <div class="head_text">
              <span>{{ $t('commission_history_text') }}</span>
              <span class="total-people-num">{{ $t('total_invite_reward', {num: myInvite.total }) }}</span>
            </div>

          </div>
          <div class="box-table">
            <div class="box-table-th">
              <span class="th_td username">{{ $t('username') }}</span>
              <span class="th_td amount">{{ $t('commission_amount') }}</span>
              <span class="th_td time">{{ $t('time') }}</span>
              <span class="th_td state">{{ $t('status') }}</span>
            </div>
            <div
              class="box-table-tr"
              :key="index"
              v-for="(item,index) in commissionList.list">
              <span class="username">{{ item.phone || item.email }}</span>
              <span class="amount">{{ item.amount | round(4) }}</span>
              <span
                class="time"
                v-if="item.release_time">{{ item.release_time | ts2date('M-D H:m') }}</span>
              <span
                class="time"
                v-else>--</span>
              <span class="state">{{ item.state===0 ? $t('waiting_for_release') : $t('done') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 邀请细则 -->
      <div class="record_box">
        <div class="box-head">
          <div class="head__stick"/>
          <div class="head_text">
            <span>{{ $t('invite_detail') }}</span>
          </div>

        </div>
        <div class="box_body pb-18 pl-30 pr-30">
          <div class="rules">
            <p> <span class="dot"/>{{ $t('invite_ix_reward_rules_a') }}</p>
            <p> <span class="dot"/>{{ $t('invite_ix_reward_rules_b') }}</p>
            <p> <span class="dot"/>{{ $t('invite_ix_reward_rules_c') }}</p>
            <p> <span class="dot"/>{{ $t('invite_ix_reward_rules_d') }}</p>
          </div>
        </div>
      </div>

      <!-- 底部图 -->
      <div
        class="conent__login-button"
        style="margin-top: -145px">
        <div class="mask"/>
      </div>
    </div>
</div></template>
<script>
import VNav from '@/components/VNav3'
import VBtn from '@/components/VBtn'
import {state, actions} from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'
import copyToClipboard from 'copy-to-clipboard'
const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')
const PageSize = 10

export default {
  data () {
    return {
      state,
      showCode: false,
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
      myInvite: {
        total: 0,
        invites: 0
      },
      hoveringQuestion: 0
    }
  },
  components: {
    VNav,
    VBtn
  },
  computed: {
    isLogin () {
      return this.state.userInfo
    },
    inviteLink () {
      return `${location.protocol}//${location.host}/user/register/?invitor=${this.inviteCode}`
    },
    inviteCode () {
      if (this.state.userInfo) { return this.state.userInfo.id }
      return ''
    }
  },
  methods: {
    doUnLock () {
      if (!this.isLogin) {
        actions.setLoginBack({
          fullPath: this.$route.fullPath
        })
        this.$router.push({
          name: 'login'
        })
      }
    },
    copy (key) {
      copyToClipboard(this[key])
      utils.success(this.$i18n.t('copyed'))
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
    async getMyInviteSummary () {
      let result = await service.getMyInviteSummary()
      if (!result.code) {
        this.myInvite = result.data
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
    showQrCode (toggle) {
      if (typeof toggle === 'boolean') {
        this.showCode = toggle
      } else {
        this.showCode = !this.showCode
      }
    },
    showDetail (num) {
      this.hoveringQuestion = num
    }
  },
  created () {
    if (this.isLogin && this.inviteLink) {
      this.getMyInviteSummary()
      this.setQr(this.inviteLink)
      this.getInviteList()
      this.getCommissionList()
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

// :class="!isLogin && 'mb-90'"
