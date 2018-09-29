<template>
  <div class="profile-left-container">
    <div class="left-menu-container left-menu-nobottom">
      <p class="left-menu-title">
        <icon name="personal-center"/>
        <span class="menu-title">{{ $t('profile_personal_center') }}</span>
      </p>
      <ul class="left-menu-list">
        <li class="">
          <router-link
            class="menu-name"
            active-class="active"
            :to="{name: 'ProfileInfo'}">{{ $t('profile_left_invite_perinfo') }}</router-link>
        </li>
        <li class="">
          <router-link
            class="menu-name"
            active-class="active"
            :to="{name: 'ProfileSafety'}">{{ $t('profile_left_invite_safety') }}</router-link>
        </li>
        <li class="">
          <router-link
            class="menu-name"
            :replace="true"
            active-class="active"
            :to="kycRouter">{{ $t('profile_sec_kyc') }}</router-link>
        </li>
        <li class="">
          <router-link
            class="menu-name"
            active-class="active"
            :to="{name: 'ProfileApi'}">{{ $t('profile_sec_api') }}</router-link>
        </li>
        <li class="">
          <router-link
            class="menu-name"
            :to="{name: 'invite'}"
            active-class="active">
            {{ $t('profile_left_invite') }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default{

  data () {
    return {
      kycRouter: {path: '/profile/kyc/'}
    }
  }
  /*
  methods: {
    setKycRouter ($route) {
      // kyc页面，强制kyc路径
      if ($route.name.indexOf('Kyc') === 0) {
        this.kycRouter = {
          name: $route.name
        }
      } else {
        this.kycRouter = {name: 'Kyc'}
      }
    }
  },
  created () {
    this.setKycRouter(this.$route)
  },
  watch: {
    $route ($route) {
      this.setKycRouter($route)
    }
  }
  */
}
</script>
<style lang="scss" scoped>
.profile-left-container {
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

      .menu-name {
        box-sizing: border-box;
        width: 100%;
        display: inline-block;
        padding-left: 34px;
        color: $text-strong;

        &.active, &:hover {
          color: $primary;
          background: $profile-menu-bg;
          box-shadow: inset 3px 0 0 0 $primary;
        }
      }
      li {
        width: 100%;
        text-align: left;
        line-height: 36px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
