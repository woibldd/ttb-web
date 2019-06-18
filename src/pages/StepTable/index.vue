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
              <icon
                class="avt"
                name="rentou"/>
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
          <dd>
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
            <span
              v-if="tableDataUname.register_time"
            >{{ tableDataUname.register_time | date }}</span>
            <span v-else/>
          </div>
          <!--<div class="text">{{ $t('otc_assets_tips_m') }}</div>-->
        </div>
      </div>
    </div>
    <div class="trade-table-box">
      <div class="table-nav">
        <div
          class="nav-list"
          v-for="(item, index) in tab"
          :key="index"
          :class="{active: active === index}"
          @click="switchTab(index)"
        >{{ item.name }}
          <span v-if="item.count > 0 && token">{{ item.count }}</span>
        </div>
        <div
          class="order-btn"
          v-if="active === 3">
          <span
            v-for="(item, index) in orderBtn"
            :key="index"
            :class="{selected: orderActive === index}"
            @click="orderSwtich(index)"
          >{{ item }}</span>
        </div>
      </div>

      <div
        class="tips"
        style="line-height: 40px;"
        v-if="active === 0">
        <icon
          style="  margin-left: 12px;margin-right: 8px;height: 14px;width: 14px;color: inherit;font-size: 0px;"
          name="inhsdgbnljkarf"
        />
        <span v-html="$t('otc_buy_tips_a')"></span>！
        <span v-html="$t('otc_buy_tips_c')"></span>
      </div>
      <div class="table-con">
        <template v-if="active === 0">
          <div
            class="table-list"
            v-for="(item, index) in data"
            :key="index">
            <div class="top">
              <div class="order-number">
                {{ $t('otc_trans_id') }}：
                <span>{{ item.trans_id }}</span>
              </div>
              <div class="name">
                {{ $t('otc_trans_idadawq') }}：
                <span>{{ item.name }}</span>
              </div>
              <div class="state">
                <template v-if="!item.appeal">
                  <span v-if="!item.other_appeal">{{ item.state | state }}</span>
                  <span v-else-if="item.side === 2 && item.state === 1">待对方付款</span>
                  <span v-else>对方已申诉</span>
                  <b
                    v-if="item.state === 2 || item.state === 7 || item.state === 6"
                    @click="sq(item)"
                  >申诉</b>
                </template>
                <template v-else>已申诉</template>
                <!--（没收到对方付款？-->
              </div>
            </div>
            <ul class="inner">
              <li class="first">
                <div class="type">
                  <em :style="{color: item.side === 1 ? '#23C88B' : '#F24E4D'}">{{ item.side | side }}</em>
                  <div
                    class="cur"
                    :style="{color: item.side === 1 ? '#23C88B' : '#F24E4D'}">
                    <p>/CNY</p>
                    {{ item.currency }}
                  </div>
                </div>
                <dl>
                  <dt>
                    <em>￥</em>
                    <span>{{ item.total }}</span>
                  </dt>
                  <dd>
                    {{ $t('otc_trans_idjg') }}：
                    <span>{{ '¥' + item.price }}</span>
                  </dd>
                  <dd>
                    {{ $t('otc_trans_idsl') }}：
                    <span>{{ item.amount }}</span>
                  </dd>
                  <template v-if="item.side === 2">
                    <dd>
                      平台服务费：
                      <span>限时免费</span>
                    </dd>
                    <dd>
                      实付：
                      <span>{{ '¥' + item.total }}</span>
                    </dd>
                  </template>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>
                    <b v-if="item.side === 1">卖家：</b>
                    <b v-else>买家：</b>
                    <span>{{ item.name }}</span>
                  </dt>
                  <dd>
                    {{ $t('otc_register_time') }}：
                    <span>{{ processValue('register_time', item) || '--' }}</span>
                  </dd>
                  <dd>
                    {{ $t('otc_kyc_level') }}：
                    <span>级别{{ item.kyc_level }}</span>
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
                      <span v-if="item.otc_collection.alipay_account">{{ $t('payment_namezfb') }}</span>
                      <span
                        v-else-if="item.otc_collection.we_chat_account"
                      >{{ $t('payment_weChat_adasunt') }}</span>
                      <span v-else-if="item.otc_collection.card_number">{{ $t('payment_nameyhk') }}</span>
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
                  <div v-if='item.otc_collection'>
                    <dd v-for='(payItem, index) in paymentHeaderList[item.otc_collection.payment_type]'
                        :key='index'>
                      <span>{{ $t(payItem.text) }}</span>
                      <span>
                        <span
                          style="cursor: pointer;"
                          v-if="payItem.key==='collection_img'"
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
                      @click="detailHandle(item)">详情 ></a>
                  </dd>
                </dl>
                <dl v-if="item.state === 1 && item.side === 1 && !item.appeal && !item.other_appeal">
                  <dt>
                    <span>支付方式</span>
                    <!-- <el-select v-model="item.bankId" size="small" style="width: 140px" @change="paySetHandle(item, item.bankId)">
                      <el-option v-for="(bank, i) in item.bankArray" :key="i" :label="bank.name" :value="bank.id"></el-option>
                    </el-select> -->
                    <el-select
                      style="width: 140px;"
                      size="small"
                      v-model="item.selectPayment"
                      @change="changePayType(item)"
                      value-key="collection_id">
                      <el-option
                        v-for="(bank, index) in item.otc_collection_list"
                        :key="index"
                        :label="processValue('payment_type', bank)"
                        :value="bank"/>
                    </el-select>
                  </dt>
                  <div v-if='item.selectPayment'>
                    <dd v-for='(payItem, index) in paymentHeaderList[item.selectPayment.payment_type]'
                        :key='index'>
                      <span>{{ $t(payItem.text) }}</span>
                      <span>
                        <span
                          style="cursor: pointer;"
                          v-if="payItem.key==='collection_img'"
                          @click="openQR(item.selectPayment)">
                          <icon name="qrcode" />
                        </span>
                        <span v-else>{{ processValue(payItem.key, item.selectPayment) }}</span>
                      </span>
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
                  class="btn btn1"
                  v-if="item.side === 1 && item.state === 1 && !item.appeal && !item.other_appeal"
                  @click="detailHandle(item)"
                >{{ $t('otc_already_paid') }}</div>
                <div
                  class="btn btn2"
                  v-if="item.side === 1 && item.state === 1 && !item.appeal && !item.other_appeal"
                  @click="closeHadle(item)"
                >{{ $t('otc_cancel_order') }}</div>
                <div
                  class="btn"
                  v-if="item.side === 2 && item.state === 2 && !item.appeal && !item.other_appeal"
                  @click="detailHandle(item)"
                >确认放币</div>
                <div
                  class="time-ago"
                  v-if="item.time && !item.appeal && !item.other_appeal">
                  <p>
                    还剩
                    <count-down
                      :terminal="item.time"
                      style="font-size: 12px;"/>
                  </p>
                  <!--<b v-if="item.side === 1 && item.state === 1"></b>-->
                  <b v-if="item.side === 2 && item.state === 1">超时自动取消订单</b>
                  <b v-if="item.side === 1 && item.state === 2">超时自动放币</b>
                  <b v-if="item.side === 2 && item.state === 2">超时自动放币</b>
                  <b v-if="item.side === 1 && item.state === 7">超时自动放币</b>
                  <!--<span v-html="item.side === 1 && ? '取消订单' : '放币'"></span>-->
                </div>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <step-table
            :grid-config="tableHeader"
            :show-grid-data="data"
            :loading="loading"/>
        </template>
      </div>
    </div>
    <div
      class="page"
      v-if="data.length > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
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
        @bank-change="bankChange"
      />
    </slide-model>
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

