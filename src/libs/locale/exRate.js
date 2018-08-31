import utils from '@/modules/utils'
import {state} from '@/modules/store'

const currency = {
  'en': 'USD',
  'zh-CN': 'CNY',
  'ja': 'JPY'
}
const exRate = {
  USD: 1,
  CNY: 6.3422,
  JPY: 106.95
}
window.exRate = exRate

export default {
  currency,
  exRate,
  getLocaleMoney (usd, locale = state.locale) {
    const unit = currency[locale] || 'USD'
    return utils.toNumber(usd * exRate[unit], 2) + ' ' + unit
  },
  getLocaleMoneyInfo (usd, locale) {
    const unit = currency[locale] || 'USD'
    return {
      unit,
      val: usd * exRate[unit]
    }
  }
}
