<template>
  <div class="mine-summary-container">
    <!-- one -->
    <div
      v-if="showMiddle"
      class="mine-info-yesterday ind_jd">
      <div class="mine-info-row">
        <div class="row__label">
          {{ $t('mine_mining_amount') }}
        </div>
        <div class="row__value">
          {{ yestodayMine.exchangeMine | round(2) | thousand }}
          <span class="unit">IXX</span>
        </div>
      </div>

      <div class="mine-info-row">
        <div class="row__label">
          {{ $t('mine_invite_amount') }}
        </div>
        <div class="row__value">
          {{ yestodayMine.inviteMine | round(2) | thousand }} <span class="unit">IXX</span>
        </div>
      </div>
    </div>

    <!-- two -->
    <div class="mine-info-yesterday">
      <div class="mine-info-row">
        <div class="row__label">
          {{ $t('mine_bonus_today') }}
        </div>
        <div class="row__value">
          {{ allBonusData.btc_today | round(2) | thousand }}
          <span class="unit">USDT</span>
        </div>
      </div>
      <div class="mine-info-row">
        <p class="row__label">
          {{ $t('keep_ix_reward_yesterday') }}
          <!-- <span class="fee-tips-wrapper mr-5">
              <icon name="mine-fee-tips"/>
              <div class="fee-tips">
                <span v-html="$t('keep_ix_tips', {time: '11', link: '..'})"/>
                <div class="tips-arrow"/>
              </div>
            </span> -->
        </p>
        <p class="row__value">
          {{ allBonusData.ix_yesterday | round(2) | thousand }}
          <span class="unit">USDT</span>
        </p>
      </div>
      <div class="mine-info-row">
        <p class="row__label">
          {{ $t('mine_bonus_yestoday') }}
        </p>
        <p class="row__value">
          {{ allBonusData.btc_yesterday | round(2) | thousand }}
          <span class="unit">USDT</span>
        </p>
      </div>
    </div>
    <!-- three -->
    <div class="mine-info-yesterday">
      <div class="mine-info-row">
        <p class="row__label">
          {{ $t('mine_bonus_rate') }}
        </p>
        <p class="row__value">
          {{ allBonusData.btc_rate | round(2) | thousand }}
          <span class="unit">USDT</span>
        </p>
      </div>
      <div class="mine-info-row">
        <p class="row__label">
          {{ $t('keep_million_ix_reward_yesterday', {ix: allBonusData.base}) }}
        </p>
        <p class="row__value">
          {{ allBonusData.ix_rate | round(2) | thousand }}
          <span class="unit">USDT</span>
        </p>
      </div>
    </div>
    <!-- four -->
    <div class="mine-info-yesterday">
      <div class="mine-info-row">
        <p class="row__label">
          {{ $t('ix_trading_amout') }}
        </p>
        <p class="row__value">
          {{ ixMarketData.amount | round(2) | thousand }}
          <span class="unit">IXX</span>
        </p>
      </div>
      <div class="mine-info-row">
        <p class="row__label">
          {{ $t('ix_lock_amount') }}
        </p>
        <p class="row__value">
          {{ ixMarketData.locked | round(2) | thousand }}
          <span class="unit">IXX</span>
        </p>
      </div>
      <div class="mine-info-row">
        <p class="row__label">
          {{ $t('ix_second_trading_amount') }}
        </p>
        <p class="row__value">
          {{ ixMarketData.market_value | round(2) | thousand }}
          <span class="unit">IXX</span>
        </p>
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
      ixMarketData: {},
      allBonusData: {},
      bonusMine: {
        yesterday: 0,
        today: 0,
        rate: 0
      },
      // mineMy: {},
      timer: 0,
      showMiddle: false
      // isPersonalShow: false
    }
  },
  computed: {
    hasMineSummary () {
      return !isEmpty(this.mineSummary)
    },
    // hasMineMy () {
    //   return !isEmpty(this.mineMy)
    // },
    rates () {
      return this.mineSummary.rate
    }
  },
  methods: {
    async fetch () {
      let res = await service.getMineTotal({offset: 0})
      if (!res.code && !isEmpty(res.data)) {
        this.mineSummary = this.fixData(res.data)
      }
      // if (this.state.userInfo) {
      //   let resMy = await service.getPersonalTotal()
      //   if (!resMy.code && !isEmpty(resMy.data)) {
      //     this.mineMy = resMy.data
      //     this.mineMy.rate = this.$big(this.mineMy.amount).div(this.mineMy.max_amount).times(100).toString()
      //     // ??????????????????????????? ?????????????????????100%??????????????????????????????
      //     if (this.mineMy.rate <= 100) {
      //       this.isPersonalShow = true
      //     }
      //   }
      // }
    },
    async getYestoryData () {
      let [res, resp, resc] = await Promise.all([service.getMineTotal({offset: -1}), service.getInviteMineTotal({offset: -1}), service.getBonusMineTotal()])
      // ???????????? ??????
      if (!res.code && !isEmpty(res.data)) {
        this.showMiddle = true
        this.yestodayMine.exchangeMine = res.data.amount
      }

      // ???????????? ??????
      if (!resp.code && !isEmpty(resp.data)) {
        this.showMiddle = true
        this.yestodayMine.inviteMine = resp.data.amount
      }
      // ????????????
      if (!resc.code && !isEmpty(resc.data)) {
        this.showRight = true
        this.bonusMine = resc.data
      }
    },
    // ???????????????
    async getAllBonusInfo () {
      let res = await service.getAllBonusInfo()
      if (!res.code && !isEmpty(res.data)) {
        this.allBonusData = Object.assign({}, res.data)
      }
    },
    async getIXMarketData () {
      // ????????????
      let res = await service.getIXMarket()
      if (!res.code && !isEmpty(res.data)) {
        res.data.amount = this.$big(res.data.market_value).minus(res.data.locked)
        this.ixMarketData = Object.assign({}, res.data)
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
    this.getIXMarketData()
    this.getAllBonusInfo()
  }
}
</script>
<style lang="scss" scoped>
@import './mine-summary.scss'
</style>
