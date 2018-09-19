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
    <div class="ind_cen ind_jd" v-if="false">
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
    <div class="ind_cen trade">
      <ul class="tit">
        <li class="ta">{{$t('currency')}}</li>
        <li class="tb">{{$t('homechart_price')}}</li>
        <li class="tc">{{$t('homechart_24h_chg')}}</li>
        <li class="td">{{$t('homechart_24h_l')}}</li>
        <li class="te">{{$t('homechart_24h_h')}}</li>
        <li class="tf">{{$t('homechart_24h_v')}}</li>
        <li class="tg">{{$t('actions')}}</li>
      </ul>
      <ul class="tra_cen" v-for="pair in sortedList" :key="pair.name" v-if="pair.tick">
        <li class="ta">{{pair.product}} <span>/ {{pair.currency}}</span></li>
        <li class="tb" v-if="pair.tick">{{ pair.tick.current | fixed(pair.price_scale) }} <span>¥ 0.16</span></li>
        <li class="tc" :class="{'theme-color-up': getDelta(pair.tick) > 0, 'theme-color-down': getDelta(pair.tick) < 0}">
          <p v-if="pair.tick">{{ (getDelta(pair.tick) > 0) ? '+' : ''}}{{ getDelta(pair.tick) }}%  {{pair.tick.increment_24h}}</p>
          <p v-else>...</p></li>
        <li class="td" v-if="pair.tick">{{pair.tick.lowest_24h}}</li>
        <li class="te" v-show="pair.tick">{{pair.tick.highest_24h}}</li>
        <li class="tf" v-if="pair.tick">{{ pretty(pair.tick.volume_24h) }}<span> {{pair.product}}</span></li>
        <li class="tg" @click="toExchange(pair.name)">
          <icon name="handle"/>
        </li>
      </ul>
    </div>
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
  import { state } from '@/modules/store'
  import tickTableMixin from '@/mixins/tick-table'

  export default {
    mixins: [tickTableMixin],
    data: function () {
      return {
        banners: [
        ],
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
      kSlider: Slider
    },
    computed: {
      announcementLink () {
        return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
      }
    },
    methods: {
      pretty (num) {
        num = this.$big(num || 0)
        if (num < 100) {
          return num.toFixed(2)
        }
        if (num < 1e6) {
          return num.toFixed(0)
        }
        if (num < 1e7) {
          return num.div(1e6).toFixed(1) + ' M'
        }
        if (num < 1e9) {
          return num.div(1e6).toFixed(0) + ' M'
        }
        if (num < 1e10) {
          return num.div(1e9).toFixed(1) + ' B'
        }
        return num.div(1e9).toFixed(0) + ' B'
      },
      toExchange (pair) {
        this.$router.push({
          name: 'trading',
          params: {
            pair: pair
          }
        })
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

  .page-home {
    background: linear-gradient(0deg, #222931, #3A444F);
  }

  .ind_cen {
    position: relative;
    margin: 0 60px;
  }
  .ind_cena{
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
            &::before,&::after{
                position: absolute;
                display: block;
                position: absolute;
                height: 3px;
                right: 0;
                background: #6C869C;
                content: "";
            }
            &::before{
                width: 100%;
                top: 0;
            }
            &::after{
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

  .trade {
    border: 1px solid #CBE6FD;
    ul {
      overflow: hidden;
      color: #CBE6FD;
      font-size: 16px;
      border-bottom: 1px dashed #464d55;
      line-height: 64px;
      &.tit {
        border-bottom: 1px solid #CBE6FD;
                height: 45px;
        line-height: 45px;
        font-size: 14px;
        li {
          border-bottom: none;
          &.tc {
            color: #CBE6FD;
          }
        }
      }
      li {
        float: left;
                height: 64px;
        text-align: center;
        span {
          color: #6C869C;
        }
        &.ta {
          width: 8%;
        }
        &.tb {
                    width: 17%;
        }
        &.tc {
                    width: 17%;
        }
        &.td {
          width: 17%;
        }
        &.te {
          width: 17%;
        }
        &.tf {
                    width: 17%;
        }
        &.tg {
          width: 7%;
          color: #5c89b0;
          cursor: pointer;

          &:hover {
            color: #c9a96e;
          }
        }
      }
      &:last-child {
        border-bottom: none;
      }
      &.tra_cen {
        li {
          &.theme-color-down {
            color: #F24E4D;
          }
          &.theme-color-up {
            color: #09C989;
          }
        }
      }
    }
  }

  .ind_bot {
        &:after{
            content: "";
            clear: both;
            width: 100%;
            height: 1px;
            display:block;
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
