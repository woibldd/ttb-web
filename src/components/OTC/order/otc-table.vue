<template>
  <div class="entrust-order-container">
    <!-- ๆๅๅ่กจ -->
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
      <el-table-column :label="$t('otc_order_trade')" width="130">
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
              <!-- ้่ฆ <span>{{$t('otc_authentication')}}</span> -->
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
    <!-- ไพง่พนๆไฝๆ? -->
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
import Vue from 'vue'
import { setInterval, clearInterval } from 'timers'
import otcComputed from '@/components/OTC/mixins/index.js'
import _ from 'lodash'

export default {
  components: {
    sideBar,
    vList,
    transactionBuy,
    transactionSell
  },
  mixins: [otcComputed],
  data() {
    return { 
      tableData: [],
      loading: false,
      showSide: false,
      amount: '',
      operation: 1, // ๆไฝ 1: ไนฐ/ๅ, 2: ๅๅธๅงๆ
      operSide: 1, // ๆไฝ็ฑปๅ 1: ไนฐ ,2: ๅ
      step: 0, // ๆญฅ้ชค, ๆ?นๆฎๆไฝ ๅ ็ฑปๅ ็ไธๅ,ๅฑ็คบไธๅ็็ปๆ
      num: 0,
      input: '',
      state,
      total: 0,
      page: 1,
      size: 10,
      selectedRow: {},
      inter1: 0,
      inter2: 0,
      dis: false
    }
  },
  computed: {
    side() {
      return this.state.otc.showSide
    },
    userInfo() {
      return this.state.userInfo
    }
  },
  watch: {
    // currency() {
    //   for (const symbol of this.symbolList) {
    //     if (symbol.currency == this.currency) {
    //       this.state.otc.symbolInfo = symbol;
    //       return;
    //     }
    //   }
    // },
    legal_currency() {
      this.switchCurrency(this.currency, this.side)
    }

  },
  async created() {
    this.switchCurrency(this.currency, this.side)
    this.$eh.$on('otc:currency:change', (arg1, arg2) => {
      // this.loading = true
      setTimeout(() => {
        // this.loading = false
        this.switchCurrency(arg1, arg2)
       }, 200)
    })

    const $this = this
    // $this.refreshCurrency($this)
    // this.inter1 = setInterval(() => {
    //   $this.refreshCurrency($this)
    // }, 5000);

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

                // target ๆดๆฐๆฐๆฎๆบ๏ผ ๅฏน่ฑก๏ผๆฐ็ป [] {}
                // key ไฝ?่ฆ็ๆ็้ฎๅผ
                // value ไฝ?่ฆ็ๆ็ๅผ
                // console.log('ๆ้ๅท', item.payment_type ,index)
              } else {
                pay_ment_data.push(item.payment_type)
                // console.log('ๆฒก้ๅท', pay_ment_data, index)
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
        console.log(this.selectedRow)
        this.showSide = true
      } else {
        this.$router.push({
          name: 'login'
        })
      }
    },
    closeSideBar() {
      this.showSide = false;
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
                // target ๆดๆฐๆฐๆฎๆบ๏ผ ๅฏน่ฑก๏ผๆฐ็ป [] {}
                // key ไฝ?่ฆ็ๆ็้ฎๅผ
                // value ไฝ?่ฆ็ๆ็ๅผ
                // console.log('ๆ้ๅท', item.payment_type ,index)
              } else {
                pay_ment_data.push(item.payment_type);
                // console.log('ๆฒก้ๅท', pay_ment_data, index)
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
        // this.loading = false;
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
    // refreshCurrency(vm) {
    //    service.otcSymbolList().then(res => {
    //     if (!res.code) {
    //       vm.symbolList = res.data;
    //       for (const symbol of vm.symbolList) {
    //         if (symbol.currency == vm.currency) {
    //           if (!state.otc.symbolInfo) {
    //             state.otc.symbolInfo = symbol
    //           }
    //           Vue.set(state.otc.symbolInfo, 'cny_rate', symbol.cny_rate )
    //         }
    //       }
    //     }
    //   });
    // }
  },
}
</script>

<style lang="scss">
.entrust-order-container {
  margin-top: 20px;
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
span.red {
  color: red;
}
span.orange {
  color: orange;
}

.unit-label {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 40px;
  height: 40px;
  width: 40px;
  // border-right: 1px solid #DDDDDD;
  text-align: center;
  user-select: none;
  font-size: 12px;
}

  .footer {
	  box-shadow:0px 0px 50px #aaaaaa;
    height: 140px;
    position: relative;
    .btn {
      &.buy {
        background-color: $otc-buy-bg;
      }
      &.sell {
        background-color: $otc-sell-bg;
      }
      &.cancel,&.close {
        background-color: #fff;
        color:#333
      }
    }
    .tr.message-box {
     overflow: hidden;
    }
    .msg {
      padding-left: 24px;
      font-size: 14px;
      color: #333;
      &.success {
        background-color: rgba(9,201,137,0.1);
      }
      &.failed {
        background-color: rgba(244,81,81,0.1);
      }
      .iconfont {
        vertical-align: middle;
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
