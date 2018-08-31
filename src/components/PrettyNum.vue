<template>
  <span>
    <span class="num-strong">{{ strong }}</span><span class="num-weak">{{ weak }}</span>
  </span>
</template>

<script>
export default {
  name: 'prettyNum',
  props: ['num'],
  computed: {
    numStr () {
      if (typeof this.num === 'string') {
        return this.num
      }
      return this.$big(this.num || '0').toString()
    },
    strong () {
      if (/\./.test(this.numStr)) {
        return this.numStr.replace(/0+$/, '')
      }
      return this.numStr
    },
    weak () {
      const match = this.numStr.match(/\.\d*?(0*)$/)
      return match ? match[1] : ''
    }
  }
}
</script>

<style scoped>
.num-weak {
  opacity: .5;
}
</style>
