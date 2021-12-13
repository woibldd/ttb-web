<template>
  <div class="mix-contract-container">  
    <!-- <v-nav from="mix"/> --> 
    <div ref="mix-container" :class="['page-contract', 'table-container', state.skin]"> 
      <!-- 1-1 -->  
      <div style="width: 100%;" flex>
        <!-- 币对列表 --> 
        <!-- <div class="x-col mt-2 mb-2 "  flex-box="0"   v-if="showSymbolList" style="width:302px;"> 
          <div class="r1-c1-r1 mt-2 mb-2" 
            v-loading="!products.length"
            element-loading-background="rgba(0, 0, 0, 0.3)"> 
            <symList ref="symList" :pair="state.mix.pair"/>
          </div>
        </div>  -->
        <!-- 币对信息/k线 -->
        <div class="x-col ml-4 mr-4" flex-box="1" >
          <div class="x-row-1 ">
            <div class="r1-c2-r1 ">
              <div class="product-row" flex="left"> 
                <div class="product-info" flex="box:first cross:center">
                  <div >
                    <!-- <span v-if="showSymbolList"><label class="f17">{{ activeProduct.currency }}/USDT</label> </span> -->
                    <el-popover  
                      :popper-class="[state.skin, 'pd-0']"  
                      trigger="hover">
                      <div class="drop-down">
                        <div>
                          <div class="pairs-search">
                            <div class="search-box">
                              <input
                                :skin="state.skin"
                                v-model="inputSearch"
                                :placeholder="$t('search')"
                                type="text"
                                @input="filterPair()">
                              <icon name="home-search-t"/>
                            </div>
                          </div>
                          <el-row>
                            <!-- <el-col :span="10" class=" pl-22">{{$t('pair')}}</el-col>
                            <el-col :span="9">{{$t('price')}}</el-col>
                            <el-col :span="5" class="txr pr-25">{{$t('increase')}}</el-col> -->
                            <el-col :span="10" class="pl-22"> 
                            <div @click="setMixSort('currency')">
                                <sort color="#01CED1" :sort="true" :label="$t('currency')" :state="stateMixSortBy('currency')"/>
                              </div>
                            </el-col>
                            <el-col :span="6"> 
                              <div @click="setMixSort('current')">
                                <sort color="#01CED1" :sort="true" :label="$t('market.orderdeal')" :state="stateMixSortBy('current')"/>
                              </div>
                            </el-col>
                            <el-col :span="8"> 
                              <div @click="setMixSort('change_24h')" class="txr pr-18">
                                <sort color="#01CED1" :sort="true" :label="$t('market.h24change')" :state="stateMixSortBy('change_24h')"/>
                              </div> 
                            </el-col>
                          </el-row>
                        </div>
                        <div style="max-height: 250px;overflow-y: auto;"> 
                          <div v-for="(item, idx) in mixShowList" :key="idx" class="drop-item">  
                            <div 
                              :class="[{'router-link-exact-active': item.symbol===state.mix.pair}, 'link']"
                              @click="handleProductsChange(item)">
                              <el-row >
                                <el-col :span="10" class="label pl-10"><span class="currency">{{item.currency}}</span><span class="product">/USDT</span> </el-col>
                                <el-col 
                                  :class="[(item.MIX || {}).increment_24h > 0?'text-success':'text-danger']"
                                  :span="8">
                                  {{`₮${+(item.MIX || {}).current}`}}
                                </el-col>
                                <el-col 
                                  :class="[(item.MIX || {}).increment_24h > 0?'text-success':'text-danger', 'txr', ' pr-10']"
                                  :span="6" >
                                  {{+(item.MIX || {}).change_24h > 0 ? '+' : ''}}{{(item.MIX || {}).change_24h || 0 | round(2)}}%
                                </el-col>
                              </el-row> 
                            </div> 
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
                    <span v-if="!+activeLever">{{activeCurrency.max_leverage}}X</span>
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
                      <label  :class="[(activeProduct.MIX || {}).increment_24h > 0?'text-success':'text-danger']">{{(activeProduct.MIX || {}).current}}</label>
                    </div>
                    <div class="">
                      <label class="f11 c-8a mb-6">≈ {{ state.fiatMoneySymbol }}<fiat-money
                            base="USDT"
                            :value="(activeProduct.MIX || {}).current"/></label> 
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
                          :to="{name: 'MixContractFee'}"> {{ $big(symbolInfo.fee_rate || 0).times(100).round(4, 0).toFixed(4) }}% </router-link> 
                      </span>
                      <span v-else-if="key==='markPrice'"> {{(activeProduct.MARKET || {}).current }}</span>
                      <span v-else-if="key==='indexPrice'"> {{(activeProduct.INDEX || {}).current }}</span>  
                      <span v-else-if="key==='increment_24h'" > 
                        <span v-if="((activeProduct.MIX || {})['increment_24h'] || 0) > 0" class="text-success">
                          {{(activeProduct.MIX || {})['increment_24h']}}
                        </span> 
                        <span v-else class="text-danger">
                          {{(activeProduct.MIX || {})['increment_24h']}}
                        </span>
                      </span> 
                      <span v-else-if="key==='volume_24h'"> {{(activeProduct.MIX || {})[key] | pretty }}</span>
                      <span v-else>
                        {{(activeProduct.MIX || {})[key] }}
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
                <div class="tv-tools" flex="cross:center">
                  <el-dropdown class="tool ml-10" @command="handleCyclesCommand" size="mini">
                    <span class="el-dropdown-link pointer">
                      <span style="display: inline-block; width:36px; white-space: nowrap;">{{ $t(`tv.cycles.${local.mixIntervalText}.text`)}}</span> <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu :class="state.skin" slot="dropdown"> 
                      <el-dropdown-item 
                        v-for="(item, index) in mapCycles"  
                        :command="index"
                        :key="index"> 
                        <div style="width: 50px; text-align:center;" >{{item.text}}</div>
                      </el-dropdown-item> 
                    </el-dropdown-menu>
                  </el-dropdown> 
                  <div class="sep ml-5 mr-5" :class="[state.skin]"></div>
                  <el-dropdown class="tool" @command="handleTypesCommand">
                    <span class="el-dropdown-link pointer">
                      <icon name="candle" /> 
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span> 
                    <el-dropdown-menu :class="state.skin" slot="dropdown">
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
                  <div class="sep ml-5 mr-5" :class="[state.skin]"></div>
                  <label class="el-dropdown-link pointer tool" @click="handleTVOption('indicators')"> 
                    <icon name="view"/>
                  </label> 
                  <div class="sep ml-5 mr-5" :class="[state.skin]"></div>
                  <label class="el-dropdown-link pointer tool" @click="handleTVOption('drawing')">
                    <span class="draw">{{ $t('tv.navs.left.drawing_tools') }}</span>  
                  </label>
                  <div class="sep ml-5 mr-5" :class="[state.skin]"></div>
                  <label class="el-dropdown-link pointer tool" @click="handleTVOption('setting')"> 
                    <icon name="setting" />
                  </label>
                  <div class="sep ml-5 mr-5" :class="[state.skin]"></div> 
                  <label class="el-dropdown-link pointer tool" @click="handleTVOption('fullscreen')"> 
                    <icon name="fullscreen" />
                  </label>  
                </div>
                <div class="tv-tab">
                  <label :class="{active:selectTV==='kline'}" @click="selectTV='kline'">{{ $t('tv.navs.right.kline') }}</label>
                  <label :class="{active:selectTV==='depth'}" @click="selectTV='depth'">{{ $t('tv.navs.right.deep') }}</label>
                </div>
              </div>
              <div class="r1-c2-r3 ">
                <div v-show="selectTV==='kline'">
                  <tradingView
                    style="height:550px;"
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
            <!-- 委托列表/最新成交 -->
            <div class="r1-c2-list" style="width: 250px;" flex-box="0">
              <div class="list-wrap"> 
                <div class="delegate-list"
                    v-loading="!delegateData"
                    element-loading-background="rgba(0, 0, 0, 0.3)"> 
                    <div class="title-delegate">{{$t('contract_block_orderbook')}}</div>
                    <orderBook2
                      ref="orderBook2"
                      @changeDeep="changeDeep"
                      :active-product="activeProduct"
                      :order-data="delegateData"
                      :last-price="(activeProduct.MIX||{}).current"
                      :index-price="(activeProduct.INDEX||{}).current"
                      :mark-price="handleDishInfoItem('markPrice')"
                      :is-buy="isBuy" />
                </div> 
                <div v-loading="!newBargainListData.length"
                    class="delegate-list mt-4"
                    style="height:245px"
                    element-loading-background="rgba(0, 0, 0, 0.3)">  
                    <div class="title-delegate">{{$t('contract_block_orderdeal')}}</div>
                    <div
                      class="content-header"
                      flex="main:justify box:mean">
                      <span
                        v-for="(value,key) in mapHeader2"
                        :class="{'txl': key==='transaction-price', 'txr': key==='time' || key==='trading-volume'}"
                        :key="key">{{ $tR(`mapDelegateList.mapHeader2.${key}`) }}</span>
                    </div> 
                    <div class="content-wrap" style="hieght: 170px;">
                      <div class="content-container">
                        <ul>
                          <li
                            v-for="(item,index) in newBargainListData"
                            :key="index"
                            flex="main:justify cross:center">
                            <!-- <span :class="[item.side === 'buy'?'text-success':'text-danger']">{{ $tR(item.side) }}</span> -->
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
        <!-- 下单 -->
        <div class="r1-c4 x-col mr-4" flex-box="0" style="width:322px;" > 
          <div class="r1-c4-r1 option " >
            <div :class="['option-header', state.skin]"> 
              <span>{{$t('contract.available_assets')}} ：</span>  
              <span>{{(activeBalance||{}).available_balance || 0 | fixed(scale)}} {{tradingType}}</span>
            </div>   
            <!-- 下单区域 -->
            <div class="option-box"> 
              <div class="option-box-top"> 
                <!-- 杠杆-->
                <!-- <div class="lever-tab" v-if="state.siteLabel!=='goldcoin'">
                  <label :class="[{active:activeLever==='0'}, 'cross']" @click="handleLever(0)">{{$t('contract_cal_full')}}</label>
                  <el-popover  
                    v-model="popLeverage"
                    placement="bottom-start"
                    :popper-class="state.skin"
                    :title="$t('lever')">
                    <div style="width: 300px;">
                      <el-row :gutter="10" >
                        <el-col class="mb-10"
                          v-for="item in mapLever" 
                          :key="item"
                          :span="6">
                          <el-button 
                            v-if="item==='0'"
                            :type="activeLever==='0' ? 'primary': ''" 
                            style="width:100%;" 
                            @click="handleLever(item);popLeverage=false"
                          >{{$t('contract_cal_full')}}
                          </el-button>
                          <el-button 
                            :type="activeLever===item ? 'primary': ''" 
                            style="width:100%;" 
                            @click="handleLever(item);popLeverage=false"
                            v-else>
                            {{item}}x
                          </el-button>
                        </el-col>
                      </el-row> 
                    </div>  
                    <label :class="[{active:activeLever!=='0'}, 'step']" slot="reference">{{$t('contract_cal_step')}}</label>   
                  </el-popover> 
                </div>
                <div v-else></div> 
                <div class="lever-select">
                  <label>{{$t('lever')}}:</label>  
                  <el-popover  
                    v-model="popLeverageB"
                    :disabled="state.siteLabel==='goldcoin'"
                    :popper-class="state.skin"
                    :title="$t('lever')">
                    <div style="width: 300px;">
                    <el-row :gutter="10" >
                      <el-col class="mb-10"
                        v-for="item in mapLever" 
                        :key="item"
                        :span="6">
                        <el-button 
                          v-if="item==='0'"
                          :type="activeLever==='0' ? 'primary': ''" 
                          style="width:100%;" 
                          @click="handleLever(item);popLeverageB=false"
                        >
                          {{$t('contract_cal_full')}}
                        </el-button>
                        <el-button 
                          :type="activeLever===item ? 'primary': ''" 
                          style="width:100%;" 
                          @click="handleLever(item);popLeverageB=false"
                          v-else>
                          {{item}}x
                        </el-button>
                      </el-col>
                    </el-row> 
                    </div>  
                    <el-button 
                      :type="state.skin==='light' ? 'primary': 'dark'" 
                      style="backgrond-color: transparent; padding: 0; height: 28px; width: 63px;"
                      size="mini"  
                      slot="reference" 
                      plain>
                      <label v-html=" (activeLever || '0')==='0' ? $t('contract_cal_full') : `<span class='f17'>${activeLever}</span>x`"></label> 
                      <icon name="arrow-down"/>
                    </el-button>
                  </el-popover>
                </div> -->
              </div> 
              <div class="option-box-middle"> 
                <!-- 开平仓 --> 
                <div class="side-menus" :class="[state.skin]" style="display:flex; text-align:center;">
                  <!-- <div 
                    v-for="(value,key) in mapFormContent.mapOrderTypes" 
                    :key="key"
                    @click="handleActiveTypeClick(key)"
                    style="flex:1;"
                    :class="['menu-box',{active:activeTypesKey === key}]">
                    <label>
                      {{ $tR(`mapFormContent.mapOrderTypes.${key}.text`) }}
                    </label>
                  </div> -->
                  <div class="ix-tab-side " flex="box:mean" :skin="state.skin"> 
                    <div class="btn"
                      v-for="(value,key) in mapFormContent.mapOrderTypes" 
                      :key="key"
                      @click="handleActiveTypeClick(key)"
                      v-tooltip.bottom="{html: true, content: $tR(`mapFormContent.mapBtns.${key}.describe`), classes: 'contract'}"
                      :class="['menu-box',{active:activeTypesKey === key}]"> 
                      {{ $tR(`mapFormContent.mapOrderTypes.${key}.text`) }}
                    </div> 
                  </div> 
                  <div class="menu-box"></div>
                </div> 
                <!-- 限价 市价 条件单 -->
                <div class="ix-tab-type">
                  <div style="text-align:center;" class="mt-20 type-menus" :class="[state.skin]">  
                    <div 
                      v-for="(value,key) in mapFormContent.mapBtns" 
                      :key="key"
                      @click="activeBtnsKey=key;isProportion=0;" 
                      :class="['menu-box', 'mr-30',{active:(activeBtnsKey===key || (+key===3 && +activeBtnsKey===4))}]">
                      <label>
                        {{ $tR(`mapFormContent.mapBtns.${key}.text`) }} 
                      </label>
                    </div>
                  </div> 
                </div>
                <!-- 价格数量 -->
                <div class="option-input  mt-15"
                  v-for="(value,key,i) in mapInput"
                  :key="key"
                  v-show="key !== 'triggerType'"
                  flex="main:justify">
                  <label>{{ $tR(`mapFormContent.mapInput.${key}`) }}</label>
                  <div
                    v-if="i===0 && activeBtnsKey === '2'"
                    :skin="state.skin"
                    class="transactionPrice"
                    flex="main:justify box:mean">
                    <div style="color: #666;">{{ $tR(`mapFormContent.perfactPrice`) }}</div>
                  </div>
                  <div v-else-if="i===1 && isProportion"
                    @click="isProportion=0"
                    class="isProportion">
                    <i v-if="+activeTypesKey===1">
                      <span class="text-info">{{ activeAcountAndPriceArr[key] }}</span>
                    </i>
                    <i v-else>
                      <span class="text-success">{{ buyAmount || 0 }}</span>/
                      <span class="text-danger">{{ sellAmount || 0 }}</span>
                    </i>
                    <b>{{ $t('contract_min_unit') }}</b>
                  </div>
                  <template v-else> 
                    <xnumberInput
                      style="width: 75%;" 
                      :skin="state.skin"
                      :ref="'xnumber'+key"
                      :disabled="key==='value' && activeBtnsKey==='4'" 
                      :placeholder="(key==='value' && activeBtnsKey==='4') ? $t('contract_order_enter_tips3'):''"
                      v-model="activeAcountAndPriceArr[key]"> 
                      <i slot="suffix" class="el-input__icon pr-10">{{ key==='shippingSpace' ? $t('contract_min_unit') : 'USDT' }}</i>
                      <el-select slot="append" 
                        :popper-class="state.skin"
                        v-if="key==='triggerPrice'" 
                        v-model="trigger_type">
                        <el-option
                          v-for="(subValue,subKey) in mapFormContent.mapTriggerType"
                          :key="subKey"
                          :label="$tR(`mapFormContent.mapTriggerType.${subKey}`)"
                          :value="+subKey" />
                      </el-select> 
                      <el-select  
                        :popper-class="state.skin" 
                        v-if="key==='value' && activeBtnsKey > 1" 
                        @change="numberInput('', 'xnumber'+key)"
                        slot="append"
                        v-model="activeBtnsKey" placeholder="请选择">
                        <el-option :label="$t('contract_deal_type_1')" value="3"></el-option>
                        <el-option :label="$t('contract_deal_type_2')" value="4"></el-option>
                      </el-select> 
                    </xnumberInput> 
                    <span   
                      class="proportion"
                      @click="isProportion=0"
                      v-if="i===1"
                      v-show="isProportion">
                      <i v-if="+activeTypesKey===1">
                        <span class="text-info">{{ activeAcountAndPriceArr[key] }}</span>
                      </i>
                      <i v-else>
                        <span class="text-success">{{ $big(isProportion || 0).times(costObj.buyAmount || 0).round(0,0) }}</span>/
                        <span class="text-danger">{{$big(isProportion || 0).times(costObj.sellAmount || 0).round(0,0)}}</span>
                      </i>
                    </span>
                  </template>   
                </div> 
                <div class="mt-10 mr-20 txr">
                  {{`${$t('contract_total_werehouse_value')}:${ $big(activeAcountAndPriceArr.shippingSpace || 0).times(activeProduct.multiplier || 0)  || 0} ${activeProduct.currency}`}} 
                  <!-- {{activeAcountAndPriceArr}} --> 
                </div> 
                <!-- 百分比输入的值 -->
                <div v-if="activeBtnsKey < 3" class="option-proportion" > 
                  <div class="ix-slider" > 
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
                </div>  
                <div class="option-button"> 
                  <!-- 按钮 --> 
                  <el-row :gutter="20">
                    <el-col 
                      :span="12"
                      v-for="(value,key) in mapFormContent.mapHandleBtn"
                      :key="key">
                      <el-popover
                        :ref="`popover-${key}`"
                        placement="right"
                        :popper-class="[`contrat-popper-${key === 'buy'?'success':'danger'}-class`, state.skin]"
                        width="400"
                        trigger="click"
                        :disabled="popoverDisabled"
                        :title="$tR(`mapFormContent.mapOrderTypes.${activeTypesKey}.text`)"> 
                        <orderPopover
                          v-model="activeLever"
                          :activeType="activeTypesKey"
                          :hander="handlePopoverTitle(key)"
                          :active-product="activeProduct"
                          :loading="buyBtnLoading"
                          :form-value-obj="formValueObj"
                          :data="mapLever"
                          :type="key === 'buy'?'success':'danger'"
                          @change="setLeverage"
                          @command="handleCommandOrder" /> 
                        <el-button
                          slot="reference"
                          :type="key === 'buy'?'success':'danger'"
                          :class="{activeBtn:isBuy ? key === 'buy': key === 'sell'}"
                          :loading="buyBtnLoading"
                          :disabled="!handleDisabledBtn(key)"
                          style="width:100%; padding: 0 20px; height: 50px;"
                          @click="handlePopoverClick(key)">
                          <div
                            v-show="!buyBtnLoading"
                            flex="main:center cross:center"> 
                            <span>{{ $tR(`mapFormContent.mapHandleBtn.${key}.${activeTypesKey}`) }}</span>
                            <span
                              v-if="activeBtnsKey === '1'"
                              style="font-size:12px"> 
                              @ {{ activeAcountAndPriceArr['value']||(activeProduct.MIX||{}).current }}  
                            </span>
                            <span
                              v-else-if="activeBtnsKey === '2' && asks.last && bids.first"
                              style="font-size:12px">
                              {{ activeAcountAndPriceArr['value'] }} 
                            </span>
                            <span
                              v-else-if="activeBtnsKey === '3'"
                              style="font-size:12px; text-align:right;">
                              <span>@ {{ activeAcountAndPriceArr['value'] }}  
                              </span> 
                              <br>
                              <span v-if="['3','4'].includes(activePriceType.key) && activeAcountAndPriceArr['triggerPrice']">{{ key === 'buy'? '≧':'≦' }} {{ activeAcountAndPriceArr['triggerPrice'] }}</span>
                              <span v-if="['5','6'].includes(activePriceType.key) && activeAcountAndPriceArr['triggerPrice']">{{ key === 'buy'? '≦':'≧' }} {{ activeAcountAndPriceArr['triggerPrice'] }}</span>
                            </span> 
                          </div>
                            <p class="mt-5" flex="main:center cross:center">
                              <b v-if="+activeTypesKey===1">
                                {{ $tR(`mapFormContent.cost`) }}：<span>{{ !activeAcountAndPriceArr['shippingSpace']?'--': $big(costObj[key] || 0).round(2,0) }}</span> 
                              </b>
                              <b v-else> 
                                {{`${$t('contractMix.stoppl.can_be_leveled')} ${costObj[`${key}Amount`]} ${$t('contractMix.sheet')}`}} 
                              </b>
                            </p>
                        </el-button>
                      </el-popover>
                    </el-col>
                  </el-row>
                  <div
                    v-for="(value,key) in mapFormContent.mapHandleBtn"
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
                  <!-- <div style="text-align:right;">
                    <span>{{$t('available_balance')}}</span>
                    <el-link 
                        style="font-size:12px"
                        href="/fund/my/tradingAccount/contractMix/index"
                        type="primary">
                        {{ (activeBalance||{}).available_balance||0| bigRound(8) }} {{ (activeBalance||{}).currency }}
                    </el-link>
                  </div> -->
                </div> 
              </div>
            </div> 
          </div> 
          <!-- 合约账户 -->
          <div class="r1-c4-r2 account-box mt-4">
            <div class="account-hander">
              {{$t('future_account')}}
            </div> 
            <div class="account-content">  
              <el-tabs v-model="currentAccount">  
                <el-tab-pane 
                  v-for="(item, index) in balanceFilterList" 
                  :key="index"
                  :label="item.currency" 
                  :name="item.currency">
                  <div class="tr" flex="main:justify">
                    <div class="left pt-10 th">
                      <p >{{ $t('contract.float_profit_loss') }}</p>  
                      <p style="font-size: 25px;" :class="handleCalcProfitLoss(item.currency).unrealized > 0 ? 'text-success' : 'text-danger'">
                        <span>{{handleCalcProfitLoss(item.currency).unrealized |round(scale)}} </span> <br>
                        <!-- <span>{{handleCalcProfitLoss(item.currency).roe |round(2) }}%</span>  -->
                      </p>  
                    </div>
                    <div class="right pt-15 pb-10 th">
                      <router-link   :to="{path:'/nfund/transfer'}">{{$t('suvbanean')}}</router-link>
                    </div>
                  </div>
                  <el-row class="tr">
                    <el-col class="td mb-5" :span="12" v-for="(value, key) in mapAccountInfo" :key="key" > 
                      <p class="tick-info">{{value}}</p>
                      <!-- <span>{{item[key] | round( (activeCurrency || {}).value_scale || 4)}}</span> -->
                      <span class="tick-value">{{item[key] | fixed(scale)}}</span>
                    </el-col>
                  </el-row>  
                </el-tab-pane>
              </el-tabs>
            </div>
          </div> 
          <div
            :class="['vertical-login', state.skin]"
            v-if="!state.userInfo" >
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
      <div class="ix-row pl-4 pr-4">
        <div class="ix-col ix-col-1">
          <div class="order-list">
            <div
              class="header"
              flex>
              <div
                v-for="(value,key) in mapTableTapContents"
                :key="key"
                :class="{active:activeTableTabKey === key}"
                @click="handleTableTabClick(key,amountObj[key][1]=false)">
                <el-badge
                  v-if="amountObj"
                  is-dot
                  :hidden="activeTableTabKey === key ||!amountObj[key][1]">
                  <p style="min-width:120px">{{ $tR(`mapTableTapContents.${key}.text`) }}
                    <span v-if="key!=='shipped'">【{{ amountObj[key][0] }}】</span>
                  </p>
                </el-badge>
                <p
                  v-else
                  style="min-width:120px">{{ $tR(`mapTableTapContents.${key}.text`) }}</p>
              </div>
            </div>
            <div
              v-loading="!calcTableList || loadingHistory"
              class="order-list-content"
              element-loading-background="rgba(0, 0, 0, 0.3)">
              <shipping
                v-if="activeTableTabKey === 'shipping'"
                :active-product="activeProduct"
                :products="products" 
                :mark-data="markData"
                :current-data="currentData"
                :data-list="calcTableList"
                :table-columns="tableColumns"
                @change="handleAmountObj" /> 
              <historyTable
                v-if="activeTableTabKey !== 'shipping' && calcTableList"
                header-row-class-name="contract-order-list-row-class"
                row-class-name="contract-order-list-row-class"
                size="mini"
                @loadMore="loadNext"
                :current-tab="activeTableTabKey"
                :products="products"
                :table-list="calcTableList"
                :last-column-config="lastColumnConfig"
                :table-columns="tableColumns">
                <div
                  slot="handlerDom"
                  slot-scope="{data}">
                  <el-button
                    size="mini"
                    type="danger"
                    :loading="data.cancelBtnLoading"
                    @click="cancelOrder(data)">{{ $tR('cancel') }}</el-button>
                </div>
              </historyTable>
            </div>
            <div
              :class="['directive-login', state.skin]"
              v-if="!state.userInfo">
              <!-- <div
                class="el-button el-button--success"
                @click="login('login')">{{ $t('appNav.signin') }}</div>
              <div
                class="el-button el-button--danger"
                @click="login('register')">{{ $t('appNav.signup') }}</div> -->
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
import selectBase from '@/components/selectBase' 
import mixins from '@/mixins/index'
// import soket from '../../mixins/resoket'
import { bigRound, logogramNum, calcMixValueByAmountAndPrice, bigDiv, bigTimes, bigPlus, bigMinus, getMixCost, getMixLiqPrice, getTotalValue, calcMixProfit, calcMixProfitLoss, toBig 
} from '@/utils/handleNum'

