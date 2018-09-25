import utils from '@/modules/utils'
const isIos = utils.isIos()
const vp = document.querySelector('meta[name=viewport]')

let isResponsive = 0

export default {
  created () {
    isResponsive = 1
    this.$nextTick(() => {
      this.setResponsivePage()
    })
  },
  mounted () {
    isResponsive = 1
    this.$nextTick(() => {
      this.setResponsivePage()
    })
  },
  destroyed () {
    isResponsive = 1
    this.setResponsivePage()
  },
  methods: {
    setResponsivePage () {
      let content = ''
      if (isResponsive > 0) {
        content = 'width=device-width, initial-scale=0.0'
        if (isIos) {
          // content = content.replace(/,/g, ';')
        }
        document.body.classList.add('responsive')
        vp && vp.setAttribute('content', content)
        // vp.remove()
      } else {
        document.body.classList.remove('responsive')
        content = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        if (isIos) {
          // content = content.replace(/,/g, ';')
        }
        vp && vp.setAttribute('content', content)
      }
      this.$nextTick(() => {
        utils.$app && utils.$app.fixPosition()
      })
    }
  }
}
