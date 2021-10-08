<template>
  <span class="info-btn btn" @mouseover="onHover" @mouseleave="onLeave" ref="btn">
    <icon name="info"></icon>
  </span>
</template>

<script>
export default {
  name: 'orderDealTarget',
  props: ['id', 'finished', 'pairName'],
  methods: {
    onLeave () {
      this.$eh.$emit('order-deals:leave', {
        id: this.id,
        pairName: this.pairName
      })
    },
    onHover () {
      this.$eh.$emit('order-deals:show', {
        id: this.id,
        finished: this.finished,
        pairName: this.pairName,
        position: this.$refs.btn.getBoundingClientRect()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info-btn {
  position: relative;
  font-size: 14px;
  line-height: 24px;
  vertical-align: top;
  opacity: .5;
  &:hover {
    opacity: 1;
  }
}
</style>
