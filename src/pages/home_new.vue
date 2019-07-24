<template>
  <div class="page-home">
    <!--<div class="home2">-->
      <!--<k-slider-->
        <!--:banners="banners"-->
        <!--:swiper-option="swiperOption"/>-->

    <!--</div>-->
    <home-banner :banner="banner1" :swipe-banner="notices1"/>
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
      <pair-rank-table
        :sorted-list="changeRankList"
        :get-delta="getDelta"/>
      <!-- 最新上线 -->
      <pair-table
        :sorted-list="sortedList"
        @searching="onSearching"
        @switchTab="onSwitchTab"
        :get-delta="getDelta"/>
      <div
        class="mask"
        :class="{show: loading}">
        <v-loading/>
      </div>
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
            src="../assets/home/home-intro-4.png"
            alt="">
          <p class="short-txt">{{ $t('home_intro_efficiency') }}</p>
          <p class="long-text">{{ $t('home_intro_long_d') }}</p>

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

      </div>
    </div>
    <div class="corperator">
      <div class="corperator-container">
        <div class="corp-row row-60 mb-60">
          <div class="corp-title" v-t="'footer_investors'"/>

            <div class="corp-logo">
              <a class="link" href="javascript:;" @click.prevent>
                <img class="logo may" src="~@/assets/copr-logo-may.png">
              </a>
            </div>
          </div>
        <div class="corp-row row-60 mb-60">
          <div
            class="corp-title"
            v-t="'footer_partners'"/>
          <div class="corp-logo">
            <span
              class="link"
              target="_blank">
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

        <div class="corp-row row-20">
          <div
            class="corp-title">
            {{ $t('footer_copr') }}
          </div>
          <div class="corp-logo">
            <span
              class="link"
              target="_blank">
              <img
                class="logo dvp"
                src="~@/assets/copr-logo-dvp.png" >
            </span>
          </div>
          <div class="corp-logo">
            <span
              class="link"
              target="_blank">
              <img
                class="logo hx"
                src="~@/assets/copr-logo-cs.png" >
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Slider from '@/components/slider.vue'
import service from '@/modules/service'
import PairTable from '@/components/home/pair-table'
import PairRankTable from '@/components/home/pair-rank-table'
import MineSummary from '@/components/Mine/MineSummary'
import tickTableMixin from '@/mixins/tick-table'
import HomeBanner from './banner/index'
export default {
  mixins: [tickTableMixin],
  data: function () {
    return {
      banners: [],
      notices: [],
      banner1: [],
      notices1: [],
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
    PairRankTable,
    MineSummary,
    HomeBanner
    // Kyc
  },
  computed: {
    announcementLink () {
      return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
    },
    isKorean () {
      return state.locale === 'ko'
    },
    // tabSelected () {
    //   return state.tabSelected
    // },
  },
  watch: {
    'state.locale' (locale) {
      this.getBanners()
    }
  },
  methods: {
    buySubmit(item) {
        this.$router.push({
            path: '/Superzis',
            query: item
        })
    },
    async getBanners () {
      const res = await service.getBanners()
      console.log(res)
      if (!res.code) {
        let list = res.data
        if (list.length > 0) {
          this.banners = list.filter(b => b.slot === 1)
          this.notices = list.filter(b => b.slot === 2)
          this.banner1 = list.filter(b => b.slot === 3)
          this.notices1.push(this.notices[0])
          if (this.notices.length > 3) {
            this.notices.splice(3)
          }
          // 判断最新公告是否小于4小时
          let resp = await service.hasNewBanner()
          if (!resp.code && resp.data) {
            this.hasNewNotice = resp.data['new']
          }
        }
      }
    },
    onSearching (kw) {
      this.search = kw
    },
    onSwitchTab (val) {
      // console.log('switchTab')
      // this.state.tabSelected = val
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