<script type="text/ecmascript-6">
import { tradeMixins } from './mixins'
import { state } from '@/modules/store'
import * as mock from './mock/mock'
import utils from './tools'
import axios from 'axios'
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
  data () {
    return {
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
      orderBtn: ['全部撤销', '全部开始', '全部暂停'],
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
        ]
      },
      selectPayment: {},
      qrsrc: '',
      showQRcode: false,
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
  methods: {
    changePayType (e) {
      console.log(e)
    },
    openQR (pay) {
      this.qrsrc = pay.collection_img
      this.showQRcode = true
    },
    orderSwtich (index) {
      if (this.data.length > 0) {
        this.orderActive = index
        const orderName =
          index === 0 ? '撤销全部' : index === 1 ? '全部开始' : '全部暂停'
        this.$confirm(`确定${orderName}订单？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
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
                this.$message.success(`${orderName}成功`)
              } else {
                this.$message.warning(`${res.message}`)
              }
            })
            this.orderActive = -1
          })
          .catch(() => {
            this.orderActive = -1
          })
      } else {
        this.$message.warning(`无数据`)
      }
    },
    closeHadle (item) {
      this.detail = item
      console.log(item)
      this.closeFlag = true
      this.stepActive = true
      this.dialogVisible = true
    },
    bankChange (bank) {
      this.bankId = bank
    },
    // Todo 待开发
    paySetHandle (item, index) {
      console.log(item, index)
    },
    detailHandle (item) {
      console.log({item})
      this.stepActive = false
      this.bankData = []
      this.closeFlag = false
      this.detail = item
      let payData = []
      if (item.otc_collection) {
        this.bankData.push(item.otc_collection)
      } else {
        item.otc_collection_list.forEach(item => {
          const payType =
            item.payment_type === 1
              ? item.deposit_bank
              : item.payment_type === 2
              ? '支付宝'
              : '微信'
          const payAccount = item.alipay_account
            ? item.alipay_account
            : item.card_number
              ? item.card_number
              : item.we_chat_account
          payData.push({
            collection_id: item.collection_id,
            deposit_bank: payType + payAccount,
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
    closeChange () {
      this.dialogVisible = false
      this.closeFlag = false
    },
    stepChange (type) {
      this.dialogVisible = false
      // 防币
      if (type === 'down') {
        // todo request
        let params = {
          trans_id: this.detail.trans_id
        }
        let $this = this
        service.otcOrderIssueDone(params).then(res => {
          console.log(res)
          if (!res.code) {
            this.$message.success('提交成功')
            this.init(this.active)
          } else {
            this.$message.error(res.message)
          }
        })
      } else if (type === 'close') {
        let params = {
          user_id: this.id,
          type: '2',
          trans_id: this.detail.trans_id
        }
        service.otcOrderRemove(params).then(res => {
          if (!res.code) {
            this.$message({
              type: 'success',
              message: '取消成功!'
            })
          } else {
            this.$message.error(`${res.message}`)
          }
        })
      } else {
        // todo request api
        if (!this.bankId) {
          // utils.alert('请选择支付方式!')
          this.$message.warning('请选择支付方式!')
          return
        }
        let $this = this
        let params = {
          trans_id: this.detail.trans_id,
          collection_id: this.bankId
        }
        service.otcOrderPaymentDone(params).then(res => {
          if (!res.code) {
            this.$message.success('提交成功')
            this.init(this.active)
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    getOrderz () {
      const params = {
        user_id: null
      }
      service.getOtcUserinfo(params).then(ren => {
        if (!ren.code) {
          let $this = this
          $this.tableDataUname = ren.data
        }
      })
    },
    switchTab: utils.debounce(function (index) {
      let that = this
      // 数据初始化
      that.params = {
        page: 1,
        side: 0,
        size: 10
      }
      that.loading = true
      that.active = index
      this.data = []
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
        this.setTimeInit()
      }, 300)
    }),
    async init (state) {
      let that = this
      switch (state) {
        case 0:
          let rec = await service.getUnDonefills(that.params)
          if (!rec.code) {
            that.data = rec.data.data
            that.total = rec.data.total
            let noCount = []
            let bankData = []
            that.data.forEach((item) => {
              if (item.state === 1) {
                Vue.set(item, 'time', item.create_time + 15 * 60 * 1000)
              } else if (item.state === 2) {
                Vue.set(item, 'time', item.pay_time + 12 * 60 * 60 * 1000)
              } else if (item.state === 7 && item.side === 1) {
                Vue.set(item, 'time', item.pay_time + 12 * 60 * 60 * 1000)
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
                      name: '支付宝' + '/' + child.alipay_account,
                      img: child.collection_img
                    })
                  } else {
                    bankData.push({
                      id: child.collection_id,
                      realName: child.name,
                      name: '微信' + '/' + child.we_chat_account,
                      img: child.collection_img
                    })
                  }
                  Vue.set(item, 'paySet', child.payment_type)
                })
                //支付方式默认选择银行卡
                let paylist = item.otc_collection_list
                if (paylist.length > 0) {
                  let arr = paylist.filter(arg => arg.payment_type===1)
                  if (arr.length > 0) {
                    //this.selectPayment = arr[0]
                    Vue.set(item, 'selectPayment', arr[0])
                  }
                }
                console.log({item})

                Vue.set(item, 'bankArray', bankData)
                Vue.set(item, 'bankId', '')
                Vue.set(item, 'pAccount', '')
                Vue.set(item, 'realName', '')
                Vue.set(item, 'bankAccount', '')
              }
            })
            console.log(that.data[0])
          }
          break
        case 1:
          let rer = await service.getDonefills(that.params)
          if (!rer.code) {
            that.data = rer.data.data
            that.total = rer.data.total
          }
          break
        case 2:
          let res = await service.getOtcRemovefills(that.params)
          if (!res.code) {
            that.data = res.data.data
            that.total = res.data.total
          }
          break
        default:
          let rew = await service.getOtcActivefills(that.params)
          if (!rew.code) {
            that.data = rew.data.data
            that.total = rew.data.total
          }
      }
    },
    sq (item) {
      this.$confirm('你确定要申诉？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {
            trans_id: item.trans_id,
            user_id: this.id
          }
          service.otcAppeal(params).then(res => {
            if (!res) {
              this.$message.success('申诉成功，请等待客服处理')
              this.init(this.active)
            } else {
              this.$message.warning(`${res.message}`)
            }
          })
        })
        .catch(() => {})
    },
    handleCurrentChange (e) {
      this.params.page = e
      this.init(this.active)
    },
    setTimeInit () {
      this.timer = setInterval(() => {
        if (this.active === 0 || this.active === 3) {
          // this.init(this.active)
        }
      }, 3000)
    }
  },
  mounted () {
    this.setTimeInit()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  created () {
    this.getOrderz()
    // todo 初始化第一种类型数据
    this.init(this.active)

    // 定时器
    this.timers = setInterval(() => {
      service.getUnDonefills({
          page: 1,
          side: 0,
          size: 999
        }
      ).then(res => {
        if (res.code === 0) {
          if (res.data.data.length > 0) {
            Vue.set(this.tab[0], 'count', res.data.data.length)
          }
        }
      })
      service.getOtcActivefills({
        page: 1,
        side: 0,
        size: 999
      }).then(res => {
        if (res.code === 0) {
          let noCount = []
          if (res.data.data.length > 0) {
            res.data.data.forEach((item) => {
              noCount.push(item)
            })
          }
          Vue.set(this.tab[3], 'count', noCount.length)
        }
      })
    }, 5000)
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "./assets/scss/trade.scss";
</style>
