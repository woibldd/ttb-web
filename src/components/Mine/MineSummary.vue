<template>
  <div class="mine-summary-container">
    <!-- one -->
    <div
      v-if="showMiddle"
      class="jd_c jd_middle mine-ix-box pr-30">
      <div class="cm-tit">
        {{ $t('mine_mining_amount') }}
      </div>
      <div class="cm-bt">
        {{ yestodayMine.exchangeMine | round(4) }}
        <span class="unit">IX</span>
      </div>
      <div class="cm-bst">
        {{ $t('mine_invite_amount') }}
      </div>
      <div class="cm-bn">
        {{ yestodayMine.inviteMine | round(4) }}
        <span class="unit">IX</span>
      </div>
    </div>
    <!-- two -->
    <div class="mine-ix-box box-margin-left grow">
      <div class="box__row">
        <div class="fee__pie">
          <p class="cm-tit">
            {{ $t('mine_bonus_today') }}
          </p>
          <p class="cm-bt">
            {{ allBonusData.btc_today | round(4) }}
            <span class="unit">USDT</span>
          </p>
        </div>
      </div>
      <div class="box__row">
        <div
          class="fee__pie"
          v-if="allBonusData.ix_yesterday != 0">
          <p class="cm-tit">
            {{ $t('keep_ix_reward_yesterday') }}
          </p>
          <p class="cm-bn">
            {{ allBonusData.ix_yesterday | round(4) }}
            <span class="unit">USDT</span>
          </p>
        </div>
        <div class="fee__pie">
          <p class="cm-tit">
            {{ $t('mine_bonus_yestoday') }}
          </p>
          <p class="cm-bn">
            {{ allBonusData.btc_yesterday | round(4) }}
            <span class="unit">USDT</span>
          </p>
        </div>
      </div>
    </div>
    <!-- three -->
    <div class="mine-ix-box box-margin-left">
      <div class="box__row">
        <div class="fee__pie">
          <p class="cm-tit">
            {{ $t('mine_bonus_rate') }}
          </p>
          <p class="cm-bt">
            {{ allBonusData.btc_rate | round(4) }}
            <span class="unit">USDT</span>
          </p>
        </div>
      </div>
      <div class="box__row">
        <div
          class="fee__pie"
          v-if="allBonusData.ix_rate != '0'">
          <p class="cm-tit">
            {{ $t('keep_million_ix_reward_yesterday') }}
          </p>
          <p
            class="cm-bt"
            v-if="allBonusData.ix_rate">
            {{ allBonusData.ix_rate | round(4) }}
            <span class="unit">USDT</span>
          </p>
        </div>
      </div>
    </div>
    <!-- four -->
    <div class="mine-ix-box box-margin-left grow">
      <div class="box__row">
        <div class="fee__pie">
          <p class="cm-tit">
            {{ $t('ix_second_trading_amount') }}
          </p>
          <p class="cm-bt">
            {{ ixMarketData.amount | round(4) }}
            <span class="unit">IX</span>
          </p>
        </div>
      </div>
      <div class="box__row">
        <div class="fee__pie">
          <p class="cm-tit">
            {{ $t('ix_lock_amount') }}
          </p>
          <p class="cm-bn">
            {{ ixMarketData.locked | round(4) }}
            <span class="unit">IX</span>
          </p>
        </div>
        <div class="fee__pie">
          <p class="cm-tit">
            {{ $t('ix_trading_amout') }}
          </p>
          <p class="cm-bn">
            {{ ixMarketData.market_value | round(4) }}
            <span class="unit">USDT</span>
          </p>
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
        amount: 0
      },
      ixMarketData: {},
      allBonusData: {},
      yestodayMine: {
        exchangeMine: 0,
        inviteMine: 0
      },
      mineMy: {},
      bonusMine: {
        yesterday: 0,
        today: 0,
        rate: 0
      },
      timer: 0,
      showMiddle: false,
      showRight: false
    }
  },
  computed: {
    hasMineSummary () {
      return !isEmpty(this.mineSummary)
    }
  },
  methods: {
    async fetch () {
      let res = await service.getMineTotal({offset: 0})
      if (!res.code && !isEmpty(res.data)) {
        this.mineSummary = this.fixData(res.data)
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

    // 分红总产出
    async getAllBonusInfo () {
      let res = await service.getAllBonusInfo()
      if (!res.code && !isEmpty(res.data)) {
        this.allBonusData = Object.assign({}, res.data)
      }
    },
    async getIXMarketData () {
      // 第四个框
      let res = await service.getIXMarket()
      if (!res.code && !isEmpty(res.data)) {
        this.ixMarketData = Object.assign({}, res.data)
      }
    },
    loop () {
      this.timer = setInterval(this.fetch, 6e4)
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
    this.getIXMarketData()
    this.getAllBonusInfo()
  }
}
</script>
<style lang="scss" scoped>
@import './mine-summary.scss';
</style>
