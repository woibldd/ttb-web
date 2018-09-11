<template>
  <div class="withdraw-container fund-container">
    <div class="title-box">
      <div> {{ $t('提币') }}</div>
      <div class="fund-history"> {{ $t('资金记录') }}</div>
    </div>
    <div class="fund-items-content">
      <div class="fund-item-row">
        <div class="row__label">{{ $t('币种') }}</div>
        <div class="row__value">
          <el-select
            v-model="value"
            placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
      </div>
      <div class="fund-item-row">
        <div class="row__label">{{ $t('充币地址') }}</div>
        <div class="row__value">{{ $t('') }}</div>
      </div>
    </div>

  </div>
</template>
<script>
import './Withdrwa.scss'
export default {
  name: 'Withdraw'
}
</script>
