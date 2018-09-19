<template>
  <footer>
    <div class="footer-container">
      <div class="footer_left">
        <router-link
          :to="{name:'home'}"
          class="footer_logo"/>
        <p class="footer_ltxt">{{$t('footer_services_email')}}：service@ix.com</p>
        <p class="footer_ltxt">{{$t('footer_bussness')}}：business@ix.com</p>
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
              src="../assets/pic-contact-wx.jpg">
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
              src="../assets/pic-contact-biyong.jpg">
          </div>
        </div>
        <p class="copyright">Copyright © 2018 IX.COM</p>
      </div>
      <div class="footer_right">
        <div class="footer_ct">
          <p>{{$t('footer_services')}}</p>
          <router-link :to="{name: 'trading'}">{{$t('trading')}}</router-link>
          <!-- <a href="#" target="_blank">{{$t('footer_services')}}</a> -->
          <!-- <a href="#" target="_blank">{{$t('footer_help')}}</a> -->
          <a :href="requestLink" target="_blank">{{$t('footer_request')}}</a>
        </div>
        <div class="footer_ct">
          <p>{{$t('footer_tools')}}</p>
          <a :href="announcementLink" target="_blank">{{$t('footer_notice')}}</a>
          <a :href="helpLink" target="_blank">{{$t('user_guide')}}</a>
          <!-- <a href="#" target="_blank">{{$t('footer_api')}}</a> -->
        </div>
        <div class="footer_ct">
          <p>{{$t('footer_terms')}}</p>
          <router-link :to="{name: 'terms'}" target="_blank">{{$t('footer_agreement')}}</router-link>
          <router-link :to="{name: 'PrivacyPolicy'}" target="_blank">{{$t('footer_private')}}</router-link>
          <!-- <a href="#" target="_blank">{{$t('footer_fee')}}</a> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { state } from '@/modules/store'
export default {
  data () {
    return {
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
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/vars";
  @import "../styles/mixins";
  footer {
    width: 100%;
    height:350px;
    background-color: $home-header-bgdark;
  }
  .footer_left{
    float: left;
    width: auto;
    padding-top: 80px;
    width: 220px;
    .footer_ltxt{
      float: left;
      color: #fff;
      font-size: 14px;
      line-height: 24px;
    }
    .footer_logo{
      width: 141px;
      height: 46px;
      @include bg-retina('../assets/nav_logo', 'png', 142px, 46px);
      float: left;
      margin-bottom: 18px;
    }
    .copyright{
      float: left;
      margin-top: 15px;
      line-height: 25px;
      font-size: 15px;
      color: #fff;
    }
  }
  .footer_right{
    float: right;
    color: #6C869C;
    font-size: 14px;
    .footer_ct{
      float: left;
      margin-left: 120px;
      p{
        line-height: 24px;
        margin-bottom: 20px;
        margin-top: 84px;
      }
    }
    a{
      color: #fff;
      display: table;
      line-height: 36px;

      &:hover {
        color: $primary;
      }
    }
  }
  .footer-container {
    .pointer {
      cursor: pointer;
    }
    margin: 0 auto;
    max-width: 1200px;
    min-width: $page-width;
    display: flex;
    justify-content: space-between;
    .contact-list {
      margin-top: 30px;
      display: flex;
      float: left;
    }
    .contact-item{
      display: inline-block;
      width: 20px;
      height: 20px;
      color: #999999 !important;
      &:hover {
         color: #C1A538 !important;
      }
    }
    .contact-item-wrapper {
      position: relative;
      width: 20px;
      height: 20px;
      .contact-item{
        position: absolute;
        left: 0;
        top: 0;
      }
      .contact-img {
        display: none;
        position: absolute;
        top: -130px;
        right: -50px;
      }
      &:hover {
        .contact-img {
          display: inline-block;
        }
      }
    }
  }
</style>
