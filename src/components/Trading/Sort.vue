<template>
  <span class="sort-label">
    <span>{{ label }}</span>
    <span
      v-if="sort"
      class="icons"
      :class="'state-' + state">
      <i
        class="up"
        :style="{borderColor: color}"/>
      <i
        class="down"
        :style="{borderColor: color}"/>
    </span>
  </span>
</template>

<script>
export default {
  name: 'Sort',
  props: {
    label: String,
    color: {
      default: '#000'
    },
    state: {
      default: 0
    },
    sort: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-label {
  user-select: none;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  padding: 0 2px;
  .icons {
    opacity: 1;
  }
  &:hover {
    background-color: rgba(255,255,255, .9);
    border-radius: 2px;
    .icons {
      opacity: 1;
    }
  }
}
.icons {
  margin-left: 2px;
  display: inline-block;
  vertical-align: top;
  margin-top: 5px;
  &.state-1 .down,
  &.state-2 .up {
    opacity: .6;
  }
}
i {
  display: block;
  width: 5px;
  height: 5px;
  opacity: .2;
  box-sizing: border-box;
  border-left-width: 1px;
  border-top-width: 1px;
  border-style: solid;
}
i.up {
  transform: rotate(45deg);
}
i.down {
  transform: rotate(-135deg);
}
</style>
