<template>
  <div class="pro-trade-op market-order">
    <ul class="ul buy-ul" v-if="pairInfo">
      <li class="li-price li-mb">
        <div class="label">{{ $t('price') }}</div>
        <div class="content">
          <currency-input class="pro"
            :disabled="true"
            :placeholder="$t('market_ph')"
            :currency="state.pro.currency_name">
          </currency-input>
        </div>
      </li>
      <li class="li-amount li-mb">
        <div class="label">{{ $t('amount') }}</div>
        <div class="content">
          <currency-input class="pro"
            :class="[input.amount.status]"
            v-model="amount"
            :currency="state.pro.product_name"
            :scale="pairInfo.amount_scale">
          </currency-input>
          <div class="btn point-btn buy-all"
            v-tooltip.left="buyTip"
            @click="setBuyVolumn(1)">
            <i class="ibt theme-bgcolor-up"></i>
          </div>
          <div class="btn point-btn sell-all"
            v-tooltip.left="sellTip"
            @click="setSellVolumn(1)">
            <i class="ibt theme-bgcolor-down"></i>
          </div>
        </div>
      </li>
      <li class="li-volume li-mb">
        <div class="half-wrap left">
          <div class="currency-volume">
            <div class="avbl">
              <div class="avbl-label">{{ $t('avlb') }} {{ state.pro.currency_name }}</div>
              <div class="avbl-value" v-if="currency">{{ currency.available | fixed(pairInfo.currency_scale) }}</div>
              <div class="avbl-value" v-else>----</div>
            </div>
            <div class="volume-sets">
              <a class="volume-set" @click.prevent="setBuyVolumn(.25)"><span>25%</span></a>
              <a class="volume-set" @click.prevent="setBuyVolumn(.5)"><span>50%</span></a>
              <a class="volume-set" @click.prevent="setBuyVolumn(.75)"><span>75%</span></a>
              <a class="volume-set" @click.prevent="setBuyVolumn(1)"><span>100%</span></a>
            </div>
          </div>
        </div>
        <div class="half-wrap right">
          <div class="product-volume">
            <div class="avbl">
              <div class="avbl-label">{{ $t('avlb') }} {{ state.pro.product_name }}</div>
              <div class="avbl-value" v-if="product">{{ product.available | fixed(pairInfo.product_scale) }}</div>
              <div class="avbl-value" v-else>----</div>
            </div>
            <div class="volume-sets">
              <a class="volume-set" @click.prevent="setSellVolumn(.25)"><span>25%</span></a>
              <a class="volume-set" @click.prevent="setSellVolumn(.5)"><span>50%</span></a>
              <a class="volume-set" @click.prevent="setSellVolumn(.75)"><span>75%</span></a>
              <a class="volume-set" @click.prevent="setSellVolumn(1)"><span>100%</span></a>
            </div>
          </div>
        </div>
      </li>
      <li class="li-submit">
        <div class="half-wrap left">
          <v-btn :label="$t('operate_buy', {coin: state.pro.product_name})"
            class="submit-btn"
            radius="0"
            color="probuy"
            height="44"
            :loading="submitting === 'BUY'"
            @click="submit('BUY')"></v-btn>
        </div>
        <div class="half-wrap right">
          <v-btn :label="$t('operate_sell', {coin: state.pro.product_name})"
            class="submit-btn"
            radius="0"
            color="prosell"
            height="44"
            :loading="submitting === 'SELL'"
            @click="submit('SELL')"></v-btn>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {state} from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'
import _ from 'lodash'

