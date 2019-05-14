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
      heartCheck.start();
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

      heartCheck.start();
    }
    let heartCheck = {
      timeout: 10000, //10秒一次
      timeoutObj: null,
      serverTimeoutObj: null,
      start: function() {
        console.log('start');
        let self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function(){
          //这里发送一个心跳，后端收到后，返回一个心跳消息，
          //console.log('这里发送一个心跳')
          socket.send('123456');
          self.serverTimeoutObj = setTimeout(function() {
            console.log(socket);
            socket.close()
          }, self.timeout)
        }, self.timeout)
      }
    }
    return hub
  }
}
