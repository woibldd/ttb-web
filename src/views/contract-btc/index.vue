<template>
  <div class="page-contract" style="clear:both">
    <div class="container-trade-panel">
      <!-- 1-1 -->
      <div class="ix-row mt-0 overflow-hidden">
        <div class="ix-col ix-col-1" style="width:600px;">
          <div class="flex">
            <pairTable
              :list="sortedList"
              :tick="pairTick"
              :get-delta="getDelta"
              @changePair="changePair"
              @openSetting="openSetting"
            />
            <div class="tradingview-container mt-4">
              <tradingView ref="TradingView"/>
            </div>
          </div>
        </div>
        <!-- 挂单簿 -->
        <section class="order-section mt-4" style="width:500px;">
          <div class="only-orders">
            <!-- 委托列表 -->
            <div class="ix-col ix-col-2 ml-4 relative" style="width:50%;">
              <order-book  :deepthData="delegateData"/>
            </div>
            <!--  最新成交 -->
            <div class="ix-col ix-col-3 ml-4 relative" style="width:50%;">
              <order-deal :dataList="dealList"/>
            </div>
          </div>
          <!-- 深度图 -->
          <div class="ix-col ix-col-1 ml-4 mt-4">
            <contract-deepth :dataList="delegateData"/>
          </div>
        </section>
        <!-- 操作 -->
        <!-- 交易委托， 杠杆 -->
        <div class="ix-col ix-col-4 ml-4 mt-4">
          <order-action/>
        </div>
      </div>
      <!-- 2-1 -->
      <div class="ix-row overflow-hidden">
        <!-- 成交历史 -->
        <div class="ix-col ix-col-1">
          <history/>
        </div>
        <!-- 市场信息 -->
        <div class="ix-col ix-col-4 ml-4">
          <market-info/>
        </div>
      </div>
      <!-- 3-1 -->
      <div class="ix-row">
        <!-- 成交记录 -->
      </div>
    </div>
    <v-modal :open.sync="showSetupModal" class="modal-setup">
      <ContractSetup/>
    </v-modal>
    <!-- 计算器弹窗 -->
    <v-modal :open.sync="showCalculator" class="modal-calculate">
      <calculate/>
    </v-modal>
    <!-- 风险提示,开通合约modal -->
    <v-modal :open.sync="contractNotActive">
      <div class="contract-active-modal">
        <!-- <div class="m_title">{{ $t('contract_risk_announce') }}</div>
        <p class="m_detail">{{ $t('contract_risk_note') }}</p>
        <p class="m_detail">{{ $t('contract_risk_note_1') }}</p>
        <p class="m_detail">{{ $t('contract_risk_note_2') }}</p>
        <p class="m_detail">{{ $t('contract_risk_note_3') }}</p>
        <p class="m_detail">{{ $t('contract_risk_note_4') }}</p>
        <p class="m_detail">{{ $t('contract_risk_note_5') }}</p>
        <p class="m_detail">{{ $t('contract_risk_note_6') }}</p>
        <p class="m_detail">{{ $t('contract_risk_note_7') }}</p> -->
        <!-- <v-btn
          class="mt-25"
          @click="openContractAccount"
          :label="$t(state.isSimulation ? 'contract_simulation_risk_known' : 'contract_risk_known')"
        /> -->
        <div class="m_title_new">
          {{ $t('contract_title') }}
          <p>{{ $t('contract_body') }}</p>
        </div>
        <div class="contract-switch">
          <ul><li :class="{'contract-active':problemType}"><span>1</span>{{ $t('contract_answer') }}</li>
          <li :class="{'contract-active':!problemType}"><span>2</span>{{ $t('contract_tips') }}</li></ul>
        </div>
        <div v-show="problemType" class="contract-problem">
          <div class="contract-problem-list">
            <h1>{{ $t('problem_list1') }}<strong v-show="problemLstt[0] === 'false' || problemLstt[0] === '' && !problemError">x</strong></h1>
            <span><input v-model="problemLstt[0]" type="radio" value="false"><label for="">{{ $t('answer_list2_1') }}</label></span>
            <span><input v-model="problemLstt[0]" type="radio" value="true"><label for="">{{ $t('answer_list2_2') }}</label></span>
          </div>
          <div class="contract-problem-list">
            <h1>{{ $t('problem_list2') }}<strong v-show="problemLstt[1] === 'false' || problemLstt[1] === '' && !problemError">x</strong></h1>
            <span><input v-model="problemLstt[1]" type="radio" value="true"><label for="">0.1</label></span>
            <span><input v-model="problemLstt[1]" type="radio" value="false"><label for="">1</label></span>
          </div>
          <div class="contract-problem-list">
            <h1>{{ $t('problem_list3') }}<strong v-show="problemLstt[2] === 'false' || problemLstt[2] === '' && !problemError">x</strong></h1>
            <span><input v-model="problemLstt[2]" type="radio" value="true"><label for="">{{ $t('answer_list3_1') }}</label></span>
            <span><input v-model="problemLstt[2]" type="radio" value="false"><label for="">{{ $t('answer_list3_2') }}</label></span>
          </div>
          <div class="contract-problem-list">
            <h1>{{ $t('problem_list4') }}<strong v-show="problemLstt[3] === 'false' || problemLstt[3] === '' && !problemError">x</strong></h1>
            <span><input v-model="problemLstt[3]" type="radio" value="true"><label for="">{{ $t('answer_list4_1') }}</label></span>
            <span><input v-model="problemLstt[3]" type="radio" value="false"><label for="">{{ $t('answer_list4_2') }}</label></span>
          </div>
          <div class="contract-problem-list">
            <h1>{{ $t('problem_list5') }}<strong v-show="problemLstt[4] === 'false' || problemLstt[4] === '' && !problemError">x</strong></h1>
            <span><input v-model="problemLstt[4]" type="radio" value="false"><label for="">{{ $t('answer_list5_1') }}</label></span>
            <span><input v-model="problemLstt[4]" type="radio" value="true"><label for="">{{ $t('answer_list5_2') }}</label></span>
          </div>
          <div class="contract-problem-list">
            <h1>{{ $t('problem_list6') }}<strong v-show="problemLstt[5] === 'false' || problemLstt[5] === '' && !problemError">x</strong></h1>
            <span><input v-model="problemLstt[5]" type="radio" value="true"><label for="">{{ $t('answer_list6_1') }}</label></span>
            <span><input v-model="problemLstt[5]" type="radio" value="false"><label for="">{{ $t('answer_list6_2') }}</label></span>
          </div>
          <div class="contract-problem-list">
            <h1>{{ $t('problem_list7') }}<strong v-show="problemLstt[6] === 'false' || problemLstt[6] === '' && !problemError">x</strong></h1>
            <span><input v-model="problemLstt[6]" type="radio" value="true"><label for="">{{ $t('answer_list7_1') }}</label></span>
            <span><input v-model="problemLstt[6]" type="radio" value="false"><label for="">{{ $t('answer_list7_2') }}</label></span>
          </div>
          <div class="contract-problem-list">
            <h1>{{ $t('problem_list8') }}<strong v-show="problemLstt[7] === 'false' || problemLstt[7] === '' && !problemError">x</strong></h1>
            <span><input v-model="problemLstt[7]" type="radio" value="true"><label for="">{{ $t('answer_list8_1') }}</label></span>
            <span><input v-model="problemLstt[7]" type="radio" value="false"><label for="">{{ $t('answer_list8_2') }}</label></span>
          </div>
          <!-- <div class="contract-eqcode">
            <img src="@/assets/eqcode.jpg" alt="">
            <span>如有疑问，请联系 官方微信客服寻求 帮助</span>
          </div> -->
          <span v-show="!problemError" class="contract-error">{{ problemText }}</span>
          <button class="contract-btn" @click="downStep">{{ $t('contract_submission') }}</button>
        </div>
        <div v-show="!problemType" class="contract-problem">
          <!-- <div class="m_title"> 老版的合同
            {{ $t('contract_risk_announce') }}
          </div>
          <p class="m_detail">{{ $t('contract_risk_note') }}</p>
          <p class="m_detail">{{ $t('contract_risk_note_1') }}</p>
          <p class="m_detail">{{ $t('contract_risk_note_2') }}</p>
          <p class="m_detail">{{ $t('contract_risk_note_3') }}</p>
          <p class="m_detail">{{ $t('contract_risk_note_4') }}</p>
          <p class="m_detail">{{ $t('contract_risk_note_5') }}</p>
          <p class="m_detail">{{ $t('contract_risk_note_6') }}</p>
          <p class="m_detail">{{ $t('contract_risk_note_7') }}</p> -->
          <p class="m_detail" style="margin-top:50px">{{ $t('contract_content1') }}</p>
          <p class="m_detail">{{ $t('contract_content2') }}</p>
          <p class="m_detail">{{ $t('contract_content3') }}</p>
          <p class="m_detail">{{ $t('contract_content4') }}</p>
          <p class="m_detail">{{ $t('contract_content5') }}</p>
          <p class="m_detail">{{ $t('contract_content6') }}</p>
          <p class="m_detail">{{ $t('contract_content7') }}</p>
          <p class="m_detail">{{ $t('contract_content8') }}</p>
          <v-btn
            :label="$t(state.isSimulation ? 'contract_simulation_risk_known' : 'contract_risk_known')"
            class="mt-25"
            @click="openContractAccount"/>
        </div>
      </div>
    </v-modal>
  </div>
