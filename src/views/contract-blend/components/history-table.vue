<template>
  <div
    class="history_table_container"
    v-scroll-load="loadMore"
  >
    <table
      class="table scroll--body"
    >
      <colgroup flex="main:justify ">
        <col
          flex-box="1"
          v-for="(item,index) in tableColumns"
          :key="index">
      </colgroup>
      <tr>
        <th
          v-for="(item,index) in tableColumns"
          :key="index">
          {{ item.hearderLabel }}
        </th>
        <th v-if="lastColumnConfig">{{ lastColumnConfig.headerLabel }}</th>
      </tr>
      <tbody :class="[state.skin]">
        <tr
          v-for="(row,index) in dataTable"
          :key="index">
          <td
            v-for="(item,key) in tableColumns"
            :style="{width: item.width(currentTab, item.prop)}"
            :key="key">
            <div v-if="(currentTab==='curEntrust') && item.prop==='amount'">
              <edit-cell
                :value="row[item.prop]"
                :type="'amount'"
                :orderid="row.id"
                :id="index"
                @confirm="editQty">
                <span
                  :class="typeof item.class === 'function'?item.class(row[item.prop],item.prop,row):item.class">
                  {{ row[item.prop] | filterColumnValue(item.prop,row,item.handleValue) }}
                </span>
              </edit-cell>
            </div>
            <div v-else-if="(currentTab==='curEntrust') && item.prop==='price'">
              <edit-cell
                :value="row[item.prop]"
                :type="'price'"
                :orderid="row.id"
                :id="index"
                @confirm="editPrice">
                <span
                  :class="typeof item.class === 'function'?item.class(row[item.prop],item.prop,row):item.class">
                  {{ row[item.prop] | filterColumnValue(item.prop,row,item.handleValue) }}
                </span>
              </edit-cell>
            </div>
            <div v-else-if="currentTab==='lossEntrust' && item.prop==='price'">
              <div v-html="item.handleValue(row[item.prop], item.prop,row)"></div>
            </div>
            <div v-else-if="(currentTab==='lossEntrust' || currentTab==='historyEntrust') && item.prop==='trigger_price'">
              <div v-html="item.handleValue(row[item.prop], item.prop,row)"></div>
            </div>
            <!-- <div v-else-if="currentTab==='lossEntrust' && item.prop==='trigger_price'">
              <edit-cell
                :value="row[item.prop]"
                :type="item.prop"
                :orderid="row.id"
                :id="index"
                @confirm="editTriggerPrice">
                <span
                  :class="typeof item.class === 'function'?item.class(row[item.prop],item.prop,row):item.class">
                  {{ row[item.prop] | filterColumnValue(item.prop,row,item.handleValue) }}
                </span>
              </edit-cell>
            </div> -->
            <!-- <span v-else-if="currentTab==='lossEntrust' && item.prop==='distancePrice'"/> -->

            <div v-else 
              :class="typeof item.class === 'function'?item.class(row[item.prop],item.prop,row):item.class">
              <div v-html="item.handleValue(row[item.prop], item.prop,row)"></div>
            </div>
            <!-- <span
              v-else
              :class="typeof item.class === 'function'?item.class(row[item.prop],item.prop,row):item.class">
              {{ row[item.prop] | filterColumnValue(item.prop,row,item.handleValue) }}
            </span> -->
          </td>
          <td v-if="lastColumnConfig">
            <slot
              name="handlerDom"
              :data="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import editCell from './edit-cell' 
import api from '@/modules/api/blend'
import { bigMinus } from '@/utils/handleNum'
import {state} from '@/modules/store'
export default {
  components: {editCell},
  filters: {
    filterColumnValue (value, key, row, callback) {
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
    },
    currentTab: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: () => []
    }
  },
  data (vm) {
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
      pageConfig,
      state
    }
  },
  methods: {
    loadMore () { 
      this.$emit('loadMore')
    },
    editCell () {
      console.log('editCell')
    },
    async editQty (obj) {
      let arr = this.tableList.filter(t => t.id === obj.id)
      if (arr.length > 0) {
        let item = arr[0]
        let res = await api.setBlendModify({
          order_id: item.id,
          symbol: item.name,
          amount: obj.newValue
        })
        if (!res.code) {
          item.amount = obj.newValue
          this.$message.success('???????????????')
        } else {
          this.$message.error(res.message)
        }
      }
    },
    async editPrice (obj) {
      let arr = this.tableList.filter(t => t.id === obj.id)
      if (arr.length > 0) {
        let item = arr[0]
        let res = await api.setModify({
          order_id: item.id,
          symbol: item.name,
          price: obj.newValue
        })
        if (!res.code) {
          item.price = obj.newValue
          this.$message.success('???????????????')
        } else {
          this.$message.error(res.message)
        }
      }
    },
    async editTriggerPrice (obj) {
      let arr = this.tableList.filter(t => t.id === obj.id)
      if (arr.length > 0) {
        let item = arr[0]
        let res = await api.setModify({
          order_id: item.id,
          symbol: item.name,
          trigger_price: obj.newValue
        })
        if (!res.code) {
          item.trigger_price = obj.newValue
          this.$message.success('???????????????' + item.trigger_price)
        } else {
          this.$message.error(res.message)
        }
      }
    }
  },
  computed: {
    dataTable () {
      if (this.currentTab !== 'lossEntrust') {
        return this.tableList
      } else {
        return this.tableList && this.tableList.map(item => {
          // const curProduct = this.products.filter(a => a.name === item.symbol)[0]
          // 0?????? 1???????????? 2???????????? 3????????????
          const type = {
            1: 'MIX',
            2: 'MARKET',
            3: 'INDEX'
          }
          const curProduct = this.comProduct[item.name]
          // const distancePrice = bigMinus([item.trigger_price || 0, curProduct[type[item.trigger_type]].current || 0], 2)
          return { ...item }
        }) || []
      }
    },
    comProduct () {
      const obj = {}
      this.products.map(q => { obj[q.name] = q })
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-nowrap{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .history_table_container{
    /* height: 208px; */
    height: 250px;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 12px;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    .table{
      border-collapse: collapse;
      width: 100%;
      tr {

        height: 35px;
        td,th {
          border-bottom: 1px solid $--contract-table-bd;
        }
      }
      tbody {
        tr:hover {
          background-color: $--contract-table-bd;
        }
        &.dark {
          tr:hover {
            background-color: #222222;
          }
        }
      }
    }
  }
</style>
