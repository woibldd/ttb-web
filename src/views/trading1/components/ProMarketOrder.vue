<template>
  <div class="ix-trade-op market-order">
    <div v-if="pairInfo">
      <ul
        class="ul buy-ul"
        v-if="+side===1">
        <li class="li-price mb-14">
          <div class="label">{{ $t('price') }}</div>
          <div class="content">
            <currency-input
              class="trade"
              :disabled="true"
              :placeholder="$t('market_ph')"
              :currency="state.pro.currency_name"/>
          </div>
        </li>
        <li class="li-amount mb-14">
          <div class="label">{{ $t('order_value') }}</div>
          <div class="content">
            <currency-input
              class="trade"
              :class="[input.buy_amount.status]"
              v-model="buy_amount"
              :currency="state.pro.currency_name"
              :scale="pairInfo.price_scale"/>
          </div>
        </li>
        <li class="li-volume mb-14">
          <div class="half-wrap left">
            <div class="currency-volume">
              <div class="ix-slider"  v-if="tabActive"> 
                <ix-slider
                  :disabled="!currencyAvailable"
                  ref="sliderBuy"
                  @input="onSliderDragEnd($event, 'buy')"
                  height="4"
                  width="5"
                  side="buy"
                  :skin="state.skin"
                  :dot-size="14"
                  :lazy="true"
                  :min="0"
                  :max="100"
                  :piecewise-label="true"
                  :interval="1"
                  :piecewise="false" 
                  :value='buy_slide'>
                  <template
                    slot="label"
                    slot-scope="{ label, active }">
                    <span 
                      :skin="state.skin"
                      :class="['custom-label', 'buy', { active }]"
                      v-if="label % 25 === 0"/>
                    <!-- <span
                      v-if="label % 25 === 0"
                      class="vue-slider-piecewise-label" >
                      {{ label }} 
                    </span> -->
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
          </div>
        </li>
        <li class="li-volume mb-10"> 
          <div class="avbl">
            <div class="avbl-label">{{ $t('avlb') }} {{ state.pro.currency_name }}</div> :
            <div
              class="avbl-value"
              v-if="currency">{{ currency.available | fixed(pairInfo.currency_scale) }}</div>
            <div
              class="avbl-value"
              v-else>...</div>
          </div> 
        </li>
        <li class="li-submit">
          <div class="half-wrap left">
            <v-btn
              :label="$t('operate_buy', {coin: state.pro.product_name})"
              class="submit-btn"
              radius="4"
              color="ixbuy"
              height="44"
              :loading="submitting === 'BUY'"
              @click="submit('BUY')"/>
          </div>
        </li>
      </ul> 
      <!-- ?????? -->
      <ul
        class="ul buy-ul"
        v-else>
        <li class="li-price mb-14">
          <div class="label">{{ $t('price') }}</div>
          <div class="content">
            <currency-input
              class="trade"
              :disabled="true"
              :placeholder="$t('market_ph')"
              :currency="state.pro.currency_name"/>
          </div>
        </li>
        <li class="li-amount mb-14">
          <div class="label">{{ $t('amount') }}</div>
          <div class="content">
            <currency-input
              class="trade"
              :class="[input.sell_amount.status]"
              v-model="sell_amount"
              :currency="state.pro.product_name"
              :scale="pairInfo.amount_scale"/>
          </div>
        </li>
        <li class="li-volume mb-14">
          <div class="half-wrap right">
            <div class="product-volume"> 
              <div class="ix-slider" v-if="tabActive"> 
                <ix-slider
                  :disabled="!currencyAvailable"
                  ref="sliderSell"
                  @input="onSliderDragEnd($event, 'sell')"
                  side="sell"
                  :skin="state.skin"
                  :height="4"
                  :dot-size="14"
                  :lazy="true"
                  :min="0"
                  :max="100"
                  :piecewise-label="true"
                  :interval="1"
                  :piecewise="false"
                  :value='sell_slide'>
                  <template
                    slot="label"
                    slot-scope="{ label, active }">
                    <span
                      :skin="state.skin"
                      :class="['custom-label', 'sell', { active }]"
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
          </div>
        </li> 
        <li class="li-volume mb-10"> 
          <div class="avbl">
            <div class="avbl-label">{{ $t('avlb') }} {{ pairInfo.product_name }}</div> :
            <div
              class="avbl-value"
              v-if="product">{{ product.available | fixed(pairInfo.product_scale) }}</div>
            <div
              class="avbl-value"
              v-else>...</div>
          </div> 
        </li>
        <li class="li-submit">
          <div class="half-wrap right">
            <v-btn
              :label="$t('operate_sell', {coin: state.pro.product_name})"
              class="submit-btn"
              radius="4"
              color="ixsell"
              height="44"
              :loading="submitting === 'SELL'"
              @click="submit('SELL')"/>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {state} from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'
