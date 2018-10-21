<template>
  <div class="exchange-rank">
    <div class="exchange-rank-container">
      <div class="banner">
        <div class="banner__info">
          <div class="info-text">
            <span class="all-people">{{ $t('activity_rank_all_people') }}</span>
            {{ $t('activity_rank_mine_competition') }}
          </div>
          <div class="info-time">
            <span class="time-label">{{ $t('activity_time') }}</span><!--
            --><span class="date">{{ $t('activity_rank_time_detail') }}</span>
          </div>
        </div>
      </div>
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
                  <span class="th_td rank_pos">{{ $t('activity_rank_rank_position') }}</span>
                  <span class="th_td uid">UID</span>
                  <span class="th_td time">{{ $t('mine_mined') }} IX</span>
                  <span class="th_td state">{{ $t('activity_rank_estimate_reward') }} USDT</span>
                </div>
                <div
                  class="box-table-tr"
                  :key="index"
                  v-for="(item,index) in 18">
                  <span class="rank_pos pl-10">
                    <icon
                      name="rank-leading"
                      class="icon-rank-leading"
                      v-if="index < 6"/>
                    {{ index }}
                  </span>
                  <span class="uid">{{ 15677778888 }}</span>
                  <span class="mined">{{ 766.99 }}</span>
                  <span class="state">22222.8</span>
                </div>
              </div>
              <div
                class="box-table"
                v-if="false">
                {{ $t('activity_rank_no_rank_people') }}
              </div>
            </div>
            <div class="rank__bottom">
              <div class="my_all_mine mr-169">{{ $t('activity_rank_my_mined') }} <span class="unit">{{ 88899 }}IX</span></div>
              <!-- <div class="my_all_mine">{{ $t('activity_rank_rank_position') }}: {{ 99 }}</div> -->
            </div>
          </div>

        </div>
        <div class="flex-column right">
          <div class="flex-box enroll">
            <div class="box-title">
              {{ $t('activity_rank_sign') }}
            </div>
            <div class="enroll__button">
              {{ $t('activity_rank_i_signing') }}
            </div>
            <div class="box__tips mt-26">
              <span class="unit">* </span>{{ $t('activity_rank_signing_tips') }}
            </div>
          </div>
          <div class="flex-box rule pt-28">
            <div class="box-title mb-20">
              {{ $t('activity_rank_rules') }}
            </div>
            <div class="rules__detail">
              <p v-html="$t('activity_rank_reward_rules_a')"/>
              <p v-html="$t('activity_rank_reward_rules_b')"/>
              <p v-html="$t('activity_rank_reward_rules_c')"/>
              <p v-html="$t('activity_rank_reward_rules_d')"/>
              <p v-html="$t('activity_rank_reward_rules_e')"/>
              <p v-html="$t('activity_rank_reward_rules_f')"/>
              <p v-html="$t('activity_rank_reward_rules_g')"/>
              <div class="box__tips pb-30">
                * {{ $t('activity_explaination_ix') }}
              </div>
            </div>
          </div>
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
      rankList: [],
      state
    }
  },
  computed: {
    isLogin () {
      if (this.state.userInfo) {
        return true
      }
      return true
    },
    activityTime () {
      return '2018年10月21日00:00-2018年10月27日24:00'
    }
  }
}
</script>
<style lang="scss" scoped>
@import './exchange.scss'
</style>
