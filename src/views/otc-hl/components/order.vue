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
          @click="switchTab(index)">{{ $t(item.name) }}
          <span v-if="item.count > 0 && token">{{ item.count }}</span>
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
            <!-- 订单信息头部 -->
            <div class="top otc-order-title" flex="main:justify">
              <div class="otc-order-title-left" flex="main:left">
                <div class="order-number">
                  {{ $t('otc_trans_id') }}：
                  <span>{{ item.other_order_id  }}</span>
                </div>
                <div class="name">
                  {{ $t('otc_trans_idadawq') }}：
                  <span>{{ item.seller_nick_name }}</span>
                </div> 
                <!-- <div class="btn-im">
                  <label class="text-primary"  @click="handleClickOpenIm" flex="main:left cross:center"> 
                    <icon style="font-size:17px; margin-right: 5px;" name="message-history" />  
                    <span>{{$t('otc.tim.text1')}}</span>
                  </label>
                  <i v-if="showUnreadCount" class="red-point"></i>
                </div>  -->
              </div>
              <div
                class="state" > 
                <div>
                  <div v-if="!item.appeal_type"> 
                    <span>{{ $t(`my_otc.orders.mapStatus.${item.order_status}`) || "" }}</span>
                    <label v-if="item.order_status === 'PAYED'"
                      @click="handleDispute(item)"
                    >{{ $t('otc_seiitm_8') }}</label>
                  </div>
                  <div v-else>{{ $t('otc_seiitm_9') }}</div> 
                </div>
              </div>
            </div>  
            <!-- 订单信息主体 --> 
            <div  class="inner">
              <el-row>
                <el-col :span="8" class="first">
                  <div class="type">
                    <em :style="{color: item.type === 'BUY' ? '#23C88B' : '#F24E4D'}">{{ $t(`otc_side_${item.type === 'BUY' ? 1 : 2}`) }}</em>
                    <div
                      :style="{color: item.type === 'BUY' ? '#23C88B' : '#F24E4D'}"
                      class="cur">
                      <p style="opacity:0.6;">{{ item.currency }}/</p>
                      {{ item.coin_symbol }}
                    </div>
                  </div>
                  <dl>
                    <dt>
                      <em>{{ utils.getFiatMoneySymbolByFiat(item.currency) }}</em>
                      <span>{{ item.total }}</span>
                    </dt>
                    <dd flex>
                      <div flex-box='1'>
                        <p>{{ $t('otc_trans_idjg') }}</p> 
                        <span>{{ utils.getFiatMoneySymbolByFiat(item.currency) + item.price }}</span>  
                      </div>
                      <div flex-box='1'> 
                        <p>{{ $t('otc_trans_idsl') }}</p> 
                        <span>{{ item.coin_amount }}</span>
                      </div>
                    </dd> 
                  </dl>
                </el-col> 
                <el-col :span="12" class="last">
                  <dl>
                    <dt>
                      {{ $t('otc_payment_method') }}：{{ $t(`my_otc.payTypes.${item.pay_mode}`)}} 
                    </dt>   
                    <dd flex>  
                      <div v-for="(payItem, index) in paymentHeaderList[item.pay_mode]" :key="index" flex-box='1'>
                        <p>{{ $t(payItem.text) }}</p>
                        <span>
                          <span
                            v-if="payItem.key==='weixin_url' || payItem.key==='alipay_url'"
                            style="cursor: pointer;"
                            @click="openQR(item[payItem.key])">
                            <icon v-if="item[payItem.key]" name="qrcode" />
                          </span>
                          <span v-else>{{ item[payItem.key] }}</span>
                        </span>   
                      </div>
                    </dd> 
                  </dl>    
                </el-col> 
                <el-col :span="4"> 
                  <!-- <div
                    v-if="item.side === 1 && item.order_status === 'UNFINISHED'"
                    class="btn btn1"
                    @click="handleOrderOption(item, 'payMoney')">{{ $t('otc_already_paid') }}</div> 
                  <div
                    v-if="item.side === 2 && item.order_status === 'PAYED'"
                    class="btn btn1"
                    @click="handleOrderOption(item, 'payCoin')">{{ $t('otc_confirm_issued') }}</div> 
                    -->
                  <div class="time-ago"> 
                    <!--order_status 0已取消,1未付款,2超时取消,3已付款,4申诉中,5已完成,6强制取消,7强制完成 -->
                    <div style="height: 30px">
                      <p v-if="item.side === 1 && item.time &&  item.order_status===1">
                        {{ $t('otc_overtime_tips_a1') }}
                        <count-down
                          :terminal="item.time"
                          style="font-size: 12px;" />
                      </p>  
                      <p>
                        <b v-if="item.order_status===2"> {{ $t('otc_seiitm_13') }}</b> 
                      </p> 
                    </div>
                    <!-- 取消订单 -->
                    <div  style="height: 30px">
                      <el-button size='mini' type="danger" class="mt-5" 
                        v-if="item.order_status===1"
                        @click="handleClickCancel(item, 'cancel')"
                        >
                        {{$t('otc_cancel_order')}}
                      </el-button> 
                    </div>
                    
                    <div  style="height: 30px">
                      <div><!-- 确认付款 -->
                        <el-button size='mini' type="success" class="mt-5" 
                          v-if="item.type === 'BUY' && item.order_status===1"
                          @click="handleClickPayMoney(item, 'payMoney')">
                          {{$t('otc_already_paid')}}
                        </el-button> 
                      </div>
                      <div><!-- 确认放币 -->
                        <el-button size='mini' type="danger" class="mt-5" 
                          v-if="item.side === 'SELL' && (item.order_status===3|| item.order_status===4)"
                          @click="handleClickPayCoin(item, 'payCoin')">
                          {{$t('otc_confirm_issued')}}
                        </el-button> 
                      </div>
                    </div>
                  </div>
                  <div>
                  </div> 
                </el-col>
              </el-row>  
            </div>
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
import { tradeMixins } from '../mixins'
// import { state } from '@/modules/store' 
import utils from '@/modules/utils' 
import TextInfo from './textInfo'
import service from '@/modules/service'
import countDown from '@/components/CountDown'
import processValue from '@/mixins/process-otc-value.js'
import api from '@/modules/api/hl-otc'

