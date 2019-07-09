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
import historyTable from "./history/history_table";
import service from "@/modules/service";
import { state, actions } from "@/modules/store";
import utils from "@/modules/utils";

export default {
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
      userSetting: {},
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
              title: "amount",
              width: "",
              key: "amount"
            },
            {
              title: "contract_assign_price",
              width: "",
              key: "price"
            },
            {
              title: "contract_complete_deal",
              width: "",
              key: "executed"
            },
            {
              title: "contract_assign_value",
              width: "",
              key: "total"
            },
            {
              title: "order_th_type",
              width: "",
              key: "side"
            },
            {
              title: "status",
              width: "",
              key: "state"
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
              title: "amount", //数量
              width: "",
              key: "amount_side"
            },
            {
              title: "contract_assign_price", //委托价格
              width: "",
              key: "price"
            },
            {
              title: "contract_complete_deal", //完成成交
              width: "",
              key: "total"
            },
            {
              title: "contract_trigger_price", //触发价格
              width: "",
              key: "trigger_price"
            },
            {
              title: "contract_trigger_price_rule", //触发价格2
              width: "",
              key: "trigger_price_compute"
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
              title: "time", // 时间
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
              title: "contract_complete_deal", //完全成交
              width: "",
              key: "executed"
            },
            {
              title: "contract_deal_price", //成交价格
              width: "",
              key: "executed_price"
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
    // currentDel() {
    //   return this.state.ct.currentDelList["BTCUSD"]
    // },
    holdingValue() {

    },
    markTickList() {
      return this.state.ct.markTickList
    }
    
  },
  components: {
    historyTable
  },
  methods: {
    loadNext() {
      console.log("loadnext");
      if (this.page * this.size >= this.totalItems) {
        return;
      }
      this.page += 1;
      console.log("loadNext")
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
        if(utils.getSessionStorageValue("LoginStatus") == 1){
          this.state.isLoginOverdue = true;
        }
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
          func = service.getOrderhistory;
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
                  // state.ct.computeHoldingList = this.computeHoldingList(holdingList)
                } 
                this.tableData = res.data
                if (holdingList && holdingList.length) {
                  let count = holdingList.reduce((a,b) => { 
                    let c = b.holding * 1 > 0 ? 1 : 0 
                    return a + c }, 0) 
                  this.setTabDataCount(tab, count);
                } else {
                  this.setTabDataCount(tab, 0);
                }
                // 如果存在future_close_id，则更新平仓价格
                if (!!cholding.future_close_id) {
                  //this.setClearCommitPrice(holding.future_close_id)
                  this.state.ct.curCommitPrice = cholding.close_position_price;
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
            console.log({err})
            state.loadingfailed = true;
          })
          .finally(() => {
            this.loading = false;
            this.tabLoading = false;
          });
      }
      // this.fetchActiveList()
    }, 
    //更新平仓价格
    async setClearCommitPrice(commitid) {
      if (!commitid) {
        console.log("commitid:" + commitid);
        return;
      }

      this.state.ct.curCommitPrice = 0;
      let currentDel = this.state.ct.currentDel;
      if (currentDel) {
        currentDel.map((val, index) => {
          if (val.id == commitid) {
            this.state.ct.curCommitPrice = val.price;
            return this.state.ct.curCommitPrice;
          }
        });
      }
      // //如果currentDel位空或者没找到这条委托，那么重新取抓一次数据

      if (!this.state.ct.curCommitPrice) {
        let params = {
          symbol: this.state.ct.pair,
          page: 1,
          size: 200
        };
        currentDel = [];
        await service.getActiveorders(params).then(res => {
          if (!res.code) {
            currentDel = res.data.data;
          }
          if (currentDel) {
            currentDel.map((val, index) => {
              if (val.id == commitid) {
                this.state.ct.curCommitPrice = val.price;
              }
            });
          }
        });
      }
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
        
      console.log("startTime")
        this.fetchData();
      }, 3e3);
    },
    clearTimer() {
      clearInterval(this.timer);
    },
    rightButtonClick(tab) {
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
            if (this.userSetting) {
              //根据用户设置判断
              this.$toast({
                title: "所有委托已被取消",
                body: this.$t("contract_revert_success"),
                color: "yellow"
              });
            }
            // utils.success(this.$t('contract_revert_success'))
          } else {
            // utils.alert(res.message)
            if (this.userSetting) {
              //根据用户设置判断
              this.$toast({
                title: "取消失败",
                body: res.message,
                color: "red"
              });
            }
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
      await service.getOrderhistory(params).then(res => {
        if (!res.code && !!res.data) { 
          this.setTabDataCount(tab, res.data.total);
        }
      }); 
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
    
    // computeHoldingList(list) { 
    //   let markPriceList = this.state.ct.markTickList
    //   let lastPriceList = this.state.ct.lastPriceList
    //   let pairInfoList = this.state.ct.pairInfoList

    //   let holdingList = list.map(holding => {
    //     //币种不同算法不一样，
       
    //     if (holding.currency === 'BTCUSD') {
    //       holding.unit = '1 USD'
    //       holding.symbol = 'BTC' 
    //     // } else if (holding.currency === 'VDSUSD') {
    //     //   holding.unit =  this.$big(this.lastPrice).mul(this.currencyMul).toString() + ' BTC'
    //     //   holding.symbol = 'VDS'
    //     } else if (!!holding.currency) { 
    //       let pair = pairInfoList['FUTURE_'+holding.currency]
    //       if (!pair) { 
    //         holding.unit = ''
    //         holding.symbol = ''
    //         return holding
    //       } 
    //       let last = lastPriceList[holding.currency] || 0 
    //       holding.unit = this.$big(last).mul(pair.multiplier || 0).toString() + ' BTC'
    //       holding.symbol = holding.currency.replace('USD','')
    //     } else {
    //       holding.unit = ''
    //       holding.symbol = ''
    //     }
    //     let symbol = holding.symbol  
    //     let currency = holding.currency
    //     let unitPrice = 1 //单价 先写死
    //     if (holding) {
    //       // hack
    //       holding.amount = holding.holding || '0'
    //       holding.value = '0'
    //       holding.clearLoading = false
    //     } else {
    //       holding = {
    //         amount: '0',
    //         available_balance: '0',
    //         value: '0'
    //       }
    //     }
    //     //console.log('asdflasdjflksjdflj')
    //     if (holding && holding.holding && lastPriceList[holding.currency] !== '--' && lastPriceList[holding.currency] != 0) { 
    //       //console.log({test: this.pairInfoList})
    //       let pairInfo = pairInfoList['FUTURE_'+holding.currency]  
    //       if (!pairInfo) {
    //         return holding
    //       }
    //       let lastPrice = lastPriceList[holding.currency]// this.lastPrice
    //       let markPrice = markPriceList[holding.currency]  // this.markPrice  
    //       let mul = pairInfo.multiplier
    //       holding.pairInfo = pairInfo
    //       holding.lastPrice = lastPrice
    //       holding.markPrice = markPrice
    //       holding.product_name = pairInfo.product_name
    //       holding.value_scale = pairInfo.value_scale
    //       holding.price_scale = pairInfo.price_scale

    //       if (!holding.changeUnwindPrice) { 
    //         //最小步算法
    //         let accuracy = pairInfo.accuracy || 1
    //         let scale = pairInfo.price_scale || 4
    //         const minStep = Math.pow(10, -scale) * accuracy
    //         let $newValue = this.$big( markPrice || 0)
    //         if (!$newValue.mod(minStep).eq(0)) {
    //           $newValue = $newValue.div(minStep).round(scale >= 1 ? scale - 1 : 0, 0).mul(minStep)
    //         }
    //         holding.unwindPrice = $newValue
    //       }  
           
    //       holding.margin_position = this.$big(holding.margin_position || 0).round(pairInfo.value_scale || 4).toString()
    //       // 动态保证金
    //       holding.margin = this.$big(holding.margin_position || 0).plus(holding.unrealized).round(pairInfo.value_scale || 4).toString()
    //       // 保证金余额=用户当前还可用于开仓的保证金数量=账户权益-仓位保证金-委托保证金。
    //       holding.margin_available = this.$big(holding.available || 0).minus(holding.margin_position || 0).minus(holding.margin_delegation || 0).round(pairInfo.value_scale || 4, this.C.ROUND_DOWN).toString()
  
    //       holding.canRemoveMargin = holding.margin_user
    //       holding.canAddMargin = holding.available_balance
    //       // 保证金占比
    //       holding.marginPercent = holding.available == 0 ? '0.00' : this.$big(holding.margin_delegation || 0).div(holding.available).mul(100).round(2).toString()
  
    //     }
    //     return holding
    //   }) 
    //   return holdingList
    // },
    // //holding更换成list之后使用computed属性会导致无限循环的问题；
    // //所以这里是用method来处理原先的计算属性
    // holdingComputedData(item) {
    //   // console.log({item})
    //   let type = item.pair.split('_')[0]
    //   let name = item.pair.split('_')[1]
    //   let hlist = this.state.ct.computeHoldingList
       
    //   if (type.indexOf("MARKET") > -1) {
    //     //值没有发生变化的时候直接跳出
    //     if (this.marketList[name] === item.current) return 
    //     this.marketList[name] = item.current 
    //     if (!!this.lastList[name]) {
    //       hlist.map(holding => {
    //         if (holding.currency === name) { 
    //           if (!!holding.pairInfo){
    //             this.holdingModify(holding, this.marketList[name], this.lastList[name])
    //           }
    //         }
    //       }) 
    //     } 
    //   } else if (type.indexOf("FUTURE") > -1) {
    //     //值没有发生变化的时候直接跳出
    //     if (this.lastList[name] === item.current) return 
    //     this.lastList[name] = item.current 
    //     if (!!this.marketList[name]) {
    //       hlist.map(holding => {
    //         if (holding.currency === name) {
    //           if (!!holding.pairInfo){
    //             this.holdingModify(holding, this.marketList[name], this.lastList[name])
    //           }
    //         }
    //       }) 
    //     } 
    //   } 
    // },
    // holdingModify(holding, markPrice, lastPrice) {
    //   let {amount, price, currency} = holding
    //   let mul = holding.pairInfo.multiplier
    //   //计算价值
    //   let value = "0"
    //   if(currency === 'BTCUSD') {  
    //     let unitPrice = 1 //单价 先写死
    //     value = this.$big(amount).div(markPrice || 0).times(unitPrice).round(holding.pairInfo.value_scale || 4).abs().toString()
    //     this.$set(holding, "value", value)
    //   }
    //   else {
    //     value = this.$big(holding.price || 0).times(holding.holding).times(mul).toString()
    //     this.$set(holding, "value", value)
    //   }
    //   //计算未实现盈亏/预测盈亏
    //   let unrealized, unrealizedlp, roe, roelp
    //   if (currency === 'BTCUSD') {
    //     if(holding.amount > '0' ){ 
    //       unrealized = this.$big(amount).div(price).minus(this.$big(amount).div(markPrice))
    //       unrealizedlp = this.$big(amount).div(price).minus(this.$big(amount).div(lastPrice))
          
    //     this.$set(holding, "unrealized", unrealized)
    //     this.$set(holding, "unrealizedlp", unrealizedlp)
    //     } else if (holding.amount < 0) { 
    //       unrealized = this.$big(amount).abs().div(markPrice).minus(amount.abs().div(price))
    //       unrealizedlp = this.$big(amount).abs().div(lastPrice).minus(amount.abs().div(price))
    //       this.$set(holding, "unrealized", unrealized)
    //       this.$set(holding, "unrealizedlp", unrealizedlp)
    //     } else {
    //       unrealized = this.$big('0')
    //       unrealizedlp = this.$big('0')
    //       this.$set(holding, "unrealized", unrealized)
    //       this.$set(holding, "unrealizedlp", unrealizedlp)
    //     }

    //     if (this.$big(amount || 0).eq(0) || this.$big(price || 0).eq(0)) {
    //       roe = this.$big('0')
    //       roelp = this.$big('0')
    //       this.$set(holding, "roe", roe)
    //       this.$set(holding, "roelp", roelp)
    //     }
    //     else {
    //       roe = holding.unrealized
    //           .div((this.$big(amount).abs()).div(price))
    //           .mul(holding.leverage == 0 ? 100 : holding.leverage)
    //           .mul(100)
    //           .toFixed(2) 
    //       roelp = holding.unrealizedlp
    //           .div((this.$big(amount).abs()).div(price))
    //           .mul(holding.leverage == 0 ? 100 : holding.leverage)
    //           .mul(100)
    //           .toFixed(2) 
          
    //       this.$set(holding, "roe", roe)
    //       this.$set(holding, "roelp", roelp)
    //     } 
    //   }
    //   //VDS BHD
    //   else {
    //     //VDS未实现盈亏计算   //乘数（0.0001BTC）
    //     //多：（VDSUSD 标记价格 - VDSUSD 开仓价格）* 比特币乘数 * 合约数量  
    //     //空：（ VDSUSD 开仓价格- VDSUSD 标记价格）* 比特币乘数 * 合约数量 
    //     if(amount > 0) { 
    //       holding.unrealized = this.$big(markPrice).minus(price).mul(mul).mul(amount)
    //       holding.unrealizedlp = this.$big(lastPrice).minus(price).mul(mul).mul(amount)
    //     } else if (amount < 0) {
    //       holding.unrealized = this.$big(price).minus(markPrice).mul(mul).mul(amount)
    //       holding.unrealizedlp = this.$big(price).minus(lastPrice).mul(mul).mul(amount)
    //     } else {
    //       holding.unrealized = this.$big('0')
    //       holding.unrealizedlp = this.$big('0')
    //     } 

        
    //     if (this.$big(amount || 0).eq(0) || this.$big(price || 0).eq(0)) {
    //       holding.roe = this.$big('0')
    //       holding.roelp = this.$big('0')
    //     }
    //     else { 
    //       holding.roe = holding.unrealized
    //           .div((this.$big(amount).abs()).div(price))
    //           .mul(holding.leverage == 0 ? 20 : holding.leverage)
    //           .mul(100)
    //           .toFixed(2) 
    //       holding.roelp = holding.unrealizedlp
    //           .div((this.$big(amount).abs()).div(price))
    //           .mul(holding.leverage == 0 ? 20 : holding.leverage)
    //           .mul(100)
    //           .toFixed(2) 
    //     }
    //   } 

    //   //平仓价格
    //   if (!holding.changeUnwindPrice) { 
    //     //最小步算法
    //     let accuracy = holding.pairInfo.accuracy || 1
    //     let scale = holding.pairInfo.price_scale || 4
    //     const minStep = Math.pow(10, -scale) * accuracy
    //     let $newValue = this.$big( markPrice || 0)
    //     if (!$newValue.mod(minStep).eq(0)) {
    //       $newValue = $newValue.div(minStep).round(scale >= 1 ? scale - 1 : 0, 0).mul(minStep)
    //     }
    //     let unwindPrice = $newValue
    //     this.$set(holding, "unwindPrice", unwindPrice)
    //   }
    // }
  },
  async created() {
    await actions.updateSession();
    if (this.state.userInfo) {
      let param = {
        user: this.state.userInfo.id
      };
      service.MessageSettings(param).then(resp => {
        if (!resp.code) {
          this.userSetting = resp.data;
        }
      });
    } //查询用户设置
    this.switchTab({ name: "contract_history_position" });
    this.$eh.$once("protrade:order:refresh", this.refreshCurrentDelegation);
    this.$eh.$on("protrade:order:refresh", type => { 
      this.size = this.page * this.size;
      this.page = 1;
      this.fetchData(); 
      this.refreshCurrentDelegation(); 
      this.refreshOrderHistory()
      if (!isNaN(Number(type))) { 
        //console.log({type})
        this.refreshHoldingCount()
      }
    });
    this.$nextTick(function() {
      this.$eh.$emit("protrade:order:refresh", 1);
    });
    this.$eh.$on("setOrderfill:count", count => {
      this.setTabDataCount("contract_history_deal_fills", count)
    })
    // this.$eh.$on("socket:price:update", item => {
    //   this.holdingComputedData(item)  
    // })
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
        console.log('markTickListmarkTickListmarkTickListmarkTickListmarkTickListmarkTickListmarkTickList')
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
  background-color: rgba($contract-block-bg, 0.8);
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
  .link-group {
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
      tr:nth-of-type(odd) {
      }

      .tab__button {
        color: $primary;
      }
    }
  }
}
</style>
