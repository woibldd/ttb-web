<template>
  <div class="ind_cen trade" v-if="sortedList && sortedList.length">
    <ul class="tit">
      <li class="ta">{{$t('currency')}}</li>
      <li class="tb">{{$t('homechart_price')}}</li>
      <li class="tc">{{$t('homechart_24h_chg')}}</li>
      <li class="td">{{$t('homechart_24h_l')}}</li>
      <li class="te">{{$t('homechart_24h_h')}}</li>
      <li class="tf">{{$t('homechart_24h_v')}}</li>
      <li class="tg">{{$t('actions')}}</li>
    </ul>
    <ul class="tra_cen" v-for="pair in sortedList" :key="pair.name" v-if="pair.tick">
      <li class="ta">{{pair.product}} <span>/ {{pair.currency}}</span></li>
      <li class="tb" v-if="pair.tick">{{ pair.tick.current | fixed(pair.price_scale) }} <span> ≈ {{ state.fiatMoneySymbol }} <fiat-money base="USDT" :value="pair.tick.current" /></span></li>
      <li class="tc" :class="{'theme-color-up': getDelta(pair.tick) > 0, 'theme-color-down': getDelta(pair.tick) < 0}">
        <p v-if="pair.tick">{{ (getDelta(pair.tick) > 0) ? '+' : ''}}{{ getDelta(pair.tick) }}%  {{pair.tick.increment_24h}}</p>
        <p v-else>...</p></li>
      <li class="td" v-if="pair.tick">{{pair.tick.lowest_24h | fixed(pair.price_scale)}}</li>
      <li class="te" v-show="pair.tick">{{pair.tick.highest_24h | fixed(pair.price_scale)}}</li>
      <li class="tf" v-if="pair.tick">{{ pretty(pair.tick.volume_24h) }}<span> {{pair.product}}</span></li>
      <li class="tg" @click="toExchange(pair.name)">
        <icon name="handle"/>
      </li>
    </ul>
  </div>
</template>

<script>
import tickTableMixin from '@/mixins/tick-table'
import { state } from '@/modules/store'

export default {
  data() {
    return {
      state
    }
  },
  mixins: [tickTableMixin]
}
</script>


<style lang="scss" scoped>
.ind_cen {
  position: relative;
  margin: 0 60px;
}
</style>
