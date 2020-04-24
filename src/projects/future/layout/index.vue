<template>
  <div class="layout">
    <!-- <app-nav /> -->
    <v-nav />
    <keep-alive :include="['contract']">
      <router-view />
    </keep-alive>
    <app-footer v-if="showFooter" />
  </div>
</template>

<script>
// import appNav from './appNav/index'
import VNav from './VNav3'
import appFooter from './appFooter/index'
export default {
  name: 'Layout',
  components: {
    // appNav,
    VNav,
    appFooter
  },
  computed: {
    showFooter () {
      return ['/home'].includes(this.$route.path)
    }
  }
}
</script>
