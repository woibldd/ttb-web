<template>
  <div class="order-deals-popover" :style="popoverStyle"
    v-show="visible"
    @mouseover="onHover"
    @mouseleave="hide">
    <div class="mask" :class="{show: loading}" v-show="loading">
      <v-loading></v-loading>
    </div>
    <div class="table-wrap" :key="id + pairName" v-show="list.length">
      <table v-show="list.length">
        <thead>
          <tr>
            <th class="left">{{ $t('orderdeal_executed') }}</th>
            <th class="left">{{ $t('orderdeal_fee') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deal in list" :key="deal.id">
            <td class="left">
              <span class="num">{{ deal.amount }}</span>
              {{ pairName | p }} at
              <span class="num">{{ deal.price }}</span>
              {{ pairName | c }}
            </td>
            <td class="left">
              <div v-if="!$big(deal.fee_tb).eq(0)"><span class="num">{{ deal.fee_tb }}</span> TB</div>
              <div v-if="!$big(deal.fee_currency).eq(0)"><span class="num">{{ deal.fee_currency }}</span> {{ pairName | c }}</div>
              <div v-if="!$big(deal.fee_product).eq(0)"><span class="num">{{ deal.fee_product }}</span> {{ pairName | p }}</div>
              <div v-if="isFree(deal)">0</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="err" v-show="errmsg && !loading">{{ errmsg }}</div>
    </div>
    <div class="tri"></div>
  </div>
</template>

<script>
import service from '@/modules/service'

export default {
  name: 'orderDeal',
  data () {
    return {
      id: 0,
      pairName: '',
      hovering: false,
      finished: false,
      list: [],
      errmsg: '',
      loading: true,
      loaded: false,
      visible: false,
      hideTimer: null,
      x: 0,
      y: 0
    }
  },
  computed: {
    popoverStyle () {
      return {
        left: this.x - 14 + 'px',
        bottom: window.innerHeight + 5 - this.y + 'px'
      }
    }
  },
  methods: {
    onHover () {
      this.hovering = true
    },
    reset () {
      this.loaded = false
      this.list = []
      this.errmsg = ''
      this.loading = true
      clearTimeout(this.hideTimer)
    },
    isFree (deal) {
      return this.$big(deal.fee_tb).eq(0) &&
        this.$big(deal.fee_currency).eq(0) &&
        this.$big(deal.fee_product).eq(0)
    },
    onTargetHide () {
      clearTimeout(this.hideTimer)
      this.hideTimer = setTimeout(() => {
        if (this.hovering) {
          return false
        }
        this.hide()
      }, 300)
    },
    hide () {
      this.hovering = false
      this.visible = false
      this.reset()
    },
    async onShow () {
      this.visible = true
      if (this.loaded) {
        return false
      }
      this.loaded = true // 只是避免重复请求，提前认为已加载完成
      this.loading = true
      this.errmsg = ''
      const fetchid = this.id + this.pairName
      const res = await service.queryOrder({id: this.id, finished: this.finished})
      if (fetchid !== this.id + this.pairName) {
        return false
      }
      this.loading = false
      if (res.code) {
        this.errmsg = res.message
        return false
      }
      this.list = res.data.items
    }
  },
  created () {
    this.$eh.$on('order-deals:show', ({id, pairName, finished, position}) => {
      if (id !== this.id || pairName !== this.pairName) {
        this.reset()
        this.id = id
        this.pairName = pairName
        this.finished = finished
        this.x = position.x
        this.y = position.y
      }
      this.onShow()
    })
    this.$eh.$on('order-deals:leave', () => {
      this.onTargetHide()
    })
    this.$eh.$on('order-deals:hide', () => {
      this.hide()
    })
  },
  destroyed () {
    this.$eh.$off('order-deals:show')
    this.$eh.$off('order-deals:leave')
    this.$eh.$off('order-deals:hide')
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";

.order-deals-popover {
  background-color: #232D3D;
  border: 1px inset fade-out(black, .9);
  position: fixed;
  z-index: 10;
}
.mask {
  @include pro-mask();
  position: relative;
  background-color: transparent;
  width: 180px;
  height: 100px;
}
.tri {
  $width: 8px;
  $height: 5px;
  position: absolute;
  left: 16px;
  bottom: -$height;
  width: $width;
  height: $height;
  box-sizing: border-box;
  border-top: $height solid #232D3D;
  border-left: $width / 2 solid transparent;
  border-right: $width / 2 solid transparent;
}
.num {
  font-weight: bold;
  color: #BCBFCE;
}
table {
  width: 100%;
  color: fade-out(#BCBFCE, .4);
  font-size: 12px;
}
td,th {
  white-space: nowrap;
  line-height: 24px;
  &:first-child {
    padding-right: 20px;
    padding-left: 12px;
  }
  &:last-child {
    padding-right: 12px;
  }
}
th {
  line-height: 28px;
  color: #788694;
  font-weight: bold;
}
tbody tr {
  &:nth-child(odd) {
    background-color: fade-out(#141721, .7);
  }
}
.table-wrap {
  overflow-y: auto;
  min-height: 60px;
  max-height: 120px;
  padding: 6px 0 12px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #475166;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
.err {
  text-align: center;
  line-height:  60px;
  color: fade-out(#BCBFCE, .4);
}
</style>
