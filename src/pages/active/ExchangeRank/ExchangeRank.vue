<template>
  <div class="exchange-rank">
    <div class="exchange-rank-container">
      <div class="banner"/>
      <div class="body">
        <div class="flex-column">
          <div class="flex-box reward">
            <div class="box-title">
              {{ $t('activity_rank_total_reward_yet') }}
            </div>
            <div class="reward-num">
              78,999.9 <span class="unit">USDT</span>
            </div>
          </div>
          <div class="flex-box rank pt-22">
            <div class="box-title pb-23">
              {{ $t('activity_rank_people') }}
            </div>
            <div class="mine-box">
              <div
                class="box-table"
                v-if="isLogin">
                <div class="box-table-th">
                  <span class="th_td username">{{ $t('activity_rank_rank_position') }}</span>
                  <span class="th_td amount"> UID</span>
                  <span class="th_td time">{{ $t('mine_mined') }}IX</span>
                  <span class="th_td state">{{ $t('activity_rank_estimate_reward') }}USDT</span>
                </div>
                <div
                  class="box-table-tr"
                  :key="index"
                  v-for="(item,index) in rankList">
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
              <div class="box-table">
                {{ $t('activity_rank_no_rank_people') }}
              </div>
            </div>
          </div>

        </div>
        <div class="flex-column right">
          <div class="flex-box enroll">enroll</div>
          <div class="flex-box rule">rule</div>
          <div class="flex-box desc">desc</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {state} from '@/modules/store'
export default {
  data () {
    return {
      rankList: {},
      state
    }
  },
  computed: {
    isLogin () {
      if (this.state.userInfo) {
        return true
      }
      return true
    }
  }
}
</script>
<style lang="scss" scoped>
@import './exchange.scss'
</style>
