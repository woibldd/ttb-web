<template>
  <div class="page-home">
    <!--<div class="home2">-->
    <!--<k-slider-->
    <!--:banners="banners"-->
    <!--:swiper-option="swiperOption"/>-->

    <!--</div>-->
    <home-banner  @buy-handle="buySubmit"/>
    <div class="ind_txt">
      <div class="ind_cen">
        <div
          v-for="(item) in notices"
          :key="item.id"
          class="ind_c">
          <a
            :href="item.url || 'javascript:;'"
            class="text_link"
            :title="item.title"
            target="_blank">
            {{ item.title }}
          </a>
        </div>
        <a
          :href="announcementLink"
          class="more"
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
        @searching="onSearching"
        @switchTab="onSwitchTab"/>
      <div
        :class="{show: loading}"
        class="mask">
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
          <div v-t="'footer_investors'" class="corp-title"/>
          <div class="corp-logo">
            <a class="link" href="http://gs.holdings/" @click.prevent>
              <img class="logo gs" src="~@/assets/copr-logo-gs.png">
            </a>
          </div>
          <div class="corp-logo">
            <a class="link" href="javascript:;" @click.prevent>
              <img class="logo may" src="~@/assets/copr-logo-may.png">
            </a>
          </div>
          <div class="corp-logo">
            <a class="link" href="javascript:;" @click.prevent>
              <img class="logo may" src="~@/assets/copr-logo-bah.png">
            </a>
          </div>
          <div class="corp-logo">
            <a class="link" href="javascript:;" @click.prevent>
              <img class="logo may" src="~@/assets/copr-logo-jlzb.png">
            </a>
          </div>
          <div class="corp-logo">
            <a class="link" href="javascript:;" @click.prevent>
              <img class="logo may" src="~@/assets/copr-logo-yxzb.png">
            </a>
          </div>
        </div>
        <div class="corp-row row-60 mb-60">
          <div
            v-t="'footer_partners'"
            class="corp-title"/>
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

        <div class="corp-row row-60 mb-60">
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
          <div class="corp-logo">
            <span
              class="link"
              target="_blank">
              <img
                class="logo hx"
                src="~@/assets/copr-logo-pdkj.png" >
            </span>
          </div>
        </div>
        <div class="corp-row row-20">
          <div
            class="corp-title">
            {{ $t('footer_link') }}
          </div>
          <div class="corp-logo">
            <a
              class="link"
              href="https://coincodex.com/exchange/ixx/"
              target="_blank">
              <img
                class="logo dvp"
                src="~@/assets/home/copr-logo-coincodex.png" >
            </a>
          </div>
          <div class="corp-logo">
            <a
              class="link"
              href="https://coinmarketcap.com/exchanges/ixx-exchange/"
              target="_blank">
              <img
                class="logo hx"
                src="~@/assets/home/copr-logo-CMC.png" >
            </a>
          </div>
          <div class="corp-logo">
            <a
              class="link"
              href="https://www.mytokencap.com/exchange/ixx.com"
              target="_blank">
              <img
                class="logo hx"
                src="~@/assets/home/copr-logo-mytoken.png" >
            </a>
          </div>
          <div class="corp-logo">
            <a
              class="link"
              href="https://www.sosolx.com/exchange/IXX/303.html"
              target="_blank">
              <img
                class="logo hx"
                src="~@/assets/home/copr-logo-SOSOLX.png" >
            </a>
          </div>
          <div class="corp-logo">
            <a
              class="link"
              href="https://planemo.io"
              target="_blank">
              <img
                class="logo hx"
                src="~@/assets/home/copr-logo-pla.png" >
            </a>
          </div>
        </div>
      </div>
    </div>
    <v-modal
      :open.sync="showSTModal">
      <div class="statement">
        <div class="statement-title">
          <icon
            name="information"
            color="$primary;" />
          <span>{{ $t('home.stmodal.statement') }}</span>
        </div>
        <div class="statement-content"> 
          {{ $t('home.stmodal.content') }}
        </div>
        <div
          class="statement-footer"
          flex="main">
          <div
            flex-box="1"
            flex="cross:center"
            class="left">
            <el-checkbox
              v-model="local.stNeverShow">{{ $t('home.stmodal.no_alert_again') }}</el-checkbox>
          </div>
          <div
            flex-box="1"
            class="right">
            <el-button
              class="right"
              type="primary"
              @click="close"> {{ $t('home.stmodal.understand') }}</el-button>
          </div>
        </div> 
      </div>
    </v-modal>
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
import { local } from '@/modules/store'

export default {
  components: {
    kSlider: Slider,
    PairTable,
    PairRankTable,
    MineSummary,
    HomeBanner
    // Kyc
  },
  mixins: [tickTableMixin],
  data: function() {
    return {
      banners: [],
      notices: [],
      banner1: [],
      notices1: [],
      newbanners:[],
      swiperOption: {
        direction: 'horizontal',
        loop: true,
        autoplay: 1000,
        paginationType: 'fraction',
        pagination: '.swiper-pagination'
      },
      hasNewNotice: false,
      pairsHead: [
        { key: 'currency', name: this.$t('currency') },
        { key: 'homechart_price', name: this.$t('homechart_price') },
        { key: 'homechart_24h_chg', name: this.$t('homechart_24h_chg') },
        { key: 'homechart_24h_l', name: this.$t('homechart_24h_l') },
        { key: 'homechart_24h_h', name: this.$t('homechart_24h_h') },
        { key: 'homechart_24h_v', name: this.$t('homechart_24h_v') },
        { key: 'actions', name: this.$t('actions') }
      ],
      showSTModal: false
    }
  },
  computed: {
    announcementLink() {
      return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
    },
    isKorean() {
      return state.locale === 'ko'
    }
    // tabSelected () {
    //   return state.tabSelected
    // },
  },
  watch: {
    'state.locale'(locale) {
      this.getBanners()
    }
  },
  created() {
    this.getBanners()
    //如果地址带有邀请码信息则将邀请码写入cookie中，有效期为10天  2019/10/16 yzf
    let invitorId = this.$route.query.invitor
    let agentId = this.$route.query.agent
    if (invitorId) {
      utils.setCookie('invitor', invitorId, 10)
    } else if (agentId) {
      utils.setCookie('invitor', agentId, 10)
    }
  },
  methods: {
    buySubmit(item) {
      this.$router.push({
        path: '/Superzis',
        query: item
      })
    },
    async getBanners() {
      const res = await service.getBanners()
      console.log(res)
      if (!res.code) {
        const list = res.data
        if (list.length > 0) {
          this.banners = list.filter(b => b.slot === 1)
          this.notices = list.filter(b => b.slot === 4)
          this.banner1 = list.filter(b => b.slot === 3)

          this.newbanners = list.filter(b => b.slot === 2)
          this.notices1.push(this.newbanners[0])
          if (this.notices.length > 3) {
            this.notices.splice(3)
          }
          // 判断最新公告是否小于4小时
          const resp = await service.hasNewBanner()
          if (!resp.code && resp.data) {
            this.hasNewNotice = resp.data['new']
          }
        }
      }
    },
    onSearching(kw) {
      this.search = kw
    },
    onSwitchTab(val) {  
      if (val === 'new' && !local.stNeverShow) {
        this.showSTModal = true
      }
      // this.state.tabSelected = val
    },
    close () {
      this.showSTModal = false
    }
  }
}
</script>
<style lang="scss" scoped>
 @import './home/home.scss';
</style>
