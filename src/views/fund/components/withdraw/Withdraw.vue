<template>
  <div class="withdraw-container fund-container"> 
    <div class="fund-items-content">
      <div class="fund-item-row">
        <div class="nav-list"
            flex="main:right">
          <router-link 
            :to="{name:'new-fund', query: {t:'history', s: 'withdraw'}}"
            class="fund-history nav-btn"> {{ $t('capital_record') }}</router-link>
        </div>
      </div> 
      <div class="fund-item-row" flex="main:left">
        <div class="row__label">{{ $t('coin') }}</div>
        <div class="row__value">
          <el-select
            style="width: 440px;"
            filterable
            v-model="selectCoin"
            @change="changeCoinType"
            :placeholder="$t('please_choose')"
            :no-data-text="$t('no_data')"
            value-key="currency">
            <el-option
              v-for="item in allCoins"
              :key="item.id"
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
      <div class="fund-item-other mt-13 mb-23 withdraw-remain">
        <span>{{ $t("withdraw_avlb") }}:  {{ myCoinInfo.available | fixed(8) }}</span>
        <span class="ml-29 mr-29">{{ $t("quota") }}: {{ myCoinInfo.quota }}</span>
        <router-link
          to="/profile/kyc/"
          class="up-limit pointer">{{ $t("upgrade_quota") }}</router-link>
      </div>
      <div class="fund-item-other mb-14 coin-list">
        <span
          :class="['quick-btn mb-10', idx%5>0 && 'ml-20', selectCoin.currency === c.currency && 'selected']"
          @click.prevent="quickSelectCoin(c)"
          v-for="(c, idx) in allCoins"
          :key="idx">
          {{ c.currency }}
        </span>
      </div>
      <div class="fund-item-row mb-24" v-if="lianDataList[selectCoin.currency]" flex="main:left">
        <div class="row__label">
          <el-popover
            placement="bottom-start"
            title=""
            width="240"
            trigger="hover"
            effect="dark" :content="depTip">
            <el-button type="text" slot="reference" class="lian">{{$t("link_name")}}</el-button>
          </el-popover>
        </div>
        <div class="row__value">
          <el-select
            @change="lianSelect"
            style="width: 440px;"
            v-model="selectLian"
            value-key="chain">
            <el-option
              v-for="(item, idx) in lianDataList[selectCoin.currency]"
              :key="idx"
              :label="item.currencyName"
              :value="item"/>
          </el-select>
        </div>
      </div>
      <div class="fund-item-row" flex="main:left">
        <div class="row__label">{{ $t('withdraw_addr') }}</div>
        <div class="row__value"> 
          <div class="withdraw-address">
            <el-autocomplete
              class="select-address"
              v-model="selectItem"
              :fetch-suggestions="querySearch"
              @select="handleSelect"
              @blur="onBlur"
              :highlight-first-item="highlight"
              cols="1"
              rows="1" style="vertical-align:top;outline:none;"
            />
          </div>
        </div>
      </div>
      <div
        class="fund-item-other withdraw-new-address mt-14 mb-24 default">
        <label @click.prevent="addNewAddr" class="text-primary">
          <span class="add-icon mr-10">+</span>{{ $t("add_withdraw_addr") }}
        </label>
      </div>
      <!-- address_tag -->
      <div
        class="fund-item-row"
        v-if="selectCoin.memo_support"
        flex="main:left">
        <div class="row__label">{{ $t('address_tag') }}</div>
        <div class="row__value">
          <div class="withdraw-address border-1 pl-10">
            <input
              class="coin-count"
              v-model="memo">
          </div>
        </div>
        <div class="attention">
          <icon
            name="robot-info"
            class="icon-eos ml-5 pointer"
            v-tooltip.top-center="{html: true,content: robotAttention, classes: 'myfund'} "
          />
        </div>
      </div>
      <!-- address_tag_label -->
      <div
        class="fund-item-other eos-deposit-tips"
        v-if="selectCoin.memo_support">
        {{ $t('eos_deposit_tip_label') }}
      </div>
      <!-- remark -->
      <div class="fund-item-row mb-25" flex="main:left">
        <div class="row__label">{{ $t('fund.withdraw.address_remark') }}</div>
        <div class="row__value">
          <div class="withdraw-address border-1 pl-10">
            <input
              class="coin-count"
              :placeholder="$t('fund.withdraw.address_remark_tag')"
              v-model="remark">
          </div>
        </div> 
      </div> 
      <div class="fund-item-row" flex="main:left">
        <div class="row__label">{{ $t('withdraw_amount') }}</div>
        <div class="row__value">
          <div class="withdraw-address border-1 pl-10"> 
            <number-input
              class="amount-input"
              :scale="myCoinInfo.withdraw_scales"
              :max="Number(myCoinInfo.available)"
              :min="Number(selectCoin.min_withdraw_amount)"
              v-model="withdrawCount"
            />
            <span class="coin-type">
              <i> {{ selectCoin.currency }}</i>
              <a @click="input_all" class="up-limit pointer ml-5">{{ $t('transfer_all') }}</a>
            </span>
          </div>
          <!-- @input='checkInput' -->
        </div>
      </div>
      <div class="fund-item-other withdraw-least mt-14 mb-22">
        {{ $t("withdraw_min") }} {{ selectCoin.min_withdraw_amount }} {{ selectCoin.currency }}
        <!-- <a @click="input_all" class="up-limit pointer ml-30">{{$t('transfer_all')}}</a> -->
      </div>
      <div class="fund-item-other withdraw-fee mb-25">
        <p> <span class="fee__label">{{ $t('withdraw_fee') }} </span> <span class="fee__coin">{{ selectCoin.withdraw_fee }}{{ selectCoin.withdraw_currency ? selectCoin.withdraw_currency : selectCoin.currency }}</span> </p>
        <p><span class="fee__label">{{ $t('withdraw_arrival') }}</span>
          <span
            class="fee__coin"
            v-if="coinArrival > 0">{{ coinArrival }} {{ selectCoin.currency }}
          </span>
          <span v-else>
            --
          </span>
        </p>
      </div>
      <div class="fund-item-other">
        <v-btn
          style="width: 200px"
          @click="ensure"
          :disabled="disableBtn"
          :label="$t('withdraw_confirm')"/>
      </div>
      <ul
        class="fund-item-other mt-25 text-des">
        <li>  {{ $t('withdraw_hint_min', {amount: selectCoin.min_withdraw_amount ,coin: selectCoin.currency}) }}</li>
        <li>  {{ $t('withdraw_hint_delay') }}</li>
        <li>  {{ $t('withdraw_hint_check') }}</li>
        <!-- <li>  {{ $t('watch_tips') }}</li> -->
        <li>  {{ $t('withdraw_hint_examine') }}</li> 
        <li> {{ $t('withdraw_hint_time')}}</li>
      </ul>

    </div>
    <v-modal
      :open.sync="showModal"
      @click="hideModal">
      <div class="ensure-modal">
        <div class="modal__title mb-30">{{ $t('security_verification') }}</div>
        <div class="modal__content">
          <div class="modal__row" v-if="verify_phone">
            <div class="row__label mb-9">{{ $t('fund.withdraw.phone') }}</div>
            <div class="row__input" >{{ contact_phone }} </div>
          </div>
          <div
            class="modal__row mt-12 mb-25"
            v-if="verify_phone">
            <div class="row__label mb-9">{{ $t('fund.withdraw.phone_code') }}</div>
            <div class="row__input" >
              <input
                v-model="phoneCode"
                class="input-validate mr-14">
              <count-down
                :send-text="$t('hq_send')"
                :send-code-func="getPhoneVerifyCode"
              />
            </div>
          </div>
          <div class="modal__row"
            v-if="verify_email">
            <div class="row__label mb-9">{{ $t('fund.withdraw.email') }}</div>
            <div class="row__input" >{{ contact_email }} </div>
          </div>
          <div
            class="modal__row mt-12 mb-25"
            v-if="verify_email">
            <div class="row__label mb-9">{{ $t('fund.withdraw.email_code') }}</div>
            <div class="row__input" >
              <input
                v-model="emailCode"
                class="input-validate mr-14">
              <count-down
                :send-text="$t('hq_send')"
                :send-code-func="getEmailVerifyCode"
              />
            </div>
          </div>
          <div
            class="modal__row mt-12 mb-25"
            v-if="verify_google">
            <div class="row__label mb-9">{{ $t('fa2_google_code_mobile') }}</div>
            <div class="row__input" >
              <input
                v-model="googleCode"
                class="input-validate google mr-14">
            </div>
          </div>
          <v-btn
            class="w-340"
            @click="confirmWithdraw"
            :label="$t('withdraw_confirm')"/> 
        </div>
      </div>
    </v-modal> 
    <v-modal :open.sync="showLayerModal">
      <div class="not-verified-layer">
        <div class="layer__title mb-30">{{ $t('withdraw_need_verify') }}</div>
        <div class="layer__content">
          <div class="layer__row_note">
            <div class="row__label">{{ $t('withdraw_need_verify_note') }}</div>
          </div>
          <div class="layer__row mt-30">
            <span class="row__label">1. {{ $t('fund.withdraw.bind_email_or_phone') }}</span>
            <span
              class="row__status"
              @click="clickVerifyRow('EmailBind')"
              :class="{'done': email_or_phone_bound}">{{ email_or_phone_bound ? $t('fund.withdraw.done') : $t('fund.withdraw.to_bind') }}</span>
          </div>
          <!-- <div class="layer__row mt-20">
            <span class="row__label">2. {{ $t('fund.withdraw.bind_google') }}</span>
            <span
              class="row__status"
              @click="clickVerifyRow('GoogleBind')"
              :class="{'done': google_bound}">{{ google_bound ? $t('fund.withdraw.done') : $t('fund.withdraw.to_bind') }}</span>
          </div> -->
          <div class="layer__row mt-20">
            <span class="row__label">3.
              <span v-html="$t('complete_verified')"/>
            </span>
            <span
              class="row__status"
              @click="clickVerifyRow('Kyc')"
              :class="{'done': all_bound}">{{ all_bound ? $t('done') : $t('to_verify') }}</span>
          </div> 
        </div>
      </div>
    </v-modal>
    <v-modal :open.sync="showDepositModal">
      <div class="not-verified-layer">
        <div class="layer__title mb-30">{{ $t('withdraw_need_verify') }}</div>
        <div class="layer__content">
          <div class="layer__row_note">
            <div class="row__label">{{ $t('withdraw_need_verify_note') }}</div>
          </div> 
          <div
            class="layer__row mt-30"
            flex="main">
            <span
              flex-box="1"
              class="row__label">1. {{ $t('fund.withdraw.bind_google') }}</span>
            <span
              flex-box=0
              class="row__status"
              @click="clickVerifyRow('GoogleBind')"
              :class="{'done': google_bound}">{{ google_bound ? $t('fund.withdraw.done') : $t('fund.withdraw.to_bind') }}</span>
          </div>
          <div
            class="layer__row mt-20"
            flex="main">
            <span
              class="row__label"
              flex-box="1">2. {{ $t('fund.withdraw.to_deposit_tips') }}</span>
            <span
              flex-box="0"
              class="row__status done" >
              <span v-if="isDeposited">{{ $t('fund.withdraw.done') }}</span>
            </span>
          </div>
          <div
            v-if="!isDeposited"
            class="layer__row mt-20 pl-20">
            <el-button
              type="primary"
              @click="clickVerifyRow('deposit')"
            >{{ $t('fund.withdraw.to_deposit') }}</el-button>
          </div>
        </div>
      </div>
    </v-modal>
  </div>
