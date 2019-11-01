<template>
  <div
    :class="{dark: dark}"
    class="nav_box">
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
            v-if="showContract"
            :class="{'router-link-active': from === 'contract'}"
            href="/contract.html"
            class="nav_link ml-30">{{ $t('contract') }}
          </a>
          <router-link
            :to="{name: 'OTC'}"
            class="nav_link  ml-30">{{ $t('otc_trade') }}</router-link>

          <router-link
            v-if="false"
            :to="{name: 'RushBuy'}"
            class="nav_link"
            style="padding-left:10px;"
          >
            {{ $t('FrenzySaleZone') }}(SP)
            <icon name="hot-red"/>
            <!-- <img src="@/assets/hot.png" alt style="position: relative;top: 5px;left: 5px;"> -->
          </router-link>

          <div class="nav_link arrow-down">
            <router-link
              to="/plan"
              class="nav_link  ml-30">
              {{$t('plan')}}
              
              <icon name='header-down' class="mini arrow" />
            </router-link>
            <div class="dropdown-sub-menu">
              <ul class="dropdown-list pt-10 pb-10">
                <li class="dropdown-item pl-24 pr-24">
                  <router-link to="/plan" class="link">{{ $t('plan') }}</router-link>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <a
                    href="/snowball/bazaar"
                    :class="{'router-link-active': from === 'contract'}"
                    class="link">{{ $t('bidTitle') }}
                  </a>
                </li>
                <li class="dropdown-item pl-24 pr-24" v-if="isLogin">
                  <a
                    href="/snowball"
                    :class="{'router-link-active': from === 'contract'}"
                    class="link">{{ $t('playBTC') }}
                  </a>
                </li> 
              </ul>
            </div> 
          </div>
         
         
          <div class="nav_link arrow-down"> 
            <a
              href="/bonus"
              class="nav_link ml-30">
              {{ this.$t('gift.bonus') }} 
            <icon name="hot-red"/>
              <icon name='header-down' class="mini arrow" />
            </a>
            <div class="dropdown-sub-menu">
              <ul class="dropdown-list pt-10 pb-10">
                <li class="dropdown-item pl-24 pr-24">
                  <a
                    href="javascript:;"
                    class="link"
                    @click="subscribeHandle">
                    {{ this.$t('node_sub') }} 
                  </a>
                </li>
              </ul>
            </div> 
          </div>
          <!-- <a
            href="/bonus"
            class="nav_link"
            style="padding-left:30px;" >
            {{ this.$t('gift.bonus') }}
            <icon name="hot-red"/>
          </a> -->
          <!-- <router-link
            v-if="isTestnet"
            to="/snowball/bazaar"
            class="nav_link  ml-30">{{ $t('bidTitle') }}
          </router-link>
          <a
            v-if="isTestnet"
            href="javascript:;"
            class="nav_link"
            style="padding-left:30px;"
            @click="planHandle" >
            {{ $t('plan') }}
          </a> -->
          <router-link
            v-if="isTestnet"
            to="/share_option"
            class="nav_link  ml-30">
            {{ $t('shareOption.navText') }}
          </router-link>
          <!-- <div class="nav_link arrow-down">
            <a
              :href="'/docs/IXX+WhitePaper'+pdfSubfix+'.pdf'"
              target="_blank"
              class="nav_link ml-30">{{ $t("whitepagger") }}
              <icon
                class="arrow ml-5"
                name="arrow-down-w"/>
            </a>
            <div class="dropdown-sub-menu">
              <ul class="dropdown-list pt-10 pb-10">
                <li class="dropdown-item pl-24 pr-24">
                  <a
                    :href="'/docs/IXX+WhitePaper'+pdfSubfix+'.pdf'"
                    target="_blank"
                    class="link">{{ $t("whitepagger") }}</a>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <a
                    :href="'/docs/The+Declaration+of+IXX'+pdfSubfix+'.pdf'"
                    target="_blank"
                    class="link">{{ $t("declaration") }}</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="nav_link arrow-down">
            <router-link
              :to="{name: 'LockWarehouse'}"
              class="nav_link ml-30"
              target="_blank">{{ $t('mining') }}<icon
                class="arrow ml-5"
                name="arrow-down-blue"/>
            </router-link>
            <div class="dropdown-sub-menu">
              <ul class="dropdown-list pt-10 pb-10">
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    :to="{name: 'LockWarehouse'}"
                    target="_blank"
                    class="link">{{ $t("trading_mine") }}
                  </router-link>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    :to="{name: 'InviteMineActivity'}"
                    target="_blank"
                    class="link">{{ $t("invite_mine") }}</router-link>
                </li>
              </ul>
            </div>
          </div>

          <div class="nav_link arrow-down">
            <router-link
              :to="{name: 'exchangeRank'}"
              class="nav_link ml-30"
              target="_blank">{{ $t('header_title_hot_activity') }}
              <icon
                class="arrow ml-5"
                name="arrow-down-w"/>
            </router-link>
            <div class="dropdown-sub-menu">
              <ul class="dropdown-list pt-10 pb-10">
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    :to="{name: 'lottery'}"
                    target="_blank"
                    class="link">{{ $t("header_title_activity_lottery") }}
                    <icon name="hot-red"/>
                  </router-link>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    :to="{name: 'exchangeRank'}"
                    target="_blank"
                    class="link">{{ $t("header_title_activity_mine") }}
                    <icon name="rank-leading"/>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>-->
        </div>
      </div>
      <div class="nav_right">
        
        <div class="help mr-15"  v-if="$route.path === '/share_option' && mapBalanceMenu.length">
          <span style="display:inline-block;min-width:160px">{{ activeShareAccount.currency }} {{$t('shareOption.account')}} / {{ activeShareAccount.available| bigRound(4) }}</span>
          <div class="dropdown-sub-menu">
            <ul class="dropdown-list pt-10 pb-10" style="min-width:250px">
              <li class="dropdown-item pl-24 pr-24" @click="$store.commit('SET_ACTIVESHAREACCOUNT',item)" flex="main:justify" v-for="item in mapBalanceMenu" :key="item.currency">
                <el-tooltip :disabled="false" :content="`${item.currency} ${$t('shareOption.account')} / ${bigRound(item.available,4)}`" placement="left" effect="dark">
                  <a class="text-nowrap" :style="{color:item.currency === activeShareAccount.currency?'':'#fff'}"><svg-icon :icon-class="item.currency.toLowerCase()" /> {{item.currency}} {{$t('shareOption.account')}} /{{item.available| bigRound(4)}}</a>
                </el-tooltip>
                <span v-if="item.currency === 'DEMO'"  @click.stop="resetBalance(item.currency)">{{$t('shareOption.resetMoney')}} </span>
                <span v-else>{{$t('shareOption.recharge')}}</span>
              </li>
            </ul>
          </div>
        </div>
         <div
          v-if="!state.userInfo"
          class="nav_item right_options">
          <router-link
            :to="{name:'login'}"
            class="nav_log_res mr-20">{{ $t("signin") }}</router-link>
          <router-link
            :to="{name:'register'}"
            class="nav_log_res">{{ $t("signup_title") }}</router-link>
        </div>
        <div class="right_options"
          v-else>

          <!-- 我的资产 -->
          <div  class="nav_item fund arrow-down mr-15"  style="margin-left: -10px;">
            <span @click="openDefault('fund')">{{ $t('wallets_nav_asset') }}</span>
            <icon name='header-down'  class="mini arrow" />
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
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    class="link"
                    :to="'/fund/transfer'">{{ $t('account_exchange') }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <!-- 个人中心 -->
          <div class="nav_item email mr-15 ml-15" >
            <!-- <span @click="openDefault('profile')">{{ desentInfo }}</span> -->
            <span @click="openDefault('profile')">
              <icon name='header-head' />
              <icon name='header-down' class="mini" />
            </span>
            <div class="dropdown-sub-menu" style="margin-left: -39px;">
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
        </div>
        <div class="nav_item ">
          <router-link
            class="download mr-15 ml-15"
            :to="{name: 'Download'}">
              <icon
                class="mr-3"
                name="header-download"/>
          </router-link>
        </div>
        <!-- 帮助中心中心 -->
        <div class="nav_item help-center" >
          <span class="help mr-15 ml-15" @click="openDefault('help')">
            <icon name='header-help' />
          </span>
          <div class="dropdown-sub-menu" style="margin-left: -39px">
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
        <div class="nav_item lang ml-15">
          <span class="language">
            <icon
            :name="'header-'+state.locale"
            class="mr-5"/>
          </span>
          <div class="lang_box">
            <a
              @click="switchLang(key)"
              :key="key"
              v-for="(value, key) in locales"
            > <icon
              :name="'flag-'+key"
              class="mr-5"/>{{ value }}</a>
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
import whDropdown from '@/components/dropdown/index'
import { resetBalance } from '@/api/share_option'
export default {
  components: {
    whDropdown,
  },
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
  data() {
    return {
      state,
      locales: utils.locales
    }
  },
  computed: {
    localeText() {
      return utils.getLocaleName(state.locale)
    },
    pdfSubfix() {
      if (state.locale === 'zh-CN') {
        return '+zh-CN'
      }
      return ''
    },
    fund() {
      if (state.locale === 'zh-CN') {
        return 'fund'
      }
      return 'fund-en'
    },
    desentInfo() {
      const userInfo = this.state.userInfo
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
    helpLink() {
      return (
        this.state.theme.help[this.state.locale] || this.state.theme.help.en
      )
    },
    requestLink() {
        //   if (this.state.userInfo && this.state.theme.themeName === 'default') {
        //     return (
        //       process.env.BASE_API +
        //       '/ixx/zendesk/sso?return_to=' +
        //       encodeURIComponent(
        //         this.state.theme.request[this.state.locale] ||
        //           this.state.theme.request.en
        //       )
        //     )
        //   } else {
        //     return (
        //       this.state.theme.request[this.state.locale] ||
        //       this.request.theme.help.en
        //     )
        //   }

        this.state.theme.request[this.state.locale] ||
        this.request.theme.help.en
    },
    announcementLink() {
      return (
        this.state.theme.announcement[this.state.locale] ||
        this.state.theme.announcement.en
      )
    },
    isTestnet() {
      return location.hostname.indexOf('ixex.pro') >= 0 || location.hostname.includes('localhost')
      // return true
    },
    isLogin () {
      return this.state.userInfo !== null
    },
    showContract() {
      const time1 = new Date()
      const time2 = new Date(2019, 4, 7, 14)
      return this.isTestnet || time1 > time2
    },
    mapBalanceMenu() {
      return this.$store.state.mapShareAccount
    },
    mapUserCenter() {
      return [
        { label: '个人中心', path: '/user/index' },
        { label: '资产管理', path: '/user/property' },
        { label: '退出', click: () => this.$store.dispatch('loginout') }
      ]
    },
    activeShareAccount: {
      get() {
        return this.$store.state.activeShareAccount
      },
      set(value) {
        localStorage.setItem('ACTIVESHAREACCOUNT', value.currency)
        this.$store.commit('SET_ACTIVESHAREACCOUNT', value)
      }
    }
  },
  methods: {
    resetBalance(balance) {
      balance === 'DEMO' && resetBalance().then(res => {
        this.$store.dispatch('getShareAccountList', { accountArr: this.mapBalanceMenu, isAssignment: true })
      })
    },
    planHandle() {
      this.$router.push('/plan')
    },
    subscribeHandle() {
      if (window.localStorage.getItem('X-TOKEN')) {
        this.$router.push('/fund/my/assets')
      } else {
        this.$router.push(
          {
            name: 'login'
          }
        )
      }
    },
    switchLang(lang) {
      actions.setLocale(lang)
      localStorage.setItem('locale',lang)
      this.$nextTick(() => {
        location.reload()
      })
    },
    logout() {
      actions.setUserInfo(null)
      utils.setSessionStorageValue('LoginStatus', 0)
      utils.setSessionStorageValue('markTime', 9999999999)
      service.signout().then(res => {
        this.$nextTick(() => {
          location.reload()
        })
      })
      if (utils.getRouteMeta(this.$route, 'auth')) {
        this.$router.push({
          name: 'login'
        })
      }

      // this.$nextTick(() => {
      //   location.reload()
      // })
    },
    clickStar($event) {
      this.className = 'active'
    },
    openDefault(type) {
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
<style>
  .text-nowrap{
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style scoped lang="scss">
.nav_box {
  width: 100%;
  height: 60px;
  min-width: 1340px;
  .border-right-1 {
    border-right: 1px solid #ffffff;
  }

  .ind_cen {
    position: relative;
    margin: 0;
    min-width: 1300px;
  }

  .nav_logo {
    float: left;
    width: 176px;
    height: 38px;
    margin-top: 11px;
    display: block;
    background-image: url("../assets/ixx/ixx_logo.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    // @include bg-retina('../assets/nav_logo', 'png', 142px, 46px);
  }
  .nav_left {
    float: left;
    margin-left: 20px;

    .left_options {
      float: left;
      margin: 0 0 0 40px;
      .nav_link {
        color: #ffffff;
        font-size: 16px;
        position: relative;
        display: inline-block;
        padding-top: 19px;
        padding-bottom: 19px;

        &.arrow-down {
          display: inline;

          .arrow {
            font-size: 10px;
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
              transform: rotate(180deg);
            }
          }

          .dropdown-sub-menu {
            background: $protrade-bg;
            position: absolute;
            left: 22px;
            top: 58px;
            border-radius: 4px;
            z-index: 999;
            opacity: 0;
            display: none;
            visibility: hidden;

            .dropdown-list {
              .dropdown-item {
                height: 40px;
                line-height: 40px;
                white-space: nowrap;
                box-sizing: border-box;
                .link {
                  width: 100%;
                  height: 100%;
                  display: block;
                  color: #fff;
                }

                &:hover {
                  background: #192d3f;
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

        .hot,
        .mining-dig {
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
    height: 60px;
    right: 30px;
    font-size: 14px;
    display: flex;
    align-items: center;

    .right_options {
      height: 60px;
      line-height: 60px;
      display: flex;
      align-items: center;
    }

    .fund,
    .email,
    .help-center {
      float: left;
      color: #fff;
      padding: 19px 0;
      cursor: pointer;

      .dropdown-sub-menu {
        opacity: 0;
        display: none;
        visibility: hidden;
      }
    }
    .dropdown-sub-menu {
      background: $protrade-bg;
      position: absolute;
      top: 60px;
      border-radius: 4px;
      z-index: 999;

      .dropdown-list {
        .dropdown-item {
          height: 40px;
          line-height: 40px;
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
            background: #192d3f;
            .link {
              color: $primary;
            }
          }
        }
      }
    }

    .fund:hover,
    .email:hover,
    .help-center:hover {
      color: $primary;
      .dropdown-sub-menu {
        // transition: opacity .3s,visibility 0s;
        opacity: 1;
        visibility: visible;
        display: block;
      }
    }
    .quit {
      float: left;
      color: #fff;
    }

    .nav_item {
      .iconfont {
        font-size: 20px;
        &.mini {
          font-size: 14px;
          padding: 0 5px;
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
    }
  }
  .nav_right .nav_log_res,
  .nav_right .quit {
    color: #fff;
    display: inline-block;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    &:hover,
    &.router-link-active {
      color: $primary;
    }
  }
   .lang {
    width: 30px;
    height: 30px;
    float: left;
    color: #fff;
    line-height: 24px;
    margin: 8px 0 0 0px;
    position: relative;
    text-align: center;
    cursor: pointer;
    z-index: 3;
    .rig {
      display: inline-block;
      transition: all 0.2s ease-in-out;
      vertical-align: middle;
      font-size: 16px;
    }
    .lang_box{
        font-size: 12px;
        width: 110px;
        height: auto;
        line-height: 40px;
        padding-top: 18px;
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

@media screen and (max-width: 768px) {
    .c_box {
      padding: 0 10px;
    }
    .lang {
      display: none;
      visibility: hidden;
    }
    .right_options {
      .fund,
      .help {
        display: none;
        margin: 0;
      }
      .nav_log_res,
      .email,
      .quit {
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
.custom-dark {
  background: $home-header-custom-bgdark;
}
.login {
  background: $home-header-login;
}
@media screen and (min-width: 1500px){ // 1280是英文状态下nav正常显示的最小宽度
    .nav_box {
        .ind_cen {
            width: auto;
            min-width: 1500px;
            margin: 0 60px;
        }
   }
}
</style>
