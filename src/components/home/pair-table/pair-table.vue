<template>
  <div class="newest-coin-pairs">
    <div class="relative">
      <!-- <div class="pair-title">{{ $t('newest_coin_pairs') }}</div> -->
      <div class="pair-title"> 
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="$t('home_optional')" name="like"> 
          </el-tab-pane>
          <el-tab-pane label="USDT" name="USDT">  
          </el-tab-pane>
          <el-tab-pane label="BTC" name="BTC"></el-tab-pane>
          <el-tab-pane label="ETH" name="ETH"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="pairs-search">
        <div class="search-box">
          <input
            type="text"
            @input="filterPair()"
            v-model="search">
          <icon
            class="ml-5"
            name="home-search"/>
        </div>
      </div>
    </div>
    <div class="pairs-table">
      <div class="pairs-table__head">
        <div class="head-item percent5"> 
        </div>
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
        <div 
          @click.stop="collection(pair)"
          class="row__item percent5">
          <icon 
            v-show="pair.like"
            name='sc-x' style='color:red;'/>
          <icon 
            v-show="!pair.like"
            name='sc-w'/>
        </div>
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
  </div>
</template>
<script>
import {state} from '@/modules/store'
import service from '@/modules/service'
import { pairfix } from '@/mixins/index'
import dataView from './data-view'
export default {
  mixins: [pairfix],
  data () {
    return {
      state,
      searchCoin: '',
      search: '',
      activeName: 'like'
    }
  },
  components: {
    dataView,
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
    handleClick(tab, event) {
      // console.log(tab, event);
      this.$emit('switchTab', tab.name)
    },
    collection(pair) {
      if(pair.like) { 
        pair.like = false;
        service.delOptional({
          site: 2,
          id: pair.id
        })
      }
      else { 
        pair.like = true; 
        service.addOptional({
          site: 2,
          id: pair.id
        })
      }
      // pair.like = !(pair.like || false) 
    }
  }, 
  created(){  
  }
}
</script>
<style lang="scss">
.newest-coin-pairs {
  .el-tabs__header {
    margin: 0;
  } 
}
</style>
<style lang="scss" scoped>
@import './pair-table.scss';

</style>
