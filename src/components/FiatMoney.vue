<template>
  <span>
    <span
      class="value"
      v-if="ready">{{ displayValue | thousand }}</span>
    <span
      class="wait"
      v-else>...</span>
  </span>
</template>

<script>
import {state, actions} from '@/modules/store'

export default {
  name: 'FiatMoney',
  props: ['base', 'value'],
  data () {
    return {
      state
    }
  },
  watch: {
    base: {
      immediate: true,
      handler () {
        actions.fetchRate(this.base)
      }
    },
    value: {
      immediate: true,
      handler () {
        actions.fetchRate(this.base)
      }
    }
  },
  computed: {
    ready () {
      return this.allRates && this.allRates[this.state.fiatMoney]
    },
    allRates () {
      return this.state.rate[this.base]
    },
    baseValue () {
      if (!this.ready) {
        return 0
      }
      return this.allRates[this.state.fiatMoney]
    },
    displayValue () {
      const value = this.$big(this.value || 0).mul(this.baseValue)
      let result
      if (value.gte(1000)) {
        result = value.toFixed(1)
      } else if (value.gte(1)) {
        result = value.toFixed(2)
      } else if (value.gt(0)) {
        result = value.toPrecision(2)
      } else {
        result = '0.00'
      }
      return result
    }
  }
}
</script>
