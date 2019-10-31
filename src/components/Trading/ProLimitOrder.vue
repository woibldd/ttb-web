<template>
  <div class="ix-trade-op pt-14 limit-order">
    <ul
      class="ul buy-ul"
      v-if="pairInfo">
      <li class="li-price">
        <div class="label">{{ $t('price') }}</div>
        <div class="content">
          <currency-input
            class="trade"
            v-model="buy_price"
            :class="[input.buy_price.status]"
            :bid="state.pro.bid"
            :ask="state.pro.ask"
            :currency="pairInfo.currency_name"
            :scale="pairInfo.price_scale"/>
          <div class="estimate">
            ≈ {{ state.fiatMoneySymbol }} <fiat-money
              :base="state.pro.currency_name"
              :value="buy_price" />
          </div>
        </div>
      </li>
      <li class="li-amount mb-12">
        <div class="label">{{ $t('amount') }}</div>
        <div class="content">
          <currency-input
            class="trade"
            v-model="buy_amount"
            :class="[input.buy_amount.status]"
            :currency="pairInfo.product_name"
            :scale="pairInfo.amount_scale"/>
        </div>
      </li>
      <li class="li-worth mb-6">
        <div class="label">{{ $t('order_value') }}</div>
        <div class="content">
          <currency-input
            class="trade"
            @blur="worthBlur('buy')"
            @focus="worthFocus('buy')"
            v-model="buy_worth"
            :currency="pairInfo.currency_name"
            :step-scale="pairInfo.currency_scale"
            :scale="pairInfo.amount_scale + pairInfo.price_scale"/>
        </div>
      </li>
      <li class="li-volume mb-2">
        <div class="half-wrap left">
          <div class="currency-volume">
            <div class="avbl mb-2">
              <div class="avbl-label">{{ $t('avlb') }} {{ pairInfo.currency_name }}</div>:
              <div
                class="avbl-value"
                v-if="currency">{{ currency.available | fixed(pairInfo.currency_scale) }}</div>
              <div
                class="avbl-value"
                v-else>...</div>
            </div>
            <div class="ix-slider" sytle="width: 100%;">
              <ix-slider 
                ref="sliderBuy"
                :disabled="!currencyAvailable"
                @input="onSliderDragEnd($event, 'buy')"
                :height="4" 
                :dot-size="14"
                :lazy="true"
                :value="buy_percent"
                :min="0"
                :max="100"
                :piecewise-label="true"
                :interval="1" 
                :piecewise="false">
                <template
                  slot="label"
                  slot-scope="{ label, active }">
                  <span
                    :class="['custom-label', { active }]"
                    v-if="label % 25 === 0"/>
                  <span
                    v-if="label % 25 === 0"
                    class="vue-slider-piecewise-label" >
                    {{ label }}
                    </span>
                </template>
                <template
                  slot="tooltip"
                  slot-scope="tooltip">
                  <div class="custom-tooltip">
                    {{ tooltip.value }}%
                  </div>
                </template>
              </ix-slider>
              <!-- <a class="volume-set" @click.prevent="setBuyVolumn(.25)"><span>25%</span></a>
              <a class="volume-set" @click.prevent="setBuyVolumn(.5)"><span>50%</span></a>
              <a class="volume-set" @click.prevent="setBuyVolumn(.75)"><span>75%</span></a>
              <a class="volume-set" @click.prevent="setBuyVolumn(1)"><span>100%</span></a> -->
            </div>
          </div>
        </div>
      </li>
      <li class="li-submit">
        <div class="half-wrap left">
          <v-btn
            :label="$t('operate_buy', {coin: pairInfo.product_name})"
            :disabled="!state.pro.isActivity"
            class="submit-btn"
            radius="4"
            color="ixbuy"
            width="100%"
            height="44"
            :loading="submitting === 'BUY'"
            @click="submit('BUY')"/>
        </div>
      </li>
    </ul>
    <!-- 埋单 -->
    <ul
      class="ul sell-ul"
      v-if="pairInfo">
      <li class="li-price">
        <div class="label">{{ $t('price') }}</div>
        <div class="content">
          <currency-input
            class="trade"
            v-model="sell_price"
            :class="[input.buy_price.status]"
            :bid="state.pro.bid"
            :ask="state.pro.ask"
            :currency="pairInfo.currency_name"
            :scale="pairInfo.price_scale"/>
          <div class="estimate">
            ≈ {{ state.fiatMoneySymbol }} <fiat-money
              :base="state.pro.currency_name"
              :value="sell_price" />
          </div>
        </div>
      </li>
      <li class="li-amount mb-12">
        <div class="label">{{ $t('amount') }}</div>
        <div class="content">
          <currency-input
            class="trade"
            v-model="sell_amount"
            :class="[input.sell_amount.status]"
            :currency="pairInfo.product_name"
            :scale="pairInfo.amount_scale"/>
        </div>
      </li>
      <li class="li-worth mb-6">
        <div class="label">{{ $t('order_value') }}</div>
        <div class="content">
          <currency-input
            class="trade"
            @blur="worthBlur('sell')"
            @focus="worthFocus('sell')"
            v-model="sell_worth"
            :currency="pairInfo.currency_name"
            :step-scale="pairInfo.currency_scale"
            :scale="pairInfo.amount_scale + pairInfo.price_scale"/>
        </div>
      </li>
      <li class="li-volume mb-2">
        <div class="half-wrap right">
          <div class="product-volume">
            <div class="avbl mb-2">
              <div class="avbl-label">{{ $t('avlb') }} {{ pairInfo.product_name }}</div>:
              <div
                class="avbl-value"
                v-if="product">{{ product.available | fixed(pairInfo.product_scale) }}</div>
              <div
                class="avbl-value"
                v-else>...</div>
            </div>
            <div class="ix-slider">
              <ix-slider
                :disabled="!currencyAvailable"
                ref="sliderSell"
                @input="onSliderDragEnd($event, 'sell')"
                height="4"
                :dot-size="14"
                :lazy="true"
                :min="0"
                :max="100"
                :piecewise-label="true"
                :interval="1"
                :piecewise="false">
                <template
                  slot="label"
                  slot-scope="{ label, active }">
                  <span
                    :class="['custom-label', { active }]"
                    v-if="label % 25 === 0"/>
                  <span
                    v-if="label % 25 === 0"
                    class="vue-slider-piecewise-label" >
                    {{ label }}
                  </span>
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
      <li class="li-submit">
        <div class="half-wrap right">
          <v-btn
            :label="$t('operate_sell', {coin: pairInfo.product_name})"
            :disabled="!state.pro.isActivity"
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
</template>

