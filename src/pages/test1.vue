<template>
<div class="page-home">
    <div class="header">
      <v-nav isHome="true" :notice="notice" @hide="notice = null"></v-nav>
      <br />
      <router-link :to="{name:'Test2'}">go to test2</router-link>
      <br />
      <router-link :to="{name:'trading'}">go to trade</router-link>
      <br />
      <router-link :to="{name:'profile'}">go to profile</router-link>
      test1
      <p>
        <count-down :terminal="date"></count-down>
      </p>
    </div>
</div>
</template>
<script>
import {state} from '@/modules/store'
import VNav from '@/components/VNav.vue'
import CountDown from '@/components/CountDown.vue'

export default {
  data () {
    return {
      state,
      news: [],
      notice: null,
      date: new Date(2018, 8, 20)
    }
  },
  components: {
    VNav,
    CountDown
  }
}
</script>
