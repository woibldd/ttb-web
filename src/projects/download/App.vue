<template>
  <div
    id="app"
    :class="['lang-' + $i18n.locale]"
    tabindex="0"
    @click="onclick"
    @keyup.enter="onkeyup('enter')"
    @keyup.esc="onkeyup('esc')">
    <router-view/>
  </div>
</template>

<script>
import {state} from '@/modules/store'
import utils from '@/modules/utils'
import VNotifyList from '@/components/VNotifyList.vue'

export default {
  name: 'App',
  components: {
    VNotifyList
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
    }
  },
  created () {
    utils.preloadEnd()
  }
}
</script>
<style lang="scss">
@import "~@/styles/reset";

#app {
    height: 100%;
    width: 100%;

    &:hover {
        outline: none;
    }
}
html,
body {
    height: 100%;
}

body::-webkit-scrollbar {
    display: none;
}
</style>
