<template>
  <div class="custom-table"> 
    <el-table
      ref="elTable"
      v-bind="$attrs"
      :data="tableList"
    >
      <el-table-column  v-if="hasAppend">  
        <template slot="header">
          <slot name="myheader" />
        </template>
        <template slot-scope=" { row }">
          <slot name="append" :data="row" />
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item,index) in tableColumns"
        :key="index"
        v-bind="item"
        :label="item.headerFun && item.headerFun(item.prop) || item.hearderLabel"
        :width="item.hearderWidth && item.hearderWidth(item.prop)||''"
        :style="{textAlign:item.headerAlign||'left'}"
      > 
        <template slot="header" slot-scope="{ column }">
          <el-tooltip :disabled="false" :content="column.label" placement="top" effect="light">
            <span :style="{textAlign:item.headerAlign||'left'}" class="text-nowrap">{{ column.label }}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <p  :style="{textAlign:item.headerAlign||'left'}">
            <!-- <span>{{ scope.row[item.prop] | filterColumnValue(item.prop, scope.row, item.handleValue) }}</span> -->
            <span v-html="getColumnValue(scope.row[item.prop],item.prop, scope.row, item.handleValue )"></span>
          </p>
        </template>
      </el-table-column>
      <el-table-column 
        v-if="lastColumnConfig" 
        :width="lastColumnConfig && lastColumnConfig.width"
        v-bind="$attrs">
        <template slot="header">
          <p :style="{textAlign:lastColumnConfig.headerAlign||'left'}">{{ $t(lastColumnConfig.headerLabel) }}</p>
        </template>
        <template slot-scope=" { row }">
          <slot name="handlerDom" :data="row" />
        </template>
      </el-table-column>
      <template slot="empty">
        <div style="padding: 40px 0;">
          <p style="height: 70px;">
            <img src="~@/assets/table-empty.png" alt="">
          </p>  
          <p style="line-height: 30px;">{{$t('shareHistory.noData')}}</p>  
        </div>
      </template>
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

  <!-- <div class="com-table">
    <el-table
      v-bind="$attrs"
    >
      <el-table-column
        v-for="(column,index) in columns"
        :key="index"
        :show-overflow-tooltip="!column.component"
        v-bind="column"
      >
        <template slot-scope="scope">
          <component :is="column.component" v-if="column.component" :data="[scope.row,column,$attrs.data]" />
          <span
            v-else-if="column.handleValue"
            v-bind="column"
            :style="typeof column.style === 'function' ? column.style(scope.row[column.prop], scope.row):column.style"
            @click="column.click && handleColumnClick(scope,column.click)"
          >{{ column.handleValue(scope.row[column.prop], scope.row) }}</span>
          <span
            v-else-if="typeof column.style === 'function'"
            v-bind="column"
            :style="column.style(scope.row[column.prop], scope.row)"
            @click="column.click && column.click(scope)"
          >{{ scope.row[column.prop] }}</span>
          <span
            v-else
            v-bind="column"
            @click="column.click && column.click(scope)"
          >{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="!noHandler" label="??????" :width="width">
        <template v-if="!($attrs['no-handle'] && $attrs['no-handle'](scope.row))" slot-scope="scope">
          <span>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-view"
              @click="$emit('editItem',scope.row,scope.$index)"
            >?????? </el-button>
            <el-button
              type="text"
              size="mini"
              style="color:#F56C6C"
              icon="el-icon-share"
              @click="$emit('deleteItem',scope.row,scope.$index)"
            >?????? </el-button>
            <slot name="moreHandle" :data="scope" />
          </span>

        </template>
      </el-table-column>
    </el-table>
  </div> -->
</template>
<script>
// import units from '@/config/tools'
export default {
  filters: {
    filterColumnValue(value, key, row, callback) {
      return callback && callback(value, key, row) || value
    }
  },
  // filters: {
  //   handler(row, value, handleValue) {
  //     const arr = value.split('.')
  //     const target = Array.isArray(arr) && row[arr[0]] ? arr.reduce((prev, curr) => {
  //       return prev[curr]
  //     }, row) : row[value]
  //     return typeof handleValue === 'function' ? handleValue(target, row) : target
  //   }
  // },
  // inject: ['parentSlots'],
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
    },
    hasAppend: false,
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
    getColumnValue(value, key, row, callback) {
      return callback && callback(value, key, row) || value
    }
  }, 
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
