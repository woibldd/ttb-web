<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">
      <div>{{ $t('wallets_nav_asset') }}
        <span class="ml-30">
          <el-select
            v-model="unit"
            @change="currencyChange"
            value-key="name">
            <el-option
              v-for="(item, idx) in currencyList"
              :key="idx"
              :label="item.name"
              :value="item"/>
          </el-select>
        </span>
      </div>
      <div class="title__right">
        <!-- <router-link
          :to="{name: 'LockWarehouse'}"
          class="c-mine mr-30 dib pointer"><icon
        name="anchor"/>{{ $t('mining') }}</router-link>-->
        <!-- <span @click="showLockModal = true" style="font-size: 14px;"  class="c-mine pointer mr-30 dib"><a >{{ $t('locked') }}</a></span>
        <span @click="showUnlockModal = true" style="font-size: 14px;"  class="c-mine pointer mr-30 dib"><a>{{ $t('unlock') }}</a></span> -->
        <span class="mr-8"  >    
          <router-link 
              class="fund-history"
              :class="{'fund-historc' : !showHistory}" 
              :to="{name:'myAssets'}">
            {{ $t('otc_otutcol_17') }}</router-link>
        </span>

        <span >
          <router-link 
            class="fund-history" 
            :class="{'fund-historc' : showHistory}"
            :to="{name:'assetsHistory', params: {from: 'deposit'}}"
          >{{ $t('capital_record') }}</router-link>
        </span>
      </div>
    </div> 
    <div v-if="!showHistory" class="my-fund-content">
      <div class="information">
        <icon name='information' />
        <span >{{$t('otc_otutcol_16')}}        </span>
      </div>
      <div class="fund-total">
        <div class="total__label">{{ $t('my_balance_equal') }}</div>
        <div class="total__coin">{{ total || 0 | fixed(unit.scale) }} {{ unit.name }}</div>
        <!--  百万usdt活动需要,先写死 -->
        <div
          class="fund-with-usdt"
          v-if="plusMillionUsdt"
        >+{{ millionUsdtAmount }} USDT≈ {{ $big(total).plus($big(plusUsdtEst)).toString() }} {{ unit.name }}</div>
      </div>
      <div>
        <div class="pairs-search">
          <div class="search-box">
            <input
              type="text"
              @input="filterPair()"
              v-model="search">
            <icon
              class="ml-5"
              name="home-search"/>
          </div>
          <div class="ml-20">
            <el-tooltip :content="tipContent" placement="bottom">
              <el-checkbox 
                v-model="hideSmall">{{ $t('fund_my_assets_hide')}}</el-checkbox> 
            </el-tooltip>
          </div>
        </div> 
      </div>
      <el-table :empty-text=" $t('no_data') " :data="showList" class="fund-coin-pool">
        <el-table-column v-for="(hd, idx) in header" :key="idx" :prop="hd.key"   
          :width="hd.width"
          :label="hd.title">
          <template slot-scope="scope">
            <span v-if="hd.key === 'currency'">
              <icon :name="scope.row.currency"/> 
              <i>{{ scope.row[hd.key] }}</i>
            </span>
            <span v-else-if="hd.key==='estValue'">{{ scope.row[hd.key] || 0 | fixed(unit.scale) }}</span>
            <span v-else>{{ scope.row[hd.key] || 0 | fixed(8) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          width="100">
          <template slot-scope="scope"> 
            <template v-if="scope.row.currency==='USDT'">
              <label class="my-fund-label"
                v-if="is_nodes === false"
                @click="nodeBuy"
                v-tooltip.top="{html: true, content: $t('fund_assets_node_buy_tip'), classes: 'assets'}">
                {{$t('fund_assets_node_buy')}}
              </label>
              <label class="my-fund-label dis-my-fund-label"
               v-else>
                {{$t('fund_assets_subscribed')}}
              </label> 
            </template>
          </template> 
        </el-table-column> -->
        <el-table-column
          header-align="right"
          align="right"
          width="400"
          :label="operate.title"
        >
          <template slot-scope="scope">
            <template v-if="is_nodes === false">
                <label class="my-fund-label"
                v-if="scope.row.currency==='USDT'"
                @click="nodeBuy"
                v-tooltip.top="{html: true, content: $t('fund_assets_node_buy_tip'), classes: 'assets'}" 
                >
                {{$t('fund_assets_node_buy')}}
                </label>
            </template>
            <template v-else>
                <label class="my-fund-label dis-my-fund-label"
                v-if="scope.row.currency==='USDT'" 
                >
                {{$t('fund_assets_subscribed')}}
                </label>
            </template>
            <span 
              class="my-fund-operate"> 
               <a href="javascript:;" class="menu-name" @click="routerTransFer(scope.row)">
                  {{ $t('suvbanean') }}
              </a>
            </span>
            <router-link
              v-if="scope.row.depositable"
              :to="'/fund/deposit/' + scope.row.currency"
              class="my-fund-operate"
            >{{ $t('deposit') }}</router-link>
            <router-link
              v-if="scope.row.withdrawable"
              :to="'/fund/withdraw/'+scope.row.currency"
              class="my-fund-operate"
            >{{ $t('withdraw') }}</router-link>
            <router-link
              v-if="scope.row.pairs.length == 1"
              :to="{
                name: 'trading',
                params: {
                  pair: scope.row.pairs[0].name
                }
              }"
              class="my-fund-operate"
            >{{ $t('asset_trading') }}</router-link>
            <el-dropdown size="small" 
              v-else>
              <el-button type="label">
                {{ $t('asset_trading') }}
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(pair,idx) in scope.row.pairs" :key="idx">
                  <router-link 
                    :to="{
                      name: 'trading',
                      params: {
                        pair: pair.name
                      }
                    }"
                    class="my-fund-operate"
                  >{{ pair.product + '/' + pair.currency }}</router-link>
                </el-dropdown-item> 
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div> 
    <div v-if="showHistory">
      <router-view/>
    </div>
      <v-modal :open.sync="showLockModal">
        <div class="lock-modal">
          <div class="modal__title mb-30">{{ $t('locked') }}</div>
          <div class="modal__content">
            <div class="modal__row mb-20">
              <div class="row__label">{{ $t('available_balance') }}</div>
              <div class="row__input">{{ balance.available | round(4) }} IX</div>
            </div>
            <div class="modal__row mb-24">
              <div class="row__label">{{ $t('lock_amount') }}</div>
              <div class="row__input c-999">
                <input
                  type="number"
                  min="20000"
                  :max="maxLock"
                  step="20000"
                  @input="lockAmountChanged"
                  @blur="blur('lock')"
                  :placeholder="$t('integer_ultiple')"
                  v-model="lock_amount"
                >
              </div>
              <span class="maximum" @click="setMax('lock')">{{ $t('maximum') }}</span>
            </div>
            <v-btn
              @click="doLock"
              fontsize="20"
              height="46"
              :disabled="lock_disable"
              :label="$t('locked')"
            />
          </div>
        </div>
      </v-modal>
      <v-modal :open.sync="showUnlockModal">
        <div class="lock-modal">
          <div class="modal__title mb-30">
            {{ $t('unlock') }}
            <span class="sub c-999">*{{ $t('unlocked') }}</span>
          </div>
          <div class="modal__content">
            <div class="modal__row mb-20">
              <div class="row__label">{{ $t('unlock_available') }}</div>
              <div class="row__input">{{ balance.locked }} IX</div>
            </div>
            <div class="modal__row mb-24">
              <div class="row__label">{{ $t('unlocked_amount') }}</div>
              <div class="row__input c-999">
                <input
                  type="number"
                  min="20000"
                  :max="maxUnLock"
                  step="20000"
                  @blur="blur('unlock')"
                  @input="unlockAmountChanged"
                  :placeholder="$t('integer_ultiple')"
                  v-model="unlock_amount"
                >
              </div>
              <span class="maximum" @click="setMax('unlock')">{{ $t('maximum') }}</span>
            </div>
            <div class="unlocking">{{ $t('unlocking') }}: {{ balance.unlocking }} IX</div>
            <v-btn
              @click="doUnLock"
              fontsize="20"
              height="46"
              :disabled="unlock_disable"
              :label="$t('unlock')"
            />
          </div>
        </div>
      </v-modal>
      <transfer-modal :show-modal.sync="showModal" @click="hideModal"/>
    
  </div>
