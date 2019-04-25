<template>
  <div class="withdraw-container fund-container">
    <div class="title-box">
      <div> {{ $t('withdraw') }}</div>
      <router-link
        to="/fund/my/history/deposit"
        class="fund-history"> {{ $t('capital_record') }}</router-link>
    </div>
    <div class="fund-items-content">
      <div class="fund-item-row">
        <div class="row__label">{{ $t('currency') }}</div>
        <div class="row__value">
          <el-select
            v-model="selectCoin"
            @change="changeCoinType"
            :placeholder="$t('please_choose')"
            :no-data-text="$t('no_data')"
            value-key="currency">
            <el-option
              v-for="item in allCoins"
              :key="item.id"
              :label="item.currency"
              :value="item"/>
          </el-select>
        </div>
      </div>
      <div class="fund-item-other mt-13 mb-23 withdraw-remain">
        <span>{{ $t("withdraw_avlb") }}:  {{ myCoinInfo.available }}</span>
        <span class="ml-29 mr-29">{{ $t("quota") }}: {{ myCoinInfo.quota }}</span>
        <router-link
          to="/profile/kyc/"
          class="up-limit pointer">{{ $t("upgrade_quota") }}</router-link>
      </div>
      <div class="fund-item-other mb-14">
        <span
          :class="['quick-btn mb-10 mr-10', selectCoin.currency === c.currency && 'selected']"
          @click.prevent="quickSelectCoin(c)"
          v-for="(c, idx) in allCoins"
          :key="idx">
          {{ c.currency }}
        </span>
      </div>
      <div class="fund-item-row">
        <div class="row__label">{{ $t('withdraw_addr') }}</div>
        <div class="row__value">
          <div class="withdraw-address">
            <el-select
              class="select-address"
              filterable
              allow-create
              value-key="address"
              default-first-option
              v-model="selectAddress"
              :placeholder="$t('please_choose')"
              :no-data-text="$t('no_data')"
              @change="changeAddress">
              <el-option
                v-for="item in allAddress"
                :key="item.id"
                :label="item.address + (item.description ? '  -  ' + item.description : '')"
                :value="item"/>
            </el-select>
          </div>
        </div>
      </div>
      <div
        @click.prevent="addNewAddr"
        class="fund-item-other withdraw-new-address mt-14 mb-24 default">
        <span class="add-icon mr-10">+</span>{{ $t("add_withdraw_addr") }}
      </div>
      <!-- address_tag -->
      <div
        class="fund-item-row"
        v-if="selectCoin.memo_support">
        <div class="row__label">{{ $t('address_tag') }}</div>
        <div class="row__value">
          <div class="withdraw-address border-1 pl-10">
            <input
              class="coin-count"
              v-model="memo">
          </div>
        </div>
      </div>
      <!-- address_tag_label -->
      <div
        class="fund-item-other eos-deposit-tips"
        v-if="selectCoin.memo_support">
        {{ $t('eos_deposit_tip_label') }}
      </div>
      <div class="fund-item-row">
        <div class="row__label">{{ $t('withdraw_amount') }}</div>
        <div class="row__value">
          <div class="withdraw-address border-1 pl-10">
            <input
              class="coin-count"
              type="number"

              :min="Number(selectCoin.min_withdraw_amount)"
              :max="Number(myCoinInfo.available)"
              v-model="withdrawCount">
            <span class="coin-type">{{ selectCoin.currency }}</span>
          </div>
        </div>
      </div>
      <div class="fund-item-other withdraw-least mt-14 mb-22">
        {{ $t("withdraw_min") }} {{ selectCoin.min_withdraw_amount }} {{ selectCoin.currency }}
      </div>
      <div class="fund-item-other withdraw-fee mb-23">
        <p> <span class="fee__label">{{ $t('withdraw_fee') }} </span> <span class="fee__coin">{{ selectCoin.withdraw_fee }}{{ selectCoin.currency }}</span> </p>
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
        class="fund-item-other mt-25 text-des"
        style="padding-left: 102px">
        <li>  {{ $t('withdraw_hint_delay') }}</li>
        <li>  {{ $t('withdraw_hint_check',{num: selectCoin.min_review_amount ,coin: selectCoin.currency}) }}</li>
      </ul>

    </div>
    <v-modal
      :open.sync="showModal"
      @click="hideModal"> 
      <div class="ensure-modal">
        <div class="modal__title mb-30">{{ $t('security_verification') }}</div>
        <div class="modal__content">
          <div class="modal__row">
            <div class="row__label mb-9">{{ $t('register_by_phone') }}</div>
            <div class="row__input" >{{ contact }} </div>
          </div>
          <div
            class="modal__row mt-12 mb-25"
            v-if="verify_phone">
            <div class="row__label mb-9">{{ $t('phone_verification_code') }}</div>
            <div class="row__input" >
              <input
                v-model="phoneCode"
                class="input-validate mr-14">
              <count-down
                :send-text="$t('hq_send')"
                :send-code-func="getVerifyCode"
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
            <span class="row__label">1. {{ $t('bind_email') }}</span>
            <span
              class="row__status"
              @click="clickVerifyRow('EmailBind')"
              :class="{'done': email_bound}">{{ email_bound ? $t('done') : $t('to_bind') }}</span>
          </div>
          <div class="layer__row mt-20">
            <span class="row__label">2. {{ $t('bind_phone') }}</span>
            <span
              class="row__status"
              @click="clickVerifyRow('PhoneBind')"
              :class="{'done': phone_bound}">{{ phone_bound ? $t('done') : $t('to_bind') }}</span>

          </div>
          <div class="layer__row mt-20">
            <span class="row__label">3. {{ $t('complete_verified') }}</span>
            <span
              class="row__status"
              @click="clickVerifyRow('Kyc')"
              :class="{'done': all_bound}">{{ all_bound ? $t('done') : $t('to_bind') }}</span>
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
      address: '',
      allCoins: [],
      selectCoin: {},
      allAddress: [],
      selectAddress: {},
      withdrawCount: 0,
      showModal: false,
      myCoinInfoList: [],
      myCoinInfo: {},
      phoneCode: '',
      googleCode: '',
      memo: '',
      state
    }
  },
  computed: {
    contact () {
      if (this.state && this.state.userInfo) {
        return this.state.userInfo.phone || this.state.userInfo.email
      } else {
        return ''
      }
    },
    coinArrival () {
      return this.$big(parseFloat(this.withdrawCount) || 0).minus(this.$big(this.selectCoin.withdraw_fee || 0)).toString()
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
    email_bound () {
      return this.state.userInfo && this.state.userInfo.email
    },
    phone_bound () {
      return this.state.userInfo && this.state.userInfo.phone
    },
    all_bound () {
      // kyc > 0 就可以提币
      return this.state.userInfo && this.state.userInfo.lv > 0
    },
    disableBtn () {
      return !this.email_bound || !this.phone_bound || !this.all_bound
    }
  },
  components: {vModal, countDown},
  async created () {
    await actions.updateSession()
    this.showLayerModal = !this.email_bound || !this.phone_bound || !this.all_bound
    await this.getAllCoinTypes()
    this.updadeMyCoinInfo()
    this.getCoinAddress()
  },
  methods: {
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
          this.allAddress = res.data
          if (this.allAddress.length > 0) {
            this.selectAddress = this.allAddress[0]
            this.memo = this.selectAddress.memo
          } else {
            this.selectAddress = {
              address: ''
            }
            this.memo = ''
          }
        } else {
          this.selectAddress = {}
          this.memo = ''
        }
      })
    },
    async changeCoinType (coin) {
      this.selectCoin = coin
      this.selectAddress = {
        address: '',
        memo: ''
      }
      this.getCoinAddress()
      this.updadeMyCoinInfo() // 更改币种后，重新获取一次自己的钱包状态
    },
    async updadeMyCoinInfo () {
      await this.getAccountBalanceList()
      this.myCoinInfoList.forEach(mc => {
        if (mc.currency === this.selectCoin.currency) {
          this.myCoinInfo = mc
        }
      })
    },
    async getAllCoinTypes () {
      await service.getAllCoinTypes().then(res => {
        if (res && res.data) {
          this.allCoins = res.data.filter(c => c.withdrawable)
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
    getAccountBalanceList () {
      return service.getAccountBalanceList().then(res => {
        this.myCoinInfoList = res.data
      })
    },
    getVerifyCode () {
      const param = {
        region: this.state.userInfo.region,
        phone: this.contact
      }
      service.getVerifyCode(param, 'phone').then(res => {
        console.log(res)
      })
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
        // email_code
        phone_code: this.phoneCode
      }

      // eos 需要填memo
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
      if (this.googleCode) {
        param.google_code = this.googleCode
      }
      service.confirmWithdraw(param).then(res => {
        if (res.code) {
          utils.alert(res.message)
        } else {
          this.$router.push('/fund/my/history/withdraw')
        }
      })
    },
    ensure () {
      if (this.disableBtn) {
        utils.alert('请完善你的资料')
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
      const url = '/fund/address/' + this.selectCoin.currency
      this.$router.push(url)
    }
  }
}
</script>
