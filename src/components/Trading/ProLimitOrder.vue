<template>
  <div class="ix-trade-op pt-14 limit-order">
    <ul class="ul buy-ul" v-if="pairInfo">
      <li class="li-price mb-10">
        <div class="label">{{ $t('price') }}</div>
        <div class="content">
          <currency-input class="pro"
            v-model="price"
            :class="[input.price.status]"
            :bid="state.pro.bid"
            :ask="state.pro.ask"
            :currency="pairInfo.currency_name"
            :scale="pairInfo.price_scale">
          </currency-input>
        </div>
      </li>
      <li class="li-amount mb-10">
        <div class="label">{{ $t('amount') }}</div>
        <div class="content">
          <currency-input class="pro"
            v-model="amount"
            :class="[input.amount.status]"
            :currency="pairInfo.product_name"
            :scale="pairInfo.amount_scale">
          </currency-input>
          <!-- <div class="btn point-btn buy-all"
            v-tooltip.left="buyTip"
            @click="setBuyVolumn(1)">
            <i class="ibt theme-bgcolor-up"></i>
          </div>
          <div class="btn point-btn sell-all"
            v-tooltip.left="sellTip"
            @click="setSellVolumn(1)">
            <i class="ibt theme-bgcolor-down"></i>
          </div> -->
        </div>
      </li>
      <li class="li-worth mb-10">
        <div class="label">{{ $t('order_value') }}</div>
        <div class="content">
          <currency-input class="pro"
            @blur="worthBlur"
            @focus="worthFocus"
            v-model="worth"
            :currency="pairInfo.currency_name"
            :step-scale="pairInfo.currency_scale"
            :scale="pairInfo.amount_scale + pairInfo.price_scale">
          </currency-input>
        </div>
      </li>
      <!--
      <li class="li-worth mb-10">
        <div class="label">{{ $t('order_value') }}</div>
        <div class="content">{{ worth }} {{ pairInfo.currency_name }}</div>
      </li>
      -->
      
      <li class="li-volume mb-10">
        <div class="half-wrap left">
          <div class="currency-volume">
            <div class="avbl">
              <div class="avbl-label">{{ $t('avlb') }} {{ pairInfo.currency_name }}</div>
              <div class="avbl-value" v-if="currency">{{ currency.available | fixed(pairInfo.currency_scale) }}</div>
              <div class="avbl-value" v-else>----</div>
            </div>
            <div class="ix-slider">
              <ix-slider @input="onSliderDragEnd($event, 'buy')" height="4" :dot-size="14" :lazy="true" :min="0" :max="100" :piecewiseLabel="true" :interval="1" :piecewise="false">
                <template slot="label" slot-scope="{ label, active }">
                  <span :class="['custom-label', { active }]" v-if="label % 25 === 0">
                  </span>
                </template>
                <template slot="tooltip" slot-scope="tooltip">
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
        <!-- <div class="half-wrap right">
          <div class="product-volume">
            <div class="avbl">
              <div class="avbl-label">{{ $t('avlb') }} {{ pairInfo.product_name }}</div>
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
        </div> -->
      </li>
      <li class="li-submit">
        <div class="half-wrap left">
          <v-btn :label="$t('operate_buy', {coin: pairInfo.product_name})"
            class="submit-btn"
            radius="0"
            color="probuy"
            width="100%"
            height="44"
            :loading="submitting === 'BUY'"
            @click="submit('BUY')"></v-btn>
        </div>
      </li>
    </ul>
    <!-- 埋单 -->
    <ul class="ul sell-ul" v-if="pairInfo">
      <li class="li-price mb-10">
        <div class="label">{{ $t('price') }}</div>
        <div class="content">
          <currency-input class="pro"
            v-model="price"
            :class="[input.price.status]"
            :bid="state.pro.bid"
            :ask="state.pro.ask"
            :currency="pairInfo.currency_name"
            :scale="pairInfo.price_scale">
          </currency-input>
        </div>
      </li>
      <li class="li-amount mb-10">
        <div class="label">{{ $t('amount') }}</div>
        <div class="content">
          <currency-input class="pro"
            v-model="amount"
            :class="[input.amount.status]"
            :currency="pairInfo.product_name"
            :scale="pairInfo.amount_scale">
          </currency-input>
          <!-- <div class="btn point-btn buy-all"
            v-tooltip.left="buyTip"
            @click="setBuyVolumn(1)">
            <i class="ibt theme-bgcolor-up"></i>
          </div>
          <div class="btn point-btn sell-all"
            v-tooltip.left="sellTip"
            @click="setSellVolumn(1)">
            <i class="ibt theme-bgcolor-down"></i>
          </div> -->
        </div>
      </li>
      <li class="li-worth mb-10">
        <div class="label">{{ $t('order_value') }}</div>
        <div class="content">
          <currency-input class="pro"
            @blur="worthBlur"
            @focus="worthFocus"
            v-model="worth"
            :currency="pairInfo.currency_name"
            :step-scale="pairInfo.currency_scale"
            :scale="pairInfo.amount_scale + pairInfo.price_scale">
          </currency-input>
        </div>
      </li>
      <!-- <li class="li-setting mb-10">
        <label class="checkbox left" v-tooltip="postOnlyTip">
          <input type="checkbox" v-model="postOnly">
          {{ $t('post_only') }}
        </label>
      </li> -->
      <li class="li-volume mb-10">
        <div class="half-wrap right">
          <div class="product-volume">
            <div class="avbl">
              <div class="avbl-label">{{ $t('avlb') }} {{ pairInfo.product_name }}</div>
              <div class="avbl-value" v-if="product">{{ product.available | fixed(pairInfo.product_scale) }}</div>
              <div class="avbl-value" v-else>----</div>
            </div>
            <div class="ix-slider">
              <ix-slider @input="onSliderDragEnd($event, 'sell')" height="4" :dot-size="14" :lazy="true" :min="0" :max="100" :piecewiseLabel="true" :interval="1" :piecewise="false">
                <template slot="label" slot-scope="{ label, active }">
                  <span :class="['custom-label', { active }]" v-if="label % 25 === 0">
                  </span>
                </template>
                <template slot="tooltip" slot-scope="tooltip">
                  <div class="custom-tooltip">
                    {{ tooltip.value }}%
                  </div>
                </template>
              </ix-slider>
            </div>
            <!-- <div class="volume-sets">
              <a class="volume-set" @click.prevent="setSellVolumn(.25)"><span>25%</span></a>
              <a class="volume-set" @click.prevent="setSellVolumn(.5)"><span>50%</span></a>
              <a class="volume-set" @click.prevent="setSellVolumn(.75)"><span>75%</span></a>
              <a class="volume-set" @click.prevent="setSellVolumn(1)"><span>100%</span></a>
            </div> -->
          </div>
        </div>
      </li>
      <li class="li-submit">
        <div class="half-wrap right">
          <v-btn :label="$t('operate_sell', {coin: pairInfo.product_name})"
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
import ixSlider from '@/components/common/ix-slider/'

