<template>
  <v-modal
    :open.sync="open"
    @close="close"
    @click="hideModal">
    <div class="modal-exchange-wrapper pd-27">
      <div class="modal-title ">
        {{ $t('account_exchange') }}
      </div>
      <div class="ex-row__label">
        {{ $t('transfer_to_bibi_account') }}
      </div>
      <div class="ex-row">
        <div class="c-999 mb-13">
          {{ $t('currency') }}
        </div>
        <el-select
          class="ex-row__value"
          v-model="selectCoin"
          value-key="currency">
          <el-option
            v-for="(item, idx) in allCoins"
            :key="idx"
            :disabled="item.currency !== selectCoin"
            :label="item.currency"
            :value="item"/>
        </el-select>
      </div>
      <div class="ex-row">
        <div class="ex-row__label">
          <span>{{ $t('transfer_from') }}</span>
          <span>{{ $t('account_fund_remained', {amount: totalBalance, unit: coinName}) }}</span>
        </div>
        <el-select
          class="ex-row__value"
          v-model="accountFrom"
          @change="changeExchange('from')"
          value-key="name">
          <el-option
            v-for="(item, idx) in accountTypes"
            :key="idx"
            :label="item.name"
            :value="item.key"/>
        </el-select>
      </div>
      <div class="ex-row">
        <div class="ex-row__label">
          <span>{{ $t('transfer_to') }}</span>
          <span>{{ $t('account_can_transfer_amount', {amount: fromAmount, unit: coinName}) }}</span>
        </div>
        <el-select
          class="ex-row__value"
          v-model="accountTo"
          @change="changeExchange('to')"
          value-key="name">
          <el-option
            v-for="(item, idx) in accountTypes"
            :key="idx"
            :label="item.name"
            :value="item.key"/>
        </el-select>
      </div>
      <div class="ex-row">
        <div class="ex-row__label">
          <span>{{ $t('amount') }}</span>
          <span>{{ $t('account_fund_remained', {amount: toAmount, unit: coinName}) }}</span>
        </div>
        <div class="relative">
          <div
            class="all c-primary"
            @click="fillAll">{{ $t('allin') }}</div>
          <el-input
            class="ex-row__value"
            type='number'
            @input="inputText"
            v-model="transferAmount"/>
        </div>
      </div>
      <div class="flex-end">
        <div
          class="pointer"
          @click="close()">{{ $t('cancel') }}</div>
        <v-btn
          style="width: 104px; margin-left: 70px"
          @click="confirm"
          :label="$t('confirm')"/>
      </div>
    </div>
  </v-modal>
</template>
<script>
import service from '@/modules/service'
import utils from '@/modules/utils'
import {state} from '@/modules/store'

