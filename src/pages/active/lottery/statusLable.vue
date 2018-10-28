<template>
  <span :class="{rise: status === 1, 'fall': status === 3}">
    {{ label }}
  </span>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    status () {
      let item = this.item
      return item.type
    },
    label () {
      switch (this.status) {
        case 1:
          return this.$t('activity_lottery_buy_rise')
        case 2:
          return this.$t('activity_lottery_buy_flat')
        case 3:
          return this.$t('activity_lottery_buy_fall')
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
