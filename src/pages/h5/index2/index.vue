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
      <!-- <div class="banner-announce">
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
      </div> -->
    </div>
    <!-- <div class="activity-info-section">
      <kyc/>
    </div> -->

    <div class="h5-introduce">
      <ul>
        <li>
          <img src="~@/assets/h5/anquan.png" alt="">
          <h2 class='mb-10'>{{ $t("h5_home_introduce1") }}</h2>
          <p>{{ $t("h5_home_introduce2") }}</p>
        </li>
        <li>
          <img src="~@/assets/h5/zhuanye.png" alt="">
          <h2 class='mb-10'>{{ $t("h5_home_introduce3") }}</h2>
          <p>{{ $t("h5_home_introduce4") }}</p>
        </li>
        <li>
          <img src="~@/assets/h5/tiyan.png" alt="">
          <h2 class='mb-10'>{{ $t("h5_home_introduce5") }}</h2>
          <p>{{ $t("h5_home_introduce6") }}</p>
        </li>
        <li>
          <img src="~@/assets/h5/gaoxiao.png" alt="">
          <h2 class='mb-10'>{{ $t("h5_home_introduce7") }}</h2>
          <p>{{ $t("h5_home_introduce8") }}</p>
        </li>

      </ul>
    </div>

    <!-- <h5-footer/> -->
    <div class="corperator">
      <div class="corperator-container">
        <img src="@/assets/h5/h5-logo@2x.png" alt="" style="width: 110px;margin-left: 20px;">
        <span style="color: #fff;padding-left: 20px;display: block;margin: 10px 0;margin-bottom: 30px;font-size: 12px">{{ exchangeNameConfig }}</span>
        <div class="corp-row row-60">
          <div
            class="corp-title"
            v-t="'footer_investors'"/>
          <div class="corp-wrap">
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
              <a
                class="link"
                href="https://www.bishijie.com"
                target="_blank">
                <img
                  class="logo cw"
                  src="~@/assets/copr-logo-cw.png">
              </a>
            </div>
            <div class="corp-logo">
              <a
                class="link"
                href="http://hangliancj.com"
                target="_blank">
                <img
                  class="logo hl"
                  src="~@/assets/copr-logo-hl.png">
              </a>
            </div>
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
        <div
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
                href="http://www.csi.link/"
                target="_blank">
                <img
                  class="logo hx"
                  src="~@/assets/copr-logo-cs.png" >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="download-mask">
      <div class="flex">
        <div class="dl-icon">
          <img
            src="../../../assets/h5/h5_download.png"
            alt="">
        </div>
        <div class="dl__txt">
          <p>IX.COM</p>
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
// import h5Footer from '../footer'
import PairTable from '@/components/Mobile/PairTable'
import {state} from '@/modules/store'
import service from '@/modules/service'
import responsiveMixin from '@/mixins/responsive'
import MobileNav from '@/components/Mobile/MobileNav'
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
    },
    exchangeNameConfig() {
      return this.state.theme.exchangeNameConfig[this.state.locale || 'en']
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
    }
  },
  components: {
    MineSummary,
    PairTable,
    // h5Footer,
    swiper,
    swiperSlide,
    MobileNav,
    VDownload
    // Kyc
  }
}
</script>
<style lang="scss" scoped>
.banner-pic{
  width: 23.4375rem;
}
.h5-page__banner{
  background: #273039;
  border-bottom: 3px solid #1c2733;
  padding-bottom: 30px;
}
.h5-index-container .h5-page__banner .banner-pic img {
    border-radius: 0.375rem;
}
.h5-introduce{
  text-align: center;
  padding:20px 0;
  li{
    margin-bottom: 80px;
    margin-top: 50px;
    img {
      max-width: 60%;
      max-height: 150px;

    }
  }
  h2{
    color:#fff;
    font-size: 16px;
    margin-top: 20px;
  }
  p{
    color:rgba(203,230,253,1);
    margin: 0 auto;
    text-align: left;
    width: 300px;
  }
}
.swiper-container {
  height: 170px!important;
}
</style>
