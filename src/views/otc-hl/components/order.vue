<!--
 * @Author: zlccy
 * @Date: 2019-08-15 14:15:44
 * @LastEditTime: 2019-09-16 10:50:35
 * @Description: file content
 -->
<template>
  <div class="trade-container">
    <div class="trade-message-box"> 
      <div class="link">{{ $t('my_orders') }}</div>
      <div class="message-con">
        <dl flex="main:justify">
          <dd class="user-info">
            <div class="user"> 
              <icon class="avt" name="rentou" /> 
              <div class="avt-text">
                <div class="top">
                  {{ tableDataUname.name }}
                  <span>K<i>{{ tableDataUname.kyc_level }}</i></span>
                  {{ $t('otc_kyc_level') }}
                </div>
                <p>UID: {{ tableDataUname.id }}</p>
              </div>
            </div> 
          </dd> 
          <dd class="acount-info">
            <div class="trade mt-20">
              <span>{{$t('otc_register_time')}}:</span>
               <span v-if="tableDataUname.register_time">{{ tableDataUname.register_time | date }}</span>
            </div>
          </dd> 
        </dl> 
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
                  <!-- <span>{{ item.order_id  }}</span> -->
                </div>
                <div class="name">
                  {{ $t('otc_trans_idadawq') }}：
                  <span>{{ item.seller_nick_name }}</span>
                </div>  
              </div>
              <div
                class="state" > 
                <div>
                  <div> 
                    <span>{{ $t(`my_otc.orders.mapStatus.${item.order_status}`) || "" }}</span>
                    <label  v-if="+item.order_status===3" @click="handleClickAppeal(item)"  style="text-decoration: underline;">
                      {{ $t('otc_seiitm_8') }}
                    </label>
                  </div> 
                </div>
              </div>
            </div>  
            <!-- 订单信息主体 --> 
            <div  class="inner">
              <el-row>
                <el-col :span="8" class="first">
                  <div class="type">
                    <em :style="{color: item.type === 0 ? '#23C88B' : '#F24E4D'}">{{ $t(`otc_side_${item.type === 0 ? 1 : 2}`) }}</em>
                    <div
                      :style="{color: item.type === 0 ? '#23C88B' : '#F24E4D'}"
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
                      {{ $t('otc_payment_method') }}：{{ $t(`my_otc.payTypes.${item.pay_type}`)}} 
                    </dt>   
                    <dd flex>  
                      <div v-for="(payItem, index) in paymentHeaderList[item.pay_type]" :key="index" flex-box='1'>
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
                  <div class="time-ago"> 
                    <!--order_status 0已取消,1未付款,2超时取消,3已付款,4申诉中,5已完成,6强制取消,7强制完成 -->
                    <!-- type 0 买，1卖 -->
                    <div style="height: 30px">
                      <p v-if="item.type === 0 && item.time &&  item.order_status===1">
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
                    <div  v-if="item.type === 0 && item.order_status===1" style="height: 30px">
                      <el-button size='mini' type="danger" class="mt-5"  
                        @click="handleClickCancel(item, 'cancel')">
                        {{$t('otc_cancel_order')}}
                      </el-button> 
                    </div> 
                    <div  style="height: 30px">
                      <div><!-- 确认付款 -->
                        <el-button size='mini' type="success" class="mt-5" 
                          v-if="item.type === 0 && item.order_status===1"
                          @click="handleClickPayMoney(item, 'payMoney')">
                          {{$t('otc_already_paid')}}
                        </el-button> 
                      </div>
                      <div><!-- 确认放币 -->
                        <el-button size='mini' type="danger" class="mt-5" 
                          v-if="item.type === 1 && (item.order_status===3|| item.order_status===4)"
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
import { state } from '@/modules/store' 
import utils from '@/modules/utils' 
import TextInfo from './textInfo'
import service from '@/modules/service'
import countDown from '@/components/CountDown'
import processValue from '@/mixins/process-otc-value.js'
import api from '@/modules/api/hl-otc'
import wsNew from '@/modules/ws-new' 
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
      state,
      iconActive: 0,
      socket: null,
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
      stepActive: false,
      paymentHeaderList: {
        // 0支付宝，1微信，2银行卡
        // 银行卡
        EBANK: [
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
        ALIPAY: [
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
        WEIXIN: [
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
      },
      selectPayment: {},
      qrsrc: '',
      showQRcode: false,
      datalist: [] 
    }
  },  
  created() {
    this.getOrderz()
    // todo 初始化第一种类型数据
    this.init(this.active) 
    this.subMarket()
  }, 
  beforeDestroy() { 
    this.socket.$off('message')
    this.socket.$off('reopen')
    this.socket.$destroy()
  },
  methods: {  
    openQR(url) {
      this.qrsrc = url
      this.showQRcode = true
    }, 
    bankChange(bank) {
      this.bankId = bank
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
      const stateStr = ['1,3,4,8', '5,7', '0,2,6,9'][state]
      const params = {
        coin_symbol: 'USDT', 
        currency_symbol:'CNY',
        orderStatus: stateStr,
        page: this.params1.page, 
        size: this.params1.size
      }
      const myOrder = await api.gethlOrderMyOrder(params) 
       
      if (myOrder) { 
        if (!myOrder.status && !myOrder.code) {
          //status 0已取消,1未付款,2超时取消,3已付款,4申诉中,5已完成,6强制取消,7强制完成,8前置审核,9成交失败
          this.datalist = myOrder.data.data
          this.total = myOrder.data.total
        }
      } 
      this.datalist.map(item => {
        item.time = (item.update_at || item.create_time) + (item.timeout_minute || 15) * 1000 * 60 
      })
      
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
    handleCurrentChange(e) { 
      if (this.active === 1 || this.active === 2) {
        this.params1.page = e
        console.log(this.params1.page, '1')
        this.init(this.active)
      } else {
        this.params.page = e 
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
          utils.success(this.$t('otc_seiitm_17'))
          // this.init(this.active) 
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
          utils.success(this.$t('otc_seiitm_16'))
          // this.init(this.active) 
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
          utils.success(this.$t('otc_seiitm_16'))
          // this.init(this.active) 
        } else {
          utils.alert(res.message)
        }
      }  

    },
    //申诉
    async handleClickAppeal(obj) {
      const isok = await utils.confirm(this, {
        title: this.$t('confirm'),
        content: this.$t('otc_otutcol_19')
      })

      if (isok) {
        const res = await api.sethlOrderAppeal({other_order_id: obj.other_order_id})
        if (!res.code && !res.status) {
          utils.success(this.$t('otc_otutcol_20'))
        } else {
          utils.alert(res.message)
        }
      }
    },
    subMarket() {    
      const that = this
      if (utils.$tvSocket) {
        utils.$tvSocket.$destroy()
      }
      utils.$tvSocket = wsNew.create()
      this.socket = utils.$tvSocket 
      this.socket.$on('open', () => {  
        that.socket.heartCheck.start() // 发送一次心跳 
        if (that.state.userInfo) {
          that.socket.socket.send(`{"op":"loginWeb","args":["${that.state.userInfo.session_id}"]}`) 
          that.socket.socket.send(`{"op":"subscribeotc","args":["${state.userInfo.id}"]}`) 
        }  
      }) 
      this.socket.$on('message', (data) => { 
        console.log(data)
        if (data.topic && data.topic==='heart') {
          that.handleHeart()
        } else  if (data.topic && data.topic==='otcUpdate'){
          that.handleSocketData(data) 
        }
      })
      this.socket.$on('reopen', () => {
        that.socket.$destroy()
        that.subMarket()
      })
    },
    handleSocketData(data) { 
      this.init(this.active)
    }, 
    handleHeart(data) {  
      if (this.socket) {
        this.socket.heartCheck.start()
      }
    }, 
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
