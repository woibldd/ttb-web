<template>
  <div class="page-fund-container">
    <div class="page-fund-content">
      <left/>
      <div class="fund-right" style="width:100%">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import './index.scss'
import left from './left.vue'
import responsiveScale from '@/mixins/responsiveScale'

export default {
  mixins: [responsiveScale],
  name: 'MyOrder',
  components: {
    left
  }
}
</script>
