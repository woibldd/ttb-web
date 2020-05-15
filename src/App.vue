<!--
 * @Author: zlccy
 * @Date: 2019-09-17 12:02:20
 * @LastEditTime: 2019-09-17 12:02:20
 * @Description: file content
 -->
<template>
  <div
    id="app"
    :class="['lang-' + $i18n.locale]"
    tabindex="0"
    @click="onclick"
    @keyup.enter="onkeyup('enter')"
    @keyup.esc="onkeyup('esc')">
    <div
      v-show="state.loading"
      class="page-mask"/>
    <v-nav2
      v-if="showNav && !isMobile"
      :class="[navClass]"/>
    <!-- <mobile-nav
      v-if="showNav && isMobile"
      :class="[navClass]"/> -->
    <div
      ref="container"
      :style="{background: 'initial'}"
      class="main-container">
      <router-view :key="this.$route.path"/>
    </div>
    <v-footer
      v-if="footer === 'default'"
      v-show="showFooter"
      ref="footer"
      :fixed="fixed"/> 
    <v-notify-list/>
    <!-- <giveMoneyAD v-if="isFirstLogin" v-model="isFirstLogin"></giveMoneyAD> -->
    <!-- <div
      class="home-ball"
      @click="toNotice"
      v-if="zendeskWidget">
      <icon name="serve"/>
      <span>{{ $t('contact_us') }}</span>
    </div> -->
  </div>
</template>

<script>
import VNav2 from '@/components/VNav3.vue'
import MobileNav from '@/components/Mobile/MobileNav.vue'
import VFooter from '@/components/VFooter.vue'
import MobileFooter from '@/pages/h5/footer'
import { state, actions } from '@/modules/store'
import utils from '@/modules/utils'
import VNotifyList from '@/components/VNotifyList.vue'
import giveMoneyAD from '@/components/giveMoneyAD'
import service from '@/modules/service'
const zeStyleEl = document.querySelector('#ze-style')

