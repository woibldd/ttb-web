<template>
  <div class="history-container">
    <div class="ix-pannel">
      <div class="tab">
        <div class="tab__header ix-header">
          <div class="tab__nav flex-lr">
            <div
              class="tab__title pointer"
              @click="switchTab(tab)"
              :class="{active: tab.name === current}"
              v-for="tab in nav"
              :key="tab.name"
              >
              <span>{{ $t(tab.name) }}</span>
              <span v-if="tab.dataCount && isLogin" class="ml-3">[ {{ tab.dataCount }} ]</span>
              <i
                class="iconfont strong pointer ml-8"
                v-tooltip.top-center="{html: true, content: $t(tab.tips), classes: 'contract'}"
                v-if="tab.tips"
              />
            </div>
          </div>
          <div
            class="tab__button pointer"
            @click.prevent="(currentTab.rightButtonClick || rightButtonClick) (currentTab)"
            v-if="currentTab.rightButtonText"
          >{{ $t(currentTab.rightButtonText) }}</div>
        </div>
        <div class="tab__body relative">
          <div
            class="contract__history__table-loading"
            v-if="tabLoading"
            v-loading="tabLoading"
            element-loading-background="transparent"
          />
          <div
            v-if="!tabLoading"
            class="tab__content"
            :loading="loading"
            :is="'historyTable'"
            :key="currentTab.name"
            :name="currentTab.name"
            :table-data="tableData"
            :active-list="activeList"
            :headers="currentTab.headers"
            @loadMore="loadNext"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import historyTable from './history/history_table'
import service from '@/modules/service'
import {state, actions} from '@/modules/store'
import utils from '@/modules/utils'

