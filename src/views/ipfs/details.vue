<template>
  <div class="ipfs-details-container">
    <div class="top">
      <div class="l">
        <div class="title">
            <img src="./assets/product.png" alt="">
            <b>
              算力云IPFS云算力抢购邀请专场
            </b>
        </div>
        <div class="m">
          <table>
            <tr>
              <th>预计回报率</th>
              <th>算力总发值</th>
              <th>算力价格</th>
              <th>最大购买总数量</th> 
            </tr>
            <tr>
              <td>{{current.annualizedReturns}}%</td>
              <td>{{current.total}} T</td>
              <td>{{current.price}} {{current.currency}}/T</td>
              <td>{{current.maxLimit}} T</td> 
            </tr>
          </table> 
        </div>
        <div class="line"></div>
        <div class="b">
          <table>
            <tr>
              <th style="width: 15%;">期限</th>
              <th style="width: 15%;">产出TOKEN</th>
              <th style="width: 15%;">维护费用</th>
              <th>开始结束时间</th>
              <th style="width: 18%;">预计生效时间</th> 
            </tr>
            <tr>
              <td>{{current.moneyDays}}天</td>
              <td>IPFS</td>
              <td>{{current.maintainanceFee}}%</td> 
              <td>{{`${ utils.dateFormatter(current.beginTime, 'Y-M-D H:m')}~${utils.dateFormatter(current.endTime, 'Y-M-D H:m')}`}}</td>
              <td> 
                <span v-if="current.unlockTime">{{ current.unlockTime | date }}</span>
                <span v-else>--</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="r">
        <div class="progress mb-28">
          <div class="between">
            <i>进度</i> 
            <i>可购买算力值</i>
          </div>
          <el-progress class="mt-5 mb-5" :percentage="$big(current.lockedAmount || 0).times(100).div(current.total || 1).round(2)" :show-text="false"></el-progress>
          <div class="between">
            <span>{{$big(current.lockedAmount || 0).times(100).div(current.total || 1).round(2)}}%</span> 
          </div>
        </div>
        <div class="input mb-23 relative">
          <el-input-number  style="width:100%;" v-model="amount" @change="handleChange" :step="1"  label="T"> 
          </el-input-number>
          <span class="append">T</span>
        </div>
        <div class="mb-19">
          <span>购买价值  {{`${ $big(amount || 0).times(current.price || 0)} ${current.currency}`}} </span>

        </div>
        <div class="mb-16" style="display: flex;justify-content: space-between;"> 
          <span> {{ `可用余额 ${balance.available} ${balance.currency}` }}</span>
          <span>
            <a href="/fund/transfer">资金划转</a>
          </span>
        </div>
        <!-- <div class="mb-16">
          <el-checkbox v-model="ready">我已阅读并同意：</el-checkbox>
          <label>算力合同</label>
        </div> -->
        <div class="mt-30">
          <el-button  :type="current.state === 1 ? 'primary' : 'info'" :disabled="current.state!==1" style="width: 100%;" @click="handleBuyClick">立即购买</el-button>
        </div> 
      </div>
    </div>
    <div class="content">
      <div class="box">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="产品说明" name="first">
            <p v-html="current.productInfo"></p>
          </el-tab-pane>
          <el-tab-pane label="项目图片" name="second">
            <img :src="current.productImg" alt="">
          </el-tab-pane> 
        </el-tabs> 
      </div>
    </div>
  </div>
</template>

<script>
import {local} from '@/modules/store'
import utils from '@/modules/utils'
import {state} from '@/modules/store'
import api from '@/modules/api/ipfs'
export default {
  data() {
    return {
      utils,
      amount: 0, 
      activeName: "first",
      current: {},
      ready: true,
      value: 0,
      balance: {}
    }
  },
  computed: { 
    isLogin() {
      return state.userInfo !== null
    }
  },
  methods: {
    handleChange() {

    },
    handleBuyClick() { 
      if (!this.isLogin) {
        this.$router.push({name:'login'})
        return
      } 
      api.createPowerBuy({amount: this.amount, manage_id: this.current.manageId}).then(res => {
        if (res && !res.code) {
          this.$message.success('购买成功！')
          this.init()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    init() {
      const manage_id = this.$route.query.manage
      if (manage_id)  {
        api.getProductByManageID({manage_id}).then(res => {
          if (res && !res.code) {
            this.current = res.data
            this.amount = this.current.minLimit

            api.getPowerBalanceByPair({currency: this.current.currency}).then(result => {
              if (result && !result.code) {
                this.balance = result.data
              }
            })
          }
        })
      }
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss">
.ipfs-details-container {
  .top {
    display:flex;
    width: 1200px;
    margin: 47px auto 0;
    box-shadow: 0px 0px 16px 0px rgba(221,221,221,0.78); 
    height: 329px;
    .l { 
      flex: 1;
      padding: 32px 42px; 
      .title {
        b {
          vertical-align: top;
          font-size: 20px; 
          margin-left: 20px;
        }
      }
      .line {
        height: 1px;
        background: #e5e5e5;
      }
      table {
        margin: 30px 15px 22px;
        width: 100%; 
        text-align: left;
        font-size: 12px;
        th {
          font-weight: 400;    
          padding-bottom: 1em;
          color: #565656;
        }
      }
      .m {
        tr {
          td {
            width: 25%;
            color: $primary;
            font-size: 16px;
            font-weight: Bold;
          }
        }
      }
    }
    .r { 
      padding: 32px 42px;
      width: 322px;
      background-color: #FAFAFA;
      .progress {
        .between {
          display: flex;
          justify-content: space-between;
          i {
            color: #999999;
          }
        }
      }
      .el-checkbox {
        margin-right: 0;
      }
      .relative {
        position: relative;
        .append {
          position: absolute;
          top: 13px;
          right: 132px;
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
  .content {
    width: 1200px;
    margin: 25px auto; 
    .box { 
      padding: 37px 51px;
      min-height: 900px;
      box-shadow: 0px 0px 16px 0px rgba(221,221,221,0.78); 
      .tabs {
        font-size: 16px;
      }
      .describe {
        font-size: 12px; 
      }
    }
  }
 
  .el-progress-bar__inner {
    background-color: $primary;
  }
}
</style>
