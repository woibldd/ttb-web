<template>
  <div class="h5-index-container">
    <div class="h5-page-header">
      <div class="header__left">
        <div class="title-pic"/>
        <div class="title--text">
          币币交易
        </div>
      </div>
      <div class="header__right">
        <span class="operate">登录</span>
        <span class="operate signup">注册</span>
        <span class="operate">三</span>
      </div>
    </div>
    <div class="h5-page__banner">
      <div class="banner-pic"/>
      <div class="banner-announce">
        <div class="intro">公告</div>
        <div class="news">"预挖矿"公告</div>
      </div>
    </div>
    <div class="mine-info-section">
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
import PairTable from '@/components/Trading/PairTable'
import h5Footer from '../footer'

export default {
  data () {
    return {

    }
  },
  components: {
    MineSummary,
    PairTable,
    h5Footer
  }
}
</script>
