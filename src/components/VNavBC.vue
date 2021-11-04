<template>
  <div
    :class="[myClass, {top: scrollTop===0}]"
    class="bc_nav_box"> 
    <div class="ind_cen"> 
      <router-link 
        v-if="(myClass || '').indexOf('dark') > -1"
        :to="{name:'home'}" 
        :style="{backgroundImage: `url(${require('../assets/ixx/ixx_logo.png')})`}"
        class="nav_logo"/>   
      <!-- <router-link 
        v-else
        :to="{name:'home'}" 
        :style="{backgroundImage: `url(${require('../assets/site/' + state.siteName + '/logo'+ (scrollTop===0 ? '-light' : '-dark') +'.png')})`}"
        class="nav_logo"/>  -->
      <router-link  
        v-else
        :to="{name:'home'}" 
        :style="{backgroundImage:`url(${require('../assets/ixx/ixx_logo'+ (scrollTop===0 ? '-light' : '-dark') +'.png')})`}" 
        class="nav_logo"/>
      <div class="nav_left"> 
        <div  class="left_options" flex="main:left">   
          <div class="mr-10">
            <router-link class="nav_link ml-30" to="/markets">{{$t('market.name')}}</router-link>
          </div>
          <div class="mr-10">
            <div class="nav_link arrow-down ml-30"> 
              <div>{{ $t(`market.product`) }} <icon class="arrow" name="arrow-down" /></div>
              <div class="dropdown-sub-menu">
                <ul class="dropdown-list pt-10 pb-10">
                  <li class="dropdown-item2 pl-24 pr-24"> 
                    <router-link to="/trading" flex="dir:column">
                      <div style="width: 30px;" flex="cross:center">
                        <img src="@/assets/ixx/icon/trading.png" alt=""> 
                      </div>
                      <div>
                        <div>{{$t('trading')}}</div>
                        <div class="info">
                          {{$t('market.tips3')}}
                        </div>
                      </div>
                    </router-link>
                  </li> 
                  <li class="dropdown-item2 pl-24 pr-24"> 
                    <router-link to="/future" flex="dir:column"> 
                      <div style="width: 30px;"  flex="cross:center">
                        <img src="@/assets/ixx/icon/future.png" alt=""> 
                        <!-- <img :src="require(`../assets/site/${state.siteName}/icon/blend.png`)"  alt=""> -->
                      </div>
                      <div>
                        <div>{{$t('contract_btc')}}</div>
                        <div class="info"> 
                          {{$t('market.tips2')}}
                        </div>
                      </div>  
                    </router-link>
                  </li> 
                  <li class="dropdown-item2 pl-24 pr-24"> 
                    <router-link to="/unit" flex="dir:column"> 
                      <div style="width: 30px;" flex="cross:center">
                        <img src="@/assets/ixx/icon/unit.png" alt=""> 
                        <!-- <img :src="require(`../assets/site/${state.siteName}/icon/blend.png`)"  alt=""> -->
                      </div>
                      <div>
                        <div>{{$t('currency-unit')}}</div>
                        <div class="info"> 
                          {{$t('market.tips1')}}
                        </div>
                      </div>  
                    </router-link>
                  </li> 
                  <li class="dropdown-item2 pl-24 pr-24">
                    <router-link to="/mix" flex="dir:column">  
                      <div style="width: 30px;" flex="cross:center"> 
                        <img src="@/assets/ixx/icon/mix.png" alt=""> 
                        <!-- <img :src="require(`../assets/site/${state.siteName}/icon/contract.png`)" alt="">  -->
                      </div>
                      <div>
                        <div>{{$t('currency-mix')}}</div>
                        <div class="info">
                          {{$t('market.tips2')}}
                        </div>
                      </div> 
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div> 
          <div class="mr-10">
            <div class="nav_link arrow-down ml-30"> 
              <div>{{ $t(`market.about`) }} <icon class="arrow" name="arrow-down" /></div>
              <div class="dropdown-sub-menu">
                <ul class="dropdown-list pt-10 pb-10">
                  <li v-if="aboutUsLink" class="dropdown-item pl-24 pr-24"> 
                    <a class="link" target="_blank" :href="aboutUsLink">{{$t('footer_about')}}</a>
                  </li>
                  <li class="dropdown-item pl-24 pr-24">
                    <router-link class="link" to="/fee/mixContractFee">{{$t('market.fee')}}</router-link>
                  </li> 
                </ul>
              </div>
            </div>
          </div> 
        </div>  
      </div> 
      <div class="nav_right">
        <div
          class="nav_item fund mr-15"
          v-if="$route.path === '/share_option' && mapBalanceMenu.length"
           v-popover:popover4 >
          <span
            style="display:inline-block;min-width:160px"
          >{{ activeShareAccount.currency }} {{$t('shareOption.account')}} / {{ activeShareAccount.available| fixed(4) }}</span>
           <el-popover
              ref="popover4"
              popper-class="nav-list"
              placement="bottom"
              style="background:#2C3B4B;"
              trigger="click">
              <div class="pop-dropdown">
              <ul class="dropdown-list pt-10 pb-10" style="min-width:250px">
                <li
                  class="dropdown-item pl-24 pr-24"
                  @click="$store.commit('SET_ACTIVESHAREACCOUNT',item)"
                  flex="main:justify"
                  v-for="item in mapBalanceMenu"
                  :key="item.currency">
                  <el-tooltip
                    :disabled="false"
                    :content="`${item.currency} ${$t('shareOption.account')} / ${$big(item.available).round(4).toFixed(4)}`"
                    placement="left"
                    effect="dark">
                    <a
                      class="text-nowrap"
                      :style="{color:item.currency === activeShareAccount.currency? $primary:'#8C94a1'}"
                    >
                      <svg-icon :icon-class="item.currency.toLowerCase()" />
                      {{item.currency}} {{$t('shareOption.account')}} /{{item.available| fixed(4)}}
                    </a>
                  </el-tooltip>
                  <span
                    class="option"
                    v-if="item.currency === 'DEMO'"
                    @click.stop="resetBalance(item.currency)"
                  >{{$t('shareOption.resetMoney')}}</span>
                  <span v-else class="option">{{$t('shareOption.recharge')}}</span>
                </li>
              </ul> 
              </div>
            </el-popover>
        </div>
        <div
          v-popover:popover1 
          class="set-app-dl right_options"
          style="margin-right: 40px;">
          <a href="javascript:;" 
            class="nav_log_res nav_link">
            <div class="app-dl">
              <icon
                class="mr-3"
                name="topbar-dl-phone"/>APP
            </div>
          </a>
          <el-popover
            ref="popover1" 
            popper-class="download-popover"
            placement="bottom"
            trigger="hover">
            <div
              class="pop">
              <div class="left">
                <h3 style="text-align:center; color: $nav-grey-color;line-height:2em;"><span>{{ $t('nav.download_pop.scan') }}</span></h3>
                <p>
                  <img width="150" src="~@/assets/download/qr-download.png" >
                </p>
              </div> 
            </div>
          </el-popover>
        </div>
        <div
          v-if="!state.userInfo"
          class="right_options mr-30">
          <router-link
            :to="{name:'login'}"
            class="nav_log_res nav_link border-right-1 pr-14 mr-14"
          >{{ $t("signin") }}</router-link>
          <router-link
            :to="{name:'register'}"
            class="nav_log_res nav_link">{{ $t("signup_title") }}</router-link>
        </div>
        <div
          v-else
          class="right_options"> 
          <div class="fund mr-30 nav_link">
            <icon
              :name="fund"
            />
            <span @click="openDefault('fund')">{{ $t('wallets_nav_asset') }}</span> 
            <div class="dropdown-sub-menu">
              <ul class="dropdown-list pt-10 pb-10">
                <li class="dropdown-item pl-24 pr-24">  
                  <router-link 
                    :to="{name: 'new-fund'}"
                    class="link">{{ $t('capital_manage') }}</router-link>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    :to="{name: 'new-deposit'}"
                    class="link">{{ $t('deposit') }}</router-link>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    :to="{name: 'new-withdraw'}"
                    class="link">{{ $t('withdraw') }}</router-link>
                </li>
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    class="link"
                    :to="'/nfund/transfer'">{{ $t('account_exchange') }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div> 
          <div class="email mr-30 nav_link">
            <span @click="openDefault('profile')">{{ desentInfo }}</span>
            <div class="dropdown-sub-menu">
              <ul class="dropdown-list pt-10 pb-10">
                <!-- <li class="dropdown-item pl-24 pr-24 mobile">
                  <router-link
                    :to="{name: 'fund'}"
                    class="link">{{ $t('capital_manage') }}</router-link>
                </li> -->
                <li class="dropdown-item pl-24 pr-24">
                  <router-link
                    :to="{name: 'profile'}"
                    class="link"
                  >{{ $t('profile_personal_center') }}</router-link>
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
        <div class="help">
          <span class="nav_link" @click="openDefault('help')">{{ $t('footer_help') }}</span>
          <div class="dropdown-sub-menu">
            <ul class="dropdown-list pt-10 pb-10">
              <li v-if="announcementLink" class="dropdown-item pl-24 pr-24">
                <a
                  :href="announcementLink"
                  class="link"
                  target="_blank">{{ $t('footer_notice') }}</a>
              </li>
              <li v-if="helpLink" class="dropdown-item pl-24 pr-24">
                <a
                  :href="helpLink"
                  class="link"
                  target="_blank">{{ $t('user_guide') }}</a>
              </li> 
              <li v-if="helpCenter" class="dropdown-item pl-24 pr-24">
                <a
                  :href="helpCenter"
                  class="link"
                  target="_blank">{{ $t('footer_help') }}</a>
              </li>
              <li v-if="requestLink" class="dropdown-item pl-24 pr-24">
                <a
                  :href="requestLink"
                  class="link"
                  target="_blank">{{ $t('footer_request') }}</a>
              </li>
            </ul>
          </div>
        </div> 
        <div class="lang"> 
          <div class='lang_title nav_link'>
            {{`${localeText} | ${state.fiatMoney}`}}
            <!-- <icon class="rig" name="arrow-down"/>  -->
          </div>
          <div class="dropdown-sub-menu lang_account" >
            <div class="lang-ddl-wrap" flex>
              <ul class="dropdown-list pt-10" flex-box="1">
                <li class="dropdown-title pl-20">{{$t('language')}}</li>
                <li class="dropdown-item yuyan pl-20 pr-20"
                  v-for="(value, key) in locales"
                  :key="key"
                  @click="switchLang(key)"
                  flex="main:justify">  
                  <a class="link" target="#">{{ value }}</a> <span v-if="key===state.locale"><icon name="gou" /></span> 
                </li> 
              </ul>
              <ul class="dropdown-list pt-10" flex-box="1">
                <li class="dropdown-title pl-20">{{$t('local_currency')}}</li>
                <li class="dropdown-item  pl-20 pr-20" @click="handleCommand('CNY')" flex="main:justify">
                  <a class="link" target="#">CNY</a> <span v-if="state.fiatMoney==='CNY'"><icon name="gou" /></span>
                </li>
                <li class="dropdown-item  pl-20 pr-20" @click="handleCommand('USD')" flex="main:justify">
                  <a class="link" target="#">USD</a> <span v-if="state.fiatMoney==='USD'"><icon name="gou" /></span>
                </li>
              </ul> 
            </div>
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
import { resetBalance } from "@/modules/api/share_option"

export default {
  components: {
    whDropdown,
  },
  props: {
    dark: {
      type: Boolean,
      default: false
    }, 
    myClass: {
      type: String,
      default: 'dark'
    },
    from: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      state,
      scrollTop: 0,
      locales: utils.locales,
      site: process.env.SITE,  
      utils
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
        } else if (userInfo.email) {
          return utils.publicDesensitization(userInfo.email)[0]
        } else {
          return userInfo.name
        }
      }
      return ''
    },
    helpLink() {
      return '/knowledgeBase/index'
      // return utils.urlTransfor(this.state.theme.help[this.state.locale || 'en'], this.state) 
    },
    requestLink() {
      return 'https://ixxsupport.freshdesk.com/support/tickets/new'
      // if (this.state.userInfo && this.state.theme.themeName === 'default') {
      //   let from = utils.getFrom()
      //   let url = utils.getApiUrl()
      //   return url + 'zendesk/sso?from='+from+'&return_to=' + encodeURIComponent(this.state.theme.request[this.state.locale] || this.state.theme.request.en)
      // } else {
      //   return this.state.theme.request[this.state.locale] || this.request.theme.help.en
      // }
      // return utils.urlTransfor(this.state.theme.request[this.state.locale || 'en'], this.state) 
    },
    announcementLink() {
      return ''
      // return utils.urlTransfor(this.state.theme.announcement[this.state.locale || 'en'], this.state) 
    },
    aboutUsLink() {
      // return this.state.theme.aboutUs[this.state.locale || 'en']
      if (this.state.locale === 'zh-CN') {
        return `https://ix-static.oss-ap-southeast-1.aliyuncs.com/IXX_introduction_zh-CN.pdf`
      } else {
        return `https://ix-static.oss-ap-southeast-1.aliyuncs.com/IXX_introduction_en.pdf`
      }
    },
    apiDocLink() {
      return this.state.theme.apiDoc[this.state.locale || 'en']
    },
    isTestnet() {
      return location.hostname.indexOf('ixex.pro') >= 0 || location.hostname.includes('localhost')
      // return true
    },
    helpCenter() {
      return this.state.theme.helpCenter || ''
    },
    isLogin () {
      return this.state.userInfo !== null
    }, 
    mapBalanceMenu() { 
      return this.$store.state.mapShareAccount;
    }, 
    activeShareAccount: {
      get() {
        return this.$store.state.activeShareAccount;
      },
      set(value) {
        localStorage.setItem("ACTIVESHAREACCOUNT", value.currency);
        this.$store.commit("SET_ACTIVESHAREACCOUNT", value);
      }
    }
  },
  methods: { 
    handleCommand(command) {
      actions.setFiat(command)
    },
    resetBalance(balance) { 
      balance === "DEMO" &&
        resetBalance().then(res => {
          this.$store.dispatch("getShareAccountList", {
            accountArr: this.mapBalanceMenu,
            isAssignment: true
          });
        });
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
    },
    logout() {
      actions.setUserInfo(null)
      utils.setSessionStorageValue('LoginStatus', 0)
      utils.setSessionStorageValue('markTime', 9999999999)
      service.signout().then(res => {
        console.log({ res })
        // window.onload()
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
      this.className = 'active' // console.log($event.currentTarget);
    },
    alert() {
      alert(1)
    },
    openDefault(type) {
      switch (type) {
        case 'fund': 
            this.$router.push({
              name: 'new-fund'
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
    },
    windowScroll() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
    }
  },

  async created() {
    // let res = await service.getCloudSetting() 
    // if (!res.code && res.data) {
    //   this.state.setting = res.data[0]
    // }
    this.$nextTick(() => { 
      window.addEventListener('scroll', this.windowScroll) 
      this.windowScroll()
    })
  }
}
</script>

<style scoped lang="scss">
.bc_nav_box {
  width: 100%;
  height: 60px;
  min-width: 1340px;
  .border-right-1 {
    border-right: 1px solid; 
  }

  .ind_cen {
    position: relative;
    margin: 0 60px 0 0;
    min-width: 1300px;
  }

  .nav_logo {
    float: left;
    width: 170px;
    height: 38px;
    margin-top: 11px;
    display: block;
    // background-image: url("../assets/ixx/ixx_logo.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: center;
    // @include bg-retina('../assets/nav_logo', 'png', 142px, 46px);
  }
  .nav_left {
    float: left;
    // margin-left: 20px; 
    .left_options {
      float: left;
      margin: 0 0 0 40px;
      .nav_link {
        color: $nav-white-color;
        font-size: 14px;
        position: relative;
        display: inline-block;
        padding-top: 20px;
        padding-bottom: 20px; 
        &.arrow-down { 
          .arrow {
            // font-size: 10px;
            transition: all 0.2s ease-in-out;
            &:hover {
              transform: rotate(180deg);
            }
          }
          &:hover {
            .dropdown-sub-menu {
              opacity: 1;
              display: block;
              visibility: visible;
            }
            .nav_link {
              // color: $nav-hover-color;
            }
            .arrow {
              transform: rotate(180deg);
            }
          } 
          .dropdown-sub-menu {
            background: $protrade-bg;
            position: absolute;
            left: 0;
            top: 58px;
            border-radius: 4px;
            z-index: 999;
            opacity: 0;
            display: none;
            visibility: hidden;
            box-shadow: 0 0 2px 0 #ccc;  
            .dropdown-list {
              .dropdown-item {
                height: 40px;
                line-height: 40px;
                white-space: nowrap;
                color: $nav-grey-color;
                .link {
                  // width: 100%;
                  // height: 100%;
                  display: block;
                  color: $nav-grey-color;
                } 
                img {
                  vertical-align: middle;
                }
                &:hover {
                  background: $protrade-bg-hover;
                  .link {
                    color: $nav-hover-color;
                  }
                }
              } 
              .dropdown-item2 {
                padding: 10px 0;
                a {
                  color: #202020;
                }
                .info {
                  white-space: nowrap;
                  font-size: 12px;
                  color:#728598;
                }
                .link {
                  width: 100%;
                  height: 100%;
                  display: block;
                  color: $nav-grey-color;
                }

                &:hover {
                  background: $protrade-bg-hover;
                  .link {
                    color: $nav-hover-color;
                  }
                }
              }
              .dropdown-qrcode {
                line-height: 1.2em !important;
                text-align:center !important;
                span {
                  font-size: 0.9em;
                  color: $nav-white-color;
                }
                i {
                  color: $primary;
                }
              }
            }
          }
        }

        &:hover {
          // color: $nav-hover-color; 
          color: $primary;
        }

        &.router-link-active {
          color: $nav-hover-color;
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
    float: right;
    font-size: 14px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #ffffff; 
    .nav_link { 
      color: $nav-white-color;
    }
    .right_options {
      color: $nav-white-color;
      height: 60px;
      line-height: 60px;
      display: flex;
      align-items: center;
    }

    .fund,
    .email,
    .help,
    .lang {
      float: left;
      // color: $nav-white-color;
      padding: 18px 0;
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
      box-shadow: 0 0 2px 0 #ccc;  
      .dropdown-list {
        .dropdown-item {
          height: 40px;
          line-height: 40px;
            color: $nav-grey-color;
          &.mobile {
            display: none;
          }
          .link {
            width: 100%;
            height: 100%;
            display: block;
            color: $nav-grey-color;
          }

          &:hover {
            background: $protrade-bg-hover;
            .link {
              color: $nav-hover-color;
            }
          }

        }
        .dropdown-item2 {
          .info {
            font-size: 12px;
            color:#728598;
          }
           .link {
            width: 100%;
            height: 100%;
            display: block;
            color: $nav-grey-color;
          } 
          &:hover {
            background: $protrade-bg-hover;
            .link {
              color: $nav-hover-color;
            }
          }
        }
        .option {
          cursor: pointer;
        }
      }
      &.lang_account {
        right: -58px;
        .lang-ddl-wrap {
          width: 260px;
          // background-color: #ffffff; 
          .dropdown-list {
            width: 130px;
            text-align: left;
            .dropdown-title {
              color: #7D7D7D;
              font-size: 12px;
            }
            .yuyan {
              border-right: 1px solid #E7E7E7;
            }
          }
        }
      }
    } 
    .fund:hover,
    .email:hover,
    .help:hover,
    .lang:hover {
      // color: $nav-hover-color;
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
      color: $nav-white-color;
    }
  }
  .nav_right .nav_log_res,
  .nav_right .quit {
    color: $nav-white-color;;
    display: inline-block;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    &:hover,
    &.router-link-active {
      // color: $nav-hover-color;
      color: $primary;
    }
  }
  .help {
    line-height: 24px;
  }
  .lang { 
    margin-left: 20px; 
    line-height: 24px; 
    position: relative;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    z-index: 100;
    .rig {
      display: inline-block;
      transition: all 0.2s ease-in-out; 
      vertical-align: middle;
      font-size: 16px;
    } 
    &:hover { 
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
.light {
  background: $home-header-bglight;
  &.bc_nav_box {
    border-bottom: 1px solid #eee;
    .ind_cen {
      .nav_link {
        color: #020202;
        // color: $primary-back;
      }  
    }
    &.top {
      background: $home-header-bglight-top;
      border-bottom: none;
      .ind_cen {
        .nav_link { 
          // color: $home-header-colorlight;
          color: $primary-back;
        }  
      }
    }
  }
}
.login {
  background: $home-header-login;
}
.pop-dropdown {
  p {
    color: #8C94a1;
    text-align: center;
  }
  ul {
    li {
      height: 2.5em;
      line-height: 2.5em;
      a {
        color: #8C94a1;
      }
      .option { 
        cursor: pointer;
      }
    }
    li:hover {
      background-color: #efefef;
      a {
        color: $primary;
      }
    }
  }
}
@media screen and (min-width: 1300px){ // 1280是英文状态下nav正常显示的最小宽度
    .nav_box {
      width: 100%;
        .ind_cen {
            width: auto;
            min-width: 1300px;
            margin: 0 60px 0 0;
        }
   }
}
</style>
