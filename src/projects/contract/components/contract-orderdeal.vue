<template>
  <div class="orderdeal-container">
    <div class="ix-pannel">
      <div class="ix-header">
        {{ $t('contract_block_orderdeal') }}
      </div>
      <div
        class="ix-pannel-body"
        ref="body"
      >
        <table class="table table-ix-deal">
          <tbody v-if="state.ct.pairInfo">
            <tr style="height: 30px">
              <th class="th-dir">{{ $t('deal_th_side') }} {{lastSide}}</th>
              <th class="right">{{ $t('deal_th_price') }}</th>
              <th class="right">{{ $t('deal_th_amount') }}</th>
              <th>{{ $t('deal_th_time') }}</th>
            </tr>
            <!-- :key="deal.time+''+deal.price+deal.side+deal.amount" -->
            <tr
              v-for="(deal, index) in dealList"
              :key="index"
              @click="setPrice(deal.price, deal.side);setAmount(deal.amount, deal.side)"
              :class="[deal.side, 'twinkling']"
              :style="getStyle(deal, index)">
              <td class="td-dir">
                <span
                  class="side-text ibt"
                  :class="['side-' + deal.side, sideColor(deal.side)]">
                  {{ deal.side === 'buy' ? $t('order_side_buy') : $t('order_side_sell') }}
                </span>
              </td>
              <td
                class="right"
                :class="['side-' + deal.side, sideColor(deal.side)]"><num :num="$big(deal.price).toFixed(state.ct.pairInfo.price_scale)"/></td>
              <td class="right">{{ deal.amount | fixed(state.ct.pairInfo.amount_scale) }}</td>
              <td>{{ deal.time | date('H:m:s') }}</td>
            </tr>
          </tbody>
        </table>
        <div
          class="no-data"
          v-show="!loading && !err && !dealList.length">{{ $t('deal_empty') }}</div>
        <div
          class="err"
          v-show="!loading && err && !dealList.length">{{ err }}</div>
      </div>
      <div
        class="mask"
        :class="{show: loading}">
        <v-loading/>
      </div>
    </div>
  </div>
</template>
<script>
import { state, local } from '@/modules/store'
import ws from '@/modules/ws'
import _ from 'lodash'
import config from '@/libs/config'
import service from '@/modules/service'
import { pairfix } from '@/mixins/index'
import dealSocketMixins from '@/mixins/deal-socket-mixins'

