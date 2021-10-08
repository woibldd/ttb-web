<template>
  <div
    class="currency-input"
    :class="{static: isStatic}">
    <input
      :skin="state.skin"
      type="text"
      ref="input"
      class="input"
      :disabled="disabled"
      :readonly="readonly"
      maxlength="32"
      :placeholder="placeholder"
      @keydown.up="up"
      @keydown.down="down"
      @input="updateValue($event.target.value, 'input')"
      @focus="focus()"
      @blur="fixValue();blur()"> 
    <div
      class="currency-input label long"
      v-if="currency"
      v-html="currency">
    </div> 
  </div>
</template>

<script>
import utils from '@/modules/utils'
import {state} from '@/modules/store'

export default {
  name: 'CurrencyInput',
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
    value: {
      type: [String, Number]
    },
    // 步长间隔 N 每次增加N个最小单位
    accuracy: {
      type: Number,
      default: 1
    },
  },
  data () {
    const vm = this
    return {
      state,
      debug: 0,
      lastValue: '',
      bidTip: {
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
    value (newValue, oldValue) {
      if (newValue !== oldValue)
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
      this.fixValue(this.accuracy || 1)
    },
    down () {
      this.fixValue(-this.accuracy || -1)
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
        // 最小进步 accuracy 参与运算 
        const minStep = this.$big(10).pow(-this.realScale).times(this.accuracy) 
        // const minStep = Math.pow(10, -this.realScale) * this.accuracy
        let $newValue = this.$big(newValue)
        if (!$newValue.mod(minStep).eq(0)) {
          $newValue = $newValue.div(minStep).round(this.realScale >= 1 ? this.realScale - 1 : 0, 0).mul(minStep)
        }
        // this.updateValue(this.$big(newValue).round(this.realScale) + '', 'valueChange')
        this.updateValue($newValue.round(this.realScale) + '', 'valueChange')
      } catch (e) {
        utils.log('Invalid value changing: ', newValue)
        this.log(e)
        this.updateValue(this.lastValue)
      }
    },
    fixValue (delta = 0) {
      // if (this.isStatic) {
      // return false
      // }
      this.log(`fixValue ${delta}`)
      if (this.$refs.input.value === '' && delta === 0) {
        return this.updateValue('')
      }
      this.updateValue(this.$big(this.$refs.input.value || '0').plus(this.step.mul(delta)).round(this.stepScale || this.realScale) + '', 'fixValue')
    },
    updateValue (value, src) { 
      let isE = false
      this.log(`updateValue..: ${value} @${src}`)

      if (typeof value !== 'string') {
        throw new Error('Value must be string.')
      }
      // JS超过8位即使用科学计数法，特使用改方案兼容
      if (value.indexOf('e') > -1) {
        isE = true
        value = Number(value).toFixed(this.realScale).toString(10)
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
      // 是否输入格式正确，当是科学计数法时，要转行为标准10进制数字
      // 该方法为了防止输入内容为 "9.", ".9", "9.90", "09", "" 等数字
      let formatCorrect = this.$big(value || 0) + '' === value
      if ((!formatCorrect && !value.includes('.')) || !pattern.test(value)) {
        this.fixValue() //每次修改都对输入值进行修正
      }
      if (!formatCorrect && isE) {
        formatCorrect = this.$big(value).toFixed(this.realScale).toString() === value
      }

      if (value === '' || formatCorrect) {
        // Emit the number value through the input event
        // utils.log(`Input: ${value}`)
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
  // border-right: 1px solid #DDDDDD;
  text-align: center;
  user-select: none;
  font-size: 13px;
}
.input {
  font-family: monaco Trebuchet MS, Tahoma, Arial, sans-serif;
  outline: none;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  background-color: transparent;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  line-height: 20px;
  font-size: 14px;
  padding: 9px 60px 9px 9px;
  color: $--ix-input;
  &[skin~='dark'] { 
    color: $--ix-input2;
    border-color: #3e454e !important;
  }
}
::placeholder {
  color: #999;
}
.trade.currency-input {
  &.static {
    .input {
      color: $text-light;
    }
  }
  .label {
    color: $order-input-label;
    background-color: transparent;
    padding-right: 15px;
    width: 50px;
    text-align: right;
    // line-height: 33px;
    height: 32px;
    box-sizing: border-box;
    // border-top: 1px solid $order-input-label;
    // border-right: 1px solid $order-input-label;
    // border-bottom: 1px solid $order-input-label;
    &.long {
      font-size: 12px;
    }
  }
  .input {
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    // background-color: $protrade-bg;
    // height: 32px;
    // line-height: 20px;
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
