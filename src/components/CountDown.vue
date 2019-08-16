<template>
  <section class="countdown-wrap">
    <div :style="{'font-size': size}" class="countdown">
      <!-- <span class="day">{{ day }}</span>
      <span class="split">:</span>-->
      <span v-if="hour!='00'" class="day">{{ hour }}</span>
      <span v-if="hour!='00'" class="split">:</span>
      <span class="day">{{ minutes }}</span>
      <span class="split">:</span>
      <span class="day">{{ seconds }}</span>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    // 结束时的时间戳
    terminal: {
      type: Number
    },
    size: {
      type: Number,
      default: function() {
        return 12
      }
    }
  },
  data() {
    return {
      day: '00',
      hour: '00',
      minutes: '00',
      seconds: '00',
      timer: '00'
    }
  },
  computed: {},
  created() {
    this.countdown()
    this.timer = setInterval(this.countdown, 1000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    countdown() {
      const remain = this.getRemainSecond()
      const seconds = remain % 60
      const day = Math.floor(remain / (60 * 60 * 24))
      const hour = Math.floor((remain - day * 60 * 60 * 24) / (60 * 60))
      const minutes = Math.floor(
        (remain - day * 60 * 60 * 24 - hour * 60 * 60) / 60
      )

      this.seconds = seconds < 10 ? '0' + seconds : seconds
      this.minutes = minutes < 10 ? '0' + minutes : minutes
      this.hour = hour < 10 ? '0' + hour : hour
      this.day = day < 10 ? '0' + day : day
    },
    getRemainSecond() {
      let remain = Math.floor(
        (this.terminal - new Date().getTime()) / 1000
      )
      if (remain < 0) {
        remain = 0
      }
      return remain
    }
  }
}
</script>
<style scoped lang="scss">

.countdown-wrap {
  display:inline-block;
  font-size: 12px;
  color: $primary;
}
.countdown{
  font-size: 12px;
}

@media screen and (max-width: 768px) {
  .countdown {
    font-size: 12px;
  }

}

</style>
