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
            0.00T
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
            <a class="ml-10" href="">资金划转</a>
            <a class="ml-10" href="">充值</a>
            <a class="ml-10" href="">算力购买</a>
          </td>
        </tr>
      </table> 
      <div class="order">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="进行中" name="second"></el-tab-pane>
          <el-tab-pane label="待生效" name="third"></el-tab-pane>
          <el-tab-pane label="生效中" name="fourth"></el-tab-pane>
          <el-tab-pane label="已结束" name="fifth"></el-tab-pane>
        </el-tabs> 
        <custom-table v-loading="loading"
          stripe
          :table-list="tableList"
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
export default {
  data() {
    return {
      activeNav: 1,
      activeName: 'first', 
      tableList: [
        { 
          name: 'FIL算力第一期',
          holding: '0.1     ',
          date: '2018-08-22,15:30:22',
          state: '待生效'
        },
        { 
          name: 'FIL算力第一期',
          holding: '0.1     ',
          date: '2018-08-22,15:30:22',
          state: '待生效'
        },
        { 
          name: 'FIL算力第一期',
          holding: '0.1     ',
          date: '2018-08-22,15:30:22',
          state: '待生效'
        },
      ],
      tableRecordList: [
        { 
          createTime: '2018-08-22,15:30:22',
          orderId: '100001121',
          name: 'FIL算力第一期',
          currency: 'USDT',
          total: '3774.23',
          amount: '1T',
          state: '完成'
        },
        { 
          createTime: '2018-08-22,15:30:22',
          orderId: '100001121',
          name: 'FIL算力第一期',
          currency: 'USDT',
          total: '3774.23',
          amount: '1T',
          state: '完成'
        },
        { 
          createTime: '2018-08-22,15:30:22',
          orderId: '100001121',
          name: 'FIL算力第一期',
          currency: 'USDT',
          total: '3774.23',
          amount: '1T',
          state: '完成'
        },
      ],
      tableRewardList: [
        {
          name: 'Filecoin分时算力 第二期',
          type: '邀请奖励',
          amount: '0.22 T',
          time: '2018-08-22,15:30:22',
        },
        {
          name: 'Filecoin分时算力 第二期',
          type: '邀请奖励',
          amount: '0.22 T',
          time: '2018-08-22,15:30:22',
        },
        {
          name: 'Filecoin分时算力 第二期',
          type: '邀请奖励',
          amount: '0.22 T',
          time: '2018-08-22,15:30:22',
        }
      ],
      accountList: [
        {
          currency: 'BTC',
          available: 0,
          locking: 0
        },
        {
          currency: 'USDT',
          available: 0,
          locking: 0
        },
        {
          currency: 'ETH',
          available: 0,
          locking: 0
        },
        {
          currency: 'EOS',
          available: 0,
          locking: 0
        },
      ],
      total: 0,
      loading: false,
      temPageConfig: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      mapOrders: {
        name: '算力产品',
        holding: '持有算力值',
        date: '生效时间',
        state: '状态'
      },
      mapRecords: {
        createTime: '时间',
        orderId: '订单编号',
        name: '产品名称',
        currency: '支付币种',
        total: '支付金额',
        amount: '购买数量',
        state: '状态'
      },
      mapReward: {
        name: '产品名称',
        type: '奖励类型',
        amount: '奖励额度',
        time: '发放时间',
      }

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
              return value ? value : '--'
            }
          } 
        })  
      
    },
    mapTableRecordColumns() { 
      return Object.keys(this.mapRecords).map(item => {
        return {
          hearderLabel: this.mapRecords[item],
          prop: item,
          handleValue: (value, key) => {
            return value ? value : '--'
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
              return value ? value : '--'
            }
          } 
        }) 
    }    
  },
  methods: { 
    handleNavChange(e) {
      this.temPageConfig = {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
      this.activeName = 'first'
      this.activeNav = e
      this.handlePageChange()
    },
    handlePageChange (pageConfig) {
      this.temPageConfig = pageConfig || this.temPageConfig 
      const { pageSize, currentPage } = this.temPageConfig
      // this.loading = true 
      // getHistory({ user_id: this.id, page: currentPage, size: pageSize, currency }).then(res => {
      //   this.tableList = res.data.data
      //   this.temPageConfig.total = res.data.total
      //   this.loading = false
      // })
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