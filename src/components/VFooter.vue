<template>
  <footer :class="{fixed}">
    <div class="container">
      <div class="left">
        <router-link class="logo" :to="{name: 'home'}"/>
        <!--<div class="global-status">实时运行情况<span class="icon"></span></div>-->
        <div class="copyright">
          Copyright © 2018 {{companyName}}
        </div>
        <div class="icon-links links">
          <a class="link link-telegram" target="_blank" :href="tgLink"><icon name="telegram" /></a>
          <a class="link link-weixin" target="_blank" >
            <icon name="weixin" />
            <div class="qr-code">
              <span></span>
              <img src="../assets/images/homepage/tb_wechat.jpg" alt="">
              <p>{{ $t('footer_wechat') }}</p>
            </div>
          </a>
          <a class="link link-twitter" target="_blank" href="https://twitter.com/ThinkBitPro"><icon name="twitter" /></a>
          <a class="link link-facebook" target="_blank" href="https://www.facebook.com/ThinkBitPRO"><icon name="facebook" /></a>
          <a class="link link-medium" target="_blank" href="https://medium.com/@thinkbitpro"><icon name="medium" /></a>
          <a class="link link-biyong" target="_blank" :href="biyongLink" v-show="biyongLink"><i class="ibt biyong-icon"></i></a>
        </div>
      </div>
      <ul class="lists" :class="{'ru' : isRuFooter}">
        <li class="list">
          <div class="list-title">{{ $t('nav_info') }}</div>
          <div class="links">
            <a class="link" target="_blank" :href="apiLink">{{ $t('footer_api') }}</a>
            <a class="link" @click="goFees">{{ $t('footer_fee') }}</a>
            <a class="link" target="_blank" :href="faqLink">{{ $t('footer_faq') }}</a>
            <a class="link" target="_blank" :href="announcementLink">{{ $t('footer_notice') }}</a>
          </div>
        </li>
        <li class="list">
          <div class="list-title">{{ $t('nav_about') }}</div>
          <div class="links">
            <a class="link" :href="requestLink" target="_blank">{{ $t('footer_request') }}</a>
            <a class="link" v-if="state.theme.themeName === 'default'" target="_blank" href="https://goo.gl/forms/RJaF2zYcx1S0oCxD2">{{ $t('footer_apply') }}</a>
            <a class="link"  v-if="state.theme.themeName === 'default'" href="/info/index.html" target="_blank">{{ $t('footer_about') }}</a>
            <a class="link" :href="'mailto:' + state.theme.hrMail">{{ $t('footer_join') }}</a>
          </div>
        </li>
        <li class="list">
          <div class="list-title">{{ $t('nav_law') }}</div>
          <div class="links">
            <a class="link" @click="goAgreement">{{ $t('footer_agreement') }}</a>
            <router-link v-if="state.theme.themeName === 'default'" class="link" :to="{name: 'legal'}">{{ $t('footer_law') }}</router-link>
            <a class="link" @click="goPrivacy">{{ $t('footer_private') }}</a>
            <!--<router-link class="link" :to="''">{{ $t('footer_risk') }}</router-link>-->
          </div>
        </li>
        <!-- <li class="list">
          <div class="list-title">{{ $t('nav_media') }}</div>
          <div class="links">
            <a class="link" target="_blank" :href="tgLink">Telegram</a>
            <a class="link" v-if="state.theme.themeName === 'default'" target="_blank" href="https://medium.com/@thinkbitpro">Medium</a>
          </div>
        </li> -->
      </ul>
    </div>
    <div class="additional-links">
      <div class="list-title">{{ $t('footer_additional_links') }}</div>
      <div class="links">
        <a href="https://www.btc123.com/" target="_blank" class="link">btc123</a>
        <a href="https://coinbull.one" target="_blank" class="link">{{ $t('link_coinbull') }}</a>
        <a href="http://www.bixiaobai.com/" target="_blank" class="link">币小白</a>
        <a href="https://www.walian.cn/" target="_blank" class="link">挖链网</a>
        <a href="https://www.biyong.sg" target="_blank" class="link">BiYong</a>
      </div>
    </div>
  </footer>
</template>

