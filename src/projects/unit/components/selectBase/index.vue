<template>
  <el-dropdown
    trigger="click"
    class="custom-dropdown"
    @command="handleCommand">
    <span class="el-dropdown-link">
      {{ handleLabel(selectValue) }}<i class="el-icon-caret-bottom" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(value,key) in mapData"
        :key="key"
        :class="{'custom-dropdown-active':value === selectValue}"
        :command="value">{{ handleLabel(value) }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  model: {
    prop: 'selectValue',
    event: 'handleCommand'
  },
  props: {
    mapData: {
      type: [Object, Array],
      require: true,
      default: () => {}
    },
    selectValue: {
      type: [String, Number],
      require: true,
      default: ''
    },
    handleLabel: {
      type: Function,
      default: value => value
    }
  },
  methods: {
    handleCommand (command) {
      this.$emit('handleCommand', command)
    }
  }
}
</script>
<style lang="scss" scoped>

.custom-dropdown-active{
  background-color:$--background-active-bg;
  color:$--color-primary
}
.custom-dropdown{
  .el-dropdown-link{
    color: inherit;
    font-size: 12px;
    &:hover{
      cursor: pointer;
    }
  }
}

</style>
