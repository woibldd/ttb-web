import _ from 'lodash'
import utils from '@/modules/utils'
import service from '@/modules/service'
import { state, local } from '@/modules/store'
// import ws from '@/modules/ws'
import wsNew from '@/modules/ws-new'

export default {
  data() {
    return {
      state,
      local,
      loading: false,
      err: '',
      search: '',
      tab: '',
      sortBy: '',
      sortState: 0 // 0:不排序 1:降序 2:升序
    }
  },
  computed: {
    tabSelected() {
      return state.tabSelected
    },
    errmsg() {
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
    group() {
      return _.sortBy(_.uniq(_.map(this.state.pro.pairList, 'currency_name')), name => {
        return (_.indexOf(['USDT', 'BTC', 'ETH', 'EOS'], name) + 1) || 100
      })
    },
    pairList() {
      return this.state.pro.pairList
    },
    showList() {
      const list = this.pairList
      if (this.tabSelected === 'all') { 
        let arr =  _.filter(list, pair => {
          return pair.name.toUpperCase().indexOf(this.search.toUpperCase()) > -1 
             && pair.type != 5 &&  pair.type != 4
        }) 
        arr = _.sortBy(arr, ['rank'])
        return arr 
      } else if (this.tabSelected === 'new') { 
        let res = _.sortBy(list, (pair) => {
          const value = this.getDelta(pair.tick) || 0
          return value * -1
        })
        res = _.filter(res, (pair, index) => {
          if (pair.type == 4 || pair.type == 2){
            pair.group = 2
          }
          if (pair.type == 5 || pair.group == 3) {
            pair.group = 3
          }
          return pair.name.toUpperCase().indexOf(this.search.toUpperCase()) > -1
                && pair.type > 1 
        })
        let arr = []
        const temGroup = _.groupBy(res, 'group')
        // temGroup['2'] = temGroup['2'].concat(temGroup['4']||[])
        // delete temGroup['4'] 
        Object.keys(temGroup).forEach(key => {
          arr = arr.concat([{ CUSTOM: true, type: key }]).concat(temGroup[key]) 
        }) 
  
        return arr
        // res = _.groupBy(res, 'type') 
        // return res
      } else if (this.tabSelected === 'like') {
        return _.filter(list, pair => {
          return pair.name.toUpperCase().indexOf(this.search.toUpperCase()) > -1 
            && (pair.like || false)
            && pair.type != 4 && pair.type != 5
        })
      } else {
        let arr =  _.filter(list, pair => {
          return pair.name.toUpperCase().indexOf(this.search.toUpperCase()) > -1
            && pair.currency.indexOf(this.tabSelected) > -1 
            && pair.type === 1 
        }) 
        arr = _.sortBy(arr, ['rank'])
        return arr 
      }
    },
    changeRankList() {
      return _.sortBy(this.pairList, (item) => {
        const value = this.getDelta(item.tick) || 0
        return value * -1
      })
    },
    sortedList() {
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
          case 'highest': 
            value = item.tick ? item.tick.highest_24h : 0
            break
          case 'lowest': 
            value = item.tick ? item.tick.lowest_24h : 0
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
    setTab(tab) {
      this.tab = tab
      this.local.proOnFav = tab === '*'
    },
    setPair(pair) {
      // need implement
      utils.log(pair)
    },
    getDelta(tick) {
      if (!tick || tick.increment_24h === tick.current) {
        return false
      }
      return this.$big(tick.increment_24h)
        .mul(100)
        .div(this.$big(tick.current).minus(tick.increment_24h))
        .round(2, this.C.ROUND_HALF_UP)
        .toFixed(2)
    },
    getSign(num) {
      if (num === false) {
        return 0
      }
      return utils.getSign(num)
    },
    isCollect(pair) {
      return _.find(this.state.favorite.list, item => item.symbol === pair.name)
    },
    setSort(key) {
      if (this.sortBy === key) {
        this.sortState = (this.sortState + 1) % 3
      } else {
        this.sortBy = key
        this.sortState = 1
      }
    },
    patch(item) {
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
    stateSortBy(key) {
      if (key !== this.sortBy) {
        return 0
      } else {
        return this.sortState
      }
    },
    async fetch() {
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
      const optional = await service.getOptionalList({ site: 2 })
      if (!!optional && optional.data != null) {
        for (const item of optional.data) {
          const id = item.id
          const pair = _.filter(res.data.items, item => { return item.id === id })
          if (pair.length > 0) {
            pair[0].like = true
          }
        }
      }
      

      this.state.pro.pairList = res.data.items
    },
    subMarket() { 
      if (!utils.$tvSocket) {
        utils.$tvSocket = wsNew.create()
        utils.$tvSocket.$on('open', () => { 
          utils.$tvSocket.socket.send('{"op":"subscribepub","args":["market@ticker"]}') 
          this.$eh.$emit('protrade:socket:open')
        })
      }
      utils.$tvSocket.$on('message', (datas) => {   
        if (datas.topic && datas.topic.indexOf('market@ticker') > -1) {
          datas.data.forEach(data => {
            this.patch(data)
          }) 
        } 
        this.$eh.$on('protrade:socket:message', datas)
      })
      utils.$tvSocket.$on('reopen', () => {
        utils.$tvSocket.$destroy()
        this.subMarket()
      })
      
    }
  },
  destroyed() {
    // if (this.socket) {
    //   this.socket.$destroy()
    // }
  },
  async created() {
    if (this.local.proOnFav) {
      this.setTab('*')
    }
    await this.fetch()
    this.subMarket()
    // actions.updateFavorite()
  }
}