export default {
  data () {
    return {
      open: false,
      allCoins: [],
      selectCoin: 'BTC',
      coinName: 'BTC',
      transferAmount: '',
      accountFrom: 'exchange',
      accountTo: 'contract',
      exchangeBalance: null,
      contractBalance: null,
      accountTypes: [
        {key: 'exchange', name: this.$t('trading_account')},
        {key: 'contract', name: this.$t('contract_account')}

      ]
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
      stateType: Number
    },
    stateType:{},
  },
  watch: {
    showModal (val) {
      this.open = val
      if(state.stateType === 1){
        this.accountFrom = 'exchange'
        this.changeExchange ('from')
      } else {
        this.accountFrom = 'contract'
        this.changeExchange ('from')
      }
    },
    selectCoin: {
      async handler () {
        await this.getBalance()
      },
      immediate: true
    }
  },
  computed: {
    currency () {
      if (this.selectCoin) {
        return this.selectCoin
      } else {
        return 'BTC'
      }
      return
    },
    totalBalance () {
      return this.$big(this.exchangeAvai || 0).plus(this.contractAvai || 0).round(8, this.C.ROUND_DOWN).toString()
    },
    fromAmount () {
      if (this.accountFrom === 'exchange') {
        return this.exchangeAvai
      } else {
        return this.contractAvai
      }
    },
    toAmount () {
      if (this.accountFrom === 'contract') {
        return this.exchangeAvai
      } else {
        return this.contractAvai
      }
    },
    exchangeAvai () {
      if (!this.exchangeBalance) {
        return 0
      } else {
        return (this.exchangeBalance.available*1).toFixed(8)
      }
    },
    contractAvai () {
      if (!this.contractBalance) {
        return 0
      } else {
        return this.$big(this.contractBalance.available_balance || 0).round(8, this.C.ROUND_DOWN).toString()
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:showModal', false)
      this.$emit('close')
    },
    async confirm () {
      this.inputText()
      if (0>= this.transferAmount ) {
        utils.alert('输入数字不合法')
        return
      }
      let type = 1
      if (this.accountTo === "exchange"){
        type = 2
      }
      let res = await service.transferContractFund({
        type: type,
        currency: this.coinName,
        amount: this.transferAmount
      })
      if (!res.code) {
        this.$emit('update:showModal', false)
        this.$emit('close')
        utils.success('划转成功')
        this.getBalance ()
        service.getContractBalanceByPair({
          symbol: 'BTC'
        }).then(res => {
          state.ct.holding = res.data
          console.log(123213123123,'我传入变量中了')
        })
      } else {
        utils.alert(res.message)
      }
    },
    hideModal () {

    },
    inputText (txt) {
      txt = txt || this.transferAmount
      if (isNaN(parseFloat(txt))) {
        this.transferAmount = ''
      }
      const $num = this.$big(txt || '0')
      if ($num.lt(0)) {
        this.transferAmount = '0'
      } else if ($num.gt(this.fromAmount)) {
        this.transferAmount = this.fromAmount
      }
    },
    async getBalance () {
      if (this.selectCoin) {
        // this.currency
        let [exchangeBalance, contractBalance] = await Promise.all([service.getBalanceByPair('BTC'), service.getContractBalanceByPair({
          symbol: 'BTC'
        })])
        if (exchangeBalance && exchangeBalance.length) {
          this.exchangeBalance = exchangeBalance[0]
        }
        if (contractBalance) {
          this.contractBalance = contractBalance.data
        }
      }
    },
    getAllCoinTypes () {
      this.allCoins = [{chain: "BTC",
            currency: "BTC",
            depositable: true,
            full_name: "Bitcoin",
            id: "1",
            memo_support: false,
            min_confirm: 3,
            min_deposit_amount: "0.001",
            min_review_amount: "0",
            min_withdraw_amount: "0.002",
            scan_url: "https://explorer.bitcoin.com/btc/tx/${txid}",
            withdraw_fee: "0.001"
            }
          ]
          this.getBalance()
      // await service.getAllCoinTypes().then(res => {
      //   if (res && res.data) {
      //     this.allCoins = res.data.filter(c => c.depositable)
      //     if (this.currency) {
      //       const currency = this.currency
      //       this.selectCoin = this.allCoins.find(item => {
      //         return item.currency.toUpperCase() === currency
      //       })
      //       return
      //     }
      //     this.selectCoin = this.allCoins[0]
      //   }
      // })
    },
    changeExchange (type) {
      if (type === 'from') {
        this.accountTo = this.accountFrom === 'contract' ? 'exchange' : 'contract'
      } else {
        this.accountFrom = this.accountTo === 'exchange' ? 'contract' : 'exchange'
      }
    },
    fillAll () {
      this.transferAmount = this.fromAmount
    }
  },
  async created () {
    this.getAllCoinTypes()
  }
}
</script>
<style lang="scss" scoped>
//   modal
.modal-exchange-wrapper{
    font-size: 14px;
    width: 480px;
    box-sizing: border-box;
    border-radius: 6px;
    color: #393D4D;

    .modal-title {
        font-size: 16px;
        margin-bottom: 13px;
        color: #393D4D;
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
    .flex-end {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}
</style>
