<template>
  <div class="property-manage-warp" flex="dir:top">
    <div class="top">
      <slot />
      <el-divider />
    </div>
    <custom-table v-loading="!tableList.length" stripe :table-list="tableList" :table-columns="mapShareColumns" @change="handlePageChange">
      <!-- <div slot="handlerDom" slot-scope="data" style="width:200px">
        <el-link type="primary">划转</el-link>
        <el-link type="primary">充币</el-link>
        <el-link type="primary">提币</el-link>
        <el-link type="primary">交易</el-link>
      </div> -->
    </custom-table>
  </div>
</template>
<script>
import customTable from '@/components/customTable'
import { getHistory } from '@/api/share_option'
import { mapTabTimes } from '@/const'
export default {
  name: 'ShareHistory',
  components: {
    customTable
  },
  data() {
    return {
      tableList: [],
      total: 0,
      loading: false,
      lastColumnConfig: {
        headerLabel: '操作',
        headerAlign: 'right',
        width: '400px'
      }
    }
  },
  computed: {
    mapShareColumns() {
      return Object.keys(this.chineseLangData.mapShareColumns).map(key => ({
        hearderLabel: this.$tR(`mapShareColumns.${key}`),
        prop: key,
        hearderWidth: key => ['period', 'trade_type', 'amount'].includes(key) && '50px',
        handleValue: (value, key) => {
          switch (key) {
            case 'period':
              return mapTabTimes[value]
            case 'trade_type':
              return !value ? '涨' : '跌'
            case 'spot':
              return this.bigRound(value, 4)
            case 'state':
              return !value ? '未结算' : '已结算'
            case 'create_time':
              return this.parseTime(value)
            case 'sett_time':
              return this.parseTime(value)
            default:
              return value?value:'--'
          }
        }
      }))
    },
    mapTableInfo() {
      return this.chineseLangData.mapTableInfo
    },
    userData() {
      return this.$store.state.userData
    }
  },
  created() {

  },
  methods: {
    handlePageChange(obj) {
      const { pageSize, currentPage } = obj
      getHistory({ user_id: this.id, page: currentPage, size: pageSize }).then(res => {
        this.tableList = res.data.data
        obj.total = res.data.total
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.property-manage-warp{
  height: 100%;
  text-align: center;
  &>.center{
    .numerical{
      // line-height: 100px;
      margin-top: 30px;
      color: $--color-danger;
      // border-width: 0 5px 5px 5px;
      // border-style: solid;
      // border-color: rgba($color: $--color-primary, $alpha: .3);
      // padding-bottom: 20px;
    }
  }
  &>.bottom{
    &>fieldset{
      margin: 0;
      padding: 30px;
      box-sizing: border-box;
      width: 48%;
      border: solid 1px #f0f0f0;
      .title{
        font-size: 20px;
      }
      .numerical{
        margin-top:30px;
        margin-bottom: 30px;
        color: rgba($color: $--color-warning, $alpha: 3);
        border-width: 0 5px 5px 5px;
        border-style: solid;
        border-color: #f6f6f6;
        padding-bottom: 20px;
      }
      .list > p{
        line-height: 40px;
      }
    }
  }
}
</style>
