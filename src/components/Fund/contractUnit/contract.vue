<template>
  <div class="fund-container my-fund-container contract-container">
    <div class="title-box">
      <div>
        {{ computedTitle }}
        <span class="ml-30">
          <el-select
            class="ddl-small"
            @change="currencyChange"
            v-model="unit"
            value-key="name">
            <el-option
              v-for="(item, idx) in currencyList"
              :key="idx"
              :label="item.name"
              :value="item"/>
          </el-select>
        </span>
      </div>
      <div>
        <router-link
          class="fund-history mr-22 "
          to="/fund/my/contractUnit/index"> {{ $t('account_balance') }}</router-link>
        <router-link
          class="fund-history mr-22"
          to="/fund/my/contractUnit/history"> {{ $t('transaction_record') }}</router-link>
        <router-link
          class="fund-history mr-22"
          to="/fund/my/contractUnit/assets-history"> {{ $t('capital_record') }}</router-link>
        <router-link
          class="fund-history"
          to="/fund/my/contractUnit/winloss-history"> {{ $t('fund.contract.winloss_record') }}</router-link>
      </div>
    </div>
    <div class="clearfix">
      <div class="gz-wrapper clearfix">
        <span>{{ $t('otc_otutcol_15') }}</span>
        <h1>
          <icon :name="unit.name+'-unit'" /> {{ total | fixed(unit.scale) }}</h1>
      </div> 
    </div>
    <div class="my-fund-content">
      <!--表格-->
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="currency"
            :label="$t('currency')"
            width="60">
          </el-table-column>
          <el-table-column
            prop="available"
            :label="$t('available_balance')">
          >
            <template slot-scope="scope">
              <div class="balance">{{ parsetNumber(scope.row.available) + ' ' + scope.row.currency }}</div>
              <div v-if="scope.row.currency!=='METH'" class="balance balance-grey">{{ '≈' + usdtNumber(scope.row.available)+ ' USD' }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="available_balance"
            :label="$t('available_balance')">
            <template slot-scope="scope">
              <div class="balance">{{ parsetNumber(scope.row.available_balance) + ' ' + scope.row.currency }}</div>
              <div v-if="scope.row.currency!=='METH'" class="balance balance-grey">{{ '≈' + usdtNumber(scope.row.available_balance) + ' USD' }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="unrealized"
            :label="$t('fund_contract_result_unrealized')">
            <template slot-scope="scope">
              <div class="balance">{{ parsetNumber(scope.row.unrealized) + ' ' + scope.row.currency }}</div>
              <div v-if="scope.row.currency!=='METH'" class="balance balance-grey">{{ '≈' + usdtNumber(scope.row.unrealized) + ' USD' }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="margin_user"
            :label="$t('contract_margin_balance')">
            <template slot-scope="scope">
              <div class="balance">{{ parsetNumber(scope.row.margin_user) + ' ' + scope.row.currency }}</div>
              <div v-if="scope.row.currency!=='METH'" class="balance balance-grey">{{ '≈' + usdtNumber(scope.row.margin_user) + ' USD' }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="margin_position"
            :label="$t('warehouse_margin')">
            <template slot-scope="scope">
              <div class="balance">{{ parsetNumber(scope.row.margin_position) + ' ' + scope.row.currency }}</div>
              <div v-if="scope.row.currency!=='METH'" class="balance balance-grey">{{ '≈' + usdtNumber(scope.row.margin_position) + ' USD' }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="margin_delegation"
            :label="$t('entrust_margin')">
            <template slot-scope="scope">
              <div class="balance">{{ parsetNumber(scope.row.margin_delegation) + ' ' + scope.row.currency }}</div>
              <div v-if="scope.row.currency!=='METH'" class="balance balance-grey">{{ '≈' + usdtNumber(scope.row.margin_delegation) + ' USD' }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="currency"
            :label="$t('operation')"
            width="90">
            <template slot-scope="scope">
              <a  v-if="scope.row.currency!=='METH'" href="javascript:;" @click="linkHandle(scope.row, 0)" class="link-btn">{{$t('account_exchange')}}</a>
              <a :href="`/future.html#/unit?product=${scope.row.currency}USD`" class="link-btn">{{$t('asset_trading')}}</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'
export default {
  name: 'MyFund',
  // mixins: [dealSocketMixins],
  data () {
    return {
      tableData: [],
      btcRates: null,
      currencyList: [
        {
          name: 'CNY',
          symbol: '￥',
          scale: 2
        },
        {
          name: 'USD',
          symbol: '$',
          scale: 4
        }
      ],
      unit: '',
      banlace: 0,
      total: 0
    }
  },
  computed: {
    computedTitle () {
      const obj = {
        '/fund/my/contractUnit': this.$t('account_balance'),
        '/fund/my/contractUnit/history': this.$t('transaction_record'),
        '/fund/my/contractUnit/assets-history': this.$t('capital_record'),
        '/fund/my/contractUnit/index': this.$t('unit_account')
      }
      return obj[this.$route.path]
    }
  },
  methods: {
    currencyChange (item) {
      this.unit = item
      if (item.name === 'CNY') {
        this.total = this.$big(Number(this.available)).times(Number(this.btcRates.CNY)).round(2, 0).toFixed(2).toString()
      } else {
        this.total = this.usdtNumber(this.available, item.scale)
      }
    },
    parsetNumber (count, n = 8) {
      return this.$big(Number(count)).round(n, 0).toFixed(n).toString()
    },
    usdtNumber (count, n = 2) {
      return this.$big(Number(count)).times(Number(this.btcRates.USD)).round(n, 0).toFixed(n).toString()
    },
    init () {
      this.available = 0
      this.total = 0
      service.getContractUnitBalanceList({}).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.filter(item => item.currency !== 'METH')
          if (this.tableData) { 
            this.tableData.map(item => {
              if (item.currency !== 'METH') {
                this.available = this.$big(this.available).plus(item.available) 
              }
            })
            this.total = this.$big(this.available).times(this.btcRates.CNY).round(2, 0).toFixed(2)
            
          }
        }
      })
    },
    linkHandle (row, index) {
      if (index === 0) {
        this.$router.push('/fund/transfer')
      }
      console.log(row)
    },
    getRates () {
      service.getRates({currency: 'ETH'}).then((res) => {
        this.btcRates = res.data.ETH
        this.init()
      })
    }
  },
  created () {
    this.getRates()
    this.unit = this.currencyList[0]
    const name = 'udst'
    console.log(name.toUpperCase())
  }
}
</script>
<style lang="scss" scoped>
  @import './contract.scss';
  .popover{
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height:100%;
    .popover-background{
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      width: 100%;
      height:100%;
      z-index: 9
    }
    .balance{
      margin-top: 10px;
      color: #666;
      font-size: 12px;
      .fr{
        float: right;
      }
    }
    .input-label{
      position:relative;
      label{
        position: absolute;
        right: 15px;
        top: 20px;
        color: $primary;
        cursor: pointer;
      }
    }
    select{
      width: 174px;
      display: inline-block;
      height: 35px;
      border: 1px solid #ddd;
      background-color: #fff;
      border-radius: 3px;
      padding-left: 10px;
    }
    .popover-content{
      position: absolute;
      z-index: 10;
      left: 0;
      right: 0;
      top: 20%;
      height: 210px;
      width: 370px;
      background: #fff;
      margin: 0 auto;
      padding:20px;
      .footer{
        display: block;
        text-align: right;
        .popover-qx{
          background: none;
          border:none;
          padding:10px 20px;
        }
        .popover-hz{
          background: $primary;
          color: #fff;
          padding: 7px 15px;
          border:none;
          border-radius: 3px;
        }
      }
      input{
        display: inline-block;
        height: 35px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius: 3px;
        padding-left: 10px;
        margin: 10px 0;
        width: 97%;
      }
      h2{
        font-size: 20px;
        font-weight: bold;
        display: block;
        margin-bottom: 30px;
      }
    }
  }
  .gz-wrapper {
    width: 520px;
    height: 176px;
    background: #F6F1FD;
    border-radius: 4px;
    position: relative;
    text-align: center;
    margin: 30px 0;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 6px;
      background: #A572E9;
      border-radius: 4px;
    }

    span {
      padding: 30px 0;
      font-size: 18px;
      display: block;
      font-weight: 400;
      color: #A572E9;
    }

    h1 {
      font-size: 30px;
      color: #A572E9;
    }
  }
  .card-list {
    @include clearfix;
    .card-detail {
      float: left;
      margin-right: 40px;
      &:nth-child(3),&:nth-child(6),&:nth-child(9) {
        margin-right: 0;
      }
    }
  }
  .fund-history {
      color: #999;
      border-color: #999;
      &.router-link-active {
          color: $primary;
          border-color: $primary;
      }
  }

  .el-select.ddl-small {
    width:100px;
  }
  .link-btn {
    color: $primary;
    display: inline-block;
  }
  .balance {
    font-size: 12px;
    white-space: nowrap;
  }
  .balance-grey {
    color: #666666;
  }

</style>
