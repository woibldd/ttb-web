<template>
  <div class="newest-coin-pairs">
    <div class="flex">
      <div class="pair-title">{{ $t('newest_coin_pairs') }}</div>
      <div class="pairs-search">
        <div class="search-box">
          <input
            type="text"
            @keyup.enter="filterPair()"
            v-model="search">
          <icon
            class="ml-5"
            name="home-search"/>
        </div>
      </div>
    </div>
    <div class="pairs-table">
      <div class="pairs-table__head">
        <div class="head-item percent9">
          {{ $t('currency') }}
        </div>
        <div class="head-item percent14_8">
          {{ $t('homechart_price') }}
        </div>
        <div class="head-item percent18_8">
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
        v-if="pair.tick"
        :key="index">
        <div class="row__item percent9">
          {{ pair.product }} <span>/ {{ pair.currency }}</span>
        </div>
        <div class="row__item percent14_8">
          {{ pair.tick.current | fixed(pair.price_scale) }} <span class="ml-10 inline-block c-999">{{ state.fiatMoneySymbol }}<fiat-money
            :base="pair.currency"
            :value="pair.tick.current"/></span>
        </div>
        <div
          class="row__item percent18_8 c-f24"
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
          class="row__item percent8"
          @click="toExchange(pair.name)">
          <icon name="handle"/>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import './pair-table.scss'
import tickTableMixin from '@/mixins/tick-table'
export default {
  data () {
    return {
      searchCoin: ''

    }
  },
  mixins: [tickTableMixin],
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
