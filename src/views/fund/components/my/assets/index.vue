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
            v-html="$t('capital_record')">
            财务记录
          </div> 
        </div>
      </div>
      <div v-if="tab==='personal'" class="fund-assets-total mt-30">
        <div class="total-label" v-html="$t('my_balance_equal')">个人总资产</div>
        <div class="total-value mt-5"> 
          <span class="valuation">{{calcUsdtTransfer(accountTotal, 'BTC') | fixed(8)}} BTC</span>
          <i class="fail">
            {{`≈ ${state.fiatMoneySymbol}`}} <span>{{calcUsdtTransfer(accountTotal, state.fiatMoney) | fixed(2)}}</span> 
          </i>
        </div>
      </div>
      <div v-else-if="tab==='history'"  class="fund-assets-sub-menu" flex="main:left">
        <div v-html="$t('transfer_btc_history')" @click="handleClickSubTab('transfer')" :class="['assets-item', { active: subTab==='transfer'}]" >
          划转记录
        </div>
        <div v-html="$t('deposit_record')" @click="handleClickSubTab('deposit')" :class="['assets-item', { active: subTab==='deposit'}]" >
          充币记录
        </div>
        <div v-html="$t('withdraw_record')" @click="handleClickSubTab('withdraw')" :class="['assets-item', { active: subTab==='withdraw'}]" >
          提币记录
        </div>
        <div v-html="$t('fund_reward')" @click="handleClickSubTab('reward')" :class="['assets-item', { active: subTab==='reward'}]" >
          奖励分配
        </div>
      </div>
      <div class="fund-assets-table mt-30">
        <div v-if="tab==='personal'" class="fund-assets-filter" > 
          <div flex="main:justify">
            <div class="search-box ml-10" >
              <label for="input-search"><icon style="font-size:20px" name="home-search-t"/></label> 
              <input
                id="input-search"
                class="input-search"
                :skin="state.skin"
                v-model="search"
                :placeholder="$t('search')"
                type="text"
                @input="filterPair()">
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
                <router-link
                  v-if="data.depositable"
                  :to="'/nfund/deposit/' + data.currency"
                  class="my-fund-operate ml-30"
                >{{ $t('deposit') }}</router-link>
                <router-link
                  v-if="data.withdrawable"
                  :to="'/nfund/withdraw/'+data.currency"
                  class="my-fund-operate ml-30"
                >{{ $t('withdraw') }}</router-link>
                <router-link
                  v-if="data.pairs"
                  :to="{ name: 'trading', params: { pair: data.pairs } }"
                  class="my-fund-operate ml-30" >
                  {{ $t('asset_trading') }}
                </router-link>
              </div>
            </custom-table> 
          </div>
          <div v-else-if="tab==='history'" class="history"> 
            <div v-if="subTab==='transfer'">  
              <custom-table v-loading="loading" 
                key="transfer"
                :table-list="tableTransferList"
                :table-columns="mapTableTransferColumns"
                @change="handlePageChange">  
              </custom-table>  
            </div>
            <div v-else-if="subTab==='deposit'"> 
              <custom-table v-loading="loading" 
                key="deposit"
                :table-list="tableDepositList"
                :table-columns="mapTableDepositColumns"
                @change="handlePageChange">  
              </custom-table>   
            </div>
            <div v-else-if="subTab==='withdraw'"> 
              <custom-table v-loading="loading" 
                key="withdraw"
                :table-list="tableWithdrawList"
                :table-columns="mapTableWithdrawColumns" 
                :lastColumnConfig="lastColumnConfig"
                @change="handlePageChange">   
                <div slot="handlerDom" slot-scope="{data}" style="text-align:right;">  
                  <el-button class="chexiao" type="text" 
                    @click="cancelWithdraw(data.id)">
                    <a v-if="data.state==-1|data.state==-100" >{{$t('contract_assign_revert')}}</a>
                  </el-button>
                </div>
              </custom-table>   
            </div>
            <div v-else-if="subTab==='reward'"> 
              <custom-table v-loading="loading" 
                key="reward"
                :table-list="tableRewardList"
                :table-columns="mapTableRewardColumns"
                @change="handlePageChange">  
              </custom-table>   
            </div>
            <div v-if="subTab==='deposit' || subTab==='withdraw' ">
              <ix-pagination
                style="float:right"
                :page.sync="temPageConfig.currentPage"
                :is-end="isLastPage"
                :func="handlePageChange"/> 
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
import ixPagination from '@/components/common/ix-pagination' 
import mixin from '../mixins.js'
export default {
  mixins: [mixin],
  components: {
    customTable,
    ixPagination 
  },
  data() {
    return {
      state,
      search:'',
      hideSmall: false, 
      tab: 'personal',
      subTab: 'transfer',
      loading: false,
      coinList: {},
      lastColumnConfig: {
        headerLabel: 'operation',
        headerAlign: 'right',
        width: '300'
      },
      temPageConfig: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }, 
      isLastPage:false,
      tableAssetsList: [],
      tableTransferList: [],
      tableDepositList: [],
      tableWithdrawList: [],
      tableRewardList: [],
      assetsColumns: [ 
        'available',
        'locking',
        'estValue'
      ],
      transferColumns: [
        'currency',
        'from_balance',
        'to_balance',
        'amount',
        'available',
        'create_time',
        'status'
      ],
      depositColumns: [ 
        'create_time',
        'currency',
        'confirm',
        'amount',
        'state',
      ],
      withdrawColumns: [
        'create_time',
        'currency',
        'confirm',
        'amount',
        'state',

      ],
      rewardColumns: [
        'create_time',
        'currency',
        'name',
        'amount',
        'state', 
      ],
      balanceI18nList: {
        1 : "wallet_account",
        2 : "trading_account",
        3 : "contract_account",
        4 : "otc_account",
        5 : 'contract_account',
        7 : 'contract_account', 
        8 : 'shareOption.share_account', 
        10: 'header_nav.defiAccount', 
        11: 'header_nav.blend' 
      },
    }
  },
  computed: { 
    accountList() {
      return state.fund.valueList || {}
    },
    total() {
      return (this.accountList.wallet || {}).btcValue 
    },
    accountTotal() { 
      let sum = this.$big(0) 
      this.tableAssetsList.forEach(item => {
        sum = sum.plus(item.estUsdtValue)
      })
      return sum.toString()
    }, 
    mapTableAssetsColumns() {
      let that = this
      return this.assetsColumns.map(item => {
        return {
          hearderLabel: this.tableHeaderTransfrom(item), 
          prop: item,
          headerAlign: item==='currency'? 'left' : 'right',
          handleValue: (value, key, row) => {
            if (key==='available') {
              value = this.$big(value).round(8, 0).toFixed(8)
            } else if (key==='locking') {  
              value = this.$big(value).plus(row['withdrawing']).round(8, 0).toFixed(8)
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
    mapTableTransferColumns() {
      return this.transferColumns.map(item => {
        return {
          // hearderLabel: this.tableHeaderTransfrom(item),
          headerFun: (value) => {
            if (value==='currency') {
              value =  this.$t('transfer_currency') 
            } else if (value==='amount') {
              value = this.$t('transfer_amount') 
            } else if (value==='create_time') {
              value = this.$t('transfer_time') 
            } else if (value==='amount') {
              value = this.$t('deal_amount')  
            } else if (value==='from_balance') {
              value = this.$t('transfer_from_a')  
            } else if (value==='to_balance') {
              value = this.$t('transfer_to_a')  
            } else if (value==='available') {
              value = this.$t('balance')  
            } else {
              value = this.$t(value)
            } 
            return value ? value : '--'
          },
          prop: item,
          headerAlign: item==='currency'? 'left' : 'right',
          handleValue: (value, key) => {
            if (key==='available') {
              value = this.$big(value).round(8, 0)
            }
            if (key==='status') {
              switch(value) {
              case 0:
                value=this.$t('transfer_fail');
                break;
              case 1:
                value=this.$t('transfer_complete');
                break;
              } 
            }
            if (key==='from_balance' || key==='to_balance') {
              let txt = this.balanceI18nList[value]
              value = this.$t(txt)
            }
            return value ? value : '--'
          }
        }
      })
    },
    mapTableDepositColumns() {
      return this.depositColumns.map(item => {
        return {
          hearderLabel: this.$t(item),
          prop: item,
          headerAlign: item==='create_time'? 'left' : 'right',
          handleValue: (value, key) => {
            if (key==='state') {
              switch (value) {
                case -1: 
                  value = 'deposit_state_error'
                  break
                case 0:
                  value = 'pending'
                  break
                case 1: 
                  value = 'done'
                  break
                default:
                  value = 'pending'
                  break
              }
              value = this.$t(value)
            } else if (key==='create_time') {
              value = this.$date(value)
            }
            return value ? value : '--'
          }
        }
      })
    },
    mapTableWithdrawColumns() {
      return this.withdrawColumns.map(item => {
        return {
          hearderLabel: this.tableHeaderTransfrom(item), 
          prop: item,
          headerAlign: item==='create_time'? 'left' : 'right',
          handleValue: (value, key) => {
            if (key==='create_time') {
              value = this.$date(value)
            }
            if (key==='state') {
              switch (value) {
                case -1:
                  value = 'withdraw_state_unAudited'
                  break
                case -100:
                  value = 'withdraw_state_padding'
                  break
                case -2:
                  value = 'withdraw_state_canceled'
                  break
                case 0:
                  value = 'withdraw_state_audited_unsigned'
                  break
                case 1:
                  value = 'withdraw_state_signed'
                  break
                case 2:
                  value = 'withdraw_state_broadcast_send'
                  break
                case 3:
                  value = 'withdraw_state_broadcast_failed'
                  break
                case 4:
                  value = 'withdraw_state_broadcast_success'  
                  break
              }
              value = this.$t(value)
            } 
            return value ? value : '--'
          }
        }
      })
    },
    mapTableRewardColumns() {
      return this.rewardColumns.map(item => {
        return {
          hearderLabel: this.tableHeaderTransfrom(item), 
          prop: item,
          headerAlign: item==='create_time'? 'left' : 'right',
          handleValue: (value, key) => {
            if (key==='create_time') {
              value = this.$date(value)
            }
            else if (key==='state') {
              switch (value) {
                case -1: 
                  value = 'deposit_state_error'
                  break
                case 0:
                  value = 'pending'
                  break
                case 1: 
                  value = 'done'
                  break
                default:
                  value = 'pending'
                  break
              }
              value = this.$t(value)
            }
            else if (key==='name') {
              value = this.$t(`fund_contract.type_dict.${value}`) 
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
          if (state.fiatMoney === 'CNY'){
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
    cancelWithdraw(param) {
      this.$confirm(this.$t('fund_assets_withdraw_revoke_tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        service.Cancellationoforders( {id:param}).then(res => {
          if(res.code===0){
            this.handlePageChange()
            this.$message({
              type: 'success',
              message: this.$t('otc_sidees11'),
            });
          } else {
            this.$message({
              type: 'warning',
              message: `${res.message}`
            })
          }
        })
      })
    },
    tableHeaderTransfrom(item) {
      if (item==='from_balance') {
        return this.$t('transfer_from_a')
      } else if (item==='to_balance') {
        return this.$t('transfer_to_a')
      } else if (item==='available') {
        return this.$t('avlb')
      } else if (item==='locking') {
        return this.$t('asset_th_unavlb')
      } else if (item==='estValue') {
        return `${this.$t('homechart_fiat')}(${this.fiatMoney})`
       } else if (item==='name') {
        return this.$t('order_th_type')
      } else {
        return this.$t(item)
      }
    },
    handleClickTabs(name) {
      if (this.$route.query.t) {
        this.$router.replace({ query: {} })
      }
      this.temPageConfig = {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
      this.tab = name 
    },
    handleClickSubTab(name) {
      if (this.$route.query.t) {
        this.$router.replace({ query: {} })
      }
      this.temPageConfig = {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
      this.subTab = name 
      // this.handlePageChange()
    },
    handlePageChange(pageConfig) {  
      this.temPageConfig = pageConfig || this.temPageConfig 
      const { pageSize, currentPage } = this.temPageConfig 
      if (this.tab==='personal') { 
        service.getAccountWalletList().then(res => {
          if (!res.code) {
            this.tableAssetsList = res.data 
            this.tableAssetsList.map(item => {
              item.camount = this.$big(item.available).plus(item.withdrawing).plus(item.locking)
              item.estUsdtValue = this.calcEstValue(item) 
              // item.estValue = this.calcUsdtTransfer(item.estUsdtValue, this.fiatMoney ) 
              item.estValue = this.calcFiatEstValue(item)
            })
          }
        })
      } else {
        switch(this.subTab) {
          case 'transfer': 
            service.getBalanceList({page:currentPage,size:pageSize}).then(res => {
              if (!res.code) {
                this.tableTransferList = res.data.data
                this.temPageConfig.total = res.data.total
              }
            })
            break;
          case 'deposit': // 充币记录
            service.getDepositHistory({page:currentPage,size:pageSize}).then(res => {
              if (!res.code) {
                this.tableDepositList = res.data
                if(this.tableDepositList.length < pageSize){
                  this.isLastPage = true
                } else {
                  this.isLastPage = false
                }
              }
            })
            break;
          case 'withdraw': // 提币记录
            service.getWithdrawHistory({page:currentPage,size:pageSize}).then(res => {
              if (!res.code) {
                this.tableWithdrawList = res.data
                if(this.tableWithdrawList.length < pageSize){
                  this.isLastPage = true
                } else {
                  this.isLastPage = false
                }
              }
            })
            break;
          case 'reward':  // 发放奖励记录
            service.getRewardHistory({page:currentPage,size:pageSize}).then(res => {
              if (!res.code) {
                this.tableRewardList = res.data.data
                this.temPageConfig.total = res.data.total
              }
            })
            break
        }
      }
    },
    handleShowCXID (row) { 
      if (!!row.txid && !!this.coinList[row.currency + '_' + row.chain]) {
        const url = this.coinList[row.currency + '_' + row.chain].scan_url.replace('${txid}',row.txid)
        window.open(url)
      }
    },
    filterPair(e) {

    },
    async fetchCoins() {
      let res = await service.getCoins()
      if (!res.code && !!res.data) { 
        res.data.map(item => {
          this.coinList[item.currency + '_' + item.chain] = item
        })
      }
    },
    calcFiatEstValue (item) {
      let res = this.$big(0)
      let {currency,camount} = item  
      if (item.rates) {
        res = this.$big(camount).times(item.rates[this.fiatMoney] || 0).round(4, 0).toFixed(4)
      } 
      return res
    }, 
    // calcUsdtToBtc (amount) {
    //   let result = this.$big(0)
    //   if (this.state.rate.USDT) {
    //     result = this.$big(amount).times(this.state.rate.USDT.BTC)
    //   }
    //   return result
    // },
  },
  created() {
    this.fetchCoins() 
    if (this.$route.query.t) {
      this.tab = this.$route.query.t
    }
    if (this.$route.query.s) {
      this.subTab = this.$route.query.s
    } 
  }
}
</script>

<style lang="scss">
@import '../style.scss';
</style>