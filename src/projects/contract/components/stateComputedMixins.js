export default {
  computed: {
    lastPrice () {
      if (this.state.ct.lastPrice && this.state.ct.pairInfo) {
        return this.state.ct.lastPrice.toFixed(this.state.ct.pairInfo.price_scale || 4)
      }
      return '--'
    },
    pairTick () {
      if (this.state.ct.pairTick) {
        return this.state.ct.pairTick
      }
      return {}
    },
    currentPrice () {
      return this.pairTick.current || '--'
    },
    indexPrice () {
      //标记/指数价格 BTCUSD保留2位小数，其他币对根据price_scale显示
      if (this.state.ct.indexTick) {
        if (this.state.ct.pair === 'FUTURE_BTCUSD') { 
          return this.$big(this.state.ct.indexTick.current).round(2, this.C.ROUND_DOWN).toFixed(2).toString()
        }
        return this.$big(this.state.ct.indexTick.current)
          .round(this.state.ct.pairInfo.price_scale || 2, this.C.ROUND_DOWN)
          .toFixed(this.state.ct.pairInfo.price_scale || 2) 
      }
      return '--'
    },
    markPrice () {
      //标记/指数价格 BTCUSD保留2位小数，其他币对根据price_scale显示
      if (this.state.ct.markTick) {  
        if (this.state.ct.pair === 'FUTURE_BTCUSD') { 
          return this.$big(this.state.ct.markTick.current).round(2, this.C.ROUND_DOWN).toFixed(2).toString()
        }
        return  this.$big(this.state.ct.markTick.current)
          .round(this.state.ct.pairInfo.price_scale || 2, this.C.ROUND_DOWN)
          .toFixed(this.state.ct.pairInfo.price_scale || 2)
      }
      return '--'
    },
    delta () {
      const tick = this.pairTick
      if (!tick || tick.increment_24h === tick.current) {
        return 0
      }
      return this.$big(tick.increment_24h)
        .mul(100)
        .div(this.$big(tick.current).minus(tick.increment_24h))
        .round(2, this.C.ROUND_HALF_UP)
        .toFixed(2)
    }
  }
}
