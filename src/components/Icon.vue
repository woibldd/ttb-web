<template>
  <svg
    class="iconfont"
    aria-hidden="true"
    :style="style">
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
    style () {
      return {
        color: this.color
      }
    }
  }
}
</script>