export default {
  data () {
    return {
      state,
      tableData: {},
      loading: false,
      tabLoading: false, // 切换tab的loading
      page: 1, // page 都是从1 开始的,
      size: 10,
      totalItems: 0,
      timer: 0,
      userSetting:{},
      current: 'contract_history_position',
      nav: [
        // 仓位
        {
          name: 'contract_history_position',
          dataCount: 0,
          headers: [
            {
              title: 'contract_history_postion_header_contract',
              width: '',
              key: '---'
            },
            {
              title: 'contract_history_postion_header_amount',
              width: '',
              key: 'amount'
            },
            {
              title: 'contract_history_postion_header_value',
              width: '',
              tips: 'contract_history_postion_header_value_tips',
              key: 'value'
            },
            {
              title: 'contract_history_postion_header_avg',
              width: '',
              tips: 'contract_history_postion_header_avg_tips',
              key: 'value'
            },
            {
              title: 'contract_history_postion_header_force',
              width: '',
              tips: 'contract_history_postion_header_force_tips',
              key: 'value'
            },
            {
              title: 'contract_history_postion_header_promise',
              width: '',
              tips: 'contract_history_postion_header_promise_tips',
              key: 'promise'
            },
            {
              title: 'contract_history_postion_header_delta_rate',
              width: '',
              tips: 'contract_history_postion_header_delta_rate_tips',
              key: '未实现盈亏（回报率'
            },
            {
              title: 'contract_history_postion_header_delta',
              width: '',
              key: '未实现盈亏'
            },
            {
              title: 'contract_history_header_action',
              width: ''
            }
          ]
        },
        // 已平仓仓位 --> 一开始叫仓位历史
        {
          name: 'contract_has_equal_pos',
          dataCount: 0,
          headers: [{
            title: 'contract_name',
            width: '',
            tips: 'contract_name_tips',
            key: 'symbol'
          },
          {
            title: 'contract_result_yet',
            width: '',
            tips: 'contract_result_yet_percent_tips',
            key: 'realized'
          }]
        },
        // 当前委托
        {
          name: 'contract_history_del_current',
          dataCount: 0,
          rightButtonText: 'contract_cancel_all',
          rightButtonClick: this.rightButtonClick,
          headers: [{
            title: 'contract_name',
            width: '',
            key: 'symbol'
          }, {
            title: 'amount',
            width: '',
            key: 'amount'
          }, {
            title: 'contract_assign_price',
            width: '',
            key: 'price'
          }, {
            title: 'contract_complete_deal',
            width: '',
            key: 'executed'
          }, {
            title: 'contract_assign_value',
            width: '',
            key: 'total'
          }, {
            title: 'order_th_type',
            width: '',
            key: 'side'
          }, {
            title: 'status',
            width: '',
            key: 'state'
          }, {
            title: 'order_th_placed',
            width: '',
            key: 'create_time'
          }, {
            title: 'contract_assign_revert',
            key: 'revert'
          }]
        },
        // 止损委托
        {
            name: 'contract_history_stop_loss',
            dataCount: 0,
            headers: [{
            title: 'contract_name', //合约
            width: '',
            key: 'symbol'
          }, {
            title: 'amount',//数量
            width: '',
            key: 'amount_side'
          }, {
            title: 'contract_assign_price',//委托价格
            width: '',
            key: 'price'
          }, {
            title: 'contract_complete_deal',//完成成交
            width: '',
            key: 'total'
          }, {
            title: 'contract_trigger_price', //触发价格
            width: '',
            key: 'trigger_price'
          }, {
            title: 'contract_trigger_price_rule', //触发价格2
            width: '',
            key: 'trigger_price_compute'
          }, {
            title: 'contract_deal_price', //成交价格
            width: '',
            key: '0'
          }, {
            title: 'order_th_type',//类型
            width: '',
            key: 'type'
          },{
            title: 'status',// 状态
            width: '',
            key: 'state'
          }, {
            title: 'time',// 时间
            width: '',
            key: 'create_time'
          }, {
            title: 'contract_assign_revert', // 撤销
            key: 'revert'
          }]
        },
        // 委托历史
        {
          name: 'contract_history_del_history',
          dataCount: 0,
          headers: [{
            title: 'contract_name', //合约
            width: '',
            key: 'symbol'
          },{
            title: 'deal_th_side',  //类型/方向
            width: '',
            key: 'side'
          }, {
            title: 'amount',  //数量
            width: '',
            key: 'amount'
          }, {
            title: 'contract_assign_price',  //委托价格
            width: '',
            key: 'price'
          }, {
            title: 'contract_complete_deal',  //完全成交
            width: '',
            key: 'executed'
          }, {
            title: 'contract_deal_price',  //成交价格
            width: '',
            key: 'executed_price'
          }, {
            title: 'contract_action_delegate_type',   //委托类型
            width: '',
            key: 'type'
          }, {
            title: 'status',   //状态
            width: '',
            key: 'state'
          }, {
            title: 'order_th_placed',  //时间
            width: '',
            key: 'update_time'
          }]
        },
        // 计划委托
        // {
        //   name: 'contract_history_plan_current',
        //   headers: [{
        //     title: 'contract_name',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'deal_th_side',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'contract_trigger_plan',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'contract_assign_price',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'order_th_status',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'contract_deadline',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'actions',
        //     width: '',
        //     key: '---'
        //   }]
        // },
        // 计划历史
        // {
        //   name: 'contract_history_plan_history',
        //   headers: [{
        //     title: 'contract_name',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'deal_th_side',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'contract_trigger_plan',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'contract_assign_price',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'contract_deadline',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'actions',
        //     width: '',
        //     key: '---'
        //   }]
        // },
        // 已成交, 之前叫成交历史
        {
          name: 'contract_history_deal_fills',
          tips: this.$t('contract_history_deal_fills_tips'),
          dataCount: 0,
          headers: [{
            title: 'contract_name',  //合约
            width: '',
            key: 'symbol'
          }, {
            title: 'deal_th_side',  //类型/方向
            width: '',
            key: 'side'
          }, {
            title: 'amount',  //数量
            width: '',
            key: 'amount_total'
          }, {
            title: 'contract_deal_amount',  //成交张数
            width: '',
            key: 'amount'
          }, {
            title: 'order_th_unclose',  //剩余
            width: '',
            key: 'contract_deal_amount'
          }, {
            title: 'contract_deal_price',  //成交价格
            width: '',
            key: 'price'
          }, {
            title: 'contract_assign_price',  //委托价值
            width: '',
            key: 'price'
          }, {
            title: 'contract_value',  //价值
            width: '',
            key: 'history_table_contract_value'
          },  {
            title: 'contract_action_delegate_type',   //委托类型
            width: '',
            key: 'type'
          }, {
            title: 'contract_deal_type',  //成交类型
            width: '',
            key: 'origin'
          }, {
            title: 'contract_assign_id',  //委托ID
            width: '',
            key: 'order_id'
          }, {
            title: 'order_th_placed',  //时间
            width: '',
            key: 'deal_create_time'
          } ]
        }
        // 资产信息
        // {
        //   name: 'contract_history_fund_info',
        //   headers: [{
        //     title: 'contract_account_rights',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'contract_margin_balance',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'account_warehouse_margin',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'unrealized_profit_and_loss',
        //     width: '',
        //     key: '---'
        //   }, {
        //     title: 'contract_freezing_quota',
        //     width: '',
        //     key: '---'

        //   }]
        // }
      ],
      activeList: [],
      refreshTime: 0,
    }
  },
  computed: {
    currentTab () {
      return this.nav.find(item => item.name === this.current)
    },
    isLogin () {
      return !!this.state.userInfo
    },

  },
  components: {
    historyTable
  },
  methods: {
    loadNext () {
      console.log('loadnext')
      if (this.page * this.size >= this.totalItems) {
        return
      }
      this.page += 1
      this.fetchData()
    },
    async fetchActiveList () {
      let res = await service.getActiveorders({
        symbol: this.state.ct.pair,
        page: this.page,
        size: this.size
      })
      if (!res.code && res.data) {
        this.activeList = res.data.data
      }
    },
    switchTab (tab) {
      if (!this.isLogin) {
        return
      }
      this.page = 1
      this.size = 10
      this.tableData = []
      this.current = tab.name
      this.tabLoading = true
      this.fetchData()
      // this.startTimer()
    },
    fetchData () {
      if (!this.isLogin) {
        return
      } 
      this.loading = true
      state.loadingfailed = false
      const tab = this.current
      let func = null
      let params = {
        symbol: this.state.ct.pair,
        page: this.page,
        size: this.size
      }
      switch (tab) {
        case 'contract_history_position':
          params = {
            symbol: this.state.ct.product_name
          }
          func = service.getContractBalanceByPair
          break
        case 'contract_has_equal_pos':
          func = service.getClosedposition
          break
        case 'contract_history_del_current':
          func = service.getActiveorders
          break
        case 'contract_history_del_history':
          func = service.getOrderhistory
          break
        case 'contract_history_deal_fills':
          func = service.getOrderfillList
          break
        case 'contract_history_stop_loss':
          // console.log(service.getStoplossOrder)
          func = service.getStoplossOrder
          break
        default:
          break
      }
      if (func) {
        func(params)
          .then(res => {  

            if (res.message != "OK" && res.data == null) { 
              state.loadingfailed = true
            } 
            else if (!res.code) {
              //console.log(res.data.data, params)
              if (tab === 'contract_history_position') {
                // 持仓数据存储到state中
                // let holding = this.state.ct.holding
                // holding = res.data
                let holding = res.data
                this.state.ct.holding = holding 
                if (holding && holding.holding && holding.holding != 0) {
                  this.setTabDataCount(tab, 1)
                }
                else {
                  this.setTabDataCount(tab, 0)
                }
                // //如果存在future_close_id，则更新平仓价格
                if (!!holding.future_close_id) {
                  this.setClearCommitPrice(holding.future_close_id)
                }
              }
              // 当前委托, 委托历史, 已成交需要分页,返回值不同;
              // 在这里只取前10个了
              if (tab === 'contract_history_del_history' ||
              tab === 'contract_history_del_current' ||
              tab === 'contract_history_stop_loss' ||
              tab ==='contract_history_deal_fills') {
                if (this.page > 1 && Array.isArray(this.tableData)) {
                  this.tableData = this.tableData.concat([], res.data.data)
                } else {
                  // console.log(res.data)
                  this.tableData = res.data.data
                }

                this.totalItems = res.data.total
                this.setTabDataCount(tab, this.totalItems)
                return
              }
              
              this.tableData = res.data

            }
          })
          .catch(() => {
            state.loadingfailed = true
          })
          .finally(() => {
            this.loading = false
            this.tabLoading = false
          })
      }
      // this.fetchActiveList()
    },
    //更新平仓价格
    async setClearCommitPrice(commitid){
      if(!commitid){
        console.log('commitid:' + commitid)
        return
      }

      this.state.ct.curCommitPrice = 0
      let currentDel = this.state.ct.currentDel
      if (currentDel) {
        currentDel.map((val, index) => {
          if(val.id ==  commitid) {
            this.state.ct.curCommitPrice = val.price
            return this.state.ct.curCommitPrice
          }
        })
      }
      // //如果currentDel位空或者没找到这条委托，那么重新取抓一次数据

      if (!this.state.ct.curCommitPrice) {
        let params = {
          symbol: this.state.ct.pair,
          page: 1,
          size: 200
        }
        currentDel = []
        await service.getActiveorders(params)
        .then(res => {
          if (!res.code) {
            currentDel = res.data.data
          }
          if (currentDel) {
            currentDel.map((val, index) => {
              if(val.id ==  commitid) {
                this.state.ct.curCommitPrice = val.price
              }
            })
          }
        })
      }
    },
    refreshTabData(type){
      let func = null
      let params = {
        symbol: this.state.ct.pair,
        page: this.page,
        size: this.size
      }
      //console.log("refreshTabData:" + type)
      //当前委托
      if (type === 1){
          func = service.getActiveorders
      }
      //止损委托
      else if ([3, 4, 5, 6].indexOf(type) >= 0){
        func = service.getStoplossOrder
      }

      if (func) {
        func(params)
          .then(res => {
            if (res.message == 'OK') {
              console.log("test")
              let tab = ""
              this.totalItems = res.data.total

              //提交订单时，如果时限价/止盈止损委托，刷新列表
              if (type === 1){
                tab = "contract_history_del_current"
              }
              else if ([3, 4, 5, 6].indexOf(type) >= 0){
                tab = 'contract_history_stop_loss'
              }

              if(tab === this.current) {
                if (this.page > 1 && Array.isArray(this.tableData)) {
                  this.tableData = this.tableData.concat([], res.data.data)
                } else {
                  this.tableData = res.data.data
                }
              }
              this.setTabDataCount(tab, this.totalItems)
            }
          })
          .finally(() => {
            this.loading = false
            this.tabLoading = false
          })
      }
    },
    setTabDataCount (name, count) {
      let item = this.nav.find(item => item.name === name)
      if (item) {
          console.log(item)
        item.dataCount = count
      }
    },
    /**
     * 临时快速响应订单， 最好的做法是通过order-watcher
     */
    startTimer () {
      if (this.timer) {
        this.clearTimer()
      }
      this.timer = setInterval(() => {
        console.log(this.current + ' timer...')
        this.fetchData()
      }, 3e3)
    },
    clearTimer () {
      clearInterval(this.timer)
    },
    rightButtonClick (tab) {
      if (tab.name === 'contract_history_del_current' || tab.name === 'contract_history_stop_loss' ) {
        //活动委托 0，止损委托 1
        const params = {
          trigger: tab.name === 'contract_history_del_current' ? 0 : 1
        }
        console.log(params)
        service.cancelAllContractOrder(params).then(res => {
          if (!res.code) {
            this.$eh.$emit('protrade:order:refresh','rightButtonClick')
            if(this.userSetting){  //根据用户设置判断
              this.$toast({title: '所有委托已被取消',body: this.$t('contract_revert_success'),color: 'yellow'})
            }
            // utils.success(this.$t('contract_revert_success'))
          } else {
            // utils.alert(res.message)
            if(this.userSetting){  //根据用户设置判断
              this.$toast({title: '取消失败',body: res.message,color: 'red'})
            }
          }
        })
      }
    },
    //获取当前所有委托数据
    async refreshCurrentDelegation(){
      let params = {
          symbol: this.state.ct.pair,
          page: 1,
          size: 200
        }
      await service.getActiveorders(params)
      .then(res => {
        if (!res.code) {
          this.state.ct.currentDel = res.data.data
        }
      })
      return this.state.ct.currentDel
      console.log('testtestsetsets',  this.state.ct.currentDel)
    }
  },
  async created () {
    await actions.updateSession()
    if (this.state.userInfo) {
      let param = {
        user: this.state.userInfo.id
      }
      service.MessageSettings(param).then(resp => {
        if (!resp.code) {
          this.userSetting = resp.data
        }
      })
    } //查询用户设置
    this.switchTab({name: 'contract_history_position'})
    this.$eh.$once('protrade:order:refresh', this.refreshCurrentDelegation )
    this.$eh.$on('protrade:order:refresh', (type) => {
      this.size = this.page * this.size
      this.page = 1
      this.fetchData()
      console.log({type})

      if(!isNaN(Number(type))){
        this.refreshTabData(type)
        this.refreshCurrentDelegation()
        // if (type == 1) {
        // }
      }
    })
    this.$nextTick(function () {
      this.$eh.$emit("protrade:order:refresh", 1)
    })
  },
  destroyed () {
    this.$eh.$off('protrade:order:refresh','destroyed')
    this.clearTimer()
  }
}
</script>
<style lang="scss">
.contract__history__table-loading {
  padding-top: 60px;
  height: 268px;
  box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
.history-container {
  .tab {
    .tab__header {
      display: flex;
      justify-content: space-between;
      .tab__nav {
        display: flex;
        .tab__title {
          padding: 0 28px;
          font-size: 12px;
          color: #fff;
          line-height: 32px;
          display: flex;
          align-items: center;
          &.active {
            border-top: 2px solid $primary;
            background-color: $contract-block-bg;
            color: $primary;
          }

          .iconfont {
            line-height: 1;
          }
        }
      }
      tr:nth-of-type(odd){

      }

      .tab__button {
        color: $primary;
      }
    }
  }
}
</style>
