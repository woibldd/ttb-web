<template>
  <div class="deposit-container fund-container"> 
    <div class="fund-items-content">
      <div class="fund-item-row">
        <div class="nav-list"
            flex="main:right">
          <router-link
            :to="{name:'new-fund', query: {t:'history', s: 'deposit'}}"
            class="fund-history nav-btn"> {{ $t('capital_record') }}</router-link>
        </div>
      </div>
      <div class="fund-item-row mb-24" flex="main:left">
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
                {{state.locale==='zh-CN'? item.zh_name : item.full_name}}
              </span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="fund-item-other mb-14 coin-list">
        <span
          v-for="(c, idx) in allCoins"
          :class="['quick-btn mb-10', idx%5>0 && 'ml-20', selectCoin.currency === c.currency && 'selected',]"
          :key="idx"
          @click="quickSelectCoin(c)">
          {{ c.currency }}
        </span>
      </div>
      <div v-if="lianDataList[selectCoin.currency]" class="fund-item-row mb-24"  flex="main:left">
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
              v-for="(item, idx) in lianDataList[selectCoin.currency]"
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
      <div class="fund-item-row mb-24" style="height: auto"  flex="main:left">
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
      <div class="fund-item-other deposit-least text-primary">
        {{ $t('deposit_hint_min', {min: selectCoin.min_deposit_amount}) }}
        {{ selectCoin.currency }}
      </div>
      <div class="fund-item-other deposit-qrcode mb-24">
        <div
          class="qrcode">
          <canvas
            ref="qr"
            class="qr-img"/>
        </div>
      </div>
      <!-- address_tag -->
      <div
        v-if="selectCoin.memo_support"
        class="fund-item-row "  flex="main:left">
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
        class="fund-item-other mt-25 text-des">
        <li> {{ $t('deposit_hint_addr', {coin: selectCoin.currency}) }}</li>
        <li> {{ $t('deposit_hint_confirm',{confirm: selectCoin.min_confirm, coin: selectCoin.currency}) }}</li>
        <li v-if="selectCoin.memo_support">{{ $t('eos_deposit_tip_security_third') }}</li>
        <li >  {{ $t('watch_tips') }}</li>
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
    <v-modal :open.sync="showModal" @close="handleCloseModal">
      <div class="modal-container">
        <div class="modal-box">
          <div class="title" flex="dir:top cross:center "> 
            <div class="img" flex="main:center cross:center"> <label class="icon">i</label> </div>
            <div class="text" v-html="$t('deposit_hint_min',{min: selectCoin.min_deposit_amount})+selectCoin.currency"> 最低充值数量为 10 USDT </div>
          </div>
          <div class="info" v-html="$t('deposit_hint_addr', {coin: selectCoin.currency})">
            禁止向 USDT 地址充值除 USDT 之外的资产，任何充入 USDT 地址的非 USDT 资产将不可找回。 
          </div>
          <div class="check">
            <el-checkbox :label="$t('no_alert_again')" v-model="neverShowAgain"></el-checkbox>
          </div>
          <div> 
            <div class="modal-button" @click="handleCloseModal">我已知晓</div>
          </div> 
        </div>
      </div> 
    </v-modal>
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
import RememberAlert from './RememberAlert' 
import { state, local } from '@/modules/store'
const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')

