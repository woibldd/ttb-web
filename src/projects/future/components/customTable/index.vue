<template>
  <div class="custom-table">
    <el-table ref="elTable" v-bind="$attrs" :data="tableList">
      <el-table-column
        v-for="(item,index) in tableColumns"
        :key="index"
        :show-overflow-tooltip="true"
        v-bind="item"
        :label="item.hearderLabel"
        :width="item.hearderWidth && item.hearderWidth(item.prop)||''"
      >
        <template slot="header" slot-scope="{ column }">
          <el-tooltip :disabled="true" :content="column.label" placement="top" effect="light">
            <span class="text-nowrap">{{ column.label }}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span :class="typeof item.class === 'function'?item.class(scope.row[item.prop],item.prop,scope.row):item.class">{{ scope.row[item.prop] | filterColumnValue(item.prop,scope.row,item.handleValue) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="lastColumnConfig" v-bind="lastColumnConfig">
        <template slot="header">
          <p class="text-nowrap" :style="{textAlign:lastColumnConfig.headerAlign||'left'}">{{ lastColumnConfig.headerLabel }}</p>
        </template>
        <template slot-scope=" { row }">
          <slot name="handlerDom" :data="row" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="!!pageConfig.total"
      flex="main:center"
      style="margin-top:20px"
      background
      :current-page="pageConfig.currentPage"
      :page-sizes="pageConfig.pageSizes"
      :page-size="pageConfig.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageConfig.total"
      @size-change="pageConfig.handleSizeChange"
      @current-change="pageConfig.handleCurrentChange"
    />
  </div>
</template>
<script>
// import units from '@/config/tools'
export default {
  filters: {
    filterColumnValue(value, key, row, callback) {
      return callback && callback(value, key, row) || value
    }
  },
  props: {
    tableList: {
      type: Array,
      default: () => []
    },
    tableColumns: {
      type: Array,
      default: () => []
    },
    lastColumnConfig: {
      type: Object,
      default: () => {}
    }
  },
  data(vm) {
    const defaultValue = {
      currentPage: 1,
      pageSizes: [10, 50, 100],
      pageSize: 10
    }
    const pageConfig = {
      ...defaultValue,
      total: 0,
      handleSizeChange: pageSize => {
        if (pageSize)vm.pageConfig.pageSize = pageSize
        vm.$emit('change', vm.pageConfig || pageConfig)
      },
      handleCurrentChange: currentPage => {
        if (currentPage)vm.pageConfig.currentPage = currentPage
        vm.$emit('change', vm.pageConfig || pageConfig)
      },
      init: () => {
        Object.assign(vm.pageConfig, defaultValue)
      }
    }
    pageConfig.handleCurrentChange()
    return {
      pageConfig
    }
  },
  methods: {
  }
  // computed: {
  //   width() {
  //     return this.$scopedSlots.moreHandle() ? 180 : 140
  //   }
  // },
  // methods: {
  //   handleColumnClick(scope, cb) {
  //     return new Promise(resolve => {
  //       this.$emit('editItem', scope.row, scope.$index)
  //       resolve()
  //     }).then(() => {
  //       cb(scope)
  //     })
  //   }
  // }
}
</script>
<style scoped>
  .text-nowrap{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
