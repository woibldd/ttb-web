<template>
  <div class="trade-container">
    <div class="trade-message-box">
      <div class="link">
        <!--{{ $t('otc_account') }}-->
        {{$t('otc_side_35')}}
      </div>
    </div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="formInline.currency"
          :placeholder="$t('currency')"
          @change="changeCurreny"
          clearable>
          <el-option
            v-for="(item, index) in currencyData"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formInline.type"
          :placeholder="$t('otc_transaction_type')"
          @change="changeType"
          clearable>
          <el-option
            v-for="(item, index) in sideData"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="time"
          type="datetimerange"
         :range-separator="$t('otc_sideoc_9')"
         :start-placeholder="$t('otc_sideoc_50')"
          :end-placeholder="$t('otc_sideoc_51')"
          value-format="timestamp"
          size="large"
          @change="dateHandle"/>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData" 
      :empty-text="$t('no_data')"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="currency"
        :label="$t('fees_name')"/>
      <el-table-column
        prop="create_time"
        :label="this.$t('otc_trans_time')"/>
      <el-table-column
        prop="opetate"
        :label="$t('order_th_type')">
        <template slot-scope="scope">
          <!-- <span
            v-html="scope.row.opetate === 1 ? $t('transfer_out') 
            : scope.row.opetate === 2 ? $t('transfer_in') 
            : scope.row.opetate === 3 ? '当日清算' 
            : scope.row.opetate === 4 ? '买入' : '卖出'"/> -->
          <span v-html="$t(opetates[scope.row.opetate])"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        :label="this.$t('otc_trans_idsl')"/>
      <el-table-column
        prop="available"
        :label="$t('balance')">
        <template slot-scope="scope">
          <span
            v-html="scope.row.available === 0 ? 0 : Number(scope.row.available).toFixed(8)"/>
        </template>
      </el-table-column>
    </el-table>
    <div
      class="page"
      v-if="tableData.length > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="formInline.page"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import service from '@/modules/service'
import {state} from '@/modules/store'
import processValue from '@/mixins/process-otc-value.js'

export default {
  mixins: [processValue],
  data () {
    return {
      time: [],
      formInline: {
        currency: '',
        type: '',
        begin_stamp: '',
        end_stamp: '',
        page: 1,
        size: 10
      },
      total: 0,
      loading: true,
      currencyData: [
        {
          name: this.$t('allin'),
          id: ''
        },
        {
          name: 'BTC',
          id: 'BTC'
        },
        {
          name: 'USDT',
          id: 'USDT'
        }
      ],
      sideData: [
        {
          name: this.$t('allin'),
          id: ''
        },
        {
          name: this.$t('transfer_in'),
          id: 1
        },
        {
          name: this.$t('transfer_out'),
          id: 2
        },
        {
          name: this.$t('contract_action_button_up'),
          id: 4
        },
        {
          name: this.$t('contract_action_button_down'),
          id: 5
        }
      ],
      tableData: [],
      start: '',
      end: '',
      opetates: {
        1: 'otc_french_bill_in',
        2: 'otc_french_bill_out',
        3: 'otc_french_bill_liquidation',
        4: 'otc_french_bill_buy',
        5: 'otc_french_bill_sell',
      }
    }
  },
  methods: {
    dateHandle (time) {
      if (time) {
        this.start = Number(time[0]) / 1000
        this.end = Number(time[1]) / 1000
        this.formInline.begin_stamp = this.start
        this.formInline.end_stamp = this.end
      } else {
        this.start = ''
        this.end = ''
        this.formInline.begin_stamp = ''
        this.formInline.end_stamp = ''
      }
      this.init()
    },
    handleSizeChange (e) {
      this.formInline.size = e
      this.init()
    },
    handleCurrentChange (e) {
      this.formInline.page = e
      this.init()
    },
    init () {
      this.loading = true
      console.log('4444444444444444444444444444444444')
      service.balancefills(this.formInline).then(res => {
        if (res.code === 0) {
          this.loading = false
          this.tableData = res.data.data
          this.total = res.data.total
        } else {
          this.$message.warning(`${res.message}`)
        }
      })
    },
    changeCurreny (e) {
      this.formInline.currency = e
      this.formInline.page = 1
      this.formInline.size = 10
      this.init()
    },
    changeType (e) {
      this.formInline.type = e
      this.formInline.page = 1
      this.formInline.size = 10
      this.init()
    }
  },
  created () {
    this.init()
  },
  watch: {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import './../StepTable/assets/scss/trade.scss';
</style>


<style lang='scss'> 
.el-picker-panel.el-date-range-picker {
  width: 460px;
  .el-picker-panel__body {
    min-width: 450px;
  }
}
</style>