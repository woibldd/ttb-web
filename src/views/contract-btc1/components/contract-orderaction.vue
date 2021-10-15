<template>
  <div :class="['orderaction-container','relative', state.skin]"> 
    <div class="r1-c4-r1 option ">
      <div class="ix-pannel">
        <div class="option-header relative"> 
          <span>{{$t('contract.available_assets')}} ：</span>
          <em>{{ balance.available_balance | round(pairInfo.value_scale||4) }}</em> BTC
        </div> 
      </div>
      <div class="option-box ix-pannel-body"> 
        <div :class="['option-box-middle', state.skin] ">
          <div style="text-align:center;"
              class="mt-10"> 
            <!-- 限价 市价 条件单 --> 
            <div class="ix-tab-side "   :skin="state.skin"> 
              <div
                v-tooltip.bottom="{html: true, content: $t(`contract.mapFormContent.mapBtns.1.describe`), classes: 'contract'}"
                @click="handleActiveTypeClick(1)"
                :class="['menu-box', 'btn',{active:currentDealType === 1}]"> 
                {{ $t(`contract.mapFormContent.mapBtns.1.text`)}}
              </div>
              <div
                v-tooltip.bottom="{html: true, content: $t(`contract.mapFormContent.mapBtns.2.describe`), classes: 'contract'}"
                @click="handleActiveTypeClick(2)"
                :class="['menu-box', 'btn',{active:currentDealType === 2}]"> 
                {{ $t(`contract.mapFormContent.mapBtns.2.text`)}}
              </div> 
              <div :class="['menu-box', 'btn',{active:currentDealType > 2}]"
                v-popover:popoverMenuOptions>
                <span v-if="currentDealType < 3">{{ $t(`contract.mapFormContent.mapBtns.3.text`)}}</span>
                <span v-else>{{ $t(`contract.mapFormContent.mapMenuOptions.${currentDealType}`)}}</span>
                <icon name="arrow-down" />
              </div> 
            </div>  
            <el-popover ref="popoverMenuOptions"
              :popper-class="['popoverMenuOptions', state.skin]"
              placement="bottom"
              trigger="hover"
              width="200">
              <ul>
                <li v-for="(item, key) in mapFormContent.mapMenuOptions"
                    @click="currentDealType=key"
                    :class="{active: currentDealType===key}"
                    :key="key">
                  {{item}}
                </li>
              </ul>
            </el-popover>
            <!-- 限价 市价 条件单 --> 
            <!-- <div class="ix-tab-type">
              <div style="text-align:center;" class="mt-20 type-menus" :class="[state.skin]">  
                <div 
                  v-for="(value,key) in mapFormContent.mapBtns" 
                  :key="key"
                  @click="activeBtnsKey=key;isProportion=0;" 
                  :class="['menu-box', 'mr-30',{active:(activeBtnsKey===key || (+key===3 && +activeBtnsKey===4))}]">
                  <label> 
                    {{ value.text }}
                  </label>
                </div>
              </div> 
            </div>  -->
          </div> 
          <!-- 操作区域 -->
          <div class="row op-container mt-10">
            <div class="op-order"
                :class="{'op-order-market': currentDealType === 2, 'op-order-limit': currentDealType === 1}">
              <ul class="ul"
                  :class="{'market-order': currentDealType === 2, 'limit-order': currentDealType === 1}">
                <li class="li-amount mb-12">
                  <div class="label"
                      v-tooltip.top-center="{html: true, content: $t('contract_history_position_tips'), classes: 'contract'}">{{ $t('contract_action_position') }}</div>
                  <div class="content">
                    <!-- 数量 -->
                    <currency-input class="trade"
                      v-model="amount"
                      :class="[input.amount.status]"
                      :currency="$t(unit)"
                      :scale="pairInfo.amount_scale"
                      :placeholder="$t('contract_order_enter_tips1')" />
                    <!-- <div class="estimate">
                      ≈ {{ state.fiatMoneySymbol }} <fiat-money
                        :base="'USDT'"
                        :value="price" />
                    </div>-->
                  </div>
                </li>
                <li class="li-price mb-12">
                  <div class="label"
                      v-tooltip.top-center="{html: true, content: $t('contract_price_tips'), classes: 'contract'}">{{ $t('price') }}</div>
                  <div class="content">
                    <!-- 价格 -->
                    <currency-input v-show="isMarketOrderType"
                      class="trade"
                      readonly="ture"
                      :placeholder="$t('contract_order_enter_tips3')"
                      :currency="pairInfo.currency_name" />

                    <!-- @keyup.native="decimal(price)" -->
                    <currency-input v-show="!isMarketOrderType"
                      class="trade"
                      v-model="price"
                      :accuracy="pairInfo.accuracy"
                      :readonly="currentDealType === 2 || isExtMarketOrderType"
                      :class="[input.price.status]"
                      :currency="pairInfo.currency_name"
                      :scale="pairInfo.price_scale"
                      :placeholder="$t('contract_order_enter_tips2')" />
                  </div>
                </li> 
                <li class="li-trigger-price mb-12"
                    v-if="isExtOrderType">
                  <div class="label">{{ $t('contract_trigger_price') }}</div>
                  <div class="content">
                    <!-- 触发价格 -->
                    <currency-input class="trade"
                        v-model="trigger_price"
                        :class="[input.price.status]"
                        :currency="pairInfo.currency_name"
                        :accuracy="pairInfo.accuracy"
                        :scale="pairInfo.price_scale"
                        :placeholder="$t('contract_order_enter_tips2')" />
                  </div>
                </li> 
              </ul>
            </div>
          </div> 
          <div :class="['option-proportion', state.skin]">
            <!-- <el-button-group style="width: 100%;" flex>
              <el-button @click="handleProportion(0.1)">10%</el-button>
              <el-button @click="handleProportion(0.25)">25%</el-button>
              <el-button @click="handleProportion(0.5)">50%</el-button>
              <el-button @click="handleProportion(0.75)">75%</el-button>
              <el-button @click="handleProportion(1)">100%</el-button>
            </el-button-group> -->
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
        <!-- 按钮区域 -->
        <div class="row op-button-group">
          <div class="op-button-container">
            <el-row :gutter="20">
              <el-col :span="12">
                <!-- 买入 做多 -->
                <div class="op-button bgcolor-up btn"
                    :class="{overflow: lastSideBuy,enabled: buyEnabled, disabled: !buyEnabled }"
                    v-loading="btnLongLoading"
                    @click.prevent="submit('make_more')">
                  <span>{{ buyTipsButton }}</span>
                  <p>
                    <span> {{ $t('contract_action_button_avg') }}:
                      <em class="primary-text">{{ costValueBuyNew }}</em>
                    </span>
                  </p> 
                </div> 
              </el-col>
              <el-col :span="12">
                <div class="op-button bgcolor-down btn"
                    :class="{overflow: lastSideSell,enabled: sellEnabled, disabled: !sellEnabled}"
                    v-loading="btnShortLoading"
                    @click.prevent="submit('make_less')">
                  <span>{{ sellTipsButton }}</span>
                  <p>
                    <span v-tooltip.top-center="{html: true, content: $t('contract_action_button_avg_tips'), classes: 'contract'}">
                      {{ $t('contract_action_button_avg') }}:
                      <em class="primary-text">{{ costValueSellNew }}</em>
                    </span>
                  </p> 
                </div> 
              </el-col>
            </el-row>

          </div> 
        </div>
        <!-- 委托价值/可用余额 -->
        <div class="row op-button-group">
          <div class="op-balance-container">
            <div class="op-balance flex-lr mt-5">
              <span>
                {{ $t('contract_assign_value_raw') }}
                <i class="iconfont strong pointer ml-6"
                  v-tooltip.top-center="{html: true, content:  $t('contract_action_button_value_tips'), classes: 'contract'}" />
              </span>
              <span>
                <em class="primary-text">{{ orderValue | round(pairInfo.value_scale || 4) }}</em>
                <!-- {{ pairInfo.product_name }} -->
                BTC
              </span>
            </div>
            <div class="op-balance flex-lr mt-5">
              <span>
                {{ $t('available_balance') }}
                <i class="iconfont strong pointer ml-6"
                  @click="jumpBalance"
                  v-tooltip.top-center="{html: true, content: balance.available_balance >= 0 ? $t('contract_action_button_avai_tips') :  $t('contract_action_button_low_tips'), classes: 'contract'}" />
              </span>
              <span>
                <em class="primary-text">{{ balance.available_balance | round(pairInfo.value_scale||4) }}</em>
                <!-- {{ pairInfo.product_name }} -->
                BTC
              </span>
            </div>
            <!-- <div class="op-balance mt-5" v-if="isExtOrderType"> -->
            <div class="op-balance flex-lr mt-5"
                v-if="isExtOrderType">
              <span>
                {{ $t('contract_trigger_type') }}
                <el-select class="trigger_dropdown ml-6"
                          size="mini"
                          @change="setButtonState()"
                          v-model="currentTriggerType">
                  <el-option :label="$t('contract_page.order_action.order_price')"
                            :value="1" />
                  <el-option :label="$t('contract_mark_price')"
                            :value="2" />
                  <el-option :label="$t('contract_index_price')"
                            :value="3" />
                </el-select>
              </span>
              <span>
                {{ $t('contract_trigger_close') }}
                <i class="iconfont strong pointer ml-6"
                  v-tooltip.top-center="{html: true, content:  $t('contract_page.order_action.trigger_close_tips'), classes: 'contract'}" />
                <el-checkbox class="ml-4"
                            v-model="closeAfterTrigger" />
              </span>
            </div>
            <!-- <div class="op-balance flex-lr mt-10" v-else-if="currentDealType === 'limit'">
                <span
                  v-tooltip.top-center="{content: $t('post_only_tips'), classes: 'contract'}"
                  :style="{color:(local.passiveDelegate ? '#22ced0':'')}"
                >
                  {{ $t('contract_action_passive_delegate') }}
                  <el-checkbox class="ml-4" v-model="local.passiveDelegate" />
                </span>
              </div> -->
          </div>
        </div>
      </div> 
    </div>
    <div class="r1-c4-r2 account-box mt-4">
      <div class="account-hander">
        {{$t('contract_account')}}
      </div> 
      <div class="account-content">   
        <el-tabs v-model="balance.currency">   
          <el-tab-pane  
            label="BTC" 
            :name="balance.currency"> 
            <el-row class="tr ">
              <el-col :span='12' class="pt-10 pb-10 th">
                <p >{{ $t('contract.float_profit_loss') }}</p>  
                <p :class="currentHolding.unrealized > 0 ? 'text-success' : 'text-danger'">
                  <span>{{currentHolding.unrealized | round(8)}} </span> <br>
                  <!-- <span>{{currentHolding.roe |round(2) }}%</span>  -->
                </p>  
              </el-col>
              <el-col :span='12' class="pt-15 pb-10 th"> 
                <router-link   :to="{path:'/fund/transfer'}">{{$t('suvbanean')}}</router-link>
              </el-col> 
            </el-row>
            <el-row class="tr">
              <el-col class="td" :span="12" v-for="(value, key) in mapAccountInfo" :key="key" > 
                <p>{{value}}</p>
                <span>{{currentHolding[key] | round( (pairInfo || {}).value_scale || 4)}}</span>
              </el-col>
            </el-row>   
          </el-tab-pane>
        </el-tabs>
      </div>
    </div> 
    <!-- 资产划转modal -->
    <!-- <transfer-modal :show-modal.sync="showModal" /> -->

    <!-- 调整风险限额modal -->
    <v-modal :open.sync="showRiskModal">
      <div class="modal-exchange-wrapper pd-27">
        <div class="modal-title">{{ $t('contract_change_pair_risk', {pair: 'BTC/USDT '}) }}</div>
        <div class="ex-row__label c-666">{{ $t('contract_risk_modal_tips') }}</div>
        <div class="ex-row mb-21">
          <div class="c-666">
            {{ $t('contract_more_details') }}
            <a class="c-primary">{{ $t('contract_risk_limit_note') }}</a>
          </div>
        </div>
        <div class="ex-row c-999 mb-12">{{ $t('contract_change_risk_limit', {coin: 'BTC'}) }}</div>
        <div class="risk-section mb-10">
          <simpleSlider :map="riskModal.sliderMap"
                        :times.sync="riskModal.newValue"
                        @choose="changeRiskLimit" />
        </div>
        <div class="risk__status mb-23">
          <div class="row">
            <div class="col-1 col" />
            <div class="col">{{ $t('contract_risk_limit') }}</div>
            <div class="col">{{ $t('contract_hold_promise_money') }}</div>
            <div class="col">{{ $t('contract_init_promise_money') }}</div>
          </div>
          <div class="row row-2">
            <div class="col-1 col">{{ $t('contract_current_price') }}</div>
            <div class="col">{{ riskModal.currentValue }} {{ pairInfo.product_name }}</div>
            <div class="col">{{ "0.5%" }}</div>
            <div class="col">{{ '1%' }}</div>
          </div>
          <div class="row">
            <div class="col-1 col">{{ $t('contract_neweast_price') }}</div>
            <div class="col bold">{{ riskModal.newValue }} {{ pairInfo.product_name }}</div>
            <div class="col bold">{{ riskModalHoldPercent }}%</div>
            <div class="col bold">{{ riskModalInitPercent }}%</div>
          </div>
        </div>
        <div class="flex-end">
          <div class="pointer mr-30"
               @click="showRiskModal=false">{{ $t('cancel') }}</div>
          <v-btn style="padding: 0 20px;"
                 @click="setRiskLimit"
                 :label="$t('contract_select_new_limit') + ' ' + riskModal.newValue + ' BTC'" />
        </div>
      </div>
    </v-modal>

    <!-- 买入/做多 modal 弹出购买确认-->
    <v-modal :open.sync="showMakeMoreModal"
             @close="confirmModalClosed">
      <div :class="['modal-make-more', state.skin]" >
        <dir class="pd-24">
          <div class="modal-title mb-10"
               :class="{'color-up': exchangeDir === 'BUY', 'color-down': exchangeDir === 'SELL'}">
            <p class="mb-10">{{ $t(exchangeDir === 'BUY' ? 'contract_action_button_up' : 'contract_action_button_down') }} {{ $t(isExtOrderType ? currentDealType : (currentDealType === 1 ? 'contract_limit_price': 'contract_market_price')) }}</p>
            <p>
              {{ $t(exchangeDir === 'BUY' ? 'contract_action_button_up' : 'contract_action_button_down') }}
              <span v-if="isMarketOrderType"
                    class="c-666">
                <span v-if="currentDealType == 1||
                currentDealType == 3||
                currentDealType == 5
              ">{{ $t('contract_buy_on_price_piece', {price: price, amount: amount, symbol: $t('FUTURE_&USD', {currency: state.ct.product_name})}) }}</span>
                <span else>{{ $t('contract_buy_on_price_piece1', {price: price, amount: amount, symbol: $t('FUTURE_&USD', {currency: state.ct.product_name})}) }}</span>
              </span>
              <span v-else
                    class="c-666">{{ $t('contract_buy_on_price_piece', {price: price, amount: amount, symbol: $t('FUTURE_&USD', {currency: state.ct.product_name})}) }}</span>
            </p>
            <p class="mt-8"
               v-if="isExtOrderType">
              <span class="c-666">{{ $t(exchangeDir === 'BUY' ? 'contract_trigger_tips_sell' : 'contract_trigger_tips_buy', {price: trigger_price, trigger_type: $t(triggerType)}) }}</span>
            </p>
          </div>
          <div class="modal__holding pt-17 pb-17">
            <!-- !-- 持有仓位 -- -->
            <div class="mb-17 c-fff">{{ $t('contract_hold_pos') }} : {{ $t('FUTURE_&USD', {currency: state.ct.product_name}) }}</div>
            <!-- !-- 红绿条 -- -->
            <div class="profit-risk-row mb-20">
              <div class="response-times c-fff f12"
                   :style="{left: riskModalTimesLeft}">{{ mmModal.inputLeverTime == 0 ? maxTimes : mmModal.inputLeverTime }}x</div>
              <span class="icon icon-alert"
                    v-tooltip.top-center="{content: $t('contract_max_lever') + maxTimes +'x', classes: 'contract'}" />
              <span class="icon icon-money"
                    v-tooltip.top-center="{content: $t('contract_newest_deal_price'), classes: 'contract'}" />
            </div>
            <!-- !-- 杠杆操作 input number-- -->
            <!-- !-- @change="mmModalLeverChange" -- -->
            <leverOperate v-if="language"
                          @change="mmChangeConfirm"
                          :timers-map="timersMap"
                          :real-value.sync="mmModal.inputLeverTime"
                          :slider-value.sync="mmModal.sliderLeverTime" />
            <!-- !-- 提示信息-- -->
            <div class="stopmarket_tips"
                 v-if="isExtOrderType"
                 v-html="$t(mmModal.inputLeverTime == 0 ? 'contract_win_stopMarket_0.info':'contract_win_stopMarket_sell.info' , {times: mmModal.inputLeverTime})" />
          </div>
          <!-- 表格 -->
          <div class="more__table mt-10">
            <div class="table__tr c-fff">
              <div class="col col1">{{ $t('contract_assign_value_raw') }}</div>
              <div class="col">{{ orderValue | round(pairInfo.value_scale || 4) }} BTC</div>
            </div>
            <div class="table__tr c-fff">
              <div class="col col1">{{ $t('contract_cost_10_times', {lever: userLeverTime==0 ? maxLeverage : userLeverTime}) }}</div>
              <div class="col">{{ mmModal.label === $t('order_side_buy') ? costValueBuyNew : costValueSellNew }} BTC</div>
            </div>
            <div class="table__tr c-fff">
              <div class="col col1">{{ $t('withdraw_avlb') }}</div>
              <div class="col">{{ balance.available_balance | round(pairInfo.value_scale || 4) }} BTC</div>
            </div>
            <div class="table__tr c-fff">
              <!-- 成交后的仓位大小 -->
              <div class="col col1">{{ $t('contract_pos_after_deal') }}</div>
              <div class="col">{{ currentHodingAmount }}</div>
            </div>
            <div class="table__tr c-fff">
              <!-- 标记价格 -->
              <div class="col col1">{{ $t('contract_mark_price') }}</div>
              <div class="col">{{ markPrice }}</div>
            </div>
            <div class="table__tr c-fff">
              <!-- 预计强平价格 -->
              <div class="col col1">{{ $t('contract_expect_equal_price') }}</div>
              <div class="col">{{ exchangeDir === 'BUY' ? liqBuyPrice : liqSellPrice | fixed(pairInfo.price_scale || 4) }}</div>
            </div>
            <div class="table__tr c-fff">
              <!-- 差异 -->
              <div class="col col1">{{ $t('contract_diff_expect_force') }}</div>
              <div class="col">
                <span class="c-primary">{{ liqDiffRate | fixed(2) }}%</span>
                ({{ liqDiff | fixed(pairInfo.price_scale || 4) }})
              </div>
            </div>
          </div>
          <!--备注-->
          <div class="stopmarket_tips c-primary"
               v-if="isExtOrderType && closeAfterTrigger"
               v-html="$t('contract_win_stopMarket_sell.tips', {symbol: $t('FUTURE_&USD', {currency: state.ct.product_name})})" />
          <div class="never-show pt-10 mb-10">
            <input type="checkbox"
                   v-model="mmModal.neverShow" />
            {{ $t('contract_never_show') }}
          </div>
          <div class="flex-end">
            <div class="pointer mr-30 c-fff"
                 @click="showMakeMoreModal=false;confirmModalClosed()">{{ $t('cancel') }}</div>
            <v-btn style="padding: 0 20px; width:133px"
                   :disabled="!allowSubmit"
                   @click="confrimBuyTimes"
                   :label="mmModal.label" />
          </div>
        </dir>
      </div>
    </v-modal>
    <!-- 未登录态 -->
    <!-- <div v-if="!isLogin"
         class="mask"
         :class="[{show: !isLogin}, state.skin]">
      <div class="mask-front">
        <div class="hint">{{ $t('operate_noauth') }}</div>
        <div class="link-group"> 
          <span class="link btn ibt signin bgcolor-up"
                @click="tologin">{{ $t('signin') }}</span>
          <router-link class="link btn ibt signup bgcolor-down"
                       :to="{name: 'register'}">
            <span>{{ $t('signup') }}</span>
          </router-link>
        </div>
      </div>
    </div> --> 
    <div
      :class="['vertical-login', state.skin]"
      v-if="!isLogin" >
      <div class="message mt-30 ml-24">{{ $t('appNav.welcome', {siteName: state.siteName})}}!</div>
      <div class="vertical-login-box">
        <div class="logo">
          <img :src="require(`../../../assets/ixx/ixx_logo${state.skin==='dark' ? '' : '-dark'}.png`)" alt="">  
        </div>
        <div
          class="login-button"
          @click="login('login')">{{ $t('appNav.signin') }}</div>
        <div
          class="login-button register mt-20"
          @click="login('register')">{{ $t('appNav.signup') }}</div> 
      </div>
    </div>
    <!-- 弹出对话框 -->
    <v-modal :open.sync="showDialogModel"
             @close="_resetLoadingState">
      <div class="el-message-box ix-message-box-wrapper">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>{{ $t('contract_confirm_change')}}</span>
          </div>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__status el-icon-warning"></div>
          <div class="el-message-box__message">
            <!-- <p>您的操作将修改已持仓杠杆倍数和委托订单杠杆倍数为10倍，仓位保证金调节为0.0001，委托保证金位0.0004</p> -->
            <p>{{ confirm_txt }}</p>
          </div>
          <div class="el-message-box__input"
               style="display: none;">
            <div class="el-input">
              <input type="text"
                     autocomplete="off"
                     placeholder
                     class="el-input__inner" />
            </div>
            <div class="el-message-box__errormsg"
                 style="visibility: hidden;"></div>
          </div>
        </div>
        <div class="el-message-box__btns">
          <el-checkbox v-model="neverShowOneDay">{{ $t('dialog_never_show') }}</el-checkbox>
          <button type="checkbox"
                  @click="showDialogModel=false;"
                  class="el-button el-button--default el-button--small btn--cancel">
            <span>{{ $t('cancel')}}</span>
          </button>
          <button type="button"
                  @click="showDialogModel=false;mmModalLeverChange()"
                  class="el-button el-button--default el-button--small el-button--primary btn--confirm">
            <span>{{ $t('contract_confirm_change')}}</span>
          </button>
        </div>
      </div>
    </v-modal>
    <v-modal :open.sync="state.isLoginOverdue"
             @close="logoutClose">
      <div class="loginStatus">
        <div>
          <div class="mask-logout">
            <div class="hint header">{{ $t('contract_login_overdue') }}</div>
            <div class="link-group">
              <span class="link btn ibt signin bgcolor-up"
                    @click="tologin">{{ $t('signin') }}</span>
              <span class="link btn ibt signin bgcolor-down"
                    @click="logoutClose">{{ $t('close') }}</span>
            </div>
          </div>
        </div>
      </div>
    </v-modal>
  </div>
