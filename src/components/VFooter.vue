<template>
  <footer>
    <div class="footer-container">
      <div class="footer_left ">
        <router-link
          :to="{name:'home'}"
          class="footer_logo">
          <img src="../assets/ixx/ixx_logo.png" :alt="$t('seo_keywords')">
        </router-link>
        <p class="footer_ltxt">
          <!-- <b>{{ $t('first') }}</b> -->
          {{ $t('exchangeNameConfig') }}
          <!-- {{ $t('exchangeNameConfig') }} -->
        </p>
        <div class="clearfix">
          <div
            class="lt">
            <img
              class="footer_ewm"
              src="../assets/pic-contact-wx.jpeg">
            <p class="footer_ewm_ltxt">{{ $t('home.footer.footer_contract_desc') }}</p>
          </div>
          <!-- <div
            class="lt">
            <img
              class="footer_ewm"
              src="../assets/kefu_telegran_ewm.jpg">
            <p class="footer_ewm_ltxt">{{ $t('footer_contract_desc') }}</p>
          </div> -->
          <div
            class="lt">
            <p class="footer_explain_txt">{{ $t('home.footer.explain') }}</p>
          </div> 
        </div>
        <div > 
          <!-- <p class="footer_explain_txt">{{ $t('home.footer.component_address') }}</p> -->
          <!-- <p class="footer_ewm_ltxt">{{ $t('footer_contract_jb') }}</p> -->
        </div>
        <!-- <div
          class="lt"
          v-if="!showEnTips">
          <img
            class="footer_ewm"
            src="../assets/ixx_kefu_big.jpg">
          <p class="footer_ewm_ltxt">{{ $t('footer_contract_jb') }}</p>
        </div> -->
        <!-- <div
          class="lt"
          v-if="showEnTips">
          <img
            class="footer_ewm"
            src="../assets/ewm_en.png">
          <p class="footer_ewm_ltxt">{{ $t('footer_contract_desc') }}</p>
        </div> -->
        <!-- <div
          class="lt"
          v-if="showEnTips">
          <img
            class="footer_ewm"
            src="../assets/ewm_en_by.png">
          <p class="footer_ewm_ltxt">{{ $t('footer_contract_jb') }}</p>
        </div> -->
      </div>
      <div class="footer_right">
        <div class="footer_ct">
          <p>{{ $t('footer_services') }}</p>
          <router-link :to="{name: 'trading'}">{{ $t('trading') }}</router-link>
          <!-- <a
            :href="aboutLink"
            target="_blank">{{ $t('footer_about') }}</a>  -->
          <!-- <a
            :href="requestLink"
            target="_blank">{{ $t('footer_request') }}</a> -->
          <!-- <a
            href="/proposer"
            target="_blank">{{ $t('footer_application_coin') }}</a> -->
          <!-- <a
            href="http://ixxwenjuan.mikecrm.com/kl7CuJZ"
            target="_blank">{{ $t('footer_application_coin') }}</a> -->
        </div>
        <div class="footer_ct">
          <p>{{ $t('footer_tools') }}</p>
          <!-- <a
            rel="nofollow"
            :href="announcementLink"
            target="_blank">{{ $t('footer_notice') }}</a> -->
          <a
            rel="nofollow"
            :href="helpLink"
            target="_blank">{{ $t('footer_help') }}</a>
          <router-link
            :to="{name:'Fee'}"
            target="_blank">{{ $t('footer_fee') }}</router-link>
          <!-- <a
            rel="nofollow"
            :href="apiDoc"
            target="_blank">{{ $t('footer_api') }}</a> -->
          <router-link to="/industry">{{ $t('home.footer.information') }}</router-link>
<!--           <a-->
<!--            href="/industry"></a>-->
        </div>
        <div class="footer_ct footer-rt">
          <p>{{ $t('footer_terms') }}</p>
          <router-link
            :to="{name: 'terms'}"
            target="_blank">{{ $t('footer_agreement') }}</router-link>
          <router-link
            :to="{name: 'PrivacyPolicy'}"
            target="_blank">{{ $t('footer_private') }}</router-link>
        </div>
        <div class="hg"/>
        <div class="right-bottom">
          <div class="bottom-txt bot-la">
            <p class="footer_ltxt">{{ $t('footer_services_email') }}???server@ttb.plus</p>
            <p class="footer_ltxt">{{ $t('footer_bussness') }}???business@ttb.plus</p>
            <!-- <p class="footer_ltxt">{{ $t('home.footer.affiliate') }}</p> -->
          </div>
          <div class="bottom-txt bot-lb">
            <div class="contact-list"> 
              <div class="contact-item-wrapper ">
                <icon
                  class="contact-item"
                  name="footer-wx"/>
                <img
                  class="contact-img"
                  src="../assets/pic-contact-wx.jpeg">
              </div> 
            </div>
            <p class="copyright">Copyright ?? 2022 btt.plus</p>
          </div>

        </div>
      </div>
    </div>
    <div class="footer_info">
      <!-- <strong class="strong mr-10">{{ $t('footer_company_info_title') }}</strong>
      <span class="company_name mr-10">{{ $t('footer_company_info_name') }}</span>
      <span class="company_registion mr-10">{{ $t('footer_company_info_registion') }}</span>
      <span class="company_address">{{ $t('footer_company_info_address') }}</span> -->
    </div>
  </footer>
