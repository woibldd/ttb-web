<template>
  <div class="currency-input" :class="{static: isStatic}">
    <input type="text" ref="input" class="input"
      :disabled="disabled"
      :readonly="readonly"
      maxlength="32"
      :placeholder="placeholder"
      @keydown.up="up"
      @keydown.down="down"
      @input="updateValue($event.target.value, 'input')"
      @focus="focus()"
      @blur="fixValue();blur()">
    <div class="currency-input label" v-if="currency"
      :class="{long: currency.length > 5}">
      {{ currency }}
    </div>
    <!-- <div class="btn bid1" v-show="bid"
      v-tooltip.left="bidTip"
      @click="setBid">
      <i class="ibt bgcolor-up"></i>
    </div>
    <div class="btn ask1" v-show="ask"
      v-tooltip.left="askTip"
      @click="setAsk">
      <i class="ibt bgcolor-down"></i>
    </div> -->
  </div>
</template>

<script>
import utils from '@/modules/utils'

export default {
  name: 'currencyInput',
  props: {
    disabled: {
      default: false
    },
    readonly: {
      default: false
    },
    ask: {
      default: 0
    },
    bid: {
      default: 0
    },
    placeholder: {
      default: '',
      type: String
    },
    scale: {
      default: 6,
      type: Number
    },
    stepScale: {
      type: Number
    },
    currency: {
      type: String
    },
    value: String
  },
  data () {
    const vm = this
    return {
      debug: 0,
      lastValue: '',
      bidTip: {
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
          return vm.$i18n.t('set_bid')
        }
      },
      askTip: {
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
          return vm.$i18n.t('set_ask')
        }
      }
    }
  },
  computed: {
    isStatic () {
      return this.readonly || this.disabled
    },
    step () {
      const scale = this.stepScale ? 0 - this.stepScale : 0 - this.realScale
      return this.$big(10).pow(scale)
    },
    realScale () {
      return Math.floor(this.scale)
    }
  },
  watch: {
    realScale () {
      this.updateValue(this.$refs.input.value, 'scaleChange')
    },
    value (newValue) {
      this.onValueChange(newValue)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.value && this.onValueChange(this.value)
    })
  },
  methods: {
    up () {
      this.fixValue(1)
    },
    down () {
      this.fixValue(-1)
    },
    setAsk () {
      this.updateValue(this.$big(this.ask).toString())
    },
    setBid () {
      this.updateValue(this.$big(this.bid).toString())
    },
    focus () {
      this.$emit('focus')
    },
    blur () {
      this.$emit('blur')
    },
    onValueChange (newValue) {
      this.log('Value Change: ', newValue)
      if (newValue === '') {
        return this.updateValue('')
      }
      try {
        this.updateValue(this.$big(newValue).round(this.realScale) + '', 'valueChange')
      } catch (e) {
        utils.log('Invalid value changing: ', newValue)
        this.log(e)
        this.updateValue(this.lastValue)
      }
    },
    fixValue (delta = 0) {
      if (this.isStatic) {
        return false
      }
      this.log(`fixValue ${delta}`)
      if (this.$refs.input.value === '' && delta === 0) {
        return this.updateValue('')
      }
      this.updateValue(this.$big(this.$refs.input.value || '0').plus(this.step.mul(delta)).round(this.stepScale || this.realScale) + '', 'fixValue')
    },
    updateValue (value, src) {
      this.log(`updateValue: ${value} @${src}`)
      if (this.isStatic) {
        return false
      }
      if (typeof value !== 'string') {
        throw new Error('Value must be string.')
      }
      if (value === this.lastValue) {
        this.log('Value not change.')
        this.$emit('input', value)
        return false
      }
      const pattern = new RegExp(`^\\d*\\.?\\d{0,${this.realScale}}$`)
      if (!pattern.test(value)) {
        this.log(`Unexpect input(${value}), Recover to ${this.lastValue}`)
        this.$refs.input.value = this.lastValue
        return false
      }

      if (this.$refs.input.value !== value) {
        this.$refs.input.value = value
      }
      this.lastValue = value
      this.log(`Set input val to ${value}`)

      if (value === '' || this.$big(value) + '' === value) {
        // Emit the number value through the input event
        utils.log(`Input: ${value}`)
        this.$emit('input', value)
      } else {
        // Input is not ready, E.g.
        // "9.", ".9", "9.90", "09", ""
        this.log('Input is not Ready ', value)
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/vars";

.currency-input {
  position: relative;
  /*
  &.error {
    .input {
      color: white;
      border-color: $red !important;
      background-color: $red !important;
    }
  }
  */
}
.label {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 40px;
  height: 40px;
  width: 54px;
  border-right: 1px solid #DDDDDD;
  text-align: center;
  user-select: none;
  font-size: 13px;
}
.input {
  font-family: monaco Trebuchet MS, Tahoma, Arial, sans-serif;
  outline: none;
  border: 1px solid $text-light;
  border-radius: 3px;
  background-color: transparent;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  line-height: 20px;
  font-size: 14px;
  padding: 9px 60px 9px 9px;
  color: #ffffff;
}
::placeholder {
  color: #999;
}
.trade.currency-input {
  &.static {
    .input {
      color: $text-light;
    }
    .label {
    }
  }
  .label {
    color: white;
    // background-color: #CCCCCC;
    width: 54px;
    line-height: 30px;
    height: 32px;
    box-sizing: border-box;
    border-top: 1px solid $order-input-label;
    border-right: 1px solid $order-input-label;
    border-bottom: 1px solid $order-input-label;
    &.long {
      font-size: 12px;
    }
  }
  .input {
    border: 1px solid $order-input-label;
    border-radius: 0;
    background-color: $protrade-bg;
    height: 32px;
    line-height: 20px;
    padding: 3px 60px 3px 9px;
    text-align: right;
    transition: background-color 300ms;
  }
  &.error {
    .input {
      color: white;
      background-color: lighten($state-text-red, 10%);
    }
  }
  &.over {
    .input {
      color: $state-text-red;
    }
  }
}
.withdraw-input.currency-input{
  .input {
    border: none;
    padding: 14px;
    text-align: right;
    height: 48px;
  }
}
.presell-lock-input.currency-input{
  .input {
    border: none;
    padding: 14px;
    text-align: left;
    height: 48px;
  }
}
.btn {
  width: 24px;
  height: 12px;
  position: absolute;
  left: 0;
  text-align: center;
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
.bid1 {
  bottom: 2px;
  i {
    margin-top: 2px;
  }
}
.ask1 {
  top: 2px;
  i {
    margin-top: 4px;
  }
}
</style>
