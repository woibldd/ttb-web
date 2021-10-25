<template>
  <div :class="['history-container', state.skin]">
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
import historyTable from "./history/history_table";
import service from "@/modules/service";
import { state, actions } from "@/modules/store";
import utils from "@/modules/utils";
import wsNew from '@/modules/ws-new'

export default {
  props: {

  },
  data() {
    return {
      state,
      tableData: {},
      loading: false,
      tabLoading: false, // 切换tab的loading
      page: 1, // page 都是从1 开始的,
      size: 10,
      totalItems: 0,
      timer: 0, 
      current: "contract_history_position",
      nav: [
        // 仓位
        {
          name: "contract_history_position",
          dataCount: 0,
          headers: [
            {
              title: "contract_history_postion_header_contract",
              width: "",
              key: "---"
            },
            {
              title: "contract_history_postion_header_amount",
              width: "",
              key: "amount"
            },
            {
              title: "contract_history_postion_header_value",
              width: "",
              tips: "contract_history_postion_header_value_tips",
              key: "value"
            },
            {
              title: "contract_history_postion_header_avg",
              width: "",
              tips: "contract_history_postion_header_avg_tips",
              key: "value"
            },
            {
              title: "contract_history_postion_header_force",
              width: "",
              tips: "contract_history_postion_header_force_tips",
              key: "value"
            },
            {
              title: "contract_history_postion_header_promise",
              width: "",
              tips: "contract_history_postion_header_promise_tips",
              key: "promise"
            },
            {
              title: "contract_history_postion_header_delta_rate",
              width: "",
              tips: "contract_history_postion_header_delta_rate_tips",
              key: "未实现盈亏（回报率"
            },
            {
              title: "contract_history_postion_header_delta",
              width: "",
              key: "未实现盈亏"
            },
            {
              title: "contract_history_header_action",
              width: ""
            }
          ]
        },
        // 已平仓仓位 --> 一开始叫仓位历史
        {
          name: "contract_has_equal_pos",
          dataCount: 0,
          headers: [
            {
              title: "contract_name",
              width: "",
              tips: "contract_name_tips",
              key: "symbol"
            },
            {
              title: "contract_result_yet",
              width: "",
              tips: "contract_result_yet_percent_tips",
              key: "realized"
            }
          ]
        },
        // 当前委托
        {
          name: "contract_history_del_current",
          dataCount: 0,
          rightButtonText: "contract_cancel_all",
          rightButtonClick: this.rightButtonClick,
          headers: [
            {
              title: "contract_name",
              width: "",
              key: "symbol"
            },
            {
              title: "contract_page.contract_edit_amount",
              width: "",
              key: "amount"
            },
            {
              title: "contract_page.contract_edit_price",
              width: "",
              key: "price"
            },
            {
              title: "contract_page.history.active.contract_complete_deal",
              width: "",
              key: "executed_amount"
            },
            {
              title: "contract_assign_value",
              width: "",
              key: "total"
            },
            {
              title: "order_th_type",
              width: "",
              key: "type"
            },
            {
              title: "status",
              width: "",
              key: "state"
            },
            {
              title: "contract_page.order_stop_winloss",
              width: "",
              key: "order_stop_winloss"
            },
            {
              title: "order_th_placed",
              width: "",
              key: "create_time"
            },
            {
              title: "contract_assign_revert",
              key: "revert"
            }
          ]
        },
        // 止损委托
        {
          name: "contract_history_stop_loss",
          dataCount: 0,
          headers: [
            {
              title: "contract_name", //合约
              width: "",
              key: "symbol"
            },
           {
              title: 'contract_page.history.stop_loss.edit_amount', // 数量
              width: '',
              key: 'amount_side'
            },
            {
              title: 'contract_page.history.stop_loss.edit_price', // 委托价格
              width: '',
              key: 'price'
            },
            {
              title: 'contract_complete_deal', // 完成成交
              width: '',
              key: 'total'
            },
            {
              title: 'contract_page.history.stop_loss.edit_trigger_price', // 触发价格
              width: '',
              key: 'trigger_price'
            },
            {
              title: 'contract_page.history.stop_loss.price_distance', // 触发价格2
              width: '',
              key: 'trigger_price_compute'
            },
            {
              title: "contract_deal_price", //成交价格
              width: "",
              key: "0"
            },
            {
              title: "order_th_type", //类型
              width: "",
              key: "type"
            },
            {
              title: "status", // 状态
              width: "",
              key: "state"
            },
            {
              title: "contract_assign_time", // 时间
              width: "",
              key: "create_time"
            },
            {
              title: "contract_assign_revert", // 撤销
              key: "revert"
            }
          ]
        },
        // 委托历史
        {
          name: "contract_history_del_history",
          dataCount: 0,
          headers: [
            {
              title: "contract_name", //合约
              width: "",
              key: "symbol"
            },
            {
              title: "deal_th_side", //类型/方向
              width: "",
              key: "side"
            },
            {
              title: "amount", //数量
              width: "",
              key: "amount"
            },
            {
              title: "contract_assign_price", //委托价格
              width: "",
              key: "price"
            },
            {
              title: "contract_page.history.history.contract_complete_deal", //完全成交
              width: "",
              key: "executed_amount"
            },
            {
              title: "contract_deal_price", //成交价格
              width: "",
              key: "executed_price"
            },
            {
              title: "contract_trigger_price", //触发价格
              width: "",
              key: "trigger_price"
            },
            {
              title: "contract_action_delegate_type", //委托类型
              width: "",
              key: "type"
            },
            {
              title: "status", //状态
              width: "",
              key: "state"
            },
            {
              title: "order_th_placed", //时间
              width: "",
              key: "update_time"
            }
          ]
        }, 
        // 已成交, 之前叫成交历史
        {
          name: "contract_history_deal_fills",
          tips: this.$t("contract_history_deal_fills_tips"),
          dataCount: 0,
          headers: [
            {
              title: "contract_name", //合约
              width: "",
              key: "symbol"
            },
            {
              title: "deal_th_side", //类型/方向
              width: "",
              key: "side"
            },
            {
              title: "amount", //数量
              width: "",
              key: "amount_total"
            },
            {
              title: "contract_deal_amount", //成交张数
              width: "",
              key: "amount"
            },
            {
              title: "order_th_unclose", //剩余
              width: "",
              key: "contract_deal_amount"
            },
            {
              title: "contract_deal_price", //成交价格
              width: "",
              key: "price"
            },
            {
              title: "contract_assign_price", //委托价格
              width: "",
              key: "price"
            },
            {
              title: "contract_value", //价值
              width: "",
              key: "history_table_contract_value"
            },
            {
              title: "contract_action_delegate_type", //委托类型
              width: "",
              key: "type"
            },
            {
              title: "contract_deal_type", //成交类型
              width: "",
              key: "origin"
            },
            {
              title: "contract_assign_id", //委托ID
              width: "",
              key: "order_id"
            },
            {
              title: "order_th_placed", //时间
              width: "",
              key: "deal_create_time"
            }
          ]
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
      isLoginOverdue: false,
      indexList: {},
      lastList: {},
      marketList: {},
    };
  },
  computed: {
    currentTab() {
      return this.nav.find(item => item.name === this.current);
    },
    isLogin() {
      return !!this.state.userInfo;
    },  
    markTickList() {
      return this.state.ct.markTickList
    },
    userSetting () {
      if (this.state.ct.userSetting) {
        return this.state.ct.userSetting
      }
      return {}
    },
    mapHandlerSocket () {
      return {
        'liquid': this.handleLiquid,
        'heart': this.handleHeart
      }
    } 
  },
  components: {
    historyTable
  },
  methods: {
    handleLiquid (data) {
      // console.log(data)
    },
    handleHeart (data) {
      // console.log(data)
    },
    loadNext() { 
      if (this.page * this.size >= this.totalItems) {
        return;
      }
      this.page += 1; 
      this.fetchData();
    },
    async fetchActiveList() {
      let res = await service.getActiveorders({
        symbol: this.state.ct.pair,
        page: this.page,
        size: this.size
      });
      if (!res.code && res.data) {
        this.activeList = res.data.data;
      }
    },
    switchTab(tab) {
      if (!this.isLogin) { 
        // if(utils.getSessionStorageValue("LoginStatus") == 1){
        //   this.state.isLoginOverdue = true;
        // }
        return;
      }
      this.page = 1;
      this.size = 10;
      this.tableData = []; 
      this.current = tab.name;
      console.log(tab.name)
      this.tabLoading = true;
      this.fetchData();
      
      console.log("switchTab")
      //更新用户session
      actions.updateSession();
      // this.startTimer()
    },
    fetchData() {
      if (!this.isLogin) {
        return;
      }
      this.loading = true;
      state.loadingfailed = false;
      const tab = this.current;
      let func = null;
      let params = {
        // symbol: this.state.ct.pair,
        page: this.page,
        size: this.size
      };
      switch (tab) {
        case "contract_history_position":
          //这里需要获取全部的币对持仓
          // params = {
          //   symbol: this.state.ct.product_name
          // };
          // func = service.getContractBalanceByPair;
          func = service.getContractBalanceList 
          break;
        case "contract_has_equal_pos":
          func = service.getClosedposition;
          break;
        case "contract_history_del_current":
          func = service.getActiveorders;
          break;
        case "contract_history_del_history":
          func = service.getContractOrderhistory;
          break;
        case "contract_history_deal_fills":
          func = service.getOrderfillList;
          break;
        case "contract_history_stop_loss":
          // console.log(service.getStoplossOrder)
          func = service.getStoplossOrder;
          break;
        default:
          break;
      }
      if (func) {
        func(params)
          .then(res => {
            if (res.message != "OK" && res.data == null) {
              state.loadingfailed = true;
            } else if (!res.code) { 
              if (tab === "contract_history_position") {  
                let holdingList = null; 
                let cholding = {}
                if(res.data && res.data.length > 0){ 
                  holdingList = res.data 
                  holdingList.map(item => {
                    if (item.currency === state.ct.symbol) {
                      cholding = item
                    } 
                  }) 
                  state.ct.holding = cholding
                  state.ct.holdingList = holdingList
                  if (state.ct.times !== cholding.leverage) {
                    this.$eh.$emit('protrade:balance:leverage', cholding.leverage)
                  }
                  // state.ct.computeHoldingList = this.computeHoldingList(holdingList)
                } 
                this.tableData = res.data
                if (holdingList && holdingList.length) {
                  let count = holdingList.reduce((a,b) => { 
                    let c = b.holding * 1 != 0 ? 1 : 0  //多仓大于0， 空仓小于0
                    return a + c }, 0) 
                  this.setTabDataCount(tab, count);
                } else {
                  this.setTabDataCount(tab, 0);
                } 
              }
              // 当前委托, 委托历史, 已成交需要分页,返回值不同;
              // 在这里只取前10个了
              if (
                tab === "contract_history_del_history" ||
                tab === "contract_history_del_current" ||
                tab === "contract_history_stop_loss" ||
                tab === "contract_history_deal_fills"
              ) {
                if (this.page > 1 && Array.isArray(this.tableData)) {
                  this.tableData = this.tableData.concat([], res.data.data);
                } else {
                  // console.log(res.data)
                  this.tableData = res.data.data;
                } 
                this.totalItems = res.data.total;
                
                this.setTabDataCount(tab, this.totalItems);
                return;
              } 
              this.tableData = res.data;
            }
          })
          .catch((err) => { 
            state.loadingfailed = true;
          })
          .finally(() => {
            this.loading = false;
            this.tabLoading = false;
          });
      }
      // this.fetchActiveList()
    }, 
    refreshTabData(type) { 
      let func = null;
      let tab = null;
      let params = {
        symbol: this.state.ct.pair,
        page: 1,
        size: 1
      };
 

      //刷新仓位
      func = service.getContractBalanceByPair;
      if (func) {
        func(params).then(res => { 
          if (res.message != "OK" && res.data == null) {
            state.loadingfailed = true;
          } else {
            tab = "contract_history_position";
            if (res.data && res.data.holding && res.data.holding != 0) {
              this.setTabDataCount(tab, 1);
            } else {
              this.setTabDataCount(tab, 0);
            }
          }
        });
      }

      func = service.getActiveorders;
      if (func) {
        func(params).then(res => { 
          if (res.message != "OK" && res.data == null) {
            state.loadingfailed = true;
          } else {
            tab = "contract_history_del_current";
            this.setTabDataCount(tab, res.data.total);
          }
        });
      }
    },
    setTabDataCount(name, count) {
      let item = this.nav.find(item => item.name === name);
      if (item) { 
        item.dataCount = count;
      }
    },
    /**
     * 临时快速响应订单， 最好的做法是通过order-watcher
     */
    startTimer() {
      if (this.timer) {
        this.clearTimer();
      }
      this.timer = setInterval(() => {
        console.log(this.current + " timer..."); 
        this.fetchData();
      }, 3e3);
    },
    clearTimer() {
      clearInterval(this.timer);
    },
    async rightButtonClick(tab) { 
      let ok = await utils.confirm(this, {
        title: this.$t('contract-cancel-all-title'),
        content: this.$t('contract-cancel-all-content'), 
        customClass: "ix-message-box-wrapper", 
        confirmButtonClass: "btn--confirm",
        cancelButtonClass: "btn--cancel",
      }) 
      if (!ok) {
        return 
      }

      if (
        tab.name === "contract_history_del_current" ||
        tab.name === "contract_history_stop_loss"
      ) {
        //活动委托 0，止损委托 1
        const params = {
          trigger: tab.name === "contract_history_del_current" ? 0 : 1
        };
        console.log(params);
        service.cancelAllContractOrder(params).then(res => {
          if (!res.code) {
            this.$eh.$emit("protrade:order:refresh", "rightButtonClick");
            if (this.userSetting.cancel) {
              //根据用户设置判断
              this.$toast({
                title: this.$t("delegate_cancellation"),
                body: this.$t("contract_revert_success"),
                color: "yellow"
              });
            }
            // utils.success(this.$t('contract_revert_success'))
          } else { 
            //根据用户设置判断
            this.$toast({
              title:  this.$t("delegation_cancellation_failed"),
              body: res.message,
              color: "red"
            }); 
          }
        });
      }
    },
    //获取当前所有委托数据
    async refreshCurrentDelegation() {
      let tab = "contract_history_del_current";
      // 
      setTimeout(() => {
        let params = {
          symbol: this.state.ct.pair,
          page: 1,
          size: 200
        };
        service.getActiveorders(params).then(res => {
          if (!res.code && !!res.data) {
            // console.log({res: res.data})
            // this.state.ct.currentDel = res.data.data;
            this.state.ct.currentDelList = {}
            res.data.data.map(item => {
              if (this.state.ct.currentDelList[item.currency]) {
                this.state.ct.currentDelList[item.currency].push(item)
              } else {
                this.state.ct.currentDelList[item.currency] = []
                this.state.ct.currentDelList[item.currency].push(item)
              }
            })
            this.setTabDataCount(tab, res.data.total);
          }
        });
        // return this.state.ct.currentDel; 
        return this.state.ct.currentDelList; 
      }, 1000);
    },
    //刷新委托历史数量
    async refreshOrderHistory() {
      let tab = "contract_history_del_history";
      if(tab === this.current){
        return
      }
      let params = {
        symbol: this.state.ct.pair,
        page: 1,
        size: 1
      };
      await service.getContractOrderhistory(params).then(res => {
        if (!res.code && !!res.data) { 
          this.setTabDataCount(tab, res.data.total);
        }
      }); 
    },
    async refreshTriggerCount(){
      let tab = "contract_history_stop_loss" 
      if(tab === this.current){
        return
      }
      let params = {
        symbol: this.state.ct.pair,
        page: 1,
        size: 1
      };
      await service.getStoplossOrder(params).then(res => { 
        if (!res.code && !!res.data) { 
          this.setTabDataCount(tab, res.data.total);
        }
      })
    },
    refreshHoldingCount() {
      let holdingTag = "contract_history_position";
      if(holdingTag === this.current){
        return
      }
      let params = {
        symbol: this.state.ct.product_name
      };  
      service.getContractBalanceByPair(params)
      .then(res => {
        if (!res){
          return
        }
        if (res.message != "OK" && res.data == null) {
          state.loadingfailed = true;
        } else  if (!res.code) {
          holdingTag = "contract_history_position"; 
          if (res.data && res.data.holding && res.data.holding != 0) {
            //console.log("this.setTabDataCount(holdingTag, 1)")
            this.setTabDataCount(holdingTag, 1);
          } else if (res.data) {
            this.setTabDataCount(holdingTag, 0);
            //console.log("this.setTabDataCount(holdingTag, 0)", {res})
          }
        }
      }).catch((msg)=>{
        console.log(1)
      })
      ; 
    }, 
    handleSocketData (res) { 
      const key = res.topic && res.topic.split('@')[0]
      this.mapHandlerSocket[key] && this.mapHandlerSocket[key](res.data)
    }, 
    subMarket() { 
      // const that = this
      // if (this.socket) {
      //   that.socket.$destroy()
      // }
      // this.socket = wsNew.create()
      // this.socket.$on('open', () => { 
      //   that.socket.heartCheck.start()
      //   if (that.state.userInfo) {
      //     that.socket.socket.send(`{"op":"loginWeb","args":["${that.state.userInfo.session_id}"]}`)
      //     that.socket.socket.send('{"op": "subscribe", "args": ["liquid"]}') 
      //   }
      // })
      // this.socket.$on('message', (data) => { 
      //   console.log(data)
      //   that.handleSocketData(data) 
      // })
      // this.socket.$on('reopen', () => {
      //   that.socket.$destroy()
      //   that.subMarket()
      // })
    },
    handleHeart(e) {  
      if (this.socket) {
        this.socket.heartCheck.start()
      }
    },
    handleLiquid(e) { 
      if (e.state === 1) {
        this.fetchData()
      }
    },
    fetchTabAmount() { 
      service.getFutureAllAmount()
        .then(res => {
          if (!res.code) { 
            // active_amount: 1
            // active_orders_amount: 2133
            // active_triggers_amount: 1
            // holding_amount: 3
            // orders_amount: 1430
            const result = res.data
            this.nav[0].dataCount = result.holding_amount
            this.nav[2].dataCount = result.active_amount
            this.nav[3].dataCount = result.active_triggers_amount
            this.nav[4].dataCount = result.active_orders_amount 
            this.nav[5].dataCount = result.orders_amount
          }
        })
    }
    // service.getFutureAllAmount()
  },
  async created() { 
    this.fetchTabAmount()
    this.subMarket()
    await actions.updateSession();
    if (this.state.userInfo) {
      let param = {
        user: this.state.userInfo.id
      }; 
    } //查询用户设置 
    await service.getRates({currency:'BTC'}).then(res=>{
      this.state.rate.BTC = res.data.BTC
    }) 
    this.switchTab({ name: "contract_history_position" });
    this.$eh.$once("protrade:order:refresh", this.refreshCurrentDelegation);
    this.$eh.$on("protrade:order:refresh", type => { 
      this.size = this.page * this.size;
      this.page = 1; 
      this.fetchData(); 
      this.refreshCurrentDelegation(); 
      this.refreshOrderHistory()
      this.refreshTriggerCount()
      if (!isNaN(Number(type))) {  
        this.refreshHoldingCount()
      }
    });
    this.$nextTick(function() {
      this.$eh.$emit("protrade:order:refresh", 1);
    });
    this.$eh.$on("setOrderfill:count", count => {
      this.setTabDataCount("contract_history_deal_fills", count)
    })  
  },
  destroyed() {
    this.$eh.$off("protrade:order:refresh", "destroyed");
    this.$eh.$off("setOrderfill:count","destroyed");
    this.$eh.$off("socket:price:update","destroyed");
    this.clearTimer();
  },
  watch: { 
    markTickList:{
      handler:function(val,oldval){ 
        this.holdingList[0].test = 1
        console.log(this.markTickList.handler, 'markTickList')
      },
      deep:true//对象内部的属性监听，也叫深度监听
    }
  }
};
</script>
<style lang="scss">
.contract__history__table-loading {
  padding-top: 60px;
  height: 268px;
  box-sizing: border-box;
}
</style>
<style lang="scss" scoped> 
.mask {
  width: 100%;
  height: 100%;
  z-index: 9999;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 300ms, visibility 0s 300ms;
  box-sizing: border-box;
  text-align: center;
  background-color: rgba($loading-mask, 0.8);
  &.show {
    transition: none;
    visibility: visible;
    opacity: 1;
  }
  .mask-front {
    position: absolute;
    top: 42%;
    margin-top: -35px;
    width: 100%;
    text-align: center;
    font-size: 0;
  }
  .hint {
    margin-bottom: 18px;
    font-size: 14px;
    color: white;
  }
 
  .link {
    font-size: 12px;
    text-align: center;
    padding: 0 20px;
    min-width: 84px;
    box-sizing: border-box;
    margin: 0 4px 8px;
    color: white;
    border-radius: 3px;
    line-height: 32px;
    &.signin {
      background-color: $buy;
    }
    &.signup {
      background-color: $sell;
    }
  }
}
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
          color: $--contract-history-tab;
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
 

      .tab__button {
        color: $primary;
      }
    }
  }
  &.dark {  
    .ix-pannel {
      background:$--contract-table-bg2; 
      color: #ffffff;
      .ix-header {
        background-color: $--contract-table-active2;
        .tab__nav .tab__title.active {
          background:$--contract-table-bg2; 
        }
      }
    } 
    .el-tabs { 
      /deep/ .el-tabs__item {
        color:#ACACAC;
      } 
      /deep/ .el-tabs__nav-wrap {
        &::after {
          background-color: #474747;
        }
      }
    }
  }
}
</style>
