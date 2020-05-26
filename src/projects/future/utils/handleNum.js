import Big from 'big.js/big.mjs'
import { mapRisk } from '../const'
export const logogramNum = num => {
  const numberObj = Big(num)
  if (numberObj.e > 6) {
    return numberObj.c.slice(0, numberObj.e - 5).join('') + ' M '
  } else {
    return num
  }
}
const handler = (dataArr, fixed = 8, type) => {
  const res = dataArr.reduce((curr, prev) => Big(curr)[type](prev))
  return bigRound(res, fixed)
}

const consts = {
  ROUND_DOWN: 0,
  ROUND_HALF_UP: 1,
  ROUND_HALF_EVEN: 2,
  ROUND_UP: 3,
  DEFAULT_THEME_NAME: 'default'
}

export const bigRound = (target, fixed, rm = 0) => Big(target || 0).round(fixed, rm).toFixed(fixed < 0 ? 0 : fixed)

export const bigDiv = (dataArr, fixed) => handler(dataArr, fixed, 'div')

export const bigTimes = (dataArr, fixed) => handler(dataArr, fixed, 'times')

export const bigPlus = (dataArr, fixed) => handler(dataArr, fixed, 'plus')

export const bigMinus = (dataArr, fixed) => handler(dataArr, fixed, 'minus')

export const toBig = (num) => {
  if (typeof num === 'undefined') {
    return Big(0)
  }
  return Big(num)
}

export const toRound = (num, scale = 20, rm = consts.ROUND_DOWN) => {
  if (isNaN(Number(num))) {
    return 0
  }
  Big.NE = -20 // 当小数超过20位时使用科学计数法
  return Big(num).round(scale, rm).toString()
}

export const toFixed = (num, scale = 20, rm = consts.ROUND_DOWN) => {
  if (isNaN(Number(num))) {
    return 0
  }
  return Big(num).round(scale, rm).toFixed(scale)
}

export const toThousand = (num = 0) => {
  if (isNaN(Number(num))) {
    return 0
  }
  return (num || 0).toString().replace(/\d+/, function (n) {
    var len = n.length
    if (len % 3 === 0) {
      return n.replace(/(\d{3})/g, ',$1').slice(1)
    } else {
      return n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ',$1')
    }
  })
}

/*
  总价值 = 仓位价值 + 委托列表价值（对冲仓位）
*/
/**
 * getCost
 * @param {Array} entrustList
 * @param {Array [amount,price]} holding
 */
export const calcValueByAmountAndPrice = (amount, price, multiplier) => {
  if (!amount || !+amount || !price || !+price) return 0
  else return multiplier === '1' || !+multiplier ? Big(amount).div(price) : Big(multiplier).times(price).times(amount)
}

export const calcMixValueByAmountAndPrice = (amount, price, multiplier, rate) => {
  if (!amount || !+amount || !price || !+price || !rate || !+rate) return 0
  else return Big(amount).times(price).times(multiplier).div(rate)
}

const initalMargin = (entrustValue, leverages, IM) => entrustValue.div(leverages).times(Big(IM).plus(1))

const calcIM = (totalValue, base_risk, gap_risk, im, mm) => {
  let gears = (Big(totalValue || 0).minus(base_risk)).div(gap_risk).round(0, 3)
  gears = gears.lte(1) ? Big(0) : gears
  return Big(im).plus(gears.mul(mm))
}

export const calcTotalValue = ({ entrustList, holding = { amount: 0, price: 0, side: 1 }, multiplier }) => {
  let holdingValue = Big(0)
  if (!holding[0] || !holding[1] || !+holding[1] || !+holding[0]) {
    holdingValue = Big(0)
  } else {
    holdingValue = calcValue(holding.amount, holding.price, multiplier)
  }
  entrustList = !entrustList ? [] : entrustList

  let _holdingValue = Big(_holdingValue)
  const entrustValue = entrustList.reduce((prev, curr) => {
    const remainAmount = Big(curr.amount).minus(curr.executed)
    const entrustValue = calcValue(remainAmount, curr.price, multiplier)
    if (curr.side !== holding.side && _holdingValue.gte(0)) {
      _holdingValue = _holdingValue.minus(entrustValue)
      return _holdingValue.abs().plus(prev)
    } else return holdingValue.plus(entrustValue).plus(prev)
  }, 0)
  return holdingValue.plus(entrustValue)
  
}

