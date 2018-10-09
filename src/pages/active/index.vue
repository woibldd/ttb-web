<template>
  <div class="page-home">
    <div class="header">
      <v-nav
        v-if="!isMobile"
        :dark="true"
        is-home="true"/>
      <mobile-nav
        v-if="isMobile"
      />
    </div>
    <router-view/>
  </div>
</template>

<script>
import utils from '@/modules/utils'
import VNav from '@/components/VNav3'
import MobileNav from '@/components/Mobile/MobileNav.vue'
// import responsiveScale from '@/mixins/responsiveScale'
export default {
  // mixins: [responsiveScale],
  data () {
    return {
      isMobile: utils.isMobile()
    }
  },
  components: {
    VNav,
    MobileNav
  }
}
</script>

<style lang="scss" scoped>

</style>
