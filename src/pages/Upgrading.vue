<template>
  <div class="wrap">
    <p>
      系统维护中...
    </p>
  </div>
</template>
<script>
import utils from '@/modules/utils'
export default {
  created () {
    utils.preloadEnd()
  }  
}
</script>

<style lang="scss" scoped>
p {
  font-size: 72px;
  font-weight: bold;
}
</style>
