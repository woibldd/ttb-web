
import isEmpty from 'lodash/isEmpty'

export default {
  computed: {
    pairInfo () {
      if (this.state.ct.pairInfo) {
        let pair = this.state.ct.pairInfo
        if (pair.currency === "BTCUSD") {
          pair.unitPrice = "1 USD"
        }
        else {
          let lastPrice = this.lastPrice == "--" ? 0 : this.lastPrice 
          pair.unitPrice = this.$big(lastPrice || 0).mul(pair.multiplier || 0).toString() + ' BTC'
        }
        return pair
      }
      return {}
    },
    symbol () {
      return this.pairInfo
    }
  }
}
