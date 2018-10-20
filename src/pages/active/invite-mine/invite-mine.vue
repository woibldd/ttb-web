<template>
  <div class="invite-mine-container">
    <div class="header">
      <v-nav
        is-home="true"
      />
    </div>
    <div class="banner mb-90">
      <div class="text-wrapper">
        <div class="first-floor mb-10"> <span v-html="$t('activeity_invite_banner_first')"/></div>
        <div class="second-floor mb-20">{{ $t('activeity_invite_banner_second') }}</div>
        <div class="third-floor mb-20"><span v-html="$t('activeity_invite_banner_third')"/></div>
        <div class="fourth-floor f16 ">{{ $t('activeity_invite_banner_fourth') }}</div>
      </div>

    </div>
    <div
      class="content"
      v-if="!isLogin">
      <div class="content__title">
        <i class="arrow left"/>
        {{ $t('how_to_get_reward') }}
        <i class="arrow right"/>

      </div>
      <ul class="content__questions">
        <li class="question-item">
          <div class="summary">
            <div class="symbol">01</div>
            {{ $t('activity_invite_mine_question_a') }}
          </div>
          <div class="detail">
            <div class="text">
              {{ $t('activity_invite_mine_question_a_expand') }}

            </div>
          </div>
        </li>
        <li class="question-item">
          <div class="summary">
            <div class="symbol">02</div>
            {{ $t('activity_invite_mine_question_b') }}
          </div>
          <div class="detail">
            <div class="text">
              {{ $t('activity_invite_mine_question_b_expand') }}

            </div>
          </div>
        </li>
        <li class="question-item">
          <div class="summary">
            <div class="symbol">03</div>
            {{ $t('activity_invite_mine_question_c') }}
          </div>
          <div class="detail">
            <div class="text">
              {{ $t('activity_invite_mine_question_c_expand') }}

            </div>
          </div>
        </li>
        <li class="question-item">
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
          <span class="num">{{ 995 }}</span>
          {{ $t('invite_all_people') }}
        </div>
        <div class="invite-item">
          <div class="num">{{ 8838848.233 }} <span class="unit">IX</span></div>
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
        <div class="history-box">
          <div class="box-head">
            <div class="head__stick"/>
            <div class="head_text">
              <span>{{ $t('invite_history_text') }}</span>
              <span class="total-people-num">{{ $t('invite_total_people_num', {num: 99}) }}</span>
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
              v-for="(item,index) in inviteInfo">
              <span>{{ item.phone }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
        </div>

        <div class="history-box">
          <div class="box-head">
            <div class="head__stick"/>
            <div class="head_text">
              <span>{{ $t('commission_history_text') }}</span>
              <span class="total-people-num">{{ $t('total_invite_reward', {num: 99}) }}</span>
            </div>

          </div>
          <div class="box-table">
            <div class="box-table-th">
              <span class="th_td">{{ $t('username') }}</span>
              <span class="th_td">{{ $t('commission_amount') }}</span>
              <span class="th_td">{{ $t('time') }}</span>
              <span class="th_td">{{ $t('status') }}</span>
            </div>
            <div
              class="box-table-tr"
              :key="index"
              v-for="(item,index) in inviteInfo">
              <span>{{ item.phone }}</span>
              <span>{{ item.time }}</span>
              <span>{{ item.time }}</span>
              <span>{{ item.time }}</span>
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

export default {
  data () {
    return {
      state,
      showCode: false,
      inviteInfo: []
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

// :class="!isLogin && 'mb-90'"
