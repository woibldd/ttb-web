<template>
  <span>
    <span @click="setMode('both')" class="ibt ob-nav btn"
      :style="{height: height + 'px'}"
      :class="{active: local.orderbookMode === 'both'}">
      <icon name="order-normal" class="lines-wrap ibt"></icon>
    </span>
    <span @click="setMode('ask')" class="ibt ob-nav btn"
      :style="{height: height + 'px'}"
      :class="{active: local.orderbookMode === 'ask'}">
      <icon name="order-down" class="lines-wrap ibt"></icon>
    </span>
    <span @click="setMode('bid')" class="ibt ob-nav btn"
      :style="{height: height + 'px'}"
      :class="{active: local.orderbookMode === 'bid'}">
      <icon name="order-up" class="lines-wrap ibt"></icon>
    </span>
  </span>
</template>

<script>
import {local} from '@/modules/store'

export default {
  props: ['height'],
  data () {
    return {
      local
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
  margin-top: 9px;
}
.ob-nav {
  width: 56px;
  box-sizing: border-box;
  border-top: 2px solid transparent;
  background-color: $nav;
  text-align: center;
  &:hover {
    background-color: fade-out($protrade-bg, .6);
  }
  &.active, &.active:hover {
    border-top: 2px solid $primary;
    background-color: $protrade-bg;
  }
}
</style>
