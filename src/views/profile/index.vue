<template>
  <div class=" page-profile"> 
    <div style="page-profile-wrap">
      <left-nav/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import leftNav from './components/leftNav'

export default {
  components: {
    leftNav,
  }
}

</script>


<style lang="scss" scoped>
.page-profile {
  background: #ffffff;
  margin: 0 auto;
  width: 1200px;
  padding-top: 60px;
  padding-bottom: 100px;
  @include clearfix;
}

.mobile {
  .page-profile {
    width: 100%;
  }
}

</style>