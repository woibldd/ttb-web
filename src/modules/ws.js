import WS from '@/libs/reconnecting-websocket'
import config from '@/libs/config'
import Vue from 'vue'
import utils from '@/modules/utils'

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
    const socket = new WS(config.wsUrl + channel)
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
        data = JSON.parse(evt.data)
      } catch (e) {
        utils.logE(e)
      }
      if (data) {
        if (data.code) {
          return false
        }
        if (data.data) {
          data = data.data
        }
        hub.$emit('message', data)
      }
    }
    hub.heartCheck = {
      timeout: 60000, // 10秒一次
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
            // socket.close()
            hub.$emit('reopen')
            // createWebSocket();
          }, self.timeout)
        }, this.timeout)
      }
    }
    return hub
  }
}
