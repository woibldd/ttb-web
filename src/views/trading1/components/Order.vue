<template>
  <div
    class="ix-panel"
    :class="{progress: progressing}">
    <div
      class="mask"
      :class="{show: hasMask, transparent: curCtx.page > 0}">
      <v-loading/>
    </div>
    <div class="ix-header"  :skin="state.skin">
      <a
        class="ix-header-nav raw"
        :class="{cur: tab === 'active'}"
        @click.prevent="setTab('active')">
        {{ $t('order_active') }}
        <span v-if="activeTotal">[{{ activeTotal }}]</span>
      </a>
      <a
        class="ix-header-nav raw"
        :class="{cur: tab === 'trigger'}"
        @click.prevent="setTab('trigger')">
        {{ $t('trading_page.stop_order.stop_win_loss') }}
      </a>
      <a
        class="ix-header-nav raw"
        :class="{cur: tab === 'history'}"
        @click.prevent="setTab('history')">
        {{ $t('order_history') }}
      </a>
      <div class="header-icons">
        <span
          class="hide-others btn on"
          @click="local.hideOthers = !local.hideOthers">
          <input
            type="checkbox"
            v-model="local.hideOthers">
          {{ $t('hide_others', {pair: pair}) }}
        </span>
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
      :skin="state.skin"
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
              <th>{{ $t('deal_th_side') }}</th>
              <!-- <th>{{ $t('order_th_type') }}</th> -->
              <th class="right">{{ $t('price') }}</th>
              <th class="right">{{ $t('amount') }}</th>
              <th/>
              <th>{{ $t('order_th_status') }}</th>
              <!-- <th class="center" v-if="active.list.length">
                <a class="btn op-cancel" @click.prevent="cancelAll"></a>
              </th> -->
              <th class="center">{{ $t('operation') }}</th>
            </tr>
          </thead>
          <tbody  :skin="state.skin">
            <tr
              v-for="order in active.list"
              :key="order.id">
              <td>{{ order.create_time | date }}</td>
              <td>{{ order.symbol | pairfix }}</td>
              <td
                style="color: #09C989"
                v-if="order.side === 'BUY'">{{ $t('order_side_buy') }}</td>
              <td
                style="color: #F24E4D"
                v-else>{{ $t('order_side_sell') }}</td>
              <!-- <td>{{ getType(order.type) }}</td> -->
              <td class="right">
                <span v-if="order.price > 0">{{ fixPrice(order.price, order.symbol) }}</span>
                <span v-else>--</span>
              </td>
              <td class="right">
                <span>{{ fixAmount(order.deal_amount, order.symbol) }} /</span>
                <span>{{ fixAmount(order.amount, order.symbol) }}</span>
              </td>
              <td class="ccy">{{ order.symbol | p }}</td>
              <td>
                {{ order.deal_amount > 0 ? $t('order_sts_partial') : $t('order_sts_active') }}
                <!-- <order-deal v-if="order.deal_amount > 0" :key="active.fetchId" :id="order.id" :pairName="order.symbol"/> -->
              </td>
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
      :skin="state.skin"
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
              <th>{{ $t('deal_th_side') }}</th>
              <th>{{ $t('order_th_type') }}</th>
              <th class="right">{{ $t('avg_price') }}</th>
              <th class="right">{{ $t('amount') }}</th>
              <th/>
              <th>{{ $t('order_th_status') }}</th>

            </tr>
          </thead>
          <tbody :skin="state.skin">
            <tr
              v-for="order in history.list"
              :key="order.id">
              <td>{{ order.create_time | date }}</td>
              <td>{{ order.symbol | pairfix }}</td>
              <td
                style="color: #09C989"
                v-if="order.side === 'BUY'">{{ $t('order_side_buy') }}</td>
              <td
                style="color: #F24E4D"
                v-else>{{ $t('order_side_sell') }}</td>
              <td>{{ getType(order.type) }}</td>
              <td class="right">
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
                <!-- <order-deal v-if="order.status == 3 || order.status == 5 || order.status == 7" :data="order" :pairName="order.symbol" :finished="true" /> -->
              </td>

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
      :skin="state.skin"
      v-show="tab === 'trigger'"
      ref="trigger"
      @scroll.prevent="onScroll('trigger')">
      <div
        class="inner"
        ref="triggerContent">
        <table class="table table-ix-order">
          <thead>
            <tr v-show="trigger.list.length">
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
          <tbody :skin="state.skin">
            <tr
              v-for="order in trigger.list"
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
                <span v-if="$big(order.trigger_price).gte(state.pro.pairTick.current)">???</span>
                <span v-if="$big(order.trigger_price).lte(state.pro.pairTick.current)">???</span>
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
              <td> {{ getType('STOP') }}</td>
              <td> {{ $t('trading_page.stop_order.untriggerl') }}</td>
              <td>{{ order.create_time | date }}</td>
              <td class="center">
                <a @click.prevent="cancel(order)">{{ $t('transfer_cancel') }}</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="no-data"
          v-show="!trigger.fetching && !trigger.err && !trigger.list.length">{{ $t(empty) }}</div>
        <div
          class="err"
          v-show="!trigger.fetching && trigger.err && !trigger.list.length">{{ trigger.err }}</div>
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
      trigger: {
        page:1,
        fetchId: 0,
        fetching: false,
        over: false,
        latest: false,
        api: 'orderTriggers',
        list: []
      },
      progressing: false,
      loading: false
    }
  },
  computed: {
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
        7: 'order_sts_partial'
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
      await service.getPairList() // ?????? avg() ????????? pairList??????????????????????????????

      if (fetchId !== ctx.fetchId || this._isDestroyed) {
        return false
      }
      ctx.fetching = false
      if (res.code) {
        ctx.err = res.message
      } else {
        const items = this.local.hideOthers
          ? res.data.items.filter(item => item.symbol === this.state.pro.pair)
          : res.data.items
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
      // ?????? latest=false ?????????tab fetch ??????????????????
      this.active.latest = false
      this.history.latest = false
      this.trigger.latest = false
    },
    clear (tab) {
      const ctx = this[tab]
      ctx.latest = false
      ctx.list = []
      ctx.fetchId += 1
      ctx.fetching = false
      ctx.over = false

      // ?????? deals ????????????
      this.$eh.$emit('order-deals:hide')
    },
    clearAll () {
      this.clear('active')
      this.clear('history')
      this.clear('trigger')

      // ?????? deals ????????????
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
      this.$refs.active.style.height = this.container.height - 32 + 'px'
      this.$refs.history.style.height = this.container.height - 32 + 'px'
      this.$refs.trigger.style.height = this.container.height - 32 + 'px'
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
      // ???????????????????????????????????????????????????
      // this.loop()
      // ??????????????????????????? deals ????????????
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
  padding-top: 100px; // ??????????????????,????????????;
  text-align: center; 
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
  // color: $grid-color;
  line-height: 24px;
}
td:first-child,
th:first-child {
  padding-left: 15px;
}
tbody {
  color: $--table-color;
  &[skin~='dark'] {
    color: $--table-color2;
  }
  tr:nth-child(odd) {
    background-color: rgba(255,255,255, 0.03);
  }
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
  height: 32px;
  line-height: 32px;
  box-sizing: border-box; 
  background-color: $--ix-header-bg;
  color: $--ix-header-color;
  &[skin~='dark'] {
    background-color: $--ix-header-bg2;
    color: $--ix-header-color2;
    .ix-header-nav.cur {
      background: $--contract-table-bg2;
      color: $--ix-header-color2;
    }
  }
}
.ix-panel-body {
  height: 100%;
  overflow-y: auto;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
  &[skin~='dark'] {
    background-color:  $--contract-table-bg2; 
  }
}
.ix-panel .ix-header {
  // padding-left: 30px;
}
.ix-header-nav {
  opacity: .9;
  transition: opacity 300ms;
  color: $nav-grey-color;
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
</style>
