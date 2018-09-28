<template>
  <footer>
    <div class="footer-container">
      <div class="footer_left">
        <router-link
          :to="{name:'home'}"
          class="footer_logo"/>
        <p class="footer_ltxt"><b>{{ $t('first') }}</b>{{ $t('bitcoin_equity_certificate') }}</p>
        <img
          class="footer_ewm"
          src="../assets/ewm.png">
        <p class="footer_ewm_ltxt">{{ $t('footer_contract_desc') }}</p>
      </div>
      <div class="footer_right">
        <div class="footer_ct">
          <p>{{ $t('footer_services') }}</p>
          <router-link :to="{name: 'trading'}">{{ $t('trading') }}</router-link>
          <!-- <a href="#" target="_blank">{{$t('footer_services')}}</a> -->
          <!-- <a href="#" target="_blank">{{$t('footer_help')}}</a> -->
          <a
            :href="requestLink"
            target="_blank">{{ $t('footer_request') }}</a>
        </div>
        <div class="footer_ct">
          <p>{{ $t('footer_tools') }}</p>
          <a
            :href="announcementLink"
            target="_blank">{{ $t('footer_notice') }}</a>
          <a
            :href="helpLink"
            target="_blank">{{ $t('user_guide') }}</a>
            <!-- <a href="#" target="_blank">{{$t('footer_api')}}</a> -->
        </div>
        <div class="footer_ct footer-rt">
          <p>{{ $t('footer_terms') }}</p>
          <router-link
            :to="{name: 'terms'}"
            target="_blank">{{ $t('footer_agreement') }}</router-link>
          <router-link
            :to="{name: 'PrivacyPolicy'}"
            target="_blank">{{ $t('footer_private') }}</router-link>
            <!-- <a href="#" target="_blank">{{$t('footer_fee')}}</a> -->
        </div>
        <div class="hg"/>
        <div class="right-bottom">
          <div class="bottom-txt bot-la">
            <p class="footer_ltxt">{{ $t('footer_services_email') }}：service@ix.com</p>
            <p class="footer_ltxt">{{ $t('footer_bussness') }}：business@ix.com</p>
          </div>
          <div class="bottom-txt bot-lb">
            <div class="contact-list">
              <a
                class="contact-item-wrapper pointer"
                href='https://www.facebook.com/IXExchange'>
                <icon
                  class="contact-item"
                  name="footer-facebook"/>
              </a>
              <a
                class="contact-item-wrapper pointer"
                href='https://twitter.com/IXExchange'>
                <icon
                  class="contact-item"
                  name="footer-twitter"/>
              </a>

              <a
                href="mailto:service@ix.com"
                class="contact-item-wrapper pointer">
                <icon
                  class="contact-item"
                  name="footer-email"/>
              </a>
              <div class="contact-item-wrapper ">
                <icon
                  class="contact-item"
                  name="footer-wx"/>
                <img
                  class="contact-img"
                  src="../assets/pic-contact-wx.jpg">
              </div>
              <a
                class="contact-item-wrapper pointer"
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
    padding-top: 38px;
    width: auto;
    .footer_ltxt{
      font-size: 14px;
      line-height: 40px;
      color: #C9A96C;
      display: block;
      b{
        font-weight: bold;
      }
    }
    .footer_ewm{
      width: 140px;
      height: 140px;
      display: block;
      margin-top: 7px;
    }
    .footer_ewm_ltxt{
      width: 180px;
      line-height: 22px;
      display: block;
      color: #999999;
      margin-top: 15px;
    }
    .footer_logo{
      width: 196px;
      height: 45px;
      @include bg-retina('../assets/footer_logo', 'png', 196px, 45px);
      display: block;
    }

  }
  .footer_right{
    float: right;
    font-size: 14px;
    width: 500px;
    .footer_ct{
      float: left;
      width: 33%;
      p{
        line-height: 30px;
        margin-top: 15px;
        margin-bottom: 15px;
        color: #C9A96C;
      }
    }
    .footer-rt{
      float: right;
      margin-left: 0;
    }
    a{
      color: #999;
      display: table;
      line-height: 36px;

      &:hover {
        color: $primary;
      }
    }
    .hg{
      width: 100%;
      height: 1px;
      background: #fff;
      float: left;
      margin-top: 35px;
    }
    .right-bottom{
      float: left;
      width: 100%;
      padding-top: 30px;
      .bottom-txt{
        float: left;
        line-height: 36px;
        color: #fff;
      }
      .bot-la{
        width: 60%;
      }
      .bot-lb{
        width: 40%;
      }
    }
    .copyright{
      float: left;
      font-size: 15px;
      color: #fff;
      width: 100%;
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
      margin-top: 10px;
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
      margin-right: 12px;
      &:last-child{
        margin-right: 0;
      }
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
