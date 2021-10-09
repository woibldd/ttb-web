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
            :placeholder="$t('search')"
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
            <div  v-if="state.rules.trading" @click="handleClickTabs('trading')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='trading'}]">
              <label>{{$t('header_nav.orders')}}</label> 
            </div>
            <div v-if="state.rules.mix" @click="handleClickTabs('mix')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='mix'}]">
              <label>{{$t('header_nav.mix')}}</label> 
            </div>
            <div v-if="state.rules.blend" @click="handleClickTabs('blend')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='blend'}]">
              <label>{{$t('header_nav.blend')}}</label> 
            </div> 
          </div>
          <div class="right">
            <span>{{$t('contract_24_hour_trade')}}： <label class="ml-10">{{tradeTotal}} </label>USDT</span>
          </div>
        </div>
        <div class="markets-table">
          <template v-if="(selectTab==='all' || selectTab==='trading') && state.rules.trading">
            <div class="title mb-10">
              <h4>{{$t('trading')}}</h4>
            </div>
            <div class="grid mb-30">
              <el-row class="hander mt-10 mb-20">
                <!-- <el-col :span="1">#</el-col> -->
                <el-col :span="4">{{$t('pair')}}</el-col>
                <el-col :span="3">{{$t('contract_block_orderdeal')}}</el-col>
                <el-col :span="3">
                  <div @click="setTradingSort('delta')">
                    <sort
                      :label="$t('market.h24change')"
                      color="#4a4a58"
                      :state="stateTradingSortBy('delta')"/>
                  </div>
                </el-col>
                <el-col :span="4">{{$t('contract_24_hour_trade')}}</el-col>
                <el-col :span="4"> 
                  <div @click="setTradingSort('vol')">
                    <sort
                      :label="$t('market.h24amount')"
                      color="#4a4a58"
                      :state="stateTradingSortBy('vol')"/>
                  </div>
                </el-col>
                <el-col :span="4">{{$t('market.view')}}</el-col>
                <el-col :span="2">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in tradingShowList" :key="index" class="row mt-10">
                <!-- <el-col :span="1">{{index + 1}}</el-col> -->
                <el-col :span="4">
                   <img class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.product)" alt="">
                  {{item.product}}<span class="currency">/{{item.currency}}</span>  &nbsp;
                </el-col>
                <el-col :span="3">{{item.price}} &nbsp;</el-col>
                <el-col :span="3">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp;
                </el-col>
                <el-col :span="4">{{item.vol | fixed(2)}} <span class="currency">{{item.product}}</span> &nbsp;</el-col>
                <el-col :span="4">{{$big(item.vol || 0).times(item.price || 0)| fixed(2)}} <span class="currency">{{item.currency}}</span>&nbsp;</el-col>
                <el-col :span="4">   
                  <span v-if="quoteList[item.name]">
                    <quote-view :historyList="quoteList[item.name]" :delta="item.delta"/>  
                  </span> 
                  &nbsp;
                </el-col>
                <el-col :span="2"> 
                  <router-link :to="{name:'trading', params: {pair: item.name}  }">
                    <el-button size="mini" type="primary">{{$t('order_side_buy')}}/{{$t('order_side_sell')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div> 
          </template>
          <template v-if="(selectTab==='all' || selectTab==='mix') && state.rules.mix">
            <div class="title mb-10">
              <h4>{{$t('header_nav.mix')}}</h4>
            </div>
            <div class="grid mb-30">
              <el-row class="hander mt-10 mb-20">
                <!-- <el-col :span="1">#</el-col> -->
                <el-col :span="4">{{$t('pair')}}</el-col>
                <el-col :span="3">{{$t('contract_block_orderdeal')}}</el-col>
                <el-col :span="3">
                  <div @click="setMixSort('delta')">
                    <sort
                      :label="$t('market.h24change')"
                      color="#4a4a58"
                      :state="stateMixSortBy('delta')"/>
                  </div>
                </el-col>
                <el-col :span="4">{{$t('contract_24_hour_trade')}}</el-col>
                <el-col :span="4">
                  <div @click="setMixSort('vol')">
                    <sort
                      :label="$t('market.h24amount')"
                      color="#4a4a58"
                      :state="stateMixSortBy('vol')"/>
                  </div>
                </el-col>
                <el-col :span="4">{{$t('market.view')}}</el-col>
                <el-col :span="2">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in mixShowList" :key="index" class="row mt-10">
                <!-- <el-col :span="1">{{index + 1}}</el-col> --> 
                <el-col :span="4">
                  <img  class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.currency)" alt="">
                  {{item.currency}}/<span class="currency">USDT</span>  &nbsp;
                </el-col>
                <el-col :span="3">{{item.price}} &nbsp;</el-col>
                <el-col :span="3">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp; 
                </el-col>
                <el-col :span="4">
                  <span v-if="+item.vol">{{ $big(item.vol).div(item.price).round(item.price_scale)}}  <span class="currency">{{item.currency}}</span></span>
                  &nbsp;
                </el-col>
                <el-col :span="4">
                  {{item.vol}} <span class="currency">USDT</span> &nbsp;
                </el-col>
                <el-col :span="4">
                  <span v-if="quoteList[item.symbol + state.affix]">
                    <quote-view :historyList="quoteList[item.symbol + state.affix]" :delta="item.delta"/>   
                  </span>
                  &nbsp; 
                </el-col>
                <el-col :span="2"> 
                  <router-link :to="{name:'mix', query: {pair: item.symbol}  }">
                    <el-button size="mini" type="primary">{{$t('order_side_buy')}}/{{$t('order_side_sell')}}</el-button>
                  </router-link>
                </el-col> 
              </el-row>
            </div>
          </template>
          <template v-if="(selectTab==='all' || selectTab==='blend') && state.rules.blend">
            <div class="title mb-10">
              <h4>{{$t('header_nav.blend')}}</h4>
            </div>
            <div class="grid mb-30">
              <el-row class="hander mt-10 mb-20">
                <!-- <el-col :span="1">#</el-col> -->
                <el-col :span="4">{{$t('pair')}}</el-col>
                <el-col :span="3">{{$t('contract_block_orderdeal')}}</el-col>
                <el-col :span="3"> 

                  <div @click="setBlendSort('delta')">
                    <sort
                      :label="$t('market.h24change')"
                      color="#4a4a58"
                      :state="stateBlendSortBy('delta')"/>
                  </div> 
                </el-col>
                <el-col :span="4">{{$t('contract_24_hour_trade')}}</el-col>
                <el-col :span="4">
                  <div @click="setBlendSort('vol')">
                    <sort
                      :label="$t('market.h24amount')"
                      color="#4a4a58"
                      :state="stateBlendSortBy('vol')"/>
                  </div> 
                </el-col>
                <el-col :span="4">{{$t('market.view')}}</el-col>
                <el-col :span="2">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in blendShowList" :key="index" class="row mt-10">
                <!-- <el-col :span="1">{{index + 1}}</el-col> -->
                <el-col :span="4">
                  <img  class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.product)" alt="">
                  {{item.product}}<span class="currency">/{{item.currency}}</span>  &nbsp;  
                </el-col>
                <el-col :span="3">{{item.price}} &nbsp;</el-col>
                <el-col :span="3">
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
                <el-col :span="4">{{item.vol}} <span class="currency">{{item.currency}}</span>&nbsp;</el-col> 
                <el-col :span="4"> 
                  <span v-if="quoteList[item.symbol + state.affix]">
                    <quote-view :historyList="quoteList[item.symbol + state.affix]" :delta="item.delta"/>   
                  </span>
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <router-link :to="{name:'blend', query: {pair: item.symbol}  }">
                    <el-button size="mini" type="primary">{{$t('order_side_buy')}}/{{$t('order_side_sell')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </template>
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
import Sort from '@/views/trading/components/Sort'
import _ from 'lodash'
export default {
  components: {quoteView, VNavbc, Sort},
  data() {
    return {
      state,
      tradingList: [],
      mixList: [],
      blendList: [],
      quoteList: {},
      selectTab: 'all',
      inputSearch: '',
      sortTradingBy: '',
      sortTradingState: 0, // 0:不排序 1:降序 2:升序
      sortMixBy: '',
      sortMixState: 0,
      sortBlendBy: '',
      sortBlendState: 0, 
    }
  },
  computed: {
    tradingShowList() {
      let list = this.tradingList.filter(item => { 
        return (item.product.indexOf(this.inputSearch.toUpperCase()) > -1 || item.currency.indexOf(this.inputSearch.toUpperCase()) > -1) && item.market_hidden===1
      })
      if (this.sortTradingState > 0 && this.sortTradingBy) {
        return list.sort((a, b) => {
          if (this.sortTradingState === 1) {
            return a[this.sortTradingBy] - b[this.sortTradingBy]
          } else if (this.sortTradingState === 2) {
            return b[this.sortTradingBy] - a[this.sortTradingBy]
          } 
        }) 
      } else {
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
            return a[this.sortMixBy] - b[this.sortMixBy]
          } else if (this.sortMixState === 2) {
            return b[this.sortMixBy] - a[this.sortMixBy]
          } 
        }) 
      } else {
        return list
        // return list.sort((a, b) => {
        //    return a['rank'] - b['rank']
        // })
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
      let [trading, mix, blend] = await Promise.all([
        service.getPairList(),
        service.getMixContractSymList(),
        service.getBlendSymbolList()
      ])
      if (!trading.code && trading.data) {
        this.tradingList = trading.data.items.sort((a,b)=>a.rank-b.rank)
        this.tradingList.forEach((item) => {
          this.$set(item, 'price', item.price)
          this.$set(item, 'delta', item.delta)
          this.$set(item, 'vol', item.vol),
          this.$set(item, 'quote', null)
          pairs.push(item.name) 
        })
      }
      if (!mix.code && mix.data) { 
        this.mixList = mix.data.items.sort((a,b)=>a.rank-b.rank)
        this.mixList.forEach((item) => {
          this.$set(item, 'price', item.price)
          this.$set(item, 'delta', item.delta)
          this.$set(item, 'vol', item.vol)
          this.$set(item, 'quote', null)
          pairs.push(item.symbol + state.affix)  
        })
      }
      if (!blend.code && blend.data) { 
        this.blendList = blend.data.sort((a,b)=>a.rank-b.rank)
        this.blendList.forEach((item) => {
          this.$set(item, 'price', item.price)
          this.$set(item, 'delta', item.delta)
          this.$set(item, 'vol', item.vol)
          this.$set(item, 'quote', null)
          pairs.push(item.symbol + state.affix) 
        })
      }  
      this.fetchQuote(pairs)  
      // this.fetchQuote('EOS_USDT')
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
      // console.log(this.quoteList)
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
        find = this.mixList.find(pair => pair.symbol + state.affix  === item.pair)
      } 
      if (!find) {
        find = this.blendList.find(pair => pair.symbol + state.affix  === item.pair)
      }
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
        padding: 45px 55px;
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