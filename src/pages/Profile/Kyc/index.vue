<template>
<div style="page-kyc-wrap">
  <div class="user-center-right">
    <router-view></router-view>    
  </div>
</div>
</template>

<script>
  import service from '@/modules/service'

  export default {
    name: 'Kyc',
    components: {
    },
    data () {
      return {

      }
    },
    computed: {

    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped>
.user-center-right {
  padding-left: 60px;
  float: left;
  .profile-container {
    width: 960px;
    position: relative;

    .title-box {
      width: 100%;
      height: 40px;
      font-size: 18px;
      font-weight: 600;
      color: $text-strong;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .invinfo-box {
    width: 100%;
    margin: 20px auto 50px auto;
    
  }
}
</style>
