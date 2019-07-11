import _ from 'lodash' 
import service from '@/modules/service'
import {state, } from '@/modules/store'
import ws from '@/modules/ws'
import Vue from 'vue'
export default {
  data () {
    return {
      state, 
      socket: null,
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
      console.log('00000000000000000000000000000000000000000000000000000000000000000000000000000000')
      let ct = state.ct
      if (item.pair === state.ct.pair) {  
        state.ct.pairTick = item 
      }

      if (item.pair.indexOf('INDEX') > -1) {
        if (item.pair.indexOf(state.ct.symbol) > -1) { 
          state.ct.indexTick = {
            current: item.current
          }  
        } 
        state.ct.indexTickList[item.pair.replace('INDEX_','')] =  item.current
      } else if (item.pair.indexOf('FUTURE') > -1) { 
        state.ct.lastPriceList[item.pair.replace('FUTURE_','')] =  item.current
        
        if (!!ct.pairInfoList[item.pair]) {
          // ct.pairInfoList[item.pair].lastPrice = item.current 
          this.$set(ct.pairInfoList[item.pair], 'lastPrice', item.current )
        }
      } else if (item.pair.indexOf('MARKET') > -1) {
        if (item.pair.indexOf(state.ct.symbol) > -1) {
          state.ct.markTick = {
            current: item.current
          }   
        }  
        state.ct.markTickList[item.pair.replace('MARKET_','')] =  item.current
        if (!!ct.pairInfoList[item.pair.replace('MARKET','FUTURE')]) {  
          this.$set(ct.pairInfoList[item.pair.replace('MARKET','FUTURE')], 'markTick', item.current ) 
          state.ct.holdingList.forEach((skt) => {
            if ('MARKET_' + skt.currency === item.pair) {
              Vue.set(skt, 'markPrice', item.current)
            }
          })
        }
      }
    }, 
    async fetch () {
      console.log('00000000000000000000000000000000000000000000000000000000000000000000000000000000')
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
      state.ct.pairList = res.data.items

      res.data.items.forEach(element => {
        state.ct.pairInfoList[element.name] = element
      });
    },
    subMarket () {
      console.log('00000000000000000000000000000000000000000000000000000000000000000000000000000000')
      if (this.socket) {
        this.socket.$destroy()
      }
      this.socket = ws.create('market/tickers')
      this.socket.$on('message', (datas) => {
        datas.forEach(data => {
          this.patch(data)
        })
      })
    }
  },
  destroyed () {
    if (this.socket) {
      this.socket.$destroy()
    }
  },
  async created () { 
    await this.fetch()
    this.subMarket() 
  }
}
