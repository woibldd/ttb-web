<template>
  <div class="page-material-container">
    <div class="page-material-content">
      <fund-left/>
      <div class="material-right">
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
  name: 'Material',
  components: {
    FundLeft
  }
}
</script>
