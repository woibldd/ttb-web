<template>
  <div class="page-home">
    <div class="home2">
      <k-slider
        :banners="banners"
        :swiper-option="swiperOption"/>
    </div>
    <div class="ind_txt">
      <div class="ind_cen">
        <div class="ind_c" v-for="(item) in notices" :key="item.id">
          <a class="text_link" :href="item.url || 'javascript:;'" target="_blank">
            {{item.title}}
          </a>
        </div>
        <a class="more" :href="announcementLink" target="_blank">
          <i></i>
          <i></i>
          <i></i>
        </a>
      </div>
    </div>
    <div class="ind_cen ind_jd" v-if="true">
      <div class="jd_box">
        <div
          class="jd_cen"
          style="width:30%;">
          <p>
            <span>
              <i>挖矿进度：</i>126631.45633211<i>IX</i>
            </span>
          </p>
        </div>
        <em>0 IX</em>
        <em>33,333,333 IX</em>
      </div>
      <div class="jd_btxt">
        <div>0:00 - 8:00</div>
        <div><span>挖矿总量：</span>,333,333<em>IX</em></div>
        <div><span>已挖矿量：</span>126631.45633211<em>IX</em></div>
        <div><span>剩余挖矿量：</span>28,669,123.23441975<em>IX</em></div>
      </div>
    </div>
    <div class="ind_cen ind_tit">
      {{$t('exchange_area')}}
    </div>
    <pair-table></pair-table>
    <div class="ind_cena">
      <div class="ind_bot">
        <div class="ind_bot_tit">{{$t('app_download_sologan')}}</div>
        <div class="ind_bot_cen">
          <div class="photo iphone"/>
          <p>{{$t('app_download_ios')}}
            <span>{{$t('coming_soon')}}</span>
          </p>
        </div>
        <div class="ind_bot_cen">
          <div class="photo android"/>
          <p>Android
            <span>{{$t('coming_soon')}}</span>
          </p>
        </div>
        <div class="ind_bot_cen">
          <div class="photo windows"/>
          <p>Windows
            <span>{{$t('coming_soon')}}</span>
          </p>
        </div>
        <div class="ind_bot_cen">
          <div class="photo mac"/>
          <p>Mac
            <span>{{$t('coming_soon')}}</span>
          </p>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
  import Slider from '@/components/slider.vue'
  import service from '@/modules/service'
  import {state} from '@/modules/store'
  import PairTable from '@/components/Trading/PairTable'

  export default {
    data: function () {
      return {
        state,
        banners: [],
        notices: [],
        swiperOption: {
          direction: 'horizontal',
          loop: true,
          autoplay: 1000,
          paginationType: 'fraction',
          pagination: '.swiper-pagination'
        },
      }
    },
    components: {
      kSlider: Slider,
      PairTable
    },
    computed: {
      announcementLink() {
        return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
      }
    },
    async created() {
      const res = await service.getBanners()
      if (!res.code) {
        let list = res.data
        if (list.length > 0) {
          this.banners = list.filter(b => b.slot === 1)
          this.notices = list.filter(b => b.slot === 2)
          if (this.notices.length > 3) {
            this.notices.splice(3)
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../styles/vars";
  @import "../styles/mixins";

  .ind_cen {
    position: relative;
    margin: 0 60px;
  }

  .page-home {
    background: linear-gradient(0deg, #222931, #3A444F);
  }

  .ind_cena {
    position: relative;
    padding: 0 60px;
    background-position: top center;
    background-repeat: no-repeat;
    background-image: url(../assets/bg_qx.png);
    padding-top: 35px;
    margin-top: 80px;
    padding-bottom: 110px;
  }

  .ind_txt {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #23282E;
    margin-bottom: 60px;
    .ind_c {
      text-align: center;
      font-size: 14px;
      float: left;
      width: 33.33%;
      color: #6C869C;
      .text_link {
        color: #6C869C;
        &:hover {
          color: $primary;
        }
      }
      &:nth-child(2) {
        position: relative;
        &:before, &:after {
          content: "";
          position: absolute;
          width: 2px;
          height: 24px;
          background: #6C869C;
          display: block;
          left: 0;
          top: 50%;
          margin-top: -12px;
        }
        &:after {
          right: 0;
          left: auto;
        }
      }
    }
    .more {
      display: block;
      position: absolute;
      width: 15px;
      height: 15px;
      right: 0;
      top: 23px;

      i {
        display: block;
        position: absolute;
        height: 3px;
        right: 0;
        background: #6C869C;
        width: 70%;
        top: 6px;
      }
      &::before, &::after {
        position: absolute;
        display: block;
        position: absolute;
        height: 3px;
        right: 0;
        background: #6C869C;
        content: "";
      }
      &::before {
        width: 100%;
        top: 0;
      }
      &::after {
        width: 40%;
        bottom: 0;
      }
    }
  }

  .ind_jd {
    border: 1px solid #CBE6FD;
    margin-bottom: 59px;
    padding: 75px 6% 50px 6%;
    .jd_box {
      width: 100%;
      background: #6D869C;
      height: 4px;
      border-radius: 4px;
      position: relative;
      em {
        position: absolute;
        color: #6D869C;
        font-size: 14px;
        line-height: 34px;
        bottom: -34px;
        &:nth-child(2) {
          left: 0;
        }
        &:nth-child(3) {
          right: 0;
        }
      }
      .jd_cen {
        height: 4px;
        float: left;
        position: relative;
        border-radius: 4px;
        background: #C9A96E;
        p {
          display: block;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #C9A96E;
          top: -20px;
          right: -3px;
          position: absolute;
          span {
            display: block;
            width: 300px;
            height: 33px;
            position: absolute;
            top: -33px;
            text-align: center;
            left: 50%;
            margin-left: -150px;
            color: #C9A96E;
            i {
              &:nth-child(1) {
                color: #CBE6FD;
              }
              &:nth-child(2) {
                color: #6D869C
              }
            }
          }
        }
      }
    }
    .jd_btxt {
      font-size: 20px;
      overflow: hidden;
      margin-top: 65px;
      div {
        float: left;
        color: #C9A96E;
        &:nth-child(1) {
          width: 15%
        }
        &:nth-child(2) {
          width: 25%;
        }
        &:nth-child(3) {
          width: 25%;
        }
        &:last-child {
          float: right;
        }
        b {
          font-weight: bold;
        }
        span {
          color: #CBE6FD;
        }
        em {
          color: #6D869C;
        }
      }
    }
  }

  .ind_tit {
    height: 35px;
    line-height: 35px;
    font-size: 28px;
    color: #CBE6FD;
    margin-bottom: 37px;
    text-indent: 25px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      display: block;
      width: 4px;
      height: 28px;
      top: 50%;
      left: 0;
      background: #CBE6FD;
      margin-top: -14px;
    }
  }

  .ind_bot {
    &:after {
      content: "";
      clear: both;
      width: 100%;
      height: 1px;
      display: block;
    }
    .ind_bot_tit {
      color: #fff;
      font-size: 24px;
      text-align: center;
      height: 35px;
      margin-bottom: 55px;
      line-height: 35px;
    }
    .ind_bot_cen {
      width: 20%;
      text-align: center;
      float: left;
      margin: 0 2%;
      .photo {
        width: 100%;
        height: 201px;
        background-size: auto auto;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .iphone {
        background-image: url(../assets/iphone.png);
      }
      .android {
        background-image: url(../assets/Android.png);
      }
      .windows {
        background-image: url(../assets/Windows.png);
      }
      .mac {
        background-image: url(../assets/Mac.png);
      }
      p {
        background: #151e25;
        color: #CBE6FD;
        font-size: 20px;
        width: 195px;
        height: 40px;
        line-height: 40px;
        border-radius: 40px;
        margin: 44px auto;
        cursor: pointer;
        position: relative;
        span {
          display: none;
          position: absolute;
        }
        &:hover {
          background: #caaa6c;
          color: #232A32;
          span {
            display: block;
            width: 210px;
            height: 50px;
            line-height: 50px;
            color: #C9A96E;
            border: 1px solid #C9A96E;
            position: absolute;
            left: 50%;
            margin-left: -105px;
            bottom: -70px;
            z-index: 9999;
            border-radius: 5px;
          }
        }
      }
    }
  }
</style>
