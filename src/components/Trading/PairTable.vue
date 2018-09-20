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
      <li class="tb" v-if="pair.tick">{{ pair.tick.current | fixed(pair.price_scale) }} <span> ≈ {{ state.fiatMoneySymbol }} <fiat-money
        :base="pair.currency" :value="pair.tick.current"/></span></li>
      <li class="tc" :class="{'theme-color-up': getDelta(pair.tick) > 0, 'theme-color-down': getDelta(pair.tick) < 0}">
        <p v-if="pair.tick">{{ (getDelta(pair.tick) > 0) ? '+' : ''}}{{ getDelta(pair.tick) }}%
          {{pair.tick.increment_24h}}</p>
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
  import {state} from '@/modules/store'

  export default {
    data() {
      return {}
    },
    mixins: [tickTableMixin],
    methods: {
      pretty(num) {
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
      toExchange(pair) {
        this.$router.push({
          name: 'trading',
          params: {
            pair: pair
          }
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .ind_cen.trade {
    border: 1px solid #CBE6FD;
    ul {
      overflow: hidden;
      color: #CBE6FD;
      font-size: 16px;
      border-bottom: 1px dashed #464d55;
      line-height: 64px;
      &.tit {
        border-bottom: 1px solid #CBE6FD;
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        li {
          border-bottom: none;
          &.tc {
            color: #CBE6FD;
          }
        }
      }
      li {
        float: left;
        height: 64px;
        text-align: center;
        span {
          color: #6C869C;
        }
        &.ta {
          width: 8%;
        }
        &.tb {
          width: 17%;
        }
        &.tc {
          width: 17%;
        }
        &.td {
          width: 17%;
        }
        &.te {
          width: 17%;
        }
        &.tf {
          width: 17%;
        }
        &.tg {
          width: 7%;
          color: #5c89b0;
          cursor: pointer;

          &:hover {
            color: #c9a96e;
          }
        }
      }
      &:last-child {
        border-bottom: none;
      }
      &.tra_cen {
        li {
          &.theme-color-down {
            color: #F24E4D;
          }
          &.theme-color-up {
            color: #09C989;
          }
        }
      }
    }
  }


</style>
