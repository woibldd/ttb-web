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
            v-model="selectCoinType"
            placeholder="请选择">
            <el-option
              v-for="item in allCoins"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </div>
      </div>
      <div class="fund-item-other mt-13 mb-23 withdraw-remain">
        <span>{{ $t("可用") }}:  0.001</span>
        <span class="ml-29 mr-29">{{ $t("限额") }}: 0.01000</span>
        <span class="up-limit pointer">{{ $t("提升限额") }}</span>
      </div>
      <div class="fund-item-row">
        <div class="row__label">{{ $t('提币地址') }}</div>
        <div class="row__value">
          <div class="withdraw-address">
            <el-select
              v-model="selectCoinAddress"
              placeholder="请选择">
              <el-option
                v-for="item in allCoinAddress"
                :key="item"
                :label="item"
                :value="item"/>
            </el-select>
          </div>
        </div>
      </div>
      <div class="fund-item-other withdraw-new-address mt-14 mb-24">
        <span class="add-icon mr-10">+</span>{{ $t("添加新地址") }}
      </div>
      <div class="fund-item-row">
        <div class="row__label">{{ $t('提币数量') }}</div>
        <div class="row__value">
          <div class="withdraw-address">
            <el-select
              v-model="selectCoinAddress"
              placeholder="请选择">
              <el-option
                v-for="item in allCoinAddress"
                :key="item"
                :label="item"
                :value="item"/>
            </el-select>
          </div>
        </div>
      </div>
      <div class="fund-item-other withdraw-least mt-14 mb-22">
        {{ $t("最低提币数量0.001BTC") }}
      </div>
      <div class="fund-item-other withdraw-fee mb-23">
        <p> <span class="fee__label">{{ $t('提现手续费') }} </span> <span class="fee__coin">0.001BTC</span> </p>
        <p><span class="fee__label">{{ $t('实际到账') }}</span> <span class="fee__coin">0BTC</span></p>
      </div>
      <div class="fund-item-other">
        <div class="withdraw-btn">{{ $t('确认提币') }}</div>
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
import './withdraw.scss'
import copyToClipboard from 'copy-to-clipboard'
import utils from '@/modules/utils'
const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')

export default {
  name: 'Withdraw',
  data () {
    return {
      address: '31kV4sEEnPMcyMrzWkggmewg3Bmm2Az6nX', // 先写死，之后要用真实值代替哦
      allCoins: ['BTC', 'ETH', 'EOS'],
      selectCoin: 'BTC',
      allCoinAddress: ['31kV4sEEnPMcyMrzWkggmewg3Bmm2Az6nX', '31kV4sEEnPMcyMrzWkggmewg3Bmm2Az6nX', '31kV4sEEnPMcyMrzWkggmewg3Bmm2Az6nX'],
      selectCoinAddress: '31kV4sEEnPMcyMrzWkggmewg3Bmm2Az6nX'
    }
  },
  async created () {
    this.setQr('我的收款地址二维码')// TODO 这个咋整
  },
  methods: {
    copy () {
      copyToClipboard(this.address)
      utils.success(this.$i18n.t('copyed'))
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
    }
  }
}
</script>
