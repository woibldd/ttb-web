
import ws from '@/modules/ws'
import map from 'lodash/map'
import service from '@/modules/service'
const PAGE_SIZE = 25
export default {
  data () {
    return {
      socket: null,
      socketIndex: null,
      socketMarket: null,
      dealList: []
    }
  },
  computed: {
    lastPrice () {
      let price = this.dealList.length ? this.dealList[0].price : 0
      return price
    },
    lastSide () {
      let side = this.dealList.length ? this.dealList[0].side : "buy" 
      if (side == "buy") {
        this.state.ct.lastSide = 1
      } else if (side == "sell") {
        this.state.ct.lastSide = 2
      }
      return this.state.ct.lastSide
    }
  },
  methods: {
    update (data) {
      if (!data) return
      const dealList = map(data, item => {
        return {
          time: item.time,
          price: item.values[0],
          amount: item.values[1],
          side: item.side.toLowerCase()
        }
      }).sort((a, b) => {
        try {
          return b.time - a.time
        } catch (e) {
          return 0
        }
      })
      if (
        dealList.length &&
        this.dealList.length &&
        dealList[0].time <= this.dealList[0].time
      ) {
        // 因断线重连，导致重新获取了全量数据
        this.dealList = dealList
      } else {
        this.dealList = dealList.concat(this.dealList).slice(0, PAGE_SIZE)
      }
    },
    async fetchDealList () {
      const res = await service.getQuoteDeal({
        pair: this.pair,
        size: PAGE_SIZE
      })
      if (!res.code) {
        this.update(res.data)
        this.$eh.$emit('deal:update', res.data)
      }

      return Promise.resolve(res.data)
    },
    openSocket () {
      if (!this.pair) {
        console.log('pair is not defined')
        return
      }
      this.socket = ws.create(`deal/${this.pair}`)
      // this.socketIndex = ws.create(`deal/${this.pair.replace('FUTURE_', 'INDEX_')}`)
      // this.socketMarket = ws.create(`deal/${this.pair.replace('FUTURE_', 'MARKET_')}`)
      // this.socketIndex = ws.create(`deal/INDEX_BTCUSD`)
      // this.socketIndex.$on('message', data => {
      //   // console.log('index...')
      //   // console.log(data)
      //   if (data && data.length) {
      //     if (data[0] && data[0].values && data[0].values.length) {
      //       this.state.ct.indexTick = {
      //         current: data[0].values[0]
      //       }
      //     }
      //   }
      // })
      // this.socketMarket.$on('message', data => {
      //   if (data && data.length) {
      //     if (data[0] && data[0].values && data[0].values.length) {  
      //       this.state.ct.markTick = {
      //         current: data[0].values[0]
      //       }
      //     }
      //   }
      // })
      this.socket.$on('message', data => {
        this.update(data)
        this.loading = false
        this.$eh.$emit('deal:update', data)
      })

      return this.fetchDealList()
    }

  },
  created () {
    // this.openSocket()
  },
  destroyed () {
    if (this.socket) {
      this.socket.$destroy()
    }
  }
}
