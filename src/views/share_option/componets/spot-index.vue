<template>
  <div class="drawer-box">
    <ul class="drawer-content">
      <li v-for="(item,key) in mapCurrency" :key="key" flex="main:justify cross:center">
        <div flex="cross:center">
          <!-- <svg-icon :icon-class="item.icon" /> -->
          <img height="22" :src="item.icon" alt="" srcset="">
          <span>{{ key }}</span>
        </div>
        <span>{{ item.value }}</span>
      </li>
      <div class="line" />
      <!-- <li v-for="(value,key) in mapExponent" :key="key" flex="main:justify cross:center">
        <p class="text">{{ $tR(`mapList.${key}`) }}</p>
        <span class="num">{{ value }}</span>
      </li> -->
      <div class="line" />
      <li flex="main:justify cross:center">
        <p class="text">{{ $tR(`USD`) }}<span class="graysmall">(USDT)</span></p>
        <span class="num">{{ USD }}</span>
      </li>
    </ul>
    <!-- <el-button type="info" style="margin-top:30px;width:100%">点击了解更多信息</el-button> -->
  </div>
</template>
<script>
import { bigRound } from '@/utils/handleNum'
export default {
  name: 'SpotIndex',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    mapChineseData() {
      return {
        price: 'USDT指数',
        usdtRate: '汇率(USDT/USD)'
      }
    },
    mapCurrency() {
      const { Huobi, Okex, Binance } = this.data
      return {
        Binance: { value: bigRound(Binance, 2), icon: require('../img/binance.png') },
        Huobi: { value: bigRound(Huobi, 2), icon: require('../img/huobi.png') },
        Okex: { value: bigRound(Okex, 2), icon: require('../img/okex.png') }
      }
    },
    mapExponent() {
      const { usdtRate, price } = this.data
      return { price: bigRound(price, 2), usdtRate: `x ${usdtRate}` }
    },
    USD() {
      return bigRound(this.data.price, 2)
    }
  }
}
</script>
<style lang="scss" scoped>
.drawer-box{
  .drawer-content{
    &>li{
      height: 30px;
    }
    .line{
      border-bottom: 1px dashed #3B414F;
      height:0;
      margin:10px 0
    }
  }
}
</style>
