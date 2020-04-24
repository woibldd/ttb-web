<template>
  <div
    class="app-nav"
    :style="appNavBackground"
    flex="main:justify cross:center">
    <div
      flex="cross:center"
      class="nav-left-container">
      <img
        src="~@/assets/nav_logo.png"
        height="40px"
        alt=""
        @click="$router.push('/')">
      <ul
        flex="main:justify cross:center"
        class="nav-list">
        <li
          v-for="(value,key) in mapNavList"
          :key="key"
          class="text-nowrap"
          :class="{active:$route.path.includes(key)}"
          @click="$router.push(`/${key}`)">{{ value }}</li>
      </ul>
    </div>
    <div
      class="nav-right-container"
      flex="cross:center">
      <template v-if="$store.state.userData">
        <!-- <dropdown style="margin-left:20px" :menu-options="mapBalanceMenu"><div :class="{active:$route.path.includes('property')}" @click="$router.push('/user/property')">资产管理 <i class="el-icon-caret-bottom" /></div></dropdown> -->
        <dropdown
          style="margin-left:20px"
          :menu-options="mapUserCenter"
          label="label">
          <div
            :class="{active:$route.path.includes('/user/')}"
            @click="$router.push('/user/index')">
            {{ $store.state.userData.email||$store.state.userData.phone }} <i class="el-icon-caret-bottom" />
          </div>
        </dropdown>
        <dropdown
          v-if="$route.path === '/share_option/index' && mapBalanceMenu.length"
          v-model="activeShareAccount"
          :tooltip="true"
          label="currency"
          :handle-label="item=>`${item.currency} 账户 / ${bigRound(item.available,4)}`"
          style="margin-left:20px"
          :menu-min-width="250"
          :menu-options="mapBalanceMenu">
          <svg-icon
            slot="item-prefix"
            slot-scope="{data}"
            :icon-class="data.currency.toLowerCase()" />
          <el-link
            slot="item-suffix"
            slot-scope="{data}"
            :disabled="data.currency === 'DEMO'?+data.currency.ordering>0:false"
            :type="data.currency === 'DEMO'?'danger':'primary'"
            :underline="false"
            @click.stop="resetBalance(data.currency)">{{ data.currency === 'DEMO'?'重置体验金':'充值' }}</el-link>
          <div
            v-if="activeShareAccount"
            style="min-width:170px">{{ activeShareAccount.currency }} 账户 / {{ activeShareAccount.available| bigRound(4) }} <i class="el-icon-caret-bottom" /></div>
        </dropdown>
      </template>
      <template v-else>
        <el-link
          :type="$route.path === '/user/login'? 'primary':'info'"
          @click="$router.push(`/user/login?redirect=${$route.path}`)">{{ $tR('signin') }}</el-link>
        <el-divider direction="vertical" />
        <el-link
          :type="$route.path === '/user/register'? 'primary':'info'"
          @click="$router.push('/user/register')">{{ $tR('signup') }}</el-link>
      </template>
      <select-lang />
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import selectLang from '../../components/selectLang'
import { mapNavBackground } from '../../const'
import dropdown from '../../components/dropdown'
import { resetBalance } from '../../api/share_option'
export default {
  name: 'AppNav',
  components: {
    selectLang,
    dropdown
  },
  data () {
    return {
      activeIndex2: '1'
    }
  },
  computed: {
    appNavBackground () {
      const key = Object.keys(mapNavBackground).find(key => this.$route.path.includes(key))
      return key ? { backgroundColor: mapNavBackground[key] } : {}
    },
    mapBalanceMenu () {
      return this.$store.state.mapShareAccount
    },
    mapUserCenter () {
      return [
        { label: '个人中心', path: '/user/index' },
        { label: '资产管理', path: '/user/property' },
        { label: '退出', click: () => this.$store.dispatch('loginout') }
      ]
    },
    activeShareAccount: {
      get () {
        return this.$store.state.activeShareAccount
      },
      set (value) {
        localStorage.setItem('ACTIVESHAREACCOUNT', value.currency)
        this.$store.commit('SET_ACTIVESHAREACCOUNT', value)
      }
    },
    mapNavList () {
      return this.langData.mapNavList
    }
  },
  methods: {
    resetBalance (balance) {
      balance === 'DEMO' && resetBalance().then(res => {
        this.$store.dispatch('getShareAccountList', { accountArr: this.mapBalanceMenu, isAssignment: true })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-nav{
    height: 60px;
    color: #dadada;
    background-color: $--background-color-gray;
    .nav-left-container{
      &>img{
        cursor: pointer;
      }
      .nav-list>li{
        margin: 0 12px;
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        transition: all .5s ease-in-out;
        &:hover,&.active{
          cursor: pointer;
          color: $--color-primary;
          // box-shadow: 0 2px 0 $--color-primary
        }
      }
    }
    .nav-right-container{
      font-size: 14px;
      margin-right: 20px;
      height: 100%;
      .active{
        cursor: pointer;
        color: $--color-primary;
      }
    }
  }
</style>
