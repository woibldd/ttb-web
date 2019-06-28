<template>
  <v-modal :open.sync="showModal" @close="close" @click="hideModal">
    <div class="modal-exchange-wrapper pd-27">
      <div class="modal-title">{{ $t('account_exchange') }}</div>
      <div class="ex-row__label">{{ $t('transfer_to_bibi_account') }}</div>
      <div class="ex-row">
        <div class="c-999 mb-13">{{ $t('currency') }}</div>
        <el-select class="ex-row__value" 
          v-model="selectCoin" 
          value-key="currency"
          @change="changeCoin">
          <el-option
            v-for="(item, idx) in allCoins"
            :key="idx"
            :label="item.currency"
            :value="item.currency"
          />
        </el-select>
      </div>
      <div class="ex-row">
        <div class="ex-row__label">
          <span>{{ $t('transfer_from') }}</span>
          <span>{{ $t('account_fund_remained', {amount: totalBalance, unit: selectCoin}) }}</span>
        </div>
        <el-select
          class="ex-row__value"
          v-model="accountFrom"
          @change="transferType(1)"
          value-key="name"
        >
          <el-option
            v-for="(item, idx) in accountTypes"
            :key="idx"
            :label="$t(item.label)"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="ex-row">
        <div class="ex-row__label">
          <span>{{ $t('transfer_to') }}</span>
          <span>{{ $t('account_can_transfer_amount', {amount: fromAmount, unit: selectCoin}) }}</span>
        </div>
        <el-select
          class="ex-row__value"
          v-model="accountTo"
          @change="transferType(2)"
          value-key="name"
        >
          <el-option
            v-for="(item, idx) in accountTypes2"
            :key="idx"
            :label="$t(item.label)"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="ex-row">
        <div class="ex-row__label">
          <span>{{ $t('amount') }}</span>
          <span>{{ $t('account_fund_remained', {amount: toAmount, unit: selectCoin}) }}</span>
        </div>
        <div class="relative">
          <div class="all c-primary" @click="fillAll">{{ $t('allin') }}</div>
          <!-- <el-input
            class="ex-row__value"
            type="number"
            @input="inputText"
            v-model="transferAmount"
          /> -->
           <number-input 
           
              class="number-input ex-row__value"
              v-model="transferAmount" 
              @input="inputText"
              :scale="8"
              :placeholder="$t('transfer_enter_amount')"
            />
        </div>
      </div>
      <div class="flex-end">
        <div class="pointer" @click="close()">{{ $t('cancel') }}</div>
        <v-btn style="width: 104px; margin-left: 70px" @click="confirm" :label="$t('confirm')"/>
      </div>
    </div>
  </v-modal>
</template>
<script>
import service from "@/modules/service";
import utils from "@/modules/utils";
import { state } from "@/modules/store";
import Big from "big.js";

export default {
  data() {
    return {
      open: false,
      allCoins: [],
      selectCoin: "BTC", 
      transferAmount: "",
      accountFrom: 1,
      accountTo: 2,
      tradingBalance: null,
      contractBalance: null, 
      otcBalance: null,
      walletBalance: null,
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
    };
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
      stateType: Number
    },
    stateType: {}
  },
  watch: {
    // showModal(val) {
    //   this.open = val;
    //   if (state.stateType === 1) {
    //     this.accountFrom = "exchange";
    //     this.changeExchange("from");
    //   } else {
    //     this.accountFrom = "contract";
    //     this.changeExchange("from");
    //   }
    // }, 
  },
  computed: {
     
    totalBalance() {
      return this.$big(this.tradingAvai || 0)
        .plus(this.contractAvai || 0)
        .plus(this.otcAvai || 0)
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
          amount =  this.walletAvai
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
    getAvai(type) {
      
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
    close() {
      this.$emit("update:showModal", false);
      this.$emit("close");
    },
    async confirm() {
      this.inputText();
      if (0 >= this.transferAmount) {
        utils.alert("输入数字不合法");
        return;
      }
      
      let res = await service.transferContractFund({ 
        type: 1, 
        currency: this.selectCoin,
        from: this.accountFrom,
        to: this.accountTo,
        amount: this.transferAmount
      });
      if (!res.code) {
        this.transferAmount = ''
        this.$emit("update:showModal", false);
        this.$emit("close");
        utils.success("划转成功");
        this.getBalance();
        service
          .getContractBalanceByPair({
            symbol: "BTC"
          })
          .then(res => {
            state.ct.holding = res.data;
           
          });
      } else {
        utils.alert(res.message);
      }
    },
    hideModal() {},
    inputText(txt) {
      txt = txt || this.transferAmount;
      if (isNaN(parseFloat(txt))) {
        this.transferAmount = "";
      }
      const $num = this.$big(txt || "0");
      if ($num.lt(0)) {
        this.transferAmount = "0";
      } else if ($num.gt(this.fromAmount)) {
        this.transferAmount = this.fromAmount;
      }
    },
    async getBalance() {
      if (this.selectCoin) {
        // this.currency
        let [tradingBalance, contractBalance, otcBalance, walletBalance] = await Promise.all([
          service.getBalanceByPair(this.selectCoin),
          service.getContractBalanceByPair({ symbol:this.selectCoin}),
          service.getOtcBalanceByPair({symbol: this.selectCoin}),
          service.getwalletBalanceByPair({symbol: this.selectCoin})
        ]);
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
      }
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
      service.getAccountBalanceList().then(res => {
        if(!res.code && !!res.data) {
          console.log({data:res.data})
          this.allCoins = (res.data || []).map(item => item)
        }
      })
      this.getBalance(); 
    },
    transferType(type) {
      this.transferAmount = ""  
      //this.availableBalance = 0
      if (type === 1) {
        this.accountTypes2 = []
        this.accountTo = ''
        this.accountTypes.forEach((item) => {
          if(item.value !== this.accountFrom) {
            this.accountTypes2.push(item)
          }
        }) 
      }  
      //this.updateAvailable()
    },
    fillAll() {
      this.transferAmount = this.fromAmount;
    },
    changeCoin(val) { 
      this.accountTypes = []
      console.log(val)
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
      this.value = 2 //from默認切換到币币账户
      this.transferType(1) //重新加载to账户信息
    },
  },
  async created() {
    this.getAllCoinTypes();
    Big.RM = 0;
    this.accountTypes2 = [];
    // this.accountTo = 2;
    this.accountTypes.forEach(item => {
      if (item.value !== this.accountFrom) {
        this.accountTypes2.push(item);
      }
    });
  }
};
</script>
<style lang="scss" scoped>
//   modal
.modal-exchange-wrapper {
  font-size: 14px;
  width: 480px;
  box-sizing: border-box;
  border-radius: 6px;
  color: #393d4d;

  .modal-title {
    font-size: 16px;
    margin-bottom: 13px;
    color: #393d4d;
    font-weight: bold;
  }
  .ex-row {
    margin-bottom: 24px;
    .relative {
      position: relative;
      .all {
        position: absolute;
        right: 11px;
        top: 8px;
        bottom: 11px;
        z-index: 11;
        cursor: pointer;
      }
    }
  }
  .ex-row__label {
    color: #999;
    margin-bottom: 13px;
    display: flex;
    justify-content: space-between;
  }
  .ex-row__value {
    width: 100%;
  } 
  .number-input {  
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-indent: 10px;
  }
  .flex-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