/*
  { 开平仓费率：后台返回take_rate ，IM百分比：当前档位，合约乘数：后台返回multiplier BTC为1，合约数量：合约乘数 * 合约数量}

  成本 = 起始保证金 + 开平仓手续费
  起始保证金 = 委托价值 / 当前杠杆倍数 *（1 + IM百分比）
  委托价值 = 合约数量 / 成交价格
  开平仓手续费 = 委托价值 * 开平仓费率

  成本 = 起始保证金 + 开平仓手续费

  委托价值 = 如果是BTC ? 合约数量 / 成交价格 : 乘数 * 价格 * 数量
  总价值 = 仓位价值 + 委托列表价值（对冲仓位）
*/
/**
 * getCost
 * @param {(|string|number)} amount
 * @param {(|string|number)} price
 * @param {(|string|number)} leverages
 * @param {(|string|number)} IM
 * @param {(|string|number)} take_rate
 * @param {(|string|number)} fixed
 * @param {(|string|number)} MM
 * @returns {string|number}
 */
export const getCost = (product, leverages, entrustList, currHolding) => {
  // { amount = 0, price = 1, leverages = 1, IM = 0, take_rate = 0.0007, MM = 0, pairInfo = { mul: 0 }, totalValue = 0, fixed = 8 }
  // const entrustValue = Big(amount).div(price)
  // const serviceCharge = entrustValue.times(take_rate).times(2)
  // if (!amount) return Big(0).toFixed(fixed)
  // return entrustValue.div(leverages).times(+IM + 1).plus(serviceCharge).toFixed(fixed)

  // if (amount === 0 || price === 0) return 0 // 价格或数量为0时成本为0

  const { amount, price, base_risk, gap_risk, take_rate, mm, im, multiplier, max_leverage } = product

  // const base_risk = pairInfo.base_risk || 200 // 起始风险限额
  // const gap_risk = pairInfo.gap_risk || 100 // 每100BTC加一档
  // const max_leverage = pairInfo.max_leverage || 100 // 最大杠杆倍数
  // const mul = Big(pairInfo.multiplier || 0) // 乘数
  // const current_leverage = !+leverages ? max_leverage : leverages // 当前杠杆倍数

  // btc_usd的价值等于数量除以价格,其它币对的价值等于 数量 * 价格 * 乘数
  // let value = (Big(amount).div(price))
  // if (pairInfo.name !== 'FUTURE_BTCUSD') {
  //   value = mul.times(price).times(amount)
  // }
  // 输入价值
  const currValue = calcValueByAmountAndPrice(amount, price, multiplier)

  if (!currValue) return 0
  // 总价值=仓位价值+委托列表价值（对冲仓位）
  // 委托列表价值 = 当前委托列表价值+即将要下单的价值
  // totalValue = (totalValue == null || totalValue.eq(0)) ? value : totalValue

  // 累加次数 向上取整
  let totalValue = calcTotalValue({ entrustList, currHolding, multiplier })
  totalValue = (totalValue == null || totalValue.eq(0)) ? currValue : totalValue

  // 平仓手续费
  const serviceCharge = currValue.times(take_rate).times(2)
  // 起始保证金
  // const margin = Big(currValue).div(leverages).times(Big(1).plus(endIM)).plus(serviceCharge)
  const IM = calcIM(totalValue, base_risk, gap_risk, im, mm)
  const margin = initalMargin(currValue, !+leverages ? max_leverage : leverages, IM)
  // 成本
  return margin.plus(serviceCharge).round(8)
}

/**
   * @param {Array} futures 当前委托列表
   * @param {Object} holding 持仓
   * @param {(|string|number)} multiplier 
   */
export const getTotalValue = (futures, holding, multiplier) => {
  const { price, amount } = holding
  const holdingValue = calcValueByAmountAndPrice(amount, price, multiplier)
  return futures.reduce((prev, curr) => holdingValue[curr.side === 1 ? 'plus' : 'minus'](prev), holdingValue)
}

