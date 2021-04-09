<template>
  <div
    class="ix-panel"
    :class="{progress: progressing}">
    <div
      class="mask"
      :class="{show: hasMask, transparent: curCtx.page > 0}">
      <v-loading/>
    </div>
    <div class="ix-header">
      <a
        class="ix-header-nav raw"
        :class="{cur: tab === 'active'}"
        @click.prevent="setTab('active')">
        {{ $t('order_active') }}
        <span v-if="activeTotal">[{{ activeTotal }}]</span>
      </a>
      <a 
        class="ix-header-nav raw"
        :class="{cur: tab === 'stop'}"
        @click.prevent="setTab('stop')">
        {{ $t('trading_page.stop_order.stop_win_loss') }}
      </a>
      <a
        class="ix-header-nav raw"
        :class="{cur: tab === 'history'}"
        @click.prevent="setTab('history')">
        {{ $t('order_history') }}
      </a> 
      <div class="header-icons">
        <!-- <span
          class="hide-others btn on"
          @click="local.hideOthers = !local.hideOthers">
          <input
            type="checkbox"
            v-model="local.hideOthers">
          {{ $t('hide_others', {pair: pair}) }}
        </span> -->
        <el-checkbox
          class="hide-others btn on"
          v-model="local.hideOthers">{{ $t('hide_others', {pair: pair}) }}</el-checkbox>
        <el-checkbox
          v-if="tab === 'history'"
          v-model="local.hideCanceled">{{ $t('trading_page.order.hide_canceled') }}</el-checkbox>
        <a
          v-if="tab === 'active'  && local.hideOthers"
          @click.prevent="cancelAll"
          class="">
          {{ $t('trading_order_cancel_all')}}
        </a>
        <a
          @click.prevent="update"
          class="header-btn btn">
          <icon name="refresh"/>
        </a>
      </div>
    </div>
    <div
      class="ix-panel-body"
      v-show="tab === 'active'"
      ref="active">
      <div
        class="inner"
        ref="activeContent">
        <table class="table table-ix-order table-active">
          <thead>
            <tr v-show="active.list.length">
               <th>{{ $t('order_th_placed') }}</th>
              <th>{{ $t('pair') }}</th>
              <th>{{ $t('order_th_type') }}</th>
              <th class="right">{{ $t('price') }}</th>
              <th style="padding-left:80px;width: 90px">{{ $t('deal_th_side') }}</th>
              <!--委托价格(USDT) -->
              <th>
                {{ $t('trading_page.order.order_price') }}
                <!-- {{ `(${state.tv.currency_name})` }} -->
              </th>
              <!--委托量（BTC） -->
              <th>{{ $t('trading_page.order.order_amount') }}
                <!-- {{ `(${state.tv.product_name})` }} -->
              </th>
              <!--成交总额（USDT） -->
              <th>{{ $t('trading_page.order.order_total') }}
                <!-- {{ `(${state.tv.currency_name})` }} -->
              </th>
              <!--已成交量（BTC）  -->
              <th>{{ $t('trading_page.order.order_executed_qty') }}
                <!-- {{ `(${state.tv.product_name})` }} -->
              </th>
              <!--剩余量（BTC）  -->
              <th>{{ $t('trading_page.order.order_surplus') }}
                <!-- {{ `(${state.tv.product_name})` }} -->
              </th>
              <!--触发价格(USDT) -->
              <!-- <th>{{ $t('trading_page.order.order_trigger_price') }} 
              </th> -->
              <th class="center">{{ $t('operation') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in active.list"
              :key="order.id">
              <td>{{ order.create_time | date }}</td>
              <td>{{ order.symbol | pairfix }}</td>
              <td>{{ getType(order.type) }}</td>
              <td class="right">
                <span v-if="order.price > 0">{{ fixPrice(order.price, order.symbol) }}</span>
                <span v-else>--</span>
              </td>
              <td
                style="color: #09C989;padding-left:80px;width: 90px"
                v-if="order.side === 'BUY'">{{ $t('order_side_buy') }}</td>
              <td
                style="color: #F24E4D;padding-left:80px;width: 90px"
                v-else>{{ $t('order_side_sell') }}</td>

              <td>{{ order.price | fixed(priceScale) }}</td>
              <td>{{ order.amount | fixed(amountScale) }}</td>
              <td>{{ $big(order.amount).times(order.price) | fixed(priceScale) }}</td>
              <td>{{ order.executed | fixed(amountScale) }}</td>
              <td>{{ $big(order.amount).minus(order.executed) | fixed(amountScale) }}</td>
              <!-- <td>
                <span v-if="order.trigger_price > 0">
                  {{ order.trigger_price | fixed(priceScale) }}
                </span>
                <span v-else>--</span>
              </td> -->
              <td class="center">
                <a @click.prevent="cancel(order)">{{ $t('transfer_cancel') }}</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="no-data"
          v-show="!active.fetching && !active.err && !active.list.length">{{ $t(empty) }}</div>
        <div
          class="err"
          v-show="!active.fetching && active.err && !active.list.length">{{ active.err }}</div>
      </div>
    </div>
    <div
      class="ix-panel-body"
      v-show="tab === 'history'"
      ref="history"
      @scroll.prevent="onScroll('history')">
      <div
        class="inner"
        ref="historyContent">
        <table class="table table-ix-order table-history">
          <thead>
            <tr v-show="history.list.length">
            <th>{{ $t('time') }}</th>
              <th>{{ $t('pair') }}</th>
              <th>{{ $t('order_th_type') }}</th>
              <th>{{ $t('deal_th_side') }}</th>
              <!--委托价格(USDT) -->
              <th>{{ $t('trading_page.order.order_price') }}
                <!-- {{ `(${state.tv.currency_name})` }} -->
              </th>
              <!--委托量（BTC） -->
              <th>{{ $t('trading_page.order.order_amount') }}
                <!-- {{ `(${state.tv.product_name})` }} -->
              </th>
              <!--成交总额（USDT） -->
              <th>{{ $t('trading_page.order.order_executed_amount') }}
                <!-- {{ `(${state.tv.currency_name})` }} -->
              </th>
              <!--成交均价(USDT) -->
              <th>{{ $t('avg_price') }}
                <!-- {{ `(${state.tv.currency_name})` }} -->
              </th>
              <!--成交量（BTC）  -->
              <th>{{ $t('trading_page.order.order_executed_qty') }}
                <!-- {{ `(${state.tv.product_name})` }} -->
              </th>
              <!--触发价格(USDT) -->
              <!-- <th>{{ $t('trading_page.order.order_trigger_price') }} 
              </th> -->
              <!--手续费(USDT) -->
              <th>{{ $t('trading_page.order.orderdeal_fee') }}
                <!-- {{ `(${state.tv.currency_name})` }} -->
              </th>
              <!-- 状态 -->
              <th>{{ $t('order_th_status') }}</th>

            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in history.list"
              :key="order.id">
              <td>{{ order.create_time | date }}</td>
              <td>{{ order.symbol | pairfix }}</td>
              <td>{{ getType(order.type) }}</td>
              <td
                style="color: #09C989"
                v-if="order.side === 'BUY'">{{ $t('order_side_buy') }}</td>
              <td
                style="color: #F24E4D"
                v-else>{{ $t('order_side_sell') }}</td>

              <!--委托价格(USDT) -->
              <td>{{ order.price | fixed(2) }}</td>
              <!--委托量（BTC） -->
              <td>{{ order.amount | fixed(amountScale) }}</td>
              <!--成交总额（USDT） -->
              <td>{{ order.total | fixed(priceScale) }}</td>
              <!--成交均价(USDT) -->
              <td>
                <span v-if="order.deal_amount > 0"><num :num="avg(order)"/></span>
                <span v-else>--</span>
              </td>
              <!--成交量（BTC）  -->
              <td>{{ order.executed | fixed(amountScale) }}</td>
              <!--触发价格(USDT) -->
              <!-- <td>
                <span v-if="order.trigger_price > 0">
                  {{ order.trigger_price | fixed(priceScale) }}
                </span>
                <span v-else>--</span>
              </td> -->
              <!--手续费(USDT) -->
              <td>{{ order.fee | fixed(priceScale) }}</td>
              <!-- 状态 -->
              <td>
                <template v-if="order.temp_trigger_type > 0 || order.type === 1 || order.state === 4">
                  {{ $t('order_sts_empty_rm') }}
                </template>
                <template v-else>{{ orderSts(order.status) }}</template>
              </td>

              <!-- <td class="right">
                <span v-if="order.deal_amount > 0"><num :num="avg(order)"/></span>
                <span v-else>--</span>
              </td>
              <td class="right">
                <span v-if="$big(order.deal_amount).lt(order.amount)">{{ fixAmount(order.deal_amount, order.symbol) }} /</span>
                <span>{{ fixAmount(order.amount, order.symbol) }}</span>
              </td>
              <td class="ccy">{{ order.symbol | p }}</td>
              <td>
                {{ orderSts(order.status) }}

              </td> -->

            </tr>
          </tbody>
        </table>
        <div
          class="no-data"
          v-show="!history.fetching && !history.err && !history.list.length">{{ $t(empty) }}</div>
        <div
          class="err"
          v-show="!history.fetching && history.err && !history.list.length">{{ history.err }}</div>
      </div>
    </div>
    <div 
      class="ix-panel-body"
      v-show="tab === 'stop'"
      ref="stop"
      @scroll.prevent="onScroll('stop')">
      <div
        class="inner"
        ref="stopContent">
        <table class="table table-ix-order">
          <thead>
            <tr v-show="stop.list.length">
              <th>{{ $t('pair') }}</th>
              <th>{{ $t('deal_th_side') }}</th>
              <th >{{ $t('amount') }}</th>
              <th>{{ $t('trading_page.stop_order.trigger_price') }}</th>
              <th>{{ $t('trading_page.stop_order.price_distance') }}</th>
              <th >{{ $t('trading_page.stop_order.order_price') }}</th>
              <th>{{ $t('trading_page.stop_order.order_th_type') }}</th>
              <th>{{ $t('trading_page.stop_order.order_th_status') }}</th>
              <th>{{ $t('trading_page.stop_order.order_th_time') }}</th>
              <th class="center">{{ $t('operation') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in stop.list"
              :key="order.id">
              <td>{{ order.symbol | pairfix }}</td>
              <td
                style="color: #09C989"
                v-if="order.side === 'BUY'">{{ $t('order_side_buy') }}</td>
              <td
                style="color: #F24E4D"
                v-else>{{ $t('order_side_sell') }}</td>
              <td>{{ fixAmount(order.amount, order.symbol) }}</td>
              <td>
                <span v-if="$big(order.trigger_price).gte(state.pro.pairTick.current)">≥</span>
                <span v-if="$big(order.trigger_price).lte(state.pro.pairTick.current)">≤</span>
                {{ order.trigger_price }}
              </td>
              <td style="width: 150px;">
                {{ state.pro.pairTick.current }}
                <span
                  :style="{color: $big(order.trigger_price).gte(state.pro.pairTick.current) ? '#09C989' : '#F24E4D' }">
                  ({{ $big(order.trigger_price).minus(state.pro.pairTick.current).toString() }})
                </span>
              </td>
              <td>{{ order.price }} </td>
              <td> {{ $t(order.type) }}</td>
              <td> {{ $t(order.status) }}</td>
              <td>{{ order.create_time | date }}</td>
              <td class="center">
                <a @click.prevent="cancel(order)">{{ $t('transfer_cancel') }}</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="no-data"
          v-show="!stop.fetching && !stop.err && !stop.list.length">{{ $t(empty) }}</div>
        <div
          class="err"
          v-show="!stop.fetching && stop.err && !stop.list.length">{{ stop.err }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import utils from '@/modules/utils'
import {local, state, actions} from '@/modules/store'
import _ from 'lodash'
// import OrderDeal from './OrderDealTarget'
import orderWatcher from '@/mixins/order-watcher'
import {pairfix} from '@/mixins/'

export default {
  name: 'Order',
  mixins: [orderWatcher, pairfix],
  components: {
    // OrderDeal
  },
  data () {
    return {
      state,
      err: '',
      tab: 'active',
      activeTotal: 0,
      local,
      active: {
        page: 1,
        fetchId: 0,
        fetching: false,
        over: false,
        latest: false,
        api: 'orderActive',
        list: []
      },
      history: {
        page: 1,
        fetchId: 0,
        fetching: false,
        over: false,
        latest: false,
        api: 'orderHistory',
        list: []
      },
      stop: {
        page: 1,
        fetchId: 0,
        fetching: false,
        over: false,
        latest: false,
        api: 'orderStop',
        list: []
      },
      progressing: false,
      loading: false
    }
  },
  computed: {
    isTestnet() { 
      return (
        location.hostname.indexOf("ixex.pro") >= 0 ||
        location.hostname.includes("localhost") ||
        location.hostname.includes("127.0.0.1")
      );
    },
    pair () {
      if (this.state.pro.pair) {
        return this.state.pro.pair.replace(/_/, '/')
      }
      return ''
    },
    curCtx () {
      return this[this.tab]
    },
    empty () {
      if (this.state.userStatus === 0) {
        return 'order_noauth'
      }
      return 'order_empty'
    },
    hasMask () {
      const ctx = this[this.tab]
      return this.loading || (ctx.fetching)
    },
    pairGroup () {
      if (this.state.pro.pairList.length) {
        return _.mapKeys(this.state.pro.pairList, pair => pair.name)
      }
      return null
    },
    priceScale () {
      return _.get(this, 'state.pro.pairInfo.price_scale', 4)
    },
    amountScale () {
      return _.get(this, 'state.pro.pairInfo.amount_scale', 4)
    }
  },
  watch: {
    tab (tab) {
      if (!this[tab].latest) {
         
        this.fetch(tab)
      }
    },
    'local.hideOthers' () {
      this.hideOthersChange()
    },
    'local.hideCanceled' () {
      this.hideOthersChange()
    },
    'active.list': {
      immediate: true,
      handler (list) {
        this.state.activeOrderCount = list.length
      }
    },
    'state.pro.pair': {
      async handler (pair) {
        if (!pair) {
          return false
        }
        this.clearAll()
        this.loading = true
         
        await this.fetch(this.tab)
        this.loading = false
      },
      immediate: true
    },
    'state.userStatus' (status, pre) {
      if (status === 0 && pre === 1) {
        this.clearAll()
      }
    }
  },
  methods: {
    sideBg (side) {
      return side.toUpperCase() === 'BUY' ? 'bgcolor-up' : 'bgcolor-down'
    },
    fixPrice (price, pairName) {
      const scale = _.get(this.pairGroup, `${pairName}.price_scale`, 8)
      return utils.toFixed(price, scale)
    },
    fixAmount (amount, pairName) {
      if (typeof amount === 'undefined') return ''
      const scale = _.get(this.pairGroup, `${pairName}.amount_scale`, 8)
      return utils.toFixed(amount, scale)
    },
    avg (order) {
      return this.fixPrice(this.$big(order.total).div(order.deal_amount), order.symbol)
    },
    orderSts (statusId) {
      const context = {
        3: 'order_sts_filled',
        4: 'order_sts_canceled',
        5: 'order_sts_partial',
        6: 'order_sts_post_rm',
        7: 'order_sts_partial2',
        8: 'order_sts_system_canceled'
      }[statusId] || 'Unknown'
      return this.$i18n.t(context)
    },
    getType (type) {
      switch (type) {
        case 'LIMIT':
          return this.$i18n.t('operate_limit')
        case 'MARKET':
          return this.$i18n.t('operate_market')
        case 'STOP':
          return this.$i18n.t('trading_page.stop_order.stop_win_loss')
        default:
          return 'Unknown'
      }
    },
    setTab (tab) {
      this.tab = tab
    },
    hideOthersChange: _.throttle(async function () {
      this.resetAll() 
      await this.fetch(this.tab)
      this.loop()
    }, 1000),
    async cancel (order) {
      if (this.progressing) {
        return false
      }
      this.progressing = true
      const res = await service.removeOrder({
        symbol: order.symbol,
        order_id: order.id
      })
      if (res.code) {
        utils.alert(res.message)
      } else {
        const find = _.findIndex(this.active.list, item => {
          return item.id === order.id && item.symbol === order.symbol
        })
        if (find > -1) {
          this.active.list.splice(find, 1)
        }
      } 
      this.update()
      this.progressing = false
      if (order.symbol.indexOf(this.state.pro.product_name) > -1 ||
        order.symbol.indexOf(this.state.pro.product_name) > -1) {
        this.$eh.$emit('protrade:balance:refresh', order.symbol)
      }
    },
    async cancelAll () {
      if (this.progressing || this.buzy) {
        return false
      }
      this.buzy = true
      const confirm = await utils.confirm(this, {
        trade: true,
        content: this.$i18n.t('cancel_all_confirm'),
        title: this.$i18n.t('confirm')
      })
      this.buzy = false
      if (!confirm) {
        return false
      }
      let res
      this.progressing = true 
      if (this.local.hideOthers) {
        const params = _.map(this.active.list, order => {
          return {
            symbol: order.symbol,
            order_id: order.id
          }
        })
        this.active.list = []
        res = await service.removeOrderList(params)
      } else {
        this.active.list = []
        res = await service.removeAllOrder()
      }
      this.progressing = false
      if (res.code) {
        return utils.alert(res.message)
      }
      this.resetAll() 
      this.update()
      this.$eh.$emit('protrade:balance:refresh')
    },
    async fetch (tab) { 
      const ctx = this[tab]
      if (this._isDestroyed) {
        return false
      } 

      await actions.updateSession()
      if (this.state.userStatus === 0) {
        return false
      }

      if (!ctx.latest) {
        ctx.latest = true
        ctx.over = false
        ctx.fetching = false
      }
      if (ctx.over || ctx.fetching) {
        return false
      }
      ctx.fetchId += 1
      ctx.fetching = true
      const pageSize = 1000
      const fetchId = ctx.fetchId
      const params = {
        size: pageSize,
        page: ctx.page
      }
      if (this.local.hideOthers) {
        params.symbol = this.state.pro.pair
      }
      const res = await service[ctx.api](params)
      await service.getPairList() // 由于 avg() 使用了 pairList，需要等待该请求完成

      if (fetchId !== ctx.fetchId || this._isDestroyed) {
        return false
      }
      ctx.fetching = false
      if (res.code) {
        ctx.err = res.message
      } else {
        let items = this.local.hideOthers
          ? res.data.items.filter(item => item.symbol === this.state.pro.pair)
          : res.data.items

        items = this.local.hideCanceled
          ? items.filter(item => item.status !== 4 && item.status !== 6)
          : items 
        if (ctx.page > 1) {
          ctx.list = ctx.list.concat(items)
        } else {
          this.$refs[tab].scrollTop = 0
          ctx.list = items
        }
        ctx.over = res.data.items.length < pageSize
        this.$nextTick(() => this.onScroll(tab))
      }
    },
    resetAll () {
      // 设置 latest=false 下次该tab fetch 时会进行刷新
      this.active.latest = false
      this.history.latest = false
      this.stop.latest = false
    },
    clear (tab) {
      const ctx = this[tab]
      ctx.latest = false
      ctx.list = []
      ctx.fetchId += 1
      ctx.fetching = false
      ctx.over = false

      // 通知 deals 浮窗关闭
      this.$eh.$emit('order-deals:hide')
    },
    clearAll () {
      this.clear('active')
      this.clear('history')
      this.clear('stop')

      // 通知 deals 浮窗关闭
      this.$eh.$emit('order-deals:hide')
    },
    refresh (tab) { 
      this.latest = false
      return this.fetch(tab)
    },
    update: _.throttle(async function () {
      this.resetAll() 
      await this.fetch(this.tab)
      this.loop()
    }, 2000),
    loop () {
      clearTimeout(this.loopTimer)
      this.loopTimer = setTimeout(() => { 
        this.update()
      }, 60000)
    },
    onresize: _.debounce(function () { 
      if (!this.$refs.active) {
        return this.$nextTick(() => this.onresize())
      }
      
      // this.$refs.active.style.height = this.container.height - 32 + 'px'
      // this.$refs.history.style.height = this.container.height - 32 + 'px'
      // this.$refs.stop.style.height = this.container.height - 32 + 'px'
      this.onScroll(this.tab)
    }, 100),
    layout () { 
      this.onresize()
      this.$eh.$on('app:resize', this.onresize)
    },
    onScroll: _.throttle(function (tab) {
      const outer = this.$refs[tab]
      const inner = this.$refs[tab + 'Content']
      if (outer.scrollTop + outer.clientHeight >= inner.clientHeight - 10 ||
        (inner.clientHeight < outer.clientHeight && !this[tab].over)
      ) {
        // this.fetch(tab)
      }
      // 有滚动操作时，自动刷新功能延后进行
      // this.loop()
      // 有滚动操作时，通知 deals 浮窗关闭
      this.$eh.$emit('order-deals:hide')
    }, 500)
  },
  created () {
    this.$eh.$on('protrade:order:refresh', this.update)
    this.$eh.$on('protrade:layout:init', this.layout)
    this.$eh.$on('page:show', this.update)
    this.loop()
  },
  destroyed () {
    clearTimeout(this.loopTimer)
    this.$eh.$off('app:resize', this.onresize)
    this.$eh.$off('protrade:order:refresh', this.update)
    this.$eh.$off('protrade:layout:init', this.layout)
    this.$eh.$off('page:show', this.update)
  }
}
</script>

<style lang="scss" scoped>

.err,
.no-data {
  line-height: 70px;
  padding-top: 100px; // 这里先这么写,让它居中;
  text-align: center;
  color: rgba(200,200,200, .2);
}
.table {
  font-size: 12px;
  width: 100%;
}
th {
  color: #788694;
  line-height: 30px;
}
th, td {
  text-align: left;
  padding: 0 5px;
}
td {
  white-space: nowrap;
  color: #BCBFCE;
  line-height: 24px;
}
td:first-child,
th:first-child {
  padding-left: 15px;
}
tbody tr:nth-child(odd) {
  background-color: rgba(255,255,255, 0.03);
}
.side-icon {
  width: 8px;
}
.side-icon i {
  display: inline-block;
  vertical-align: top;
  width: 8px;
  height: 8px;
  margin-top: 8px;
  border-radius: 4px;
  &.BUY {
    background-color: $buy;
  }
  &.SELL {
    background-color: $sell;
  }
}
.table-history .side-icon i {
  border-radius: 1px;
}
.ix-header {
  background-color: $nav;
  height: 32px;
  line-height: 32px;
  box-sizing: border-box;
  color: white;
}
.ix-panel-body {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
}
.ix-panel .ix-header {
  // padding-left: 30px;
}
.ix-header-nav {
  opacity: .4;
  transition: opacity 300ms;
  color: white;
  display: inline-block;
  line-height: 30px;
  height: 30px;
  border-bottom: 2px solid transparent;
  vertical-align: top;
  padding: 0 14px;
  &.cur {
    opacity: 1;
    background: $protrade-bg;
    border-top: 2px solid $primary;
  }
}
.progress .op-cancel {
  cursor: progress;
}
.op-cancel {
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  position: relative;
  border: 1px inset transparent;
  margin-top: 4px;
  &:after,
  &:before {
    content: ' ';
    width: 2px;
    height: 8px;
    position: absolute;
    left: 6px;
    top: 3px;
    background-color: #788694;
  }
  &:before {
    transform: rotate(-45deg);
  }
  &:after {
    transform: rotate(45deg);
  }
  &:hover, &:active, &:focus {
    background-color: #303549;
    border: 1px inset rgba(255,255,255, .1);
  }
  th & {
    margin-top: 7px;
  }
}
.mask {
  @include ix-mask();
  top: 32px;
  .ix-loading {
    margin-top: -16px;
  }
}
.ccy {
  padding-left: 0;
  opacity: .4;
}
.deco {
  opacity: .4;
}

.header-icons {
  float: right;
  padding-right: 8px;
}
.hide-others {
  margin-right: 5px;
  opacity: .4;
  &.on {
    opacity: 1;
  }
}
.header-btn {
  cursor: pointer;
  color: white;
  opacity: 0.6;
  transition: opacity 300ms;
  &:hover,
  &:active {
    opacity: 1;
  }
}
.el-checkbox /deep/ .el-checkbox__label {
  color: #fff;
}
</style>
