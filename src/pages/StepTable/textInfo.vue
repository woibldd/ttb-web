<template>
  <div class="model-container">
    <!--title-->
    <div class="model-it">
      <template v-if="close">
        <div class="action-title">
          {{ $t('otc_otutcol_1') }}
        </div>
        <div
          class="close-inner"
          style="margin-bottom: 100px;">
          <h1 style="margin-top: 30px;font-weight: 400;font-size: 16px;">
            {{ $t('otc_buy_tips_f') }}
          </h1>
          <p style="font-size: 14px;font-weight: 400;margin: 10px 0;color: #999;">
            {{ $t('otc_buy_tips_g') }}
          </p>
          <em>{{ $t('otc_buy_tips_h') }}</em>
        </div>
      </template>
      <template v-else>
        <div
          v-if="textCode !== 3"
          :style="{color: textDetail.side === 1 ? '#23C88B' : '#F24E4D'}"
          class="action-title"
        >
          <!-- {{ textDetail.side | side }} {{ textDetail.currency }} -->
          <!-- {{ $t(textDetail.side ===1 ? 'otc_sideoc_1' : 'otc_sideoc_2')}} -->
          {{ textDetail.side ===1 ? $t('order_side_buy') : $t('order_side_sell') }}{{ textDetail.currency }}
        </div>
        <div
          v-else
          :style="{color: textDetail.side === 1 ? '#23C88B' : '#F24E4D'}"
          class="action-title">
          {{ $t('otc_otutcol_3') }}  {{ $t(textDetail.side === 1 ?this.$t('otc_side_1'):this.$t('otc_side_2') ) }}  {{ $t('otc_otutcol_2') }} {{ textDetail.currency }}
        </div>
      </template>
      <template v-if="!close">
        <div
          v-if="textDetail.side === 2 && textCode === 0 && !textDetail.appeal && !textDetail.text_appeal"
          class="step-tip">
          <div style="width: 90%;margin:0 auto">
            <el-steps :active="textDetail.state">
              <el-step :title="this.$t('otc_buy_step_1')"/>
              <el-step :title="this.$t('otc_sell_step_2')"/>
              <el-step :title="this.$t('otc_sell_step_3')"/>
            </el-steps>
          </div>
        </div>
        <div
          v-if="textDetail.side === 1 && textCode === 0 && !textDetail.appeal && !textDetail.text_appeal"
          class="step-tip">
          <div style="width: 90%;margin:0 auto">
            <el-steps :active="textDetail.state">
              <el-step :title="this.$t('otc_sell_step_1')"/>
              <el-step :title="this.$t('otc_buy_step_2')"/>
              <el-step :title="this.$t('otc_buy_step_3')"/>
              <el-step :title="this.$t('otc_buy_step_4')"/>
            </el-steps>
          </div>
        </div>
        <div
          v-if="textDetail.time && textCode === 0 && !textDetail.appeal && !textDetail.other_appeal"
          class="tips">
          <!--<icon/>-->
          {{ $t('otc_overtime_tips_a1') }} <count-down :terminal="textDetail.time" />’， {{ $t('otc_overtime_tips_a2') }}
          <b v-if="textDetail.side === 1 && textDetail.state === 1">{{ $t('otc_overtime_tips_a3') }}</b>
          <b v-if="textDetail.side === 2 && textDetail.state === 1">{{ $t('otc_overtime_tips_a3') }}</b>
          <b v-if="textDetail.side === 1 && textDetail.state === 2">{{ $t('pay_fangbi') }}</b>
          <b v-if="textDetail.side === 2 && textDetail.state === 2">{{ $t('pay_fangbi') }}</b>
          <b v-if="textDetail.side === 1 && textDetail.state === 7">{{ $t('pay_fangbi') }}</b>
        </div>
        <template v-if="textCode !== 3">
          <div class="table-con">
            <dl>
              <dt>
                <em>{{ $t('otc_transaction_info') }}</em>
                <span
                  v-if="textCode === 0"
                  style="color: #5D82E1">
                  <em
                    v-if="!textDetail.other_appeal"
                    style="color: #FDA22D">
                    {{ state(textDetail.state) }}
                  </em>
                  <em
                    v-else
                    style="color: #FDA22D">{{ $t('otc_seiitm_7') }}

                  </em>
                </span>
              </dt>
              <dd>
                <span>{{ $t('otc_trans_id') }}</span> <em>{{ textDetail.trans_id || '--' }}</em>
              </dd>
              <dd>
                <span>{{ $t('otc_create_time') }}</span><em>
                  <!--{{ textDetail.create_time || '&#45;&#45;' }}-->
                  {{ textDetail.create_time | date('Y-M-D H:m') }}
                </em>
              </dd>
              <dd>
                <span>{{ $t('orders') }}{{ $t('otc_amount_money') }}（{{ textDetail.currency_type }}）</span><em style="color: #FDA22D">{{ textDetail.total || '--' }}</em>
              </dd>
              <dd>
                <span>{{ $t('otc_trans_idjg') }}({{ textDetail.currency_type }})</span><em style="color: #FDA22D">{{ textDetail.price || '--' }}</em>
              </dd>
              <dd>
                <span>{{ textDetail.side === 2 ? $t('otc_side_2') : $t('otc_side_1') }}{{ $t('otc_quantity') }}({{ textDetail.currency }})</span><em>{{ textDetail.amount || '--' }}</em>
              </dd>
              <template v-if="textDetail.otc_collection">
                <template v-if="textDetail.state !== 1 && textDetail.state !== 6 && textDetail.state !== 4">
                  <dd>
                    <span>{{ textDetail.otc_collection.alipay_account ? $t('payment_namezfb') : textDetail.otc_collection.we_chat_account ? $t('payment_weChat_adasunt') : $t('payment_nameyhk') }}</span>
                    <em>{{ textDetail.otc_collection.alipay_account ? textDetail.otc_collection.alipay_account : textDetail.otc_collection.we_chat_account ? textDetail.otc_collection.we_chat_account : textDetail.otc_collection.card_number }}</em>
                  </dd>
                  <dd v-if="textDetail.otc_collection.card_number">
                    <span>{{ $t('otc_otutcol_4') }}</span>
                    <em>{{ textDetail.otc_collection.deposit_bank }}</em>
                  </dd>
                  <dd>
                    <span>{{ textDetail.otc_collection.alipay_account ? $t('payment_namezfb') : textDetail.otc_collection.we_chat_account ? $t('payment_weChat_adasunt') : $t('payment_nameyhk') }}{{ $t('name') }}</span>
                    <em>{{ textDetail.otc_collection.name || '--' }}</em>
                  </dd>
                </template>
              </template>
            </dl>
          </div>
          <div class="table-con">
            <dl>
              <dt>
                <em><b v-html="textDetail.side === 1 ? $t('otc_sideoc_2') : $t('otc_sideoc_1')"/>{{ $t('otc_sideoc_3') }}</em>
              </dt>
              <dd>
                <span><b v-html="textDetail.side === 1 ? $t('otc_sideoc_2') : $t('otc_sideoc_1')"/>{{ $t('otc_sideoc_4') }}</span>
                <em>{{ textDetail.name || '--' }}</em>
              </dd>
              <dd>
                <span>{{ $t('otc_register_time') }}</span>
                <em>{{ processValue('register_time', textDetail) || '--' }}</em>
              </dd>
              <dd>
                <span>{{ $t('otc_kyc_level') }}</span>
                <em style="color: #FDA22D">{{ 'Kyc' + textDetail.kyc_level || '--' }}</em>
              </dd>
              <dd>
                <span>{{ $t('thirty_day_orders') }}</span>
                <em>{{ textDetail.orders_complete || '0' }}</em>
              </dd>
              <dd>
                <span>{{ $t('thirty_day_orders_rate') }}</span>
                <em>{{ textDetail.orders_rate ? (Number(textDetail.orders_rate) * 100).toFixed(2) + '%' : '0%' }}</em>
              </dd>
              <dd>
                <span>{{ $t('issue_time_avg') }}</span>
                <em>{{ processValue('issue_time_avg', textDetail) || '--' }}</em>
              <!--<em>{{textDetail.issue_time_avg || '&#45;&#45;'}}</em>-->
              </dd>
              <dd>
                <span><b v-html="textDetail.side === 1 ? $t('otc_sideoc_2') : $t('otc_sideoc_1')"/>{{ $t('otc_sideoc_5') }}</span>
                <em>{{ textDetail.remark || '--' }}</em>
              </dd>
            </dl>
          </div>
          <div
            v-if="textDetail.side === 1 && textDetail.state === 1 && textCode === 0 && !textDetail.appeal && !textDetail.other_appeal"
            class="table-con"> 
            <dd>
              <span>{{ $t('otc_payment_method') }}</span>
              <em>
                <el-form
                  ref="form"
                  :model="form"
                  label-width="10px">
                  <el-form-item>
                    <el-select
                      :placeholder="this.$t('please_choose')"
                      v-model="form.bankId"
                      size="small"
                      style="width: 100%;"
                      @change="bankHandle">
                      <el-option
                        v-for="(item, index) in bankData"
                        :key="index"
                        :label="item.deposit_bank "
                        :value="item.collection_id"/>
                        <!-- :label="$t(payName(item.payment_type).text) + item.deposit_bank" -->
                    </el-select>
                  </el-form-item>
                </el-form>
              </em>
            </dd>
            <template v-if="changeFlag">
              <!-- <dd>
                <span>{{ $t('otc_otutcol_5') }}</span>
                <em>{{ $t(payName(activeItem.a_t).text) }}</em>
              </dd> -->
              <dd v-if="activeItem.a_t !== 1">
                <span>{{ $t('otc_otutcol_6') }}</span>
                <em>{{ activeItem.account }}</em>
              </dd>
              <dd v-else>
                <span>{{ $t('payment_card_number') }}</span>
                <em>{{ activeItem.account }}</em>
              </dd>
              <dd v-if="activeItem.name">
                <span>{{ $t('otc_otutcol_7') }}</span>
                <em>{{ activeItem.name }}</em>
              </dd>
              <dd v-if="activeItem.img">
                <span>{{ $t('otc_otutcol_8') }}</span>
                <em>
                  <!-- <img
                    :src="activeItem.img"
                    alt=""
                    style="width: 60px;height: 60px;zoom: 1"> -->
                  <span
                    style="cursor: pointer;"
                    @click="openQR(activeItem.img)">
                    <icon name="qrcode" />
                  </span>
                </em>
              </dd>
              <dd v-if="activeItem.a_t===1">
                <span>{{ $t('payment_deposit_bank') }}</span>
                <em>{{ activeItem.bank }}</em>
              </dd>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="table-con">
            <dl>
              <dt>
                <em>{{ $t('otc_order_info') }}</em>
              </dt>
              <dd>
                <span>{{ $t('order_th_type') }}</span> <em>{{ textDetail.type === 1 ? this.$t('otc_fixed_price') : this.$t('otc_float_price') }}</em>
              </dd>
              <dd>
                <span>{{ $t('fees_name') }}</span><em>{{ textDetail.currency }}</em>
              </dd>
              <dd>
                <span>{{ $t('otc_trans_idjg') }}({{ textDetail.currency_type }})</span><em style="color: #FDA22D">{{ textDetail.price || '--' }}</em>
              </dd>
              <dd>
                <span>{{ $t('otc_amount', {currency: textDetail.currency }) }}</span><em>{{ textDetail.amount || '--' }}</em>
              </dd>
              <dd>
                <span>{{ $t('otc_ziurec_19') }}({{ textDetail.currency_type }})</span><em>{{ $big(textDetail.amount || 0).times(textDetail.price || 0) || '--' }}</em>
              </dd>
              <dd>
                <span>{{ $t('otc.right_bar.order_fee', {currency: textDetail.currency}) }}</span>
                <em>{{ $t('otc_ziurec_16') }} </em>
                <!-- <em>{{ textDetail.fee }} </em> -->
              </dd>
              <dd>
                <span>{{ $t('otc.right_bar.order_fee', {currency: textDetail.currency}) }}</span><em>{{ textDetail.fee }}</em>
              </dd>
              <dd>
                <span>{{ $t('otc_opponent_kyc_level') }}</span><em style="color: #FDA22D">{{ 'KYC' + textDetail.kyc_level || '--' }}</em>
              </dd>
            </dl>
          </div>
          <!--已完成-->
          <template v-if="textDetail.state === 3 && textDetail.state === 6">
            <div class="table-con">
              <dl>
                <dt>
                  <em><b v-html="textDetail.side === 1 ? this.$t('otc_sideoc_2') : this.$t('otc_sideoc_1') "/>{{ $t('otc_sideoc_3') }}</em>
                </dt>
                <dd>
                  <span><b v-html="textDetail.side === 1 ? this.$t('otc_sideoc_2') : this.$t('otc_sideoc_1') "/>{{ $t('otc_sideoc_4') }}</span>
                  <em v-if="textCode === 0">{{ textDetail.name || '--' }}</em>
                  <em v-else>{{ textDetail.other_name || '--' }}</em>
                </dd>
                <dd>
                  <span>{{ $t('otc_register_time') }}</span>
                  <em>{{ processValue('register_time', textDetail) || '--' }}</em>
                </dd>
                <dd>
                  <span>{{ $t('otc_kyc_level') }}</span>
                  <em>{{ textDetail.kyc_level || '--' }}</em>
                </dd>
                <dd>
                  <span>{{ $t('thirty_day_orders') }}</span>
                  <em>{{ textDetail.orders_complete || '0' }}</em>
                </dd>
                <dd>
                  <span>{{ $t('thirty_day_orders_rate') }}</span>
                  <em>{{ textDetail.orders_rate ? (Number(textDetail.orders_rate) * 100).toFixed(2) + '%' : '0%' }}</em>
                </dd>
                <dd>
                  <span>{{ $t('issue_time_avg') }}</span>
                  <em>{{ processValue('issue_time_avg', textDetail) || '--' }}</em>
                <!--<em>{{textDetail.issue_time_avg || '&#45;&#45;'}}</em>-->
                </dd>
                <dd>
                  <span><b v-html="textDetail.side === 1 ?this.$t('otc_sideoc_2'):this.$t('otc_sideoc_1')"/>{{ $t('otc_sideoc_5') }}</span>
                  <em>{{ textDetail.remark || '--' }}</em>
                </dd>
                <template v-if="textDetail.state !== 1 && textDetail.state !== 6 && textDetail.state !== 4">
                  <dd>
                    <span>{{ textDetail.otc_collection.alipay_account ? $t('payment_namezfb') : textDetail.otc_collection.we_chat_account ? $t('payment_weChat_adasunt') : $t('payment_nameyhk') }}</span>
                    <em>{{ textDetail.otc_collection.alipay_account ? textDetail.otc_collection.alipay_account : textDetail.otc_collection.we_chat_account ? textDetail.otc_collection.alipay_account : textDetail.otc_collection.card_number }}</em>
                  </dd>
                  <dd v-if="textDetail.otc_collection.card_number">
                    <span>{{ $t('otc_otutcol_4') }}</span>
                    <em>{{ textDetail.otc_collection.deposit_bank }}</em>
                  </dd>
                  <dd>
                    <span>{{ textDetail.otc_collection.alipay_account ? $t('payment_namezfb') : textDetail.otc_collection.we_chat_account ? $t('payment_weChat_adasunt') : $t('payment_nameyhk') }}{{ $t('payment_name') }}</span>
                    <em>{{ textDetail.otc_collection.name || '--' }}</em>
                  </dd>
                <!--<template v-if="textDetail.side === 1 && textDetail.state === 1 && textCode === 0">-->
                <!--<dd>-->
                <!--<span>银行卡</span>-->
                <!--<em>-->
                <!--<el-select size="small" placeholder="请选择" v-model="form.bankId" @change="bankHandle">-->
                <!--<el-option v-for="(item, index) in bankData" :key="index" :label="item.deposit_bank" :value="item.collection_id"></el-option>-->
                <!--</el-select>-->
                <!--</em>-->
                <!--</dd>-->
                <!--<template v-if="changeFlag">-->
                <!--<dd>-->
                <!--<span></span>-->
                <!--</dd>-->
                <!--</template>-->
                <!--</template>-->
                </template>
              </dl>
            </div>
          </template>
        </template>
      </template>
      <div
        v-if="textDetail.side === 2 && textDetail.state === 2 && textDetail.state !== 7 && !textDetail.appeal && textCode === 0 && !textDetail.other_appeal"
        class="tips">{{ $t('otc_sell_tips_k') }}</div>
      <div
        v-if="textDetail.side === 1 && textDetail.state === 1 && textCode === 0 && !close && !textDetail.appeal && !textDetail.other_appeal"
        class="tips1">
        <div class="tips-con">
          <p>{{ $t('otc_buy_tips_a') }}</p>
          <ul>
            <li>
              <b>{{ $t('otc_buy_tips_b') }}</b>
            </li>
            <li>
              {{ $t('otc_buy_tips_c') }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      :class="{stepActive: stepActive}"
      class="step-btn">
      <p
        v-if="textDetail.side === 1 && textDetail.state === 1 && textCode === 0 && !close && !textDetail.appeal && !textDetail.other_appeal"
        style="color: #999;font-size: 13px;line-height: 24px;padding: 8px 0;margin-bottom: 10px;">{{ $t('otc_buy_tips_j') }}</p>
      <a
        v-if="textCode === 0 && !textDetail.appeal && !textDetail.other_appeal && textDetail.side === 1 && textDetail.state === 1"
        href="javascript:;"
        class="close_btn"
        @click="closeHandle">{{ $t('otc_close') }}</a>
      <a
        v-if="textCode === 0 && !textDetail.appeal && !textDetail.other_appeal && textDetail.side === 2 && textDetail.state === 2"
        href="javascript:;"
        class="close_btn"
        @click="closeHandle">{{ $t('otc_close') }}</a>
      <a
        v-if="textCode === 0 && !textDetail.appeal && !textDetail.other_appeal && textDetail.side === 2 && textDetail.state === 7"
        href="javascript:;"
        class="close_btn"
        @click="closeHandle">{{ $t('otc_close') }}</a>
      <template v-if="close">
        <a
          href="javascript:;"
          class="btn_t"
          @click="stepHandle('close')">{{ $t('otc_overtime_tips_a3') }}</a>
      </template>
      <template v-else>
        <template v-if="textDetail.side === 1 && textDetail.state === 1 && textCode === 0 && !textDetail.appeal && !textDetail.other_appeal">
          <!--<div class="tips">付款完成后请及时点击“已付款”按钮，本平台不提供自动扣款， 请自行付款！</div>-->
          <a
            href="javascript:;"
            class="btn_t"
            @click="stepHandle('money')">{{ $t('otc_already_paid') }}</a>
        </template>
        <template v-if="textDetail.side === 2 && textDetail.state === 2 && !textDetail.appeal && !textDetail.other_appeal && textCode === 0">
          <!--<div class="tips">确认收到买家付款后请及时点击【确认放币】，否则请勿点击</div>-->
          <a
            href="javascript:;"
            class="btn_t"
            @click="stepHandle('down')">{{ $t('otc_confirm_issued') }}</a>
        </template>
        <template v-if="textDetail.side === 2 && textDetail.state === 7 && !textDetail.appeal && !textDetail.other_appeal && textCode === 0">
          <!--<div class="tips">确认收到买家付款后请及时点击【确认放币】，否则请勿点击</div>-->
          <a
            href="javascript:;"
            class="btn_t"
            @click="stepHandle('down')">{{ $t('otc_confirm_issued') }}</a>
        </template>
        <!--<template v-if="textDetail.side === 2  && textCode === 0">-->
        <!--<a href="javascript:;" class="btn_t" @click="stepHandle('down')">我已放币</a>-->
        <!--</template>-->
      </template>
    </div>
    <v-modal :open.sync="showQRcode">
      <div class="qr" >
        <img
          :src="qrsrc"
          style="max-height:600px;">
      </div>
    </v-modal>
  </div>
</template>

<script type="text/ecmascript-6">
import { tradeMixins } from './mixins'
import countDown from '@/components/CountDown'
import processValue from '@/mixins/process-otc-value.js' 
export default {
  components: {
    countDown
  },
  filters: {
    formatBankNumber(bankNumber) {
      return bankNumber.substr(0, 4) + '****' + bankNumber.substr(-4)
    },
    otherCount(e) {
      return e.substr(0, 3) + '****'
    }
  },
  mixins: [tradeMixins, processValue],
  // eslint-disable-next-line vue/require-prop-types
  props: ['textDetail', 'bankData', 'textCode', 'close', 'stepActive', 'bankId'],
  data() {
    return {
      changeFlag: false,
      form: {
        bankId: '',
        activeItem: {}
      },
      qrsrc: '',
      activeItem: {},
      showQRcode: false
    }
  },
  watch: {
    bankData() {
      if (this.bankId) {
        this.form.bankId = this.bankId
        this.bankHandle()
      } else if (this.bankData && this.bankData.length > 0) {
        const arr = this.bankData.filter(arg => arg.obj.payment_type === 1)
        if (arr.length > 0) {
          this.form.bankId = arr[0].collection_id
        }
        this.bankHandle()
      }
    }
  },
  methods: {
    openQR(collection_img) {
      // console.log(collection_img)
      this.qrsrc = collection_img
      this.showQRcode = true
    },
    stepHandle(type) {
      this.$emit('step-change', type)
    },
    closeHandle() {
      this.$emit('close-change')
    },
    payName(type) {
      return {
        1: { text: 'payment_nameyhk', account: 'card_number' },
        2: { text: 'payment_namezfb', account: 'alipay_account' },
        3: { text: 'payment_weChat_adasunt', account: 'we_chat_account' },
        4: { text: 'Paynow', account: 'card_number' },
        5: { text: 'Paylah', account: 'card_number' }
      }[type]
    },
    bankHandle() {
      this.changeFlag = true
      this.activeItem = {}
      if (this.bankData.length > 0) {
        this.bankData.forEach((item) => {
          if (this.form.bankId === item.collection_id) {  
            const payType = this.payName(item.obj.payment_type).text
            const payAccount = item.obj[this.payName(item.obj.payment_type).account]
            this.activeItem = {
              name: item.obj.name,
              img: item.obj.collection_img,
              type: payType,
              a_t: item.obj.payment_type,
              account: payAccount,
              bank: item.obj.deposit_bank
            }
          }
        })
      }
      this.$emit('bank-change', this.form.bankId)
    }
  } 
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "./assets/scss/trade.scss";
  .el-form-item {
    margin-bottom: 0!important;
  }
  .action-title {
    font-size: 18px;
    font-weight: bold;
  }
  .tips1 {
    background: rgba(253,162,45,.1);
    border-radius: 4px;
    padding: 10px 30px;
    font-size: 12px;
  }
</style>
