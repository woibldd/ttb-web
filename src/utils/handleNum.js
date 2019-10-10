import Big from 'big.js/big.mjs'

export const logogramNum = num => {
  const numberObj = Big(num)
  if (numberObj.e > 6) {
    return numberObj.c.slice(0, numberObj.e - 5).join('') + ' M '
  } else {
    return num
  }
}
const handler = (dataArr, fixed, type) => {
  const res = dataArr.reduce((curr, prev) => Big(curr)[type](prev))
  return bigRound(res, fixed)
}
export const bigRound = (target, fixed = 1, rm = 0) => Big(target).round(fixed, rm).toFixed(fixed < 0 ? 0 : fixed)

export const bigDiv = ([source, rate], fixed) => bigRound(Big(source).div(rate), fixed)

export const bigTimes = (dataArr, fixed) => handler(dataArr, fixed, 'times')

export const bigPlus = (dataArr, fixed) => handler(dataArr, fixed, 'plus')