/** 盈亏计算
 * direction 多空方向 less空 more多
 * leverages 杠杆倍数
 * amount 下单数量
 * open_price 开仓价格
 * close_price 平仓价格
 * product 币对属性
*/
export const calcProfit = (amount, open_price, close_price) => {
  return (Big(amount).div(open_price)).minus(Big(amount).div(close_price)).toFixed(8)
}
export const getProfitLoss = ({ direction, leverages, amount, open_price, close_price, product }) => {
  if (direction === 'less') {
    amount = -amount
  }
  if (leverages == 0) {
    leverages = product.max_leverage
  }
  let open_value = Big(0)
  let close_value = Big(0)

  if (product.product_name === 'BTC') {
    open_value = Big(amount).div(open_price || 1).abs()
    close_value = Big(close_price).div(open_price || 1).mul(open_value).abs()
  } else {
    open_value = Big(amount || 0).times(open_price || 0).times(product.multiplier).abs()
    close_value = Big(amount || 0).times(close_price || 0).times(product.multiplier).abs()
  }

  const margin = Big(open_value).mul(product.max_leverage).div(leverages || product.max_leverage).mul(product.im).abs()
  const realized = close_value.minus(open_value).mul(amount < 0 ? -1 : 1)
  const realized_roe = realized.div(open_value || 1).mul(100)
  const roe = realized_roe.mul(leverages)

  return {
    open_value, // 开仓价值
    close_value, // 平仓价值
    margin, // 保证金
    realized, // 以实现盈亏
    realized_roe, // 盈亏比例
    roe // 回报率
  }
}

export const calcMixProfit = (amount, open_price, close_price, value, rate) => {
  return ((Big(close_price).minus(open_price)).times(value).times(amount)).div(rate)
}
// 空
export const calcMixProfitLoss = (amount, open_price, close_price, value, rate) => {
  return ((Big(open_price).minus(close_price)).times(value).times(amount)).div(rate)
}
// 风险限额及最大杠杆倍数
export const riskLimitDict = maxLeverage => mapRisk[maxLeverage] || []

// 强平价格
/**
 * direction 多空方向 false空 true多
 * leverages 杠杆倍数
 * amount 下单数量
 * open_price 开仓价格
 * price_scale 价格小数位
 * isCross 是否是全仓
 * multiplier 乘数
 * take_rate 手续费率
 * 用户多单500张，开仓价格5500，杠杆倍数10；
*/
export const getLiqPrice = ({ isBuy, leverages, amount, price, available_balance, totalValue }, product) => {
  const { base_risk, gap_risk, im, mm, take_rate, multiplier, max_leverage } = product
  // 委托价值
  const entrustValue = calcValueByAmountAndPrice(amount, price, multiplier)
  /* 初始保证金 */
  // 档位【(总价值-初始风险限额)/递增额度 向下取整】
  // let gears = (Big(totalValue).minus(base_risk)).div(gap_risk).round(0, 3)
  // gears = gears.lte(1) ? Big(0) : gears
  // IM值【IM百分比】
  // const IM = Big(im).plus(gears.mul(mm))
  // 初始保证金【委托价值/当前杠杆倍数*（100%+IM百分比--当前档位）】
  const IM = calcIM(entrustValue, base_risk, gap_risk, im, mm)
  const margin = initalMargin(entrustValue, !+leverages ? max_leverage : leverages, IM)
  // const initalMargin = entrustValue.div(!+leverages ? max_leverage : leverages).times(Big(IM).plus(1))
  // 维持保证金【MM百分比（当前挡位）*委托价值】
  const MM = Big(entrustValue).mul(mm)
  // 全仓ture 逐仓false
  const isCross = +leverages === 0

  // 合约 【开仓价值-（开仓保证金-维持保证金）】/（乘数X合约张数）
  if (!isCross) {
    // 多仓Lp=price*amount/[amount+(IM-MM)*price*（1-take_rate）]
    // （乘数X合约张数）/【开仓价值+（开仓保证金-维持保证金）】
    const tem = margin.minus(MM).mul(price).mul(1 - +take_rate)
    const temContract = margin.minus(MM)
    // const temCoin = margin
    // if (multiplier === '1' || !multiplier || !+multiplier) return Big(price).mul(amount).div(Big(amount)[isBuy ? 'plus' : 'minus'](tem)).toFixed(8)
    if (multiplier === '1' || !multiplier || !+multiplier) return Big(amount).div(entrustValue[isBuy ? 'plus' : 'minus'](temContract)).toFixed(8)
    else return entrustValue[!isBuy ? 'plus' : 'minus'](temContract).plus(MM).div(Big(multiplier).mul(amount)).toFixed(8)
  } else {
    // 全仓Hp*VoL/[Vol+(可用余额+IM-MM)*Hp*（1-R）]
    const tem = (Big(available_balance).minus(margin).plus(IM).minus(MM)).mul(price).mul(1 - +take_rate)
    // const tem = initalMargin.plus(Big(available_balance)).minus(MM).mul(price).mul(1 - +take_rate)
    const temContract = margin.minus(MM)
    if (multiplier === '1' || !multiplier || !+multiplier) return Big(price).mul(amount).div(Big(amount)[isBuy ? 'plus' : 'minus'](tem)).toFixed(8)
    else return entrustValue[!isBuy ? 'plus' : 'minus'](temContract)[!isBuy ? 'plus' : 'minus'](available_balance).plus(MM).div(Big(multiplier).mul(amount)).toFixed(8)
  }
}
// 500*5500/[500+(0.00918181-0.00045454)*5500*0.9993]

