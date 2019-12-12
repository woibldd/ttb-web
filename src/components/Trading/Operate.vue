<template>
  <div
    class="ix-panel"
    :class="{loading: loading}">
    <div class="ix-header-sub">
      <a
        class="ix-header-nav raw limit"
        :class="{cur: tab === 'limit'}"
        @click.prevent="setTab('limit')">
        {{ $t('operate_limit') }}
      </a>

      <a
        class="ix-header-nav raw market"
        :class="{cur: tab === 'market'}"
        @click.prevent="setTab('market')">
        {{ $t('operate_market') }}
      </a>
      <a
        v-if="isTestnet"
        class="ix-header-nav raw stop"
        :class="{cur: tab === 'stop'}"
        @click.prevent="setTab('stop')">
        {{ $t('trading_page.stop_order.stop_win_loss') }}
      </a>

      <router-link
        class="mr-20"
        style="float:right;"
        :to="{name: 'Fee'}">{{ $t('footer_fee') }}</router-link>
    </div>
    <div class="op-container">
      <ProLimitOrder v-show="tab === 'limit'"/>
      <ProMarketOrder v-show="tab === 'market'"/>
      <ProStopOrder v-show="tab === 'stop'"/>
    </div>
    {{state.userStatus}}
    <div
      class="mask"
      :class="{show: +state.userStatus === 0}">
      <div class="mask-front">
        <div class="hint">{{ $t('operate_noauth') }}</div>
        <div class="link-group">
          <a
            class="link btn ibt signin bgcolor-up"
            @click.prevent="signin"><span>{{ $t('signin') }}</span></a>
          <router-link
            class="link btn ibt signup bgcolor-down"
            :to="{name: 'register'}"><span>{{ $t('signup') }}</span></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {state, actions} from '@/modules/store'
import ProLimitOrder from './ProLimitOrder'
import ProMarketOrder from './ProMarketOrder'
import ProStopOrder from './ProStopOrder' 
import utils from '@/modules/utils'

export default {
  name: 'Operate',
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
      this.$eh.$emit('order:tab_switch', tab)
    },
    layoutInit () {
      this.onresize()
      this.$eh.$on('app:resize', this.onresize)
    },
    onresize () {
      // this.bodyHeight = this.container.height - 32 + 'px'
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
  computed: {
    isTestnet() { 
      return (
        location.hostname.indexOf("ixex.pro") >= 0 ||
        location.hostname.includes("localhost") ||
        location.hostname.includes("127.0.0.1")
      );
    },
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



.ix-header-sub {
  height: 32px;
  line-height: 32px;
  text-align: left;
  background-color: $nav;
  color: white;
}
.ix-header-nav {
  font-size: 12px;
  opacity: .4;
  transition: opacity 300ms;
  color: white;
  display: inline-block;
  line-height: 30px;
  height: 30px;
  border-top: none;
  vertical-align: top;
  padding: 0 20px;
  &.cur {
    opacity: 1;
    background: $protrade-bg;
    border-top: 2px solid $primary;
  }
  // &.limit {
  //   border-color: #ff0000;
  // }
  // &.market {
  //   border-color: #00ff00;
  // }
}
.op-container {
  box-sizing: border-box;
  padding-bottom: 10px;
  overflow-y: auto;
  flex: 1;
  min-height: 250px;
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
  background-color: RGBA(12, 18, 34, .8);
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
