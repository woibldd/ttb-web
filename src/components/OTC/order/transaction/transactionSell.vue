
<template>
  <div class="otcaction">
    <!-- 吃单 -->
    <div
      v-if="operation===1" :class="{'status_0': status === 0, 'status_1': status > 0}"
      class="action-box"
    >
      <!-- 标题 -->
      <div class="action-title title sell">{{ $t(sideTitle, {currency}) }}</div>
      <!-- 步骤图 -->
      <div class="action-steps">
        <div v-if="operSide===2" class="sell-step">
          <el-steps :space="200" :active="step" finish-status="success" align-center>
            <el-step :title="$t('otc_sell_step_1')"/>
            <el-step :title="$t('otc_sell_step_2')"/>
            <el-step :title="$t('otc_sell_step_3')"/>
          </el-steps>
        </div>
      </div>
      <!-- 倒计时 -->
      <!-- <count-down :terminal='timeEnd' /> -->
      <div v-if="step===1" class="message count-down">
        <!-- <span class="iconfont">&#xe72c;</span> -->
        <!-- 倒计时 -->
        <icon name="timer" />
        {{ $t('otc_overtime_tips_a1') }}
        <count-down :terminal="interval" />，
        {{ $t('otc_overtime_tips_a2') }}取消订单
      </div>
      <!-- 订单信息 -->
      <div v-if="step===0" class="action-order-info wrap">
        <v-list :header="dataHeader" :table="view" viewtype="order"/>
      </div>
      <div v-if="step===1" class="action-order-info wrap">
        <v-list :header="tranHeader" :table="tranTable" viewtype="transaction"/>
      </div>
      <!-- 对手信息 -->
      <div v-if="step<=2" class="action-seller-info wrap">
        <v-list :header="userInfoHeader" :table="view" viewtype=""/>
      </div>
    </div>
    <!-- 操作部分 -->
    <div v-if="step<1" class="action-order footer">
      <!-- 输入框 -->
      <div class="action-input-group">
        <ul>
          <li>
            <div class="label">
              {{ $t('otc_quantity') }}
              <span class="red">*</span>
            </div>
            <div class="content">
              <number-input
                v-model="amount"
                :scale="amount_scale || 6"
                :placeholder="$t('otc_quantity')"
                class="number-input"
                @input="amountInput"
                @blur="changeTarget('')"
                @focus="changeTarget('amount')"
              />
              <span
                class="btn-all"
                @click="inputAll('amount')">{{ $t('input_all') }}</span>
            </div>
          </li>
          <li>
            <div class="label">
              {{ $t('otc_amount_money') }}
              <span class="red">*</span>
            </div>
            <div class="content">
              <number-input
                v-model="total"
                :scale="price_scale || 2"
                :placeholder="$t('otc_amount_sale')"
                class="number-input"
                @input="totalInput"
                @blur="changeTarget('')"
                @focus="changeTarget('total')"
              />
              <span
                class="btn-all"
                @click="inputAll('total')"
              >{{ $t('input_all') }}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 按钮 -->
      <div class="action-button-group">
        <!--卖-->
        <div v-if="step<1">
          <div class="btn-left">
            <v-btn
              :label="$t('cancel')"
              class="w-110 cancel"
              radius="3"
              height="30"
              @click="closeSideBar"
            />
          </div>
          <div class="btn-left">
            <v-btn
              :label="$t('otc_confirm_sell')"
              class="w-208 sell"
              radius="3"
              height="30"
              @click="createTransaction"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vList from '@/components/OTC/vlist/vertical-table'
import service from '@/modules/service.js'
import countDown from '@/components/CountDown'
import processValue from '@/mixins/process-otc-value'
import { state } from '@/modules/store'
import utils from '@/modules/utils.js'
import otcComputed from '@/components/OTC/mixins/index.js'

