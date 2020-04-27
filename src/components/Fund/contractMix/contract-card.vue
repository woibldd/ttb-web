<template>
  <div class="contract-card">
    <div
      class="contract-card-box"
      v-if="rates">
      <div class="contract-card-title">
        <h3>{{ holding.currency }}</h3>
      </div>
      <div class="contract-card-content">
        <dl class="contract-card-row">
          <dt>{{ $t('fund_contract_open') }}</dt>
          <dd>
            <span :class='{up: (holding.amount || 0) > 0, down: (holding.amount || 0) < 0}' >
              {{ holding.amount }}
              ({{ (holding.amount || 0) > 0 ? $t('fund_contract_up') : $t('fund_contract_down') }})
            </span>
          </dd>
        </dl>
        <dl class="contract-card-row">
          <dt>{{ $t('fund_contract_result_yet') }}</dt>
          <dd>
            <span :class='{up: (holding.realized || 0) > 0, down: (holding.realized || 0) < 0}' >
              {{ holding.realized | fixed(8) }} BTC
            </span>
            <div
              :class='{up: (holding.realized || 0) > 0, down: (holding.realized || 0) < 0}' >
              {{ translateByRate(holding.realized) }} USD
            </div>
          </dd>
        </dl>
        <dl class="contract-card-row">
          <dt>{{ $t('fund_contract_result_unrealized') }}</dt>
          <dd>
            <div>
              <span
                :class='{up: $big(unrealized || 0).gt(0), down: $big(unrealized || 0).lt(0)}'
              >
                {{ unrealized | fixed(8) }} BTC
              </span>
              <div
                :class='{up: $big(unrealized || 0).gt(0), down: $big(unrealized || 0).lt(0)}' >
                {{ translateByRate(unrealized) }} USD
              </div>
            </div>

          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import {bigTimes} from '@/utils/handleNum'
export default {
  props: {
    holding: {
      type: Object,
      default: {}
    },
    rates: {
      type: Object,
      default: () => null
    },
    unrealized: {
      type: [Number, String],
      default: '0'
    }
  },
  methods: {
    translateByRate (value) {
      if (!this.rates || !this.rates.USD) return
      console.log(this.rates['USD'], value)
      // return bigTimes([this.rates['USD'], value], 2)
      return this.$big(this.rates['USD']).times(value).round(2).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.contract-card {
  width: 278px;
  font-size: 18px;
  text-align: center;
  border: 1px solid $primary;
  .contract-card-title {
    height: 40px;
    line-height: 40px;
    background-color: $primary;
    h3 {
      font-size: 18px;
      color: #fff;
    }
  }
  .contract-card-content {
    padding:15px 0;
    .contract-card-row {
      line-height: 32px;
      dt {
        color: #A0A0A0;
      }
      .up {
        color: $font-up;
      }
      .down {
        color: $font-down;
      }
    }
  }

}
</style>
