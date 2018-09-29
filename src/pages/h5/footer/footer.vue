<template>
  <section>
    <div class="h5-footer-container">
      <div class="footer-row">
        <div
          class="row-pick-up"
          @click="pickUp('service')">
          <div
            class="row__title"
            v-t="'footer_services'"/>
          <div
            class="row__pick__arrow"
          >
            <icon
              name="arrow-down"
              :class="[list.service && 'up']"/>
          </div>
        </div>
        <div
          class="row-content"
          v-if="list.service">
          <router-link :to="{name: 'trading'}">{{ $t('trading') }}</router-link>
          <a
            :href="aboutLink"
            target="_blank">{{ $t('footer_about') }}</a>
          <!-- <a href="#" target="_blank">{{$t('footer_help')}}</a> -->
          <a
            :href="requestLink"
            target="_blank">{{ $t('footer_request') }}</a>
        </div>
      </div>
      <div class="footer-row">
        <div
          class="row-pick-up"
          @click="pickUp('tool')">
          <div
            class="row__title"
            v-t="'footer_tools'"/>
          <div
            class="row__pick__arrow"
          >
            <icon
              name="arrow-down"
              :class="[list.tool && 'up']"/>
          </div>
        </div>
        <div
          class="row-content"
          v-if="list.tool">
          <a
            :href="announcementLink"
            target="_blank">{{ $t('footer_notice') }}</a>
          <a
            :href="helpLink"
            target="_blank">{{ $t('user_guide') }}</a>
          <a
            href="https://github.com/ix-api/API_Docs"
            target="_blank">{{ $t('footer_api') }}</a>
        </div>
      </div>
      <div class="footer-row">
        <div
          class="row-pick-up"
          @click="pickUp('intro')">
          <div
            class="row__title"
            v-t="'footer_terms'"/>
          <div
            class="row__pick__arrow">
            <icon
              name="arrow-down"
              :class="[list.intro && 'up']"/>
          </div>
        </div>
        <div
          class="row-content"
          v-if="list.intro">
          <router-link
            :to="{name: 'terms'}"
            target="_blank">{{ $t('footer_agreement') }}</router-link>
          <router-link
            :to="{name: 'PrivacyPolicy'}"
            target="_blank">{{ $t('footer_private') }}</router-link>
        </div>
      </div>
      <div class="footer-row">
        <div
          class="row-pick-up"
          @click="pickUp('qrcode')">
          <div
            class="row__title"
            v-t="'footer_contract'"/>
          <div
            class="row__pick__arrow">
            <icon
              name="arrow-down"
              :class="[list.qrcode && 'up']"/>
          </div>
        </div>
        <div
          class="row-content"
          v-if="list.qrcode">
          <div class="qrcode">
            <img
              src="~@/assets/contact.png"
            >
            <p
              class="contact_desc mt-10 mb-10"
              v-t="'footer_contract_desc'"/>
          </div>
        </div>
      </div>
    </div>
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
  </section>
</template>
<script>
import { state } from '@/modules/store'

export default {
  data () {
    return {
      list: {
        service: false,
        tool: false,
        intro: false,
        qrcode: false
      },
      state
    }
  },
  computed: {
    helpLink () {
      return this.state.theme.help[this.state.locale] || this.state.theme.help.en
    },
    requestLink () {
      if (this.state.userInfo && this.state.theme.themeName === 'default') {
        return process.env.BASE_API + 'zendesk/sso?return_to=' + encodeURIComponent(this.state.theme.request[this.state.locale] || this.state.theme.request.en)
      } else {
        return this.state.theme.request[this.state.locale] || this.request.theme.help.en
      }
    },
    announcementLink () {
      return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
    },
    aboutLink () {
      return `/docs/IX_introduction_${this.state.locale || 'en'}.pdf`
    }
  },
  methods: {
    pickUp (name) {
      this.list[name] = !this.list[name]
    }
  }
}
</script>
<style lang="scss" scoped>
@import './footer.scss';
</style>
