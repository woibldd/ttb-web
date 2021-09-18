export default {
  data () {
    return {
      endTime: 0, day: 0, hour: 0, minute: 0, second: 0, timer: null, showDay: false
    }
  },
  computed: {
    dayString() {
      return this.formatNum(this.day);
    },
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
      const nowtime = new Date().getTime();
      const diff = this.endTime - nowtime;

      if (diff > 0) {
        if (this.showDay) {
          this.day = Math.floor(diff / (1000 * 60 * 60 *24));
          this.hour = Math.floor(diff / (1000 * 60 * 60) % 24);
        } else {
          this.hour = Math.floor(diff / (1000 * 60 * 60));
        }

        this.minute = Math.floor(diff / (1000 * 60) % 60);
        this.second = Math.floor(diff / 1000 % 60);
      } else {
        clearInterval(this.timer);
        this.day = 0;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        if (this.endTimeCb) this.endTimeCb();
      }
    },
    countDowm () {
      if (this.timer) clearInterval(this.timer);
      this.countDowmInit();

      this.timer = setInterval(() => {
        this.countDowmInit();
      }, 1000);
    },
    formatNum (num) {
      return num < 10 ? '0' + num : '' + num;
    }
  },
  beforeRouteLeave(to, from, next){ // 页面离开时清除定时器
    if (this.timer) clearInterval(this.timer);
    next();
  }
}
