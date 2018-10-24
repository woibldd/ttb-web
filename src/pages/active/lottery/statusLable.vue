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
      if (item.bet1_amount) return 1
      if (item.bet2_amount) return 2
      if (item.bet3_amount) return 3
      return 0
    },
    label () {
      switch (this.status) {
        case 1:
          return this.$t('activity_lottery_buy_rise')
        case 2:
          return this.$t('activity_lottery_buy_flat')
        case 3:
          return this.$t('activity_lottery_buy_flat')
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
