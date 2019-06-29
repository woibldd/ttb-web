<template>
  <div class="otcaction">
    <!-- 吃单 -->
    <div
      class="action-box"
      :class="{'status_0': status === 0, 'status_2': status > 0}"
    >
      <!-- 标题 -->
      <div class="action-title title buy">{{ $t(sideTitle, {currency}) }}</div>
      <div v-if="option===0">
        <!-- 步骤图 -->
        <div class="action-steps">
          <div
            v-if="operSide===1"
            class="buy-step">
            <el-steps
              :space="200"
              :active="step"
              finish-status="success"
              align-center>
              <el-step :title="$t('otc_buy_step_1')"/>
              <el-step :title="$t('otc_buy_step_2')"/>
              <el-step :title="$t('otc_buy_step_3')"/>
              <el-step :title="$t('otc_buy_step_4')"/>
            </el-steps>
          </div>
        </div>
        <!-- 倒计时 -->
        <div
          v-if="step===2"
          class="message count-down">
          <!-- 倒计时 -->
          <icon name="timer" />
          {{ $t('otc_overtime_tips_a1') }}
          <count-down :terminal="interval" />，
          {{ $t('otc_overtime_tips_a2') }}{{$t('otc_overtime_tips_a3')}}
        </div>
        <!-- 委托单信息 -->
        <div
          v-if="step<2"
          class="action-order-info wrap">
          <v-list
            :header="dataHeader"
            :table="view"
            viewtype="order"
          />
        </div>
        <!-- 订单信息 -->
        <div
          v-if="step===2"
          class="action-order-info wrap">
          <v-list
            :header="tranHeader2"
            :table="tranTable2"
            viewtype="transaction"/>
        </div>
        <!-- 对手信息 -->
        <div
          v-if="step<=2"
          class="action-seller-info wrap">
          <v-list
            :header="userInfoHeader"
            :table="view"
            viewtype=""
          />
        </div>
        <!-- 支付方式 -->
        <div
          v-if="step===2"
          class="action-payment-info wrap">
          <div class="v-list-container">
            <table>
              <tr>
                <td style="width:170px;">{{ $t('otc_payment_method') }}</td>
                <td>
                  <el-select
                    v-model="selectPayment"
                    @change="changePayType"
                    default-first-option
                    value-key="collection_id">
                    <el-option
                      v-for="(item,index) in paylist"
                      :key="index"
                      :label="processValue('payment_type', item)"
                      :value="item"/>
                  </el-select>
                </td>
              </tr>
              <tbody >
                <tr
                  v-for='(item, index) in paymentHeaderList[selectPayment.payment_type]'
                  :key='index'>
                  <td>{{ $t(item.text) }}</td>
                  <td>

                    <span
                      style="cursor: pointer;"
                      v-if="item.key==='collection_img'"
                      @click="openQR(selectPayment)">
                      <icon name="qrcode" />
                    </span>
                    <!-- <img
                      v-if="item.key==='collection_img'"
                      :src="processValue(item.key, selectPayment)"
                      alt=""
                      srcset=""
                      style="max-height:100px;vertical-align:top;"
                      @click="openQR(selectPayment)"
                    > -->
                    <span v-else>{{ processValue(item.key, selectPayment) }}</span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
        <div
          v-if="step===2"
          class="message warp">
          <div
            class="title"
            style="font-size:14px;" >
            <icon
              style="color:#F5A623;"
              name='information' />
            <!-- 注意 -->
            <span>{{ $t('otc_buy_tips_a') }}</span>
          </div>
          <div class="content">
            <ul style="font-size: 14px;list-style-type: disc;padding-left: 20px;" >
              <li ><span v-html="$t('otc_buy_tips_b')"/></li>
              <li><span v-html="$t('otc_buy_tips_c')"/></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 提醒 -->
      <div
        v-if="step===2 && option===1"
        class="action-notice wrap">
        <ul>
          <li style="color:rgba(102,102,102,1);font-size: 14px;line-height: 30px;">{{ $t('otc_buy_tips_d') }}</li>
          <li style="color:rgba(102,102,102,1);font-size: 14px;line-height: 30px;">{{ $t('otc_buy_tips_e') }}</li>
        </ul>
      </div>
      <div
        v-if="step===2 && option===2"
        class="action-notice wrap">
        <ul>
          <li>{{ $t('otc_buy_tips_f') }}</li>
          <li>{{ $t('otc_buy_tips_g') }}</li>
          <li>{{ $t('otc_buy_tips_h') }}</li>
        </ul>
      </div>
    </div>
    <!-- 操作部分 -->
    <div 