</template>
<script>
import { state, actions, local } from "@/modules/store";
import service from "@/modules/service";
import simpleSlider from "../components/simple-slider";
import leverOperate from "../components/lever-operate";
import pairInfoMixins from "./statePairInfoComputedMixins";
import priceInfoMixins from "./stateComputedMixins";
import stateHoldingMixins from "./stateHoldingComputedMixins";
import currentDelMixins from "./stateCurrentDelComputedMixins.js";
import utils from "@/modules/utils";
import registryToast from "@/libs/toast/index";
import isEmpty from "lodash/isEmpty";
import calculator from "@/views/contract-btc/calculator";
import ixSlider from '@/components/common/ix-slider'
// const transferModal = () =>
//   import(
//     /* webpackChunkName: "transferModal" */ "@/components/Fund/contract/transfer-modal"
//   );
/**
 * r 限额值
 * m 最大杠杆倍数
 */ 
export default {
  mixins: [
    pairInfoMixins,
    priceInfoMixins,
    stateHoldingMixins,
    currentDelMixins
  ],
  components: { simpleSlider, leverOperate, ixSlider },
  data () {
    return {
      state,
      local,
      language: true,
      submitting: false,
      showModal: false,
      // currentOpenMode: 'open-long',
      //   currentDealType: 'contract_lose_stopMarket',
      currentDealType: 1,
      calc: "≥",
      calc1: "≤",
      leverTimes: ["100X", "50X", "20X", "10X"],
      maxTimes: 200,
      price: "",
      trigger_price: "",
      amount: "",
      exchangeDir: "BUY",
      input: {
        price: {
          timer: null,
          status: ""
        },
        amount: {
          timer: null,
          status: ""
        }
      },
      btnLongLoading: false,
      btnShortLoading: false,
      hold_percent: 0,
      showRiskModal: false,
      riskModal: {
        sliderMap: {
          200: 200,
          300: 300,
          400: 400,
          500: 500,
          600: 600,
          700: 700,
          800: 800,
          900: 900,
          1000: 1000,
          1100: 1100
        }, // 风险限额弹窗中slider
        currentValue: local.riskLimit || 200,
        newValue: local.riskLimit || 200
      },
      // 买入 做多弹窗使用
      showMakeMoreModal: false, // 点击买入/做多
      mmModal: {
        inputLeverTime: local.times, // 所填杠杆倍数, 初始化为userLeverTime
        sliderLeverTime: local.times,
        neverShow: local.mmNeverShow,
        label: this.$t("order_side_buy")
      },
      userLeverTime: local.times || 0,
      holdingLever: {
        sliderLeverTime: local.times, // 滑块设置的倍数
        inputLeverTime: local.times
      },
      // 止损止盈 * 1 限价 2市价 3 限价止损 4 市价止损 5 限价止赢 6 市价止盈
      orderTypeExt: [
        // "contract_lose_stopLimit",
        // "contract_lose_stopMarket",
        // "contract_win_stopLimit",
        // "contract_win_stopMarket"
        3, 4, 5, 6
      ],
      // 默认选中止损止盈
      currentOrderTypeExt: 4,
      currentTriggerType: 1,
      buyEnabled: false,
      sellEnabled: false,
      showDialogModel: false,
      neverShowOneDay: false,
      selectedTime: 0,
      confirm_txt: "",
      enter_tips:
        this.currentDealType === 2
          ? "--"
          : this.$t("contract_order_enter_tips2"),
      empty: "--",
      stickLen: 23,
      profitRiskWidth: "316px",
      closeAfterTrigger: false,
      modalStopWinState: false,
      modalStopWinType: 1, // 1 市价， 2 标记价格， 3 指数价格
      modalStopWinPrice: 0,
      modalStoplossState: false,
      modalStoplossType: 1,
      modalStoplossPrice: 0,
      triggerTypes: {
        1: "contract_page.order_action.order_price",
        2: "contract_mark_price",
        3: "contract_index_price"
      },
      activeLever: '0',
      popLeverage: false,
      popLeverageB: false,
      activeBtnsKey: '1',
      activeTypesKey: 1,
      isProportion: 0
    };
  },
  computed: {
    langData () {
      return this.$i18n.messages[this.$i18n.locale].contract
    }, 
    mapAccountInfo () {
      return this.langData.mapAccountInfo
    },
    mapFormContent () {
      return this.langData.mapFormContent
    }, 
    userSetting () {
      if (this.state.ct.userSetting) {
        return this.state.ct.userSetting;
      }
      return {};
    },
    triggerType () {
      return this.triggerTypes[this.currentTriggerType];
    },
    pair () {
      return this.state.ct.pair;
    },
    currentHolding () {
      let holdingList = this.state.ct.holdingList
      let item = holdingList.find(h => h.currency === this.state.ct.symbol)
      if (item) {
        item.amargin_balance = item.margin_balance
        item.aunrealized = item.unrealized
        item.amargin_position = item.margin_position
        item.amargin_delegation = item.margin_delegation
      }
      return item || {}
    },
    unit () {
      // if (this.pair === "FUTURE_BTCUSD") {
      //   return "USD";
      // } else {
      //   return "contract_min_unit";
      // }
      return "contract_min_unit";
    },
    //风险限额字典
    RiskLimitDict () {
      let pair = this.state.ct.pair;
      if (this.maxLeverage == 100) {
        return [
          { r: 0, m: 100 },
          { r: 200, m: 100 },
          { r: 300, m: 66.66 },
          { r: 400, m: 50 },
          { r: 500, m: 40 },
          { r: 600, m: 33.33 },
          { r: 700, m: 28.5 },
          { r: 800, m: 25 },
          { r: 900, m: 22.22 },
          { r: 1000, m: 20 },
          { r: 1100, m: 18.1 }
        ];
      } else if (this.maxLeverage == 50) {
        return [
          { r: 0, m: 50 },
          { r: 50, m: 50 },
          { r: 100, m: 33.3 },
          { r: 150, m: 25 },
          { r: 200, m: 20 },
          { r: 250, m: 16.6 },
          { r: 300, m: 14.2 },
          { r: 350, m: 12.5 },
          { r: 400, m: 11.1 },
          { r: 450, m: 10 },
          { r: 500, m: 9 }
        ];
      } else if (this.maxLeverage == 20) {
        return [
          { r: 0, m: 20 },
          { r: 50, m: 20 },
          { r: 100, m: 10 },
          { r: 150, m: 6.6 },
          { r: 200, m: 5 },
          { r: 250, m: 4 },
          { r: 300, m: 3.3 },
          { r: 350, m: 2.8 },
          { r: 400, m: 2.5 },
          { r: 450, m: 2.2 },
          { r: 500, m: 2 }
        ];
      } else {
        return [];
      }
    },
    //杠杆字典
    timersMap () {
      let pair = this.state.ct.pair;
      let pairInfo = this.state.ct.pairInfo;
      let max_leverage = "100";
      if (!!pairInfo) {
        max_leverage = pairInfo.max_leverage;
      } else {
        max_leverage =
          {
            FUTURE_BTCUSD: "100",
            FUTURE_BHDUSD: "20",
            FUTURE_ETHUSD: "50"
          }[pair] || "100";
      }
      if (max_leverage === "100") {
        return {
          // 倍数 ; 1x 2x....100x
          0: this.$t("contract_all_in"),
          1: "1x",
          2: "2x",
          3: "3x",
          5: "5x",
          10: "10x",
          25: "25x",
          50: "50x",
          100: "100x"
        };
      } else if (max_leverage === "50") {
        return {
          0: this.$t("contract_all_in"),
          1: "1x",
          2: "2x",
          3: "3x",
          5: "5x",
          10: "10x",
          25: "25x",
          35: "35x",
          50: "50x"
        };
      } else if (max_leverage === "20") {
        return {
          0: this.$t("contract_all_in"),
          1: "1x",
          2: "2x",
          3: "3x",
          4: "4x",
          5: "5x",
          10: "10x",
          15: "15x",
          20: "20x"
        };
      }
    },
    //最大杠杆倍数
    maxLeverage () {
      if (!this.state.ct.pairInfo) {
        return 100;
      }
      return this.state.ct.pairInfo.max_leverage;
    },
    // 外面红绿条上的倍数
    outerTimesLeft () {
      return 20 + (128 / 100) * this.holdingLever.sliderLeverTime + "px";
    },
    riskModalTimesLeft () {
      return 20 + (128 / 100) * this.mmModal.inputLeverTime + "px";
    },
    riskModalHoldPercent () {
      return (this.riskModal.newValue - 100) / 200;
    },
    riskModalInitPercent () {
      return this.riskModal.newValue / 200;
    },
    buttonRightText () {
      return `${this.amount} @ ${this.price}`;
    },
    buyButtonRightText () {
      if (this.currentDealType === 2) {
        return `${this.amount} @ ${this.ask || "--"}`;
      } else {
        return `${this.amount} @ ${this.price}`;
      }
    },
    sellButtonRightText () {
      if (this.currentDealType === 2) {
        return `${this.amount} @ ${this.bid || "--"}`;
      } else {
        return `${this.amount} @ ${this.price}`;
      }
    },
    buyTipsButton () {
      if (this.isExtOrderType) {
        let tag = this.currentOrderTypeExt > 4 ? "win" : "lose";
        return this.$t(`contract_trigger_${tag}_buy`);
      }

      // if (state.locale === 'en') {
      //   return this.$t('contract_action_button_up')
      // }
      return `${this.$t("contract_action_button_up")}/${this.$t(
        "contract_action_button_up_r"
      )}`;
    },
    sellTipsButton () {
      if (this.isExtOrderType) {
        let tag = this.currentOrderTypeExt > 4 ? "win" : "lose";
        return this.$t(`contract_trigger_${tag}_sell`);
      }
      // if (state.locale === 'en') {
      //   return this.$t('contract_action_button_down')
      // }
      return `${this.$t("contract_action_button_down")}/${this.$t(
        "contract_action_button_down_r"
      )}`;
    },
    buyTipsContent () {
      return this.$t("contract_action_button_tips", {
        amount: this.amount,
        price: this.price,
        method: this.$t("contract_action_button_up_r"),
        raw: this.currentHolding.holding || 0,
        now: Number(this.amount) + Number(this.currentHolding.holding || 0),
        boom: this.liqBuyPrice || "--"
      });
    },
    sellTipsContent () {
      return this.$t("contract_action_button_tips", {
        amount: this.amount | "?",
        price: this.price || "?",
        method: this.$t("contract_action_button_down_r"),
        raw: this.currentHolding.holding || 0,
        now: Number(this.amount) - Number(this.currentHolding.holding || 0),
        boom: this.liqSellPrice || "--"
      });
    },
    isLogin () {
      return !!this.state.userInfo;
    },
    isLoginOut () {
      return !this.state.userInfo;
    },
    balance () {
      return this.currentHolding;
    },
    // 订单价值
    orderValue () {
      return this.getOrderValue(this.amount);
    },
    lastPrice () {
      if (this.state.ct.lastPrice) {
        return this.state.ct.lastPrice.toString();
      }
      return "--";
    },
    ask () {
      if (this.state.ct.ask) {
        return this.state.ct.ask.toString();
      }
    },
    bid () {
      if (this.state.ct.bid) {
        return this.state.ct.bid.toString();
      }
    },
    /*
    this.buyDelAmount : 买入委托数量  正数
    this.sellDelAmount ： 卖出委托数量  负数
    this.balance : 持仓数量
    this.amount : 输入框数量
    */
    costValueBuyNew () {
      let amount = this.amount;
      if (
        amount > 0 &&
        this.balance &&
        this.$big(this.balance.holding).plus(this.buyDelAmount) < 0
      ) {
        amount = -(-amount - this.balance.holding - this.buyDelAmount);
        if (amount < 0) {
          amount = 0;
        }
      }

      let lever = this.userLeverTime == 0 ? this.maxTimes : this.userLeverTime; // local.userLeverTime
      // let im = this.$big(this.riskModalInitPercent || 0).div(100);
      let pairInfo = this.state.ct.pairInfo;
      if (amount === 0 || !pairInfo) {
        return "0";
      }

      let im = pairInfo.im;
      let mm = pairInfo.mm;
      let mul = pairInfo.multiplier;
      let takeRate = pairInfo.take_rate;

      let price = this.getCurrentPrice("BUY");

      let userInput = {
        amount: amount || "0",
        executed: 0,
        side: 1,
        price
      };
      // let futures = [...this.state.ct.currentDel, userInput]
      let futures = [...this.currentDel, userInput];
      let totalValue = calculator.getTotalValue(
        futures,
        this.balance,
        pairInfo,
        mul
      );
      let down = 0;

      if (totalValue && amount) {
        let margin = calculator.getMargin(
          amount,
          price,
          lever,
          totalValue,
          im,
          mm,
          takeRate,
          pairInfo
        );
        // return margin.cost.round(this.pairInfo.value_scale || 4, down).toString()
        return utils.toFixed(margin.cost, this.pairInfo.value_scale || 4);
      }
      return "--";
    },
    costValueSellNew () {
      let amount = this.amount;
      // 有已持仓，做对手时，判断持仓是否可以对冲，不可对冲部分算成本
      if (
        amount > 0 &&
        this.balance &&
        this.$big(this.balance.holding).plus(this.sellDelAmount) > 0
      ) {
        amount = amount - this.balance.holding - this.sellDelAmount;
        if (amount < 0) {
          amount = 0;
        }
      }
      let pairInfo = this.state.ct.pairInfo;
      if (amount === 0 || !pairInfo) {
        return "0";
      }

      let lever = this.userLeverTime == 0 ? this.maxTimes : this.userLeverTime; // local.userLeverTime
      // let im = this.$big(this.riskModalInitPercent).div(100);

      let im = pairInfo.im;
      let mm = pairInfo.mm;
      let mul = pairInfo.multiplier;
      let takeRate = pairInfo.take_rate;
      let price = this.getCurrentPrice("SELL");

      let userInput = {
        amount: amount || "0",
        executed: 0,
        side: 2,
        price
      };
      // let futures = [...this.state.ct.currentDel, userInput]
      let futures = [...this.currentDel, userInput];
      let totalValue = calculator.getTotalValue(
        futures,
        this.balance,
        pairInfo,
        mul
      );
      let down = 0;

      if (totalValue && amount) {
        let margin = calculator.getMargin(
          amount,
          price,
          lever,
          totalValue,
          im,
          mm,
          takeRate,
          pairInfo
        );
        // return margin.cost.round(this.pairInfo.value_scale || 4, down).toString()
        return utils.toFixed(margin.cost, this.pairInfo.value_scale || 4);
      }
      return "--";
    },
    /**
     *
     * 成本
     * 成本=起始保证金+资金费率+手续费
     * 起始保证金=im*委托价值*IX算法
     * IX算法 100 / 当前杠杆
     */
    costValue () {
      const amount = this.amount;
      let orderValue = this.orderValue === "--" ? 0 : this.orderValue;
      if (
        orderValue &&
        amount &&
        !isEmpty(this.pairInfo) &&
        typeof this.pairInfo.fee_rate !== "undefined"
      ) {
        // 当前杠杆 20倍
        let lever =
          this.userLeverTime == 0 ? this.maxTimes : this.userLeverTime; // local.userLeverTime
        // 限额
        let im = this.$big(this.riskModalInitPercent).div(100); // local.riskLimit
        // // 保证金
        // let margin = this.$big(orderValue).mul(100 / lever).mul(im)
        // // 资金费率 不收取
        let feeRate = 0; // this.$big(orderValue).mul(this.pairInfo.fee_rate).abs()

        // 手续费
        // let fee = this.$big(orderValue).mul(this.pairInfo.take_rate).mul(2)

        let { margin, fee } = calculator.getCostValue({
          lever,
          im,
          value: orderValue,
          take_rate: this.pairInfo.take_rate
        });

        let v = margin
          .plus(feeRate)
          .plus(fee)
          .round(this.pairInfo.value_scale || 4)
          .toString();

        return v;
      }
      return "--";
    },
    liqDiff () {
      let liqValue =
        this.exchangeDir === "BUY" ? this.liqBuyPrice : this.liqSellPrice;
      if (liqValue === "--" || this.indexPrice === "--") {
        return "--";
      }
      return this.$big(this.indexPrice)
        .minus(liqValue)
        .abs()
        .toString();
    },
    liqDiffRate () {
      if (this.liqDiff === "--") {
        return "--";
      }
      return this.$big(this.liqDiff)
        .div(this.indexPrice)
        .mul(100)
        .round(4)
        .toString();
    },
    liqBuyPrice () {
      const lever = this.userLeverTime == 0 ? this.pairInfo.max_leverage : this.userLeverTime;
      const price = this.price || "0";
      const amount = this.amount;
      if (price && amount) {
        let liqPrice = calculator.getLiqPriceInfo(
          {
            direction: "more",
            mode: this.userLeverTime == 0 ? "cross" : "fixed",
            lever,
            amount,
            open_price: price
          },
          this.balance,
          this.pairInfo
        );
        return liqPrice.force_price;
      }
      return "0";
    },
    liqSellPrice () {
      const lever = this.userLeverTime == 0 ? this.pairInfo.max_leverage : this.userLeverTime;
      const price = this.price || "0";
      const amount = this.amount;

      if (price && amount) {
        let liqPrice = calculator.getLiqPriceInfo(
          {
            direction: "less",
            mode: this.userLeverTime == 0 ? "cross" : "fixed",
            lever,
            amount,
            open_price: price
          },
          this.balance,
          this.pairInfo
        );
        return liqPrice.force_price;
      }
      return "0";
    },
    /**
     * 最新持仓数量
     */
    currentHodingAmount () {
      if (!isEmpty(this.currentHolding)) {
        return this.$big(this.currentHolding.holding || "0")
          .plus(
            this.$big(this.amount || "0").mul(
              this.exchangeDir === "BUY" ? 1 : -1
            )
          )
          .toString();
      }
      return this.$big(this.amount || "0")
        .mul(
          this.$big(this.exchangeDir === "BUY" ? 1 : -1).mul(
            this.exchangeDir === "BUY" ? 1 : -1
          )
        )
        .toString();
    },
    lastSideSell () {      if (
        this.price && this.state.ct && this.state.ct.bid) {
        if (this.state.ct.lastSide === 2) return true
      }
      return false;
    },
    lastSideBuy () {      if (
        this.price && this.state.ct && this.state.ct.bid) {
        if (this.state.ct.lastSide === 1) return true
      }
      return false;
    },
    sellOverflow () {
      if (this.price && this.state.ct && this.state.ct.bid) {
        if (this.$big(this.price).lte(this.state.ct.bid)) {
          return true;
        }
      }
      return false;
    },
    buyOverflow () {
      if (this.price && this.state.ct && this.state.ct.ask) {
        if (this.$big(this.price).gte(this.state.ct.ask)) {
          return true;
        }
      }
      return false;
    },
    isExtMarketOrderType () {
      return (
        +this.currentDealType === 4 ||
        +this.currentDealType === 6
      );
    },
    isExtOrderType () {
      return (
        this.isExtMarketOrderType ||
        +this.currentDealType === 3 ||
        +this.currentDealType === 5
      );
    },
    isMarketOrderType () {
      return (
        this.currentDealType === 2 ||
        this.currentDealType === 4 ||
        this.currentDealType === 6
      );
    },
    isTestnet () {
      return location.hostname.indexOf("ixex.pro") >= 0;
    },
    stopWinRealized () {
      let result = this.$big(0);
      let side = this.exchangeDir === "BUY" ? 1 : 2;
      let amount = this.amount || 0;
      let price = this.price || 0;
      let swprice = this.modalStopWinPrice || 0;

      if (side === 1) {
        if (this.$big(swprice).lt(price)) return this.$big(0);
      } else {
        if (this.$big(swprice).gt(price)) return this.$big(0);
      }

      if (this.state.ct.pair === "FUTURE_BTCUSD") {
        if (price > 0 && swprice > 0 && side == 1) {
          result = this.$big(amount)
            .div(price)
            .minus(this.$big(amount).div(swprice));
        } else if (price > 0 && swprice > 0 && side == 2) {
          result = this.$big(amount)
            .div(swprice)
            .minus(this.$big(amount).div(price));
        }
      } else {
        if (this.state.ct.pairInfo) {
          let mul = this.state.ct.pairInfo.multiplier;
          if (side == 1) {
            result = this.$big(swprice || 0)
              .minus(price)
              .times(mul)
              .times(this.$big(amount).abs());
          } else if (side == 2) {
            result = this.$big(price)
              .minus(swprice || 0)
              .times(mul)
              .times(this.$big(amount).abs());
          }
        }
      }
      return result;
    },
    stopLossRealized () {
      let result = this.$big(0);
      let side = this.exchangeDir === "BUY" ? 1 : 2;
      let amount = this.amount || 0;
      let price = this.price || 0;
      let slprice = this.modalStoplossPrice || 0;
      let liqBuyPrice = this.liqBuyPrice == "--" ? 0 : this.liqBuyPrice;
      let liqSellPrice = this.liqSellPrice == "--" ? 0 : this.liqSellPrice;
      if (side === 1) {
        if (
          this.$big(slprice).gt(price) ||
          this.$big(slprice).lt(liqBuyPrice || 0)
        )
          return this.$big(0);
      } else {
        if (
          this.$big(slprice).lt(price) ||
          this.$big(slprice).gt(liqSellPrice || 0)
        )
          return this.$big(0);
      }

      if (this.state.ct.pair === "FUTURE_BTCUSD") {
        if (price > 0 && slprice > 0 && side === 1) {
          result = this.$big(amount)
            .div(price)
            .minus(this.$big(amount).div(slprice));
        } else if (price > 0 && slprice > 0 && side === 2) {
          result = this.$big(amount)
            .div(slprice)
            .minus(this.$big(amount).div(price));
        }
      } else {
        if (this.state.ct.pairInfo) {
          let mul = this.state.ct.pairInfo.multiplier;
          if (side === 1) {
            result = this.$big(slprice || 0)
              .minus(price)
              .times(mul)
              .times(this.$big(amount).abs());
          } else if (side === 2) {
            result = this.$big(price)
              .minus(slprice || 0)
              .times(mul)
              .times(this.$big(amount).abs());
          }
        }
      }

      if (this.$big(result).gt(0)) result = this.$big(0);
      return result;
    },
    allowStopWinLoss () {
      return (
        (this.currentDealType === 2 ||
          this.currentDealType === 1) &&
        this.currentHolding.holding == 0
      );
    },
    allowSubmit () {
      let side = this.exchangeDir === "BUY" ? 1 : 2;
      let price = this.price || 0;
      let slprice = this.modalStoplossPrice || 0;
      let swprice = this.modalStopWinPrice || 0;
      let markPrice = this.markPrice;
      let indexPrice = this.indexPrice;
      let lastPrice = this.lastPrice
      let stopWinType = this.modalStopWinType;
      let stoplossType = this.modalStoplossType;
      let liqPrice = this.exchangeDir === 'BUY' ? this.liqBuyPrice : this.liqSellPrice
      // 做多时，止盈触发价格不能低于委托价格，止损价格不能高于委托价格，不能低于爆仓价格
      // 做空时，止盈触发价格不能高于委托价格，止损价格不能低于委托价格，不能高于爆仓价格
      if (this.modalStopWinState) {
        if (side === 1) {
          if (stopWinType === 1 && this.$big(swprice).lt(price)) {
            return false;
          }
          else if (stopWinType === 2 && (this.$big(swprice).lt(price) || this.$big(swprice).lt(lastPrice) || this.$big(swprice).lt(markPrice))) {
            return false;
          }
          else if (stopWinType === 3 && (this.$big(swprice).lt(price) || this.$big(swprice).lt(lastPrice) || this.$big(swprice).lt(indexPrice))) {
            return false;
          }
        } else {
          if (stopWinType === 1 && this.$big(swprice).gt(price)) {
            return false;
          }
          else if (stopWinType === 2 && (this.$big(swprice).gt(price) || this.$big(swprice).gt(lastPrice) || this.$big(swprice).gt(markPrice))) {
            return false;
          }
          else if (stopWinType === 3 && (this.$big(swprice).gt(price) || this.$big(swprice).gt(lastPrice) || this.$big(swprice).gt(indexPrice))) {
            return false;
          }
        }
      }

      if (this.modalStoplossState) {
        if (side === 1) {
          if (this.$big(slprice).gt(price) ||
            this.$big(slprice).gt(lastPrice) ||
            this.$big(slprice).lt(liqPrice || 0)) {
            return false;
          } else if (stoplossType === 2 && this.$big(slprice).gt(markPrice)) {
            return false;
          } else if (stoplossType === 3 && this.$big(slprice).gt(indexPrice)) {
            return false;
          }
        } else {
          if (this.$big(slprice).lt(price) ||
            this.$big(slprice).lt(lastPrice) ||
            this.$big(slprice).gt(liqPrice || 0)) {
            return false;
          } else if (stoplossType === 2 && this.$big(slprice).lt(markPrice)) {
            return false;
          } else if (stoplossType === 3 && this.$big(slprice).lt(indexPrice)) {
            return false;
          }
        }
      }
      return true;
    }
  },
  methods: { 
    onSliderDragEnd (value, dir) {
      value = value / 100.0  
      this.handleProportion(value) 
    },
    handleActiveTypeClick(key) {
      this.currentDealType = key
    },
    login (arg) {
      if (arg === 'login') { 
        this.$router.push({name: 'login'})
      } else if (arg === 'register') { 
        this.$router.push({name: 'register'})
      }
    },
    handleProportion (num) {
      let amount = 0
      let quantity = 0
      amount = this.$big((this.currentHolding || {}).available_balance).
        div(this.$big(1).div(+this.activeLever === 0 ? this.pairInfo.max_leverage : this.activeLever).times(this.$big(1).plus(this.pairInfo.im)).plus(this.$big(this.pairInfo.take_rate).times(2)))
      quantity = amount.div(this.$big(this.pairInfo.multiplier).times(this.price || this.lastPrice)).times(num).round(0, 0)
      this.amount = quantity 
    }, 
    tologin () {
      utils.setStorageValue("LoginBack", "/future");
      actions.setLoginBack("/future");
      this.$router.push({
        name: "login"
      });
    },
    decimal (val) {
      if (val.indexOf(".") !== -1) {
        let value = val.substr(0, val.length - 1);
        if (val.charAt(val.length - 1) > 4) {
          value = value + 5;
        } else {
          value = value + 0;
        }
        this.price = value;
      }
    },
    // 处理滑块数据
    dealSliderTime (inputValue) {
      let keys = Object.keys(this.timersMap);
      let len = keys.length;
      let sliderValue = inputValue;

      for (let i = 0; i < len; i++) {
        let key = keys[i];
        if (Number(key) >= Number(inputValue)) {
          sliderValue = key;
          return sliderValue;
        }
      }
    },
    async mmChangeConfirm (item) {
      if (this.maxTimes && this.$big(item).gt(this.maxTimes)) {
        // 纠正输入
        utils.alert(`最大${this.maxTimes}倍杠杆`);
        item = this.maxTimes;
      }

      if (+this.currentHolding.holding !== 0 || this.currentDel.length > 0) {
        let params = {
          currency: this.pairInfo.symbol,
          leverage: item
        };
        let pRes = await service.previewContractlever(params);
        let pData = null;
        if (!pRes.code) {
          pData = Object.create(pRes.data);
          pData.margin_position = this.$big(pData.margin_position || 0)
            .round(this.pairInfo.value_scale || 4)
            .toString();
          pData.margin_delegation = this.$big(pData.margin_delegation || 0)
            .round(this.pairInfo.value_scale || 4)
            .toString();
        } else {
          return utils.alert(pRes.message);
        }
        this.confirm_txt = this.$t("contract_confirm_txt", {
          y: item == 0 ? this.maxTimes : item,
          m: pData.margin_position,
          n: pData.margin_delegation
        });
        this.selectedTime = item;
        if (this.getCookie("NeverShowDialog") == "0") {
          this.mmModalLeverChange();
        } else {
          this.showDialogModel = true;
        }
      } else {
        this._setLeverage(item);
        let params = {
          currency: this.pairInfo.symbol,
          leverage: item
        };
        let res = await service.setContractlever(params);
        if (!res.code) {
          // 重新拉下持仓数据
          this.getBalance();
          this.$eh.$emit("protrade:order:refresh");
        } else {
          utils.alert(res.message);
        }
      }
    },
    async mmModalLeverChange () {
      if (this.neverShowOneDay === true) {
        this.setCookie("NeverShowDialog", 0, 1);
        this.neverShowOneDay = false;
      }

      if (+this.currentHolding.holding !== 0 || this.currentDel.length > 0) {
        const item = this.selectedTime;
        // 确定
        let params = {
          currency: this.pairInfo.symbol,
          leverage: item
        };
        let res = await service.setContractlever(params);
        if (!res.code) {
          this._setLeverage(item);
          // 重新拉下持仓数据
          this.getBalance();
          this.$eh.$emit("protrade:order:refresh");
        } else {
          utils.alert(res.message);
        }
      } else {
        this._setLeverage(item);
        let params = {
          currency: this.pairInfo.symbol,
          leverage: item
        };
        let res = await service.setContractlever(params);
        if (!res.code) {
          // 重新拉下持仓数据
          this.getBalance();
          this.$eh.$emit("protrade:order:refresh");
        } else {
          utils.alert(res.message);
        }
      }
    },
    setCookie (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    /**
     * 设置杠杆变量
     */
    _setLeverage (value) {
      this.mmModal.inputLeverTime = value;
      this.mmModal.sliderLeverTime = value;
      local.times = value;
      this.holdingLever.inputLeverTime = value;
      this.holdingLever.sliderLeverTime = value;
      this.userLeverTime = value;
    },
    changeHoldingLeverTimes (item) {
      return this.mmChangeConfirm(item);
    },
    // 单机编辑
    editOuterTimes () {
      this.holdingLever.inputLeverTime = local.times;
      this.holdingLever.editing = true;
    },
    // 设置风险限额
    setRiskLimit () {
      this.riskModal.currentValue = this.riskModal.newValue;
      local.riskLimit = this.riskModal.newValue;
      const params = {
        risk_limit: this.riskModal.currentValue,
        symbol: this.pairInfo.name
      };
      service
        .setRiskLimit(params)
        .then(res => {
          utils.success("修改成功");
          // 根据风险限额调整最大杠杆值
          this.RiskLimitDict.forEach(item => {
            // 选中值有可能是数字或者字符串.所以先用==
            if (item.r == this.riskModal.currentValue) {
              this.maxTimes = item.m;
              // 更新当前设置的倍数
              this.mmModal.inputLeverTime = item.m;
              this.mmModal.sliderLeverTime = this.dealSliderTime(item.m);
              this.holdingLever.inputLeverTime = item.m;
              this.holdingLever.sliderLeverTime = this.dealSliderTime(item.m);
              local.times = item.m;
            }
          });
        })
        .catch(e => {
          utils.alert(e.message || "error");
        })
        .finally(() => {
          this.showRiskModal = false;
        });
    },
    // 买入modal,买入按钮
    async confrimBuyTimes () {
      // if (this.allowSubmit() == false) return;

      // 杠杆值存到ls
      local.times = this.mmModal.inputLeverTime;
      local.mmNeverShow = this.mmModal.neverShow;
      const side = this.exchangeDir;
      const $$price = this.getValues("price");
      const $price = this.$big($$price || 0);
      const $amount = this.$big(this.getValues("amount", side) || 0);

      //yzf 2019/3/7
      // type: 3 限价止损 4 市价止损 5 限价止赢 6 市价止盈
      //止盈止损操作，当系统会自动产生委托时，弹出确认提示
      const type = this._getOrderType();
      let showWarn = false;
      let lprice = {
        1: this.lastPrice * 1, //盘口价格
        2: this.markPrice * 1, //标记价格
        3: this.indexPrice * 1 //指数价格
      }[this.currentTriggerType];

      if ([3, 4, 5, 6].indexOf(type) >= 0) {
        if (side === "BUY") {
          //买入止损，盘口价格大于等于触发价格，系统自动生产委托订单
          if ((type === 3 || type === 4) && lprice >= this.trigger_price) {
            showWarn = true;
          }
          //买入止盈，盘口价格低于等于触发价格，系统自动生成订单委托
          if ((type === 5 || type === 6) && lprice <= this.trigger_price) {
            showWarn = true;
          }
        } else if (side === "SELL") {
          //卖出止损，盘口价格低于等于触发价格，系统自动生产订单委托
          if ((type === 3 || type === 4) && lprice <= this.trigger_price) {
            showWarn = true;
          }
          //卖出止盈，盘口价格大于等于触发价格，系统自动生成订单委托
          if ((type === 5 || type === 6) && lprice >= this.trigger_price) {
            showWarn = true;
          }
        }
        if (showWarn) {
          let confirmbtn =
            type > 4 ? this.$t("stop_win_apply") : this.$t("stop_loss_apply");
          const hold = this.currentHolding.holding;
          const willhold =
            side === "BUY"
              ? this.currentHolding.holding * 1 + $amount * 1
              : this.currentHolding.holding * 1 - $amount * 1;
          const content = `${this.$t("stop_win_loss_warn_content", {
            hold: this.currentHolding.holding,
            willhold
          })}`;
          //${this.$t('warn_confirm_text')}
          const ok = await utils.confirm(this, {
            customClass: "ix-message-box-wrapper",
            confirmBtnText: confirmbtn,
            confirmButtonClass: "btn--confirm",
            cancelButtonClass: "btn--cancel",
            title: this.$t("stop_win_loss_warn_title"),
            content
          });
          if (!ok) {
            return;
          }
        }
      }

      this.showMakeMoreModal = false;
      const order = {
        type: this._getOrderType(),
        side: side === "SELL" ? 2 : 1,
        price: $price.toString(),
        amount: $amount.toString(),
        symbol: this.pairInfo.name,
        leverage: this.userLeverTime
        // mode: this.userLeverTime === 0 ? 'cross' : 'fixed'
      };
      this.doSubmit(order);
    }, 
    /**
     * 1 限价 2市价 3 限价止损 4 市价止损 5 限价止赢 6 市价止盈
     */
    _getOrderType () {
      if (this.isExtOrderType) {
        let idx = this.orderTypeExt.findIndex(
          item => item === this.currentDealType
        );
        if (idx > -1) {
          return idx + 3;
        }
      }
      return this.currentDealType
    },
    changeRiskLimit (item) {
      this.riskModal.newValue = item;
    },
    editRiskLimit () {
      this.showRiskModal = true;
    },
    setTime (time) {
      this.state.ct.times = local.times = time;
      this.$emit("timesChanged", time);
    },
    setOpenMode (mode) {
      // this.currentOpenMode = mode
      this.currentDealType = mode;
      this.$emit("modeChanged", mode);
    },
    transfer () {
      if (!this.isLogin) {
        location.href = "/user/login/";
        return;
      }
      if (this.state.isSimulation) {
        utils.alert(this.$t("contract_simulation_exchange_limit"));
      } else {
        this.showModal = true;
      }
    },
    setInputStatus (input, status) {
      clearTimeout(this.input[input].timer);
      this.input[input].status = status;
      this.input[input].timer = setTimeout(() => {
        this.input[input].status = "";
      }, 2000);
    },
    async submit (type) {
      if (!this.isLogin) {
        location.href = "/user/login/";
        return;
      }
      if (window.localStorage.contract === "true") {
        window.location.reload();
        return;
      }
      if (!this.balance.available_balance) { 
        return false;
      }
      if (this.submitting) { 
        return false;
      }

      //更新用户session
      actions.updateSession();

      const side = type === "make_more" ? "BUY" : "SELL";
      //置灰的时候禁用事件
      if (side === "BUY" && this.buyEnabled == false) {
        console.log("No buying");
        return false;
      } else if (side === "SELL" && this.sellEnabled == false) {
        console.log("No sale");
        return false;
      }

      this.exchangeDir = side;
      const $$price = this.getValues("price");
      let $price = this.$big($$price || 0);
      const $amount = this.$big(this.getValues("amount", side) || 0);
      const $bid = this.$big(this.state.ct.bid || 0);
      const $ask = this.$big(this.state.ct.ask || 0);

      //1 限价 2市价 3 限价止损 4 市价止损 5 限价止赢 6 市价止盈
      if (this._getOrderType() === 2) {
        //市价买入时，取卖一价
        if (side === "BUY") {
          $price = $ask;
        }
        //市价卖出时，取买一价
        else if (side === "SELL") {
          $price = $bid;
        }
      }

      // 提交订单时要做成本对冲，必须区分买和卖
      let $value = 0;
      //在不做对冲的情况下做判断，低于订单成本最小值时返回错误
      // $amount = $amount + this.buyDelAmount + this.sellDelAmount
      $value = this.getMargin($amount, $price, side).cost;
      // $value = this.$big(this.costValue === "--" ? "0" : this.costValue);
      if ($value.lt(this.pairInfo.min_total)) {
        return utils.alert(
          this.$i18n.t("value_low", {
            num: this.pairInfo.min_total + " " + this.pairInfo.product_name
          })
        );
      }
      //根据买/卖情况，获取对冲后的订单成本
      if (side === "BUY") {
        $value = this.costValueBuyNew;
      } else if (side === "SELL") {
        $value = this.costValueSellNew;
      }

      if (!$price.gt(0)) {
        utils.alert("price");
        return this.setInputStatus("price", "error");
      }
      if (!$amount.gt(0)) {
        utils.alert("amount");
        return this.setInputStatus("amount", "error");
      }

      $value = this.$big($value);
      if ($value.gt(this.balance.available_balance)) {
        if (true) {
          return this.$toast({
            title: this.$t("order_apply_failed"),
            body: this.$t("order_apply_message_a"),
            color: "red"
          });
        } else {
          return utils.alert(this.$i18n.t("amount_over")); //余额不足
        }
      }
      if ($amount.lt(this.pairInfo.min_amount)) {
        return utils.alert(
          this.$i18n.t("amount_low", {
            num: this.pairInfo.min_amount + " " + this.pairInfo.currency_name
          })
        );
      }
      if ($amount.gt(this.pairInfo.max_amount)) {
        return utils.alert(
          this.$i18n.t("amount_high", {
            num: this.pairInfo.max_amount + " " + this.pairInfo.currency_name
          })
        );
      }
      if ($value.gt(this.pairInfo.max_total)) {
        return utils.alert(
          this.$i18n.t("value_high", {
            num: this.pairInfo.max_total + " " + this.pairInfo.product_name
          })
        );
      }
      // if (side === "BUY" && $ask.gt(0) && $price.div(1.3).gt($ask)) {
      //   if (true) {
      //     let toastText = {
      //       title: this.$t("order_apply_failed"),
      //       body: this.$t("order_apply_message_b"),
      //       color: "red"
      //     };
      //     this.$toast(toastText);
      //   } else {
      //     return utils.alert(this.$i18n.t("price_high", { per: 30 }));
      //   }
      // }
      // if (side === "SELL" && $bid.gt(0) && $price.div(0.7).lt($bid)) {
      //   return utils.alert(this.$i18n.t("price_low", { per: 30 }));
      // }
      if (side === "BUY" && $ask.gt(0) && $price.div(1.05).gt($ask)) {
        const ok = await utils.confirm(this, {
          trade: true,
          content: this.$i18n.t("price_little_high", { per: 5 }),
          title: this.$i18n.t("confirm_your_order")
        });
        if (!ok) {
          return false;
        }
      } else if (side === "SELL" && $bid.gt(0) && $price.div(0.95).lt($bid)) {
        const ok = await utils.confirm(this, {
          trade: true,
          content: this.$i18n.t("price_little_low", { per: 5 }),
          title: this.$i18n.t("confirm_your_order")
        });
        if (!ok) {
          return false;
        }
      }
      if (
        local.passiveDelegate &&
        side === "BUY" &&
        this.buyOverflow &&
        !this.isExtOrderType &&
        this.currentDealType === 1
      ) {
        return utils.alert(this.$i18n.t("contract_passive_cancel"));
      }
      if (
        local.passiveDelegate &&
        side === "SELL" &&
        this.sellOverflow &&
        !this.isExtOrderType &&
        this.currentDealType === 1
      ) {
        return utils.alert(this.$i18n.t("contract_passive_cancel"));
      }
      this.submitting = side;
      // 做多
      if (type === "make_more") {
        this.mmModal.label = this.$t("order_side_buy");
        this.btnLongLoading = true;
      } else {
        // 做空
        this.mmModal.label = this.$t("order_side_sell");
        this.btnShortLoading = true;
      }
      // 先打开弹窗
      if (!local.mmNeverShow) {
        this.showMakeMoreModal = true;
        return;
      }
      const order = {
        type: this._getOrderType(),
        side: side === "SELL" ? 2 : 1,
        price: $price.toString(),
        amount: $amount.toString(),
        symbol: this.pairInfo.name,
        leverage: this.userLeverTime
        // mode: this.userLeverTime === 0 ? 'cross' : 'fixed'
      };
      this.doSubmit(order);

      // service.orderContract(order)
      /*
      const res = await service.createOrder(order)
      this.submitting = false
      if (!res.code) {
        return utils.alert(res.message)
      } else {
        this.$eh.$emit('protrade:order:refresh')
        this.$eh.$emit('protrade:balance:refresh')
      }
      */
      // alert(this.currentOpenMode)
    },
    async doSubmit (order) {
      order.passive = local.passiveDelegate ? 1 : 0;
      order.trigger_price = this.trigger_price;
      if (this.isExtOrderType) {
        order.trigger_close = this.closeAfterTrigger;
        order.trigger_type = this.currentTriggerType;
      }

      //快速止盈
      if (this.modalStopWinState === true) {
        order.tp_type = this.modalStopWinType;
        order.tp_price = this.modalStopWinPrice;
      }
      //快速止损
      if (this.modalStoplossState === true) {
        order.sl_type = this.modalStoplossType;
        order.sl_price = this.modalStoplossPrice;
      }

      //1 限价 2市价 3 限价止损 4 市价止损 5 限价止赢 6 市价止盈
      let res = await service.orderContract(order);
      if (!res.code) {
        this._resetLoadingState();
        // 通知所有组件，有数据更新，需要强制刷新数据
        this.$eh.$emit("protrade:order:refresh", "doSubmit");
        this.getBalance()
        let side = "";
        let data = res.data;
        res.data.side === 1
          ? (side = this.$t("order_side_buy"))
          : (side = this.$t("order_side_sell"));
        if (this.userSetting.submission) {
          let content = this.$t("order_apply_message_c", {
            price: data.price,
            side,
            amount: data.amount,
            currency: data.symbol.replace("FUTURE_", "").replace("USD", "")
          });
          if (order.type > 2) {
            content = `<p>${content}</p><p>${this.$t(
              "contract_trigger_price"
            )}:${order.trigger_price}</p>`;
          }
          let toastText = {
            title: this.$t("message_setting_content_02"),
            body: content,
            // body:this.$t('order_apply_message_c', {price: data.price, side, amount: data.amount, currency: data.symbol.replace('FUTURE_','').replace('USD','')  }),
            color: "yellow"
          };
          this.$toast(toastText);
        }
        //  ---------------
      } else {
        // utils.alert(res.message);
        this.$toast({
          title: this.$t("order_apply_failed"),
          body: res.message,
          color: "red"
        });
        this._resetLoadingState();
      }
    },
    _resetLoadingState () {
      this.btnLongLoading = false;
      this.btnShortLoading = false;
      this.submitting = false;

      (this.modalStopWinState = false), (this.modalStopWinType = 1); // 1 市价， 2 标记价格， 3 指数价格
      this.modalStopWinPrice = 0;
      this.modalStoplossState = false;
      this.modalStoplossType = 1;
      this.modalStoplossPrice = 0;
    },
    setDealType (type) {
      this.currentDealType = type;
      // 选择市价时禁止修改价格，隐藏被动委托选项
      if (type === 2) {
        // 锁定价格
        this.price = this.lastPrice;
      }

      this.setButtonState(type);
    },
    //更新买入卖出按钮的状态
    setButtonState (type) {
      if (!this.amount || this.amount == "0") {
        [this.buyEnabled, this.sellEnabled] = [false, false];
      } else if (type === 2 || type === 1) {
        [this.buyEnabled, this.sellEnabled] = [true, true];
      } else {
        const orderType = this._getOrderType();

        let lprice = {
          1: this.lastPrice * 1, //盘口价格
          2: this.markPrice * 1, //标记价格
          3: this.indexPrice * 1 //指数价格
        }[this.currentTriggerType];

        const tprice = this.trigger_price;
        //限价止损  市价止损
        if (orderType === 3 || orderType === 4) {
          //当盘口价格等于触发价格，不可买入或者卖出
          if (tprice == lprice) {
            [this.buyEnabled, this.sellEnabled] = [false, false];
          }
          //当触发价格高于盘口价格时，可以买入止损
          else if (tprice > lprice) {
            [this.buyEnabled, this.sellEnabled] = [true, false];
          }
          //当触发价格低于盘口价格时，可以卖出止损
          else if (tprice < lprice) {
            [this.buyEnabled, this.sellEnabled] = [false, true];
          }
        }
        //限价止盈  市价止盈
        else if (orderType === 5 || orderType === 6) {
          //当盘口价格等于触发价格，不可买入或者卖出
          if (tprice == lprice) {
            [this.buyEnabled, this.sellEnabled] = [false, false];
          }
          //当触发价格高于盘口价格时，可以买入止损
          else if (tprice > lprice) {
            [this.buyEnabled, this.sellEnabled] = [false, true];
          }
          //当触发价格低于盘口价格时，可以卖出止损
          else if (tprice < lprice) {
            [this.buyEnabled, this.sellEnabled] = [true, false];
          }
        }
      }
    },
    getValues (field, type) {
      return this[field];
    },
    setValues (field, type, value) {
      this[field] = value;
    },
    set ({ price, amount, dontOveride, side }) {
      if (price) {
        if (!dontOveride || (dontOveride && !this.getValues("price", side))) {
          this.setValues("price", "BUY", this.$big(price).toString());
          this.setValues("trigger_price", "BUY", this.$big(price).toString());
          // this.setValues('price', 'SELL', this.$big(price).toString())
        }
      }
      if (amount) {
        if (!dontOveride || (dontOveride && !this.getValues("amount", side))) {
          this.setValues("amount", "BUY", this.$big(amount).toString());
          // this.setValues('amount', 'SELL', this.$big(amount).toString())
        }
      }
    },
    getBalance () {
      if (!this.pairInfo.product_name) {
        return;
      }
      if (!this.isLogin) {
        return;
      }
      //   return service
      //     .getContractBalanceByPair({
      //       symbol: this.pairInfo.product_name
      //     })
      //     .then(res => {
      //       if (!res.code && !!res.data) {
      //         this.state.ct.holding = res.data;
      //         if (
      //           res.data &&
      //           res.data.leverage != null &&
      //           res.data.leverage != undefined
      //         ) {
      //           this._setLeverage(res.data.leverage);
      //         }
      //       }
      //     });

      return service.getContractBalanceList()
        .then(res => {
          if (!res.code && !!res.data) {
            state.ct.holdingList = res.data
            let holdingList = res.data
            holdingList.map(item => {
              if (item.currency === this.pairInfo.currency) {
                if (
                  item.leverage != null &&
                  item.leverage != undefined
                ) {
                  this._setLeverage(item.leverage)
                }
              }
            })
          }
        })
    },
    // getBalanceList() {
    //   if (!this.isLogin) {
    //     return;
    //   }
    //   service.getContractBalanceList()
    //   .then(res => {

    //   })
    // },
    async fetchData () {
      await this.getBalance();
      if (!isEmpty(this.balance)) {
        const $value = this.$big(this.currentHolding.value || 0);
        if ($value.gte(this.RiskLimitDict[this.RiskLimitDict.length - 1].r)) {
          this.riskModal.currentValue = String(
            this.RiskLimitDict[this.RiskLimitDict.length - 1].r
          );
          this.maxTimes = this.RiskLimitDict[this.RiskLimitDict.length - 1].m;
        } else if ($value.eq("0")) {
          this.riskModal.currentValue = !!this.state.ct.pairInfo
            ? this.state.ct.pairInfo.base_risk
            : "200"; //默认先写成btc_usd的参数
          this.maxTimes = !!this.state.ct.pairInfo
            ? this.state.ct.pairInfo.max_leverage
            : 100;
          // if (this.state.ct.pair==='FUTURE_BTCUSD') {
          //   this.riskModal.currentValue = "200";
          //   this.maxTimes = 100;
          // }
          // else { // if (pair==='FUTURE_VDSUSD')
          //   this.riskModal.currentValue = "50";
          //   this.maxTimes = 20;
          // }
        } else {
          for (let i = 0; i < this.RiskLimitDict.length; i++) {
            let limit = this.RiskLimitDict[i];
            if (this.$big(this.currentHolding.value).lte(limit.r)) {
              this.riskModal.currentValue = String(limit.r);
              this.maxTimes = limit.m;
              break;
            }
          }
        }
      }
      // this.getRiskLimit()
    },
    // 关闭浮层
    confirmModalClosed () {
      this._resetLoadingState();
    },
    jumpBalance () {
      this.$router.push({
        name: "contractIndex",
        params: {
          currency: this.pairInfo.product_name
        }
      });
    },
    getOrderValue (amount, side) {
      if (amount && !isEmpty(this.pairInfo)) {
        let pairInfo = this.pairInfo;
        let price = this.price;
        if (this.currentDealType === 2) {
          price = this.lastPrice;
        }
        if (!price) {
          return "--";
        }
        if (this.currentDealType === 2 && side === "SELL") {
          const $bid = this.$big(this.state.ct.bid || 0);
          if ($bid.eq(0)) {
            return "--";
          }
          if (pairInfo.currency === "BTCUSD") {
            return this.$big(amount)
              .div($bid)
              .toString();
          } else {
            return this.$big(pairInfo.multiplier)
              .times($bid)
              .times(amount)
              .toString();
          }
        } else if (this.currentDealType === 2 && side === "BUY") {
          const $ask = this.$big(this.state.ct.ask || 0);
          if ($ask.eq(0)) {
            return "--";
          }
          if (pairInfo.currency === "BTCUSD") {
            return this.$big(amount)
              .div($ask)
              .toString();
          } else {
            return this.$big(pairInfo.multiplier)
              .times($ask)
              .times(amount)
              .toString();
          }
        } else {
          if (pairInfo.currency === "BTCUSD") {
            return this.$big(amount)
              .div(price)
              .toString();
          } else {
            return this.$big(pairInfo.multiplier)
              .times(price)
              .times(amount)
              .toString();
          }
        }
      }
      return "--";
    },
    getCurrentPrice (side) {
      let price = this.price;
      if (this.currentDealType === 2 && side === "SELL") {
        const $bid = this.$big(this.state.ct.bid || 0);
        if ($bid.eq(0)) {
          return "--";
        }
        return this.$big($bid).toString();
      } else if (this.currentDealType === 2 && side === "BUY") {
        const $ask = this.$big(this.state.ct.ask || 0);
        if ($ask.eq(0)) {
          return "--";
        }
        return this.$big($ask).toString();
      } else {
        return this.$big(price || 0).toString();
      }
    },
    getMargin (amount, price, side) {
      if (
        price &&
        amount &&
        !isEmpty(this.pairInfo) &&
        typeof this.pairInfo.fee_rate !== "undefined"
      ) {
        //杠杆
        let lever =
          this.userLeverTime == 0 ? this.maxTimes : this.userLeverTime; // local.userLeverTime
        // // 限额
        // let im = this.$big(this.riskModalInitPercent).div(100); // local.riskLimit
        let pairInfo = this.state.ct.pairInfo;
        let im = pairInfo.im;
        let mm = pairInfo.mm;
        let mul = pairInfo.multiplier;
        let takeRate = pairInfo.take_rate;

        //this.state.ct.currentDel  当前委托
        //this.holding  持仓
        let userInput = {
          amount: amount || "0",
          executed: 0,
          side: side === "BUY" ? 1 : 2,
          price
        };
        let future = [...this.state.ct.currentDel, userInput];

        // let totalValue = 0
        let totalValue = calculator.getTotalValue(
          future,
          this.balance,
          pairInfo,
          mul
        );
        return calculator.getMargin(
          amount,
          price,
          lever,
          totalValue,
          im,
          mm,
          takeRate,
          pairInfo
        );
      }
      return "--";
    },
    logoutClose () {
      this.state.isLoginOverdue = false;
      utils.setSessionStorageValue("LoginStatus", 0);
      //  if(utils.getSessionStorageValue("LoginStatus") == 1){
      //     this.state.isLoginOverdue = true;
      //   }
    },
    layoutInit () {
      this.onresize();
      this.$eh.$on("app:resize", this.onresize);
    },
    onresize () {
      //调整杠杆宽度
      // let width = this.$refs.divlever.offsetWidth;
      // if (width < 300) {
      //   this.stickLen = 21;
      // } else if (width >= 300 && width < 310) {
      //   this.stickLen = 22;
      // } else if (width >= 310 && width < 320) {
      //   this.stickLen = 23;
      // } else if (width >= 320 && width < 330) {
      //   this.stickLen = 25;
      // } else if (width >= 330) {
      //   this.stickLen = 26;
      // }
      // this.profitRiskWidth = width - 10 + "px";
    }
  },
  watch: {
    // 止损止盈 * 1 限价 2市价 3 限价止损 4 市价止损 5 限价止赢 6 市价止盈
    trigger_price () {
      this.setButtonState();
    },
    "state.locale" () {
      this.timersMap[0] = this.$t("contract_all_in");
      this.language = false;
      this.$nextTick(() => {
        this.language = true;
      });
    },
    lastPrice () {
      this.setButtonState();
      if (this.currentDealType === 2) {
        // 锁定价格
        this.price = this.lastPrice;
      }
    },
    amount (v) {
      this.setButtonState(this.currentDealType);
      if (v > 99999999) {
        this.amount = 99999999;
      }
    },

    currentDealType (val) {
      if (
        val === 5 ||
        val === 6
      ) {
        this.calc = "≤";
        this.calc1 = "≥";
      } else {
        this.calc = "≥";
        this.calc1 = "≤";
      }
    },

    pair: {
      async handler (pair) {
        if (pair) {
          this.price = "";
        }
      }
    }
  },
  async created () {
    this.$eh.$on("protrade:exchange:set", this.set);
    this.$eh.$on("protrade:order:refresh", () => {
      this.fetchData();
    });
    this.$eh.$on("protrade:balance:refresh", this.fetchData);
    this.$eh.$on("protrade:layout:init", this.layoutInit);
    //this.$eh.$on("protrade:exchange:setOnePrice", this.setOnePrice)
    this.$eh.$on('protrade:balance:leverage', this._setLeverage)
    await actions.updateSession();
    if (this.isLogin) {
      this.fetchData();
    }
  },
  destroyed () {
    this.$eh.$off("protrade:order:refresh");
    this.$eh.$off("protrade:balance:refresh", this.fetchData);
    this.$eh.$off("protrade:layout:init", this.layoutInit);
    this.$eh.$off('protrade:balance:leverage')
  }
};
</script>

<style lang="scss">
.router-spa_contract > .el-popper {
  border: none;
  .el-scrollbar {
    background: #1d1d1d;
    color: #000;
    border: none;
    .el-select-dropdown__item {
      color: #d7d7d7;
      &.hover {
        background: #1d1d1d;
        color: $primary;
      }
    }
  }
  .popper__arrow {
    border-bottom-color: #1d1d1d;
    &::after {
      border-bottom-color: #1d1d1d;
    }
  }
}

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

<style lang="scss" scoped>

.dark {
  .r1-c4-r1 { 
    .option-box {
      .option-box-top {
        .lever-tab, .lever-select{
          label {
            color:#ACACAC;
          }
          /deep/ .el-button {
            background-color: $contract-bg2;
            color:#fff;
          }
        }
      }
    }
  }
  .ix-pannel-body .op-container .op-order .ul .content /deep/ .currency-input .input{
     background-color: transparent;
  }
}
.r1-c4-r1 {
  height: 457px;
  background-color: #ffffff; 
  .option-header {
    padding: 5px;
    vertical-align: middle;
    line-height: 28px;
    border-bottom: 2px solid #ccc;
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
          display: inline-block;
          width: 50%;
          padding: 0;
          margin: 0;
          // border-radius: 3px;
          border: 1px solid #dddddd;
          box-sizing: border-box;
          text-align: center;
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
    .option-box-middle {
      margin-top: 10px;
      .el-menu-item {
        height: 40px;
        line-height: 40px;
      }
      &.dark {
        .el-button {
          color: #fff;
          background-color: $contract-block-bg2;
          border-color: $primary;
        }
      }
      
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
                padding: 11px 0 13px;
                color:#3f475a;
                border-bottom:2px solid $primary; 
              }
            }
          }
        }
      }
      .ix-tab-side {
        display: grid;
        grid-template-columns: 30% 30% 40%;
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
          background-color: $primary;
          border:none;
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
    height: 28px;
    line-height: 28px;
    & > input,
    & > .transactionPrice {
      background: transparent;
      border: 1px solid #333;
      text-align: center;
      color: #7d7d7d;
      box-sizing: border-box;
      width: 70%;
      font-size: 12px;
    }
    & > .isProportion {
      background: transparent;
      border: 1px solid #333;
      text-align: right;
      color: #7d7d7d;
      box-sizing: border-box;
      width: 70%;
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

  .option-proportion {
    padding: 10px;
    .el-button-group {
      display: flex;
      .el-button {
        flex: 1;
        padding: 6px 12px;
      }
    }
    &.dark {
      .el-button-group {
        .el-button {
          color: #ACACAC;
          background-color: $--contract-pannel-header2;
          border-color: #A6A6A6;
        }
      } 
    }
  }
}

.r1-c4-r2 {
  position: relative;
  background:#ffffff;    
  height: 280px; 
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
            width:50%;  
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
.loginStatus {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(51, 51, 51, 0.7);
  background: radial-gradient(
    ellipse farthest-side at 50% 50%,
    rgba(51, 51, 51, 0.7),
    rgba(0, 0, 0, 0.7)
  );
  -webkit-box-shadow: 0px 2px 10px 5px rgba(164, 140, 66, 0.4) inset;
  box-shadow: 0px 2px 10px 5px rgba(164, 140, 66, 0.4) inset;
  z-index: 9999;

  .mask-logout {
    position: absolute;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px -175px;
    width: 350px;
    padding: 6px;
    text-align: center;
    color: #fff;
    background-color: #1e1e1e;
    .header {
      height: 60px;
      line-height: 60px;
      font-size: 1.2em;
    }
    .close-btn {
      display: none !important;
    }
  }
  .link {
    font-size: 12px;
    text-align: center;
    padding: 0 20px;
    min-width: 84px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 4px 8px;
    color: white;
    border-radius: 3px;
    line-height: 32px;
  }
}
.modal-exchange-wrapper {
  font-size: 14px;
  width: 480px;
  box-sizing: border-box;
  border-radius: 6px;
  color: #393d4d;

  .modal-title {
    font-size: 16px;
    margin-bottom: 13px;
    color: #393d4d;
    font-weight: bold;
  }
  .ex-row {
    margin-bottom: 24px;
    .relative {
      position: relative;
      .all {
        position: absolute;
        right: 11px;
        top: 8px;
        bottom: 11px;
        z-index: 11;
        cursor: pointer;
      }
    }
  }
  .ex-row__label {
    color: #999;
    margin-bottom: 13px;
    display: flex;
    justify-content: space-between;
  }
  .ex-row__value {
    width: 100%;
  }
  .flex-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.orderaction-container {
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
  &.dark {
    .r1-c4-r1,.r1-c4-r2 {
      background:$--contract-table-bg2; 
      .option-header {
        border-color: #272837;
      }
      .el-tabs {
        /deep/ .el-tabs__nav-wrap::after {
          background-color: #474747;
        }
      }
    }
  }
}
.ix-header {
  display: inline-block;
  width: 100%;
  .pull-right {
    .dropdown-sub-menu {
      background: $contract-block-active-bg;
      position: absolute;
      right: 0;
      top: 32px;
      border-radius: 4px;
      z-index: 999;
      opacity: 0;
      display: none;
      visibility: hidden;

      .dropdown-list {
        .dropdown-item {
          white-space: nowrap;
          &:hover,
          &.active {
            background: $contract-block-bg;
            color: $primary;
          }
        }
      }
    }
    &.arrow-down {
      display: inline;

      .arrow {
        width: 12px;
        height: 12px;
        font-size: 10px;
        transition: all 0.2s ease-in-out;
      }
      &:hover {
        .dropdown-sub-menu {
          opacity: 1;
          display: block;
          visibility: visible;
        }
        .arrow {
          transform: rotate(180deg);
        }
      }
    }
  }
  .risk-alert {
    line-height: 1; // 覆盖ix-header的line-height
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    .strong::before {
      width: 14px;
      height: 14px;
    }
  }
}
.flex-row-center {
  display: flex;
  align-items: center;
}

.ix-pannel-body {
  padding: 10px 12px;
  color: $--contract-action-label;
  font-size: 12px;
  height: 416px;
  box-sizing: border-box;
  .button-group {
    justify-content: space-between;
    .btn {
      background: $contract-block-active-bg;
      transition: border 0.2s ease-in-out;

      &.active {
        color: $primary;
        border: 1px solid $primary;
        background-color: #ffffff;
      }
      &.small {
        width: 70px;
      }
      &.big {
        width: 120px;
      }
    }
    .button-limit-other {
      .arrow-down-yellow {
        width: 12px;
        height: 6px;
        position: absolute;
        top: 14px;
        transition: all 0.2s ease-in-out;

        &.up {
          transform: rotateZ(180deg);
        }
      }
      .dropdown-menus {
        position: absolute;
        z-index: 9;
        top: 37px;
        right: 0;
        display: none;
        width: 145px;
        padding: 4px 0px;
        .li {
          color: $--contract-action-label;
          background: $contract-block-active-bg;
          padding: 0 11px;
          line-height: 34px;

          &:hover {
            color: $primary;
            background-color: $contract-block-bg;
          }
          &.active {
            color: $primary;
          }
        }
      }
      &:hover {
        .dropdown-menus {
          display: block;
        }
        .arrow-down-yellow {
          transform: rotateZ(180deg);
        }
      }
    }
  }
  .delegate-row {
    justify-content: space-between;
    line-height: 24px;
    .deal-type {
      .dropdown-sub-menu {
        background: $contract-block-active-bg;
        position: absolute;
        right: 0;
        top: 24px;
        border-radius: 4px;
        z-index: 999;
        opacity: 0;
        display: none;
        visibility: hidden;

        .dropdown-list {
          .dropdown-item {
            white-space: nowrap;
            line-height: 24px;

            &:hover,
            &.active {
              background: $contract-block-bg;
              color: $primary;
            }
          }
        }
      }
      &.arrow-down {
        display: inline;
        .arrow {
          width: 12px;
          height: 12px;
          font-size: 10px;
          transition: all 0.2s ease-in-out;
        }
        &:hover {
          .dropdown-sub-menu {
            opacity: 1;
            display: block;
            visibility: visible;
          }
          .arrow {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  // 操作区域
  .op-container {
    .op-order {
      .ul {
        margin: 0;
        flex: 1;
        li {
          @include clearfix();
        }
        .label {
          color: #acacac;
          float: left;
          box-sizing: border-box;
          min-height: 20px;
          line-height: 32px;
          width: 26%;
        }
        .content {
          position: relative;
          width: 70%;
          float: right;
          box-sizing: border-box;
          /deep/ .currency-input {
            .input {
              border: 1px solid #666666;
              background-color: $contract-block-bg;
            }
            .label {
              color: #d7d7d7;
            }
          }
          .estimate {
            text-align: right;
            color: #acacac;
            font-size: 12px;
          }
        }
      }
      .li-amount,
      .li-price,
      .li-worth {
        .label {
          line-height: 32px;
          color: #acacac;
          width: 16%;
        }
      }
      .li-volume {
        margin-bottom: 8px;
        @include clearfix();
      }
    }
  }

  // 按钮区域
  .op-button-group {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;

    .op-button,
    .op-balance {
      justify-content: space-between;
      align-items: center;
      font-weight: 400;
      font-size: 12px;
      &.overflow {
        border-bottom: 2px solid #fff;
      }
      .strong::before {
        background: #ffffff;
        font-size: 12px;
      }
      .pointer.strong::before {
        background: $--contract-action-label;
        color: $--contract-action-icon;
      }

      .trigger_dropdown {
        /deep/ input {
          background: transparent !important;
          color: $primary !important;
          border-color: $primary !important;
          width: 100px !important;
        }
        /deep/ .el-select__caret {
          color: $primary;
        }
      }
    }
    .op-button {
      padding: 5px 14px;
      height: 40px;
      text-align: center;
      border-radius: 4px;
      font-size: 14px;
      color: #fff;
      transition: opacity 0.2 ease-in-out;
      &.enabled:hover {
        opacity: 0.7;
        color: #292929;
      }
      &.disabled {
        opacity: 0.5;
        cursor: no-drop;
      }
    }
    .op-exchange {
      justify-content: flex-end;
      font-size: 14px;
    }
  }
  &.risk-limit-wrap {
    justify-content: space-between;
    align-items: center;
    height: 100%;
    flex: 1;
    .risk-alert {
      font-size: 14px;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      .strong::before {
        width: 14px;
        height: 14px;
      }
    }
    .risk-alert-value {
      height: 100%;
      flex: 1;
      text-align: right;
      padding: 0 20px;
      justify-content: space-around;
      font-size: 14px;
      .value {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        .strong::before {
          width: 14px;
          height: 14px;
        }
        &.split {
          border-bottom: 1px solid #666666;
        }
      }
    }
  }
}
.c-d7 {
  color: $--contract-action-label;
  .pointer.strong::before {
    background: $--contract-action-label;
    color: $--contract-action-icon;
  }
}

// 持有仓位
.hold__info {
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.profit-risk-row {
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
  width: 316px;
  height: 30px;
  color: #ffffff;
  background: linear-gradient(
    90deg,
    rgba(9, 201, 137, 1) 0%,
    rgba(242, 78, 77, 1) 100%
  );

  .response-times {
    padding-left: 10px;
    height: 100%;
    line-height: 30px;
    border-left: 2px solid #fff;
    width: 30px;
    position: relative;
  }
  .icon-money {
    position: absolute;
    left: 9px;
    top: 9px;
  }
  .icon-alert {
    position: absolute;
    right: 9px;
    top: 9px;
  }
}
.hold__risk {
  display: flex;
  justify-content: space-between;
}
.outer-slider {
  display: flex;
  .simple-slider-container {
    margin-left: -10px;
  }
}
.lever-operate {
  display: flex;
  .mr-50 {
    margin-right: 50px;
  }
  .input-num {
    width: 50px;
    height: 14px;
    box-sizing: border-box;
    padding-top: 1px;
    padding-bottom: 1px;
    border: 1px solid #3e6c96;
    background-color: transparent;
    color: #fff;
  }
  .op-wrapper {
    display: flex;
    .ops {
      display: flex;
    }
  }
  .op {
    width: 9px;
    height: 14px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
  .op_cancel {
    background-image: url("../../../assets/contract/icon-num-cancel.png");
  }
  .op_ok {
    background-image: url("../../../assets/contract/icon-num-ok.png");
  }
}

// modal-make-more
.modal-make-more {
  width: 520px;
  max-height: 720px;
  overflow-y: hidden;
  box-sizing: border-box;
  background-color: #252525; 
  .modal-title {
    font-size: 18px;
    width: 100%;
    text-align: center;
  }
  .modal__holding {
    background-color: #292929;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .stopmarket_tips {
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 18px;
    text-align: center;
    margin-top: 8px;
  }
  .more__table {
    width: 472px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-bottom: 0;
    border-right: 0;
    .table__tr {
      display: flex;
      height: 34px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      line-height: 34px;

      .col {
        text-align: center;
        border-right: 1px solid #ccc;
        flex: 1;

        &.col1 {
          width: 234px;
          flex: none;
        }
      }
    }
  }
  .more__action {
    padding: 3px 11px;
    width: 450px;
    background-color: #292929;
    .stoploss {
      margin-top: 10px;
    }
    .r1 {
      color: #fff;
      .el-checkbox.is-checked {
        /deep/ .el-checkbox__label {
          color: #fff;
        }
      }
    }
    .r2 {
      .action__table {
        font-size: 12px;
        border-bottom: 0;
        border-right: 0;
        .table__tr {
          display: flex;
          height: 40px;
          box-sizing: border-box;
          line-height: 32px;

          .col {
            text-align: left;
            flex: 1;
          }
          .col2 {
            text-align: center;
            flex: 2;
            .currency-input.trade {
              width: 188px;
              /deep/ .input {
                background-color: #292929;
                text-align: left;
              }
            }
            .trigger_dropdown {
              /deep/ input {
                background: transparent !important;
                color: #fff !important;
                border-color: #fff !important;
                width: 188px !important;
              }
              /deep/ .el-select__caret {
                color: #fff;
              }
            }
          }
          .col3 {
            text-align: center;
            flex: 3;
          }
        }
      }
    }
    .r3 {
      padding: 3px 20px;
      border: 1px solid $primary;
      font-size: 14px;
      color: $primary;
      background-color: $primary-disabled;
      border-radius: 5px;
    }
  }
  .never-show {
    font-size: 12px;
    color: #ffffff;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
  }
  .flex-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &.light {
    background-color: #ffffff; 
    border: 1px solid #252525;
    color: #252525;
    .c-fff {
      color: #252525;
    }
    .never-show { 
      color: #252525; 
    }  
    .modal__holding {
      background-color: #ffffff; 
    }
  }
}

// 风险限额modal
.risk-section {
  background-color: $primary;
  height: 76px;
  width: 424px;
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.risk__status {
  color: #333;
  border: 1px solid #ccc;
  border-right: 0;
  .row {
    background: rgba(201, 169, 108, 0.2);
    width: 424px;
    height: 39px;
    display: flex;

    &.row-2 {
      background-color: #fff;
    }
    .col {
      flex: 1;
      text-align: center;
      line-height: 39px;
      border-right: 1px solid #ccc;

      &.col-1 {
        width: 88px;
        flex: none;
      }
    }
  }
}
.f12 {
  font-size: 12px !important;
}

.c-fff {
  color: #fff;
}
.c-666 {
  color: #666 !important;
}
.c-333 {
  color: #333 !important;
}
.bold {
  font-weight: bold !important;
}
.c-primary {
  color: #22ced0 !important;
}
.icon {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  width: 12px;
  height: 12px;
}
.icon-alert {
  background-image: url("../../../assets/contract/icon-risk-alert.png");
}
.icon-money {
  background-image: url("../../../assets/contract/icon-risk-money.png");
}
.icon-edit {
  background-image: url("../../../assets/contract/icon-risk-edit.png");
}
// input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
//     -webkit-appearance: inner-spin-button !important;
//     opacity: 1 !important; //默认显示上下的小箭头
// }
.mask {
  width: 100%;
  height: 100%;
  z-index: 2;
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
</style>
