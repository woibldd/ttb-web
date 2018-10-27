<template>
  <div class="lottery-container">
    <div class="banner"/>
    <div class="body">
      <div class="lottery_row flex">
        <!-- 竞猜BTC/USDT -->
        <div class="lottery-box bet_btc_usdt">
          <div class="box__title pr-20">
            <div class="title-tile"> <icon
              name="lottery-quiz"
              class="pr-12"/> {{ $t('activity_lottery_quiz') }} BTC/USDT</div>
            <div class="text"> {{ $t('activity_lottery_last_bonus') }} {{ lastBetData.pool }} IX</div>
          </div>
          <div class="box__content pb-29 mt-17">
            <div class="quiz-current-info pl-20 pr-14">
              <div class="coin">
                <icon
                  class="icon-coin"
                  name="lottery-btc"/>
                <div class="ml-13">
                  <p class="mb-15 f18">BTC</p>
                  <p class="f12 c-999">{{ $t('activity_lottery_ix_beting') }}</p>
                </div>
              </div>
              <div class="price flex-column">
                <div class="f18 mb-15">{{ current.open_price }} <span class="c-999">USDT</span></div>
                <div
                  class="f12 c-999 relative pointer open-modal"
                >
                  {{ $t('activity_lottery_opening_price') }} <icon
                    name="lottery-info"
                    class="ml-6"/>
                  <div
                    class="opening-price-modal flex"
                  >
                    <div class="modal__left">
                      <p class="mb-22"> {{ $t('activity_lottery_opening_price') }} </p>
                      <p class="mb-22"> {{ $t('activity_lottery_close_price') }} </p>
                    </div>
                    <div class="modal__right">
                      <div class="flex mb-30">
                        <div class="trading-office-box">
                          <p class="office-name">IX</p>
                          <p class="btc-price bb1 ">{{ openingPriceGroups4Btc.ix_open_price }}</p>
                          <p class="btc-price">{{ openingPriceGroups4Btc.ix_close_price }}</p>
                        </div>
                        <div class="trading-office-box">
                          <p class="office-name">Binance</p>
                          <p class="btc-price bb1 ">{{ openingPriceGroups4Btc.binance_open_price }}</p>
                          <p class="btc-price">{{ openingPriceGroups4Btc.binance_close_price }}</p>
                        </div>
                        <div class="trading-office-box">
                          <p class="office-name">OKEx</p>
                          <p class="btc-price bb1 ">{{ openingPriceGroups4Btc.ok_open_price }}</p>
                          <p class="btc-price">{{ openingPriceGroups4Btc.ok_close_price }}</p>
                        </div>
                        <div class="trading-office-box">
                          <p class="office-name">OKEx</p>
                          <p class="btc-price bb1 ">{{ openingPriceGroups4Btc.huobi_open_price }}</p>
                          <p class="btc-price">{{ openingPriceGroups4Btc.huobi_close_price }}</p>
                        </div>
                        <div class="trading-office-box">
                          <p class="office-name">Bitfinex</p>
                          <p class="btc-price bb1 ">{{ openingPriceGroups4Btc.bitfinex_open_price }}</p>
                          <p class="btc-price">{{ openingPriceGroups4Btc.bitfinex_close_price }}</p>
                        </div>
                      </div>
                      <div>
                        {{ $t('activity_lottery_trade_office_price') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="count-down">
                <div class="c-primary f18 mb-15">{{ $t('activity_lottery_count_down') }}:  {{ gameOverTime }}</div>
                <div class="time-range f12 c-999">{{ timeRange }}</div>
              </div>
            </div>
            <div class="quiz-operation">
              <div class="quiz-operation-wrapper">
                <div class="operate-table-head c-999 f14">
                  <div class="head-item">{{ $t('activity_lottery_betting_rise') }}</div>
                  <div class="head-item">{{ $t('activity_lottery_win_rate') }}</div>
                  <div class="head-item">{{ $t('activity_lottery_self_vote') }}</div>
                </div>
                <div class="quiz-choice-strip f14">
                  <div class="strip__item quiz__note up">{{ $t('activity_lottery_rise') }}</div>
                  <div class="strip__item up">{{ current.bet1_amount }} IX</div>
                  <div class="strip__item">{{ current.bet1Rate }}</div>
                  <div class="strip__item">--</div>
                  <div
                    class="proportion up"
                    :style="{width: current.bet1Rate + '%'}"/>
                </div>
                <div class="quiz-choice-strip f14">
                  <div class="strip__item quiz__note flat">{{ $t('activity_lottery_flat') }}</div>
                  <div class="strip__item flat">{{ current.bet2_amount }} IX</div>
                  <div class="strip__item">{{ current.bet2Rate }}</div>
                  <div class="strip__item">--</div>
                  <div
                    class="proportion flat"
                    :style="{width: current.bet2Rate + '%'}"/>
                </div>
                <div class="quiz-choice-strip f14">
                  <div class="strip__item quiz__note fall">{{ $t('activity_lottery_fall') }}</div>
                  <div class="strip__item fall">{{ current.bet3_amount }} IX</div>
                  <div class="strip__item">{{ current.bet3Rate }}</div>
                  <div class="strip__item">--</div>
                  <div
                    class="proportion fall"
                    :style="{width: current.bet3Rate + '%'}"/>
                </div>
              </div>
              <div class="quiz-input-num mt-20 f14">
                <div class="c-999 w-64">{{ $t('amount') }}</div>
                <input
                  type="number"
                  v-model="amount"
                  min="50"
                  step="10"
                  :max="balance.available"
                  @input="valueChanged"
                  @blur="checkValue"
                  class="input"
                  :placeholder="$t('activity_lottery_limit_vote_fifty')">
              </div>
              <div class="quiz-btns pointer">
                <div
                  class="quiz__btn up"
                  @click.prevent="buy('rise')"
                  :class="{disabled: disabled}">{{ $t('activity_lottery_guess_rise') }}</div>
                <div
                  class="quiz__btn flat"
                  @click.prevent="buy('fall')"
                  :class="{disabled: disabled}">{{ $t('activity_lottery_guess_flat') }}</div>
                <div
                  class="quiz__btn fall"
                  @click.prevent="buy('flat')"
                  :class="{disabled: disabled}">{{ $t('activity_lottery_guess_fall') }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="first-row-right">
          <!-- 上期冠军名单 -->
          <div class="lottery-box mb-12 box-last-champion">
            <div class="box__title pr-20">
              <div class="title-tile"> <icon
                name="lottery-quiz"
                class="pr-12"/> {{ $t('activity_lottery_last_champion') }} </div>
            </div>
            <div class="box__content mt-17 f12">
              <div class="last-champion__info border-bottom-1">
                <div class="uid flex-column">
                  <p class="f14 mb-10">63617673</p>
                  <p class="c-999">{{ $t('activity_lottery_champion_uid') }} </p>
                </div>
                <div class="reward_num flex-column">
                  <p class="f14 c-b18 mb-10">63617673</p>
                  <p class="c-999">{{ $t('activity_lottery_reward_amount') }} </p>
                </div>
                <div class="votes_num flex-column">
                  <p class="f14 mb-10">63617673IX</p>
                  <p class="c-999">{{ $t('activity_lottery_vote_amount') }} </p>
                </div>
              </div>
              <div class="last-champion__info border-bottom-1">
                <div class="uid flex-column">
                  <p class="f14 mb-10"/>
                  <!-- 伯乐不显示uid -->
                  <p class="c-999">{{ $t('activity_lottery_bole') }} </p>
                </div>
                <div class="reward_num flex-column">
                  <p class="f14 c-b18 mb-10">{{ lastBetData.invite_ix }}</p>
                  <p class="c-999">{{ $t('activity_lottery_reward_amount') }} </p>
                </div>
                <div class="votes_num flex-column">
                  <p class="f14 mb-10">{{ lastBetData.invite_bet_ix }}</p>
                  <p class="c-999">{{ $t('activity_lottery_vote_amount') }} </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 邀请 -->
          <div class="invite-cambat">
            <div
              @click="invite"
              class="invite-btn pointer">{{ $t('activity_kyc_invite_now') }}</div>
          </div>

          <!-- 本期排行榜 -->
          <div class="box-rank lottery-box mt-30">
            <div class="box__title pr-20">
              <div class="title-tile"> <icon
                name="lottery-ranking"
                class="pr-12"/> {{ $t('activity_lottery_current_rank') }}</div>
            </div>
            <div class="box__content mt-17 f12 pl-22 pb-16">
              <div class="lottery__table">
                <div class="table__row">
                  <div class="table__th"> {{ $t('activity_lottery_position') }} </div>
                  <div class="table__th"> {{ 'UID' }} </div>
                  <div class="table__th align-right"> {{ $t('activity_lottery_vote_amount') }} </div>
                </div>
                <div
                  class="table__row mt-18"
                  v-for="(item,index) in current.bet_rank"
                  :key="index">
                  <div class="table__td"><p class="circle">{{ index + 1 }}</p></div>
                  <div class="table__td">{{ item.uid }}</div>
                  <div class="table__td align-right"> {{ item.ix }} IX</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- 投票记录 -->
      <div
        class="lottery_row history"
        v-if="isLogin">
        <div class="box__title pr-20">
          <div class="title-tile"> <icon
            name="lottery-record"
            class="pr-12"/> {{ $t('activity_lottery_vote_history') }} </div>
        </div>
        <div class="box__content pb-29 mt-17">
          <div class="lottery__table">
            <div class="table__row">
              <div class="table__th"> {{ $t('activity_lottery_issue_no') }} </div>
              <div class="table__th"> {{ $t('activity_lottery_amount') }} </div>
              <div class="table__th"> {{ $t('activity_lottery_bid_direction') }} </div>
              <div class="table__th"> {{ $t('activity_lottery_settle') }} </div>
              <div class="table__th align-right"> {{ $t('activity_lottery_result') }} </div>
            </div>
            <div
              class="table__row mt-18"
              :class="[getMyStatusLableClass(item)]"
              v-for="(item,index) in myHistory"
              :key="index">
              <span class="table__td game_id">{{ item.game_id }}{{ $t('activity_lottery_serial') }}</span>
              <span class="table__td amount">{{ getMyAmount(item) | round(2) | thousand }} IX</span>
              <span class="table__td dir"><status-lable :item="item"/></span>
              <span class="table__td win">{{ item.win_amount | round(2) | thousand }} IX</span>
              <span class="table__td result align-right">{{ $t('activity_result_'+item.result) }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 活动规则 -->
      <div class="lottery_row">
        <div class="box__title pr-20">
          <div class="title-tile"> <icon
            name="lottery-rule"
            class="pr-12"/> {{ $t('activity_lottery_rules') }} </div>
        </div>
        <div class="box__content rule-content mt-17 f12 c-999">
          <p class="rule"> {{ $t('activity_lottery_rules_a') }} </p>
          <p class="rule"> {{ $t('activity_lottery_rules_b') }} </p>
          <p class="rule"> {{ $t('activity_lottery_rules_c') }} </p>
          <p class="rule"> {{ $t('activity_lottery_rules_d') }} </p>
          <p class="rule"> {{ $t('activity_lottery_rules_e') }} </p>
          <p class="rule"> {{ $t('activity_lottery_rules_f') }} </p>
          <p class="rule"> {{ $t('activity_lottery_rules_g') }} </p>
          <p class="rule"> {{ $t('activity_lottery_rules_h') }} </p>
          <p class="rule"> {{ $t('activity_lottery_rules_i') }} </p>
        </div>
      </div>
      <!-- 最终解释权 -->
      <div
        class="lottery_row f-12"
        style="color: #666;padding-left: 32px">
        {{ $t('activity_explaination_ix') }}
      </div>
    </div>
</div></template>
<script>
import {state, actions} from '@/modules/store'
import service from '@/modules/service'
import statusLable from './statusLable'
import utils from '@/modules/utils'

const MIN_AMOUNT_UNIT = 50
const INCREASE_AMOUNT_UNIT = 10
const GAME_INTERVAL = 60 * 60 * 1000

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
      lastBetData: {},
      gameOverTime: '',
      myHistory: [],
      game_id: '',
      loopTimer: 0,
      balance: {
        available: 0
      },
      openingPriceGroups4Btc: {}
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
    destoryAddress () {
      if (this.history && this.history.length) {
        return this.history[0].destroy_record
      }
      return ''
    },
    timeRange () {
      let start = this.current.gameover_time - GAME_INTERVAL
      let end = this.current.gameover_time
      return `${utils.dateFormatter(start, 'H:m')}-${utils.dateFormatter(end, 'H:m')}`
    }
  },
  methods: {
    invite () {
      if (!this.isLogin) {
        actions.setLoginBack({
          fullPath: this.$route.fullPath
        })
      }
      this.$router.push({
        name: 'invite'
      })
    },
    getMyStatusLableClass (item) {
      switch (item.result) {
        case 1:
          return 'rise'
        case 2:
          return 'flat'
        case 3:
          return 'fall'
      }
    },
    getMyAmount (item) {
      return (item.bet1_amount || 0) + (item.bet2_amount || 0) + (item.bet3_amount || 0)
    },
    countdownGameOver () {
      let now = new Date().getTime()
      let ts = Math.floor(((this.current.gameover_time || now) - now) / 1000)
      if (ts < 0) {
        this.gameOverTime = '00:00'
        return
      }
      let s = (ts % 60)
      // let h = Math.floor(ts / (60 * 60))
      let m = Math.floor((ts) / 60)
      s = s.toString().padStart(2, '0')
      // h = h.toString().padStart(2, '0').split('')
      m = m.toString().padStart(2, '0')
      this.gameOverTime = m + ':' + s
    },
    valueChanged () {
      let value = parseInt(this.amount, 10) || 0
      // 不做最小值判断，否则用户无法输入,失去焦点时再去纠正用户输入
      if (value < 0) {
        value = 0
        this.amount = value
      }
      // 超过可用余额， 给接近最大值，最值还超 给0
      if (this.$big(value).gt(this.balance.available)) {
        // 余额不足最小值，给0
        if (this.$big(this.balance.available) <= MIN_AMOUNT_UNIT) {
          value = 0
        } else {
          value = this.$big(this.balance.available).div(INCREASE_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(INCREASE_AMOUNT_UNIT)
        }
        this.amount = value
      }
    },
    checkValue () {
      let value = parseInt(this.amount, 10) || 0
      if (value < MIN_AMOUNT_UNIT) {
        value = MIN_AMOUNT_UNIT
        this.amount = value
      }
      if (value % INCREASE_AMOUNT_UNIT !== 0) {
        value = (Math.floor(value / INCREASE_AMOUNT_UNIT) + 1) * INCREASE_AMOUNT_UNIT
        this.amount = value
      }
      if (this.$big(value).gt(this.balance.available)) {
        if (this.$big(this.balance.available) <= MIN_AMOUNT_UNIT) {
          value = 0
        } else {
          value = this.$big(this.balance.available).div(INCREASE_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(INCREASE_AMOUNT_UNIT)
        }
        this.amount = value
      }
    },
    async getAllPlatformBtcPrice () {
      let res = await service.getAllPlatformBtcPrice()
      if (!res.code) {
        this.openingPriceGroups4Btc = res.data
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

      utils.confirm(this, {
        title: this.$i18n.t('activity_lottery_warm_tips'),
        content: this.$i18n.t('activity_lottery_warm_content'),
        center: true,
        customClass: 'lottery-prompt'
      }).then(async (result) => {
        if (!result) {
          return
        }
        let params = {
          game_id: this.game_id,
          amount: this.amount
        }
        switch (type) {
          case 'rise':
            params.type = 1
            break
          case 'fall':
            params.type = 3
            break
          case 'flat':
            params.type = 2
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
      })

    //   let params = {
    //     game_id: this.game_id
    //   }
    //   switch (type) {
    //     case 'rise':
    //       params.bet1_amount = this.amount
    //       break
    //     case 'fall':
    //       params.bet3_amount = this.amount
    //       break
    //     case 'flat':
    //       params.bet2_amount = this.amount
    //       break
    //   }
    //   let res = await service.doGuess(params)
    //   if (!res.code) {
    //     utils.success(this.$t('activity_bet_success'))
    //     this.amount = ''
    //     this.fetch()
    //   } else {
    //     utils.alert(res.message)
    //   }
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
    fetchLastBet () {
      service.getGuessLast().then(resp => {
        if (!resp.code) {
          this.lastBetData = resp.data
        }
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

    this.fetchLastBet()
    this.getAllPlatformBtcPrice()

    this.timer = setInterval(() => {
      this.countdownGameOver()
      // this.countdownBetOver()
    }, 1000)
    this.fetch()
    this.loopTimer = setInterval(() => {
      this.fetch()
    }, 30e3)
  }
}
</script>
<style lang="scss">
@import './lottery-new.scss';
</style>
