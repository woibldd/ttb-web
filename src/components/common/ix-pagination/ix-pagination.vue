<template>
  <div class="ix-pagination-container">
    <div
      class="prev-page pa-btn "
      @click="prev">{{ $t('last_page') }}</div>
    <div
      class="next-page pa-btn ml-20"
      @click="next">{{ $t('next_page') }}</div>
  </div>
</template>
<script>
import './ix-pagination.scss'
export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    func: {
      type: Function,
      default () {
        return () => {}
      }
    }
  },
  methods: {
    prev () {
      if (this.page === 1) {
        return false
      }

      this.$emit('update:page', this.page - 1)
      this.func()
      console.log('prev', this.page)
    },
    next () {
      this.$emit('update:page', this.page + 1)
      console.log('next', this.page)
      this.func()
    }
  }
}
</script>