import { 
  getSymbolInfo, 
  getBalanceList,
  setLeverage,  
  submitOrder, 
  cancelOrder,  
  getAllAmount,
  getClosedpositionList,
  getActiveOrders,
  getOrderHistory,
  getOrderFills,   
  getFutureListByKey,
  getActiveTriggers,
  checkContractActive,
  getRates,
  setLeveragePreview
} from '@/modules/api/contractMix'
import depthMap from './components/depth-map'
import orderPopover from './components/orderPopover'
import shipping from './components/shipping'
import historyTable from './components/history-table'
import dropdown from '@/components/dropdown'
import tradingView from './components/contract-trading-view'
import config from '@/libs/config'
import contractActive from '@/components/contractActive'
// import orderBook from './components/orderbook'
import orderBook2 from './components/orderbook2'
import { local, state, actions } from '@/modules/store' 
import utils from '@/modules/utils'
import wsNew from '@/modules/ws-new'
import symList from '@/components/contractSymbolList'
import service from '@/modules/service'
import xnumberInput from '@/components/XNumberInput.vue'  
import ixSlider from '@/components/common/ix-slider/'
import leverBox from '@/components/LeverBox' 
import Sort from '@/views/trading1/components/Sort' 
export default {
  name: 'ContractMix',
  components: {
    // candlestick,
    xnumberInput,
    symList,
    selectBase,
    depthMap,
    // customTable,
    historyTable,
    shipping,
    dropdown,
    orderPopover,
    tradingView,
    contractActive,
    // orderBook,
    orderBook2,
    // VNav,
    ixSlider,
    leverBox,
    Sort 
  },
  mixins: [mixins],
  data () {
    return {
      state,
      local, 
      slide_value: 0,
      activeProduct: {MIX:{}},
      activeBtnsKey: '2',
      activePriceType: {},
      activeLever: '0',
      activeTableTabKey: 'shipping',
      // activeAcountAndPriceArr: [undefined, undefined, undefined],
      activeAcountAndPriceArr: {
        "shippingSpace": 1
      },
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
      closedPositionList: null,
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
        1: 'MIX',
        2: 'MARKET',
        3: 'INDEX'
      },
      activeTypesKey: '1',  // 1:开仓 2：平仓
      tradingType: 'USDT',
      tradingMenuOptions: ['USDT', 'BTC', 'ETH'],
      lock: 0,
      utils,
      socket: null,
      rates: {},
      selectTV: 'kline',
      selectOrderList: 'delegate', 
      balanceFilterList: [], //过滤后的账户列表  
      currentAccount: 'USDT',
      popLeverage: false,
      popLeverageB: false, 
      isProportion: 0, //百分比下单
      proportionBuy: 0, //
      proportionSell: 0,
      scale: 2, //小数位
      triggerType: '',
      orderType: '',
      buyAmount: '',
      sellAmount: '',
      previewLever: 0,  
      sortMixBy: '',
      sortMixState: 0,
      inputSearch: '',

    }
  },
  computed: {
    showSymbolList() {
      return {
        FoBit: true,
        BachEx: false,
        'Gold Coin': false,
      }[state.siteName]
    }, 
    mixShowList() {
      let list = this.products.filter(item => {
        return item.name.indexOf(this.inputSearch.toUpperCase()) > -1 
      })  
      if (this.sortMixState > 0 && this.sortMixBy) { 
        return list.sort((a, b) => { 
          if (this.sortMixState === 1) { 
            if (this.sortMixBy==='currency') {
              return b[this.sortMixBy].charCodeAt(0) - a[this.sortMixBy].charCodeAt(0)
            }
            return b.MIX[this.sortMixBy] - a.MIX[this.sortMixBy]
          } else if (this.sortMixState === 2) {
            if (this.sortMixBy==='currency') {
              return a[this.sortMixBy].charCodeAt(0) - b[this.sortMixBy].charCodeAt(0)
            }
            return a.MIX[this.sortMixBy] - b.MIX[this.sortMixBy]
          } 
        }) 
      } else {
        // return list
        return list.sort((a, b) => {
           return a['rank'] - b['rank']
        })
      }
    },
    adlurl () {
      let link = 'https://ixcustomer.zendesk.com/hc/zh-cn/articles/360024495432' 
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
      if (!this.state.userInfo || !this.activeProduct.MIX || !this.costObj || !this.activeBalance || !this.activeProduct.MARKET) return {}
      const price = this.activeAcountAndPriceArr['value'] || this.activeProduct.MIX.current
      const getLiqPrice = this.getLiqPrice() || 0
      const sideAmount = this.side === 1 ? 'buyAmount' : 'sellAmount'
      let amount = 0 
      if (+this.activeTypesKey===1) {
        amount = this.activeAcountAndPriceArr['shippingSpace']
      } else {
        amount = this.isProportion ? this[sideAmount] : this.activeAcountAndPriceArr['shippingSpace']
      }
      const mycost = +this.activeTypesKey === 2 ? 0 : this.costObj[this.side === 1 ? 'buy' : 'sell']
      // const balance = this.balanceList.find(item => item.name === this.activeProduct.name && item[this.side === 1 ? 'buy' : 'sell']) || {}
      const balance = this.balanceList.find(item => { 
        if (item.name === this.activeProduct.name) {
          if (+this.activeTypesKey === 1 && item.side===this.side) return true
          if (+this.activeTypesKey === 2 && item.side!==this.side) return true 
        }
      }) || {} 
      
      return {
        // value: calcMixValueByAmountAndPrice(this.activeAcountAndPriceArr['shippingSpace'], price, this.activeProduct.multiplier, this.activeBalance.rate),
        value: calcMixValueByAmountAndPrice(amount, price, this.activeProduct.multiplier, this.activeBalance.rate),
        cost: mycost,
        available: this.activeBalance.available_balance,
        holding: +(balance.holding || 0 ) + (+this.activeTypesKey === 2 ? -amount : +amount),
        market: this.activeProduct.MARKET.current,
        liqPrice: getLiqPrice,
        difference: 1 - (this.activeProduct.MIX.current - getLiqPrice) / this.activeProduct.MIX.current,
        differenceb: this.$big(this.activeProduct.MIX.current - getLiqPrice).round(2).abs() 
      }
    },
    userData () {
      return this.$store.state.userData
    },
    mapChartTypes () {
      return this.allLangData.tv.chart_types
    },
    mapCycles () {
      return this.allLangData.tv.cycles
    },
    mapDishInfo () {
      return this.langData.mapDishInfo
    },
    mapDishNewInfo () {
      return this.langData.mapDishNewInfo
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
    mapAccountInfo () {
      return this.allLangData['contract'].mapAccountInfo
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
        prev[curr.currency] = (curr.MIX || {}).current
        return prev
      }, {})
    },
    calcToBTC () {
      const arr = [this.activeProduct.MIX.volume_24h, this.activeProduct.MIX.current]
      return this.activeProduct.name === '"BTCUSDT"' ? bigDiv(arr) : bigTimes([...arr, this.activeProduct.multiplier], 2)
    },
    asks () {
      const arr = [...((this.delegateData || {}).asks || [])]
      let max = 0
      arr.forEach((item, index, arr) => {
        max = Math.max(item.values[1], max)
        item.values[2] = index > 0 ? bigPlus([item.values[1], arr[index - 1].values[2]], 0) : item.values[1]
      })
      return { arr: arr.reverse(), max, first: (arr[0] || {}).values, last: (arr[arr.length - 1] || {}).values }
    },
    bids () {
      const arr = [...(this.delegateData || {}).bids || []]
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
        curEntrust: getActiveOrders,
        lossEntrust: getActiveTriggers,
        historyEntrust: getOrderHistory,
        bargain: getOrderFills
      }
    },
    tableColumns () {
      let mapTableColumns = this.mapTableTapContents[this.activeTableTabKey].mapTableColumns
      if (this.activeTableTabKey !== 'shipping') {
        mapTableColumns = Object.keys(mapTableColumns).map(key => ({
          hearderLabel: this.$tR(`mapTableTapContents.${this.activeTableTabKey}.mapTableColumns.${key}`),
          prop: key,
          class: (value, key, row) => {
            switch (key) {
              case 'amount':
                return (row.side === 1 || row.side === 4) ? 'text-success' : 'text-danger'
              case 'side':
                return (row.side === 1 || row.side === 4) ? 'text-success' : 'text-danger'
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
                return `${value}`
              case 'side':
                // return `${row.side === 2 ? this.$tR('sell') : this.$tR('buy')}`
                return this.$tR(`side.${row.side}`)
              case 'executed':
                return `${value}/${row.amount - value}`
              case 'type':
                // return +value < 4 ? this.$tR(`mapFormContent.mapBtns.${value}.text`) : this.$tR(`mapFormContent.mapMenuOptions.${value}`)
                return this.$tR(`orderType.${row.type}`)
              case 'origin':
                return this.$tR(`origin.${row.origin}`)
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
                return this.bigRound(calcMixValueByAmountAndPrice(row.amount, row.price, this.activeProduct.multiplier, row.rate), 2)
              case 'price':
                if (+row.type===6 || +row.type===4 || +row.type===2) { 
                  if (this.activeTableTabKey==='bargain')
                    return row.price
                  else
                   return  this.$tR('orderType.2')
                } else if (+row.type===5) {
                  let str = ''
                  if (+row.tp_trigger_price > 0 && +row.sl_trigger_price > 0) {
                    if (+row.tp_trigger_price > 0) str += `<p>${this.$t('contractMix.stoppl.take_profit')} ${row.tp_price} ${row.currency}</p>`
                    if (+row.sl_trigger_price > 0) str += `<p>${this.$t('contractMix.stoppl.stop_loss')} ${row.sl_price} ${row.currency}</p>` 
                  } else {
                    if (+row.tp_trigger_price > 0) str += `<p>${row.tp_price} ${row.currency}</p>`
                    if (+row.sl_trigger_price > 0) str += `<p>${row.sl_price} ${row.currency}</p>` 
                  }
                  return str 
                } else { 
                  return this.bigRound(value, 2)
                }
              case 'trigger_price':
                if (+row.type===5 || +row.type===6) {
                  let str = ''
                  if (+row.tp_trigger_price > 0 && +row.sl_trigger_price > 0) {
                    if (+row.tp_trigger_price > 0) str += `<p>${this.$t('contractMix.stoppl.take_profit')} ${row.tp_trigger_price} ${row.currency}</p>`
                    if (+row.sl_trigger_price > 0) str += `<p>${this.$t('contractMix.stoppl.stop_loss')} ${row.sl_trigger_price} ${row.currency}</p>`
                  } else {
                    if (+row.tp_trigger_price > 0) str += `<p>${row.tp_trigger_price} ${row.currency}</p>`
                    if (+row.sl_trigger_price > 0) str += `<p>${row.sl_trigger_price} ${row.currency}</p>` 
                  }
                  return str
                } else {
                  return value
                }
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
                return '120px'
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
    // menuOptions () {
    //   const options = this.mapFormContent.mapMenuOptions
    //   const arr = Object.keys(options).map(key => ({
    //     label: this.$tR(`mapFormContent.mapMenuOptions.${key}`),
    //     key,
    //     click: item => {
    //       // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //       this.activeBtnsKey = '3'
    //     }
    //   }))
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //   this.activePriceType = arr[0]
    //   return arr
    // },
    tradingOptions () {
      const options = this.activeProduct.symbol_currency || [{currency:'USDT'}] 
      const arr = options.map(item => ({
        label: item.currency,
        key: item.currency,
        click: () => {
          this.tradingType = item.currency
        }
      }))
      return arr
    },
    costObj () { 
      const obj = {} 
      if (!this.activeBalance) return obj
      const price = this.activeAcountAndPriceArr['value'] || (this.activeProduct.MIX || {}).current
      const curSymbol = this.tradingType
      obj.buy = getMixCost({ ...this.activeProduct, amount: this.activeAcountAndPriceArr['shippingSpace'], price, curSymbol }, this.activeLever, null, null, 0)
      obj.sell = getMixCost({ ...this.activeProduct, amount: this.activeAcountAndPriceArr['shippingSpace'], price, curSymbol }, this.activeLever, null, null, 0)
      // 可平仓数量
      obj.buyAmount = 0
      obj.sellAmount = 0
      this.balanceList.map(item => {
        if (item.name === this.activeProduct.name) {  
          if (item.sell) {
            obj.buyAmount =  item.sum_close_amount || 0
          } else if (item.buy) {
            obj.sellAmount = item.sum_close_amount || 0
          }
        }
      }) 
      return obj
    },
    mapLever () {
      if (!this.activeProduct || !this.activeProduct.symbol_currency) return []  
      return this.activeProduct.symbol_currency.find(item => item.currency === this.tradingType).leverages.split(',')
    },
    activeCurrency () {
       if (!this.activeProduct || !this.activeProduct.symbol_currency) return [] 
      return this.activeProduct.symbol_currency.find(item => item.currency === this.tradingType)
    },
    updateTableList () {
      return this.tableList && this.tableList.map(item => {
        const distancePrice = 0// bigMinus([item.trigger_price || 0, this.activeProduct.MARKET.current || 0], 2)
        // 0默认 1盘口价格 2标记价格 3指数价格
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
      const found = this.balanceList.find(item => this.activeProduct.name === item.name && item.side === +this.activeTypesKey) || {}
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.activeLever = found && found.leverage  
      found.holdingSum = 0  
      this.balanceList.map(item => { 
        if (this.activeProduct.name === item.name)
          found.holdingSum += +item.holding 
      })
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
        priceBy: 'FoBit' + this.$tR('index'),
        priceIndex: this.activeProduct.INDEX.current,
        volume_24h: this.handleDishInfoItem('volume_24h'),
        value:`${this.activeProduct.multiplier} ${this.activeProduct.currency}`,
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
      if (this.activeProduct && this.activeProduct.MIX) {
        return this.activeProduct.MIX.current
      }
      return 0
    },
    mapProduct () {
      const obj = {}
      this.products.map(q => { obj[q.name] = q })
      return obj
    } 
  },
  async mounted() {
    this.rates = (await getRates()).data  
    const res = await service.getMixContractSymList()
    if (res && !res.code) {
      this.products = res.data.items
      this.state.mix.pairList = this.products 
    } 
    const product = this.products.find(item => item.symbol === this.$route.query.pair) || this.products[0] 
    if (!this.$route.query.pair) { 
      const pair = this.products.find(item => item.symbol === local.mix) ? local.mix : this.products[0].symbol 
      this.$router.replace({ 
        query: {
          pair
        }
      }) 
    } else {
      getSymbolInfo({ symbol: this.$route.query.pair }).then(res => {
        if (!res.code) {
          this.symbolInfo = res.data.find(item => item.name === product.name)
        } else if (res.code !== 401) {
          this.$message.error(res)
        }
      }) 
    }
    this.handleProductsChange(product) 
    await this.subMarket() 
    this.handleAmountObj()  
    
  },
  created () {    
    document.querySelector('.page-loading').classList.add('show')  
    this.state.skin =  this.local.skin
    this.$nextTick(() => {
      this.$eventBus.$emit('protrade:layout:init')
    }) 
    this.$eventBus.$on('protrade:exchange:set', (params) => { 
      this.activeAcountAndPriceArr['shippingSpace'] = params.amount || this.activeAcountAndPriceArr['shippingSpace']
      this.activeAcountAndPriceArr['value'] = params.price || this.activeAcountAndPriceArr['value']
    })

    this.$eh.$on('mix:handleAmount', this.handleAmountObj) 
    this.$nextTick(()=> { 
      document.querySelector('.page-loading').classList.remove('show')
    })
  },
  methods: {   
    filterPair() {

    },
    setMixSort(key) { 
      if (this.sortMixBy === key) {
        this.sortMixState = (this.sortMixState + 1) % 3
      } else {
        this.sortMixBy = key
        this.sortMixState = 1
      }
    },
    stateMixSortBy(key) {
      if (key !== this.sortMixBy) {
        return 0
      } else {
        return this.sortMixState
      }
    },
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
    swithStyle() {
      let ele = this.$refs['mix-container']
      if (this.state.skin === 'light') 
      {
        this.local.skin = 'dark'
        this.state.skin = 'dark' 
        this.$refs.tradingView.switchSkin('dark')
      } else {
        this.local.skin = 'light'
        this.state.skin = 'light' 
        this.$refs.tradingView.switchSkin('light')
      } 
    },
    numberInput(value, name) {
      if (name === 'xnumbervalue') { 
        this.$refs.xnumbervalue[0].handleInput(value)
      }
    },
    handleActiveTypeClick(key) {  
      this.activeTypesKey=key
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
    onSliderDragEnd (value, dir) {
      value = value / 100.0  
      this.handleProportion(value) 
    },
    handleProportion(num) {  
      if (!this.activeBalance.available_balance) return
      this.isProportion = num
      this.activeAcountAndPriceArr['shippingSpace'] = ''
      if (+this.activeTypesKey === 1) {
        let amount = 0
        let quantity = 0  
        amount = this.$big((this.activeBalance||{}).available_balance).
          div(this.$big(1).div(+this.activeLever===0 ? this.activeCurrency.max_leverage : this.activeLever).times(this.$big(1).plus(this.activeProduct.im)).plus(this.$big(this.activeProduct.take_rate).times(2)))
        quantity = amount.div(this.$big(this.activeProduct.multiplier).times(this.activeAcountAndPriceArr['value'] || this.activeProduct.MIX.current)).times(num).round(0, 0)
        this.activeAcountAndPriceArr['shippingSpace'] = +quantity   
      } else { 
        this.buyAmount = this.$big(this.costObj.buyAmount).times(num).round(0,0)
        this.sellAmount = this.$big(this.costObj.sellAmount).times(num).round(0,0)
      }
    },
    subMarket() { 
      const that = this
      if (this.socket) {
        this.socket.$destroy()
      }
      this.socket = wsNew.create()
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
          that.socket.socket.send(`{"op":"subscribepub","args":["orderbook@${this.activeProduct.symbol}@${this.dataDeep}@1@10"]}`)
          that.socket.socket.send(`{"op":"subscribepub","args":["deal@${this.activeProduct.symbol}"]}`)
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
        this.$router.push({name: 'login'})
      } else if (arg === 'register') { 
        this.$router.push({name: 'register'})
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
        document.title = (this.activeProduct.MIX ? this.activeProduct.MIX.current : '...') +
          ` (${this.activeProduct.name}) ${config.title}`
      }
    },
    changeDeep (e) {
      let orgDeep = this.dataDeep
      this.dataDeep = e.accuracy
      if (this.activeProduct && this.socket) { 
        this.socket.socket.send(`{"op":"unsubscribepub","args":["orderbook@${this.activeProduct.symbol}@${orgDeep}@1@10"]}`)
        this.socket.socket.send(`{"op":"subscribepub","args":["orderbook@${this.activeProduct.symbol}@${this.dataDeep}@1@10"]}`) 
      }
    },
    totalValue () {
      if (!this.activeAcountAndPriceArr['shippingSpace'] || !this.entrustList) return
      return getTotalValue(this.entrustList,
        {
          amount: this.activeAcountAndPriceArr['shippingSpace'],
          price: this.activeAcountAndPriceArr['value'] || this.activeProduct.MIX.current },
        this.activeProduct.multiplier)
    },
    getLiqPrice () {
      if (!this.activeAcountAndPriceArr['shippingSpace']) return
      
      const curSymbol = this.tradingType
      const price = getMixLiqPrice({
        isBuy: this.side === 1, 
        leverages: this.activeLever,
        amount: this.activeAcountAndPriceArr['shippingSpace'],
        price: this.activeAcountAndPriceArr['value'] || this.activeProduct.MIX.current,
        available_balance: this.activeBalance.available_balance,
        totalValue: this.totalValue(),
        rate: this.activeBalance.rate
      }, {...this.activeProduct, curSymbol}) 
      return price
    },
    handleOrderbookSoket (data, topic) {   
      if (topic.indexOf(this.activeProduct.symbol) > 0) {
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
      if (topic.indexOf(this.activeProduct.symbol) > 0) {
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
      const price = this.activeAcountAndPriceArr['value'] || (this.activeProduct.MIX || {}).current
      const calcPrice = ['2', '4', '6'].includes(type) ? this.$t('contract_order_enter_tips3') : price
      const sideAmount = this.side === 1 ? 'buyAmount' : 'sellAmount'
      let amount = 0 
      if (+this.activeTypesKey===1) {
        amount = this.activeAcountAndPriceArr['shippingSpace']
      } else {
        amount = this.isProportion ? this[sideAmount] : this.activeAcountAndPriceArr['shippingSpace']
      }

      return `
        ${this.$tR(`mapFormContent.mapHandleBtn.${key}.${this.activeTypesKey}`)}--
        ${this.$tR(`orderType.${this.activeBtnsKey}`)}【${calcPrice}】--
        ${this.$t('amount')}【${amount}】
      `
    },
    handleDisabledBtn (side) { 
      let isRule = true  
      let hasPrice = false
      let hasAmount = false
      //activeTypesKey 1:开仓 2：平仓
      if  (this.activeTypesKey === '1') {
        hasAmount = +(this.activeAcountAndPriceArr['shippingSpace'] || 0) > 0
      } else if (this.activeTypesKey === '2') {
        if (this.isProportion > 0) {
          // 百分比输入
          hasAmount = this[`${side}Amount`] > 0
        } else {
          hasAmount = this.costObj[`${side}Amount`] >= +(this.activeAcountAndPriceArr['shippingSpace'] || 0) 
        }
      }
      //activeBtnsKey 1：限价单 2: 市价单 3:限价条件单 4：市价条件单
      if (this.activeBtnsKey===1 || this.activeBtnsKey===3) {
        hasPrice = +(this.activeAcountAndPriceArr['value'] || 0) > 0
      } else hasPrice = true

      if  (+this.activeBtnsKey > 2) {  
        return hasPrice && hasAmount && this.activeAcountAndPriceArr['triggerPrice'] 
      } else {
        return hasPrice && hasAmount
      }     
    },
    handleLever (leverage) {
      if (leverage === 'cross') {  
        this.setLeverage(0)
      } else {
        this.setLeverage(leverage) 
      }  
    },
    async handleClickLeveragePreview(lever) { 
      lever = Number(lever) 
      const selectLever = lever  
      let params = {
        name: this.activeProduct.name,
        leverage: selectLever
      }
      const res = await setLeveragePreview(params) 
      let tipObj = null
      if (!res.code) {
        tipObj = res.data[0]
        tipObj.leverage = +tipObj.leverage === 0 ? 100 : tipObj.leverage
        tipObj.margin_position = this.$big(tipObj.margin_position).round(8, 0)
        tipObj.margin_delegation = this.$big(tipObj.margin_delegation).round(8, 0)  

        if (!+tipObj.margin_position && !+tipObj.margin_delegation) {
          this.setLeverage(selectLever)
        } else {
          const result = await this.$confirm(this.$t('orderPopover.tip', tipObj), '修改杠杆', {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText:  this.$t('cancel'),
            type: 'warning',
            dangerouslyUseHTMLString: true,
            lockScroll: false
          }) 
          if (result === 'confirm') {
            this.setLeverage(selectLever)
          } 
        } 
      } else {
        this.$message.error(res.message)
      }
      this.handleLeverClose()
    },
    setLeverage (leverage) {
      setLeverage({ name: this.activeProduct.name, leverage }).then(res => {
        if (!res.code) { 
          this.activeLever = leverage
          this.$message.success(this.$t('tj_cg'))
          return Promise.resolve()
        } else if (res.code) {
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
      // if (!+this.activeAcountAndPriceArr['shippingSpace']) return
      this.activeAcountAndPriceArr['value'] = this.activeAcountAndPriceArr['value'] || (this.activeProduct.MIX||{}).current
      !this.popoverDisabled && (this.$root.modelVisible = true) || this.submitOrder()
    },
    handleEntrustList () {
      this.entrustList = null
      this.mapHandlers.curEntrust({ size: 20 }).then(res => {
        if (!res.code) {
          this.entrustList = res.data.data.map(item => {
            item.cancelBtnLoading = false
            item._symbol = item.symbol
            item.symbol = item.name
            return item
          })
        } else if (res.code !== 401) {
          this.$message.error(res)
        }
      }) 
    },
    handleBalanceList () { 
      return this.mapHandlers.shipping().then(res => { 
        this.balanceFilterList = [] 
        if (!res.code) { 
          let blist = res.data.map(item => { 
            let curProduct = this.mapProduct[item.name] // amount, price, multiplier, rate 
            if (!curProduct) { 
              return item
            } 
            //金本位查询余额的接口加个字段  101站点
            //real_available  :实际能转出金额
            // item.available_balance = item.real_available
            item.value = !+item.holding ? 0 : calcMixValueByAmountAndPrice(item.holding, item.price, curProduct.multiplier, item.rate) // bigDiv([item.holding, item.price], 8)
            // item.price = this.bigRound(item.price, this.activeProduct['price_scale'])
            item._leverage = item.leverage === '0' ? this.$t('contract_cal_full') : item.leverage 
            item.margin_balance = this.$big(item.available_balance).plus(item.unrealized)
            item.funUnrealized = (row) => { 
              if (!this.mapProduct || !curProduct.MIX || !row.holding || !row.price) {
                return {}
              } 
              let openValue = calcMixValueByAmountAndPrice(row.holding, curProduct.MARKET.current, curProduct.multiplier, row.rate) 
              let leverage = +row.leverage || curProduct.symbol_currency.find(item => item.currency === row.currency).max_leverage 
              if (+openValue===0) {
                let [ unrealized, roe, unrealizedM, roeM ] = [0,0,0,0]
                return { unrealized, roe, unrealizedM, roeM }
              } else if (row.side === 1) {
                let unrealized = calcMixProfit(row.holding, row.price, curProduct.MIX.current, curProduct.multiplier, row.rate) 
                let roe = toBig(unrealized).div(row.value).times(leverage).times(100).toFixed(this.scale)
                let unrealizedM = calcMixProfit(row.holding, row.price, curProduct.MARKET.current, curProduct.multiplier, row.rate)
                let roeM = toBig(unrealizedM).div(row.value).times(leverage).times(100).toFixed(this.scale)
                return { unrealized, roe, unrealizedM, roeM, openValue }
              } else if (row.side === 2) {
                let unrealized = calcMixProfitLoss(row.holding, row.price, curProduct.MIX.current, curProduct.multiplier, row.rate) 
                let roe = toBig(unrealized).div(row.value).times(leverage).times(100).toFixed(this.scale)
                let unrealizedM = calcMixProfitLoss(row.holding, row.price, curProduct.MARKET.current, curProduct.multiplier, row.rate)
                let roeM = toBig(unrealizedM).div(row.value).times(leverage).times(100).toFixed(this.scale)
                return { unrealized, roe, unrealizedM, roeM, openValue }
              }
            } 
            let row = this.balanceFilterList.find(dr => dr.currency === item.currency)
            if (!row) { 
              this.balanceFilterList.push(item)
              item.amargin_balance = item.margin_balance
              item.aunrealized = item.unrealized
              item.amargin_position = item.margin_position
              item.amargin_delegation = item.margin_delegation
            } else {
              row.amargin_balance =this.$big(row.amargin_balance).plus(item.unrealized)
              row.aunrealized = this.$big(row.aunrealized).plus(item.unrealized) 
              row.amargin_position = this.$big(row.amargin_position).plus(item.margin_position)
              row.amargin_delegation = this.$big(row.amargin_delegation).plus(item.margin_delegation)
            }
            return item 
          }) 
          //账户列表跟币对列表可能不一样，过滤掉多余的账户数据
          this.balanceList = blist.filter(item => !!item.funUnrealized)   
          return Promise.resolve()
        } else if (res.code !== 401) {
          this.$message.error(res)
        }
      })
    }, 
    handleCalcProfitLoss(currency) { 
      // const list = this.balanceFilterList.filter(item => item.currency === currency) 
      const list = this.balanceList.filter(item => item.currency === currency)  
      let unrealized = 0
      let roe = 0
      list.map(item => {
        let res = item.funUnrealized(item)
        unrealized = this.$big(unrealized || 0).plus(res.unrealized || 0)
        roe = this.$big(roe || 0).plus(res.roe || 0)
      })
      return {unrealized, roe}
      
    },
    handleTickers (data) {  
      if (!this.products) return
      data.map(market => { 
        const pairArr = market.pair.split('_') 
        if (pairArr && pairArr.length) {
          const found = this.products.find(item => item.symbol === market.pair || item.name === pairArr[1])  
          if (found) { 
            this.$set(found, pairArr[0], market)
            if (found.symbol === state.mix.pair) {  
              this.$set(this.activeProduct[pairArr[0]], 'current', market.current) 
            }
          } 
        }
      })
      if (this.$refs.symList) {
        this.$refs.symList.subMarket(data)
      }
    }, 
    handleHeart(data) {  
      if (this.socket) {
        this.socket.heartCheck.start()
      }
    }, 
    handleProductsChange (product) { 
      if (!product) {
        return
      } 
      if (this.isLogin) {
        this.checkActive()
      }   
      if (!this.$route.query.pair !== product.symbol) {  
        this.$router.replace({ 
          query: {
            pair: product.symbol
          }
        }) 
      }
      const affix = state.siteId >= 100 ? state.siteId : ''
      if (this.socket && this.socket.socket.readyState) {  
        if (this.activeProduct && this.activeProduct.currency && this.activeProduct.product) {
          this.socket.socket.send(`{"op":"unsubscribepub","args":["orderbook@${this.activeProduct.symbol}@0@1@10"]}`)
          this.socket.socket.send(`{"op":"unsubscribepub","args":["deal@${this.activeProduct.symbol}"]}`)
        }
        this.socket.socket.send(`{"op":"subscribepub","args":["orderbook@${product.symbol}@0@1@10"]}`)
        this.socket.socket.send(`{"op":"subscribepub","args":["deal@${product.symbol}"]}`)  
      }
      getFutureListByKey(`${product.symbol}`, { size: 30 }).then(({ data }) => {
        this.newBargainListData = data || []
      })  
      this.activeProduct = product
      // this.tradingType = product.symbol_currency[0].currency 
      this.tradingType = product.symbol_currency.find(item => item.currency.indexOf('USDT') > -1).currency //暂时默认usdt
      this.currentAccount = this.tradingType
      // this.setTitle()
      this.state.mix.pair = `${product.product}_${product.currency}` 
    },
    calcIncreaseRate (product) {
      if (!product.MIX) return 0
      return bigDiv([bigTimes([product.MIX.increment_24h, 100]), bigMinus([product.MIX.current, product.MIX.increment_24h])], Math.max(2, product.price_scale))
    },
    handleDishInfoItem (key) {
      const price_scale = this.activeProduct.price_scale
      if (key === 'markPrice') {
        const fixed = this.activeProduct.name === '"BTCUSDT"' ? 2 : price_scale
        return bigRound((this.activeProduct.MARKET || {}).current, fixed).toString()
      } else {
        const fixed = key === 'change_24h' ? 2 : price_scale
        const unit = this.activeProduct.name === '"BTCUSDT"' ? 'USD' : this.$tR(`sheet`)
        return key === 'volume_24h' ? logogramNum(this.activeProduct.MIX[key]) + unit : bigRound(this.activeProduct.MIX[key], fixed)
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
              shipping: [0,0],
              shipped: [0,0],
              curEntrust: [0,0],
              lossEntrust: [0,0],
              historyEntrust: [0,0],
              bargain: [0,0]
            }
            this.amountObj = obj
          }  
          //获取可平仓数量
          const cres = await getClosedpositionList() 
          if (!cres.code) {  
            const cdata = cres.data
            this.balanceList.map(item => {
              const find = cdata.find(r => r.name === item.name && r.side === item.side)
              if (find) item.sum_close_amount = find.sum_close_amount
            })
          } 
           
          this.handleTableTabClick(this.activeTableTabKey)
          this.handleEntrustList()
          resolve()
        }, 100)
      })
    },
    matchFutureItemByKey (key) {
      if (!this.tickersData) return {}
      return this.tickersData.MIX.find(item => item.pair === key)
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
          item.symbol = item.name
        }
        return item
      })
      if (this.activeTableTabKey === 'shipped') {
        let prevItem = ''
        let newList = []
        list.map(item => {
          if (item.name === prevItem.name) {
            prevItem.realized = bigPlus([item.realized, prevItem.realized])
          } else {
            prevItem = item
            newList.push(prevItem)
          }
        })
        this.tableList = newList
      } else if (this.activeTableTabKey === 'curEntrust') { 
        this.totalItems = this.totalItems || list.length
        if (this.historyPage > 1 && Array.isArray(this.entrustList)) {
          this.entrustList = this.entrustList.concat([], list)
        } else { 
          this.entrustList = list
        } 
      } else {
        this.totalItems = this.totalItems || list.length
        if (this.historyPage > 1 && Array.isArray(this.tableList)) {
          this.tableList = this.tableList.concat([], list)
        } else { 
          this.tableList = list
        }
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
    handleTradingTypeSwitch (Key) {
      this.tradingType = Key // 交易币种
    },
    submitOrder (side) {
      // const product = this.activeProduct
      this.buyBtnLoading = true
      let orderSide = 1
      if (+this.side === 1) {
        if (+this.activeTypesKey === 1) {
          orderSide = 1
        } else if (+this.activeTypesKey === 2) {
          orderSide = 4
        } else {

        }
      } else {
        if (+this.activeTypesKey === 1) {
          orderSide = 2
        } else {
          orderSide = 3
        }
      } 
      const sideAmount = this.side === 1 ? 'buyAmount' : 'sellAmount'
      let curAmount = 0 
      if (+this.activeTypesKey===1) {
        curAmount = this.activeAcountAndPriceArr['shippingSpace']
      } else {
        curAmount = this.isProportion ? this[sideAmount] : this.activeAcountAndPriceArr['shippingSpace']
      }
      const data = {
        user_id: this.userData.id,
        currency: this.tradingType,
        amount: curAmount,//this.activeAcountAndPriceArr['shippingSpace'],
        price: this.activeAcountAndPriceArr['value'] || this.activeProduct.MIX.current, 
        type: this.activeBtnsKey,
        side: orderSide,
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
          this.isProportion = 0
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
            this.$message.success(this.$t('提交成功'))
          }, 500)
        } else if (res.code !== 401) {
          this.$message.error(res)
        }
      })
    }, 
  },
  watch: {
    '$route.query.pair': {
      async handler(pair, oldPair) { 
        if (!pair) return
        const match = pair.match(/^([a-zA-Z0-9_-]*)_([a-zA-Z0-9_-]*)$/)
        if (match) { 
          this.activeAcountAndPriceArr = {
            "shippingSpace": 1
          }
          this.state.mix.pair = pair 
          local.mix = pair   
          if (this.products && this.products.length > 0) {
            const found = this.products.find(item => item.symbol === pair)
            if (found) {  
              this.activeProduct = found 
              this.tradingType = found.symbol_currency.find(item => item.currency.indexOf('USDT') > -1).currency //暂时默认usdt 
              this.handleProductsChange (found)
            }  
            getSymbolInfo({ symbol: pair }).then(res => {
              if (!res.code) {
                this.symbolInfo = res.data.find(item => item.name === found.name)
              } else if (res.code !== 401) {
                this.$message.error(res)
              }
            })
          }
        }
      } 
    },
    isProportion() {
      if (this.isProportion===0) { 
        this.$refs.sliderBuy.setValue(0)
      }
    },
    activeProductPrice () {
      this.setTitle()
    },
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
.mix-container {
}
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
  
  .tick-info {
    color: #888888;
  }
  .tick-value {
    color: #2C2C2C;
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
        color:#ACACAC;
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
      .tick-info {
        color: #ACACAC;
      }
      .tick-value {
        color: #ffffff;
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
      .r1-c1-r1,.r1-c2-r1,.r1-c2-r2,.r1-c3-r1,.r1-c2-list,.r1-c4-r2 {
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
        .delegate-list {
          .title-delegate {
            border-bottom-color: $contract-bg2;
          }
        }
        .content-container {
          ul > li:nth-child(2n) {
            background: #373737;
          }
        } 
      }
      .r1-c2-list {
        background: #272837;
      }
      .r1-c4 {
        .r1-c4-r1, .r1-c4-r2 {
          background:$--contract-table-bg2; 
          color: #ACACAC;
          .option-box {
            .lever-tab {
              label {
                color: #ffffff;
                // border-color: $primary;
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
                  @include limit(1);
                  color: #fff;
                  background-color: $contract-block-bg2;
                  // border-color: $primary;
                }
              }
              .option-proportion { 
                .el-button-group {
                  .el-button {
                    color: #ACACAC;
                    background-color:  $--contract-pannel-header3;
                    border-color: #A6A6A6;
                  }
                }
              }
              .option-input {
                /deep/ .el-input {
                  .el-input__inner {
                    background-color: transparent;
                    border-color: #8F8F8F;
                    color: #fff;
                    // border-color: #A6A6A6;
                  }
                  .el-input-group__append {
                    overflow: hidden;
                    background-color: transparent; 
                    border-color: #8F8F8F;
                    .el-select {
                      color: #999999;
                    }
                  }
                }
              }
               
            }
          }
          .option-input {
            .transactionPrice {  
              border-color: #3e454e; 
            }
          }
          .isProportion {
            border-color: #3e454e;
            color: #fff;
          }
        }
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
    .title-delegate {
      padding: 6px 13px;
      border-bottom: 2px solid $--contract-table-bd;
      text-align: left;
      font-size: 12px;
    }
    .content-header {
      height: 32px;
      line-height: 32px;
      padding: 0 10px 0 15px;
      // border-bottom: 1px solid $--contract-table-bd;
      font-size: 12px;
      span {
        position: relative;
        z-index: 1;
        width: 30%;
        &:last-child {
          width: 40%;
        }
      }
    }
      .content-wrap {
      position: absolute;
      width: 100%;
      height: 170px;
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
        & > ul {
          padding: 0 10px;
          & > li {
            &:nth-child(2n) {
              background: $primary-opacity;
            }
            & > span {
              position: relative;
              z-index: 1;  
              width: 30%;
              &:last-child {
                width: 40%;
              }
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
          width: 75%;
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
  color: #303030;
  background-color: #000;
  padding-top: 0.1px;
  
  .x-col {
    // border:1px solid skyblue;
  }
  .product-list {
    &.active {
      background-color: #D4D4D4;
    }
  }
  .r1-c1-r1 {
    background:#ffffff; 
  }
  .r1-c2-r1 {
    height: 60px;
    background:#ffffff;
    color: #212121;
    label {
      margin-left: 10px;
    }
    .product-info {
      height: 60px;
      font-size: 12px;
      // line-height: 30px; 
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
    background:#ffffff;
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
        margin:0;
        border:1px solid $primary;
        color: $primary;
        
        &.active {
          background-color: $primary;
          color: $primary-back;
        }
        &:nth-child(1) {
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        &:nth-child(2) {
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;;
        }
      } 
    }
  }

  .r1-c2-list {
    background:#F5F5F5;
    .el-tabs /deep/ .el-tabs__header { 
      margin: 0;
    }
  }

  
  .r1-c4 {
    position: relative;
    .r1-c4-r1 {
      height: 430px;
      background-color: #ffffff;
      .option-header {
        padding: 5px;
        vertical-align: middle;
        line-height: 28px;
        border-bottom: 2px solid #ccc;
        &.dark {
          border-color: #474747;
        }
      }
      .option-box {
        .option-box-top {
          display: flex;
          justify-content: space-between;
          margin: 5px;
          .lever-tab {
            font-size: 0;
            overflow: hidden;
            // border: 1px solid $primary;
            // border-radius: 5px;
            min-width: 126px;
            label {
              display:inline-block;
              width: 50%;
              padding: 0;
              margin:0;   
              // border-radius: 3px;
              border: 1px solid #dddddd;
              box-sizing:border-box;
              text-align: center;;
              color: #333333;
              line-height: 26px;
              font-size: 14px;
              &.cross {
                border-right: none;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
              }
              &.step { 
                border-left: none; 
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
              }
              &.active {
                border-color: $primary;
                background-color: $primary;
                color: $primary-back;
              }
            }
          }
          .lever-select {
            white-space: nowrap;
            .el-select {
              width:70px;
            }
          }
        }
        .option-box-middle {
          // margin-top:15px;
          // .el-menu-item {
          //   height: 40px;
          //   line-height: 40px;
          // }
          .side-menus {
            padding:10px 10px 0;
            text-align:center;
          }
          
          .ix-tab-type {
            margin: 0 10px; 
            .type-menus { 
              display:flex; 
              padding-top:10px;
              text-align:center;
              border-bottom: solid 1px #e6e6e6;
              &.dark {  
                border-color: #474747; 
                .menu-box{ 
                  color:#ACACAC;
                  &.active {
                    label { 
                      color:#ffffff; 
                    }
                  } 
                }
              }
              .menu-box{
                height: 30px;
                color:#666666;
                &.active {
                  label {
                    padding: 11px 0;
                    color:#3f475a;
                    border-bottom:2px solid $primary; 
                  }
                }
              }
            }
          }
          
          .ix-tab-side {
            width: 100%;
            font-size: 14px;
            overflow: hidden; 
            color: #7f7f80;
            text-align: center;    
            &[skin~='dark'] { 
              color: $--contract-action-label;
              .btn {
                background-color: #2C3138;
              }
            } 
            .btn { 
              padding: 10px 12px;
              background-color: #f3f3f3;
              &:first-child { 
                border-radius: 4px; 
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
              }
              &:last-child {
                border-radius: 4px;  
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
              }
              &.active {
                background-color: $primary;
                color: $primary-back; 
              } 
            } 
            .active {
              color: #FFFFFF;
              &.buy {
                background-color: $--color-success;
                border:none;
              }
              &.sell {
                background-color: $--color-danger;
                border:none;
              }
            }  
          }
        }
      }
      .option-input {
        position: relative;
        margin-top: 6px;
        padding: 0 10px;
        height: 36px;
        line-height: 36px;
        & > input,
        & > .transactionPrice {
          background: transparent;
          height: 40px;
          border: 1px solid #dddddd;
          text-align: center;
          color: #7d7d7d;
          box-sizing: border-box;
          width: 75%;
          font-size: 12px;
          border-radius: 3px;
        } 
        & > .isProportion { 
          background: transparent;
          height: 40px;
          border: 1px solid #dddddd;
          border-radius: 3px;
          text-align: right; 
          color: #7d7d7d;
          box-sizing: border-box;
          width: 75%;
          font-size: 12px;
          b {
            display: inline-block;
            width: 52px;
            font-size: 14px;
            text-align: center;
            color: #999;
            padding-left: 4px;
          }
        }
        & > input {
          text-align: right;
          padding-right: 62px;
          height: 36px;
          border: 1px solid #dddddd;
          border-radius: 3px;
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
        .proportion {
          position: absolute;
          top: 1px;
          right: 49px;
          height: 26px;
          width: 150px;
          background: #ffffff;
          text-align: left;
        }
      }
      .option-button { 
        padding: 10px;
        .activeBtn {
          box-shadow: 0 2px 0px 0px #fff;
        }
      }
      .option-proportion {
        padding: 0 10px;
        overflow: hidden;
        .el-button-group {
          display: flex;
          .el-button {
            flex: 1;
            padding: 6px 12px;
          }
        }
      }
      
    } 
    .r1-c4-r2 {
      position: relative;
      background:#ffffff;    
      height: 240px; 
      .account-hander {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;
      }
      .account-content {
        .el-tabs {
          /deep/ .el-tabs__header {
            margin: 0;
          }
          /deep/ .el-tabs__nav {
            float: right;
            padding-right: 15px;
          }
          /deep/ .el-tabs__content {
            padding: 0 10px;
            .tr {
              .th { 
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
                  // color: $primary;
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


  // .ix-row {
  //   flex: 1;
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: space-between;
  //   margin-top: 4px;
  // }
  // .ix-col {
  //   // background-color: $contract-block-bg;
  //   display: flex;
  //   flex-direction: column;
  //   /deep/ .ix-pannel {
  //     flex: 1;
  //     // display: flex;
  //     // flex-direction: column;
  //     background-color: $contract-block-bg;
  //     .ix-header {
  //       background-color: $contract-block-active-bg;
  //       height: 32px;
  //       line-height: 32px;
  //       font-size: 12px;
  //       padding: 0 12px;
  //       box-sizing: border-box;
  //       color: $--contract-pannel-header;
  //     }
  //   }
  // }
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
        color: $--contract-pannel-header;;
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
.option-input { 
  .el-input-group { 
    /deep/ .el-input-group__append {
      padding: 0px 13px;
      width: 60px;
    }
  }
  .contract_type_select { 
    /deep/ .el-input--suffix { 
      .el-input__inner {
        cursor: pointer;
      }
      .el-input__icon {
        cursor: pointer;
      }
    }
  }
}

.el-popover {  
  .drop-down {
    width: 350px; 
    line-height: 40px;
    color: #9F9F9F;
    .pairs-search {
      padding: 0 20px;
      .search-box {
        position:relative;
        .iconfont {
          position: absolute;
          top: 13px;
          left: 19px;
        }
      }
      input {
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        background-color: #f3f3f3;
        border:none;
        border-radius: 4px;
        text-indent: 37px;
      }
    }
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
    .pairs-search {
      padding: 0 20px;
      .search-box { 
        .iconfont { 
          color: #808080;
        }
      }
      input { 
        background-color: #37373A; 
        color: #fff;
      }
    }
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


.ix-slider {
  padding: 7px 0px;
  // margin-right: 20px;
  position: relative;
  box-sizing: border-box;
  @include clearfix();
}
.custom-label {
  position: absolute;
  bottom: -15px;
  left: 0;
  transform: translate(-50%, -12px);
  margin-left: 3px;
  width:10px;
  height:10px;
  // background:$slider-label;
  background: $slider-label;
  border:2px solid $slider-border;
  &[skin~="dark"] {
    background-color: $slider-label2;
    border-color: $slider-border2; 
  }
  border-radius:50%;
  box-sizing: border-box;
  cursor: pointer;
  z-index: 4;
}
.custom-tooltip {
  position: absolute;
  bottom: -39px;
  left: -7px;
  color: #788694;
}
.custom-label.active {
  // background-color: $primary; 
  border-color: $primary; 
  font-weight: bold;
  &.buy {
    border-color: $--color-success;
  }
  &.sell {
    border-color: $--color-danger;
  }
}
.custom-label.active::after {
  background-color: $primary;
  width: 2px;
} 
</style>
