<!--
 * @Author: zlccy
 * @Date: 2019-08-15 14:15:44
 * @LastEditTime: 2019-09-16 10:50:35
 * @Description: file content
 -->
<template>
  <div class="trade-container">
    <div class="trade-message-box">

      <div class="link">{{ $t('otc_my_order') }}</div>
      <div class="message-con">
        <dl>
          <dd class="user-info">
            <div class="user">
              <!--<div class="avt">-->
              <!---->
              <!--</div>-->
              <!--sdsd-->
              <icon class="avt" name="rentou" />

              <div class="avt-text">
                <div class="top">
                  {{ tableDataUname.name }}
                  <span>{{ tableDataUname.kyc_level }}</span>
                  {{ $t('otc_kyc_level') }}
                </div>
                <p>UID: {{ tableDataUname.id }}</p>
              </div>
            </div>
            <!--<div class="user">{{ tableDataUname.name }}</div-->
          </dd>
          <dd class="acount-info">
            <div class="trade">
              <div class="number">
                <em>{{ $t('otc_side_3') }}:</em>
                <span>{{ Number(tableDataUname.orders_total).toFixed(2) || '--' }}</span>
              </div>
              <div class="number">
                <em>{{ $t('pay_time_avg') }}:</em>
                <span>{{ processValue('pay_time_avg', tableDataUname) || '--' }}</span>
                <!--<span>{{tableDataUname.pay_time_avg}}</span>-->
              </div>
            </div>
          </dd>
          <dd>
            <div class="trade">
              <div class="number">
                <em>{{ $t('otc_total_arder') }}:</em>
                <span>{{ tableDataUname.orders_complete || '0' }}</span>
              </div>
              <div class="number">
                <em>{{ $t('issue_time_avg') }}:</em>
                <!--<span>{{tableDataUname.issue_time_avg}}</span>-->
                <span>{{ processValue('issue_time_avg', tableDataUname) || '--' }}</span>
              </div>
            </div>
          </dd>
          <dd>
            <div class="trade">
              <div class="number">
                <em>{{ $t('thirty_day_orders_rate') }}:</em>
                <span>{{ tableDataUname.orders_rate ? (Number(tableDataUname.orders_rate) * 100).toFixed(2) + '%' : '0%' }}</span>
              </div>
            </div>
          </dd>
        </dl>
        <div
          class="tip"
          style="padding-bottom: 20px;">
          <div class="time">
            {{ $t('otc_register_time') }}
            <span v-if="tableDataUname.register_time">{{ tableDataUname.register_time | date }}</span>
            <span v-else />
          </div>
          <!--<div class="text">{{ $t('otc_assets_tips_m') }}</div>-->
        </div>
      </div>
    </div>
    <div class="trade-table-box">
      <div class="table-nav">
        <div
          v-for="(item, index) in tab"
          :key="index"
          :class="{active: active === index}"
          class="nav-list"
          @click="switchTab(index)">{{ item.name }}
          <span v-if="item.count > 0 && token">{{ item.count }}</span>
        </div>
        <div
          v-if="active === 0"
          class="slot-down">
          <i
            v-for="(item, index) in icons"
            :key="index"
            :class="{iconActive: iconActive === index}"
            class="iconfont"
            @click="iconTab(index)"
            v-html="item" />
        </div>
        <div
          v-if="active === 3"
          class="order-btn">
          <span
            v-for="(item, index) in orderBtn"
            :key="index"
            :class="{selected: orderActive === index}"
            @click="orderSwtich(index)">{{ item }}</span>
            <icon
              name="robot-info"
              v-tooltip.top-end="{html: true,content: $t('otc_suspend_all_tips')} "
            />
        </div>
      </div>
      <div
        v-if="active === 0"
        class="tips"
        style="line-height: 40px;">
        <icon
          style="  margin-left: 12px;margin-right: 8px;height: 14px;width: 14px;color: inherit;font-size: 0px;"
          name="inhsdgbnljkarf" />
        <span v-html="$t('otc_buy_tips_a')" />！
        <span v-html="$t('otc_buy_tips_c')" />
      </div>
      <div class="table-con">
        <template v-if="active === 0">
          <div
            v-for="(item, index) in datalist"
            :key="index"
            class="table-list">
            <div class="top">
              <div class="order-number">
                {{ $t('otc_trans_id') }}：
                <span>{{ item.trans_id }}</span>
              </div>
              <div class="name">
                {{ $t('otc_trans_idadawq') }}：
                <span>{{ item.name }}</span>
              </div>
               <div
                class="state"
                flex="main:right">
                <div>
                  <span v-if="item.state === 9">
                    {{ $t('pre_reviewed') }}
                  </span>
                  <span
                    v-else-if="item.other_appeal && !item.appeal"
                    style="color:#c9a96c">{{ $t('otc_seiitm_7') }}
                  </span>
                </div>
                <div>
                  <div v-if="!item.appeal">
                    <span v-if="item.side === 2 && item.state === 1">{{ $t('otc_seiitm_6') }}</span>
                    <span v-else>{{ !item.other_appeal && exchangeState(item.state) || "" }}</span>
                    <b
                      v-if="item.state === 2 || item.state === 7 || item.state === 6"
                      @click="sq(item)"
                    >{{ $t('otc_seiitm_8') }}</b>
                  </div>
                  <div v-else>{{ $t('otc_seiitm_9') }}</div>
                  <!--（没收到对方付款？-->
                </div>
              </div>
            </div>
            <ul class="inner">
              <li class="first">
                <div class="type">
                  <em :style="{color: item.side === 1 ? '#23C88B' : '#F24E4D'}">{{ Order(item.side) }}</em>
                  <div
                    :style="{color: item.side === 1 ? '#23C88B' : '#F24E4D'}"
                    class="cur">
                    <p style="opacity:0.6;">{{ item.currency_type }}/</p>
                    {{ item.currency }}
                  </div>
                </div>
                <dl>
                  <dt>
                    <em>{{ getCurrencySymbol(item.currency_type) }}</em>
                    <span>{{ item.total }}</span>
                  </dt>
                  <dd>
                    {{ $t('otc_trans_idjg') }}：
                    <span>{{ getCurrencySymbol(item.currency_type) + item.price }}</span>
                  </dd>
                  <dd>
                    {{ $t('otc_trans_idsl') }}：
                    <span>{{ item.amount }}</span>
                  </dd>
                  <template v-if="item.side === 2">
                    <dd>
                      {{ $t('otc_ziurec_13') }}：
                      <span> {{ item.fee }}</span>
                      <!-- <span>{{ $t('otc_ziurec_16') }} </span> -->
                    </dd>
                    <dd>
                      {{ $t('otc_seiitm_10') }}：
                      <span>{{ getCurrencySymbol(item.currency_type) + item.total }}</span>
                    </dd>
                  </template>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>
                    <b v-if="item.side === 1"> {{ $t('otc_seller_nameacer') }}：</b>
                    <b v-else> {{ $t('otc_seiitm_11') }}：</b>
                    <span>{{ item.name }}</span>
                  </dt>
                  <dd>
                    {{ $t('otc_register_time') }}：
                    <span>{{ processValue('register_time', item) || '--' }}</span>
                  </dd>
                  <dd>
                    {{ $t('otc_kyc_level') }}：
                    <span>{{ $t('otc_seiitm_12') }}{{ item.kyc_level }}</span>
                  </dd>
                  <dd>
                    {{ $t('pay_time_avg') }}：
                    <span>{{ processValue('pay_time_avg', item) || '--' }}</span>
                  </dd>
                  <dd>
                    {{ $t('otc_completed_infadwo') }}：
                    <span>
                      {{ item.orders_complete || '--' }}
                      /
                      {{ item.orders_rate ? (Number(item.orders_rate) * 100).toFixed(2) + '%' : '--' }}
                    </span>
                  </dd>
                </dl>
              </li>
              <li class="last">
                <dl v-if="item.otc_type === 1">
                  <dt>
                    {{ $t('otc_payment_method') }}：
                    <template v-if="item.state !== 1">
                      <span>{{ $t(payName(item.otc_collection.payment_type)) }}</span>
                      <!-- <span v-if="item.otc_collection.alipay_account">{{ $t('payment_namezfb') }}</span>
                      <span
                        v-else-if="item.otc_collection.we_chat_account"
                      >{{ $t('payment_weChat_adasunt') }}</span>
                      <span v-else-if="item.otc_collection.card_number">{{ $t('payment_nameyhk') }}</span> -->
                    </template>
                  </dt>
                  <!-- <dd>
                    {{ $t('payment_name') }}：
                    <span>{{ item.otc_collection.name || '--' }}</span>
                  </dd>
                  <dd>
                    {{ $t('payment_nameid') }}：
                    <template v-if="item.state !== 1">
                      <span
                        v-if="item.otc_collection.alipay_account"
                      >{{ item.otc_collection.alipay_account }}</span>
                      <span
                        v-if="item.otc_collection.we_chat_account"
                      >{{ item.otc_collection.we_chat_account }}</span>
                      <span
                        v-if="item.otc_collection.deposit_bank"
                      >{{ item.otc_collection.deposit_bank }}</span>
                    </template>
                    <template v-else>--</template>
                  </dd>
                  <dd v-if="item.state !== 1">
                    <template v-if="item.otc_collection.card_number">
                      {{ $t('payment_nameyhk') }}：
                      <span>{{ item.otc_collection.card_number }}</span>
                    </template>
                  </dd> -->
                  <div v-if="item.otc_collection">
                    <dd
                      v-for="(payItem, index) in paymentHeaderList[item.otc_collection.payment_type]"
                      :key="index">
                      <span>{{ $t(payItem.text) }}</span>
                      <span>
                        <span
                          v-if="payItem.key==='collection_img'"
                          style="cursor: pointer;"
                          @click="openQR(item.otc_collection)">
                          <icon name="qrcode" />
                        </span>
                        <span v-else>{{ processValue(payItem.key, item.otc_collection) }}</span>
                      </span>
                    </dd>
                  </div>
                  <dd>
                    <a
                      href="javascript:;"
                      @click="detailHandle(item)">{{ $t('otc_sidees10') }} ></a>
                  </dd>
                </dl>
                <dl v-if="item.state === 1 && item.side === 1 && !item.appeal && !item.other_appeal">
                  <dt>
                    <span>{{ $t('otc_payment_method') }}</span>
                    <!-- <el-select v-model="item.bankId" size="small" style="width: 140px" @change="paySetHandle(item, item.bankId)">
                      <el-option v-for="(bank, i) in item.bankArray" :key="i" :label="bank.name" :value="bank.id"></el-option>
                    </el-select> -->
                    <el-select
                      v-model="item.selectPayment"
                      style="width: 140px;"
                      size="small"
                      value-key="collection_id"
                      @change="changePayType(item)">
                      <el-option
                        v-for="(bank, index) in item.otc_collection_list"
                        :key="index"
                        :label="processValue('payment_type', bank)"
                        :value="bank" />
                    </el-select>
                  </dt>
                  <div v-if="item.selectPayment">
                    <dd
                      v-for="(payItem, index) in paymentHeaderList[item.selectPayment.payment_type]"
                      :key="index">
                      <span>{{ $t(payItem.text) }}</span>
                      <span>
                        <span
                          v-if="payItem.key==='collection_img'"
                          style="cursor: pointer;"
                          @click="openQR(item.selectPayment)">
                          <icon name="qrcode" />
                        </span>
                        <span v-else>{{ processValue(payItem.key, item.selectPayment) }}</span>
                      </span>
                    </dd>
                    <dd>
                      <a
                        href="javascript:;"
                        style="font-size: 12px;"
                        @click="closeHadle(item)">{{ $t('otc_cancel_order') }}</a>
                    </dd>
                  </div>
                  <!-- <dd v-if="item.bankId">
                    姓名:
                    <span>{{ item.realName }}</span>
                  </dd>
                  <dd v-if="item.bankId">
                    账号:
                    <span>{{ item.pAccount }}</span>
                  </dd>
                  <dd v-if="item.bankId && item.paySet === 1">
                    银行卡
                    {{item.bankAccount}}
                  </dd> -->
                </dl>
                <div
                  v-if="item.side === 1 && item.state === 1 && !item.appeal && !item.other_appeal"
                  class="btn btn1"
                  @click="detailHandle(item)">{{ $t('otc_already_paid') }}</div>
                <!--<div-->
                <!--class="btn btn2"-->
                <!--v-if="item.side === 1 && item.state === 1 && !item.appeal && !item.other_appeal"-->
                <!--@click="closeHadle(item)"-->
                <!--&gt;{{ $t('otc_cancel_order') }}</div>-->
                <template>
                  <div
                    v-if="item.side === 2 && item.state === 2 && !item.appeal && !item.other_appeal"
                    class="btn"
                    @click="detailHandle(item)">{{ $t('otc_confirm_issued') }}</div>
                  <div
                    v-if="item.side === 2 && item.state === 7 && !item.appeal && !item.other_appeal"
                    class="btn"
                    @click="detailHandle(item)">{{ $t('otc_confirm_issued') }}</div>
                </template>
                <div
                  v-if="item.time && !item.appeal && !item.other_appeal"
                  class="time-ago">
                  <p>
                    {{ $t('otc_overtime_tips_a1') }}
                    <count-down
                      :terminal="item.time"
                      style="font-size: 12px;" />
                  </p>
                  <!--<b v-if="item.side === 1 && item.state === 1"></b>-->
                  <b v-if="item.side === 2 && item.state === 1"> {{ $t('otc_seiitm_13') }}</b>
                  <b v-if="item.side === 1 && item.state === 2"> {{ $t('otc_seiitm_14') }}</b>
                  <b v-if="item.side === 2 && item.state === 2"> {{ $t('otc_seiitm_14') }}</b>
                  <b v-if="item.side === 1 && item.state === 7"> {{ $t('otc_seiitm_14') }}</b>
                  <!--<span v-html="item.side === 1 && ? '取消订单' : '放币'"></span>-->
                </div>
                <dd
                  v-if="item.side === 1 && item.state === 1 && item.other_appeal"
                  style="position: absolute;right: 0;bottom: 0;">
                  <a
                    href="javascript:;"
                    @click="detailHandle(item)">{{ $t('otc_sidees10') }} ></a>
                </dd>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <step-table
            :grid-config="tableHeader"
            :show-grid-data="datalist"
            :loading="loading" />
        </template>
      </div>
    </div>
    <div
      v-if="datalist.length > 0"
      class="page">
      <el-pagination
        :total="total"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange" />
    </div>
    <slide-model
      :open.sync="dialogVisible"
      @close="closeChange">
      <text-info
        :text-detail="detail"
        :text-code="active"
        :step-active="stepActive"
        :bank-data="bankData"
        :bank-id="bankId"
        :close="closeFlag"
        @step-change="stepChange"
        @close-change="closeChange"
        @bank-change="bankChange" />
    </slide-model>
    <v-modal :open.sync="showQRcode">
      <div class="qr">
        <img
          :src="qrsrc"
          alt=""
          style="max-height:600px;">
      </div>
    </v-modal>
  </div>
