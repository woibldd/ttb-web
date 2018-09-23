<template>
  <div class="page-fund-container">
      <div class="page-fund-content">
        <fund-left></fund-left>
        <div class="fund-right">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import './index.scss'
import FundLeft from './FundLeft/FundLeft'

export default {
  name: 'fund',
  components: {
    FundLeft
  }
}
</script>
