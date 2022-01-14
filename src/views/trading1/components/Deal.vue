<template>
  <div class="ix-pannel">
    <div class="ix-header" :skin="state.skin">
      <span class="pull-left">{{ $t('deal_title') }} ({{ state.pro.pair | pairfix }})</span>
    </div>
    <div
      class="ix-pannel-body"
      ref="body">
      <table class="table table-ix-deal">
        <tbody v-if="state.pro.pairInfo">
          <tr>
            <!-- <th class="th-dir">{{ $t('deal_th_side') }}</th> -->
            <th class="left pl-15">{{ $t('deal_th_price') }}</th>
            <th class="right">{{ $t('deal_th_amount') }}</th>
            <th class="right">{{ $t('deal_th_time') }}</th>
          </tr>
          <!-- :key="deal.time+''+deal.price+deal.side+deal.amount" -->
          <tr
            v-for="(deal, index) in dealList"
            :key="index"
            :class="[deal.side, 'twinkling']" :skin="state.skin">
            <!-- <td class="td-dir">
              <span
                class="side-text ibt"
                :class="['side-' + deal.side, sideColor(deal.side)]">
                {{ deal.side === 'buy' ? $t('order_side_buy') : $t('order_side_sell') }}
              </span>
            </td> -->
            <td
              class="left pl-15"
              :class="['side-' + deal.side, sideColor(deal.side)]"><num :num="$big(deal.price).toFixed(state.pro.pairInfo.price_scale)"/></td>
            <td class="right">{{ deal.amount | round(state.pro.pairInfo.amount_scale) }}</td>
            <td class="right">{{ deal.time | date('H:m:s') }}</td>
          </tr>
        </tbody>
      </table>
      <div
        class="no-data"
        v-show="!loading && !err && !dealList.length">{{ $t('deal_empty') }}</div>
      <div
        class="err"
        v-show="!loading && err && !dealList.length">{{ err }}</div>
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
// import ws from '@/modules/ws'
import _ from 'lodash'
import config from '@/libs/config'
import service from '@/modules/service'
import { pairfix } from '@/mixins/index' 
import utils from "@/modules/utils"

export default {
  name: 'Deal',
  mixins: [pairfix],
  data () {
    return {
      err: '',
      local,
      state,
      socket: null,
      dealList: [],
      loading: true,
      lastPair: ''
    }
  },
  props: {
    dataTable:[]
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
      const pair = this.state.pro.pair
      const res = await service.getQuoteDeal({
        pair: this.state.pro.pair,
        size: 20
      })
      // console.log(res)

      if (pair !== this.state.pro.pair) {
        return false
      }
      if (!res.code) {
        this.loading = false
        this.update(res.data)
        this.$eh.$emit('deal:update', res.data)
      }
      // if(!this.lastPair) {
      //   this.lastPair = `deal@${this.state.pro.pair}`
      // } else { 
      //   utils.$tvSocket.socket.send(`{"op":"unsubscribepub","args":${this.lastPair}}`)
      //   this.lastPair = `deal@${this.state.pro.pair}`
      //   utils.$tvSocket.socket.send(`{"op":"subscribepub","args":${this.lastPair}}`)  
      // }
      // utils.$tvSocket.$on('message', data => {  
      //   if (data.topic && data.topic.indexOf('deal') > -1) {
      //     this.loading = false
      //     this.update(data.data)
      //     this.$eh.$emit('deal:update', data.data)
      //   }
      // })

      // this.socket = ws.create(`deal/${this.state.pro.pair}`)
      // this.socket.$on('open', () => {
      //   this.socket.heartCheck.start()
      // })
      // this.socket.$on('message', data => {
      //   this.socket.heartCheck.start()
      //   this.loading = false
      //   this.update(data)
      //   this.$eh.$emit('deal:update', data)
      // })
      // this.socket.$on('reopen', this.sub)
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
    update (data) {
      if (!data) return
      const dealList = _.map(data, item => {
        return {
          time: item.time,
          price: item.values[0],
          amount: item.values[1],
          side: item.side.toLowerCase()
        }
      }).sort((a, b) => {
        try {
          return b.time - a.time
        } catch (e) {
          return 0
        }
      })
        //   if (
        //     dealList.length &&
        //     this.dealList.length &&
        //     dealList[0].time <= this.dealList[0].time
        //   ) {
        //     // 因断线重连，导致重新获取了全量数据
        //     this.dealList = dealList
        //   } else {
        //     this.dealList = dealList.concat(this.dealList).slice(0, 20)
        //   }
        this.dealList = dealList.concat(this.dealList).slice(0, 20)
    },
    setTitle () {
      document.title =
        (this.price ? this.price : '...') +
        ` (${this.state.pro.pair.replace('_', '/')}) ${config.title}`
    },
    onresize: _.debounce(function () {
      // this.$refs.body.style.width = this.container.width + 'px'
      this.$refs.body.style.height = this.container.height - 32 + 'px'
    }, 100),
    layout () {
      this.onresize()
      this.$eh.$on('app:resize', this.onresize)
    },
    fixAmount (big) {
      if (!big) {
        return ''
      } 
      return utils.toPretty(big)
    },
  },
  computed: {
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
    'state.pro.pair': {
      handler (pair, oldPair) {
        if (pair) {
          this.clear()
          this.sub()
        }
        this.setTitle()
      },
      immediate: true
    },
    price: {
      handler (newPrice, oldPrice) {
        this.setTitle()
        this.state.pro.lastPrice = this.$big(newPrice)
        if (!oldPrice) {
          this.$eh.$emit('protrade:exchange:set', {
            dontOveride: 1,
            price: newPrice
          })
        }
      },
      immediate: true
    },
    dataTable: {
      handler (newValue) {
        this.update(newValue) 
      },
      immediate: true
    }
  },
  created () {
    this.$eh.$on('protrade:deal:refresh', this.sub)
    this.$eh.$on('protrade:layout:init', this.layout)
  },
  destroyed () {
    // if (this.socket) {
    //   this.socket.$destroy()
    // }
    this.$eh.$off('app:resize', this.onresize)
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
.ix-header {
  height: 32px;
  line-height: 32px;
  padding-left: 12px;
  box-sizing: border-box;
  background-color: $--ix-header-bg;
  color: $--ix-header-color;
  &[skin~="dark"] {
    background-color: $--ix-header-bg2; 
    color: $--ix-header-color2;
  }
}
.ix-pannel-body {
  overflow-y: auto;
}
.err,
.no-data {
  line-height: 70px;
  text-align: center; 
}
.table {
  font-size: 12px;
  width: 100%;
  color: $primary-item;
}
td,
th {
  color: #7D7D7D;
  white-space: nowrap;
  text-align: center;
  padding: 0 5px;
  line-height: 24px;
  width: 30%;
  font-weight: 500;
  &:last-child {
    width: 40%;
  }
  &:first-child {
    padding-left: 10px;
  }
} 
th {
  color:#A5B4C5;
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
.table-ix-deal {
  overflow: hidden;

}
.twinkling {
  animation: twinkling 0.8s ease-in-out;
  &:nth-child(even) {
    background-color: $--table-nth-even;
  } 
  &[skin~='dark']:nth-child(even) {
    background-color: $--table-nth-even2;
  }
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
