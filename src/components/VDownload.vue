<template>
  <div class="download-container">
    <div class="download-mask" v-if="isMobile">
      <div class="flex">
        <div class="dl-icon">
          <img
            src="../assets/h5/h5_download@3x.png"
            alt="">
        </div>
        <div class="dl__txt">
          <p>IX.COM</p>
          <p class="f16">{{ $t('download_app_dl') }}</p>
        </div>
      </div>
      <div
        class="dl__btn"
        @click="download">
        {{ $t('download_dl_app') }}
      </div>
    </div>
    <div v-if="showTutorialArrow"
      class="tt-mask" 
      @click="touch">
      <div
        class="tutorial-arrow">
        <img
          src="../assets/download/ios-tutorial-arrow.png"
          alt="">
        <div class="tuto__txt">{{ $t('download_ios_click_right') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/modules/utils'
export default {
  data() {
    return {
      showTutorialArrow: false,
      utils
    }
  },
  computed: {
    isMobile(){
      return this.utils.isMobile()
    },
    isIos () {
      return utils.isIos
    },
    isSafari () {
      return this.isIos && /safari/ig.test(navigator.userAgent)
    },
    isWeiXin () {
      return utils.isWeiXin()
    }
  },
  methods: { 
    download (type) { 
      if (this.isWeiXin) {
        this.showTutorialArrow = true
        return
      }  
      let url = 'https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/ixx.apk'
      if (type === 'ios') {
        url = 'itms-services://?action=download-manifest&url=https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/install-manifest.plist'
      } 
      window.location.href = url
    },
    touch () {
      this.showTutorialArrow = false
    },
  }
}
</script>

<style  lang="scss"> 
.download-mask {
  position: fixed;
  bottom: 0;
  left: 0;
  width:100%;
  height:5.375rem;
  background:rgba(19,24,31,.9);
  padding: rem(43) rem(55);
  box-sizing: border-box;
  font-size: rem(24);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  z-index: 11;
  .flex {
      display: flex;
      align-items: center;
  }
  .dl-icon{
      width: rem(77);
      height: rem(77);
      img {
          width: 100%;
          height: 100%;
      }
  }
  .dl__txt{
      margin-left: rem(19);
      .f16 {
          font-size: rem(16);
      }
  }
  .dl__btn {
      width:rem(190);
      height:rem(60);
      background:$primary;
      border-radius:rem(30);
      display: flex;
      align-items: center;
      justify-content: center;
  }
}

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


</style>