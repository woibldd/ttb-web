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
      <div class="banner-announce">
        <div class="intro">{{ $t('footer_notice') }}</div>
        <div
          class="news"
          v-for="(item) in notices"
          :key="item.id"><a
            class="text_link"
            :href="item.url || 'javascript:;'"
            target="_blank">
            {{ item.title }}
        </a></div>
      </div>
    </div>
    <div
      class="mine-info-section"
    >
      <mine-summary/>
    </div>
    <div class="h5-trading-summary">
      <div class="trading__title">
        {{ $t('exchange_area') }}
      </div>
      <pair-table/>
    </div>
    <h5-footer/>
    <div class="h5-contact-info">
      <div class="contact-list">
        <a
          class="contact-item-wrapper mr-20 pointer"
          href='https://www.facebook.com/IXExchange'>
          <icon
            class="contact-item"
            name="footer-facebook"/>
        </a>
        <a
          class="contact-item-wrapper mr-20 pointer"
          href='https://twitter.com/IXExchange'>
          <icon
            class="contact-item"
            name="footer-twitter"/>
        </a>

        <a
          href="mailto:service@ix.com"
          class="contact-item-wrapper mr-20 pointer">
          <icon
            class="contact-item"
            name="footer-email"/>
        </a>
        <div class="contact-item-wrapper mr-20">
          <icon
            class="contact-item"
            name="footer-wx"/>
          <img
            class="contact-img"
            src="../../../assets/pic-contact-wx.jpg">
        </div>
        <a
          class="contact-item-wrapper mr-20 pointer"
          href='https://t.me/ixofficial'>
          <icon
            class="contact-item "
            name="footer-telegram"/>
        </a>
        <div class="contact-item-wrapper">
          <icon
            class="contact-item"
            name="footer-biyong"/>
          <img
            class="contact-img"
            src="../../../assets/pic-contact-biyong.jpg">
        </div>
      </div>
      <p class="copyright">Copyright © 2018 IX.COM</p>
    </div>
  </div>
</template>
<script>
import './index.scss'
import MineSummary from '../mine-summary'
import h5Footer from '../footer'
import PairTable from '@/components/Mobile/PairTable'
import utils from '@/modules/utils'
import {state, actions} from '@/modules/store'
import service from '@/modules/service'
import responsiveMixin from '@/mixins/responsive'
import MobileNav from '@/components/Mobile/MobileNav'

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
        autoplay: false,
        delay: 1000,
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
          this.notices = list.filter(b => b.slot === 2)
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
    h5Footer,
    swiper,
    swiperSlide,
    MobileNav
  }
}
</script>
