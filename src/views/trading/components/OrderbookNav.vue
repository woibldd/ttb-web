<template>
  <div flex="cross:center" class="orderbook-nav" :skin="state.skin">
    <span
      @click="setMode('both')"
      class="ibt ob-nav btn mr-2"
      :style="{height: height + 'px'}"
      :class="{active: local.orderbookMode === 'both'}">
      <icon
        name="order-normal"
        class="lines-wrap ibt"/>
    </span>
    <span
      @click="setMode('ask')"
      class="ibt ob-nav btn mr-2"
      :style="{height: height + 'px'}"
      :class="{active: local.orderbookMode === 'ask'}">
      <icon
        name="order-down"
        class="lines-wrap ibt"/>
    </span>
    <span
      @click="setMode('bid')"
      class="ibt ob-nav btn mr-2"
      :style="{height: height + 'px'}"
      :class="{active: local.orderbookMode === 'bid'}">
      <icon
        name="order-up"
        class="lines-wrap ibt"/>
    </span>
  </div>
</template>

<script>
import {local, state} from '@/modules/store'

export default {
  props: ['height'],
  data () {
    return {
      local,
      state
    }
  },
  methods: {
    setMode (mode) {
      this.local.orderbookMode = mode
    }
  }
}
</script>

<style lang="scss" scoped>
.lines-wrap {
  width: 16px;
  height: 14px;
  position: relative;
  margin-top: 1px;
}
.orderbook-nav { 
  width: 100px;
  background-color: $--ix-header-bg;
  color: $--ix-header-color;
  &[skin~='dark'] {
    background-color: $--ix-header-bg2;
    color: $--ix-header-color2;
  }
  .ob-nav {
    // width: 56px;
    box-sizing: border-box;
    // border-top: 2px solid transparent;
    border: 1px solid #a7a7a7;
    // background-color: $nav;
    text-align: center;
    &:hover {
      background-color: fade-out($protrade-bg, .6);
    }
    &.active, &.active:hover {
      // border-top: 2px solid $primary;
      // background-color: $protrade-bg;
      border-color: $primary;
    }
  }

}
</style>
