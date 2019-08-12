<template>
  <div class="main-tabs-container">
    <div class="main-tabs-box  clear-fix">
      <div class="tab-left pull-left">
        <div  class="side-buy tab ">
          <!-- <label>{{$t('otc_side_1')}}</label> -->
          <!-- <button class='btn_left'
                  :class="{'active' : currency==='USDT','active-side': side===1  }"
                  @click="setCurrency('USDT', 1)"
          >USDT</button>
          <button
            class='btn_left'
            :class="{'active' : currency==='BTC','active-side': side===1 }"
            @click="setCurrency('BTC', 1)"
          >BTC</button> -->
          <button
            class='btn_left'
            :class="{'active' : currency==='BTC','active-side': side===1  }"
            @click="changeSide(1)"
          >{{$t('otc_side_1')}}</button>
        </div>
        <div class="side-sell tab">
          <!-- <label>{{$t('otc_side_2')}}</label> -->
          <button
            class='btn_left'
            :class="{'active' : currency==='BTC','active-side': side===2  }"
            @click="changeSide(2)"
          >{{$t('otc_side_2')}}</button>
          <!-- <button class='btn_left'
                  :class="{'active' : currency==='USDT','active-side': side===2  }"
                  @click="setCurrency('USDT', 2)"
          >USDT</button>
          <button
            class='btn_left'
            :class="{'active' : currency==='BTC','active-side': side===2  }"
            @click="setCurrency('BTC', 2)"
          >BTC</button> -->
        </div>
      </div>
      <div class="tab-right pull-right" style="margin-top:-5px!important;" >
        <label  class='label'>{{$t('otc_legal_currency')}}</label>
        <span class="el-dropdown-link currency">
          {{legal_currency}}
        </span>
        <button
          class="btn"
          @click="openSideBar()"
        >{{$t('otc_publish_order')}}</button>
      </div>
    </div>
    <div class="otc-buy-ac" v-if="side === 1 && currency==='USDT' && legal_currency==='CNY'">
      <div class="line"></div>
      <div class="select-item">
        <el-row>
          <el-col :span="10">
            <span class="font24 font-weight font-base title-text">{{$t('yj_mb')}}</span>
            <span class="font-gray">{{$t('xe_je')}}</span>
          </el-col>
          <el-col :span="11">
            <el-input v-model="ipt" :placeholder="active=='0' ?  $t('b_price_i') : $t('b_account_i')" style="width: 98%">
              <el-select v-model="active" slot="prepend" :placeholder="$t('please_choose')" style="width: 120px" @change="change">
                <el-option :label="$t('b_1')" value="0"></el-option>
                <el-option :label="$t('b_2')" value="1"></el-option>
              </el-select>
            </el-input>
            <div
              class="unit-label" style='right:130px'
              v-html="active=='0' ? 'CNY' : 'USDT'"/>
          </el-col>
          <el-col :span="3">
            <el-button style="width: 118px;float: right" type="primary" @click="buySubmit">{{$t('otc_buy_currency', {currency: 'USDT'})}}</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="line"></div>
    </div>
    <div class="otc-buy-ac" v-if="side === 2 && currency==='USDT' && legal_currency==='CNY'">
      <div class="line"></div>
      <div class="select-item">
        <el-row>
          <el-col :span="10">
             <span class="font24 font-weight font-base title-text">{{$t('yj_mb1')}}</span>
            <span class="font-gray">{{$t('xe_je')}}</span>
          </el-col>
          <el-col :span="11">
            <el-input :placeholder="active=='0' ? $t('a_price_i') : $t('a_account_i')" v-model="ipt" style="width: 98%">
              <el-select v-model="active" slot="prepend" :placeholder="$t('please_choose')" style="width: 120px" @change="change">
                <el-option :label="$t('a_1')" value="0"></el-option>
                <el-option :label="$t('a_1')" value="1"></el-option>
              </el-select>
            </el-input>
            <div
              class="unit-label" style='right:130px'
              v-html="active=='0' ? 'CNY' : 'USDT'"/>

          </el-col>
          <el-col :span="3">
            <el-button style="width: 118px;float: right" type="sell" @click="sellSubmit">{{$t('otc_sell_currency', {currency: 'USDT'})}}</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="line"></div>
    </div>
    <!-- 侧边操作栏 -->
    <side-bar :open.sync="showSide" >
      <orderBuy @closeSide="colseSideBar"
                :show="showSide" />
    </side-bar>
  </div>
</template>

