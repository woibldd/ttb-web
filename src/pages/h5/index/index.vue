<template>
  <div class="h5-index-container">
    <div class="h5-page-header">
      <div class="header__left">
        <div class="title-pic"/>
        <div class="title--text">
          <router-link
            :to="{name: 'trading'}"
            class="nav_link">{{ $t('trading') }}</router-link>
        </div>
      </div>
      <div class="header__right">
        <span
          class="profile"
          @click="toggleMenu">
          {{ desentInfo }}
        </span>
        <span
          class="operate"
          v-if="!state.userInfo">{{ $t("signin") }}</span>
        <span
          class="operate signup"
          v-if="!state.userInfo">{{ $t("signup_title") }}</span>
        <span
          class="operate"
          @click="toggleMenu">三</span>
        <div
          class="hide-list"
          v-if="showMenu">
          <router-link
            @click="toggleMenu"
            :to="{name: 'trading'}"
          >{{ $t('trading') }}</router-link>
          <a
            @click="toggleMenu"
            :href="'/docs/The+Declaration+of+IX'+pdfSubfix+'.pdf'"
            target="_blank">{{ $t("declaration") }}</a>
          <a
            @click="toggleMenu"
            :href="'/docs/IX+WhitePaper'+pdfSubfix+'.pdf'"
            target="_blank">{{ $t("whitepagger") }}</a>
        </div>
      </div>
    </div>
    <div class="h5-page__banner">
      <div class="banner-pic"/>
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
import {state} from '@/modules/store'
import service from '@/modules/service'

export default {
  data () {
    return {
      state,
      banners: [],
      notices: [],
      showMenu: false
    }
  },
  computed: {
    desentInfo () {
      let userInfo = this.state.userInfo
      if (userInfo) {
        if (userInfo.phone) {
          return utils.publicDesensitization(userInfo.phone)[0]
          // return utils.publicDesensitization('91418865')[0]
        } else if (userInfo.email) {
          return utils.publicDesensitization(userInfo.email)[0]
        }
      }
      return ''
    },
    pdfSubfix () {
      if (state.locale === 'zh-CN') {
        return '+zh-CN'
      }
      return ''
    }
  },
  created () {
    this.getBanners()
  },
  methods: {
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    async getBanners () {
      const res = await service.getBanners()
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
    h5Footer
  }
}
</script>
