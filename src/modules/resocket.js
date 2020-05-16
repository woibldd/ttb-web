import ReconnectingWebSocket from '@/libs/reconnecting-websocket'
import config from '@/libs/config'  

const pako = require('pako');
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
          var reader = new FileReader();
          reader.addEventListener("loadend", function() {
            let binData   = new Uint8Array(reader.result); 
            let restored = ''
            try{
              restored = pako.ungzip( binData, { to: 'string' } ); 
            } catch(err){
              console.log("Error:"+err);
            }
            if (restored) {
              let res = JSON.parse(restored) 
              // const res = JSON.parse(e.data)
              if (!res.code || res.code === 200) {
                typeof callBack === 'function' && callBack(res)
                resolve(this.websocket)
                websocket.heartCheck.start()
              } else reject(res)
                }
              })
              reader.readAsArrayBuffer(e.data); 
          
          // const data = utils.pako_ungzip(e.data)
          // const res = JSON.parse(data)
          // // const res = JSON.parse(e.data)
          // if (!res.code || res.code === 200) {
          //   typeof callBack === 'function' && callBack(res)
          //   resolve(this.websocket)
          //   websocket.heartCheck.start()
          // } else reject(res)
        }
        websocket.heartCheck = {
          timeout: 10000,
          timeoutObj: null,
          serverTimeoutObj: null,
          serverIntervalObj: null,
          start: function () {
            let self = this
            this.timeoutObj && clearTimeout(this.timeoutObj) 
            this.serverIntervalObj && clearInterval(this.serverIntervalObj)
            this.timeoutObj = setTimeout(function () {
              let time = new Date() * 1 
              websocket.send(`{"op":"heart","args":["${time}"]}`) 
              self.serverIntervalObj = setInterval(function () { 
                websocket.reconnect()
              }, self.timeout)
            }, this.timeout)
          }
        }
      })
    },
    closeWebSocket () {
      if (this.websocket)
        this.websocket.close()
    }
  }
}
