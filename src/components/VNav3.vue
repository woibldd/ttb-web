<template>
  <div
    class="nav_box"
    :class="{dark: dark}">
    <div class="ind_cen">
      <router-link
        :to="{name:'home'}"
        class="nav_logo"/>
      <div class="nav_left">
        <div class="left_options">
          <router-link
            :to="{name: 'trading'}"
            class="nav_link">{{ $t('trading') }}</router-link>
          <a
            :href="'/docs/The+Declaration+of+IX'+pdfSubfix+'.pdf'"
            target="_blank"
            class="nav_link ml-30">{{ $t("declaration") }}</a>
          <a
            :href="'/docs/IX+WhitePaper'+pdfSubfix+'.pdf'"
            target="_blank"
            class="nav_link ml-30">{{ $t("whitepagger") }}</a>
          <router-link
            :to="{name: 'kycRelay'}"
            class="nav_link ml-30"
            target="_blank">{{ $t('activity_kyc_name') }}
            <i class="hot"/>
          </router-link>

        </div>
      </div>
      <div class="nav_right">
        <div
          v-if="!state.userInfo"
          class="right_options">
          <router-link
            :to="{name:'login'}"
            class="nav_log_res">{{ $t("signin") }}</router-link>
          <router-link
            :to="{name:'register'}"
            class="nav_log_res">{{ $t("signup_title") }}</router-link>
        </div>
        <div
          class="right_options"
          v-else>
          <!-- <p class="email">
            <router-link :to="{name:'trading'}">币币交易</router-link>
          </p>
          <p class="email">
            <router-link :to="{name:'fund'}">我的资产</router-link>
          </p> -->
          <div
            class="fund mr-30"
            @click="openDefault('fund')">
            <icon name="fund" />
            {{ $t('wallets_nav_asset') }}
            <div class="dropdown-sub-menu">
              <ul class="dropdown-list pt-10 pb-10">
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    :to="{name: 'fund'}"
                    class="link">{{ $t('capital_manage') }}</router-link>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    :to="{name: 'deposit'}"
                    class="link">{{ $t('deposit') }}</router-link>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    :to="{name: 'withdraw'}"
                    class="link">{{ $t('withdraw') }}</router-link>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div
            class="fund mr-30"
            @click="openDefault('orders')">
            <icon name="order" />
            {{ $t('orders') }}
          </div> -->
          <div
            class="email mr-30"
            @click="openDefault('profile')">
            {{ desentInfo }}
            <div class="dropdown-sub-menu">
              <ul class="dropdown-list pt-10 pb-10">
                <li class="dropdown-item pl-24 pr-24 mobile">
                  <router-link
                    :to="{name: 'fund'}"
                    class="link">{{ $t('capital_manage') }}</router-link>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    :to="{name: 'profile'}"
                    class="link">{{ $t('profile_personal_center') }}</router-link>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <a
                    class="link"
                    @click="logout">{{ $t('signout') }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="help"
            @click="openDefault('help')">
            {{ $t('footer_help') }}
            <div class="dropdown-sub-menu">
              <ul class="dropdown-list pt-10 pb-10">
                <li class="dropdown-item pl-24 pr-24">
                  <a
                    class="link"
                    target="_blank"
                    :href="announcementLink">{{ $t('footer_notice') }}</a>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <a
                    class="link"
                    target="_blank"
                    :href="helpLink">{{ $t('user_guide') }}</a>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <a
                    class="link"
                    target="_blank"
                    :href="requestLink">{{ $t('footer_request') }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="lang">{{ localeText }}<b/>
          <div class="lang_box">
            <a @click="langcn">简体中文</a>
            <a @click="langen">English</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { state, actions } from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'

export default {
  props: {
    dark: {
      type: Boolean,
      default: false
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
    pdfSubfix () {
      if (state.locale === 'zh-CN') {
        return '+zh-CN'
      }
      return ''
    },
    desentInfo () {
      let userInfo = this.state.userInfo
      if (userInfo) {
        if (userInfo.phone) {
          return utils.publicDesensitization(userInfo.phone)[0]
          // return utils.publicDesensitization('91418865')[0]
        } else if (userInfo.email) {
          return utils.publicDesensitization(userInfo.email)[0]
        }
      }
      return ''
    },
    helpLink () {
      return this.state.theme.help[this.state.locale] || this.state.theme.help.en
    },
    requestLink () {
      if (this.state.userInfo && this.state.theme.themeName === 'default') {
        return process.env.BASE_API + 'zendesk/sso?return_to=' + encodeURIComponent(this.state.theme.request[this.state.locale] || this.state.theme.request.en)
      } else {
        return this.state.theme.request[this.state.locale] || this.request.theme.help.en
      }
    },
    announcementLink () {
      return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
    }
  },
  methods: {
    langcn () {
      let lang_cn = 'zh-CN'
      actions.setLocale(lang_cn)
    },
    langen () {
      let lang_en = 'en'
      actions.setLocale(lang_en)
    },
    logout () {
      actions.setUserInfo(null)
      service.signout()
      if (utils.getRouteMeta(this.$route, 'auth')) {
        this.$router.push({
          name: 'login'
        })
      }
    },
    clickStar ($event) {
      this.className = 'active'// console.log($event.currentTarget);
    },
    openDefault (type) {
      switch (type) {
        case 'fund':
          this.$router.push({
            name: 'fund'
          })
          break
        case 'profile':
          this.$router.push({
            name: 'profile'
          })
          break
        case 'help':
          window.open(this.helpLink)
          break
        case 'orders':
          this.$router.push({
            name: 'orders'
          })
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/vars";
@import "../styles/mixins";

.nav_box {
  .ind_cen {
    position: relative;
    margin: 0 60px;
    min-width: 1200px;
  }
  width: 100%;
  height: 80px;
  line-height: 42px;
  .nav_logo {
    float: left;
    width: 142px;
    height: 46px;
    display: block;
    @include bg-retina('../assets/nav_logo', 'png', 142px, 46px);
    float: left;
    margin: 17px 0;
  }
  .nav_left {
    float: left;
    margin-left: 20px;

    .left_options {
      float: left;
      margin: 18px 0 18px 40px;
      .nav_link {
        color: #FFFFFF;
        font-size: 16px;
        position: relative;

        &:hover {
          color: $primary;
          .hot {
            background: url(~@/assets/hot-active.png)
          }
        }

        &.router-link-active {
          color: $primary;
          .hot {
            background: url(~@/assets/hot-active.png)
          }
        }

        .hot {
          position: absolute;
          right: -22px;
          top: -2px;
          width: 18px;
          height: 20px;
          background: url(~@/assets/hot.png)
        }
      }
    }
  }
  .nav_right {
    float: right;
    font-size: 14px;

    .right_options {
      float: left;
    }

    .fund, .email, .help {
      float: left;
      color:#fff;
      padding:19px 0;
      cursor: pointer;

      .dropdown-sub-menu {
        opacity: 0;
        display: none;
        visibility: hidden;
      }
    }
    .dropdown-sub-menu {
      background: #283B4C;
      position: absolute;
      top: 80px;
      border-radius: 4px;
      z-index: 999;

      .dropdown-list {
        .dropdown-item {
          height: 40px;
          &.mobile {
            display: none;
          }
          .link {
            width: 100%;
            height: 100%;
            display: block;
            color: #fff;
          }

          &:hover {
            background: #192D3F;
            .link {
              color: $primary;
            }
          }
        }

      }
    }

    .fund:hover, .email:hover, .help:hover {
      color: $primary;
      .dropdown-sub-menu {
        // transition: opacity .3s,visibility 0s;
        opacity: 1;
        visibility: visible;
        display: block;

      }
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
    margin: 28px 0 0 30px;
    background: url(../assets/lang.png) no-repeat 12px center;
    text-indent: 32px;
    position: relative;
    font-size: 12px;
    cursor: pointer;
    z-index: 1;
    b {
      width: 8px;
      height: 24px;
      background: url(../assets/xl.png) center center no-repeat;
      display: block;
      position: absolute;
      top: 0;
      right: 16px;
    }
    .lang_box{
        display: block;
        width: 200%;
        height: auto;
        line-height: 40px;
        padding-top: 27px;
        right:0;
        position: absolute;
        display: none;
        a{
            background: #303c47;
            display: block;
            width: 50%;
            height: 40px;
            float: left;
            color: #fff;
            &:hover{
                background:#273440;
                color: #c9a96c;
            }
        }
    }
    &:hover{
        .lang_box{
            display: block;
        }
    }
  }

  @media screen and (max-width: 768px){
    .c_box {
      padding: 0 10px;
    }
    .lang {
      display: none;
      visibility: hidden;
    }
    .right_options {
      .fund, .help {
        display: none;
        margin: 0;
      }
      .nav_log_res, .email,.quit {
        margin-left: 10px;
      }
    }
    .mobile {
      display: block !important;
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
