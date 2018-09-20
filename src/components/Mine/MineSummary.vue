<template>
  <div
    class="ind_cen ind_jd"
    v-if="1==1">
    <div class="jd_box">
      <div
        class="jd_cen"
        style="width:100%;">
        <p class="line">
          <span class="cursor_arrow">
            <i class="text">{{ $t('mine_progress') }} : </i>126631.45633211<i class="unit">IX</i>
          </span>
        </p>
      </div>
      <em class="cursor cursor_left">0 IX</em>
      <em class="cursor cursor_right">33,333,333 IX</em>
    </div>
    <div class="jd_btxt">
      <div class="row time_range">0:00 - 8:00</div>
      <div class="row"><span class="text">{{ $t('mine_total') }} : </span>,333,333<em class="unit">IX</em></div>
      <div class="row"><span class="text">{{ $t('mine_mined') }} : </span>126631.45633211<em class="unit">IX</em></div>
      <div class="row"><span class="text">{{ $t('mine_remain') }} : </span>28,669,123.23441975<em class="unit">IX</em></div>
    </div>
  </div>
</template>
<script>
import { state } from '@/modules/store'
export default {
  data () {
    return {
      state
    }
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
        float: right;
      }
    }
  }
}
</style>
