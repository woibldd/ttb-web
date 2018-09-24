<template>
  <div class="h5-footer-container">
    <div class="footer-row">
      <div class="row-pick-up">
        <div class="row__title">服务</div>
        <div
          class="row__pick__arrow"
          @click="pickUp('service')">
          <icon
            name="arrow-down"
            :class="[list.service && 'up']"/>
          {{ !list.service ? '展开' : '收起' }}</div>
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
      <div class="row-pick-up">
        <div class="row__title">工具</div>
        <div
          class="row__pick__arrow"
          @click="pickUp('tool')">
          <icon
            name="arrow-down"
            :class="[list.tool && 'up']"/>
          {{ !list.tool ?'展开' : '收起' }}</div>
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

      </div>
    </div>
    <div class="footer-row">
      <div class="row-pick-up">
        <div class="row__title">说明</div>
        <div
          class="row__pick__arrow"
          @click="pickUp('intro')">
          <icon
            name="arrow-down"
            :class="[list.intro && 'up']"/>
          {{ !list.intro ? '展开' : '收起' }}</div>
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
  </div>
</template>
<script>
import './footer.scss'
import { state } from '@/modules/store'

export default {
  data () {
    return {
      list: {
        service: false,
        tool: false,
        intro: false
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