export default {
  name: 'proLimitOrder',
  data () {
    return {
      state,
      amount: '',
      price: '',
      worth: '',
      worthLock: false,
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
    amount () {
      this.calcWorth()
    },
    price () {
      this.calcWorth()
    },
    worth () {
      this.calcAmount()
    }
  },
  methods: {
    clear () {
      this.amount = ''
      this.price = ''
      this.worth = ''
    },
    worthFocus () {
      this.worthLock = true
    },
    worthBlur () {
      this.worthLock = false
      this.calcAmount()
      this.calcWorth()
    },
    calcWorth () {
      if (this.worthLock) {
        return
      }
      if (!this.amount || !this.price) {
        this.worth = ''
        return
      }
      this.worth = this.$big(this.amount).mul(this.price).toString()
    },
    calcAmount () {
      if (!this.worth || !this.price || !this.pairInfo) {
        this.amount = ''
        return
      }
      if (this.$big(this.price).lte(0)) {
        return
      }
      this.amount = this.$big(this.worth).div(this.price).round(this.pairInfo.amount_scale).toString()
    },
    set ({price, amount, dontOveride}) {
      if (price) {
        if (!dontOveride || (dontOveride && !this.price)) {
          this.price = this.$big(price).toString()
        }
      }
      if (amount) {
        if (!dontOveride || (dontOveride && !this.amount)) {
          this.amount = this.$big(amount).toString()
        }
      }
    },
    setBuyVolumn (ratio) {
      if (this.price && this.price !== '0') {
        this.amount = this.$big(this.currency.available)
          .mul(ratio)
          .div(this.price)
          .round(this.pairInfo.amount_scale)
          .toString()
      } else {
        this.setInputStatus('price', 'error')
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
      if (!this.currency || !this.currency.available) {
        return false
      }
      if (!this.product || !this.product.available) {
        return false
      }
      if (this.submitting) {
        return false
      }
      const $price = this.$big(this.price || 0)
      const $amount = this.$big(this.amount || 0)
      const $bid = this.$big(this.state.pro.bid || 0)
      const $ask = this.$big(this.state.pro.ask || 0)
      const $value = $price.mul($amount)
      if (!$price.gt(0)) {
        return this.setInputStatus('price', 'error')
      }
      if (!$amount.gt(0)) {
        return this.setInputStatus('amount', 'error')
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
      if (side === 'BUY' && $ask.gt(0) && $price.div(1.3).gt($ask)) {
        return utils.alert(this.$i18n.t('price_high', {per: 30}))
      }
      if (side === 'SELL' && $bid.gt(0) && $price.div(0.7).lt($bid)) {
        return utils.alert(this.$i18n.t('price_low', {per: 30}))
      }
      if ($bid.gt(0) && $ask.gt(0) && $bid.mul(1.05).lt($ask) &&
        ((side === 'SELL' && $price.lte($bid)) || (side === 'BUY' && $price.gte($ask)))) {
        // 盘口差价较大，且下单价超过盘口
        const ok = await utils.confirm({
          trade: true,
          content: this.$i18n.t('spread_too_big', {per: 5}),
          title: this.$i18n.t('confirm_your_order')
        })
        if (!ok) {
          return false
        }
      } else if (side === 'BUY' && $ask.gt(0) && $price.div(1.05).gt($ask)) {
        const ok = await utils.confirm({
          trade: true,
          content: this.$i18n.t('price_little_high', {per: 5}),
          title: this.$i18n.t('confirm_your_order')
        })
        if (!ok) {
          return false
        }
      } else if (side === 'SELL' && $bid.gt(0) && $price.div(0.95).lt($bid)) {
        const ok = await utils.confirm({
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
        type: 'LIMIT',
        side: side,
        price: $price.toString(),
        amount: $amount.toString(),
        pair_name: this.state.pro.pair,
        post_only: +this.postOnly
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
    },
    onSliderDragEnd (value, dir) {
      value = value / 100.0;
      if (dir === 'buy') {
        this.setBuyVolumn(value)
      } else {
        this.setSellVolumn(value)
      }
      console.log(value)
    }
  },
  components: {
    ixSlider
  },
  created () {
    this.$eh.$on('protrade:exchange:set', this.set)
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
  // &.left {
  //   padding-right: 6px;
  // }
  // &.right {
  //   padding-left: 6px;
  // }
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
    width: 88%;
    float: left;
    box-sizing: border-box;
  }
}
.li-amount,
.li-price,
.li-worth {
  margin-bottom: 9px;
  .label {
    line-height: 28px;
    color: #A5B4C5;
    width: 12%;
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
  line-height: 17px;
  height: 34px;
  .avbl-label {
    line-height: 17px;
    height: 17px;
  }
}
.ix-slider {
  padding: 7px 0px;
  margin-right: 20px;
  position: relative;
  box-sizing: border-box;
  @include clearfix();
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
  bottom: -44px;
  left: -7px;
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
