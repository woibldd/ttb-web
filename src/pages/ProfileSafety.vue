<template>
  <div class="user-center-right">
    <router-view></router-view>    
  </div>
</template>

<script>
  import service from '@/modules/service'

  export default {
    name: 'ProfileSafety',
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
  @import "../styles/vars";
  @import '../styles/mixins';

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
        span{
            color: #999;
            font-size: 14px;
            float: right;
            font-weight: lighter;
            padding-right: 25px;
            i{
                color: #EB5757;
            }
        }
      }
    }
  }
</style>
