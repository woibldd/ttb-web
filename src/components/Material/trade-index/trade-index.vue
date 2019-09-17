<template>
  <div class="trade-index-container material-container">
    <div class="title-box">
      <div>{{ symbol }}: {{ $t('contract_symbol_detail') }}</div>
    </div>
    <div class="material__content">
      <div class="mt-29 mb-30">
        <p class="mb-15 c-primary f26">{{ symbol }}</p>
        <p class="flex-avg">
          <span>{{ $t('contract_trade_index_base',{currency: 'BTC'} ) }}</span>
          <span>{{ $t('contract_trade_index_value') }}</span>
        </p>
      </div>
      <div class="sub-title mb-30">
        {{ symbol }} {{ $t('contract_how_price') }}
      </div>
      <div class="tips-section mb-21">
        <p
          class="mb-26"
          v-html=" $t('contract_how_price_tip_a', {'symbol': symbol, coin: coin, 'value': value})"/>
        <p class="mb-26">{{ $t('contract_how_price_tip_b', {next_pay_time: nextPayTime}) }}</p> 
        <p
          class="mb-26"
          v-html=" $t('contract_how_price_tip_c', {'symbol': symbol, id1: $t('contract_base_rate'),id2: $t('contract_cal_rate'),id3: $t('contract_over_price'),})"/>
        <p class="mb-26">{{ $t('contract_how_price_tip_d', {feerate: ($big(feeRate).round(4, 0)), next_pay_time:nextPayTime}) }}</p>
        <p>{{ $t('contract_how_price_tip_e') }}</p>
      </div>
      <!-- 查看btc永续指南 -->
      <a
        class="look-tutorial pointer"
        target="_blank"
        :href="tutorialUrl">
        <div class="icon-wrapper mr-16">
        <span class="icon icon-ques"/><span/></div><span>{{ $t('contract_look_tutorial', {currency: coin}) }}</span>
      </a>

      <div class="index-chart-wrapper">
        <div class="button-wrapper">
          <button
            @click="switchChart('index')"
            :class="{'active': chartType === 'index'}">{{ $t('contract_index_price') }}</button>
          <button
            @click="switchChart('market')"
            :class="{'active': chartType === 'market'}">{{ $t('contract_convin_price') }}</button>
        </div>

        <TradingView
          :pair="tempPair"
          ref="TradingView"
        />
      </div>
      <div class="sub-title mb-30 ">
        {{ $t('contract_fee_formula') }}
      </div>
      <p
        class="third-title mb-26"
        v-html="$t('contract_refer_tu')"/>

      <div class="like-table mb-27 c-666">
        <div class="table__tr bb-1">
          <div class="table__td br-1 first"/>
          <div class="table__td br-1">{{ $t('contract_base_rate') }}</div>
          <div class="table__td br-1">{{ $t('contract_cal_rate') }}</div>
          <div class="table__td br-1">{{ $t('contract_over_price') }}</div>
        </div>
        <div class="table__tr bb-1">
          <div class="table__td br-1 first">{{ $t('contract_tb_symbol') }}</div>
          <div class="table__td br-1">{{ $t('contract_btc_bon8h') }}</div>
          <div class="table__td br-1">{{ $t('contract_usdt_bon8h') }}</div>
          <div class="table__td">{{ $t('contract_over_us') }}</div>
        </div>
        <div class="table__tr">
          <div class="table__td br-1 first">{{ $t('contract_tb_rate') }}</div>
          <div class="table__td br-1">{{ '0.03%' }}</div>
          <div class="table__td br-1">{{ '0.06%' }}</div>
          <div class="table__td">{{ '-1.7021%' }}</div>
        </div>
      </div>

      <p class="note-back mb-24">
        {{ $t('contract_fee_formula_note') }}
      </p>
      <div class="note-explain">
        <p v-html="$t('contract_note_ex_a')"/>
        <p v-html="$t('contract_note_ex_b')"/>
      </div>
      <div class="bottom-row">
        <div class="col">
          <div class="label">{{ $t('contract_label_formula') }}</div>
          <div class="note-back">
            <p>{{ $t('contract_label_formula_a') }}</p>
            <p>{{ $t('contract_label_formula_b') }}</p>
          </div>
        </div>
        <div class="col ml-29 flex1">
          <div class="label">{{ $t('contract_label_result') }}</div>
          <div class="note-back">
            <p class="flex">{{ $t('contract_label_result_a') }} <span>I = 0.0100%</span></p>
             <p class="flex">{{ $t('contract_label_result_b',{premium}) }} <span>F = {{feeRate | fixed(8)}}%</span></p>
          </div> 
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import ixPagination from '@/components/common/ix-pagination'
import TradingView from '../contract-trading-view'
import service from '@/modules/service'
import utils from '@/modules/utils'
import Big from "big.js";

