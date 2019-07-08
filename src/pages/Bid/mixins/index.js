/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-27 10:21
 */
import * as types from './mutation-types'
// Todo @不知道为什么写到methods就不能用，待验证，不影响使用
export function globalState (type, state) {
  let action = types.GLOBAL__MESSAGE.get(type)
  return action[state]
}
export function getLocalTime (nS) {
  let date = new Date(nS)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let h = date.getHours()
  let mm = date.getMinutes()
  let s = date.getSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  h = h < 10 ? '0' + h : h
  mm = mm < 10 ? '0' + mm : mm
  s = s < 10 ? '0' + s : s
  date = year + '-' + month + '-' + day +' '+ h +':'+ mm +':'+ s
  return date
}

export function getLocalTime1 (nS) {
    let date = new Date(nS)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let h = date.getHours()
    let mm = date.getMinutes()
    let s = date.getSeconds()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    h = h < 10 ? '0' + h : h
    mm = mm < 10 ? '0' + mm : mm
    s = s < 10 ? '0' + s : s
    date = month + '/' + day +' '+ h +':'+ mm
    return date
  }

export function timeFormat(time) {
  var d = new Date(time)

  var year = d.getFullYear()       //年
  var month = d.getMonth() + 1     //月
  var day = d.getDate()            //日

  var hh = d.getHours()            //时
  var mm = d.getMinutes()          //分
  var ss = d.getSeconds()           //秒

  var clock = year + '-'

  if (month < 10) {
    clock += '0'
  }

  clock += month + '-'

  if (day < 10) {
    clock += '0'
  }

  clock += day + ' '

  if (hh < 10) {
    clock += '0'
  }

  clock += hh + ':'
  if (mm < 10) clock += '0'
  clock += mm + ':'

  if (ss < 10) clock += '0'
  clock += ss;
  return (clock);
}

export const globalMixins = {
  methods: {
    // 千分位分割
    toThousands(num) {
      var result = '', counter = 0
      num = (num || 0).toString()
      for (var i = num.length - 1; i >= 0; i--) {
        counter++
        result = num.charAt(i) + result
        if (!(counter % 3) && i != 0) {
          result = ',' + result
        }
      }
      return result
    }
  }

}
