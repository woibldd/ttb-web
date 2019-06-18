<template>
  <div class="trade-container">
    <div class="trade-message-box">
      <div class="link">
        <!--{{ $t('otc_account') }}-->
        法币账单
      </div>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.currency" placeholder="币种" clearable>
          <el-option
            v-for="(item, index) in currencyData"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.type" placeholder="交易类型" clearable>
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
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          @change="dateHandle"/>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="currency"
        :label="$t('fees_name')" />
      <el-table-column
        prop="create_time"
        label="成交时间"/>
      <template slot-scope="scope">
        {{ scope.row.create_time | date }}
      </template>
      <el-table-column
        prop="opetate"
        :label="$t('order_th_type')">
        <template slot-scope="scope">
          <span v-html="scope.row.opetate === 1 ? '转出' : scope.row.opetate === 2 ? '转入' : scope.row.opetate === 3 ? '当日清算' : scope.row.opetate === 4 ? '买入' : '卖出'" />
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        :label="$t('deal_amount')"/>
      <el-table-column
        prop="available"
        :label="$t('deal_value')"/>
    </el-table>
    <div class="page" v-if="tableData.length > 0">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="formInline.size"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import service from "@/modules/service";
import {state} from '@/modules/store'
import processValue from "@/mixins/process-otc-value.js";
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
        page: 10,
        size: 1,
        user_id: ''
      },
      total: 0,
      loading: true,
      currencyData: [
        {
          name: '全部',
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
          name: '转出',
          id: 1
        },
        {
          name: '转入',
          id: 2
        },
        {
          name: '当日清算',
          id: 3
        },
        {
          name: '买入',
          id: 4
        },
        {
          name: '卖出',
          id: 5
        }
      ],
      tableData: [
      ],
      start: '',
      end: ''
    }
  },
  computed: {
    userInfo () {
      return state.userInfo || {}
    },
    id () {
      return this.userInfo.id
    },
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
      this.formInline.page = e
      this.init()
    },
    handleCurrentChange (e) {
      this.formInline.size = e
      this.init()
    },
    init () {
      this.formInline.user_id = state.userInfo.id
      this.loading = true
      service.balancefills(this.formInline).then(res => {
        if (res.code === 0) {
          this.loading = false
          this.tableData = res.data.data
          this.total = res.data.data.total
        } else {
          this.$message.warning(`${res.message}`)
        }
      })
    }
  },
  created() {
    this.init()
  },
  watch: {
    'formInline.currency': function () {
      this.init()
    },
    'formInline.type': function () {
      this.init()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import './../StepTable/assets/scss/trade.scss';
</style>
