<template>
  <div>
    <div class="ixx_banner_container" style="height: 400px;"
      :class="[state.locale]"
    >
      <swiper :options="option" ref="mySwiper">
        <swiper-slide>
          <div class="dot-banner">
            <swiper :options="optionFirst" style="height: 168px">
              <swiper-slide v-for="(item, index) in banner[0]" :key="index">
                <img :src="item.picture" alt="">
              </swiper-slide>
            </swiper>
          </div>
        </swiper-slide>
       <template>
         <swiper-slide v-if="banner[1].length > 0">
           <div class="dot-banner dot-banner1">
             <swiper :options="optionDot" style="height: 168px">
               <swiper-slide v-for="(item, index) in banner[1]" :key="index">
                 <img :src="item.picture" alt="">
               </swiper-slide>
             </swiper>
           </div>
         </swiper-slide>
       </template>
        <template v-if="banner[1].length > 0">
          <swiper-slide>
            <div class="dot-banner2">
              <swiper :options="option" style="height: 400px">
                <swiper-slide v-for="(item, index) in banner[2]" :key="index">
                  <img :src="item.picture" alt="">
                </swiper-slide>
              </swiper>
            </div>
          </swiper-slide>
        </template>
      </swiper>
    </div>
    <div class="buy-currency-container" v-if="state.locale==='zh-CN' || state.locale==='zh-HK'">
      <div class="currency-inner">
        <el-row>
          <el-col :span="6">
            <div class="tips">
              <h1>{{this.$t('yj_mb')}}</h1>
              <p>
                <em>{{$t('ck_jg')}}</em>
                <el-tooltip content="$t('jg_ck')" placement="top" effect="light">
                  <i class="currency-icon">&#xe61c;</i>
                </el-tooltip>
                <span>{{Number(downPrice).toFixed(2)}} CNY/USDT</span>
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
                    :placeholder="this.$t('otc.b_price_i')"
                  />
                </div>
              </el-col>
              <el-col :span="6">
                <div class="mynav_link arrow-down">
                  <span class="label">
                    <icon name="USDT" />
                    {{buy.currency}}
                    <!-- <icon
                      class="arrow ml-5"
                      name="arrow-down-w"/> -->
                  </span>
                  <!-- <div class="dropdown-sub-menu">
                    <ul class="dropdown-list pt-10 pb-10">
                      <li class="dropdown-item pl-24 pr-24">
                        <span>
                          <icon name="USDT" />
                          {{buy.currency}}
                        </span>
                      </li>
                    </ul>
                  </div> -->
                </div>
              </el-col>
              <el-col :span="7">
                <div class="currency-btn">
                  <el-button style="width: 100%;" @click="buyHandle">{{this.$t('yj_mb')}}</el-button>
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
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import service from "@/modules/service";
import utils from "@/modules/utils"
import {state} from "@/modules/store"
import "swiper/dist/css/swiper.css";