export default {
  name: 'proMarketOrder',
  data () {
    return {
      state,
      amount: '',
      price: '',
      input: {
        amount: {
          timer: null,
          status: ''
        },
        price: {
          timer: null,
          status: ''
        }
      },
      buyTip: {
        classes: ['pro-popover'],
        offset: '-4px',
        popperOptions: {
          modifiers: {
            flip: {
              enabled: false
            },
            preventOverflow: {
              boundariesElement: 'window'
            }
          }
        },
        content () {
          return utils.$i18n.t('set_buy_all')
        }
      },
      sellTip: {
        classes: ['pro-popover'],
        offset: '-4px',
        popperOptions: {
          modifiers: {
            flip: {
              enabled: false
            },
            preventOverflow: {
              boundariesElement: 'window'
            }
          }
        },
        content () {
          return utils.$i18n.t('set_sell_all')
        }
      },
      submitting: false,
      postOnly: false,
      hidden: false
    }
  },
  computed: {
    currency () {
      return this.state.pro.currency
    },
    product () {
      return this.state.pro.product
    },
    pairInfo () {
      return this.state.pro.pairInfo
    }
  },
  watch: {
    'state.pro.pair': {
      async handler (pair) {
        if (pair) {
          this.clear()
        }
      },
      immediate: true
    }
  },
  methods: {
    clear () {
      this.amount = ''
      this.price = ''
    },
    set ({price, amount}) {
      if (price) {
        this.price = this.$big(price).toString()
      }
      if (amount) {
        this.amount = this.$big(amount).toString()
      }
    },
    setBuyVolumn (ratio) {
      const price = _.get(this, 'state.pro.pairInfo.price', 0)
      if (price > 0) {
        this.amount = this.$big(this.currency.available)
          .mul(ratio)
          .div(price)
          .round(this.pairInfo.amount_scale)
          .toString()
      }
    },
    setSellVolumn (ratio) {
      this.amount = this.$big(this.product.available)
        .mul(ratio)
        .round(this.pairInfo.amount_scale)
        .toString()
    },
    setInputStatus (input, status) {
      clearTimeout(this.input[input].timer)
      this.input[input].status = status
      this.input[input].timer = setTimeout(() => {
        this.input[input].status = ''
      }, 2000)
    },
    checkOrder (orderId) {
      this.$eh.$emit('protrade:order:refresh')
      this.$eh.$emit('protrade:balance:refresh')
    },
    async submit (side) {
      if (this.submitting) {
        return false
      }
      const $amount = this.$big(this.amount || 0)
      const $bid = this.$big(this.state.pro.bid || 0)
      const $ask = this.$big(this.state.pro.ask || 0)
      if (!$amount.gt(0)) {
        return this.setInputStatus('amount', 'error')
      }
      if (side === 'SELL' && $amount.gt(this.product.available)) {
        return utils.alert(this.$i18n.t('amount_over'))
      }
      if ($amount.lt(this.pairInfo.min_amount)) {
        return utils.alert(this.$i18n.t('amount_low', {num: this.pairInfo.min_amount + ' ' + this.pairInfo.product_name}))
      }
      if ($amount.gt(this.pairInfo.max_amount)) {
        return utils.alert(this.$i18n.t('amount_high', {num: this.pairInfo.max_amount + ' ' + this.pairInfo.product_name}))
      }
      if ($bid.gt(0) && $ask.gt(0) && $bid.mul(1.05).lt($ask)) {
        // 盘口差价较大，且下单价超过盘口
        const ok = await utils.confirm({
          trade: true,
          content: this.$i18n.t('spread_too_big', {per: 5}),
          title: this.$i18n.t('confirm_your_order')
        })
        if (!ok) {
          return false
        }
      }
      this.submitting = side
      const order = {
        type: 'MARKET',
        side: side,
        amount: $amount.toString(),
        pair_name: this.state.pro.pair
      }
      const res = await service.createOrder(order)
      this.submitting = false
      if (res.code > 0) {
        return utils.alert(res.message)
      }

      this.amount = ''

      if (res.code < 0) {
        utils.alert(res.message)
        this.state.pro.currency = null
        this.state.pro.product = null
        this.$eh.$emit('protrade:order:refresh')
        this.$eh.$emit('protrade:balance:refresh')
        return false
      }
      if (!res.code) {
        this.checkOrder(res.data.order_id)
      }
    }
  },
  created () {
    this.$eh.$on('protrade:exchange:set', this.set)
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
.pro-trade-op {
  padding-top: 14px;
}
.half-wrap {
  float: left;
  width: 50%;
  box-sizing: border-box;
  &.left {
    padding-right: 6px;
  }
  &.right {
    padding-left: 6px;
  }
}
.submit-btn {
  box-sizing: border-box;
}
.ul {
  margin: 0 14px;
  li {
    @include clearfix();
  }
  .label {
    width: 28%;
    float: left;
    box-sizing: border-box;
    min-height: 20px;
  }
  .content {
    position: relative;
    width: 72%;
    float: left;
    box-sizing: border-box;
  }
}
.li-amount,
.li-price {
  margin-bottom: 9px;
  .label {
    line-height: 28px;
    color: white;
  }
}
.li-volume {
  margin-bottom: 8px;
  @include clearfix();
}
.li-setting {
  font-size: 12px;
  padding-left: 28%;
}
.currency-volume,
.product-volume {
  overflow: hidden;
}
.avbl {
  color: white;
  text-align: right;
  font-size: 12px;
  line-height: 17px;
  height: 34px;
  .avbl-label {
    line-height: 17px;
    height: 17px;
  }
}
.li-mb {
  margin-bottom: 10px;
}
.volume-sets {
  padding: 7px 0;
  position: relative;
  box-sizing: border-box;
  @include clearfix();
}
.volume-set {
  float: left;
  width: 25%;
  height: 18px;
  line-height: 18px;
  text-align: center;
  box-sizing: border-box;
  border-left: 1px solid rgba(255,255,255, .5);
  border-top: 1px solid rgba(255,255,255, .5);
  border-bottom: 1px solid rgba(255,255,255, .5);
  @include a() {
    color: rgba(255,255,255, .5);
  }
  &:hover {
    color: rgba(255,255,255, .8);
  }
  &:last-child {
    border-right: 1px solid rgba(255,255,255, .5);
  }
  span {
    height: 16px;
    line-height: 16px;
    display: inline-block;
    vertical-align: top;
    transform: scale(.8);
  }
}
.checkbox {
  color: white;
  &.left {
    margin-right: 12px;
    float: left;
  }
  &.right {
    text-align: right;
    float: right;
  }
}
.point-btn {
  width: 24px;
  height: 12px;
  position: absolute;
  left: 0;
  text-align: center;
  z-index: 1;
  i {
    width: 6px;
    border-radius: 3px;
    height: 6px;
    opacity: .6;
  }
  &:hover {
    i {
      opacity: .9;
    }
  }
}
.buy-all {
  bottom: 2px;
  i {
    margin-top: 2px;
    background-color: $buy;
  }
}
.sell-all {
  top: 2px;
  i {
    margin-top: 4px;
    background-color: $sell;
  }
}
</style>
