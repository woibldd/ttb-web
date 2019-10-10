
<template>
  <div class="market-info-container">
    <div class="ix-pannel">
      <div class="ix-header" style="line-height: 1!important">
        <span>{{ $t('contract_block_market_info') }}: {{ title }}</span>
        <router-link
          :to="{name: 'TradeIndex', params: {pair: state.ct.pair}}"
          class="pointer c-primary">{{ $t('contract_more_resource') }}</router-link>
      </div>
      <div class="ix-pannel-body pt-24">
        <div class="info__row flex-cloumn">
          <div
            class="cur-price mb-18"
            :class="{'color-up': delta > 0, 'color-down': delta < 0}">{{ lastPrice }}
            <icon
              class="arrow ml-5"
              v-if="delta < 0"
              name="arrow-down-red"/>
            <icon
              class="arrow ml-5"
              v-if="delta >= 0"
              name="arrow-down-green"/>
          </div>
          <div class="sub-price">
            <router-link
              class="c-666 pointer"
              v-tooltip.top-center="{html: true, content: indexPriceTips, classes: 'contract'}"
              :to="{name: 'TradeIndex', params: {pair: state.ct.pair}}">{{ indexPrice }}</router-link>
            &nbsp;/ &nbsp;
            <router-link
              class="c-default"
              :to="{name: 'TradeIndex', params: {pair: state.ct.pair}}"
              v-tooltip.top-center="{html: true, content: $t('contract_mark_price_tips'), classes: 'contract'}">{{ markPrice }}</router-link>
            <div
              class="signal"
              v-tooltip.top-center="{html: true, content: $t('contract_lignter_tips'), classes: 'contract'}">
              <a :href="adlurl" target="_blank">
                <span
                  v-for="(i, is) in 5"
                  class="dib"
                  :class="['status-light-' + i, {'interactive': is >= adl}]"
                  :key="is"/>
              </a>

            </div>
          </div>
        </div>
        <div class="info__row">
          <div
            class="row__label c-primary"
            v-tooltip.top-center="{html: true, content: $t('contract_index_resource_tips'), classes: 'contract'}">{{ $t('contract_index_resource') }}</div>
          <div class="row__value"
              v-tooltip.top-center="{content: $t('ix_indxe_tips'), classes: 'contract'}"
          >{{ $t('contract_ix_index_source') }}</div>
        </div>
        <div class="info__row">
          <div class="row__label">{{ $t('contract_ix_index_price') }}</div>
          <div class="row__value" >{{ indexPrice }}</div>
        </div>
        <div class="info__row">
          <div
            class="row__label"
            v-tooltip.top-center="{html: true, content: $t('contract_24_hour_trade_tips'), classes: 'contract'}">{{ $t('contract_24_hour_trade') }}</div>
          <div class="row__value">{{ pairTick.volume_24h | thousand }} {{ $t(unit)}}</div>
        </div>
        <div
          v-show='false'
          class="info__row"
          v-tooltip.top-center="{html: true, content: $t('contract_unequal_pos_amount_tips'), classes: 'contract'}">
          <div class="row__label">{{ $t('contract_unequal_pos_amount') }}</div>
          <div class="row__value">{{ pairInfo.holding | thousand }}  {{ $t(unit)}}</div>
        </div>
        <div
          class="info__row"
          v-tooltip.top-center="{html: true, content: $t('contract_total_werehouse_value_tips'), classes: 'contract'}">
          <div class="row__label">{{ $t('contract_total_werehouse_value') }}</div>
          <!-- <div class="row__value">{{ '1 USD' }}</div> -->
          <div class="row__value">{{ pairInfo.unitPrice }}</div>
        </div>
        <div
          class="info__row"
           v-tooltip.top-center="{html: true, content: $t('contract_fee_rate_estimate_tips', { feeRate: (((pairInfo.fee_rate_forecast || pairInfo.fee_rate) * 100).toFixed(4) || 0) + '%' }), classes: 'contract'}">

          <div class="row__label">{{ $t('contract_fee_rate') }}</div>
          <div class="row__value">
            <router-link to="/material/fee-history">{{ (pairInfo.fee_rate * 100 || 0) | round(4)   }} % </router-link>
            <span>{{$t('count_down_value', { hour, minute, second})}}</span>
            <!-- {{ ((pairInfo.fee_rate * 100).toFixed(4) || 0) + '%' }} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { state } from '@/modules/store'
