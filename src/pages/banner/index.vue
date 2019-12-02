<template>
  <div>
    <div class="banner-container" style="height: 400px;"
      :class="[state.locale]"
         @mousemove="hoverHandle(false)" @mouseleave="hoverHandle(true)"
    >
      <div class="banner-list">
        <el-carousel ref="carousel" arrow="always" indicator-position="none" :autoplay="false" :loop="true">
          <el-carousel-item v-for="item in banner" :initial-index="dot" :key="item.type">
            <template>
              <div class="item-dot" v-if="item.type === 3" @mousemove="hoverHandle(false)" @mouseleave="hoverHandle(true)">
                <el-carousel ref="carousel1" indicator-position="outside" :autoplay="true" :loop="true" @change="carouselChange">
                  <el-carousel-item v-for="(child, i) in item.list" :key="i">
                    <div class="item-img-list" v-for="(dot, c) in child.list" :key="c">
                      <a :href="dot.url" target="_blank">
                        <img :src="dot.picture" alt="">
                      </a>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="item-dot" v-if="item.type === 2" :initial-index="dot1" @mousemove="hoverHandle(false)" @mouseleave="hoverHandle(true)">
                <el-carousel ref="carousel2" indicator-position="outside" :autoplay="true" :loop="true" @change="carouselChange1">
                  <el-carousel-item v-for="(child, i) in item.list" :key="i">
                    <a :href="child.url" target="_blank">
                      <img :src="child.picture" alt="">
                    </a>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </template>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="buy-currency-container" v-if="state.locale==='zh-CN' || state.locale==='zh-HK'">
      <div class="currency-inner">
        <el-row>
          <el-col :span="6">
            <div class="tips">
              <h1>{{this.$t('yj_mb')}}</h1>
              <p>
                <em>{{$t('ck_jg')}}</em>
                <el-tooltip :content="$t('jg_ck')" placement="top" effect="light">
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
import _ from 'lodash'
Vue.use(VueAwesomeSwiper /* { default global options } */);
export default {
  props: [ "swipeBanner"],
  data() {
    return {
      amountPoint: 2,
      hover: true,
      height: '280',
      dot: 0,
      dotIndex: 0,
      dot1: 0,
      dot1Index: 0,
      dot2: 0,
      dot2Index: 0,
      banner: [
        {
          type: 3,
          list: []
        },
        {
          type: 2,
          list: []
        }
      ],
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
      arr: [],
      money: 0,
      downPrice: "",
      state,
    };
  },
  methods: {
    hoverHandle(flag) {
      this.hover = flag
    },
    carouselChange(index) {
      if (this.hover) {
        if (index === this.dotIndex - 1) {
          setTimeout(() => {
            this.$refs.carousel.next()
            this.dot = 0
          }, 3000)
        }
      }
    },
    carouselChange1(index) {
      if (this.hover) {
        if (index === this.dot1Index - 1) {
          setTimeout(() => {
            this.$refs.carousel.next()
            this.dot1 = 0
          }, 3000)
        }
      }
    },
    carouselChange3(index) {
      if (this.hover) {
        if (index === this.dot1Index - 1) {
          setTimeout(() => {
            this.$refs.carousel.next()
            this.dot1 = 0
          }, 3000)
        }
      }
    },
    init() {
      service.getBanners({
        platform: 1
      }).then((res) => {
        if (res.code === 0) {
          const firstList = res.data.filter(item => (item.slot === 3))
          const secondList = res.data.filter(item => (item.slot === 2))
          var result = []
          var result1 = []
          if (firstList.length > 0) {
            for (var i = 0, len = firstList.length; i < len; i += 4) {
              result.push(firstList.slice(i, i + 4))
            }
            result.forEach((item, index) => {
              var obj = {
                id: index,
                list: []
              }
              result1.push(obj)
              result1.forEach((child, i) => {
                if (index === i) {
                  child.list = item
                }
              })
            })
          }
          this.banner[0].list = result1
          this.dotIndex = this.banner[0].list.length
          this.banner[1].list = secondList
          this.dot1Index = this.banner[1].list.length
          this.banner = this.banner.filter(item => (item.list.length > 0))
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
.banner-container {
  height: 400px;
  background: #00b9db;
  overflow: hidden;
  clear: both;
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
  .el-carousel__container {
    height: 130px;
  }
  .banner-list {
    height: 150px;
    margin: 230px auto 0;
  }
  .item-dot {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    a {
      width: 100%;
      display: block;
      overflow: hidden;
      box-sizing: border-box;
      img {
        zoom: 1;
        height: 122px;
        border-radius: 4px;
        border: 1px solid #00badb;
      }
    }
    .item-img-list {
      float: left;
      margin-right: 46px;
      &:last-child {
        margin-right: 0;
      }
    }
    .item-img-list1 {
      img {
        width: 100%;
        display: block;
        zoom: 1;
      }
    }
    .el-carousel__arrow {
      display: none!important;
    }
    .el-carousel__container {
      height: 160px;
    }
    .el-carousel__indicators--outside {
      position: absolute;
      bottom: 0;
    }
  }
  .item-dot1 {
    width: 100%;
    position: relative;
    z-index: 1;
    .el-carousel__container {
      height: 160px;
    }
    .el-carousel__indicators--outside {
      position: absolute;
      bottom: 0;
    }
  }
  .el-carousel__indicator.is-active button{
    background: #00badb!important;
  }
  .el-carousel__arrow {
    background: rgba(255,255,255,.18)!important;
    color: #00badb;
    font-size: 20px;
    i {
      font-weight: bold;
    }
  }
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
      // .nav_link {
      //   color: $primary;
      // }
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

  // &:hover {
  //   color: $primary;
  // }

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
.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 0!important;
}
.swiper-pagination-bullet {
  width: 16px;
  height: 4px;
  border-radius: 50px;
  background: #fff;
}

.swiper-pagination-bullet-active {
  background: #00badb!important;
}
</style>
