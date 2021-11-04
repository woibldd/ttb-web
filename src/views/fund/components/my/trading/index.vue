<template>
  <div class="fund-assets-container">
    <div class="fund-assets-content">
      <div class="fund-assets-menu"> 
        <div class="fund-tabs" flex="main:left">
          <div 
            :class="['fund-tab-item', { active: tab==='personal'}]" 
            @click="handleClickTabs('personal')"
            flex="cross:center"
            v-html="$t('otc_otutcol_17')">
            个人资产
          </div>
          <div 
            :class="['fund-tab-item', { active: tab==='history'}]" 
            @click="handleClickTabs('history')" 
            flex="cross:center"
            v-html="$t('fund_trading_bill')">
            委托历史
          </div> 
        </div>
      </div>
      <div v-if="tab==='personal'" class="fund-assets-total mt-30 mb-30">
        <div class="total-label" v-html="$t('otc_otutcol_14')">币币资产估值</div>
        <div class="total-value mt-5">
          <!-- <span class="valuation">{{total | fixed(8)}} BTC</span>   -->
          <span class="valuation">{{calcUsdtTransfer(accountTotal, 'BTC') | fixed(8)}} BTC</span>
          <i class="fail">
            {{`≈ ${state.fiatMoneySymbol}`}} <span>{{calcUsdtTransfer(accountTotal, state.fiatMoney) | fixed(2)}}</span>
          </i>
        </div>
      </div>
      <div v-else-if="tab==='history'"  class="fund-assets-sub-menu mt-10 mb-30" flex="main:left">
        <div v-html="$t('contract_trade_his')" @click="handleClickSubTab('transaction')" :class="['assets-item', { active: subTab==='transaction'}]" >
          交易历史
        </div>
        <div v-html="$t('order_history')" @click="handleClickSubTab('order')" :class="['assets-item', { active: subTab==='order'}]" >
          委托历史
        </div> 
      </div> 
      <div class="fund-assets-table">
        <div v-if="tab==='personal'" class="fund-assets-filter">   
          <div flex="main:justify">
            <div class="search-box ml-10" >
              <label for="input-search"><icon style="font-size:20px" name="home-search-t"/></label> 
              <input
                id="input-search"
                class="input-search"
                :skin="state.skin"
                v-model="search"
                :placeholder="$t('search')"
                type="text">
            </div> 
            <div class="mr-20">
              <el-checkbox v-model="hideSmall">{{$t('fund_my_assets_hide')}}</el-checkbox>
            </div> 
          </div>
        </div>
        <div class="fund-assets-data">
          <div v-if="tab==='personal'" class="personal"> 
            <custom-table v-loading="loading"
              :hasAppend="true"
              :table-list="assetsShowList"
              :table-columns="mapTableAssetsColumns"
              :lastColumnConfig="lastColumnConfig" 
              @change="handlePageChange">  
              <p slot="myheader" class="text-nowrap">{{$t('currency')}}</p>
              <div slot="append" slot-scope="data" flex="main:left"> 
                <div style="width: 26px;" flex="cross:center main:center">
                  <img style="height: 26px; " :src="`https://ix-bj-static.oss-cn-beijing.aliyuncs.com/currency-coin/${data.data.currency}.png`" alt="">
                </div>
                <div class="ml-5"><span>{{data.data.currency}}</span></div> 
              </div>
              <div slot="handlerDom" slot-scope="{data}" style="text-align:right;"> 
                <router-link
                  v-if="data.depositable"
                  :to="'/nfund/transfer/'"
                  class="my-fund-operate ml-30"
                >{{ $t('suvbanean') }}</router-link>  
                <span v-if="data.pairs && data.pairs.length>0">
                  <router-link 
                    :to="{ name: 'trading', params: { pair: data.pairs[0].name } }"
                    class="my-fund-operate ml-30" >
                    {{ $t('asset_trading') }}
                  </router-link> 
                </span>
              </div>
            </custom-table> 
          </div>
          <div v-else-if="tab==='history'"  class="history"> 
            <div v-if="subTab==='transaction'">  
              <custom-table v-loading="loading" 
                key="transaction"
                :table-list="tableTransactionList"
                :table-columns="mapTableTransactionColumns"
                @change="handlePageChange">  
              </custom-table>  
            </div>
            <div v-else-if="subTab==='order'"> 
              <custom-table v-loading="loading" 
                key="order"
                :table-list="tableOrderList"
                :table-columns="mapTableOrderColumns"
                @change="handlePageChange">  
              </custom-table>   
            </div> 
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
      hideSmall: false, 
      tab: 'personal',
      subTab: 'transaction',
      loading: false,
      lastColumnConfig: {
        headerLabel: 'operation',
        headerAlign: 'right',
        width: '250px'
      },
      temPageConfig: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }, 
      pariList: null,
      tableAssetsList: [],
      tableTransactionList: [],
      tableOrderList: [],
      assetsColumns: [ 
        'available',
        'locking',
        'estValue'
      ],
      transactionColumns: [
        'create_time',
        'pair',
        'side',
        'type',
        'fee',
        'price',
        'amount'
      ],
      orderColumns: [ 
        'create_time',
        'pair',
        'side',
        'type',
        'fee',
        'price',
        'amount'
      ],
    }
  },
  computed: {  
    usdtRates () { 
      return this.state.rate.USDT
    },
    usdtValue () { 
      return this.usdtRates[this.state.fiatMoney] || 0
    },
    accountList() {
      return state.fund.valueList || {}
    },
    total() {
      return (this.accountList.balance || {}).btcValue 
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
            if (key==='available' || key ==='locking') {
              value = this.$big(value).round(8, 0).toFixed(8)
            } else if (key==='estValue') { 
              let UsdtValue = that.calcEstValue(row) 
              let estValue = that.calcUsdtTransfer(UsdtValue, that.fiatMoney ) 
              value = this.$big(estValue).round(4, 0).toFixed(4)
            }
            return value ? value : '--'
          }
        }
      })
    },
    mapTableTransactionColumns() {
      return this.transactionColumns.map(item => {
        return {
          hearderLabel: this.tableHeaderTransfrom(item),
          headerAlign: item==='create_time'? 'left' : 'right',
          prop: item,  
          handleValue: (value, key, row) => {
            if (key === 'pair') { 
              value = `${row.product}/${row.currency}` 
            }
            else if (key === 'create_time') {
              value = this.$date(value)
            } 
            else if (key === 'side') {
              const txt = this.$t(`fund.dict.side.${value}`)
              if (+value === 1) {
                value = `<span style="color:#23C88B;">${txt}</span>`
              } else {
                value = `<span style="color:#F24E4D;">${txt}</span>`
              }
            } 
            else if (key === 'type') {
              value = this.$t(`contract_deal_type_${value}`)
            }
            return value ? value : '--'
          }
        }
      })
    },
    mapTableOrderColumns() {
      return this.orderColumns.map(item => {
        return {
          hearderLabel:  this.tableHeaderTransfrom(item),
          headerAlign: item==='create_time'? 'left' : 'right',
          prop: item, 
          handleValue: (value, key, row) => { 
            if (key === 'pair') { 
              value = `${row.product}/${row.currency}` 
            }
            else if (key === 'create_time') {
              value = this.$date(value)
            } 
            else if (key === 'side') {
              const txt = this.$t(`fund.dict.side.${value}`)
              if (+value === 1) {
                value = `<span style="color:#23C88B;">${txt}</span>`
              } else {
                value = `<span style="color:#F24E4D;">${txt}</span>`
              }
            } 
            else if (key === 'type') {
              value = this.$t(`contract_deal_type_${value}`)
            }
            return value ? value : '--'
          }
        }
      })
    }, 
    assetsShowList() {
      let list = this.tableAssetsList 
      list =  list.filter(pair => { 
        return pair.currency.toUpperCase().indexOf(this.search.toUpperCase()) > -1  
      }) 
      if (this.hideSmall) {  
        list =  list.filter(pair => { 
          // return this.$big(pair.estValue || 0).gt(50) 
          if (this.fiatMoney === 'CNY'){
            return this.$big(pair.estValue || 0).gt(50)
          }
          else {
            return this.$big(pair.estValue || 0).gt(10)
          }
        }) 
      }
      return list
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
      } else if (item==='locking') {
        return this.$t('asset_th_unavlb') 
      } else if (item==='side') { 
        return this.$t('deal_th_side')
      } else if (item==='type') { 
        return this.$t('order_th_type')
      } else if (item==='fee') {
        return this.$t('orderdeal_fee')
      } else if (item==='estValue') {
        return `${this.$t('homechart_fiat')}(${this.fiatMoney})`
      } else {
        return this.$t(item)
      }
    },
    handleClickTabs(name) {
      this.temPageConfig = {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
      this.tab = name 
    },
    handleClickSubTab(name) {
      this.temPageConfig = {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
      this.subTab = name 
      // this.handlePageChange()
    }, 
    calcFiatEstValue (item) {
      let res = this.$big(0)
      let {currency,camount} = item  
      if (item.rates) {
        res = this.$big(camount).times(item.rates[this.fiatMoney] || 0).round(4, 0).toFixed(4)
      } 
      return res
    }, 
    // calcUsdtTransfer (amount, fait) {
    //   let result = this.$big(0)
    //   if (this.state.rate.USDT) {
    //     result = this.$big(amount).times(this.state.rate.USDT[fait])
    //   }
    //   return result
    // },
    async handlePageChange(pageConfig) {   
      this.temPageConfig = pageConfig || this.temPageConfig 
      const { pageSize, currentPage } = this.temPageConfig  
      if (this.tab==='personal') { 
        if (!this.pairList) {
          await this.fetchPairList()
        }
        service.getBalance().then(res => {
          if (!res.code) {
            this.tableAssetsList = res.data 
            this.tableAssetsList.map(item => {
              item.locking = this.$big(item.locking || 0).plus(this.$big(item.ordering || 0).plus(this.$big(item.withdrawing || 0))).toString()
              item.camount = this.$big(item.available).plus(item.withdrawing).plus(item.locking)
              item.estUsdtValue = this.calcEstValue(item) 
              // item.estValue = this.calcUsdtTransfer(item.estUsdtValue, state.fiatMoney ) 
              item.estValue = this.calcFiatEstValue(item)
              if (item.currency === 'USDT')
                item.pairs = [{name:'BTC_USDT'}]
              else
                item.pairs = this.pairList.filter(t => t.product === item.currency || t.currency === item.currency)
              
            }) 
          }
        })
      } else {
        switch(this.subTab) {
          case 'transaction': 
            service.getBiBiOrders({page:currentPage,size:pageSize}).then(res => {
              if (!res.code) {
                this.tableTransactionList = res.data 
              }
            })
            break;
          case 'order': // 
            service.orderHistorise({page:currentPage,size:pageSize}).then(res => {
              if (!res.code) {
                this.tableOrderList = res.data 
              }
            })
            break; 
        }
      }
    },
    async fetchPairList() {
      let result = await service.getPairList()
      if (!result.code) {
        this.pairList = result.data.items
      }
    }, 
  },
  created() {
    this.fetchPairList()
  }
}
</script>

<style lang="scss">
@import '../style.scss';
</style>