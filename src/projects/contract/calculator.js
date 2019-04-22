import Big from 'big.js'
export default {
  /**
   *
   * 成本
   * 成本=起始保证金+资金费率+手续费
   * 起始保证金=im*委托价值*IX算法
   * IX算法 100 / 当前杠杆
   * @param {Object}
   */
  getMargin(amount, price, lever, totalValue, im, take_rate = 0.0007){
    if(amount == 0 || price == 0)
      return 0 
    let down = 0
    let up = 3
    // 下单委托价值 -200/100， 小于等于1取0，向上取整
    let value = (Big(amount).div(price)).round(6, down)
    
    // console.log({value:value.toString()})
    totalValue = (totalValue == null || totalValue.eq(0)) ? value : totalValue
    let count = (Big(totalValue).minus(200).div(100)).round(0, up)
    if(Big(count).lte(1)){
      count = Big(0)
    }
    let mm = Big(0.005)
    im = Big(im).plus(count.mul(mm)).round(8, down)
    // console.log({im:im.toString()})
    let margin = Big(im).mul(value).round(8, down)
    // console.log({margin:margin.toString()})
    //IX算法 100 / 当前杠杆，杠杆位0是取100
    let ix = Big(100).div(Big(lever).eq(0) ? 100 : lever).round(6, down)
    margin = Big(margin).mul(ix).round(8, down)

    // console.log({margin:margin.toString()})
 
    //平仓手续费 
    let fee = value.mul(take_rate).mul(2) 
    //成本 
    let cost = margin.plus(fee) 
    //console.log({fee : fee.toString(), cost : cost.toString()})
    // return margin 
    return {
      margin, //起始保证金
      fee,  //费率
      cost,   //成本
      im      //计算后的im值
    }
  },

  /**
   * 获取总价值
   * futures 当前委托列表 （委托列表 + 输入窗口的值）
   * holding 持仓
   * price 持仓价格
   */
  getTotalValue(futures, holding, price) { 
    let down = 0
    let up = 3
    let bit = 8    
    let totalValue = (Big(holding.amount || 0).eq(0) || Big(holding.price || 0).eq(0)) ? Big(0) : Big(holding.amount).div(holding.price).round(bit, down) 
    for (const future of futures) {
      //数量 = 委托总数量 - 已成交数量
      let amount = Big(future.amount).minus(future.executed)
      let value = (Big(future.amount || 0).eq(0) || Big(future.price || 0).eq(0))  ? Big(0) : amount.div(future.price).round(bit, down)
      totalValue = future.side == 1 ? totalValue.plus(value) : totalValue.minus(value);
    }
    // console.log({totalValue:totalValue.toString()})
    return totalValue.abs();
  },

  getCostValue ({lever, im, value, take_rate}) {
    let margin = Big(value).mul(100 / lever).mul(im)
    let fee = Big(value).mul(take_rate || 0).mul(2)
    return {
      margin,
      fee,
      cost: margin.plus(fee)
    }
  }, 
  getStorageInfo ({direction, lever, amount, open_price, close_price}) {
    if (direction === 'less') {
      amount = -amount
    }
    if (lever == 0) {
      lever = 100
    }
    let open_value = Big(amount).div(open_price || 1).abs()
    let close_value = Big(close_price).div(open_price || 1).mul(open_value).abs()
    let margin = Big(open_value).mul(100).div(lever || 100).mul(0.01).abs()
    let realized = close_value.minus(open_value).mul(amount < 0 ? -1 : 1)
    let realized_roe = realized.div(open_value || 1).mul(100)
    let roe = realized_roe.mul(lever)

    return {
      open_value,
      close_value,
      margin,
      realized,
      realized_roe,
      roe
    }
  },
  /**
   * IM：起始保证金；=1%*委托价值*（100/杠杆倍数）
    MM：维持保证金；=0.5%*委托价值
    多仓Lp=Hp*VoL/[Vol+(IM-MM)*Hp*（1-R）]
    空仓Lp=Hp*VoL/[Vol-(IM-MM)*Hp*（1-R）]

    全仓--多仓Lp=Hp*VoL/[Vol+(可用余额+IM-MM)*Hp*（1-R）]
    全仓--空仓Lp=Hp*VoL/[Vol-(可用余额+IM-MM)*Hp*（1-R）]
    Lp：强平价格 ；Hp：持仓均价；Vol：持仓量（张） ；S：合约面值；IM：起始保证金；MM：维持保证金 R：吃单手续费率
    direction: [more, less] = [做多， 做空]
    mode: [cross,fixed] = [全仓, 逐仓]
    lever: 杠杆
    amount: 数量 vol
    open_price：持仓均价 hp
    pairInfo.take_rate: 吃单手续费
    委托价值：数量/价格  vol/hp
   * @param {*} param
   * @param {*} holding
   */

  getLiqPriceInfo ({direction, mode, lever, amount, open_price}, holding, pairInfo) {
    let hp = open_price
    let vol = amount
    let current = holding.holding || 0
    let r = pairInfo.take_rate || 0
    if (open_price == 0 || amount == 0) {
      return {
        current,
        new_amount: amount,
        force_price: '--'
      }
    } 
    let value = Big(vol).div(hp)
    let im = this.getCostValue({lever, im: 0.01, value, r}).margin//margin = Big(value).mul(100 / lever).mul(im)
    let mm = Big(value).mul(0.005) // this.getCostValue({lever, im: 0.005, value, r}).margin
    let avia = holding.available_balance
    const isCross = mode === 'cross'
    let price_scale = pairInfo.price_scale
    //console.log('手续费：'+ r)

    let force_price
    if (direction === 'less') {
      // 空仓Lp=Hp*VoL/[Vol-(IM-MM)*Hp*（1-R）]
      let result = Big(hp).mul(vol)
      let imDiff = Big(im - mm)
      if (isCross) {
        // 全仓--空仓Lp=Hp*VoL/[Vol-(可用余额+IM-MM)*Hp*（1-R）]
        imDiff = imDiff.plus(avia)
      }
      result = result.div(Big(vol).minus(imDiff.mul(hp).mul(1 - Number(r || 0))))
      if (result.lt(0)) {
        force_price = '999999'
      } else {
        force_price = result.round(price_scale || 4).toString()
      }
    } else {
      // 多仓Lp=Hp*VoL/[Vol+(IM-MM)*Hp*（1-R）]
      let result = Big(hp).mul(vol) // .mul(1 + Number(r || 0))
      let imDiff = Big(im - mm)
      if (isCross) {
        // 全仓--多仓Lp=Hp*VoL/[Vol+(可用余额+IM-MM)*Hp*（1-R）]
        imDiff = imDiff.plus(avia)
      }
      result = result.div(Big(vol).plus(imDiff.mul(hp).mul(1 - Number(r || 0))))
      if (result.lt(0)) {
        force_price = '--'
      } else {
        force_price = result.round(price_scale || 4).toString()
      }
    }
    let new_amount = Number(current) + Number(amount * (direction === 'less' ? -1 : 1))

    return {
      current,
      new_amount,
      force_price
    }
  },
  /**
   * 盈亏目标
   */
  getTargetRewardRate ({direction, lever, open_price, roe}) {
    // 盈亏比例
    let realized_rate = Big(roe).div(100).div(lever)
    let aim_price = ''
    if (direction === 'less') {
      aim_price = (Big(roe).div(100).minus(realized_rate)).plus(realized_rate.div(lever)).mul(open_price)
      //aim_price = Big(1).minus(realized_rate).mul(open_price)
    } else {
      //aim_price = Big(1).plus(realized_rate).mul(open_price)
      aim_price = (Big(roe).div(100).plus(realized_rate)).plus(realized_rate.div(lever)).mul(open_price)
    }
    return {
      aim_price,
      realized_rate: realized_rate.mul(100)
    }
  },
  test () {
    return 1
  }
}
