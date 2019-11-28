<template>
  <div class="overseas overseas-fixed">
    <div class="overseas-banner">
      <img src="./../../assets/overseas/ix/radius.png" alt="" class="radius">
    </div>
    <div class="top">
      <div class="left">
        <img src="./../../assets/overseas/ix/h5_download@3x.png" alt="" class="store">
      </div>
      <div class="text">
        <h1>
          IXX.COM {{ $t('newLoad.az') }}
        </h1>
        <p> {{ $t('newLoad.user_apple_id', {web: 'IXX'}) }} </p>
      </div>
    </div>
    <div class="text-list">
      <div class="title">01  {{ $t('newLoad.check_id') }}</div>
      <p>{{ $t('newLoad.up') }}</p>
      <img src="./../../assets/overseas/ix/store.png" alt="" class="store">
      <p>{{ $t('newLoad.port') }}</p>
      <template v-if="lang === 'zh-CN'">
        <img src="./../../assets/overseas/ix/tip3.png" alt="">
      </template>
      <template v-else>
        <img src="./../../assets/overseas/y2.png" alt="">
      </template>
      <p> {{ $t('newLoad.logOut') }} </p>
      <template v-if="lang === 'zh-CN'">
        <img src="./../../assets/overseas/zhongwen.jpg" alt="">
      </template>
      <template v-else>
        <img src="./../../assets/overseas/yingwen.jpg" alt="">
      </template>
      <p>{{ $t('newLoad.id') }}</p>
      <em>{{ $t('newLoad.fid') }}</em>
      <em>{{ $t('newLoad.kf') }}：IXX官方客服 (9点~21点)</em>
      <em>{{ $t('newLoad.sm') }}：</em>
      <img
        class="contact-img"
        src="./../../assets/pic-contact-wx.png" style="width: 40%">
      <em>{{ $t('newLoad.fz') }}</em>
    </div>
    <div class="text-list">
      <div class="title">02  {{ $t('newLoad.install_app') }}</div>
      <p> {{ $t('newLoad.login_up', {web: 'IXX'}) }}</p>
      <img src="./../../assets/overseas/ix/tip2.png" alt="">
      <p>{{ $t('newLoad.get') }}</p>
      <img src="./../../assets/overseas/ix/IXX@2x.png" alt="">
    </div>
    <div class="overseas-fixed-btn">
      <div class="btn-t">
        <i class="down-icon">&#xe676;</i>
        {{ $t('newLoad.know') }}</div>
    </div>
  </div>
</template>
<script>
import {state} from '@/modules/store'
export default {
  computed: {
    lang() {
      return state.locale
    }
  }
}
</script>
<style lang="scss" scoped>
  .overseas {
    font-family: 'PingFangSC-Regular';
    height: calc(100% - 70px);
    overflow: hidden;
    overflow-y: auto;
    z-index: 10;
    &-banner {
      width: 100%;
      height: 400px;
      position: fixed;
      z-index: 0;
      left: 0;
      top: 0;
      color: #fff;
      background: url('./../../assets/overseas/bg.png') top center no-repeat;
      background-size: 100% 120%;
      .radius {
        width: 148px;
        margin-top: 36px;
        margin-left: 6%;
        zoom: 1;
      }
    }
    .text-list {
      width: 88%;
      margin: 0 auto 30px;
      background: #fff;
      box-shadow:0px 0px 8px 0px rgba(177,177,177,1);
      border-radius:10px;
      overflow: hidden;
      position: relative;
      img {
        width: 80%;
        margin:.48rem auto;
        display: block;
        zoom: 1;
      }
      .store {
        width: 16%;
        margin: .36rem auto;
      }
      .title {
        padding: .72rem 0;
        overflow: hidden;
        text-align: center;
        border-bottom: 1px solid #eee;
        color: #01CED1;
        font-size: .96rem;
      }
      em {
        display: block;
        font-size: .64rem;
        font-style: normal;
        color: #797979;
        padding: 0 60px 0 30px;
        margin-bottom: .3rem;
        line-height: 1.2
      }
      p {
        padding: .72rem 0;
        padding-left: .72rem;
        position: relative;
        font-size: .8rem;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background: #01CED1;
          width: 6px;
          height: 12px;
        }
      }
    }
    .overseas-fixed-btn {
      box-sizing: border-box;
      border:1px solid rgba(238,238,238,1);
      box-shadow:-3px 1px 6px 0px rgba(222,222,222,1);
      height: 70px;
      background: #fff;
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 1000000;
      color: #999;
      .btn-t {
        width: 90%;
        height: 48px;
        margin: 10px auto;
        line-height: 48px;
        background:#01CED1;
        border-radius:4px;
        color: #fff;
        text-align: center;
        font-size: 14px;
        i {
          font-size: .9rem
        }
      }
    }
    .top {
      width: 88%;
      margin: 1.8rem auto 1rem;
      display: flex;
      justify-self: center;
      position: relative;
      z-index: 10;
      align-items: center;
      .left {
        flex: 0 0 0 96px;
        width: 64px;
        margin-right: 30px;
      }
      .text {
        flex: 1;
      }
      .text {
        color: #fff;
        h1 {
          font-size: .9rem;
          margin-bottom: .2rem;
        }
        p {
          line-height: 1.2;
          font-size: .64rem;
        }
      }
      img {
        height: 64px;
        zoom: 1;
        display: block
      }
    }
  }
</style>
