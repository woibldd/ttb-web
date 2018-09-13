<template>
  <tr :style="{lineHeight: height}">
    <td class="left btn" :class="sideColor(side)"
      @click="setPrice(item.price)">
      <num :num="fixPrice(item.price)"></num>
    </td>
    <td class="right btn" @click="setAmount(item.amount);">
      {{ fixAmount(item.amount) }}
    </td>
    <td class="right btn" @click="setAmount(item.total);">
      {{ fixAmount(item.total) }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'orderbookItem',
  props: ['item', 'side', 'priceScale', 'amountScale', 'height'],
  data () {
    return {}
  },
  methods: {
    sideColor (side) {
      return side.toUpperCase() === 'BUY' ? 'theme-color-up' : 'theme-color-down'
    },
    fixAmount (big) {
      if (!big) {
        return ''
      }
      return big.toFixed(this.amountScale)
    },
    fixPrice (big) {
      if (!big) {
        return ''
      }
      return big.toFixed(this.priceScale)
    },
    setPrice (price) {
      this.$eh.$emit('protrade:exchange:set', {price, side: this.side})
    },
    setAmount (amount) {
      this.$eh.$emit('protrade:exchange:set', {amount, side: this.side})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/vars";
@import "../../styles/mixins";

td {
  color: #BCBFCE;
  text-align: center;
  padding: 0 5px;
  width: 33.33%;
}
td:first-child {
  padding-left: 15px;
}
</style>
