<template>
  <svg
    :style="style"
    class="iconfont"
    aria-hidden="true">
    <use :xlink:href="'#icon-' + name"/>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'inherit'
    }
  },
  computed: {
    style() {
      return {
        color: this.color
      }
    }
  }
}
</script>
