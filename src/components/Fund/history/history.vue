<template>
  <div class="fund-container fund-history-container">
    <div class="my-fund-content">
      <div class="fund-total">
        <div class="left">
          <div class="total__label">{{ $t('withdraw_avlb') }}</div>
          <div class="total__coin">{{ total | fixed(2) }} {{ unit }} </div>
        </div>
        <el-radio-group  :empty-text="$t('no_data')"
          @change="changeType"
          class="total__switch"
          v-model="type">
          <el-radio-button label="all">{{ $t('teansdasda') }}</el-radio-button>
          <el-radio-button label="deposit">{{ $t('deposit_record') }}</el-radio-button>
          <el-radio-button label="withdraw">{{ $t('withdraw_record') }}</el-radio-button>
          <el-radio-button label="reward"> {{ $t('fund_reward') }} </el-radio-button>
          <el-radio-button label="return"> {{ $t('commission_history_text') }} </el-radio-button>
          <el-radio-button label="byyRecord"> {{ $t('bby_shise1') }} </el-radio-button>
          <el-radio-button
            v-if="isPromoter"
            label="promoter"> {{ $t('promote_brokerage') }} </el-radio-button>
          <el-radio-button
            v-if="hasInternal"
            label="internal"> {{ $t('internal_transfer') }} </el-radio-button>
        </el-radio-group> 
      </div>
      <!-- <div
          class="tital__switch">
        <router-link v-for="(item, index) in routeList" :key="index" :to="{name: item.routeName, params: item.params}">
          {{ $t(item.text)}}
        </router-link>
      </div> -->
      
      <el-table   :empty-text="$t('no_data')"
        :data="tableData"
        v-if="type === 'byyRecord'"
        v-loading="loading"
        cell-class-name="unrelease-cell"
        class="fund-coin-pool"> 
        <el-table-column
          v-for="(hd, idx) in tableHeaders"
          :key="idx"  
          :formatter="byyFormatter"
          :prop="hd.key"
          :label="hd.title">
        </el-table-column> 
      </el-table>
      <el-table :empty-text="$t('no_data')"
        :data="tableData"
        v-else-if="type === 'return'"
        v-loading="loading"
        class="fund-coin-pool">
         <el-table-column
            prop="user_id"
            :label="this.$t('UID')">
            <template slot-scope="scope">
              <div>
                {{scope.row.user_id}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
          prop="inviter_user_id"
            :label="this.$t('fund_history_inviter_userid')"/>
          <el-table-column
          prop="star_lv"
             :label="this.$t('fund_history_star_lv')"/>
          <el-table-column
          prop="currency"
            :label="this.$t('currency')"/>
          <el-table-column
            prop="tran_type"
            :label="this.$t('fund_history_transaction_type')">
            <template slot-scope="scope">
              <div>
                {{ $t(returnTranType[scope.row.tran_type])}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="symbol"
            :label="this.$t('fund_history_symbol')">
            <template slot-scope="scope">
              <div>
                {{ scope.row.tran_type === 1 ? $t("FUTURE_&USD", {currency: scope.row.symbol.replace('USD','')}) : scope.row.symbol}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            :label="this.$t('commission_amount')"/>
          <el-table-column
            prop="create_time"
            :label="this.$t('contract_deal_time')">
            <template slot-scope="scope">
              <div>
                {{ formatTime(scope.row.create_time)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="release_time"
          :label="this.$t('fund_history_release_time')">
            <template slot-scope="scope">
              <div>
                {{ formatTime(scope.row.release_time)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            :label="this.$t('status')">
            <template slot-scope="scope">
              <div>
                {{ $t(returnState[scope.row.state])}}
              </div>
            </template>
          </el-table-column>
      </el-table>
      <el-table  :empty-text="$t('no_data')"
        :data="tableData"
        v-else-if="type === 'all'"
        v-loading="loading"
        cell-class-name="unrelease-cell"
        class="fund-coin-pool">

          <el-table-column
          prop="currency"
          :key="'currency_all'"
          :label="this.$t('transfer_currency')"/>
          <el-table-column
          prop="form"
          :key="'form_all'"
            :label="this.$t('transfer_from_a')"/>
          <el-table-column
          prop="to"
          :key="'to_all'"
             :label="this.$t('transfer_to_a')"/>
          <el-table-column
          prop="amount"
          :key="'amount_all'"
            :label="this.$t('transfer_amount')"/>
          <el-table-column
            prop="available"
          :key="'available_all'"
         :label="this.$t('balance')"/>
          <el-table-column
            width="240"
            prop="create_time"
          :key="'create_time_all'"
               :label="this.$t('transfer_time')"/>
          <el-table-column
            prop="status"
          :key="'status_all'"
          :label="this.$t('status')"/>


      </el-table>
      <el-table   :empty-text="$t('no_data')"
        :data="tableData"
        v-else
        v-loading="loading"
        cell-class-name="unrelease-cell"
        class="fund-coin-pool">

        <el-table-column
          v-for="(hd, idx) in tableHeaders"
          :key="idx"
          :formatter="formatter"
          :prop="hd.key"
          :label="hd.title"/>

        <el-table-column
          header-align='right'
          v-if="type!=='reward' && type !== 'internal' && type !== 'promoter'"
          align="right"
          width="200px"
          :label="status.title">
          <!-- <span>??????/??????</span> -->
          <template slot-scope="scope">
            <span :class="['state', hasComplated(scope.row) && 'complete']">
              {{ $t(getStateLabel(scope.row)) }}
            </span>
          </template>
        </el-table-column>
        <!-- ???????????? -->
        <el-table-column
          header-align='left'
          v-if="type==='reward'"
          align="left"
          width="200px"
          :label="status.title">
          <template slot-scope="scope">
            <div :class="['state complete', unReleased(scope.row) && 'un-release']">
              {{ unReleased(scope.row) ? $t('waiting_for_release') : $t('done') }}
              <icon
                name="question"
                class="pointer"
                v-tooltip.left="{content: getText(scope.row), classes: 'profile'} "
                v-if="unReleased(scope.row)" />
            </div>
          </template>
        </el-table-column>
        <!-- ?????????????????? -->
        <el-table-column
          header-align='right'
          v-if="type==='internal'"
          align="right"
          width="200px"
          :label="internalType.title">
          <template slot-scope="scope">
            <div class="state complete">
              {{ scope.row.type === 2 ? $t('transfer_in') : $t('transfer_out') }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          header-align='right'
          v-if="type!=='reward' && type !== 'internal' && type !== 'promoter'"
          align="right"
          width="200px"
          :label="operate.title" >
          <template slot-scope="scope">
            <div
              class="contact-item"
              v-if="scope.row.txid">
              <icon name="fund-history-copy"/>
              <span
                class="show-address"
                @click="showCXID(scope.row)">{{ $t('view_txid') }}</span>

            </div>
            <el-button class="chexiao" type="text" @click="open(scope.row.id)"><a v-if="scope.row.state==-1|scope.row.state==-100" >{{$t('contract_assign_revert')}}</a></el-button>
            <!-- ???????????? -->
          </template>
        </el-table-column>
      </el-table>
      <div class="history__footer pt-10">
        <ix-pagination
          :page.sync="page"
          :isEnd="isEnd"
          :func="getPage"/>
      </div>
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'
import utils from '@/modules/utils'
import {state} from '@/modules/store'
import ixPagination from '@/components/common/ix-pagination'

/**
 *
 *currency ??????
 *available ?????????
 *ordering ???????????????
 *withdrawing ???????????????
 *quota ????????????????????????
 *max_quota ?????????????????????
 */
export default {
  name: 'MyFund',
  components: {ixPagination},
  data () {
    return {
      header: [],
      headerReward: [],
      headerByy: [],
      headerInternal: [],
      headerPromoter: [],
      status: {key: 'state', title: this.$i18n.t('state')},
      internalType: {key: 'internal', title: this.$i18n.t('order_th_type')},
      operate: {key: 'txid', title: this.$i18n.t('actions')},
      tableData: [],
      total: 0,
      from: 'all',
      type: this.$route.params.from || 'deposit',
      page: 1,
      size: 10,
      unit: 'CNY',
      loading: true,
      hasInternal: false,
      state,
      coinList: {},
      returnState:{
        0:"fund_assets_status_unissued",
        1:"fund_assets_status_issued"
      },
      returnType:{
        1:"fund_assets_type_trading",
        2:"fund_assets_type_Upper",
        3:"fund_assets_type_opening"
      },
      returnTranType:{
        2:"trading",
        1:"contract"
      },
      isEnd: true,
      // routeList: [ 
      //   {
      //     routeName: 'FundHistory',
      //     text: 'teansdasda',
      //     params: {
      //       from: 'all'
      //     }
      //   },
      //   {
      //     routeName: 'FundHistory',
      //     text: 'deposit_record',
      //     params: {
      //       from: 'deposit'
      //     } 
      //   },
      //   {
      //     routeName: 'FundHistory',
      //     text: 'withdraw_record',
      //     params: {
      //       from: 'withdraw'
      //     } 
      //   },
      //   {
      //     routeName: 'FundHistory',
      //     text: 'fund_reward',
      //     params: {
      //       from: 'reward'
      //     } 
      //   },
      //   {
      //     routeName: 'FundHistory',
      //     text: 'commission_history_text',
      //     params: {
      //       from: 'return'
      //     } 
      //   },
      //   {
      //     routeName: 'FundHistory',
      //     text: 'bby_shise1',
      //     params: {
      //       from: 'byyRecord'
      //     } 
      //   }
      // ]
    }
  },
  computed: {
    tableHeaders () {
      switch (this.type) {
        case 'reward':
          return this.headerReward
        case 'internal':
          return this.headerInternal
        case 'promoter':
          return this.headerPromoter
        case 'byyRecord':
          return this.headerByy 
        default:
          return this.header
      }
    },
    isPromoter () {
      if (this.state.userInfo) {
        return this.state.userInfo.promoter
      }
      return false
    }
  },
  async created () { 
    await this.getCoins()
    this.updateHeaderLabel()
    this.getFundHistory(this.type)
    // this.getAccountBalanceList()
    // this.getInternalHistory()
  },
  methods: {
    open(param) {
      this.$confirm(this.$t('fund_assets_withdraw_revoke_tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        service.Cancellationoforders( {id:param}).then(res => {
          if(res.code===0){
            this.getFundHistory(this.type)
            this.$message({
              type: 'success',
              message: this.$t('otc_sidees11'),
            });
          } else {
            this.$message({
              type: 'warning',
              message: `${res.message}`
            })
          }
        })
      })
    },
    // ??????????????????
      //  open() {
      //   this.$confirm('????????????????????????, ?????????????', '??????', {
      //     confirmButtonText: '??????',
      //     cancelButtonText: '??????',
      //     type: 'warning',
      //     center: true
      //   }).then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: '????????????!'
      //     });
      //   })
      // },
    formatter (row, column) {
      if (column.property === 'create_time' ) {
        return utils.dateFormatter(row.create_time)
      } else if (column.property === 'name' && this.type === 'reward') {
        if (row.name === '??????????????????') {
          return this.$t('header_title_contract_competition')
        } else if (row.name === '????????????') {
          return this.$t('fund_history_airdrop')
        } else {
          return row.name
        }
      } else {
        return row[column.property]
      }
    },
    byyFormatter(row, column) { 
      if (column.property === 'createTime' || column.property === 'unlockTime') {
        return utils.dateFormatter(row[column.property])
      } else if (column.property === 'state') { 
        return this.$t(`bazaar.state.${row.state}`)
      } else if (column.property === 'opetate') { 
        if (row.opetate===1) return this.$t('bby_shise7')
        else return this.$t('bby_shise8') 
      } else {
        return row[column.property]
      }
    },
    showCXID (row) {
      //console.log({row,cc: this.coinList})
      if (!!row.txid && !!this.coinList[row.currency + '_' + row.chain]) {
        const url = this.coinList[row.currency + '_' + row.chain].scan_url.replace('${txid}',row.txid)
        window.open(url)
      }
    },
    changeType (type) {
      this.page = 1
      this.getFundHistory(type)
    },
    getPage () {
      this.getFundHistory(this.type)
    },
    formatTime (time) {
      if (!time) {
        return '--'
      }
      return utils.dateFormatter(time, 'Y-M-D H:m')
    },
    hasComplated (row) {
      if (this.type === 'deposit' && row.state === 1) {
        return 1
      }

      if (this.type === 'withdraw') {
        // if (row.state === 4) {
        //   return 1
        // } else if (row.state === 2) {
        //   return 2
        // } else if (row.state === -2) {
        //   return -2
        // }
        return row.state
      }

      return 0
    },
    unReleased (row) {
      return this.type === 'reward' && row.state === 0// 0 ?????????, 1 ?????????
    },
    // async getInternalHistory () {
    //   let res = await service.getInternalHistory({
    //     page: 1,
    //     size: 1
    //   })
    //   if (!res.code && res.data && res.data.length > 0) {
    //     this.hasInternal = true
    //   }
    // },
    getFundHistory (from = 'deposit') {
      this.isEnd = true
      this.loading = true
      let request = ''
      switch (from) {
        case 'deposit':
          request = service.getDepositHistory
          break
        case 'withdraw':
          request = service.getWithdrawHistory
          break
        case 'reward':
          request = service.getRewardHistory
          break
        // case 'internal':
        //   request = service.getInternalHistory
        //   break
        case 'all':
          request = service.getBalanceList
          break
        case 'promoter':
          request = service.getPromoteList
          break
        //??????????????????
        case 'return':
          request = service.nodeReturn
          break
        case 'byyRecord':
          request = service.manageResopetate
          break
        default:
          break
      }
      if (!request) { return }
      const param = {
        page: this.page,
        size: 10
      }
      this.tableData = []
      request(param).then(res => {

        if (res.code || res.data.length === 0) {
          this.loading = false
          this.total = 0
        }
        else { 
          this.tableData = res.data
          if(this.type === 'all' ||  this.type === 'return') {
            this.tableData = res.data.data
            this.tableData.forEach((item) => {
              item.form = this.getBalance(item.from_balance)
              item.to = this.getBalance(item.to_balance)
            })
            let p = res.data
            if (p.total > p.page * p.size) {
              this.isEnd = false
            }
          }  else if (from === 'reward') {
            this.tableData = res.data.data.filter(dr => dr.name.indexOf('????????????') === -1) //IXX??????????????????
            let p = res.data
            if (p.total > p.page * p.size) {
              this.isEnd = false
            }
          } else if (from === 'byyRecord') {
            this.tableData = res.data.data
          }
          else {
            if (this.tableData.length === 10)
              this.isEnd = false
          }
          this.loading = false
          if (this.type === 'all' || from === 'reward') {
            for (let i in this.tableData){
              let text = ''
              let text1 = ''
              switch  (this.tableData[i].opetate ) {
              case 1:
                text=this.$t('trading_account');
                break;
              case 2:
                text=this.$t('contract_account');
                break;
              case 3:
                text=this.$t('day_liquidation');
                break;
              }
              switch  (this.tableData[i].status ) {
              case 0:
                text1=this.$t('transfer_fail');
                break;
              case 1:
                text1=this.$t('transfer_complete');
                break;
              }
              if(text === this.$t('trading_account')){
                this.tableData[i].form = text
                this.tableData[i].to = this.$t('contract_account')
              }
              if(text === this.$t('contract_account')) {
                this.tableData[i].form = this.$t('contract_account')
                this.tableData[i].to = this.$t('trading_account')
              }
              this.tableData[i].available = (this.tableData[i].available*1).toFixed(8)

              this.tableData[i].status = text1
            }
            // console.log(this.ta)
          }  
        }
      })
    },
    getBalance(code) {
      switch (code) {
        case 1:
          return this.$t('wallet_account') 
        case 2:
          return this.$t('trading_account') 
        case 3:
          return this.$t('contract_account') 
        case 4:
          return this.$t('otc_account') 

      }
    },
    // getAccountBalanceList () {
    //   return service.getBalance().then(res => {
    //     this.total = 0
    //     if (!res.code && res.data) {
    //       res.data.map(item => {
    //         item.rates = item.rates || {}
    //         item.locking = this.$big(item.locking || 0).plus(this.$big(item.ordering || 0).plus(this.$big(item.withdrawing || 0)).toString())
    //         item.amount = this.$big(item.locking).plus(this.$big(item.available)).round(4, this.C.ROUND_DOWN).toString()
    //         item.estValue = this.getEstValue(item)
    //         this.total = this.$big(this.total).plus(item.estValue)
    //         return item
    //       })
    //     }
    //   })
    // },
    getText (item) {
      // IX???????????????????????????
      // if (item.type === 7 && item.state === 0) {
      // return this.$t('mine_current_ix_desc')
      // }
      return this.$t('mine_release_at', {time: this.formatTime(item.release_time)})
    },
    getEstValue (item) {
      let res = this.$big(item.amount).times(this.$big(item.rates[this.unit] || 0))
      let num = 4
      if (this.unit === 'USD') {
        num = 8
      }
      return res.round(num, this.C.ROUND_DOWN).toString()
    },
    getStateLabel (row) {
      // let s = this.hasComplated(row)
      let s = row.state
      if (this.type === 'withdraw') {
         switch (s) {
           case -1:
            return 'withdraw_state_unAudited'
          case -100:
            return 'withdraw_state_padding'
          case -2:
            return 'withdraw_state_canceled'
          case 0:
            return 'withdraw_state_audited_unsigned'
          case 1:
            return 'withdraw_state_signed'
          case 2:
            return 'withdraw_state_broadcast_send'
          case 3:
            return 'withdraw_state_broadcast_failed'
          case 4:
            return 'withdraw_state_broadcast_success'
        }
      }
      else {
        switch (s) {
          case -1:
            return 'deposit_state_error'
          case 0:
            return 'pending'
          case 1:
            return 'done'
          // case 2:
          //   return 'broadcasting'
          // case -2:
          //   return 'canceled'
          default:
            return 'pending'
        }
      }
    },
    updateHeaderLabel () {
      this.header = [
        {key: 'create_time', title: this.$i18n.t('time')},
        {key: 'currency', title: this.$i18n.t('currency')},
        {key: 'confirm', title: this.$i18n.t('confirm')},
        // {key: 'chain', title: this.$i18n.t('chain')},
        {key: 'amount', title: this.$i18n.t('amount')} // -fee
      ]
      this.headerReward = [
        {key: 'create_time', title: this.$i18n.t('time')},
        {key: 'currency', title: this.$i18n.t('currency')},
        {key: 'name', title: this.$i18n.t('order_th_type')},
        {key: 'amount', title: this.$i18n.t('amount')} // -fee
      ]
      this.headerByy = [
        {key: 'manageName', title: this.$i18n.t('fund.history.byy.manageName')},
        {key: 'currency', title: this.$i18n.t('currency')},
        {key: 'amount', title: this.$i18n.t('amount')},
        {key: 'moneyDays', title: this.$i18n.t('fund.history.byy.moneyDays')},
        {key: 'income', title: this.$i18n.t('bby_shouy18')},
        {key: 'createTime', title: this.$i18n.t('fund.history.byy.createTime')},
        // {key: 'opetate', title: this.$i18n.t('operation')},
        // {key: 'state', title: this.$i18n.t('status')},
        // {key: 'unlockTime', title: this.$i18n.t('??????????????????')} 
      ]
      this.headerInternal = [
        {key: 'create_time', title: this.$i18n.t('time')},
        {key: 'currency', title: this.$i18n.t('currency')},
        {key: 'amount', title: this.$i18n.t('amount')},
        {key: 'memo', title: this.$i18n.t('note')}
      ]
      this.headerPromoter = [
        {key: 'currency', title: this.$i18n.t('currency')},
        {key: 'amount', title: this.$i18n.t('amount')}
      ]
      this.status = Object.assign({key: 'state', title: this.$i18n.t('state')}) 
      this.operate = Object.assign({key: 'txid', title: this.$i18n.t('actions')})
      this.internalType = Object.assign({key: 'internal', title: this.$i18n.t('order_th_type')})
    },
    async getCoins() {
      let res = await service.getCoins()
      if (!res.code && !!res.data) { 
        res.data.map(item => {
          this.coinList[item.currency + '_' + item.chain] = item
        })
      }
    }

  },
  async beforeRouteEnter(to, from, next) { 
    next();
  },
  watch: {
    'state.locale' (v) {
      // this.getAccountBalanceList()
      this.updateHeaderLabel()
    }
  }
}
</script>
<style lang="scss">
.fund-history-container {
    .fund-total {
        margin-top: 45px;
        margin-bottom: 58px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            display: flex;
        }
    }
    .total__label {
        margin-right: 50px;
    }
    .total__coin {
        color: $primary;
    }
    .coin-rmb {
        display: inline-block;
        color: $text-weak;
    }
    .my-fund-operate {
        color: $primary;
        cursor: pointer;
        margin-left: 21px;
    }
    .state {
       color:  #EBB166;

       &.complete {
            color: #31C78C;
        }

      &.un-release {
        color: #9FA9B7;
      }
    }
    .unrelease-cell .cell{

        overflow: visible !important;
        position: relative !important;
        cursor: default;

        &:hover {
          .popover{
            display: inline-block;
          }
        }

        .popover {
          z-index: 11;
          line-height: 1.2;
          position: absolute;
          padding: 6px 10px;
          box-sizing: border-box;
          display: none;
          font-size: 14px;
          font-weight: 400;
          width: 130px;
          background:rgba(159,169,183,1);
          border-radius:4px;
          color: white;
          left: 50px;
          top: 30px;
          word-break: initial;
        }
    }
    .show-address {
        cursor: pointer;
    }
    .total__switch {
      .el-radio-button__orig-radio,
      .el-radio-button__inner {
      background-color: white !important;
      display: inline-block;
      // width: 80px;
      color: $text-weak !important;
      border: 1px solid $text-weak !important;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      text-align: center;
      border-radius: 15px !important;
      padding: 0 10px;
      box-shadow: none !important;
      margin-left: 10px;
      } 
      .el-radio-button{
          box-shadow: none !important;
      }
      .el-radio-button.is-active {
          .el-radio-button__inner {
              color: $primary !important;
              border: 1px solid $primary !important;
          }
      }
    }
    .tital__switch {
      margin:30px 0;
      text-align: right;
      a {
        display: inline-block;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        border: 1px solid;
        box-sizing: border-box;
        text-align: center;
        border-radius: 15px;
        color: $text-weak;
        margin-left: 10px; 
        &.router-link-active {
          color: $primary;
        }
      }

    }
    .history__footer {
        display: flex;
        justify-content: flex-end;
    }
    .contact-item{
      height: 20px;
      color: #999999 !important;
      &:hover {
         color: $primary-hover !important;
      }
    }
    .my-fund-content {
      .el-table {
        .el-table__header-wrapper {
          .cell {
            word-break: break-word;
          }
        }
      }
    }
}
</style>
