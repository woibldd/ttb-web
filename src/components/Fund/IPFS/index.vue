<template>
  <div class="fund-ipfs-container">
    <div class="title">
      <div class="l">
        算力账户
      </div>
      <div class="r">
         <label 
          @click="handleNavChange(1)"
          :class="['tab-nav', {active: activeNav===1}]">
           算力账户
         </label>
         <label 
          @click="handleNavChange(2)"
          :class="['tab-nav', {active: activeNav===2}]">
           订单记录
         </label>
         <label 
          @click="handleNavChange(3)"
          :class="['tab-nav', {active: activeNav===3}]">
           奖励分配
         </label>
      </div>
    </div>
    <div class="line"></div>
    <div class="content" v-if="activeNav===1"> 
      <div class="card"> 
        <div class="gz-wrapper clearfix">
          <span>{{$t('算力余额')}}</span>
          <h1> 
            <b v-if="accountList.length > 0">{{ accountList[0].powerAvailable | fixed(2) }} T</b> 
          </h1> 
        </div> 
      </div>  
      <table class="account mt-30 mb-30">
        <tr>
          <th>币种</th>
          <th>可用</th>
          <th>冻结</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in accountList" :key="index">
          <td>{{item.currency}}</td>
          <td>{{ item.available | fixed(8)}}</td>
          <td>{{item.locking | fixed(8)}}</td>
          <td>
            <a class="ml-10" href="/fund/transfer">资金划转</a>
            <a class="ml-10" href="/fund/deposit">充值</a>
            <a class="ml-10" href="/ipfs">算力购买</a>
          </td>
        </tr>
      </table> 
      <div class="order">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="进行中" name="1"></el-tab-pane>
          <el-tab-pane label="待生效" name="2"></el-tab-pane>
          <el-tab-pane label="生效中" name="3"></el-tab-pane>
          <el-tab-pane label="已结束" name="4"></el-tab-pane>
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
export default {
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
        name: '算力产品',
        amount: '持有算力值',
        createTime: '生效时间',
        state: '状态'
      },
      mapRecords: {
        createTime: '时间',
        recordId: '订单编号',
        product: '产品名称',
        currency: '支付币种',
        total: '支付金额',
        amount: '购买数量',
        state: '状态'
      },
      mapReward: {
        producName: '产品名称',
        type: '奖励类型',
        amount: '奖励额度',
        releaseTime: '发放时间',
      },
      orderState: {
        0: '未开始',
        1: '进行中',
        2: '待生效',
        3: '生效中',
        4: '已结束',
      },
    }
  },
  components: {
    customTable, 
  },
  computed: {
    mapTableColumns() { 
      return Object.keys(this.mapOrders).map(item => {
          return {
            hearderLabel: this.mapOrders[item],
            prop: item,
            handleValue: (value, key) => {
              if (key==='state') {
                return this.orderState[value]
              } 
              else return value ? value : '--'
            }
          } 
        })  
      
    },
    mapTableRecordColumns() { 
      return Object.keys(this.mapRecords).map(item => {
        return {
          hearderLabel: this.mapRecords[item],
          prop: item,
          handleValue: (value, key, row) => {
            if (key==='state') {
              return this.orderState[value]
            } 
            else return value ? value : '--'
          }
        }   
      })
    },
    mapTableRewardColumns() { 
      return Object.keys(this.mapReward).map(item => {
          return {
            hearderLabel: this.mapReward[item],
            prop: item,
            handleValue: (value, key) => { 
              if (key==='state') {
                return this.orderState[value]
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