import Vue from 'vue'
export default {
  components: {
    TextInfo,
    countDown
  },
  mixins: [tradeMixins, processValue],
  data() {
    return {
      utils,
      // icons: ['&#xe618;', '&#xe654;'],
      iconActive: 0,
      tab: [
        {
          name: 'otc_tab_lisetr',
          count: 0
        },
        {
          name: 'otc_tab_lisetr1',
          count: 0
        },
        {
          name: 'otc_tab_lisetr2',
          count: 0
        },
        // {
        //   name: 'my_order',
        //   count: 0
        // }
      ],
      token: window.localStorage.getItem('X-TOKEN'),
      orderBtn: ['contract_cancel_all', 'otc_tab_lisetr3', 'otc_tab_lisetr4'],
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
        // 0支付宝，1微信，2银行卡
        // 银行卡
        2: [
          {
            title: 'name', // 姓名
            text: 'payment_name',
            width: '',
            key: 'card_user_name'
          },
          {
            title: 'card_number', // 银行卡号
            text: 'payment_card_number',
            width: '',
            key: 'card_code'
          },
          {
            title: 'deposit_bank', // 开卡行
            text: 'payment_deposit_bank',
            width: '',
            key: 'card_bank'
          }
        ],
        // 支付宝
        0: [
          {
            title: 'alipay_account', // 支付宝账号
            text: 'payment_alipay_account',
            width: '',
            key: 'alipay_id'
          },
          {
            title: 'name', // 姓名
            text: 'payment_name',
            width: '',
            key: 'alipay_name'
          },
          {
            title: 'collection_img', // 收款二维码
            text: 'payment_collection_img',
            width: '',
            key: 'alipay_url'
          }
        ],
        // 微信
        1: [
          {
            title: 'we_chat_account', // 微信账号
            text: 'payment_weChat_account',
            width: '',
            key: 'weixin_id'
          },
          {
            title: 'name', // 姓名
            text: 'payment_name',
            width: '',
            key: 'weixin_name'
          },
          {
            title: 'collection_img', // 收款二维码
            text: 'payment_collection_img',
            width: '',
            key: 'weixin_url'
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
  beforeDestroy() {
    clearInterval(this.timer)
  },
  created() {
    this.getOrderz()
    // todo 初始化第一种类型数据
    this.init(this.active) 
  }, 
  beforeDestroy() {
    clearInterval(this.timers)
  },
  methods: { 
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
      const myOrder = await api.gethlOrderMyOrder({coin_symbol: 'USDT', currency_symbol:'CNY', page: 1, size: 10}) 
       
      if (myOrder) { 
        if (myOrder.status===200) {
          //status 0已取消,1未付款,2超时取消,3已付款,4申诉中,5已完成,6强制取消,7强制完成
          this.datalist = myOrder.data.data
          this.total = myOrder.data.total
        }
      }
      console.log(state)
      switch (state) { 
        //未完成订单
        case 0:  
          if (this.datalist.length > 0) {
            // const rec = await api.gethlOrderDetail({other_order_id: this.datalist[0].other_order_id})  
            this.datalist = this.datalist.filter(item => [1, 3, 4].includes(item.order_status)) 
            break
          }
        //已完成订单
        case 1:
           this.datalist = this.datalist.filter(item => [5, 7].includes(item.order_status)) 
            break
        //已取消订单
        case 2:
           this.datalist = this.datalist.filter(item => [0, 2, 6].includes(item.order_status))  
            break
        default: 
           return
      }
      // switch (state) { 
      //   //未完成订单
      //   case 0: 
      //     utils.alert('0')
      //     const rec = await service.getUnDonefills(that.params)
      //     if (!rec.code) {
      //       this.datalist = rec.data.data
      //       this.setOrderInfo(rec)
      //     }
      //     //支付方式默认选择银行卡
      //     if (!rec.code) {
      //       let dt = rec.data.data
      //       dt.forEach((item) => {
      //         if (item.state === 1 && item.side === 1 && !item.appeal && !item.other_appeal) {
      //           const paylist = item.otc_collection_list
      //           if (paylist.length > 0 && !item.selectPayment) {
      //             const arr = paylist.filter(arg => arg.payment_type === 1)
      //             if (arr.length > 0) {
      //               // this.selectPayment = arr[0]
      //               Vue.set(item, 'selectPayment', arr[0])
      //             } else {
      //               Vue.set(item, 'selectPayment', paylist[0])
      //             }
      //           }
      //         }
      //       })
      //     } 
      //     break 
      //   //已完成订单
      //   case 1:
      //     utils.alert(1)
      //     const rer = await service.getDonefills(that.params1)
      //     if (!rer.code) {
      //       that.datalist = rer.data.data
      //       that.total = rer.data.total
      //     }
      //     break
      //   //已取消订单
      //   case 2:
      //     utils.alert(2)
      //     const res = await service.getOtcRemovefills(that.params1)
      //     if (!res.code) {
      //       that.datalist = res.data.data
      //       that.total = res.data.total
      //     }
      //     break
      //   //我的委托单
      //   default:
      //     utils.alert(3)
      //     const rew = await service.getOtcActivefills(that.params)
      //     if (!rew.code) {
      //       that.datalist = rew.data.data
      //       that.total = rew.data.total
      //     }
      // }
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
    //取消订单
    async handleClickCancel(obj) {
      const isok = await utils.confirm(this, {
        title: '取消订单',
        content: '确定要取消这个订单吗？'
      })
      if (isok) {
        const res = await api.sethlOrderCancel({other_order_id: obj.other_order_id})
        if (!res.code && !res.status) {
          utils.success('订单取消成功')
          this.init(this.active) 
        } else {
          utils.alert(res.message)
        }
      }  
    },
    //确认付款
    async handleClickPayMoney(obj) {
      const isok = await utils.confirm(this, {
        title: this.$t('confirm'),
        content: this.$t('otc_already_paid')
      })
      
      if (isok) {
        const res = await api.sethlOrderPayMoney({other_order_id: obj.other_order_id})
        if (!res.code && !res.status) {
          utils.success('确认付款成功')
          this.init(this.active) 
        } else {
          utils.alert(res.message)
        }
      }  

    },
    //确认放币
    async handleClickPayCoin (obj) {
      const isok = await utils.confirm(this, {
        title:  this.$t('confirm'),
        content: this.$t('otc_confirm_issued')
      })

      if (isok) {
        const res = await api.sethlOrderRelease({other_order_id: obj.other_order_id})
        if (!res.code && !res.status) {
          utils.success('放币成功')
          this.init(this.active) 
        } else {
          utils.alert(res.message)
        }
      }  

    }
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
@import "../assets/scss/trade.scss";
 
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
    color: $primary;
  }
}
</style>
