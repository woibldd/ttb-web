export default {
  created () {
    document.documentElement.classList.add('light-bg')
  },
  destroyed () {
    document.documentElement.classList.remove('light-bg')
  }
}
