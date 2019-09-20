<template>
  <div class="assets-container">
    <div class="assets-box">
      <div class="user-info">
        <label>{{ dataTable.name || '--' }}</label>
        <a @click="showUserInfo">{{ $t('otc_view_userinfo') }}</a>
      </div>
      <div class="asset-info" style="flex: 1.2;">
        <div class="clear-fix">
          <div class="block pull-left mr-9">{{ currency }}</div>
          <div class="pull-left">
            <span class="title">{{ $t('avlb') }}</span>
            <span class="valuebold">{{ available | fixed(8) }}</span>
          </div>
          <div class="pull-left">
            <span style="margin: 0px 6px;">/</span>
            <span class="title">{{ $t('asset_th_unavlb') }}</span>
            <span class="bold">{{ ordering | fixed(8) }}</span>
          </div>
        </div>
      </div>
      <div class="transfer-btn">
        <router-link
          class="menu-name"
          to="/OTC/Transfer"
          active-class="active"
        >{{ $t('account_exchange') }}</router-link>
      </div>
    </div>
    <v-modal :open.sync="showUserCard">
      <!-- 查看链接个人信息 -->
      <div class="dialog-container">
        <div class="top"/>
        <div class="title" style="margin-bottom:13px;" >
          <i class="logo">IXX</i>
          <span style="margin-left: 7px;">{{ dataTable.name || '--' }}</span>
        </div>
        <div class="user-info">
          <dl>
            <dt>{{ $t('otc_register_time') }}:</dt>
            <dd>{{ dataTable.register_time ? $moment(dataTable.register_time).format('YYYY-MM-DD hh:mm') : '--' }}</dd>
          </dl>
          <dl>
            <dt>{{ $t('otc_kyc_level') }}:</dt>
            <dd>{{ dataTable.kyc_level || '--' }}</dd>
          </dl>
        </div>
        <div class="trade-info">
          <div class="row">
            <dl>
              <dt>{{ $t('otc_total_transaction_volume', {currency : legal_currency}) }}：</dt>
              <dd>{{ dataTable.orders_total || '--' }}</dd>
            </dl>
          </div>
          <div class="row">
            <dl>
              <dt>{{ $t('otc_total_arder') }}：</dt>
              <dd>{{ dataTable.orders_complete || '--' }}</dd>
            </dl>
            <dl>
              <dt>{{ $t('pay_time_avg') }}：</dt>
              <dd>{{ processValue('pay_time_avg', dataTable) || '--' }}</dd>
            </dl>
          </div>
          <div class="row">
            <dl>
              <dt>{{ $t('otc_orders_rate') }}：</dt>
              <dd>{{ $big(dataTable.orders_rate || 0).mul(100) }}%</dd>
            </dl>
            <dl>
              <dt>{{ $t('issue_time_avg') }}：</dt>
              <dd>{{ processValue('issue_time_avg', dataTable) || '--' }}</dd>
            </dl>
          </div>
          <!-- <div class="assets_footer">
            <span>{{$t('otc_assets_tips_m')}}</span>
          </div>-->
        </div>
      </div>
    </v-modal>
    <v-modal :open.sync="showLayerModal">
      <div class="not-verified-layer">
        <div class="layer__title mb-30">{{ $t('otc_need_verify') }}</div>
        <div class="layer__content">
          <div class="layer__row">
            <span class="row__label">1. {{ $t('bind_phone') }}</span>
            <span
              v-if="!phone_bound"
              class="row__status "
              @click="clickVerifyRow('PhoneBind')"
            >{{ $t('to_bind') }}</span>
            <span
              v-if="phone_bound"
              class="row__status done"
            >{{ $t('done_verified') }}</span>
          </div>
        </div>
        <div class="layer__row mt-20">
          <span class="row__label">2. {{ $t('otc_bind_bankCard') }}</span>
          <span
            v-if="!card_bound"
            class="row__status "
            @click="clickVerifyRow('collection')"
          >{{ $t('to_bind') }}</span>
          <span
            v-if="card_bound"
            class="row__status done"
          >{{ $t('done_verified') }}</span>
        </div>
        <div class="layer__row mt-20">
          <span class="row__label">
            3.
            <span v-html="$t('otc_kyc_verified')"/>
          </span>
          <span
            v-if="!kyc_bound"
            class="row__status "
            @click="clickVerifyRow('Kyc')"
          >{{ $t('to_verify') }}</span>
          <span
            v-if="kyc_bound"
            class="row__status done"
          >{{ $t('done_verified') }}</span>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { state } from '@/modules/store'
