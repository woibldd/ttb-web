<template>
  <div class="pairs-table"> 
      <div class="pairs-table__head">
        <div class="head-item percent9">
          {{ $t('currency') }}
        </div>
        <div class="head-item percent18_8">
          {{ $t('homechart_price') }}
        </div>
        <div class="head-item percent14_8">
          {{ $t('homechart_24h_chg') }}
        </div>
        <div class="head-item percent14_8">
          {{ $t('homechart_24h_l') }}
        </div>
        <div class="head-item percent14_8">
          {{ $t('homechart_24h_h') }}
        </div>
        <div class="head-item percent14_8">
          {{ $t('homechart_24h_v') }}
        </div>
        <div class="head-item percent8">
          {{ $t('actions') }}
        </div>
      </div>
      <div
        class="pairs-table__row c-21"
        v-for="(pair,index) in sortedList"
        @click="toExchange(pair.name)"
        v-if="pair.tick"
        :key="index">
        <div class="row__item percent9">
          {{ pair.name | pairfix }}
        </div>
        <div class="row__item percent18_8 newest_price">
          <span class="ml-10 inline-block c-999">{{ state.fiatMoneySymbol }}<fiat-money
            :base="pair.currency"
            :value="pair.tick.current"/>
          </span>
          {{ pair.tick.current | fixed(pair.price_scale) }}
        </div>
        <div
          class="row__item percent14_8 c-f24"
          :class="{'color-up': getDelta(pair.tick) > 0, 'color-down': getDelta(pair.tick) < 0}">
          <p v-if="pair.tick">{{ (getDelta(pair.tick) > 0) ? '+' : '' }}{{ getDelta(pair.tick) }}%
          </p>
          <p v-else>...</p>

        </div>
        <div class="row__item percent14_8">
          {{ pair.tick.lowest_24h | fixed(pair.price_scale) }}
        </div>
        <div class="row__item percent14_8">
          {{ pair.tick.highest_24h | fixed(pair.price_scale) }}
        </div>
        <div class="row__item percent14_8">
          {{ pretty(pair.tick.volume_24h) }}<span> {{ pair.product }}</span>
        </div>
        <div
          class="row__item percent8 tg"
          @click="toExchange(pair.name)">
          <icon name="handle"/>
        </div>
      </div> 
    </div>
</template>

<script>
import {state} from '@/modules/store'
import { pairfix } from '@/mixins/index'
export default {
  mixins: [pairfix],
  data () {
    return {
      state,
      searchCoin: '', 
      activeName: 'first'
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
      this.$emit('searching', this.search)
    }, 
  },
  created() {
    console.log('test')
  }
}
</script>


<style lang="scss" scoped>
@import './pair-table.scss'
</style>

