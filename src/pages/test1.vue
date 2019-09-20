<template>
  <div class="page-home">
    <div class="header">
      <v-nav2 :notice="notice" is-home="true" @hide="notice = null"/>
      <br >
      <router-link :to="{name:'Test2'}">go to test2</router-link>
      <br >
      <router-link :to="{name:'trading'}">go to trade</router-link>
      <br >
      <router-link :to="{name:'profile'}">go to profile</router-link>
      test1
      <p>
        <count-down :terminal="date"/>
      </p>
    </div>
  </div>
</template>
<script>
import { state } from '@/modules/store'
import CountDown from '@/components/CountDown.vue'

export default {
  components: {
    CountDown
  },
  data() {
    return {
      state,
      news: [],
      notice: null,
      date: new Date(2018, 8, 20)
    }
  }
}
</script>

<style scoped lang="scss">
.page-home{background:#303E4B}
</style>
