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
.exchange-rank {
  background: linear-gradient(90deg,rgba(43,52,75,1) 0%,rgba(23,30,50,1) 100%);
  .exchange-rank-container {
    .body {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .flex-column {
        display: flex;
        flex-direction: column;
        .flex-box {
          display: flex;
          flex-direction: column;
          border-radius: 6px;
          background: #182036;
          width: 580px;
          padding: 40px;
          box-sizing: border-box;
          margin-bottom: 40px;

          &.right {
            margin-left: 40px;
          }

          &.mine {
            // margin-bottom
          }
        }
      }
    }
  }
}

</style>
