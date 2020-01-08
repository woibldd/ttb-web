// 导出为jsonp模块
module.exports = jsonp

// 用于防止get请求缓存的计数器字段
var count = 0

// 占位空函数
function noop() {}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp(url, opts, fn) {
  // 设置第二个参数为可选
  if (typeof opts === 'function') {
    fn = opts
    opts = {}
  }
  if (!opts) opts = {}

  // 设置存放防缓存字段的值的前缀
  // 举个栗子 url中默认的请求信息为 &callbacknice=__jp2
  var prefix = opts.prefix || '__jp'

  //  设置存放防缓存字段的完整值名称
  var id = opts.name || (prefix + (count++))
  // 设置存放防缓存字段的键名
  var param = opts.param || 'callback'
  var timeout = opts.timeout != null ? opts.timeout : 60000 // 设置超时时间，默认60秒
  var enc = encodeURIComponent // encodeURIComponent函数可把字符串作为 URI 组件进行编码 在这里是使用enc简化较长的函数名
  var target = document.getElementsByTagName('script')[0] || document.head // 存放用于跨域的script标签位置的节点
  var script
  var timer

  // 超时时间到时执行，用于清除计数器、移除节点。当为请求成功抛出异常
  if (timeout) {
    timer = setTimeout(function() {
      cleanup()
      if (fn) fn(new Error('Timeout'))
    }, timeout)
  }

  // 移除节点、全局函数、清除计时器
  function cleanup() {
    if (script.parentNode) script.parentNode.removeChild(script)
    window[id] = noop
    if (timer) clearTimeout(timer)
  }

  // 取消请求
  function cancel() {
    if (window[id]) {
      cleanup()
    }
  }
  console.log(id, fn)

  // 防止重复的释放缓存的函数
  window[id] = function(data) {
    cleanup()
    if (fn) fn(null, data)
  }

  // 将请求的参数拼接成jsonp支持的格式，并把字符串进行url组件编码
  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id)
  url = url.replace('?&', '?')

  // 创建script标签,设置script标签的src属性进行跨域，最后将script标签插入页面
  script = document.createElement('script')
  script.src = url
  target.parentNode.insertBefore(script, target)

  return cancel
}