</template>

<script>
import { state } from '@/modules/store'
export default {
  data() {
    return {
      state
    }
  },
  computed: {
    helpLink() {
      return this.state.theme.help[this.state.locale] || this.state.theme.help.en
    },
    requestLink() {
      // if (this.state.userInfo && this.state.theme.themeName === 'default') {
      //   return process.env.BASE_API + '/ixx/zendesk/sso?return_to=' + encodeURIComponent(this.state.theme.request[this.state.locale] || this.state.theme.request.en)
      // } else {
      //   return this.state.theme.request[this.state.locale] || this.request.theme.help.en
      // }
      return this.state.theme.request[this.state.locale] || this.request.theme.request.en
    },
    announcementLink() {

      // if (this.state.userInfo && this.state.theme.themeName === 'default') {
      //   return process.env.BASE_API + '/ixx/zendesk/sso?return_to=' + encodeURIComponent(this.state.theme.announcement[this.state.locale] || this.request.theme.announcement.en)
      // } else {
      //   return this.state.theme.announcement[this.state.locale] || this.request.theme.announcement.en
      // }
      // return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
      return ""
    },
    aboutLink() {
      // return `/docs/IXX_introduction_${this.state.locale || 'en'}.pdf`
      if (this.state.locale === 'zh-CN') {
        return `https://ix-static.oss-ap-southeast-1.aliyuncs.com/IXX_introduction_zh-CN.pdf`
      } else {
        return `https://ix-static.oss-ap-southeast-1.aliyuncs.com/IXX_introduction_en.pdf`
      }
    },
    apiDoc() {
      return this.state.theme.apiDoc[this.state.locale || 'en']
    },
    deepDoc() {
      // if (this.state.userInfo && this.state.theme.themeName === 'default') {
      //   return process.env.BASE_API + '/ixx/zendesk/sso?return_to=' + encodeURIComponent(this.state.theme.deep[this.state.locale] || this.request.theme.deep.en)
      // } else {
      //   return this.state.theme.deep[this.state.locale] || this.request.theme.deep.en
      // }
      return ""
    },
    showEnTips() {
      return this.state.locale === 'en' || this.state.locale === 'ko'
    },
    exchangeNameConfig() {
      return this.state.theme.exchangeNameConfig[this.state.locale || 'en']
    }
  }
}
</script>

<style scoped lang="scss">
  .lang-en, .lang-ko {
    .hide_en {
      display: none !important;
    }
    .show_en {
      display: block !important;
    }
  }
  .show_en {
    display: none;
  }
  footer {
    width: 100%;
    background-color: $home-header-bgdark;
  }
  .lt{
      float: left;
      margin-right: 24px;
  }
  .footer_left{
    float: left;
    width: auto;
    padding-top: 38px;
    width: auto;
    .footer_ltxt{
      font-size: 14px;
      line-height: 40px;
    //   color: #F5C109;
    color: #ffffff;
    opacity:0.32;
      display: block;
      letter-spacing:2px;
      b{
        font-weight: bold;
      }
    }
    .footer_ewm{
      width: 100px;
      height: 100px;
      display: block;
      margin-top: 17px;
    }
    .footer_ewm_ltxt{
      min-width: 100px;
      display: block;
      font-size: 12px;
      margin-top: 15px;
      color: #999999;
      line-height: 22px;
      text-align: center;
    }
    .footer_explain_txt {
      margin-top: 15px;
      text-align: left;
      width: 280px;
      font-size: 14px;
      color: #fff;
    }
    .footer_logo{
      width: 176px;
      height: 38px;
      margin-top: 22px;
      img {
        width: 176px;
        height: 38px;
      }
      // background-image: url('../assets/ixx/ixx_logo.png');
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
    //   @include bg-retina('../assets/footer_logo', 'png', 224px, 51px);
      display: block;
    }

  }
  .footer_right{
    font-size: 14px;
    width: 500px;
    .footer_ct{
      float: left;
      width: 33%;
      p{
        line-height: 30px;
        margin-top: 15px;
        margin-bottom: 15px;
        color: $primary;
      }
    }
    .footer-rt{
      float: right;
      margin-left: 0;
    }
    a{
      color: #999;
      display: table;
      line-height: 30px;

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
        line-height: 30px;
        color: #fff;
      }
      .bot-la{
        margin-right: 10px;
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
  .footer_info {
    @include clearfix();
    width: $page-width;
    padding: 24px 0;
    margin: 0 auto;
    font-size: 12px;
    color: #bbbbbb;
    border-top: 1px solid #3E3E3E;
    .strong {
      font-weight: bold;
    }
  }

  .footer-container {
    padding-bottom: 30px;
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
         color: $primary-hover !important;
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
        width: 120px;
        height: 120px;
      }
      &:hover {
        .contact-img {
          display: inline-block;
        }
      }
    }
  }
</style>
