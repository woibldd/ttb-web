import _ from 'lodash' 
import service from '@/modules/service' 
import ws from '@/modules/ws'
import Vue from 'vue'
export default {
  data () {
    return { 
      socketPrice: null,
      loading: false,
      err: "",
    }
  }, 
  methods: { 
    patch (item) {
      // const find = _.find(this.pairList, pair => pair.name === item.pair)
      // if (find) {
      //   find.price = item.current
      //   find.delta = this.$big(item.increment_24h).mul(100).div(this.$big(item.current).minus(item.increment_24h)).round(2, this.C.ROUND_HALF_UP).toFixed(2)
      //   find.vol = item.volume_24h
      //   find.tick = item
      // } 
      // let ct = this.state.ct
      if (item.pair === this.state.ct.pair) {  
        this.state.ct.pairTick = item 
      }

      // if (item.pair.indexOf('INDEX') > -1) {
      //   if (item.pair.indexOf(this.state.ct.symbol) > -1) { 
      //     this.state.ct.indexTick = {
      //       current: item.current
      //     }  
      //   } 
      //   this.state.ct.indexTickList[item.pair.replace('INDEX_','')] =  item.current
      // } else 
      if (item.pair.indexOf('FUTURE') > -1) { 
        this.state.ct.lastPriceList[item.pair.replace('FUTURE_','')] =  item.current
        
        if (!!this.state.ct.pairInfoList[item.pair]) {
          // ct.pairInfoList[item.pair].lastPrice = item.current 
          this.$set(this.state.ct.pairInfoList[item.pair], 'lastPrice', item.current )
        }
      } else if (item.pair.indexOf('MARKET') > -1) {
        if (item.pair.indexOf(this.state.ct.symbol) > -1) {
          this.state.ct.markTick = {
            current: item.current
          }   
        }   
        if (!!this.state.ct.pairInfoList[item.pair.replace('MARKET','FUTURE')]) { 
          this.$set(this.state.ct.pairInfoList[item.pair.replace('MARKET','FUTURE')], 'markTick', item.current )
        }
        // this.state.ct.markTickList[item.pair.replace('MARKET_','')] =  item.current
        // if (!!this.state.ct.pairInfoList[item.pair.replace('MARKET','FUTURE')]) {  
        //   // this.$set(ct.pairInfoList[item.pair.replace('MARKET','FUTURE')], 'markTick', item.current ) 
        //   this.state.ct.holdingList.forEach((skt) => {
        //     if ('MARKET_' + skt.currency === item.pair) {
        //       Vue.set(skt, 'markPrice', item.current)
        //     }
        //   })
        // }
        this.state.ct.holdingList.forEach((skt) => {
          if ('MARKET_' + skt.currency === item.pair) {
            Vue.set(skt, 'markPrice', item.current)
          }
        })
      }
    }, 
    async fetch () { 
      this.loading = true
      let res = await service.getContractSymList()
      this.loading = false
      res = _.cloneDeep(res)
      if (res.code) {
        this.err = res.message
        return false
      }
      res.data.items.forEach((item) => {
        item.tick = null
        this.$set(item, 'price', item.price || false)
        this.$set(item, 'delta', item.delta || false)
        this.$set(item, 'vol', item.vol || false)
      })
      this.state.ct.pairList = res.data.items

      res.data.items.forEach(element => {
        this.state.ct.pairInfoList[element.name] = element
      });
    },
    subMarket () { 
      if (this.socketPrice) {
        this.socketPrice.$destroy()
      }
      this.socketPrice = ws.create('market/tickers')
      this.socketPrice.$on('message', (datas) => {
        datas.forEach(data => {
          this.patch(data)
        })
      })
    }
  },
  destroyed () {
    if (this.socketPrice) {
      this.socketPrice.$destroy()
    }
  },
  async created () { 
    await this.fetch()
    this.subMarket() 
  }
}
