<template>
  <div class="ipfs-details-container">
    <div class="top">
      <div class="l">
        <div class="title"> 
            <img style="height: 82px; width: 82px;" :src="current.productImg" alt="">
            <b v-if="state.locale==='zh-CN'"> {{current.product}} </b>
            <b v-else-if="state.locale==='zh-HK'"> {{current.productCt}} </b>
            <b v-else-if="state.locale==='ko'"> {{current.productKn}} </b>
            <b v-else> {{current.productEn}} </b>
        </div>
        <div class="m">
          <table>
            <tr>
              <th>{{$tR('estimated_rate')}}</th>
              <th>{{$tR('total_calc')}}</th>
              <th>{{$tR('calc_price')}}</th>
              <th>{{$tR('max_buy_qty')}}</th> 
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
              <th style="width: 15%;">{{$tR('term')}}</th>
              <th style="width: 15%;">{{$tR('output_token')}}</th>
              <th style="width: 15%;">{{$tR('maintainance_fee')}}</th>
              <th>{{$tR('start_and_end')}}</th>
              <th style="width: 18%;">{{$tR('estimated_time')}}</th> 
            </tr>
            <tr>
              <td>{{current.moneyDays}} {{$tR('days')}}</td>
              <td>{{current.token}}</td>
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
            <i>{{$tR('schedule')}}</i> 
            <i>{{$tR('buy_calc')}}</i>
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
          <span>{{$tR('buy_value')}}  {{`${ $big(amount || 0).times(current.price || 0)} ${current.currency}`}} </span>

        </div>
        <div class="mb-16" style="display: flex;justify-content: space-between;"> 
          <span> {{ `${$t('available_balance')} ${balance.available || ''} ${balance.currency || ''}` }}</span>
          <span>
            <a href="/fund/transfer">{{$t('account_exchange')}}</a>
          </span>
        </div>
        <!-- <div class="mb-16">
          <el-checkbox v-model="ready">我已阅读并同意：</el-checkbox>
          <label>算力合同</label>
        </div> -->
        <div class="mt-30">
          <el-button  :type="current.state === 1 ? 'primary' : 'info'" :disabled="current.state!==1" style="width: 100%;" @click="handleBuyClick">{{$tR('buy_now')}}</el-button>
        </div> 
      </div>
    </div>
    <div class="content">
      <div class="box">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane :label="$tR('product_description')" name="first">
            <p v-if="state.locale==='zh-CN'" v-html="current.productInfo"></p>
            <p v-else-if="state.locale==='zh-HK'" v-html="current.productInfoCt"></p>
            <p v-else-if="state.locale==='ko'" v-html="current.productInfoKn"></p>
            <p v-else v-html="current.productInfoEn"></p> 
          </el-tab-pane>
          <el-tab-pane :label="$tR('project_img')" name="second">
            <img :src="current.productImg" alt="">
          </el-tab-pane> 
        </el-tabs> 
      </div>
    </div>
  </div>
</template>

<script>
import {local, state} from '@/modules/store'
import utils from '@/modules/utils' 
import api from '@/modules/api/ipfs'
import mixin from '@/mixins/index'
export default {
  name: 'mining_power',
  data() {
    return {
      state,
      utils,
      amount: 0, 
      activeName: "first",
      current: {},
      ready: true,
      value: 0,
      balance: {}
    }
  },
  mixins: [mixin],
  computed: { 
    isLogin() {
      return state.userInfo !== null
    }
  },
  methods: {
    handleChange() {

    },
    async handleBuyClick() { 
      if (!this.isLogin) {
        this.$router.push({name:'login'})
        return
      } 
      const isok = await this.$confirm(`您确认用${this.$big(this.amount || 0).times(this.current.price || 0) }${this.current.currency}购买${this.amount}（T）算力？`, {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
      if (isok) {
        api.createPowerBuy({amount: this.amount, manage_id: this.current.manageId}).then(res => {
          if (res && !res.code) {
            this.$message.success('购买成功！')
            this.init()
          } else {
            this.$message.error(res.message)
          }
        }) 
      }
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
