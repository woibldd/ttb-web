<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">

      <div>{{ $t('account_exchange') }}</div>
      <div class="title__right"></div>
    </div>
    <div class="fund-items-content" style="margin-left:0">
      <div class="fund-item-row mb-14">
        <div class="row__label">{{$t('currency')}}</div>
        <div>
          <el-select v-model="selectCoin"
          :placeholder="$t('please_choose')"
          class="max-input"
          @change="changeCoin"
          >
            <el-option
              v-for="(item, idx) in allCoins"
              :key="idx"
              :label="item.currency"
              :value="item.currency">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="fund-item-row mb-14">
        <div class="row__label">{{ $t('transfer_side')}}</div>
            <el-select v-model="accountFrom" :placeholder="$t('please_choose')" class="min-input" @change="transferType(1)">
              <el-option
                v-for="item in accountTypes"
                :key="item.value"
                :label="$t(item.label)"
                :value="item.value">
              </el-option>
            </el-select>
            <span style="padding:0 10px ">{{$t('transfer_to_a')}}</span>
            <el-select v-model="accountTo" :placeholder="$t('please_choose')" class="min-input" @change="transferType(2)">
              <el-option
                v-for="item in accountTypes2"
                :key="item.value"
                :label="$t(item.label)"
                :value="item.value">
              </el-option>
            </el-select>
      </div>
      <div class="fund-item-row mb-14">
        <div class="row__label">{{$t('transfer_amount')}}</div>
        <div>
          <number-input
              class="number-input"
              v-model="number"
              :scale="8"
              :placeholder="$t('transfer_enter_amount')"
            />
        </div>
      </div>
      <div class="fund-item-row mb-14">
        <div class="row__label"></div>
        <div>
           {{$t('transfer_able_amount')}}{{fromAmount | fixed(8) }} <button @click="all" class="all">{{$t('transfer_all')}}</button>
        </div>
      </div>
      <div class="fund-item-row mb-14">
        <div class="row__label"></div>
        <div>
          <v-btn
            style="width: 200px"
            class="max-input"
            @click="submit"
            :label="$t('confirm')"/>
          <!-- <el-input v-model="number" placeholder="请输入内容" class="max-input"></el-input> -->
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('transfer_btc_history')" name="first"></el-tab-pane>
      <!-- <el-tab-pane label="全部划转记录" name="second"></el-tab-pane> -->
        <el-table
         :data="tableData"  :empty-text="$t('no_data')"
         style="width: 100%">
         <el-table-column
         prop="currency"
         :label="$t('transfer_currency')"/>
         <el-table-column
         prop="from_balance"
         :label="$t('transfer_from_a')"/>
         <el-table-column
         prop="to_balance"
         :label="$t('transfer_to_a')"/>
         <el-table-column
         prop="amount"
         :label="$t('transfer_amount')"/>
         <el-table-column
           prop="available"
           :label="$t('balance')" />
         <el-table-column
           prop="create_time"
           width="240"
           :label="$t('transfer_time')"/>
         <el-table-column
           prop="status"
           :label="$t('status')"/>
       </el-table>
    </el-tabs>
    <div class="history__footer pt-10">
      <ix-pagination
      style="float:right"
        :page.sync="pages"
        :is-end="isLastPage"
        :func="getPage"/>

    </div>
  </div>
</template>
<script>
import { tabs } from 'element-ui';
import service from '@/modules/service'
import utils from '@/modules/utils'
import { state, actions, local } from "@/modules/store";
import Big from 'big.js'
import ixPagination from '@/components/common/ix-pagination'


