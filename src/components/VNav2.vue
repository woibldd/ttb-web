<template>
  <div class="header-nav" :class="{pro: pro}">
    <transition name="fade">
      <div class="notice-div" v-if="notice">
        <div class="content-div">
          <span class="content">{{ notice.content }}</span>
          <div class="detail-div">
            <a target="_blank" class="detail" :href="notice.action">{{ $t('home_show_detail') }}</a>
          </div>
        </div>
        <div class="icon" @click="hideNotice()">
          <icon name="x"></icon>
        </div>
      </div>
    </transition>
    <router-link :to="{name: 'home'}">
      <div class="logo"></div>
    </router-link>
    <div class="left-links">
      <router-link class="link" :class="{'home': isHome}" :to="{path: '/trading'}"><span>{{ $t('trading') }}</span></router-link>
      <router-link class="link" :class="{'home': isHome}" :to="{path: '/wallets'}"><span>{{ $t('asset') }}</span></router-link>
    </div>
    <div class="right-links">
      <template v-if="state.userStatus >= 0">
        <a class="link" :class="{'home': isHome}" target="_blank" v-if="state.theme.themeName === 'default'"  :href="announcementLink">{{ $t('footer_notice') }}</a>
        <a class="link" :class="{'home': isHome}" :href="helpLink" target="_blank"><span>{{ $t('help') }}</span></a>
        <a v-if="!state.userInfo" class="link signin" :class="{'home': isHome}" @click.prevent="signin"><span>{{ $t('signin') }}</span></a>
        <router-link v-if="!state.userInfo" class="link signup" :class="{'home': isHome}" :to="{name: 'signup'}"><span>{{ $t('signup') }}</span></router-link>
        <a v-if="state.userInfo" class="icon-link link dropdown-anchor" @click.prevent>
          <span class="icon-user"></span>
          <div class="dropdown-tri" v-if="!closed"></div>
          <ul class="dropdown-linklist user-info" @click.stop="close" v-if="!closed">
            <li class="dropdown-link user-center" @click="goProfile">
              <span class="label">{{ $t('userCenter') }}</span>
              <span class="mail">{{ state.userInfo.email }}</span>
            </li>
            <li class="dropdown-link" @click="signout">
              <span class="signout" v-t="'signout'"></span>
            </li>
          </ul>
        </a>
      </template>
      <a class="link dropdown-anchor lang-selector" @click.prevent>
        <span class="flag">
          <icon name="home-earth"/>
        </span>
        <span class="lang-cur">{{ state.locale | localeName }}</span>
        <ul class="dropdown-linklist" @click.stop="close" v-if="!closed">
          <li v-for="(locale, index) in state.locales"
            :key="index"
            class="dropdown-link"
            @click="setLocale(locale)">
            <span>{{ locale | localeName }}</span>
          </li>
        </ul>
      </a>
      <a class="link setting" @click.prevent="settingOpen = !settingOpen">
        <span class="icon-wrap">
          <icon name="shezhi" />
        </span>
      </a>
    </div>
    <v-modal :open="settingOpen" @close="settingOpen = false">
      <setting-modal :show="settingOpen" />
    </v-modal>
  </div>
</template>

<script>
import {state, actions} from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'
import SettingModal from '@/components/SettingModal'