</template>
<script>
import pairTable from './components/contract-pair-nav'
import tradingView from './components/contract-trading-view'
import history from './components/contract-history'
// import contractDeepth from './components/contract-deepth'
import contractDeepth from './components/contract-deepth.am'
import marketInfo from './components/contract-market-info'
import orderBook from './components/contract-orderbook'
import orderDeal from './components/contract-orderdeal'
import orderAction from './components/contract-orderaction'
import tickTableMixin from '@/mixins/contract-tick-table'
import { state, actions, local } from '@/modules/store'
import calculate from './components/calculate'
import ContractSetup from './components/setup'
import utils from '@/modules/utils'
import service from '@/modules/service'
import pairInfoMixins from './components/statePairInfoComputedMixins'
import wsNew from '@/modules/ws-new'
import registryToast from "@/libs/toast/index";

export default {
  components: {
    pairTable,
    tradingView,
    history,
    contractDeepth,
    marketInfo,
    orderBook,
    orderDeal,
    orderAction,
    calculate,
    ContractSetup
  },
  mixins: [tickTableMixin, pairInfoMixins],
  data() {
    return {
      utils,
      problemType: true,
      problemError: true,
      problemLstt: ['', '', '', '', '', '', '', ''],
      state,
      // 计算器
      showCalculator: false,
      showSetupModal: false,
      problemText: '',
      // 合约激活
      contractNotActive: false, 
      delegateData: null,
      activeProduct: null,
      dataDeep: '0',
      dealList: []
    }
  },
  computed: {
    isLogin() {
      return !!this.state.userInfo
    },
    pairTick() {
      if (this.state.ct.pairTick) {
        return this.state.ct.pairTick
      }
      return {}
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
        'heart': this.handleHeart,
        'market': this.handleTickers,
        'deal': this.handleDealSoket,
        'orderbook': this.handleOrderbook,
        'position': this.handleAmountObj,
        'orderfills': this.handleAmountObj, 
        'trigger': this.handleAmountObj
      }
    } 
  },
  watch: { 
    '$route.query.pair': {
      async handler(pair, oldPair) {
        if (!pair) return
        const match = pair.match(/^([a-zA-Z0-9_-]*)_([a-zA-Z0-9_-]*)$/)
        if (match) {
          this.state.ct.pair = pair
          local.future = pair

          const res = await service.getContractPairInfo({ symbol: pair })
          if (!res.code) {
            this.state.ct.pairInfo = res.data
            this.state.ct.product_name = res.data.product_name
            this.state.ct.currency_name = res.data.currency_name
            this.state.ct.symbol = res.data.symbol
            if (this.isLogin) {
              this.checkActiveContract()
            }
            this.$eh.$emit('protrade:balance:refresh')
            const resp = await service.getContractSymInfo({
              symbol: this.symbol.name
            }) 
 
            if (this.socket && this.socket.socket.readyState === 1 && this.state.ct.pair) {
              this.socket.socket.send(`{"op":"unsubscribepub","args":["orderbook@${oldPair}@${this.dataDeep}@1@20"]}`)
              this.socket.socket.send(`{"op":"unsubscribepub","args":["deal@${oldPair}"]}`) 

              this.socket.socket.send(`{"op":"subscribepub","args":["orderbook@${this.state.ct.pair}@${this.dataDeep}@1@20"]}`)
              this.socket.socket.send(`{"op":"subscribepub","args":["deal@${this.state.ct.pair}"]}`)
            }
            if (!resp.code) {
              Object.assign(this.state.ct.pairInfo, resp.data)
            }
          } else {
            this.state.ct.pairInfo = null
          }
        }
        // alert(pair)
      },
      immediate: true
    }
  },
  async created() { 
    registryToast()
    //如果地址带有邀请码信息则将邀请码写入cookie中，有效期为10天 2019/10/16 yzf
    let invitorId = this.$route.query.invitor
    let agentId = this.$route.query.agent
    if (invitorId) {
      utils.setCookie('invitor', invitorId, 10) 
    } else if (agentId) {
      utils.setCookie('invitor', agentId, 10) 
    }
    
    this.subMarket()
    
    service.MessageSettings().then(resp => {
      if (!resp.code) {
        this.state.ct.userSetting = resp.data
      }
    })

    let newOrder = {}
    const $this = this
    setInterval(function() {
      // console.log(this.problemError)
      service.getOrderfills({ page: 1, size: 10, symbol: $this.state.ct.pair }).then(res => {
        if (!res.code) {
          // const number = 0
          if (JSON.stringify(newOrder) === '{}') {
            newOrder = res.data.data
            return false
          }

          const newOrderList = []
          const oneListObj = newOrder[0]
          if (JSON.stringify(newOrder) !== JSON.stringify(res.data.data)) {
            for (var i in res.data.data) {
              if (JSON.stringify(res.data.data[i]) === JSON.stringify(oneListObj)) {
                break
              }
              newOrderList.push(res.data.data[i])
            } 
            $this.toast(newOrderList)
            newOrder = res.data.data
            $this.$eh.$emit('protrade:order:refresh', 1)
          }

          // 刷新已成交表头的数量
          $this.$eh.$emit('setOrderfill:count', res.data.total)
        }
      })
    }, 5000)

    await actions.updateSession()
    document.querySelector('.page-loading').classList.add('show')
    if (!this.$route.params.pair) {
      const res = await service.getContractSymList()
      if (res.code) {
        return utils.alert(res.message)
      }
      const pair = res.data.items.filter(item => item.name === local.future).length
        ? local.future
        : res.data.items[0].name

      // console.log({pair, data: res.data})
      // 保存所有币对的基本信息
      this.state.ct.pairInfoList = {}
      res.data.items.forEach(element => {
        this.state.ct.pairInfoList[element.name] = element
      })
 
      this.$router.replace({
        name: 'future',
        query: {
          pair: pair
        }
      })
    }
    this.$nextTick(() => {
      // const layoutHeight = window.innerHeight
      // this.$refs.wrap.style.height = layoutHeight + 'px'
      this.state.loading = false
      this.state.ct.layout = true

      this.setGridContainers()
      this.$eh.$emit('protrade:layout:init')
      utils.log('Layout inited')

      this.$eh.$on('app:resize', this.onresize)
      // this.$eh.$on('deal:update', this.dealChanged)
      document.querySelector('.page-loading').classList.remove('show')
    })
    this.state.loading = true

    // setInterval(() => {
    //   this.loopFetch();
    // }, 30e3);
  },
  methods: {
    onresize() {
      // let bodyHeight = this.container.height - 88 + 'px'
    },
    /**
     * 激活
     */
    toast(newOrder) {
      let number = 0
      const $this = this
      for (const i in newOrder) {
        if (newOrder[i].origin === 2 && this.userSetting.force) {
          $this.$toast({ title: $this.$t('entrusted_mandatory_liquidation'),
            body: $this.$t('successfully_body_text_system', { price: newOrder[i].price, amount: newOrder[i].amount }), color: 'red' })
        }

        if (newOrder[i].origin === 4 && this.userSetting.reduce) {
          $this.$toast({ title: $this.$t('system_automatic_warehouse_closing'),
            body: $this.$t('successfully_body_text_reduce', { price: newOrder[i].price, amount: newOrder[i].amount }), color: 'red' })
        }
   
        if (newOrder[i].origin === 1 && this.userSetting.deal) { 
          setTimeout(function() {
            let side = ''
            newOrder[i].side === 1 ? side = $this.$t('order_side_buy') : side = $this.$t('order_side_sell')
            $this.$toast({ title: $this.$t('successful_trade'),
              // body: $this.$t('successful_purchase_of_contracts', { language: cn, amount: newOrder[i].amount }),
              body: $this.$t('order_apply_message_c', { price: newOrder[i].price, side, amount: newOrder[i].amount, currency: newOrder[i].currency.replace('USD','') }),
              color: 'green' })
          }, 3000 * number)
          number++
        }
      }
    },
    downStep() { 
      for (var i = 0; i < this.problemLstt.length; i++) {
        if (this.problemLstt[i] === '') {
          this.problemError = false
          this.problemText = this.$t('answer_the_question')
          return false
        } else if (this.problemLstt[i] !== 'true') {
          this.problemError = false
          this.problemText = this.t('contract_error')
          return false
        } else {
          this.problemError = true
        }
      }
      if (this.problemError) {
        this.problemType = false
      }
    },
    openContractAccount() {
      service
        .activeContract(this.pairInfo.symbol, this.state.isSimulation)
        .then(res => {
          if (!res.code) {
            this.contractNotActive = !res.data.state 
            utils.success(this.$t('contract_has_active'))
            this.$eh.$emit('protrade:balance:refresh')
          } else {
            utils.alert(res.message)
          }
        })
    },
    openSetting() {
      this.showCalculator = true
    },
    changePair(pair) {
      this.$router.replace({
        name: 'future',
        query: {
          pair: pair
        }
      })
    },
    setGridContainers() {
      for (var compName in this.$options.components) {
        if (!this.$refs[compName]) {
          continue
        }
        const grid = this.$refs['grid' + compName]
        this.$refs[compName].container = {
          width: grid.clientWidth,
          height: grid.clientHeight
        }
      }
    },
    async loopFetch() {
      const resp = await service.getContractSymInfo({
        symbol: this.symbol.name
      })
      if (!resp.code) {
        Object.assign(this.state.ct.pairInfo, resp.data)
      }
    },
    checkActiveContract() {
      // 先检查是否开通合约
      service
        .checkContractActive(this.pairInfo.symbol, this.state.isSimulation)
        .then(res => {
          if (!res.code) {
            this.contractNotActive = !res.data.state
            window.localStorage['contract'] = this.contractNotActive
          }
        })
    },
    handleSocketData (res) { 
      const key = res.topic && res.topic.split('@')[0]
      this.mapHandlerSocket[key] && this.mapHandlerSocket[key](res.data)
    }, 
    subMarket() {  
      const that = this
      if (this.socket) {
        that.socket.$destroy()
      }
      this.socket = wsNew.create()
      this.utils.$tvSocket = this.socket
      this.socket.$on('open', () => { 
        that.socket.heartCheck.start() 
        that.socket.socket.send('{"op":"subscribepub","args":["market@ticker"]}') 
        if (that.state.userInfo) {
          that.socket.socket.send(`{"op":"loginWeb","args":["${that.state.userInfo.session_id}"]}`)
          that.socket.socket.send('{"op": "subscribe", "args": ["liquid"]}')  
          that.socket.socket.send('{"op":"subscribe","args":["orderfills"]}')
          that.socket.socket.send('{"op":"subscribe","args":["position"]}')
          that.socket.socket.send('{"op":"subscribe","args":["trigger"]}')
        } 
        if (that.state && that.state.ct && that.state.ct.pair) {
          that.socket.socket.send(`{"op":"subscribepub","args":["orderbook@${that.state.ct.pair}@${that.dataDeep}@1@20"]}`)
          that.socket.socket.send(`{"op":"subscribepub","args":["deal@${that.state.ct.pair}"]}`)
        }
      })
      this.socket.$on('message', (data) => {  
        that.handleSocketData(data) 
      })
      this.socket.$on('reopen', () => { 
        that.socket.$destroy()
        that.subMarket()
      })
    },
    handleHeart(data) {  
      if (this.socket) {
        this.socket.heartCheck.start()
      }
    },
    handleLiquid(data) { 
      if (data.state === 1) {
        // this.fetchData()
      }
    },
    handleOrderbook(data) { 
      this.delegateData = data
    },
    handleTickers (data) {   
      data.map(item => {
        this.patch(item)
      }) 
    },
    handleDealSoket (data) {  
      this.dealList = data 
      let side = this.dealList ? this.dealList[0].side : "buy" 
      if (side == "buy") {
        this.state.ct.lastSide = 1
      } else if (side == "sell") {
        this.state.ct.lastSide = 2
      }
    },
    handleAmountObj(data) {
      console.log('handleAmountObj')
    }
  }
}
</script>
<style lang="scss" scoped>
.contract-eqcode{
  width: 100px;
  float: right;
  padding: 10px;
  line-height: 1.2;
  background: rgba(247,247,247,1);
  margin-top: -150px;
  color: rgba(201,170,109,1);
  font-size: 12px;
  img{
    width: 100%;
    display: block;
    margin-bottom: 10px;
  }
}
.contract-btn{
  width: 200px;
  height: 35px;
  background: $primary;
  border-radius: 24px;
  color: #fff;
  text-align: center;
  border: none;
  margin: 0 auto;
  display: block;
  margin-top: 15px;
  cursor: pointer;
}

