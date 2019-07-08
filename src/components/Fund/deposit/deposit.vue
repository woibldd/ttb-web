<template>
  <div class="deposit-container fund-container">
    <div class="title-box">
      <div> {{ $t('deposit') }}</div>
      <router-link
        to="/fund/my/assets/history/deposit"
        class="fund-history"> {{ $t('capital_record') }}</router-link>
    </div>
    <div class="fund-items-content">
      <div class="fund-item-row mb-24">
        <div class="row__label">{{ $t('currency') }}</div>
        <div class="row__value">
          <el-select
            v-model="selectCoin"
            @change="changeCoinType"
            value-key="currency">
            <el-option
              v-for="(item, idx) in allCoins"
              :key="idx"
              :label="item.currency"
              :value="item"/>
          </el-select>
        </div>
      </div>
      <div class="fund-item-other mb-14">
        <span
          :class="['quick-btn mb-10 mr-10', selectCoin.currency === c.currency && 'selected']"
          @click="quickSelectCoin(c)"
          v-for="(c, idx) in allCoins"
          :key="idx">
          {{ c.currency }}
        </span>
      </div>
      <!-- <div class="fund-item-row mb-24">
        <div class="row__label">{{ $t('deposit_address') }}</div>
        <div class="row__value">
          <div class="deposit-address">
            <span class="address-txt">{{ address }}</span>
            <span
              class="address-copy pointer"
              @click="copy">{{ $t('copy') }}</span>
          </div>
        </div>
      </div> -->
       <div class="fund-item-row mb-24">
        <div class="row__label">{{ $t('deposit_address') }}</div>
        <div class="row__value">
          <div class="deposit-address-textarea">
            <div style="padding:">
                <textarea v-model="address" class="address-textare" disabled />
            </div>
            <span
              class="address-copy pointer"
              @click="copy">{{ $t('copy') }}</span>
          </div>
        </div>
      </div>
      <div class="fund-item-other deposit-least">
        {{ $t('deposit_hint_min', {min: selectCoin.min_deposit_amount}) }}
        {{ selectCoin.currency }}
      </div>
      <div class="fund-item-other deposit-qrcode">
        <div
          class="qrcode">
          <canvas
            class="qr-img"
            ref="qr"/>
        </div>
      </div>
      <!-- address_tag -->
      <div
        class="fund-item-row"
        v-if="selectCoin.memo_support">
        <div class="row__label">{{ $t('address_tag') }}</div>
        <div class="row__value">
          <div class="deposit-address">
            <span class="address-txt">{{ memo }}</span>
            <span
              class="address-copy pointer"
              @click="copyMemo">{{ $t('copy') }}</span>
          </div>
        </div>
      </div>
      <div
        class="fund-item-other eos-deposit-tips"
        v-if="selectCoin.memo_support">
        {{ $t('eos_deposit_tip_label') }}
      </div>
      <ul
        class="fund-item-other mt-10 text-des"
        style="padding-left: 102px">
        <li> {{ $t('deposit_hint_addr', {coin: selectCoin.currency}) }}</li>
        <li> {{ $t('deposit_hint_confirm',{confirm: selectCoin.min_confirm, coin: selectCoin.currency}) }}</li>
        <li v-if="selectCoin.memo_support">{{ $t('eos_deposit_tip_security_third') }}</li>
      </ul>
    </div>
    <remember-alert
      class="remember"
      bg-color="#fff"
      :open.sync="openEosAlert"
      :local-key="'eosAlert'"
      :content="'rate_tips_i'"
    />
  </div>
</template>
<script>
import copyToClipboard from 'copy-to-clipboard'
import utils from '@/modules/utils'
import service from '@/modules/service'
import RememberAlert from '@/components/Trading/RememberAlert'

const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')

export default {
  name: 'Deposit',
  data () {
    return {
      address: '',
      memo: '',
      allCoins: [],
      selectCoin: {},
      tableData: [],
      openEosAlert: false
    }
  },
  async created () {
    this.getDepositHistory()
    await this.getAllCoinTypes()
    await this.getCoinAddress()
    this.setQr(this.address)
  },
  methods: {
    copy () {
      copyToClipboard(this.address)
      utils.success(this.$i18n.t('copyed'))
    },
    copyMemo () {
      copyToClipboard(this.memo || '')
      utils.success(this.$i18n.t('copyed'))
    },
    async getCoinAddress () {
      const param = {
        chain: this.selectCoin.chain,
        currency: this.selectCoin.currency
      }
      this.address = ''
      this.memo = ''
      return service.getMyCoinAddress(param).then((res) => {
        if (res && res.data) {
          this.address = res.data.address
          this.memo = res.data.memo
        }
      })
    },
    async setQr (url) {
      const QRCode = await qrcode()
      QRCode.toCanvas(
        this.$refs.qr,
        url,
        {
          margin: 0,
          width: 136,
          height: 136,
          errorCorrectionLevel: 'H'
        },
        (err) => {
          if (err) {
            // @improve
            return utils.log('qrcode error')
          }
          this.qrReady = true
        }
      )
    },
    async changeCoinType (coin) {
      this.selectCoin = coin
      await this.getCoinAddress()
      this.setQr(this.address)
      if (coin.chain === 'EOS') {
        this.openEosAlert = true
      }
    },
    async getAllCoinTypes () {
      await service.getAllCoinTypes().then(res => {
        if (res && res.data) {
          this.allCoins = res.data.filter(c => c.depositable)
          if (this.$route.params.currency) {
            const currency = this.$route.params.currency.toUpperCase()
            this.selectCoin = this.allCoins.find(item => {
              return item.currency.toUpperCase() === currency
            })
            return
          }
          this.selectCoin = this.allCoins[0]
        }
      })
    },
    quickSelectCoin (coin) {
      this.changeCoinType(coin)
    },
    getDepositHistory () {
      const param = {
        page: 1,
        size: 10
      }
      service.getDepositHistory(param).then(res => {
        this.tableData = []
      })
    }
  },  
  components: {
    RememberAlert
  }
}
</script>
<style lang="scss" scoped>
@import './deposit.scss';
.deposit-address-textarea {
        width: 440px;
        display: flex;
        border: 1px solid #cccccc;
        box-sizing: border-box;
        border-radius: 4px;
        overflow: hidden;
        justify-items: center;
        align-items: center;
        textarea{
            flex: 366px 0 0 0;
            width: 366px;
            border-color: transparent;
            background: transparent;
            // min-height: 30px;
            resize: none;
            height: 0;
            padding: 12px 0
        }
        span {
            flex: 1;
            text-align: center;
            color: #01CED1;
            vertical-align: middle;
            border-left: 1px solid #cccccc;
        }
    }
</style>