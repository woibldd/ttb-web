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
            v-model="value"
            placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
      </div>
      <div class="fund-item-row">
        <div class="row__label">{{ $t('充币地址') }}</div>
        <div class="row__value">
          <div class="withdraw-address">
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
      <div class="fund-item-other">
        <div class="qr">
          qr-code
        </div>
      </div>

    </div>
</div></template>
<script>
import './Withdrwa.scss'
import copyToClipboard from 'copy-to-clipboard'
import utils from '@/modules/utils'

export default {
  name: 'Withdraw',
  data () {
    return {
      address: '31kV4sEEnPMcyMrzWkggmewg3Bmm2Az6nX' // 先写死，之后要用真实值代替哦
    }
  },
  methods: {
    copy () {
      copyToClipboard(this.address)
      utils.success(this.$i18n.t('copyed'))
    }
  }
}
</script>