export default {
  name: 'MyAddress',
  components: {ixPagination},
  props:[],
  data () {
    return  {
      number: '',
      selectCoin:'BTC',
      activeName: 'second',
      pages:1,
      text: 'mmm',
      isLastPage:false,
      allCoins : [],
      accountTo: '',
      accountFrom: 1,
      availableBalance:0,
      tradingBalance: null,
      contractBalance: null,
      walletBalance: null,
      otcBalance: null,
      tableData: [],
      accountTypes: [{
        value: 1,
        label: 'wallet_account'
      },{
        value: 2,
        label: 'trading_account'
      },{
        value: 3,
        label: 'contract_account'
      }, {
        value: 4,
        label: 'otc_account'
      }],
      accountTypes2: []
    }
  },
  async created () {
  },
  computed: {
    totalBalance() {
      return this.$big(this.tradingAvai || 0)
        .plus(this.contractAvai || 0)
        .plus(this.otcAvai || 0)
        .plus(this.walletAvai || 0)
        .toFixed(8)
        .toString();
    },
    fromAmount() {
      let amount = 0
      switch (this.accountFrom) {
        case 1:
          amount = this.walletAvai
          break
        case 2:
          amount = this.tradingAvai
          break
        case 3:
          amount = this.contractAvai
          break
        case 4:
          amount = this.otcAvai
          break
        default:
          amount = 0
      }
      console.log(amount)
      return amount
    },
    toAmount() {
      let amount = 0
      switch (this.accountTo) {
        case 1:
          amount = this.walletAvai
          break
        case 2:
          amount = this.tradingAvai
          break
        case 3:
          amount = this.contractAvai
          break
        case 4:
          amount = this.otcAvai
          break
        default:
          amount = 0
      }
      return amount
    },
    tradingAvai() {
      if (!this.tradingBalance) {
        return 0;
      } else {
        return new Big(this.tradingBalance.available || 0).toFixed(8);
      }
    },
    contractAvai() {
      if (!this.contractBalance) {
        return 0;
      } else {
        return new Big(this.contractBalance.available_balance || 0).toFixed(8);
      }
    },
    otcAvai() {
      if (!this.otcBalance) {
        return 0;
      } else {
        return new Big(this.otcBalance.available || 0).toFixed(8);
      }
    },
    walletAvai() {
      if (!this.walletBalance) {
        return 0;
      } else {
        return new Big(this.walletBalance.available || 0).toFixed(8);
      }
    }

  },
  methods: {
    transferType(type){
      this.number = ""
      let arr = {}
      // this.availableBalance = 0
      if (type === 1) {
        this.accountTypes2 = []
        this.accountTo = ''
        this.accountTypes.forEach((item) => {
          if(item.value !== this.accountFrom) {
            this.accountTypes2.push(item)
          }
        })
        this.accountTo = this.accountTypes2[0].value
      }
      //this.updateAvailable()
    },
    all(){
      Big.RM = 0
      this.number = new Big(this.fromAmount).toFixed(8)
    },
    async submit(){
      if (0 >= this.number || this.number === '') {
        utils.alert(this.$t('transfer_enter_error'))
        return
      }
      if (this.$big(this.number).gt(this.fromAmount)) {
        utils.alert(this.$t('amount_over'))
        return
      }
      let $this = this
      let res = await service.transferContractFund({
        amount: this.number,
        currency: this.selectCoin,
        from: this.accountFrom,
        to: this.accountTo,
        type: 1
      })
      if (!res.code) {
        utils.success(this.$t('transfer_success'))
        this.getBalance()
        this.page()
        this.number = ''
        service.getContractBalanceByPair({
          symbol: this.selectCoin
        }).then(res => {
          state.ct.holding = res.data
        })
      } else {
        utils.alert(res.message)
      }
    },
    handleClick(tab, event) {

    },
    async getBalance(){
      let [tradingBalance, contractBalance, otcBalance, walletBalance] = await Promise.all([
        service.getBalanceByPair(this.selectCoin),
        service.getContractBalanceByPair({ symbol:this.selectCoin}),
        service.getOtcBalanceByPair({symbol: this.selectCoin}),
        service.getwalletBalanceByPair({symbol: this.selectCoin})
      ]);

      //console.log({tradingBalance, contractBalance, otcBalance})
      if (tradingBalance && tradingBalance.length) {
        this.tradingBalance = tradingBalance[0]
      }
      if (contractBalance) {
        this.contractBalance = contractBalance.data
      }
      if (otcBalance) {
        this.otcBalance = otcBalance.data
      }
      if (walletBalance) {
        this.walletBalance = walletBalance.data
      }
      //this.updateAvailable()
    },
    getPage(){
      this.page(this.pages)
    },
    page(page = 1){
      service.getBalanceList({page:page,size:10}).then(res => {

        if (res.code || res.data.length === 0) {
          this.loading = false
        } else {

          this.tableData = res.data.data
          this.loading = false
          if(this.tableData.length < 10){
            this.isLastPage = true
          } else {
            this.isLastPage = false
          }
          for (let i in this.tableData){
            let text = ''
            let text1 = ''
            //let opetate = this.tableData[i].balance

            let balanceList = {
              1 :  this.$t("wallet_account"),
              2 : this.$t("trading_account"),
              3 : this.$t("contract_account"),
              4 : this.$t("otc_account"),
            }

            this.tableData[i].from_balance = balanceList[this.tableData[i].from_balance]
            this.tableData[i].to_balance = balanceList[this.tableData[i].to_balance]

            switch  (this.tableData[i].status ) {
            case 0:
              text1=this.$t("transfer_fail"); //失败
              break;
            case 1:
              text1=this.$t("transfer_complete"); //完成
              break;
            }

            this.tableData[i].available = (this.tableData[i].available*1).toFixed(8)
            this.tableData[i].status = text1
          }
        }
      })
    },
    changeCoin(val) {
      this.accountTypes = []
      if (val === 'USDT') {
        this.accountTypes = [{
            value: 1,
            label: 'wallet_account'
          },{
            value: 2,
            label: 'trading_account'
          }, {
            value: 4,
            label: 'otc_account'
          }]
      }
      else if(val === 'BTC') {
         this.accountTypes = [{
            value: 1,
            label: 'wallet_account'
          },{
            value: 2,
            label: 'trading_account'
          },{
            value: 3,
            label: 'contract_account'
          }, {
            value: 4,
            label: 'otc_account'
          }]
      }
      else {
        this.accountTypes = [{
          value: 1,
          label: 'wallet_account'
        },{
          value: 2,
          label: 'trading_account'
        }]
      }
      //改变币种的时候重新获取数据
      //this.transferType(1)
      this.getBalance()
      this.value = 2
      this.transferType(1)
    },
    updateAvailable() {
      // console.log({value : this.accountFrom})
      // if (this.accountFrom === 1) { //钱包账户
      //   this.availableBalance = this.$big(this.walletBalance.available || 0)
      // }
      // else if (this.accountFrom === 2) {  //币币账户
      //   this.availableBalance = this.$big(this.tradingBalance.available || 0)
      // }
      // else if (this.accountFrom === 3) {  //合约账户
      // console.log({contractBalance:this.contractBalance})
      //   this.availableBalance = this.$big(this.contractBalance.available_balance || 0)
      // }
      // else if (this.accountFrom === 4) {  //OTC账户
      //   this.availableBalance = this.$big(this.otcBalance.available || 0)
      // }
    },
    getAllCoinTypes() {
      // this.allCoins = [
      //   {
      //     chain: "BTC",
      //     currency: "BTC",
      //     depositable: true,
      //     full_name: "Bitcoin",
      //     id: "1",
      //     memo_support: false,
      //     min_confirm: 3,
      //     min_deposit_amount: "0.001",
      //     min_review_amount: "0",
      //     min_withdraw_amount: "0.002",
      //     scan_url: "https://explorer.bitcoin.com/btc/tx/${txid}",
      //     withdraw_fee: "0.001"
      //   },{
      //     chain: "USDT",
      //     currency: "USDT",
      //     depositable: true,
      //     full_name: "USDT",
      //     id: "2",
      //     memo_support: false,
      //     min_confirm: 3,
      //     min_deposit_amount: "0.001",
      //     min_review_amount: "0",
      //     min_withdraw_amount: "0.002",
      //     withdraw_fee: "0.001"
      //   }
      // ],
      this.getBalance();
    },
    getAccountBalanceList() {
      service.getAccountBalanceList().then(res => {
        if(!res.code && !!res.data) {
          console.log({data:res.data})
          this.allCoins = (res.data || []).map(item => item)
        }
      })
    }
  },
  created(){
    // this.getBalance()
    this.getAccountBalanceList()
    this.getBalance()
    // this.getAllCoinTypes()
    this.page()
    this.accountTo = ''
    this.accountTypes.forEach((item) => {
      if(item.value !== this.accountFrom) {
        this.accountTypes2.push(item)
      }
    })
    this.accountTo = this.accountTypes2[0].value
  }
}
</script>
<style lang="scss" scoped>
.min-input{
  width: 120px;
}
.max-input{
  width: 288px;
}
  .number-input {
    width: 286px;
    line-height: 37px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    text-indent: 15px;
  }
.page-fund-container .fund-items-content .fund-item-row .row__label{
  color:#666;
  font-weight: normal;
}
.all{
  margin-left: 20px;
  background-color: #fff;
  cursor: pointer;
  border:none;
  color:#aa8b61
}
</style>