<script>
import {state} from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'
import ixSlider from '@/components/common/ix-slider/'

export default {
  name: 'ProLimitOrder',
  props: {
    type: {
      type: String,
      default: 'limit'
    }
  },
  data () {
    return {
      state,
      buy_amount: '',
      buy_price: '',
      buy_worth: '',
      sell_amount: '',
      sell_price: '',
      sell_worth: '',
      buy_percent: '0',
      sell_percent: '0',
      worthLock: false,
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
      postOnlyTip: {
        classes: ['ix-popover'],
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
          return utils.$i18n.t('post_only_tip')
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
    worthOver () {
      return this.currency && this.$big(this.worth || 0).gt(this.currency.available)
    },
    pairInfo () {
      return this.state.pro.pairInfo
    },
    currencyAvailable () {
      return this.currency && this.currency.available > 0
    },
    productAvailable () {
      return this.product && !!this.product.available > 0
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
    buy_amount (newval) {
      this.calcWorth('buy')
    },
    buy_price (val) {
      // console.log('buy_price_' + val)
      this.calcWorth('buy')
    },
    buy_worth () {
      this.calcAmount('buy')
    },
    sell_amount () {
      this.calcWorth('sell')
    },
    sell_price () {
      this.calcWorth('sell')
    },
    sell_worth () {
      this.calcAmount('sell')
    },
    // currencyAvailable: {
    //   async handler (val) {
    //     console.log('valvalvalvalvalvalvalvalvalvalvalval')
    //     this.buy_percent = 0
    //     this.sell_percent = 0
    //   },
    //   immediate: true
    // }
  },
  methods: {
    clear () {
      this.buy_amount = ''
      this.buy_price = ''
      this.buy_worth = ''
      this.sell_amount = ''
      this.sell_price = ''
      this.sell_worth = ''
    },
    worthFocus (type) {
      this.worthLock = true 
    },
    worthBlur (type) {
      this.worthLock = false
      this.calcAmount(type)
      this.calcWorth(type)
    },
    calcWorth (type) {
      if (this.worthLock) {
        return
      }
      if (type === 'buy') {
        if (!this.buy_amount || !this.buy_price) {
          this.buy_worth = ''
          return
        }
        this.buy_worth = this.$big(this.buy_amount).mul(this.buy_price).toString()
      } else if (type === 'sell') {
        if (!this.sell_amount || !this.sell_price) {
          this.sell_worth = ''
          return
        }
        this.sell_worth = this.$big(this.sell_amount).mul(this.sell_price).toString()
      }
    },
    calcAmount (type) {
      if (type === 'buy') {
        if (!this.buy_worth || !this.buy_price || !this.pairInfo) {
          this.buy_amount = ''
          return
        }
        if (this.$big(this.buy_price).lte(0)) {
          return
        }
        this.buy_amount = this.$big(this.buy_worth).div(this.buy_price).round(this.pairInfo.amount_scale).toString()
      } else {
        if (!this.sell_worth || !this.sell_price || !this.pairInfo) {
          this.sell_amount = ''
          return
        }
        if (this.$big(this.sell_price).lte(0)) {
          return
        }
        this.sell_amount = this.$big(this.sell_worth).div(this.sell_price).round(this.pairInfo.amount_scale).toString()
      }
    },
    set ({price, amount, dontOveride, side}) {
      if (!side) {
        this.set({
          price,
          amount,
          dontOveride,
          side: 'BUY'
        })
        this.set({
          price,
          amount,
          dontOveride,
          side: 'SELL'
        })
        return
      }
      if (price) {
        if (!dontOveride || (dontOveride && !this.getValues('price', side))) {
          this.setValues('price', 'BUY', this.$big(price).toString())
          this.setValues('price', 'SELL', this.$big(price).toString())
        }
      }
      if (amount) {
        if (!dontOveride || (dontOveride && !this.getValues('amount', side))) {
          this.setValues('amount', 'BUY', this.$big(amount).toString())
          this.setValues('amount', 'SELL', this.$big(amount).toString())
        }
      }
    },
    setBuyVolumn (ratio) {
      if (!this.currency) return
      if (this.buy_price && this.buy_price !== '0') {
        this.buy_amount = this.$big(this.currency.available)
          .mul(ratio)
          .div(this.buy_price)
          .round(this.pairInfo.amount_scale, this.C.ROUND_DOWN)
          .toString()
      } else {
        this.setInputStatus('buy_price', 'error')
      }
    },
    setSellVolumn (ratio) {
      if (!this.product) return
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

      const $$price = this.getValues('price', side)
      const $price = this.$big($$price || 0)

      const $amount = this.$big(this.getValues('amount', side) || 0)
      const $bid = this.$big(this.state.pro.bid || 0)
      const $ask = this.$big(this.state.pro.ask || 0)
      const $value = $price.mul($amount)
      if (!$price.gt(0)) {
        return this.setInputStatus(this.getFiled('price', side), 'error')
      }
      if (!$amount.gt(0)) {
        return this.setInputStatus(this.getFiled('amount', side), 'error')
      }
      if (side === 'BUY' && $value.gt(this.currency.available)) {
        return utils.alert(this.$i18n.t('amount_over'))
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
      if ($value.lt(this.pairInfo.min_total)) {
        return utils.alert(this.$i18n.t('value_low', {num: this.pairInfo.min_total + ' ' + this.pairInfo.currency_name}))
      }
      if ($value.gt(this.pairInfo.max_total)) {
        return utils.alert(this.$i18n.t('value_high', {num: this.pairInfo.max_total + ' ' + this.pairInfo.currency_name}))
      }
      // if (side === 'BUY' && $ask.gt(0) && $price.div(1.3).gt($ask)) {
      //   return utils.alert(this.$i18n.t('price_high', {per: 30}))
      // }
      // if (side === 'SELL' && $bid.gt(0) && $price.div(0.7).lt($bid)) {
      //   return utils.alert(this.$i18n.t('price_low', {per: 30}))
      // }
      // if ($bid.gt(0) && $ask.gt(0) && $bid.mul(1.05).lt($ask) &&
      //     ((side === 'SELL' && $price.lte($bid)) || (side === 'BUY' && $price.gte($ask)))) {
      //   // 盘口差价较大，且下单价超过盘口
      //   const ok = await utils.confirm(this, {
      //     trade: true,
      //     content: this.$i18n.t('spread_too_big', {per: 5}),
      //     title: this.$i18n.t('confirm_your_order')
      //   })
      //   if (!ok) {
      //     return false
      //   }
      // } else
      if (side === 'BUY' && $ask.gt(0) && $price.div(1.05).gt($ask)) {
        const ok = await utils.confirm(this, {
          trade: true,
          content: this.$i18n.t('price_little_high', {per: 5}),
          title: this.$i18n.t('confirm_your_order')
        })
        if (!ok) {
          return false
        }
      } else if (side === 'SELL' && $bid.gt(0) && $price.div(0.95).lt($bid)) {
        const ok = await utils.confirm(this, {
          trade: true,
          content: this.$i18n.t('price_little_low', {per: 5}),
          title: this.$i18n.t('confirm_your_order')
        })
        if (!ok) {
          return false
        }
      }
      this.submitting = side
      const order = {
        type: 1,
        side: side === 'SELL' ? 2 : 1,
        price: $price.toString(),
        amount: $amount.toString(),
        symbol: this.state.pro.pair
      }
      console.log($price.toFixed(this.pairInfo.price_scale))
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
      }
    },
    onSliderDragEnd (value, dir) {
      value = value / 100.0
      if (dir === 'buy') {
        this.setBuyVolumn(value)
      } else {
        this.setSellVolumn(value)
      }
      // console.log(value)
    }, 
    refreshBalance () {  
      this.$refs.sliderBuy.setValue(0)
      this.$refs.sliderSell.setValue(0)
    }
  },
  components: {
    ixSlider
  },
  created () {
    this.$eh.$on('protrade:exchange:set', this.set) 
    this.$eh.$on('protrade:balance:refresh', this.refreshBalance)
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
.ix-trade-op {
  display: flex;
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
    color: #A5B4C5;
    float: left;
    box-sizing: border-box;
    min-height: 20px;
  }
  .content {
    position: relative;
    width: 84%;
    float: left;
    box-sizing: border-box;
    .estimate {
      text-align: right;
      color: #A5B4C5;
      font-size: 12px;
    }
  }
}
.li-amount,
.li-price,
.li-worth {
  .label {
    line-height: 32px;
    color: #A5B4C5;
    width: 16%;
  }
}
.li-volume {
  margin-bottom: 8px;
  @include clearfix();
}
/*
.li-worth {
  font-size: 12px;
  padding-left: 28%;
  .label {
    color: #788694;
    line-height: 19px;
  }
  .content {
    text-align: right;
    line-height: 19px;
    color: #E1E0EA;
  }
}
*/
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
  line-height: 16px;
  height: 16px;
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
  }
}
.sell-all {
  top: 2px;
  i {
    margin-top: 4px;
  }
}
.ix-slider {
  padding: 0;
  // margin-right: 30px;
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
  background:#fff;
  border-radius:50%;
  cursor: pointer;
}
.custom-tooltip {
  position: absolute;
  bottom: -38px;
  left: -7px;
  font-size: 10px;
  color: #A5B4C5;
}
.custom-label.active {
  background-color: $primary;
  font-weight: bold;
}
.custom-label.active::after {
  background-color: $primary;
  width: 2px;
}
</style>