</template>
<script>
import './Withdraw.scss'
import copyToClipboard from 'copy-to-clipboard'
import vModal from '@/components/VModal.vue'
import utils from '@/modules/utils'
import service from '@/modules/service'
import countDown from '@/components/common/countdown-code-button' 
import { state, actions } from '@/modules/store'

export default {
  name: 'Withdraw',
  data () {
    return {
      showLayerModal: false,
      showDepositModal: false,
      address: '',
      allCoins: [],
      selectCoin: {},
      allAddress: [],
      selectAddress: {},
      withdrawCount: '',
      showModal: false,
      myCoinInfoList: [],
      myCoinInfo: {},
      phoneCode: '',
      googleCode: '',
      emailCode: '',
      remark: '',
      memo: '',
      state,
      myitem: '',
      selectItem: '',
      restaurants: [],
      highlight: true,
      lianData: [],
      selectLian: {},
      lianDataList :{},
    }
  },
  computed: {
    depTip () {
      return state.locale && this.$t('dep_tip')
    },
    robotAttention () {
      return ` <div
            class="attention__tips">
            <p class="title mb-8">${this.$t('about_eos_address_label')}</p>
            <p class="mb-4">${this.$t('about_eos_address_label_a', {currency: this.selectCoin.currency})}</p>
            <p >${this.$t('about_eos_address_label_b', {currency: this.selectCoin.currency})}</p>
          </div>`
    },
    contact_phone () {
      if (this.state && this.state.userInfo) {
        return this.state.userInfo.phone 
      } else {
        return ''
      }
    },
    contact_email () {
      if (this.state && this.state.userInfo) {
        return this.state.userInfo.email
      } else {
        return ''
      }
    },
    coinArrival () {
      if (!!this.selectCoin.withdraw_currency) {
        return this.$big(parseFloat(this.withdrawCount) || 0).toString()
      } else {
        return this.$big(parseFloat(this.withdrawCount) || 0).minus(this.$big(this.selectCoin.withdraw_fee || 0)).toString()
      }
    },
    verify_google () {
      if (this.state.userInfo && this.state.userInfo.verify_google) {
        return true
      }
      return false
    },
    verify_phone () {
      if (this.state.userInfo && this.state.userInfo.verify_phone) {
        return true
      }
      return false
    },
    verify_email () {
      if (this.state.userInfo && this.state.userInfo.verify_email) {
        return true
      }
      return false
    },
    verify_input () {
      if (!(this.selectCoin||{}).currency ||
        !(this.selectAddress||{}).address ||
        !this.withdrawCount) {
          return false
      }
      return true
    },
    email_bound () {
      return this.state.userInfo && this.state.userInfo.email
    },
    phone_bound () {
      return this.state.userInfo && this.state.userInfo.phone
    },
    email_or_phone_bound() {
      return this.state.userInfo && (this.state.userInfo.phone ||  this.state.userInfo.email)
    },
    all_bound () {
      // kyc > 2 ???????????????
      return this.state.userInfo && this.state.userInfo.lv > 1 && this.state.userInfo.state > 1
    },
    isDeposited () {
      return this.state.userInfo && this.state.userInfo.deposit_state 
    },
    google_bound() {
      return true
      // return this.state.userInfo && this.state.userInfo.google_key_bound
    }, 

    disableBtn () {
      //return !this.email_bound || !this.phone_bound || !this.all_bound
      return !this.email_or_phone_bound || !this.google_bound || !(this.isDeposited || this.all_bound) || !this.verify_input
    }
  },
  components: {vModal, countDown },
  async created () {
    await actions.getKycLv()
    await actions.updateSession()
    // console.log({userInfo: this.state.userInfo}) 
    // this.showLayerModal = !this.email_bound || !this.phone_bound || !this.all_bound
     
    // //???????????????
    // if (this.isDeposited){
    //   this.showDepositModal = !this.google_bound
    // } 
    // //kyc2
    // else 
    if(this.state.userInfo.lv > 0) {
      this.showLayerModal = !this.email_or_phone_bound || !this.google_bound || !this.all_bound
    }
    //?????????????????????kyc=0
    else {
      this.showLayerModal = true
      //  this.showDepositModal = true
    }
    // this.showLayerModal = true
    // this.showModal = true 
    await this.getAllCoinTypes()
    this.updadeMyCoinInfo()
    this.getCoinAddress()
  },
  methods: {
    async lianSelect (coin) { 
      this.selectCoin = coin
      await this.getCoinAddress()
      this.updadeMyCoinInfo()
    },
    onBlur (e) {
      let arr = this.restaurants.filter(item => item.value === this.selectItem)
      if (arr.length === 0) {
        let obj = {
          value: this.selectItem,
          address: this.selectItem,
          memo: ''
        }
        // if (this.restaurants)
        //   {this.restaurants.push(obj)}

        this.selectItem = obj.value
        this.selectAddress = obj
        this.memo = ''
      } else {
        this.selectItem = arr[0].value
        this.selectAddress = arr[0]
        this.memo = arr[0].memo
      }
    },
    checkInput () {
    },
    input_all () {
      this.withdrawCount = this.myCoinInfo.available
    },
    clickVerifyRow (v) {
      this.$router.push({
        name: v
      })
    },
    copy () {
      copyToClipboard(this.address)
      utils.success(this.$i18n.t('copyed'))
    },
    async getCoinAddress () {
      const param = {
        currency: this.selectCoin.currency
      }
      return service.getMyAddressList(param).then((res) => {
        if (res && res.data) { 
          this.restaurants = []
          this.allAddress = res.data
          // if (this.selectCoin.currency === 'USDT' || this.selectCoin.currency === 'SLD') {
          //   this.allAddress = this.allAddress.filter(item => item.chain === this.selectLian.chain || (!item.chain &&  this.selectLian.chain === 'OMNI' ))
          // }
          this.allAddress = this.allAddress.filter(item => item.chain === this.selectLian.chain || (!item.chain &&  this.selectLian.chain === 'OMNI' ))
           
          // console.log(this.allAddress)
          for (const item of this.allAddress) {
            this.restaurants.push({
              value: item.address,
              address: item.address,
              memo: item.memo,
              currency: item.currency,
              description: item.description
            })
          }

          this.selectItem = ''
          this.selectAddress = {
            address: '',
            memo: ''
          }
          if (this.allAddress.length > 0) {
            this.selectItem = this.restaurants[0].address
            this.memo = this.restaurants[0].memo

            this.selectAddress = this.allAddress[0]
            this.memo = this.selectAddress.memo
          }  
        } else {
          this.selectAddress = {}
          this.memo = ''
        }
      })
    },
    async changeCoinType (coin) { 
      // if (coin.currency === 'USDT') {
      //   this.selectCoin = this.selectLian
      // }
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
      this.selectItem = ''
      this.selectAddress = {
        address: '',
        memo: ''
      }
      this.getCoinAddress()
      this.updadeMyCoinInfo() // ?????????????????????????????????????????????????????????
    },
    async updadeMyCoinInfo () {
      await this.getAccountWalletList()
      this.myCoinInfoList.forEach(mc => {
        if (mc.currency === this.selectCoin.currency) {
          this.myCoinInfo = mc
        }
      })
    },
    async getAllCoinTypes () { 
      const that = this
      this.lineDataList = {}
      await service.getAllCoinTypes().then(res => {
        if (res && res.data) { 
          this.lianData = []
          res.data.forEach((item) => {
            // if((item.currency === 'USDT' || item.currency === 'SLD' ) && item.withdrawable) {
              if (item.chain === 'OMNI' && item.withdrawable) { item.currencyName = item.currency + '-' + 'Omni'}
              else if (item.chain === 'ETH' && item.withdrawable) { item.currencyName = item.currency + '-' + 'ERC20'}
              else if (item.chain === 'TRX' && item.withdrawable) { item.currencyName = item.currency + '-' + 'TRC20'}
              // else if (item.chain === 'BSC') { item.currencyName = item.currency + '-' + 'BSC'} 
              // else if (item.chain === 'BNB') { item.currencyName = item.currency + '-' + 'BNB'}
              else {
                item.currencyName = item.currency + '-' + item.chain
              }
              if (item.withdrawable) {
                this.lianData.push(item) 
                if (!this.lianDataList[item.currency])  
                  this.lianDataList[item.currency] = [] 
                this.lianDataList[item.currency].push(item)  
              }
            // }  
          })
          // this.lianData = this.lianData.reverse()//?????????????????????ERC20???????????????
          // this.selectLian = this.lianData.find(a => a.chain==='TRX') 
          this.allCoins = this.removalData(res.data.filter(c => c.withdrawable))  
        }
      }) 
      if (this.$route.params.currency) {
        const currency = this.$route.params.currency.toUpperCase() 
        const coin  = this.allCoins.find(item => {
          return item.currency.toUpperCase() === currency
        })
        this.quickSelectCoin(coin)
        return
      } else {
        //????????????????????????????????????????????????usdt???trx???
        this.selectLian = this.lianDataList['USDT'].find(a => a.chain==='TRX') 
        this.selectCoin = this.selectLian || this.allCoins[0]
      } 
    },
    quickSelectCoin (coin) {   
      this.changeCoinType(coin)   
      
    },
    removalData (arrData) {
      var hash = {}
      arrData = arrData.reduce(function (item, next) {
        //num_iid??????????????????????????????
        hash[next.currency] ? '' : hash[next.currency] = true && item.push(next)
        return item
      }, [])
      return arrData
    },
    getAccountWalletList () {
      return service.getAccountWalletList().then(res => {
        this.myCoinInfoList = res.data
      })
    },
    getPhoneVerifyCode(){
      const param = {
        region: this.state.userInfo.region,
        phone: this.contact_phone
      }
      let res = service.getVerifyCode(param, 'phone') 
      return res
    },
    getEmailVerifyCode() { 
      const param = { 
        email: this.contact_email
      }
      let res = service.getVerifyCode(param, 'email') 
      return res
    },
    changeAddress (item) {
      if (typeof item === 'string') {
        this.allAddress.splice(0, 0, {
          address: item,
          memo: ''
        })
        this.selectAddress = this.allAddress[0]
        this.memo = ''
      } else {
        this.memo = item.memo
      }
    },
    async confirmWithdraw () {
      const param = {
        currency: this.selectCoin.currency,
        to_address: this.selectAddress.address,
        amount: this.withdrawCount,
        google_code: this.googleCode,
        remark: this.remark
      }

      // if (this.selectCoin.currency === 'USDT' || this.selectCoin.currency === 'SLD') {
      //   param.chain = this.selectLian.chain
      // }
        param.chain = this.selectLian.chain
 
      // eos ?????????memo
      if (this.selectCoin.memo_support) {
        if (this.memo) {
          param.memo = this.memo
        } else {
          const ok = await utils.confirm(this, {
            content: this.$i18n.t('eos_deposit_tip_label'),
            title: this.$i18n.t('tips')
          })
          if (!ok) {
            return
          }
        }
      }

      if (this.verify_email) {
        param.email_code = this.emailCode
      }
      if (this.verify_phone) {
        param.phone_code = this.phoneCode 
      }


      service.confirmWithdraw(param).then(res => {
        if (res.code) {
          utils.alert(res.message)
        } else {
          this.$router.push('/nfund/my/assets?t=history&s=withdraw')
        }
      })
    },
    ensure () {
      if (this.disableBtn) {
        utils.alert(this.$t('withdraw_tips1')) // ?????????????????????
        return
      }
      if (this.$big(this.withdrawCount || 0).lt(this.$big(this.selectCoin.min_withdraw_amount))) {
        utils.alert(this.$t('withdraw_count_min_error'))
        return
      }
      if (this.$big(this.withdrawCount || 0).gt(this.$big(this.myCoinInfo.available || 0))) {
        utils.alert(this.$t('withdraw_count_max_error'))
        return
      }
      if (!this.selectAddress.address) {
        utils.alert(this.$t('add_address_error'))
        return
      } else if (this.selectAddress.address === 'ixeosdeposit') {
        utils.alert(this.$t('eos_not_support_internal_transfer'))
        return
      } 

      this.showModal = true
    },
    hideModal () {
      this.showModal = false
    },
    addNewAddr () {
      const url = '/nfund/address/' + this.selectCoin.currency
      this.$router.push(url)
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // ?????? callback ???????????????????????????
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      };
    },
    handleSelect (item) {
      // console.log(item);
      this.selectAddress = item
      this.memo = item.memo
      console.log(this.selectAddress, this.memo)
    }
  } 
}
</script>
<style lang="scss">
  .lian {
    font-size: 14px; 
    color: #333333;
    &:hover, &:focus {
      border-color: transparent!important;
      color: #333333!important;
    }
  }
</style>