</template>

<script type="text/ecmascript-6">
import { tradeMixins } from './mixins'
// import { state } from '@/modules/store'
// import * as mock from './mock/mock'
import utils from './tools'
// import axios from 'axios'
import TextInfo from './textInfo'
import service from '@/modules/service'
import countDown from '@/components/CountDown'
import processValue from '@/mixins/process-otc-value.js'
import Vue from 'vue'
export default {
  components: {
    TextInfo,
    countDown
  },
  mixins: [tradeMixins, processValue],
  data() {
    return {
      icons: ['&#xe618;', '&#xe654;'],
      iconActive: 0,
      tab: [
        {
          name: this.$t('otc_tab_lisetr'),
          count: 0
        },
        {
          name: this.$t('otc_tab_lisetr1'),
          count: 0
        },
        {
          name: this.$t('otc_tab_lisetr2'),
          count: 0
        },
        {
          name: this.$t('my_order'),
          count: 0
        }
      ],
      token: window.localStorage.getItem('X-TOKEN'),
      orderBtn: [this.$t('contract_cancel_all'), this.$t('otc_tab_lisetr3'), this.$t('otc_tab_lisetr4')],
      orderActive: -1,
      tableDataUname: [],
      count: 0,
      loading: true,
      total: 1,
      closeFlag: false,
      params: {
        page: 1,
        side: 0,
        size: 10
      },
      params1: {
        page: 1,
        side: 0,
        size: 10,
        currency: ''
      },
      bankData: [],
      bankId: '',
      timer: null,
      timers: null,
      stepActive: false,
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
        ],
        // paynow
        4: [
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
          }
        ],
        // paylah
        5: [
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
          }
        ]
      },
      selectPayment: {},
      qrsrc: '',
      showQRcode: false,
      datalist: [] 
    }
  },
  // computed: {
  //   userInfo () {
  //     return state.userInfo || {}
  //   },
  //   id () {
  //     return this.userInfo.id
  //   },
  //   terminal () {
  //     if(this.aver.state === 1){
  //       return this.aver.create_time + 15 * 60 * 1000
  //     } else if (this.aver.state === 2){
  //       return this.aver.pay_time + 12 * 60 * 60 * 1000
  //     }
  //     return 0
  //   }
  // },
  // mounted() {
  //   this.setTimeInit()
  // },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  created() {
    this.getOrderz()
    // todo 初始化第一种类型数据
    this.init(this.active)

    const that = this
    // 定时器
    this.timers = setInterval(() => {
      console.log('setInterval')
      service.getUnDonefills({
        page: 1,
        side: 0,
        size: 999
      }).then(res => {
        if (res.code === 0) {
          if (res.data.data.length > 0) {
            Vue.set(this.tab[0], 'count', res.data.data.length)
            if (this.active === 0) {
              this.setOrderInfo(res)
            }
          }
        }
      })
      service.getOtcActivefills({
        page: 1,
        side: 0,
        size: 999
      }).then(res => {
        if (res.code === 0) {
          const noCount = []
          if (res.data.data.length > 0) {
            res.data.data.forEach((item) => {
              noCount.push(item)
            })
          }
          // Vue.set(this.tab[3], 'count', noCount.length)
        }
      })
    }, 5000)
  },
  // mounted() {
  //   this.setTimeInit()
  // },
  beforeDestroy() {
    clearInterval(this.timers)
  },
  methods: {
    payName(type) {
      return {
        1: 'payment_nameyhk',
        2: 'payment_namezfb',
        3: 'payment_weChat_adasunt',
        4: 'Paynow',
        5: 'Paylah'
      }[type]
    },
    getCurrencySymbol(type) {
      return {
        'CNY': '￥',
        'SGD': 'S$'
      }[type]
    },
    compareDown(property) {
      return function(a, b) {
        return a[property] - b[property]
      }
    },
    compareUp(property) {
      return function(a, b) {
        return b[property] - a[property]
      }
    },
    iconTab(index) {
      this.iconActive = index
      if (index === 0) {
        return this.datalist.sort(this.compareDown('create_time'))
      } else {
        return this.datalist.sort(this.compareUp('create_time'))
      }
    },
    changePayType(e) {
      // console.log(e)
    },
    openQR(pay) {
      this.qrsrc = pay.collection_img
      this.showQRcode = true
    },
    orderSwtich(index) {
      if (this.datalist.length > 0) {
        this.orderActive = index
        const orderName =
          index === 0 ? this.$t('otc_seiitm_15') : index === 1 ? this.$t('otc_tab_lisetr3') : this.$t('otc_tab_lisetr4')
        this.$confirm(this.$t('otc_otutcol_18', { orderName }), this.$t('tips'), {
          confirmButtonText: this.$t('otc_ziurec_20'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        })
          .then(() => {
            var obj = {
              user_id: this.id,
              type: index + 1
            }
            service.otcOrderOperateAll(obj).then(res => {
              if (res.code === 0) {
                this.init(this.active)
                this.$message({
                  type: 'success',
                  message: `${orderName}成功`,
                  duration: 1000
                })
              } else {
                // this.$message.warning(`${res.message}`)
                this.$message({
                  type: 'warning',
                  message: `${res.message}`,
                  duration: 1000
                })
              }
            })
            this.orderActive = -1
          })
          .catch(() => {
            this.orderActive = -1
          })
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('no_data'),
          duration: 1000
        })
      }
    },
    closeHadle(item) {
      this.detail = item
      // console.log(item)
      this.closeFlag = true
      this.stepActive = true
      this.dialogVisible = true
    },
    bankChange(bank) {
      this.bankId = bank
    },
    // Todo 待开发
    paySetHandle(item, index) {
      // console.log(item, index)
    },
    detailHandle(item) {
      // console.log({ item })
      this.stepActive = false
      this.bankData = []
      this.closeFlag = false
      this.detail = item
      const payData = []
      if (item.otc_collection) {
        this.bankData.push(item.otc_collection)
      } else {
        item.otc_collection_list.forEach(item => {
          // const payType =
          //   item.payment_type === 1
          //     ? item.deposit_bank
          //     : item.payment_type === 2
          //       ? this.$t('payment_namezfb')
          //       : this.$t('payment_weChat_adasunt')
          // const payAccount = item.alipay_account
          //   ? item.alipay_account
          //   : item.card_number
          //     ? item.card_number
          //     : item.we_chat_account

          const payAccount = this.processValue('payment_type', item)
          payData.push({
            collection_id: item.collection_id,
            // deposit_bank: payType + payAccount,
            deposit_bank: payAccount,
            obj: item
          })
        })
        this.bankData = payData
        if (item.selectPayment) {
          this.bankId = item.selectPayment.collection_id
        }
      }
      this.dialogVisible = true
    },
    closeChange() {
      this.dialogVisible = false
      this.closeFlag = false
    },
    stepChange(type) {
      this.dialogVisible = false
      // 防币
      if (type === 'down') {
        // todo request
        const params = {
          trans_id: this.detail.trans_id
        }
        // const $this = this
        service.otcOrderIssueDone(params).then(res => {
          // console.log(res)
          if (!res.code) {
            // this.$message.success('提交成功')
            this.$message({
              type: 'success',
              message: this.$t('otc_seiitm_16'),
              duration: 1000
            })
            this.init(this.active)
          } else {
            // this.$message.error(res.message)
            this.$message({
              type: 'error',
              message: `${res.message}`,
              duration: 1000
            })
          }
        })
      } else if (type === 'close') {
        const params = {
          user_id: this.id,
          type: '2',
          trans_id: this.detail.trans_id
        }
        service.otcOrderRemove(params).then(res => {
          if (!res.code) {
            this.$message({
              type: 'success',
              message: this.$t('otc_seiitm_17'),
              duration: 1000
            })
          } else {
            // this.$message.error(`${res.message}`)
            this.$message({
              type: 'error',
              message: `${res.message}`,
              duration: 1000
            })
          }
        })
      } else {
        // todo request api
        if (!this.bankId) {
          // utils.alert('请选择支付方式!')
          // this.$message.warning('请选择支付方式!')
          this.$message({
            type: 'warning',
            message: this.$t('otc_buy_tips_i'),
            duration: 1000
          })
          return
        }
        // const $this = this
        const params = {
          trans_id: this.detail.trans_id,
          collection_id: this.bankId
        }
        service.otcOrderPaymentDone(params).then(res => {
          if (!res.code) {
            // this.$message.success('提交成功')
            this.$message({
              type: 'success',
              message: this.$t('otc_seiitm_16'),
              duration: 1000
            })
            this.init(this.active)
          } else {
            // this.$message.error(res.message)
            this.$message({
              type: 'error',
              message: `${res.message}`,
              duration: 1000
            })
          }
        })
      }
    },
    getOrderz() {
      const params = {
        user_id: null
      }
      service.getOtcUserinfo(params).then(ren => {
        if (!ren.code) {
          const $this = this
          $this.tableDataUname = ren.data
          state.otc.userInfo = ren.data
        }
      })
    },
    switchTab: utils.debounce(function(index) {
      this.tableHeader = []
      const that = this
      // 数据初始化
      that.params = {
        page: 1,
        side: 0,
        size: 10
      }
      that.params1 = {
        page: 1,
        side: 0,
        size: 10,
        currency: ''
      }
      that.loading = true
      that.active = index
      this.datalist = []
      // 清除定时器
      clearInterval(this.timer)
      setTimeout(() => {
        // 我的委托单
        if (index === 3) {
          that.tableHeader = this.tradeHeader
        } else if (index === 0) {
          // 未完成
        } else {
          // 订单Trade
          that.tableHeader = this.orderHeader
        }
        // 防止抖动
        this.loading = false
        // 切换数据
        this.init(index)
        // this.setTimeInit()
      }, 300)
    }),
    async init(state) {
      const that = this
      switch (state) {
        // eslint-disable-next-line no-case-declarations
        case 0:
          const rec = await service.getUnDonefills(that.params)
           if (!rec.code) {
            this.datalist = rec.data.data
            this.setOrderInfo(rec)
          }
          //支付方式默认选择银行卡
          if (!rec.code) {
            let dt = rec.data.data
            dt.forEach((item) => {
              if (item.state === 1 && item.side === 1 && !item.appeal && !item.other_appeal) {
                const paylist = item.otc_collection_list
                if (paylist.length > 0 && !item.selectPayment) {
                  const arr = paylist.filter(arg => arg.payment_type === 1)
                  if (arr.length > 0) {
                    // this.selectPayment = arr[0]
                    Vue.set(item, 'selectPayment', arr[0])
                  } else {
                    Vue.set(item, 'selectPayment', paylist[0])
                  }
                }
              }
            })
          }

          break
        // eslint-disable-next-line no-case-declarations
        case 1:
          const rer = await service.getDonefills(that.params1)
          if (!rer.code) {
            that.datalist = rer.data.data
            that.total = rer.data.total
          }
          break
        case 2:
          const res = await service.getOtcRemovefills(that.params1)
          if (!res.code) {
            that.datalist = res.data.data
            that.total = res.data.total
          }
          break
        default:
          const rew = await service.getOtcActivefills(that.params)
          if (!rew.code) {
            that.datalist = rew.data.data
            that.total = rew.data.total
          }
      }
    },
    setOrderInfo(rec) {
      if (!rec.code) {
        if (this.total != rec.data.total &&  rec.data.total > 0) {
          //当订单数量发送变化的时候，需要重新加载订单数据，但是需要保留用户已经选择的支付方式
          this.datalist.map(rowa => {
            rec.data.data.map(rowb => {
              if(rowa.trans_id === rowb.trans_id) {
                Vue.set(rowb, 'selectPayment', rowa.selectPayment)
              }
            })
          })
          this.datalist = rec.data.data
        } else if (!this.total) {
          this.datalist = rec.data.data
        }
        this.total = rec.data.total
        const noCount = []
        const bankData = []
        this.datalist.forEach((item) => {
          //state-1-等待对方付款 2-等待放币 3-已完成 4-买家取消 5-卖家取消 6买家超时取消 7卖家超时放币
          if (item.state === 1) {
            Vue.set(item, 'time', item.create_time + 15 * 60 * 1000)
          } else if (item.state === 2) {
            //申诉取消后
            if (item.appeal_time > 0) {
              Vue.set(item, 'time', item.appeal_time + 12 * 60 * 60 * 1000)
            }
            else {
              Vue.set(item, 'time', item.pay_time + 15 * 60 * 1000)
            }
          } else if (item.state === 7 ) {
              if (item.appeal_time > 0) {
              Vue.set(item, 'time', item.appeal_time + 12 * 60 * 60 * 1000)
            }
            else {
              Vue.set(item, 'time', item.pay_time + 12 * 60 * 60 * 1000 + 15 * 60 * 1000)
            }
          }
          if (item.otc_collection) {
            Vue.set(item, 'otc_type', 1)
          } else {
            Vue.set(item, 'otc_type', 0)
          }
          //
          if (item.otc_collection_list && !item.other_appeal && !item.appeal) noCount.push(item)
          //
          if (item.state === 1 && item.side === 1 && !item.appeal && !item.other_appeal) {
            item.otc_collection_list.forEach((child) => {
              if (child.payment_type === 1) {
                bankData.push({
                  id: child.collection_id,
                  realName: child.name,
                  name: child.deposit_bank + '/' + child.card_number
                })
              } else if (child.payment_type === 2) {
                bankData.push({
                  id: child.collection_id,
                  realName: child.name,
                  name: this.$t('payment_namezfb') + '/' + child.alipay_account,
                  img: child.collection_img
                })
              } else if (child.payment_type === 3) {
                bankData.push({
                  id: child.collection_id,
                  realName: child.name,
                  name: this.$t('payment_weChat_adasunt') + '/' + child.we_chat_account,
                  img: child.collection_img
                })
              } else if (child.payment_type === 4) {
                bankData.push({
                  id: child.collection_id,
                  realName: child.name,
                  name: 'Paynow' + '/' + child.card_number,
                  img: child.collection_img
                })
              } else if (child.payment_type === 5) {
                bankData.push({
                  id: child.collection_id,
                  realName: child.name,
                  name: 'Paylah' + '/' + child.card_number,
                  img: child.collection_img
                })
              }
              Vue.set(item, 'paySet', child.payment_type)
            })
            // // 支付方式默认选择银行卡
            // const paylist = item.otc_collection_list
            // if (paylist.length > 0) {
            //   const arr = paylist.filter(arg => arg.payment_type === 1)
            //   if (arr.length > 0) {
            //     // this.selectPayment = arr[0]
            //     Vue.set(item, 'selectPayment', arr[0])
            //   } else {
            //     Vue.set(item, 'selectPayment', paylist[0])
            //   }
            // }

            Vue.set(item, 'bankArray', bankData)
            Vue.set(item, 'bankId', '')
            Vue.set(item, 'pAccount', '')
            Vue.set(item, 'realName', '')
            Vue.set(item, 'bankAccount', '')
          }
        })
      }
    },
    sq(item) {
      this.$confirm(this.$t('otc_otutcol_19'), this.$t('tips'), {
        confirmButtonText: this.$t('otc_ziurec_20'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          const params = {
            trans_id: item.trans_id,
            user_id: this.id
          }
          service.otcAppeal(params).then(res => {
            // console.log(res)
            if (!res.code) {
              // this.$message.success('申诉成功，请等待客服处理')
              this.$message({
                type: 'success',
                message: this.$t('otc_otutcol_20'),
                duration: 1000
              })
              this.init(this.active)
            } else {
              // this.$message.warning(`${res.message}`)
              this.$message({
                type: 'warning',
                message: `${res.message}`,
                duration: 1000
              })
            }
          })
        })
        .catch(() => { })
    },
    handleCurrentChange(e) {
      // console.log(this.active)
      if (this.active === 1 || this.active === 2) {
        this.params1.page = e
        // console.log(this.params1.page, '1')
        this.init(this.active)
      } else {
        this.params.page = e
        // console.log(this.params.page, '2')
        this.init(this.active)
      }
    },
    // setTimeInit() {
    //   this.timer = setInterval(() => {
    //     if (this.active === 0 || this.active === 3) {
    //       // this.init(this.active)
    //     }
    //   }, 3000)
    // }
  }

}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "./assets/scss/trade.scss";
@font-face {
  font-family: "iconfont"; /* project id 1244642 */
  src: url("https://at.alicdn.com/t/font_1244642_widppyjmvhh.eot");
  src: url("https://at.alicdn.com/t/font_1244642_widppyjmvhh.eot?#iefix")
      format("embedded-opentype"),
    url("https://at.alicdn.com/t/font_1244642_widppyjmvhh.woff2")
      format("woff2"),
    url("https://at.alicdn.com/t/font_1244642_widppyjmvhh.woff") format("woff"),
    url("https://at.alicdn.com/t/font_1244642_widppyjmvhh.ttf")
      format("truetype"),
    url("https://at.alicdn.com/t/font_1244642_widppyjmvhh.svg#iconfont")
      format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.slot-down {
  position: absolute;
  right: 4px;
  top: 14px;
  width: 16px;
  height: 32px;
  line-height: 0.5;
  color: #999;
  i {
    cursor: pointer;
    display: inherit;
    &:last-child {
      margin-top: -8px;
    }
  }
  .iconActive {
    color: #c9a96c;
  }
}
</style>
