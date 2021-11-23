<template>
  <div class="markets-container">
    <div class="nav-box">
      <v-navbc myClass="light" /> 
    </div>
    <div class="markets-banner">
      <div class="markets-box" flex="main:justify">
        <div class="left ml-10">
          <h3>{{$t('market.name')}}</h3>
        </div>
        <div class="right mr-10"> 
          <el-input
            :placeholder="$t('market.search')"
            size="small"
            suffix-icon="el-icon-search"
            v-model="inputSearch">
          </el-input>
        </div> 
      </div>
    </div>
    <div class="markets-main"> 
      <div class="markets-box">
        <div class="tab-nav" flex="main:justify">
          <div class="left" flex="dir:column"> 
            <div @click="handleClickTabs('all')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='all'}]">
              <label>{{$t('allin')}}</label> 
            </div>
            <div @click="handleClickTabs('trading')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='trading'}]">
              <label>{{lang.middle.orders}}</label> 
            </div>
            <div @click="handleClickTabs('btc')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='btc'}]">
              <label>{{$t('currency-btc')}}</label> 
            </div> 
            <div @click="handleClickTabs('unit')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='unit'}]">
              <label>{{$t('currency-unit')}}</label> 
            </div> 
            <div @click="handleClickTabs('mix')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='mix'}]">
              <label>{{$t('currency-mix')}}</label> 
            </div>
          </div>
          <div class="right">
            <span>{{$t('contract_24_hour_trade')}}： <label class="ml-10">{{tradeTotal}} </label>USDT</span>
          </div>
        </div> 
        <div class="markets-table">
          <template v-if="(selectTab==='all' || selectTab==='trading')"> 
            <div class="title mb-10">
              <h4>{{$t('trading')}}</h4>
            </div>
            <div class="grid mb-30">
              <el-row class="hander mt-10 mb-20">
                <!-- <el-col :span="1">#</el-col> -->
                <el-col :span="4"> 
                  <div @click="setTradingSort('product')">
                    <sort color="#01CED1" :sort="sortTrading" :label="$t('currency')" :state="stateTradingSortBy('product')"/>
                  </div>
                </el-col>
                <el-col :span="3"> 
                  <div @click="setTradingSort('price')">
                    <sort color="#01CED1" :sort="sortTrading" :label="$t('market.orderdeal')" :state="stateTradingSortBy('price')"/>
                  </div>
                </el-col>
                <el-col :span="3"> 
                  <div @click="setTradingSort('delta')">
                    <sort color="#01CED1" :sort="sortTrading" :label="$t('market.h24change')" :state="stateTradingSortBy('delta')"/>
                  </div> 
                </el-col>
                <el-col :span="4">{{$t('market.h24trade')}}</el-col>
                <el-col :span="4">{{$t('market.h24amount')}}</el-col>
                <el-col :span="4"  flex="main:center">{{$t('market.view')}}</el-col>
                <el-col :span="2"  flex="main:right">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in tradingShowList"  
                :key="index" 
                class="row mt-10">
                <!-- <el-col :span="1">{{index + 1}}</el-col> -->
                <el-col :span="4" flex="cross:center"> 
                  <img class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.product)" alt="">
                  {{item.product}}<span class="currency">/{{item.currency}}</span> &nbsp;
                </el-col>
                <el-col :span="3" >{{item.price}} &nbsp;</el-col>
                <el-col :span="3">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp;
                </el-col>
                <el-col :span="4">{{item.vol | fixed(2)}} <span class="currency">{{item.product}}</span> &nbsp;</el-col>
                <el-col :span="4">{{$big(item.vol || 0).times(item.price || 0)| fixed(2)}} <span class="currency">{{item.currency}}</span> &nbsp;</el-col>
                <el-col :span="4" flex="main:center">   
                  <span v-if="quoteList[item.name]">
                    <quote-view :historyList="quoteList[item.name]"  :delta="item.delta"/>  
                  </span> 
                  &nbsp;
                </el-col>
                <el-col :span="2" flex="main:right"> 
                  <router-link :to="{name:'trading', params: {pair: item.name}  }">
                    <el-button size="mini" type="primary">{{$t('asset_trading')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div> 
          </template>
          <template v-if="(selectTab==='all' || selectTab==='btc')"> 
            <div class="title mb-10">
              <h4>{{$t('currency-btc')}}</h4>
            </div>
            <div class="grid mb-10">
              <el-row class="hander mt-10 mb-20">
                <!-- <el-col :span="1">#</el-col> -->
                <!-- <el-col :span="4">{{$t('currency')}}</el-col>
                <el-col :span="3">{{$t('market.orderdeal')}}</el-col>
                <el-col :span="3">{{$t('market.h24change')}}</el-col> -->
                <el-col :span="4"> 
                  <div @click="setBtcSort('currency')">
                    <sort color="#01CED1" :sort="true" :label="$t('currency')" :state="stateBtcSortBy('currency')"/>
                  </div>
                </el-col>
                <el-col :span="3"> 
                  <div @click="setBtcSort('price')">
                    <sort color="#01CED1" :sort="true" :label="$t('market.orderdeal')" :state="stateBtcSortBy('price')"/>
                  </div>
                </el-col>
                <el-col :span="3"> 
                  <div @click="setBtcSort('delta')">
                    <sort color="#01CED1" :sort="true" :label="$t('market.h24change')" :state="stateBtcSortBy('delta')"/>
                  </div> 
                </el-col>
                <el-col :span="4">{{$t('market.h24trade')}}</el-col>
                <el-col :span="4">{{$t('market.h24amount')}}</el-col>
                <el-col :span="4"  flex="main:center">{{$t('market.view')}}</el-col>
                <el-col :span="2"  flex="main:right">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in btcShowList"   
                :key="index" 
                class="row mt-10">
                <!-- <el-col :span="1">{{index + 1}}</el-col> -->
                <el-col :span="4" flex="cross:center">
                  <img  class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.currency.replace('USD', ''))" alt="">
                  {{item.currency.replace('USD', '')}}<span class="currency">/USD</span> &nbsp;
                </el-col>
                <el-col :span="3">{{item.price}} &nbsp;</el-col>
                <el-col :span="3">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp;
                  &nbsp;
                </el-col>
                <el-col :span="4">
                  <span v-if="+item.vol">{{ $big(item.vol).div(item.price).round(item.price_scale)}}  <span class="currency">{{item.currency.replace('USD', '')}}</span></span>
                  &nbsp;
                </el-col>
                <el-col :span="4">{{item.vol | fixed(2)}} <span class="currency">USD</span> &nbsp;</el-col>
                <el-col :span="4" flex="main:center">
                  <span v-if="quoteList[item.name]">
                    <quote-view :historyList="quoteList[item.name ]"  :delta="item.delta"/>   
                  </span>
                  &nbsp; 
                </el-col>
                <el-col :span="2" flex="main:right"> 
                  <router-link :to="{name:'future', query: {pair: item.symbol}  }">
                    <el-button size="mini" type="primary">{{$t('asset_trading')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </template>
          <template v-if="(selectTab==='all' || selectTab==='unit')"> 
            <div class="title mb-10">
              <h4>{{$t('currency-unit')}}</h4>
            </div>
            <div class="grid mb-10">
              <el-row class="hander mt-10 mb-20"> 
                <el-col :span="4"> 
                  <div @click="setUnitSort('currency')">
                    <sort color="#01CED1" :sort="true" :label="$t('currency')" :state="stateUnitSortBy('currency')"/>
                  </div>
                </el-col>
                <el-col :span="3"> 
                  <div @click="setUnitSort('price')">
                    <sort color="#01CED1" :sort="true" :label="$t('market.orderdeal')" :state="stateUnitSortBy('price')"/>
                  </div>
                </el-col>
                <el-col :span="3"> 
                  <div @click="setUnitSort('delta')">
                    <sort color="#01CED1" :sort="true" :label="$t('market.h24change')" :state="stateUnitSortBy('delta')"/>
                  </div> 
                </el-col>
                <el-col :span="4">{{$t('market.h24trade')}}</el-col>
                <el-col :span="4">{{$t('market.h24amount')}}</el-col>
                <el-col :span="4"  flex="main:center">{{$t('market.view')}}</el-col>
                <el-col :span="2"  flex="main:right">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in unitShowList"   
                :key="index" 
                class="row mt-10">
                <!-- <el-col :span="1">{{index + 1}}</el-col> -->
                <el-col :span="4" flex="cross:center">
                  <img  class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.currency)" alt="">
                  {{item.currency}}<span class="currency">/USD</span> &nbsp;
                </el-col>
                <el-col :span="3">{{item.price}} &nbsp;</el-col>
                <el-col :span="3">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp;
                  &nbsp;
                </el-col>
                <el-col :span="4">
                  <span v-if="+item.vol">{{ $big(item.vol).div(item.price).round(item.price_scale)}}  <span class="currency">{{item.currency}}</span></span>
                  &nbsp;
                </el-col>
                <el-col :span="4">{{item.vol}} <span class="currency">USD</span>&nbsp;</el-col>
                <el-col :span="4" flex="main:center">
                  <span v-if="quoteList[item.symbol]">
                    <quote-view :historyList="quoteList[item.symbol]"  :delta="item.delta"/>   
                  </span>
                  &nbsp; 
                </el-col>
                <el-col :span="2" flex="main:right"> 
                  <router-link :to="{name:'unit', query: {pair: item.symbol}  }">
                    <el-button size="mini" type="primary">{{$t('asset_trading')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </template>
          <template v-if="(selectTab==='all' || selectTab==='mix')"> 
            <div class="title mb-10">
              <h4>{{$t('currency-mix')}}</h4>
            </div>
            <div class="grid mb-10">
              <el-row class="hander mt-10 mb-20">
                <!-- <el-col :span="1">#</el-col> -->
                <!-- <el-col :span="4">{{$t('currency')}}</el-col>
                <el-col :span="3">{{$t('market.orderdeal')}}</el-col>
                <el-col :span="3">{{$t('market.h24change')}}</el-col> -->
                <el-col :span="4"> 
                  <div @click="setMixSort('currency')">
                    <sort color="#01CED1" :sort="true" :label="$t('currency')" :state="stateMixSortBy('currency')"/>
                  </div>
                </el-col>
                <el-col :span="3"> 
                  <div @click="setMixSort('price')">
                    <sort color="#01CED1" :sort="true" :label="$t('market.orderdeal')" :state="stateMixSortBy('price')"/>
                  </div>
                </el-col>
                <el-col :span="3"> 
                  <div @click="setMixSort('delta')">
                    <sort color="#01CED1" :sort="true" :label="$t('market.h24change')" :state="stateMixSortBy('delta')"/>
                  </div> 
                </el-col>
                <el-col :span="4">{{$t('market.h24trade')}}</el-col>
                <el-col :span="4">{{$t('market.h24amount')}}</el-col>
                <el-col :span="4"  flex="main:center">{{$t('market.view')}}</el-col>
                <el-col :span="2"  flex="main:right">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in mixShowList"   
                :key="index" 
                class="row mt-10">
                <!-- <el-col :span="1">{{index + 1}}</el-col> -->
                <el-col :span="4" flex="cross:center">
                  <img  class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.currency)" alt="">
                  {{item.currency}}<span class="currency">/USDT</span> &nbsp;
                </el-col>
                <el-col :span="3">{{item.price}} &nbsp;</el-col>
                <el-col :span="3">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp;
                  &nbsp;
                </el-col>
                <el-col :span="4">
                  <span v-if="+item.vol">{{ $big(item.vol).div(item.price).round(item.price_scale)}}  <span class="currency">{{item.currency}}</span></span>
                  &nbsp;
                </el-col>
                <el-col :span="4">{{item.vol}} <span class="currency">USDT</span>&nbsp;</el-col>
                <el-col :span="4" flex="main:center">
                  <span v-if="quoteList[item.symbol]">
                    <quote-view :historyList="quoteList[item.symbol]"  :delta="item.delta"/>   
                  </span>
                  &nbsp; 
                </el-col>
                <el-col :span="2" flex="main:right"> 
                  <router-link :to="{name:'mix', query: {pair: item.symbol}  }">
                    <el-button size="mini" type="primary">{{$t('asset_trading')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </template>
          <!-- <template v-if="(selectTab==='all' || selectTab==='blend')"> 
            <div class="title mb-10">
              <h4>{{$t('trading')}}</h4>
            </div>
            <div class="grid mb-30">
              <el-row class="hander mt-10 mb-20"> 
                <el-col :span="5">{{$t('currency')}}</el-col>
                <el-col :span="4">{{$t('contract_block_orderdeal')}}</el-col>
                <el-col :span="5"> 
                   {{$t('market.h24change')}} 
                </el-col>
                <el-col :span="4">{{$t('contract_24_hour_trade')}}</el-col> 
                <el-col :span="4" flex="main:center">{{$t('market.view')}}</el-col>
                <el-col :span="2"  flex="main:right">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in blendShowList"  
                v-show="index < 5"
                :key="index" 
                class="row mt-10"> 
                <el-col :span="5">
                  <img  class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.product)" alt="">
                  {{item.product}}<span class="currency">/{{item.currency}}</span>  &nbsp;
                </el-col>
                <el-col :span="4">{{item.price}} &nbsp;</el-col>
                <el-col :span="5">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp;
                  &nbsp;
                </el-col>
                <el-col :span="4">
                  <span v-if="+item.vol">{{ $big(item.vol).div(item.price).round(item.price_scale)}}  
                    <span class="currency">{{item.product}}</span>
                  </span>
                  &nbsp;
                </el-col> 
                <el-col :span="4" flex="main:center"> 
                  <span v-if="quoteList[item.symbol]">
                    <quote-view :historyList="quoteList[item.symbol]"  :delta="item.delta"/>   
                  </span>
                  &nbsp;
                </el-col>
                <el-col :span="2" flex="main:right">
                  <router-link :to="{name:'blend', query: {pair: item.symbol}  }">
                    <el-button size="mini" type="primary">{{$t('asset_trading')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </template> -->
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import {state} from '@/modules/store'
import utils from '@/modules/utils'
import wsNew from '@/modules/ws-new'
import quoteView from './quoteView'
import VNavbc from '@/components/VNavBC'
import Sort from '@/views/trading1/components/Sort' 
import _ from 'lodash'
export default {
  components: {quoteView, VNavbc, Sort},
  data() {
    return {
      state,
      tradingList: [],
      btcList: [],
      unitList: [],
      mixList: [],
      blendList: [],
      quoteList: {},
      selectTab: 'all',
      inputSearch: '',
      sortTrading: true,
      sortTradingBy: '',
      sortTradingState: 0, // 0:不排序 1:降序 2:升序
      sortMixBy: '',
      sortMixState: 0,
      sortBlendBy: '',
      sortBlendState: 0, 
      sortUnitBy: '',
      sortUnitState: 0,
      sortBtcBy: '',
      sortBtcState: 0
    }
  },
  computed: {
    lang () { 
      return this.$t('home')
    },
    tradingShowList() {
      let list = this.tradingList.filter(item => { 
        return (item.product.indexOf(this.inputSearch.toUpperCase()) > -1 || item.currency.indexOf(this.inputSearch.toUpperCase()) > -1) && item.market_hidden===1
      }) 
      if (this.sortTradingState > 0 && this.sortTradingBy) {
        return list.sort((a, b) => {
          if (this.sortTradingState === 1) { 
            if (this.sortTradingBy==='product') {
              return b[this.sortTradingBy].charCodeAt(0) - a[this.sortTradingBy].charCodeAt(0)
            }
            return b[this.sortTradingBy] - a[this.sortTradingBy]
          } else if (this.sortTradingState === 2) {
            if (this.sortTradingBy==='product') {
              return a[this.sortTradingBy].charCodeAt(0) - b[this.sortTradingBy].charCodeAt(0)
            }
            return a[this.sortTradingBy] - b[this.sortTradingBy]
          } 
        }) 
      } else {
        list = list.sort((a,b) => (+a.rank)-(+b.rank))
        return list
      }
    },
    btcShowList() {
      let list = this.btcList.filter(item => {
        return item.name.indexOf(this.inputSearch.toUpperCase()) > -1 
      }) 
      if (this.sortBtcState > 0 && this.sortBtcBy) {
        return list.sort((a, b) => {
          if (this.sortBtcState === 1) { 
            if (this.sortBtcBy==='currency') {
              return b[this.sortBtcBy].charCodeAt(0) - a[this.sortBtcBy].charCodeAt(0)
            }
            return b[this.sortBtcBy] - a[this.sortBtcBy]
          } else if (this.sortBtcState === 2) {
            if (this.sortBtcBy==='currency') {
              return a[this.sortBtcBy].charCodeAt(0) - b[this.sortBtcBy].charCodeAt(0)
            }
            return a[this.sortBtcBy] - b[this.sortBtcBy]
          } 
        }) 
      } else {
        list = list.sort((a,b) => (+a.rank)-(+b.rank))
        return list
      }
    },
    unitShowList() {
      let list = this.unitList.filter(item => {
        return item.name.indexOf(this.inputSearch.toUpperCase()) > -1 
      })
      if (this.sortUnitState > 0 && this.sortUnitBy) {
        return list.sort((a, b) => { 
          if (this.sortUnitState === 1) { 
            if (this.sortUnitBy==='currency') {
              return b[this.sortUnitBy].charCodeAt(0) - a[this.sortUnitBy].charCodeAt(0)
            }
            return b[this.sortUnitBy] - a[this.sortUnitBy]
          } else if (this.sortUnitState === 2) {
            if (this.sortUnitBy==='currency') {
              return a[this.sortUnitBy].charCodeAt(0) - b[this.sortUnitBy].charCodeAt(0)
            }
            return a[this.sortUnitBy] - b[this.sortUnitBy]
          } 
        }) 
      } else {
        list = list.sort((a,b) => (+a.rank)-(+b.rank))
        return list
      }
    },
    mixShowList() {
      let list = this.mixList.filter(item => {
        return item.name.indexOf(this.inputSearch.toUpperCase()) > -1 
      }) 
      if (this.sortMixState > 0 && this.sortMixBy) { 
        return list.sort((a, b) => { 
          if (this.sortMixState === 1) { 
            if (this.sortMixBy==='currency') {
              return b[this.sortMixBy].charCodeAt(0) - a[this.sortMixBy].charCodeAt(0)
            }
            return b[this.sortMixBy] - a[this.sortMixBy]
          } else if (this.sortMixState === 2) {
            if (this.sortMixBy==='currency') {
              return a[this.sortMixBy].charCodeAt(0) - b[this.sortMixBy].charCodeAt(0)
            }
            return a[this.sortMixBy] - b[this.sortMixBy]
          } 
        }) 
      } else {
        // return list
        return list.sort((a, b) => {
           return a['rank'] - b['rank']
        })
      }
    },
    blendShowList() {
      let list = this.blendList.filter(item => {
        return item.name.indexOf(this.inputSearch.toUpperCase()) > -1 
      })
       if (this.sortBlendState > 0 && this.sortBlendBy) {
        return list.sort((a, b) => {
          if (this.sortBlendState === 1) {
            return a[this.sortBlendBy] - b[this.sortBlendBy]
          } else if (this.sortBlendState === 2) {
            return b[this.sortBlendBy] - a[this.sortBlendBy]
          } 
        }) 
      } else {
        return list
      }
    },
    tradeTotal() {
      let vols = this.$big(0)
      this.mixList.forEach((item) => { 
        vols = vols.plus(item.vol || 0)
      })
      return vols
    } 
  },
  methods: { 
    getCoinIcon(coin) {
      return `https://ix-bj-static.oss-cn-beijing.aliyuncs.com/currency-coin/${coin}.png`
    },
    setTradingSort(key) { 
      if (this.sortTradingBy === key) {
        this.sortTradingState = (this.sortTradingState + 1) % 3
      } else {
        this.sortTradingBy = key
        this.sortTradingState = 1
      }
    },
    stateTradingSortBy(key) {
      if (key !== this.sortTradingBy) {
        return 0
      } else {
        return this.sortTradingState
      }
    },
    setBtcSort(key) { 
      if (this.sortBtcBy === key) {
        this.sortBtcState = (this.sortBtcState + 1) % 3
      } else {
        this.sortBtcBy = key
        this.sortBtcState = 1
      }
    },
    stateBtcSortBy(key) {
      if (key !== this.sortBtcBy) {
        return 0
      } else {
        return this.sortBtcState
      }
    },
    setMixSort(key) { 
      if (this.sortMixBy === key) {
        this.sortMixState = (this.sortMixState + 1) % 3
      } else {
        this.sortMixBy = key
        this.sortMixState = 1
      }
    },
    stateMixSortBy(key) {
      if (key !== this.sortMixBy) {
        return 0
      } else {
        return this.sortMixState
      }
    },
    setUnitSort(key) { 
      if (this.sortUnitBy === key) {
        this.sortUnitState = (this.sortUnitState + 1) % 3
      } else {
        this.sortUnitBy = key
        this.sortUnitState = 1
      }
    },
    stateUnitSortBy(key) {
      if (key !== this.sortUnitBy) {
        return 0
      } else {
        return this.sortUnitState
      }
    },
    setBlendSort(key) { 
      if (this.sortBlendBy === key) {
        this.sortBlendState = (this.sortBlendState + 1) % 3
      } else {
        this.sortBlendBy = key
        this.sortBlendState = 1
      }
    },
    stateBlendSortBy(key) {
      if (key !== this.sortBlendBy) {
        return 0
      } else {
        return this.sortBlendState
      }
    },
    async fetch() {
      let pairs = [] 
      let [trading, future, unit, mix] = await Promise.all([
        service.getPairList(),
        service.getContractSymList(),
        service.getUnitContractSymList(),
        service.getMixContractSymList(),
        // service.getBlendSymbolList()
      ])
      if (!trading.code && trading.data) {
        this.tradingList = trading.data.items
        this.tradingList.forEach((item) => {
          this.$set(item, 'price', item.price)
          this.$set(item, 'delta', item.delta)
          this.$set(item, 'vol', item.vol),
          this.$set(item, 'quote', null)
          pairs.push(item.name) 
        })
      }
      if (!future.code && future.data) {
        this.btcList = future.data.items
        this.btcList.forEach((item) => {
          this.$set(item, 'price', item.price)
          this.$set(item, 'delta', item.delta)
          this.$set(item, 'vol', item.vol),
          this.$set(item, 'quote', null)
          pairs.push(item.name) 
        })
      }
      if (!unit.code && unit.data) {
        this.unitList = unit.data.items
        this.unitList.forEach((item) => {
          this.$set(item, 'price', item.price)
          this.$set(item, 'delta', item.delta)
          this.$set(item, 'vol', item.vol),
          this.$set(item, 'quote', null)
          pairs.push(item.symbol) 
        })
      }
      if (!mix.code && mix.data) { 
        this.mixList = mix.data.items 
        this.mixList.forEach((item) => {
          this.$set(item, 'price', item.price)
          this.$set(item, 'delta', item.delta)
          this.$set(item, 'vol', item.vol)
          this.$set(item, 'quote', null)
          pairs.push(item.symbol)  
        })
      }
      // if (!blend.code && blend.data) { 
      //   this.blendList = blend.data 
      //   this.blendList.forEach((item) => {
      //     this.$set(item, 'price', item.price)
      //     this.$set(item, 'delta', item.delta)
      //     this.$set(item, 'vol', item.vol)
      //     this.$set(item, 'quote', null)
      //     pairs.push(item.symbol + state.affix) 
      //   })
      // }  
      this.fetchQuote(pairs)  
    },
    async fetchQuote(pairs) {
      const to = (new Date) * 1
      const from = to - 1000 * 60 * 60 * 24
      const quoteList = {}
      if (pairs.length > 0) {
        const res = await service.getQutoHistoryMultiple({
          period: '1h',
          pair: pairs.toString(),
          begin: from,
          end: to
        }) 
        if (!res.code) {
          res.data.map(item => {
            if (!quoteList[item.pair]) {
              quoteList[item.pair] = []
            }
            quoteList[item.pair].push(item)
          })
        }
        this.quoteList = quoteList 
      }  
    },
    subMarket() { 
      if (utils.$tvSocket) {
        utils.$tvSocket.$destroy()
      }
      utils.$tvSocket = wsNew.create()
      utils.$tvSocket.$on('open', () => { 
        utils.$tvSocket.socket.send('{"op":"subscribepub","args":["market@ticker"]}') 
        
      }) 
      utils.$tvSocket.$on('message', (datas) => {   
        if (datas.topic && datas.topic.indexOf('market@ticker') > -1) { 
          datas.data.forEach(data => {
            this.patch(data)
          }) 
        }
      })
    }, 
    patch(item) { 
      let find = this.tradingList.find(pair => pair.name === item.pair)
      if (!find) {
        find = this.mixList.find(pair => pair.symbol  === item.pair)
      } 
      if (!find) {
        find = this.btcList.find(pair => pair.name  === item.pair)
      } 
      if (!find) {
        find = this.unitList.find(pair => pair.symbol  === item.pair)
      } 
      if (!find) {
        find = this.mixList.find(pair => pair.symbol  === item.pair)
      } 
      // if (!find) {
      //   find = this.blendList.find(pair => pair.symbol + state.affix  === item.pair)
      // }
      if (find) { 
        find.price = item.current
        find.delta = this.$big(item.increment_24h || 0).mul(100).div(this.$big(item.current).minus(item.increment_24h)).round(2, this.C.ROUND_HALF_UP).toFixed(2)
        find.vol = item.volume_24h
        find.tick = item
      } 
    },
    handleClickTabs(tab) {
      this.selectTab = tab
    }
  },
  async created() {
    await this.fetch()
    this.subMarket() 
    // service.cefiTest()
  },
  destroyed() {

  }
}
</script>

<style lang="scss">
.markets-container { 
  .nav-box {
    position: fixed;
    top: 0;
    left: 0; 
    width: 100%;
    z-index: 4; 
  }
  .markets-banner { 
    background-color: $primary;
    height: 310px;
    color: $primary-back;
    .markets-box {
      margin: 0 auto;
      padding-top: 150px;
      width: 1200px; 
      .left {
        font-size: 30px;
      }
    }  
  }
  .markets-main {
    .markets-box { 
      margin: -100px auto 100px;
      width: 1200px;
      background-color: #ffffff;
      border-radius:5px;
      box-shadow: 0 0 20px 0 rgba(0,0,0,0.05);  ; 
      .tab-nav {
        padding: 45px 55px 20px;
        color: #9C9C9C;
        .tab-nav-item {
          font-size: 14px; 
          &.active {
            color: #373737;
            border-bottom: 2px solid $primary;
          }
        }
      }
      .markets-table {
        padding: 10px 55px;
        .title {
          line-height: 3em;
          font-size: 14px;
          text-indent: 10px;
          background-color: #fafafa;
        }
        .hander {
          font-size: 14px;
          color: #9C9C9C;
        }
        .row {
          line-height: 42px;
          font-size: 14px;
        }
        .currency {
          font-size: 11px;
          color: #9C9C9C;
        }
      }
    } 
  }
}
</style>