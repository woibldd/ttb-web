<template>
  <div class="unit-contract-container">
    <v-nav from="unit"/>
    <div class="page-contract table-container">
      <!-- 1-1 -->
      <div class="ix-row overflow-hidden">
        <div class="ix-col ix-col-1"
             style="min-width:615px;">
          <!--pair tab -->
          <div v-loading="!products.length"
               element-loading-background="rgba(0, 0, 0, 0.3)">
            <div flex="main:left cross:strech"
                 class="tabs-group">
              <div v-for="(product,index) in products"
                   :key="index"
                   :class="{active:activeProduct.name === product.name}"
                   flex="dir:top main:center"
                   @click="handleProductsChange(product)">
                <p style="white-space: nowrap;">{{ $tR(`mapTabs.${product.name}`) }}</p>
                <span v-if="product.UNIT"
                      :class="[product.UNIT.increment_24h > 0?'text-success':'text-danger']">
                  {{ calcIncreaseRate(product) }}%
                  <svg-icon :icon-class="product.UNIT.increment_24h > 0?'lv':'hong'" />
                </span>
              </div>
            </div>
          </div>
          <!-- pair info -->
          <div v-loading="!activeProduct.UNIT"
               class="dish-info mt-4"
               element-loading-background="rgba(0, 0, 0, 0.3)">
            <template v-if="activeProduct.UNIT">
              <div class="info-left">
                <div class="title">
                  {{ $tR(`mapTabs.${activeProduct.name}`) }}
                  <svg-icon :class="[activeProduct.UNIT.increment_24h > 0?'text-success':'text-danger']"
                            :icon-class="activeProduct.UNIT.increment_24h > 0?'lv':'hong'" />
                </div>
                <span>{{ $tR(`mapInformation.valueRate`) }}： {{ $big(symbolInfo.fee_rate || 0).times(100).round(4).toFixed(4) }}% </span>
                <span>
                  <i class="el-icon-bell"
                     v-tooltip.top-center="{html: true, content: $t('contract_fee_rate_estimate_tips', { feeRate: (symbolInfo.fee_rate * 100).toFixed(8) + '%' }), classes: 'contract'}" />
                </span>
              </div>
              <div class="info-list-box">
                <div v-for="(value,key) in mapDishInfo"
                     :key="key">
                  {{ $tR(`mapDishInfo.${key}`) }}：
                  <span :class="[matchClassByKey(key)]">{{ handleDishInfoItem(key) }}{{ key === 'change_24h' && '%' ||'' }}</span>
                </div>
                <div>≈ {{ calcToBTC }} {{ activeProduct.currency }}</div>
              </div>
            </template>

            <!-- <div class="calculator"><i class="el-icon-caret-bottom" />计算器</div> -->
          </div>
          <!-- tradingview -->
          <div class="mt-4">
            <tradingView style="height:556px;"
                         ref="tradingView" />
          </div>
        </div>
        <!-- 挂单簿 -->
        <section class="order-section"
                 style="width:500px;">
          <div class="only-orders">
            <!-- 委托列表 -->
            <div class="ix-col ix-col-2 ml-4 relative"
                 style="width:50%;">
              <div class="delegate-list"
                   v-loading="!delegateData"
                   element-loading-background="rgba(0, 0, 0, 0.3)">
                <orderBook @changeDeep="changeDeep"
                           :activeProduct="activeProduct"
                           :orderData="delegateData"
                           :lastPrice="(activeProduct.UNIT||{}).current"
                           :indexPrice="(activeProduct.INDEX||{}).current"
                           :markPrice="handleDishInfoItem('markPrice')"
                           :isBuy="isBuy" />
              </div>
            </div>
            <!--  最新成交 -->
            <div class="ix-col ix-col-3 ml-4 relative"
                 style="width:50%;">
              <div v-loading="!newBargainListData"
                   class="delegate-list"
                   style="height:448px"
                   element-loading-background="rgba(0, 0, 0, 0.3)">
                <div class="header"
                     flex="main:justify">
                  <span> {{ $tR(`mapDelegateList.new-bargain`) }}</span>
                </div>
                <div class="content-header"
                     flex="main:justify box:mean">
                  <span v-for="(value,key) in mapHeader2"
                        :key="key">{{ $tR(`mapDelegateList.mapHeader2.${key}`) }}</span>
                </div>
                <div class="content-wrap">
                  <div class="content-container">
                    <ul>
                      <li v-for="(item,index) in newBargainListData"
                          :key="index"
                          flex="main:justify cross:center box:mean">
                        <span :class="[item.side === 'buy'?'text-success':'text-danger']">{{ $tR(item.side) }}</span>
                        <span :class="[item.side === 'buy'?'text-success':'text-danger']">{{ item.values[0]|bigRound(activeProduct.price_scale) }}</span>
                        <span>{{ item.values[1] }}</span>
                        <span>{{ item.time | parseTime('{h}:{i}:{s}') }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 深度图 -->
          <div class="ix-col ix-col-1 ml-4 mt-4">
            <div class="delegate-list">
              <div class="header"
                   flex="main:justify">
                <span> 深度图</span>
              </div>
              <depthMap v-loading="!delegateData"
                        :data="delegateData"
                        element-loading-background="rgba(0, 0, 0, 0.3)" />
            </div>
          </div>
        </section>
        <!-- 操作 -->
        <!-- 交易委托， 杠杆 -->
        <div class="ix-col ix-col-4 ml-4"
             style="position:relative;">
          <div style="height:448px"
               class="form-content">
            <div class="header"
                 flex="main:justify">
              <span> {{ $tR(`mapFormContent.submitEntrust`) }}</span>
              <el-link :underline="false"
                       type="primary"
                       @click="$router.push({path:'/fund/transfer', query:{key:'2.funds-transfer'}})">{{ $t('account_exchange') }}</el-link>
            </div>
            <div v-loading="!activeBalance"
                 element-loading-background="rgba(0, 0, 0, 0.3)"
                 :class="{mini:activeBtnsKey > 2}"
                 class="content-container-submit">
              <div v-if="activeBalance"
                   flex="main:justify">
                <div v-for="(value,key) in mapFormContent.mapBtns"
                     :key="key"
                     :flex-box="+key > 2 ? 2 : 1"
                     :class="['btn', {active:activeBtnsKey === key}]">
                  <dropdown v-if="key === '3'"
                            v-model="activePriceType"
                            :menu-options="menuOptions"
                            label="label">
                    <el-button class="custom-btn"
                               :class="{active:activeBtnsKey === key}"
                               size="small"
                               plain
                               @click="handleSwitch(key)">
                      {{ activePriceType.label }} <i class="el-icon-caret-bottom" />
                    </el-button>
                  </dropdown>
                  <el-tooltip v-else
                              placement="bottom"
                              effect="dark"
                              popper-class="custom-tooltip">
                    <div slot="content"
                         style="width:200px;font-size:12px;line-height:20px">{{ $tR(`mapFormContent.mapBtns.${key}.describe`) }}</div>
                    <el-button class="custom-btn"
                               :class="{active:activeBtnsKey === key}"
                               size="small"
                               plain
                               @click="handleSwitch(key)">
                      {{ $tR(`mapFormContent.mapBtns.${key}.text`) }}
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <div v-for="(value,key,i) in mapInput"
                   :key="key"
                   flex="main:justify">
                <label for="">{{ $tR(`mapFormContent.mapInput.${key}`) }}</label>
                <div v-if="i===1 && (activeBtnsKey === '3'?!(+activePriceType.key % 2):activeBtnsKey === '2')"
                     class="transactionPrice"
                     flex="main:justify box:mean">
                  <div style="color: #666;">{{ $tR(`mapFormContent.perfactPrice`) }}</div>
                </div>
                <template v-else>
                  <div v-if="key === 'triggerType'"
                       class="transactionPrice">
                    <el-select v-model="trigger_type"
                               size="small"
                               class="custom-select">
                      <el-option v-for="(subValue,subKey) in mapFormContent.mapTriggerType"
                                 :key="subKey"
                                 :label="$tR(`mapFormContent.mapTriggerType.${subKey}`)"
                                 :value="+subKey" />
                    </el-select>
                  </div>
                  <template v-else>
                    <input :value="(i===0 || i===2) ? activeAcountAndPriceArr[i]:(activeAcountAndPriceArr[i]||(activeProduct.UNIT||{}).current)"
                           type="text" @input="e=>activeAcountAndPriceArr[i] = e.target.value.replace(/^(0+)|[^\d.]+/g,'')">
                    <span v-if="key==='shippingSpace'">{{ $t('contract_min_unit') }}</span>
                    <span v-else>USD</span>
                  </template>
                </template>
              </div>
              <div>
                <!-- <div flex="main:justify">
                  <el-tooltip popper-class="custom-tooltip">
                    <div slot="content"
                        style="width:200px;">{{ '选择直接下单后将不会弹出详细委托表单信息而直接下单，请慎重选择' }}</div>
                    <el-checkbox v-model="popoverDisabled">{{ $tR(`mapFormContent.notip`) }}</el-checkbox>
                  </el-tooltip>
                  <el-checkbox v-if="+activeBtnsKey > 2"
                              v-model="trigger_close ">{{ $tR(`mapFormContent.trigger_close`) }}</el-checkbox>
                </div> -->
                <div v-for="(value,key) in mapFormContent.mapHandleBtn"
                     :key="key">
                  <el-popover :ref="`popover-${key}`"
                              placement="right"
                              :popper-class="`contrat-popper-${key === 'buy'?'success':'danger'}-class`"
                              width="400"
                              trigger="click"
                              :disabled="popoverDisabled"
                              :title="handlePopoverTitle(key)">
                    <orderPopover v-if="activeProduct.UNIT"
                                  v-model="activeLever"
                                  :active-product="activeProduct"
                                  :loading="buyBtnLoading"
                                  :form-value-obj="formValueObj"
                                  :data="mapLever"
                                  :type="key === 'buy'?'success':'danger'"
                                  @change="setLeverage"
                                  @command="handleCommandOrder" />
                    <el-button slot="reference"
                               :type="key === 'buy'?'success':'danger'"
                               :class="{activeBtn:isBuy ? key === 'buy': key === 'sell'}"
                               :loading="buyBtnLoading"
                               :disabled="handleDisabledBtn(key)"
                               style="width:100%; padding: 0 20px; height: 40px;"
                               @click="handlePopoverClick(key)">
                      <div v-show="!buyBtnLoading"
                           flex="main:justify cross:center">
                        <span>{{ $tR(`mapFormContent.mapHandleBtn.${key}`) }}</span>
                        <span v-if="activeBtnsKey === '1'" style="font-size:12px">
                          {{ activeAcountAndPriceArr[0] }} @ {{ activeAcountAndPriceArr[1]||(activeProduct.UNIT||{}).current }} USD
                        </span>
                        <span v-else-if="activeBtnsKey === '2' && asks.last && bids.first" style="font-size:12px">
                          {{ activeAcountAndPriceArr[0] }} @ {{ key === 'buy'?asks.last[0]:bids.first[0] }} USD
                        </span>
                        <span v-else-if="activeBtnsKey === '3'" style="font-size:12px; text-align:right;">
                          <span>{{ activeAcountAndPriceArr[0] }} @ {{ (activeProduct[productType[trigger_type]]||{}).current }}</span>
                          <br>
                          <span v-if="['3','4'].includes(activePriceType.key) && activeAcountAndPriceArr[2]">{{ key === 'buy'? '≧':'≦' }} {{ activeAcountAndPriceArr[2] }}</span>
                          <span v-if="['5','6'].includes(activePriceType.key) && activeAcountAndPriceArr[2]">{{ key === 'buy'? '≦':'≧' }} {{ activeAcountAndPriceArr[2] }}</span>
                        </span>
                      </div>
                    </el-button>
                  </el-popover>

                  <p style="font-size:12px;color:#999">{{ $tR(`mapFormContent.cost`) }}：<span>{{ !activeAcountAndPriceArr[0]?'--':costObj[key] }}</span> {{ activeProduct.currency }}</p>
                </div>
                <!-- <hr> -->
                <div v-for="(value,key) in mapFormContent.mapDescribe"
                     :key="key"
                     style="font-size:12px;line-height:24px"
                     flex="main:justify">
                  <span>{{ $tR(`mapFormContent.mapDescribe.${key}.text`) }}
                    <el-tooltip popper-class="custom-tooltip"
                                placement="bottom">
                      <div slot="content"
                           style="max-width:200px;">
                        <h5>{{ $tR(`mapFormContent.mapDescribe.${key}.text`) }}</h5>
                        <p>{{ $tR(`mapFormContent.mapDescribe.${key}.tips`) }}</p>
                      </div>
                      <i class="icon-information" />
                    </el-tooltip>
                  </span>
                  <span v-if="key === 'entrustValue'"
                        class="text-primary">{{ formValueObj[1] | bigRound(8) }} {{ activeProduct.currency }}</span>
                  <el-link v-else
                           style="font-size:12px"
                           href="/fund/my/contractUnit/index"
                           type="primary">{{ (activeBalance||{}).available_balance||0| bigRound(8) }} {{ activeProduct.currency }}</el-link>
                </div>
                <!-- <div>
                  <el-checkbox class="text-light"
                               v-if="+activeBtnsKey===1"
                               v-model="passive">
                    {{ $tR(`mapFormContent.passive`) }}
                  </el-checkbox>
                </div> -->
                <!-- <div>
                  <el-checkbox v-if="+activeBtnsKey > 2"
                    v-model="trigger_close ">{{ $tR(`mapFormContent.trigger_close`) }}</el-checkbox>
                </div> -->
              </div>
            </div>
          </div>
          <div v-loading="false"
               style="height: 252px;"
               class="hold-content mt-4"
               element-loading-background="rgba(0, 0, 0, 0.3)">
            <div class="header"
                 flex="main:justify">
              <span> {{ $tR('currentPlace') }}：{{ activeProduct && $tR(`mapTabs.${activeProduct.name}`)||'' }}</span>
              <el-link type="primary"
                       :underline="false"
                       @click="$router.push({path: '/fee/unitContractFee', query: {key: 'fee.contract-fee'}})">{{ $t('contract_fee_rate') }}</el-link>
            </div>
            <div class="content-container-hold">
              <div flex="box:mean"
                   style="text-align:center">
                <p>{{ (activeBalance||{}).holding || 0 }} <br> {{ $tR('deal') }}</p>
                <p style="border-left:1px solid #333">{{ (activeBalance||{}).unrealized || 0 }} <br> {{ $tR('rateOReturn') }}</p>
              </div>
              <orderPopover v-if="activeProduct.UNIT"
                            v-model="activeLever"
                            only-lever
                            flex="dir:top"
                            :loading="buyBtnLoading"
                            :form-value-obj="formValueObj"
                            :active-product="activeProduct"
                            :data="mapLever"
                            type="success"
                            @change="setLeverage"
                            @command="handleCommandOrder" />
              <div flex="main:justify"
                   style="padding:8px">
                <p>{{ $tR('quota') }}</p>
                <p>{{ (activeBalance||{}).unrealized || 0 }}</p>
              </div>
            </div>
          </div>
          <div class="directive-login"
               v-if="!state.userInfo">
            <div class="el-button el-button--success"
                 @click="login('login')">{{ $t('appNav.signin') }}</div>
            <div class="el-button el-button--danger"
                 @click="login('register')">{{ $t('appNav.signup') }}</div>
          </div>
        </div>
      </div>
      <!-- 2-1 -->
      <div class="ix-row">
        <div class="ix-col ix-col-1">
          <div class="order-list">
            <div class="header"
                 flex>
              <div v-for="(value,key) in mapTableTapContents"
                   :key="key"
                   :class="{active:activeTableTabKey === key}"
                   @click="handleTableTabClick(key,amountObj[key][1]=false)">
                <el-badge v-if="amountObj"
                          is-dot
                          :hidden="activeTableTabKey === key ||!amountObj[key][1]">
                  <p style="min-width:120px">{{ $tR(`mapTableTapContents.${key}.text`) }}
                    <span v-if="key!=='shipped'">【{{ amountObj[key][0] }}】</span>
                  </p>
                </el-badge>
                <p v-else
                   style="min-width:120px">{{ $tR(`mapTableTapContents.${key}.text`) }}</p>
              </div>
            </div>
            <div v-loading="!calcTableList || loadingHistory"
                 class="order-list-content"
                 element-loading-background="rgba(0, 0, 0, 0.3)">
              <shipping v-if="activeTableTabKey === 'shipping'"
                        :active-product="activeProduct"
                        :products="products"
                        :mark-data="markData"
                        :current-data="currentData"
                        :data="calcTableList"
                        :table-columns="tableColumns"
                        @change="handleAmountObj" />
            
              <historyTable v-if="activeTableTabKey !== 'shipping' && calcTableList"
                            header-row-class-name="contract-order-list-row-class"
                            row-class-name="contract-order-list-row-class"
                            size="mini"
                            @loadMore="loadNext"
                            :currentTab="activeTableTabKey"
                            :products="products"
                            :table-list="calcTableList"
                            :last-column-config="lastColumnConfig"
                            :table-columns="tableColumns">
                <div slot="handlerDom"
                     slot-scope="{data}">
                  <el-button size="mini"
                             type="danger"
                             :loading="data.cancelBtnLoading"
                             @click="cancelOrder(data)">{{ $tR('cancel') }}</el-button>
                </div>
              </historyTable>
            </div>
            <div class="directive-login"
                 v-if="!state.userInfo">
              <div class="el-button el-button--success"
                   @click="login('login')">{{ $t('appNav.signin') }}</div>
              <div class="el-button el-button--danger"
                   @click="login('register')">{{ $t('appNav.signup') }}</div>
            </div>
          </div>
        </div>
        <div class="ix-col ix-col-4 ml-4">
          <div v-loading="!delegateData"
               class="information"
               element-loading-background="rgba(0, 0, 0, 0.3)">
            <div class="header"
                 flex="main:justify">
              <span>{{ $t('contract_symbol_detail') }}{{ activeProduct && $tR(`mapTabs.${activeProduct.name}`)||'' }}</span> 
              <router-link
                class="pointer" 
                :to="{name: 'UnitIndex', params: {pair: (activeProduct || {}).symbol }}">
                {{ $t('contract_more_resource') }}
              </router-link> 
            </div>
            <div v-if="delegateData && activeProduct.UNIT"
                 style="font-size:14px;"
                 class="information-content">
              <div class="content-center">
                <p style="font-size:20px;"
                   flex="main:center cross:center"
                   :class="[isBuy?'text-success':'text-danger',triggerBtn && 'justify'||'']">
                  <span>
                    {{ activeProduct.UNIT.current | bigRound(activeProduct.price_scale) }}
                    <svg-icon :icon-class="isBuy?'lv':'hong'" />
                  </span>
                  <!-- <el-link v-if="triggerBtn" :underline="false" type="info" @click="dataLoaded(true)">{{ $tR(`mapDelegateList.return-dish`) }}</el-link> -->
                </p>
                <div flex="main:center cross:center">
                  <!-- <div>{{ activeProduct.INDEX.current }} / {{ handleDishInfoItem('markPrice') }}</div> -->
                  <div>
                    <router-link
                      class="pointer text-light"
                      v-tooltip.top-center="{html: true, content: $tR('mapDelegateList.contract_index_price_tips', {product_name: (activeProduct || {}).currency}), classes: 'contract'}"
                      :to="{name: 'UnitIndex', params: {pair: (activeProduct || {}).symbol }}">{{ activeProduct.INDEX.current }}</router-link>
                    /
                    <router-link
                      class="pointer text-light"
                      v-tooltip.top-center="{html: true, content: $tR('mapDelegateList.contract_mark_price_tips'), classes: 'contract'}"
                      :to="{name: 'UnitIndex', params: {pair: (activeProduct || {}).symbol }}">{{ handleDishInfoItem('markPrice') }}</router-link>
                  
                  </div>
                  <p class="signal"
                     flex=" cross:center">
                    <a :href="adlurl"
                       target="_blank">
                      <span v-for="(i, is) in 5"
                            class="dib"
                            :class="['status-light-' + i, {'interactive': is >= adl}]"
                            :key="is" />
                    </a>
                  </p>
                </div>
              </div>
              <hr>
              <div v-for="(value,key) in mapInformation"
                   :key="key"
                   flex="main:justify">
                <p>{{ $tR(`mapInformation.${key}`) }}</p>
                <p>{{ information[key] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <v-modal :open.sync="contractNotActive">
        <contractActive @close="closeContractActive" />
      </v-modal>
    </div>
  </div>
</template>

<script>
// import candlestick from '../../components/candlestick'
import selectBase from '../../components/selectBase'
// import soket from '../../mixins/resoket'
import { bigRound, logogramNum, calcValueByAmountAndPrice, bigDiv, bigTimes, bigPlus, bigMinus, getCost, getUnitLiqPrice, getUnitTotalValue, calcProfit, toBig } from '../../utils/handleNum'
import {
  getSymbolInfo,
  getFutureListByKey,
  getSymbolList,
  getBalanceList,
  getClosedpositionList,
  getActiveorders,
  getActivetriggers,
  getActiveOrderhistory,
  getActiveOrderfills,
  // getRates,
  submitOrder,
  cancelOrder,
  getAllAmount,
  // getFinanceRecord,
  setLeverage,
  checkContractActive
  // getKlineHistoryList
} from '../../api/currencyUnit'
import depthMap from './components/depth-map'
import orderPopover from './components/orderPopover'
import shipping from './components/shipping'
// import customTable from '../../components/customTable'
import historyTable from './components/history-table'
import dropdown from '../../components/dropdown'
import tradingView from './components/contract-trading-view'
import config from '@/libs/config'
import contractActive from '../../components/contractActive'
import orderBook from './components/orderbook'
import VNav from '../../layout/VNav3'

import { state, actions } from '@/modules/store'
import utils from '@/modules/utils'
import wsNew from '@/modules/ws-new'
// import { mapPeriod } from '@/const'
export default {
  name: 'Contract',
  components: {
    // candlestick,
    selectBase,
    depthMap,
    // customTable,
    historyTable,
    shipping,
    dropdown,
    orderPopover,
    tradingView,
    contractActive,
    orderBook,
    VNav
  },
  // mixins: [soket],
  data () {
    return {
      state,
      activeProduct: {},
      activeBtnsKey: '1',
      activePriceType: {},
      activeLever: '0',
      activeTableTabKey: 'shipping',
      activeAcountAndPriceArr: [undefined, undefined, undefined],
      isBuy: true,
      triggerBtn: false,
      trigger_type: 1,
      trigger_close: false,
      dataDeep: '0',
      delegateData: null,
      newBargainListData: [],
      holdingCount: 0,
      take_rate: 0,
      tickersData: null,
      products: [],
      entrustList: null,
      tableList: null,
      buyBtnLoading: false,
      cancelBtnLoading: false,
      amountObj: null,
      balanceList: [],
      popoverDisabled: false,
      symbolInfo: {},
      historyPage: 0,
      historySize: 10,
      totalItems: 10,
      passive: false,
      contractNotActive: false,
      loadingHistory: false,
      productType: {
        1: 'UNIT',
        2: 'MARKET',
        3: 'INDEX'
      },
      utils,
      socket: null
    }
  },
  computed: {
    adlurl () {
      let link = 'https://ixcustomer.zendesk.com/hc/zh-cn/articles/360024495432'
      // if (this.state.locale === 'en') {
      //   link = link.replace('zh-cn', 'en-us')
      // }
      return link
    },
    adl () {
      if (this.activeBalance) {
        return Number(this.activeBalance.adl) || 0
      }
      return 0
    },
    mapDeepData () {
      const deep = 6
      let depthArr = []
      if (!this.activeProduct) return []
      let scale = this.activeProduct.price_scale
      for (let accuracy = scale; accuracy > scale - deep; accuracy--) {
        let offset = Math.pow(10, -accuracy).toFixed(accuracy >= 0 ? accuracy : 0)
        if (offset > 1) break
        depthArr.push({
          offset,
          accuracy: scale - accuracy
        })
      }
      return depthArr
    },
    currentDeep () {
      return this.mapDeepData[this.dataDeep] ? this.mapDeepData[this.dataDeep].offset : 0
    },
    formValueObj () {
      if (!this.activeProduct.UNIT || !this.costObj || !this.activeBalance || !this.activeProduct.MARKET) return {}
      const price = this.activeAcountAndPriceArr[1] || this.activeProduct.UNIT.current
      const getLiqPrice = this.getLiqPrice()
      return {
        1: calcValueByAmountAndPrice(this.activeAcountAndPriceArr[0], price),
        2: this.costObj[this.side === 1 ? 'buy' : 'sell'],
        3: this.activeBalance.available_balance,
        4: +this.activeBalance.holding + (this.side === 2 ? -this.activeAcountAndPriceArr[0] : +this.activeAcountAndPriceArr[0]),
        5: this.activeProduct.MARKET.current,
        6: getLiqPrice,
        7: 1 - (this.activeProduct.UNIT.current - getLiqPrice) / this.activeProduct.UNIT.current
      }
    },
    userData () {
      return this.$store.state.userData
    },
    mapDishInfo () {
      return this.langData.mapDishInfo
    },
    mapHeader1 () {
      return this.langData.mapDelegateList.mapHeader1
    },
    mapHeader2 () {
      return this.langData.mapDelegateList.mapHeader2
    },
    mapFormContent () {
      return this.langData.mapFormContent
    },
    mapInput () {
      // eslint-disable-next-line no-unused-vars
      const { triggerPrice, triggerType, ...data } = this.mapFormContent.mapInput
      return +this.activeBtnsKey > 2 ? this.mapFormContent.mapInput : data
    },
    mapInformation () {
      return this.langData.mapInformation
    },
    mapTableTapContents () {
      return this.langData.mapTableTapContents
    },
    markData () {
      return this.products.reduce((prev, curr) => {
        prev[curr.currency] = (curr.MARKET || {}).current
        return prev
      }, {})
    },
    currentData () {
      return this.products.reduce((prev, curr) => {
        prev[curr.currency] = (curr.UNIT || {}).current
        return prev
      }, {})
    },
    calcToBTC () {
      const arr = [this.activeProduct.UNIT.volume_24h, this.activeProduct.UNIT.current]
      return this.activeProduct.name === 'FUTURE_BTCUSD' ? bigDiv(arr) : bigTimes([...arr, this.activeProduct.multiplier], 2)
    },
    asks () {
      const arr = [...(this.delegateData.asks || [])]
      let max = 0
      arr.forEach((item, index, arr) => {
        max = Math.max(item.values[1], max)
        item.values[2] = index > 0 ? bigPlus([item.values[1], arr[index - 1].values[2]], 0) : item.values[1]
      })
      return { arr: arr.reverse(), max, first: (arr[0] || {}).values, last: (arr[arr.length - 1] || {}).values }
    },
    bids () {
      const arr = [...this.delegateData.bids || []]
      let max = 0
      arr.forEach((item, index, arr) => {
        max = Math.max(item.values[1], max)
        item.values[2] = index > 0 ? bigPlus([item.values[1], arr[index - 1].values[2]], 0) : item.values[1]
      })
      return { arr, max, first: (arr[0] || {}).values, last: (arr[arr.length - 1] || {}).values }
    },
    mapHandlers () {
      return {
        shipping: getBalanceList,
        shipped: getClosedpositionList,
        curEntrust: getActiveorders,
        lossEntrust: getActivetriggers,
        historyEntrust: getActiveOrderhistory,
        bargain: getActiveOrderfills
      }
    },
    tableColumns () {
      let mapTableColumns = this.mapTableTapContents[this.activeTableTabKey].mapTableColumns
      const that = this
      if (this.activeTableTabKey !== 'shipping') {
        mapTableColumns = Object.keys(mapTableColumns).map(key => ({
          hearderLabel: this.$tR(`mapTableTapContents.${this.activeTableTabKey}.mapTableColumns.${key}`),
          prop: key,
          class: (value, key, row) => {
            switch (key) {
              case 'amount':
                return row.side === 1 ? 'text-success' : 'text-danger'
              case 'side':
                return row.side === 1 ? 'text-success' : 'text-danger'
              case 'distancePrice':
                return +value > 0 ? 'text-success' : 'text-danger'
              default:
                return 'text-light'
            }
          },
          // hearderWidth: key => ['amount', 'trade_type', 'amount'].includes(key) && '50px',
          handleValue: (value, key, row) => {
            switch (key) {
              case 'amount':
                return `${row.side === 2 ? '-' : ''}${value}`
              case 'side':
                return `${row.side === 2 ? this.$tR('sell') : this.$tR('buy')}`
              case 'executed':
                return `${value}/${row.amount - value}`
              case 'type':
                return +value < 4 ? this.$tR(`mapFormContent.mapBtns.${value}.text`) : this.$tR(`mapFormContent.mapMenuOptions.${value}`)
              case 'state':
                return this.$tR(`state.${value}`)
              case 'tp_type':
                return `${value}/${row.sl_price}`
              case 'create_time':
                return this.parseTime(String(value).substring(0, 13))
              case 'distancePrice':
                return `${value > 0 ? '+' : ''}${value}`
              case 'amount_surplus':
                return row.amount_total - row.amount_last || '0'
              case 'fee':
                return this.bigRound(value, 8)
              case 'entrustValue':
                return this.bigRound(calcValueByAmountAndPrice(row.amount, row.price), 8)
              case 'price':
                return this.bigRound(value, that.mapProduct[row.name].price_scale || 2)
              default:
                return value
            }
          },
          width: (tabName, key) => {
            if (tabName === 'curEntrust') {
              if (key === 'amount' || key === 'price') {
                return '100px'
              }
            } else if (tabName === 'lossEntrust') {
              if (key === 'amount' || key === 'price' || key === 'trigger_price') {
                return '100px'
              }
            }
          }
        }))
      }
      return mapTableColumns
    },
    lastColumnConfig () {
      return ['curEntrust', 'lossEntrust'].includes(this.activeTableTabKey) ? {
        headerLabel: this.$tR('handle'),
        headerAlign: 'left'
      } : null
    },
    menuOptions () {
      const options = this.mapFormContent.mapMenuOptions
      const arr = Object.keys(options).map(key => ({
        label: this.$tR(`mapFormContent.mapMenuOptions.${key}`),
        key,
        click: item => {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.activeBtnsKey = '3'
        }
      }))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.activePriceType = arr[0]
      return arr
    },
    costObj () {
      if (!this.activeBalance) return
      const obj = {}
      const price = this.activeAcountAndPriceArr[1] || this.activeProduct.UNIT.current
      // const activeLever = !+this.activeLever ? 100 : +this.activeLever
      if (+this.activeBalance.holding < 0) {
        let buyAmount
        buyAmount = this.activeAcountAndPriceArr[0] - Math.abs(+this.activeBalance.holding)
        buyAmount = buyAmount <= 0 ? 0 : buyAmount
        obj.buy = getCost({ ...this.activeProduct, amount: buyAmount, price }, this.activeLever)
        obj.sell = getCost({ ...this.activeProduct, amount: this.activeAcountAndPriceArr[0], price }, this.activeLever)
      } else {
        let sellAmount
        sellAmount = this.activeAcountAndPriceArr[0] - +this.activeBalance.holding
        sellAmount = sellAmount <= 0 ? 0 : sellAmount
        obj.buy = getCost({ ...this.activeProduct, amount: this.activeAcountAndPriceArr[0], price }, this.activeLever)
        obj.sell = getCost({ ...this.activeProduct, amount: sellAmount, price }, this.activeLever)
      }
      return obj
    },
    mapLever () {
      if (!this.activeProduct) return []
      return this.activeProduct.leverages.split(',')
    },
    updateTableList () {
      return this.tableList && this.tableList.map(item => {
        const distancePrice = bigMinus([item.trigger_price || 0, this.activeProduct.MARKET.current || 0], 2)
        //0默认 1盘口价格 2标记价格 3指数价格
        return { ...item, distancePrice }
      }) || []
    },
    calcBalanceList () {
      return this.balanceList.filter(item => !!+item.holding).map(item => {
        const found = (this.entrustList || []).find(subItem => +subItem.id === item.future_close_id)
        if (found) item.closePrice = found.price
        return item
      })
    },
    activeBalance () {
      const found = this.balanceList.find(item => this.activeProduct.currency === item.currency)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.activeLever = found && found.leverage
      return found
    },
    calcTableList () {
      const obj = {
        lossEntrust: this.tableList,
        curEntrust: this.entrustList,
        // shipping: !this.calcBalanceList.length ? null : this.calcBalanceList
        shipping: this.calcBalanceList
      }
      return obj[this.activeTableTabKey] ? obj[this.activeTableTabKey] : this.tableList
    },
    information () {
      return {
        priceBy: 'IXX' + this.$tR('index'),
        priceIndex: this.activeProduct.INDEX.current,
        volume_24h: this.handleDishInfoItem('volume_24h'),
        value: '1 USD',
        valueRate: this.$big(this.symbolInfo.fee_rate || 0).times(100).round(4).toFixed(4) + '%'
      }
    },
    mapHandlerSoket () {
      return {
        'liquid': this.handleAmountObj,
        'heart': this.handleHeart,
        'market': this.handleTickers,
        'orderbook': this.handleOrderbookSoket,
        'deal': this.handleDealSoket,
        'orderfills': this.handleAmountObj,
        'position': this.handleAmountObj,
        'trigger': this.handleAmountObj,
        'history': e => {}
      }
    },
    activeProductPrice () {
      if (this.activeProduct && this.activeProduct.UNIT) {
        return this.activeProduct.UNIT.current
      }
      return 0
    },
    mapProduct () {
      const obj = {}
      this.products.map(q => { obj[q.name] = q })
      return obj
    }
  },
  async created () {
    actions.updateSession() 
    this.products = (await getSymbolList()).data  
    this.state.unit.pairList = this.products
    await this.subMarket()  
    const queryStr = localStorage.getItem('unit-product') || this.products[0].name
    const product = this.products.find(item => item.name === queryStr) || this.products[0]

    this.$nextTick(() => {
      this.$eventBus.$emit('protrade:layout:init')
    })

    this.socket.$on('open', () => { 
      this.handleProductsChange(product)
    })
    this.handleAmountObj()

    this.$eventBus.$on('protrade:exchange:set', (params) => {
      this.activeAcountAndPriceArr[0] = params.amount || this.activeAcountAndPriceArr[0]
      this.activeAcountAndPriceArr[1] = params.price || this.activeAcountAndPriceArr[1]
    })
  },
  methods: {
    async subMarket() { 
      const that = this
      if (this.socket) {
        this.socket.$destroy()
      }
      this.socket = await wsNew.create()
      this.utils.$tvSocket = this.socket
      this.socket.$on('open', () => { 
        that.socket.heartCheck.start() // 发送一次心跳  
        that.socket.socket.send('{"op":"subscribepub","args":["market@ticker"]}')
        if (this.userData) {
          that.socket.socket.send(`{"op":"loginWeb","args":["${this.userData.session_id}"]}`)
          that.socket.socket.send('{"op":"subscribe","args":["orderfills"]}')
          that.socket.socket.send('{"op":"subscribe","args":["position"]}')
          that.socket.socket.send('{"op":"subscribe","args":["trigger"]}')
        }
        if (this.activeProduct && this.activeProduct.product && this.activeProduct.currency) {
          that.socket.socket.send(`{"op":"subscribepub","args":["orderbook@${this.activeProduct.product}_${this.activeProduct.currency}@${this.dataDeep}@1@20"]}`)
          that.socket.socket.send(`{"op":"subscribepub","args":["deal@${this.activeProduct.product}_${this.activeProduct.currency}"]}`)
        }
      })
      this.socket.$on('message', (data) => { 
        that.handleSoketData(data) 
      })
      this.socket.$on('reopen', () => {
        that.socket.$destroy()
        that.subMarket()
      })
    },  
    login (arg) {
      if (arg === 'login') {
        location.href = '/user/login'
      } else if (arg === 'register') {
        location.href = '/user/register'
      }
    },
    checkActive () {
      // 先检查是否开通合约
      checkContractActive('BTCUSD', this.state.isSimulation)
        .then(res => {
          if (!res.code) {
            this.contractNotActive = !res.data.state
            window.localStorage['contract'] = this.contractNotActive
          } else if (res.code !== 401) {
            this.$message.error(res)
          }
        })
    },
    closeContractActive () {
      this.contractNotActive = false
    },
    setTitle () {
      if (this.activeProduct) {
        document.title = (this.activeProduct.UNIT ? this.activeProduct.UNIT.current : '...') +
          ` (${this.activeProduct.name}) ${config.title}`
      }
    },
    changeDeep (e) {
      let orgDeep = this.dataDeep
      this.dataDeep = e.accuracy
      if (this.activeProduct && this.socket) {
        this.socket.socket.send(`{"op":"unsubscribepub","args":["orderbook@${this.activeProduct.product}_${this.activeProduct.currency}@${orgDeep}@1@20"]}`)
        this.socket.socket.send(`{"op":"subscribepub","args":["orderbook@${this.activeProduct.product}_${this.activeProduct.currency}@${this.dataDeep}@1@20"]}`)
      }
    },
    totalValue () {
      if (!this.activeAcountAndPriceArr[0] || !this.entrustList) return
      return getUnitTotalValue(this.entrustList,
        {
          amount: this.activeAcountAndPriceArr[0],
          price: this.activeAcountAndPriceArr[1] || this.activeProduct.UNIT.current        },
        this.activeProduct.multiplier)
    },
    getLiqPrice () {
      if (!this.activeAcountAndPriceArr[0]) return
      const price = getUnitLiqPrice({
        isBuy: this.side === 1,
        leverages: this.activeLever,
        amount: this.activeAcountAndPriceArr[0],
        price: this.activeAcountAndPriceArr[1] || this.activeProduct.UNIT.current,
        available_balance: this.activeBalance.available_balance,
        totalValue: this.totalValue(),
        totalAmount: this.activeBalance.holding
      }, this.activeProduct)
      return price
    },
    handleOrderbookSoket (data) {
      this.delegateData = data
      if (!this._scrolled) {
        this.$nextTick(() => {
          this.dataLoaded()
          this._scrolled = true
        })
      }
    },
    handleDealSoket (data) {
      const last = data[data.length - 1]
      this.newBargainListData.unshift(last)
      this.newBargainListData.pop()
      this.isBuy = last.side === 'buy'
    },
    handleOrderfills (data) {
      const last = data[data.length - 1]
      this.newBargainListData.unshift(last)
      this.newBargainListData.pop()
      this.isBuy = last.side === 'buy'
    },
    handleSoketData (res) {
      const key = res.topic && res.topic.split('@')[0]
      this.mapHandlerSoket[key] && this.mapHandlerSoket[key](res.data)
    },
    handlePopoverTitle (key) {
      const type = this.activeBtnsKey === '3' && this.activePriceType.key || this.activeBtnsKey
      const price = this.activeAcountAndPriceArr[1] || (this.activeProduct.UNIT || {}).current
      const calcPrice = ['2', '4', '6'].includes(type) ? '市场最优价格' : price
      return `
        ${this.$tR(`mapFormContent.mapHandleBtn.${key}`)}--
        ${this.$tR(`mapFormContent.mapBtns.${this.activeBtnsKey}.text`)}【${calcPrice}】--
        数量【${this.activeAcountAndPriceArr[0]}】
      `
    },
    handleDisabledBtn (side) {
      if (+this.activeBtnsKey > 2) {
        const comparisonValue = ['3', '4'].includes(this.activePriceType.key) ? +(this.activeProduct[this.productType[this.trigger_type]] || {}).current : (+this.activeAcountAndPriceArr[1] || +(this.activeProduct[this.productType[this.trigger_type]] || {}).current)
        const hasValue = this.activeAcountAndPriceArr[0] && this.activeAcountAndPriceArr[2]
        const type = !['3', '4'].includes(this.activePriceType.key) ? 'sell' : 'buy'
        const isSell = side === type ? +this.activeAcountAndPriceArr[2] > comparisonValue : +this.activeAcountAndPriceArr[2] < +comparisonValue
        const res = hasValue && isSell
        return !res
      } else return !this.activeAcountAndPriceArr[0]
    },
    setLeverage (leverage) {
      setLeverage({ name: this.activeProduct.name, leverage }).then(res => {
        if (!res.code) {
          this.$message.success(this.$tR('handleSuccess'))
          return Promise.resolve()
        } else if (res.code !== 401) {
          this.$message.error(res.message)
        }
      }).then(this.handleBalanceList)
    },
    async handleCommandOrder (isSubmit) {
      if (isSubmit) await this.submitOrder()
      this.$root.modelVisible = false
      this.$refs['popover-buy'][0].showPopper = false
      this.$refs['popover-sell'][0].showPopper = false
    },
    handlePopoverClick (side) {
      this.side = side === 'buy' ? 1 : 2
      !this.popoverDisabled && (this.$root.modelVisible = true) || this.submitOrder()
    },
    handleEntrustList () {
      this.entrustList = null
      this.mapHandlers.curEntrust({ size: 20 }).then(res => {
        if (!res.code) {
          this.entrustList = res.data.data.map(item => {
            item.cancelBtnLoading = false
            item._symbol = item.symbol
            item.symbol = this.$tR(`mapTabs.${item.name}`)
            return item
          })
        } else if (res.code !== 401) {
          this.$message.error(res)
        }
      })
    },
    
    handleBalanceList () {
      // this.balanceList = null
      return this.mapHandlers.shipping().then(res => {
        if (!res.code) {
          this.balanceList = res.data.map(item => {
            let curProduct = this.mapProduct[item.name]
            item.value = !+item.holding ? 0 : bigDiv([item.holding, item.price], 8)
            item.price = this.bigRound(item.price, this.activeProduct['price_scale'])
            item._leverage = item.leverage === '0' ? this.$t('contract_cal_full') : item.leverage 
            // console.log('handleBalanceListhandleBalanceListhandleBalanceList')
            // if (this.mapProduct && curProduct.UNIT && +item.holding > 0) {

            // } 
            item.funUnrealized = (row) => {
              if (!this.mapProduct || !curProduct.UNIT || !row.holding || !row.price) {
                return '0'
              }
              let openValue = toBig(row.holding).div(row.price).abs()
              let leverage = +row.leverage || curProduct.max_leverage
              let unrealized = calcProfit(row.holding, row.price, this.mapProduct[item.name].UNIT.current)
              let roe = toBig(unrealized).div(openValue).times(leverage).times(100).toFixed(2)
              let unrealizedM = calcProfit(row.holding, row.price, this.mapProduct[item.name].MARKET.current)
              let roeM = toBig(unrealizedM).div(openValue).times(leverage).times(100).toFixed(2)
              return { unrealized, roe, unrealizedM, roeM }
            }
            // item._symbol = item.symbol
            // item.symbol = this.$tR(`mapTabs.FUTURE_${item.symbol}`)
            return item
          })
          return Promise.resolve()
        } else if (res.code !== 401) {
          this.$message.error(res)
        }
      })
    },
    handleTickers (data) {
      data.reduce((prev, curr) => {
        const pairArr = curr.pair.split('_')
        const found = prev.find(item => item.currency === pairArr[1])
        found && this.$set(found, pairArr[0], curr)
        return prev
      }, this.products)
    },
    handleProductsChange (product) {
      if (!product) {
        return
      } 
      if (this.isLogin) {
        this.checkActive()
      } 
      localStorage.setItem('unit-product', product.name)
      this.$router.replace({ query: { product: product.name } })
      if (this.socket) {  
        if (this.activeProduct) {
          this.socket.socket.send(`{"op":"unsubscribepub","args":["orderbook@${this.activeProduct.product}_${this.activeProduct.currency}@0@1@20"]}`)
          this.socket.socket.send(`{"op":"unsubscribepub","args":["deal@${this.activeProduct.product}_${this.activeProduct.currency}"]}`)
        }
        this.socket.socket.send(`{"op":"subscribepub","args":["orderbook@${product.product}_${product.currency}@0@1@20"]}`)
        this.socket.socket.send(`{"op":"subscribepub","args":["deal@${product.product}_${product.currency}"]}`)
      }
      getFutureListByKey(`${product.product}_${product.currency}`, { size: 20 }).then(({ data }) => {
        this.newBargainListData = data
      })

      getSymbolInfo({ symbol: product.name }).then(res => {
        if (!res.code) {
          this.symbolInfo = res.data[0]
        } else if (res.code !== 401) {
          this.$message.error(res)
        }
      })
      this.activeProduct = product
      this.setTitle()
      this.state.unit.pair = `${product.product}_${product.currency}`
    },
    calcIncreaseRate (product) {
      return bigDiv([bigTimes([product.UNIT.increment_24h, 100]), bigMinus([product.UNIT.current, product.UNIT.increment_24h])], Math.max(2, product.price_scale))
    },
    handleDishInfoItem (key) {
      const price_scale = this.activeProduct.price_scale
      if (key === 'markPrice') {
        const fixed = this.activeProduct.name === 'FUTURE_BTCUSD' ? 2 : price_scale
        return bigRound((this.activeProduct.MARKET || {}).current, fixed)
      } else {
        const fixed = key === 'change_24h' ? 2 : price_scale
        const unit = this.activeProduct.name === 'FUTURE_BTCUSD' ? 'USD' : this.$tR(`sheet`)
        return key === 'volume_24h' ? logogramNum((this.activeProduct.UNIT || this.activeProduct.MARKET)[key]) + unit : bigRound((this.activeProduct.UNIT  || this.activeProduct.MARKET)[key], fixed)
      }
    },
    handleWidthBg (amount, max) {
      return +bigDiv([amount, max]) * 100 + '%'
    },
    handleAmountObj () { 
      if (!this.state.userInfo) return
      clearTimeout(this._timer)
      return new Promise(resolve => {
        this._timer = setTimeout(async () => {
          await this.handleBalanceList()
          const res = await getAllAmount()  
          if (!res.code) {
            const { holding_amount: shipped, active_amount: curEntrust, active_triggers_amount: lossEntrust, active_orders_amount: historyEntrust, orders_amount: bargain } =res.data
            const data = this.amountObj && JSON.parse(JSON.stringify(this.amountObj))
            const obj = {
              shipping: [this.calcBalanceList.length, data && data.shipping[0] !== this.calcBalanceList.length],
              shipped: [shipped, false],
              curEntrust: [curEntrust, data && data.curEntrust[0] !== curEntrust],
              lossEntrust: [lossEntrust, data && data.lossEntrust[0] !== lossEntrust],
              historyEntrust: [historyEntrust, data && data.historyEntrust[0] !== historyEntrust],
              bargain: [bargain, data && data.bargain[0] !== bargain]
            }
            obj[this.activeTableTabKey][1] = false
            this.amountObj = obj
          } else {
            const obj = {
              shipping: [0,0],
              shipped: [0,0],
              curEntrust: [0,0],
              lossEntrust: [0,0],
              historyEntrust: [0,0],
              bargain: [0,0]
            }
            this.amountObj = obj
          } 
          this.handleTableTabClick(this.activeTableTabKey) 
          this.handleEntrustList()
          resolve()
        }, 100)
      })
    },
    async handleTableTabClick (key) {
      this.activeTableTabKey = key
      if (['curEntrust', 'shipping'].includes(key)) return
      this.tableList = null
      this.historyPage = 0
      this.totalItems = 10

      this.fetch()
      // key === 'shipping' && (this.amountObj.shipping[0] = this.tableList.length)
      // const found = this.tableList.find(item => this.activeTabItem.pair.includes(item.currency))
      // this.activeLever = found && found.leverage || this.activeLever
      // this.holdingCount = found && found.holding || +this.holdingCount
      // this.take_rate = found && found.take_rate || +this.take_rate
    },
    handleHeart(data) {  
      if (this.socket) {
        this.socket.heartCheck.start()
      }
    }, 
    matchFutureItemByKey (key) {
      if (!this.tickersData) return {}
      return this.tickersData.UNIT.find(item => item.pair === key)
    },
    loadNext () {
      this.fetch()
    },
    async fetch () {
      console.log('fetchfetchfetchfetch')
      if (this.historyPage * this.historySize >= this.totalItems) {
        return
      }
      this.loadingHistory = true
      this.historyPage += 1
      let params = { page: this.historyPage, size: this.historySize }
      let data = (await this.mapHandlers[this.activeTableTabKey](params)).data
      this.loadingHistory = false
      this.totalItems = data.total
      data = Array.isArray(data) ? data : data.data
      let list = data.map(item => {
        item.realized && (item.realized = this.bigRound(item.realized, 8))
        item.cancelBtnLoading = false
        if (item.symbol) {
          item._symbol = item.symbol
          item.symbol = this.activeTableTabKey === 'shipped' ? this.$tR(`mapTabs.FUTURE_${item.symbol}`) : this.$tR(`mapTabs.${item.symbol}`)
        } else {
          item.symbol = this.$tR(`mapTabs.${item.name}`)
        }
        return item
      })
      this.totalItems = this.totalItems || list.length
      if (this.historyPage > 1 && Array.isArray(this.tableList)) {
        this.tableList = this.tableList.concat([], list)
      } else {
        // console.log(res.data)
        this.tableList = list
      }
    },
    matchClassByKey (key) {
      return ['current', 'change_24h', 'increment_24h'].includes(key) ? this.isBuy ? 'text-success' : 'text-danger' : ''
    },
    dataLoaded (lessPosition) {
      const element = this.$refs['content-wrap']
      if (!element) return setTimeout(() => this.dataLoaded(), 200)
      const centerEle = element.querySelector('.content-center') || {}
      element.scrollTop = (element.scrollHeight - element.clientHeight + (lessPosition ? centerEle.clientHeight || 64 : 64)) / 2
      element.removeEventListener('scroll', this.handleScroll)
      element.addEventListener('scroll', this.handleScroll)
    },
    handleScroll (e) {
      clearTimeout(this._timer)
      this._timer = setTimeout(() => {
        const constHeight = (e.target.scrollHeight - e.target.clientHeight) / 2
        this.triggerBtn = Math.abs(e.target.scrollTop - constHeight) > (e.target.clientHeight / 2)
      }, 100)
    },
    handleSwitch (btnKey) {
      this.activeBtnsKey = btnKey
    },
    submitOrder (side) {
      // const product = this.activeProduct
      this.buyBtnLoading = true
      const data = {
        user_id: this.userData.id,
        amount: this.activeAcountAndPriceArr[0],
        price: this.activeAcountAndPriceArr[1] || (this.activeProduct.UNIT  || this.activeProduct.MARKET).current,
        type: this.activeBtnsKey === '3' && this.activePriceType.key || this.activeBtnsKey, // 下单类型 1 限价 2市价 3限价止损 4市价止损 5限价止盈 6市价止盈
        side: this.side,
        name: this.activeProduct.name,
        leverage: this.activeLever,
        trigger_price: this.activeAcountAndPriceArr[2],
        trigger_type: this.trigger_type,
        trigger_close: this.trigger_close,
        passive: this.passive

        // tp_type 止盈触发类型 0默认 1盘口价格 2标记价格 3指数价格 如果是-1的话代表从仓位里下的触发单
        // tp_price 止盈价格
        // sl_type 止损触发类型 0默认 1盘口价格 2标记价格 3指数价格 如果是-1的话代表从仓位里下的触发单
        // sl_price 止损价格
      }
      return submitOrder(data).then(res => {
        this.buyBtnLoading = false
        if (!res.code) {
          this.handleAmountObj()
          setTimeout(() => {
            this.$message.success(this.$tR('handleSuccess'))
          }, 500)
        } else if (res.code !== 401) {
          this.$message.error(res)
        }
      }).catch(() => {
        this.buyBtnLoading = false
      })
    },
    cancelOrder (data) {
      const { user_id, id, name } = data
      data.cancelBtnLoading = true
      cancelOrder({ user_id, order_id: id, name }).then(res => {
        if (!res.code) {
          this.handleAmountObj()
          setTimeout(() => {
            // this.cancelBtnLoading = false
            this.$message.success(this.$tR('handleSuccess'))
          }, 500)
        } else if (res.code !== 401) {
          this.$message.error(res)
        }
      })
    }
  },
  watch: {
    activeProductPrice () {
      this.setTitle()
    }
  },
  destroyed () {
    document.title = config.title
  }
}
</script>
<style lang="scss" scoped>
.table-container {
  .tabs-group,
  .dish-info,
  .delegate-list,
  .form-content,
  .hold-content,
  .order-list,
  .information {
    box-sizing: border-box;
    text-align: center;
    background: $--contract-table-bg;
    width: 100%;
    height: 100%;
    line-height: 24px;
    position: relative;
    & > .header {
      height: 32px;
      line-height: 32px;
      font-size: 12px;
      background: $--contract-table-active;
      padding: 0 10px;
    }
  }
  .tabs-group {
    & > div {
      // padding: 0 20px;
      flex-basis: 115px;
      height: 59px;
      margin-right: 2px;
      &:hover {
        background: $--contract-table-active;
        cursor: pointer;
      }
      &.active {
        background: $--contract-table-active;
      }
    }
  }

  .dish-info {
    display: flex;
    height: 81px;
    align-items: center;
    position: relative;
    & .title {
      border: 1px solid $--color-primary;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
      & > .round {
        margin-right: 10px;
        color: $--color-primary;
      }
    }
    & > div.calculator {
      position: absolute;
      right: 10px;
      bottom: 10px;
      font-size: 16px;
    }
    .info-left {
      margin-left: 8px;
      margin-right: 2.5%;
      line-height: 32px;
      font-size: 12px;
      .title {
        white-space: nowrap;
      }
    }
    .info-list-box {
      flex-basis: 450px;
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      text-align: left;
      line-height: 32px;
      & > div {
        flex-basis: 150px;
      }
    }
  }

  .delegate-list {
    .content-header {
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      border-bottom: 1px solid $--contract-table-bd;
      font-size: 12px;
    }
    & > .content-wrap {
      position: absolute;
      width: 100%;
      height: calc(100% - 64px);
      overflow-y: scroll;
      scroll-behavior: smooth;
      &::-webkit-scrollbar {
        display: none;
        width: 0px;
        height: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background: $--contract-table-bg;
        border: none;
      }
      & > .content-container {
        position: absolute;
        width: 100%;
        font-size: 12px;
        & > .content-center {
          position: sticky;
          line-height: 32px;
          top: 0;
          bottom: 0;
          background: $--contract-table-active;
          margin: 10px 0;
          font-size: 16px;
          z-index: 3;
          & > .justify {
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
          }
        }
        & > ul {
          padding: 0 10px 0 0;
          & > li {
            &:nth-child(2n) {
              background: rgb(16, 23, 42);
            }
            & > span {
              position: relative;
              z-index: 1;
              &:hover {
                cursor: pointer;
                opacity: 0.8;
              }
            }
            margin: 1px 0;
            & > .mark-bg {
              position: absolute;
              height: 24px;
              z-index: 0;
              opacity: 0.1;
              right: 0;
              transition: width 0.5s ease-in-out;
              &.is-buy {
                background: $--color-danger;
              }
              &.is-sell {
                background: $--color-success;
              }
            }
          }
          // text-align: right
        }
      }
    }
  }

  .form-content {
    .custom-btn {
      background: $--contract-table-active;
      border-color: #333;
      color: #ccc;
      width: 100%;
      &.active,
      &:hover {
        border: 1px solid $--color-primary;
        color: $--color-primary;
      }
    }
    .contrat-popper-class {
      background: #000;
    }
    & > .content-container-submit {
      padding: 0 8px;
      line-height: 32px;
      text-align: left;
      .btn {
        margin: 0 5px;
      }
      &.mini > * {
        margin-top: 5px;
      }
      & > * {
        margin-top: 12px;
        & > input,
        & > .transactionPrice {
          background: transparent;
          border: 1px solid #333;
          text-align: center;
          color: #ddd;
          box-sizing: border-box;
          width: 70%;
          font-size: 12px;
        }
        & > input {
          text-align: right;
          padding-right: 62px;
        }
        .activeBtn {
          box-shadow: 0 2px 0px 0px #fff;
        }
        & > span {
          position: absolute;
          right: 14px;
          text-align: center;
          width: 52px;
          color: #999;
          // border-left: 1px solid #333;
          padding-left: 4px;
        }
      }
    }
  }
  .hold-content {
    & > .content-container-hold {
      font-size: 12px;
      padding: 0 8px;
      & > * {
        margin-top: 6px;
      }
      & > .linear-bar {
        position: relative;
        box-sizing: border-box;
        height: 30px;
        background: linear-gradient(90deg, #09c989 0%, #f24e4d 100%);
        padding: 0 8px;
        & > .mark {
          position: absolute;
          padding-left: 10px;
          height: 100%;
          line-height: 30px;
          border-left: 1px solid #fff;
          left: 20%;
        }
      }
    }
  }
  .order-list {
    text-align: center;
    & > .header {
      padding: 0;
      & > * {
        border-right: 1px solid #000;
        transition: all 0.5s ease-in-out;
        &:hover,
        &.active {
          box-shadow: 0 2px 0 0 $--color-primary inset;
          background: $--contract-table-bg;
          cursor: pointer;
        }
      }
    }
    .order-list-content {
      height: 250px;
      overflow: auto;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #000;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: $--contract-table-bg;
      }
    }
  }
  .information-content {
    padding: 12px;
    font-size: 12px;
  }
  .icon-information::before {
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    line-height: 12px;
    content: "!";
    background: #a6a6a6;
    font-style: normal;
    color: #000;
    text-align: center;
  }

  .signal {
    border-left: 1px solid #fff;
    margin-left: 9px;
    padding-left: 9px;
    height: 11px;
    box-sizing: border-box;
    a {
      margin-top: 3px;
    }
    .dib {
      display: inline-block;
      width: 3px;
      height: 11px;
      margin-right: 4px;
      &.interactive {
        background-color: #030303;
      }
    }
  }
  .status-light-1 {
    background-color: #00b865;
  }
  .status-light-2 {
    background-color: #00b865;
  }
  .status-light-3 {
    background-color: #00b865;
  }
  .status-light-4 {
    background-color: #79c000;
  }
  .status-light-5 {
    background-color: #a98d28;
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

  color: #d7d7d7;
  background-color: #000;
  padding-top: 0.1px;
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
  }
  @media screen and (max-height: 900px) {
    .contract-problem {
      height: 400px;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .contract-btn {
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
  }
  @media screen and (max-height: 900px) {
    .contract-problem {
      height: 400px;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .contract-btn {
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