class="action-order footer"
         :class="{'status_2': status > 0}"
    >
      <!-- 输入框 -->
      <div
        v-if="step<1"
        class="action-input-group">
        <ul>
          <li>
            <div class="label">
              {{ $t('amount') }}
              <span class="red">*</span>
            </div>
            <div class="content">
              <number-input  
                class="number-input"
                v-model="amount"
                @input="amountInput"
                @blur="changeTarget('')"
                @focus="changeTarget('amount')"
                :scale="symbolInfo.amount_scale || 6"
                :placeholder="$t('amount')"
              />
             
              <span
                class="btn-all"
                @click="inputAll">{{ $t('input_all') }}</span>
            </div>
          </li>
          <li>
            <div class="label">
              {{ $t('otc_amount_money') }}
              <span class="red">*</span>
            </div>
            <div class="content">
              <number-input
                class="number-input"
                v-model="total"
                @input="totalInput"
                @blur="changeTarget('')"
                @focus="changeTarget('total')"
                :scale="symbolInfo.price_scale || 2"
                :placeholder="$t('otc_purchase_amount')"
              />
              <span
                class="btn-all"
                @click="inputAll"
              >{{ $t('input_all') }}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 按钮 -->
      <div class="action-button-group">
        <div v-if="step<1">
          <div class="btn-left">
            <v-btn
              class="w-110 cancel"
              radius="3"
              height="30"
              @click="closeSideBar"
              :label="$t('cancel')"
            />
          </div>
          <div class="btn-left">
            <v-btn
              class="w-208 buy"
              radius="3"
              height="30"
              @click="createTransaction"
              :label="$t('otc_confirm_buy')"
            />
          </div>
        </div>
        <div v-else-if="step ===2 && option===0">
          <div class="btn-left">
            <v-btn
              class="w-110 cancel"
              radius="3"
              height="30"
              @click="revokeOrder"
              :label="$t('otc_cancel_order')"
            />
          </div>
          <div class="btn-left">
            <v-btn
              class="w-208 pay"
              radius="3"
              height="30"
              @click="paymentDone"
              :label="$t('otc_already_paid')"
            />
          </div>
        </div>
        <div v-else-if="step===2 && option===1 ">
          <div class="bottom"
               style="    background: #EDF6FF;color: #5D82E1;font-size: 12px;padding: 8px;border-radius: 4px;margin-top: -30px!important;margin-bottom: 10px;">
            <icon name="timer" style="font-size: 12px!important;vertical-align: middle;" />
            {{ $t('otc_overtime_tips_a1') }}
            <count-down :terminal="interval" />，
            {{ $t('otc_overtime_tips_a2') }}{{$t('cancel')}}
          </div>
          <div class="btn-left">
            <v-btn
              class="w-110 cancel"
              radius="3"
              height="30"
              @click="cancelOption"
              :label="$t('otc_close')"
            />
          </div>
          <div class="btn-left">
            <v-btn
              class="w-208 pay"
              radius="3"
              height="30"
              @click="paymentDone"
              :label="$t('otc_already_paid')"
            />
          </div>
        </div>
        <div v-else-if="step===2 && option===2 ">
          <div class="btn-left">
            <v-btn
              class="w-110 cancel"
              radius="3"
              height="30"
              @click="cancelOption"
              :label="$t('otc_close')"
            />
          </div>
          <div class="btn-left">
            <v-btn
              class="w-208 buy"
              radius="3"
              height="30"
              @click="revokeOrder"
              :label="$t('otc_confirm_cancel')"
            />
          </div>
        </div>
      </div>
    </div>
    <v-modal :open.sync="showQRcode">
      <div class="qr" >
        <img
          :src="qrsrc"
          alt=""
          style="max-height:600px;">
      </div>
    </v-modal>
  </div>
