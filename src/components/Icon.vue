<template>
  <svg class="iconfont" aria-hidden="true" :style="style">
    <use :xlink:href="'#icon-' + name"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon',
  props: {
    name: {
      required: true
    },
    scale: {
    },
    color: {
      default: 'inherit'
    }
  },
  computed: {
    style () {
      return {
        color: this.color
      }
    }
  }
}
</script>
