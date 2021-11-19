<template>
  <div class="h5-index-container">
    <!-- <mobile-nav/> -->
    <div
      class="h5-page__banner"
      v-if="banners && banners.length">
      <div class="banner-pic">
        <swiper
          :options="swiperOption"
          class="swiper-container"
          style="height: 200px!important"
          ref="mySwiper">
          <!-- 轮播项 -->
          <swiper-slide
            v-for="banner in banners"
            :key="banner.id">
            <a
              class="link"
              target="_blank"
              :href="banner.url">
              <img
                :src="banner.picture"
                class="swiper-image">
            </a>

          </swiper-slide>
          <!-- 轮播的小圆点 -->
          <div
            class="swiper-pagination"
            slot="pagination"/>
        </swiper>
      </div>
      <div class="banner-announce">
        <div class="intro">{{ $t('footer_notice') }}</div>
        <div
          class="news"
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
          class="more-dots"
          target="_blank"
          :href="announcementLink">
          <span/>
          <span/>
          <span/>
        </a>
      </div>
    </div>
    <!-- <div class="activity-info-section">
      <kyc/>
    </div> -->
    <div class="h5-trading-summary">
      <div class="trading__title">
        {{ $t('exchange_area') }}
      </div>
      <pair-table/>
    </div>
    <ixx-feature/>
    <!-- <h5-footer/> -->
    <div
      class="corperator"
      v-if="false">
      <div class="corperator-container">
        <!-- <div
          class="corp-row row-60"
          v-if="isKorean">
          <div
            class="corp-title">
            {{ $t('footer_copr') }}
          </div>
          <div class="corp-wrap">
            <div class="corp-logo">
              <a
                class="link"
                href="https://www.bgbquant.com/"
                target="_blank">
                <img
                  class="logo hx"
                  src="~@/assets/copr-logo-bgbquant.png" >
              </a>
            </div>
          </div>
        </div> -->
        <div class="corp-row row-60">
          <div
            class="corp-title"
            v-t="'footer_investors'"/>
          <div class="corp-wrap">
            <div class="corp-logo">
              <a
                class="link"
                disabled
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
            <div class="corp-logo">
              <a
                class="link"
                href="https://peckshield.com/"
                target="_blank"
              >
                <img
                  class="logo ps"
                  src="~@/assets/copr_logo_ps.png" >
              </a>
            </div>
          </div>
        </div>
        <div class="corp-row row-20">
          <div
            class="corp-title"
            v-t="'footer_partners'"/>
          <div class="corp-wrap">
            <div class="corp-logo">
              <span
                class="link"
              >
                <img
                  class="logo cw"
                  src="~@/assets/copr-logo-cw.png">
              </span>
            </div>
            <div class="corp-logo">
              <span
                class="link"
                target="_blank">
                <img
                  class="logo hl"
                  src="~@/assets/copr-logo-hl.png">
              </span>
            </div>
            <div class="corp-logo">
              <span
                class="link"
                target="_blank">
                <img
                  class="logo hx"
                  src="~@/assets/copr-logo-hx.png" >
              </span>
            </div>
            <div class="corp-logo">
              <span
                class="link"
                target="_blank">
                <img
                  class="logo js"
                  src="~@/assets/copr-logo-js.png">
              </span>
            </div>
            <div class="corp-logo">
              <span
                class="link"
                target="_blank">
                <img
                  class="logo he"
                  src="~@/assets/copr-logo-he.png">
              </span>
            </div>
            <div class="corp-logo">
              <span
                class="link"
                target="_blank">
                <img
                  class="logo blk"
                  src="~@/assets/copr-logo-blk.png">
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="download-mask">
      <div class="flex">
        <div class="dl-icon">
          <img
            src="../../../assets/h5/h5_download@3x.png"
            alt="">
        </div>
        <div class="dl__txt">
          <p>IXX.COM</p>
          <p class="f16">{{ $t('download_app_dl') }}</p>
        </div>
      </div>
      <div
        class="dl__btn"
        @click="download">
        {{ $t('download_dl_app') }}
      </div>
    </div> -->
    <v-download />
  </div>
</template>
<script>
import './index.scss'
import MineSummary from '../mine-summary'
import PairTable from '@/components/Mobile/PairTable'
import {state} from '@/modules/store'
import service from '@/modules/service'
import responsiveMixin from '@/mixins/responsive'
import MobileNav from '@/components/Mobile/MobileNav'
import ixxFeature from '@/components/Mobile/ixx-feature.vue'
import utils from '@/modules/utils'
import VDownload from '@/components/VDownload'
// import Kyc from '@/components/Mobile/Kyc'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  mixins: [responsiveMixin],
  data () {
    return {
      state,
      banners: [],
      notices: [],
      swiperOption: {
        autoplay: true,
        delay: 5000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  computed: {

    swiper: function () {
      return this.$refs.mySwiper.swiper
    },
    announcementLink () {
      return state.theme.announcement[state.locale] || state.theme.announcement.en
    },
    isKorean () {
      return state.locale === 'ko' || true
    }
  },
  created () {
    this.getBanners()
  },
  methods: {
    async getBanners () {
      const res = await service.getBanners({platform: 3})
      if (!res.code) {
        let list = res.data
        if (list.length > 0) {
          this.banners = list.filter(b => b.slot === 1)
          this.notices = list.filter(b => b.slot === 4)
          if (this.notices.length > 1) {
            this.notices.splice(1)
          }
        }
      }
    },
    download () {
      // let url = 'https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/ixx.apk'
      let url = this.$myState.download.android
      if (utils.isIos()) { 
        // url = 'itms-services://?action=download-manifest&url=https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/install-manifest.plist'
        url = this.$myState.download.ios
      }
      // window.open(url, '_blank')
      window.location.href = url
    }

  },
  components: {
    MineSummary,
    PairTable,
    swiper,
    swiperSlide,
    MobileNav,
    ixxFeature,
    VDownload
    // Kyc
  }
}
</script>
<style lang="scss" scoped>
.h5-page__banner .swiper-container {
  height: 200px!important;
}
/* .zopim{
        top: 80%!important;
        position: fixed!important;
    } */
</style>
