let isWhite = 0

export default {
  created () {
    isWhite += 1
    this.setWhitePage()
  },
  destroyed () {
    isWhite -= 1
    this.setWhitePage()
  },
  methods: {
    setWhitePage () {
      if (isWhite > 0) {
        document.documentElement.classList.add('white-bg')
      } else {
        document.documentElement.classList.remove('white-bg')
      }
    }
  }
}
