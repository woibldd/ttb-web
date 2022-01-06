<template>
  <div class="fund-top-container" >  
    <div v-if="from==='my'" class="fund-top-content my" flex="main:justify">
      <div class="assets">
        <div class="assets-title" v-html="$t('my_balance_equal')">
          总资产折合
        </div> 
        <div class="assets-value">
          <!-- <span>{{total | fixed(8)}} BTC</span> 
          <span class="valuation">
            {{`≈ ${state.fiatMoneySymbol}`}}
            <fiat-money base="BTC" :value="total" :scale="2" />
          </span> --> 
          <span>{{calcUsdtTransfer(totalUsd, 'BTC') | fixed(8)}} BTC</span>
          <span class="valuation">
            {{`≈ ${state.fiatMoneySymbol}`}} <span>{{calcUsdtTransfer(totalUsd, state.fiatMoney) | fixed(2)}}</span>
          </span>
          <el-dropdown  @command="handleCommand">
            <label class="el-dropdown-link">
              {{state.fiatMoney}} <icon name="arrow-down" /> 
            </label>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="USD">USD</el-dropdown-item>
              <el-dropdown-item command="CNY">CNY</el-dropdown-item> 
            </el-dropdown-menu>
          </el-dropdown> 
        </div>
      </div>
      <div class="option" flex="main:right">
        <router-link to="/nfund/deposit"><div class="btn mr-20 isplain" v-html="$t('deposit')">充币</div></router-link>  
        <router-link to="/nfund/withdraw"><div class="btn mr-20"  v-html="$t('withdraw')">提币</div> </router-link> 
        <router-link to="/nfund/transfer"><div class="btn" v-html="$t('contract_fadsaees')">划转</div></router-link> 
      </div>
    </div>
    <div v-else-if="from==='manager'"  class="fund-top-content manager">
      <div class="title"> 
        <label @click="handleClickReturn"><icon name="arrow-left" /> {{ $t(titleText) }}</label> 
      </div>
    </div>
  </div>
</template>

<script> 
import {state, actions} from '@/modules/store' 
import VNavbc from '@/components/VNavBC' 
import mixin from './my/mixins.js'
import service from '@/modules/service'
export default {
  name: 'fund-top',
  mixins: [mixin],
  components: { 
    VNavbc,
  }, 
  data() { 
    return {
      state,
      accountList: {}
    } 
  }, 
  computed: {  
    total() { 
      let value = this.$big(0)
      Object.keys(this.accountList || {}).map(key => {
        value = value.plus(this.accountList[key].btcValue) 
      })
      return value
    },
    totalUsd() {
      let value = this.$big(0)
      Object.keys(this.accountList || {}).map(key => {
        value = value.plus(this.accountList[key].usdValue) 
      })
      return value
    },
    from() {
      if (this.$route.path.indexOf('my') > -1) {
        return 'my'
      } else {
        return 'manager'
      }
    },
    titleText() {
      const path = this.$route.path
      if (path.indexOf('/nfund/transfer') > -1 ) {
        return 'suvbanean'
      } else if (path.indexOf('/nfund/deposit') > -1 ) {
        return 'deposit'
      } else if (path.indexOf('/nfund/withdraw') > -1 ) {
        return 'withdraw'
      } else if (path.indexOf('/nfund/address') > -1 ) {
        return 'address_manage'
      }
    }

  },
  methods: { 
    futureBalanceEx(data) {
      const list = []
      data.map(item => { 
        let row = list.find(dr => dr.currency === item.currency)
        if (!row) { 
          list.push(item)
        } 
      })
      return list
    },
    async fetchAccountAssets() {
      const res = await service.getAccountAssets()   
      if (!res.code) { 
        // state.fund.accountList = res.data 
        const mylist = res.data 
        const myrates = state.rate 
        this.accountList = {}
        Object.keys(mylist || {}).map(key => { 
          if (key === 'mix' || key === 'unit' || key === 'blend') {
            mylist[key] = this.futureBalanceEx(mylist[key])
          } 
          let totalbtcValue = this.$big(0)
          let totalusdValue = this.$big(0) 
          mylist[key].map(item => { 
            let account = item.available
            if (key==='wallet') {
              account = this.$big(item.available).plus(item.withdrawing)
            } else if (key === 'balance') {
              account = this.$big(item.available).plus(item.ordering)
            }
            let usdValue = myrates[item.currency] ? this.$big(account).times(myrates[item.currency]['USD']) : 0
            totalusdValue = totalusdValue.plus(usdValue)  
            // console.log({key, currency:item.currency, available:item.available, BTC:+btcValue, total: +totalbtcValue}) 
          })  
          totalbtcValue = totalusdValue.times((myrates.USDT || {}).BTC || 0)
          this.accountList[key] = {
            usdValue: +totalusdValue,
            btcValue: +totalbtcValue, 
          }   
        }) 
      } 
    },
    handleCommand(command) {
      actions.setFiat(command)
    },
    handleClickReturn() {
      this.$router.go(-1)
    }
  },
  created() {  
    this.fetchAccountAssets()
  } 
}

</script>

<style lang="scss">
.fund-top-container {
  background-color: $primary;
  color: $primary-back;
  .fund-top-content {
    &.my {
      height: 166px;
    }
    &.manager {
      height: 100px;
      line-height: 100px;  
      .title {
        font-size: 16px;
      }
    }
    width: 1200px;
    margin: 0 auto;
    .assets {
      .assets-title {
        margin-top: 48px;
        color:#fff; 
      }
      .assets-value {
        margin-top: 10px;
        font-size: 32px;
        .valuation {
          font-size: 14px;
          color:#fff; 
        }
        label {
          padding: 3px 5px;
          background-color: #21eef1;
          border-radius: 4px;
          font-size: 14px;
          color:#ffffff; 
        }
      }
    }
    .option {
      padding-top: 70px;
      .btn {
        height: 48px;
        width: 66px;
        line-height: 48px;
        color: $primary-back;
        text-align: center;
        border:1px solid #ffffff;
        border-radius: 4px;
        &.isplain {
          background-color: #ffffff;
          border: none;
          color: #363636;
        }
      }
    }
  }
}
</style>
