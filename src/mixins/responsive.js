import utils from '@/modules/utils'
const isIos = utils.isIos()
const vp = document.querySelector('meta[name=viewport]')
  
let isResponsive = 0

export default {
  data() {
    return { 
      
    }
  },

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
    isResponsive = 0
    this.setResponsivePage()
  },
  methods: {  
    setResponsivePage () {
      let content = ''
      if (isResponsive > 0) {
        document.body.classList.add('responsive')
        content = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        if (isIos) {
          // content = content.replace(/,/g, ';')
        }
        vp && vp.setAttribute('content', content)
      } else {
        document.body.classList.remove('responsive')
        content = 'width=device-width, initial-scale=1.0'
        if (isIos) {
          // content = content.replace(/,/g, ';')
        }
        vp && vp.setAttribute('content', 'content')
      }
      this.$nextTick(() => {
        utils.$app && utils.$app.fixPosition()
      })
    }
  }
}