export default {
  components: {ixPagination, TradingView},
  data () {
    return {
      page: 1,
      account: 'all',
      pair: 'FUTURE_BTCUSD',
      tempPair: 'FUTURE_BTCUSD',
      chartType: 'index',
      symbolInfo: {
        fee_rate: 0,
        next_fee_time: new Date().getTime(),
        mark_price: 0,
      },
      selectPair: {}
    }
  },
  watch: {
    '$route.params.pair': {
      async handler (pair = '', last) {
        const match = pair.match(/^([A-Za-z]*)_([A-Za-z]*)$/)
        if (match) {
          this.pair = pair
          this.tempPair = this._formatPair('index')

          let res = await service.getContractSymInfo({
            symbol: this.pair
          })
          if (!res.code) {
            Object.assign(this.symbolInfo, res.data)
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    symbol () {
      return this.$t('FUTURE_&USD', {currency: this.pair.replace('FUTURE_','').replace('USD','')} )
      // switch (this.$route.params.pair) {
      //   case 'xx':
      //     return ''
      //   default:
      //     return this.$t('contract_btc_forever')
      // }
    }, 
    coin () {
      // return this.$t('coin_' + this.pair)
      return this.pair.replace('FUTURE_','').replace('USD','')
    },
    tutorialUrl () {
      if (this.pair === 'FUTURE_BTCUSD') {
        return 'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360027994431'
      }
      else if (this.pair === 'FUTURE_BHDUSD') {
        return 'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360030485092-BHD'
      }
      else if (this.pair === 'FUTURE_ETHUSD') {
        return 'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360031397811'
      }
      else {
        return ''
      }
    }, 
    value() { 
      if (this.pair === 'FUTURE_BTCUSD') {
        return '1 USD'
      }
      else if (this.symbolInfo.multiplier) { 
        return this.$big(this.symbolInfo.mark_price || 0).times(this.symbolInfo.multiplier)
      }
      else if (this.pair === 'FUTURE_BHDUSD') { 
        return this.$big(this.symbolInfo.mark_price || 0).times(this.symbolInfo.multiplier || 0.00001)
      }
      else if (this.pair === 'FUTURE_ETHUSD') {
        return this.$big(this.symbolInfo.mark_price || 0).times(this.symbolInfo.multiplier || 0.000001)
      }
      else {
        return '0'
      }
    },
    nextPayTime () {
      const date = Number(this.symbolInfo.next_fee_time) // + 8 * 60 * 60 * 1000// 前端加8小时
      return utils.dateFormatter(date, 'Y-M-D H:00:00')
    },
    feeRate () {
      return Math.abs(this.symbolInfo.fee_rate * 100)
    }, 
    premium() { 
      return this.$big(this.symbolInfo.premium_price || 0).mul(100).toString()
    } 
  },
  methods: {
    async getPairs () {
      await service.getContractSymList().then(res => {
        if (res && res.data) {
          let allPairs = res.data.items
          allPairs.map(e => {
            if (e.name === this.pair) {
              this.selectPair = e
            }
          })  
        }
      })
    },
    _formatPair (type = 'index') {
      return this.pair.replace('FUTURE', type.toUpperCase())
    },
    switchChart (type) {
      this.chartType = type
      this.tempPair = this._formatPair(type)
    },
    getPage () {
      console.log('next page')
    },
    jump (pair) {
      this.$router.push({
        name: 'TradeIndex',
        params: {
          pair
        }
      })
    },
     async refresh() { 
      try {
        let res = await service.getContractSymInfo({
          symbol: this.pair
        })
        if (!res.code) { 
          this.$set(this, "symbolInfo" , res.data)
        }
      } 
      catch (e) {
      }
    }
  },
  async created () {
    if (!this.$route.params.pair) {
      this.$router.replace({
        name: 'TradeIndex',
        params: {
          pair: this.pair
        }
      })
    }
    let $this = this
    setInterval(() => {
      $this.refresh()
    }, 5000); 
  }
}
</script>
<style lang="scss" scoped>
.c-primary {
    color: $primary;
}
.f26{
    font-size: 26px;
    text-align: center;
}
.flex-avg {
    display: flex;
    justify-content: center;
    > span {
        display: inline-block;
        margin-right: 17px;
        font-size: 14px;
        color: #999;
    }
}
.sub-title {
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 27px;
    border-bottom: 1px solid #CCCCCC;
}
.third-title {
    font-size: 14px;
    color: #333;
}

.look-tutorial{
    background:$primary;
    color: #fff;
    font-size: 16px;
    line-height: 16px;
    padding: 3px 29px 3px 0;
    width: fit-content;
    box-sizing: border-box;
    margin-bottom: 29px;
    display: flex;
    align-items: center;
    .icon-wrapper {
        height: 34px;
        width: 45px;
        border-right: 1px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.note-back {
    background-color: #F6FDFD;
    line-height: 16px;
    color: $primary;
    border: 1px solid #CCCCCC;
    padding: 12px 16px;
}
.note-explain {
    border-left: 2px solid #ccc;
    padding-left: 13px;
    margin-bottom: 40px;
}
.bottom-row {
    display: flex;
    .label {
        color: #333333;
        margin-bottom: 11px;
        font-weight: bold;
    }
    .note-back {
        font-size: 12px;
        padding: 6px 13px;
    }
    .flex1 {
        flex: 1
    }
    .flex{
        display: flex;
        justify-content: space-between;
    }

}
.trade-index-container {
    font-size: 14px;
    .like-table {
        width: 100%;
        border: 1px solid #ccc;
        margin-bottom: 38px;
        .table__tr {
            height: 40px;
            line-height: 40px;
            display: flex;
        }
        .table__td {
            flex: 1;
            text-align: center;
            &.first {
                width: 162px;
                flex: none;
            }
        }
        .bb-1{
            border-bottom: 1px solid #ccc;
        }
        .br-1 {
            border-right: 1px solid #ccc;
        }
    }
    .index-chart-wrapper {
        width: 100%;
        height: 466px;
        margin-bottom: 67px;

        .button-wrapper {
            border-radius: 6px 6px 0 0;
            overflow: hidden;
            width:fit-content;
        }
        button {
            width:90px;
            height:40px;
            background:rgba(220,248,236,1);
            color: $primary;
            border: 0;

            &.active {
                background-color: $primary;
                color: #fff;
            }

            &:focus {
                outline: none;
            }
        }

    }
}
.icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    vertical-align: text-top;
}
.icon-ques {
    background-image: url('../../../assets/contract/icon-ques.png')
}
</style>
