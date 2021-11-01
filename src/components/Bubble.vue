<template>
  <div class="container">
    <div class="wrap">
      <div class="text-box">
        <div class="title">{{ $t('bubble_ix_team')}}</div>
        <div class="sub-text">{{ $t('bubble_site_tips')}}</div>
        <div class="content">  
          <!-- <i class="icon warn-icon"></i> -->
          <a href="https://ixx.com" class="domain-text">
            <img src="~@/assets/safe.png" alt="" class='safe-icon'>
              https://ixx.com
          </a>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  position: relative;
  .wrap {
    position: absolute;
    z-index: 10;
    width: 260px;
    background: #0c1222;
    -webkit-box-shadow: 0 1px 6px 0 rgba(0,0,0,.15);
    box-shadow: 0 1px 6px 0 rgba(0,0,0,.15);
    top: 0;
    left: 105px;
    border-radius: 6px;
    padding: 10px 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    //display: none;
    // &::before {
    //   content: '';
    //   display: block;
    //   width: 0;
    //   height: 0;
    //   position: absolute;
    //   top: -10px;
    //   left: 25px;
    //   -webkit-transform: translate(-50%,0);
    //   -ms-transform: translate(-50%,0);
    //   transform: translate(-50%,0);
    //   border-width: 0 10px 10px;
    //   border-style: solid;
    //   border-color: transparent transparent #3075ee; 
    // } 
    .safe-icon {  
      vertical-align: middle;
      width:18px;
      height:18px;
    } 
    .text-box {
      color: $primary;
      .title {
        position: relative;
        height: 21px;
        overflow: hidden;
      }
      .sub-text {
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 4px;
        width: 202px;
      }
      .content {
        margin-top: 10px;
        height: 28px;
        background: rgba(255,255,255,.1);
        border-radius: 4px;
        padding-left: 32px;
        padding-right: 17px;
        position: relative;
        overflow: hidden;
        .domain-text {
          line-height: 28px;
          margin-top:10px;
        }
      }
    }
  }
}
</style>
