<template>
  <footer>
    <div class="footer-container">
      <router-link
        :to="{name:'home'}"
        class="footer_logo"/>

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
    height:110px;
    line-height: 110px;
    display: flex;
    background-color: $home-header-bgdark;
  }
  .footer_logo{
    width:90px;
    height:30px;
    background:url(../assets/footer_logo.png);float:left;margin-top:40px;
  }
  .footer-container {
      .pointer {
          cursor: pointer;
      }
      margin: 0 auto;
      // max-width: 1200px;
      // min-width: $page-width;
      padding: 0 10px;
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;

      .contact-list {
          margin-top: 40px;
          display: flex;
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
