<template>
  <div class="property-manage-warp"
       flex="dir:top">
    <div class="top mb-30" flex="main:justify cross:center">
      <div class="title" style="font-size: 18px;text-align: left;">
        {{$t('shareOption.share_account')}}
      </div>
      <div class="right">
        <label @click="currentType='account'" :class="{active: currentType==='account'}" class="fund-history mr-20">账户余额</label>
        <label @click="currentType='history'" :class="{active: currentType==='history'}" class="fund-history mr-20">交易记录</label>
      </div> 
      <!-- <customForm ref="customForm"
                  size="mini"
                  flex="main:justify"
                  class="login-custom-form"
                  :schema="schema"
                  :submit-btn="false"
                  label-width="10"
                  label-position="left">
      </customForm> -->

      <!-- <el-divider style="maring:12px 0" /> -->
    </div> 
    <div class="filter mb-10" v-if="currentType==='history'"> 
      <div class="label mr-20">
        <label for="">{{$t('order_th_type')}}</label> 
      </div>
      <div class="mr-30">
        <el-select  
          size="small"
          v-model="search.currency" 
          :placeholder="schema[0].placeholder"
          @change="handlePageChange(1)" >
          <el-option
            v-for="item in this.schema[0].options"
            :key="item" 
            :label="item"
            :value="item">
          </el-option>
        </el-select>  
      </div>
      <div class="label mr-20">
        <label for="">{{$t('date')}}</label> 
      </div>
      <div> 
        <el-date-picker
          size="small"
          v-model="search.dataRange" 
          @change="handlePageChange(1)" 
          type="daterange"
          value-format="timestamp"
          range-separator="-"
          :start-placeholder="$t('fund.contract.start')"
          :end-placeholder="$t('fund.contract.end')">
        </el-date-picker> 
      </div> 
    </div>
    <div class="content">
      <div class="history" v-if="currentType==='history'">
        <el-table v-loading="loading" :data="tableList" style="width: 100%;">
          <el-table-column 
            v-for="(item, key) in mapShareColumns" 
            :label="item.hearderLabel" 
            :width="item.hearderWidth(item.prop)"
            :prop="item.prop"
            :key="key"> 
            <template slot-scope="scope">
              <div>
                {{ item.handleValue(scope.row[item.prop], item.prop) }} 
              </div>
            </template>
          </el-table-column> 
        </el-table>
        <el-pagination 
          class="mt-20"
          background
          layout="prev, pager, next"
          @current-change="handlePageChange"
          :current-page.sync="pageConfig.page"
          :page-size="pageConfig.size"
          :total="pageConfig.total">
        </el-pagination> 
      </div>
      <div class="account" v-if="currentType==='account'">
        <el-table  v-loading="loading" :data="accountList" style="width: 100%;">
           <el-table-column :label="$t('currency')" prop="currency"></el-table-column>
           <el-table-column :label="$t('avlb')" prop="available"></el-table-column>
           <el-table-column :label="$t('locked')" prop="ordering"></el-table-column> 
        </el-table>
      </div>
    </div>
    
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
  data () {
    return {
      tableList: [],
      total: 0,
      loading: true,
      lastColumnConfig: {
        headerLabel: '操作',
        headerAlign: 'right',
        width: '400px'
      },
      schema: [
        {          
          fieldType: 'select', 
          size: 'mini', 
          prefixIcon: 'el-icon-search', 
          placeholder: '', 
          vModel: 'currency', 
          default: '', 
          options: [], 
          on: {
            change: value => this.handlePageChange()
          }        
        },
        // { fieldType: 'date-picker',size:'mini',type:'daterange', prefixIcon: 'el-icon-search', valueFormat: 'timestamp', placeholder: '', vModel: 'plan_time', default: '' }
      ],
      pageConfig: {
        page: 1,
        size: 10,
        total: 0
      },
      search: {
        currency: '',  
        dataRange: ''
      },
      currentType: 'account'
    }
  },
  computed: {
    mapShareColumns () {
      return Object.keys(this.chineseLangData.mapShareColumns).map(key => ({
        hearderLabel: this.$t(`shareOption.mapShareColumns.${key}`),
        prop: key,
        hearderWidth: key => ['create_time', 'sett_time',].includes(key) && 95, // key => ['period', 'trade_type', 'amount', 'income', 'profile', 'rate'].includes(key) && '70px',

        handleValue: (value, key) => {
          switch (key) {
            case 'period':
              return mapTabTimes[value]
            case 'trade_type':
              return !value ? this.$t('shareOption.up_rate') : this.$t('shareOption.down_rate')
            case 'spot':
              return this.bigRound(value||0, 4)
            case 'rate':
              return value + '%'
            case 'strike':
              return this.bigRound(value||0, 4)
            case 'sett_price':
              return this.bigRound(value||0, 4)
            case 'state':
              return !value ? this.$t('shareOption.noSettle') : this.$t('shareOption.settle')
            case 'create_time':
              return this.parseTime(value)
            case 'sett_time':
              return value && this.parseTime(value) || '--'
            default:
              return value ? value : '--'
          }
        }
      }))
    },
    userData () {
      return this.$store.state.userData
    },
    mapBalanceMenu () {
      return this.$store.state.mapShareAccount
    },

  },
  created () {
    this.handlePageChange(this.pageConfig.page)
    this.$store.dispatch('getShareAccountList').then(res => {
      this.schema[0].options = res.map(item => item.currency)
      this.schema[0].placeholder = this.$tR('account')
      this.accountList = res
      // this.schema[1].placeholder = this.$tR('time')
    })
  },
  methods: {
    handlePageChange (page) { 
      this.loading = true 
      const params = {
        currency: this.search.currency,
        page, 
        size: this.pageConfig.size 
      }
      if (this.search.dataRange) {
        params.begin_time = this.search.dataRange[0]
        params.end_time = this.search.dataRange[1]
      }

      getHistory(params).then(res => {
        this.tableList = res.data.data 
        this.pageConfig.total = res.data.total 
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.property-manage-warp {
  height: 100%;
  text-align: center;
  .filter {
    display: flex;
    align-items: center;
  }
  & > .center {
    .numerical {
      // line-height: 100px;
      margin-top: 30px;
      color: $--color-danger;
      // border-width: 0 5px 5px 5px;
      // border-style: solid;
      // border-color: rgba($color: $--color-primary, $alpha: .3);
      // padding-bottom: 20px;
    }
  }
  & > .bottom {
    & > fieldset {
      margin: 0;
      padding: 30px;
      box-sizing: border-box;
      width: 48%;
      border: solid 1px #f0f0f0;
      .title {
        font-size: 20px;
      }
      .numerical {
        margin-top: 30px;
        margin-bottom: 30px;
        color: rgba($color: $--color-warning, $alpha: 3);
        border-width: 0 5px 5px 5px;
        border-style: solid;
        border-color: #f6f6f6;
        padding-bottom: 20px;
      }
      .list > p {
        line-height: 40px;
      }
    }
  }
}
</style>
