<template>
  <div class="crud">
    <el-table :data="showGridData" v-loading="loading" :empty-text="$t('no_data')">
      <el-table-column v-for="(item,index) in gridConfig" :key="index" :prop="item.prop" :label="item.label"
                       :width="item.width?item.width:''" show-overflow-tooltip>
        <template slot-scope="scope">
          <Cell v-if="item.render" :row="scope.row" :column="item" :index="scope.$index" :render="item.render" :render-header="item.renderHeader">
            <!---->
          </Cell>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import Cell from './config'

export default {
  components: {
    Cell
  },
  props: {
    gridConfig: {
      type: Array,
      require: true,
      default: function () {
        return []
      }
    },
    showGridData: {
      type: Array,
      require: true,
      default: function () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  },
  data () {
    return {
      gridData: []
    }
  },
  watch: {
    showGridData () {
      this.showGridData = this.showGridData
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-table thead {
  color: #999 !important;
}
</style>
