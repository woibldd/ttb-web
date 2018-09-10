<template>
  <div class="ix-panel" :class="{progress: progressing}">
    <div class="mask" :class="{show: hasMask, transparent: curCtx.nextId}">
      <v-loading></v-loading>
    </div>
    <div class="ix-header">
      <a class="ix-header-nav raw"
        :class="{cur: tab === 'active'}"
        @click.prevent="setTab('active')">
        {{ $t('order_active') }}
        <span v-if="activeTotal">[{{ activeTotal }}]</span>
      </a>
      <a class="ix-header-nav raw"
        :class="{cur: tab === 'history'}"
        @click.prevent="setTab('history')">
        {{ $t('order_history') }}
      </a>
      <div class="header-icons">
        
        <span class="hide-others btn on"
          @click="local.hideOthers = !local.hideOthers">
          <input type="checkbox" v-model="local.hideOthers">
          {{ $t('hide_others', {pair: pair}) }}
        </span>
        <a @click.prevent="update" class="header-btn btn">
          <icon name="refresh"></icon>
        </a>
      </div>
    </div>
    <div class="ix-panel-body" v-show="tab === 'active'" ref="active">
      <div class="inner" ref="activeContent">
        <table class="table table-ix-order table-active">
          <thead>
            <tr v-show="active.list.length">
              <th class="side-icon"></th>
              <th>{{ $t('pair') }}</th>
              <th>{{ $t('order_th_type') }}</th>
              <th class="right">{{ $t('price') }}</th>
              <th class="right">{{ $t('amount') }}</th>
              <th></th>
              <th>{{ $t('order_th_status') }}</th>
              <th>{{ $t('order_th_placed') }}</th>
              <th class="center" v-if="active.list.length">
                <a class="btn op-cancel" @click.prevent="cancelAll"></a>
              </th>
              <th class="center" v-else>{{ $t('operation') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in active.list" :key="order.id">
              <td class="side-icon"><i :class="sideBg(order.side)"></i></td>
              <td>{{ order.pair_name | pairfix }}</td>
              <td>{{ getType(order.type) }}</td>
              <td class="right">
                <span v-if="order.price > 0">{{ fixPrice(order.price, order.pair_name) }}</span>
                <span v-else>--</span>
              </td>
              <td class="right">
                <span>{{ fixAmount(order.deal_amount, order.pair_name) }} /</span>
                <span>{{ fixAmount(order.amount, order.pair_name) }}</span>
              </td>
              <td class="ccy">{{ order.pair_name | p }}</td>
              <td>
                {{ order.deal_amount > 0 ? $t('order_sts_partial') : $t('order_sts_active') }}
                <order-deal v-if="order.deal_amount > 0" :key="active.fetchId" :id="order.id" :pairName="order.pair_name"/>
              </td>
              <td>{{ order.create_time | date }}</td>
              <td class="center">
                <a class="btn op-cancel" @click.prevent="cancel(order)"></a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="no-data" v-show="!active.fetching && !active.err && !active.list.length">{{ $t(empty) }}</div>
        <div class="err" v-show="!active.fetching && active.err && !active.list.length">{{ active.err }}</div>
      </div>
    </div>
    <div class="ix-panel-body" v-show="tab === 'filled'" ref="filled" @scroll.prevent="onScroll('filled')">
      <div class="inner" ref="filledContent">
        <table class="table table-ix-order table-filled">
          <thead>
            <tr v-show="filled.list.length">
              <th class="side-icon"></th>
              <th>{{ $t('pair') }}</th>
              <th>{{ $t('order_th_type') }}</th>
              <th class="right">{{ $t('avg_price') }}</th>
              <th class="right">{{ $t('amount') }}</th>
              <th></th>
              <th>{{ $t('order_th_status') }}</th>
              <th>{{ $t('order_th_placed') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filled.list" :key="order.id">
              <td class="side-icon"><i :class="sideBg(order.side)"></i></td>
              <td>{{ order.pair_name | pairfix }}</td>
              <td>{{ getType(order.type) }}</td>
              <td class="right"><num :num="avg(order)"/></td>
              <td class="right">
                <span v-if="$big(order.deal_amount).lt(order.amount)">{{ fixAmount(order.deal_amount, order.pair_name) }} /</span>
                <span>{{ fixAmount(order.amount, order.pair_name) }}</span>
              </td>
              <td class="ccy">{{ order.pair_name | p }}</td>
              <td>
                {{ orderSts(order.status) }}
                <order-deal :id="order.id" :pairName="order.pair_name" :finished="true" />
              </td>
              <td>{{ order.create_time | date }}</td>
            </tr>
          </tbody>
        </table>
        <div class="no-data" v-show="!filled.fetching && !filled.err && !filled.list.length">{{ $t(empty) }}</div>
        <div class="err" v-show="!filled.fetching && filled.err && !filled.list.length">{{ filled.err }}</div>
      </div>
    </div>
    <div class="ix-panel-body" v-show="tab === 'history'" ref="history" @scroll.prevent="onScroll('history')">
      <div class="inner" ref="historyContent">
        <table class="table table-ix-order table-history">
          <thead>
            <tr v-show="history.list.length">
              <th class="side-icon"></th>
              <th>{{ $t('pair') }}</th>
              <th>{{ $t('order_th_type') }}</th>
              <th class="right">{{ $t('avg_price') }}</th>
              <th class="right">{{ $t('amount') }}</th>
              <th></th>
              <th>{{ $t('order_th_status') }}</th>
              <th>{{ $t('time') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in history.list" :key="order.id">
              <td class="side-icon"><i :class="sideBg(order.side)"></i></td>
              <td>{{ order.pair_name | pairfix }}</td>
              <td>{{ getType(order.type) }}</td>
              <td class="right">
                <span v-if="order.deal_amount > 0"><num :num="avg(order)"/></span>
                <span v-else>--</span>
              </td>
              <td class="right">
                <span v-if="$big(order.deal_amount).lt(order.amount)">{{ fixAmount(order.deal_amount, order.pair_name) }} /</span>
                <span>{{ fixAmount(order.amount, order.pair_name) }}</span>
              </td>
              <td class="ccy">{{ order.pair_name | p }}</td>
              <td>
                {{ orderSts(order.status) }}
                <order-deal v-if="order.status <= 2" :id="order.id" :pairName="order.pair_name" :finished="true" />
              </td>
              <td>{{ order.create_time | date }}</td>
            </tr>
          </tbody>
        </table>
        <div class="no-data" v-show="!history.fetching && !history.err && !history.list.length">{{ $t(empty) }}</div>
        <div class="err" v-show="!history.fetching && history.err && !history.list.length">{{ history.err }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import utils from '@/modules/utils'
import {local, state, actions} from '@/modules/store'
import _ from 'lodash'
import OrderDeal from './OrderDealTarget'
import orderWatcher from '@/mixins/order-watcher'
import {pairfix} from '@/mixins/'

export default {
  name: 'order',
  mixins: [orderWatcher, pairfix],
  components: {
    OrderDeal
  },
  data () {
    return {
      state,
      err: '',
      tab: 'active',
      activeTotal: 0,
      local,
      active: {
        nextId: 0,
        fetchId: 0,
        fetching: false,
        over: false,
        latest: false,
        api: 'orderActive',
        list: []
      },
      filled: {
        nextId: 0,
        fetchId: 0,
        fetching: false,
        over: false,
        latest: false,
        api: 'orderClosed',
        list: []
      },
      history: {
        nextId: 0,
        fetchId: 0,
        fetching: false,
        over: false,
        latest: false,
        api: 'orderHistory',
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
      return side.toUpperCase() === 'BUY' ? 'theme-bgcolor-up' : 'theme-bgcolor-down'
    },
    fixPrice (price, pairName) {
      const scale = _.get(this.pairGroup, `${pairName}.price_scale`, 8)
      return utils.toFixed(price, scale)
    },
    fixAmount (amount, pairName) {
      const scale = _.get(this.pairGroup, `${pairName}.amount_scale`, 8)
      return utils.toFixed(amount, scale)
    },
    avg (order) {
      return this.fixPrice(this.$big(order.total).div(order.deal_amount), order.pair_name)
    },
    orderSts (statusId) {
      const context = {
        1: 'order_sts_filled',
        2: 'order_sts_partial',
        3: 'order_sts_canceled',
        4: 'order_sts_post_rm',
        5: 'order_sts_empty_rm'
      }[statusId] || 'Unknown'
      return this.$i18n.t(context)
    },
    getType (type) {
      switch (type) {
        case 'LIMIT':
          return this.$i18n.t('operate_limit')
        case 'MARKET':
          return this.$i18n.t('operate_market')
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
        pair_name: order.pair_name,
        order_id: order.id
      })
      if (res.code) {
        utils.alert(res.message)
      } else {
        const find = _.findIndex(this.active.list, item => {
          return item.id === order.id && item.pair_name === order.pair_name
        })
        if (find > -1) {
          this.active.list.splice(find, 1)
        }
      }
      this.update()
      this.progressing = false
      if (order.pair_name.indexOf(this.state.pro.product_name) > -1 ||
        order.pair_name.indexOf(this.state.pro.product_name) > -1) {
        this.$eh.$emit('protrade:balance:refresh', order.pair_name)
      }
    },
    async cancelAll () {
      if (this.progressing || this.buzy) {
        return false
      }
      this.buzy = true
      const confirm = await utils.confirm({
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
            pair_name: order.pair_name,
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
        ctx.nextId = 0
        ctx.over = false
        ctx.fetching = false
      }
      if (ctx.over || ctx.fetching) {
        return false
      }
      ctx.fetchId += 1
      ctx.fetching = true
      const pageSize = 20
      const nextId = ctx.nextId
      const fetchId = ctx.fetchId
      const params = {
        size: pageSize,
        start: ctx.nextId
      }
      if (this.local.hideOthers) {
        params.pair_name = this.state.pro.pair
      }
      const res = await service[ctx.api](params)
      await service.getPairList() // 由于 avg() 使用了 pairList，需要等待该请求完成

      if (nextId !== ctx.nextId || fetchId !== ctx.fetchId || this._isDestroyed) {
        return false
      }
      ctx.fetching = false
      if (res.code) {
        ctx.err = res.message
      } else {
        const items = this.local.hideOthers
          ? res.data.items.filter(item => item.pair_name === this.state.pro.pair)
          : res.data.items
        if (nextId) {
          ctx.list = ctx.list.concat(items)
        } else {
          this.$refs[tab].scrollTop = 0
          ctx.list = items
        }
        ctx.over = res.data.items.length < pageSize
        ctx.nextId = _.get(_.last(res.data.items), 'id', 0)
        this.$nextTick(() => this.onScroll(tab))
      }
    },
    resetAll () {
      // 设置 latest=false 下次该tab fetch 时会进行刷新
      this.active.latest = false
      this.filled.latest = false
      this.history.latest = false
    },
    clear (tab) {
      const ctx = this[tab]
      ctx.latest = false
      ctx.list = []
      ctx.nextId = 0
      ctx.fetchId += 1
      ctx.fetching = false
      ctx.over = false

      // 通知 deals 浮窗关闭
      this.$eh.$emit('order-deals:hide')
    },
    clearAll () {
      this.clear('active')
      this.clear('filled')
      this.clear('history')

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
      this.$refs.active.style.height = this.container.height - 32 + 'px'
      this.$refs.filled.style.height = this.container.height - 32 + 'px'
      this.$refs.history.style.height = this.container.height - 32 + 'px'
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
        this.fetch(tab)
      }
      // 有滚动操作时，自动刷新功能延后进行
      this.loop()
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
@import "../../styles/vars";
@import "../../styles/mixins";

.err,
.no-data {
  line-height: 70px;
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
.table-filled .side-icon i,
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
</style>
