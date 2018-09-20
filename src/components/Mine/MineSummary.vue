<template>
  <div
    class="ind_cen ind_jd">
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
      <div class="row time_range">{{ mineSummary.range }}</div>
      <div class="row"><span class="text">{{ $t('mine_total') }} : </span>{{ mineSummary.max_amount | fixed(2) | thousand }}<em class="unit">IX</em></div>
      <div class="row"><span class="text">{{ $t('mine_mined') }} : </span>{{ mineSummary.amount | fixed(2) | thousand }}<em class="unit">IX</em></div>
      <div class="row"><span class="text">{{ $t('mine_remain') }} : </span>{{ mineSummary.remain | fixed(2) | thousand }}<em class="unit">IX</em></div>
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
      timer: 0
    }
  },
  computed: {
    hasMineSummary () {
      return !isEmpty(this.mineSummary)
    }
  },
  methods: {
    async fetch () {
      let res = await service.getMineTotal()
      if (!res.code && !isEmpty(res.data)) {
        this.mineSummary = this.fixData(res.data)
      }
    },
    loop () {
      this.timer = setInterval(this.fetch, 3e4)
    },
    fixData (summary) {
      summary.rate = this.$big(summary.amount).div(summary.max_amount).toString()
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
  }
}
</script>

<style lang="scss" scoped>
.ind_jd {
  border: 1px solid #cbe6fd;
  margin-bottom: 59px;
  padding: 75px 6% 50px 6%;
  .unit {
    color: #6d869c;
    margin-left: 5px;
  }
  .text {
    color: #cbe6fd;
  }
  .jd_box {
    width: 100%;
    background: #6d869c;
    height: 4px;
    border-radius: 4px;
    position: relative;

    .cursor {
      position: absolute;
      color: #6d869c;
      font-size: 14px;
      line-height: 34px;
      bottom: -34px;

      &.cursor_left {
        left: 0;
      }
      &:nth-child(3) {
        right: 0;
      }
    }
    .jd_cen {
      height: 4px;
      float: left;
      position: relative;
      border-radius: 4px;
      background: #c9a96e;
      width: 0px;
      transition: width 2s ease-in-out;

      .line {
        display: block;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #c9a96e;
        top: -20px;
        right: -3px;
        position: absolute;
        .cursor_arrow {
          display: block;
          width: 300px;
          height: 33px;
          position: absolute;
          top: -33px;
          text-align: center;
          left: 50%;
          margin-left: -150px;
          color: #c9a96e;
        }
      }
    }
  }
  .jd_btxt {
    font-size: 20px;
    overflow: hidden;
    margin-top: 65px;
    .row {
      float: left;
      color: #c9a96e;
      &:nth-child(1) {
        width: 15%;
      }
      &:nth-child(2) {
        width: 25%;
      }
      &:nth-child(3) {
        width: 25%;
      }
      &:last-child {
        width: 25%;
      }
    }
  }
}
</style>
