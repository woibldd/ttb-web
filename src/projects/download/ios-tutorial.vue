<template>
  <div class="ios-tutorial-container">
    <div class="title-btn">
      {{ $t('download_ios_app_set') }}
    </div>
    <div class="tutorial__row">
      <div class="row__txt mr-63 ">
        {{ $t('download_ios_tutorial_a') }}
      </div>
      <div class="row__pic">
        <img
          src="../../assets/download/tt-1.png"
          alt="">
      </div>
    </div>
    <div class="tutorial__row">
      <div class="row__pic mr-63 ">
        <img
          src="../../assets/download/tt-2.png"
          alt="">
      </div>
      <div class="row__txt">
        {{ $t('download_ios_tutorial_b') }}
      </div>
    </div>
    <div class="tutorial__row">
      <div class="row__txt mr-63">
        {{ $t('download_ios_tutorial_c') }}
      </div>
      <div class="row__pic">
        <img
          src="../../assets/download/tt-3.png"
          alt="">
      </div>
    </div>
    <div class="tutorial__row">
      <div class="row__pic mr-63">
        <img
          src="../../assets/download/tt-4.png"
          alt="">
      </div>
      <div class="row__txt">
        {{ $t('download_ios_tutorial_d') }}
      </div>
    </div>
    <div class="tutorial__row">
      <div class="row__txt mr-63">
        {{ $t('download_ios_tutorial_e') }}
      </div>
      <div class="row__pic">
        <img
          src="../../assets/download/tt-5.png"
          alt="">
      </div>
    </div>
  </div>
</template>
<script>
import responsiveMixin from '@/mixins/responsive'

export default{
  mixins: [responsiveMixin]

}
</script>
<style lang="scss" scoped>
.ios-tutorial-container {
    height: 100%;
    width: 100vw;
    background-color: #fff;
    box-sizing: border-box;
    padding: rem(53) rem(30);
}
.title-btn{
    width:rem(351);
    height:rem(50);
    font-size: rem(24);
    color: #fff;
    text-align: center;
    line-height: rem(50);
    background:linear-gradient(0deg,rgba(185,131,26,1) 0%,rgba(255,204,106,1) 100%);
    margin-bottom: rem(61);
}
.mr-63 {
    margin-right: rem(63);
}
.tutorial__row{
    margin-bottom: rem(61);
    display: flex;
    align-items: center;
    justify-content: center;
    .row__txt {
        color: #1A1A1A;
        font-size: rem(20);
        width: rem(328);
    }
    .row__pic {
        width: rem(198);
        height: rem(198);

        img {
            width: 100%;
            height: 100%;
        }
    }
}

@media screen and (min-width: 768px) {
  .ios-tutorial-container {
      max-width: 360px;
      margin: 0 auto;
  }

}
</style>
