<template>
  <div class="deposit-container fund-container">
    <div class="title-box">
      <div> {{ $t('deposit') }}</div>
      <router-link
        to="/fund/my/history/deposit"
        class="fund-history"> {{ $t('资金记录') }}</router-link>
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
      <div class="fund-item-row mb-24">
        <div class="row__label">{{ $t('deposit_address') }}</div>
        <div class="row__value">
          <div class="deposit-address">
            <span class="address-txt">{{ address }}</span>
            <span
              class="address-copy"
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
      <ul
        class="fund-item-other mt-10 text-des"
        style="padding-left: 102px">
        <li> {{ $t('deposit_hint_addr', {coin: selectCoin.currency}) }}</li>
        <li>  {{ $t('deposit_hint_confirm',{confirm: selectCoin.min_confirm, coin: selectCoin.currency}) }}</li>
        <li>  {{ $t('默认充值至我的钱包，若想进行币币交易，可在币币账户操作“资金划转”将资金转至币币账户。') }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import './deposit.scss'
import copyToClipboard from 'copy-to-clipboard'
import utils from '@/modules/utils'
import service from '@/modules/service'

const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')

export default {
  name: 'Deposit',
  data () {
    return {
      address: '',
      allCoins: [],
      selectCoin: {},
      tableData: []
    }
  },
  async created () {
    console.log(this.$route.params, 'allcointype')

    this.getDepositHistory()
    await this.getAllCoinTypes()
    await this.getCoinAddress()
    this.setQr(this.address)// TODO 这个咋整
  },
  methods: {
    copy () {
      copyToClipboard(this.address)
      utils.success(this.$i18n.t('copyed'))
    },
    async getCoinAddress () {
      const param = {
        chain: this.selectCoin.chain,
        currency: this.selectCoin.currency
      }
      return service.getMyCoinAddress(param).then((res) => {
        if (res && res.data) {
          this.address = res.data.address
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
    },
    async getAllCoinTypes () {
      await service.getAllCoinTypes().then(res => {
        if (res && res.data) {
          this.allCoins = res.data
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
    getDepositHistory () {
      const param = {
        page: 1,
        size: 10
      }
      service.getDepositHistory(param).then(res => {
        this.tableData = []
      })
    }
  }
}
</script>
