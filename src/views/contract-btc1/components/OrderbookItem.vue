<template>
  <tr
    :style="{lineHeight: height, height: height}"
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
      @click="setPrice(item.price)">
      <num :num="fixPrice(item.price)"/>
    </td>
    <td
      class="right btn"
      @click="setAmount(item.amount)">
      {{ item.amount | pretty(2) }}
    </td>
    <td class="right btn"> 
      <!-- @click="setAmount(item.total);setPrice(item.price)" -->
      {{ item.total | pretty(2) }}
    </td>
    <td
      :class="sideBgColor(side)"
      :style="{width: item.deep + '%'}"
      class="price-stack-percent-bg"/> 
      <!-- @click="setAmount(item.total);setPrice(item.price)" -->
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
  created(){
    // console.log(this.fixPrice(this.item.price))
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
      // return utils.pretty(big.toString(), this.amountScale)
      return utils.toThousand(big)
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
  position: relative;
  z-index: 1;
  color: $primary-item;
  text-align: center;
  padding: 0 5px;
  width: 40%;
  &.right {
    text-align: right;
  }
}
td:first-child {
  width: 20%;
  padding-left: 15px;
  width:20%;
}
.price-stack-percent-bg {
    position:absolute;right:0;height:24px;z-index:0;opacity:.1;
    cursor: pointer;
    width: 0%;
    transition: width 0.5s ease-in-out;
}
.price-stack-row {
    position: relative;
    display: flex;   // ????????????????????????position?????????
    flex-direction: row;
    white-space: nowrap;
}
</style>
