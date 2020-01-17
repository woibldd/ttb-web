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
      // 先不做重连判断，因为socket返回的数据有时候时间顺序不对导致这里的判断出错
      // if (
      //   dealList.length &&
      //   this.dealList.length &&
      //   dealList[0].time <= this.dealList[0].time
      // ) {
      //   // 因断线重连，导致重新获取了全量数据
      //   this.dealList = dealList
      // } else {
      //   this.dealList = dealList.concat(this.dealList).slice(0, PAGE_SIZE)
      // }
      this.dealList = dealList.concat(this.dealList).slice(0, PAGE_SIZE)
      let side = this.dealList.length ? this.dealList[0].side : 'buy'
      if (side == 'buy') {
        this.state.ct.lastSide = 1
      } else if (side == 'sell') {
        this.state.ct.lastSide = 2
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
      const fetchId = this.pair
      this.socket = ws.create(`deal/${this.pair}`)
      this.socket.$on('open', () => {
        this.socket.heartCheck.start()
      }) 
      this.socket.$on('message', data => { 
        if (fetchId.indexOf(this.pair) === -1) {
            this.socket.$destroy()
            return
        } 
        this.socket.heartCheck.start()
        this.update(data)
        this.loading = false
        this.$eh.$emit('deal:update', data)
      })
      this.socket.$on('reopen', () => {
        this.socket.$destroy()
        this.openSocket()
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
