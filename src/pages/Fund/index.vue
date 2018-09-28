<template>
  <div class="page-fund-container">
    <div class="page-fund-content">
      <fund-left/>
      <div class="fund-right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import './index.scss'
import FundLeft from './FundLeft/FundLeft'
import responsiveScale from '@/mixins/responsiveScale'

export default {
  mixins: [responsiveScale],
  name: 'Fund',
  components: {
    FundLeft
  }
}
</script>
