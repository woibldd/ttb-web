<template>
  <div class="model-container">
    <!--title-->
    <div class="model-it">
      <template v-if="close">
        <div class="action-title">
          确定取消
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
          :style="{color: textDetail.side === 1 ? '#23C88B' : '#F24E4D'}"
          class="action-title"
          v-if="textCode !== 3"
        >
        <!-- {{ textDetail.side | side }} {{ textDetail.currency }} -->
          <!-- {{ $t(textDetail.side ===1 ? 'otc_sideoc_1' : 'otc_sideoc_2')}} -->
          {{textDetail.side ===1 ? $t('order_side_buy') : $t('order_side_sell') }}{{ textDetail.currency }}
        </div>
        <div
          v-else
          :style="{color: textDetail.side === 1 ? '#23C88B' : '#F24E4D'}"
          class="action-title">
          发布 {{ textDetail.side | side }} 委托单 {{ textDetail.currency }}
        </div>
      </template>
      <template v-if="!close">
        <div
          class="step-tip"
          v-if="textDetail.side === 2 && textCode === 0 && !textDetail.appeal && !textDetail.text_appeal">
          <div style="width: 90%;margin:0 auto">
            <el-steps :active="textDetail.state">
              <el-step title="下订单"/>
              <el-step title="等对方付款"/>
              <el-step title="去放币"/>
            </el-steps>
          </div>
        </div>
        <div 
