<template>
  <div class="home-container">
    <div class="home">
      <div class="homelayout">
        <h1>一键买币</h1>
        <p class="reference">
          <icon 
class="log"
                name="logug" />参考单价：
          <span>1233132 {{ $t('CNY/USDT') }}</span>
        </p>
        <!-- <span class="tips">非最终交易单价，仅供参考</span -->
        <p class="price">
          <span @click="swietch()">按金额购买</span>|<span @click="swictch()">按数量购买</span>
        </p>

        <br >
        <number-input 
v-if="(count==1)"
                      v-model="TransactionAmount" 
class="number-input" size="medium" placeholder="请输入金额" />

        <number-input 
v-if="(count==2)"
                      class="number-input" 
placeholder="请输入数量" />

        <span class="posn">CNY</span>
        <h3 class="paymentmethod">选择付款方式</h3>
        <!-- <a class="zhifu">支付宝<icon class="ic" name="zhongdian"/></a>
        <a class="zhifu">银行卡<icon class="ic" name="zhongdian"/></a>
        <a class="zhifu">微信  <icon class="ic" name="zhongdian"/></a>-->
        <div class="pay-container">
          <div
            class="pay-list-item"
            v-for="(item, index) in taldata"
            :key="index"
            :class="{active: active === index}"
            @click="payHandle(item, index)"
          >{{ item }}</div>
        </div>
        <p class="Transactiondetails">
          成交单价：
          <span style="color: #FDA22D">{{ active }}</span>
        </p>
        <p class="Transactiondetails">
          成交数量：
          <span>0</span>
        </p>
        <p class="Transactiondetails">
          成交总额：
          <span>{{ TransactionAmount }}</span>
        </p>
        <el-button 
v-if="btn"
                   class="buttom" 
type="primary">
          <span>购买USDT</span>
        </el-button>
        <el-button
          v-if="!btn"
          class="buttom"
          style="background:rgba(253,162,45,1);margin-left: -1px;"
          type="warning"
        >
          <span>报价已过期,点击获取最新价格</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import service from '@/modules/service'
