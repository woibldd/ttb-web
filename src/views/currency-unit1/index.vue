<template>
  <div class="unit-contract-container">
    <!-- <v-nav from="unit"/> -->
    <div ref="unit-container"  :class="['page-contract', 'table-container', state.skin]">
      <!-- 1-1 --> 
      <div :gutter="4" class="pt-4 my-row"> 
        <div class="x-col my-col" :span="19">
          <div class="x-row-1 ">
            <div class="r1-c2-r1"> 
              <div class="product-row" flex="left"> 
                <div class="product-info" flex="box:first cross:center">
                  <div >
                    <span v-if="showSymbolList"><label class="f17">{{ activeProduct.currency }}/USDT</label> </span>
                    <el-popover 
                      v-else
                      :popper-class="[state.skin, 'pd-0']"  
                      trigger="click">
                      <div class="drop-down">
                        <div>
                          <el-row>
                            <el-col :span="10" class="label pl-10">{{$t('pair')}}</el-col>
                            <el-col :span="9">{{$t('price')}}</el-col>
                            <el-col :span="5" class="txr pr-10">{{$t('increase')}}</el-col>
                          </el-row>
                        </div>
                        <div v-for="(item, idx) in products" :key="idx" class="drop-item">  
                          <div 
                            :class="[{'router-link-exact-active': item.symbol===state.unit.pair}, 'link']"
                            @click="handleProductsChange(item)">
                            <el-row >
                              <el-col :span="10" class="label pl-10"><span class="currency">{{item.currency}}</span><span class="product">/USDT</span> </el-col>
                              <el-col 
                                :class="[(item.UNIT || {}).increment_24h > 0?'text-success':'text-danger']"
                                :span="8">
                                {{`₮${+(item.UNIT || {}).current}`}}
                              </el-col>
                              <el-col 
                                :class="[(item.UNIT || {}).increment_24h > 0?'text-success':'text-danger', 'txr', ' pr-10']"
                                :span="6" >
                                {{+(item.UNIT || {}).change_24h > 0 ? '+' : ''}}{{(item.UNIT || {}).change_24h || 0 | round(2)}}%
                              </el-col>
                            </el-row> 
                          </div> 
                        </div>
                      </div>
                      <span slot="reference"><label class="f20 bold">{{ activeProduct.currency }}/USDT <icon name="arrow-down" /> </label> </span>
                    </el-popover>  
                  </div> 
                </div> 
                <div class="product-info mr-15" flex="cross:center" > 
                  <label  v-popover:popLeverageC  class="lever-label">
                    <span v-if="+activeLever===0">{{$t('contract_cal_full')}}</span>
                    <span v-else>{{$t('contract_cal_step')}}</span>
                  </label> 
                  <label  v-popover:popLeverageD class="lever-label" style="min-width: 28px;"> 
                    <span v-if="!+activeLever">{{activeProduct.max_leverage}}X</span>
                    <span v-else>{{activeLever}}X</span> 
                  </label>
                  <el-popover  
                    @show="handleLeverInit"
                    ref="popLeverageC"
                    placement="bottom-start"
                    :popper-class="state.skin">
                    <div class="txr"> <label @click="handleLeverClose"><icon style="font-size: 20px;" name="close"/></label>  </div>
                    <div v-if="activeProduct">
                      <leverBox 
                        :pair="`${ activeProduct.currency }/USDT`"
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
                    <div v-if="activeProduct">
                      <leverBox 
                        :pair="`${ activeProduct.currency }/USDT`"
                        :lever="activeLever"
                        :map="mapLever"
                        @changeLever="handleClickLeveragePreview"/> 
                    </div>
                  </el-popover> 
                </div>  
                <div class="product-info mr-25" flex="cross:center"> 
                  <div>
                    <div class="tick-info">
                      <label  :class="[(activeProduct.UNIT || {}).increment_24h > 0?'text-success':'text-danger']">{{(activeProduct.UNIT || {}).current}}</label>
                    </div>
                    <div class="">
                      <label class="f11 c-8a mb-6">≈ {{ state.fiatMoneySymbol }}<fiat-money
                            base="USDT"
                            :value="(activeProduct.UNIT || {}).current"/></label> 
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
                          :class="{'text-success':$big(symbolInfo.fee_rate || 0).gt(0), 'text-danger':$big(symbolInfo.fee_rate || 0).lt(0)}" 
                          :to="{name: 'UnitContractFee'}"> {{ $big(symbolInfo.fee_rate || 0).times(100).round(4).toFixed(4) }}% </router-link> 
                      </span>
                      <span v-else-if="key==='markPrice'"> {{(activeProduct.MARKET || {}).current }}</span>
                      <span v-else-if="key==='indexPrice'"> {{(activeProduct.INDEX || {}).current }}</span>  
                      <span v-else-if="key==='increment_24h'" > 
                        <span v-if="((activeProduct.UNIT || {})['increment_24h'] || 0) > 0" class="text-success">
                          {{(activeProduct.UNIT || {})['increment_24h']}}
                        </span> 
                        <span v-else class="text-danger">
                          {{(activeProduct.UNIT || {})['increment_24h']}}
                        </span>
                      </span> 
                      <span v-else-if="key==='volume_24h'"> {{(activeProduct.UNIT || {})[key] | pretty }}</span>
                      <span v-else>
                        {{(activeProduct.UNIT || {})[key] }}
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
            <div style="min-width:615px;" class="mr-4" flex-box="1">  
              <!-- <div class="calculator"><i class="el-icon-caret-bottom" />计算器</div> --> 
              <div class="r1-c2-r2">
                <div class="tv-tools ml-10">
                  <el-dropdown class="tool" @command="handleCyclesCommand" size="mini">
                    <span class="el-dropdown-link pointer">
                      <span style="display: inline-block; width:36px; white-space: nowrap;">{{ $t(`tv.cycles.${local.unitIntervalText}.text`)}}</span> <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown"> 
                      <el-dropdown-item 
                        v-for="(item, index) in mapCycles"  
                        :command="index"
                        :key="index"> 
                        <div style="width: 50px; text-align:center;" >{{item.text}}</div>
                      </el-dropdown-item> 
                    </el-dropdown-menu>
                  </el-dropdown> 
                  <div class="sep ml-5 mr-5"></div>
                  <el-dropdown class="tool" @command="handleTypesCommand">
                    <span class="el-dropdown-link pointer">
                      <icon name="candle" />
                      <!-- {{ $t('tv.navs.left.style') }} -->
                      <i class="el-icon-arrow-down el-icon--right"></i>
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
                  <div class="sep ml-5 mr-5"></div>
                  <label class="el-dropdown-link pointer tool" @click="handleTVOption('indicators')">
                    <!-- {{ $t('tv.navs.left.technical_indicators') }} -->
                    <icon name="view"/>
                  </label> 
                  <div class="sep ml-5 mr-5"></div>
                  <label class="el-dropdown-link pointer tool" @click="handleTVOption('drawing')">
                    <span class="draw">{{ $t('tv.navs.left.drawing_tools') }}</span>  
                  </label>
                  <div class="sep ml-5 mr-5"></div>
                  <label class="el-dropdown-link pointer tool" @click="handleTVOption('setting')">
                    <!-- {{ $t('tv.navs.left.setting') }} -->
                    <icon name="setting" />
                  </label>
                  <div class="sep ml-5 mr-5"></div>
                  <!-- <label>计算器</label> -->
                  <label class="el-dropdown-link pointer tool" @click="handleTVOption('fullscreen')"> 
                    <icon name="fullscreen" />
                  </label> 
                  <!-- <label class="el-dropdown-link pointer tool" @click="swithStyle"> 
                    <icon v-if="state.skin==='dark'" name="sun" />
                    <icon v-if="state.skin==='light'" name="moon" />
                  </label> --> 
                  <!-- <el-button @click="swithStyle">样式</el-button> -->
                </div>
                <div class="tv-tab">
                  <label :class="{active:selectTV==='kline'}" @click="selectTV='kline'">{{ $t('tv.navs.right.kline') }}</label>
                  <label :class="{active:selectTV==='depth'}" @click="selectTV='depth'">{{ $t('tv.navs.right.deep') }}</label>
                </div>
              </div>
              <div class="r1-c2-r3 ">
                <div v-show="selectTV==='kline'">
                  <tradingView
                    style="height:617px;"
                    ref="tradingView" /> 
                </div> 
                <div v-show="selectTV==='depth'" class="delegate-list">
                  <div
                    class="header"
                    flex="main:justify">
                    <span> {{ $t('orderbook_chart') }}</span>
                  </div>
                  <depthMap
                    v-loading="!delegateData"
                    :data="delegateData"
                    element-loading-background="rgba(0, 0, 0, 0.3)" />
                </div> 
              </div>
            </div>
            <div class="r1-c2-list" style="width: 250px;" flex-box="0">
              <div class=""> 
                <div class="delegate-list"
                    v-loading="!delegateData"
                    element-loading-background="rgba(0, 0, 0, 0.3)"> 
                    <div class="title-delegate">{{$t('contract_block_orderbook')}}</div>
                    <orderBook
                      ref="orderBook"
                      @changeDeep="changeDeep"
                      :active-product="activeProduct"
                      :order-data="delegateData"
                      :last-price="(activeProduct.UNIT||{}).current"
                      :index-price="(activeProduct.INDEX||{}).current"
                      :mark-price="(activeProduct.MARKET||{}).current"
                      :is-buy="isBuy" /> 
                </div> 
                <div v-loading="!newBargainListData.length"
                    class="delegate-list mt-4"
                    style="height:245px"
                    element-loading-background="rgba(0, 0, 0, 0.3)">  
                    <div class="title-delegate">{{$t('contract_block_orderdeal')}}</div>
                    <div
                      class="content-header"
                      flex>
                      <span
                        v-for="(value,key) in mapHeader2"
                        :class="{'txl': key==='transaction-price', 'txr': key==='time' || key==='trading-volume'}"
                        :key="key">{{ $tR(`mapDelegateList.mapHeader2.${key}`) }}</span>
                    </div> 
                    <div class="content-wrap" style="hieght: 170px;">
                      <div class="content-container">
                        <ul>
                          <!-- <li
                            v-for="(item,index) in newBargainListData"
                            :key="index"
                            flex="main:justify cross:center"> 
                            <span :class="[item.side === 'buy'?'text-success':'text-danger', 'txl']">{{ item.values[0]|bigRound(activeProduct.price_scale) }}</span>
                            <span class="txr">{{ item.values[1] }}</span>
                            <span class="txr">{{ item.time | parseTime('{h}:{i}:{s}') }}</span>
                          </li> -->
                          <li
                            v-for="(item,index) in newBargainListData"
                            :key="index"> 
                            <span :class="[item.side === 'buy'?'text-success':'text-danger', 'txl']">{{ item.values[0]|bigRound(activeProduct.price_scale) }}</span>
                            <span class="txr">{{ item.values[1] }}</span>
                            <span class="txr">{{ item.time | parseTime('{h}:{i}:{s}') }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>  
                </div>
              </div> 
            </div>
          </div>
        </div>
        <div class="r1-c4 x-col my-col" :span="5"> 
          <div class="r1-c4-r1 option ">
            <div class="option-header">
              <span>{{$t('contract_block_orderaction')}}</span> 
            </div>
            <div class="hr">
              
            </div> 
            <!-- 下单区域 -->
            <div class="option-box"> 
              <!-- <div class="option-box-top">
                <div class="lever-tab">
                  <label :class="{active:activeLever==='0'}"
                         @click="handleLever(0)">{{$t('contract_cal_full')}}</label>
                  <el-popover v-model="popLeverage"
                              placement="bottom-start"
                              :title="$t('lever')">
                    <div style="width: 300px;">
                      <el-row :gutter="10">
                        <el-col class="mb-10"
                                v-for="item in mapLever"
                                :key="item"
                                :span="6">
                          <el-button v-if="item==='0'"
                                     :type="activeLever==='0' ? 'primary': ''"
                                     style="width:100%;"
                                     @click="handleLever(item);popLeverage=false">
                            {{$t('contract_cal_full')}}
                          </el-button>
                          <el-button :type="activeLever===item ? 'primary': ''"
                                     style="width:100%;"
                                     @click="handleLever(item);popLeverage=false"
                                     v-else>
                            {{item}}x
                          </el-button>
                        </el-col>
                      </el-row>
                    </div>
                    <label :class="{active:activeLever!=='0'}"
                           slot="reference">{{$t('contract_cal_step')}}</label>
                  </el-popover> 
                </div>
                <div class="lever-select">
                  <label>{{$t('lever')}}：</label>
                  <el-popover v-model="popLeverageB"
                              :title="$t('lever')">
                    <div style="width: 300px;">
                      <el-row :gutter="10">
                        <el-col class="mb-10"
                                v-for="item in mapLever"
                                :key="item"
                                :span="6">
                          <el-button v-if="item==='0'"
                                     :type="activeLever==='0' ? 'primary': ''"
                                     style="width:100%;"
                                     @click="handleLever(item);popLeverageB=false">
                            {{$t('contract_cal_full')}}
                          </el-button>
                          <el-button :type="activeLever===item ? 'primary': ''"
                                     style="width:100%;"
                                     @click="handleLever(item);popLeverageB=false"
                                     v-else>
                            {{item}}x
                          </el-button>
                        </el-col>
                      </el-row>
                    </div>
                    <el-button size="mini"
                               slot="reference">{{ (activeLever || '0')==='0' ? $t('contract_cal_full') : `${$t('contract_cal_step')} ${activeLever}x`  }}</el-button>
                  </el-popover>
                </div>
              </div> -->
              <div class="option-box-middle ">  
                <div style="text-align:center;" class="mt-20">  
                  <el-button-group style=' display: flex; margin: 0 10px;'>
                    <el-button style="flex:1;" :type="+activeBtnsKey===1 ? 'primary' : ''"
                               v-tooltip.bottom="{html: true, content: $tR(`mapFormContent.mapBtns.1.describe`), classes: 'contract'}"
                               @click="activeBtnsKey=1">
                      {{ $tR(`mapFormContent.mapBtns.1.text`)}}
                    </el-button>
                    <el-button style="flex:1;" :type="+activeBtnsKey===2 ? 'primary' : ''"
                               v-tooltip.bottom="{html: true, content: $tR(`mapFormContent.mapBtns.2.describe`), classes: 'contract'}"
                               @click="activeBtnsKey=2">
                      {{ $tR(`mapFormContent.mapBtns.2.text`)}}
                    </el-button>
                    <el-button style="flex:1.5;max-width:135px;"
                               :type="+activeBtnsKey > 2 ? 'primary' : ''"
                               v-popover:popoverMenuOptions>
                      <span v-if="activeBtnsKey < 3">{{ $tR(`mapFormContent.mapBtns.3.text`)}}</span>
                      <span v-else>{{ $tR(`mapFormContent.mapMenuOptions.${activeBtnsKey}`)}}</span>
                      <icon name="arrow-down" />
                    </el-button>
                  </el-button-group> 
                  <el-popover ref="popoverMenuOptions"
                      popper-class="popoverMenuOptions"
                      placement="bottom"
                      trigger="hover"
                      width="200">
                    <ul>
                      <li v-for="(item, key) in mapFormContent.mapMenuOptions"
                          @click="activeBtnsKey=key"
                          :class="{active: activeBtnsKey===key}"
                          :key="key">
                        {{item}}
                      </li>
                    </ul>
                  </el-popover>
                </div> 
                <div class="option-input mt-12"
                     v-for="(value,key) in mapInput"
                     :key="key"
                     v-show="key !== 'triggerType'"
                     flex="main:justify">
                  <label>{{ $tR(`mapFormContent.mapInput.${key}`) }} </label>
                  <div v-if="key==='value' && +activeBtnsKey === 2"
                       class="transactionPrice"
                       flex="main:justify box:mean">
                    <div style="color: #666;">{{ $tR(`mapFormContent.perfactPrice`) }}</div>
                  </div>
                  <template v-else>
                    <input  :value="(key==='value') ? activeAcountAndPriceArr[key] || (activeProduct.UNIT||{}).current:(activeAcountAndPriceArr[key])"
                           type="text"
                           @input="e=>activeAcountAndPriceArr[key] = e.target.value.replace(/^(0+)|[^\d.]+/g,'')">
                    <span v-if="key==='shippingSpace'">{{ $t('contract_min_unit') }}</span>
                    <span v-else>USDT</span>
                  </template>
                </div> 
                <div class="option-proportion mt-20"> 
                  <ix-slider 
                    ref="sliderBuy"
                    @input="onSliderDragEnd($event, 'buy')"
                    height="4"
                    width="5"
                    :skin="state.skin"
                    :dot-size="14"
                    :lazy="true"
                    :min="0"
                    :max="100"
                    :piecewise-label="true"
                    :interval="1"
                    :piecewise="false" 
                    :value='slide_value'>
                    <template
                      slot="label"
                      slot-scope="{ label, active }">
                      <span 
                        :skin="state.skin"
                        :class="['custom-label', { active }]"
                        v-if="label % 25 === 0"/> 
                    </template>
                    <template
                      slot="tooltip"
                      slot-scope="tooltip">
                      <div class="custom-tooltip">
                        {{ tooltip.value }}%
                      </div>
                    </template>
                  </ix-slider> 
                </div>
                <div class="option-button">
                  <!-- 按钮 -->
                  <el-row :gutter="20">
                    <el-col :span="12"
                            v-for="(value,key) in mapFormContent.mapHandleBtn"
                            :key="key">
                      <el-popover :ref="`popover-${key}`"
                        placement="right"
                        :popper-class="[`contrat-popper-${key === 'buy'?'success':'danger'}-class`, state.skin]"
                        width="400"
                        trigger="click"
                        :disabled="popoverDisabled"
                        :title="value">
                        <orderPopover v-if="activeProduct.UNIT"
                                      v-model="activeLever" 
                                      :hander="handlePopoverTitle(key)"
                                      :active-product="activeProduct"
                                      :loading="buyBtnLoading"
                                      :form-value-obj="formValueObj"
                                      :data="mapLever"
                                      :type="key === 'buy'?'success':'danger'"
                                      @change="setLeverage"
                                      @command="handleCommandOrder" />

                        <el-button class="mb-15"
                                   slot="reference"
                                   :type="key === 'buy'?'success':'danger'"
                                   :class="{activeBtn:isBuy ? key === 'buy': key === 'sell'}"
                                   :loading="buyBtnLoading"
                                   :disabled="!handleDisabledBtn(key)"
                                   style="width:100%; padding: 0 20px; height: 50px;"
                                   @click="handlePopoverClick(key)">
                          <div v-show="!buyBtnLoading"
                               flex="main:center cross:center">
                            <span>{{ $tR(`mapFormContent.mapHandleBtn.${key}`) }}</span> 
                            <span v-if="+activeBtnsKey === 1"
                                  style="font-size:12px">
                              <!-- {{ activeAcountAndPriceArr['shippingSpace'] }}  -->
                               @ {{ activeAcountAndPriceArr['value']||(activeProduct.UNIT||{}).current }} <!--{{ (activeBalance||{}).currency }} -->
                            </span>
                            <span v-else-if="+activeBtnsKey === 2 && asks.last && bids.first"
                                  style="font-size:12px">
                              {{ activeAcountAndPriceArr['value'] }}
                              <!-- @ {{ key === 'buy'?asks.last[0]:bids.first[0] }} {{ (activeBalance||{}).currency }} -->
                            </span>
                            <span v-else-if="+activeBtnsKey === 3"
                                  style="font-size:12px; text-align:right;">
                              <span>{{ activeAcountAndPriceArr['shippingSpace'] }}
                                <!-- @ {{ (activeProduct[productType[trigger_type]]||{}).current }}-->
                              </span>
                              <br>
                              <span v-if="['3','4'].includes(activePriceType.key) && activeAcountAndPriceArr['triggerPrice']">{{ key === 'buy'? '≧':'≦' }} {{ activeAcountAndPriceArr['triggerPrice'] }}</span>
                              <span v-if="['5','6'].includes(activePriceType.key) && activeAcountAndPriceArr['triggerPrice']">{{ key === 'buy'? '≦':'≧' }} {{ activeAcountAndPriceArr['triggerPrice'] }}</span>
                            </span>

                          </div>
                          <p class="mt-5"
                             flex="main:center cross:center">
                            <b>
                              {{ $tR(`mapFormContent.cost`) }}：<span>{{ !activeAcountAndPriceArr['shippingSpace']?'--':costObj[key] }}</span>
                              <!-- {{ (activeBalance||{}).currency }} -->
                            </b>

                          </p>
                        </el-button>
                      </el-popover>
                    </el-col>
                  </el-row>
                  <div v-for="(value,key) in mapFormContent.mapHandleBtn"
                       :key="key">
                    <!-- <p style="font-size:12px;color:#999">
                      <b v-if="+activeTypesKey===1">
                        {{ $tR(`mapFormContent.cost`) }}：<span>{{ !activeAcountAndPriceArr['shippingSpace']?'--':costObj[key] }}</span> {{ (activeBalance||{}).currency }}
                      </b>
                      <b v-else>
                        可平仓数量：{{ costObj[`${key}Amount`] }} 张
                      </b>
                    </p> -->
                  </div>
                  <div style="text-align:right;">
                    <span>{{$t('available_balance')}}</span>
                    <el-link style="font-size:12px"
                             href="/fund/my/tradingAccount/contractUnit/index"
                             type="primary">
                      {{ (activeBalance||{}).available_balance||0| bigRound(8) }} {{ (activeBalance||{}).currency }}
                    </el-link>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="r1-c4-r2 account-box mt-4">
            <div class="account-hander">
              {{$t('future_account')}}
              <!-- {{balanceFilterList}} -->
            </div>
            <div class="account-content">
              <el-tabs v-model="currentAccount">
                <el-tab-pane v-for="(item, index) in balanceFilterList"
                    :key="index" :label="item.currency" :name="item.currency">
                  <el-row class="tr">
                    <el-col :span='12'
                            class="pt-10 pb-10 th">
                      <p>{{$t('contract.float_profit_loss')}}</p>
                      <p :class="item.funUnrealized(item).unrealized > 0 ? 'text-success' : 'text-danger'">
                        <span>{{item.funUnrealized(item).unrealized}} </span> <br>
                        <span>{{ item.funUnrealized(item).roe |round(2) }}%</span>

                      </p>
                    </el-col>
                    <el-col :span='12'
                            class="pt-15 pb-10 th">
                      <router-link :to="{path:'/fund/transfer'}">{{$t('suvbanean')}}</router-link>
                    </el-col>
                  </el-row>
                  <el-row class="tr">
                    <el-col class="td"
                            :span="12"
                            v-for="(value, key) in mapAccountInfo"
                            :key="key">
                      <p>{{value}}</p>
                      <span>{{item[key] | round( (activeCurrency || {}).value_scale || 4)}}</span>
                    </el-col>
                  </el-row> 
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>  
          <div
            :class="['vertical-login', state.skin]"
            v-if="!isLogin" >
            <div class="message mt-30 ml-24">{{ $t('appNav.welcome', {siteName: state.siteName})}}!</div>
            <div class="vertical-login-box">
              <div class="logo"> 
                <img :src="require(`../../assets/ixx/ixx_logo${state.skin==='dark' ? '' : '-dark'}.png`)" alt="">  
              </div>
              <div
                class="login-button"
                @click="login('login')">{{ $t('appNav.signin') }}</div>
              <div
                class="login-button register mt-20"
                @click="login('register')">{{ $t('appNav.signup') }}</div> 
            </div>
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
            <div  
              :class="['directive-login', state.skin]"
              v-if="!state.userInfo">
              <div class="el-button el-button--success"
                   @click="login('login')">{{ $t('appNav.signin') }}</div>
              <div class="el-button el-button--danger"
                   @click="login('register')">{{ $t('appNav.signup') }}</div>
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
import selectBase from '@/components/selectBase'
// import soket from '../../mixins/resoket'
import {  bigRound, logogramNum, calcValueByAmountAndPrice, bigDiv, bigTimes, bigPlus, bigMinus, getCost, getUnitLiqPrice, getUnitTotalValue, calcProfit, toBig
} from '@/utils/handleNum'
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
} from '@/modules/api/currencyUnit'
import depthMap from './components/depth-map'
import orderPopover from './components/orderPopover'
import shipping from './components/shipping'
// import customTable from '../../components/customTable'
import historyTable from './components/history-table'
import dropdown from '@/components/dropdown'
import tradingView from './components/contract-trading-view'
import config from '@/libs/config'
import contractActive from '@/components/contractActive'
import orderBook from './components/orderbook'
import leverBox from '@/components/LeverBox' 
// import VNav from '../../layout/VNav3' 

