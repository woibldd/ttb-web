<template>
  <div class="deposit-container fund-container">
    <div class="title-box">
      <div> {{ $t('充币') }}</div>
      <div class="fund-history"> {{ $t('资金记录') }}</div>
    </div>
    <div class="fund-items-content">
      <div class="fund-item-row mb-24">
        <div class="row__label">{{ $t('币种') }}</div>
        <div class="row__value">
          <el-select
            v-model="selectCoin"
            @change="changeCoinType"
            value-key="currency"
            placeholder="请选择">
            <el-option
              v-for="(item, idx) in allCoins"
              :key="idx"
              :label="item.currency"
              :value="item">
              <template>
                {{ item.currency }}
              </template>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="fund-item-row mb-24">
        <div class="row__label">{{ $t('充币地址') }}</div>
        <div class="row__value">
          <div class="deposit-address">
            <span class="address-txt">{{ address }}</span>
            <span
              class="address-copy"
              @click="copy">复制</span>
          </div>
        </div>
      </div>
      <div class="fund-item-other deposit-least">
        {{ $t("最低充值数为0.001BTC") }}
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
        <li> {{ $t('禁止向LTC地址充值除LTC之外的资产，任何充入LTC地址的非LTC 资产将不可找回。') }}</li>
        <li>  {{ $t('使用LTC地址充值需要1个网络确认才能到账') }}</li>
        <li>  {{ $t('默认充值至我的钱包，若想进行币币交易，可在币币账户操作“资金划转”将资金转至币币账户。') }}</li>
      </ul>

    </div>
</div></template>
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
      selectCoin: {}
    }
  },
  async created () {
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
      console.log(coin)
      this.selectCoin = coin
      await this.getCoinAddress()
      this.setQr(this.address)
    },
    async getAllCoinTypes () {
      await service.getAllCoinTypes().then(res => {
        if (res && res.data) {
          this.allCoins = res.data
          this.selectCoin = this.allCoins[0]
        }
      })
    }
  }
}
</script>
