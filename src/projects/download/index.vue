<template>
  <div
    class="h5-download-container"
    :class="[{'isIos': isIos}]">
    <div class="lang-wrapper">
      <span
        class="operate lang"
        @click="toggleMenu('lang')">
        {{ localeText }}
        <icon
          name="arrow-down-w"
          class="arrow"/>
      </span>
      <div
        class="hide-list"
        v-if="showLang">
        <a
          @click="switchLang(key)"
          :key="key"
          v-for="(value, key) in locales"
        >{{ value }}</a>
      </div>
    </div>
    <div class="content">
      <div class="ix-logo"/>
      <div class="ix-txt">IXX</div>
      <div
        class="download__btn"
        @click="download('android')">
        <icon
          name="android"
          class="download__icon"/> {{ $t('download_android') }}
      </div> 
      <div
        class="download__btn"
        @click="download('ios')">
        <icon
          name="iphone"
          class="download__icon"/> {{ $t('download_ios') }}
      </div>
      <div
        style="color: #A5A4AC"
        @click="goIosTurorial">
        {{ $t('download_ios_tutorial') }}
      </div>
      <div class="footer"> 
        <div class="tips">
          {{ $t('app_download_tips') }}
        </div>
      </div>
    </div>
    <div
      class="tt-mask"
      v-if="showTutorialArrow"
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
<script>
import utils from '@/modules/utils'
// import { Toast, MessageBox } from 'mint-ui'
import {state, actions} from '@/modules/store'
import 'mint-ui/lib/style.css'
import responsiveMixin from '@/mixins/responsive'
export default {
  mixins: [responsiveMixin],
  data () {
    return {
      state,
      showLang: false,
      showTutorialArrow: false,
      locales: utils.locales
    }
  },
  // components: {
  //   Toast,
  //   MessageBox
  // },
  computed: {
    localeText () {
      return utils.getLocaleName(state.locale)
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
    switchLang (lang) {
      actions.setLocale(lang)
      this.showLang = false
    },
    toggleMenu (type) {
      if (type === 'lang') {
        this.showLang = !this.showLang
        this.showMenu = false
      }
    },
    goIosTurorial () {
      this.$router.push({name: 'IOSTurorial'})
    //   window.open(`${window.location.origin}/download.html#/tutorial`, '_self')
    },
    download (type) {
      if (this.isWeiXin) {
        this.showTutorialArrow = true
        return
      }

      if (type === 'android') {
        // let url = 'https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/ixx.apk'
        let url = this.$myState.download.android
        // window.open(url, '_blank')
        window.location.href = url
        return
      }

      if (this.isSafari) {
        // let url = 'itms-services://?action=download-manifest&url=https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/install-manifest.plist'
        let  url = this.$myState.download.ios
        // window.open(url, '_blank')
        window.location.href = url
      }
    },
    touch () {
      this.showTutorialArrow = false
    }
  },
  created () {
    if (this.isWeiXin) {
      this.showTutorialArrow = true
    }
  },
  i18n: {
    messages: {
      en: { 
        "download_android": "android download",
        "download_ios": "ios download", 
        "app_download_tips": "Tips: APP download, IOS mobile version 10.0 or above and Android phone version 7.0 above are recommended",
      },
      'zh-CN': { 
        "download_android": "Android 下载",
        "download_ios": "iPhone 下载", 
        "app_download_tips": "温馨提示：APP下载，建议iOS手机系统版本10.0以上；Android手机系统版本7.0以上",
      }
    }
  }
}
</script>
<style lang="scss" scoped>

@import "./index.scss"
</style>
