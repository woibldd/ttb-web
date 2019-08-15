<template>
  <div clsss="my-order">
    <p class="Title">
      <icon name="js" style="color: #999999 ;"/>我的订单/委托单
    </p>
    <div class="information">
      <!-- 1 -->
      <ul class="information-a">
        <li class="head">
          <icon class="touxiang" name="rentou"/>
        </li>
        <li class="User-name">{{ tableData.name }}</li>
        <li class="User-Grade">{{ tableData.kyc_level }}</li>
        <li class="User-Grades">认证等级</li>
        <li class="User-number">UID：{{ tableData.id }}</li>
        <li class="User-time">注册时间 {{ tableData.register_time | date }}</li>
      </ul>
      <!-- 2 -->
      <ul class="information-b">
        <li class="User-transaction">
          交易总额(CNY)
          <span class="User-transaction-a">{{ tableData.orders_total }}</span>
        </li>
        <li class="User-MeanTime">
          平均付款时间
          <span class="User-MeanTime-a">{{ tableData.pay_time_avg }}</span>
        </li>
        <li class="User-TextPrompt">平均付款时间、平均放币时间每日24:00更新</li>
      </ul>
      <!-- 3 -->
      <ul class="information-c">
        <li class="User-Total">
          总单数
          <span class="res">{{ tableData.orders_total }}</span>
        </li>
        <li class="User-Completionrate">
          完成率
          <span class="ree">{{ tableData.orders_rate }}</span>
        </li>
        <li class="User-CoinTimes">
          平均放币时间
          <span class="rea">{{ tableData.issue_time_avg }}</span>
        </li>
      </ul>
    </div>

    <!-- //按钮 -->
    <ul class="Button">
      <li :class="{'active': state===0}" class="ButtonSwitch" @click="b()">未完成订单</li>
      <li :class="{'active': state===1}" class="ButtonSwitch" @click="c()">已完成订单</li>
      <li :class="{'active': state===2}" class="ButtonSwitch" @click="d()">已取消订单</li>
      <li :class="{'active': state===3}" class="ButtonSwitch" @click="e()">我的委托单</li>
      <li class="TimeSequencing">时间</li>
    </ul>
    <p class="FriendshipTips">
      <span class="FriendshipTips-a">
        <icon class="FriendshipTips-a-a" name="tt"/>线下转账时请使用实时到账的支付方式。选择支付宝转银行卡、延时到账等方式造成2小时内未到账，卖家有权延迟放币或取消订单！
      </span>
    </p>

    <!-- 未完成 -->
    <div v-if="state===0" class="undone-order">
      <div v-for="(item, index) in unDoneOrder" :key="index">
        <Hoc :aver="item" @detail-list="toDetailsTran(item)"/>
      </div>
    </div>
    <!-- 已完成/已取消 -->
    <div v-if="state===1 || state===2" class="done-order">
      <el-table :data="doneOrder" style="width:100%">
        <el-table-column prop="trans_id" label="订单号"/>
        <el-table-column prop="side" label="类型">
          <template slot-scope="scope">
            <div v-html="processValue('side', scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <div v-html="processValue('transaction_state', scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="symbol" label="币对">
          <template slot-scope="scope">
            <div>{{ scope.row.symbol }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">
            <div>{{ scope.row.price }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="数量"/>
        <el-table-column prop="total" label="金额">
          <template slot-scope="scope">
            <div>
              {{ scope.row.total }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="scope">
            <div>{{ scope.row.create_time | date('Y-M-D') }}</div>
          </template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <v-btn
              class="td"
              style="width:50px"
              height="30"
              radius="15"
              label="详情"
              @click="toDetailsTran(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 我的委托单 -->
    <div v-if="state ===3" class="my-order">
      <el-table :data="myOrder" style="width:100%">
        <el-table-column prop="active_id" label="委托单号"/>
        <el-table-column prop="side" label="类型">
          <template slot-scope="scope">
            <div v-html="processValue('side', scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="委托单价"/>
        <el-table-column width="180" label="委托数量/成交数量">
          <template slot-scope="scope">
            <div>{{ scope.row.amount +'/'+ scope.row.executed }}</div>
          </template>
        </el-table-column>
        <el-table-column width="180" label="委托金额/成交金额">
          <template slot-scope="scope">
            <div>{{ scope.row.total +'/'+ (scope.row.executed * scope.row.price).toFiexd(2) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="状态">
          <template slot-scope="scope">
            <div v-html="processValue('order_state', scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" width="120" label="发布时间">
          <template slot-scope="scope">
            <div>{{ scope.row.create_time | date('Y-M-D H:m') }}</div>
          </template>
        </el-table-column>
        <el-table-column width="130" label="操作">
          <template slot-scope="scope">
            <div class="row">
              <v-btn
                class="td"
                style="width:50px"
                height="30"
                radius="15"
                label="详情"
                @click="toDetailsOrder(scope.row.active_id)"/>
              <v-btn
                v-if="scope.row.state === 1"
                class="td"
                style="width:50px"
                height="30"
                radius="15"
                label="撤销"
                @click="toRevokeOrder(scope.row.active_id)"/>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <side-bar :open.sync="showSide">
      <step-alert :step-info="stepInfo" :step-type="stepType" @success-change="successChange" />
    </side-bar>
  </div>
</template>

<script>
import Hoc from '@/components/Hoc'
import StepAlert from '@/components/StepAlert'
import service from '@/modules/service'
// import utils from "@/modules/utils.js";
import sideBar from '@/components/VSideBar'
import processValue from '@/mixins/process-otc-value'

export default {
  name: 'Hir',
  components: {
    Hoc,
    sideBar,
    StepAlert
  },
  mixins: [processValue],
  data() {
    return {
      showSide: false,
      state: 0,
      tableData: [],
      aver: [],
      unDoneOrder: [],
      doneOrder: [],
      myOrder: [],
      stepInfo: {},
      stepType: 1
    }
  },
  async created() {
    this.getOrderz()
    this.getour(0)
  },
  methods: {
    b() {
      this.getour(0)
    },
    c() {
      this.getour(1)
    },
    d() {
      this.getour(2)
    },
    e() {
      this.getour(3)
    },
    getOrderz() {
      const params = {
        user_id: null
      }
      service.getOtcUserinfo(params).then(res => {
        if (!res.code) {
          const $this = this
          $this.tableData = res.data
        }
      })
    },
    async getour(state) {
      this.state = state
      const params = {
        page: 1,
        size: 10,
        side: 0
      }
      this.dataTable = []

      const $this = this
      if (state === 0) {
        // 未完成
        const rec = await service.getUnDonefills(params)
        if (!rec.code) {
          $this.unDoneOrder = rec.data.data
        }
      } else if (state === 1) {
        // 已完成
        const rec = await service.getDonefills(params)
        if (!rec.code) {
          $this.doneOrder = rec.data.data
        }
      } else if (state === 2) {
        // 已取消
        const rec = await service.getOtcRemovefills(params)
        if (!rec.code) {
          $this.doneOrder = rec.data.data
        }
      } else if (state === 3) {
        // 我的委托单
        const res = await service.getOtcActivefills(params)
        if (!res.code) {
          $this.myOrder = res.data.data
        }
      }
    },
    // 委托单详情
    successChange() {
      this.getour(0)
      this.showSide = false
    },
    toDetailsOrder(active_id) {},
    // 撤销委托单
    toRevokeOrder(active_id) {
      service
        .otcOrderRemove({
          type: 1,
          trans_id: active_id
        })
        .then(res => {
          if (!res.code) {
            console.log('撤销成功')
            this.getour(this.state)
          }
          return res
        })
        .then(res => {
          if (res.code) {
            console.log(res.code + ':' + res.message)
          }
        })
    },
    // 成交详情
    toDetailsTran(item) {
      this.stepType = item.side
      this.showSide = true
      this.stepInfo = item
    },
    // 撤销成交
    toRevokeTran(trans_id) {
      service
        .otcOrderRemove({
          type: 2,
          trans_id
        })
        .then(res => {
          if (!res.code) {
            console.log('撤销成功')
            this.getour(this.state)
          }
          return res
        })
        .then(res => {
          if (res.code) {
            console.log(res.code + ':' + res.message)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  @include clearfix();
  .td {
    float: left;
    &:first-child {
      margin-right: 5px;
    }
  }
}
.font-color-buy {
  color: $otc-buy-bg !important;
}
.font-color-sell {
  color: $otc-sell-bg !important;
}
</style>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

div ul {
  float: left;
  margin-top: 20px;
  height: 85px;
}
.my-order {
  width: 926px;
}
.Title {
  height: 24px;
  font-size: 24px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 19px;
}
.information {
  width: 926px;
  height: 138px;
  background: rgba(245, 247, 250, 1);
  border-radius: 6px;

  // 1
  .information-a {
    margin-left: 15px;
    width: 215px;
    height: 85px;
    .head {
      float: left;
      .touxiang {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .User-name {
      float: left;
      height: 11px;
      font-size: 14px;
      font-family: Helvetica-Bold;
      font-weight: bold;
      color: rgba(57, 61, 77, 1);
      margin-left: 8px;
    }
    .User-Grade {
      float: left;
      width: 14px;
      height: 14px;
      background: rgba(245, 166, 35, 1);
      border-radius: 3px;
      margin-left: 5px;
      margin-right: 15px;
    }
    .User-Grades {
      float: left;
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .User-number {
      height: 11px;
      font-size: 14px;
      font-family: Helvetica;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-left: 48px;
      margin-top: 25px;
    }
    .User-time {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 25px;
    }
  }

  // 2
  .information-b {
    width: 275px;
    margin-left: 5px;
    .User-transaction {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      .User-transaction-a {
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-left: 18px;
      }
    }
    .User-MeanTime {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-top: 15px;
      .User-MeanTime-a {
        margin-left: 30px;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
    .User-TextPrompt {
      margin-top: 18px;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }

  // 3
  .information-c {
    margin-left: 5px;
    .User-Total {
      float: left;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      .res {
        margin-left: 25px;
        height: 12px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
    .User-Completionrate {
      float: left;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-left: 110px;
      .ree {
        margin-left: 17px;
        height: 12px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
    .User-CoinTimes {
      margin-top: 30px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      .rea {
        margin-left: 17px;
        height: 13px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
// 按钮
.Button {
  width: 926px;
  height: 54px;
  .ButtonSwitch {
    float: left;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(177, 177, 177, 1);
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .ButtonSwitch:hover,
  .ButtonSwitch.active {
    background: $text-link;
    border-radius: 15px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
  .TimeSequencing {
    width: 50px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(177, 177, 177, 1);
    float: right;
  }
}
.FriendshipTips {
  width: 926px;
  height: 40px;
  background: rgba(249, 246, 240, 1);
  overflow: hidden;
  margin-bottom: 25px;
  .FriendshipTips-a {
    display: inline-block;
    width: 811px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 40px;
    overflow: hidden;
    .FriendshipTips-a-a {
      width: 14px;
      height: 14px;
      margin-left: 10px;
      margin-right: 5px;
    }
  }
}
</style>