export default {
  name: 'App',
  components: {
    VNav2,
    VFooter,
    VNotifyList,
    MobileFooter,
    MobileNav,
    giveMoneyAD
  },
  data() {
    return {
      state,
      isMobile: utils.isMobile(),
      fixed: false,
      showContact: true,
      isFirstLogin:false
    }
  },
  computed: {
    showNav() {
      if (!this.$route.name) {
        return false
      }
      return utils.getRouteMeta(this.$route, 'nav')
    },
    showMobileNav() {
      if (!this.$route.name) {
        return false
      }
      return utils.getRouteMeta(this.$route, 'mobileNav')
    },
    showFooter() {
      if (!this.$route.name) {
        return false
      }
      if (this.$route.name === 'trading') {
        return false
      }
      return !(utils.getRouteMeta(this.$route, 'footer') === false)
    },
    zendeskWidget() {
      if (!this.$route.name) {
        return false
      }
      return !(utils.getRouteMeta(this.$route, 'zendeskWidget') === false) && this.showContact
    },
    navClass() {
      if (!this.$route.name) {
        return false
      }
      return utils.getRouteMeta(this.$route, 'class')
    },
    bgColor() {
      const navClass = this.navClass
      switch (navClass) {
        case 'login':
          return '#303E4B'
        case 'dark':
          return '#1A1A1A'
        default:
          return 'initial'
      }
    },
    footer() {
      if (this.state.theme.themeName === 'default' && !this.isMobile) {
        return 'default'
      }
      if (this.state.theme.themeName === 'default' && this.isMobile) {
        return 'mobile'
      }
    }
  },
  watch: {
    showNav() {
      this.fixPosition()
    },
    showFooter() {
      this.fixPosition()
    },
    zendeskWidget(show) {
      window.zE && window.zE(function() {
        if (utils.isMobile()) {
          return window.zE.hide()
        }
        if (show && zeStyleEl && zeStyleEl.parentNode) {
          zeStyleEl.parentNode.removeChild(zeStyleEl)
        }
        return show ? window.zE.show() : window.zE.hide()
      })
    }
  },
  mounted() {
    this.$eh.$on('app:resize', () => this.fixPosition())
    this.$nextTick(this.fixPosition)

  },
  created() {
    utils.$app = this
    this.state.router = this.$router
    this.$router.afterEach((to, from) => {
      if (from.name === 'trading') {
        this.$nextTick(() => {
          this.fixPosition(from.name)
        })
      }
    })
    this.keepSession()
    window.onresize = () => {
      this.$eh.$emit('app:resize')
    }
    this.$eventBus.$on('handleFirstLogin',this.handleFirstLogin)
  },
  methods: {
    handleFirstLogin(){
      state.userInfo && service.getLoginHistory().then(res=>{
        if(res.data && res.data.length < 2 )this.isFirstLogin = true
      })
    },
    onkeyup(name) {
      this.$eh.$emit('app:keyup:' + name)
    },
    onclick(e) {
      this.$eh.$emit('app:click')
    },
    fixPosition(name) {
      try {
        const box = this.$refs.container
        if (box) {
          if (this.isMobile) {
            if (name === 'trading') {
              box.style.minHeight = screen.availHeight - (this.showFooter ? 205 : 0) - (this.showNav ? 60 : 0) + 'px'
            } else {
              box.style.minHeight = screen.availHeight - (this.showFooter ? 205 : 0) - (this.showNav ? 60 : 0) + 'px'
            }
          } else {
            box.style.minHeight = window.innerHeight - (this.showFooter ? 110 : 0) - (this.showNav ? 80 : 0) + 'px'
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    async keepSession() {
      await utils.sleep(6e5)
      if (this.state.userInfo) {
        await actions.updateSession()
      }
      this.keepSession()
    },
    toNotice() {
      let url = ''
      if (this.state.userInfo && this.state.theme.themeName === 'default') {
        url = process.env.BASE_API + '/ixx/zendesk/sso?return_to=' + encodeURIComponent(this.state.theme.request[this.state.locale] || this.state.theme.request.en)
      } else {
        url = this.state.theme.request[this.state.locale] || this.request.theme.help.en
      }
      if (!url) {
        this.showContact = false
      } else {
        window.open(url)
      }
    }
  }
}
</script>
<style lang="scss">
@font-face {
  font-family: 'down-icon';  /* project id 1408535 */
  src: url('//at.alicdn.com/t/font_1408535_z5q5sgr3j38.eot');
  src: url('//at.alicdn.com/t/font_1408535_z5q5sgr3j38.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1408535_z5q5sgr3j38.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1408535_z5q5sgr3j38.woff') format('woff'),
  url('//at.alicdn.com/t/font_1408535_z5q5sgr3j38.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1408535_z5q5sgr3j38.svg#iconfont') format('svg');
}
@font-face {
  font-family: 'overseas-icon';  /* project id 1528548 */
  src: url('//at.alicdn.com/t/font_1528548_timw77wx73.eot');
  src: url('//at.alicdn.com/t/font_1528548_timw77wx73.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1528548_timw77wx73.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1528548_timw77wx73.woff') format('woff'),
  url('//at.alicdn.com/t/font_1528548_timw77wx73.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1528548_timw77wx73.svg#iconfont') format('svg');
}
.overseas-icon{
  font-family:"overseas-icon" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.down-icon{
  font-family:"down-icon" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
button {
  outline: none!important;
  box-shadow: none!important;
}
*{
  outline:none;
  scrollbar-width: none;
}
// input::-webkit-credentials-auto-fill-button {
//     display: none !important;
//     visibility: hidden;
//     pointer-events: none;
//     position: absolute;
//     right: 0;
// }
input {
  line-height: normal
}
@import "styles/reset.scss";
@import "styles/index.scss";
/*input::-webkit-credentials-auto-fill-button {*/
/*  display: none !important;*/
/*  visibility: hidden;*/
/*  pointer-events: none;*/
/*  position: absolute;*/
/*  right: 0;*/
/*}*/
@media (max-width: 1378px) {
  .el-table td, .el-table th {
    font-size: 12px!important;
  }
}
.el-loading-mask {
  z-index: 1!important;
}
</style>
<style>
.el-input__inner {
  line-height: normal!important;
}
</style>