export default {
  name: 'vNav',
  props: ['pro', 'isHome', 'notice'],
  components: {
    SettingModal
  },
  data () {
    return {
      state,
      closed: false,
      settingOpen: false
    }
  },
  i18n: {
    messages: {
      'zh-CN': {
        'footer_wechat': '微信客服',
        'mining_robot': '挖矿机器人'
      },
      en: {
        'footer_wechat': 'Wechat Customer Service',
        'mining_robot': 'Mining Robot'
      }
    }
  },
  computed: {
    helpLink () {
      if (this.state.userInfo && this.state.theme.themeName === 'default') {
        return '/gate/zendesk/auth'
      } else {
        return this.state.theme.help[this.state.locale] || this.state.theme.help.en
      }
    },
    announcementLink () {
      return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
    }
  },
  methods: {
    goProfile () {
      this.$router.push({
        name: 'profile'
      })
    },
    signin () {
      actions.setLoginBack({
        fullPath: this.$route.fullPath
      })
      this.$router.push({
        name: 'login'
      })
    },
    async signout () {
      actions.setUserInfo(null)
      service.signout()
      if (utils.getRouteMeta(this.$route, 'auth')) {
        this.$router.push({
          name: 'login'
        })
      }
    },
    setLocale (locale) {
      actions.setLocale(locale)
    },
    close () {
      this.closed = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.closed = false
        })
      })
    },
    hideNotice () {
      this.$emit('hide')
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
@import "../styles/vars";
@import "../styles/mixins";

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.v-route-eosforcevote {
  .header-nav {
    background: none;
  }
}
.header-nav {
  font-size: 20px;
  position: relative;
  height: 90px;
  color: #C9CACA;
  width: 100%;
  min-width: $page-width;
  z-index: 10000;
  background-color: $normal-nav;
  .notice-div{
    box-sizing: border-box;
    background: #4956C9;
    padding: 0 30px;
    height: 90px;
    overflow: hidden;
    display: flex;
    align-items: center;
    font-size:16px;
    line-height:30px;
    color: #FFF;
    justify-content: space-between;
    .content-div{
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;
      .content {
        max-width: 1100px;
        margin-right: 10px;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow: hidden;
      }
    }
    .icon {
      color: #FFF;
      cursor: pointer;
      .iconfont {
        font-size: 16px;
      }
    }
    .detail-div{
      a {
        color: #FFF;
        line-height: 20px;
        height: 20px;
        border-bottom: 1px solid #FFF;
      }
    }
  }
}
.header-nav.pro {
  box-sizing: border-box;
  border-bottom: 1px solid #51556C;
  background-color: $nav;
  min-width: auto;
}
.logo {
  float: left;
  width: 143px;
  height: 90px;
}
a.link {
  color: rgba(255,255,255, .9);
  &.home:hover {
    color: white;
    border-bottom: 2px solid #fff;
  }
}
.link {
  float: left;
  line-height: 90px;
  margin-right: 10px;
  padding: 0 10px;
  position: relative;
  span {
    position: relative;
    display: inline-block;
    vertical-align: top;
  }
  .icon-user {
    margin-top: 15px;
    @include retina('../assets/account', 'png', 20px, 20px);
  }
  &.router-link-active {
    color: #C1A538;
    // span:after {
    //   content: ' ';
    //   position: absolute;
    //   bottom: 0;
    //   height: 2px;
    //   left: 0;
    //   margin-left: -4px;
    //   background-color: rgba(255,255,255, .5);
    //   width: 100%;
    //   padding: 0 4px;
    // }
  }
  &.icon-link.router-link-active {
    span:after {
      display: none;
    }
  }
  &.link-weixin{
    position: relative;
    &:hover{
      .qr-code {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  .qr-code{
    padding: 35px 35px 0 35px;
    display: flex;
    flex-direction: column;
    background: #FFF;
    border-radius: 4px;
    position: absolute;
    box-sizing: border-box;
    box-shadow:0px 0px 40px 0px rgba(0,0,0,0.2);
    left:50%;
    top:54px;
    margin-left: -85px;
    width: 170px;
    height: 170px;
    opacity: 0;
    visibility: hidden;
    transition: .2s ease-in;
    cursor: auto;
    img{
      width: 100px;
      height: 100px;
    }
    span{
      position: absolute;
      top: -12px;
      left: 80px;
      width: 0;
      height: 0;
      border-bottom: 12px solid #FFF;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }
    p{
      text-align: center;
      color: #303030;
      font-size:14px;
      line-height:20px;
      margin-top: 10px;
      width: 170px;
      position: absolute;
      bottom: 15px;
      left: 0px;
    }
  }
}
.left-links {
  float: left;
}
.right-links {
  float: right;
}
.dropdown-tri {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
}
.dropdown-tri:after {
  content: ' ';
  width: 8px;
  height: 5px;
  box-sizing: border-box;
  border-bottom: 5px solid white;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -4px;
}
.right-links {
  .lang-selector {
    padding: 14px 0;
    box-sizing: border-box;
    line-height: 22px;
    margin-right: 14px;
    &:hover{
      border: 0;
    }
  }
  .lang-cur {
    height: 22px;
    line-height: 22px;
    font-size: 16px;
    color: #E1E0EA;
    box-sizing: border-box;
  }
  .setting {
    font-size: 24px;
  }
}
.dropdown-anchor {
  position: relative;
  &:hover {
    .dropdown-tri,
    .dropdown-linklist {
      opacity: 1;
      visibility: visible;
      transition: opacity 300ms;
    }
  }
  .flag{
    margin-right: 4px;
    margin-top: 1px;
    height: 20px;
    width: 20px;
    .iconfont{
      font-size: 20px;
    }
  }
  .dropdown-tri,
  .dropdown-linklist {
    transition: opacity 300ms, visibility 0s 300ms;
    opacity: 0;
    visibility: hidden;
  }
  .dropdown-linklist {
    background-color: white;
    position: absolute;
    right: 0;
    top: 90px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: -1px 1px 1px rgba(128,128,128,.1);
  }
  .dropdown-link {
    width: 120px;
    box-sizing: border-box;
    line-height: 39px;
    height: 40px;
    color: $text;
    text-align: center;
    padding: 0 20px;
    &:hover {
      background-color: $dropdown-bg;
    }
    &:last-child {
      span {
        border-bottom: none;
      }
    }
    span{
      border-bottom: 1px solid #DDDDDD;
      display: block;
    }
  }
  .user-info .dropdown-link {
    text-align: left;
    width: auto;
    max-width: 180px;
    min-width: 120px;
    padding: 0 12px;
    border-bottom: 1px solid #DDDDDD;
    height: auto;
    span {
      border-bottom: none;
    }
    &.user-center {
      line-height: 20px;
      padding: 12px;
      .label {
        font-weight: bold;
        white-space: nowrap;
      }
      .mail {
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
