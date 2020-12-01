<template>
  <div>
    <div class="entrust-order-container">
      <div class="entrust-order-nav" flex="cross:center main:justify">
        <div>
          <el-button-group class="mr-15">
            <el-button @click="handleClickSetSide(1)" :type="side===1 ? 'success' : ''">{{$t('otc_side_1')}}</el-button>
            <el-button @click="handleClickSetSide(2)" :type="side===2 ? 'danger' : ''">{{$t('otc_side_2')}}</el-button>
          </el-button-group>
          <el-select v-model="currentDigital" @change="handleChangeDigital" placeholder="请选择">
            <el-option
              v-for="(item, index) in digitalCurrencyList"
              :key="index"
              :label="item.currency"
              :value="item.currency">
                <label ><icon :name="`coin-${item.currency}`"/> {{item.currency}}</label>
            </el-option>
          </el-select> 
        </div>
        <div>
          <label class="text-primary" @click="handleClickNowOrder"><icon name="add"  class="mr-5"/>{{$t('otc_publish_order')}}</label>
        </div>
      </div>
      <div class="entrust-order-content">
        <!-- 挂单列表 -->
        <el-table v-loading="loading" :data="tableData" style="width: 100%" :empty-text="$t('no_data')">
          <el-table-column :label="$t('otc_position')" type="index"/>
          <el-table-column :label="$t('otc_completed_info')" prop="name" width="180">
            <template slot-scope="scope">
              {{ `${scope.row.name}(${scope.row.thirty_day_orders}/` }}
              {{ $big(scope.row.thirty_day_orders_rate || 0).mul(100) | fixed(0) }}%)
            </template>
          </el-table-column>
          <el-table-column :label="$t('otc_price',{legal_currency})" prop="price">
            <template slot-scope="scope">
              <div>
                {{ $big(scope.row.price || 0) | fixed(2) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('otc_amount',{currency})" prop="amount">
            <template slot-scope="scope">
              <div>
                {{ $big(scope.row.amount).minus(scope.row.freezed).toString() }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('otc_total',{legal_currency})" prop="total">
            <template slot-scope="scope">
              <div>
                {{ $big(scope.row.amount).minus(scope.row.freezed).mul(scope.row.price) | fixed(2) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('otc_order_quota',{legal_currency})" prop="quota"/>
          <el-table-column :label="$t('otc_payment_method')" prop="payment_type">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.pay_ment_data" :key="index" style="display: inline-block;margin-right: 4px;">
                <!-- <icon
                  :class="item === '1' ? 'card active' : item === '2' ? 'alipay active' :  item === '3' ? 'wechat active' : ''"
                  :name="item === '1' ? 'bank-card' : item === '2' ? 'alipay' :  item === '3' ? 'wechat' : ''"
                /> -->
                <icon v-if="index < 3" :name="paytype(item)" />
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('otc_order_trade')" width="140">
            <template slot-scope="scope">
              <div>
                <button
                  v-if="isLogin && scope.row.user_id == userInfo.id"
                  class="btn my"
                >{{ $t('my_order') }}</button>
                <div v-else-if="isLogin && scope.row.kyc_level > userInfo.lv">
                  <div
                    @click="clickVerifyRow('Kyc')"
                    v-html="$t('otc_need_authentication', {side: $t('otc_side_'+side)} )"
                  />
                  <!-- 需要 <span>{{$t('otc_authentication')}}</span> -->
                </div>
                <button
                  v-else-if="side===1"
                  class="btn buy"
                  @click="openSideBar(scope.row)"
                >{{ $t('otc_buy_currency', {currency}) }}</button>
                <button
                  v-else-if="side===2"
                  class="btn sell"
                  @click="openSideBar(scope.row)"
                >{{ $t('otc_sell_currency', {currency}) }}</button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :pager-count="5"
          class="pagination"
          :page-size="size"
          background
          :total="total"
          layout="prev, pager, next"
        />
      <!-- 侧边操作栏 -->
      <side-bar :open.sync="showSide">
        <transactionBuy
          v-if="operation===1 && operSide===1"
          :show="showSide"
          :view="selectedRow"
          @closeSideBar="closeSideBar"
        />
        <transactionSell
          v-if="operation===1 && operSide===2"
          :show="showSide"
          :view="selectedRow"
          @closeSideBar="closeSideBar"
        />
      </side-bar>
      </div> 
    </div>
    <side-bar :open.sync="showOrderSide" >
      <orderBuy
        :show="showOrderSide"
        @closeSide="closeSideBar" />
    </side-bar>

  </div>
</template>

<script>
import service from '@/modules/service'
import { state, actions } from '@/modules/store'
import utils from '@/modules/utils'
import processValue from '@/mixins/process-contract-value'
import sideBar from '@/components/VSideBar'
import vList from '@/components/OTC/vlist/vertical-table'
import transactionBuy from '@/components/OTC/order/transaction/transactionBuy'
import transactionSell from '@/components/OTC/order/transaction/transactionSell'
import orderBuy from '@/components/OTC/order/orderForm/orderBuy'
import Vue from 'vue'
import { setInterval, clearInterval } from 'timers'
import otcComputed from '@/components/OTC/mixins/index.js'
import _ from 'lodash'

export default {
  components: {
    sideBar,
    vList,
    transactionBuy,
    transactionSell,
    orderBuy
  },
  mixins: [otcComputed],
  data() {
    return { 
      tableData: [],
      loading: false,
      showSide: false,
      showOrderSide: false,
      amount: '',
      operation: 1, // 操作 1: 买/卖, 2: 发布委托
      operSide: 1, // 操作类型 1: 买 ,2: 卖
      step: 0, // 步骤, 根据操作 和 类型 的不同,展示不同的结果
      num: 0,
      input: '',
      state,
      total: 0,
      page: 1,
      size: 10,
      selectedRow: {},
      inter1: 0,
      inter2: 0,
      dis: false, 
      digitalCurrencies: [],
      currentDigital: 'USDT',
      fiatCurrencies: [],
    }
  },
  computed: {
    side() {
      return this.state.otc.showSide
    },
    userInfo() {
      return this.state.userInfo
    },
    digitalCurrencyList() {
      return this.digitalCurrencies
    },
    fiatCurrencyList() {
      return this.fiatCurrencies
    }
  },
  watch: { 
    legal_currency() {
      this.switchCurrency(this.currency, this.side)
    } 
  },
  async created() { 
    this.getCurrencyList()
    this.switchCurrency(this.currency, this.side) 

    const $this = this  
    this.inter2 = setInterval(() => {
      const orderSide = this.side == 1 ? 2 : 1
      service
        .getOtcOrderList({
          currency_type: this.legal_currency,
          currency: this.currency,
          side: orderSide,
          page: this.page,
          size: 30
        })
        .then(res => {
          if (!res.code) {
            this.tableData = res.data.data
            this.tableData.forEach((item, index) => {
              let pay_ment_data = [] 
              if (item.payment_type.includes(',')) {
                pay_ment_data = item.payment_type.split(',') 
              } else {
                pay_ment_data.push(item.payment_type) 
              }
              Vue.set(item, 'pay_ment_data', _.sortBy(pay_ment_data, n => n))
            })
          }
        })
    }, 5000)
  },
  beforeDestroy() {
    this.$eh.$off('otc:currency:change')
    clearInterval(this.inter1)
    clearInterval(this.inter2)
  },
  methods: {
    handleClickSetSide(side) {
      this.state.otc.showSide=side
      this.switchCurrency(this.currency, side)
    },
    handleChangeDigital(currency) {
      this.currency = currency
      this.switchCurrency(currency, this.side)
    },
    paytype(type) {
      return {
        1: "bank-card",
        2: "alipay",
        3: "wechat",
        4: "paynow",
        5: "paylah"
      }[type]
    }, 
    openSideBar (row) {
      if (window.localStorage.getItem('X-TOKEN')) {
        this.operation = 1
        this.operSide = this.side
        this.selectedRow = row 
        this.showSide = true
      } else {
        this.$router.push({
          name: 'login'
        })
      }
    },
    closeSideBar() {
      this.showSide = false;
      this.showOrderSide = false
    },
    handleClickNowOrder() {
      this.showOrderSide = true
    },
    async switchCurrency(currency, side) {
      this.tableData = []
      this.loading = true
      try {
        let orderSide = side == 1 ? 2 : 1;
        let res = await service.getOtcOrderList({
          currency_type: this.legal_currency,
          currency,
          side: orderSide,
          page: this.page,
          size: 30
        });
        if (!res.code) {
          setTimeout(() => {
            this.loading = false
            this.tableData = res.data.data;
            this.tableData.forEach((item, index) => {
              let pay_ment_data = []; 
              if (item.payment_type.includes(",")) {
                pay_ment_data = item.payment_type.split(",");  
              } else {
                pay_ment_data.push(item.payment_type); 
              }
              Vue.set(item, "pay_ment_data", _.sortBy(pay_ment_data, n => n));
            });
          }, 200)
        } else {
          utils.alert(res.message);
        }
      } catch (error) {
        console.log(error);
      } finally { 
      }
    },
    clickVerifyRow(v) {
      this.$router.push({
        name: v
      });
    },
    refreshOrderList() {
      try {
        let orderSide = side == 1 ? 2 : 1;
        service
          .getOtcOrderList({
            currency_type: this.legal_currency,
            currency,
            side: orderSide,
            page: this.page,
            size: 30
          })
          .then(res => {
            if (!res.code) {
              this.tableData = res.data.data;
            } else {
              utils.alert(res.message);
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    getCurrencyList() { 
      service.otcSymbolList({}).then((res) => {
        if (res.code === 0) { 
          // this.$set(this, "currencyList", res.data ) 
          this.digitalCurrencies = res.data 
          if (!this.state.otc.symbolInfo) {
            this.state.otc.symbolInfo = res.data[0]
          }
        }
      })
    }, 
  },
}
</script>

<style lang="scss">
.entrust-order-container {
  .entrust-order-nav {
    margin: 0 auto;
    width: 1200px;
    height: 130px; 
  }
  .entrust-order-content {
    margin: 0 auto;
    width: 1200px;
    .el-table {
      th {
        .cell  {
          word-break: break-word;
        }
      }
    }
    .btn {
      border: none;
      border-radius: 3px;
      /*background: rgba(0, 0, 0, 0);*/
      color: #fff;
      padding: 7px 14px;
      cursor: pointer;
      &.buy {
        background-color: $otc-buy-bg;
        &:hover {
          background-color: $otc-buy-bg-light;
        }
      }
      &.sell {
        background-color: $otc-sell-bg;
        &:hover {
          background-color: $otc-sell-bg-light;
        }
      }
      &.cancel {
        border: 1px solid #ccc;
        background-color: #fff;
        color: #333;
        &:hover {
          background-color: #ccc;
        }
      }
      &.my {
        color: $primary;
        border: 1px solid $primary;
      }
    }
    .title {
      &.buy {
        color: $otc-buy-bg;
      }
      &.sell {
        color: $otc-sell-bg;
      }
    }
    .pagination {
      padding-top: 20px;
      text-align: center;
      &.el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: $primary !important;
        color: #fff;
      }
    }
    .otcaction {
      padding: 0;
      .message {
        margin: 10px 40px;
        padding: 8px 12px;
        background-color: rgba(253, 162, 45, 0.1);
        .iconfont {
          font-size: 1em;
        }
        &.count-down {
          margin: 0 40px;
          color: #5d82e1;
          background-color: rgba(237, 246, 255, 0.5);
        }
      }

      .action-title {
        padding: 0 40px;
        margin-bottom: 20px;
        //color: $otc-buy-bg;
        font-size: 24px;
        font-weight: bold;
      }
      .action-steps {
        margin: 10px 40px;
        background-color: #f9fafc;
      }
      .wrap {
        margin: 10px 40px;
        table {
          width: 100%;
          font-size: 14px;
          th {
            text-align: left;
            border-bottom: 1px solid #ccc;
            &.status {
              text-align: right;
            }
          }
          tr {
            line-height: 25px;
          }
        }
      }
      .action-order {
        padding: 0 40px;
        margin-top: 20px;
        border-top: 10px solid #f7f9fb;
        padding-top: 20px;
        ul {
          margin: 0;
          flex: 1;
          li {
            @include clearfix();
            line-height: 40px;
            margin: 5px 0;
          }
          .label {
            //color: #acacac;
            float: left;
            box-sizing: border-box;
            min-height: 20px;
            width: 30%;
          }
          .content {
            position: relative;
            width: 65%;
            float: right;
            box-sizing: border-box;
            .number-input {

              &.input {
                font-family: monaco Trebuchet MS, Tahoma, Arial, sans-serif;
                outline: none;
                border: 1px solid #666666;
                border-radius: 3px;
                background-color: transparent;
                width: 100%;
                height: 40px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                line-height: 20px;
                font-size: 14px;
                padding: 9px 60px 9px 9px;
                //color: #ffffff;
              }
              .label {
                color: #d7d7d7;
              }
            }
            .btn-all {
              display: inline-block;
              position: absolute;
              padding-right: 6px;
              bottom: 2px;
              right: 2px;
              background: #ffffff;
              line-height: 37px;
              font-size: 14px;
              cursor: pointer;
              color: #5d82e1;
            }

            .estimate {
              text-align: right;
              color: #acacac;
              font-size: 12px;
            }
          }
        }

        .action-button-group {
          margin-top: 20px;
          .btn-left {
            float: left;
            .btn {
              &.w-110 {
                width: 85px;
                margin-right: 19px;
              }
              &.w-208 {
                width: 155px;
              }
            }
          }
        }
      }
      .footer {
        // background: #333;
        flex: 0 0 auto;
        height: 100px;
      }
    }

    .el-number-input,
    .el-input__inner,
    .el-textarea__inner {
      position: relative;
      width: 217px;
      .el-input-number {
        width: 100%;
      }
      .el-input-number /deep/ .el-input__inner {
        text-align: left !important;
      }
    }
    
  }
}  
@media (max-width: 1378px) {
  .entrust-order-container .otcaction .action-title{
    font-size: 16px!important;
  }
  .entrust-order-container .otcaction .wrap table {
    font-size: 12px!important;
  }
  .entrust-order-container .el-step__title{
    font-size: 12px!important;
  }
  .entrust-order-container .otcaction .action-order ul .content .number-input.input {

    height: 36px!important;
    line-height: 36px!important;
  }
  .entrust-order-container .otcaction .action-order ul .label {
    font-size: 13px!important;
  }
  .entrust-order-container .otcaction .action-order ul .content .btn-all {
    bottom: 5px!important;
    line-height: 28px!important;
  }
}
</style>
