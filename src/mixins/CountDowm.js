export default {
  data () {
    return {
      remainTime: 0, // 倒计时间总秒数
      hour: 0, minute: 0, second: 0, timer: null
    }
  },
  computed: {
    hourString () {
      return this.formatNum(this.hour);
    },
    minuteString () {
      return this.formatNum(this.minute);
    },
    secondString () {
      return this.formatNum(this.second);
    }
  },
  methods: {
    countDowmInit() {
      if (this.remainTime > 0) {
        this.hour = Math.floor((this.remainTime / 3600) % 24);
        this.minute = Math.floor((this.remainTime / 60) % 60);
        this.second = Math.floor(this.remainTime % 60);
        this.countDowm();
      }
    },
    countDowm () {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.hour === 0) {
          if (this.minute !== 0 && this.second === 0) {
            this.second = 59;
            this.minute -= 1;
          } else if (this.minute === 0 && this.second === 0) {
            this.second = 0;
            clearInterval(this.timer);
            if (this.countDowmEnd) this.countDowmEnd(); // 倒计时结束
          } else {
            this.second -= 1;
          }
        } else {
          if (this.minute !== 0 && this.second === 0) {
            this.second = 59;
            this.minute -= 1;
          } else if (this.minute === 0 && this.second === 0) {
            this.hour -= 1;
            this.minute = 59;
            this.second = 59;
            if (this.countDowmEnd) this.countDowmEnd(); // 倒计时结束
          } else {
            this.second -= 1;
          }
        }
      }, 1000);
    },
    formatNum (num) {
      return num < 10 ? '0' + num : '' + num;
    }
  }
}
