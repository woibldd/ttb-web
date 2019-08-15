<template>
  <input
    ref="input"
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    type="text"
    class="input"
    maxlength="32"
    @keydown.up="up"
    @keydown.down="down"
    @input="updateValue($event.target.value, 'input')"
    @focus="focus()"
    @blur="fixValue();blur()">
</template>

<script>
import utils from '@/modules/utils'

export default {
  name: 'CurrencyInput',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
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
      type: Number,
      default: 0
    },
    value: {
      type: [String, Object],
      default: null
    },
    // 步长间隔 N 每次增加N个最小单位
    accuracy: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      debug: 0,
      lastValue: ''
    }
  },
  computed: {
    step() {
      const scale = this.stepScale ? 0 - this.stepScale : 0 - this.realScale
      return this.$big(10).pow(scale)
    },
    realScale() {
      return Math.floor(this.scale)
    }
  },
  watch: {
    realScale() {
      this.updateValue(this.$refs.input.value, 'scaleChange')
    },
    value(newValue) {
      this.onValueChange(newValue)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.value && this.onValueChange(this.value)
    })
  },
  methods: {
    up() {
      this.fixValue(this.accuracy || 1)
    },
    down() {
      this.fixValue(-this.accuracy || -1)
    },
    focus() {
      this.$emit('focus')
    },
    blur() {
      this.$emit('blur')
    },
    onValueChange(newValue) {
      this.log('Value Change: ', newValue)
      if (newValue === '') {
        return this.updateValue('')
      }
      try {
        // 最小进步 accuracy 参与运算
        const minStep = this.$big(10).pow(-this.realScale).times(this.accuracy)
        let $newValue = this.$big(newValue)
        if (!$newValue.mod(minStep).eq(0)) {
          $newValue = $newValue.div(minStep).round(this.realScale >= 1 ? this.realScale - 1 : 0, 0).mul(minStep)
          // $newValue = $newValue.div(minStep).round(0, 0).mul(minStep)
        }
        // this.updateValue(this.$big(newValue).round(this.realScale) + '', 'valueChange')
        this.updateValue($newValue.round(this.realScale, 0) + '', 'valueChange')
      } catch (e) {
        utils.log('Invalid value changing: ', newValue)
        this.log(e)
        this.updateValue(this.lastValue)
      }
    },
    fixValue(delta = 0) {
      this.log(`fixValue ${delta}`)
      if (this.$refs.input.value === '' && delta === 0) {
        return this.updateValue('')
      }
      this.updateValue(this.$big(this.$refs.input.value || '0').plus(this.step.mul(delta)).round(this.stepScale || this.realScale, 0) + '', 'fixValue')
    },
    updateValue(value, src) {
      this.log(`updateValue: ${value} @${src}111`)
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
