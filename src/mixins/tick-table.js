import _ from 'lodash'
import utils from '@/modules/utils'
import service from '@/modules/service'
import {state, local} from '@/modules/store'
import ws from '@/modules/ws'

export default {
  data () {
    return {
      state,
      local,
      loading: false,
      err: '',
      search: '',
      tab: '',
      tabSelected: '',
      sortBy: '',
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
      return _.sortBy(_.uniq(_.map(this.state.pro.pairList, 'currency_name')), name => {
        return (_.indexOf(['USDT', 'BTC', 'ETH', 'EOS'], name) + 1) || 100
      })
    },
    pairList () {
      return this.state.pro.pairList
    },
    showList () {
      let list = this.pairList
      if (this.tabSelected === 'like') {
        return _.filter(list, pair => {
          return pair.name.toUpperCase().indexOf(this.search.toUpperCase()) > -1 &&
            (pair.like || false)
        })
      }
      else {
        return _.filter(list, pair => {
          return pair.name.toUpperCase().indexOf(this.search.toUpperCase()) > -1 &&
            pair.currency.indexOf(this.tabSelected) > -1
        })
      }
    },
    changeRankList () {
      return _.sortBy(this.pairList, (item) => {
        let value = this.getDelta(item.tick) || 0
        return value * -1
      })
    },
    sortedList () { 
      if (!this.sortBy || !this.sortState) {
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
      this.local.proOnFav = tab === '*'
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
      return _.find(this.state.favorite.list, item => item.symbol === pair.name)
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
      if (item.pair === this.state.pro.pair) {
        this.state.pro.pairTick = item
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
      let res = await service.getPairList()
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
      // let optional = await service.getOptionalList({site: 2})
      // if(!!optional && optional.data != null)
      // for (const item of optional.data) {
      //   let id = item.id
      //   let pair = _.filter(res.data.items, item => { return item.id===id})
      //   if (pair.length > 0) {
      //     pair[0].like = true;
      //   }
      // } 
      
      this.state.pro.pairList = res.data.items
      //this.showList
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
    if (this.local.proOnFav) {
      this.setTab('*')
    }
    await this.fetch()
    this.subMarket()
    // actions.updateFavorite()
  }
}
