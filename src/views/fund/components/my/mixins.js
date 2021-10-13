import {state} from '@/modules/store'

export default {
  methods: {
    calcEstValue (item) {
      //这里只计算usdt的估值，其他估值通过usdt来转换  
      let res = this.$big(0)
      let {camount} = item  
      if (item.rates) {
        res = this.$big(camount).times(item.rates.USD || 0).round(4, 0).toFixed(4)
      } else if (state.rate[item.currency]) {
        res = this.$big(camount).times(state.rate[item.currency].USD || 0).round(4, 0).toFixed(4)
      }
      return res
    }, 
    calcUsdtTransfer (amount, fait) { 
      let result = this.$big(0) 
      // console.log(0, amount, fait)
      result = this.calcFaitToBtc(amount, 'USD')
      // console.log(1, result.round(8).toString())
      result = this.calcBtcToFait(result, fait)
      // console.log(2, result.round(8).toString())
      return result
    }, 
    calcFaitToBtc(amount, fait) {
      let result = this.$big(0)
      if (state.rate.BTC && this.$big(amount || 0).gt(0)) {
        result = this.$big(amount).div(this.state.rate.BTC[fait])
      } else {
        result = this.$big(0)
      }
      return result
    },
    calcBtcToFait(amount, fait) {
      let result = this.$big(0)
      if (state.rate.BTC) {
        result = this.$big(amount).times(this.state.rate.BTC[fait])
      }
      return result
    }
  }
}