<template>
  <div id="app" :class="['lang-' + $i18n.locale]"
    tabindex="0"
    @click="onclick"
    @keyup.enter="onkeyup('enter')"
    @keyup.esc="onkeyup('esc')">
    <div class="page-mask" v-show="state.loading"></div>
    <v-nav v-if="showNav" :class="[navClass]"></v-nav>
    <div class="main-container" ref="container" :style="{background: $route.name === 'eosforcevote' ? '#FFFFFF' : 'initial'}">
      <router-view/>
    </div>
    <v-footer ref="footer" v-if="footer === 'default'" :fixed="fixed" v-show="showFooter"/>
  </div>
</template>

<script>
import VNav from '@/components/VNav.vue'
import VFooter from '@/components/VFooter.vue'
import {state, actions} from '@/modules/store'
import utils from '@/modules/utils'

let zeStyleEl = document.querySelector('#ze-style')

export default {
  name: 'App',
  components: {
    VNav,
    VFooter
  },
  data () {
    return {
      state,
      isMobile: utils.isMobile(),
      fixed: false
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
      return !(utils.getRouteMeta(this.$route, 'zendeskWidget') === false)
    },
    navClass () {
      if (!this.$route.name) {
        return false
      }
      return utils.getRouteMeta(this.$route, 'class')
    },
    footer () {
      if (this.state.theme.themeName === 'default' && !this.isMobile) {
        return 'default'
      }
      if (this.state.theme.themeName === 'default' && this.isMobile) {
        return 'mobile'
      }
      if (this.state.theme.themeName === 'taxi') {
        return 'taxi'
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
      if (box && this.footer === 'default') {
        box.style.minHeight = window.innerHeight - (this.showFooter ? 400 : 0) - (this.showNav ? 50 : 0) + 'px'
      }
    },
    async keepSession () {
      await utils.sleep(6e5)
      if (this.state.userInfo) {
        await actions.updateSession()
      }
      this.keepSession()
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