// console.log(getLiqPrice({ isBuy: true, leverages: 0, amount: 500, price: 9150, available_balance: 0.088, totalValue: 0.0546448 }, {
//   im: 0.01,
//   mm: 0.005,
//   base_risk: 200,
//   gap_risk: 100,
//   take_rate: 0.0007,
//   max_leverage: 100
// }))

export const getMixCost = (product, leverages, entrustList, currHolding) => {
 
  if (!product) return
  const { amount, price, take_rate, mm, im, multiplier, symbol_currency } = product 
  const { base_risk, gap_risk, max_leverage} = symbol_currency.find(item => item.currency === product.curSymbol)

  // 输入价值
  // const currValue = calcValueByAmountAndPrice(amount, price, multiplier)
  const currValue = calcMixValueByAmountAndPrice(amount, price, multiplier, 1)

  if (!currValue) return 0
  // 总价值=仓位价值+委托列表价值（对冲仓位）
  // 委托列表价值 = 当前委托列表价值+即将要下单的价值
  // totalValue = (totalValue == null || totalValue.eq(0)) ? value : totalValue

  // 累加次数 向上取整
  let totalValue = calcTotalValue({ entrustList, currHolding, multiplier })
  totalValue = (totalValue == null || totalValue.eq(0)) ? currValue : totalValue

  // 平仓手续费
  const serviceCharge = currValue.times(take_rate).times(2)
  // 起始保证金
  // const margin = Big(currValue).div(leverages).times(Big(1).plus(endIM)).plus(serviceCharge)
  const IM = calcIM(totalValue, base_risk, gap_risk, im, mm)
  const margin = initalMargin(currValue, !+leverages ? max_leverage : leverages, IM)
  // 成本
  return margin.plus(serviceCharge).round(8)
}
 
export const getMixLiqPrice = ({ isBuy, leverages, amount, price, available_balance, totalValue, rate }, product) => {
  const { take_rate, mm, im, multiplier, symbol_currency } = product
  // const { base_risk, gap_risk, max_leverage} = symbol_currency.USDT 
  const { base_risk, gap_risk, max_leverage} = symbol_currency.find(item => item.currency === product.curSymbol)  
  // 委托价值
  const entrustValue = calcMixValueByAmountAndPrice(amount, price, multiplier, rate)

  if (Big(entrustValue).eq(0)) return 0
  /* 初始保证金 */
  // 档位【(总价值-初始风险限额)/递增额度 向下取整】 
  // IM值【IM百分比】 
  // 初始保证金【委托价值/当前杠杆倍数*（100%+IM百分比--当前档位）】
  const IM = calcIM(entrustValue, base_risk, gap_risk, im, mm)
  //开仓保证金
  const margin = initalMargin(entrustValue, !+leverages ? max_leverage : leverages, IM) 
  // 维持保证金【MM百分比（当前挡位）*委托价值】
  const MM = Big(entrustValue).mul(mm)
  // 全仓ture 逐仓false
  const isCross = +leverages === 0

  // 合约 【开仓价值-（开仓保证金-维持保证金）】/（乘数X合约张数）
  if (!isCross) {
    // 多仓Lp=price*amount/[amount+(IM-MM)*price*（1-take_rate）]
    // （乘数X合约张数）/【开仓价值+（开仓保证金-维持保证金）】
    // const tem = margin.minus(MM).mul(price).mul(1 - +take_rate)
    const temContract = margin.minus(MM) 
    let lip = Big(entrustValue)[!isBuy ? 'plus' : 'minus'](temContract).times(rate).div(Big(multiplier).times(amount))
    console.log(lip.toString())
    if (lip.gt(0)) {
      return lip.toFixed(8)
    } else {
      return '0'
    }
  } else {
    // 全仓Hp*VoL/[Vol+(可用余额+IM-MM)*Hp*（1-R）]
    // const tem = (Big(available_balance).minus(margin).plus(IM).minus(MM)).mul(price).mul(1 - +take_rate) 
    const temContract = margin.minus(MM)
    let lip = Big(entrustValue)[!isBuy ? 'plus' : 'minus'](temContract)[!isBuy ? 'plus' : 'minus'](available_balance).times(rate).div(Big(multiplier).times(amount))
    console.log(lip.toString())
    if (lip.gt(0)) {
      return lip.toFixed(8)
    } else {
      return '0'
    }
  }
}



