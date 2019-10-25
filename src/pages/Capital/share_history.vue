<template>
  <div class="property-manage-warp" flex="dir:top">
    <div class="top" flex="main:justify cross:center">
      <div class="title" style="font-size: 18px;text-align: left;">{{$t('shareOption.share_account')}}</div>
      <customForm ref="customForm" size="mini" flex="main:justify" class="login-custom-form" :schema="schema" :submit-btn="false" label-width="10"  label-position="left">
    </customForm>
      <!-- <el-divider style="maring:12px 0" /> -->
    </div>
    <custom-table v-loading="loading" stripe :table-list="tableList" :table-columns="mapShareColumns" @change="handlePageChange">
    </custom-table>
  </div>
</template>
<script>
import customTable from '@/components/customTable'
import { getHistory } from '@/api/share_option'
import { getShareAccountList } from '@/api/share_option'
import { mapTabTimes } from '@/const'
import customForm from '@/components/customForm'
export default {
  name: 'shareOption',
  components: {
    customTable,
    customForm
  },
  data() {
    return {
      tableList: [],
      total: 0,
      loading: true,
      lastColumnConfig: {
        headerLabel: '操作',
        headerAlign: 'right',
        width: '400px'
      },
      schema:[
        { fieldType: 'select',size:'mini', prefixIcon: 'el-icon-search', placeholder: '', vModel: 'currency', default: '',options:[],on:{
          change:value=>this.handlePageChange()
        } },
        // { fieldType: 'date-picker',size:'mini',type:'daterange', prefixIcon: 'el-icon-search', valueFormat: 'timestamp', placeholder: '', vModel: 'plan_time', default: '' }
      ]
    }
  },
  computed: {
    mapShareColumns() {
      return Object.keys(this.chineseLangData.mapShareColumns).map(key => ({
        hearderLabel: this.$tR(`mapShareColumns.${key}`),
        prop: key,
        hearderWidth: key => ['period', 'trade_type', 'amount','income','profile','rate'].includes(key) && '50px',
        
        handleValue: (value, key) => {
          switch (key) {
            case 'period':
              return mapTabTimes[value]
            case 'trade_type':
              return !value ? this.$t('shareOption.up_rate') : this.$t('shareOption.down_rate')
            case 'spot':
              return this.bigRound(value, 4)
            case 'strike':
              return this.bigRound(value, 4)
            case 'sett_price':
              return this.bigRound(value, 4)
            case 'state':
              return !value ? this.$t('shareOption.noSettle') : this.$t('shareOption.settle')
            case 'create_time':
              return this.parseTime(value)
            case 'sett_time':
              return value && this.parseTime(value) || '--'
            default:
              return value?value:'--'
          }
        }
      }))
    },
    userData() {
      return this.$store.state.userData
    },
    mapBalanceMenu() {
      return this.$store.state.mapShareAccount
    },

  },
  created () {
    this.$store.dispatch('getShareAccountList').then(res=>{
      this.schema[0].options = res.map(item=>item.currency)
      this.schema[0].placeholder = this.$tR('account')
      this.schema[1].placeholder = this.$tR('time')
    })
  },
  methods: {
    handlePageChange(pageConfig) {
      this.temPageConfig = pageConfig || this.temPageConfig
      if (!pageConfig) this.temPageConfig.init()
      const { pageSize, currentPage } = this.temPageConfig
      this.loading = true
      const currency = this.schema[0].currency
      console.log(currency);
      
      getHistory({ user_id: this.id, page: currentPage, size: pageSize,currency }).then(res => {
        this.tableList = res.data.data
        this.temPageConfig.total = res.data.total
        this.loading = false
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
