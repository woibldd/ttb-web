<template>
  <div class="h5-page-header">
    <div class="header__left">
      <div
        class="title-pic"
        @click="goHome"/>
      <div class="title--text">
        <router-link
          :to="{name: 'trading'}"
          class="nav_link">{{ $t('trading') }}</router-link>
      </div>
    </div>
    <div class="header__right">
      <span
        class="profile"
        v-if="state.userInfo"
        @click="toggleMenu">
        {{ desentInfo }}
      </span>
      <span
        class="operate"
        v-if="!state.userInfo">
        <router-link
          :to="{name:'login'}"
          class="nav_log_res">
          {{ $t("signin") }}
        </router-link>
      </span>
      <span
        class="operate signup"
        v-if="!state.userInfo">
        <router-link
          :to="{name:'register'}"
          class="nav_log_res">
          {{ $t("signup_title") }}
        </router-link>
      </span>
      <span
        class="operate"
        v-if="state.userInfo"
        @click="toggleMenu"><icon name="h5-menu"/> </span>
      <div
        class="hide-list"
        v-if="showMenu">
        <router-link
          @click="toggleMenu"
          :to="{name: 'trading'}"
        >{{ $t('trading') }}</router-link>
        <router-link
          :to="{name: 'profile'}"
          @click="toggleMenu"
          class="link">{{ $t('profile_personal_center') }}</router-link>
        <router-link
          :to="{name: 'fund'}"
          class="link">{{ $t('capital_manage') }}</router-link>
        <a
          @click="toggleMenu"
          :href="'/docs/The+Declaration+of+IX'+pdfSubfix+'.pdf'"
          target="_blank">{{ $t("declaration") }}</a>
        <a
          @click="toggleMenu"
          :href="'/docs/IX+WhitePaper'+pdfSubfix+'.pdf'"
          target="_blank">{{ $t("whitepagger") }}</a>
        <a
          @click="toggleMenu();logout()">{{ $t('signout') }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import {state, actions} from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'

export default {
  data () {
    return {
      state,
      showMenu: false
    }
  },
  methods: {
    goHome () {
      this.$router.push({
        name: 'home'
      })
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
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
  },
  watch: {
    $route () {
      this.showMenu = false
    }
  },
  computed: {
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
    pdfSubfix () {
      if (state.locale === 'zh-CN') {
        return '+zh-CN'
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/_mixins.scss';
@import '~@/styles/_vars.scss';

.h5-page-header {
    background-color: #1a1a1a;
    font-size: rem(24);
    height: rem(120);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: rem(32);
    padding-right: rem(32);
    box-sizing: border-box;
    color: #ffffff;

    .title-pic {
        background-image: url('~@/assets/h5/h5-logo@2x.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: rem(164);
        height: rem(38);
    }

    .header__left{
        display: flex;
        line-height: 1.9;
        .title--text {
            margin-left: rem(40);
            .nav_link {
              color: #ffffff;
              &.router-link-active {
                color: $primary;
              }
            }
        }
    }
    .header__right {
        position: relative;
        .operate {
            display: inline-block;
            margin-left: rem(40);

            &.signup {
                border: 1px solid #ffffff;
                border-radius: rem(4);
                padding: rem(8) rem(16);
            }
        }
        .hide-list{
            position: absolute;
            background-color: #000000;
            text-align: left;
            display: flex;
            flex-direction: column;
            width: rem(224);
            top: rem(96);
            z-index: 11;

            .list__item, a {
                display: inline-block;
                height: rem(76);
                color: white;
                line-height: rem(76);
                padding-left: rem(31);
                border-bottom: 1px solid #43464A;
                &:hover {
                    background:rgba(33,37,42,1);
                }
            }
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
