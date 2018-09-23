<template>
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
    value: String
  },
  data () {
    return {
      debug: 0,
      lastValue: ''
    }
  },
  computed: {
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
      this.log(`fixValue ${delta}`)
      if (this.$refs.input.value === '' && delta === 0) {
        return this.updateValue('')
      }
      this.updateValue(this.$big(this.$refs.input.value || '0').plus(this.step.mul(delta)).round(this.stepScale || this.realScale) + '', 'fixValue')
    },
    updateValue (value, src) {
      this.log(`updateValue: ${value} @${src}`)
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
