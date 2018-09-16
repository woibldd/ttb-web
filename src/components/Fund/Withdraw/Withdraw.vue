<template>
  <div class="withdraw-container fund-container">
    <div class="title-box">
      <div> {{ $t('withdraw') }}</div>
      <router-link
        to="/fund/history/withdraw"
        class="fund-history"> {{ $t('资金记录') }}</router-link>
    </div>
    <div class="fund-items-content">
      <div class="fund-item-row">
        <div class="row__label">{{ $t('currency') }}</div>
        <div class="row__value">
          <el-select
            v-model="selectCoin"
            @change="changeCoinType"
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
        <span class="ml-29 mr-29">{{ $t("限额") }}: {{ selectCoin.min_withdraw_amount }}</span>
        <span class="up-limit pointer">{{ $t("提升限额") }}</span>
      </div>
      <div class="fund-item-row">
        <div class="row__label">{{ $t('withdraw_addr') }}</div>
        <div class="row__value">
          <div class="withdraw-address pl-10">
            <input
              class="coin-count"
              type="text"
              v-model="transfer2Address">
          </div>
        </div>
      </div>
      <div
        @click="addNewAddr"
        class="fund-item-other withdraw-new-address mt-14 mb-24 default">
        <span class="add-icon mr-10">+</span>{{ $t("add_withdraw_addr") }}
      </div>
      <div class="fund-item-row">
        <div class="row__label">{{ $t('withdraw_amount') }}</div>
        <div class="row__value">
          <div class="withdraw-address pl-10">
            <input
              class="coin-count"
              type="number"
              :step="Number(selectCoin.min_withdraw_amount)"
              :min="Number(selectCoin.min_withdraw_amount)"
              :max="Number(myCoinInfo.available)"
              v-model="withdrawCount">
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
        <div class="modal__title mb-30">{{ $t('安全验证') }}</div>
        <div class="modal__content">
          <div class="modal__row">
            <div class="row__label mb-9">{{ $t('手机') }}</div>
            <div class="row__input" >{{ contact }} </div>
          </div>
          <div class="modal__row mt-12 mb-25">
            <div class="row__label mb-9">{{ $t('手机验证码') }}</div>
            <div class="row__input" >
              <input
                v-model="phoneCode"
                class="input-validate mr-14">
              <span
                @click="getVerifyCode"
                class="default c-primary">{{ $t('获取验证码') }}</span>
            </div>
          </div>
          <v-btn
            class="w-340"
            @click="confirmWithdraw"
            :label="$t('确认提币')"/>
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
import { state } from '@/modules/store'

export default {
  name: 'Withdraw',
  data () {
    return {
      address: '',
      allCoins: [],
      selectCoin: {},
      allCoinAddress: [],
      transfer2Address: '',
      withdrawCount: 0,
      showModal: false,
      myCoinInfoList: [],
      myCoinInfo: {},
      phoneCode: '',
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
      return this.$big(this.withdrawCount) - this.$big(this.selectCoin.withdraw_fee)
    }
  },
  components: {vModal},
  async created () {
    await this.getAllCoinTypes()
    this.updadeMyCoinInfo()
    this.getCoinAddress()
  },
  methods: {
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
          console.log(res, 'pppp')
        //   this.transfer2Address = res
        }
      })
    },
    async changeCoinType (coin) {
      this.selectCoin = coin
      this.getCoinAddress()
      this.getAccountBalanceList() // 更改币种后，重新获取一次自己的钱包状态
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
    getAccountBalanceList () {
      return service.getAccountBalanceList().then(res => {
        this.myCoinInfoList = res.data
      })
    },
    getVerifyCode () {
      const param = {
        region: 86,
        phone: this.contact
      }
      service.getVerifyCode(param, 'phone').then(res => {
        console.log(res)
      })
    },
    confirmWithdraw () {
      const param = {
        currency: this.selectCoin.currency,
        to_address: this.transfer2Address,
        amount: this.withdrawCount,
        // memo:
        // email_code
        phone_code: this.phoneCode
        // google_code
      }
      service.confirmWithdraw(param).then(res => {
        console.log(res)
      })
    },
    ensure () {
      this.showModal = true
    },
    hideModal () {
      this.showModal = false
    },
    addNewAddr () {
      this.$router.push('/fund/address')
    }
  }
}
</script>
