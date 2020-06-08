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
        <div class="row__label">{{ $t('coin') }}</div>
        <div class="row__value">
          <el-select
            v-model="selectCoin"
            style="width: 440px;"
            filterable
            value-key="currency"
            @change="changeCoinType">
            <el-option
              v-for="(item, idx) in allCoins"
              :key="idx"
              :label="item.currency"
              :value="item">
              <b style="display: inline-block;width: 40px">{{ item.currency }}</b>
              <span style="color: #CCC;font-size: 12px;padding-left: 20px;">
                {{ item.full_name }}
              </span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="fund-item-other mb-14 coin-list">
        <span
          v-for="(c, idx) in allCoins"
          :class="['quick-btn mb-10 mr-10', selectCoin.currency === c.currency && 'selected']"
          :key="idx"
          @click="quickSelectCoin(c)">
          {{ c.currency }}
        </span>
      </div>
      <div v-if="selectCoin.currency === 'USDT'" class="fund-item-row mb-24">
        <div class="row__label">
          <el-popover
            :content="depTip"
            placement="bottom-start"
            title=""
            trigger="hover"
            width="240"
            effect="dark">
            <el-button slot="reference" type="text" class="lian">{{ $t('link_name') }}</el-button>
          </el-popover>
        </div>
        <div class="row__value">
          <el-select
            v-model="selectLian"
            style="width: 440px;"
            value-key="chain"
            @change="lianSelect">
            <el-option
              v-for="(item, idx) in lianData"
              :key="idx"
              :label="item.currencyName"
              :value="item"/>
          </el-select>
        </div>
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
      <div class="fund-item-row mb-24" style="height: auto">
        <div class="row__label">{{ $t('fund.deposit.address') }}</div>
        <div class="row__value">
          <div class="deposit-address-textarea">
            <div class="text-info">
              {{ address }}
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
            v-if="showQr"
            ref="qr"
            class="qr-img"/>
        </div>
      </div>
      <!-- address_tag -->
      <div
        v-if="selectCoin.memo_support"
        class="fund-item-row">
        <div class="row__label">{{ $t('address_tag') }}</div>
        <div class="row__value">
          <div class="deposit-address">
            <span class="address-txt">{{ memo }}</span>
            <span
              class="address-copy pointer"
              @click="copyMemo">{{ $t('copy') }}</span>
          </div>
        </div>
        <div class="attention">
          <icon
            v-tooltip.top-center="{html: true,content: robotAttention, classes: 'myfund'} "
            name="robot-info"
            class="icon-eos ml-5 pointer"
          />
        </div>
      </div>
      <div
        v-if="selectCoin.memo_support"
        class="fund-item-other eos-deposit-tips">
        {{ $t('eos_deposit_tip_label') }}
      </div>
      <ul
        class="fund-item-other mt-10 text-des">
        <li> {{ $t('deposit_hint_addr', {coin: selectCoin.currency}) }}</li>
        <li> {{ $t('deposit_hint_confirm',{confirm: selectCoin.min_confirm, coin: selectCoin.currency}) }}</li>
        <li v-if="selectCoin.memo_support">{{ $t('eos_deposit_tip_security_third') }}</li>
        
        <li v-if="selectCoin.currency==='YTA'" >{{ $t('watch_tips_yta') }}</li>
        <li v-else>{{ $t('watch_tips') }}</li>

        <li v-if="!!contract"> 
          {{$t('fund_deposit_tip_contract', {contract})}}
        </li>
        <li v-if="selectCoin.currency==='MPV'">
          <span>{{$t('fund_deposit_mpv_tips1')}}</span>
          <dl>
            <dd v-html="$t('fund_deposit_mpv_tips2')"></dd>
            <dd v-html="$t('fund_deposit_mpv_tips3')"></dd>
            <dd v-html="$t('fund_deposit_mpv_tips4')"></dd>
          </dl>
        </li>
      </ul>
    </div>
    <remember-alert
      :open.sync="openEosAlert"
      :local-key="'eosAlert'"
      :currery-coin="curreryCoin"
      :content="'rate_tips_i'"
      class="remember"
      bg-color="#fff"
    />
  </div>
</template>
<script>
import copyToClipboard from 'copy-to-clipboard'
import utils from '@/modules/utils'
import service from '@/modules/service'
import RememberAlert from '@/components/Trading/RememberAlert'
import Vue from 'vue'
import { state } from '@/modules/store'
const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')

