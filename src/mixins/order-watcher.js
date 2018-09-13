export default {
  data () {
    return {
      watcherData: {
        hasNewClosed: false,
        hasNewHistory: false
      }
    }
  },
  watch: {
    marketBid () {
      const bid = this.$big(this.state.pro.bid)
      const myBid = this.$big(this.myHighestBid)
      if (bid.gt(0) && bid.lte(myBid)) {
        this.$eh.$emit('protrade:order:refresh')
      }
    },
    marketAsk () {
      const ask = this.$big(this.state.pro.ask)
      const myAsk = this.$big(this.myLowestAsk)
      if (ask.gte(myAsk) && myAsk.gt(0)) {
        this.$eh.$emit('protrade:order:refresh')
      }
    }
  },
  computed: {
    marketBid () {
      if (this.state.pro.bid) {
        return this.state.pro.bid.toString() + ':' + this.state.pro.bidVol.toString()
      }
      return '0'
    },
    marketAsk () {
      if (this.state.pro.ask) {
        return this.state.pro.ask.toString() + ':' + this.state.pro.askVol.toString()
      }
      return '0'
    },
    myHighestBid () {
      let bid = this.$big(0)
      this.active.list.forEach((order) => {
        if (order.side !== 'BUY' || order.symbol !== this.state.pro.pair) {
          return
        }
        const price = this.$big(order.price || 0)
        if (price.gt(bid)) {
          bid = price
        }
      })
      return bid.toString()
    },
    myLowestAsk () {
      let ask = this.$big(0)
      this.active.list.forEach((order) => {
        if (order.side !== 'SELL' || order.symbol !== this.state.pro.pair) {
          return
        }
        const price = this.$big(order.price || 0)
        if (price.gt(0) && (ask.eq(0) || price.lt(ask))) {
          ask = price
        }
      })
      return ask.toString()
    }
  }
}
