<template>
  <tr :style="{lineHeight: height}">
    <td
      class="left btn"
      :class="sideColor(side)"
      @click="setPrice(item.price);setAmount(item.amount)">
      <num :num="fixPrice(item.price)"/>
    </td>
    <td
      class="right btn"
      @click="setAmount(item.total);setPrice(item.price)">
      {{ fixAmount(item.amount) }}
    </td>
    <td
      class="right btn"
      @click="setAmount(item.total);setPrice(item.price)">
      {{ fixAmount(item.total) }}
    </td>
    <td
      @click="setAmount(item.total);setPrice(item.price)"
      :class="sideBgColor(side)"
      :style="{width: item.deep + '%'}"
      style="position:absolute;right:0;height:24px;z-index:0;opacity:.2"/>
  </td></tr>
</template>

<script>
export default {
  name: 'OrderbookItem',
  props: ['item', 'side', 'priceScale', 'amountScale', 'height'],
  data () {
    return {}
  },
  methods: {
    sideColor (side) {
      return side.toUpperCase() === 'BUY' ? 'color-up' : 'color-down'
    },
    sideBgColor (side) {
      return side.toUpperCase() === 'BUY' ? 'bgcolor-up' : 'bgcolor-down'
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