v-if="textDetail.side === 1 && textCode === 0 && !textDetail.appeal && !textDetail.text_appeal"
             class="step-tip">
          <div style="width: 90%;margin:0 auto">
            <el-steps :active="textDetail.state">
              <el-step title="下订单"/>
              <el-step title="线下付款"/>
              <el-step title="点击已付款"/>
              <el-step title="等待放币"/>
            </el-steps>
          </div>
        </div>
        <div
          class="tips"
          v-if="textDetail.time && textCode === 0 && !textDetail.appeal && !textDetail.other_appeal">
          <!--<icon/>-->
          还剩 <count-down :terminal="textDetail.time" />’，超时自动
          <b v-if="textDetail.side === 1 && textDetail.state === 1">取消订单</b>
          <b v-if="textDetail.side === 2 && textDetail.state === 1">取消订单</b>
          <b v-if="textDetail.side === 1 && textDetail.state === 2">放币</b>
          <b v-if="textDetail.side === 2 && textDetail.state === 2">放币</b>
          <b v-if="textDetail.side === 1 && textDetail.state === 7">放币</b>
        </div>
        <template v-if="textCode !== 3">
          <div class="table-con">
            <dl>
              <dt>
                <em>{{$t('otc_transaction_info')}}</em>
                <span
                  style="color: #5D82E1"
                  v-if="textCode === 0">
                  <em
                    v-if="!textDetail.other_appeal"
                    style="color: #FDA22D">
                    {{ textDetail.state | state }}
                  </em>
                  <em
                    v-else
                    style="color: #FDA22D">
                    对方已申诉
                  </em>
                </span>
              </dt>
              <dd>
                <span>{{$t('otc_trans_id')}}</span> <em>{{ textDetail.trans_id || '--' }}</em>
              </dd>
              <dd>
                <span>{{$t('otc_create_time')}}</span><em>
                  <!--{{ textDetail.create_time || '&#45;&#45;' }}-->
                  {{ processValue('create_time', textDetail) || '--' }}
                </em>
              </dd>
              <dd>
                <span>{{$t('orders')}}{{$t('otc_amount_money')}}（CNY）</span><em style="color: #FDA22D">{{ textDetail.total || '--' }}</em>
              </dd>
              <dd>
                <span>{{$t('otc_trans_idjg')}}(CNY)</span><em style="color: #FDA22D">{{ textDetail.price || '--' }}</em>
              </dd>
              <dd>
                <span>{{$t('otc_side_2')}}{{$t('amount')}}</span><em>{{ textDetail.amount || '--' }}</em>
              </dd>
              <template v-if="textDetail.otc_collection">
                <template v-if="textDetail.state !== 1 && textDetail.state !== 6 && textDetail.state !== 4">
                  <dd>
                    <span>{{ textDetail.otc_collection.alipay_account ? $t('payment_namezfb') : textDetail.otc_collection.we_chat_account ? $t('payment_weChat_adasunt') : $t('payment_nameyhk') }}</span>
                    <em>{{ textDetail.otc_collection.alipay_account ? textDetail.otc_collection.alipay_account : textDetail.otc_collection.we_chat_account ? textDetail.otc_collection.we_chat_account : textDetail.otc_collection.card_number }}</em>
                  </dd>
                  <dd v-if="textDetail.otc_collection.card_number">
                    <span>银行类型</span>
                    <em>{{ textDetail.otc_collection.deposit_bank }}</em>
                  </dd>
                  <dd>
                    <span>{{ textDetail.otc_collection.alipay_account ?  $t('payment_namezfb') : textDetail.otc_collection.we_chat_account ? $t('payment_weChat_adasunt') : $t('payment_nameyhk') }}{{$t('name')}}</span>
                    <em>{{ textDetail.otc_collection.name || '--' }}</em>
                  </dd>
                </template>
              </template>
            </dl>
          </div>
          <div class="table-con">
            <dl>
              <dt>
                <em><b v-html="textDetail.side === 1 ? $t('otc_sideoc_2') : $t('otc_sideoc_1')"/>{{$t('otc_sideoc_3')}}</em>
              </dt>
              <dd>
                <span><b v-html="textDetail.side === 1 ? $t('otc_sideoc_2') : $t('otc_sideoc_1')"/>{{$t('otc_sideoc_4')}}</span>
                <em>{{ textDetail.name || '--' }}</em>
              </dd>
              <dd>
                <span>{{$t('otc_register_time')}}</span>
                <em>{{ processValue('register_time', textDetail) || '--' }}</em>
              </dd>
              <dd>
                <span>{{$t('otc_kyc_level')}}</span>
                <em style="color: #FDA22D">{{ 'Kyc' + textDetail.kyc_level || '--' }}</em>
              </dd>
              <dd>
                <span>{{$t('thirty_day_orders')}}</span>
                <em>{{ textDetail.orders_complete || '0' }}</em>
              </dd>
              <dd>
                <span>{{$t('thirty_day_orders_rate')}}</span>
                <em>{{ textDetail.orders_rate ? (Number(textDetail.orders_rate) * 100).toFixed(2) + '%' : '0%' }}</em>
              </dd>
              <dd>
                <span>{{$t('issue_time_avg')}}</span>
                <em>{{ processValue('issue_time_avg', textDetail) || '--' }}</em>
              <!--<em>{{textDetail.issue_time_avg || '&#45;&#45;'}}</em>-->
              </dd>
              <dd>
                <span><b v-html="textDetail.side === 1 ? $t('otc_sideoc_2') : $t('otc_sideoc_1')"/>{{$t('otc_sideoc_5')}}</span>
                <em>{{ textDetail.remark || '--' }}</em>
              </dd>
            </dl>
          </div>
          <div
            class="table-con"
            v-if="textDetail.side === 1 && textDetail.state === 1 && textCode === 0 && !textDetail.appeal && !textDetail.other_appeal">
            <dd>
              <span>支付类型</span>
              <em>
                <el-form
                  ref="form"
                  :model="form"
                  label-width="10px">
                  <el-form-item>
                    <el-select
                      size="small"
                      placeholder="请选择"
                      v-model="form.bankId"
                      @change="bankHandle"
                      style="width: 100%;">
                      <el-option
                        v-for="(item, index) in bankData"
                        :key="index"
                        :label="item.deposit_bank"
                        :value="item.collection_id"/>
                    </el-select>
                  </el-form-item>
                </el-form>
              </em>
            </dd>
            <template v-if="changeFlag">
              <dd>
                <span>支付类型</span>
                <em>{{ activeItem.a_t === 1 ? '银行卡' : activeItem.a_t === 2 ? '支付宝' : '微信' }}</em>
              </dd>
              <dd v-if="activeItem.a_t !== 1">
                <span>支付账号</span>
                <em>{{ activeItem.account }}</em>
              </dd>
              <dd v-else>
                <span>银行卡号</span>
                <em>{{ activeItem.type + '  ' + activeItem.account }}</em>
              </dd>
              <dd v-if="activeItem.name">
                <span>支付姓名</span>
                <em>{{ activeItem.name }}</em>
              </dd>
              <dd v-if="activeItem.img">
                <span>支付图片</span>
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
            </template>
          </div>
        </template>
        <template v-else>
          <div class="table-con">
            <dl>
              <dt>
                <em>委托单信息</em>
              </dt>
              <dd>
                <span>类型</span> <em>{{ textDetail.type === 1 ? '固定价格' : '浮动价格' }}</em>
              </dd>
              <dd>
                <span>币种</span><em>{{ textDetail.currency }}</em>
              </dd>
              <dd>
                <span>单价(CNY)</span><em style="color: #FDA22D">{{ textDetail.price || '--' }}</em>
              </dd>
              <dd>
                <span>数量</span><em>{{ textDetail.amount || '--' }}</em>
              </dd>
              <dd>
                <span>总金额(CNY)</span><em>{{ textDetail.total || '--' }}</em>
              </dd>
              <dd>
                <span>平台服务费</span><em>限时免费</em>
              </dd>
              <dd>
                <span>对手认证等级</span><em style="color: #FDA22D">{{ 'KYC' + textDetail.kyc_level || '--' }}</em>
              </dd>
            </dl>
          </div>
          <!--已完成-->
          <template v-if="textDetail.state === 3 && textDetail.state === 6">
            <div class="table-con">
              <dl>
                <dt>
                  <em><b v-html="textDetail.side === 1 ? '卖' : '买'"/>家信息</em>
                </dt>
                <dd>
                  <span><b v-html="textDetail.side === 1 ? '卖' : '买'"/>家姓名</span>
                  <em v-if="textCode === 0">{{ textDetail.name || '--' }}</em>
                  <em v-else>{{ textDetail.other_name || '--' }}</em>
                </dd>
                <dd>
                  <span>注册时间</span>
                  <em>{{ processValue('register_time', textDetail) || '--' }}</em>
                </dd>
                <dd>
                  <span>认证等级</span>
                  <em>{{ textDetail.kyc_level || '--' }}</em>
                </dd>
                <dd>
                  <span>成交单数</span>
                  <em>{{ textDetail.orders_complete || '0' }}</em>
                </dd>
                <dd>
                  <span>完成率</span>
                  <em>{{ textDetail.orders_rate ? (Number(textDetail.orders_rate) * 100).toFixed(2) + '%' : '0%' }}</em>
                </dd>
                <dd>
                  <span>平均放币时间</span>
                  <em>{{ processValue('issue_time_avg', textDetail) || '--' }}</em>
                <!--<em>{{textDetail.issue_time_avg || '&#45;&#45;'}}</em>-->
                </dd>
                <dd>
                  <span><b v-html="textDetail.side === 1 ? '卖' : '买'"/>家提示</span>
                  <em>{{ textDetail.remark || '--' }}</em>
                </dd>
                <template v-if="textDetail.state !== 1 && textDetail.state !== 6 && textDetail.state !== 4">
                  <dd>
                    <span>{{ textDetail.otc_collection.alipay_account ? '支付宝' : textDetail.otc_collection.we_chat_account ? '微信' : '银行卡' }}</span>
                    <em>{{ textDetail.otc_collection.alipay_account ? textDetail.otc_collection.alipay_account : textDetail.otc_collection.we_chat_account ? textDetail.otc_collection.alipay_account : textDetail.otc_collection.card_number }}</em>
                  </dd>
                  <dd v-if="textDetail.otc_collection.card_number">
                    <span>银行类型</span>
                    <em>{{ textDetail.otc_collection.deposit_bank }}</em>
                  </dd>
                  <dd>
                    <span>{{ textDetail.otc_collection.alipay_account ? '支付宝' : textDetail.otc_collection.we_chat_account ? '微信' : '银行卡' }}姓名</span>
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
        class="tips"
        v-if="textDetail.side === 2 && textDetail.state === 2 && textDetail.state !== 7 && !textDetail.appeal && textCode === 0 && !textDetail.other_appeal">确认收到买家付款后请及时点击【确认放币】，否则请勿点击</div>
      <div
        class="tips1"
        v-if="textDetail.side === 1 && textDetail.state === 1 && textCode === 0 && !close && !textDetail.appeal && !textDetail.other_appeal">
        <div class="tips-con">
          <p>线下转账请注意</p>
          <ul>
            <li>
              <b>请勿备注任何信息</b>
            </li>
            <li>
              请使用<b>实时到账</b>的支付方式。选择支付宝转银行卡、 延时到账等方式造成2小时内未到账，<b>卖家有权延迟 放币或取消订单！</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="step-btn"
      :class="{stepActive: stepActive}">
      <p
        v-if="textDetail.side === 1 && textDetail.state === 1 && textCode === 0 && !close && !textDetail.appeal && !textDetail.other_appeal"
        style="color: #999;font-size: 13px;line-height: 24px;padding: 8px 0;margin-bottom: 10px;">付款完成后请及时点击“已付款”按钮，本平台不提供自动扣款， 请自行付款！</p>
      <a
        href="javascript:;"
        class="close_btn"
        v-if="textCode === 0 && !textDetail.appeal && !textDetail.other_appeal && textDetail.side === 1 && textDetail.state === 1"
        @click="closeHandle">关闭</a>
      <a
        href="javascript:;"
        class="close_btn"
        v-if="textCode === 0 && !textDetail.appeal && !textDetail.other_appeal && textDetail.side === 2 && textDetail.state === 2"
        @click="closeHandle">关闭</a>
      <a
        href="javascript:;"
        class="close_btn"
        v-if="textCode === 0 && !textDetail.appeal && !textDetail.other_appeal && textDetail.side === 2 && textDetail.state === 7"
        @click="closeHandle">关闭</a>
      <template v-if="close">
        <a
          href="javascript:;"
          class="btn_t"
          @click="stepHandle('close')">取消订单</a>
      </template>
      <template v-else>
        <template v-if="textDetail.side === 1 && textDetail.state === 1 && textCode === 0 && !textDetail.appeal && !textDetail.other_appeal">
          <!--<div class="tips">付款完成后请及时点击“已付款”按钮，本平台不提供自动扣款， 请自行付款！</div>-->
          <a
            href="javascript:;"
            class="btn_t"
            @click="stepHandle('money')">确认付款</a>
        </template>
        <template v-if="textDetail.side === 2 && textDetail.state === 2 && !textDetail.appeal && !textDetail.other_appeal && textCode === 0">
          <!--<div class="tips">确认收到买家付款后请及时点击【确认放币】，否则请勿点击</div>-->
          <a
            href="javascript:;"
            class="btn_t"
            @click="stepHandle('down')">确认放币</a>
        </template>
        <template v-if="textDetail.side === 2 && textDetail.state === 7 && !textDetail.appeal && !textDetail.other_appeal && textCode === 0">
          <!--<div class="tips">确认收到买家付款后请及时点击【确认放币】，否则请勿点击</div>-->
          <a
            href="javascript:;"
            class="btn_t"
            @click="stepHandle('down')">确认放币</a>
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
import {tradeMixins} from './mixins'
import countDown from '@/components/CountDown'
import processValue from '@/mixins/process-otc-value.js'
export default {
  props: ['textDetail', 'bankData', 'textCode', 'close', 'stepActive', 'bankId'],
  mixins: [tradeMixins, processValue],
  data () {
    return {
      changeFlag: false,
      form: {
        bankId: '',
        activeItem: {}
      },
      qrsrc: '',
      showQRcode: false
    }
  },
  components: {
    countDown
  },
  methods: {
    openQR (collection_img) {
      this.qrsrc = collection_img
      this.showQRcode = true
    },
    stepHandle (type) {
      this.$emit('step-change', type)
    },
    closeHandle () {
      this.$emit('close-change')
    },
    bankHandle () {
      this.changeFlag = true
      this.activeItem = {}
      if (this.bankData.length > 0) {
        this.bankData.forEach((item) => {
          if (this.form.bankId === item.collection_id) {
            const payType = item.obj.payment_type === 1 ? item.obj.deposit_bank : item.obj.payment_type === 2 ? '支付宝' : '微信'
            const payAccount = item.obj.alipay_account ? item.obj.alipay_account : item.obj.card_number ? item.obj.card_number : item.obj.we_chat_account
            this.activeItem = {
              name: item.obj.name,
              img: item.obj.collection_img,
              type: payType,
              a_t: item.obj.payment_type,
              account: payAccount
            }
          }
        })
      }
      this.$emit('bank-change', this.form.bankId)
    }
  },
  watch: {
    bankData () {
      if (this.bankId) {
        this.form.bankId = this.bankId
        this.bankHandle()
      } else if (this.bankData && this.bankData.length > 0) {
        let arr = this.bankData.filter(arg => arg.obj.payment_type === 1)
        if (arr.length > 0) {
          this.form.bankId = arr[0].collection_id
        }
        this.bankHandle()
      }
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
