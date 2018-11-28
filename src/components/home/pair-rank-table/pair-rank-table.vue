<template>
  <div class="coin-list-section">
    <div
      @click="toExchange(pair.name)"
      class="coin-info-box pointer"
      v-for="(pair,index) in sortedList"
      :class="{'mr-13': index < 5}"
      :key="pair.name"
      v-if="pair.tick && index < 5"
    >
      <div class="coin__left">
        <div class="leftright f17 c-00 mb-10 bold">{{ pair.name | pairfix }}
          <div
            class="coin__right"
            :class="{'color-up': getDelta(pair.tick) > 0, 'color-down': getDelta(pair.tick) < 0}">
            {{ (getDelta(pair.tick) > 0) ? '+' : '' }}{{ getDelta(pair.tick) }}%
          </div>
        </div>
        <p
          class="f28 mb-6 bold"
          :class="{'color-up': getDelta(pair.tick) > 0, 'color-down': getDelta(pair.tick) < 0}">{{ pair.tick.current | fixed(pair.price_scale) }}</p>
        <p class="f13 c-8a mb-6">≈ {{ state.fiatMoneySymbol }}<fiat-money
          :base="pair.currency"
          :value="pair.tick.current"/></p>
        <p class="f13 c-b0 "><span class="inline-block mr-14">24H</span><span>{{ pretty(pair.tick.volume_24h) }}</span></p>
      </div>
    </div>
</div></template>
<script>
import {state} from '@/modules/store'
import { pairfix } from '@/mixins/index'
export default {
  mixins: [pairfix],
  data () {
    return {
      state,
      searchCoin: '',
      search: ''
    }
  },
  props: {
    sortedList: {
      type: Array,
      default () {
        return []
      }
    },
    getDelta: {
      type: Function,
      default () {
        return v => v
      }
    }

  },
  methods: {
    pretty (num) {
      num = this.$big(num || 0)
      if (num < 100) {
        return num.toFixed(2)
      }
      if (num < 1e6) {
        return num.toFixed(0)
      }
      if (num < 1e7) {
        return num.div(1e6).toFixed(1) + ' M'
      }
      if (num < 1e9) {
        return num.div(1e6).toFixed(0) + ' M'
      }
      if (num < 1e10) {
        return num.div(1e9).toFixed(1) + ' B'
      }
      return num.div(1e9).toFixed(0) + ' B'
    },
    toExchange (pair) {
      this.$router.push({
        name: 'trading',
        params: {
          pair: pair
        }
      })
    },
    filterPair () {
      this.sortBy = null
    }
  }
}
</script>
<style lang="scss" scoped>
.coin-list-section{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .coin-info-box {
        background-image: url('~@/assets/home/home-coin-bg1.png');
        background-position:0 100%;
        background-size: contain;
        background-repeat: no-repeat;
        width: 256px;
        height: 130px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 16px 22px;
        border: 1px solid #DCDCDC;
        line-height: 1;

        &:nth-child(1) {
          background-image: url('~@/assets/home/home-coin-bg2.png');
        }
        &:nth-child(2) {
          background-image: url('~@/assets/home/home-coin-bg3.png');
        }
        &:nth-child(3) {
          background-image: url('~@/assets/home/home-coin-bg4.png');
        }
        &:nth-child(4) {
          background-image: url('~@/assets/home/home-coin-bg1.png');
        }
        .coin__left {
          flex: 1;
          .leftright {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
        }
    }

}
</style>
