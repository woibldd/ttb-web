<template>
  <div class="page-contract">
    <div :class="['container-trade-panel', state.skin]">
      <!-- 1-1 -->
      <div  style="width: 100%;" flex > 
        <div class="x-col ml-4 mr-4" flex-box="1" > 
          <div class="x-row-1 "> 
            <div  class="r1-c2-r1 ">   
              <div class="product-row" flex="left"> 
                <div class="product-info" flex="box:first cross:center"> 
                  <div > 
                    <el-popover  
                      :popper-class="[state.skin, 'pd-0']"  
                      trigger="hover">
                      <div class="drop-down">
                        <div>
                          <el-row>
                            <el-col :span="10" class="pl-22">{{$t('pair')}}</el-col>
                            <el-col :span="9">{{$t('price')}}</el-col>
                            <el-col :span="5" class="txr pr-25">{{$t('increase')}}</el-col>
                          </el-row>
                        </div>
                        <div v-for="(item, idx) in sortedList" :key="idx" class="drop-item">  
                          <div 
                            :class="[{'router-link-exact-active': item.symbol===state.ct.pair}, 'link']"
                            @click="handleProductsChange(item)">
                            <el-row >
                              <el-col :span="10" class="label pl-10"><span class="currency">{{item.product_name}}</span> <span class="">{{$t('fund.contract.future')}}</span> </el-col>
                              <el-col 
                                :class="[(item.tick || {}).increment_24h > 0?'text-success':'text-danger']"
                                :span="8">
                                {{`$${+(item.tick || {}).current}`}}
                              </el-col>
                              <el-col 
                                :class="[(item.tick || {}).increment_24h > 0?'text-success':'text-danger', 'txr', ' pr-10']"
                                :span="6" >
                                {{+(item.tick || {}).change_24h > 0 ? '+' : ''}}{{(item.tick || {}).change_24h || 0 | round(2)}}%
                              </el-col>
                            </el-row> 
                          </div> 
                        </div>
                      </div>
                      <span slot="reference"><label  v-if="pairInfo" class="f20 bold">{{ `${pairInfo.product_name} ${$t('fund.contract.future')}`}} <icon name="arrow-down" /> </label> </span>
                    </el-popover>  
                  </div> 
                </div> 
                <div class="product-info mr-15" flex="cross:center" > 
                  <label  v-popover:popLeverageC  class="lever-label">
                    <span v-if="+activeLever===0">{{$t('contract_cal_full')}}</span>
                    <span v-else>{{$t('contract_cal_step')}}</span>
                  </label> 
                  <label  v-popover:popLeverageD class="lever-label" style="min-width: 28px;"> 
                    <span v-if="!+activeLever">{{pairInfo.max_leverage}}X</span>
                    <span v-else>{{activeLever}}X</span> 
                  </label>
                  <el-popover  
                    @show="handleLeverInit"
                    ref="popLeverageC"
                    placement="bottom-start"
                    :popper-class="state.skin">
                    <div class="txr"> <label @click="handleLeverClose"><icon style="font-size: 20px;" name="close"/></label>  </div>
                    <div >
                      <leverBox 
                        :pair="`${pairInfo.product_name}/${pairInfo.currency_name}`"
                        :lever="activeLever"
                        :map="mapLever"
                        @changeLever="handleClickLeveragePreview"/> 
                    </div>
                  </el-popover> 
                  <el-popover
                    @show="handleLeverInit"
                    ref="popLeverageD"
                    placement="bottom-start"
                    :popper-class="state.skin">
                    <div class="txr"> <label @click="handleLeverClose"><icon style="font-size: 20px;" name="close"/></label>  </div>
                    <div >
                      <leverBox 
                        :pair="`${pairInfo.product_name}/${pairInfo.currency_name}`"
                        :lever="activeLever"
                        :map="mapLever"
                        @changeLever="handleClickLeveragePreview"/> 
                    </div>
                  </el-popover> 
                </div>  
                <div class="product-info mr-25" flex="cross:center"> 
                  <div>
                    <div class="tick-info">
                      <label  :class="[(pairTick || {}).increment_24h > 0?'text-success':'text-danger']">{{(pairTick || {}).current}}</label>
                    </div>
                    <div class="">
                      <label class="f11 c-8a mb-6">≈ {{ state.fiatMoneySymbol }}<fiat-money
                            base="USDT"
                            :value="(pairTick || {}).current"/></label> 
                    </div>
                  </div>
                </div> 
                <div class="product-info mr-25" flex="cross:center"
                  v-for="(value,key) in mapDishNewInfo"
                  :key='key'>
                  <div>
                    <div class="tick-info">{{ $tR(`mapDishNewInfo.${key}`) }}</div>
                    <div class="tick-value">
                      <span v-if="key==='fee_rate'"> 
                        <router-link
                          :class="{'text-success':$big((pairInfo || {}).fee_rate || 0).gt(0), 'text-danger':$big((pairInfo || {}).fee_rate || 0).lt(0)}" 
                          :to="{name: 'ContractFee'}"> {{ $big((pairInfo || {}).fee_rate || 0).times(100).round(4).toFixed(4) }}% </router-link> 
                      </span>
                      <span v-else-if="key==='markPrice'"> {{(markTick || {}).current }}</span>
                      <span v-else-if="key==='indexPrice'"> {{(indexTick || {}).current }}</span>  
                      <span v-else-if="key==='increment_24h'" > 
                        <span v-if="((pairTick || {})['increment_24h'] || 0) > 0" class="text-success">
                          {{(pairTick || {})['increment_24h']}}
                        </span> 
                        <span v-else class="text-danger">
                          {{(pairTick || {})['increment_24h']}}
                        </span>
                      </span> 
                      <span v-else-if="key==='volume_24h'"> {{(pairTick || {})[key] | pretty }}</span>
                      <span v-else>
                        {{(pairTick || {})[key] }}
                      </span> 
                    </div>
                  </div>
                </div>  
                <div class="product-info mr-25"  flex="cross:center">
                  <label class="pointer tool" @click="swithStyle"> 
                    <icon v-if="state.skin==='dark'" name="sun" />
                    <icon v-if="state.skin==='light'" name="moon" />
                  </label>
                </div> 
              </div>
            </div>   
          </div>
          <div class="x-row-2 mt-4" flex>
            <div style="min-width: 615px;" flex-box="1">
              <!-- pair info -->
              <div class="r1-c2-r2">
                <div class="tv-tools ml-10" flex="cross:center">
                  <el-dropdown @command="handleCyclesCommand" size="mini">
                    <span class="el-dropdown-link pointer">
                      <span style="display: inline-block; width:36px; white-space: nowrap;">{{ $t(`tv.cycles.${local.intervalText}.text`)}}</span> <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown"> 
                      <el-dropdown-item 
                        v-for="(value, key) in mapCycles"  
                        :command="key"
                        :key="key"> 
                        <div style="width: 50px; text-align:center;" >{{value.text}}</div>
                      </el-dropdown-item> 
                    </el-dropdown-menu>
                  </el-dropdown> 
                  <div class="sep" :class="[state.skin]"></div>
                  <el-dropdown @command="handleTypesCommand">
                    <span class="el-dropdown-link pointer">
                      {{ $t('tv.navs.left.style') }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span> 
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item 
                        v-for="(value, key) in mapChartTypes"  
                        :command="key"
                        :key="key"> 
                        <label>
                          <icon class="f24" :name="value.icon" /> 
                          <span>{{value.name}}</span> 
                        </label> 
                      </el-dropdown-item> 
                    </el-dropdown-menu>
                  </el-dropdown> 
                  <div class="sep" :class="[state.skin]"></div>
                  <label class="el-dropdown-link pointer" @click="handleTVOption('indicators')"><icon name="view"/></label> 
                  <div class="sep" :class="[state.skin]"></div>
                  <label class="el-dropdown-link pointer" @click="handleTVOption('drawing')">{{ $t('tv.navs.left.drawing_tools') }}</label>
                  <div class="sep" :class="[state.skin]"></div>
                  <label class="el-dropdown-link pointer" @click="handleTVOption('setting')"><icon name="setting" /></label>
                  <div class="sep" :class="[state.skin]"></div>
                  <!-- <label>计算器</label> -->
                  <label class="el-dropdown-link pointer" @click="handleTVOption('fullscreen')"><icon name="fullscreen" /></label>
                </div>
                <div class="tv-tab">
                  <label :class="{active:selectTV==='kline'}" @click="selectTV='kline'">{{ $t('tv.navs.right.kline') }}</label>
                  <label :class="{active:selectTV==='depth'}" @click="selectTV='depth'">{{ $t('tv.navs.right.deep') }}</label>
                </div>
              </div> 
              <!-- K线 -->
              <div class="r1-c2-r3">
                <div v-show="selectTV==='kline'">
                  <tradingView
                    style="height:617px;"
                    ref="tradingView" /> 
                </div> 
                <div v-show="selectTV==='depth'" class="delegate-list" :skin="state.skin">
                  <div
                    class="header"
                    flex="main:justify">
                    <span> {{ $t('orderbook_chart') }}</span>
                  </div> 
                  <contract-deepth :dataList="delegateData"/>
                </div> 
              </div>
            </div>
            <div class="x-col ml-4" > 
              <div class="r1-c3-r1" style="width: 250px;" flex-box="0">
                <!-- <el-tabs v-model="selectOrderList"  >
                  <el-tab-pane :label="$t('contract_block_orderbook')" name="delegate"> 
                    <order-book :deepthData="delegateData"/>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('contract_block_orderdeal')" name="deal"> 
                    <order-deal :dataList="dealList"/>  
                  </el-tab-pane> 
                </el-tabs> -->
                <div class="list-wrap">
                  <div class="delegate-list" :skin="state.skin"> 
                    <div class="title-delegate">{{$t('contract_block_orderbook')}}</div>
                     <order-book :deepthData="delegateData" :singleSideLength="4"/>
                  </div>
                  <div class="delegate-list" :skin="state.skin">
                    <div class="title-delegate">{{$t('contract_block_orderdeal')}}</div>
                    <order-deal :dataList="dealList"/>  
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
        <div class="r1-c4 x-col mr-4" flex-box="0" style="width:322px;"> 
          <div class="r1-c4-r1 account-box">
            <order-action ref="order-action"/>
          </div> 
        </div>
      </div>  
      <!-- 2-1 -->
      <div class="ix-row overflow-hidden">
        <!-- 成交历史 -->
        <div class="ix-col ix-col-1">
          <history/>
        </div>
        <!-- 市场信息 -->
        <!-- <div class="ix-col ix-col-4 ml-4">
          <market-info/>
        </div> -->
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
import tickTableMixin from './contract-tick-table'
import { state, actions, local } from '@/modules/store'
import calculate from './components/calculate'
import ContractSetup from './components/setup'
import utils from '@/modules/utils'
import service from '@/modules/service'
import pairInfoMixins from './components/statePairInfoComputedMixins' 
import wsNew from '@/modules/ws-new'
import leverBox from '@/components/LeverBox' 
import registryToast from "@/libs/toast/index";
// import symList from '@/components/contractSymbolList' 

export default {
  name: 'ContractMix',
  components: {
    // symList,
    pairTable,
    tradingView,
    history,
    contractDeepth,
    marketInfo,
    orderBook,
    orderDeal,
    orderAction,
    calculate,
    ContractSetup,
    leverBox  
  },
  mixins: [tickTableMixin, pairInfoMixins],
  data() {
    return {
      state,
      local,
      utils,
      socket: null,
      problemType: true,
      problemError: true,
      problemLstt: ['', '', '', '', '', '', '', ''],
      // 计算器
      showCalculator: false,
      showSetupModal: false,
      problemText: '',
      // 合约激活
      contractNotActive: false, 
      delegateData: null,
      activeProduct: {},
      dataDeep: '0',
      dealList: [],
      selectOrderList: 'delegate',
      selectTV: 'kline',
      balanceFilterList: [], //过滤后的账户列表  
      popLeverage: false,
      popLeverageB: false,
      isProportion: 0, //百分比下单
      proportionBuy: 0, //
      proportionSell: 0,
      allSymbolList: {}, 
    }
  },
  computed: { 
    activeLever() { 
      return (state.ct.holding || {}).leverage || 0
    },
    langData() {
      return this.$i18n.messages[this.$i18n.locale].contract
    }, 
    mapDishNewInfo () {
      return this.langData.mapDishNewInfo
    },
    isLogin() {
      return !!this.state.userInfo
    },
    pairTick() {
      if (this.state.ct.pairTick) {
        return this.state.ct.pairTick
      }
      return {}
    },
    markTick() {
      if (this.state.ct.markTick) {
        return this.state.ct.markTick
      }
      return {}
    },
    indexTick() {
      if (this.state.ct.indexTick) {
        return this.state.ct.indexTick
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
    },
    mapChartTypes () {
      return this.allLangData.tv.chart_types
    },
    mapCycles () {
      return this.allLangData.tv.cycles
    }, 
    mapLever () {
      if (!this.pairInfo || !this.pairInfo.name) return []  
      return this.pairInfo.leverages.split(',')
    },
  },
  watch: {
    problemLstt: function() {
      console.log(this.problemType, !this.problemType)
    },
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
 
            if (this.socket && this.state.ct.pair) {
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
    this.state.skin =  this.local.skin
    this.subMarket()
    //如果地址带有邀请码信息则将邀请码写入cookie中，有效期为10天 2019/10/16 yzf
    let invitorId = this.$route.query.invitor
    let agentId = this.$route.query.agent
    if (invitorId) {
      utils.setCookie('invitor', invitorId, 10) 
    } else if (agentId) {
      utils.setCookie('invitor', agentId, 10) 
    }
    
    service.MessageSettings().then(resp => {
      if (!resp.code) {
        this.state.ct.userSetting = resp.data
      }
    }) 

    await actions.updateSession()
      console.log('updateSession')
    document.querySelector('.page-loading').classList.add('show')
    if (!this.$route.query.pair) {
      const res = await service.getContractSymList()
      if (res.code) {
        return utils.alert(res.message)
      }
      const pair = res.data.items.filter(item => item.name === local.future).length
        ? local.future
        : res.data.items[0].name 
      // 保存所有币对的基本信息
      this.state.ct.pairInfoList = {}
      res.data.items.forEach(element => {
        this.state.ct.pairInfoList[element.name] = element
      })

      this.$router.replace({ 
        query: {
          pair: pair
        }
      })
    } else {  
      console.log('ppppppppppppppppinfores')
      // const infores = await service.getContractSymInfo({ symbol: this.$route.query.pair })
      //  if (!infores.code) {  
      //   Object.assign(this.state.ct.pairInfo, resp.data) 
      //  }
      this.loopFetch()
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
    // this.loadSymbolList()
  },
  methods: {  
    handleLeverClose() {  
      if (this.$refs['popLeverageC']) { 
        this.$refs['popLeverageC'].doClose()
        this.$eh.$emit('lever-box-init')
      } 
      if (this.$refs['popLeverageD']) { 
        this.$refs['popLeverageD'].doClose()
        this.$eh.$emit('lever-box-init')
      }
    }, 
    handleLeverInit() {  
      this.$eh.$emit('lever-box-init')
    }, 
    async handleClickLeveragePreview(lever) {  
      this.$refs['order-action'].mmChangeConfirm(lever)
    },
    swithStyle() { 
      if (this.state.skin === 'light') {
        this.local.skin = 'dark'
        this.state.skin = 'dark' 
        this.$refs.tradingView.switchSkin('dark')
      } else {
        this.local.skin = 'light'
        this.state.skin = 'light' 
        this.$refs.tradingView.switchSkin('light')
      } 
    }, 
    handleProductsChange(product) {
      const pair = product.product === 'FUTURE' ? product.name : product.symbol 
      this.$router.push({ 
        name: product.product.toLowerCase(),
        query: { pair }
      }) 
    }, 
    handleActiveTypeClick(tab, event) { 
      this.isProportion = 0
    },
    handleTVOption(option, para) {
      this.$refs.tradingView.handleOption(option, para)
    },
    handleTypesCommand(command) { 
      this.$refs.tradingView.handleOption('chartType', command)
    },
    handleCyclesCommand(command) {
      this.$refs.tradingView.handleOption('cycle', command)
    },
    handleProportion(num) { 
      this.isProportion = num
        this.activeAcountAndPriceArr[1] = ''
      if (+this.activeTypesKey === 1) {
        let amount = 0
        let quantity = 0  
        amount = this.$big((this.activeBalance||{}).available_balance).
          div(this.$big(1).div(+this.activeLever===0 ? this.pairInfo.max_leverage : this.activeLever).times(this.$big(1).plus(this.pairInfo.im)).plus(this.$big(this.pairInfo.take_rate).times(2)))
        quantity = amount.div(this.$big(this.pairInfo.multiplier).times(this.activeAcountAndPriceArr[0] || this.pairTick.current)).times(num).round(0, 0)
        this.activeAcountAndPriceArr[1] = quantity   
      } else { 
      }
    }, 
    onresize() {
      // let bodyHeight = this.container.height - 88 + 'px'
    }, 
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
        // this.$refs[compName].container = {
        //   width: grid.clientWidth,
        //   height: grid.clientHeight
        // }
      }
    },
    async loopFetch() {
      const resp = await service.getContractSymInfo({
        symbol: this.state.ct.pair
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
        // console.log(data)
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
      // console.log('handleOrderbook')
      this.delegateData = data
    },
    handleTickers (data) {  
      data.forEach(item => {
        this.patch(item)
      })
    },
    handleDealSoket (data) { 
      this.dealList = data
      let side = this.dealList.length ? this.dealList[0].side : "buy" 
      if (side == "buy") {
        this.state.ct.lastSide = 1
      } else if (side == "sell") {
        this.state.ct.lastSide = 2
      }
    },
    handleAmountObj(data) {
      console.log('handleAmountObj')
    }
  },
  beforeDestroy() {
    // document.title = config.title
    if (this.socket) {
      this.socket.$destroy()
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
  background: #01CED1;
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
        background-color: #01CED1
      }
      &:after{
        content: '';
        position: absolute;
        bottom: -5px;
        left: 70px;
        display: block;
        height: 2px;
        background-color: #01CED1;
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
          border: 6px solid #01CED1;
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
 
  .r1-c1-r1 {
    background: #ffffff;
  }
  .r1-c2-r1 {
    height: 60px;
    background: #ffffff;
    label {
      margin-left: 10px;
    }
    .product-info {
      height: 60px;
      font-size: 12px;
    }
  }
  .lever-label {
    padding: 1px 3px;
    border:1px solid $primary;
    background-color: rgba($primary, 0.1);
    border-radius: 3px;
    text-align: center;
    color: $primary;
    font-size: 12px;
  }
  .r1-c2-r2 {
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    align-items: center;
    height: 60px;
    .tv-tools {
      @include clearfix();
      color:#9B9B9B;
      .draw {
        border:1px solid;
      }
      .tool {
        float: left;
        .iconfont {
          color:#9B9B9B;
        }
      }
      label.el-dropdown-link {
        padding: 4px 12px;
        &:hover {
          color: #dddddd;
        }
      }
      .el-dropdown-link:hover {
        color: #eeeeee;
      }
      .sep {
        float: left;
        margin: 0 5px;
        width:1px;
        height: 20px;
        background-color: #dddddd;
        &.dark {
          background-color:#606266;
        }
      }
    }
    .tv-tab {
      margin: 0 10px;
      font-size: 0;
      label {
        font-size: 14px;
        padding: 5px 10px;
        margin: 0;
        border: 1px solid $primary;
        color: $primary;
        &.active {
          background-color: $primary;
          color: #ffffff;
        }
      }
    }
  } 
  .r1-c3-r1 {
    background: #ffffff;
    .el-tabs /deep/ .el-tabs__header {
      margin: 0;
    }
  }
  .dark { 
    // background:$--contract-table-bg2; 
    color: #ffffff;
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
    .lever-tab {
      color: #ACACAC;
    }
  }
  
  .container-trade-panel.dark {
    background-color: #272837;
    color: #ffffff;
    .r1-c1-r1,.r1-c2-r1,.r1-c2-r2,.r1-c3-r1 {
      background:$--contract-table-bg2; 
    }
  }
  .r1-c3-r1 {
    .delegate-list { 
      &:not(:first-child) {
        .title-delegate {
          border-top: 4px solid $--contract-table-bd;
        }
      }
      .header {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        background: #EDEDED;
        padding: 0 10px;
      }
      .title-delegate {
        padding: 6px 13px;
        border-bottom: 2px solid $--contract-table-bd;
        text-align: left;
        font-size: 12px;
        line-height: 24px;
        
      }
    }
    .delegate-list[skin~='dark'] {
      color:#ACACAC;
      background: $--contract-table-bg2; 
      &:not(:first-child) {
        .title-delegate {
          border-top-color: $contract-bg2;
        }
      }
      .header {
        background-color: #1d1d1d;
      }
      .title-delegate {
        border-bottom-color: $contract-bg2;
      }
    }
  }
  

  .ix-row {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 4px;
  }
  .ix-col {
    // background-color: $contract-block-bg;
    display: flex;
    flex-direction: column;
    /deep/ .ix-pannel {
      flex: 1;
      // display: flex;
      // flex-direction: column;
      background-color: $contract-block-bg;
      .ix-header {
        background-color: $contract-block-active-bg;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        padding: 0 12px;
        box-sizing: border-box;
        color: $--contract-pannel-header;
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
.el-popover {  
  .drop-down {
    width: 350px; 
    line-height: 40px;
    color: #9F9F9F;
    .label {
      display:block; 
      color: $text-strong;
    }
    .drop-item { 
      cursor: default;  
      .link {
        padding: 0 12px;
      }
      .router-link-exact-active {
        color: $primary; 
        background-color: #f9f9f9;
      }
      .currency {
        font-size: 16px;
      }
      .product {
        font-size: 12px;
        color: #9f9f9f;
      }
      &:hover {
        // background-color: rgba($primary, 0.1)
        background-color: #f9f9f9;
      }
    }

  }
  &.dark {
    .drop-down { 
      .drop-item {
        .router-link-exact-active { 
          background-color: #222222;
        }
        &:hover { 
          background-color: #222222;
        } 
      }
      .label {
        color: #ffffff;   
      }
    }
  }
  .pop-lever-box { 
    .title {
      padding: 6px 0 10px 0;
      text-align: center;
    }
    .content {
      padding: 10px 0;
      .pbtn {
        position: relative;
        padding: 10px;
        border: 1px solid #484B51;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        &.active {
          border-color: $primary;
          &::after {
            position:absolute;
            top: -6px;
            right: -6px;
            display: block;
            content: '';
            width: 20px;
            height: 20px;
            // background: url(~@/assets/site/fucoin/icon/selected.png) center center/20px 20px no-repeat;
          } 
        }
      }
      .lbtn {
        color: #484B51;
      }
    }
    .el-button {
      width: 100%;
      &.active { 
        border-color: $primary;
      }
    } 
    &[skin~='dark'] {
      background-color: #2B2E34;
      color: #ffffff;
      .content {
        .pbtn.active {
          color: $primary;
        } 
        .lbtn {
          color: $primary;;
        }
        .el-input-number {
          /deep/ .el-input-number__decrease,
          /deep/ .el-input-number__increase,
          /deep/ .el-input input {
            background-color:#484B51;
            color: #ffffff;
          } 
        }
        .el-button {
          background-color:#484B51;
          color: #ffffff;
          &.active {
            color: $primary;
            border-color: $primary;
          }
        }
      }
    }
  }
}
</style>
