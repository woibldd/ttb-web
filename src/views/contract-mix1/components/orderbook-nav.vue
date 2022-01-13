<template>
  <div class="orderbook-nav">
    <span @click="setMode('both')">
      <icon name="orderbook-all" class="ml-5" :class="{active: state.mix.orderbookMode === 'both'}"></icon>
    </span>
    <span @click="setMode('bid')">
      <icon name="orderbook-green" class="ml-5" :class="{active: state.mix.orderbookMode === 'bid'}"></icon> 
    </span>
    <span @click="setMode('ask')">
      <icon name="orderbook-red" class="ml-5   " :class="{active: state.mix.orderbookMode === 'ask'}"></icon> 
    </span> 
  </div>
</template>

<script>
import { state } from '@/modules/store' 
export default {
  data() {
    return {
      state
    }
  },
  methods: {
    setMode (mode) {
      state.mix.orderbookMode = mode
    },
  }
}
</script>

<style lang="scss" scope>
.orderbook-nav {
  white-space: nowrap;
  .iconfont {
    opacity: 0.5;
    &.active {
      opacity: 1;
    }
  }
}
</style>