<template>
  <div class="contract-pair-table">
    <div class="pair-tab flex-lr mt-4"  
    >
      <div
        class="pair-tab-item pointer"
        @click="changePair(pair)"
        :class="{active: pair.name === state.ct.pair, 'color-up': getDelta(pair.tick) > 0, 'color-down': getDelta(pair.tick) < 0}"
        v-for="pair in list"
        :key="pair.name"
      >
        <span class="pair-name">{{ $t('FUTURE_&USD', {currency: pair.product_name} ) }}</span>
        <p class="price mt-10">{{ pair.price || '0' | fixed(pair.price_scale) }} <i
          class="iconfont arrow"
          :class="{'arrow-up': getDelta(pair.tick) > 0, 'arrow-down': getDelta(pair.tick) < 0}"
        /></p> 
      </div>
    </div>
    <div class="pair-info flex mt-4" style="position:relative">
      <div
        class="pair-info-full flex-lr"
        :class="{'color-up': getDelta(tick) > 0, 'color-down': getDelta(tick) < 0}"
      >
        <div class="column info-title flex-center">
          <div class="info-title-block pd-10 ibt">
            <p class='nowrap'> 
              <i class="iconfont pointer ibm"/>
              <span class="info-title-value ml-3 mr-3">
                <!-- {{ $t('contract_' + symbol.name) }} --> 
                {{$t('FUTURE_&USD', {currency: symbol.product_name})}}
              </span>
              <i
                class="iconfont arrow"
                :class="{'arrow-up': getDelta(tick) > 0, 'arrow-down': getDelta(tick) < 0}"
              />
            </p>
          </div>
        </div>
        <!-- BLOCK 2 -->
        <div class="column flex flex-start ml-15">
          <div class="info-row">
            <span class="info-field">{{ $t('last_price') }}： </span>
            <span
              class="info-value"
            >{{ tick.current | fixed(pairInfo.price_scale || 2) }}</span>
          </div>
          <div class="info-row">
            <span class="info-field">{{ $t('contract_mark_price') }}： </span>
            <span v-if="pairInfo.currency==='BTCUSD'" class="info-value default" >{{ markPrice | fixed(2)  }}</span>
            <span v-else class="info-value default" >{{ markPrice | fixed(pairInfo.price_scale || 2)  }}</span>
          </div>
        </div>
        <!-- BLOCK 3 -->
        <div class="column flex flex-start ml-15">
          <div class="info-row">
            <span class="info-field">{{ $t('homechart_24h_change_range') }}： </span>
            <span
              class="info-value"
            >{{ getDelta(tick) + '%' }}</span>
          </div>
          <div class="info-row">
            <span class="info-field">{{ $t('homechart_24h_change_value') }}： </span>
            <span
              class="info-value"
            >{{ tick.increment_24h  | fixed(pairInfo.price_scale || 2)  }}</span>
          </div>
        </div>
        <!-- BLOCK 4 -->
        <div class="column flex flex-start ml-15">
          <div class="info-row">
            <span class="info-field">{{ $t('homechart_24h_v') }}： </span>
            <span class="info-value default" >{{ tick.volume_24h | pretty }} {{ $t(unit) }}</span>
          </div>
          <div class="info-row">
            <span
              class="info-value default"> ≈{{ volumnValue | thousand }} BTC</span>
          </div>
        </div>
        <div  class="guide-link" v-show="link">
          <router-link :to="{ path: 'guide' }" >
            <img src="@/assets/zhongwen.png" v-show="language === 'zh-CN'" width="110">
            <img src="@/assets/fanti.png" v-show="language === 'zh-HK'" width="110">
            <img src="@/assets/hanwen.png" v-show="language === 'ko'" width="110">
            <img src="@/assets/yingwen.png" v-show="language === 'en'" width="110">
          </router-link>
        <img @click="link = false" src="@/assets/quxiao.png" width="12" style="    position: relative;left: -4px;top: -20px;cursor: pointer;"></div>

      </div>
      <div class="pair-info-bottom flex-lr mt-17">
        <div class="pair-info-left flex-lr">
          <div class="info-row">
            <span class="info-field">{{ $t('contract_fee_rate') }}： </span>
            <span class="info-value default">

            <router-link to="/material/fee-history">  {{ (pairInfo.fee_rate * 100 || 0) | round(4)   }} % </router-link>
            <!-- {{ ( (pairInfo.fee_rate * 100).toFixed(4) || 0) + '%' }}  -->
            <i class="iconfont strong pointer"
               v-tooltip.top-center="{content: $t('contract_fee_rate_current_tips', { feeRate: ($big(pairInfo.fee_rate * 100 || 0).round(4, 0).toFixed(4) || 0) + '%' }), classes: 'contract'}"/>  </span>
          </div>
          <div v-if='false' class="info-row ml-30">
            <span class="info-field">{{ $t('contract_holding') }}： </span>
            <span
              class="info-value default"
            >{{ pairInfo.holding|thousand }} USD</span>
          </div>
        </div>
        <div class="pair-info-right">
          <div class="info-controls">
            <span
              class="info-control pointer"
              @click.prevent="openSetting">
              <icon name="calc"/>
              <!-- <i class="iconfont calc ibm mr-8"/> -->
              <span class="text nowrap">{{ $t('contract_calculate') }}</span>
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import {state} from '@/modules/store'
import pairInfoMixins from './statePairInfoComputedMixins'
export default {
  mixins: [pairInfoMixins],
  name: 'ContractPairNav',
  data () {
    return {
      state,
      language : state.locale,
      link: true
    }
  },
  watch:{
    "state.locale"(){
      this.language = this.state.locale
      console.log(this.language)
    }
  },
  props: {
    list: {
      type: Array
    },
    getDelta: {
      type: Function
    },
    tick: {
      type: Object
    }
  },
  computed: {
    markPrice () {
      if (this.state.ct.markTick) {
        return  this.state.ct.markTick.current
      }
      return '--'
    },
    volumnValue () {
      if (this.tick && this.tick.volume_24h) { 
        if (this.pairInfo.currency === 'BTCUSD') {
          return this.$big(this.tick.volume_24h).div(this.tick.current).round(this.pairInfo.currency_scale || 2).toString()
        }
        else {
          return this.$big(this.tick.volume_24h).times(this.tick.current).times(this.pairInfo.multiplier).round(this.pairInfo.currency_scale || 2).toString()
        }
      }
      return '--'
    },
    unit() { 
      if (this.state.ct.pair === 'FUTURE_BTCUSD') { 
        return 'USD'
      }
      else { 
        return 'contract_min_unit'
      }
    },
  },
  methods: {
    changePair (pair) {
      this.state.ct.pair = pair.name
      this.$emit('changePair', pair.name)
    },
    openSetting () {
      this.$emit('openSetting')
    }
  }
}
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
}
.guide-link{
  position: absolute;
  right: 0;
  top: -48px;
}
.contract-pair-table {
  color: #fff;
  font-size: 14px;
  .pair-tab {
    background-color: $contract-block-bg;
    .pair-tab-item {
      padding: 8px 38px 10px;
      font-size:14px;
      text-align: center;
      .pair-name {
        font-weight:400;
        color:#fff;
      }

      &.active {
        background-color: $contract-block-active-bg;
      }
    }
  }
  .pair-info {
    background-color: $contract-block-bg;
    padding: 14px 20px;
    .pair-info-full {
      flex: 1;
      .column {
        justify-content: space-between;
        min-width: 130px;
      }
      .info-title-block {
        background:$contract-block-active-bg;
        border:1px solid $primary;
        border-radius:4px;
        text-align: center;
        height: 16px;
        .pointer {
          width: 8px;
          height: 8px;
          background:$primary;
          border-radius:50%;
        }
        .info-title-value {
          color: #fff;
        }
      }

      .info-row {
        font-size: 12px;
        .info-field {
          color: #D7D7D7;
        }
        .info-value {
          &.default {
            color: #D7D7D7;
          }
        }
      }
    }
    .pair-info-bottom {
      justify-content: space-between;
    }
    .pair-info-left {
      // width: 80%;
      flex:1;
      justify-content: flex-start;
      .info-row {
      font-size: 12px;
      .info-field {
        color: #D7D7D7;
      }
      .info-value {
        color: #787878;
      }
      }
    }
    .pair-info-right {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      width: 143px;
      .info-controls {
        display: flex;
        color: #D7D7D7;
        .iconfont.setting {
          width: 18px;
          height: 18px;
          background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAbFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8+T+BWAAAAI3RSTlMA1wX1CvqH4s+SMujKtKWaDsR+cF5KIBrsrHZjVk9EPzgn8GJk35YAAAD/SURBVDjLjdHbsoIwDAXQDaXc71dFDqj5/388ktYCjmVcL31IZpKdYi8jdinxnStJiS0NPWmTpaEjrcYHD6whLdcjXSgtVa2L0hdkOnpgyUUGVl7WzaOAdkTkrE+HVURWzjrkIclu5OuceA6czZCVP14T2inQ7kfGvHRxaEArTN2D4pu6z1s6pNzNp4Q67KQPqU5QwbgR+4Om1opgxB8NT0tDh99GDKltSVmvIZbkJGb6wCJPDyVwP5w6G5vocOoQyOnMDAzipH7FS22vy96cQRThoZRn/FdgE6U3D26TbOlmoK+D4J1bv/OWTXFxNGzZLITZ3eL9KT4sGoeFMTb/sXVLCx2O+78AAAAASUVORK5CYII=) 50%/100% 100% no-repeat;
        }
        .text {
          vertical-align: middle;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