import qs from 'qs'
// import Tooltip from 'element-ui'
// Vue.use(Tooltip)
export default {
  data () {
    return {
      count: 1,
      btn: true,
      index_via: 0,
      index_vib: 0,
      index_vic: 0,
      TransactionAmount: 0,
      taldata: ['支付宝', '银行卡', '微信'],
      active: 0,
      user_id: 941238,
      currency: 'BTC',
      by_cny: 50000,
      active_id: 10000
    }
  },
  created () {
    this.item()

    // this.getAllCoinTypes();
  },
  methods: {
    swictch () {
      this.TransactionAmount = 0
      this.count = 2
    },
    swietch () {
      this.count = 1
    },
    payHandle (item, index) {
      //   this.active = index;
      if (index === 0) {
        this.active = this.index_via
      } else if (index === 1) {
        this.active = this.index_vib
      } else if (index === 2) {
        this.active = this.index_vic
      }
    },
    item () {
      let data = {
        currency: this.currency
      }
      axios.post(
        'http://192.168.0.124:8889/otcactive/findMinactive',
        qs.stringify(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
        .then(res => {
          this.index_via = res.data.data[0].otc_active.price
          this.index_vib = res.data.data[1].otc_active.price
          this.index_vic = res.data.data[2].otc_active.price
        })
    }
    // getAllCoinTypes() {
    //   const param = {
    //     user_id: this.user_id,
    //     currency: this.currency,
    //     by_cny: this.by_cny
    //   };
    //   return service.canbullWithdraw(param).then(res => {
    //     // console.log(res)
    //   });
    // }
  }
}
</script>
<style  lang="scss" >
@font-face {
  font-family: "mokeic"; /* project id 1279523 */
  src: url("//at.alicdn.com/t/font_1279523_zikrsl7wm6.eot");
  src: url("//at.alicdn.com/t/font_1279523_zikrsl7wm6.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1279523_zikrsl7wm6.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1279523_zikrsl7wm6.woff") format("woff"),
    url("//at.alicdn.com/t/font_1279523_zikrsl7wm6.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1279523_zikrsl7wm6.svg#iconfont") format("svg");
}
.mokeic {
  font-family: "mokeic" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.iccons {
  width: 46px;
  height: 28px;
  background: rgba(35, 206, 208, 1);
  border: 1px solid rgba(35, 206, 208, 1);
  border-radius: 6px;
}
.container {
  overflow: hidden;
  background: rgba(247, 247, 247, 1);
}
.home {
  width: 860px;
  margin: 70px auto;
  background: #fff;
  padding-bottom: 40px;
  box-shadow: 0px 2px 15px 0px rgba(221, 221, 221, 1);
  border-radius: 4px;
  overflow: hidden;
  //   background-color: rgba(247, 240, 240, 0.925);
  .homelayout {
    margin-left: 98px;

    h1 {
      margin-top: 30px;
      width: 80px;
      height: 20px;
      font-size: 20px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 30px;
    }
    .reference {
      width: 285px;
      height: 17px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-bottom: 48px;

      .log {
        margin: 0 5px;
      }

      span {
        color: #333333;
      }
    }
    .price {
      width: 203px;
      height: 17px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      span {
        display: inline-block;
        margin: 0 9px;
        color: #999999;
      }
      span:hover {
        color: #000;
        cursor: pointer;
      }
    }
    .number-input {
      width: 642px;
      height: 48px;
      line-height: 48px;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      text-indent: 15px;
      margin: 15px 0;
      font-size: 20px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(92, 92, 92, 1);
    }
    .posn {
      position: relative;
      left: -58px;
      font-size: 18px;
      color: rgba(117, 241, 248, 1);
    }
    .paymentmethod {
      width: 96px;
      height: 17px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .pay-container {
      height: 48px;
      overflow: hidden;
      width: 646px;
      display: flex;
      text-align: center;
      justify-items: center;
      align-items: center;
      overflow: hidden;
      margin: 16px 0;
      .pay-list-item {
        flex: 1;
        height: 48px;
        line-height: 48px;
        box-sizing: border-box;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:nth-child(2) {
          margin: 0 20px;
        }
        &::after {
          content: "\e6a2";
          width: 40px;
          height: 40px;
          color: transparent;
          position: absolute;
          right: -9px;
          bottom: -5px;
          font-family: "mokeic";
          font-size: 24px;
        }
        &:hover {
          border-color: #23ced0;
        }
      }
      .active {
        &::after {
          color: #23ced0;
        }
      }
    }
    //     .zhifu {
    //       width: 200px;
    //       height: 48px;
    //       line-height: 48px;
    //       border: 1px solid rgba(204, 204, 204, 1);
    //       color:rgba(204, 204, 204, 1);;
    //       border-radius: 6px;
    //       display: inline-block;
    //       text-align: center;
    //       margin-top: 20px;
    //       margin-right: 5px;
    //       font-size: 18px;
    //       font-family: MicrosoftYaHei;
    //       font-weight: 400;
    //       .ic{
    //           display: none;
    //     float: right;
    // margin-top: 15%;
    // margin-right: -1px;
    // }
    //     }
    //     .zhifu:active > .ic{

    //           display:block;
    //     float: right;
    // margin-top: 15%;
    // margin-right: -1px;
    // }
    //     .zhifu:hover {
    //       border: 1px solid rgba(35, 206, 208, 1);
    //       color: rgba(117, 241, 248, 1);
    //       cursor: pointer;
    //     }
    //     .zhifu:active{
    //          border: 1px solid rgba(35, 206, 208, 1);
    //       color: rgba(117, 241, 248, 1);
    //       cursor: pointer;
    //     }
    .Transactiondetails {
      width: 642px;
      margin-top: 45px;
      font-size: 18px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      span {
        float: right;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
    .buttom {
      width: 642px;
      height: 55px;
      background: rgba(35, 206, 208, 1);
      border-radius: 6px;
      margin-top: 54px;
      span {
        width: 97px;
        height: 20px;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