.contract-switch{
  overflow: hidden;
  display: block;
  height: 50px;
  text-align: center;
  ul{
    width: 500px;
    text-align: center;
    display: block;
    border-bottom: 1px solid #ddd;
    margin: 0 auto;
    margin-top: 20px;
    padding-bottom: 5px;
  }
  li{
    display: inline-block;
    width: 200px;
    &.contract-active{
      color:rgba(201, 170, 109, 1);
      position: relative;
      span{
        background-color: $primary
      }
      &:after{
        content: '';
        position: absolute;
        bottom: -5px;
        left: 70px;
        display: block;
        height: 2px;
        background-color: $primary;
        width: 60px;
      }
    }
    span{
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background-color: #999999;
      color: #fff;
      font-size: 12px;
      line-height: 22px;
      margin-right: 5px;
    }
  }
}
.m_title_new{
  font-size: 22px;
  display: block;
  text-align: center;
  p{
    font-size: 14px;
    margin-top: 20px;
    color:rgba(153,153,153,1);
  }
}
.contract-error{
  display: block;
  text-align: center;
  color:rgba(242, 78, 77, 1);
  margin-top: 10px;
  font-size: 12px;
}
.contract-problem-list {
    font-size: 14px;
    margin-top: 10px;
    line-height: 1.5;
    color: rgba(33, 33, 33, 1);
    h1{
      margin-bottom: 10px;
      strong{
        width: 15px;
        height: 15px;
        background-color: #f24e4d;
        text-align: center;
        display: inline-block;
        color: #fff;
        border-radius: 20px;
        line-height: 15px;
        font-size: 12px;
      }
    }

    span{
      color:rgba(153, 153, 153, 1);
      display: block;
      position: relative;
      font-size: 12px;
      cursor: pointer;
      input{
        position: absolute;
        width: 100%;
        top:0;
        left:0;
        height: 100%;
        z-index: 1;
        opacity: 0;
      }
      input:checked+label{
        &:after{
          position: absolute;
          left: -25px;
          content: '';
          display: block;
          top: -2px;
          width: 6px;
          height: 6px;
          background-color: #fff;
          border-radius: 10px;
          border: 6px solid $primary;
          color: #fff;
          text-align: center;
          font-size: 30px;
          line-height: 0.2;
        }
      }
      label{
        position: relative;
        top: -4px;
      }
      &:before{
        display: inline-block;
        content: '';
        width: 15px;
        height: 15px;
        border-radius: 20px;
        border: 1px solid #999999;
        margin-right: 5px;
      }
    }
}
.page-contract {
  // 隐藏滚动条
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;

  .overflow-hidden {
    // 防止小屏幕出现白边
    overflow: hidden;
  }
  .overflow-x-hidden {
    // 防止小屏幕出现白边
    overflow-x: hidden;
  }
  background-color: $contract-bg;
  .ix-row {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // margin-top: 4px;
  }
  .ix-col {
    // background-color: $contract-block-bg;
    display: flex;
    flex-direction: column;
    /deep/ .ix-pannel {
      flex: 1;
      // display: flex;
      // flex-direction: column;
      position: relative;
      background-color: $contract-block-bg;
      .ix-header {
        background-color: $contract-block-active-bg;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        padding: 0 12px;
        box-sizing: border-box;
        color: #fff;
      }
    }
  }
  .ix-col-1 {
    flex: 1;
    flex-shrink: 1;
  }
  .ix-col-2 {
    width: 232px;
    flex-shrink: 0;
  }
  .ix-col-3 {
    width: 232px;
    flex-shrink: 0;
  }
  .ix-col-4 {
    width: 20%;
    min-width: 310px;
    max-width: 340px;
    flex-shrink: 0;
  }

  .tradingview-container {
    height: 507px;
  }
  .contract-active-modal {
    width: 674px;
    box-sizing: border-box;
    padding: 30px;
    .m_title {
      font-size: 18px;
      color: #393d4d;
      margin-bottom: 28px;
      font-weight: bold;
    }
    .m_detail {
      line-height: 20px;
      color: #666666;
      font-size: 14px;
      margin-bottom: 14px;
    }
      width: 880px;
      box-sizing: border-box;
      padding: 30px;
      .m_title {
          font-size: 18px;
          color: #393D4D;
          margin-bottom: 28px;
          font-weight: bold;
      }
      .m_detail {
          line-height: 20px;
          color: #666666;
          font-size: 14px;
          margin-bottom: 14px;
      }
  }
  @media screen and (max-height: 900px) {
      .contract-problem {
         height: 400px;
          overflow-x: hidden;
          overflow-y: scroll;
      }
      .contract-btn{
         margin-bottom: 40px;
      }
  }
  .order-section {
    .only-orders {
      display: flex;
      height: 448px; // 和右侧对其
      overflow: hidden;
    }
  }
}
</style>
