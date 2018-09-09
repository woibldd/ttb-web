<template>
  <div class="ix-panel" :class="{loading: loading}">
    <div class="ix-header-sub">
      <a class="ix-header-nav o"
        :class="{cur: tab === 'limit'}"
        @click.prevent="setTab('limit')">
        {{ $t('operate_limit') }}
      </a>
      <a class="ix-header-nav o"
        :class="{cur: tab === 'market'}"
        @click.prevent="setTab('market')">
        {{ $t('operate_market') }}
      </a>
    </div>
    <div class="op-container">
      <ProLimitOrder v-show="tab === 'limit'"></ProLimitOrder>
      <ProMarketOrder v-show="tab === 'market'"></ProMarketOrder>
    </div>
    <!-- <div class="mask" :class="{show: state.userStatus === 0}">
      <div class="mask-front">
        <div class="hint">{{ $t('operate_noauth') }}</div>
        <div class="link-group">
          <a class="link btn ibt signin theme-bgcolor-up" @click.prevent="signin"><span>{{ $t('signin') }}</span></a>
          <router-link class="link btn ibt signup theme-bgcolor-down" :to="{name: 'register'}"><span>{{ $t('signup') }}</span></router-link>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import {state, actions} from '@/modules/store'
import ProLimitOrder from './ProLimitOrder'
import ProMarketOrder from './ProMarketOrder'
import ProStopOrder from './ProStopOrder'

export default {
  name: 'operate',
  components: {
    ProLimitOrder,
    ProMarketOrder,
    ProStopOrder
  },
  data () {
    return {
      state,
      bodyHeight: 0,
      loading: false,
      tab: 'limit'
    }
  },
  methods: {
    setTab (tab) {
      this.tab = tab
    },
    layoutInit () {
      this.onresize()
      this.$eh.$on('app:resize', this.onresize)
    },
    onresize () {
      this.bodyHeight = this.container.height - 32 + 'px'
    },
    signin () {
      actions.setLoginBack({
        fullPath: this.$route.fullPath
      })
      this.$router.push({
        name: 'login'
      })
    }
  },
  destroyed () {
    this.$eh.$off('app:resize', this.onresize)
    this.$eh.$off('protrade:layout:init', this.layoutInit)
  },
  created () {
    this.$eh.$on('protrade:layout:init', this.layoutInit)
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/vars";
@import "../../styles/mixins";

.ix-header-sub {
  height: 32px;
  line-height: 32px;
  text-align: left;
  background-color: $nav;
  color: white;
}
.ix-header-nav {
  font-size: 13px;
  opacity: .4;
  margin: 0 10px;
  transition: opacity 300ms;
  color: white;
  display: inline-block;
  line-height: 30px;
  height: 30px;
  border-bottom: 2px solid transparent;
  vertical-align: top;
  padding: 0 10px;
  &.cur {
    opacity: 1;
    border-bottom: 2px solid white;
  }
}
.op-container {
  box-sizing: border-box;
  padding-bottom: 20px;
  overflow-y: auto;
}
.mask {
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 300ms, visibility 0s 300ms;
  box-sizing: border-box;
  text-align: center;
  background-color: rgba(0,0,0, .8);
  &.show {
    transition: none;
    visibility: visible;
    opacity: 1;
  }
  .mask-front {
    position: absolute;
    top: 42%;
    margin-top: -35px;
    width: 100%;
    text-align: center;
    font-size: 0;
  }
  .hint {
    margin-bottom: 18px;
    font-size: 14px;
    color: white;
  }
  .link-group {
  }
  .link {
    font-size: 12px;
    text-align: center;
    padding: 0 20px;
    min-width: 84px;
    box-sizing: border-box;
    margin: 0 4px 8px;
    color: white;
    border-radius: 3px;
    line-height: 32px;
    &.signin {
      background-color: $buy;
    }
    &.signup {
      background-color: $sell;
    }
  }
}
</style>
