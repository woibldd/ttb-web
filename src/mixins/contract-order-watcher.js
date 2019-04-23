import _throttle from 'lodash/throttle'

export default {
  data () {
    return {
      watcherData: {
        hasNewClosed: false,
        hasNewHistory: false
      }
    }
  },
  /*
  watch: {
    marketBid: {
      handler () {
        const bid = this.$big(this.state.ct.bid)
        const myBid = this.$big(this.myHighestBid)
        if (bid.gt(0) && bid.lte(myBid)) {
          // // 依赖deal列表处理
          // this.$eh.$emit('protrade:order:refresh')
        }
      },
      immediate: true
    },
    marketAsk: {
      handler (newVal, oldVal) {
        const ask = this.$big(this.state.ct.ask)
        const myAsk = this.$big(this.myLowestAsk)
        if (ask.gte(myAsk) && myAsk.gt(0)) {
          // 依赖deal列表处理
          // this.$eh.$emit('protrade:order:refresh')
        }
      },
      immediate: true
    }
  },
  computed: {
    isActivityTab () {
      return this.name === 'contract_history_del_current' || this.name === 'contract_history_position'
    },
    marketBid () {
      if (this.isActivityTab && this.state.ct.bid) {
        return this.state.ct.bid.toString() + ':' + this.state.ct.bidVol.toString()
      }
      return '0'
    },
    marketAsk () {
      if (this.isActivityTab && this.state.ct.ask) {
        return this.state.ct.ask.toString() + ':' + this.state.ct.askVol.toString()
      }
      return '0'
    },
    myHighestBid () {
      let bid = this.$big(0)
      if (this.isActivityTab) {
        const list = this.activeList
        if (list.length) {
          list.forEach((order) => {
            if (order.side !== 1 || order.symbol !== this.state.ct.pair) {
              return
            }
            const price = this.$big(order.price || 0)
            if (price.gt(bid)) {
              bid = price
            }
          })
        }
      }
      return bid.toString()
    },
    myLowestAsk () {
      let ask = this.$big(0)
      if (this.isActivityTab) {
        const list = this.activeList
        if (list.length) {
          list.forEach((order) => {
            if (order.side !== 2 || order.symbol !== this.state.ct.pair) {
              return
            }
            const price = this.$big(order.price || 0)
            if (price.gt(0) && (ask.eq(0) || price.lt(ask))) {
              ask = price
            }
          })
        }
      }
      return ask.toString()
    }
  },
  */
  methods: {
    // 节流处理成交单
    throttleUpdateData (data) {
      if (data && data.length) {
        //this.log('deal::update' + new Date(), data)
        this.$eh.$emit('protrade:order:refresh','throttleUpdateData')
      }
    }
  },
  created () {
    //this.$eh.$on('deal:update', _throttle(this.throttleUpdateData, 3e4))
  },
  destroyed () {
    this.$eh.$off('deal:update', _throttle(this.throttleUpdateData, 3e4))
  }
}
