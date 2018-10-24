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
                v-for="(timeGroup,index) in gameOverTimeArr">
                <div class="time-num">{{ timeGroup[0] }}<span class="num__mask"/></div>
                <div class="time-num ml-5">{{ timeGroup[1] }} <span class="num__mask"/></div>
                <div
                  class="time-colon"
                  v-if="index < 2"><span class="dot mb-10"/><span class="dot"/></div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="event-review border-1"
          v-if="history && history.length">
          <div class="box-title mb-26"><span class="text">{{ $t('activity_lottery_event_review') }}</span></div>
          <div class="review__list">
            <div class="list__head">
              <div class="order">{{ $t('activity_lottery_event_order') }}</div>
              <div class="order">{{ $t('activity_lottery_event_result') }}</div>
            </div>
            <div
              class="list__row"
              :key="index"
              v-for="(item, index) in history">
              <div class="row__order">{{ item.game_id }}{{ $t('activity_lottery_serial') }}</div>
              <div
                class="row__status"
                :class="{increase: item.result === 1, decrease: item.result === 3, flat: item.result === 2}">{{ $t('activity_result_'+item.result) }}</div>
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
                {{ $t('activity_lottery_current_market') }} {{ current.current_price }} ≈{{ state.fiatMoneySymbol }}
                <fiat-money
                  :base="currency"
                  :value="current.current_price"/>
              </div>
              <div class="open-market">
                {{ $t('activity_lottery_open_market') }} {{ currency.open_price }} ≈{{ state.fiatMoneySymbol }}
                <fiat-money
                  :base="currency"
                  :value="current.open_price"/>
              </div>
              <router-link
                class="more"
                :to="{name: 'trading', pair: product + '_' + currency}">{{ $t('activity_bet_more') }}</router-link>
            </div>
            <div class="market-tips border-1">
              <span>{{ $t('activity_bet_countdown') }}</span>
              <span>{{ betCountDownFormat }}</span>
            </div>
            <!-- 买涨 -->
            <div class="bids-row">
              <div class="bids-row__info">
                <div class="info__label rise"> {{ $t('activity_lottery_buy_rise') }} </div>
                <div class="buy-rise-total"> {{ $t('activity_lottery_buy_total_rise') }} {{ current.bet1_amount | round(2) }} IX </div>
              </div>
              <div class="bids-row__progress border-1">
                <div
                  class="color-section rise"
                  :style="{width: current.bet1Rate+'%'}"/>
                <div class="ml-20">{{ current.bet1Rate }}%</div>
              </div>
            </div>
            <!-- 买跌 -->
            <div class="bids-row">
              <div class="bids-row__info">
                <div class="info__label fall"> {{ $t('activity_lottery_buy_fall') }} </div>
                <div class="buy-rise-total"> {{ $t('activity_lottery_buy_total_fall') }} {{ current.bet3_amount | round(2) }} IX</div>
              </div>
              <div class="bids-row__progress border-1">
                <div
                  class="color-section fall"
                  :style="{width: current.bet3Rate+'%'}"/>
                <div class="ml-20">{{ current.bet3Rate }}%</div>
              </div>
            </div>

            <!-- 买平 -->
            <div class="bids-row">
              <div class="bids-row__info">
                <div class="info__label"> {{ $t('activity_lottery_buy_flat') }} </div>
                <div class="buy-rise-total"> {{ $t('activity_lottery_buy_total_flat') }} {{ current.bet2_amount | round(2) }} IX</div>
              </div>
              <div class="bids-row__progress border-1">
                <div
                  class="color-section"
                  :style="{width: current.bet2Rate+'%'}"/>
                <div class="ml-20">{{ current.bet2Rate }}%</div>
              </div>
            </div>
            <!-- 当前票数 -->
            <div class="current-ticket-num border-1">
              <div class="num-now"> {{ $t('activity_lottery_current_ticket') }} {{ balance.available | round(2) }} IX </div>
              <div class="input-ix-num pl-20">
                <input
                  type="number"
                  min="0"
                  step="100"
                  :max="balance.available"
                  @input="valueChanged"
                  @blur="checkValue"
                  :placeholder="$t('activity_lottery_limit_ix')"
                  v-model="amount"
                  class="input pl-20 border-1"> IX
              </div>
            </div>

            <!-- bid 按钮 -->
            <div class="bids-buttons">
              <span
                class="btn rise"
                @click.prevent="buy('rise')"
                :class="{disabled: disabled}"> {{ $t('activity_lottery_buy_rise') }} </span>
              <span
                class="btn fall"
                @click.prevent="buy('fall')"
                :class="{disabled: disabled}"> {{ $t('activity_lottery_buy_fall') }} </span>
              <span
                class="btn flat"
                @click.prevent="buy('flat')"
                :class="{disabled: disabled}"> {{ $t('activity_lottery_buy_flat') }} </span>
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
            <p
              class="rule"
              v-if="destoryAddress"> {{ $t('activity_lottery_cancel_ix') }}
              <a
                class="normal line-1"
                :href="destoryAddress"
                target="_blank">{{ destoryAddress }}</a></p>
            <p class="rule"> {{ $t('activity_explaination_ix') }} </p>
          </div>
        </div>
      </div>

      <!-- 最下面一行 -->
      <div
        class="bids-history"
        v-if="myHistory && myHistory.length">
        <div class="box-head">
          <div class="head__stick"/>
          <div class="head_text">
            <span>{{ $t('activity_lottery_bid_history') }}</span>
          </div>
        </div>
        <div class="history__table border-1">
          <div class="box-table">
            <div class="box-table-th box-title">
              <span class="th_td game_id">{{ $t('activity_lottery_issue_no') }}</span>
              <span class="th_td amount">{{ $t('activity_lottery_amount') }}</span>
              <span class="th_td dir">{{ $t('activity_lottery_bid_direction') }}</span>
              <span class="th_td win">{{ $t('activity_lottery_settle') }}</span>
              <span class="th_td result">{{ $t('activity_lottery_result') }}</span>
            </div>
            <div
              class="box-table-tr"
              :class="[getMyStatusLableClass(item)]"
              :key="index"
              v-for="(item,index) in myHistory">
              <span class="th_td game_id">{{ item.game_id }}{{ $t('activity_lottery_serial') }}</span>
              <span class="th_td amount">{{ getMyAmount(item) | round(2) | thousand }} IX</span>
              <span class="th_td dir"><status-lable :item="item"/></span>
              <span class="th_td win">{{ item.win_amount | round(2) | thousand }} IX</span>
              <span class="th_td result">{{ $t('activity_result_'+item.result) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {state, actions} from '@/modules/store'
import service from '@/modules/service'
import statusLable from './statusLable'
import utils from '@/modules/utils'

const MIN_AMOUNT_UNIT = 100

export default {
  data () {
    return {
      state,
      currency: 'USDT',
      product: 'BTC',
      timer: null,
      history: [],
      amount: '',
      current: {},
      gameOverTimeArr: [['0', '0'], ['0', '0'], ['0', '0']],
      betOverTimeArr: [['0', '0'], ['0', '0'], ['0', '0']],
      myHistory: [],
      game_id: '',
      loopTimer: 0,
      balance: {
        available: 0
      }
    }
  },
  components: {
    statusLable
  },
  computed: {
    isLogin () {
      if (this.state.userInfo) {
        return true
      }
      return false
    },
    disabled () {
      return this.isLogin && !this.amount
    },
    betCountDownFormat () {
      return this.betOverTimeArr.map(time => {
        return time.join('')
      }).join(':')
    },
    destoryAddress () {
      if (this.history && this.history.length) {
        return this.history[0].destroy_record
      }
      return ''
    }
  },
  methods: {
    getMyStatusLableClass (item) {
      if (item.bet1_amount) return 'rise'
      if (item.bet2_amount) return 'flat'
      if (item.bet3_amount) return 'fall'
      return 0
    },
    getMyAmount (item) {
      return (item.bet1_amount || 0) + (item.bet2_amount || 0) + (item.bet3_amount || 0)
    },
    countdownGameOver () {
      let now = new Date().getTime()
      let ts = Math.floor(((this.current.gameover_time || now) - now) / 1000)
      if (ts < 0) {
        let time = '00'
        this.gameOverTimeArr = [time.split(''), time.split(''), time.split('')]
        return
      }
      let s = (ts % 60)
      let h = Math.floor(ts / (60 * 60))
      let m = Math.floor((ts - h * 60 * 60) / 60)
      s = s.toString().padStart(2, '0').split('')
      h = h.toString().padStart(2, '0').split('')
      m = m.toString().padStart(2, '0').split('')
      this.gameOverTimeArr = [h, m, s]
    },
    countdownBetOver () {
      let now = new Date().getTime()
      let ts = Math.floor(((this.current.betover_time || now) - now) / 1000)
      if (ts < 0) {
        let time = '00'
        this.betOverTimeArr = [time.split(''), time.split(''), time.split('')]
        return
      }
      let s = (ts % 60)
      let h = Math.floor(ts / (60 * 60))
      let m = Math.floor((ts - h * 60 * 60) / 60)
      s = s.toString().padStart(2, '0').split('')
      h = h.toString().padStart(2, '0').split('')
      m = m.toString().padStart(2, '0').split('')
      this.betOverTimeArr = [h, m, s]
    },

    valueChanged () {
      let value = parseInt(this.amount, 10) || 0
      if (value < 0) {
        value = 0
        this.amount = value
      }
      if (this.$big(value).gt(this.balance.available)) {
        value = this.$big(this.balance.available).div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT)
        this.amount = value
      }
    },
    checkValue () {
      let value = parseInt(this.amount, 10) || 0
      if (value % MIN_AMOUNT_UNIT !== 0) {
        value = ((value / MIN_AMOUNT_UNIT).toFixed(0) + 1) * MIN_AMOUNT_UNIT
        this.amount = value
      }
      if (this.$big(value).gt(this.balance.available)) {
        value = this.$big(this.balance.available).div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT)
        this.amount = value
      }
    },
    async fetchMyBalance () {
      let res = await service.getIxBalance()
      if (!res.code) {
        this.balance = res.data
      }
    },
    async fetchMyHistory () {
      let res = await service.getGuessMine()
      if (!res.code) {
        this.myHistory = res.data
      }
    },
    async buy (type) {
      if (!this.isLogin) {
        actions.setLoginBack({
          fullPath: this.$route.fullPath
        })
        this.$router.push({
          name: 'login'
        })
      }
      if (this.$big(this.amount).lte(0)) {
        return
      }

      let params = {
      }
      switch (type) {
        case 'rise':
          params.bet1_amount = this.amount
          break
        case 'fall':
          params.bet3_amount = this.amount
          break
        case 'flat':
          params.bet2_amount = this.amount
          break
      }
      let res = await service.doGuess(params)
      if (!res.code) {
        utils.success(this.$t('activity_bet_success'))
        this.amount = ''
        this.fetch()
      } else {
        utils.alert(res.message)
      }
    },
    fetchCurrent () {
      service.getGuessCurrent().then(resp => {
        if (!resp.code) {
          let current = resp.data
          if (current) {
            let total = this.$big(current.bet1_amount).plus(current.bet2_amount).plus(current.bet3_amount)
            let bet1Rate = this.$big(current.bet1_amount).div(total).times(100).round(2).toString()
            let bet2Rate = this.$big(current.bet2_amount).div(total).times(100).round(2).toString()
            let bet3Rate = this.$big(current.bet3_amount).div(total).times(100).round(2).toString()
            current = Object.assign(current, {
              bet1Rate, bet2Rate, bet3Rate
            })
          }
          if (this.game_id && this.game_id !== current.game_id) {
            console.log('new match')
            // location.reload()
          }
          this.game_id = current.game_id
          this.current = current
        }
        return resp
      })
    },
    fetchHistory () {
      service.getGuessHistory().then(resp => {
        if (!resp.code) {
          this.history = resp.data
        }
        return resp
      })
    },
    async fetch () {
      if (this.isLogin) {
        this.fetchMyBalance()
        this.fetchMyHistory()
      }
      await Promise.all([this.fetchCurrent(), this.fetchHistory()])
    }
  },
  async created () {
    await actions.updateSession()

    this.timer = setInterval(() => {
      this.countdownGameOver()
      this.countdownBetOver()
    }, 1000)
    this.fetch()
    this.loopTimer = setInterval(() => {
      this.fetch()
    }, 30e3)
  },
  destroyed () {
    clearInterval(this.timer)
    clearInterval(this.loopTimer)
  }
}
</script>
<style lang="scss" scoped>
@import './lottery.scss';
</style>
