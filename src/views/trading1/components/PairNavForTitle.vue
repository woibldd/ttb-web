<template>
  <div :class="{loading: loading}" class="ix-pannel">
    <div class="ix-pannel-body">
      <!-- 索引 -->
      <div class="ix-pair-head ">
        <!-- <el-input placeholder="搜索" v-model="search" >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>-->
        <div class="pairs-search">
          <div class="search-box" :skin="state.skin">
            <input 
              v-model="search"
              :placeholder="$t('search')"
              type="text"
              @input="filterPair()">
            <icon name="home-search-t"/>
          </div>
        </div>
      </div>
      <!-- tabs -->
      <div class="ix-pair-head"> 
        <el-tabs v-model="tabSelected" :skin="state.skin" > 
          <el-tab-pane :label="$t('pair_list_option')" name="like"/>
          <el-tab-pane :label="$t('pair_list_all')" name="all"/>
          <el-tab-pane :label="$t('pair_list_main')" name="main"/>
          <el-tab-pane label="Meme" name="Meme"/>
          <el-tab-pane label="GameFi" name="GameFi"/>
          <el-tab-pane label="Layer2" name="Layer2"/>
          <el-tab-pane label="DeFi" name="DeFi"/>
          <el-tab-pane label="NFT" name="NFT"/>
          <el-tab-pane :label="$t('pair_list_new')" name="new"/>
        </el-tabs> 
      </div>
      <div v-show="sortedList.length" class="ix-pair-head tr">
        <div class="th pair" @click="setSort('pair')">
          <sort color="#F5C109"  :sort="sort" :label="$t('pairnav_pair')" :state="stateSortBy('pair')"/>
        </div>
        <div class="th price" @click="setSort('price')">
          <sort color="#F5C109"  :sort="sort" :label="$t('pairnav_price')" :state="stateSortBy('price')"/>
        </div>
        <div class="th delta" @click="setSort('delta')">
          <sort color="#F5C109"  :sort="sort" :label="$t('pairnav_wave')" :state="stateSortBy('delta')"/>
        </div>
        <div class="th vol" @click="setSort('vol')">
          <sort color="#F5C109"  :sort="sort" :label="$t('pairnav_vol')" :state="stateSortBy('vol')"/>
        </div>
      </div>
      <div >
        <!-- <happy-scroll color="rgba(0,0,0,0.5)" size="5" > -->
          <ul v-show="sortedList.length" :style="{'max-height': height}"   class="ul ix-pair-body ix-scroll-body tbody">
            <li
              v-for="(pair,index) in sortedList"
              :class="{cur: pair.name === state.pro.pair}"
              :key="pair.id"
              class="tr"
              :skin="state.skin"
              @click="setPair(pair)"
            >
              <template v-if="!pair.CUSTOM"> 
                <div class="td pair">
                  <span class="row__item percent5" @click.stop="collection(pair)">
                    <icon v-show="pair.like" name="sc-x"/>
                    <icon v-show="!pair.like" name="sc-w"/>
                  </span>
                  {{ pair.product_name }}/{{ pair.currency_name }}
                  <icon v-show="index < 4 && tabSelected==='new' " name="hot-red"/>
                </div>
                <div class="td price">
                  <span v-if="pair.tick">{{ pair.tick.current | fixed(pair.price_scale) }}</span>
                  <span v-else>...</span>
                </div>
                <div
                  :class="{'color-up': getDelta(pair.tick) > 0, 'color-down': getDelta(pair.tick) < 0}"
                  class="td delta"
                >
                  <span
                    v-if="pair.tick"
                  >{{ (getDelta(pair.tick) > 0) ? '+' : '' }}{{ getDelta(pair.tick) }}%</span>
                  <span v-else>...</span>
                </div>
                <div class="td vol">
                  <span v-if="pair.tick">{{ pretty(pair.tick.volume_24h) }}</span>
                  <span v-else>...</span>
                </div>
              </template>
              <div v-if="pair.CUSTOM" v-cloak class="td custom-title">{{ pair.type === '2' ? $t('pair_list_new') : $t('pair_list_ST') }}</div>
            </li>
          </ul>
        <!-- </happy-scroll> -->
        
      </div>
      <div v-show="!sortedList.length && tabSelected==='like'" class="ix-pair-empty">  
        <div class="mt-30">
          <img src="~@/assets/empty.png" alt="" srcset="">
        </div>  
        <span style="color: #5F6B76;font-size:14px">{{$t('pair_table_option_empty')}}</span>
      </div>
      <div v-if="tabSelected!='like' && !sortedList.length" class="no-data">{{ $t('pairnav_no_matched') }}</div>
      <div v-if="!loading && err && !pairList.length" class="err">{{ err }}</div>
    </div>
  </div>
</template>

