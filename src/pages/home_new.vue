<template>
  <div class="page-home">
    <div class="home2">
      <k-slider
        :banners="banners"
        :swiper-option="swiperOption"/>
    </div>
    <div class="ind_txt">
      <div class="ind_cen">
        <div
          class="ind_c"
          v-for="(item) in notices"
          :key="item.id">
          <a
            class="text_link"
            :href="item.url || 'javascript:;'"
            target="_blank">
            {{ item.title }}
          </a>
        </div>
        <a
          class="more"
          :href="announcementLink"
          target="_blank">
          <i/>
          <i/>
          <i/>
        </a>
      </div>
    </div>
    <kyc/>
    <mine-summary/>
    <div class="ind_cen ind_tit">
      {{ $t('exchange_area') }}
    </div>
    <pair-table/>
    <div class="ind_cena">
      <div class="ind_bot">
        <div class="ind_bot_tit">{{ $t('app_download_sologan') }}</div>
        <div class="ind_bot_cen">
          <div class="photo iphone"/>
          <p>{{ $t('app_download_ios') }}
            <span>{{ $t('coming_soon') }}</span>
          </p>
        </div>
        <div class="ind_bot_cen">
          <div class="photo android"/>
          <p>Android
            <span>{{ $t('coming_soon') }}</span>
          </p>
        </div>
        <div class="ind_bot_cen">
          <div class="photo windows"/>
          <p>Windows
            <span>{{ $t('coming_soon') }}</span>
          </p>
        </div>
        <div class="ind_bot_cen">
          <div class="photo mac"/>
          <p>Mac
            <span>{{ $t('coming_soon') }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="corperator">
      <div class="corperator-container">
        <div class="corp-row row-60">
          <div
            class="corp-title"
            v-t="'footer_investors'"/>
          <div class="corp-logo">
            <a
              class="link"
              href="http://gs.holdings/"
              target="_blank">
              <img
                class="logo gs"
                src="~@/assets/copr-logo-gs.png" >
            </a>
          </div>
          <div class="corp-logo">
            <a
              class="link"
              href="javascript:;"
            >
              <img
                class="logo may"
                src="~@/assets/copr-logo-may.png" >
            </a>
          </div>
        </div>
        <div class="corp-row row-20">
          <div
            class="corp-title"
            v-t="'footer_partners'"/>
          <div class="corp-logo">
            <a
              class="link"
              href="http://www.huoxing24.com/"
              target="_blank">
              <img
                class="logo hx"
                src="~@/assets/copr-logo-hx.png" >
            </a>
          </div>
          <div class="corp-logo">
            <a
              class="link"
              href="https://www.jinse.com/"
              target="_blank">
              <img
                class="logo js"
                src="~@/assets/copr-logo-js.png">
            </a>
          </div>
          <div class="corp-logo">
            <a
              class="link"
              href="https://www.hecaijing.com/"
              target="_blank">
              <img
                class="logo he"
                src="~@/assets/copr-logo-he.png">
            </a>
          </div>
          <div class="corp-logo">
            <a
              class="link"
              href="http://www.youjiatuanjian.com/"
              target="_blank">
              <img
                class="logo blk"
                src="~@/assets/copr-logo-blk.png">
            </a>
          </div>
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
import MineSummary from '@/components/Mine/MineSummary'
import Kyc from '@/components/Activity/Kyc'

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
      }
    }
  },
  components: {
    kSlider: Slider,
    PairTable,
    MineSummary,
    Kyc
  },
  computed: {
    announcementLink () {
      return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
    }
  },
  watch: {
    'state.locale' (locale) {
      this.getBanners()
    }
  },
  methods: {
    async getBanners () {
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
  },
  created () {
    this.getBanners()
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
    // margin-bottom: 60px;
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
  .lang-en {
    .corp-title {
      width: 200px !important;
    }
  }
  // 合作媒体
  .corperator {
    display: flex;
    width: 100%;
    background: #1A1A1A;
    height: 300px;
    border-bottom: 1px solid #3D3D3D;
    .corperator-container {
      width: 1200px;
      margin: 60px auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .corp-row {
        display: flex;
        &.row-60 {
          height: 60px;
        }
        .corp-title {
          width: 100px;
          font-size:18px;
          font-weight:bold;
          color:#929292;
          display: flex;
          height: 40px;
          align-items: center;
        }
        .corp-logo {
          min-width: 140px;
          padding: 0 26px;
          border-left: 1px solid #3D3D3D;
          text-align: center;
          height: 40px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          .link {
            display: block;
            width: 100%;
          }
          .logo {
            height: 20px;
            &.gs {
              height: 60px;
            }
          }
        }
      }
    }
  }
</style>
