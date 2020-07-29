<template>
  <div class="fund-ipfs-container">
    <div class="title">
      <div class="l">
        {{$tR('calc_account')}}
      </div>
      <div class="r">
         <label 
          @click="handleNavChange(1)"
          :class="['tab-nav', {active: activeNav===1}]">
           {{$tR('calc_account')}}
         </label>
         <label 
          @click="handleNavChange(2)"
          :class="['tab-nav', {active: activeNav===2}]">
           {{$tR('order_record')}}
         </label>
         <label 
          @click="handleNavChange(3)"
          :class="['tab-nav', {active: activeNav===3}]">
           {{$tR('reward_allocation')}}
         </label>
      </div>
    </div>
    <div class="line"></div>
    <div class="content" v-if="activeNav===1"> 
      <div class="card"> 
        <div class="gz-wrapper clearfix">
          <span>{{$tR('calc_balance')}}</span>
          <h1> 
            <b v-if="accountList.length > 0">{{ accountList[0].powerAvailable | fixed(2) }} T</b> 
          </h1> 
        </div> 
      </div>  
      <table class="account mt-30 mb-30">
        <tr>
          <th>{{$t('currency')}}</th>
          <th>{{$t('avlb')}}</th>
          <th>{{$t('asset_th_unavlb')}}</th>
          <th>{{$t('operation')}}</th>
        </tr>
        <tr v-for="(item, index) in accountList" :key="index">
          <td>{{item.currency}}</td>
          <td>{{ item.available | fixed(8)}}</td>
          <td>{{item.locking | fixed(8)}}</td>
          <td>
            <a class="ml-10" href="/fund/transfer">{{$t('account_exchange')}}</a>
            <a class="ml-10" href="/fund/deposit">{{$t('bby_shouy15')}}</a>
            <a class="ml-10" href="/ipfs">{{$tR('buy_computational')}}</a>
          </td>
        </tr>
      </table> 
      <div class="order">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="$tR('all')" name="0"></el-tab-pane>
          <el-tab-pane :label="$tR('processing')" name="1"></el-tab-pane>
          <el-tab-pane :label="$tR('pending')" name="2"></el-tab-pane>
          <el-tab-pane :label="$tR('in_effect')" name="3"></el-tab-pane>
          <el-tab-pane :label="$tR('ended')" name="4"></el-tab-pane>
        </el-tabs> 
        <custom-table v-loading="loading"
          stripe
          :table-list="productShowList"
          :table-columns="mapTableColumns"
          @change="handlePageChange" /> 
      </div> 
    </div>
    <div class="content mt-30" v-else> 
      <custom-table  v-if="activeNav===2" v-loading="loading"
        stripe
        :table-list="tableRecordList"
        :table-columns="mapTableRecordColumns"
        @change="handlePageChange" /> 

      
      <custom-table v-if="activeNav===3" v-loading="loading"
        stripe
        :table-list="tableRewardList"
        :table-columns="mapTableRewardColumns"
        @change="handlePageChange" /> 
    </div>
  </div>
</template>

