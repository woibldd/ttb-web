<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <v-nav from="unit"/> -->
    <router-view />
    <!-- <v-notify-list/> -->
    <transition name="el-zoom-in-center">
      <div
        v-if="$root.modelVisible"
        class="model"
        @click="$root.modelVisible = false" />
    </transition>
  </div>
</template>
<script>
// import VNotifyList from '@/components/VNotifyList.vue'
import VNav from './layout/VNav3'
import utils from '@/modules/utils'
export default {
  name: 'App',
  components: {
    VNav
    // VNotifyList
  },
  created () {
    utils.preloadEnd()
  }
}
</script>
<style lang="scss" scoped>

@import "~@/styles/reset";
@import "~@/styles/index";
</style>
.model{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.8);
  z-index: 10;
}

</style>
