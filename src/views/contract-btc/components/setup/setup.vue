<template>
  <div class="contract-setup-container">
    <div class="setup__title">
      {{ $t('setting') }}
    </div>
    <div class="setup__row">
      <div class="row__label">
        {{ $t('contract_show_unit') }}
      </div>
      <div class="row__values">
        <el-radio
          class="radio-wrapper"
          v-model="showUnit"
          label="1">{{ $t('contract_werehouse_piece') }}</el-radio>
        <el-radio
          class="radio-wrapper"
          v-model="showUnit"
          label="2">BTC</el-radio>
      </div>
    </div>
    <div class="setup__row">
      <div class="row__label">
        {{ $t('contract_unachieve_calculate') }}
      </div>
      <div class="row__values">
        <el-radio
          class="radio-wrapper"
          v-model="cal"
          label="1">{{ $t('contract_reasonable_price') }}</el-radio>
        <el-radio
          class="radio-wrapper"
          v-model="cal"
          label="2">{{ $t('contract_newest_price') }}</el-radio>
      </div>
    </div>
    <v-btn
      :label="$t('confirm')"
      height="44"/>
  </div>
</template>
<script>
import './setup.scss'
export default {
  data () {
    return {
      showUnit: '1',
      cal: '1'
    }
  }
}
</script>
