<template>
  <div class="compony-intro-section">
    <div class="intro-item">
      <img
        src="~@/assets/h5/home/home-intro-1.png"
        alt="">
      <p class="short-txt">{{ $t('home_intro_safe') }}</p>
      <p class="long-text">{{ $t('home_intro_long_a') }}</p>

    </div>
    <div class="intro-item">
      <img
        src="~@/assets/h5/home/home-intro-2.png"
        alt="">
      <p class="short-txt">{{ $t('home_intro_prefessor') }}</p>
      <p class="long-text">{{ $t('home_intro_long_b') }}</p>

    </div>
    <div class="intro-item">
      <img
        src="~@/assets/h5/home/home-intro-3.png"
        alt="">
      <p class="short-txt">{{ $t('home_intro_experience') }}</p>
      <p class="long-text">{{ $t('home_intro_long_c') }}</p>

    </div>
    <div class="intro-item">
      <img
        src="~@/assets/h5/home/home-intro-4.png"
        alt="">
      <p class="short-txt">{{ $t('home_intro_efficiency') }}</p>
      <p class="long-text">{{ $t('home_intro_long_d') }}</p>

    </div>
  </div>
</template>
<style lang="scss" scoped>
.compony-intro-section{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: rem(100);

    .intro-item {
        width: rem(623);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .short-txt {
            width: 100%;
            text-align: center;
            margin-top: rem(40);
            margin-bottom: rem(23);
            font-size:rem(28);
            font-weight:500;
            color:#ffffff;
        }
        .long-text {
            color: #43566D;
        }

        img {
            width: rem(288);
            height: rem(233);
            margin-left: 28%;
        }
    }
}
</style>
