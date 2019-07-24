<template>
  <div class="main-tabs-container">
    <div class="main-tabs-box  clear-fix">
      <div class="tab-left pull-left">
        <div  class="side-buy tab ">
          <label>{{$t('otc_side_1')}}</label>
          <button class='btn_left'
                  :class="{'active' : currency==='USDT','active-side': side===1  }"
                  @click="setCurrency('USDT', 1)"
          >USDT</button>
          <button
            class='btn_left'
            :class="{'active' : currency==='BTC','active-side': side===1 }"
            @click="setCurrency('BTC', 1)"
          >BTC</button>
        </div>
        <div class="side-sell tab">
          <label>{{$t('otc_side_2')}}</label>
          <button class='btn_left'
                  :class="{'active' : currency==='USDT','active-side': side===2  }"
                  @click="setCurrency('USDT', 2)"
          >USDT</button>
          <button
            class='btn_left'
            :class="{'active' : currency==='BTC','active-side': side===2  }"
            @click="setCurrency('BTC', 2)"
          >BTC</button>
        </div>
      </div>
      <div class="tab-right pull-right" style="margin-top:-5px!important;" >
        <label  class='label'>{{$t('otc_legal_currency')}}</label> 
        <!-- <span class="el-dropdown-link currency">
          {{legal_currency}} 
        </span> -->
        <el-dropdown @command="changeCoin">
          <span class="el-dropdown-link currency">
            {{legal_currency}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown"> 
            <el-dropdown-item 
              v-for="(item,idx) in dataList"
              :key="idx" 
              :command="item.name"
              > 
              {{item.name}}
            </el-dropdown-item> 
          </el-dropdown-menu>
        </el-dropdown>
        <button
          class="btn"
          @click="openSideBar()"
        >{{$t('otc_publish_order')}}</button>
      </div>
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
import otcComputed from '@/components/OTC/mixins/index.js'


export default {
  data() {
    return {
      state,
      showSide: false,
      operation: 1, // 操作 1: 买/卖, 2: 发布委托
      operSide: 1,
      dataList: [
        {
          name: "CNY",
          rate: "cny_rate",
          symbol: '￥'
        },
        { 
          name: "SGD",
          rate: "sgd_rate",
          symbol: 'S$'
        }
      ]
    }
  },
  mixins: [otcComputed],
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
    setCurrency(coin, side) {
      this.currency = coin
      this.state.otc.showSide = side
      this.$eh.$emit('otc:currency:change', coin, side)
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
    },
    changeCoin(command) {
      this.legal_currency = command
    }
  }
}
</script>

<style lang="scss">
 .main-tabs-container {
      margin-top: 20px;
      .main-tabs-box {
        font-size: 16px;
        padding: 18px 36px;
        vertical-align: middle;
        // background-color: #80b1b4;
        button {
          border: none;
          background: rgba(0,0,0,0);
          color: #999999;
          padding: 5px 15px;
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
            flex: 1;
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
            &.active.active-side {
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
</style>
