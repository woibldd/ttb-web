<template>
  <section>
    <div class="h5-footer-container">
      <div class="footer-row border-top-1">
        <div
          class="row-pick-up"
          @click="pickUp('service')">
          <div
            v-t="'footer_services'"
            class="row__title"/>
          <div
            class="row__pick__arrow"
          >
            <icon
              :class="[list.service && 'up']"
              name="arrow-down"/>
          </div>
        </div>
        <div
          v-if="list.service"
          class="row-content">
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
            v-t="'footer_tools'"
            class="row__title"/>
          <div
            class="row__pick__arrow"
          >
            <icon
              :class="[list.tool && 'up']"
              name="arrow-down"/>
          </div>
        </div>
        <div
          v-if="list.tool"
          class="row-content">
          <a
            :href="announcementLink"
            target="_blank">{{ $t('footer_notice') }}</a>
          <a
            :href="helpLink"
            target="_blank">{{ $t('user_guide') }}</a>
          <router-link
            :to="{name:'Fee'}"
            target="_blank">{{ $t('footer_fee') }}</router-link>
          <a
            :href="apiDoc"
            target="_blank">{{ $t('footer_api') }}</a>
        </div>
      </div>
      <div class="footer-row">
        <div
          class="row-pick-up"
          @click="pickUp('intro')">
          <div
            v-t="'footer_terms'"
            class="row__title"/>
          <div
            class="row__pick__arrow">
            <icon
              :class="[list.intro && 'up']"
              name="arrow-down"/>
          </div>
        </div>
        <div
          v-if="list.intro"
          class="row-content">
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
          @click="pickUp('company')">
          <div
            v-t="'footer_company_info_title'"
            class="row__title"/>
          <div
            class="row__pick__arrow">
            <icon
              :class="[list.company && 'up']"
              name="arrow-down"/>
          </div>
        </div>
        <div
          v-if="list.company"
          class="row-content pb-10"
          style="display: inline-block;">
          <a v-t="$t('footer_company_info_name')"/>
          <a
            v-t="$t('footer_company_info_registion')"
            class="ml-10 mr-10"/>
          <a
            v-t="$t('footer_company_info_address')"/>
        </div>
      </div>
      <div class="footer-row">
        <div
          class="row-pick-up"
          @click="pickUp('qrcode')">
          <div
            v-t="'footer_contract'"
            class="row__title"/>
          <div
            class="row__pick__arrow">
            <icon
              :class="[list.qrcode && 'up']"
              name="arrow-down"/>
          </div>
        </div>
        <div
          v-if="list.qrcode"
          class="row-content">
          <div class="qrcode">
            <img
              src="~@/assets/pic-contact-wx.png"
            >
            <p
              v-t="'footer_contract_desc'"
              class="contact_desc mt-10 mb-10"/>
          </div>
        </div>
      </div>
    </div>
    <div class="h5-contact-info">
      <div class="contact-list">
        <a
          class="contact-item-wrapper mr-20 pointer"
          href='https://www.facebook.com/IXX-301038947404383'>
          <icon
            class="contact-item"
            name="footer-facebook"/>
        </a>
        <a
          class="contact-item-wrapper mr-20 pointer"
          href='https://twitter.com/IXX73784665'>
          <icon
            class="contact-item"
            name="footer-twitter"/>
        </a>
        <a
          href="mailto:support@ixx.com"
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
            src="../../../assets/pic-contact-wx.png">
        </div>
        <a
          class="contact-item-wrapper mr-20 pointer"
          href="https://t.me/ixxofficial">
          <icon
            class="contact-item "
            name="footer-telegram"/>
        </a>
        <a
          class="contact-item-wrapper mr-20 pointer"
          href="https://t.me/ixxofficial">
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
            src="../../../assets/pic-contact-biyong.png">
        </div>
      </div>
      <p class="copyright">Copyright © 2019 IXX.COM</p>
    </div>
  </section>
</template>
<script>
import { state } from '@/modules/store'

export default {
  data() {
    return {
      list: {
        service: false,
        tool: false,
        intro: false,
        qrcode: false,
        company: false
      },
      state
    }
  },
  computed: {
    helpLink() {
      return this.state.theme.help[this.state.locale] || this.state.theme.help.en
    },
    requestLink() {
      if (this.state.userInfo && this.state.theme.themeName === 'default') {
        return process.env.BASE_API + '/ixx/zendesk/sso?return_to=' + encodeURIComponent(this.state.theme.request[this.state.locale] || this.state.theme.request.en)
      } else {
        return this.state.theme.request[this.state.locale] || this.request.theme.help.en
      }
    },
    announcementLink() {
      return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
    },
    aboutLink() {
      return `/docs/IX_introduction_${this.state.locale || 'en'}.pdf`
    },
    apiDoc() {
      return this.state.theme.apiDoc[this.state.locale || 'en']
    }
  },
  methods: {
    pickUp(name) {
      this.list[name] = !this.list[name]
    }
  }
}
</script>
<style lang="scss" scoped>
@import './footer.scss';
</style>
