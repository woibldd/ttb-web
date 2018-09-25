import utils from '@/modules/utils'
const vp = document.querySelector('meta[name=viewport]')

let isResponsive = 0

export default {
  mounted () {
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
        document.body.classList.add('responsive')
        vp && vp.setAttribute('content', 'width=device-width;initial-scale=0.0')
      } else {
        document.body.classList.remove('responsive')
        vp && vp.setAttribute('content', 'width=device-width;initial-scale=1.0;minimum-scale=1.0;maximum-scale=1.0;user-scalable=no;viewport-fit=cover')
      }
      this.$nextTick(() => {
        utils.$app && utils.$app.fixPosition()
      })
    }
  }
}