export default {
  name: 'Deal',
  mixins: [pairfix, dealSocketMixins],
  data () {
    return {
      err: '',
      local,
      state,
      loading: true
    }
  },
  methods: {
    sideColor (side) {
      return side.toUpperCase() === 'BUY'
        ? 'color-up'
        : 'color-down'
    },
    clear () {
      this.err = ''
      this.dealList = []
    },
    async sub () {
      this.loading = true
      if (this.socket) {
        this.socket.$destroy()
      }
      // if (this.socketMarket) {
      //   this.socketMarket.$destroy()
      // }
      // if (this.socketIndex) {
      //   this.socketIndex.$destroy()
      // }
      this.openSocket().then(resp => {
        this.loading = false
      })
      const pair = this.state.ct.pair
      if (pair !== this.state.ct.pair) {
        return false
      }
    },
    getStyle (deal, index) {
      if (index % 2 === 0) {
        return {
          backgroundColor: '#10172a'
        }
      }
      // const { styleVar: { $buyRGB, $sellRGB } } = process.env.THEME_ENV

      // 其实不需要传入 this.local.upDown，只是为了形成依赖，这样 local.upDown 变化时会触发函数执行
      // const {up, down} = theme.getStyle(this.local.upDown)

      // const bgRgb = deal.side === 'buy' ? $buyRGB.match(/[\d|,]{5,}/)[0] : $sellRGB.match(/[\d|,]{5,}/)[0]
      // const bg = deal.side === 'buy' ? up : down
      // const alpha = Math.pow(2, Math.log10(this.dealList.length * deal.amount / this.volume)) * 0.18 + 0.05
      // return {
      // backgroundColor: theme.getRgba(bg, alpha),
      // borderBottom: `1px inset ${theme.getRgba(bg, 0.03)}`
      // }
    },
    setTitle () {
      if (this.state.ct.pair) {
        document.title = (this.price ? this.price : '...') +
        ` (${this.state.ct.pair.replace('_', '/')}) ${config.title}`
      }
    },
    onresize: _.debounce(function () {
      // this.$refs.body.style.width = this.container.width + 'px'
      // this.$refs.body.style.height = this.container.height - 32 + 'px'
    }, 100),
    layout () {
      this.onresize()
      // this.$eh.$on('app:resize', this.onresize)
    },
    setPrice (price, side) {
      this.$eh.$emit('protrade:exchange:set', {price, side: side})
    },
    setAmount (amount, side) {
      this.$eh.$emit('protrade:exchange:set', {amount, side: side})
    }
  },
  computed: {
    pair () {
      return this.state.ct.pair
    },
    volume () {
      return _.reduce(
        this.dealList,
        (sum, newItem) => sum.plus(newItem.amount),
        this.$big(0)
      )
    },
    price () {
      return this.dealList.length ? this.dealList[0].price : 0
    }
  },
  watch: {
    'state.ct.pair': {
      handler (pair, oldPair) {
        if (pair) {
          this.clear()
          this.sub()
          this.setTitle()
        }
      },
      immediate: true
    },
    price: {
      handler (newPrice, oldPrice) {
        this.setTitle()
        this.state.ct.lastPrice = this.$big(newPrice)
        if (!oldPrice) {
          this.$eh.$emit('protrade:exchange:set', {
            dontOveride: 1,
            price: newPrice
          })
        }
      },
      immediate: true
    }
  },
  created () {
    this.$eh.$on('protrade:deal:refresh', this.sub)
    this.$eh.$on('protrade:layout:init', this.layout)
  },
  destroyed () {
    // this.$eh.$off('app:resize', this.onresize)
    this.$eh.$off('protrade:deal:refresh', this.sub)
    this.$eh.$off('protrade:layout:init', this.layout)
    document.title = config.title
  }
}
</script>

<style lang="scss" scoped>

.mask {
  @include ix-mask();
}
.orderdeal-container {
  height: 100%;
  .ix-pannel {
    height: 100%;
    overflow: hidden;
  }
}
.ix-header {
  background-color: $nav;
  height: 32px;
  line-height: 32px;
  padding-left: 12px;
  box-sizing: border-box;
  color: white;
}
.ix-pannel-body {
  overflow-y: auto;
}
.err,
.no-data {
  line-height: 70px;
  text-align: center;
  color: rgba(200, 200, 200, 0.2);
}
.table {
  font-size: 12px;
  width: 100%;
  color: rgba(255, 255, 255, 0.8);
}
td,
th {
  white-space: nowrap;
  text-align: center;
  padding: 0 5px;
  line-height: 24px;
}
th {
  color: #788694;
}
.side-text {
  font-size: 12px;
}
.side-icon {
  font-size: 12px;
}
.side-buy {
  color: $up-price;
}
.side-sell {
  color: $down-price;
}
.side-icon.side-buy {
  transform: scale(0.9) rotate(90deg);
}
.side-icon.side-sell {
  transform: scale(0.9) rotate(-90deg);
}
.td-dir,
.th-dir {
  padding: 0 2px 0 10px;
}
.fiat {
  padding-right: 12px;
}
.twinkling {
  animation: twinkling 0.8s ease-in-out;
}
@keyframes twinkling {
  0% {
    // background: rgba(255, 255, 255, 0.4);
    opacity: .3;
  }
  100% {
    opacity: 1;
  }
}
</style>
