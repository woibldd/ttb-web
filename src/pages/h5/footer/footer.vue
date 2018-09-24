<template>
  <div class="h5-footer-container">
    <div class="footer-row">
      <div class="row-pick-up">
        <div class="row__title">服务</div>
        <div class="row__pick__arrow">下拉</div>
      </div>
      <div class="row-content">
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
        <div class="row__pick__arrow">下拉</div>
      </div>
      <div class="row-content">
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
        <div class="row__pick__arrow">下拉</div>
      </div>
      <div class="row-content">
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
export default {

}
</script>
