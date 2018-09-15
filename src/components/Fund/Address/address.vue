<template>
  <div class="address-container">
    <div class="fund-container">
      <div class="title-box">
        <div> {{ $t('deposit') }}</div>
        <div class="fund-history"> {{ $t('资金记录') }}</div>
      </div>
      <div class="fund-items-content">
        <div class="fund-item-row mb-24">
          <div class="row__label">{{ $t('currency') }}</div>
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
                :value="item"/>
            </el-select>
          </div>
        </div>
        <div class="fund-item-row mb-24">
          <div class="row__label">{{ $t('withdraw_addr') }}</div>
          <div class="row__value">
            <input
              v-model="newAddress"
              class="input-address pl-10">
            </input>
          </div>
        </div>
        <div class="fund-item-row mb-24">
          <div class="row__label">{{ $t('note') }}</div>
          <div class="row__value">
            <input
              v-model="remark"
              class="input-address pl-10">
            </input>
          </div>
        </div>
        <div class="fund-item-other">
          <v-btn
            style="width: 200px"
            @click="ensure"
            :label="$t('add_withdraw_addr')"/>
        </div>
      </div>
    </div>
    <div class="address-list">
      <div class="title-box">
        <div> {{ $t('地址列表') }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import './address.scss'
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
      newAddress: '',
      remark: ''
    }
  },
  async created () {
    await this.getAllCoinTypes()
    await this.getCoinAddress()
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
          this.newAddress = res.data.address
        }
      })
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
