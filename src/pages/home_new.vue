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
          <icon :name="hasNewNotice ? 'notice-new' :'notice'"/>
        </a>
      </div>
    </div>
    <!-- <kyc/> -->
    <div class="ixx-home-items">
      <!-- 交易对列表 -->
      <div class="coin-list-section">
        <div
          class="coin-info-box"
          v-for="index in 5"
          :class="{'mr-13': index < 5}"
          :key="index">
          <div class="coin__left">
            <p class="f17 c-00 mb-10 bold">BTC/USDT</p>
            <p class="f28 c-09 mb-6 bold">6355.53</p>
            <p class="f13 c-8a mb-6">≈ 43598.53 CNY</p>
            <p class="f13 c-b0 "><span class="inline-block mr-14">24H</span><span>15771.14</span></p>
          </div>
          <div class="coin__right c-09">
            +0.22%
          </div>
        </div>
      </div>
      <!-- 最新上线 -->
      <pair-table/>

      <!-- 倒数第二层的图标 -->
      <div class="compony-intro-section">
        <div class="intro-item">
          <img
            src="../assets/home/home-intro-1.png"
            alt="">
          <p class="short-txt">{{ $t('home_intro_safe') }}</p>
          <p class="long-text">{{ $t('home_intro_long_a') }}</p>

        </div>
        <div class="intro-item">
          <img
            src="../assets/home/home-intro-2.png"
            alt="">
          <p class="short-txt">{{ $t('home_intro_prefessor') }}</p>
          <p class="long-text">{{ $t('home_intro_long_b') }}</p>

        </div>
        <div class="intro-item">
          <img
            src="../assets/home/home-intro-3.png"
            alt="">
          <p class="short-txt">{{ $t('home_intro_experience') }}</p>
          <p class="long-text">{{ $t('home_intro_long_c') }}</p>

        </div>
        <div class="intro-item">
          <img
            src="../assets/home/home-intro-4.png"
            alt="">
          <p class="short-txt">{{ $t('home_intro_efficiency') }}</p>
          <p class="long-text">{{ $t('home_intro_long_d') }}</p>

        </div>
      </div>
    </div>

  </div>

</template>
<script>
import Slider from '@/components/slider.vue'
import service from '@/modules/service'
import {state} from '@/modules/store'
import PairTable from '@/components/home/pair-table'
import MineSummary from '@/components/Mine/MineSummary'

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
      hasNewNotice: false,
      pairsHead: [
        {key: 'currency', name: this.$t('currency')},
        {key: 'homechart_price', name: this.$t('homechart_price')},
        {key: 'homechart_24h_chg', name: this.$t('homechart_24h_chg')},
        {key: 'homechart_24h_l', name: this.$t('homechart_24h_l')},
        {key: 'homechart_24h_h', name: this.$t('homechart_24h_h')},
        {key: 'homechart_24h_v', name: this.$t('homechart_24h_v')},
        {key: 'actions', name: this.$t('actions')}
      ]
    }
  },
  components: {
    kSlider: Slider,
    PairTable,
    MineSummary
    // Kyc
  },
  computed: {
    announcementLink () {
      return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
    },
    isKorean () {
      return state.locale === 'ko'
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
          // 判断最新公告是否小于4小时
          let resp = await service.hasNewBanner()
          if (!resp.code && resp.data) {
            this.hasNewNotice = resp.data['new']
          }
          // this.hasNewNotice = true
          // const freshAlive = 4 * 3600 * 1000
          // let recentTime = maxBy(this.notices, i => i.create_time).create_time
          // recentTime = recentTime < 1e10 ? recentTime * 1000 : recentTime
          // if (recentTime > new Date().getTime() - freshAlive) {
          //   this.hasNewNotice = true
          // }
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
 @import './home/home.scss';
</style>
