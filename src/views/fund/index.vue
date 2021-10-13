<template>
  <div class="page-nfund-container">
    <div class="page-nfund-content">
      <fund-top/>
      <div class="page-nfund-router-box"> 
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script> 

import {state, actions} from '@/modules/store'
import fundTop from './components/fundTop'
// import VNavbc from '@/components/VNavBC' 
export default {
  name: 'myFund',
  components: {
    fundTop,
    // VNavbc,
  }, 
  data () {
    return {

    }
  },
  computed: { 
    // accountList() {
    //   let list = {}
    //   const mylist = state.fund.accountList
    //   const myrates = state.fund.rateList
    //   Object.keys(mylist || {}).map(key => { 
    //     if (key === 'mix' || key === 'unit' || key === 'blend') {
    //       mylist[key] = this.futureBalanceEx(mylist[key])
    //     } 
    //     let totalbtcValue = this.$big(0)
    //     let totalusdValue = this.$big(0)
    //     let fiatValue = this.$big(0)
    //     mylist[key].map(item => { 
    //       let usdValue = myrates[item.currency] ? this.$big(item.available).times(myrates[item.currency]['USD']) : 0
    //       totalusdValue = totalusdValue.plus(usdValue)  
    //       // console.log({key, currency:item.currency, available:item.available, BTC:+btcValue, total: +totalbtcValue}) 
    //     })  
    //     totalbtcValue = totalusdValue.times((myrates.USDT || {}).BTC || 0)
    //     list[key] = {
    //       usdValue: +totalusdValue,
    //       btcValue: +totalbtcValue,
    //       fiatValue: +fiatValue
    //     }  
    //   }) 
    //   return list
    // }, 
  },
  methods: { 
    // futureBalanceEx(data) {
    //   const list = []
    //   data.map(item => { 
    //     let row = list.find(dr => dr.currency === item.currency)
    //     if (!row) { 
    //       list.push(item)
    //     } 
    //   })
    //   return list
    // },
    // async fetchRates() { 
    //   const res = await service.getRates()
    //   if (!res.code) { 
    //     state.fund.rateList = res.data
    //   }
    // },
  }, 
  async created() {
    await actions.fetchRate()
    // await this.fetchAccountAssets() 
    
  }
}
</script>

<style lang="scss">
.page-nfund-container {
  .page-nfund-content {
    .page-nfund-router-box {
      margin: 60px auto;
      width: 1200px;
    }
  }
}
</style>