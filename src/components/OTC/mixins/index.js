
export default {
  data() {
    return {
      symbolList: {
        CNY: {
          rate: "cny_rate",
          symbol: '￥'
        },
        SGD: {  
          rate: "sgd_rate",
          symbol: 'S$'
        }
      },
    }
  },
  computed: { 
    currency: {
      get () {
        return this.state.otc.currency
      },
      set (value) {
        this.state.otc.currency = value
      }
    },
    legal_currency: {
      get () {
        return this.state.otc.legal_currency
      },
      set (value) {
        this.state.otc.legal_currency = value
      }
    }, 
    symbolInfo () {
      // for (const symbol of this.symbolList) {
      //   if (symbol.currency == this.currency) {
      //     return symbol; 
      //   }
      // } 
      return this.state.otc.symbolInfo
    },
    indexPrice () {
      if (this.symbolInfo && this.symbolInfo[this.coin.rate]) 
        { return this.symbolInfo[this.coin.rate] } 
      else 
      return 0
    },
    price_scale () {
      if (!!this.symbolInfo) {
        return this.symbolInfo.price_scale || 2
      }
      return 2
    },
    amount_scale() {
      if (!!this.symbolInfo) {
        return this.symbolInfo.amount_scale || 6
      }
      return 2
    },
    isLogin () {
      return this.state.userInfo !== null
    },
    coin() {
      return this.symbolList[this.legal_currency]
    },
  }
}