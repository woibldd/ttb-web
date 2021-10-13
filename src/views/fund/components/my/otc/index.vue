<template>
  <div class="fund-assets-container">
    <div class="fund-assets-content">
      <div class="fund-assets-menu">
        
      </div> 
      <div class="fund-assets-total mt-30 mb-30">
        <div class="total-label" v-html="$t('otc_otutcol_13')">个人总资产</div>
        <div class="total-value mt-5">
          <!-- <span class="valuation">{{total | fixed(8)}} BTC</span>  
          <i class="fail">
            {{`≈ ${state.fiatMoneySymbol}`}}
            <fiat-money base="BTC" :value="total" />
          </i> -->
          <span class="valuation">{{calcUsdtTransfer(accountTotal, 'BTC') | fixed(8)}} BTC</span>
          <i class="fail">
            {{`≈ ${state.fiatMoneySymbol}`}} <span>{{calcUsdtTransfer(accountTotal, state.fiatMoney) | fixed(2)}}</span>
          </i>
        </div>
      </div> 
      <div class="fund-assets-table"> 
        <div class="fund-assets-data" > 
          <div class="personal">
            <custom-table v-loading="loading"
              :hasAppend="true"
              :table-list="tableAssetsList"
              :table-columns="mapTableAssetsColumns"
              :lastColumnConfig="lastColumnConfig"
              @change="handlePageChange"> 
              <p slot="myheader" class="text-nowrap">{{$t('currency')}}</p>
              <div slot="append" slot-scope="data" flex="main:left"> 
                <div style="width: 23px;" flex="cross:center main:center">
                  <img style="height: 23px; " :src="`https://ix-bj-static.oss-cn-beijing.aliyuncs.com/currency-coin/${data.data.currency}.png`" alt="">
                </div>
                <div class="ml-5"><span>{{data.data.currency}}</span></div> 
              </div>
              <div slot="handlerDom" slot-scope="{data}" style="text-align:right;"> 
                <router-link 
                  :to="'/nfund/transfer/'"
                  class="my-fund-operate ml-30"
                >{{ $t('suvbanean') }}</router-link>   
                <!-- <router-link 
                  :to="{ name: 'otc' }"
                  class="my-fund-operate ml-30" >
                  {{ $t('asset_trading') }}
                </router-link>   -->
              </div>
            </custom-table> 
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {state} from '@/modules/store'
import customTable from '@/components/customTable'
import service from '@/modules/service' 
import mixin from '../mixins.js'
export default {
  mixins: [mixin],
  components: {
    customTable 
  },
  data() {
    return {
      state,
      search:'',
      check: '',  
      loading: false,
      lastColumnConfig: {
        headerLabel: 'operation',
        headerAlign: 'right',
        width: '250px'
      }, 
      pariList: null,
      tableAssetsList: [],
      assetsColumns: [ 
        'available',
        'ordering',
        'estValue'
      ],
    }
  },
  computed: {
    accountList() {
      return state.fund.valueList || {}
    },
    total() {
      return (this.accountList.otc || {}).btcValue 
    },
    accountTotal() { 
      let sum = this.$big(0) 
      this.tableAssetsList.forEach(item => {
        sum = sum.plus(item.estUsdtValue)
      })
      return sum.toString()
    }, 
    mapTableAssetsColumns() {
      const that = this
      return this.assetsColumns.map(item => {
        return {
          hearderLabel: this.tableHeaderTransfrom(item),
          prop: item,
          headerAlign: item==='currency'? 'left' : 'right',
          handleValue: (value, key, row) => {
            if (key==='available' || key ==='ordering') {
              value = this.$big(value).round(8, 0).toFixed(8)
            } else if (key==='estValue') { 
              // value = this.$big(value).round(4, 0).toFixed(4)
              let UsdtValue = that.calcEstValue(row) 
              let estValue = that.calcUsdtTransfer(UsdtValue, that.fiatMoney ) 
              value = this.$big(estValue).round(4, 0).toFixed(4)
            }
            return value ? value : '--'
          }
        }
      })
    },
    fiatMoney() {
      return state.fiatMoney
    }
  },
  watch: {
    fiatMoney() {
      this.handlePageChange()
    }
  },
  methods: {
    tableHeaderTransfrom(item) {
      if (item==='available') {
        return this.$t('avlb')
      } else if (item==='ordering') {
        return this.$t('asset_th_unavlb')  
      } else if (item==='estValue') { 
        return `${this.$t('homechart_fiat')}(${this.fiatMoney})`
      } else {
        return this.$t(item)
      }
    },
    // calcEstValue (item) {
    //   let res = this.$big(0)
    //   let unit = this.fiatMoney // this.unit.name
    //   let {currency,camount} = item 

    //   if (item.rates) {
    //     res = this.$big(camount).times(this.$big(item.rates[unit] || 0)).round(4, 0).toFixed(4)
    //   } 
    //   return res
    // }, 
    async handlePageChange() {     
      service.getOtcBalance().then(res => {
        if (!res.code) {
          this.tableAssetsList = res.data 
          this.tableAssetsList.map(item => {
            // item.locking = this.$big(item.ordering || 0).toString()
            item.camount = this.$big(item.available).plus(item.ordering) 
            item.estUsdtValue = this.calcEstValue(item) 
            item.estValue = this.calcUsdtTransfer(item.estUsdtValue, state.fiatMoney ) 
            
          }) 
        }
      }) 
    }, 

  }
}
</script>


<style lang="scss">
@import '../style.scss';
</style>
