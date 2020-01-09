<template>
  <div
    class="nav_box dark" >
    <div class="ind_cen app-dl">
      <a
        href="/"
        class="nav_logo" >
        <img
          src="~@/assets/nav_logo.png"
          :alt="$t('seo_keywords')">
      </a>
      <div class="nav_left">
        <div class="left_options">
          <router-link
            :to="{name: 'trading'}"
            class="nav_link arrow-down">{{ $t('appNav.mapNavList.trading') }}</router-link>
          <div class="nav_link arrow-down" >
            <a
              href="/contract.html"
              :class="{'router-link-active': from === 'contract'}"
              class="nav_link ml-20">{{ $t('appNav.mapNavList.contract') }}
            </a>
          </div>
          <div class="nav_link arrow-down" >
            <a
              href="/unit.html"
              :class="{'router-link-active': from === 'unit'}"
              class="nav_link ml-20">{{ $t('appNav.mapNavList.currency-unit') }}
            </a>
          </div>
          <div class="nav_link arrow-down">
            <router-link
              :to="{name: 'OTC'}"
              class="nav_link  ml-20">{{ $t('appNav.mapNavList.legalTender') }}</router-link>
          </div>
          <!-- 热门活动 -->
          <div class="nav_link arrow-down" >
            <span
              v-popover:popover6
              class="nav_link ml-30">{{ $t('appNav.mapNavList.hotActive.label') }}
              <svg-icon
                class="arrow ml-5"
                icon-class="header-down" />
            </span>
            <el-popover
              ref="popover6"
              popper-class="nav-list"
              placement="bottom"
              style="background:#2C3B4B;"
              trigger="hover">
              <div class="pop-dropdown">
                <ul class="dropdown-list pt-10 pb-10">
                  <li class="dropdown-item pl-24 pr-24">
                    <router-link
                      :to="{name: 'LockWarehouse'}"
                      class="link">{{ $t("appNav.mapNavList.hotActive.children.lock") }}
                    </router-link>
                  </li>
                  <li class="dropdown-item pl-24 pr-24">
                    <router-link
                      :to="{name: 'InviteMineActivity'}"
                      class="link">{{ $t("appNav.mapNavList.hotActive.children.invite_reward") }}</router-link>
                  </li>

                </ul>
              </div>
            </el-popover>
          </div>
          <div class="nav_link arrow-down">
            <router-link
              to="/snowball"
              class="nav_link  ml-20">{{ $t('appNav.mapNavList.bidTitle') }}</router-link>
          </div>
        </div>
      </div>
      <div class="nav_right">
        <!-- <div class="set-app-dl right_options">
          <router-link
            class="nav_log_res"
            :to="{name: 'Download'}">
            <div class="app-dl">
              <icon
                class="mr-3"
                name="topbar-dl-phone"/> APP
            </div>
          </router-link>
        </div> -->
        <div
          v-if="!state.userInfo"
          class="nav_item right_options">
          <router-link
            :to="{name:'login'}"
            class="nav_log_res mr-20">{{ $t("appNav.signin") }}</router-link>
          <router-link
            :to="{name:'register'}"
            class="nav_log_res">{{ $t("appNav.signup") }}</router-link>
        </div>
        <div
          class="right_options"
          v-else>
          <!-- 我的资产 -->
          <div
            v-popover:popover4
            class="nav_item fund mr-15"
            style="margin-left: -10px;">
            <span
              @click="openDefault('fund')"
            >{{ $t('appNav.mapNavRight.wallet_asset.label') }}</span>
            <svg-icon
              class="mini arrow"
              icon-class="header-down" />
            <el-popover
              ref="popover4"
              popper-class="nav-list"
              placement="bottom"
              style="background:#2C3B4B;"
              trigger="hover">
              <div class="pop-dropdown">
                <ul class="dropdown-list pt-10 pb-10">
                  <li class="dropdown-item pl-24 pr-24">
                    <router-link
                      :to="{name: 'fund'}"
                      class="link">{{ $t('appNav.mapNavRight.wallet_asset.children.capital_manage') }}</router-link>
                  </li>
                  <li class="dropdown-item pl-24 pr-24">
                    <router-link
                      :to="{name: 'deposit'}"
                      class="link">{{ $t('appNav.mapNavRight.wallet_asset.children.deposit') }}</router-link>
                  </li>
                  <li class="dropdown-item pl-24 pr-24">
                    <router-link
                      :to="{name: 'withdraw'}"
                      class="link">{{ $t('appNav.mapNavRight.wallet_asset.children.withdraw') }}</router-link>
                  </li>
                  <li class="dropdown-item pl-24 pr-24">
                    <router-link
                      class="link"
                      :to="'/fund/transfer'">{{ $t('appNav.mapNavRight.wallet_asset.children.account_exchange') }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </el-popover>
          </div>
          <!-- 个人中心 -->
          <div
            class="nav_item email mr-15 ml-15"
            v-popover:popover5>
            <span @click="openDefault('profile')">
              <svg-icon icon-class="header-head" />
              <svg-icon
                class="mini arrow"
                icon-class="header-down" />
            </span>
            <el-popover
              ref="popover5"
              popper-class="nav-list"
              placement="bottom"
              style="background:#2C3B4B;"
              trigger="hover">
              <div
                class="pop-dropdown  pt-10" >
                <p>{{ desentInfo }}</p>
                <ul class="dropdown-list pb-10">
                  <li class="dropdown-item pl-24 pr-24">
                    <router-link
                      :to="{name: 'profile'}"
                      class="link">{{ $t('appNav.mapNavRight.personal_center.children.personal_center') }}</router-link>
                  </li>
                  <!-- <li class="dropdown-item pl-24 pr-24">
                    <router-link
                      :to="{name: 'MyOrderNew'}"
                      class="link">{{ $t('my_orders') }}</router-link>
                  </li> -->
                  <li class="dropdown-item pl-24 pr-24">
                    <router-link
                      :to="{name: 'ServiceFeeSet'}"
                      class="link">{{ $t('appNav.mapNavRight.personal_center.children.set_service_fee') }}</router-link>
                  </li>
                  <li class="dropdown-item pl-24 pr-24">
                    <a
                      class="link"
                      @click="logout">{{ $t('appNav.mapNavRight.personal_center.children.signout') }}</a>
                  </li>
                </ul>
              </div>
            </el-popover>
          </div>
        </div>
        <div class="nav_item ">
          <router-link
            v-popover:popover1
            class="download mr-15 ml-15"
            :to="{name: 'Download'}">
            <svg-icon
              class="mr-3"
              icon-class="header-download" />
          </router-link>
          <!-- <label
            class="download mr-15 ml-15"
            v-popover:popover1>
            <icon
              class="mr-3"
              name="header-download"/>
          </label> -->
          <el-popover
            ref="popover1"
            popper-class="nav-popover"
            placement="bottom"
            width="270"
            style="background:#2C3B4B;"
            trigger="hover">
            <div
              class="pop">
              <div class="left">
                <h3><span>{{ $t('appNav.mapNavRight.download_pop.children.scan') }}</span></h3>
                <p>
                  <img
                    src="~@/assets/download/qr-download.png" >
                </p>
              </div>
              <div class="right">
                <h3><a
                  target="_blank"
                  href="https://ixcustomer.zendesk.com/hc/zh-cn/articles/360020414512">{{ $t('appNav.mapNavRight.download_pop.children.process') }}</a></h3>
                <p>
                  <v-btn
                    icon="apple"
                    label="Iphone"/>
                  <v-btn
                    icon="android"
                    label="Android"/>
                </p>
              </div>
            </div>
          </el-popover>
        </div>
        <!-- 帮助中心中心 -->
        <div
          class="nav_item help-center"
          v-popover:popover2 >
          <label
            class="help mr-15 ml-15"
          >
            <svg-icon icon-class="header-help" />
          </label>
          <el-popover
            ref="popover2"
            popper-class="nav-list"
            placement="bottom"
            style="background:#2C3B4B;"
            trigger="hover">
            <div
              class="pop-dropdown">
              <ul class="dropdown-list pt-10 pb-10">
                <li class="dropdown-item pl-24 pr-24">
                  <a
                    rel="nofollow"
                    class="link"
                    target="_blank"
                    :href="announcementLink">{{ $t('appNav.mapNavRight.help_center.children.notice') }}</a>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <a
                    rel="nofollow"
                    class="link"
                    target="_blank"
                    :href="helpLink">{{ $t('appNav.mapNavRight.help_center.children.user_guide') }}</a>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <a
                    rel="nofollow"
                    class="link"
                    target="_blank"
                    :href="requestLink">{{ $t('appNav.mapNavRight.help_center.children.request') }}</a>
                </li>
              </ul>
            </div>
          </el-popover>
        </div>

        <div
          class="nav_item lang ml-15"
          v-popover:popover3>
          <span
            class="language"
          >
            <!-- <icon
              :name="'header-'+state.locale"
              class="mr-5"/> -->
            <!-- <svg-icon :icon-class="'header-'+state.locale" /> -->
            {{ locales[state.locale].slice(0,2) }}
          </span>
          <el-popover
            ref="popover3"
            popper-class="nav-list"
            placement="bottom"
            style="background:#2C3B4B;"
            width="100"
            trigger="hover">
            <!-- <div class="lang_box">
              <div
                :key="key"
                v-for="(value, key) in locales">
                <a
                  @click="switchLang(key)"
                > <icon
                  :name="'flag-'+key"
                  class="mr-5"/>{{ value }}
                </a>
              </div>
            </div>  -->
            <div
              style="width:100px;"
              class="pop-dropdown">
              <ul
                class="dropdown-list pt-10 pb-10"
                style="width:100px;">
                <li
                  class="dropdown-item pl-10 pr-10"
                  :key="key"
                  v-for="(value, key) in locales">
                  <a
                    @click="switchLang(key)"
                  >
                    <!-- <svg-icon
                      :icon-class="'flag-'+key"
                      class="mr-5" /> -->
                    {{ value }}
                  </a>
                </li>
              </ul>
            </div>
          </el-popover>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { state, actions } from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'
import VBtn from '@/components/VBtn'
// import {
//   Dropdown,
//   DropdownMenu,
//   DropdownItem } from 'element-ui'

export default {
  // components: {Dropdown,DropdownMenu,DropdownItem},
  components: {VBtn},
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    from: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      state,
      locales: utils.locales,
      hostname: location.hostname
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
    },
    isTestnet () {
      return this.hostname.indexOf('ixex.pro') >= 0
    },
    fund () {
      if (state.locale === 'zh-CN') {
        return 'fund'
      }
      return 'fund-en'
    }
  },
  methods: {
    switchLang (lang) {
      actions.setLocale(lang)
      localStorage.setItem('locale', lang)
      // location.reload()
    },
    logout () {
      actions.setUserInfo(null)
      // 用于标记登录过期
      utils.setSessionStorageValue('LoginStatus', 0)
      utils.setSessionStorageValue('markTime', 9999999999)
      service.signout().then(res => {
        console.log({ res })
        // window.onload()
        this.$nextTick(() => {
          location.reload()
        })
      })
      // service.signout()
      // this.$router.push('/')
      // if (utils.getRouteMeta(this.$route, 'auth')) {
      //   this.$router.push({
      //     name: 'login'
      //   })
      // }

      // this.$nextTick(() => {
      //   location.reload()
      // })
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
.set-app-dl {
    margin-right: 0px !important;
    .nav_log_res {
        display: flex;
        align-items: center;
        .app-dl{
            box-sizing: border-box;
            width:65px !important;
            height:26px !important;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius:10px;
        }
    }
}
.nav_box {
  .ind_cen {
    position: relative;
    width: 1280px;
    margin: 0 auto;
    @include clearfix()
  }
  width: 100%;
  height: 80px;
  line-height: 42px;
  .nav_logo {
    float: left;
    width: 142px;
    height: 46px;
    display: block;
    // @include bg-retina('../assets/nav_logo', 'png', 142px, 46px);
    margin: 17px 0;
    img {
      width: 142px;
      height: 46px;
    }
  }
  .nav_left {
    float: left;
    margin-left: 20px;

    .left_options {
      float: left;
      margin: 0 0 0 40px;
      .nav_link {
        color: #FFFFFF;
        font-size: 16px;
        position: relative;
        display: inline-block;
        padding-top: 18px;
        padding-bottom: 19px;

        &.arrow-down {
          display: inline;

          .arrow {
            font-size:10px;
            transition: all 0.2s ease-in-out;
          }
          &:hover {
            .dropdown-sub-menu {
              opacity: 1;
              display: block;
              visibility: visible;
            }
            .nav_link {
              color: $primary;
            }
            .arrow {
              transform: rotate(180deg)
            }
          }

           .dropdown-sub-menu {
              background: #283B4C;
              position: absolute;
              left: 0;
              top: 68px;
              border-radius: 4px;
              z-index: 999;
              opacity: 0;
              display: none;
              visibility: hidden;;

              .dropdown-list {
                .dropdown-item {
                  height: 40px;
                  white-space: nowrap;
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
                .dropdown-qrcode {
                  line-height: 1.2em !important;
                  text-align:center !important;
                  span {
                    font-size: 0.9em;
                    color: #fff;
                  }
                  i {
                    color: $primary;
                  }
                }
              }
           }
        }

        &:hover {
          color: $primary;
        }

        &.router-link-active {
          color: $primary;
        }

        .hot,.mining-dig {
          font-size: 16px;
          // margin-left:5px;
          display: inline-block;
        }
      }
    }
  }
  .nav_right {
    position: absolute;
    min-width: 320px;
    top: 0;
    right: 0;
    font-size: 14px;
    .right_options {
      float: left;
    }

    .fund, .email, .help-center, .download, .lang {
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

    .fund:hover, .email:hover, .help-center:hover, .download:hover {
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
    .nav_item {
      .iconfont {
        font-size: 20px;
        &.mini {
          font-size: 14px;
          padding: 0 5px;
        }
        &.arrow {
          transition: all 0.2s ease-in-out;
        }
      }
      .help, .language{
        position: relative;
        &::after {
          position: absolute;
          left: -17px;
          top: -3px;
          content: "";
          width: 1px;
          height: 20px;
          background-color: #aaa;
          opacity:0.3;
        }
      }
      &:hover {
        .iconfont.arrow {
          transform: rotate(180deg);
        }
      }
    }
  }
  .nav_right .nav_log_res, .nav_right .quit {
    float: left;
    margin: 19px 40px 19px 0;
    color: #fff;
    height: 42px;
    font-size: 14px;
    &:hover,
    &.router-link-active {
      color: #c9a96c;
    }
  }
  .lang {
    width: 30px;
    // height: 30px;
    float: left;
    color: #fff;
    // line-height: 24px;
    // border-radius: 20px;
    // border: 1px solid #fff;
    // margin: 28px 0 0 0px;
    // background: url(../assets/lang.png) no-repeat 12px center;
    // text-indent: 16px;
    position: relative;
    text-align: center;
    cursor: pointer;
    z-index: 3;
    .rig {
      display: inline-block;
      transition: all 0.2s ease-in-out;
      // position: absolute;
      // top: 4px;
      // right: 10px;
      vertical-align: middle;
      font-size: 16px;
    }
    .lang_box{
        font-size: 12px;
        width: 120px;
        height: auto;
        line-height: 40px;
        padding-top: 27px;
        left:-36px;
        position: absolute;
        display: none;
        flex-direction: column;
        a{
            background: #303c47;
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: left;
            padding: 0 20px;
            box-sizing: border-box;
            &:hover{
                background:#273440;
                color: #c9a96c;
            }
        }
    }
    &:hover{
        .lang_box{
            display: flex;
        }
        .rig {
          transform: rotate(180deg);
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
  .nav_right_new {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 14px;
  }

}
.dark {
  background: rgba(49,49,49,1);
  .app-dl {
    background:rgba(49,49,49,1) !important;
  }
}
.login {
  background: $home-header-login;
}

.pop {
  display: flex;
  width: 280px;
  color: #fff;
  h3 {
    margin-bottom: 10px;
    text-align: center;
    a {
      color: #fff;
    }
  }
  .left {
    flex: 110px 1;
    margin-right: 15px;
    text-align: center;
    img {
      width: 89px;
    }
  }
  .right {
    flex: 1 150px;
    margin-right:10px;
    .btn {
      margin-top:10px;
    }
  }
}
.pop-dropdown {
  p {
    color: #ccc;
    text-align: center;
  }
  ul {
    li {
      height: 2.5em;
      line-height: 2.5em;
      a {
        color: #fff;
      }
    }
    li:hover {
      background-color: #192D3F;
      a {
        color: $primary;
      }
    }
  }
}
.svg-icon {
  font-size: 18px;
  &.mini {
    font-size: 12px;
  }
}
@media screen and (min-width: 1280px){ // 1280是英文状态下nav正常显示的最小宽度
    .nav_box {
        .ind_cen {
            width: auto;
            min-width: 1280px;
            margin: 0 60px;
        }
   }
}
</style>
