import WS from '@/libs/reconnecting-websocket'
import config from '@/libs/config'
import Vue from 'vue'
import utils from '@/modules/utils'
const pako = require('pako');

export default {
  create (channel) {
    const hub = new Vue({
      data () {
        return {
          openTime: 0,
          socket: null
        }
      },
      beforeDestroy () {
        this.socket.close()
      }
    })
    const socket = new WS(config.wssUrl)
    hub.socket = socket
    socket.onopen = function () {
      if (hub._isDestroyed) {
        return socket.close()
      }
      hub.openTime += 1
      hub.$emit(hub.openTime > 1 ? 'reopen' : 'open')
      //heartCheck.start();
    }
    socket.onclose = function () {
      if (hub._isDestroyed) {
        return  
      }
      // hub.$emit('reopen')
    }
    socket.onerror = function () {
      if (hub._isDestroyed) {
        return  
      }
      // hub.$emit('reopen')
    }
    socket.onmessage = function (evt) {
      if (hub._isDestroyed) {
        return socket.close()
      }
      let data
      try { 
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
            data = JSON.parse(restored)   
            hub.$emit('message', data) 
          }
        })
        reader.readAsArrayBuffer(evt.data); 
      } catch (e) {
        utils.logE(e)
      } 
      if (data) { 
        // console.log(data)
        hub.$emit('message', data)
      }
    } 
    hub.heartCheck = {
      timeout: 10000, // 10秒一次
      timeoutObj: null,
      serverTimeoutObj: null,
      start: function () { 
        let self = this
        this.timeoutObj && clearTimeout(this.timeoutObj) 
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
        this.timeoutObj = setTimeout(function () {
          let time = new Date() * 1
          socket.send(`{"op":"heart","args":["${time}"]}`)
          self.serverTimeoutObj = setTimeout(function () { 
            if (!hub._isDestroyed) {
              console.log('reopen')
              hub.$emit('reopen')
            }
          }, self.timeout + 5000)
        }, this.timeout)
      }
    }
    return hub
  }
}
