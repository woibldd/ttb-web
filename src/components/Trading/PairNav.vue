<template>
  <div class="ix-pannel" :class="{loading: loading}">
    <div class="ix-header">
      {{ $t('pairnav_title') }}
      <div class="input-wrap">
        <span class="search-icon">
          <icon name="search"></icon>
        </span>
        <input type="text" ref="input"
          class="input search-input"
          :placeholder="$t('search')"
          @keydown.ctrl.prevent
          @keydown.meta.prevent
          v-model="search">
      </div>
    </div>
    <div class="ix-header-sub">
      <a class="ix-header-nav favor" :class="{cur: tab === '*'}" @click.prevent="setTab('*')">
        <i class="icon-collect"></i>
      </a>
      <a class="ix-header-nav"
        v-for="currency in group"
        href="javascript:;"
        :key="currency"
        :class="{cur: tab === currency}"
        @click.prevent="setTab(currency)">
        {{ currency }}
      </a>
    </div>
    <div class="ix-pannel-body">
      <div class="no-data" v-if="errmsg">{{ $t(errmsg) }}</div>
      <div class="err" v-if="!loading && err && !pairList.length">{{ err }}</div>
      <div class="ix-pair-head tr" v-show="sortedList.length">
        <div class="th collect"></div>
        <div class="th pair" @click="setSort('pair')">
          <sort :label="$t('pairnav_pair')"
            :state="stateSortBy('pair')"></sort>
        </div>
        <div class="th price" @click="setSort('price')">
          <sort :label="$t('pairnav_price')"
            :state="stateSortBy('price')"></sort>
        </div>
        <div class="th delta" @click="setSort('delta')">
          <sort :label="$t('pairnav_wave')"
            :state="stateSortBy('delta')"></sort>
        </div>
        <div class="th vol" @click="setSort('vol')">
          <sort :label="$t('pairnav_vol')"
            :state="stateSortBy('vol')"></sort>
        </div>
      </div>
      <ul class="ul ix-pair-body tbody" :style="{height: bodyHeight}" v-show="sortedList.length">
        <li class="tr" v-for="pair in sortedList"
          :class="{cur: pair.name === state.pro.pair}"
          :key="pair.id"
          @click="setPair(pair)">
          <collect-star class="td collect" :pair="pair.name" @click.native.stop :key="pair.name">
            <i slot="collected" class="icon-collect collected"></i>
            <i slot="uncollect" class="icon-collect"></i>
          </collect-star>
          <div class="td pair">{{ pair.product_name }}/{{ pair.currency_name }}</div>
          <div class="td price">
            <span v-if="pair.tick">{{ pair.tick.current | fixed(pair.price_scale) }}</span>
            <span v-else>...</span>
          </div>
          <div class="td delta" :class="{'theme-color-up': getDelta(pair.tick) > 0, 'theme-color-down': getDelta(pair.tick) < 0}">
            <span v-if="pair.tick">{{ (getDelta(pair.tick) > 0) ? '+' : ''}}{{ getDelta(pair.tick) }}%</span>
            <span v-else>...</span>
          </div>
          <div class="td vol">
            <span v-if="pair.tick">{{ pretty(pair.tick.volume_24h) }}</span>
            <span v-else>...</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import utils from '@/modules/utils'
import Sort from './Sort'
import CollectStar from './CollectStar'
import tickTableMixin from '@/mixins/tick-table'

