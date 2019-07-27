<template>
  <div>
    <div style=" height: 400px;" class="ixx_banner_container">
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="dot-item-list">
            <div class="item-list-banner" v-for="(item, index) in banner" :key="index">
              <a :href="item.url" target="_blank">
                <img :src="item.picture" style="border: 1px solid #01CED1;border-radius: 8px;height: 124px;width: 266px;overflow: hidden;zoom: 1;">
              </a>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="normal-item-list" v-for="(item, index) in swipeBanner" :key="index">
            <a :href="item.url" target="_blank">
              <img :src="item.picture" style="border-radius: 8px;border:1px solid #01393c">
            </a>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"/>
      </swiper>
    </div>
    <div class="buy-currency-container">
      <div class="currency-inner">
        <el-row>
          <el-col :span="6">
            <div class="tips">
              <h1>一键买币</h1>
              <p>
                <em>参考价</em>
                <el-tooltip content="非最终交易单价，仅供参考" placement="top" effect="light">
                  <i class="currency-icon">&#xe61c;</i>
                </el-tooltip>
                <span>7.03 CNY/USDT</span>
              </p>
            </div>
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="11">
                <div class="currency-ipt">
                  <!-- <el-input placeholder="请输入需要购买的总金额" v-model="buy.amount" style="width: 100%" /> -->
                  <number-input
                    class="number-input"
                    v-model="buy.amount"
                    :scale="amountPoint"
                    placeholder="请输入需要购买的总金额"
                  />
                </div>
              </el-col>
              <el-col :span="6">
                <div class="currency-ipt">
                  <el-select v-model="buy.currency" style="width: 100%">
                    <el-option v-for="(item, index) in currencyData" :key="index" :value="item.currency" v-html="item.template"></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="currency-btn">
                  <el-button style="width: 100%;" @click="buyHandle()">立即购买</el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import service from '@/modules/service'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper /* { default global options } */)
export default {
  props: ['banner', 'swipeBanner'],
  data () {
    return {
      amountPoint: 2,
      buy: {
        amount: '',
        currency: 'USDT'
      },
      currencyData: [
        {
          currency: 'USDT',
          template: `<i class="currency-icon">&#xe61a;</i> USDT`
        }
      ],
      swiperOption: {
        spaceBetween: 30,
        autoplay: true,
        speed: 500,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      arr: [],
      money: 0
    }
  },
  methods: {
    buyHandle () {
      if (this.buy.amount) {
        this.$emit('buy-handle', this.buy)
      }
    },
    bicher () {
      service.otcSymbolList().then(res => {
        if (res.code === 0) {
          this.arr = res.data
        }
      })
    }
  },
  created () {
    this.bicher()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @font-face {
    font-family: 'currency-icon';  /* project id 1244642 */
    src: url('//at.alicdn.com/t/font_1244642_3c3fkpp52ki.eot');
    src: url('//at.alicdn.com/t/font_1244642_3c3fkpp52ki.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1244642_3c3fkpp52ki.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1244642_3c3fkpp52ki.woff') format('woff'),
    url('//at.alicdn.com/t/font_1244642_3c3fkpp52ki.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1244642_3c3fkpp52ki.svg#iconfont') format('svg');
  }
  .currency-icon {
    font-family:"currency-icon" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
  .ixx_banner_container {
    height: 480px;
    width: 100%;
    overflow: hidden;
    background: url("./img/bj.png") top center no-repeat;
    .swiper-container {
      width:100%;
      height:400px;
      overflow: hidden;
      .dot-item-list,.normal-item-list {
        width: 1200px;
        position: absolute;
        left: 50%;
        margin-left: -600px;
        bottom: 40px;
        display: flex;
        .item-list-banner {
          flex: 1
        }
      }
    }
    .swiper-pagination-bullet {
      width: 30px;
      height: 4px;
      border-radius: 40px;
      opacity: .4;
      background: #fff
    }
    .swiper-pagination-bullet-active {
      opacity: 1;
      background: #09C989 !important;
    }
  }
  .buy-currency-container {
    .number-input {
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
    }
    height: 80px;
    background: #262626;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    overflow: hidden;
    .currency-inner {
      width:800px;
      height:48px;
      margin: 16px auto;
      .tips {
        text-align: center;
        color: #02FFFF;
        font-size: 14px;
        vertical-align: middle;
        em {
          font-style: normal;
          padding-right: 2px;
          vertical-align: middle;
        }
        h1 {
          font-weight: normal;
          font-size: 18px;
          color: #fff
        }
        i {
          vertical-align: middle;
        }
        span {
          padding-left:2px;
          vertical-align: middle;
        }
      }
      .currency-ipt {
        margin-right: 10px;
        margin-top:4px
      }
      .currency-btn {
        margin-top: 4px;
        .el-button {
          background: #09C989;
          color: #fff;
          font-weight: bold;
          border-color: transparent;
          &:hover {
            color: #fff!important;
          }
        }
      }
    }
  }
</style>
