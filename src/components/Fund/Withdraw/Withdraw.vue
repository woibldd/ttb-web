<template>
  <div class="withdraw-container fund-container">
    <div class="title-box">
      <div> {{ $t('提币') }}</div>
      <div class="fund-history"> {{ $t('资金记录') }}</div>
    </div>
    <div class="fund-items-content">
      <div class="fund-item-row">
        <div class="row__label">{{ $t('币种') }}</div>
        <div class="row__value">
          <el-select
            v-model="selectCoin"
            @change="changeCoinType"
            value-key="currency"
            placeholder="请选择">
            <el-option
              v-for="item in allCoins"
              :key="item.id"
              :label="item.currency"
              :value="item"/>
          </el-select>
        </div>
      </div>
      <div class="fund-item-other mt-13 mb-23 withdraw-remain">
        <span>{{ $t("可用") }}:  {{ selectCoin.withdraw_fee }}</span>
        <span class="ml-29 mr-29">{{ $t("限额") }}: {{ selectCoin.min_withdraw_amount }}</span>
        <span class="up-limit pointer">{{ $t("提升限额") }}</span>
      </div>
      <div class="fund-item-row">
        <div class="row__label">{{ $t('提币地址') }}</div>
        <div class="row__value">
          <div class="withdraw-address pl-10">
            {{ selectCoinAddress }}
          </div>
        </div>
      </div>
      <div class="fund-item-other withdraw-new-address mt-14 mb-24">
        <span class="add-icon mr-10">+</span>{{ $t("添加新地址") }}
      </div>
      <div class="fund-item-row">
        <div class="row__label">{{ $t('提币数量') }}</div>
        <div class="row__value">
          <div class="withdraw-address pl-10">
            <input
              class="coin-count"
              type="number"
              v-model="withdrawCount">
          </div>
        </div>
      </div>
      <div class="fund-item-other withdraw-least mt-14 mb-22">
        {{ $t("最低提币数量") }} {{ selectCoin.min_withdraw_amount }} {{ selectCoin.currency }}
      </div>
      <div class="fund-item-other withdraw-fee mb-23">
        <p> <span class="fee__label">{{ $t('提现手续费') }} </span> <span class="fee__coin">{{ selectCoin.withdraw_fee }}{{ selectCoin.currency }}</span> </p>
        <p><span class="fee__label">{{ $t('实际到账') }}</span> <span class="fee__coin">这是哪个字段 ？0BTC</span></p>
      </div>
      <div class="fund-item-other">
        <div class="withdraw-btn default">{{ $t('确认提币') }}</div>
      </div>
      <ul
        class="fund-item-other mt-25 text-des"
        style="padding-left: 102px">
        <li>  {{ $t('提现转出时间为 30 分钟内，具体到账时间以区块链网络速度决定；') }}</li>
        <li>  {{ $t('为了确保安全，提现数量超过 0 BTC 时将进行人工审核，请正确填写提现地址。') }}</li>
      </ul>

    </div>
</div></template>
<script>
import './Withdraw.scss'
import copyToClipboard from 'copy-to-clipboard'
import vModal from '@/components/VModal.vue'
import utils from '@/modules/utils'
import service from '@/modules/service'

export default {
  name: 'Withdraw',
  data () {
    return {
      address: '',
      allCoins: [],
      selectCoin: {},
      allCoinAddress: [],
      selectCoinAddress: '',
      withdrawCount: 0
    }
  },
  components: {vModal},
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
          this.selectCoinAddress = res.data.address
        }
      })
    },
    async changeCoinType (coin) {
      console.log(coin)
      this.selectCoin = coin
      await this.getCoinAddress()
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