import { local, state, actions } from '@/modules/store'
import utils from '@/modules/utils'
import wsNew from '@/modules/ws-new' 
import api from '@/modules/api/unit'
import ixSlider from '@/components/common/ix-slider/'
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
    leverBox, 
    ixSlider
    // VNav
  },
  data () {
    return {
      state,
      local,
      activeProduct: {},
      activeBtnsKey: '1',
      activePriceType: {},
      activeLever: '0',
      activeTableTabKey: 'shipping',
      // activeAcountAndPriceArr: [undefined, undefined, undefined],
      activeAcountAndPriceArr: {},
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
      socket: null,
      rates: {},
      selectTV: 'kline',
      selectOrderList: 'delegate',
      isCross: true,
      balanceFilterList: [], //过滤后的账户列表 
      orgLeverage: 0,
      currentAccount: 'ETH',
      popLeverage: false,
      popLeverageB: false
    }
  },
  computed: { 
    isLogin() {
      return !!this.state.userInfo
    },
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
      // if (!this.activeProduct.UNIT || !this.costObj || !this.activeBalance || !this.activeProduct.MARKET) return {}
      // const price = this.activeAcountAndPriceArr[1] || this.activeProduct.UNIT.current
      // const getLiqPrice = this.getLiqPrice()
      // return {
      //   1: calcValueByAmountAndPrice(this.activeAcountAndPriceArr['value'], price),
      //   2: this.costObj[this.side === 1 ? 'buy' : 'sell'],
      //   3: this.activeBalance.available_balance,
      //   4: +this.activeBalance.holding + (this.side === 2 ? -this.activeAcountAndPriceArr['value'] : +this.activeAcountAndPriceArr['value']),
      //   5: this.activeProduct.MARKET.current,
      //   6: getLiqPrice,
      //   7: 1 - (this.activeProduct.UNIT.current - getLiqPrice) / this.activeProduct.UNIT.current
      // }
      if (!this.activeProduct.UNIT || !this.costObj || !this.activeBalance || !this.activeProduct.MARKET) return {}
      const price = this.activeAcountAndPriceArr['value'] || this.activeProduct.UNIT.current
      const liqPrice = this.getLiqPrice() || 0
      return {
        value: calcValueByAmountAndPrice(this.activeAcountAndPriceArr['shippingSpace'], price),
        cost: this.costObj[this.side === 1 ? 'buy' : 'sell'],
        available: this.activeBalance.available_balance,
        holding: +this.activeBalance.holding + (this.side === 2 ? -this.activeAcountAndPriceArr['shippingSpace'] : +this.activeAcountAndPriceArr['shippingSpace']),
        market: this.activeProduct.MARKET.current,
        liqPrice: liqPrice,
        difference: 1 - (this.activeProduct.UNIT.current - liqPrice) / this.activeProduct.UNIT.current,
        differenceb: this.$big(this.activeProduct.UNIT.current - liqPrice).round(2).abs() 
      }
       
    },
    userData () {
      return this.$store.state.userData
    },
    mapDishNewInfo () {
      return this.allLangData['contract'].mapDishNewInfo
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
                return this.bigRound(calcValueByAmountAndPrice(row.amount, row.price).abs(), 8)
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
    // costObj () {
    //   if (!this.activeBalance) return
    //   const obj = {} 
    //   const price = this.activeAcountAndPriceArr['shippingSpace'] || this.activeProduct.UNIT.current
    //   // const activeLever = !+this.activeLever ? 100 : +this.activeLever
    //   if (+this.activeBalance.holding < 0) {
    //     let buyAmount
    //     buyAmount = this.activeAcountAndPriceArr['value'] - Math.abs(+this.activeBalance.holding)
    //     buyAmount = buyAmount <= 0 ? 0 : buyAmount
    //     obj.buy = getCost({ ...this.activeProduct, amount: buyAmount, price }, this.activeLever)
    //     obj.sell = getCost({ ...this.activeProduct, amount: this.activeAcountAndPriceArr['value'], price }, this.activeLever)
    //   } else {
    //     let sellAmount
    //     sellAmount = this.activeAcountAndPriceArr['value'] - +this.activeBalance.holding
    //     sellAmount = sellAmount <= 0 ? 0 : sellAmount
    //     obj.buy = getCost({ ...this.activeProduct, amount: this.activeAcountAndPriceArr['value'], price }, this.activeLever)
    //     obj.sell = getCost({ ...this.activeProduct, amount: sellAmount, price }, this.activeLever)
    //   }
    //   return obj
    // },
    costObj () { 
      if (!this.activeBalance) return
      const obj = {}
      const price = this.activeAcountAndPriceArr['value'] || this.activeProduct.UNIT.current
      // const activeLever = !+this.activeLever ? 100 : +this.activeLever
      if (+this.activeBalance.holding < 0) {
        let buyAmount
        buyAmount = this.activeAcountAndPriceArr["shippingSpace"] - Math.abs(+this.activeBalance.holding)
        buyAmount = buyAmount <= 0 ? 0 : buyAmount
        obj.buy = getCost({ ...this.activeProduct, amount: buyAmount, price }, this.activeLever)
        obj.sell = getCost({ ...this.activeProduct, amount: this.activeAcountAndPriceArr["shippingSpace"], price }, this.activeLever)
      } else {
        let sellAmount
        sellAmount = this.activeAcountAndPriceArr["shippingSpace"] - +this.activeBalance.holding
        sellAmount = sellAmount <= 0 ? 0 : sellAmount
        obj.buy = getCost({ ...this.activeProduct, amount: this.activeAcountAndPriceArr["shippingSpace"], price }, this.activeLever)
        obj.sell = getCost({ ...this.activeProduct, amount: sellAmount, price }, this.activeLever)
      }
      return obj
    },
    mapLever () {
      if (!this.activeProduct || !this.activeProduct.leverages) return []
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
        priceBy: 'Fobit' + this.$tR('index'),
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
        'history': e => { }
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
    },
    mapAccountInfo () {
      return this.allLangData['contract'].mapAccountInfo
    },
    mapChartTypes () {
      return this.allLangData.tv.chart_types
    },
    mapCycles () {
      return this.allLangData.tv.cycles
    },
  },
  async created () {  
    actions.updateSession()
    // this.products = (await getSymbolList()).data
    const res = await api.getUnitContractSymList() 
    if (res && !res.code) {
      this.products = res.data.items
      this.state.unit.pairList = this.products
    } 
    
    if (!this.$route.query.pair) { 
      const pair = this.products.find(item => item.symbol === local.unit) ? local.unit : this.products[0].symbol 
      this.$router.replace({ 
        query: {
          pair
        }
      })
    } else {
      const product = this.products.find(item => item.symbol === this.$route.query.pair) || this.products[0]
      // this.activeProduct = product
      this.handleProductsChange(product) 
      // this.socket.$on('open', () => {
      //   this.handleProductsChange(product)
      // })
    } 
    await this.subMarket()
    // const queryStr = localStorage.getItem('unit-product') || this.products[0].name
    // const product = this.products.find(item => item.name === queryStr) || this.products[0]

    this.$nextTick(() => {
      this.$eventBus.$emit('protrade:layout:init')
    })

    this.handleAmountObj()

    this.$eventBus.$on('protrade:exchange:set', (params) => {
      this.activeAcountAndPriceArr['value'] = params.amount || this.activeAcountAndPriceArr['value']
      this.activeAcountAndPriceArr['shippingSpace'] = params.price || this.activeAcountAndPriceArr['shippingSpace']
    })
  },
  mounted() { 
    let ele = this.$refs['unit-container']
    if (ele) {
      ele.classList.add(this.local.skin) 
      this.state.skin =  this.local.skin
    }
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
    handleClickLeveragePreview(lever) { 
      this.setLeverage(lever)
    },
    swithStyle() {
      let ele = this.$refs['unit-container']
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
    handleTVOption (option, para) {
      this.$refs.tradingView.handleOption(option, para)
    },
    handleTypesCommand (command) {
      this.$refs.tradingView.handleOption('chartType', command)
    },
    handleCyclesCommand (command) {
      this.$refs.tradingView.handleOption('cycle', command)
    },
    onSliderDragEnd (value, dir) {
      value = value / 100.0  
      this.handleProportion(value) 
    },
    handleProportion (num) {
      let amount = 0
      let quantity = 0
      amount = this.$big((this.activeBalance || {}).available_balance).
        div(this.$big(1).div(+this.activeLever === 0 ? this.activeCurrency.max_leverage : this.activeLever).times(this.$big(1).plus(this.activeProduct.im)).plus(this.$big(this.activeProduct.take_rate).times(2)))
      quantity = amount.div(this.$big(this.activeProduct.multiplier).times(this.activeAcountAndPriceArr['value'] || this.activeProduct.UNIT.current)).times(num).round(0, 0)
      this.activeAcountAndPriceArr['shippingSpace'] = quantity
    },
    async subMarket () {
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
      // if (this.activeProduct) {
      //   document.title = (this.activeProduct.UNIT ? this.activeProduct.UNIT.current : '...') +
      //     ` (${this.activeProduct.name}) ${config.title}`
      // }
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
      if (!this.activeAcountAndPriceArr['value'] || !this.balanceList) return
      // return getUnitTotalValue(this.entrustList,
      return getUnitTotalValue(this.balanceList,
        {
          amount: this.activeAcountAndPriceArr['shippingSpace'],
          price: this.activeAcountAndPriceArr['value'] || this.activeProduct.UNIT.current        },
        this.activeProduct.multiplier)
    }, 
    getLiqPrice () {
      if (!this.activeAcountAndPriceArr['value']) return
      const price = getUnitLiqPrice({
        isBuy: this.side === 1,
        leverages: this.activeLever,
        amount: this.activeAcountAndPriceArr['shippingSpace'],
        price: this.activeAcountAndPriceArr['value'] || this.activeProduct.UNIT.current,
        available_balance: this.activeBalance.available_balance,
        totalValue: this.totalValue(),
        totalAmount: this.activeBalance.holding
      }, this.activeProduct)
      return price
    },
    handleOrderbookSoket (data, topic) {
      if (topic.indexOf(this.activeProduct.currency) > 0) {
        this.delegateData = data
        if (!this._scrolled) {
          this.$nextTick(() => {
            this.dataLoaded()
            this._scrolled = true
          })
        }
      }
    },
    handleDealSoket (data, topic) { 
      if (topic.indexOf(this.activeProduct.currency) > 0) {
         const last = data[data.length - 1]
        this.isBuy = last.side === 'buy'
        // this.newBargainListData.unshift(last)
        // this.newBargainListData.pop()
        this.newBargainListData.unshift(...data) 
        if (this.newBargainListData.length > 30) {
          this.newBargainListData.splice(30, data.length)
        } 
      }
    },
    handleSoketData (res) {
      const key = res.topic && res.topic.split('@')[0]
      this.mapHandlerSoket[key] && this.mapHandlerSoket[key](res.data, res.topic)
    },
    handlePopoverTitle (key) {
      const type = this.activeBtnsKey === '3' && this.activePriceType.key || this.activeBtnsKey
      const price = this.activeAcountAndPriceArr['value'] || (this.activeProduct.UNIT || {}).current
      const calcPrice = ['2', '4', '6'].includes(type) ? '市场最优价格' : price
      return `
        ${this.$tR(`mapFormContent.mapHandleBtn.${key}`)}--
        ${this.$tR(`mapFormContent.mapBtns.${this.activeBtnsKey}.text`)}【${calcPrice}】--
        数量【${this.activeAcountAndPriceArr['shippingSpace']}】
      `
    },
    handleDisabledBtn (side) {
      if (+this.activeBtnsKey > 2) {
        const comparisonValue = (this.activeProduct[this.productType[this.trigger_type]] || {}).current
        const hasValue = this.activeAcountAndPriceArr['value'] && this.activeAcountAndPriceArr['triggerPrice']
        const type = !['3', '4'].includes(this.activePriceType.key) ? 'sell' : 'buy'
        const isSell = side === type ? +this.activeAcountAndPriceArr['triggerPrice'] > comparisonValue : +this.activeAcountAndPriceArr['triggerPrice'] < +comparisonValue
        const res = hasValue && isSell
        return !res
      } else return !this.activeAcountAndPriceArr['value']
    },
    handleLever (leverage) {
      if (leverage === 'cross') {
        this.setLeverage(0)
      } else {
        this.setLeverage(leverage)
      }
    },
    setLeverage (leverage) {
      setLeverage({ name: this.activeProduct.name, leverage }).then(res => {
        if (!res.code) {
          this.$message.success(this.$t('tj_cg'))
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
      this.activeAcountAndPriceArr['shippingSpace'] = this.activeAcountAndPriceArr['shippingSpace'] || (this.activeProduct.UNIT || {}).current
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
        let balanceFilterList = []
        if (!res.code && !!res.data) {
          let blist = res.data.map(item => {
            let curProduct = this.mapProduct[item.name]
            if (!curProduct) { 
              return item
            } 
            item.value = !+item.holding ? 0 : bigDiv([item.holding, item.price], 8)
            item.price = this.bigRound(item.price, this.activeProduct['price_scale'])
            item._leverage = item.leverage === '0' ? this.$t('contract_cal_full') : item.leverage
            // console.log('handleBalanceListhandleBalanceListhandleBalanceList')
            // if (this.mapProduct && curProduct.UNIT && +item.holding > 0) {

            // } 
            item.funUnrealized = (row) => {
              if (!this.mapProduct || !curProduct.UNIT || !+row.holding || !+row.price) {
                return '0'
              }
              let openValue = toBig(row.holding).div(curProduct.MARKET.current).abs()
              let leverage = +row.leverage || curProduct.max_leverage
              let unrealized = calcProfit(row.holding, row.price, curProduct.UNIT.current)
              let roe = toBig(unrealized).div(openValue).times(leverage).times(100).toFixed(2)
              let unrealizedM = calcProfit(row.holding, row.price, curProduct.MARKET.current)
              let roeM = toBig(unrealizedM).div(openValue).times(leverage).times(100).toFixed(2)
              return { unrealized, roe, unrealizedM, roeM }
            }
            let row = balanceFilterList.find(dr => dr.currency === item.currency)
            if (!row) {
              balanceFilterList.push(item)
              item.amargin_balance = item.margin_balance
              item.aunrealized = item.unrealized
              item.amargin_position = item.margin_position
              item.amargin_delegation = item.margin_delegation
            } else {
              // row.margin_balance = this.$big(item.margin_balance).plus(item.unrealized)
              // row.unrealized += item.unrealized
              // row.margin_position += item.margin_position
              // row.margin_delegation += item.margin_delegation
              row.amargin_balance =this.$big(row.amargin_balance).plus(item.unrealized)
              row.aunrealized = this.$big(row.aunrealized).plus(item.unrealized) 
              row.amargin_position = this.$big(row.amargin_position).plus(item.margin_position)
              row.amargin_delegation = this.$big(row.amargin_delegation).plus(item.margin_delegation)
            }
            return item
          })
          this.$set(this, 'balanceFilterList', balanceFilterList)
          //账户列表跟币对列表可能不一样，过滤掉多余的账户数据
          this.balanceList = blist.filter(item => !!item.funUnrealized)
          // console.log(this.balanceFilterList)
          return Promise.resolve()
        } else if (res.code !== 401) {
          this.$message.error(res)
        }
      })
    },
    handleTickers (data) { 
      if (!this.products) return
      data.map(market => { 
        const pairArr = market.pair.split('_') 
        if (pairArr && pairArr.length) {
          const found = this.products.find(item => item.symbol === market.pair || item.name === pairArr[1])
          if (found) {
            this.$set(found, pairArr[0], market)
            if (found.symbol === state.unit.pair) {
              this.activeProduct = found
            }
          } 
        }
      }) 
      // data.reduce((prev, curr) => {
      //   const pairArr = curr.pair.split('_')
      //   const found = prev.find(item => item.currency === pairArr[1])
      //   // found && this.$set(found, pairArr[0], curr)
      //   if (found) {
      //       this.$set(found, pairArr[0], curr)
      //       if (found.symbol === state.unit.pair) {
      //         this.activeProduct = found
      //       }
      //     } 
      //   return prev
      // }, this.products)
    },
    handleProductsChange (product) {
      if (!product) {
        return
      }
      if (this.isLogin) {
        this.checkActive()
      }
      local.unit = product.name
      // localStorage.setItem('unit-product', product.name)
      this.$router.replace({ query: { pair: product.symbol } })
      if (this.socket) {
        if (this.activeProduct) {
          this.socket.socket.send(`{"op":"unsubscribepub","args":["orderbook@${this.activeProduct.product}_${this.activeProduct.currency}@0@1@20"]}`)
          this.socket.socket.send(`{"op":"unsubscribepub","args":["deal@${this.activeProduct.product}_${this.activeProduct.currency}"]}`)
        }
        this.socket.socket.send(`{"op":"subscribepub","args":["orderbook@${product.product}_${product.currency}@0@1@20"]}`)
        this.socket.socket.send(`{"op":"subscribepub","args":["deal@${product.product}_${product.currency}"]}`)
      }
      getFutureListByKey(`${product.product}_${product.currency}`, { size: 30 }).then(({ data }) => {
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
      this.currentAccount = product.currency 
    },
    calcIncreaseRate (product) {
      if (!product.UNIT) return 0
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
        return key === 'volume_24h' ? logogramNum((this.activeProduct.UNIT || this.activeProduct.MARKET)[key]) + unit : bigRound((this.activeProduct.UNIT || this.activeProduct.MARKET)[key], fixed)
      }
    },
    handleWidthBg (amount, max) {
      return +bigDiv([amount, max]) * 100 + '%'
    },
    async handleAmountObj () {
      // utils.log('handleAmountObj 1111')
      if (!this.state.userInfo) return
      // utils.log('handleAmountObj 2222')
      // clearTimeout(this._timer)
      // return new Promise(resolve => {
      //   this._timer = setTimeout(async () => {
      //     await this.handleBalanceList()
      //     const res = await getAllAmount()  
      //     if (!res.code) {
      //       const { holding_amount: shipped, active_amount: curEntrust, active_triggers_amount: lossEntrust, active_orders_amount: historyEntrust, orders_amount: bargain } =res.data
      //       const data = this.amountObj && JSON.parse(JSON.stringify(this.amountObj))
      //       const obj = {
      //         shipping: [this.calcBalanceList.length, data && data.shipping[0] !== this.calcBalanceList.length],
      //         shipped: [shipped, false],
      //         curEntrust: [curEntrust, data && data.curEntrust[0] !== curEntrust],
      //         lossEntrust: [lossEntrust, data && data.lossEntrust[0] !== lossEntrust],
      //         historyEntrust: [historyEntrust, data && data.historyEntrust[0] !== historyEntrust],
      //         bargain: [bargain, data && data.bargain[0] !== bargain]
      //       }
      //       obj[this.activeTableTabKey][1] = false
      //       this.amountObj = obj
      //     } else {
      //       const obj = {
      //         shipping: [0,0],
      //         shipped: [0,0],
      //         curEntrust: [0,0],
      //         lossEntrust: [0,0],
      //         historyEntrust: [0,0],
      //         bargain: [0,0]
      //       }
      //       this.amountObj = obj
      //     } 
      //     this.handleTableTabClick(this.activeTableTabKey) 
      //     this.handleEntrustList()
      //     resolve()
      //   }, 100)
      // })
      await this.handleBalanceList()
      const res = await getAllAmount()
      if (!res.code && !!res.data) {
        const { holding_amount: shipped, active_amount: curEntrust, active_triggers_amount: lossEntrust, active_orders_amount: historyEntrust, orders_amount: bargain } = res.data
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
          shipping: [0, 0],
          shipped: [0, 0],
          curEntrust: [0, 0],
          lossEntrust: [0, 0],
          historyEntrust: [0, 0],
          bargain: [0, 0]
        }
        this.amountObj = obj
      }
      this.handleTableTabClick(this.activeTableTabKey)
      this.handleEntrustList()
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
    handleHeart (data) {
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
        amount: this.activeAcountAndPriceArr['shippingSpace'],
        price: this.activeAcountAndPriceArr['value'] || (this.activeProduct.UNIT || this.activeProduct.MARKET).current,
        type: this.activeBtnsKey === '3' && this.activePriceType.key || this.activeBtnsKey, // 下单类型 1 限价 2市价 3限价止损 4市价止损 5限价止盈 6市价止盈
        side: this.side,
        name: this.activeProduct.name,
        leverage: this.activeLever,
        trigger_price: this.activeAcountAndPriceArr['triggerPrice'],
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
            this.$message.success(this.$t('tj_cg'))
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
            this.$message.success(this.$t('tj_cg'))
          }, 500)
        } else if (res.code !== 401) {
          this.$message.error(res)
        }
      })
    }
  },
  watch: { 
    '$route.query.pair': {
      async handler(pair, oldPair) { 
        if (!pair) return
        const match = pair.match(/^([a-zA-Z0-9_-]*)_([a-zA-Z0-9_-]*)$/)
        if (match) {
          this.state.unit.pair = pair 
          local.unit = pair    
          getSymbolInfo({ symbol: pair }).then(res => {
            if (!res.code) {
              this.symbolInfo = res.data[0]
            } else if (res.code !== 401) {
              this.$message.error(res)
            }
          })
          if (this.products && this.products.length > 0) {
            const found = this.products.find(item => item.symbol === pair)
            if (found) {  
              this.activeProduct = found 
              this.handleProductsChange (found)
            }  
          }
        }
      } 
    },
    activeProductPrice () {
      this.setTitle()
    }
  },
  destroyed () {
    document.title = config.title
    if (this.socket) {
      this.socket.$destroy()
    }
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
  .hr {
    height: 4px;
    background-color: $contract-bg;
  }

  
  &.dark { 
    &.page-contract {
      background-color: $contract-bg2;
      color:#ACACAC;
      .tabs-group,
      .dish-info,
      .delegate-list,
      .form-content,
      .hold-content,
      .order-list,
      .information { 
        background: $--contract-table-bg2; 
        & > .header { 
          background: $--contract-table-active2; 
          & > * { 
            &:hover,
            &.active { 
              background: $--contract-table-bg2; 
            }
          }
        }
        .content-header {
          color:#ACACAC;
          border-color: #474747;
        }
      }
      .tabs-group {
        & > div { 
          &:hover {
            background: $--contract-table-active2; 
          }
          &.active {
            background: $--contract-table-active2;
          }
        }
      }
      .ix-col { 
        /deep/ .ix-pannel { 
          background-color: $contract-block-bg2;
          .ix-header {
            background-color: $contract-block-active-bg2; 
            color: $--contract-pannel-header2;
          }
        }
      }
      .r1-c1-r1,.r1-c2-r1,.r1-c2-r2,.r1-c3-r1,.r1-c2-list {
        background:$--contract-table-bg2; 
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
        .el-tab-pane {
          ul > li:nth-child(2n) {
            background: #373737;
          }
        }
        .delegate-list {
          .title-delegate {
            border-bottom-color: $contract-bg2;
          }
        }
        .content-container { 
          ul {
            li:nth-child(2n) {
              background: #373737;
            }
          }
        }
      }
      .r1-c4 {
        .r1-c4-r1, .r1-c4-r2 {
          background:$--contract-table-bg2; 
          color: #ACACAC;
          .option-box {
            .lever-tab {
              label {
                color: #ffffff;
              }
            }
            .option-box-middle {
              .menu-box {
                color: #ACACAC;
                &.active label { 
                  color: #ffffff;
                }
              }
              .el-button-group {
                .el-button {
                  color: #fff;
                  background-color: $contract-block-bg2;
                  border-color: $primary;
                  &.el-button.el-button--primary {
                    color: #fff;
                    background-color: $primary;
                    border-color:  $primary;
                  }
                }
              }
              .option-proportion { 
                .el-button-group {
                  .el-button {
                    color: #ACACAC;
                    background-color: $--contract-pannel-header2;
                    border-color: #A6A6A6;
                  }
                }
              }
              .option-input {
                /deep/ .el-input {
                  .el-input__inner {
                    background-color: transparent;
                  }
                  .el-input-group__append {
                    background-color: transparent;
                    border-color: #A6A6A6;
                    .el-select {
                      color: #999999;
                    }
                  }
                }
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
    }
    .hr {
      background-color: $contract-bg2;
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
    .title-delegate {
      padding: 6px 13px;
      border-bottom: 2px solid $--contract-table-bd;
      text-align: left;
      font-size: 12px;
    }
    .content-header {
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      border-bottom: 1px solid $--contract-table-bd;
      font-size: 12px;
      span {
        width: 20%;
        &:not(:first-child) { 
          width: 40%;
        }
      }
    }
    & > .content-wrap {
      position: absolute;
      width: 100%;
      height: calc(100% - 4px);
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
          padding: 0 10px;
          & > li {
            &:nth-child(2n) {
              background: $primary-opacity;
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
          
            li {
              display: grid;
              grid-template-columns: 20% 40% 40%;
              span:first-child {
                padding-left: 5px;
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
      line-height: 27px;
      text-align: left;
      .btn {
        margin: 0 5px;
      }
      &.mini > * {
        margin-top: 5px;
      }
      & > * {
        margin-top: 6px;
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
          width: 52px;
          text-align: center;
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
        // border-right: 1px solid #000;
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
  .my-row {
    display: flex;
    .my-col[span~="19"] {
      flex: 1;
    }
    .my-col[span~="5"] {
      margin-left: 4px;
      width: 320px;
    }
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
  color: #4e4e4e;
  background-color: #000;
  padding-top: 0.1px;

  .x-col {
    // border:1px solid skyblue;
  }
  .product-list {
    &.active {
      background-color: #d4d4d4;
    }
  }
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
    .lever-label {
      padding: 1px 3px;
      border:1px solid $primary;
      background-color: rgba($primary, 0.1);
      border-radius: 3px;
      text-align: center;
      color: $primary;
      font-size: 12px;
    }
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
        margin-top: 3px;
        width:1px;
        height: 20px;
        background-color: #dddddd;
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

  .r1-c2-list {
    background: #ffffff;
    .el-tabs /deep/ .el-tabs__header {
      margin: 0;
    }
  }

  .r1-c4 {
    position: relative;
    .r1-c4-r1 {
      height: 447px;
      background-color: #ffffff;
      .option-header {
        padding: 5px;
        vertical-align: middle;
      }
      .option-box {
        .option-box-top {
          display: flex;
          justify-content: space-between;
          margin: 5px;
          .lever-tab {
            font-size: 0;
            overflow: hidden;
            border: 1px solid $primary;
            border-radius: 5px;
            min-width: 126px;
            label {
              display: inline-block;
              width: 50%;
              padding: 0;
              margin: 0;
              text-align: center;
              color: $primary;
              line-height: 26px;
              font-size: 14px;
              &.active {
                background-color: $primary;
                color: #ffffff;
              }
            }
          }
          .lever-select {
            white-space: nowrap;
            .el-select {
              width: 70px;
            }
          }
        }
      }
      .option-input {
        margin-top: 6px;
        padding: 0 10px;
          height: 40px;
        line-height: 40px;
        & > input,
        & > .transactionPrice {
          height: 40px;
          line-height: 40px;
          background: transparent;
          border-radius: 3px;
          border: 1px solid #666;
          text-align: center;
          color: #7d7d7d;
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
          width: 52px;
          line-height: 40px;
          text-align: center;
          color: #999;
          // border-left: 1px solid #333;
          padding-left: 4px;
        }
      }
      .option-button {
        padding: 10px;
        .activeBtn {
          box-shadow: 0 2px 0px 0px #fff;
        }
      }
      .option-proportion {
        padding: 10px;
        .el-button-group {
          display: flex;
          justify-content: center;
          .el-button {
            flex: 1;
            padding: 6px 12px;
          }
        }
      }
    }

    .r1-c4-r2 {
      position: relative;
      background: #ffffff;
      height: 290px;
      .account-hander {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;
      }
      .account-content {
        .el-tabs {
          /deep/ .el-tabs__nav {
            float: right;
            padding-right: 15px;
          }
          /deep/ .el-tabs__content {
            padding: 0 10px;
            .tr {
              .th {
                width: 50%;
                padding: 5px 0;
                &:first-child {
                  text-align: left;
                  font-size: 16px;
                }
                &:last-child {
                  text-align: right;
                }
                a {
                  display: inline;
                  padding: 5px 10px;
                  border: 1px solid;
                  border-radius: 3px;
                }
              }
              .td {
                vertical-align: middle;
                span {
                  color: $primary;
                }
              }
            }
          }
        }
        // .el-row {
        //   span {
        //     color: $primary;
        //     margin: 8px 0;
        //   }
        // }
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

.el-popover {  
  .drop-down {
    width: 300px; 
    line-height: 40px;
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

<style lang="scss">
.popoverMenuOptions {
  min-width: 120px;
  max-width: 120px;
  padding: 6px 1px;
  ul {
    li {
      text-align: center;
      line-height: 28px;
      cursor: pointer;
      &:hover {
        background-color: rgba($primary, 0.3);
      }
      &.active {
        color: #ffffff;
        background-color: $primary;
      }
    }
  }
}
</style>

