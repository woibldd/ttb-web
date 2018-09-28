<template>
  <a
    class="sms-btn"
    :class="{disabled: sms.status === 1}"
    @click.prevent="getSmsCode">
    {{ smsBtnText }}</a>
</template>
<script>
import utils from '@/modules/utils'

export default {
  props: {
    sendText: {
      type: String,
      default: 'sms_send'
    },
    sendRetry: {
      type: String,
      default: 'sms_retry'
    },
    interval: {
      type: Number,
      default: 60
    },
    validation: {
      type: Function,
      default () {
        return true
      }
    },
    startWhenLoaded: {
      type: Boolean,
      default: false
    },
    sendCodeFunc: {
      type: Function
    }
  },
  data () {
    return {
      sms: {
        // 0:可以发送, 1:倒计时, 2:重新发送
        loading: false,
        status: 0,
        countDown: 0,
        timer: null
      }
    }
  },
  computed: {
    smsBtnText () {
      if (this.sms.status === 0) {
        return this.$i18n.t(this.sendText)
      }
      if (this.sms.status === 2) {
        return this.$i18n.t(this.sendRetry)
      }
      return `${this.$i18n.t(this.sendRetry)}(${this.sms.countDown})`
    }
  },
  methods: {
    startCountDown () {
      clearInterval(this.sms.timer)
      this.sms.timer = setInterval(() => {
        this.sms.countDown -= 1
        if (this.sms.countDown <= 0) {
          this.sms.countDown = 0
          this.sms.status = 2
          clearInterval(this.sms.timer)
        }
      }, 1000)
    },
    clearCountDown () {
      this.sms.status = 0
      clearInterval(this.sms.timer)
    },
    async getSmsCode () {
      if (this.sms.status === 1 || this.sms.loading || this.loading) {
        return false
      }
      if (!this.validation()) {
        return false
      }
      this.sms.status = 1
      this.sms.countDown = this.interval
      this.startCountDown()
      const res = await this.sendCodeFunc()
      if (res && res.code) {
        utils.alert(res.message)
      } else {
        this.errmsg = ''
      }
    }
  },
  watch: {
    startWhenLoaded (newVal) {
      if (newVal) {
        this.getSmsCode()
      }
    }
  },
  mounted () {
    if (this.startWhenLoaded) {
      this.getSmsCode()
    }
  },
  destroyed () {
    clearInterval(this.sms.timer)
  }
}
</script>
<style lang="scss" scoped>
.mobile {
  .sms-btn {
    font-size: 12px;
  }
}
</style>
