/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-04 13:00
 */
export default {
  debounce(fn, delay = 100) {
    var timer
    return function () {
      var args = arguments
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  },
  fnThrottle (fn, delay, atleast) {
    let timer = null
    let previous = null
    return function () {
      let now = +new Date()
      if (!previous) previous = now
      if (atleast && now - previous > atleast) {
        fn()
        previous = now
        clearTimeout(timer)
      } else {
        clearTimeout(timer)
        timer = setTimeout(function () {
          fn()
          previous = null
        }, delay)
      }
    }
  }
}
