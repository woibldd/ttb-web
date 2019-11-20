<template>
  <div class="ix-trade-op pt-14 limit-order">
    <ul
      class="ul buy-ul"
      v-if="pairInfo">
      <li class="li-price">
        <div class="label">{{ $t('trading_page.stop_order.trigger_price') }}</div>
        <div class="content">
          <currency-input
            class="trade"
            v-model="buy_trigger_price"
            :class="[input.buy_trigger_price.status]"
            :bid="state.pro.bid"
            :ask="state.pro.ask"
            :currency="pairInfo.currency_name"
            :scale="pairInfo.price_scale"/>
          <div class="estimate">
            ≈ {{ state.fiatMoneySymbol }} <fiat-money
              :base="state.pro.currency_name"
              :value="buy_trigger_price" />
          </div>
        </div>
      </li>
      <li class="li-price">
        <div class="label">{{ $t('trading_page.stop_order.order_price') }}</div>
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
      <!-- <li class="li-worth mb-6">
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
      </li> -->
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
            <!-- <div class="ix-slider">
              <ix-slider
                ref="sliderBuy"
                :disabled="!currencyAvailable"
                @input="onSliderDragEnd($event, 'buy')"
                height="4"
                width="200"
                :dot-size="15"
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
            </div> -->
          </div>
        </div>
      </li>
      <li class="li-submit mt-24">
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
        <div class="label">{{ $t('trading_page.stop_order.trigger_price') }}</div>
        <div class="content">
          <currency-input
            class="trade"
            v-model="sell_trigger_price"
            :class="[input.sell_trigger_price.status]"
            :bid="state.pro.bid"
            :ask="state.pro.ask"
            :currency="pairInfo.currency_name"
            :scale="pairInfo.price_scale"/>
          <div class="estimate">
            ≈ {{ state.fiatMoneySymbol }}
            <fiat-money
              :base="state.pro.currency_name"
              :value="sell_trigger_price" />
          </div>
        </div>
      </li>
      <li class="li-price">
        <div class="label">{{ $t('trading_page.stop_order.order_price') }}</div>
        <div class="content">
          <currency-input
            class="trade"
            v-model="sell_price"
            :class="[input.sell_price.status]"
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
            <!-- <div class="ix-slider">
              <ix-slider
                ref="sliderSell"
                :disabled="!currencyAvailable"
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
            </div> -->
          </div>
        </div>
      </li>
      <li class="li-submit mt-24">
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
import _ from 'lodash'
import ixSlider from '@/components/common/ix-slider/'
export default {
  name: 'ProStopOrder',
  data () {
    return {
      state,
      tabActive: false,
      buy_amount: '',
      buy_price: '',
      buy_trigger_price: '',
      sell_amount: '',
      sell_price: '',
      sell_trigger_price: '',
      input: {
        buy_amount: {
          timer: null,
          status: ''
        },
        buy_price: {
          timer: null,
          status: ''
        },
        buy_trigger_price: {
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
        },
        sell_trigger_price: {
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
    }
  },
  methods: {
    clear () {
      this.buy_amount = ''
      this.buy_price = ''
      this.sell_amount = ''
      this.sell_price = ''
      this.buy_trigger_price = ''
      this.sell_trigger_price = ''
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
        .round(this.pairInfo.amount_scale)
        .toString()
    },
    setSellVolumn (ratio) {
      this.sell_amount = this.$big(this.product.available)
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
      const $$price = this.getValues('price', side)
      const $price = this.$big($$price || 0)
      const $$triggerPrice = this.getValues('trigger_price', side)
      const $triggerPrice = this.$big($$triggerPrice || 0)

      if (!$amount.gt(0)) {
        return this.setInputStatus(this.getFiled('amount', side), 'error')
      }
      // if (side === 'SELL' && $amount.gt(this.product.available)) {
      //   return utils.alert(this.$i18n.t('amount_over'))
      // }
      // if (side === 'BUY' && $amount.gt(this.currency.available)) {
      //   return utils.alert(this.$i18n.t('amount_over'))
      // }
      if (!$price.gt(0)) {
        return this.setInputStatus(this.getFiled('price', side), 'error')
      }
      if (!$triggerPrice.gt(0)) {
        return this.setInputStatus(this.getFiled('trigger_price', side), 'error')
      }

      // 当价格上涨或高于%{price}%{symbol}时，则以%{amount}%{symbol}的 价格卖出%{qty}%{product}。
      let message = this.$t('trading_page.stop_order.message_h')
      // let message2 = '当价格下跌或低于9000USDT时，则以1USDT的 价格卖出0.00000011BTC。'
      let diff = $triggerPrice.minus(this.state.pro.pairTick.current)

      console.log({t: this.state.pro.currency})
      if (diff.gte(0)) {
        message = this.$t('trading_page.stop_order.message_h',
          {
            price: $price,
            amount: $amount,
            triggerPrice: $triggerPrice,
            symbol: this.currency.currency,
            product: this.product.currency,
            side: side === 'SELL' ? this.$t('sell') : this.$t('buy')
          })
      } else {
        message = this.$t('trading_page.stop_order.message_l',
          {
            price: $price,
            amount: $amount,
            triggerPrice: $triggerPrice,
            symbol: this.state.pro.currency.currency,
            product: this.state.pro.product.currency,
            side: side === 'SELL' ? this.$t('sell') : this.$t('buy')
          })
      }

      const ok = await utils.confirm(this, {
        customClass: 'ix-message-box-wrapper',
        // confirmBtnText: confirmText,
        confirmButtonClass: 'btn--confirm',
        cancelButtonClass: 'btn--cancel',
        message
      })

      if (!ok) {
        // this.clearWarehouseLoading = false
        return
      }

      this.submitting = side
      const order = {
        type: 3,
        side: side === 'SELL' ? 2 : 1,
        price: $price,
        amount: $amount,
        symbol: this.state.pro.pair,
        trigger_price: $triggerPrice,
        trigger_type: 1
      }

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
    },
    refreshBalance () {
      // this.$refs.sliderBuy.setValue(0)
      // this.$refs.sliderSell.setValue(0)
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
    width: 70%;
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
    width: 30%;
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
  bottom: -39px;
  left: -7px;
  font-size: 10px;
  color: #A5B4C5;
}
.custom-label.active {
  background-color: #C9AA6D;
  font-weight: bold;
}
.custom-label.active::after {
  background-color: #C9AA6D;
  width: 2px;
}
</style>