<script>
import utils from '@/modules/utils'
import { state } from '@/modules/store'
import Sort from './Sort'
import CollectStar from './CollectStar'
import tickTableMixin from '@/mixins/tick-table'
import service from '@/modules/service'

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
    },
    sort: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      state,
      site: process.env.SITE,
      bodyHeight: 0,
      isMac: /Macintosh/.test(navigator.userAgent),
      tabSelected: 'all'
    }
  },
  computed: {
    hotKey() {
      return this.isMac ? ' (Cmd+F)' : ' (Ctrl+F)'
    },
    height() {
      if (this.initHeight) {
        return `${this.initHeight}px`
      }
      return this.bodyHeight
    },
    // tabSelected: {
    //   get() {
    //     return this.state.tabSelected
    //   },
    //   set(val) {
    //     this.state.tabSelected = val
    //   }
    // }
  },
  watch: {
    'state.pro.currency_name': {
      handler(currency) {
        if (currency && !this.local.proOnFav) {
          this.setTab(currency)
        }
      },
      immediate: true
    }
  }, 
  destroyed() {
    this.$eh.$off('app:resize', this.onresize)
    this.$eh.$off('protrade:layout:init', this.layoutInit)
  },
  async created() {
    this.$eh.$on('protrade:layout:init', this.layoutInit)
    // this.$nextTick(() => {
    //   this.tabSelected = 'main'
    // })
  },
  methods: {
    setPair(pair) {
      if (!pair.name) return
      this.$router.replace({
        name: 'trading',
        params: {
          pair: pair.name
        }
      })
      state.close_time = pair.close_time || '[*][*][*][9:59-10:00]'
      state.price_open = pair.price_open || 0.017

      // this.$eh.$emit("switchPair");
      // this.$eh.$emit("trading:countDown", this.startCountDown);
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
      this.bodyHeight = (this.initHeight || this.container.height - 80) + 'px'
    },
    // tabsClick(tab) {
    //   this.state.tabSelected = tab.name;
    // },
    collection(pair) {
      if (pair.like) {
        pair.like = false
        service.delOptional({
          site: 2,
          id: pair.id
        })
      } else {
        pair.like = true
        service.addOptional({
          site: 2,
          id: pair.id
        })
      }
      // pair.like = !(pair.like || false)
    },
    filterPair() {
      // state.tabSelected = 'all'
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-title{
  color: #778694;
  text-indent: 10px;
}
.ix-header {
  height: 32px;
  line-height: 32px;
  padding-left: 12px;
  // background-color: $nav;
  color: white;
  background-color: $--ix-header-bg; 
  &[skin~='dark'] {
    background-color: $--ix-header-bg2; 
  }
}
.ix-header-sub {
  padding-left: 12px;
  height: 40px;
  line-height: 40px;
  // background-color: $nav;
  color: white;
  background-color: $--ix-header-bg; 
  &[skin~='dark'] {
    background-color: $--ix-header-bg2; 
  }
}
.ix-header-nav {
  font-size: 12px;
  opacity: 0.4;
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
.ix-pair-empty {
  text-align: center;
  padding-bottom: .7em;
}
.tr {
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  font-size: 0;
  white-space: nowrap;
}
.th,
.td {
  line-height: 40px;
  font-size: 14px;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 5px;
  font-weight: 400;
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
  width: 30%;
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
    padding-right: 12px;
  }
}
.ix-pair-head {
  .pairs-search { 
    margin: 10px 10px;
    .search-box {
      position:relative;
      font-size: 20px;
      width: 100%;
      height: 29px; 
      // border: 1px solid #4880b3; 
      box-sizing: border-box;
      overflow: hidden;
      padding-top: 2px;
      padding-bottom: 2px;
      display: flex;
      align-items: center; 
      input {
        padding: 0;
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        background-color: #f3f3f3;
        border:none;
        border-radius: 4px;
        text-indent: 37px; 
        &:focus {
          outline: none;
        }
      }
      .iconfont {
        position: absolute;
        top: 7px;
        left: 16px;
          color: #808080 !important;
      }
       
      &[skin~='dark'] { 
        input { 
          background-color: #37373A; 
          color: #fff;
        }
        input::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
  }
  .el-input /deep/ .el-input__inner {
    background-color: $nav !important;
    border-radius: 0;
    border-color: #4880b3; 
    .el-input-group__append {
      background-color: #4880b3;
    }
  }
  .el-tabs /deep/ .el-tabs__nav-wrap {
    &::after { 
      background: $--ix-header-bg; 
    }
    .el-tabs__item {
      // color: $nav-grey-color;
      padding: 0 10px;
      color: #666666;
      &.is-active {
        color: $primary;
      }
      &.is-top:nth-child(2) {
        padding-left: 20px;
      }
    }
    .el-tabs__active-bar {
      background-color: $primary;
    }
  }
  .el-tabs[skin~='dark'] /deep/ .el-tabs__nav-wrap {
    &::after {  
        background: $--ix-header-bg2; 
    } 
  } 
}
.ix-pair-body {
  .tr {
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    cursor: pointer;
  }
  // .tr:nth-child(odd) {
  //   background-color: rgba(255,255,255, 0.03);
  // }
  .tr:hover {
    // background-color: $down-background-hover;
    background-color: $--table-hover;
    &[skin~='dark'] {
      background-color: $--table-hover2; 
    }
  }
  .tr.cur {
    background-color: $--table-hover;
    &[skin~='dark'] {
      background-color: $--table-hover2; 
    }
    // border-top: 1px solid rgba($color: #ffffff, $alpha: 0.5);
    // border-bottom: 1px solid rgba($color: #ffffff, $alpha: 0.5);
  }
}
th {
  color: #788694;
  line-height: 30px;
}
th,
td {
  text-align: center;
  padding: 0 5px;
}
td {
  color: #7D7D7D;
  line-height: 24px;
}
.icon-collect {
  @include retina("~@/assets/icon-collect-white", "png", 10px, 10px);
  width: 24px;
  height: 24px;
  opacity: 0.2;
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
    content: " ";
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
  color: fade-out($input-color, 0.5);
  z-index: 1;
}
::placeholder {
  color: fade-out($input-color, 0.6);
}
</style>