</template>
<script>
import service from '@/modules/service';
import { state, actions } from '@/modules/store';
import utils from '@/modules/utils';
import transferModal from '../contract/transfer-modal';
import _ from 'lodash'
const ExchangePairs = {
  BTC: 'BTC_USDT',
  EOS: 'EOS_BTC',
  ETH: 'ETH_USDT',
  IX: 'IX_BTC'
}

/**
 *
currency 币名
available 可用量
ordering 委托锁定量
withdrawing 提币锁定量
quota 当前提币剩余额度
locking = ordering + withdrawing
amount = available + ordering + withdrawing
max_quota 当前提币总额度
 */
const MIN_AMOUNT_UNIT = 20000

export default {
  name: 'MyFund',
  data () {
    return { 
      tableData: [],
      plusMillionUsdt: false,
      millionUsdtAmount: 1000000,
      showLockModal: false,
      showUnlockModal: false,
      unlock_loading: false,
      lock_disable: true,
      showModal: false,
      unlock_disable: true,
      unlock_amount: '',
      lock_amount: '',
      is_nodes: false,
      // 我的余额
      balance: {
        available: 0,
        unlocking: 0,
        locked: 0
      },
      content: 'assets', 
      currencyList: [
        {
          name: 'CNY',
          symbol: '￥',
          scale: 2
        },
        {
          name: 'USD',
          symbol: '$',
          scale: 4
        }
        // {
        //   name: "BTC",
        //   symbol: "B",
        //   scale: 8
        // }
      ],
      unit: {},
      rates: {},
      search: "",
      hideSmall: false,
      nodePrice: 1000,
      pairList: []
    };
  },
  components: {
    transferModal
  },
  watch: {
    showModal (val) {
      if (!val) {
        this.getAccountBalanceList()
      }
    },
    valueScale () {
      this.getAccountBalanceList()
    }
  },
  computed: {
    showList() {
      let list = this.tableData 
      list =  _.filter(list, pair => { 
        return pair.currency.toUpperCase().indexOf(this.search.toUpperCase()) > -1  
      }) 
      if (this.hideSmall) {  
        list =  _.filter(list, pair => { 
          if (this.unit.name === 'CNY'){
            return this.$big(pair.estValue || 0).gt(50)
          }
          else {
            return this.$big(pair.estValue || 0).gt(10)
          }
        }) 
      }
      return list
    },
    showHistory () {
      return this.$route.name === 'assetsHistory';
    },
    total () {
      let sum = this.$big(0)
      this.tableData.forEach(item => {
        sum = sum.plus(this.getEstValue(item))
      })
      return sum.toString()
    },
    // unit() {
    //   return state.locale === "zh-CN" ? "CNY" : "USD";
    // },
    valueScale () {
      return state.locale === 'zh-CN' ? 2 : 4
    },
    header () {
      return (
        state.locale && [
          { key: 'currency', title: this.$t('fees_name'), width: "100" },
          { key: 'available', title: this.$t('avlb'), width: "100"  },
          { key: 'locking', title: this.$t('asset_th_unavlb'), width: "100"  },
          // {key: 'amount', title: this.$t('total_count')},
          {
            key: 'estValue',
            title: `${this.$t('homechart_fiat')}(${this.unit.name})`,
            width: "130"

          }
        ]
      )
    },
    operate () {
      return state.locale && { key: 'operate', title: this.$t('operation') }
    },
    // 百万usdt活动需要
    plusUsdtEst () {
      let result = 0
      let l = this.tableData.length
      for (let i = 0; i <= l; i++) {
        let item = this.tableData[i]
        if (item && item.currency.toUpperCase() === 'USDT') {
          result = this.getEstValue({
            amount: this.millionUsdtAmount,
            rates: item.rates
          })
          break;
        }
      }
      return result
    },
    // ix锁仓/解锁
    maxLock () {
      if (this.balance.available) {
        return this.$big(this.balance.available)
          .div(MIN_AMOUNT_UNIT)
          .round(0, this.C.ROUND_DOWN)
          .times(MIN_AMOUNT_UNIT)
          .toString()
      }
      return 0
    },
    maxUnLock () {
      if (this.balance.locked) {
        return this.$big(this.balance.locked)
          .div(MIN_AMOUNT_UNIT)
          .round(0, this.C.ROUND_DOWN)
          .times(MIN_AMOUNT_UNIT)
          .toString()
      }
      return 0
    },
    myRemainTotal () {
      return (this.myPower.power || 0) - (this.myPower.amount || 0)
    },
    tipContent() {
      if (this.unit.name === 'CNY') {
        return  this.$t('fund_my_assets_hide_tip') + '50CNY'
      }
      else {
        return this.$t('fund_my_assets_hide_tip') + '10USD'
      }
    }
  },
  async created () {
    if (state.locale === "zh-CN"){
      this.unit = this.currencyList[0]
    } else {
      this.unit = this.currencyList[1]
    }
    //获取汇率
    let res = await service.getAllRate()
    if (!res.code && !!res.data) {
      this.rates = res.data
    }
    console.log('234234')
    //获取币对列表
    let result =  await service.getPairList()
    if (!result.code && !!result.data) {
      this.pairList = result.data.items
    }
    await this.getMine()
    this.getAccountBalanceList()
    this.getIxBalance()

    service.getOrderList().then((res) => {
        this.is_nodes = res.data.is_nodes
    })
    console.log(this.$router.name)
    // this.$nextTick(console.log(this.header))
  },
  methods: {
    // dianji (res) {
    //   this.one = res
    // },
    // dianjs (res) {
    //   this.one = res
    // },
    async nodeBuy() {
      //  const confirm = await utils.confirm(this, { 
      //   customClass: "ix-message-box-wrapper", 
      //   content: this.$i18n.t('是否确定认购并升级为IXX全球节点？本次认购升级将扣除您1000USDT'),
      //   title: this.$i18n.t('confirm')
      // }) 
 
      // if (!confirm) {
      //   return false
      // }
      const h = this.$createElement;
      let message = h('div', {style: 'text-align: center;'}, [
          h('div', { style: 'margin:10px; font-size: 16px;'}, [
              h('span', null, this.$t('fund_assets_node_buy_tip') ), 
            ]),
          h('div', {style: 'font-size: 16px;'}, [ 
            h('span', null, this.$t('fund_assets_node_buy_tip2') ), 
            h('span', {style: 'color:#00CED0;'}, this.nodePrice ), 
            h('span', null, 'USDT' )
          ])
        ])

      const confirm = await utils.confirm(this, {
        customClass: "ix-message-box-wrapper",  
        title: this.$i18n.t('confirm'),
        type: '',
        message 
      });

      if (!confirm) {
        return false
      } 

      service.nodesBuy({uid: state.userInfo.id}).then(res=> {
        if (res.code === 0) {
          utils.success('认购成功。')
          this.getAccountBalanceList() //重新获取数据
          this.is_nodes = true
        } else {
          if (res.message) {
            utils.alert(res.message)
          }
        }
      }) 
    },
    routerTransFer(item) {
      this.$router.push({
        path:'/fund/transfer',
        query: {
          currency: item.currency
        }
      })
    }, 
    filterPair () { 

    }, 
    reset(type) {
      this.blur(type);
      this.unlock_amount = 0;
      this.lock_amount = 0;
      this.getIxBalance();
    },
    hideModal () {
      this.showModal = false
    },
    blur (type) {
      let amount = 0
      if (type === 'lock') {
        if (this.lock_amount === '') {
          this.lock_disable = true
          return;
        }
        amount = this.$big(this.lock_amount)
        if (amount.mod(MIN_AMOUNT_UNIT) !== 0) {
          this.lock_amount = amount
            .div(MIN_AMOUNT_UNIT)
            .round(0, this.C.ROUND_DOWN)
            .times(MIN_AMOUNT_UNIT)
            .toString()
          if (!parseInt(this.lock_amount)) {
            this.lock_disable = true
          }
        }
      } else {
        if (this.unlock_amount === '') {
          this.unlock_disable = true
          return;
        }
        amount = this.$big(this.unlock_amount)
        if (amount.mod(MIN_AMOUNT_UNIT) !== 0) {
          this.unlock_amount = amount
            .div(MIN_AMOUNT_UNIT)
            .round(0, this.C.ROUND_DOWN)
            .times(MIN_AMOUNT_UNIT)
            .toString()
          if (!parseInt(this.unlock_amount)) {
            this.unlock_disable = true
          }
        }
      }
    },
    async doLock () {
      let amount = this.lock_amount
      this.lock_loading = true
      let res = await service.balanceLock({
        amount
      })
      this.lock_loading = false
      if (!res.code) {
        // todo
        this.lock_amount = '';
        utils.success(this.$t('lock_success') + amount + ' IX')
        this.reset('lock')
        this.showLockModal = false
      } else {
        utils.alert(res.message)
      }
    },
    unlockAmountChanged () {
      if (parseInt(this.unlock_amount)) {
        if (this.$big(this.unlock_amount).gt(this.maxUnLock)) {
          this.unlock_amount = this.maxUnLock
        }
        if (!this.unlock_amount) {
          this.unlock_disable = true
        } else {
          this.unlock_disable = false
        }
      } else {
        this.unlock_disable = true
      }
    },
    lockAmountChanged () {
      if (parseInt(this.lock_amount)) {
        if (this.$big(this.lock_amount).gt(this.maxLock)) {
          this.lock_amount = this.maxLock
        }
        if (!this.lock_amount) {
          this.lock_disable = true
        } else {
          this.lock_disable = false
        }
      } else {
        this.lock_disable = true
      }
    },
    setMax (type) {
      if (type === 'lock') {
        this.lock_amount = this.maxLock
        this.lockAmountChanged()
        this.blur(type)
      } else {
        this.unlock_amount = this.maxUnLock
        this.unlockAmountChanged()
        this.blur(type)
      }
    },
    async doUnLock () {
      let amount = this.unlock_amount
      this.unlock_loading = true
      let res = await service.balanceUnLock({
        amount
      })
      this.unlock_loading = false
      if (!res.code) {
        // todo
        this.unlock_amount = '';
        utils.success(this.$t('unlock_success') + amount + ' IX')
        this.reset('lock')
        this.showUnlockModal = false
      } else {
        utils.alert(res.message)
      }
    },
    getAccountBalanceList () {
      // return service.getAccountBalanceList().then(res => {
      return service.getAccountWalletList().then(res => {
        this.tableData = (res.data || []).map(item => {
          item.rates = item.rates || {};
          item.locking = this.$big(item.locking || 0).plus(item.withdrawing || 0).toString();
          item.amount = this.$big(item.locking)
            .plus(this.$big(item.available)) 
            .round(8, this.C.ROUND_DOWN)
            .toString()
          item.estValue = this.getEstValue(item)
          item.available = this.$big(item.available)
            .round(8, this.C.ROUND_DOWN)
            .toString()
          // item.pairs = ExchangePairs[item.currency] || 'BTC_USDT';
          if (item.currency === 'USDT')
            item.pairs = ['BTC_USDT']
          else
            item.pairs = this.pairList.filter(t => t.product === item.currency || t.currency === item.currency)
          return item
        })
      }) 
    },
    // getEstValue(item) {
    //   let res = this.$big(item.amount).times(
    //     this.$big(item.rates[this.unit] || 0)
    //   );
    //   let num = 8;
    //   // if (this.unit === 'USD') {
    //   //   num = 8
    //   // }
    //   return res.round(num, this.C.ROUND_DOWN).toString();
    // },
    getEstValue (item) {
      let res = this.$big(0)
      let unit = this.unit.name
      let {currency, amount} = item
      if (unit === 'BTC') {
        if (currency === 'BTC') {
          res = this.$big(amount)
        } else {
          if (this.rates[currency]) {
            res = this.$big(amount).times(this.rates[currency]['USD'] || 0).div(this.rates['BTC']['USD'])
          }
        }
      } else if (item.rates) {
        res = this.$big(amount).times(this.$big(item.rates[unit] || 0))
      } else {
        if (this.rates[currency]) {
          res = this.$big(amount).times(this.$big(this.rates[currency][unit] || 0))
        }
      }
      return res
    },
    async getMine () {
      let res = await service.getMillionInfoMine()
      if (!res.code && res.data) {
        this.plusMillionUsdt = res.data.state === 1
        this.millionUsdtAmount = this.$big(this.millionUsdtAmount)
          .minus(res.data.reward || 0)
          .round(1)
          .toString()
      } else {
      }
    },
    async getIxBalance () {
      const res = await service.getIxBalance()
      if (!res.code && res.data) {
        this.balance = res.data
      }
    },
    currencyChange (e) {
      this.getAccountBalanceList()
    }, 
  },
  async beforeRouteEnter(to, from, next) { 
    console.log({to, from}) 
    next();
  }
}
</script>

  
<style lang="scss" scoped>
@import './my.scss';

</style>

<style  lang="scss" >
  .ix-message-box-wrapper {
    .el-message-box__title {
      text-align:center;
    }
    .el-message-box__btns {
      .el-button {
        width: 100px;
      }
    }
  }
  // .assets-tip {
  //   // padding: 0 10px;
  //   // line-height: 25px;
  //   // border-radius: 3px;
  //   // box-shadow: 0px 2px 5px #999;
  //     .tooltip-inner {
  //       color: #23CED0;
  //       background: rgba(211, 245, 246, .9); 
  //       border-radius:4px;
  //       padding: 6px 10px;
  //       width: 130px;
  //     }
  //     .tooltip-arrow { 
  //       height: 10px;
  //       width: 10px;
  //       background: red;
  //       border-color: rgba(211, 245, 246, .9); 
  //     }
  // }
</style>