<script>
import {state} from '@/modules/store'
const {companyName} = process.env.THEME_ENV
export default {
  name: 'vFooter',
  props: ['fixed'],
  data () {
    return {
      state,
      companyName
    }
  },
  i18n: {
    messages: {
      en: {
        link_coinbull: 'CoinBull',
        footer_wechat: 'Wechat Customer Service'
      },
      'zh-CN': {
        link_coinbull: '币牛牛',
        footer_wechat: '微信客服'
      }
    }
  },
  computed: {
    isRuFooter () {
      if (this.state.locale === 'ru') {
        return true
      } else {
        return false
      }
    },
    apiLink () {
      return this.state.theme.apiDoc[this.state.locale] || this.state.theme.apiDoc.en
    },
    faqLink () {
      return this.state.theme.faq[this.state.locale] || this.state.theme.faq.en
    },
    announcementLink () {
      return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
    },
    helpLink () {
      if (this.state.userInfo) {
        return '/gate/zendesk/auth'
      } else {
        return 'https://thinkbit.zendesk.com'
      }
    },
    requestLink () {
      return this.state.theme.request[this.state.locale] || this.state.theme.request.en
    },
    tgLink () {
      return this.state.theme.telegram[this.state.locale] || this.state.theme.telegram.en
    },
    biyongLink () {
      let link = ''
      if (this.state.theme.themeName === 'default') {
        link = this.state.locale === 'zh-CN' ? 'ThinkBitProCN' : 'ThinkBitProEnglish'
      }
      return link ? 'https://0.plus/#/' + link : ''
    }
  },
  methods: {
    goAgreement () {
      if (this.state.theme.themeName === 'default') {
        this.$router.push({name: 'agreement'})
      } else {
        window.open(this.state.theme.agreement[this.state.locale] || this.state.theme.agreement.en)
      }
    },
    goFees () {
      if (this.state.theme.themeName === 'default') {
        this.$router.push({name: 'fees'})
      } else {
        window.open(this.state.theme.fee[this.state.locale] || this.state.theme.fee.en)
      }
    },
    goPrivacy () {
      if (this.state.theme.themeName === 'default') {
        this.$router.push({name: 'privacy'})
      } else {
        window.open(this.state.theme.privacy[this.state.locale] || this.state.theme.privacy.en)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/vars";
  @import "../styles/mixins";
  footer {
    min-width: $page-width;
    width: 100%;
    height:400px;
    background-color: #1F2338;
  }
  .container {
    @include clearfix();
    width: $page-width;
    box-sizing: border-box;
    padding-top: 63px;
    margin: 0 auto;
    .left {
      float: left;
      width: 300px;
    }
    .logo {
      width:110px;
      height:14px;
      display: block;
      margin-bottom: 13px;
    }
    .copyright{
      margin-bottom: 31px;
    }
    .icon-links{
      @include clearfix();
      position: relative;
      .link{
        float: left;
        margin-right: 18px;
      }
      .link-telegram{
        font-size:16px;
      }
      .link-weixin{
        font-size: 20px;
        &:hover{
          .qr-code {
            opacity: 1;
            visibility: visible;
          }
        }
      }
      .link-twitter{
        font-size: 18px;
        height:15px;
      }
      .link-facebook{
        margin-right: 14px;
        font-size: 18px;
        margin-left: -4px;
      }
      .link-medium{
        font-size: 16px;
        height:14px;
      }
    }
    .qr-code{
        padding: 25px 35px 0 35px;
        display: flex;
        flex-direction: column;
        background: #FFF;
        border-radius: 4px;
        position: absolute;
        box-sizing: border-box;
        box-shadow:0px 0px 40px 0px rgba(0,0,0,0.2);
        left:77px;
        top:-77px;
        width: 170px;
        height: 170px;
        opacity: 0;
        visibility: hidden;
        transition: .2s ease-in;
        cursor: auto;
        img{
          width: 100px;
          height: 100px;
        }
        span{
          position: absolute;
          left: -12px;
          top: 80px;
          width: 0;
          height: 0;
          border-right: 12px solid #FFF;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
        }
        p{
          text-align: center;
          color: #303030;
          font-size:14px;
          line-height:20px;
          margin-top: 10px;
          width: 170px;
          position: absolute;
          bottom: 15px;
          left: 0px;
        }
    }
  }
  .global-status {
    line-height: 26px;
    font-size: 13px;
    color: #ddd;
    .icon {
      margin-left: 6px;
      display: inline-block;
      vertical-align: top;
      margin-top: 10px;
      background: $state-text-green;
      border-radius: 3px;
      width: 6px;
      height: 6px;
    }
  }
  .lists {
    float: right;
    @include clearfix();
    font-size: 0;
    white-space: nowrap;
  }
  .list {
    vertical-align: top;
    display: inline-block;
    width: 136px;
  }
  .lists.ru .list {
    width: initial;
    margin-right: 45px;
  }
  .list-title {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: rgba(255,255,255,.8);
    margin-bottom: 20px;
  }
  .links {
    font-size: 14px;
    .link {
      display: block;
      line-height: 24px;
      color: rgba(255,255,255,.5);
      transition: 0.15s linear;
    }
    a, a:visited, a:focus {
      color: rgba(255,255,255,.5);
    }
    a:hover {
      color: rgba(255,255,255,.8);
    }
    a:active {
      color: #fff;
    }
    a.disabled{
      color: rgba(255,255,255,.2);
    }
    a.link-biyong {
      &, &:visited, &:focus {
        opacity: .5;
      }
      &:hover {
        opacity: .8;
      }
      &:active {
        opacity: 1;
      }
    }
    .biyong-icon {
      display: inline-block;
      width: 17px;
      height: 20px;
      margin-top: 2px;
      background: transparent url('../assets/biyong.png') 0 0 / 100% 100% no-repeat;
    }
  }
  .copyright {
    font-size: 14px;
    line-height: 20px;
    color: white;
    white-space: nowrap;
    opacity: .2;
  }
  .additional-links{
    width: $page-width;
    box-sizing: border-box;
    margin:90px auto 0;
    .list-title{
      font-size: 12px;
      line-height: 17px;
      font-weight: bold;
      color:rgba(255,255,255,.8);
      margin-bottom: 6px;
    }
    .links{
      @include clearfix();
    }
    .link{
      float:left;
      font-size:12px;
      line-height: 24px;
      margin-right: 20px;
    }
  }
</style>
