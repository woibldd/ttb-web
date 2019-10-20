<template>
  <div
    id="app"
    :class="['lang-' + $i18n.locale]"
    tabindex="0"
    @click="onclick"
    @keyup.enter="onkeyup('enter')"
    @keyup.esc="onkeyup('esc')">
    <v-nav
      v-if="showNav && !isMobile"
      from="contract"
      :class="[navClass]"/>
    <router-view/>
    <!-- <v-notify-list/> -->
  </div>
</template>

<script>
import VNav from '@/components/VNav3.vue'
import {state, actions} from '@/modules/store'
import utils from '@/modules/utils'
import VNotifyList from '@/components/VNotifyList.vue'

let zeStyleEl = document.querySelector('#ze-style')

export default {
  name: 'App',
  components: {
    VNotifyList,
    VNav
  },
  data () {
    return {
      state,
      isMobile: utils.isMobile()
    }
  },
  methods: {
    onkeyup (name) {
      this.$eh.$emit('app:keyup:' + name)
    },
    onclick (e) {
      this.$eh.$emit('app:click')
    },
    async keepSession () {
      await utils.sleep(6e5)
      if (this.state.userInfo) {
        await actions.updateSession()
      }
      this.keepSession()
    }
  },
  watch: { 
    zendeskWidget (show) {  
      window.zE && window.zE(function () {
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
  computed: {
    showNav () {
      if (!this.$route.name) {
        return false
      }
      return utils.getRouteMeta(this.$route, 'nav')
    },
    navClass () {
      if (!this.$route.name) {
        return false
      }
      return utils.getRouteMeta(this.$route, 'class')
    },
    zendeskWidget () { 
      if (!this.$route.name) {
        return false
      }
      return !(utils.getRouteMeta(this.$route, 'zendeskWidget') === false) 
    },
  },
  created () {
    this.keepSession()
    window.onresize = () => { 
      this.$eh.$emit('app:resize')
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/reset";
@import "./index";

#app {
    height: 100%;
    width: 100%;
    background-color: $contract-block-bg;

    &:hover {
        outline: none;
    }
}

// 防止屏幕缩小,个别元素显示异常,特别是history_table
.router-spa_contract {
    .page-mask {
        display: none !important;
    }
    .lang-en {
        min-width: 1300px;
    }
    min-width: 1300px;

    .nav_box,.ind_cen {
        width: auto !important;
        min-width: 1280px !important;  // 有60的左右margin
    }
}
html,
body {
    background-color: #E9EBF8;
    height: 100%;
}

body::-webkit-scrollbar {
    display: none;
}
</style>
