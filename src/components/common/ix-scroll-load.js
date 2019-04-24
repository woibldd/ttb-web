/**
 * 滚动到底部触发事件
 * 需要给directive的第一级子元素添加 .scroll--body 类名
 */

import Vue from 'vue'

Vue.directive('scroll-load', function (el, binding) {
  const DISTANCE = 0 // 滚动距离底部DISTANCE的时候,触发,这个暂时不是很准
  const callback = binding.value
  let wrapperHeight
  let inner
  let innerHeight
  let scrollTop
  el.timer = null // 把定时器挂在元素上

  function execute (e) {
    inner = el.getElementsByClassName('scroll--body')
    if (!inner) {
      return
    }
    wrapperHeight = el.offsetHeight
    innerHeight = inner[0].offsetHeight
    scrollTop = el.scrollTop
    // console.log(wrapperHeight, scrollTop, innerHeight)
    if (wrapperHeight + scrollTop >= innerHeight - DISTANCE) {
      console.log('到底了')
      callback && callback()
    }
  }
  const fun = () => {
    el.timer = setTimeout(() => {
      el.flag = true
      execute()
    }, 1000)
  }

  el.addEventListener('scroll', (e) => {
    clearTimeout(el.timer)
    el.timer = null
    fun()
  })
//   console.log(0, 'table height')
})
