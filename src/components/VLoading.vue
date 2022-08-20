<template>
  <div class="ix-loading k-square-holder">
    <div class="k-square3 k-square3a" :style="style"></div>
    <div class="k-square3 k-square3b" :style="style"></div>
    <div class="k-square3 k-square3c" :style="style"></div>
    <div class="k-square3 k-square3d" :style="style"></div>
  </div>
</template>

<script>
export default {
  name: 'vLoading',
  props: {
    color: {
      default: '#F5C109'
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
.k-square-holder {
    width: 50px;
}
.k-square3 {
  display: inline-block;
  width: 15px;
  margin: 0;
  height: 15px;
  background: #000;
  opacity: .2;
  animation: k-loadingQ 2s infinite;
  opacity: .5;
}
.k-square3a {
  transform: translate(0,-25px);
}
.k-square3b {
  transform: translate(25px,0);
}
.k-square3c {
  transform: translate(-25px,0);
}
.k-square3d {
  transform: translate(0,25px);
}

@keyframes k-loadingQ {
  33% {
    transform: translate(0,0);
    opacity: .7;
  }
  66% {
    transform: translate(0,0);
    opacity: .7;
  }
}
</style>
