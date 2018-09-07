<template>
  <div class="nav_box" :class="{dark: dark}">
    <div class="c_box">
      <router-link :to="{name:'home'}" class="nav_logo"></router-link>
      <div class="nav_right">
        <div v-if="!state.userInfo" class="right_options">
          <router-link :to="{name:'login'}" class="nav_log_res">{{$t("signin")}}</router-link>
          <router-link :to="{name:'register'}" class="nav_log_res">{{$t("signup_title")}}</router-link>
        </div>
        <div class="right_options" v-else>
          <p class="email">
            <router-link :to="{name:'profile'}">{{desentInfo}}</router-link>
          </p>
          <a class="quit" @click="logout">[ {{$t("signout")}} ]</a>
        </div>

        <div class="lang" @click="setLocale">{{localeText}}<b></b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { state, actions } from "@/modules/store"
import service from "@/modules/service"
import utils from "@/modules/utils"
import SettingModal from "@/components/SettingModal"

export default {
  props: {
    dark: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      state
    }
  },
  computed: {
    localeText () {
      return utils.getLocaleName(state.locale)
    },
    desentInfo() {
      let userInfo = this.state.userInfo
      if (userInfo) {
        if (userInfo.phone) {
          return utils.publicDesensitization(userInfo.phone)[0]
        } else if (userInfo.email) {
          return utils.publicDesensitization(userInfo.email)[0]
        }
      }

      return ''
    }
  },
  methods: {
    setLocale () {
      let localeCode = 'en'
      switch (state.locale) {
        case 'zh-CN':
          localeCode = 'en'
          break
        default:
          localeCode = 'zh-CN'
          break
      }
      actions.setLocale(localeCode)
    },
    logout () {
      actions.setUserInfo(null)
      service.signout()
      if (utils.getRouteMeta(this.$route, 'auth')) {
        this.$router.push({
          name: 'login'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/vars";
@import "../styles/mixins";

.nav_box {
  width: 100%;
  height: 80px;
  line-height: 42px;
  .nav_logo {
    float: left;
    width: 150px;
    height: 42px;
    display: block;
    background: url(../assets/nav_logo.png);
    float: left;
    margin: 19px 0;
  }
  .nav_right {
    .right_options {
      float: left;
    }
    float: right;
    .email{
      float: left;
      color:#fff;
      margin:19px 0;
    }
    .quit{
      float: left;
      color:#fff;
    }
  }
  .nav_right .nav_log_res, .nav_right .quit {
    float: left;
    margin: 19px 0 19px 40px;
    color: #fff;
    height: 42px;
    font-size: 14px;
    &:hover,
    &.router-link-active {
      color: #c9a96c;
    }
  }
  .lang {
    width: 110px;
    height: 24px;
    float: left;
    color: #fff;
    line-height: 24px;
    border-radius: 20px;
    border: 1px solid #fff;
    margin: 28px 0 0 60px;
    background: url(../assets/lang.png) no-repeat 12px center;
    text-indent: 32px;
    position: relative;
    font-size: 12px;
    cursor: pointer;
    b {
      width: 8px;
      height: 24px;
      background: url(../assets/xl.png) center center no-repeat;
      display: block;
      position: absolute;
      top: 0;
      right: 16px;
    }
  }
}
.dark {
  background: $home-header-bgdark;
}
.login {
  background: $home-header-login;
}
</style>
