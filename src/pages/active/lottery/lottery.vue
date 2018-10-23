<template>
  <div class="lottery-container">
    <div class="banner"/>
    <div class="body">
      <!-- 第一行 -->
      <div class="top">
        <div class="count-down border-1">
          <div class="box-title mb-20"><div class="text">{{ $t('activity_lottery_count_down') }}</div></div>
          <div class="count-down__detail">
            <div class="proper-time mb-25">{{ $t('activity_lottery_next_time') }} 4:00:00</div>
            <div class="count-down-series">
              <div
                class="time-num-group"
                :key="index"
                v-for="(timeGroup,index) in timeArr">
                <div class="time-num">{{ timeGroup[0] }}<span class="num__mask"/></div>
                <div class="time-num ml-5">{{ timeGroup[1] }} <span class="num__mask"/></div>
                <div
                  class="time-colon"
                  v-if="index < 2"><span class="dot mb-10"/><span class="dot"/></div>
              </div>
            </div>
          </div>
        </div>
        <div class="event-review border-1">
          <div class="box-title mb-26"><span class="text">{{ $t('activity_lottery_event_review') }}</span></div>
          <div class="review__list">
            <div class="list__head">
              <div class="order">{{ $t('activity_lottery_event_order') }}</div>
              <div class="order">{{ $t('activity_lottery_event_result') }}</div>
            </div>
            <div class="list__row">
              <div class="row__order">201810191700期</div>
              <div class="row__status">未开奖</div>
            </div>
            <div class="list__row">
              <div class="row__order">201810191700期</div>
              <div class="row__status increase">买涨</div>
            </div>
            <div class="list__row">
              <div class="row__order">201810191700期</div>
              <div class="row__status">买平</div>
            </div>
            <div class="list__row">
              <div class="row__order">201810191700期</div>
              <div class="row__status decrease">卖跌</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 第二行 -->
      <div class="middle">
        <div class="middle__left">
          <div class="box-head">
            <div class="head__stick"/>
            <div class="head_text">
              <span>{{ $t('activity_lottery_quiz') }}BTC/USDT</span>
            </div>
          </div>
          <div class="quiz border-1">
            <div class="market-info border-1">
              <div class="current-market">
                {{ $t('activity_lottery_current_market') }} 55555~88888
              </div>
              <div class="open-market">
                {{ $t*'activity_lottery_open_market' }} 5555~$8888
              </div>
            </div>
            <div class="market-tips border-1">
              tipstipstipstips
            </div>
            <!-- 买涨 -->
            <div class="bids-row">
              <div class="bids-row__info">
                <div class="info__label rise"> {{ $t('activity_lottery_buy_rise') }} </div>
                <div class="buy-rise-total"> {{ $t('activity_lottery_buy_total_rise') }} {{ '8888' }} IX </div>
              </div>
              <div class="bids-row__progress border-1">
                <div
                  class="color-section rise"
                  style="width: 70px"/>
                <div class="ml-20">{{ '70%' }}</div>
              </div>
            </div>
            <!-- 买跌 -->
            <div class="bids-row">
              <div class="bids-row__info">
                <div class="info__label fall"> {{ $t('activity_lottery_buy_fall') }} </div>
                <div class="buy-rise-total"> {{ $t('activity_lottery_buy_total_fall') }} {9999} IX</div>
              </div>
              <div class="bids-row__progress border-1">
                <div
                  class="color-section fall"
                  style="width: 70px"/>
                <div class="ml-20">{{ '70%' }}</div>
              </div>
            </div>

            <!-- 买平 -->
            <div class="bids-row">
              <div class="bids-row__info">
                <div class="info__label"> {{ $t('activity_lottery_buy_flat') }} </div>
                <div class="buy-rise-total"> {{ $t('activity_lottery_buy_total_flat') }} {9999} IX</div>
              </div>
              <div class="bids-row__progress border-1">
                <div
                  class="color-section"
                  style="width: 70px"/>
                <div class="ml-20">{{ '70%' }}</div>
              </div>
            </div>
            <!-- 当前票数 -->
            <div class="current-ticket-num border-1">
              <div class="num-now"> {{ $t('activity_lottery_current_ticket') }} {{ '9999' }} IX </div>
              <div class="input-ix-num pl-20">
                <input
                  type="text"
                  class="border-1"> IX
              </div>
            </div>

            <!-- bid 按钮 -->
            <div class="bids-buttons">
              <span> {{ $t('activity_lottery_buy_rise') }} </span>
              <span> {{ $t('activity_lottery_buy_fall') }} </span>
              <span> {{ $t('activity_lottery_buy_flat') }} </span>
            </div>
          </div>
        </div>
        <div class="middle-right">
          <div class="box-head">
            <div class="head__stick"/>
            <div class="head_text">
              <span>{{ $t('activity_lottery_rules') }}</span>
            </div>
          </div>
          <div class="rules border-1">
            <p class="rule"> {{ $t('activity_lottery_rules_a') }} </p>
            <p class="rule"> {{ $t('activity_lottery_rules_b') }} </p>
            <p class="rule"> {{ $t('activity_lottery_rules_c') }} </p>
            <p class="rule"> {{ $t('activity_lottery_rules_d') }} </p>
            <p class="rule"> {{ $t('activity_lottery_cancel_ix') }} </p>
            <p class="rule"> {{ $t('activity_explaination_ix') }} </p>
          </div>
        </div>
      </div>

      <!-- 最下面一行 -->
      <div class="bids-history">
        <div class="box-head">
          <div class="head__stick"/>
          <div class="head_text">
            <span>{{ $t('activity_lottery_bid_history') }}</span>
          </div>
        </div>
        <div class="history__table border-1">
          <div class="box-table">
            <div class="box-table-th box-title">
              <span class="th_td rank_pos">{{ $t('activity_lottery_issue_no') }}</span>
              <span class="th_td state">{{ $t('activity_lottery_serial') }}</span>
              <span class="th_td uid">{{ $t('activity_lottery_bid_direction') }}</span>
              <span class="th_td time">{{ $t('activity_lottery_settle') }}</span>
              <span class="th_td state">{{ $t('activity_lottery_result') }}</span>
            </div>
            <div
              class="box-table-tr"
              :key="index"
              v-for="(item,index) in history">
              <span class="rank_pos pl-10">
                <icon
                  name="rank-leading"
                  class="icon-rank-leading"
                  v-if="item.rank <= 5"/>
                {{ item.rank }}
              </span>
              <span class="uid">{{ getEncodeContent(item.user_id) }}</span>
              <span class="mined">{{ item.mined_amount | round(8) | thousand }}</span>
              <span class="state">{{ item.reward | round(2) | thousand }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {state, actions} from '@/modules/store'
import utils from '@/modules/utils'
import service from '@/modules/service'
import isEmpty from 'lodash/isEmpty'

export default {
  data () {
    return {
      timer: null,
      time: new Date(),
      history: []
    }
  },
  computed: {
    isLogin () {
      if (this.state.userInfo) {
        return true
      }
      return false
    },
    timeArr () {
    //   return '10:00:03'.split(':')
      let h = this.time.getHours()
      let m = this.time.getMinutes()
      let s = this.time.getSeconds()
      console.log(h, m, s)
      return [('' + h).split(''), ('' + m), ('' + s)]
    }
  },
  methods: {
  },
  async created () {
    this.timer = setInterval(() => {
      this.time = new Date()
    }, 1000)
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
@import './lottery.scss';
</style>
