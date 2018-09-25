<template>
  <div class="page page-profile">
    <div style="page-profile-wrap">
      <profile-left/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import ProfileLeft from './ProfileLeft'
import responsiveScale from '@/mixins/responsiveScale'
export default {
  mixins: [responsiveScale],
  name: 'Profile',
  components: {
    ProfileLeft
  }
}
</script>
<style lang="scss">
.page-profile {
  background: #ffffff;
  margin: 0 auto;
  width: 1180px;
  padding-top: 60px;
  padding-bottom: 100px;
}
</style>
