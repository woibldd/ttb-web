<template>
  <div
    :class="{loading: loading}"
    class="ix-pannel">
    <div class="ix-header">
      {{ $t('pairnav_title') }}123
      <div class="input-wrap">
        <span class="search-icon">
          <icon name="search"/>
        </span>
        <input
          ref="input"
          :placeholder="$t('searchxxxxx')"
          v-model="search"
          type="text"
          class="input search-input"
          @keydown.ctrl.prevent
          @keydown.meta.prevent>
      </div>
    </div>
    <div class="ix-pannel-body">
      <div
        v-if="errmsg"
        class="no-data">{{ $t(errmsg) }}</div>
      <div
        v-if="!loading && err && !pairList.length"
        class="err">{{ err }}</div>
      <div
        v-show="sortedList.length"
        class="ix-pair-head tr">
        <div
          class="th pair"
          @click="setSort('pair')">
          <sort
            :label="$t('pairnav_pair')"
            :state="stateSortBy('pair')"/>
        </div>
        <div
          class="th price"
          @click="setSort('price')">
          <sort
            :label="$t('pairnav_price')"
            :state="stateSortBy('price')"/>
        </div>
        <div
          class="th delta"
          @click="setSort('delta')">
          <sort
            :label="$t('pairnav_wave')"
            :state="stateSortBy('delta')"/>
        </div>
        <div
          class="th vol"
          @click="setSort('vol')">
          <sort
            :label="$t('pairnav_vol')"
            :state="stateSortBy('vol')"/>
        </div>
      </div>
      <ul
        v-show="sortedList.length"
        :style="{height: height}"
        class="ul ix-pair-body tbody">
        <li
          v-for="pair in sortedList"
          :class="{cur: pair.name === state.pro.pair}"
          :key="pair.id"
          class="tr"
          @click="setPair(pair)">
          <template v-if="!pair.CUSTOM">
            <div class="td pair">{{ pair.product_name }}/{{ pair.currency_name }}</div>
            <div class="td price">
              <span v-if="pair.tick">{{ pair.tick.current | fixed(pair.price_scale) }}</span>
              <span v-else>...</span>
            </div>
            <div
              :class="{'color-up': getDelta(pair.tick) > 0, 'color-down': getDelta(pair.tick) < 0}"
              class="td delta">
              <span v-if="pair.tick">{{ (getDelta(pair.tick) > 0) ? '+' : '' }}{{ getDelta(pair.tick) }}%</span>
              <span v-else>...</span>
            </div>
            <div class="td vol">
              <span v-if="pair.tick">{{ pretty(pair.tick.volume_24h) }}</span>
              <span v-else>...</span>
            </div>
          </template>
          <p v-if="pair.CUSTOM" v-cloak class="custom-title">{{ pair.type === '2' ? $t('pair_list_new') : 'ST???' }}aaa</p>
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
  name: 'PairNav',
  components: {
    Sort,
    CollectStar
  },
  mixins: [tickTableMixin],
  props: {
    initHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      bodyHeight: 0,
      isMac: /Macintosh/.test(navigator.userAgent)
    }
  },
  computed: {
    hotKey() {
      return this.isMac ? ' (Cmd+F)' : ' (Ctrl+F)'
    },
    height() {
      if (this.initHeight) {
        return `${this.initHeight - 80}px`
      }
      return this.bodyHeight
    }
  },
  watch: {
    'state.pro.currency_name': {
      handler(currency) {
        if (currency && !this.local.proOnFav) {
          this.setTab(currency)
        }
      },
      immediate: true
    },
    pairList() { 
    }
  },
  destroyed() {
    this.$eh.$off('app:resize', this.onresize)
    this.$eh.$off('protrade:layout:init', this.layoutInit)
    this.key.unbind(this.isMac ? '???+f' : 'ctrl+f')
  },
  async created() {
    this.$eh.$on('protrade:layout:init', this.layoutInit)
    this.bindHotKey()
  },
  methods: {
    setPair(pair) { 
      this.$router.replace({
        name: 'trading',
        params: {
          pair: pair.name
        }
      })
    },
    pretty(num) {
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
    layoutInit() {
      this.onresize()
      this.$eh.$on('app:resize', this.onresize)
    },
    onresize() {
      this.bodyHeight = this.container.height - 88 + 'px'
    },
    async bindHotKey() {
      this.key = await utils.getExtModule('key')
      this.key((this.isMac ? '???+f' : 'ctrl+f'), () => {
        this.$refs.input.focus()
        return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-title{
  color: #778694
}
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
  color: $nav-grey-color;
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
    margin-left: 14px;
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
  margin-left: 14px;
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
  color: #7D7D7D;
  line-height: 24px;
}
.icon-collect {
  @include retina('~@/assets/icon-collect-white', 'png', 10px, 10px);
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
          top: 13px;
          left: 19px;
}
.input {
  // display: block;
  // background-color: $search-bar-bg;
  // // border-radius: 12px;
  // height: 24px;
  // box-sizing: border-box;
  // border: 1px solid $search-bar-border;
  // outline: none;
  // padding-left: 24px;
  // line-height: 22px;
  // width: 100%;
  // color: fade-out(white, .5);
  // z-index: 1;
  width: 100%;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  background-color: #f3f3f3;
  border:none;
  border-radius: 4px;
  text-indent: 37px;
}
::placeholder {
  color: fade-out(white, .6);
}
</style>