export default {
  name: 'pairNav',
  mixins: [tickTableMixin],
  components: {
    Sort,
    CollectStar
  },
  data () {
    return {
      bodyHeight: 0,
      isMac: /Macintosh/.test(navigator.userAgent)
    }
  },
  watch: {
    'state.pro.currency_name': {
      handler (currency) {
        if (currency && !this.local.proOnFav) {
          this.setTab(currency)
        }
      },
      immediate: true
    }
  },
  computed: {
    hotKey () {
      return this.isMac ? ' (Cmd+F)' : ' (Ctrl+F)'
    }
  },
  methods: {
    setPair (pair) {
      this.$router.replace({
        name: 'trading',
        query: {
          pair: pair.name
        }
      })
    },
    pretty (num) {
      num = this.$big(num || 0)
      if (num < 100) {
        return num.toFixed(2)
      }
      if (num < 1e6) {
        return num.toFixed(0)
      }
      if (num < 1e7) {
        return num.div(1e6).toFixed(1) + ' M'
      }
      if (num < 1e9) {
        return num.div(1e6).toFixed(0) + ' M'
      }
      if (num < 1e10) {
        return num.div(1e9).toFixed(1) + ' B'
      }
      return num.div(1e9).toFixed(0) + ' B'
    },
    layoutInit () {
      this.onresize()
      this.$eh.$on('app:resize', this.onresize)
    },
    onresize () {
      this.bodyHeight = this.container.height - 88 + 'px'
    },
    async bindHotKey () {
      this.key = await utils.getExtModule('key')
      this.key((this.isMac ? '⌘+f' : 'ctrl+f'), () => {
        this.$refs.input.focus()
        return false
      })
    }
  },
  destroyed () {
    this.$eh.$off('app:resize', this.onresize)
    this.$eh.$off('protrade:layout:init', this.layoutInit)
    this.key.unbind(this.isMac ? '⌘+f' : 'ctrl+f')
  },
  async created () {
    this.$eh.$on('protrade:layout:init', this.layoutInit)
    this.bindHotKey()
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/vars";
@import "../../styles/mixins";

.ix-header {
  height: 32px;
  line-height: 32px;
  padding-left: 12px;
  background-color: $nav;
  color: white;
}
.ix-header-sub {
  padding-left: 12px;
  height: 24px;
  line-height: 24px;
  background-color: $nav;
  color: white;
}
.ix-header-nav {
  font-size: 12px;
  opacity: .4;
  margin-right: 12px;
  transition: opacity 300ms;
  color: white;
  display: inline-block;
  line-height: 22px;
  height: 22px;
  border-bottom: 2px solid transparent;
  vertical-align: top;
  padding: 0 2px;
  &.cur {
    opacity: 1;
    border-bottom: 2px solid white;
  }
  &.favor {
    margin-left: -4px;
    margin-right: 2px;
  }
  .icon-collect {
    width: 20px;
    height: 22px;
    opacity: 1;
  }
}
.tr {
  font-size: 0;
  white-space: nowrap;
}
.th,
.td {
  line-height: 24px;
  font-size: 12px;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 5px;
}
.th {
  padding: 4px 5px;
  color: #788694;
  &.pair {
    padding: 4px 0;
  }
}
.collect {
  font-size: 0;
  width: 10%;
  padding: 0;
  text-align: center;
}
.pair {
  padding: 0;
  width: 20%;
}
.price {
  width: 30%;
  text-align: right;
}
.delta {
  text-align: right;
  width: 20%;
}
.vol {
  text-align: right;
  width: 20%;
}
.td {
  &.pair {
    padding-left: 2px;
  }
  &.price {
    padding-right: 7px;
  }
  &.delta {
    padding-right: 7px;
  }
  &.vol {
    padding-right: 7px;
  }
}
.ix-pair-head {

}
.ix-pair-body {
  overflow-y: auto;
  .tr {
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    cursor: pointer;
  }
  .tr:nth-child(odd) {
    background-color: rgba(255,255,255, 0.03);
  }
  .tr:hover {
    background-color: #262b3e;
  }
  .tr.cur {
    background-color: $primary-opacity;
    border-top: 1px solid rgba($color: #ffffff, $alpha: 0.5);
    border-bottom: 1px solid rgba($color: #ffffff, $alpha: 0.5);
  }
}
th {
  color: #788694;
  line-height: 30px;
}
th, td {
  text-align: center;
  padding: 0 5px;
}
td {
  color: #BCBFCE;
  line-height: 24px;
}
.icon-collect {
  @include retina('../../assets/icon-collect-white', 'png', 10px, 10px);
  width: 24px;
  height: 24px;
  opacity: .2;
  display: inline-block;
  vertical-align: top;
  &.collected {
    opacity: 1;
  }
}
.icon-collecting {
  width: 24px;
  height: 24px;
  padding: 7px;
  box-sizing: border-box;
  text-align: center;
  display: inline-block;
  vertical-align: top;
  &:after {
    content: ' ';
    @include spinner(5px);
  }
}
.no-data,
.err {
  line-height: 70px;
  text-align: center;
  color: rgba(200,200,200, .2);
}
.input-wrap {
  position: absolute;
  width: 168px;
  right: 10px;
  top: 4px;
  height: 24px;
}
.search-icon {
  position: absolute;
  left: 8px;
  font-size: 14px;
  top: 1px;
  height: 22px;
  line-height: 22px;
  z-index: 2;
  color: #525668;
}
.input {
  display: block;
  background-color: $search-bar-bg;
  // border-radius: 12px;
  height: 24px;
  box-sizing: border-box;
  border: 1px solid $search-bar-border;
  outline: none;
  padding-left: 24px;
  line-height: 22px;
  width: 100%;
  color: fade-out(white, .5);
  z-index: 1;
}
::placeholder {
  color: fade-out(white, .6);
}
</style>