export default {
  components: {
    vList,
    countDown
  },
  mixins: [processValue, otcComputed],
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
  data() {
    return {
      price: '',
      amount: '',
      total: '',
      active_id: 0,
      trans_id: '',
      status: 0, // 1-等待对方付款 2-等待放币 3-已完成 4-买家取消 5-卖家取消 6买家超时取消 7卖家超时取消
      state,
      operation: 1, // 操作 1: 买/卖, 2: 发布委托
      operSide: 2, // 操作类型 1: 买 ,2: 卖
      step: 0, // 步骤, 根据操作 和 类型 的不同,展示不同的结果
      // timeEnd:  new Date(new Date() * 1 + 1000 * 60 * 20),// this.$moment().add(6,'minutes'),
      selectPayIndex: -1,
      selectPayment: '',
      interval: 0,
      option: 0,
      dataHeader: {
        name: 'otc_order_info',
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
      dataTable: {},
      userInfoHeader: {
        name: 'otc_opponent_info',
        count: 0,
        headers: [
          {
            title: 'name', // 买家姓名
            text: 'otc_buyer_name',
            width: '',
            key: 'name'
          },
          // {
          //   title: "register_time", //注册时间
          //   text: "otc_register_time",
          //   width: "",
          //   key: "register_time"
          // },
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
            title: 'pay_time_avg', // 平均付款时间：
            text: 'pay_time_avg',
            width: '',
            key: 'pay_time_avg'
          }
        ]
      },
      userInfoTable: {},
      tranHeader: {
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
      tranTable: {},
      inputTarget: ''
    }
  },
  computed: {
    sideTitle() {
      let title = 'otc_sell_currency'
      if (this.option === 1) {
        title = `otc_confirm_issued`
      }
      return title
    }
  },
  watch: {
    show() {
      this.total = ''
      this.amount = ''
      if (this.show === true) {
        this.active_id = this.view.active_id
        this.price = this.view.price
      } else if (this.show === false) {
        this.status = 0
        this.step = 0
      }
    },
    status() {
      if (this.status === 0) {
        this.step = 0
      } else if (this.status === 1) {
        this.step = 1
      } else if (this.status === 2) {
        this.step = 2
      } else {
        this.step = 3
      }
    }
  },
  methods: {
    openSideBar() {
      this.show = true
    },
    closeSideBar() {
      this.show = false
      this.$emit('closeSideBar')
    },
    createTransaction() {
      if (!this.isLogin) {
        this.$router.push({
          name: 'login'
        })
        return
      }

      if (!this.view || !this.view.active_id || this.view.active_id <= 0) return
      const params = {
        active_id: this.view.active_id,
        side: 2,
        amount: this.amount * 1,
        total: this.total * 1,
        price: this.view.price
      }

      service.createOtcTransaction(params).then(res => {
        if (!res.code) {
          this.active_id = res.data.active_id
          this.trans_id = res.data.trans_id
          this.interval = res.data.create_time + 15 * 60 * 1000
          this.status = res.data.state
          this.step = 1
          this.tranTable = res.data
          this.$eh.$emit('otc:assets:balance')
        } else if (res.message) {
          utils.alert(res.message)
        }
      })
    },
    amountInput() {
      console.log('amount')
      if (!this.amount || this.amount == '') {
        this.total = ''
      } else {
        if (this.$big(this.amount).gt(this.$big(this.view.amount).minus(this.view.freezed))) {
          this.inputAll()
        } else {
          const total = this.$big(this.view.price).mul(this.amount).round(2, 0)
          if (this.inputTarget === 'amount') {
            if (this.total != total) {
              this.total = total
            }
          }
        }
      }
    },
    totalInput() {
      console.log('total')
      if (!this.total || this.total == '') {
        this.amount = ''
      } else {
        const amount = this.$big(this.total).div(this.view.price).round(this.symbolInfo.amount_scale, 0)
        if (this.inputTarget === 'total') {
          if (this.amount != amount) {
            this.amount = amount
          }
        }
      }
    },
    inputAll(arg) {
      if (arg === 'total') {
        this.inputTarget = 'total'
        this.total = this.view.total
        // this.amount = this.$big(this.total).div(this.view.price).round(2, 0)
      } else {
        this.inputTarget = 'amount'
        this.amount = this.$big(this.view.amount).minus(this.view.freezed)
        // this.total = this.$big(this.amount).times(this.view.price)
      }
    },
    // 撤销订单
    revokeOrder() {
      const params = {
        type: 2,
        trans_id: this.active_id
      }
      service.otcOrderRemove(params)
      this.step = 0
      this.$emit('closeSide')
    },
    changeTarget(target) {
      this.inputTarget = target
    }

  }
}
</script>

<style lang='scss'>
  .otcaction {
    height: 100%;
    .action-box {
      &.status_0 {
        height: calc(100% - 230px);
      }
      &.status_1 {
        height: 100%;
      }
      overflow: scroll;
    }
    .action-order{
      &.footer {
        z-index: 99999;
        height: 180px;
      }
    }
  }

  // 修改字体大小
  .el-step__title.is-process,.el-step__head.is-process{
    font-size: 14px;
    color: #999999;
    border-color: #999999;
  }
  .el-step__title.is-process,.el-step__head.is-wait{
    font-size: 14px;
    color: #999999;
    border-color: #999999;
  }
  .el-step__title.is-success,.el-step__head.is-success{
    font-size: 14px;
    color: #09C989;
    border-color: #09C989;
  }

</style>

