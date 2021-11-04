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
            交易记录
          </div> 
        </div>
      </div> 
      <div v-if="tab==='personal'" class="fund-assets-total mt-30 mb-30">
        <div class="total-label" v-html="$t('otc_otutcol_15')">合约资产估值</div>
        <div class="total-value mt-5">
          <span class="valuation">{{calcUsdtTransfer(accountTotal, 'BTC') | fixed(8)}} BTC</span>
          <i class="fail">
            {{`≈ ${state.fiatMoneySymbol}`}} <span>{{calcUsdtTransfer(accountTotal, state.fiatMoney) | fixed(2)}}</span>
          </i> 
        </div>
      </div> 
      <div v-else-if="tab==='history'"  class="fund-assets-sub-menu mt-10 mb-30" flex="main:left">
        <div v-html="$t('contract_trade_his')" @click="handleClickSubTab('tradeHistory')" :class="['assets-item', { active: subTab==='tradeHistory'}]" >
          交易历史
        </div>
        <div v-html="$t('order_history')" @click="handleClickSubTab('orderHistory')" :class="['assets-item', { active: subTab==='orderHistory'}]" >
          委托历史
        </div> 
        <div v-html="$t('capital_record')" @click="handleClickSubTab('assetsHistory')" :class="['assets-item', { active: subTab==='assetsHistory'}]" >
          财务记录
        </div> 
        <div v-html="$t('fund.contract.winloss_record')" @click="handleClickSubTab('profitLossHistory')" :class="['assets-item', { active: subTab==='profitLossHistory'}]" >
          盈亏记录
        </div> 
      </div>   
      <div class="fund-assets-table">
        <div v-if="tab==='history' && subTab!=='assetsHistory'" class="fund-assets-filter pl-20" flex="main:left"> 
          <div class="mr-20">
            <el-select
              id="contractType"
              class="opetion"
              v-model="myfilter.symbol"
              @change="handleFilter"
              :placeholder="$t('please_choose')"
              size="mini" 
              value-key="currency"> 
              <el-option :label="$t('fund.dict.currency.0')"/>
              <el-option
                v-for="(item, idx) in pairList"
                :key="idx"
                :label="`${item.currency}/USDT`"
                :value="item.name"/>
            </el-select>
          </div>
          <div v-if="subTab==='tradeHistory' || subTab==='orderHistory'" class="mr-20">
            <el-select
              class="opetion"
              v-model="myfilter.side" 
              size="mini"
              @change="handleFilter">  
              <el-option v-for="(item, key) in langDict.mix_side"
                :key="key"
                :label="item" 
                :value="key"/>
            </el-select>
          </div>
          <div v-if="subTab==='tradeHistory' || subTab==='orderHistory'" class="mr-20">
            <el-select
              v-if="subTab === 'orderHistory'"
              class="opetion"
              key="orderState"
              v-model="myfilter.orderState"  
              @change="handleFilter"
              size="mini">
              <el-option v-for="(item, key) in langDict.delegate_state"
                  :key="key"
                  :label="item" 
                  :value="key"/>
            </el-select> 
            <el-select
              v-else
              class="opetion"
              key="tradeState"
              v-model="myfilter.tradeState"  
              @change="handleFilter"
              size="mini">
              <el-option v-for="(item, key) in langDict.state"
                  :key="key"
                  :label="item" 
                  :value="key"/>
            </el-select>
          </div>
          <div class="mr-20">
            <el-date-picker
              v-model="myfilter.daterange"
              @change="handleFilter"
              size="mini"
              type="daterange"
              value-format="timestamp"
              range-separator="-"
              :start-placeholder="$t('el.datepicker.startDate')"
              :end-placeholder="$t('el.datepicker.endDate')">
            </el-date-picker>
          </div>
        </div>
        <div class="fund-assets-data">
          <div v-if="tab==='personal'" class="personal">  
            <template>
              <el-table
                :data="tableAssetsList"
                style="width: 100%">
                <el-table-column 
                  v-for="(item, index) in mapTableAssetsColumns"
                  :key="index" 
                  :label="item.headerFun && item.headerFun(item.prop) || item.hearderLabel"
                  :width="item.hearderWidth || ''" 
                  :header-align="item.headerAlign||'left'">
                  <template slot-scope="scope">
                    <div :style="{textAlign:item.headerAlign||'left'}"> 
                      <div v-if="item.prop==='currency'">
                        {{scope.row[item.prop]}}
                      </div>
                      <div v-else>
                        <p class="large">{{ scope.row[item.prop] | fixed(8) }} </p> 
                        <p class="small">
                          ≈ <fiatMoney base="USDT" :value="scope.row[item.prop]" :scale="2"/> 
                          {{ state.fiatMoney }}
                        </p>
                      </div> 
                    </div>
                  </template>
                </el-table-column> 
                <el-table-column
                  prop="currency"
                  :label="$t('operation')"
                  header-align="right"
                  width="100">
                  <template slot-scope="scope"> 
                    <div style="text-align:right;">
                      <router-link  
                        :to="{path:'/nfund/transfer', query: {currency:scope.row.currency}}">
                        {{$t('suvbanean')}}
                      </router-link> 
                    </div>
                    <div style="text-align:right;">
                      <router-link to="/future">{{$t('asset_trading')}}</router-link>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div> 
          <div v-else  class="history">
            <div v-if="subTab==='tradeHistory'">
              <custom-table v-loading="loading" 
                key="tradeHistory"
                :table-list="tableTradeList"
                :table-columns="mapTableTradeColumns"
                @change="handlePageChange">  
              </custom-table>  
            </div>
            <div v-else-if="subTab==='orderHistory'">
              <custom-table v-loading="loading" 
                key="orderHistory"
                :table-list="tableOrderList"
                :table-columns="mapTableOrderColumns"
                @change="handlePageChange">    
              </custom-table>  
            </div>
            <div v-else-if="subTab==='assetsHistory'">
              <custom-table v-loading="loading" 
                key="assetsHistory"
                :table-list="tableFundList"
                :table-columns="mapTableFundColumns"
                @change="handlePageChange">   
              </custom-table>  
            </div>
            <div v-else-if="subTab==='profitLossHistory'">
              <custom-table v-loading="loading" 
                key="profitLossHistory"
                :table-list="tableRealizedList"
                :table-columns="matTableRealizedColumns"
                @change="handlePageChange">   
              </custom-table>   
              <div class="realized-box mt-30 pt-30" flex="box:mean">
                <div class="realized-item">
                  <div class="title">{{ $t('fund.contract.total_realized') }} </div>
                  <div class="value">
                    <span :class="realizedList.realized_total > 0 ? 'bgcolor-unp' : 'bgcolor-dnp'" >{{ realizedList.realized_total | fixed(2) }}<b>USDT</b></span>
                  </div> 
                </div>
                <div class="realized-item">
                  <div class="title">{{ $t('fund.contract.current_day_realized') }} </div>
                  <div class="value">
                    <span :class="realizedList.realized_today > 0 ? 'bgcolor-unp' : 'bgcolor-dnp'" >{{ realizedList.realized_today | fixed(2) }}<b>USDT</b></span>
                  </div> 
                </div>
                <div class="realized-item">
                  <div class="title">{{ $t('fund.contract.unrealized_mark_price') }} </div>
                  <div class="value">
                    <span :class="realizedList.realized_market > 0 ? 'bgcolor-unp' : 'bgcolor-dnp'" >{{ realizedList.realized_market | fixed(2) }}<b>USDT</b></span>
                  </div> 
                </div>
                <div class="realized-item">
                  <div class="title">{{ $t('fund.contract.unrealized_last_price') }} </div>
                  <div class="value">
                    <span :class="realizedList.realized_price > 0 ? 'bgcolor-unp' : 'bgcolor-dnp'" >{{ realizedList.realized_price | fixed(2) }}<b>USDT</b></span>
                  </div> 
                </div> 
              </div>
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
import fiatMoney from '@/components/FiatMoney'
import service from '@/modules/service' 
import mixin from '../mixins.js'
export default {
  mixins: [mixin],
  components: {
    customTable,
    fiatMoney 
  },
  data() {
    return {
      state,
      search:'',
      check: '', 
      tab: 'personal',
      subTab: 'tradeHistory',
      loading: false,
      lastColumnConfig: {
        headerLabel: 'operation',
        headerAlign: 'right',
        width: '100'
      },
      temPageConfig: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },  
      myfilter: {
        name: '',
        side: '0',
        tradeState: '0',
        orderState: '0',
        daterange: '',  
      },
      pairList: [],
      tableAssetsList: [],
      tableTradeList: [],
      tableOrderList: [],
      tableFundList: [],
      realizedList: [],
      tableRealizedList: [],
      assetsColumns: [ 
        'currency',
        'available', //账户权益
        'available_balance', //可用余额
        'unrealized', //未实现盈亏
        // 'ex_available', //体验金余额
        'margin_position', //仓位保证金
        'margin_delegation', //委托保证金 
      ],
      tradeColumns: [
        'create_time', //成交时间
        'name', // 合约币对
        'origin', //成交类型	
        'side', //方向
        'amount', //成交数量
        'price', //成交价格
        'total', //价值
        'fee_rate', //资金费率
        'fee', //已付费用
        // 'deduction_fee', //体验金扣除值
        'type', //委托类型
        'realized', //已实现盈亏 
      ],
      orderColumns: [ 
        'create_time', //委托时间
        'name', // 合约币对 
        'side', //方向
        'amount', //委托数量
        'price', //委托价格
        'executed',//完全成交
        'surplus', //剩余
        'executed_price', //成交价格
        'trigger_price',//触发价格
        'total', //委托价值 
        'type', //委托类型
        'state', //状态
        'id', //委托ID
      ],
      fundColumns: [
        'create_time', //委托时间
        'currency', //币种
        'from_balance',//操作
        'amount', //数量
        'available', //余额
        'status', //状态
      ],
      realizedColumns: [
        'currency', //合约
        'side', //平仓方向
        'amount', //数量
        'open_price', //入场价格
        'sell_price', //出场价格
        'realized', //平仓盈亏
        'origin', //出场类型
        'create_time' //平仓成交时间
      ],
    }
  },
  computed: {
    langDict () {
      return this.allLangData.fund.dict
    }, 
    // accountList() {
    //   return state.fund.valueList || {}
    // },
    // total() {
    //   return (this.accountList.mix || {}).btcValue 
    // }, 
    accountTotal() {   
      let sum = this.$big(0)  
      this.tableAssetsList.forEach(item => {
        sum = sum.plus(item.available)
      })
      return sum.toString() 
    }, 
    mapTableAssetsColumns() {
      return this.assetsColumns.map(item => {
        return {
          hearderLabel: this.tableHeaderTransfrom(item, 'assets'),
          headerFun: (value) => {
            if (value==='available') {
              value =  this.$t('contract_account_rights') //'账户权益' 
            } else if (value==='unrealized') {
              value =  this.$t('unrealized_profit_and_loss') //'未实现盈亏' 
            } else if (value==='ex_available') {
              value = this.$t('contract.mapAccountInfo.ex_available') //'体验金余额'
            } else if (value==='margin_position') {
              value = this.$t('warehouse_margin') //'仓位保证金'
            } else if (value==='margin_delegation') {
              value = this.$t('entrust_margin') // '委托保证金'
            } else {
              value = this.$t(value)
            } 
            return value ? value : '--'
          },
          hearderWidth: item==='currency'? '80': '',
          headerAlign: item==='currency'? 'left' : 'right',
          prop: item,
          handleValue: (value, key) => {
            if (key !== 'currency') {
              value = this.$big(value).round(2, 0)
            }
            return value ? value : '--'
          }
        }
      })
    },
    mapTableTradeColumns() {
      return this.tradeColumns.map(item => {
        return {
          hearderLabel: this.tableHeaderTransfrom(item, 'trade'),
          headerFun: (value) => {
            if (value==='create_time') {
              value =  this.$t('contract_deal_time') 
            } else if (value==='name') {
              value = this.$t('contract_name') 
            } else if (value==='origin') {
              value = this.$t('contract_deal_type') 
            } else if (value==='amount') {
              value = this.$t('deal_amount')  
            } else if (value==='price') {
              value = this.$t('contract_deal_price')  
            } else if (value==='total') {
              value = this.$t('contract_value') 
            } else if (value==='side') {
              value = this.$t('deal_th_side') 
            } else if (value==='fee') {
              value = this.$t('contract_has_paid') 
            // } else if (value==='deduction_fee') {
            //   value = this.$t('contract_assign_deduction_fee') 
            } else if (value==='type') {
              value = this.$t('contract_action_delegate_type') 
            } else if (value==='realized') {
              value = this.$t('contract_result_yet') 
            } else {
              value = this.$t(value)
            } 
            return value ? value : '--'
          },
          headerAlign: item==='create_time'? 'left' : 'right',
          prop: item,
          hearderWidth: (key) => {
            if (key==='create_time') {
              return '140px'
            }  
          },
          handleValue: (value, key, row) => {
            if (key === 'create_time') {
              value = this.$date(value/1000)
            } 
            else if (key === 'name') {
              value =`<span class="large">${row.currency.replace(/USD/,'')}</span><span class="small">/USD</span>`
            } 
            else if (key==='origin') {
              value = this.$t('fund.dict.state.' + value)
            }
            else if (key==='side' && +value > 0) { 
              const txt = this.$t('fund.dict.mix_side.'+ value)
              if (+value === 1) {
                value = `<span style="color:#23C88B;">${txt}</span>`
              } else {
                value = `<span style="color:#F24E4D;">${txt}</span>`
              }
            } 
            else if (key==='fee_rate') {
              value = this.$big(value).times(100).round(4,0).toFixed(4) + '%'
            }
            else if (key==='deduction_fee' || key==='fee') {
              value = this.$big(value).round(8,0).toFixed(8)
            }
            else if (key==='price' || key==='total') {
              value = this.$big(value).round(4,0).toFixed(4)
            }
            else if (key === 'type') {
              // value = this.$t('fund.dict.orderType.' + value)
              switch (value) {
                case 1: 
                  value = this.$t('contract.mapFormContent.mapBtns.1.text')
                  break;
                case 2:
                  value = this.$t('contract.mapFormContent.mapBtns.2.text')
                  break;
                case 3:
                  value = this.$t('contract.mapFormContent.mapMenuOptions.3')
                  break;
                case 4:
                  value = this.$t('contract.mapFormContent.mapMenuOptions.4')
                  break;
                case 5:
                  value = this.$t('contract.mapFormContent.mapMenuOptions.5')
                  break;
                case 6:
                  value = this.$t('contract.mapFormContent.mapMenuOptions.6')
                  break;
              }
            }
            else if (key === 'realized') {
              value = this.$big(value).round(4, 0)
            }
            return value ? value : '--'

          },
        }
      })
    },
    mapTableOrderColumns() {
      return this.orderColumns.map(item => {
        return {
          hearderLabel: this.tableHeaderTransfrom(item, 'order'),
          headerFun: (value) => { 
            switch(value) {
              case 'create_time': 
                value = this.$t('contract_assign_time')
                break
              case 'name':
                value = this.$t('contract_name') 
                break
              case 'side':
                value = this.$t('deal_th_side') 
                break
              case 'amount':
                value = this.$t('entrust_amount') 
                break
              case 'price':
                value = this.$t('contract_assign_price') 
                break
              case 'executed':
                value = this.$t('contract_complete_deal') 
                break
              case 'surplus':
                value = this.$t('order_th_unclose') 
                break
              case 'executed_price':
                value = this.$t('contract_deal_price') 
                break
              case 'trigger_price':
                value = this.$t('contract_trigger_price') 
                break
              case 'total':
                value = this.$t('contract_assign_value_raw') 
                break
              case 'type':
                value = this.$t('contract_action_delegate_type') 
                break
              case 'id':
                value = this.$t('contract_assign_id') 
                break
              default:
                value = this.$t(value)
            }
            return value ? value : '--' 
          },
          headerAlign: item==='create_time'? 'left' : 'right',
          prop: item,
          hearderWidth: (key) => {
            if (key==='create_time') {
              return '140px'
            } else if (key==='id') {
              return '90px'
            }
          },
          handleValue: (value, key, row) => {
            if (key === 'create_time') {
              value = this.$date(value)
            } 
            if (key === 'name') {
              value =`<span class="large">${row.currency.replace(/USD/,'')}</span><span class="small">/USD</span>`
            } 
            else if (key==='state') {
              value = this.$t('fund.dict.delegate_state.' + value)
            }
            else if (key==='side' && +value > 0) { 
              const txt = this.$t('fund.dict.mix_side.'+ value)
              if (+value === 1) {
                value = `<span style="color:#23C88B;">${txt}</span>`
              } else {
                value = `<span style="color:#F24E4D;">${txt}</span>`
              }
            } 
            else if (key==='total') {
              value = this.$big(value).round(4, 0).toFixed(4)
            }
            else if (key === 'type') {
              // value = this.$t('fund.dict.orderType.' + value) 
              switch (value) {
                case 1: 
                  value = this.$t('contract.mapFormContent.mapBtns.1.text')
                  break;
                case 2:
                  value = this.$t('contract.mapFormContent.mapBtns.2.text')
                  break;
                case 3:
                  value = this.$t('contract.mapFormContent.mapMenuOptions.3')
                  break;
                case 4:
                  value = this.$t('contract.mapFormContent.mapMenuOptions.4')
                  break;
                case 5:
                  value = this.$t('contract.mapFormContent.mapMenuOptions.5')
                  break;
                case 6:
                  value = this.$t('contract.mapFormContent.mapMenuOptions.6')
                  break;
              }
            }
            else if (key === 'deal_price') {
              value =this.$big(row.price).round(2, 0).toFixed(2)
            }
            else if (key === 'price' || key === 'executed_price') {
              value = this.$big(value).round(2, 0).toFixed(2)
            }
            else if (key === 'surplus') {
              value = +this.$big(row.amount || 0).minus(row['executed'] || 0)
            }
            return value ? value : '--' 
          }
        }
      })
    },
    mapTableFundColumns() {
      return this.fundColumns.map(item => {
        return {
          hearderLabel: this.tableHeaderTransfrom(item, 'fund'),
          headerFun: (value) => {
            if (value==='from_balance') {
              value = this.$t('operation')
            } else if (value==='available') {
              value = this.$t('balance')
            } else {
              value = this.$t(value)
            }
            return value ? value : '--'
          },
          prop: item,
          headerAlign: item==='create_time'? 'left' : 'right',
          handleValue: (value, key, row) => {
            if (key==='from_balance') {
              // value = this.$t(`fund.opetate.${value}`) 
              if (row['to_balance'] === 3) {
                value = this.$t('transfer_in')
              } else if (row['from_balance'] === 3) {
                value = this.$t('transfer_out') 
              } else if (row['opetate'] === 3) {
                value = this.$t('day_liquidation')
              }
            } else if (key==='amount' || key==='available') {
              value = this.$big(value).round(8, 0).toFixed(8)
            } else if (key==='status') {
              value = this.$t('contract_simple_success') 
            }
            return value ? value : '--'
          }
        }
      })
    },
    matTableRealizedColumns() {
      return this.realizedColumns.map(item => {
        return {
          hearderLabel: this.tableHeaderTransfrom(item, 'realized'),      
          headerFun: (key) => {
            let value = ''
            switch(key) {
              case 'side':
                value = this.$t('fund.contract.close_side') 
                break
              case 'open_price': 
                value = this.$t('fund.contract.into_price')
                break
              case 'sell_price':
                value = this.$t('fund.contract.out_price') 
                break
              case 'realized':
                value = this.$t('fund.contract.close_realized') 
                break
              case 'origin':
                value = this.$t('fund.contract.close_type') 
                break
              case 'create_time':
                value = this.$t('fund.contract.close_datetime') 
                break
              default:
                value = this.$t(key) 
            }
            return value ? value : '--' 
          },                      
          prop: item,
          headerAlign: item==='currency'? 'left' : 'right',
          hearderWidth: (key) => {
            if (key==='create_time') {
              return '180px'
            }
          },
          handleValue: (value, key, row) => {
            if (key==='side') {
              value = this.$t('fund.dict.mix_side.'+ value) 
            } else if (key==='realized') {  
              if (+value > 0) {
                value = `<span style="color:#23C88B;">${value}</span>`
              } else {
                value = `<span style="color:#F24E4D;">${value}</span>`
              }
            } else if (key==='origin') {
              value = this.$t('fund.dict.state.' + value)
            } else if (key==='create_time') {
              value = this.$date(value/1000)
            }
            return value ? value : '--'
          } 
        }
      })
    }
  },
  methods: {
    tableHeaderTransfrom(item) {
      if (item==='available') {
        return this.$t('balance')
      } else if (item==='locking') {
        return this.$t('asset_th_unavlb') 
      } else if (item==='side') { 
        return this.$t('deal_th_side')
      } else if (item==='type') { 
        return this.$t('order_th_type')
      } else if (item==='fee') {
        return this.$t('orderdeal_fee')
      } else if (item==='estValue') {
        return `${this.$t('homechart_fiat')}(CNY)`
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
    handleFilter() {
      this.handlePageChange()
    },
    //可用余额
    fetchBalanceList() {
      service.getContractBalanceList().then(res => {
        if (!res.code) {
          this.tableAssetsList = []
          res.data.map(item => { 
            let row = this.tableAssetsList.find(dr => dr.currency === item.currency)
            if (!row) { 
              this.tableAssetsList.push(item)
            } else {
              row.unrealized = this.$big(row.unrealized || 0).plus(item.unrealized).toString() // 未结盈亏
              row.margin_position = this.$big(row.margin_position || 0).plus(item.margin_position).toString() // 仓位保证金
              row.margin_delegation = this.$big(row.margin_delegation || 0).plus(item.margin_delegation).toString() // 委托保证金
            }
          })  
        }
      })
    },
    //委托历史
    fetchOrderHistory(pageConfig) { 
      const { pageSize, currentPage } = pageConfig
      if (!this.myfilter.daterange) this.myfilter.daterange = []
      const params = {
        name: this.myfilter.symbol, 
        side: this.myfilter.side,
        state: this.myfilter.orderState,
        begin_time: this.myfilter.daterange[0],
        end_time: this.myfilter.daterange[1],
        page: currentPage,
        size: pageSize
      }
      service.getContractOrderhistory(params).then(res => {
        if (!res.code) {
          this.tableOrderList = res.data.data
          pageConfig.total = res.data.total
        }
      })
    },
    //交易历史
    fetchTradeHistory(pageConfig) {
      const { pageSize, currentPage } = pageConfig
      if (!this.myfilter.daterange) this.myfilter.daterange = []
      const params = {
        name: this.myfilter.symbol, 
        side: this.myfilter.side,
        state: this.myfilter.tradeState,
        begin_time: this.myfilter.daterange[0],
        end_time: this.myfilter.daterange[1],
        page: currentPage,
        size: pageSize
      }
      service.getContractTradeHistory(params).then(res => {
        if (!res.code) {
          this.tableTradeList = res.data.data
          pageConfig.total = res.data.total
        }
      }) 
    },
    //金本位财务记录
    fetchFundHistory(pageConfig) {
      const { pageSize, currentPage } = pageConfig
      const params = { 
        page: currentPage,
        size: pageSize
      }
      service.getContractFundHistory(params).then(res => {
        if (!res.code) {
          this.tableFundList = res.data.data
          pageConfig.total = res.data.total
        }
      })
    },
    //盈亏历史
    fetchRealized(pageConfig) {
      const { pageSize, currentPage } = pageConfig
      if (!this.myfilter.daterange) this.myfilter.daterange = []
      const params = {
        name: this.myfilter.symbol,  
        begin_time: this.myfilter.daterange[0],
        end_time: this.myfilter.daterange[1],
        page: currentPage,
        size: pageSize
      }
      service.getFutureCloseRealized(params).then(res => {
        if (!res.code) {
          this.realizedList = res.data.data
          this.tableRealizedList = res.data.data.close_realized_list
          pageConfig.total = res.data.total
        }
      })
    },
    fetchSymbolList() {
      service.getContractSymList().then(res => {
        if (!res.code) {
          this.pairList = res.data.items
        }
      })
    },
    async handlePageChange(pageConfig) {
      this.temPageConfig = pageConfig || this.temPageConfig  
      const { pageSize, currentPage } = this.temPageConfig 
      if (this.tab==='personal') {
        this.fetchBalanceList()
      } else {
        if (this.subTab==='tradeHistory') {
          this.fetchTradeHistory(this.temPageConfig)
        } else if (this.subTab==='orderHistory') {
          this.fetchOrderHistory(this.temPageConfig)
        } else if (this.subTab==='assetsHistory') {
          this.fetchFundHistory(this.temPageConfig)
        } else if (this.subTab==='profitLossHistory') {
          this.fetchRealized(this.temPageConfig)
        }
      }
    }
  },
  created() {
    this.fetchSymbolList()
    this.handlePageChange()
  }
}
</script>


<style lang="scss">
@import '../style.scss';

  .bgcolor-unp {
    color:#08C988;
    font-size: 24px;
    b {
      font-size: 16px;
    }
  }
  .bgcolor-dnp {
    color:#F24E4D;
    font-size: 24px;
    b {
      font-size: 16px;
    }
  }
 
</style>