<script>
import { state } from "@/modules/store";
import sideBar from "@/components/VSideBar";
import orderBuy from "@/components/OTC/order/orderForm/orderBuy"
import utils from '@/modules/utils'
export default {
  data() {
    return {
      state,
      showSide: false,
      operation: 1, // 操作 1: 买/卖, 2: 发布委托
      operSide: 1,
      ipt: '',
      active: '0'
    }
  },
  components: {
    sideBar,
    orderBuy,
  },
  computed: {
    side: {
      get() {
        return this.state.otc.showSide
      },
      set(value) {
        this.state.otc.showSide = value
      }
    },
    currency: {
      get() {
        return this.state.otc.currency
      },
      set(value) {
        this.state.otc.currency = value
      }
    },
    legal_currency: {
      get () {
        return state.otc.legal_currency
      },
      set (value) {
        state.otc.legal_currency = value
      }
    },
  },
  methods: {
    change(code) {
      this.ipt = ''
    },
    buySubmit() {
      if (this.active === "0") {//金额
        if (this.$big(Number(this.ipt)).lt(100)) {
          this.$message.warning(this.$t('zd_xe'))
          return
        }
        else if (this.$big(Number(this.ipt)).gt(50000)) {
          this.$message.warning(this.$t('gm_sl'))
          return
        }
      } else if (this.active === "1") { //数量
        if (!Number(this.ipt) || isNaN(Number(this.ipt)) || this.$big(Number(this.ipt)).lte(0)) {
          this.$message.warning(this.$t('otc_ziurec_2'))
          return
        }
      }
      this.$router.push({
        path: '/Superzis',
        query: {
          active: this.active,
          amount: this.ipt,
          currency: 'USDT'
        }
      })
    },
    sellSubmit() {
      if (this.active === "0") {//金额
        if (this.$big(Number(this.ipt)).lt(100)) {
          this.$message.warning(this.$t('zd_xe'))
          return
        }
        else if (this.$big(Number(this.ipt)).gt(50000)) {
          this.$message.warning(this.$t('gm_sl'))
          return
        }
      } else if (this.active === "1") { //数量
        if (!Number(this.ipt) || isNaN(Number(this.ipt)) || this.$big(Number(this.ipt)).lte(0)) {
            this.$message.warning(this.$t('otc_ziurec_2'))
          return
        }
      }
      this.$router.push({
        path: '/byamount',
        query: {
          active: this.active,
          amount: this.ipt,
          currency: 'USDT'
        }
      })
    },
    // setCurrency(coin, side) {
    //   this.active = '0'
    //   this.currency = coin
    //   this.state.otc.showSide = side
    //   this.$eh.$emit('otc:currency:change', coin, side)
    // },
    changeSide(side) {
      this.state.otc.showSide = side
      this.$eh.$emit('otc:currency:change', this.currency, side)
    },
    openSideBar () {
      if (window.localStorage.getItem('X-TOKEN')) {
        this.operation = 2
        this.operSide = this.side
        this.showSide = true;
      } else {
        this.$router.push({
          name: 'login'
        })
      }
    },
    colseSideBar() {
      this.showSide = false;
    }
  }
}
</script>

<style lang="scss">
  .main-tabs-container {
    margin-top: 20px;
    .main-tabs-box {
      font-size: 16px;
      padding: 10px 0 10px 0;
      vertical-align: middle;
      overflow: hidden;
      // background-color: #80b1b4;
      button {
        border: none;
        background: rgba(0,0,0,0);
        color: #999999;
        padding: 5px 20px 0 0;
        cursor: pointer;
      }
      label {
        font-size: 16px!important;
        padding: 5px 15px 5px 0;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
      }
      .tab-left {
        width: 50%;
        display: flex;
        .tab {
          &:last-child {
            padding-left: 20px;
            label {
              padding: 5px 15px;
              font-size:16px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(51,51,51,1);
            }
            border-left: 1px solid #999;
          }
        }
        .btn_left {
          &.active.active-side{
            color:#01CED1;
            text-decoration: underline;
            font-weight: bold;
            font-size: 14px;
            padding-bottom: 6px;
          }
        }
      }
      .tab-right {
        .currency {
          color: $primary;
          margin-right:30px
        }
        .btn {
          padding: 10px 26px;
          border-radius: 5px;
          background-color: $primary;
          color:#fff;
        }
      }
    }
  }
  @media (max-width: 1378px) {
    .main-tabs-container .main-tabs-box .tab-right .btn {
      padding: 7px 16px!important;
    }
    .main-tabs-container .main-tabs-box .tab-right .currency {
      font-size: 12px!important;
    }
    .main-tabs-container .main-tabs-box label {
      font-size: 16px!important;
    }
  }
  .otc-buy-ac {
    overflow: hidden;
    .line {
      height:6px;
      background:rgba(245,246,248,1);
      border-radius:2px;
    }
    .select-item {
      padding: 20px 0;
      .el-select .el-input__inner:focus {
        border-color: transparent!important
      }
    }
    .title-text{
      font-size: 18px;
      color: #1a1a1a;
      line-height: 40px;
      padding-right:10px;
    }
    .font-gray {
      color: #bbb;
      font-size: 14px;
    }
  }
   .active-side {
        color:#01CED1!important;
        text-decoration: underline;
        font-weight: bold;
        font-size: 14px;
        padding-bottom: 6px;
    }
</style>
