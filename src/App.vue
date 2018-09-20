<template>
  <div
    id="app"
    :class="['lang-' + $i18n.locale]"
    tabindex="0"
    @click="onclick"
    @keyup.enter="onkeyup('enter')"
    @keyup.esc="onkeyup('esc')">
    <div
      class="page-mask"
      v-show="state.loading"/>
    <v-nav2
      v-if="showNav"
      :class="[navClass]"/>
    <div
      class="main-container"
      ref="container"
      :style="{background: 'initial'}">
      <router-view/>
    </div>
    <v-footer
      ref="footer"
      v-if="footer === 'default'"
      :fixed="fixed"
      v-show="showFooter"/>
    <mobile-footer
      ref="footer"
      v-if="footer === 'mobile'"
      :fixed="fixed"
      v-show="showFooter"/>
    <v-notify-list/>
    <div
      class="home-ball"
      @click="toNotice"
      v-if="zendeskWidget">
      <icon name="serve"/>
      <span>{{ $t('contact_us') }}</span>
    </div>
  </div>
</template>

<script>
import VNav2 from '@/components/VNav3.vue'
// import VMobileNav from '@/components/VMobileNav.vue'
import VFooter from '@/components/VFooter.vue'
import MobileFooter from '@/components/MobileFooter.vue'
import {state, actions} from '@/modules/store'
import utils from '@/modules/utils'
import VNotifyList from '@/components/VNotifyList.vue'

let zeStyleEl = document.querySelector('#ze-style')

export default {
  name: 'App',
  components: {
    VNav2,
    VFooter,
    VNotifyList,
    MobileFooter
    // VMobileNav
  },
  data () {
    return {
      state,
      isMobile: utils.isMobile(),
      fixed: false,
      showContact: true
    }
  },
  computed: {
    showNav () {
      if (!this.$route.name) {
        return false
      }
      return utils.getRouteMeta(this.$route, 'nav')
    },
    showMobileNav () {
      if (!this.$route.name) {
        return false
      }
      return utils.getRouteMeta(this.$route, 'mobileNav')
    },
    showFooter () {
      if (!this.$route.name) {
        return false
      }
      return !(utils.getRouteMeta(this.$route, 'footer') === false)
    },
    zendeskWidget () {
      if (!this.$route.name) {
        return false
      }
      return !(utils.getRouteMeta(this.$route, 'zendeskWidget') === false) && this.showContact
    },
    navClass () {
      if (!this.$route.name) {
        return false
      }
      return utils.getRouteMeta(this.$route, 'class')
    },
    bgColor () {
      let navClass = this.navClass
      switch (navClass) {
        case 'login':
          return '#303E4B'
        case 'dark':
          return '#1A1A1A'
        default:
          return 'initial'
      }
    },
    footer () {
      if (this.state.theme.themeName === 'default' && !this.isMobile) {
        return 'default'
      }
      if (this.state.theme.themeName === 'default' && this.isMobile) {
        return 'mobile'
      }
    }
  },
  watch: {
    showNav () {
      this.fixPosition()
    },
    showFooter () {
      this.fixPosition()
    },
    zendeskWidget (show) {
      window.zE && window.zE(function () {
        if (utils.isApp() || utils.isMobile()) {
          return window.zE.hide()
        }
        if (show && zeStyleEl && zeStyleEl.parentNode) {
          zeStyleEl.parentNode.removeChild(zeStyleEl)
        }
        return show ? window.zE.show() : window.zE.hide()
      })
    }
  },
  methods: {
    onkeyup (name) {
      this.$eh.$emit('app:keyup:' + name)
    },
    onclick (e) {
      this.$eh.$emit('app:click')
    },
    fixPosition () {
      const box = this.$refs.container
      if (box) {
        box.style.minHeight = window.innerHeight - (this.showFooter ? 110 : 0) - (this.showNav ? 80 : 0) + 'px'
      }
    },
    async keepSession () {
      await utils.sleep(6e5)
      if (this.state.userInfo) {
        await actions.updateSession()
      }
      this.keepSession()
    },
    toNotice () {
      let url = ''
      if (this.state.userInfo && this.state.theme.themeName === 'default') {
        url = process.env.BASE_API + 'zendesk/sso?return_to=' + encodeURIComponent(this.state.theme.request[this.state.locale] || this.state.theme.request.en)
      } else {
        url = this.state.theme.request[this.state.locale] || this.request.theme.help.en
      }
      if (!url) {
        this.showContact = false
      } else {
        window.open(url)
      }
    }
  },
  mounted () {
    this.$eh.$on('app:resize', () => this.fixPosition())
    this.$nextTick(this.fixPosition)
  },
  created () {
    utils.$app = this
    this.state.router = this.$router
    this.$router.afterEach((to, from) => {
      if (from.name === 'trading') {
        this.fixPosition()
      }
    })
    this.keepSession()
    window.onresize = () => {
      this.$eh.$emit('app:resize')
    }
  }
}
</script>
<style lang="scss">
@import "styles/reset.scss";
@import "styles/index.scss";
</style>
