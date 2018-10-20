<template>
  <div class="exchange-rank">
    <div class="exchange-rank-container">
      <div class="banner">banner</div>
      <div class="body">
        <div class="flex-column">
          <div class="flex-box reward">reward</div>
          <div class="flex-box rank">rank
            <div
              class="mine-box"
              v-if="isLogin">mine</div>
          </div>

        </div>
        <div class="flex-column right">
          <div class="flex-box enroll">enroll</div>
          <div class="flex-box rule">rule</div>
          <div class="flex-box desc">desc</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {state} from '@/modules/store'
export default {
  data () {
    return {
      state
    }
  },
  computed: {
    isLogin () {
      if (this.state.userInfo) {
        return true
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
@import './exchange.scss'
</style>
