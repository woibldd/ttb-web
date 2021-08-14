<template>
  <div class="deepth-container">
    <div class="ix-pannel">
      <div class="ix-header">
        {{ $t('orderbook_depth_title') }}
      </div>
      <div class="ix-pannel-body relative">
        <div class="book-depth-container">
          <div
            id="depth-chart"
            class="depth-chart">
            <!-- <v-depth-chart
              width="468px"
              height="191px"
              bg-color="#252525"
              :jagged="false"
              :tips-price="tipsPrice"
              :tips-total="tipsTotal"
              :data="data"/> -->
          </div>
        </div>
        <div
          class="mask"
          :class="{show: loading}">
          <v-loading/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {state} from '@/modules/store'
import service from '@/modules/service'
import throttle from 'lodash/throttle'
import utils from '@/modules/utils'
import isEmtpy from 'lodash/isEmpty'
export default {
  name: 'ContractDeepth',
  components: {},
  watch: {
    pair: {
      immediate: false,
      async handler (pair) {
        if (pair) {
          this.loading = true
          setTimeout(() => {
            this.initChart()
          }, 1000)
        }
      }
    }
  },
  data () {
    return {
      state,
      data: null,
      loading: true
    }
  },
  computed: {
    pair () {
      return this.state.ct.pair
    },
    priceScale () {
      let scale = _.get(this, 'state.ct.pairInfo.price_scale', 4) - this.offset
      if (this.offset !== 0 && this.accuracy === 2) {
        scale += 1
      }
      return utils.unsign(scale)
    },
    tipsPrice () {
      return this.$t('contract_tooltip_price')
    },
    tipsTotal () {
      return this.$t('contract_tooltip_addons')
    }
  },
  async created () {
    this.initChart()
    this.fetch()
    this.$eh.$on('protrade:orderbook:update', throttle(this.updateData, 10000))
  },
  methods: {
    _getDataSourceUrl () {
      let pair = this.pair || 'FUTURE_BTCUSD'
      if (pair) {
        return `https://q.ixex.cc/v1/orderbook/${pair}?offset=0&accuracy=1&size=20`
      }
    },cc
    _parseData (resp) {
      let data = resp.data
      if (isEmtpy(data) || (!data.bids || !data.asks)) {
        this.loading = false
        return
      }
      data = {
        buy: data.bids.map(item => item.values),
        sell: data.asks.map(item => item.values)
      }
      let total = 0
      data.buy = data.buy.map(item => {
        total += Number(item[1])
        return {
          price: item[0],
          amount: item[1],
          total: total
        }
      })
      total = 0
      data.sell = data.sell.map(item => {
        total += Number(item[1])
        return {
          price: item[0],
          amount: item[1],
          total: total
        }
      }) 
      data.sell = data.sell.sort((a, b) => {
        return b.price - a.price
      }) 
      this.loading = false
      return data
    },
    async initChart () {

    },
    updateData (data) {
      this.data = this._parseData(data)
      console.log(this.data)
    },
    fetch () {
      let pair = this.pair || 'BTC_USDT'
      service.getQuoteOrderbook({
        pair: pair,
        offset: 0,
        accuracy: 1,
        size: 20
      }).then(resp => {
        this.data = this._parseData(resp)
      })
    }
  },
  props: {},
  destroyed () {
    this.$eh.$off('protrade:orderbook:update', this.updateData)
    this.data = null
  }
}
</script>
<style>
.ampopup-content{
  display: none!important;
}
.ampopup-curtain{
  display: none!important;
}
</style>
<style lang="scss" scoped>
.deepth-container {
  display: flex;
  height: 100%;
  flex: 1;
  .ix-pannel {
    height: 100%;
    .ix-pannel-body {
      height: 100%;
      .book-depth-container {
          height: 191px;  // 看着页面调整的,要对齐
        .depth-chart {
          height: 100%;
        }
      }
      .mask {
        @include ix-mask();
        background-color: transparent;
      }
    }
  }
}
</style>
