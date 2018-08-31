<template>
  <span>
    <span @click="setMode('both')" class="ibt ob-nav btn"
      :style="{height: height + 'px'}"
      :class="{active: local.orderbookMode === 'both'}">
      <span class="lines-wrap both ibt">
        <span class="pattern p-1 theme-bdcolor-down"></span>
        <span class="pattern p-2 theme-bdcolor-up"></span>
        <span class="pattern p-3"></span>
      </span>
    </span>
    <span @click="setMode('ask')" class="ibt ob-nav btn"
      :style="{height: height + 'px'}"
      :class="{active: local.orderbookMode === 'ask'}">
      <span class="lines-wrap ask ibt">
        <span class="pattern p-1 theme-bdcolor-down"></span>
        <span class="pattern p-2"></span>
        <span class="pattern p-3"></span>
      </span>
    </span>
    <span @click="setMode('bid')" class="ibt ob-nav btn"
      :style="{height: height + 'px'}"
      :class="{active: local.orderbookMode === 'bid'}">
      <span class="lines-wrap bid ibt">
        <span class="pattern p-1 theme-bdcolor-up"></span>
        <span class="pattern p-2"></span>
        <span class="pattern p-3"></span>
      </span>
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
  height: 10px;
  position: relative;
  margin-top: 9px;
}
.ob-nav {
  width: 54px;
  box-sizing: border-box;
  border-top: 2px solid transparent;
  background-color: $nav;
  text-align: center;
  &:hover {
    background-color: fade-out($protrade-bg, .6);
  }
  &.active, &.active:hover {
    border-top: 2px solid #ACC0FF;
    background-color: $protrade-bg;
  }
}
.pattern {
  position: absolute;
  box-sizing: border-box;
}

.both {
  .p-1 {
    left: 0;
    top: 0;
    width: 16px;
    height: 4px;
    border-style: solid;
    border-left-width: 1px;
    border-bottom-width: 1px;
  }
  .p-2 {
    left: 0;
    bottom: 0;
    width: 16px;
    height: 4px;
    border-style: solid;
    border-left-width: 1px;
    border-top-width: 1px;
  }
  .p-3 {
    top: 0;
    right: 0;
    width: 13px;
    height: 10px;
    border-color: #979797;
    border-style: solid;
    border-top-width: 1px;
    border-bottom-width: 1px;
  }
}
.ask {
  .p-1 {
    left: 0;
    top: 0;
    width: 16px;
    height: 10px;
    border-style: solid;
    border-left-width: 1px;
    border-bottom-width: 1px;
  }
  .p-2 {
    right: 0;
    top: 0;
    width: 13px;
    height: 7px;
    border-color: #979797;
    border-style: solid;
    border-top-width: 1px;
    border-bottom-width: 1px;
  }
  .p-3 {
    top: 3px;
    right: 3px;
    width: 10px;
    height: 1px;
    border-color: #979797;
    border-style: solid;
    border-top-width: 1px;
  }
}
.bid {
  .p-1 {
    left: 0;
    top: 0;
    width: 16px;
    height: 10px;
    border-style: solid;
    border-left-width: 1px;
    border-top-width: 1px;
  }
  .p-2 {
    right: 0;
    bottom: 0;
    width: 13px;
    height: 7px;
    border-color: #979797;
    border-style: solid;
    border-top-width: 1px;
    border-bottom-width: 1px;
  }
  .p-3 {
    bottom: 3px;
    right: 3px;
    width: 10px;
    height: 1px;
    border-color: #979797;
    border-style: solid;
    border-top-width: 1px;
  }
}
</style>
