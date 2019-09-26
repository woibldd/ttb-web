<template>
  <div>
    <div class="ixx_banner_container" style="height: 400px;"
      :class="[state.locale]"
    >
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide>
          <!--<div class="dot-item-list">-->
            <!--<div class="item-list-banner" v-for="(item, index) in banner" :key="index">-->
              <!--<a :href="item.url" target="_blank">-->
                <!--<img-->
                  <!--:src="item.picture"-->
                  <!--style="border: 1px solid #01CED1;border-radius: 8px;height: 124px;width: 266px;overflow: hidden;zoom: 1;"-->
                <!--/>-->
              <!--</a>-->
            <!--</div>-->
          <!--</div>-->
          <div class="dot-item-list">
            <swiper :options="swiperOptione">
              <swiper-slide v-for="(item, index) in banner" :key="index">
                <a :href="item.url" target="_blank">
                  <img
                    :src="item.picture"
                    style="border: 1px solid #01CED1;border-radius: 8px;height: 124px;width: 266px;overflow: hidden;zoom: 1;"
                  />
                </a>
              </swiper-slide>
              <!--<div class="swiper-pagination swiper-pagination-s" slot="pagination"></div>-->
            </swiper>
          </div>
        </swiper-slide>
        <swiper-slide>
          <swiper :options="swiperOptions">
            <swiper-slide v-for="(item, index) in swipeBanner" :key="index">
              <div class="normal-item-list">
                <a :href="item.url" target="_blank">
                  <img :src="item.picture" style="border-radius: 8px;border:1px solid #01393c" />
                </a>
              </div>
            </swiper-slide>
            <!--<div class="swiper-pagination swiper-pagination-s" slot="pagination"></div>-->
          </swiper>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" />
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
                    :placeholder="this.$t('b_price_i')"
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
  props: ["banner", "swipeBanner"],
  data() {
    return {
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
      swiperOptione: {
        initialSlide :2,
        autoplayDisableOnInteraction : false,
        slidesPerView: 4,
        slidesPerGroup: 4
      },
      swiperOption: {
         init:false,
					grabCursor: true,
					centeredSlides: true,
					slidesPerView: 1,
					autoplay:{
						delay:3000
					},
					loop:true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      swiperOptions: {
        initialSlide :2,
        autoplayDisableOnInteraction : false,
        slidesPerView: "auto",
        centeredSlides: true
      },
      arr: [],
      money: 0,
      downPrice: "",
      state,
    };
  },
  methods: {
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
  },
  computed: {
  			swiper() {
    			return this.$refs.mySwiper.swiper;
  			}
		},
		updated() {
  			this.swiper.init();
    }
};
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
  .swiper-container {
    width: 100%;
    height: 400px;
    overflow: hidden;
    .dot-item-list,
    .normal-item-list {
      width: 1200px;
      position: absolute;
      left: 50%;
      margin-left: -600px;
      bottom: 40px;
      display: flex;
      overflow: hidden;
      height: 160px;
      .item-list-banner {
        flex: 1;
      }
    }
  }
  .swiper-pagination-bullet {
    width: 30px;
    height: 4px;
    border-radius: 40px;
    opacity: 0.4;
    background: #fff;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #09c989 !important;
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
</style>
