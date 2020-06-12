// import { getFutureDictionaryList } from '@/api/contract'

const pako = require('pako');
export default {
  data() {
    return {
      websockets: [],
      // tickersData: null
      websocketArgs: ['1', 'BTCUSD']
    }
  },
  created() {
    // getFutureDictionaryList().then(res => {
    //   this.dataDictionary = res.data
    //   this.openWebSocket('market/tickers', this.handleTickers).then(() => this.$emit('baseDataLoaded'))
    // })
  },
  computed: {
    baseWSurl() {
      return process.env.VUE_APP_WS_API
    }
  },
  destroyed() {
    this.websockets.forEach(soket => soket.close())
  },
  methods: {
    openWebSocket(wsurl, callBack = () => {}) {
      return new Promise((resolve, reject) => {
        const websocket = new WebSocket(wsurl)
        websocket.onopen = () => {
          websocket.send(`{"reqType": 2, "args":["${this.websocketArgs[1]}"]}`)
          websocket.send(`{"reqType": 1, "args":${JSON.stringify(this.websocketArgs)}}`) 
        }
        websocket.onerror = () => console.log(`${wsurl}连接发生错误`)
        websocket.onclose = () => console.log(`${wsurl}链接关闭`)
        this.websockets.push(websocket) 
        websocket.onmessage = e => { 
          var reader = new FileReader();
          reader.addEventListener("loadend", function() {
            let binData   = new Uint8Array(reader.result); 
            let restored = ''
            try {
              restored = pako.ungzip( binData, { to: 'string' } ); 
            } catch(err){
              console.log("Error:"+err);
            }
            if (restored) {  
              let res = JSON.parse(restored)  
              res = res.code === 0 ? res.data : res
              resolve(websocket)
              
              // console.log(res)
              callBack(res)
            }
          })
          reader.readAsArrayBuffer(e.data);
        }
      })
    },
    closeWebSocket(wsurl) {
      const index = this.websockets.findIndex(item => item.url === `${this.baseWSurl}${wsurl}`)
      index !== -1 && this.websockets.splice(index, 1)[0].close()
    }
  }
}
