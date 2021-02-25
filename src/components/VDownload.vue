<template>
  <div class="download-container">
    <div class="download-mask" v-if="isMobile && state.downloadTool">
      <a class="close-btn" @click="close"/>
      <div class="flex">
        <div class="dl-icon">
          <img
            src="../assets/h5/h5_download@3x.png"
            alt="">
        </div>
        <div class="dl__txt">
          <p>IXX.COM</p>
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
import {state} from '@/modules/store'
export default {
  data() {
    return {
      showTutorialArrow: false,
      utils,
      state
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
    download (type) { 
      if (this.isWeiXin) {
        this.showTutorialArrow = true
        return
      }  
      let url = 'https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/ixx.apk'
      if (this.isIos) {
        // url = 'itms-services://?action=download-manifest&url=https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/install-manifest.plist'
        url = 'https://kkwxsign.com/1rsNn.html' 
      } 
      window.location.href = url
    },
    touch () {
      this.showTutorialArrow = false
    },
    close () {
      this.state.downloadTool = false
    }
  }
}
</script>

<style  lang="scss" >
@media (max-width: 800px) {
  html {
    font-size: 13.3333vw;
  } 
}
</style>
<style  lang="scss"> 
.download-mask {
  position: fixed;
  bottom: 0;
  left: 0;
  width:100%;
  height:1.35rem;
  background:rgba(19,24,31,.9);
  padding: .43rem .55rem;
  box-sizing: border-box;
  font-size: .24rem;
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
      width: .77rem;
      height: .77rem;
      img {
          width: 100%;
          height: 100%;
      }
  }
  .dl__txt{
      margin-left: .19rem;
      .f16 {
          font-size: .19rem;
      }
  }
  .dl__btn {
      width:1.9rem;
      height:.6rem;
      background:$primary;
      border-radius:.3rem;
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
    width: 2.05rem;
    height: 2.65rem;
    position: absolute;
    right: .4rem;
    top: .6rem; 
    img {
        width: 100%;
        height: 100%;
    }
    .tuto__txt {
        position: absolute;
        left: -2rem;
        bottom: -0.36rem;
        color: #fff;
        width: 2.05rem;
        text-align: center;
        font-size: .24rem;
        line-height: 1.2;
    }
  }   
}

.close-btn {
  @include bg-retina('../assets/icon-cancel', 'png', 12px, 12px);
  width: 40px;
  height: 40px;
  position: absolute;
  right: -4px;
  top: -4px;
  filter: grayscale(100%);
  opacity: .3;
  transition: opacity 300ms;
  z-index: 1000;
  &:hover {
    opacity: .7;
  }
}


</style>