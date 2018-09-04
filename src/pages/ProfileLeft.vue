<template>
  <div class="user-center-left">
    <div class="left-menu-container left-menu-nobottom">
      <p class="left-menu-title">
        <i class="icon iconfont icon-transactioninformat title-icon" style="left: 16px; position: absolute; font-size: 12px;"></i>
        <span class="menu-title">个人中心</span>
        </p>
        <ul class="left-menu-list">
          <li class="active"><span class="menu-name">{{ $t('profile_left_invite') }}</span></li>
        </ul>
      </div>
  </div>
</template>
<style lang="scss">
@import "../styles/vars";
@import "../styles/mixins";
.user-center-left {
  float: left;
  .left-menu-nobottom {
    border-bottom: 0;
    margin-bottom: 0;
  }
  .left-menu-container {
    background: #fff;
    position: relative;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 16px;
    width: 160px;

    .left-menu-title {
      width: 100%;
      font-size: 12px;
      line-height: 36px;
      text-align: left;
      color: rgba(0,0,0,.43);
      box-sizing: border-box;
    }

    .left-menu-list {
      width: 100%;
      li {
        width: 100%;
        text-align: left;
        line-height: 36px;
        font-size: 14px;
        color: rgba(0,0,0,.85);
        cursor: pointer;
        padding-left: 34px;
        box-sizing: border-box;

        &.active, &:hover {
          color: $primary;
          background: $profile-menu-bg;
          box-shadow: inset 3px 0 0 0 $primary;
        }
      }
    }
  }
}

</style>