export const getUnitTotalValue = (futures, holding, multiplier) => {
  let { price, amount, side } = holding
  let totalValue = Big(0)
  let buyValue = Big(0)
  let sellValue = Big(0)
  futures.map(item => {
    let curValue = Big(0)
    if (side === 1) { // 持多仓
      let newAmount = Big(amount).plus(item.holding).toString()
      // 对冲后仍多仓,不计算这条委托的价值
      if (item.side !== side && newAmount.gte(0)) {
        amount = newAmount.toString()
      }
      // 对冲后变空仓
      else if (item.side !== side && newAmount.lt(0)) {
        amount = 0
        curValue = calcValueByAmountAndPrice(newAmount, item.price, item.multiplier)
        sellValue = sellValue.plus(curValue)
      } else if (item.side === side) {
        curValue = calcValueByAmountAndPrice(item.holding, item.price, item.multiplier)
        buyValue = buyValue.plus(curValue)
      }
    } else {
      let newAmount = Big(amount).plus(item.holding)
      // 对冲后变多仓
      if (item.side !== side && newAmount.gte(0)) {
        amount = 0
        curValue = calcValueByAmountAndPrice(newAmount, item.price, item.multiplier)
        buyValue = buyValue.plus(curValue)
      }
      // 对冲后仍空仓,不计算这条委托的价值
      else if (item.side !== side && newAmount.le(0)) {
        amount = newAmount.toString()
      } else if (item.side === side) {
        curValue = calcValueByAmountAndPrice(item.holding, item.price, item.multiplier)
        sellValue = sellValue.plus(curValue)
      }
    }
  })
  const holdingValue = calcValueByAmountAndPrice(amount, price, multiplier)
  totalValue = Big(holdingValue).plus(buyValue).plus(sellValue)
  return totalValue.abs()
}
export const getUnitLiqPrice = ({ isBuy, leverages, amount, price, available_balance, totalValue, totalAmount }, product) => {
  const { base_risk, gap_risk, im, mm, take_rate, multiplier, max_leverage } = product
  // 全仓ture 逐仓false
  const isCross = +leverages === 0
  totalAmount = totalAmount || 0
  // 委托价值
  let entrustValue = calcValueByAmountAndPrice(amount, price, multiplier).abs()
  // console.log(`委托价值entrustValue：${entrustValue}`)
  // 现有委托 和当前下单委托的 方向相同
  if ((Big(amount).gte(0) && Big(totalAmount).gte(0)) || (Big(amount).lte(0) && Big(totalAmount).lte(0))) {
    totalAmount = Big(totalAmount || 0).plus(amount)
    // totalValue = Big(totalValue || 0).plus(entrustValue).abs()
  } else { // 现有委托 和当前下单委托的 方向相反
    totalAmount = Big(totalAmount || 0).plus(amount)
    totalValue = calcValueByAmountAndPrice(totalAmount, price, multiplier).abs()
  }
  // console.log(`委托总价值totalValue：${totalValue}`)
  /* 初始保证金 */
  // 档位【(总价值-初始风险限额)/递增额度 向下取整】
  // let gears = (Big(totalValue).minus(base_risk)).div(gap_risk).round(0, 3)
  // gears = gears.lte(1) ? Big(0) : gears
  // IM值【IM百分比】
  // const IM = Big(im).plus(gears.mul(mm))
  // 初始保证金【委托价值/当前杠杆倍数*（100%+IM百分比--当前档位）】
  let IM = calcIM(isCross ? totalValue : entrustValue, base_risk, gap_risk, im, mm)
  let margin = initalMargin(isCross ? totalValue : entrustValue, !+leverages ? max_leverage : leverages, IM)
  // console.log(`初始保证金margin${margin}, max_leverage: ${max_leverage}`)
  // const initalMargin = entrustValue.div(!+leverages ? max_leverage : leverages).times(Big(IM).plus(1))
  // 维持保证金【MM百分比（当前挡位）*委托价值】
  let MM = Big(isCross ? totalValue : entrustValue).mul(mm)
  // console.log(`维持保证金MM：${MM}`)

  // 合约 【开仓价值-（开仓保证金-维持保证金）】/（乘数X合约张数）
  if (!isCross) {
    // 多仓Lp=price*amount/[amount+(IM-MM)*price*（1-take_rate）]
    // （乘数X合约张数）/【开仓价值+（开仓保证金-维持保证金）】
    const fee = entrustValue.times(take_rate)
    const totalFee = totalValue.times(take_rate)

    const usesrEquity = Big(available_balance).minus(totalFee)
    // console.log(`开仓手续费fee:${fee}, 账户权益usesrEquity:${usesrEquity}`)
    // 预收闭仓手续费
    const closeFee = entrustValue.times(take_rate)
    // 成本=起始保证金+开闭仓手续费
    const cost = margin.plus(fee.times(2))
    // console.log(`成本cost：${cost}`)
    margin = initalMargin(totalValue, !+leverages ? max_leverage : leverages, IM)
    MM = Big(totalValue).mul(mm)

    const available = Big(available_balance).minus(cost)
    // console.log(`可用余额available：${available}`)
    // 强平价格计算=（乘数X合约张数）/【开仓价值+（开仓保证金-维持保证金）】
    console.log({multiplier, totalAmount: totalAmount.toString(), totalValue: totalValue.toString(), margin: margin.toString(), MM: MM.toString()})
    const lipPrice = Big(multiplier).times(totalAmount.abs()).div(Big(totalValue).plus(margin).minus(MM))
    console.log(`强平价格lipPrice：${lipPrice}`)
    return lipPrice.lt(0) ? '1000000' : lipPrice
  } else {
    // 全仓Hp*VoL/[Vol+(可用余额+IM-MM)*Hp*（1-R）]
    // const tem = (Big(available_balance).minus(margin).plus(IM).minus(MM)).mul(price).mul(1 - +take_rate)
    const fee = entrustValue.times(take_rate)
    const totalFee = totalValue.times(take_rate)
    const usesrEquity = Big(available_balance).minus(totalFee)
    // console.log(`开仓手续费fee:${fee}, 账户权益usesrEquity:${usesrEquity}`)

    const cost = margin.plus(totalFee.times(2))
    // console.log(`成本cost：${cost}`)

    const available = Big(available_balance).minus(cost)
    // console.log(`可用余额available：${available}`)

    // 强平价格=（乘数X合约张数）/【开仓价值-（开仓保证金-维持保证金）-账户余额】
    // console.log({multiplier, amount: totalAmount.toString(), price, margin: margin.toString(), MM: MM.toString(), available:available.toString()})
    const lipPrice = Big(multiplier).times(totalAmount.abs()).div((Big(totalValue)[isBuy ? 'plus' : 'minus'](margin.minus(MM)))[isBuy ? 'plus' : 'minus'](available))
    console.log(`Big(${multiplier}).times(${totalAmount.abs()}).div((Big(${totalValue.toString()})${[isBuy ? 'plus' : 'minus']}(${margin.toString()}.minus(${MM.toString()})))${[isBuy ? 'plus' : 'minus']}(${available.toString()}))`)
    console.log(`强平价格lipPrice：${lipPrice}`)
    // console.log(`--------------------------------------------------------------------------------------------`)
    return  lipPrice.lt(0) ? '1000000' : lipPrice
    
  }
}


// 委托价值 = 委托价格 * 单张合约价值 * 合约张数 / 相对应结算货币汇率
export const calcMixValue = (price, multiplier, amount, rate) => {
  return Big(price).times(multiplier).times(amount).div(rate)
}