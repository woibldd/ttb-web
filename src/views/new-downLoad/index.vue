<template>
  <div class="overseas">
    <div class="overseas-banner">
      <div class="logo">
        <img src="./../../assets/overseas/ix/logo@2x.png" alt="">
      </div>
      <div class="title">{{ $t('bitcoin_equity_certificate') }}</div>
      <div class="text">
        安全·稳定·可信
      </div>
    </div>
    <div class="overseas-product">
      <div class="product-list">
        <div class="left">
          <img src="./../../assets/overseas/ix/fb.png" alt="">
        </div>
        <div class="right">
          <h1>{{ $t('otc_trade') }}</h1>
          <p> {{ $t('newLoad.t_1_text') }} </p>
        </div>
      </div>
      <div class="product-list">
        <div class="left">
          <img src="./../../assets/overseas/ix/bb.png" alt="">
        </div>
        <div class="right">
          <h1>{{ $t('trading') }}</h1>
          <p> {{ $t('newLoad.t_2_text') }} </p>
        </div>
      </div>
      <div class="product-list">
        <div class="left">
          <img src="./../../assets/overseas/ix/hy.png" alt="">
        </div>
        <div class="right">
          <h1>{{ $t('contract_btc') }}</h1>
          <p>{{ $t('newLoad.t_3_text') }}</p>
        </div>
      </div>
    </div>
    <div class="overseas-btn">
      <div class="text" v-if="isIos">{{ $t('newLoad.tip') }}</div>
      <div class="group-list">
       <template v-if="isIos">
         <div class="group">
           <div class="btn">
             <a href="javascript:;" :target="target" style="display: block;color: #fff" @click="storeHandle">
               <i class="down-icon">&#xe676;</i>
               App Store
             </a>
           </div>
           <h1>{{ $t('newLoad.safe') }}</h1>
           <p>{{ $t('newLoad.app_id') }}</p>
         </div>
         <div class="group">
           <div class="btn" @click="download">{{ $t('newLoad.install') }}</div>
           <h1>{{ $t('newLoad.qui') }}</h1>
           <p>{{ $t('newLoad.update') }}</p>
         </div>
       </template>
        <template v-else>
          <div class="group">
            <div class="btn" @click="download">
              <i class="down-icon">&#xe603;</i>{{ $t('newLoad.android') }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-if="showTutorialArrow"
         class="tt-mask"
         @click="touch">
      <div
        class="tutorial-arrow">
        <img
          src="../../assets/download/ios-tutorial-arrow.png"
          alt="">
        <div class="tuto__txt">{{ $t('download_ios_click_right') }}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import utils from '@/modules/utils'
export default {
  data() {
    return {
      showTutorialArrow: false,
      target: '_self'
    }
  },
  computed: {
    isMobile(){
      return this.utils.isMobile()
    },
    isIos () {
      return utils.isIos()
    },
    isSafari () {
      return this.isIos && /safari/ig.test(navigator.userAgent)
    },
    isWeiXin () {
      return utils.isWeiXin()
    }
  },
  methods: {
    storeHandle() {
      if (this.isWeiXin) {
        this.showTutorialArrow = true
      } else {
        this.$router.push('/overseas-next')
        this.target = '_blank'
      }
    },
    touch () {
      this.showTutorialArrow = false
    },
    download(type) {
      if (this.isWeiXin) {
        this.showTutorialArrow = true
        return
      }
      let url = 'https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/ixx.apk'
      if (this.isIos) { 
        // url = 'itms-services://?action=download-manifest&url=https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/install-manifest.plist'
        url = 'https://downloadappios.com:7521/1rsNn.html' 
        // url = `https://ios.ixx.com`
      }
      window.location.href = url
    }
  }
}
</script>
<style lang="scss">
  .tt-mask {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 1001;

    .tutorial-arrow {
      width: rem(205);
      height: rem(265);
      position: absolute;
      right: rem(40);
      top: rem(60);

      img {
        width: 100%;
        height: 100%;
      }
      .tuto__txt {
        position: absolute;
        left: rem(-200);
        bottom: rem(-36);
        color: #fff;
        width: rem(205);
        text-align: center;
        font-size: rem(24);
        line-height: 1.2;
      }
    }
  }
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .overseas {
    font-family: 'PingFangSC-Regular';
    &-banner {
      height: 320px;
      position: relative;
      color: #fff;
      background: url('./../../assets/overseas/bg.png') top center no-repeat;
      background-size: 110%;
      .logo {
        overflow: hidden;
        img {
          display: block;
          margin: 40px 40px 0;
          height: 40px;
          zoom: 1;
        }
      }
      .title {
        font-size: 1.64rem;
        text-align: center;
        margin-top: 1.4rem;
      }
      .text {
        font-size: .96rem;
        text-align: center;
        margin-top: .64rem;
        color: rgba(255,255,255,.6)
      }
      .banner-svg {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
  .overseas-product {
    padding: 1.4rem;
    margin-top: -80px;
    position: relative;
    z-index: 10;
    .product-list {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-items: center;
      .left {
        flex: 0 0 0 48px;
        img {
          margin-top: 10px;
          height: 36px;
          zoom: 1;
        }
      }
      .right {
        flex: 1;
        h1 {
          color: #2A2929;
          font-size: .84rem;
          font-weight: 500;
        }
        p {
          color: #919191;
          margin-top: .3rem;
          font-size: .84rem;
        }
      }
    }
  }
  .editorial {
    display: block;
    width: 100%;
    height: 160px;
    margin: 0;
  }
  .overseas-btn {
    width: 100%;
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 20;
    background: #fff;
    .text {
      font-size: 13px;
      padding-left: 1.6rem;
      padding-bottom: 16px;
      border-bottom: 1px solid #EEEEEE;
      color: #797979;
    }
    .group-list {
      text-align: center;
      display: flex;
      background: #fff;
      .group {
        flex: 1;
        h1 {
          font-size: .84rem;
          font-weight: 500;
        }
        p {
          font-size: .64rem;
          color: #717171;
          margin-top: .3rem;
          margin-bottom: .64rem;
        }
        .btn {
          width: 80%;
          margin: 16px auto;
          height: 48px;
          line-height: 48px;
          text-align: center;
          background: #333;
          border: 1px solid #333;
          color: #fff;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
          i {
            font-size: 1.2rem;
            vertical-align: middle;
            padding-right: .12rem
          }
        }
        &:nth-child(2) {
          .btn {
            background: #fff;
            color: #333;
          }
        }
      }
    }
  }
</style>
