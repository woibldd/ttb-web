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
  getMargin(amount, price, lever, totalValue, im, mm, take_rate, pairInfo){ 
    if(amount == 0 || price == 0 || price == '--')
      return {
        margin: Big(0), //起始保证金
        fee: Big(0),  //费率
        cost: Big(0),   //成本
        im      //计算后的im值
      } 
    let down = 0
    let up = 3 
    
    let base_risk = pairInfo.base_risk || 200 //起始风险限额
    let gap_risk = pairInfo.gap_risk || 100 //每100BTC加一档
    let max_leverage = pairInfo.max_leverage || 100 //最带杠杆倍数 

    // 下单委托价值 -200/100， 小于等于1取0，向上取整
    // if (this.state.ct.pair === 'FUTURE_VDSUSD') {
    let value = (Big(amount).div(price)).round(6, down)
    let ix = Big(max_leverage).div(Big(lever).eq(0) ? max_leverage : lever).round(6, down)
    if (pairInfo.name !== 'FUTURE_BTCUSD') { 
      let mul = Big(pairInfo.multiplier) //乘数
      value = mul.times(price).times(amount)
      // ix = Big(max_leverage).div(Big(lever).eq(0) ? max_leverage : lever).round(6, down)
    }
    console.log({value:value.toString()})
    totalValue = (totalValue == null || totalValue.eq(0)) ? value : totalValue
    // let count = 0
    // if (pairInfo.name === 'FUTURE_BTCUSD') {
    //   count = (Big(totalValue).minus(200)).div(100).round(0, up)
    // } else {
    //   count = (Big(totalValue).minus(50)).div(50).round(0, up)
    // }  
    //挡位
    let count = 0
    count  = (Big(totalValue).minus(base_risk)).div(gap_risk).round(0, up)

    if(Big(count).lte(1)){
      count = Big(0)
    }
    // let mm = Big(0.005)
    im = Big(im).plus(count.mul(mm)).round(8, down)
    //mm = Big(mm).plus(count.mul(mm)).round(8, down) //维持保证金也要提升挡位，这里用不到，先注释
 
    //let margin = Big(im).mul(value).round(8, down) 
    let margin = Big(value).div(lever).times(Big(1).plus(im))  //起始保证金
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
   * pair 合约类型
   */
  getTotalValue(futures, holding, pairInfo, mul) { 
    let down = 0
    let up = 3
    let bit = 8    
    let price = holding.price == "--" ? 0 :  holding.price
    //let vdsmul = 0.0001
    //console.log({vdsmul, mul})

    let totalValue = (Big(holding.amount || 0).eq(0) || Big(price || 0).eq(0)) ? Big(0) : Big(holding.amount).div(price).round(bit, down) 
    if (pairInfo.name !== 'FUTURE_BTCUSD') { 
      totalValue = Big(holding.amount || 0).times(price || 0).times(mul)
    }
    for (const future of futures) {
      //数量 = 委托总数量 - 已成交数量
      let fprice = future.price == "--" ? 0 :  future.price
      let amount = Big(future.amount).minus(future.executed)
      let value = (Big(future.amount || 0).eq(0) || Big(fprice || 0).eq(0))  ? Big(0) : amount.div(fprice).round(bit, down)
      if (pairInfo.name !== 'FUTURE_BTCUSD') {
        value = Big(future.amount || 0).times(fprice || 0).times(mul)
      }
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
    pairInfo.take_rate: R：吃单手续费率
    委托价值：数量/价格  vol/hp

   * @param {*} param
   * @param {*} holding
   */ 
  getLiqPriceInfo ({direction, mode, lever, amount, open_price}, holding, pairInfo) { 
    //不是btc的时候走新的算法
    if (pairInfo.symbol !== 'BTCUSD') {
      return this.getLiqPriceNew ({direction, mode, lever, amount, open_price}, holding, pairInfo) 
    }
    
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

    //let totalValue = this.getTotalValue()
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
    //计算强平价格小于0时，将其赋值为0
    if (force_price.lt(0)) {
      force_price = Big(0)
    }
    let new_amount = Number(current) + Number(amount * (direction === 'less' ? -1 : 1))

    return {
      current,
      new_amount,
      force_price
    }
  },

  /**
   * 开仓价值=乘数（0.0001BTC）* 开仓价格 * 合约张数
   * 开仓保证金 = IM * 开仓价值 * 20 / 杠杆倍数 
   * 维持保证金 = MM * 开仓价值
   * 爆仓价格=【开仓价值-（开仓保证金-维持保证金）】/乘数X合约张数
   * direction: [more, less] = [做多， 做空]
   * mode: [cross,fixed] = [全仓, 逐仓]
   * lever: 杠杆
   * amount: 数量 vol
   * open_price：持仓均价 hp
   * pairInfo.take_rate: 吃单手续费 r
   * Lp：强平价格 ；Hp：持仓均价；Vol：持仓量（张） ；S：合约面值；IM：起始保证金；MM：维持保证金 R：吃单手续费率
   * 逐仓：
   * 多单：爆仓价格=【开仓价值-（开仓保证金-维持保证金）】/（乘数X合约张数）
   * 空单：爆仓价格=【开仓价值+（开仓保证金-维持保证金）】/（乘数X合约张数） 
   * 全仓：
   * 多单：爆仓价格=【开仓价值-（开仓保证金-维持保证金）-账户余额】/（乘数X合约张数）
   * 空单：爆仓价格=【开仓价值+（开仓保证金-维持保证金）+账户余额】/（乘数X合约张数）
   */
  getLiqPriceNew({direction, mode, lever, amount, open_price}, holding, pairInfo) {
    let hp = open_price
    let vol = amount
    let current = holding.holding || 0
    let r = pairInfo.take_rate || 0
    let mul = Big(pairInfo.multiplier) 
    let max_leverage = pairInfo.max_leverage || 50 //最带杠杆倍数
    
    if (lever === 0){
      lever = max_leverage 
    }
    //console.log({pairInfo})
    let im = pairInfo.im
    let mm = pairInfo.mm
    if (open_price == 0 || amount == 0) {
      return {
        current,
        new_amount: amount,
        force_price: '--'
      }
    } 
    let value = mul.times(hp).times(vol) 
    let fee = Big(r).times(value) 
    // im = Big(im).times(value).times(max_leverage).div(lever) 
    im = value.div(lever).times(Big(1).plus(im))
    mm = Big(mm).times(value)
 
    let mulvol = mul.times(vol)
    let imDiff = im.minus(mm)
    let force_price
    //逐仓
    if (mode === 'fixed') {
      //空单
      if (direction === 'less') {
        force_price = (value.plus(imDiff)).div(mulvol)
      }
      //多单
      else {
        force_price = (value.minus(imDiff)).div(mulvol)
      }
    }
    //全仓
    else {
      let avia = Big(holding.available_balance).minus(fee).minus(im)
      //空单
      if (direction === 'less') {
        force_price = (value.plus(imDiff).plus(avia)).div(mulvol)
      }
      //多单
      else {
        force_price = (value.minus(imDiff).minus(avia)).div(mulvol)
      }
    } 
    //计算强平价格小于0时，将其赋值为0
    if (force_price.lt(0)) {
      force_price = Big(0)
    }
    // console.log({
    //   value:value.toString(),
    //   im: im.toString(),
    //   mm: mm.toString(),
    //   fee: fee.toString()
    // })

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
  },
 
  //合约价值
  // amount: 数量 vol
  // open_price：持仓均价 hp  
  getValue(pair, vol, hp, btcMul) { 
    if (pair === 'FUTURE_BTCUSD') {
      return Big(vol).div(hp)  //  委托价值：数量/价格  vol/hp
    } else {
      btcMul = btcMul ? btcMul : 0.0001 
      return hp * btcMul * vol // 委托价值， vol为1时 === 单价
    }
  },

  /**
   * VDS价值 乘数（0.0001BTC）* 标记价格 * 合约张数 / VDSBTC价格
   * btcMul 比特乘数
   * mp 标记价格
   * vol 数量
   */
  getVDSValue(mp, vol, price, btcMul) { 
    btcMul = btcMul ? btcMul : 0.0001
    return Big(btcMul).mul(price).mul(vol).div(mp)
  }
}
