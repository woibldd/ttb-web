<template>
  <div class="recent-kyc-container">
    <div class="corner lt"/>
    <div class="kyc-wrap">
      <div
        class="left"
        v-t="'activity_kyc_title'"/>
      <div
        class="middle"
        ref="marque">
        <span class="phone">{{ data.phone || data.email }}</span>
        <span class="time">{{ data.pass_time | ts2date }}</span>
        <span
          class="state"
          v-t="'activity_kyc_pass'"/>
      </div>
      <div class="right">
        <v-btn
          class="see-rules"
          @click="seeRules"
          radius="30"
          height="30"
          :label="$t('activity_kyc_rule')"/>
      </div>
    </div>
    <div class="corner rb"/>
  </div>
</template>
<script>
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import {state} from '@/modules/store'

export default {
  data () {
    return {
      state,
      timer: 0,
      count: 0,
      data: {
        phone: '-----------',
        pass_time: new Date()
      }
    }
  },
  components: {
    VBtn
  },
  computed: {
    link () {
      return this.state.theme.activityKyc[this.state.locale] || this.state.theme.activityKyc.en
    }
  },
  methods: {
    async fetch () {
      try {
        let res = await service.getRecentlyKycList()
        if (!res.code && res.data) {
          if ((typeof res.data.phone !== 'undefined' && this.data.phone === res.data.phone) || (typeof res.data.email !== 'undefined' && this.data.email === res.data.email)) {
            return
          }
          this.data = res.data
          if (this.count++) {
            this.$refs['marque'].classList.add('marque')
            setTimeout(() => {
              this.$refs['marque'].classList.remove('marque')
            }, 2e3)
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    seeRules () {
      this.$router.push({
        name: 'kycRelay'
      })
    }
  },
  created () {
    this.fetch()
    this.timer = setInterval(() => {
      this.fetch()
    }, 30e3)
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.recent-kyc-container {
  margin: 0 60px;
  margin-top: 40px;
  text-align: center;
  height: 60px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #4f5c67;
  .corner {
    width: 38px;
    height: 26px;
    &.lt {
      border-left: 2px solid $primary;
      border-top: 2px solid $primary;
    }
    &.rb {
      vertical-align: bottom;
      border-right: 2px solid $primary;
      border-bottom: 2px solid $primary;
      margin-top: 60px-26px;
    }
  }
  .kyc-wrap {
    display: flex;
    align-items: center;
    .left {
      color: #ffffff;
      font-weight: bold;
    }
    .middle {
      margin: 0 60px;
      color: $primary;
      min-width: 340px;;
      .time {
        margin: 0 60px;
      }
      &.marque {
        animation: marque 1s ease-in-out;
      }
      @keyframes marque {
        0% {
          transform: translateY(100%);
          opacity: 0
        }
        20% {
          // transform: translateY(175%);
          opacity: 0.2
        }
        40% {
          // transform: translateY(125%);
          opacity: .4
        }
        60% {
          // transform: translateY(75%);
          opacity: .6
        }
        80% {
          // transform: translateY(25%);
          opacity: .8
        }
        100%{
          // transform: translateY(0%);
          opacity: 1
        }
      }
    }
    .right {
      .see-rules {
        width: 80px;
      }
    }
  }
}
</style>
