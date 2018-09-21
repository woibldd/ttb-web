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
        <div class="row personal"><span class="text">{{ $t('mine_my_total') }} : </span>{{ mineMy.max_amount | fixed(2) | thousand }}<em class="unit">IX</em></div>
        <div class="row personal ml-30"><span class="text">{{ $t('mine_my_remain') }} : </span>{{ ( mineMy.max_amount - mineMy.amount ) | fixed(2) | thousand }}<em class="unit">IX</em></div>
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
        <span>IX</span>
      </div>
      <div class="cm-bst">
        {{ $t('mine_invite_amount') }}
      </div>
      <div class="cm-bn">
        {{ yestodayMine.inviteMine | round(4) }} IX
      </div>
    </div>
    <div
      v-if="false"
      class="jd_c jd_right ind_jd">
      <div class="cm-tit">
        昨日交易挖矿产出
      </div>
      <div class="cm-bt">
        26993.00000000<span>IX</span>
      </div>
      <div class="cm-bst">
        昨日邀请挖矿产出：
      </div>
      <div class="cm-bn">
        19222.99002345 IX
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
      let res = await service.getMineTotal({offset: -1})
      if (!res.code && !isEmpty(res.data)) {
        this.showMiddle = true
        this.yestodayMine.exchangeMine = res.data.amount
      }

      let resp = await service.getInviteMineTotal({offset: -1})
      if (!resp.code && !isEmpty(resp.data)) {
        this.showMiddle = true
        this.yestodayMine.inviteMine = resp.data.amount
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
