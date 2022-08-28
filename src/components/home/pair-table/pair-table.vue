      <template>
  <div class="newest-coin-pairs">
    <div class="relative">
      <!-- <div class="pair-title">{{ $t('newest_coin_pairs') }}</div> -->
      <div class="pair-title"> 
        <el-tabs v-model="tabSelected" @tab-click="tabChange" type="card">
          <el-tab-pane :label="$t('pair_list_option')" name="like"/>
          <el-tab-pane  :label="$t('pair_list_main')" name="main"/>
          <el-tab-pane label="DeFi" name="DeFi"/>
          <el-tab-pane label="NFT" name="NFT"/>
          <el-tab-pane label="GameFi" name="GameFi"/>
          <el-tab-pane :label="$t('pair_list_new')" name="new"/>
          <el-tab-pane :label="$t('pair_list_all')" name="all"/>
        </el-tabs>
      </div>
      <div class="pairs-search">
        <div class="search-box">
          <input
            v-model="search"
            type="text"
            @input="filterPair()">
          <icon
            class="ml-5"
            name="home-search"/>
        </div>
      </div>
    </div>
    <div class="pairs-table">
      <div class="pairs-table__head  pl-10 pr-10">
        <div class="head-item percent5"/>
        <!-- <div class="head-item percent13">
          {{ $t('currency') }}
        </div> -->
        <div   class="head-item percent13"
          @click="setSort('pair')">
          <sort
            :label="$t('currency')"
            :state="stateSortBy('pair')"/>
        </div>
        <div class="head-item percent18_8" @click="setSort('price')">
           <sort
            :label="$t('homechart_price')"
            :state="stateSortBy('price')"/>
        </div>
        <div class="head-item percent14_8" @click="setSort('delta')">
          <sort
            :label="$t('homechart_24h_chg')"
            :state="stateSortBy('delta')"/>
        </div>
        <div class="head-item percent14_8" @click="setSort('lowest')">
          <sort
            :label="$t('homechart_24h_l')"
            :state="stateSortBy('lowest')"/>
        </div>
        <div class="head-item percent14_8"  @click="setSort('highest')">
          <sort
            :label="$t('homechart_24h_h')"
            :state="stateSortBy('highest')"/>
        </div>
        <div class="head-item percent14_8" @click="setSort('vol')">
           <sort
            :label="$t('homechart_24h_v')"
            :state="stateSortBy('vol')"/>
        </div>
        <!-- <div class="head-item percent8">
           type
        </div> -->
        <div class="head-item percent8">
          {{ $t('actions') }}
        </div>
      </div>
      <div class="pairs-table-container pl-10 pr-10" >  
        <div v-for="(pair,index) in sortedList" :key="index" @click="toExchange(pair.name)"> 
          <template v-if="pair.tick && !pair.CUSTOM">
            <div class="pairs-table__row c-21">
              <div
                class="row__item percent5 tal_r"
                @click.stop="collection(pair)">
                <icon
                  v-show="pair.like"
                  name="sc-x" style="color:red;"/>
                <icon
                  v-show="!pair.like"
                  name="sc-w"/>
              </div>
              <div class="row__item percent13">
                {{ pair.name | pairfix }}
                <icon v-show="index < 4 && tabSelected==='new' " name="hot-red"/>
              </div>
              <div class="row__item percent18_8 ">
                <span>
                  {{ pair.tick.current | fixed(pair.price_scale) }}
                </span>
                <span class="ml-10 inline-block c-999">{{ state.fiatMoneySymbol }}<fiat-money
                  :base="pair.currency"
                  :value="pair.tick.current"/>
                </span>
              </div>
              <div
                :class="{'color-up': getDelta(pair.tick) > 0, 'color-down': getDelta(pair.tick) < 0}"
                class="row__item percent14_8 c-f24">
                <p v-if="pair.tick">{{ (getDelta(pair.tick) > 0) ? '+' : '' }}{{ getDelta(pair.tick) }}%
                </p>
                <p v-else>...</p>
              </div>
              <div class="row__item percent14_8">
                {{ pair.tick.lowest_24h | fixed(pair.price_scale) }}
              </div>
              <div class="row__item percent14_8">
                {{ pair.tick.highest_24h | fixed(pair.price_scale) }}
              </div>
              <div class="row__item percent14_8">
                {{ pretty(pair.tick.volume_24h) }}<span> {{ pair.product }}</span>
              </div>
             
              <div
                class="row__item percent8 tg"
                @click="toExchange(pair.name)">
                <icon name="handle"/>
              </div>
            </div>
          </template>   
          <!-- <p v-else-if="pair.CUSTOM" v-cloak class="custom-title">{{ pair.group == 2 ? $t('pair_list_new') :  $t('pair_list_ST')  }}</p> -->
        </div>
        <div v-if="tabSelected==='like' && sortedList.length===0" class="pairs-table__row empty" style="padding:40px 0;height: initial;line-height:normal">
          <img src="./empty-data.png" alt="" srcset="">
          <br>
          <span style="color: #adadad;">{{$t('pair_table_option_empty')}}</span>
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
import { state } from '@/modules/store'
import service from '@/modules/service'
import { pairfix } from '@/mixins/index'
import tickTableMixin from '@/mixins/tick-table'
import dataView from './data-view'
import Sort from '@/views/trading1/components/Sort' 
export default {
  components: {
    dataView
  },
  components: { Sort },
  mixins: [pairfix, tickTableMixin],
  props: {
    // sortedList: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
    // getDelta: {
    //   type: Function,
    //   default() {
    //     return v => v
    //   }
    // }

  },
  data() {
    return {
      state,
      searchCoin: '',
      search: '',
      activeName: 'like'
    }
  },
  computed: {
    tabSelected: {
      get() {
        return state.tabSelected
      },
      set(val) {
        state.tabSelected = val
        
      }
    }
  },
  methods: {
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
    toExchange(pair) {
      if (!pair) return
      this.$router.push({
        name: 'trading',
        params: {
          pair: pair
        }
      })
    },
    filterPair() {
      // state.tabSelected = 'all'
      this.$emit('searching', this.search)
    },
    // tabsClick(tab, event) {
    //   this.$emit('switchTab', tab.name)
    // },
    collection(pair) {
      if (pair.like) {
        pair.like = false
        service.delOptional({
          site: 11,
          id: pair.id
        })
      } else {
        pair.like = true
        service.addOptional({
          site:11,
          id: pair.id
        })
      }
      // pair.like = !(pair.like || false)
    },
    tabChange (val) { 
      this.$emit('switchTab', val.name) 
    },
  }
}
</script>
<style lang="scss">
.newest-coin-pairs {
  .el-tabs__header {
    margin: 0;
  }
}
</style>
<style lang="scss" scoped>
@import './pair-table.scss';
.custom-title{
  border-bottom: 1px solid rgb(230, 230, 230);
  color: rgb(33, 33, 33);
  margin-top: 10px;
  line-height: 40px;
  text-indent: 30px;
}
.empty {
  display: block !important;
  text-align: center;
  border-bottom: none !important;
}
</style>
