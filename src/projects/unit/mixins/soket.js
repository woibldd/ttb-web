// import { getFutureDictionaryList } from '@/api/contract'
// export default {
//   data() {
//     return {
//       websockets: [],
//       // tickersData: null
//       websocketArgs: ['1', 'BTCUSD']
//     }
//   },
//   created() {
//     // getFutureDictionaryList().then(res => {
//     //   this.dataDictionary = res.data
//     //   this.openWebSocket('market/tickers', this.handleTickers).then(() => this.$emit('baseDataLoaded'))
//     // })
//   },
//   computed: {
//     baseWSurl() {
//       return process.env.VUE_APP_WS_API
//     }
//   },
//   destroyed() {
//     this.websockets.forEach(soket => soket.close())
//   },
//   methods: {
//     openWebSocket(wsurl, callBack = () => {}) {
//       return new Promise((resolve, reject) => {
//         const websocket = new WebSocket(`${this.baseWSurl}${wsurl}`)
//         websocket.onopen = () => {
//           // websocket.send(`{"reqType": 2, "args":["${this.websocketArgs[1]}"]}`)
//           websocket.send(`{"reqType": 2, "args":["BTCUSD"]}`)
//           websocket.send(`{"reqType": 1, "args":${JSON.stringify(this.websocketArgs)}}`)
//           console.log(`${wsurl}连接成功`)
//         }
//         websocket.onerror = () => console.log(`${wsurl}连接发生错误`)
//         websocket.onclose = () => console.log(`${wsurl}链接关闭`)
//         this.websockets.push(websocket)
//         websocket.onmessage = e => {
//           let res = JSON.parse(e.data)
//           res = res.code === 0 ? res.data : res
//           resolve(websocket)
//           callBack(res)
//         }
//       })
//     },
//     closeWebSocket(wsurl) {
//       const index = this.websockets.findIndex(item => item.url === `${this.baseWSurl}${wsurl}`)
//       index !== -1 && this.websockets.splice(index, 1)[0].close()
//     }
//   }
// }
import ReconnectingWebSocket from 'reconnecting-websocket'
export default {
  data() {
    return {
      websockets: []
    }
  },
  computed: {
    baseWSurl() {
      return process.env.VUE_APP_WS_API
    }
  },
  destroyed: function() {
    this.websockets.forEach(soket => soket.close())
  },
  methods: {
    openWebSocket(wsurl, callBack = () => {}, onopen) {
      return new Promise((resolve, reject) => {
        wsurl = wsurl.startsWith('wss:') ? wsurl : `${this.baseWSurl}${wsurl}`
        const websocket = new ReconnectingWebSocket(wsurl)
        websocket.onopen = () => {
          onopen && onopen(websocket)
        }
        websocket.onclose = () => console.log(`${wsurl}链接关闭`)
        this.websockets.push(websocket)
        websocket.onmessage = e => {
          const res = JSON.parse(e.data)
          const data = res.data || res
          if (!res.code || res.code === 200) {
            if (!data.msg) {
              callBack(data)
              resolve(websocket)
            }
          } else reject(res)
        }
      })
    },
    closeWebSocket(wsurl) {
      const index = this.websockets.findIndex(item => item.url === `${this.baseWSurl}${wsurl}`)
      index !== -1 && this.websockets.splice(index, 1)[0].close()
    }
  }
}