import service from '@/modules/service'
import stateMixins from './stateComputedMixins'
import pairInfoMixins from './statePairInfoComputedMixins'

export default {
  mixins: [stateMixins, pairInfoMixins],
  data () {
    return {
      state,
      time:'',
      hour: '',
      minute: '',
      second: ''
    }
  },
  computed: {
    title () {
      return this.$t('FUTURE_&USD', {currency: this.pairInfo.product_name})
      // return this.$t('contract_' + this.pairInfo.name)
      // return  this.$t('FUTURE_&USD', {currency: this.pairInfo.name.replace('FUTURE_','').replace('USD','')} )
    },
    moreInfoUrl () {
      return ''
    },
    adl () {
      if (this.state.ct.holding) {
        return Number(this.state.ct.holding.adl) || 0
      }
      return 0
    },
    adlurl () {
      let link = 'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360027995111'
      if (this.state.locale === 'en') {
        link = link.replace('zh-cn', 'en-us')
      }
      return link
    },
    indexPriceTips () {
      if (!!state.ct.pairInfo) {
        return this.$t('contract_index_price_tips' , {product_name : state.ct.pairInfo.product_name || 'BTC'})
      }
      return this.$t('contract_index_price_tips' , {product_name : 'BTC'})
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
  created(){
    var $this = this
    setTimeout(function(){
     var startTime=Math.round(new Date() / 1000);//开始时间
     var endTime= $this.pairInfo.next_fee_time/ 1000; //结束时间
     setInterval(function(){
    		 var ts =endTime-startTime;//计算剩余的毫秒数
    		 var hh = parseInt(ts  / 60 / 60 % 24, 10);//计算剩余的小时数
    		 var mm = parseInt(ts  / 60 % 60, 10);//计算剩余的分钟数
    		 var ss = parseInt(ts  % 60, 10);//计算剩余的秒数
    		 hh = checkTime(hh);
    		 mm = checkTime(mm);
    		 ss = checkTime(ss);
    		 if(ts>0){
           $this.hour = hh
           $this.minute = mm
           $this.second = ss
          //$this.time = + hh + "时" + mm + "分" + ss + "秒"
          //  $this.time = $this.$t('count_down_value', { hour: hh, minute: mm, second: ss})
    				 startTime++;
         }
         else {
           endTime = endTime + 60 * 60 * 8
         }
     },1000);
     function checkTime(i){
    		 if (i < 10) {
    				 i = "0" + i;
    		 }
    		 return i;
     }
    },3000)
  },
  mounted () {
    // service.getContractSymList().then(res => {
    //   console.log(res, 'getContractSymList')
    // })
  }
}
</script>
<style lang="scss" scoped>
   .market-info-container {
       color: #fff;
       height: 100%;
       .ix-pannel,
       .ix-pannel-body {
           height: 100%;
       }
       .ix-header {
           display: flex;
           align-items: center;
           justify-content: space-between;
           padding-right: 25px;
       }
       .info__row{
           display: flex;
           align-items: center;
           justify-content: space-between;
           font-size: 12px;
           padding-left: 14px;
           padding-right: 25px;
           margin-bottom: 16px;
       }
       .c-primary {
           color: $primary;
       }
       .c-666 {
           color: #666;
       }
       .c-default {
         color: #fff;
       }
       .flex-cloumn {
           display: flex;
           flex-direction: column;
           align-items: center;
       }
       .cur-price {
           color: #F24E4D;
           display: flex;
           align-items: center;
           font-size: 24px;
           .arrow {
               width: 17px;
               height: 9px;
           }
       }
       .sub-price {
           color: #fff;
           display: flex;
           font-size: 14px;
       }
       .signal {
           border-left: 1px solid #fff;
           margin-left: 9px;
            padding-left: 9px;
            height: 11px;
            box-sizing: border-box;

            .dib{
                display: inline-block;
                width: 3px;
                height: 100%;
                margin-right: 4px;

                &.interactive {
                    background-color: #030303;
                }
            }
       }
       .status-light-1 {
           background-color: #00b865;
       }
       .status-light-2 {
           background-color: #00b865;
       }
       .status-light-3 {
           background-color: #00b865;
       }
       .status-light-4 {
           background-color: #79c000;
       }
       .status-light-5 {
           background-color: #a98d28;
       }
   }
</style>
