<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">
      <div>{{ $t('wallets_nav_asset') }} 
        <span class="ml-30">
          <el-select   
            v-model="unit" 
            @change="currencyChange"
            value-key="name">
            <el-option
              v-for="(item, idx) in currencyList"
              :key="idx"
              :label="item.name"
              :value="item"/>
          </el-select> 
        </span>
      </div> 
    </div>
    <div class="tip">
      <h1>{{$t('otc_otutcol_11')}}</h1>
      <p><b>≈ {{ixTotal | fixed(unit.scale || 2)}}</b> {{unit.name}}</p>
    </div>
    <!-- <div class="capital-wrapper clearfix">
      <div class="capital-inner">
        <div class="title">{{$t('wallet_account')}}</div>
         <a style="float:right;margin-top: -55px;margin-right: 5px;" href="https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360029651652">{{$t('wallet_accosaada')}}></a>
        <div class="money">
          <p><b>{{walletTotal | fixed(unit.scale || 2)}}</b> {{unit.name}}</p>
        </div>
        <div class="capital-area clearfix">
          <ul>
            <li>
              <icon name='charging' />  
              <router-link
                class="menu-name"
                to="/fund/deposit"
                tag="a">{{ $t('deposit') }}
              </router-link>
            </li>
            <li>
              <icon name='withdraw' />
              <router-link
                class="menu-name"
                tag="a"
                to="/fund/withdraw">{{ $t('withdraw') }}
              </router-link>
            </li>
          </ul>
          <div class="from">
            <icon name='transfer' />
            <router-link
              class="menu-name"
              tag="a"
              :to="'/fund/transfer'">{{ $t('account_exchange') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="capital-inner">
        <div class="title">{{$t('otc_otutcol_12')}}</div>
        <div class="money">
          <p><b>{{accountTotal | fixed(unit.scale || 2)}}</b> {{unit.name}}</p>
        </div>
        <div class="transaction-area">
          <dl>
            <dd>
              <span>
                <router-link
                  class="sub-menu-item"
                  to="/fund/my/contract/index">{{ $t('otc_account') }}
                </router-link>
              </span>
              <div>
                <b>{{otcTotal | fixed(unit.scale || 2)}}</b>
                {{unit.name}}
              </div>
              <em> 
                <router-link
                  class="sub-menu-item"
                  to="/fund/my/contract/index">
                  <icon name='goto' />
                </router-link>
              </em>
            </dd>
            <dd>
              <span>
                <router-link
                  class="sub-menu-item"
                  to="/fund/my/trading">{{ $t('trading_account') }}
                </router-link>
              </span>
              <div>
                <b>{{tradingTotal | fixed(unit.scale || 2)}}</b>  
                {{unit.name}}
              </div>
              <em> 
                <router-link
                  class="sub-menu-item"
                  to="/fund/my/trading">
                  <icon name='goto' />
                </router-link>
              </em>
            </dd>
            <dd>
              <span>
                <router-link
                  class="sub-menu-item"
                  to="/fund/hyTrade">{{ $t('contract_account') }}
                </router-link>
              </span>
              <div>
                <b>{{contractTotal | fixed(unit.scale || 2)}}</b>
                {{unit.name}}
              </div>
              <em>
                <router-link
                  class="sub-menu-item"
                  to="/fund/hyTrade">
                  <icon name='goto' />
                </router-link>
              </em>
            </dd>
          </dl>
        </div>
      </div>
    </div> -->
    <div class="account-wrapper">
      <div class="capital-account">
        <div
          class="box"
          flex>
          <div flex-box="1">
            <span class="title">{{ $t('wallet_account') }}</span>
            <a
              class="about"
              href="https://ixcustomer.zendesk.com/hc/zh-cn/articles/360029651052">{{ $t('wallet_accosaada') }}></a>
            <div class="valuation">
              <p><b>{{ walletTotal | fixed(unit.scale || 2) }}</b> {{ unit.name }}</p>
            </div>
          </div>
          <div flex-box="1">
            <ul flex="main:right">
              <li>
                <router-link
                  class="menu-name"
                  to="/fund/deposit"
                  tag="a">
                  <p>
                    <icon
                      class="fund-iconfont"
                      name="charging"/>
                  </p>
                  <span>{{ $t('deposit') }}</span>
                </router-link>
              </li>
              <li>
                <router-link
                  class="menu-name"
                  tag="a"
                  to="/fund/withdraw">
                  <p>
                    <icon
                      class="fund-iconfont"
                      name="withdraw"/>
                  </p>
                  <span>{{ $t('withdraw') }}</span>
                </router-link>
              </li>
              <li>
                <router-link
                  class="menu-name"
                  tag="a"
                  :to="'/fund/transfer'">
                  <p>
                    <!-- <img
                      class="transfer"
                      src="~@/assets/images/transfer.png"
                      alt=""> -->
                    <icon
                      class="fund-iconfont"
                      name="transfer"/>
                  </p>
                  <span>{{ $t('account_exchange') }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="trading-account">
        <div class="box">
          <div class="h">
            <div class="title">{{ $t('otc_otutcol_12') }}</div>
            <div class="valuation">
              <p><b>{{ accountTotal | fixed(unit.scale || 2) }}</b> {{ unit.name }}</p>
            </div>
          </div>
          <div class="account-list">
            <ul>
              <li
                v-for="(item, index) in accountMap"
                v-show="item.visible"
                :key="index">
                <div
                  class="row"
                  flex="main:justify">
                  <span><i :style="{color:item.color}">•</i> {{ $t(item.name) }}</span>
                  <span class="account-valuation">
                    <b>{{ item.total(item.dataList) | fixed(unit.scale || 2) }}</b><i class="symbol">{{ unit.name }}</i>
                    <em>
                      <router-link
                        class="sub-menu-item"
                        :to="item.link">
                        <icon name='goto' />
                      </router-link>
                    </em>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {state} from '@/modules/store'
import service from '@/modules/service'
export default {
  data() {
    return { 
      otcTable: [],
      tradingTable: [],
      contractTable: [],
      unitContractTable: [],
      mixContractTable: [],
      walletTable: [],
      rates: null,
      currencyList: [
        {
          name: 'CNY',
          symbol: '￥',
          scale: 2
        },
        {
          name: 'USD',
          symbol: '$',
          scale: 4
        },
        // {
        //   name: 'BTC',
        //   symbol: 'B',
        //   scale: 8
        // },
      ],
      unit: null,
    }
  },
  computed: {
    otcTotal() {
      let sum = this.$big(0)
      this.otcTable.forEach(item => {
        sum = sum.plus(item.estValue)
      })
      return sum.toString()
    },
    tradingTotal() {
      let sum = this.$big(0)
      // console.log({test:this.tradingTable})
      this.tradingTable.forEach(item => {
        sum = sum.plus(item.estValue)
      })
      return sum.toString()
    },
    contractTotal() {
      let sum = this.$big(0)
      this.contractTable.forEach(item => {
        sum = sum.plus(item.estValue)
      })
      return sum.toString()
    },
    walletTotal() { 
      let sum = this.$big(0) 
      this.walletTable.forEach(item => {
        sum = sum.plus(item.estValue)
      })
      return sum.toString()
    },
    accountTotal() { 
      let sum = this.$big(0) 
      sum = sum.plus(this.otcTotal).plus(this.tradingTotal).plus(this.contractTotal)
      return sum.toString()
    },
    ixTotal() {
      let sum = this.$big(0) 
      sum = sum.plus(this.accountTotal).plus(this.walletTotal)
      return sum.toString()
    },
    accountMap () {
      let big = this.$big
      return [
        {
          name: 'otc_account',
          color: '#DC6929',
          visible: true,
          dataList: this.otcTable,
          total: (data) => {
            let sum = big(0)
            data.forEach(item => { sum = sum.plus(item.estValue) })
            return sum.toString() || 0
          },
          link: '/fund/my/OTC'
        },
        {
          name: 'trading_account',
          color: '#8FCCF0',
          visible: true,
          dataList: this.tradingTable,
          total: (data) => {
            let sum = big(0)
            data.forEach(item => { sum = sum.plus(item.estValue) })
            return sum.toString() || 0
          },
          link: '/fund/my/Trading'
        },
        {
          name: 'contract_account',
          color: '#AC6FFF',
          visible: true,
          dataList: this.contractTable,
          total: (data) => {
            let sum = big(0)
            data.forEach(item => { sum = sum.plus(item.estValue) })
            return sum.toString() || 0
          },
          link: '/fund/my/contract'
        },
        {
          name: 'unit_account',
          color: '#6E69DE',
          visible: false,
          dataList: this.unitContractTable,
          total: (data) => {
            let sum = big(0)
            data.forEach(item => { sum = sum.plus(item.estValue) })
            return sum.toString() || 0
          },
          link: '/fund/my/contractUnit'
        },
        {
          name: 'gold_account',
          color: '#3374CA',
          visible: false,
          dataList: this.mixContractTable,
          total: (data) => {
            let sum = big(0)
            data.forEach(item => { sum = sum.plus(item.estValue) })
            return sum.toString() || 0
          },
          link: '/fund/my/contractMix'
        }
      ]
    }
  },
  methods: {
    getAccountBalanceList () { 
      service.getAccountBalanceList().then(res => {
        if(!res.code && !!res.data) {
          this.tradingTable = (res.data || []).map(item => {  
            // item.camount = this.$big(item.locking).plus(item.available).round(8, this.C.ROUND_DOWN).toString()
            // item.estValue = this.getEstValue(item)  
            item.locking = this.$big(item.locking || 0).plus(this.$big(item.ordering || 0).plus(this.$big(item.withdrawing || 0))).toString()
            item.camount = this.$big(item.locking).plus(this.$big(item.available)).round(8, this.C.ROUND_DOWN).toString()
            item.estValue = this.getEstValue(item)
            item.available = this.$big(item.available).round(8, this.C.ROUND_DOWN).toString()
            return item
          })
        }
      })
    },
    getContractBalanceList () {
       service.getContractBalanceList().then(res => {
        if (!res.code && !!res.data) {
            this.contractTable = (res.data || []).map(item => { 
            item.currency = item.currency.replace("USD","")
            item.camount = item.available
            item.estValue = this.getEstValue(item) 
            console.log({item})
            return item
          })
        }
      })
    },
    getOtcBalanceList () { 
      service.getOtcBalance().then(res => {
        if (!res.code && !!res.data) {
          this.otcTable = (res.data || []).map(item => {   
            item.camount = this.$big(item.ordering).plus(this.$big(item.available)).toString()
            item.estValue = this.getEstValue(item) 
            return item 
          })  
        }
      })
    },
    getAccountWalletList() {
      service.getAccountWalletList().then(res => {
        if(!res.code && !!res.data) {
          console.log({data:res.data})
          this.walletTable = (res.data || []).map(item => {  
            item.camount = this.$big(item.available).plus(item.withdrawing).plus(item.locking)
            item.estValue = this.getEstValue(item)
            return item
          }) 
        }
      })
    },
    flushBalance() {
      this.getAccountBalanceList()
      this.getContractBalanceList()
      this.getOtcBalanceList()  
      this.getAccountWalletList()
    },
    getEstValue (item) {
      let res = this.$big(0)
      let unit = this.unit.name
      let {currency,camount} = item 
      if (unit === 'BTC'){
        if(currency === 'BTC') {
          res = this.$big(camount) 
        }
        else { 
          if (this.$big(camount).gt(0) && !!this.rates[currency]) { 
            res = this.$big(camount).times(this.rates[currency]['USD'] || 0).div(this.rates['BTC']['USD'])
          }
        }
      }
      else if (item.rates) {
        res = this.$big(camount).times(this.$big(item.rates[unit] || 0))
      }
      else {
        if (this.rates[currency]) {
          res = this.$big(camount).times(this.$big(this.rates[currency][unit] || 0))
        }
      }
      //let num = 8 
      //return res.round(num, this.C.ROUND_DOWN).toString()
      return res
    },
    getContractEstValue (item) {
      // console.log('asjdlfkjaskldfjasldjflasdjfl;ajsdfljkasdlfk')
      let coin = item.currency.replace("USD","")
      let rate = this.rates[coin]
      if (!!rate) { 
        let res = this.$big(item.available).times(this.$big(rate[this.unit.name] || 0))
        let num = 8 
        return res.round(num, this.C.ROUND_DOWN).toString()
      } 
      return '0';
    },
    async getAllRate() {
      let res = await service.getAllRate() 
      if (!res.code && !!res.data) {
        this.rates = res.data;
      }
    },
    currencyChange() {
      this.flushBalance()
    }
  },
  async created() { 
    if (state.locale === "zh-CN"){
      this.unit = this.currencyList[0]
    } else {
      this.unit = this.currencyList[1]
    } 
    await this.getAllRate()
    this.flushBalance()
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.tip{
  h1 {
    font-size:16px;
    font-weight:400;
    color:rgba(160,160,160,1);
    padding: 22px 0;
  }
  p {
    color:rgba(160,160,160,1);
    font-size: 28px;
    padding-bottom: 40px;
    b {
      font-size: 28px;
      color: #333333;
      vertical-align: middle;
    }
  }
}
.capital-wrapper {
  /*margin-top: 40px;*/
  .capital-inner {
    width: 420px;
    height: 350px;
    box-sizing: border-box;
    border: 1px solid $primary;
    position: relative;
    float: left;
    &::after {
      content: '';
      width: 100%;
      height: 10px;
      background: $primary;
      /*width: 100^;*/
      position: absolute;
      left: 0;
      top: 0;
    }
    &:first-child {
      margin-right: 78px;
    }
    .title {
      padding: 22px 17px;
      font-size:24px;
      font-weight:400;
      color:$primary;
    }
    .money {
      font-size: 20px;
      padding-left: 17px;
      vertical-align: middle;
      color:rgba(160,160,160,1);
      b {
        font-size: 24px;
        color: #333333;
        /*vertical-align: middle;*/
      }
    }
    .capital-area {
      ul {
        display: flex;
        padding: 50px 17px;
        overflow: hidden;
        li {
          flex: 1;
          font-size:16px;
          font-weight:400;
          color:$primary;
        }
      }
      .from {
        font-weight:400;
        color:$primary;
        font-size: 18px;
        padding: 0 17px;
      }
    }
    .transaction-area {
      padding: 50px 17px;
      dd {
        color: #A0A0A0;
        padding-bottom: 20px;
        display: flex;
        font-size: 16px;
        &:nth-child(2) {
          span {
            &::after {
              background:rgba(62,119,230,1);
            }
          }
        }
        &:nth-child(3) {
          span {
            &::after {
              background:rgba(110,105,222,1);
            }
          }
        }
        span {
          flex: 110px 0 0 0;
          display: block;
          width: 170px;
          padding-left: 10px;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            background: #7CC5A0;
            left: 0;
            top: 50%;
            margin-top: -4px;
            text-indent: 4px;
          }
        }
        div {
          width: 200px;
        }
        em {
          display: block;
          flex: 0 0 0 40px;
          width: 100px;
          text-align: right;
        }
        b {
          flex: 1;
          color: #333
        }
      }
    }
  }
}
.account-wrapper {
  font-size: 18px;
  .box {
    border-width: 8px;
    border-right-width: 0;
    border-style: solid;
    border-top-color: white;
    border-left-color: $primary;
    border-bottom-color: white;
    border-right-color: white;
    line-height: 35px;
    .title {
      font-size: 18px;
      color: #A0A0A0;
    }
    .about {
      padding: 3px 8px;
      margin-left: 10px;
      color: #A0A0A0;
      border: 1px solid #a0a0a0;
      border-radius: 4px;
      font-size: 16px;
      &:hover {
        color: $primary;
      }
    }
    p {
      color: #A0A0A0;
      b {
        font-size: 26px;
        color: #333333;
      }
    }

  }
  .capital-account {
    padding: 10px 0;
    margin: 22px 0;
    border-radius: 10px;
    box-shadow: 0 0 50px 0 rgba(0,0,0,.2);
    .box {
      padding: 0 20px;
    }
    ul {
      li {
        margin: 0 30px;
        text-align: center;
        color: #333333;
        p {
          line-height: 32px;
          img {
            height: 32px;
            &.transfer {
              margin: 3px 0;
              height: 26px;
            }
          }
        }
        a {
          color: #333333;
        }
      }
    }
  }
  .trading-account {
    padding: 10px 0;
    margin: 22px 0;
    border-radius: 10px;
    box-shadow: 0 0 50px 0 rgba(0,0,0,.2);
    .h {
      margin: 10px 0 10px 20px;
    }
    .valuation {
      border-bottom: 1px solid #ccc;
    }
    .account-list {
      line-height: 80px;
      ul {
        li {
          padding: 0 20px;
          .account-valuation {
            font-size: 22px;
            .symbol {
              margin-left: 5px;
              color:#A0A0A0;
              font-size: 18px;
            }
          }
        }
        li:nth-child(even) {
          background-color: #F9F9F9;
        }
      }
    }
  }
  .fund-iconfont {
    color: $primary !important;
    font-size: 30px;
  }
}


</style>