import service from '@/modules/service.js'
import processValue from '@/mixins/process-otc-value.js'
import _ from 'lodash'
export default {
  mixins: [processValue],
  data() {
    return {
      showUserCard: false,
      showLayerModal: false,
      available: 0,
      ordering: 0,
      dataTable: {},
      state,
      verifiedInfo: null
    }
  },
  computed: {
    currency() {
      return this.state.otc.currency
    },
    legal_currency: {
      get() {
        return this.state.otc.legal_currency
      }
    },
    card_bound() {
      console.log(this.verifiedInfo)
      return this.verifiedInfo && this.verifiedInfo.is_card
    },
    phone_bound() {
      return this.verifiedInfo && this.verifiedInfo.is_phone
    },
    kyc_bound() {
      // kyc > 0 就可以提币
      return this.verifiedInfo && this.verifiedInfo.kyc_level > 0
    }
  },
  watch: {
    currency() {
      this.getBalance()
    }
  },
  created() {
    this.getUserInfo()
    this.getBalance()
    this.isQualified()
    this.$eh.$on('otc:assets:balance', this.getBalance)
  },
  beforeDestroy() {
    this.$eh.$off('otc:assets:balance', this.getBalance)
  },
  methods: {
    showUserInfo() {
      this.showUserCard = true
    },
    getUserInfo() {
      service.getOtcUserinfo().then(res => {
        if (res.code === 0) {
          this.dataTable = res.data
          this.state.otc.userInfo = res.data
        }
      })
    },
    isQualified() {
      service.isQualified().then(res => {
        if (!res.code) {
          this.verifiedInfo = res.data

          this.showLayerModal =
            !this.card_bound || !this.phone_bound || !this.kyc_bound
          console.log(res.data)
        }
      })
    },
    getBalance() {
      // const $this = this
      service.getOtcBalance().then(res => {
        if (res.code === 0) {
          const arr = _.filter(res.data, item => item.currency === this.currency)
          if (arr.length > 0) {
            this.available = arr[0].available
            this.ordering = arr[0].ordering
          }
        }
      })
    },
    clickVerifyRow(v) {
      this.$router.push({
        name: v
      })
    }
  }
}
</script>

<style lang="scss">
.assets-container {
  border-radius: 35px;
  background-color: #f5f6f8;

  .assets-box {
    display: flex;
    justify-content: space-between;
    padding: 10px 38px;
    .user-info {
      > a {
        padding-left: 10px !important;
      }
      &::after {
        display: block;
        content: "";
        clear: both;
      }

      dl {
        float: left;
        margin-right: 30px;

      }
    }
    // div {
    //   flex: 1;
    // }

    .transfer-btn {
      text-align: right;
    }
    .asset-info {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      > div .valuebold {
        color: #000;
      }
    }
  }

  .dialog-container {
    padding: 40px;
    width: 520px;
    height: 210px;
    color: #333;

    .title {
      font-size: 18px;
      .logo {
        display: inline-block;
        // padding: 3px 7.5px;
        background-color: $primary;
        border-radius: 50%;
        color: #fff;
        font-size: 14px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;

      }
    }

    .trade-info {
      margin-top: 20px;
    }

    .assets_footer {
      text-align: right;
      color: #999;
    }

    .row {
      margin: 18px 0;
      display: flex;

      dl {
        flex: 1;
      }
    }

    dl {
      &::after {
        display: block;
        content: "";
        clear: both;
      }

      dt {
        color: #999;
        float: left;
      }

      dd {
        float: left;

font-size:14px;
font-family:MicrosoftYaHei;
font-weight:400;
color: #333333;
margin-left: 7px;
      }
    }
  }

  .not-verified-layer {
    position: relative;
    width: 410px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding-bottom: 50px;
    padding-top: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .layer__title {
      font-size: 20px;
      font-weight: bold;
      color: $text-strong;
    }

    .layer__row_note {
      color: $text-weak;
      font-size: 16px;
    }
    .layer__row {
      width: 330px;
      display: flex;
      justify-content: space-between;

      .row__label {
        display: inline-block;
        padding-left: 20px;
        color: $text-light;
      }
      .row__status {
        color: $primary;
        cursor: pointer;

        &.done {
          color: #09c989;
          cursor: default;
        }
      }
    }
  }
}
</style>
