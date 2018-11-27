<template>
  <!-- deprecated -->
  <v-popover class="order-deals has-tooltip"
    placement="top"
    trigger="hover click"
    @show="onShow"
    popoverClass="pro-popover order-deal-popover"
    :popperOptions="options">
    <span class="info-btn btn">
      <icon name="info"></icon>
    </span>
    <template slot="popover">
      <div class="mask" :class="{show: loading}">
        <v-loading></v-loading>
      </div>
      <div class="table-wrap" @click.stop>
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
                <div v-if="!$big(deal.fee_tb).eq(0)"><span class="num">{{ deal.fee_tb }}</span> IXX</div>
                <div v-if="!$big(deal.fee_currency).eq(0)"><span class="num">{{ deal.fee_currency }}</span> {{ pairName | c }}</div>
                <div v-if="!$big(deal.fee_product).eq(0)"><span class="num">{{ deal.fee_product }}</span> {{ pairName | p }}</div>
                <div v-if="isFree(deal)">0</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="err" v-show="errmsg && !loading">{{ errmsg }}</div>
      </div>
    </template>
  </v-popover>
</template>

<script>
import service from '@/modules/service'
import utils from '@/modules/utils'

export default {
  name: 'orderDeal',
  props: ['id', 'finished', 'pairName'],
  data () {
    return {
      list: [],
      errmsg: '',
      isHide: false,
      options: {
        modifiers: {
          preventOverflow: {
            boundariesElement: 'window'
          }
        }
      }
    }
  },
  methods: {
    isFree (deal) {
      return this.$big(deal.fee_tb).eq(0) &&
        this.$big(deal.fee_currency).eq(0) &&
        this.$big(deal.fee_product).eq(0)
    },
    async onShow () {
      if (this.loaded) {
        return false
      }
      this.errmsg = ''
      this.list = res.data.items
    }
  }
}
</script>

<style lang="scss" scoped>


.order-deals {
  display: inline-block;
}
.info-btn {
  font-size: 14px;
  line-height: 24px;
  vertical-align: top;
  opacity: .5;
  &:hover {
    opacity: 1;
  }
}
.mask {
  @include ix-mask();
  background-color: transparent;
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
  max-height: 300px;
  min-width: 100px;
  padding: 6px 0 12px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1A1A1A;
    // border: 2px solid #141721;
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
