import _ from 'lodash'
import utils from '@/modules/utils'
import service from '@/modules/service'
import {state, local, actions} from '@/modules/store'
import ws from '@/modules/ws'
import Vue from 'vue'
export default {
  data () {
    return {
      state,
      local,
      loading: false,
      err: '',
      search: '',
      tab: '',
      sortBy: 'pair',
      sortState: 0 // 0:不排序 1:降序 2:升序
    }
  },
  computed: {
    errmsg () {
      if (this.loading || this.err) {
        return ''
      }
      if (!this.pairList.length) {
        return 'sth_went_wrong'
      }
      if (this.search && !this.showList.length) {
        return 'pairnav_no_matched'
      }
      return ''
    },
    group () {
      return _.sortBy(_.uniq(_.map(state.ct.pairList, 'currency_name')), name => {
        return (_.indexOf(['USDT', 'BTC', 'ETH', 'EOS'], name) + 1) || 100
      })
    },
    pairList () {
      return state.ct.pairList
    },
    showList () {
      let list = this.pairList
      return _.filter(list, pair => pair.product_name.indexOf(this.search.toUpperCase()) > -1)
    },
    sortedList () {
      if ( !this.sortState) {
        return this.showList
      }  
      return _.sortBy(this.showList, (item) => {
        let value
        switch (this.sortBy) {
          case 'pair':
            value = item.product_name.charCodeAt(0) * 1000 + item.product_name.charCodeAt(0)
            break
          case 'delta':
            value = this.getDelta(item.tick) || 0
            break
          case 'price':
            value = item.tick ? item.tick.current : 0
            break
          case 'vol':
            value = item.tick ? item.tick.volume_24h : 0
            break
          default:
            value = item.tick ? (item.tick[this.sortBy] || item[this.sortBy]) : 0
            break
        }
        return value * (this.sortState === 1 ? -1 : 1)
      })
    }
  },
  methods: {
    setTab (tab) {
      this.tab = tab
      local.proOnFav = tab === '*'
    },
    setPair (pair) {
      // need implement
      utils.log(pair)
    },
    getDelta (tick) {
      if (!tick || tick.increment_24h === tick.current) {
        return false
      }
      return this.$big(tick.increment_24h)
        .mul(100)
        .div(this.$big(tick.current).minus(tick.increment_24h))
        .round(2, this.C.ROUND_HALF_UP)
        .toFixed(2)
    },
    getSign (num) {
      if (num === false) {
        return 0
      }
      return utils.getSign(num)
    },
    isCollect (pair) {
      return _.find(state.favorite.list, item => item.symbol === pair.name)
    },
    setSort (key) {
      if (this.sortBy === key) {
        this.sortState = (this.sortState + 1) % 3
      } else {
        this.sortBy = key
        this.sortState = 1
      }
    },
    patch (item) {
      const find = _.find(this.pairList, pair => pair.name === item.pair)
      if (find) {
        find.price = item.current
        find.delta = this.$big(item.increment_24h).mul(100).div(this.$big(item.current).minus(item.increment_24h)).round(2, this.C.ROUND_HALF_UP).toFixed(2)
        find.vol = item.volume_24h
        find.tick = item
      }
      
      let ct = state.ct
      if (item.pair === this.state.ct.pair) {  
        state.ct.pairTick = item 
      }

      if (item.pair.indexOf('INDEX') > -1) {
        if (item.pair.indexOf(state.ct.symbol) > -1) { 
          state.ct.indexTick = {
            current: item.current
          }  
        } 
        state.ct.indexTickList[item.pair.replace('INDEX_','')] =  item.current
      } else if (item.pair.indexOf('FUTURE') > -1) { 
        state.ct.lastPriceList[item.pair.replace('FUTURE_','')] =  item.current
        
        if (!!ct.pairInfoList[item.pair]) {
          // ct.pairInfoList[item.pair].lastPrice = item.current 
          this.$set(ct.pairInfoList[item.pair], 'lastPrice', item.current )
        }
        
        
        this.$eh.$emit("socket:price:update", item)
      } else if (item.pair.indexOf('MARKET') > -1) {
        if (item.pair.indexOf(state.ct.symbol) > -1) {
          state.ct.markTick = {
            current: item.current
          }   
        }  
        this.$eh.$emit("socket:price:update", item)
        state.ct.markTickList[item.pair.replace('MARKET_','')] =  item.current
        if (!!ct.pairInfoList[item.pair.replace('MARKET','FUTURE')]) { 
          // ct.pairInfoList[item.pair.replace('MARKET','FUTURE')].markTick = item.current 
          this.$set(ct.pairInfoList[item.pair.replace('MARKET','FUTURE')], 'markTick', item.current )
          // console.log(item.current, this.pairList, 'sdsd')
          // console.log(this.state.ct.holdingList[0].currency, item, 'sss') 
          state.ct.holdingList.forEach((skt) => {
            if ('MARKET_' + skt.currency === item.pair) {
              Vue.set(skt, 'markPrice', item.current)
            }
          })
        }
      }
    },
    stateSortBy (key) {
      if (key !== this.sortBy) {
        return 0
      } else {
        return this.sortState
      }
    },
    async fetch () {
      this.loading = true
      let res = await service.getContractSymList()
      this.loading = false
      res = _.cloneDeep(res)
      if (res.code) {
        this.err = res.message
        return false
      }
      res.data.items.forEach((item) => {
        item.tick = null
        this.$set(item, 'price', item.price || false)
        this.$set(item, 'delta', item.delta || false)
        this.$set(item, 'vol', item.vol || false)
      })
      state.ct.pairList = res.data.items
    },
    subMarket () {
      if (this.socket) {
        this.socket.$destroy()
      }
      this.socket = ws.create('market/tickers')
      this.socket.$on('message', (datas) => {
        datas.forEach(data => {
          this.patch(data)
        })
      })
    }
  },
  destroyed () {
    if (this.socket) {
      this.socket.$destroy()
    }
  },
  async created () {
    if (local.proOnFav) {
      this.setTab('*')
    }
    await this.fetch()
    this.subMarket()
    // actions.updateFavorite()
  }
}
