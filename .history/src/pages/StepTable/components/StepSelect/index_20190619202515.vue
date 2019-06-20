<template>
  <el-dropdown trigger="click" 
@command="handleCommand">
    <span class="el-dropdown-link">
      {{ dropData.name }}
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item, index) in dropData.data" 
:key="index" :command="index"> {{ item }} </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    dropData: {
      type: Object,
      default: function () {
        return {
          name: '类型',
          data: ['全部', '买入', '卖出']
        }
      }
    }
  },
  methods: {
    handleCommand (e) {
      this.$emit('dropdown-slect', e)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-dropdown {
    margin-top: 6px;
    color: #999999 !important;
  }
</style>
