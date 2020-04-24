import ReconnectingWebSocket from 'reconnecting-websocket'
import config from '@/libs/config'
import { WSURL } from '../const'
export default {
  data () {
    return {
      websocket: null
    }
  },
  destroyed: function () {
    this.websocket.close()
  },
  methods: {
    openWebSocket (callBack = () => {}, onopen = () => {}) {
      return new Promise((resolve, reject) => {
        const websocket = new ReconnectingWebSocket(config.wssUrl)
        websocket.onopen = onopen
        websocket.onclose = () => {
          if (this._isDestroyed) {
            console.log('_isDestroyed')
          }
          console.log(`${config.wssUrl}链接关闭`)
        }
        websocket.onerror = () => {
          console.log(`${config.wssUrl}出错`)
        }

        this.websocket = websocket
        websocket.onmessage = e => {
          const res = JSON.parse(e.data)
          if (!res.code || res.code === 200) {
            typeof callBack === 'function' && callBack(res)
            resolve(this.websocket)
            websocket.heartCheck.start()
          } else reject(res)
        }
        websocket.heartCheck = {
          timeout: 10000,
          timeoutObj: null,
          serverTimeoutObj: null,
          serverIntervalObj: null,
          start: function () {
            let self = this
            this.timeoutObj && clearTimeout(this.timeoutObj)
            // this.serverTimeoutOjb && clearTimeout(this.serverTimeoutOjb)
            this.serverIntervalObj && clearInterval(this.serverIntervalObj)
            this.timeoutObj = setTimeout(function () {
              let time = new Date() * 1
              websocket.send(`{"op":"heart","args":["${time}"]}`)
              // self.serverTimeoutObj = setTimeout(function () {
              //   websocket.close()
              // }, self.timeout)
              self.serverIntervalObj = setInterval(function () {
                // websocket.close()
                websocket.reconnect()
              }, self.timeout)
            }, this.timeout)
          }
        }
      })
    },
    closeWebSocket () {
      this.websocket.close()
    }
  }
}