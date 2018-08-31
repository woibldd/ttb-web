<template>
  <div class="polygon-loading v-loading">
    <div class="polygon-loading-icon" :style="style"></div>
    <div class="polygon-loading-icon" :style="style"></div>
    <div class="polygon-loading-icon" :style="style"></div>
  </div>
</template>

<script>
export default {
  name: 'vLoading',
  props: {
    color: {
      default: 'white'
    },
    size: {
      default: 8
    }
  },
  computed: {
    style () {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        margin: `0 ${this.size * 0.5}px`,
        backgroundColor: this.color
      }
    }
  }
}
</script>

<style scoped lang="scss">
$duration: 1.1s;
.polygon-loading {
  text-align: center;
  font-size: 0;
  white-space: nowrap;
}
.polygon-loading-icon {
  border-radius: 1px;
  display: inline-block;
  animation-name: ani;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-duration: $duration;
  transform: skewX(-12deg);
  &:nth-child(3) {
    animation-delay: 0;
  }
  &:nth-child(2) {
    animation-delay: 0 - $duration * 0.28;
  }
  &:nth-child(1) {
    animation-delay: 0 - $duration * 0.56;
  }
}
@keyframes ani {
  from, 65%, to {
    opacity: .3;
    transform: skewX(-12deg);
  }
  20% {
    opacity: .7;
    transform: skewX(-12deg) scale(1.3);
  }
}
</style>
