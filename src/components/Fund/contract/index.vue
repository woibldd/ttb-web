<template>
  <div class="fund-container my-fund-container contract-container">
    <div class="title-box">

      <div>{{ $t('capital_manage') }}  <span class="title__second"> <span class="pl-10 pr-10"> > </span>{{ $t('contract_account') }} </span></div>
      <div>
        <router-link
          class="fund-history mr-22 "
          to="/fund/my/contract/index"> {{ $t('account_balance') }}</router-link>
        <router-link
          class="fund-history mr-22"
          to="/fund/my/contract/history"> {{ $t('transaction_record') }}</router-link>
        <router-link
          class="fund-history"
          to="/fund/my/contract/assets-history"> {{ $t('capital_record') }}</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
    .page-fund-container .fund-history {
        color: #999;
        border-color: #999;
        &.router-link-active {
            color: $primary;
            border-color: $primary;
        }
    }
</style>
<style lang="scss">

@import './contract.scss';
</style>
