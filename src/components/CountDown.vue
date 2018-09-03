<template>
    <section class="countdown-wrap">
        <div class="countdown">
            <span class="day">{{day}}</span>
            <span class="split">:</span>
            <span class="day">{{hour}}</span>
            <span class="split">:</span>
            <span class="day">{{minutes}}</span>
            <span class="split">:</span>
            <span class="day">{{seconds}}</span>
        </div>
    </section>
</template>
<script>
export default {
  props: {
    terminal: {
      type: Date
    }
  },
  data() {
    return {
      day: "00",
      hour: "00",
      minutes: "00",
      seconds: "00",
      timer: "00"
    }
  },
  methods: {
    countdown() {
      let remain = this.getRemainSecond ()
      let seconds = remain % 60
      let day = Math.floor(remain / (60 * 60 * 24))
      let hour = Math.floor((remain - day * 60 * 60 * 24) / (60 * 60))
      let minutes = Math.floor(
        (remain - day * 60 * 60 * 24 - hour * 60 * 60) / 60
      )

      this.seconds = seconds < 10 ? "0" + seconds : seconds
      this.minutes = minutes < 10 ? "0" + minutes : minutes
      this.hour = hour < 10 ? "0" + hour : hour
      this.day = day < 10 ? "0" + day : day
    },
    getRemainSecond () {
      let remain = Math.floor(
        (this.terminal.getTime() - new Date().getTime()) / 1000
      )
      if (remain < 0) {
        remain = 0
      }
      return remain
    }
  },
  computed: {},
  created () {
    this.timer = setInterval(this.countdown, 1000)
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style scoped lang="scss">
@import "../styles/vars";
.countdown-wrap {
  font-size: 44px;
  color: $primary;
}
</style>
