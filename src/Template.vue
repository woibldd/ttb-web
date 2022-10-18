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
  </div>
</template>

<script>
import { state, actions } from '@/modules/store'
import utils from '@/modules/utils'
import VNotifyList from '@/components/VNotifyList.vue'

export default {
  name: 'App',
  components: { 
    VNotifyList
  },
  data() {
    return {
      state,
      isMobile: utils.isMobile()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "styles/reset.scss";
</style>