Vue.use(VueAwesomeSwiper /* { default global options } */);
export default {
  props: [ "swipeBanner"],
  data() {
    return {
      banner: [],
      amountPoint: 2,
      buy: {
        amount: "",
        currency: "USDT"
      },
      currencyData: [
        {
          currency: "USDT",
          template: `<i class="currency-icon">&#xe61a;</i> USDT`
        }
      ],
      option: {
        init: false,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        autoplay: {
          delay: 3000
        },
        loop: true
      },
      optionFirst: {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 4,
        loop: true,
        loopFillGroupWithBlank: true
      },
      optionDot: {
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        autoplay: {
          delay: 3000
        },
        loop: true
      },
      arr: [],
      money: 0,
      downPrice: "",
      state,
    };
  },
  methods: {
    init() {
      service.getBanners({
        platform: 3
      }).then((res) => {
        if (res.code === 0) {
          var arrDot1 = []
          var arrDot2 = []
          // 筛选图片地址不能为空的数组
          const banner = res.data.filter(item => item.picture)
          // 得到第一条数据的类型
          const firstSolt = 1
          // 拿到第一组数组
          const arrDot = banner.filter(item => item.slot === firstSolt)
          // 得到不为第一条数据的类型的所有数组
          const otherBanner = banner.filter(item => item.slot !== firstSolt)
          if (otherBanner.length > 0) {
            const otherSolt = otherBanner[0].slot
            arrDot1 = otherBanner.filter(item => item.slot === otherSolt)
            arrDot2 = otherBanner.filter(item => item.slot !== otherSolt)
          }
          this.banner = [arrDot, arrDot1, arrDot2]
        }
      })
    },
    buyHandle() {
      if (this.$big(Number(this.buy.amount)).lt(100)) {
        this.$message.warning(this.$t('zd_xe'));
      } else if (this.$big(Number(this.buy.amount)).gt(50000)) {
        this.$message.warning(this.$t('gm_sl'));
      } else if (this.buy.amount) {
        this.$emit("buy-handle", this.buy);
      }
    },
    bicher() {
      service.otcSymbolList().then(res => {
        if (res.code === 0) {
          for (var i = 0; i <= res.data.length; i++) {
            if (res.data[i].currency === "USDT") {
              this.downPrice = res.data[i].cny_rate;
              break;
            } else {
              this.downPrice = "--";
            }
          }
        }
        // if (res.code === 0) {
        //   this.arr = res.data
        // }
      });
    }
  },
  created() {
    this.bicher();
    this.init()
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  updated() {
      this.swiper.init();
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@font-face {
  font-family: "currency-icon"; /* project id 1244642 */
  src: url("//at.alicdn.com/t/font_1244642_3c3fkpp52ki.eot");
  src: url("//at.alicdn.com/t/font_1244642_3c3fkpp52ki.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1244642_3c3fkpp52ki.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1244642_3c3fkpp52ki.woff") format("woff"),
    url("//at.alicdn.com/t/font_1244642_3c3fkpp52ki.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1244642_3c3fkpp52ki.svg#iconfont") format("svg");
}
.currency-icon {
  font-family: "currency-icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.ixx_banner_container {
  height: 480px;
  width: 100%;
  overflow: hidden;
  background: url("./img/bj-zh-CN.png") top center no-repeat;
  &.en {
    background-image: url('./img/bj-en.png')
  }
  &.ko {
    background-image: url('./img/bj-ko.png')
  }
  &.zh-HK {
    background-image: url('./img/bj-zh-HK.png')
  }
  /*.swiper-pagination-bullet {*/
  /*  width: 30px;*/
  /*  height: 4px;*/
  /*  border-radius: 40px;*/
  /*  opacity: 0.4;*/
  /*  background: #fff;*/
  /*}*/
  /*.swiper-pagination-bullet-active {*/
  /*  opacity: 1;*/
  /*  background: #09c989 !important;*/
  /*}*/
}
.buy-currency-container {
  .number-input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  height: 80px;
  background: #262626;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  .currency-inner {
    width: 800px;
    height: 48px;
    margin: 0 auto;
    padding: 15px;
    .tips {
      text-align: center;
      color: #02ffff;
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
        color: #fff;
      }
      i {
        vertical-align: middle;
      }
      span {
        padding-left: 2px;
        vertical-align: middle;
      }
    }
    .currency-ipt {
      margin-right: 10px;
      margin-top: 4px;
    }
    .currency-btn {
      margin-top: 4px;
      .el-button {
        background: #09c989;
        color: #fff;
        font-weight: bold;
        border-color: transparent;
        &:hover, &:focus {
          color: #fff !important;
        }
      }
    }
  }
}

.mynav_link {
  font-size: 16px;
  position: relative;
  background-color: #fefefe;
  width: 140px;
  border-radius: 5px;
  margin-top: 4px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  &.arrow-down {
    .label {
      line-height: 40px;
    }
    .arrow {
      font-size: 10px;
      transition: all 0.2s ease-in-out;
    }
    &:hover {
      .dropdown-sub-menu {
        opacity: 1;
        display: block;
        visibility: visible;
      }
      .nav_link {
        color: $primary;
      }
      .arrow {
        transform: rotate(180deg);
      }
    }

    .dropdown-sub-menu {
      background: #fff;
      position: absolute;
      left: 0;
      top: 41px;
      width: 140px;
      border-radius: 4px;
      z-index: 999;
      opacity: 0;
      display: none;
      visibility: hidden;

      .dropdown-list {
        .dropdown-item {
          white-space: nowrap;
          .link {
            width: 100%;
            height: 100%;
            display: block;
            color: #fff;
          }
          &:hover {
            background: #fff;
            .link {
              color: $primary;
            }
          }
        }
        .dropdown-qrcode {
          line-height: 1.2em !important;
          text-align: center !important;
          span {
            font-size: 0.9em;
            color: #fff;
          }
          i {
            color: $primary;
          }
        }
      }
    }
  }

  &:hover {
    color: $primary;
  }

  &.router-link-active {
    color: $primary;
  }

  .hot,
  .mining-dig {
    font-size: 16px;
    // margin-left:5px;
    display: inline-block;
  }
}
.swiper-container {
  height: 400px;
  width: 100%;
  position: relative;
  .dot-banner {
    width: 1200px;
    height: 128px;
    position: relative;
    margin: 218px auto 0;
    .swiper-slide {
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        display: block;
        zoom: 1;
        border-radius: 6px;
        border: 1px solid #00badb;
        box-sizing: border-box;
      }
    }
  }
  .dot-banner1 {
    img {
      width: 100%;
    }
  }
  .dot-banner2 {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 100% ;
      height: 100%;
      display: block;
      zoom: 1
    }
  }
}
</style>