<script>
import customTable from '@/components/customTable'
import api from '@/modules/api/ipfs'
import mixin from '@/mixins/index'
import utils from '@/modules/utils'
export default {
  name: 'mining_power',
  data() {
    return {
      activeNav: 1,
      activeName: '0', 
      productList: [],
      tableRecordList: [],
      tableRewardList: [],
      accountList: [],
      total: 0,
      loading: false,
      temPageConfig: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      mapOrders: {
        name: 'calc_product',
        amount: 'hold_calc',
        createTime: 'effective_time',
        state: 'state'
      },
      mapRecords: {
        createTime: 'time',
        recordId: 'order_nunber',
        product: 'product_name',
        currency: 'pay_currency',
        total: 'pay_amount',
        amount: 'buy_qty',
        state: 'state'
      },
      mapReward: {
        producName: 'product_name',
        type: 'reward_type',
        amount: 'reward_quota',
        releaseTime: 'release_time',
      },
      orderState: {
        0: 'not_start',
        1: 'processing',
        2: 'pending',
        3: 'in_effect',
        4: 'ended',
        5: 'expired'
      },
    }
  },
  mixins: [mixin],
  components: {
    customTable, 
  },
  computed: {
    mapTableColumns() { 
      return Object.keys(this.mapOrders).map(item => {
          return {
            hearderLabel: this.$tR(this.mapOrders[item]),
            prop: item,
            handleValue: (value, key) => {
              if (key==='state') {
                return this.$tR(this.orderState[value])
              } else if (key==='createTime') {
                return !value ? '--' : utils.dateFormatter(value, 'Y-M-D H:m')
              }
              else return value ? value : '--'
            }
          } 
        })  
      
    },
    mapTableRecordColumns() { 
      return Object.keys(this.mapRecords).map(item => {
        return {
          hearderLabel: this.$tR(this.mapRecords[item]),
          prop: item,
          handleValue: (value, key, row) => {
            if (key==='state') {
              return this.$tR(this.orderState[value])
            } else if (key==='createTime') {
              return utils.dateFormatter(value, 'Y-M-D H:m')
            }
            else return value ? value : '--'
          }
        }   
      })
    },
    mapTableRewardColumns() { 
      return Object.keys(this.mapReward).map(item => {
          return {
            hearderLabel: this.$tR(this.mapReward[item]),
            prop: item,
            handleValue: (value, key) => { 
              if (key==='state') {
                return this.$tR(this.orderState[value])
              } else if (key==='releaseTime') {
                return !value ? '--' : utils.dateFormatter(value, 'Y-M-D H:m')
              }
              else return value ? value : '--'
            }
          } 
        }) 
    },
    productShowList() {
      return this.productList.filter(item => 
        this.activeName === '0' || this.activeName == item.state
      )
    }
  },
  methods: { 
    handleNavChange(e) {
      this.temPageConfig = {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
      this.activeName = '0'
      this.activeNav = e
      this.handlePageChange()
    },
    handlePageChange (pageConfig) {
      this.temPageConfig = pageConfig || this.temPageConfig 
      const { pageSize, currentPage } = this.temPageConfig
      // this.loading = true 
      // getHistory({ user_id: this.id, page: currentPage, size: pageSize, currency }).then(res => {
      //   this.productList = res.data.data
      //   this.temPageConfig.total = res.data.total
      //   this.loading = false
      // })
      //算力账户
      if (this.activeNav === 1) {
        api.getPowerBalanceList().then(res => {
          if (res && !res.code) {
            this.accountList = res.data
          }
        })
        api.getPowerProductList().then(res => {
          if (res && !res.code) {
            this.productList = res.data
          }
        })
      }
      //订单记录
      else if (this.activeNav === 2) {
        api.getPowerList({page: currentPage, size: pageSize}).then(res => {
          if (res && !res.code) {
            this.tableRecordList = res.data.data
          }
        })
      }
      //奖励分配
      else if (this.activeNav === 3) {
        api.getPowerCandyList({page: currentPage, size: pageSize}).then(res => {
          if (res && !res.code) {
            this.tableRewardList = res.data.data
          }
        })
      }

    }
  },
  created() {
    this.handlePageChange()
  }
}
</script>

<style lang="scss">
.fund-ipfs-container {
  .line {
    height: 1px;
    background-color: #cccccc;
  }
  .title {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .l { 
      font-size: 18px;
      font-weight: 600;
      color: #333333;
    }
    .r {
      label {
        padding: 5px 10px;
        margin-left: 20px;
        font-size: 14px;
        font-weight: 600;
        color: #9C9C9C;
        border: 1px solid;
        border-radius: 22px;
        &.active {
          color: $primary;
        }
      }
    }
  }
  .content {
    .gz-wrapper {
      width: 520px;
      height: 176px;
      background: #FCF4EE;
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
        background: #FB9246;
        border-radius: 4px;
      }

      span {
        padding: 30px 0;
        font-size: 18px;
        display: block;
        font-weight: 400;
        color: #FB9246;
      }

      h1 {
        font-size: 30px;
        color: #FB9246;
      }
    }
    table.account {
      width: 100%;
      border: 1px solid #D4D4D4;
      border-radius: 3px;
      color: #999999;
      th {
        height: 46px;
        line-height: 46px;
        border-bottom: 1px solid #ccc;
        width: 22%;
        &:nth-child(4) {
          width: 34%;
        }
      }
      td {
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #ccc;
        text-align: center;
      }
    }
  }
}
</style>