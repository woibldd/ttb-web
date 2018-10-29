<template>
  <div
    class="grid-title"
  >
    <div
      class="fl grid-currency pointer"
      @click="showPair"
      @mouseover="showPair(true)"
      @mouseout="showPair(false)">
      {{ pair | pairfix }}
      <icon
        name="arrow-down"
        class="arrow"
        :class="{up: show}"
      />
      <div
        class="grid-pairtable"
        :class="{show: show}"
      >
        <PairNav
          :init-height="260"
          :sort="false"
          ref="PairNav"/>
      </div>
    </div>
    <p
      class="fl grid-value"
      :class="{'color-up': delta > 0, 'color-down': delta < 0}">{{ lastPrice }}</p>
    <p
      class="fl grid-abt"
      :class="{'color-up': delta > 0, 'color-down': delta < 0}">≈ {{ state.fiatMoneySymbol }}
      <fiat-money
        :base="state.pro.currency_name"
        :value="lastPrice" /></p>
    <p class="fl grid-increase">{{ $t('increase') }} <i :class="{'color-up': delta > 0, 'color-down': delta < 0}">{{ delta > 0 ? '+' : '' }}{{ delta }}%</i></p>
    <p class="fl grid-high">{{ $t('secure_level_2') }} {{ pairTick.highest_24h | round(pair.price_scale) }}</p>
    <p class="fl grid-low">{{ $t('secure_level_0') }} {{ pairTick.lowest_24h | round(pair.price_scale) }}</p>
    <p class="fl grid-tf-amount">24H {{ $t('vol') }} {{ pairTick.volume_24h | round(2) }} {{ state.pro.product_name }}</p>
  </div>
</template>

<script>
import {state} from '@/modules/store'
import { pairfix } from '@/mixins/index'
import isEmpty from 'lodash/isEmpty'
import PairNav from '@/components/Trading/PairNavForTitle'

export default {
  mixins: [pairfix],
  data () {
    return {
      state,
      show: false
    }
  },
  components: {
    PairNav
  },
  methods: {
    showPair (toggle) {
      if (typeof toggle === 'boolean') {
        this.show = toggle
      } else {
        this.show = !this.show
      }
    }
  },
  computed: {
    ready () {
      return !isEmpty(this.pairTick)
    },
    pair () {
      if (this.state.pro.pair) {
        return this.state.pro.pair
      } else {
        return ''
      }
    },
    lastPrice () {
      if (this.state.pro.lastPrice) {
        return this.state.pro.lastPrice.toFixed(_.get(this, 'state.pro.pairInfo.price_scale', 4))
      }
    },
    pairTick () {
      if (this.state.pro.pairTick) {
        return this.state.pro.pairTick
      }
      return {}
    },
    delta () {
      const tick = this.state.pro.pairTick
      if (!tick || tick.increment_24h === tick.current) {
        return 0
      }
      return this.$big(tick.increment_24h)
        .mul(100)
        .div(this.$big(tick.current).minus(tick.increment_24h))
        .round(2, this.C.ROUND_HALF_UP)
        .toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-title {
  height: 56px;
  line-height: 56px;
  // overflow-y: hidden;
  box-sizing: border-box;
  padding-left: 20px;
  border: 4px solid #3A444F;
  border-bottom: none;
  border-right: none;
  background-color: $nav;
  position: relative;
  .fl {
    float: left;
  }
  .grid-currency{
    color: #fff;
    font-size: 20px;
    margin-right: 20px;
    font-weight: bold;
    .arrow {
      transition: all 0.2s ease-in-out;

      &.up {
        transform: rotate(180deg)
      }

    }
  }
  .grid-pairtable {
    position: absolute;
    top: 55px;
    left: 0;
    z-index: 99999;
    width: 480px;
    height: 300px;
    background: #192D3F;
    display: none;
    opacity: 0;
    transition: all .5s ease-in-out;
    &.show {
      display: block;
      opacity: 1;
    }
  }
  .grid-value{
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  }
  .grid-abt{
    font-size: 14px;
    margin-right: 20px;
  }
  .grid-increase{
    font-size: 14px;
    color: #fff;
    margin-right: 20px;
  }
  .grid-high,.grid-low,.grid-tf-amount{
    font-size: 14px;
    color: #D7D7D7;
    margin-right: 20px;
  }
}
</style>
