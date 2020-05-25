<template>
  <div class="fund-container my-fund-container contract-container">
    <div
      class="title-box"
      v-if="from!='contractMixIndex'"
    >
      <!-- <div>{{ $t('capital_manage') }}  <span class="title__second"> <span class="pl-10 pr-10"> > </span>{{ $t('contract_account') }} </span></div> -->
      <div>
        {{ computedTitle }}
      </div>
      <div>
        <router-link
          class="fund-history mr-22 "
          to="/fund/my/contractMix/index"> {{ $t('account_balance') }}</router-link>
        <router-link
          class="fund-history mr-22"
          to="/fund/my/contractMix/history"> {{ $t('transaction_record') }}</router-link>
        <router-link
          class="fund-history mr-22"
          to="/fund/my/contractMix/assets-history"> {{ $t('capital_record') }}</router-link>
        <router-link
          class="fund-history"
          to="/fund/my/contractMix/winloss-history"> {{ $t('fund.contract.winloss_record') }}</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    from () {
      return this.$route.name
    },
    computedTitle () {
      const obj = {
        '/fund/my/contractMix/index': this.$t('account_balance'),
        '/fund/my/contractMix/history': this.$t('transaction_record'),
        '/fund/my/contractMix/assets-history': this.$t('capital_record')
      }
      return obj[this.$route.path]
    }
  } 
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
