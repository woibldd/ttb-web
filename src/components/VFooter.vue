<template>
  <footer>
    <div class="footer-container">
      <div class="footer_left">
        <router-link
          :to="{name:'home'}"
          class="footer_logo"/>
        <p class="footer_ltxt">服务邮箱：service@ix.com</p>
        <p class="footer_ltxt">商务合作：business@ix.com</p>
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
          <p>服务</p>
          <a href="#">币币交易</a>
          <a href="#">锁仓挖矿</a>
          <a href="#">帮助中心</a>
          <a href="#">提交工单</a>
        </div>
        <div class="footer_ct">
          <p>工具</p>
          <a href="#">帮助中心</a>
          <a href="#">新手指引</a>
          <a href="#">API文档</a>
        </div>
        <div class="footer_ct">
          <p>条款说明</p>
          <a href="#">用户协议</a>
          <a href="#">隐私条款</a>
          <a href="#">费率</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
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
      background: url(../assets/nav_logo.png);
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
