import utils from '@/modules/utils'
const vp = document.querySelector('meta[name=viewport]')

let isResponsive = 0

export default {
  created () {
    isResponsive += 1
    this.setResponsivePage()
  },
  destroyed () {
    isResponsive -= 1
    this.setResponsivePage()
  },
  methods: {
    setResponsivePage () {
      if (isResponsive > 0) {
        document.body.classList.add('responsive-body')
        vp && vp.setAttribute('content', 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover')
      } else {
        document.body.classList.remove('responsive-body')
        vp && vp.setAttribute('content', 'width=device-width,initial-scale=1.0')
      }
      this.$nextTick(() => {
        utils.$app && utils.$app.fixPosition()
      })
    }
  }
}