import _ from 'lodash'
import ixSlider from '@/components/common/ix-slider/'

export default {
  name: 'ProMarketOrder',
  data () {
    return {
      state,
      tabActive: false,
      sell_amount: '',
      buy_amount: '',
      buy_price: '',
      sell_price: '',
      input: {
        buy_amount: {
          timer: null,
          status: ''
        },
        buy_price: {
          timer: null,
          status: ''
        },
        sell_amount: {
          timer: null,
          status: ''
        },
        sell_price: {
          timer: null,
          status: ''
        }
      },
      buyTip: {
        classes: ['ix-popover'],
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
        classes: ['ix-popover'],
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
      hidden: false,
      buy_slide: 0,
      sell_slide: 0
    }
  },
  computed: {
    side () {
      return this.state.pro.side
    },
    currency () {
      return this.state.pro.currency
    },
    product () {
      return this.state.pro.product
    },
    pairInfo () {
      return this.state.pro.pairInfo
    },
    currencyAvailable () {
      return this.currency && !!this.currency.available
    },
    productAvailable () {
      return this.product && !!this.product.available
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
    }, 
    buy_amount() {
      this.calcProportion ('buy')
    },
    sell_amount() {
      this.calcProportion ('sell')
    }
  },
  methods: {
    calcProportion (type) {   
      if (type === 'buy') {
        if (!this.$refs.sliderBuy) return
        const $ask = this.$big(this.state.pro.ask || 0)
        if (!$ask || !this.pairInfo) { 
          this.$refs.sliderBuy.setValue(0)
          return
        }  
        if (this.buy_amount) {
          let ratio = this.$big(this.buy_amount) 
            .div(this.currency.available)
            .times(100)
            .round(2, this.C.ROUND_DOWN)
          this.$refs.sliderBuy.setValue(+ratio, true, 0.5, true) 
        }
      } else {
        if (!this.$refs.sliderSell) return
        const $bid = this.$big(this.state.pro.bid || 0)
        if (!$bid || !this.pairInfo) {
          this.$refs.sliderSell.setValue(0)
          return
        }
        if (this.sell_amount) {
          let ratio = this.$big(this.sell_amount)
            // .times($bid)
            .div(this.product.available)
            .times(100)
            .round(2, this.C.ROUND_DOWN)
          // this.postOnly = true
          this.$refs.sliderSell.setValue(+ratio, true, 0.5, true)
        }
      }
    }, 
    clear () {
      this.buy_amount = ''
      this.buy_price = ''
      this.sell_amount = ''
      this.sell_price = '' 
    },
    set ({price, amount, side}) {
      if (!side) {
        side = 'BUY'
      }
      if (price) {  
        this.setValues('price', side, this.$big(price).toString())
      }
      if (amount) {
        this.setValues('amount', side, this.$big(amount).toString())
      }
    },
    setBuyVolumn (ratio) { 
      this.buy_amount = this.$big(this.currency.available)
        .mul(ratio)
        .round(this.pairInfo.amount_scale, this.C.ROUND_DOWN)
        .toString()
    },
    setSellVolumn (ratio) { 
      this.sell_amount = this.$big(this.product.available)
        .mul(ratio)
        .round(this.pairInfo.amount_scale, this.C.ROUND_DOWN)
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
    getFiled (field, type) {
      return type.toLowerCase() + '_' + field
    },
    getValues (field, type) {
      return this[this.getFiled(field, type)]
    },
    setValues (field, type, value) {
      this[type.toLowerCase() + '_' + field] = value
    },
    async submit (side) {
      if (!this.currency || !this.currency.available) {
        return false
      }
      if (!this.product || !this.product.available) {
        return false
      }
      if (this.submitting) {
        return false
      }
      const $amount = this.$big(this.getValues('amount', side) || 0)
      const $bid = this.$big(this.state.pro.bid || 0)
      const $ask = this.$big(this.state.pro.ask || 0)
      if (!$amount.gt(0)) {
        return this.setInputStatus(this.getFiled('amount', side), 'error')
      }
      if (side === 'SELL' && $amount.gt(this.product.available)) {
        return utils.alert(this.$i18n.t('amount_over'))
      }
      if (side === 'BUY' && $amount.gt(this.currency.available)) {
        return utils.alert(this.$i18n.t('amount_over'))
      }
      // if ($amount.lt(this.pairInfo.min_amount)) {
      //   return utils.alert(this.$i18n.t('amount_low', {num: this.pairInfo.min_amount + ' ' + this.pairInfo.product_name}))
      // }
      // if ($amount.gt(this.pairInfo.max_amount)) {
      //   return utils.alert(this.$i18n.t('amount_high', {num: this.pairInfo.max_amount + ' ' + this.pairInfo.product_name}))
      // }
      //   if ($bid.gt(0) && $ask.gt(0) && $bid.mul(1.05).lt($ask)) {
      //     // ?????????????????????????????????????????????
      //     const ok = await utils.confirm({
      //       trade: true,
      //       content: this.$i18n.t('spread_too_big', {per: 5}),
      //       title: this.$i18n.t('confirm_your_order')
      //     })
      //     if (!ok) {
      //       return false
      //     }
      //   }
      this.submitting = side
      const order = {
        type: 2,
        side: side === 'SELL' ? 2 : 1,
        price: 0,
        amount: 0,
        locked: $amount.toString(),
        symbol: this.state.pro.pair
      }

      // if (side === 'BUY') {
      // order.locked = order.amount
      // order.amount = 0
      // delete order.amount
      // }
      const res = await service.createOrder(order)
      this.submitting = false
      if (res.code > 0) {
        return utils.alert(res.message)
      }

      this.setValues('amount', side, '')

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
        utils.success(this.$t('tj_cg'))
      }
    },
    onSliderDragEnd (value, dir) {
      value = value / 100.0
      if (dir === 'buy') {
        this.setBuyVolumn(value)
      } else {
        this.setSellVolumn(value)
      }
    },
    refreshBalance () {  
      if (this.$refs.sliderBuy)
        this.$refs.sliderBuy.setValue(0)
      if (this.$refs.sliderSell)
        this.$refs.sliderSell.setValue(0)
    }
  },
  components: {
    ixSlider
  },
  created () {
    this.$eh.$on('protrade:exchange:set', this.set)
    this.$eh.$on('order:tab_switch', (tab) => {
      this.tabActive = tab === 'market'
    })
    this.$eh.$on('protrade:balance:refresh', this.refreshBalance)
  }
}
</script>

<style lang="scss" scoped>

.ix-trade-op {
  // display: flex;
}
.half-wrap {
  float: left;
  width: 100%;
  box-sizing: border-box;
}
.submit-btn {
  box-sizing: border-box;
}
.ul {
  margin: 0 14px;
  flex: 1;
  li {
    @include clearfix();
  }
  .label {
    color: #788694;
    // float: left;
    font-size: 14px;
    box-sizing: border-box;
    min-height: 20px;
  }
  .content {
    position: relative;
    // width: 84%;
    // float: left;
    box-sizing: border-box;
  }
}
.li-amount,
.li-price {
  margin-bottom: 9px;
  .label {
    line-height: 32px;
    color: #666666;
    width: 16%
  }
}
[skin="dark"] {
  .li-amount,
  .li-price {
    .label { 
      color: #ACACAC; 
    }
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
  // overflow: hidden;
}
.avbl {
  color: $nav-grey-color;
  text-align: left;
  font-size: 14px;
  line-height: 16px;
  height: 31px;
  .avbl-label {
    line-height: 17px;
    height: 17px;
    display: inline;
  }
  .avbl-value {
    display: inline;
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
.ix-slider {
  padding: 7px 0px;
  // margin-right: 20px;
  position: relative;
  box-sizing: border-box;
  @include clearfix();
}
.custom-label {
  position: absolute;
  bottom: -15px;
  left: 0;
  transform: translate(-50%, -12px);
  margin-left: 3px;
  width:10px;
  height:10px;
  // background:$slider-label;
  background: $slider-label;
  border:2px solid $slider-border;
  &[skin~="dark"] {
    background-color: $slider-label2;
    border-color: $slider-border2; 
  }
  border-radius:50%;
  box-sizing: border-box;
  cursor: pointer;
  z-index: 4;
}
.custom-tooltip {
  position: absolute;
  bottom: -39px;
  left: -7px;
  color: #788694;
}
.custom-label.active {
  // background-color: $primary; 
  border-color: $primary; 
  font-weight: bold;
  &.buy {
    border-color: $--color-success;
  }
  &.sell {
    border-color: $--color-danger;
  }
}
.custom-label.active::after {
  background-color: $primary;
  width: 2px;
} 
</style>
