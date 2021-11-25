<template>
  <tr
    :style="{lineHeight: height}"
    style="overflow:hidden"
    class="price-stack-row">
    <!-- <td
      class="left btn"
      style="max-width: 46px;padding-left:5px"
      :class="sideColor(side)"
      @click="setPrice(item.price);setAmount(item.amount)">
      {{ $t(side === 'buy' ? 'buy' : 'sell') + ' '+ rank }}
    </td> -->
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
      class="price-stack-percent-bg"/>
  </tr>
</template>

<script>
import utils from '@/modules/utils'
export default {
  name: 'OrderbookItem',
  props: ['item', 'side', 'priceScale', 'amountScale', 'height', 'rank'],
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
      // return big.toFixed(this.amountScale)
      return utils.toPretty(big)
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



td {
  color: $primary-item;
  text-align: center;
  padding: 0 5px;
  width: 30%;
  &:nth-child(3) {
    width: 40%;
  }
}
td:first-child {
  padding-left: 15px;
}
.price-stack-percent-bg {
    position:absolute;right:0;height:24px;z-index:0;opacity:.1;
    cursor: pointer;
    width: 0%;
    transition: width 0.5s ease-in-out;
}
.price-stack-row {
    position: relative;
    display: flex;   // 不能缺少了上面的position属性哈
    flex-direction: row;
    white-space: nowrap;
}
</style>