export default {
  name: 'Deposit',
  components: {
    RememberAlert
  },
  data() {
    return {
      state,
      local,
      showModal: false,
      neverShowAgain: false,
      address: '',
      memo: '',
      allCoins: [],
      selectCoin: {},
      tableData: [],
      openEosAlert: false,
      lianData: [],
      curreryCoin: '',
      selectLian: {},
      lianDataList :{},
      contract: ''
    }
  },
  computed: {
    robotAttention() {
      return ` <div
            class="attention__tips">
            <p class="title mb-8">${this.$t('about_eos_address_label')}</p>
            <p class="mb-4">${this.$t('about_eos_address_label_a')}</p>
            <p >${this.$t('about_eos_address_label_b')}</p>
          </div>`
    },
    depTip() {
      return state.locale && this.$t('dep_tip')
    }, 
  },
  async created() {
    this.getDepositHistory()
    await this.getAllCoinTypes()
    await this.getCoinAddress()
    // this.setQr(this.address)
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
      return await service.getMyCoinAddress(param).then((res) => {
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
    async changeCoinType(coin) {
      this.curreryCoin = ''
      if (this.lianDataList[coin.currency]) {
        if (coin.currency === 'USDT') {
          this.selectLian = this.lianDataList[coin.currency].find(a => a.chain==='TRX')
          this.selectCoin = this.selectLian
        } else {
          this.selectLian = this.lianDataList[coin.currency][0]
          this.selectCoin = this.selectLian
        }
      }
      else {
        this.selectCoin = coin
      }
      await this.getCoinAddress()
      // this.setQr(this.address)
      if (coin.currency === 'EOS' || coin.currency === 'PAN') {
        this.openEosAlert = true
        this.curreryCoin = coin.currency
      } 
      this.neverShowAgain = local.depositAlert[this.selectCoin.currency] || false
      this.showModal = !this.neverShowAgain
    },
    async lianSelect(coin) {
      this.selectCoin = coin
      await this.getCoinAddress()
    },
    async getAllCoinTypes() {
      await service.getAllCoinTypes().then(res => {
        if (res && res.data) {
          this.lianData = []
          res.data.forEach((item) => {
            if((item.currency === 'USDT' || item.currency === 'SLD') && item.withdrawable) {
              if (item.chain === 'OMNI') { item.currencyName = item.currency + '-' + 'Omni'}
              if (item.chain === 'ETH') { item.currencyName = item.currency + '-' + 'ERC20'}
              if (item.chain === 'TRX') { item.currencyName = item.currency + '-' + 'TRC20'}
              if (item.chain === 'BSC') { item.currencyName = item.currency + '-' + 'BSC'}
              if (item.chain === 'BNB') { item.currencyName = item.currency + '-' + 'BNB'}
              this.lianData.push(item) 
              if (!this.lianDataList[item.currency])  
                this.lianDataList[item.currency] = [] 
              this.lianDataList[item.currency].push(item) 
            }  
          })
          // this.lianData = this.lianData.reverse()//顺序颠倒一下，omni要放在前面
          this.allCoins = this.removalData(res.data.filter(c => c.depositable))
          
          if (this.$route.params.currency) {
            const currency = this.$route.params.currency.toUpperCase()
            this.selectCoin = this.allCoins.find(item => {
              return item.currency.toUpperCase() === currency
            })
            this.quickSelectCoin(this.selectCoin)
            return
          } else {
            //没传参数的情况下打开页面默认选择usdt的trx链
            this.selectLian = this.lianDataList['USDT'].find(a => a.chain==='TRX') 
            this.selectCoin = this.selectLian || this.allCoins[0]
          } 
          this.neverShowAgain = local.depositAlert[this.selectCoin.currency] || false
          this.showModal = !this.neverShowAgain
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
    },
    handleCloseModal() {
      this.showModal = false
      // local.depositAlert[this.selectCoin.currency] = this.neverShowAgain
      this.$set(local.depositAlert,this.selectCoin.currency, this.neverShowAgain )
      this.neverShowAgain = false
    }
  },
  watch: {
    address() {
      this.setQr(this.address)
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
            height: 40px;
            line-height: 40px;
            text-indent: 13px; 
            border-color: transparent;
            background: transparent; 
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

            color: $primary;
        }
  
  }
  .lian {
    font-size: 14px;
    // font-weight: bold;
    color: #333333;

    &:hover, &:focus {
      border-color: transparent !important;
      color: #333333 !important;
    }
  }
  .modal-container {
    padding: 45px 35px;
    color: #464646;
    & > div {
      width:424px;
      .img {
        height:57px;
        width: 57px;
        font-size: 47px;
        color:#FD5A5A;
        background-color: #FFE8E8;
        border-radius: 50%;
      }
      .text {
        margin: 32px 0;
        font-size: 18px;
      }
      .info {
        font-size: 16px;
        line-height: 2em;
      }
      .check {
        margin: 20px 0;
      }
      .modal-button {
        padding:12px;
        cursor: pointer;
        background-color: $primary;
        text-align: center;
        border-radius: 6px;
      }
    }
  }
</style>
