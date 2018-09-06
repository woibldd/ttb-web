<template>
  <div class="user-center-left">
    <div class="left-menu-container left-menu-nobottom">
      <p class="left-menu-title">
        <icon name="personal-center"></icon>
        <span class="menu-title">{{$t('profile_personal_center')}}</span>
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
    padding-top: 20px;
    padding-bottom: 20px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 16px;
    width: 160px;

    .left-menu-title {
      width: 100%;
      font-size: 14px;
      margin-left: 12px;
      text-align: left;
      color: $text-weak;
      box-sizing: border-box;

      .menu-title {
        margin-left: 6px;
      }
    }

    .left-menu-list {
      width: 100%;
      margin-top: 20px;
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
