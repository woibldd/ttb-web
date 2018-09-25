<template>
  <div class="mine-summary-container">
    <div class="mine-process-wrapper ind_jd">
      <div class="mine-process">
        <div
          class="process-line"
          :style="{ 'width': mineSummary.rate+'%'}">
          <div class="process-now-info">
            <div class="line-tip-text">
              <span>{{ $t('mine_progress') }}:</span>{{ mineSummary.rate | fixed(2) }}%
            </div>
            <p
              class="line-tip"
              :style="{'left': 'calc('+mineSummary.rate + '% - 50px)'}"/>
          </div>
        </div>
        <em class="cursor cursor_left">0 IX</em>
        <em class="cursor cursor_right">{{ mineSummary.max_amount | fixed(2) | thousand }} IX</em>
      </div>
      <!-- line end -->
      <div class="process-mine-left-info">
        <div class="row time_range">{{ mineSummary.range }}</div>
        <div class="detail--wrapper">
          <div class="process-mine-left-all">
            <div class="all-left-info">
              <div class="left__col">
                <span class="text mr-rem-10">{{ $t('mine_total') }} : </span>
                <span>{{ mineSummary.max_amount | fixed(2) | thousand }}<em class="unit">IX</em></span>
              </div>
              <div class="left__col">
                <span class="text mr-rem-10">{{ $t('mine_mined') }} : </span>
                <span>{{ mineSummary.amount | fixed(2) | thousand }}<em class="unit">IX</em></span>
              </div>
              <div class="left__col">
                <span class="text mr-rem-10">{{ $t('mine_remain') }} : </span>
                {{ mineSummary.remain | fixed(2) | thousand }}<em class="unit">IX</em>
              </div>
            </div>
          </div>
          <div
            class="process-mine-left-my"
            v-if="hasMineMy">
            <div class="left__col"><span class="text mr-rem-10">{{ $t('mine_my_total') }}: </span>{{ mineMy.max_amount | fixed(2) | thousand }}<em class="unit">IX</em></div>
            <div class="left__col"><span class="text mr-rem-10">{{ $t('mine_my_remain') }}: </span>{{ ( mineMy.max_amount - mineMy.amount ) | fixed(2) | thousand }}<em class="unit">IX</em></div>
            <!-- <div class="left__col">
              <span class="text mr-rem-10">{{ $t('mine_my_reduce') }} : </span>
              {{ mineMy.total | fixed(2) | thousand }}<em class="unit">IX</em>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showMiddle"
      class="mine-info-yesterday ind_jd">
      <div class="mine-info-row">
        <div class="row__label">
          {{ $t('mine_mining_amount') }}
        </div>
        <div class="row__value">
          {{ yestodayMine.exchangeMine | round(4) }}
          <span class="unit">IX</span>
        </div>
      </div>

      <div class="mine-info-row">
        <div class="row__label">
          {{ $t('mine_invite_amount') }}
        </div>
        <div class="row__value">
          {{ yestodayMine.inviteMine | round(4) }} <span class="unit">IX</span>
        </div>
      </div>
    </div>

    <div
      class="mine-other-info">
      <div class="mine-info-row">
        <div class="row__label">
          {{ $t('mine_bonus_today') }}
        </div>
        <div class="row__value">
          {{ bonusMine.today | round(8) }}
          <span class="unit">USDT</span>
        </div>
      </div>
      <div class="mine-info-row">
        <div class="row__label">
          {{ $t('mine_bonus_rate') }}
        </div>
        <div class="row__value">
          {{ bonusMine.rate | round(8) }}<span class="unit">USDT</span>
        </div>
      </div>
      <div class="mine-info-row">
        <div class="row__label">
          {{ $t('mine_bonus_yestoday') }}
        </div>
        <div class="row__value">
          {{ bonusMine.yesterday | round(8) }}
          <span class="unit">USDT</span>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { state } from '@/modules/store'
import service from '@/modules/service'
import isEmpty from 'lodash/isEmpty'

const options = [
  '0:00 - 8:00',
  '8:00 - 16:00',
  '16:00 - 24:00'
]
export default {
  data () {
    return {
      state,
      mineSummary: {
        rate: 0,
        max_amount: '333333333333',
        amount: 0,
        range: '00:00 - 23:59'
      },
      yestodayMine: {
        exchangeMine: 0,
        inviteMine: 0
      },
      bonusMine: {
        yesterday: 0,
        today: 0,
        rate: 0
      },
      mineMy: {},
      timer: 0,
      showMiddle: false
    }
  },
  computed: {
    hasMineSummary () {
      return !isEmpty(this.mineSummary)
    },
    hasMineMy () {
      return !isEmpty(this.mineMy)
    }
  },
  methods: {
    async fetch () {
      let res = await service.getMineTotal({offset: 0})
      if (!res.code && !isEmpty(res.data)) {
        this.mineSummary = this.fixData(res.data)
      }
      if (this.state.userInfo) {
        let resMy = await service.getPersonalTotal()
        if (!resMy.code && !isEmpty(resMy.data)) {
          this.mineMy = resMy.data
        }
      }
    },
    async getYestoryData () {
      let [res, resp, resc] = await Promise.all([service.getMineTotal({offset: -1}), service.getInviteMineTotal({offset: -1}), service.getBonusMineTotal()])
      // 邀请挖矿 全部
      if (!res.code && !isEmpty(res.data)) {
        this.showMiddle = true
        this.yestodayMine.exchangeMine = res.data.amount
      }

      // 邀请挖矿 个人
      if (!resp.code && !isEmpty(resp.data)) {
        this.showMiddle = true
        this.yestodayMine.inviteMine = resp.data.amount
      }
      // 持仓分红
      if (!resc.code && !isEmpty(resc.data)) {
        this.showRight = true
        this.bonusMine = resc.data
      }
    },
    loop () {
      this.timer = setInterval(this.fetch, 3e4)
    },
    fixData (summary) {
      summary.rate = this.$big(summary.amount).div(summary.max_amount).times(100).toString()
      summary.range = options[summary.index || 0]
      summary.remain = this.$big(summary.max_amount).minus(summary.amount)
      return summary
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  created () {
    this.fetch()
    this.loop()
    this.getYestoryData()
  }
}
</script>
<style lang="scss" scoped>
@import './mine-summary.scss'
</style>
