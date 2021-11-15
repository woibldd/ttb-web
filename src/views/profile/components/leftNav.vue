<template>
  <div class="profile-left-container">
    <div class="left-menu-container left-menu-nobottom">
      <!-- <p class="left-menu-title">
        <icon name="personal-center"/>
        <span class="menu-title">{{ $t('profile_personal_center') }}</span>
      </p> -->
      <ul class="left-menu-list">
        <li>
          <router-link 
            class="menu-name clearfix"
            active-class="active "
            :to="{name:'overview'}">
            <div class="menu-icon fl"><icon name="nav-zonglan"/></div> 
            <span class="fl">总览</span> 
          </router-link>
        </li>
        <li class="">
          <router-link
            class="menu-name clearfix"
            active-class="active"
            :to="{name: 'profileNinfo'}">
            <div class="menu-icon fl"><icon name="nav-wode"/></div>   
            <span class="fl">{{ $t('profile_left_invite_perinfo') }}</span> 
          </router-link>
        </li> 
        <li class="">
          <router-link
            class="menu-name clearfix"
            active-class="active"
            :to="{name: 'profileNsecurity'}">
            <div class="menu-icon fl"><icon name="nav-anquan"/></div>   
            <span class="fl">{{ $t('profile_left_invite_safety') }}</span> 
          </router-link>
        </li>
        <li class="">
          <template v-if="(state.userInfo || {}).lv === 2 && (state.userInfo || {}).state === 2">
            <router-link
              class="menu-name clearfix"
              :replace="true"
              active-class="active"
              to="/profile/kyc/kyc_step3">
            <div class="menu-icon fl"><icon name="nav-kyc"/></div>  
            <span class="fl">{{ $t('profile_sec_kyc') }}</span> 
            </router-link>
          </template>
          <template v-else>
            <router-link
              class="menu-name clearfix"
              :replace="true"
              active-class="active"
              :to="kycRouter">
              <div class="menu-icon fl"><icon name="nav-kyc"/></div>  
              <span class="fl">{{ $t('profile_sec_kyc') }}</span> 
            </router-link>
          </template>
        </li>
        <li class="">
          <router-link
            class="menu-name clearfix"
            active-class="active"
            :to="{name: 'ProfileApi'}"> 
            <div class="menu-icon fl"><icon name="nav-api"/></div>  
            <span class="fl">{{ $t('api_management') }}</span> 
          </router-link>
        </li>
        <li class="">
          <router-link
            class="menu-name clearfix"
            :to="{name: 'invite'}"
            active-class="active">
            <div class="menu-icon fl"><icon name="nav-yaoqing"/></div>  
            <span class="fl">{{ $t('profile_left_invite') }}</span> 
          </router-link>
        </li> 
      </ul>
    </div>
  </div>
</template>
<script> 
  import {state} from '@/modules/store'
  export default{ 
    data () {
      return {
        kycRouter: {path: '/profile/kyc/'},
        // info: {},
        state
      }
    },
    methods: {
      async init () { 
      }
    },
    created () {
      this.init()
    } 
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
      border: 1px solid #e9e9e9;
      border-radius: 6px;
      box-sizing: border-box;
      margin-bottom: 16px;
      overflow: hidden;
      width: 215px;

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
        .menu-name {
          box-sizing: border-box;
          width: 100%;
          display: inline-block;
          padding-left: 44px;
          color: $text-strong; 
          &.active, &:hover {
            color: $primary;
            background: $profile-menu-bg;
            box-shadow: inset 3px 0 0 0 $primary;
          }
          .menu-icon {
            width: 35px;
          }
        }
        li {
          width: 100%;
          text-align: left;
          line-height: 58px; 
          height: 58px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          margin-bottom: 1px;
        }
      }
    }
  }
</style>