</template>

<script>
import vList from '@/components/OTC/vlist/vertical-table'
import service from '@/modules/service.js'
import processValue from '@/mixins/process-otc-value'
import utils from '@/modules/utils.js'
import countDown from '@/components/CountDown'
import { state } from '@/modules/store'

const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')

export default {
  data () {
    return {
      price: '',
      amount: '',
      total: '',
      order_amount: 0,
      active_id: 0,
      trans_id: 0,
      operation: 2, // 操作 1: 买/卖, 2: 发布委托
      operSide: 1, // 操作类型 1: 买 ,2: 卖
      step: 0, // 步骤, 根据操作 和 类型 的不同,展示不同的结果
      option: 0, // 操作 1：我已付款  2：确认取消
      selectPayment: {},
      selectItem: {},
      qrReady: true,
      interval: 0,
      collection_id: 0,
      status: 0,
      state,
      qrsrc: '',
      showQRcode: false,
      dataHeader: {
        name: 'otc_order_info', // "委托单信息",
        count: 0,
        headers: [
          {
            title: 'active_id', // 委托单号
            text: 'otc_active_id',
            width: '',
            key: 'active_id'
          },
          {
            title: 'quota', // 单笔限额
            text: 'otc_quota',
            width: '',
            key: 'quota'
          },
          {
            title: 'currency', // 币种
            text: 'otc_currency',
            width: '',
            key: 'currency'
          },
          {
            title: 'price', // 单价(CNY)
            text: 'otc_price',
            width: '',
            key: 'price'
          },
          {
            title: 'total', // 总金额(CNY)
            text: 'otc_total',
            width: '',
            key: 'total'
          },
          {
            title: 'amount', // 数量(BTC)
            text: 'otc_amount',
            width: '',
            key: 'amount'
          }
        ]
      },
      dataTable: {
      },
      tranHeader2: {
        name: 'otc_transaction_info',
        count: 0,
        headers: [
          {
            title: 'trans_id', // 订单号
            text: 'otc_trans_id',
            width: '',
            key: 'trans_id'
          },
          {
            title: 'create_time', // 下单时间
            text: 'otc_create_time',
            width: '',
            key: 'create_time'
          },
          {
            title: 'total', // 订单金额(CNY)
            text: 'otc_total',
            width: '',
            key: 'total'
          },
          {
            title: 'price', // 单价(CNY)
            text: 'otc_price',
            width: '',
            key: 'price'
          },
          {
            title: 'amount', // 数量(BTC)
            text: 'otc_amount',
            width: '',
            key: 'amount'
          }]
      },
      tranTable2: {},
      userInfoHeader: {
        name: 'otc_opponent_info', // "对手信息",
        count: 0,
        headers: [
          {
            title: 'name', // 卖家姓名
            text: 'otc_seller_name',
            width: '',
            key: 'name'
          },
          {
            title: 'register_time', // 注册时间
            text: 'otc_register_time',
            width: '',
            key: 'register_time'
          },
          {
            title: 'kyc_level', // 认证等级
            text: 'otc_kyc_level',
            width: '',
            key: 'kyc_level'
          },
          {
            title: 'thirty_day_orders', // 成交单数
            text: 'thirty_day_orders',
            width: '',
            key: 'thirty_day_orders'
          },
          {
            title: 'thirty_day_orders_rate', // 完成率
            text: 'thirty_day_orders_rate',
            width: '',
            key: 'thirty_day_orders_rate'
          },
          {
            title: 'issue_time_avg', // 平均放币时间：
            text: 'issue_time_avg',
            width: '',
            key: 'issue_time_avg'
          },
          {
            title: 'remark', // 卖家提示
            text: 'otc_remark',
            width: '',
            key: 'remark'
          }
        ]
      },
      userInfoTable: {
      },
      paymentHeaderList: {
        // 银行卡
        1: [
          {
            title: 'name', // 姓名
            text: 'payment_name',
            width: '',
            key: 'name'
          },
          {
            title: 'card_number', // 银行卡号
            text: 'payment_card_number',
            width: '',
            key: 'card_number'
          },
          {
            title: 'deposit_bank', // 开卡行
            text: 'payment_deposit_bank',
            width: '',
            key: 'deposit_bank'
          }
        ],
        // 支付宝
        2: [
          {
            title: 'alipay_account', // 支付宝账号
            text: 'payment_alipay_account',
            width: '',
            key: 'alipay_account'
          },
          {
            title: 'collection_img', // 收款二维码
            text: 'payment_collection_img',
            width: '',
            key: 'collection_img'
          }
        ],
        // 微信
        3: [
          {
            title: 'we_chat_account', // 微信账号
            text: 'payment_weChat_account',
            width: '',
            key: 'we_chat_account'
          },
          {
            title: 'collection_img', // 收款二维码
            text: 'payment_collection_img',
            width: '',
            key: 'collection_img'
          }
        ]
      },
      paylist: [],
      paymentInfo: [],
      inputTarget: ''
    }
  },
  computed: {
    currency: {
      get () {
        return this.state.otc.currency
      }
    },
    symbolInfo () {
      return this.state.otc.symbolInfo
    },
    sideTitle () {
      let title = ''
      if (this.option === 0) {
        // title = `购买${this.currency}`
        title = `otc_buy_currency`
      } else if (this.option === 1) {
        title = `otc_confirm_payment` // `确认支付`
      } else if (this.option === 2) {
        title = `otc_confirm_cancel` // `确认取消`
      }
      return title
    },
    isLogin () {
      return state.userInfo !== null
    }
  },
  components: {
    vList,
    countDown
  },
  methods: {
    openSideBar () {
      // this.show = true;
    },
    openQR (pay) {
      this.qrsrc = pay.collection_img
      this.showQRcode = true
    },
    closeSideBar () {
      // this.show = false;
      this.$emit('closeSideBar')
    },
    createTransaction () {
      if (!this.isLogin) {
        this.$router.push({
          name: 'login'
        })
        return
      }

      if (!this.active_id && !this.view.active_id) { return }

      if (!this.active_id || this.active_id < 0) {
        this.active_id = this.view.active_id
        this.price = this.view.price
      }
      let params = {
        active_id: this.active_id,
        side: 1,
        amount: this.amount * 1,
        total: this.total
      }
      let $this = this
      service.createOtcTransaction(params).then(res => {
        if (!res.code) {
          $this.active_id = res.data.active_id
          $this.trans_id = res.data.trans_id
          $this.interval = res.data.create_time + 15 * 60 * 1000
          $this.status = res.data.state
          $this.step = 2

          $this.tranTable2 = res.data
          $this.getOrderInfo(res.data.trans_id)
          this.$eh.$emit('otc:assets:balance')
          // this.step = 2
          // this.getCllectionList()//获取卖家收款方式
        } else if (res.message) {
          utils.alert(res.message)
        }
      })
    },
    // 获取成交单详情
    getOrderInfo (trans_id) {
      if (!trans_id) {
        return
      }
      let params = {
        trans_id
      }
      service.getOtcOrderInfo(params).then(res => {
        this.paylist = res.data.otc_collection_list
        if (this.paylist.length > 0) {
          let arr = this.paylist.filter(arg => arg.payment_type === 1)
          if (arr.length > 0) {
            this.selectPayment = arr[0]
          }
        }
      })
    },
    removefill () {
      if (this.active_id <= 0) {}
    },
    amountInput () {
      // console.log(this.view)
      if (!this.amount || this.amount == '') {
        this.total = ''
      } else {
        if (this.$big(this.amount).gt(this.$big(this.view.amount).minus(this.view.freezed))) {
          this.inputAll()
        } else {
          let total = this.$big(this.view.price).mul(this.amount).round(2, 3)
          if (this.inputTarget === 'amount') {
            if (this.total != total) {
              this.total = total
            }
          }
        }
      }
    },
    totalInput () {
      if (!this.total || this.total == '') {
        this.amount = ''
      } else {
        let amount = this.$big(this.total).div(this.view.price).round(this.symbolInfo.amount_scale, 0)
        if (this.inputTarget === 'total') {
          if (this.amount != amount) {
            this.amount = amount
          }
        }
      }
    },
    inputAll () {
      this.amount = this.$big(this.view.amount).minus(this.view.freezed)
      this.total = this.$big(this.view.price).mul(this.amount)
    },
    // 撤销成交单
    revokeOrder () {
      // 先切换到提示信息
      if (this.option !== 2) {
        this.option = 2
        return
      }
      let params = {
        type: 2,
        trans_id: this.trans_id
      }
      service.otcOrderRemove(params)
      this.option = 0
      this.status = 0
      this.step = 0
      this.$emit('closeSide')
    },
    paymentDone () {
      if (!this.selectPayment || !this.selectPayment.collection_id) {
        utils.alert(this.$t('otc_buy_tips_i'))
        return
      }
      // 先切换到提示信息
      if (this.option !== 1) {
        this.option = 1
        return
      }
      let params = {
        trans_id: this.trans_id,
        collection_id: this.selectPayment.collection_id
      }
      service.otcOrderPaymentDone(params).then(res => {
        if (!res.code) {
          utils.success(this.$t('otc_seiitm_16'))
          this.option = 0
          this.show = false
          this.$emit('closeSide')
          this.$router.push('/OTC/Hir')
        } else {
          utils.alert(res.message)
        }
      })
    },
    cancelOption () {
      this.option = 0
      this.status = 0
    },
    getCllectionList () {
      let params = {
        currency: 'CNY' // 目前只有CNY, 先写死
      }
      service.getOtcCollection(params).then(res => {
        if (!res.code) {
          this.paylist = res.data
        }
      })
    },
    changePayType (e) {
      console.log(e)
    },
    async setQr (url) {
      const QRCode = await qrcode()
      QRCode.toCanvas(
        this.$refs.qr,
        url,
        {
          margin: 0,
          width: 140,
          height: 140,
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
    changeTarget (target) {
      this.inputTarget = target
    }
  },
  props: {
    view: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  created () {
  },
  watch: {
    show () {
      this.total = ''
      this.amount = ''
      this.active_id = 0
      this.trans_id = ''
      this.status = 0
      this.step = 0 // 步骤  根据操作 和 类型 的不同 展示不同的结果
      this.option = 0 //
      if (this.show === true) {
        this.active_id = this.view.active_id
        this.price = this.view.price
      } else if (this.show === false) {
        this.view = {}
      }
    },
    status () {
      if (this.status === 0) {
        this.step = 0
      } else if (this.status === 1) {
        this.step = 2
      } else if (this.status === 2) {
        this.step = 3
      } else {
        this.step = 4
      }
    }
  },
  mixins: [
    processValue
  ]

}
</script>

<style lang='scss'>
  .otcaction {
    height: 100%;
    .action-box {
      &.status_0 {
        height: calc(100% - 230px);
      }
      &.status_2 {
        height: calc(100% - 160px);
      }
      overflow: scroll;
    }
    .action-order{
      &.footer {
        z-index: 99999;
        height: 180px;
        &.status_2 {
          height:110px;
        }
      }
    }
    b {
      color:#FDA22D;
    }
  }
  // 购买BTC行高
  .entrust-order-container .otcaction .wrap table tr{
    line-height: 25px;
  }
  // 修改字体大小
  .el-step__title.is-process{
    font-size: 14px;
  }
  .el-step__title.is-wait{
    font-size: 14px;
  }
  .el-step__title.is-success{
    font-size: 14px;

  }

</style>
