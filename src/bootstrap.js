import Vue from 'vue'

import utils from './modules/utils'
import commonMixins from '@/mixins/common'

import Icon from '@/components/Icon'
import VModal from '@/components/VModal'
import VLoading from '@/components/VLoading'
import FiatMoney from '@/components/FiatMoney'
import PrettyNum from '@/components/PrettyNum'
import CurrencyInput from '@/components/CurrencyInput'
import NumberInput from '@/components/NumberInput'
import '@/components/common/ix-scroll-load'
import VBtn from '@/components/VBtn'

Vue.mixin(commonMixins)

Vue.component('icon', Icon)
Vue.component('v-modal', VModal)
Vue.component('v-loading', VLoading)
Vue.component('fiat-money', FiatMoney)
Vue.component('num', PrettyNum)
Vue.component('currency-input', CurrencyInput)
Vue.component('number-input', NumberInput)
Vue.component('v-btn', VBtn)

Vue.filter('localeName', utils.getLocaleName)
Vue.filter('num', utils.toNum)
Vue.filter('big', utils.toBig)
Vue.filter('round', utils.toRound)
Vue.filter('fixed', utils.toFixed)
Vue.filter('unsign', utils.unsign)
Vue.filter('sign', num => num > 0 ? '+' : (num < 0 ? '-' : ''))
Vue.filter('abs', num => Math.abs(num))
Vue.filter('ts2date', utils.dateFormatter)
Vue.filter('date', utils.dateFormatter)
Vue.filter('thousand', utils.toThousand)
Vue.filter('p', str => str.match(/^(.*)_/)[1])
Vue.filter('c', str => str.match(/_(.*)$/)[1])

Vue.directive('focus', {
  componentUpdated (el) {
    // 聚焦元素
    el.focus()
  },
  update (el) {

  }
})

// Vue.filter('money', exRate.getLocaleMoney)

if ('Promise' in window) {
  window.Promise.prototype.finally = function (callback) {
    let constructor = this.constructor
    return this.then(
      function (value) {
        return constructor.resolve(callback()).then(function () {
          return value
        })
      },
      function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason
        })
      }
    )
  }
} else {
  window.Promise = function () {
    console.log('polifill')
  }
  window.Promise.prototype.finally = function () {
    console.log('polifill finally')
  }
}
(function () {
  if (document.scrollingElement) {
    return
  }
  let element = null
  function scrollingElement () {
    if (element) {
      return element
    } else if (document.body.scrollTop) {
      // speed up if scrollTop > 0
      return (element = document.body)
    }
    let iframe = document.createElement('iframe')
    iframe.style.height = '1px'
    document.documentElement.appendChild(iframe)
    let doc = iframe.contentWindow.document
    doc.write('<!DOCTYPE html><div style="height:9999em">x</div>')
    doc.close()
    let isCompliant = doc.documentElement.scrollHeight > doc.body.scrollHeight
    iframe.parentNode.removeChild(iframe)
    return (element = isCompliant ? document.documentElement : document.body)
  }
  Object.defineProperty(document, 'scrollingElement', {
    get: scrollingElement
  })
})()
