<template>
  <div class="user-center-right">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'ProfileSafety'
}
</script>
<style lang="scss" scoped>  
  .user-center-right {
    float: left;
    margin-left: 29px;
    .profile-container {
      width: 954px;
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
