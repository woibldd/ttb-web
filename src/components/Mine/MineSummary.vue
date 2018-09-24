<template>
  <div class="mine-summary-container">
    <div class="ind_left ind_jd">
      <div class="jd_box">
        <div
          class="jd_cen"
          :style="{ 'width': mineSummary.rate+'%'}">
          <p class="line">
            <span class="cursor_arrow">
              <i class="text">{{ $t('mine_progress') }} : </i>{{ mineSummary.rate | fixed(2) }}<i class="unit">%</i>
            </span>
          </p>
        </div>
        <em class="cursor cursor_left">0 IX</em>
        <em class="cursor cursor_right">{{ mineSummary.max_amount | fixed(2) | thousand }} IX</em>
      </div>
      <div class="jd_btxt">
        <div class="row time_range mr-20">{{ mineSummary.range }}</div>
        <div class="row col left__col mr-20">
          <p class="text mb-6">{{ $t('mine_total') }} : </p>
          <p>{{ mineSummary.max_amount | fixed(2) | thousand }}<em class="unit">IX</em></p>
        </div>
        <div class="row col left__col mr-20">
          <p class="text mb-6">{{ $t('mine_mined') }} : </p>
          <p>{{ mineSummary.amount | fixed(2) | thousand }}<em class="unit">IX</em></p>
        </div>
        <div class="row col left__col">
          <p class="text mb-6">{{ $t('mine_remain') }} : </p>
          <p>{{ mineSummary.remain | fixed(2) | thousand }}<em class="unit">IX</em></p>
        </div>
      </div>
      <div
        class="jd_btxt mt-20"
        v-if="hasMineMy">
        <div class="row personal mr-20"><span class="text">{{ $t('mine_my_total') }} : </span>
          <p class="mb-6">{{ mineMy.max_amount | fixed(2) | thousand }}<em class="unit">IX</em></p>
        </div>
        <div class="row personal"><span class="text">{{ $t('mine_my_remain') }} : </span>
          <p class="mb-6">{{ ( mineMy.max_amount - mineMy.amount ) | fixed(2) | thousand }}<em class="unit">IX</em></p>
        </div>
        <div class="row personal ml-30"><span class="text">{{ $t('mine_my_reduce') }} : </span>
          <p class="mb-6">{{ ( mineMy.total ) | fixed(2) | thousand }}<em class="unit">IX</em></p>
        </div>
      </div>
    </div>
    <div
      v-if="showMiddle"
      class="jd_c jd_middle ind_jd">
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
    <div
      v-if="showRight"
      class="jd_c jd_right ind_jd">
      <div class="cm-bst">
        {{ $t('mine_bonus_today') }}
      </div>
      <div class="cm-bn">
        {{ bonusMine.today | round(8) }}<span class="unit">USDT</span>
      </div>
      <div class="cm-bst">
        {{ $t('mine_bonus_rate') }}
      </div>
      <div class="cm-bn">
        {{ bonusMine.rate | round(8) }}<span class="unit">USDT</span>
      </div>
      <div class="cm-bst">
        {{ $t('mine_bonus_yestoday') }}
      </div>
      <div class="cm-bn">
        {{ bonusMine.yesterday | round(8) }}<span class="unit">USDT</span>
      </div>
    </div>
  </div>
</template>
<script>
import './mine-summary.scss'
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
