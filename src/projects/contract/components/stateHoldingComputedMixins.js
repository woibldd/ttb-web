import calculator from '../calculator'

export default {
  computed: {
    holding () {
      // debugger
      let holding = this.state.ct.holding
      let unitPrice = 1 //单价 先写死
      if (holding) {
        // hack
        holding.amount = holding.holding || '0'
        holding.value = '0'
      } else {
        holding = {
          amount: '0',
          available_balance: '0',
          value: '0'
        }
      }
      if (holding && holding.holding && this.lastPrice !== '--' && this.lastPrice != 0) {
        let lastPrice = this.lastPrice
        let markPrice = this.markPrice
        // let $diff = this.$big(this.lastPrice).minus(holding.price)
        // let $value = this.$big(holding.amount).div(Number(holding.price) || 1)
        // let $newValue = this.$big(holding.amount).div(lastPrice)
        if (holding.amount > 0) {
          let result = calculator.getStorageInfo({
            direction: 'more',
            lever: holding.leverage,
            amount: this.$big(holding.amount).abs(),
            open_price: holding.price,
            close_price: lastPrice
          })
          holding.unrealized = result.realized.round(this.pairInfo.value_scale || 4).toString()
          holding.roe = result.roe.round(2).toString()
          // 做多
          // holding.unrealized = $value.minus($newValue).round(this.pairInfo.value_scale || 4).toString()
          // holding.roe = this.$big(holding.unrealized).div(holding.margin_position).mul(100).round(2).toString()
        } else if (holding.amount < 0) {
          let result = calculator.getStorageInfo({
            direction: 'less',
            lever: holding.leverage,
            amount: this.$big(holding.amount).abs(),
            open_price: holding.price,
            close_price: lastPrice
          })
          holding.unrealized = result.realized.round(this.pairInfo.value_scale || 4).toString()
          holding.roe = result.roe.round(2).toString()
          // holding.unrealized = $value.minus($newValue).round(this.pairInfo.value_scale || 4).toString()
          // holding.roe = this.$big(holding.unrealized).div(holding.margin_position).mul(100).round(2).toString()
        } else {
          holding.unrealized = '0'
          holding.roe = '0.00'
        }

        if(!isNaN(Number(markPrice))) {
          holding.value = this.$big(holding.amount).div(markPrice || 0).mul(unitPrice).round(this.pairInfo.value_scale || 4).abs().toString()
        }

        holding.margin_position = this.$big(holding.margin_position || 0).round(this.pairInfo.value_scale || 4).toString()
        // 动态保证金
        holding.margin = this.$big(holding.margin_position || 0).plus(holding.unrealized).round(this.pairInfo.value_scale || 4).toString()
        // 保证金余额=用户当前还可用于开仓的保证金数量=账户权益-仓位保证金-委托保证金。
        holding.margin_available = this.$big(holding.available || 0).minus(holding.margin_position || 0).minus(holding.margin_delegation || 0).round(this.pairInfo.value_scale || 4, this.C.ROUND_DOWN).toString()

        holding.canRemoveMargin = holding.margin_user
        holding.canAddMargin = holding.available_balance
        // 保证金占比
        holding.marginPercent = holding.available == 0 ? '0.00' : this.$big(holding.margin_delegation || 0).div(holding.available).mul(100).round(2).toString()

      }
      return holding
    },
    //未实现盈亏计算
    //多仓：未实现盈亏 = 面值 * 数量 / 开仓均价 - 面值 * 张数 / 最新标记价格
    //空仓：未实现盈亏 = 面值 * 张数 / 最新标记价格 - 面值 * 张数 / 开仓均价
    //数量：this.holding.amount
    //开仓价格：this.holding.price
    //标记价格：this.markPrice
    //面值：1
    unrealized () {  
      // console.log(this.markPrice)
      if (isNaN(Number(this.markPrice)) || isNaN(Number(this.holding.amount)) || isNaN(Number(this.holding.price))){
        return '0'
      } 
      let amount = this.$big(this.holding.amount)
      let price  = this.$big(this.holding.price)
      let markPrice = this.$big(this.markPrice || 0)

      //console.log({amount:this.holding.amount,price:this.holding.price,markPrice:this.markPrice})
      if(this.holding.amount > 0){ 
        return amount.div(price).minus(amount.div(markPrice))
      } else if (this.holding.amount < 0) { 
        return amount.abs().div(markPrice).minus(amount.abs().div(price))
      } else {
        return '0'
      }
    },
    //预计未实现盈亏 算法同上，将标记价格替换成市价
    unrealizedlp () { 
      //console.log(this.lastPrice)
      if (isNaN(Number(this.lastPrice)) || isNaN(Number(this.holding.amount)) || isNaN(Number(this.holding.price))){
        return '0'
      }
      let amount = this.$big(this.holding.amount)
      let price  = this.$big(this.holding.price)
      let lastPrice = this.$big(this.lastPrice || 0)

      if(this.holding.amount > 0){
        return amount.div(price).minus(amount.div(lastPrice)) 
      } else if (this.holding.amount < 0) {
        return amount.abs().div(lastPrice).minus(amount.abs().div(price))
      } else {
        return '0'
      }
    },
    //收益率 = 未实现盈利 / 开仓价值 * 杠杆倍数 * 100%
    roe() {
      if (isNaN(Number(this.unrealized)) ||
      isNaN(Number(this.holding.amount)) ||
      isNaN(Number(this.holding.price)) ||
      isNaN(Number(this.holding.leverage))){
        return '0'
      }
      if (this.$big(this.holding.amount || 0).eq(0) || this.$big(this.holding.price || 0).eq(0) ) {
        return '0'
      }

      return this.$big(this.unrealized)
        .div((this.$big(this.holding.amount).abs()).div(this.holding.price))
        .mul(this.holding.leverage == 0 ? 100 : this.holding.leverage)
        .mul(100)
        .toFixed(2)
    },
    roelp() {
      if (isNaN(Number(this.unrealizedlp)) || isNaN(Number(this.holding.amount)) || isNaN(Number(this.holding.price)) || isNaN(Number(this.holding.leverage))){
        return '0'
      }
      if (this.$big(this.holding.amount || 0).eq(0) || this.$big(this.holding.price || 0).eq(0) ) {
        return '0'
      }
      return this.$big(this.unrealizedlp)
        .div((this.$big(this.holding.amount).abs()).div(this.holding.price))
        .mul(this.holding.leverage == 0 ? 100 : this.holding.leverage)
        .mul(100)
        .toFixed(2)
    },

  }
}
