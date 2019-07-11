import calculator from '../calculator'
import Vue from 'vue'
export default {
  computed: {
    // holding () { 
    //   let holding = this.state.ct.holding
    //   let unitPrice = 1 //单价 先写死
    //   if (holding) {
    //     // hack
    //     holding.amount = holding.holding || '0'
    //     holding.value = '0'
    //   } else {
    //     holding = {
    //       amount: '0',
    //       available_balance: '0',
    //       value: '0'
    //     }
    //   }
    //   if (holding && holding.holding && this.lastPrice !== '--' && this.lastPrice != 0) {
    //     let lastPrice = this.lastPrice == '--' ? 0 : this.lastPrice;
    //     let markPrice = this.markPrice == '--' ? 0 : this.markPrice;
    //     // let $diff = this.$big(this.lastPrice).minus(holding.price)
    //     // let $value = this.$big(holding.amount).div(Number(holding.price) || 1)
    //     // let $newValue = this.$big(holding.amount).div(lastPrice)
    //     if (holding.amount > 0) {
    //       let result = calculator.getStorageInfo({
    //         direction: 'more',
    //         lever: holding.leverage,
    //         amount: this.$big(holding.amount).abs(),
    //         open_price: holding.price,
    //         close_price: lastPrice
    //       })
    //       // holding.unrealized = result.realized.round(this.pairInfo.value_scale || 4).toString()
    //       // holding.roe = result.roe.round(2).toString()
    //       // 做多
    //       // holding.unrealized = $value.minus($newValue).round(this.pairInfo.value_scale || 4).toString()
    //       // holding.roe = this.$big(holding.unrealized).div(holding.margin_position).mul(100).round(2).toString()
    //     } else if (holding.amount < 0) {
    //       let result = calculator.getStorageInfo({
    //         direction: 'less',
    //         lever: holding.leverage,
    //         amount: this.$big(holding.amount).abs(),
    //         open_price: holding.price,
    //         close_price: lastPrice
    //       })
    //       holding.unrealized = result.realized.round(this.pairInfo.value_scale || 4).toString()
    //       holding.roe = result.roe.round(2).toString()
    //       // holding.unrealized = $value.minus($newValue).round(this.pairInfo.value_scale || 4).toString()
    //       // holding.roe = this.$big(holding.unrealized).div(holding.margin_position).mul(100).round(2).toString()
    //     } else {
    //       holding.unrealized = '0'
    //       holding.roe = '0.00'
    //     }
 
    //     let mul = this.pairInfo.multiplier 
    //     if(holding.currency === 'BTCUSD') {  
    //       let unitPrice = 1 //单价 先写死
    //       holding.value = this.$big(holding.amount).div(markPrice || 0).mul(unitPrice).round(this.pairInfo.value_scale || 4).abs().toString()  
    //     }
    //     else {
    //       holding.value = this.$big(holding.price || 0).times(holding.amount).times(mul).round(this.pairInfo.value_scale || 4).abs().toString()  
    //     }

    //     holding.margin_position = this.$big(holding.margin_position || 0).round(this.pairInfo.value_scale || 4).toString()
    //     // 动态保证金
    //     holding.margin = this.$big(holding.margin_position || 0).plus(holding.unrealized).round(this.pairInfo.value_scale || 4).toString()
    //     // 保证金余额=用户当前还可用于开仓的保证金数量=账户权益-仓位保证金-委托保证金。
    //     holding.margin_available = this.$big(holding.available || 0).minus(holding.margin_position || 0).minus(holding.margin_delegation || 0).round(this.pairInfo.value_scale || 4, this.C.ROUND_DOWN).toString()

    //     holding.canRemoveMargin = holding.margin_user
    //     holding.canAddMargin = holding.available_balance
    //     // 保证金占比
    //     holding.marginPercent = holding.available == 0 ? '0.00' : this.$big(holding.margin_delegation || 0).div(holding.available).mul(100).round(2).toString()

    //   }
    //   console.log('holdingholdingholdingholdingholdingholdingholdingholdingholdingholdingholdingholdingholding')
    //   return holding
    // },
    holdingList() {
      let list = this.state.ct.holdingList
      console.log('6666666666666666666666666666666666666666666666666666666666666666666666')
      let pairInfoList = this.state.ct.pairInfoList
      list = list.map((holding) => {
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
        let pairInfo = pairInfoList['FUTURE_' + holding.currency]
        if (!pairInfo) {
          return holding
        }
        holding.pairInfo = pairInfo
        let lastPrice = pairInfo.lastPrice// this.lastPrice
        let markPrice = pairInfo.markTick  // this.markPrice  
        let mul = pairInfo.multiplier
        let value_scale = pairInfo.value_scale

        let amount = holding.holding
        let currency = holding.currency
        let price = holding.price
        console.log({ lastPrice, markPrice, mul, price })

        holding.product_name = pairInfo.product_name
        holding.value_scale = pairInfo.value_scale || 4
        holding.price_scale = pairInfo.price_scale

        // holding.lastPrice = lastPrice
        // holding.markPrice = markPrice
        Vue.set(holding, 'lastPrice', lastPrice)
        Vue.set(holding, 'markPrice', markPrice)
        console.log(holding, 'vue-set')
        holding.unrealized = "0"
        holding.unrealizedlp = "0"
        holding.roe = "0"
        holding.roelp = "0"

        //计算价值
        let value = "0"
        let unrealized = "0"
        let unrealizedlp = "0"
        if (currency === 'BTCUSD') {
          let unitPrice = 1 //单价 先写死
          if (!!markPrice) {
            holding.value = this.$big(amount).div(holding.markPrice || 0).times(unitPrice).round(value_scale || 4).abs().toString()
          }
          else {
            holding.value = "0"
          }
        }
        else {
          holding.value = this.$big(holding.price || 0).times(amount).times(mul).abs().toString()
        }
        // holding.value = value
        if (currency === 'BTCUSD') {
          if (holding.amount > '0' && !!holding.markPrice && !!holding.lastPrice) { 
            unrealized = this.$big(amount).div(price).minus(this.$big(amount).div(holding.markPrice))
            unrealizedlp = this.$big(amount).div(price).minus(this.$big(amount).div(holding.lastPrice))
          } else if (holding.amount < 0 && !!holding.markPrice && !!holding.lastPrice) { 
            unrealized = (this.$big(amount).abs().div(holding.markPrice)).minus(this.$big(amount).abs().div(price))
            unrealizedlp = (this.$big(amount).abs().div(holding.lastPrice)).minus(this.$big(amount).abs().div(price))
          } else {
            unrealized = this.$big('0')
            unrealizedlp = this.$big('0')
          }

          holding.unrealized = unrealized
          holding.unrealizedlp = unrealizedlp

         
        }
        //VDS BHD
        else {
          //VDS未实现盈亏计算   //乘数（0.0001BTC）
          //多：（VDSUSD 标记价格 - VDSUSD 开仓价格）* 比特币乘数 * 合约数量  
          //空：（ VDSUSD 开仓价格- VDSUSD 标记价格）* 比特币乘数 * 合约数量 
          if (amount > 0) {
            unrealized = (this.$big(holding.markPrice || 0).minus(price)).times(mul).times(this.$big(amount).abs())
            unrealizedlp = (this.$big(holding.lastPrice || 0).minus(price)).times(mul).times(this.$big(amount).abs())
          } else if (amount < 0) {
            unrealized = (this.$big(price).minus(holding.markPrice || 0)).times(mul).times(this.$big(amount).abs())
            unrealizedlp = (this.$big(price).minus(holding.lastPrice || 0)).times(mul).times(this.$big(amount).abs())
          } else {
            unrealized = this.$big('0')
            unrealizedlp = this.$big('0')
          }

          holding.unrealized = unrealized
          holding.unrealizedlp = unrealizedlp

          // if (this.$big(amount || 0).eq(0) || this.$big(price || 0).eq(0)) {
          //   holding.roe = this.$big('0')
          //   holding.roelp = this.$big('0')
          // }
          // else {
          //   holding.roe = unrealized
          //     // .div((this.$big(amount).abs()).div(price))
          //     .mul(holding.leverage == 0 ? 20 : holding.leverage)
          //     .mul(100)
          //     .toFixed(2)
          //   holding.roelp = unrealizedlp
          //     .div((this.$big(amount).abs()).div(price))
          //     .mul(holding.leverage == 0 ? 20 : holding.leverage)
          //     .mul(100)
          //     .toFixed(2)
          // }
        }
        //console.log(holding.value)
        if (this.$big(amount || 0).eq(0) || this.$big(price || 0).eq(0) || !holding.value || holding.value ==='0') {
          holding.roe = this.$big('0')
          holding.roelp = this.$big('0')
        }
        else {
          let maxLever = pairInfo.max_leverage || 100
           
          holding.roe = unrealized
            .div(holding.value)
            .mul(holding.leverage == 0 ? maxLever : holding.leverage)
            .mul(100)
            .toFixed(2)
            
          //console.log(holding.roe)
          holding.roelp = unrealizedlp
            .div(holding.value)
            .mul(holding.leverage == 0 ? maxLever : holding.leverage)
            .mul(100)
            .toFixed(2)
            //console.log(holding.roelp)
        }

        //平仓价格
        if (!holding.changeUnwindPrice) {
          //最小步算法
          let accuracy = holding.pairInfo.accuracy || 1
          let scale = holding.pairInfo.price_scale || 4
          const minStep = Math.pow(10, -scale) * accuracy
          let $newValue = this.$big(markPrice || 0)
          if (!$newValue.mod(minStep).eq(0)) {
            $newValue = $newValue.div(minStep).round(scale >= 1 ? scale - 1 : 0, 0).mul(minStep)
          }
          let unwindPrice = $newValue
          this.$set(holding, "unwindPrice", unwindPrice)
        }

        holding.margin = "0"
        holding.margin_position = this.$big(holding.margin_position || 0).round(value_scale || 4).toString()
        // 动态保证金
        holding.margin = this.$big(holding.margin_position || 0).plus(holding.unrealized).round(pairInfo.value_scale || 4).toString()
        // 保证金余额=用户当前还可用于开仓的保证金数量=账户权益-仓位保证金-委托保证金。
        holding.margin_available = this.$big(holding.available || 0).minus(holding.margin_position || 0).minus(holding.margin_delegation || 0).round(value_scale || 4, this.C.ROUND_DOWN).toString()
        holding.canRemoveMargin = holding.margin_user
        holding.canAddMargin = holding.available_balance
        // 保证金占比
        holding.marginPercent = holding.available == 0 ? '0.00' : this.$big(holding.margin_delegation || 0).div(holding.available).mul(100).round(2).toString() 
        //holding.test = 0;
        return holding
      })
      return list
    },
    //未实现盈亏计算
    //多仓：未实现盈亏 = 面值 * 数量 / 开仓均价 - 面值 * 张数 / 最新标记价格
    //空仓：未实现盈亏 = 面值 * 张数 / 最新标记价格 - 面值 * 张数 / 开仓均价
    //数量：this.holding.amount
    //开仓价格：this.holding.price
    //标记价格：this.markPrice
    //面值：1
    // unrealized () {  
    //   // console.log(this.markPrice)
    //   if (isNaN(Number(this.markPrice)) || isNaN(Number(this.holding.amount)) || isNaN(Number(this.holding.price))){
    //     return '0'
    //   } 
    //   let amount = this.$big(this.holding.amount)
    //   let price  = this.$big(this.holding.price)
    //   let markPrice = this.$big(this.markPrice || 0)

    //   //console.log({amount:this.holding.amount,price:this.holding.price,markPrice:this.markPrice})
    //   if(this.holding.amount > 0){ 
    //     return amount.div(price).minus(amount.div(markPrice))
    //   } else if (this.holding.amount < 0) { 
    //     return amount.abs().div(markPrice).minus(amount.abs().div(price))
    //   } else {
    //     return '0'
    //   }
    // },
    // //预计未实现盈亏 算法同上，将标记价格替换成市价
    // unrealizedlp () { 
    //   //console.log(this.lastPrice)
    //   if (isNaN(Number(this.lastPrice)) || isNaN(Number(this.holding.amount)) || isNaN(Number(this.holding.price))){
    //     return '0'
    //   }
    //   let amount = this.$big(this.holding.amount)
    //   let price  = this.$big(this.holding.price)
    //   let lastPrice = this.$big(this.lastPrice || 0)

    //   if(this.holding.amount > 0){
    //     return amount.div(price).minus(amount.div(lastPrice)) 
    //   } else if (this.holding.amount < 0) {
    //     return amount.abs().div(lastPrice).minus(amount.abs().div(price))
    //   } else {
    //     return '0'
    //   }
    // },
    // //收益率 = 未实现盈利 / 开仓价值 * 杠杆倍数 * 100%
    // roe() {
    //   if (isNaN(Number(this.unrealized)) ||
    //   isNaN(Number(this.holding.amount)) ||
    //   isNaN(Number(this.holding.price)) ||
    //   isNaN(Number(this.holding.leverage))){
    //     return '0'
    //   }
    //   if (this.$big(this.holding.amount || 0).eq(0) || this.$big(this.holding.price || 0).eq(0) ) {
    //     return '0'
    //   }

    //   return this.$big(this.unrealized)
    //     .div((this.$big(this.holding.amount).abs()).div(this.holding.price))
    //     .mul(this.holding.leverage == 0 ? 100 : this.holding.leverage)
    //     .mul(100)
    //     .toFixed(2)
    // },
    // roelp() {
    //   if (isNaN(Number(this.unrealizedlp)) || isNaN(Number(this.holding.amount)) || isNaN(Number(this.holding.price)) || isNaN(Number(this.holding.leverage))){
    //     return '0'
    //   }
    //   if (this.$big(this.holding.amount || 0).eq(0) || this.$big(this.holding.price || 0).eq(0) ) {
    //     return '0'
    //   }
    //   return this.$big(this.unrealizedlp)
    //     .div((this.$big(this.holding.amount).abs()).div(this.holding.price))
    //     .mul(this.holding.leverage == 0 ? 100 : this.holding.leverage)
    //     .mul(100)
    //     .toFixed(2)
    // },

  }
}
