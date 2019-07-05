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
      if (this.state.ct.indexTick) {
        return parseFloat(this.state.ct.indexTick.current).toFixed(this.state.ct.pairInfo.price_scale || 2)
      }
      return '--'
    },
    markPrice () {
      if (this.state.ct.markTick) {  
        return  parseFloat(this.state.ct.markTick.current).toFixed(this.state.ct.pairInfo.price_scale || 2)
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