export default {
  name: 'Deposit',
  components: {
    RememberAlert
  },
  data() {
    return {
      address: '',
      memo: '',
      allCoins: [],
      selectCoin: {},
      tableData: [],
      openEosAlert: false,
      lianData: [],
      curreryCoin: '',
      selectLian: {},
      contract: '',
      showQr: false
    }
  },
  computed: {
    robotAttention() {
      return ` <div
            class="attention__tips">
            <p class="title mb-8">${this.$t('about_eos_address_label')}</p>
            <p class="mb-4">${this.$t('about_eos_address_label_a', {currency: this.selectCoin.currency})}</p>
            <p >${this.$t('about_eos_address_label_b', {currency: this.selectCoin.currency})}</p>
          </div>`
    },
    depTip() {
      return state.locale && this.$t('dep_tip')
    }
  },
  async created() {
    this.getDepositHistory()
    await this.getAllCoinTypes()
    await this.getCoinAddress()
    this.setQr(this.address)
  },
  methods: {
    copy() {
      copyToClipboard(this.address)
      utils.success(this.$i18n.t('copyed'))
    },
    copyMemo() {
      copyToClipboard(this.memo || '')
      utils.success(this.$i18n.t('copyed'))
    },
    async getCoinAddress() {
      const param = {
        chain: this.selectCoin.chain,
        currency: this.selectCoin.currency
      }
      this.address = ''
      this.memo = ''
      this.contract = '' 
      return service.getMyCoinAddress(param).then((res) => {
        if (res && res.data) {
          this.address = res.data.address
          this.memo = res.data.memo
          this.contract = res.data.contract
        } else {
          utils.alert(res.message)
        }
      })
    },
    async setQr(url) { 
      const vm = this
      this.showQr = true
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
            vm.showQr = false
            return utils.log('qrcode error')
          }
          this.qrReady = true
        }
      )
    },
    async changeCoinType(coin) {
      this.curreryCoin = ''
      this.showQr = false
      await this.getCoinAddress()
      this.setQr(this.address)
      if (coin.currency === 'EOS' || coin.currency === 'PAN') {
        this.openEosAlert = true
        this.curreryCoin = coin.currency
      }
    },
    async lianSelect(coin) {
      this.selectCoin = coin
      this.showQr = false
      await this.getCoinAddress()
      this.setQr(this.address)
    },
    async getAllCoinTypes() {
      await service.getAllCoinTypes().then(res => {
        if (res && res.data) {
          this.lianData = []
          res.data.forEach((item) => {
            if (item.currency === 'USDT') {
              this.lianData.push(item)
            }
          })
          this.lianData.forEach((item) => {
            if (item.chain === 'OMNI') {
              Vue.set(item, 'currencyName', item.currency + '-' + 'Omni')
            } else {
              Vue.set(item, 'currencyName', item.currency + '-' + 'ERC20')
            }
          })
          this.lianData = this.lianData.reverse()//顺序颠倒一下，omni要放在前面
          this.allCoins = this.removalData(res.data.filter(c => c.depositable))
          this.allCoins.forEach((item) => {
            if (state.locale === 'zh-CN') {
              Vue.set(item, 'full_name', item.zh_name)
            } else {
              Vue.set(item, 'full_name', item.full_name)
            }
          })
          if (this.$route.params.currency) {
            const currency = this.$route.params.currency.toUpperCase()
            this.selectCoin = this.allCoins.find(item => {
              return item.currency.toUpperCase() === currency
            })
            return
          }
          if (this.allCoins[0].currency === 'USDT') {
            this.selectLian = this.lianData.find(a => a.chain === 'ETH')
            this.selectCoin = this.selectLian
            // this.lianData.forEach((item) => {
            //   console.log(item.currencyName)
            //   if (item.currencyName === 'USDT-ERC20') {
            //     this.selectLian = item
            //     this.selectCoin = item
            //   }
            // })
          } else {
            this.selectCoin = this.allCoins[0]
          }
        }
      })
    },
    removalData(arrData) {
      var hash = {}
      arrData = arrData.reduce(function(item, next) {
        // num_iid是你要以什么属性去重
        hash[next.currency] ? '' : hash[next.currency] = true && item.push(next)
        return item
      }, [])
      return arrData
    },
    quickSelectCoin(coin) {
      if (coin.currency === 'USDT') {
        this.selectLian = this.lianData.find(a => a.chain === 'ETH')
        this.selectCoin = this.selectLian
        // this.lianData.forEach((item) => {
        //   if (item.currencyName === 'USDT-ERC20') {
        //     this.selectLian = item
        //     this.selectCoin = item
        //   }
        // })
      } else {
        this.selectCoin = coin
      }
      this.changeCoinType(coin)
    },
    getDepositHistory() {
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
        .text-info{
            flex: 366px 0 0 0;
            width: 366px;
            border-color: transparent;
            background: transparent;
            // min-height: 30px;
            height: auto;
             line-height: 1;
            word-wrap:break-word;
            overflow: hidden;
            position: relative;
            &::after {
                content: '';
                position: absolute;
                height: 100%;
                width: 1px;
                background: #cccccc;
                right: 0;
                top: 0
            }
        }
        span {
            flex: 1;
            text-align: center;
            vertical-align: middle;

            color:#01CED1
        }
    }
.lian {
  font-size: 14px;
  font-weight: bold;
  color: #333333;

  &:hover, &:focus {
    border-color: transparent !important;
    color: #333333 !important;
  }
}
</style>
