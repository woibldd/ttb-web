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
              class="pr-12"/> 竞猜BTC/USDT</div>
            <div class="text">上期奖励：63,6176,455 ix</div>
          </div>
          <div class="box__content pb-29 mt-17">
            <div class="quiz-current-info pl-20 pr-14">
              <div class="coin">
                <icon
                  class="icon-coin"
                  name="lottery-btc"/>
                <div class="ml-13">
                  <p class="mb-15 f18">BTC</p>
                  <p class="f12 c-999">IX投注</p>
                </div>
              </div>
              <div class="price flex-column">
                <div class="f18 mb-15">{{ 6916.6 }} <span class="c-999">USDT</span></div>
                <div class="f12 c-999">
                  开盘价 <icon
                    name="lottery-info"
                    class="ml-6"/>
                </div>
              </div>
              <div class="count-down">
                <div class="c-primary f18 mb-15">本期倒计时:  05:34</div>
                <div class="f12 c-999">12:00-13:00</div>
              </div>
            </div>
            <div class="quiz-operation">
              <div class="quiz-operation-wrapper">
                <div class="operate-table-head c-999 f14">
                  <div class="head-item">猜涨票数</div>
                  <div class="head-item">获奖比例</div>
                  <div class="head-item">个人投票</div>
                </div>
                <div class="quiz-choice-strip f14">
                  <div class="strip__item quiz__note up">上涨</div>
                  <div class="strip__item up">800,000ix</div>
                  <div class="strip__item">1:6</div>
                  <div class="strip__item">--</div>
                  <div
                    class="proportion up"
                    style="width: 80%"/>
                </div>
                <div class="quiz-choice-strip f14">
                  <div class="strip__item quiz__note flat">平</div>
                  <div class="strip__item flat">800,000ix</div>
                  <div class="strip__item">1:6</div>
                  <div class="strip__item">--</div>
                  <div
                    class="proportion flat"
                    style="width: 20%"/>
                </div>
                <div class="quiz-choice-strip f14">
                  <div class="strip__item quiz__note fall">下跌</div>
                  <div class="strip__item fall">800,000ix</div>
                  <div class="strip__item">1:6</div>
                  <div class="strip__item">--</div>
                  <div
                    class="proportion fall"
                    style="width: 40%"/>
                </div>
              </div>
              <div class="quiz-input-num mt-20 f14">
                <div class="c-999 w-64">数量</div>
                <input
                  type="text"
                  placeholder="投票数量为≥50的整数">
              </div>
              <div class="quiz-btns pointer">
                <div class="quiz__btn up">猜涨</div>
                <div class="quiz__btn flat">猜ping</div>
                <div class="quiz__btn fall">fall</div>
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
                class="pr-12"/> 上期冠军名单</div>
            </div>
            <div class="box__content mt-17 f12">
              <div class="last-champion__info border-bottom-1">
                <div class="uid flex-column">
                  <p class="f14 mb-10">63617673</p>
                  <p class="c-999">冠军奖用户(uid)</p>
                </div>
                <div class="reward_num flex-column">
                  <p class="f14 c-b18 mb-10">63617673</p>
                  <p class="c-999">冠军奖用户(uid)</p>
                </div>
                <div class="votes_num flex-column">
                  <p class="f14 mb-10">63617673IX</p>
                  <p class="c-999">冠军奖用户(uid)</p>
                </div>
              </div>
              <div class="last-champion__info">
                <div class="uid flex-column">
                  <p class="f14 mb-10">63617673</p>
                  <p class="c-999">冠军奖用户(uid)</p>
                </div>
                <div class="reward_num flex-column">
                  <p class="f14 c-b18 mb-10">63617673</p>
                  <p class="c-999">冠军奖用户(uid)</p>
                </div>
                <div class="votes_num flex-column">
                  <p class="f14 mb-10">63617673IX</p>
                  <p class="c-999">冠军奖用户(uid)</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 邀请 -->
          <div class="invite-cambat">
            <div class="invite-btn pointer">{{ $t('立即邀请') }}</div>
          </div>

          <!-- 本期排行榜 -->
          <div class="box-rank lottery-box mt-30">
            <div class="box__title pr-20">
              <div class="title-tile"> <icon
                name="lottery-ranking"
                class="pr-12"/> {{ $t('本期排行榜') }}</div>
            </div>
            <div class="box__content mt-17 f12 pl-22 pb-16">
              <div class="lottery__table">
                <div class="table__row">
                  <div class="table__th"> {{ $t('名次') }} </div>
                  <div class="table__th"> {{ $t('UID') }} </div>
                  <div class="table__th align-right"> {{ $t('投票票数') }} </div>
                </div>
                <div
                  class="table__row mt-18"
                  v-for="index in 3"
                  :key="index">
                  <div class="table__td"><p class="circle">1</p></div>
                  <div class="table__td">8654567</div>
                  <div class="table__td align-right">567567IX</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- 投票记录 -->
      <div class="lottery_row history">
        <div class="box__title pr-20">
          <div class="title-tile"> <icon
            name="lottery-record"
            class="pr-12"/> {{ $t('投票记录') }} </div>
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
              <span class="table__td result">{{ $t('activity_result_'+item.result) }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 活动规则 -->
      <div class="lottery_row">
        <div class="box__title pr-20">
          <div class="title-tile"> <icon
            name="lottery-rule"
            class="pr-12"/> {{ $t('活动规则') }} </div>
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
    </div>
</div></template>
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
        game_id: this.game_id
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
  }
}
</script>
<style lang="scss" scoped>
@import './lottery-new.scss';
</style>
