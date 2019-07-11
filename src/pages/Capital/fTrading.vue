<!--<template>-->
<!--<div class="fund-container my-fund-container">-->
<!--<div class="title-box">-->
<!--<div>{{ $t('trading') }}</div>-->
<!--</div>-->
<!--<div class="gz-wrapper clearfix">-->
<!--<span>法币资产估值</span>-->
<!--<h1>¥ 0.00000000</h1>-->
<!--</div>-->
<!--</div>-->
<!--</template>-->

<!--<script type="text/ecmascript-6">-->
<!--export default {}-->
<!--</script>-->

<!--<style lang="scss" rel="stylesheet/scss" scoped>-->

<!--</style>-->
<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">
      <div>
        {{ $t('otc_account') }}
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
          name="anchor"/>{{ $t('mining') }}</router-link> -->
        <!--<span-->
        <!--@click="showLockModal = true"-->
        <!--class="c-mine pointer mr-30 dib">-->
        <!--{{ $t('locked') }}-->
        <!--</span>-->
        <!--<span-->
        <!--@click="showUnlockModal = true"-->
        <!--class="c-mine pointer mr-30 dib">-->
        <!--{{ $t('unlock') }}-->
        <!--</span>-->
        <!--<router-link-->
        <!--v-if="!showHistory"-->
        <!--class="fund-history"-->
        <!--:to="{name:'assetsHistory', params: {from: 'deposit'}}"> {{ $t('capital_record') }}</router-link>-->
      </div>
    </div>
    <div class="gz-wrapper clearfix">
      <span>{{$t('otc_otutcol_13')}}</span>

      <h1> 
        <icon :name="unit.name+'-unit'" />
        {{ total | fixed(unit.scale)}}</h1>
    </div>
    <div 
      class="my-fund-content"> 
      <el-table :empty-text=" $t('no_data') "
                :data="tableData"
                class="fund-coin-pool">
        <el-table-column
          v-for="(hd, idx) in header"
          :key="idx"
          :prop="hd.key"
          :label="hd.title">
          <template slot-scope="scope">
            <span v-if="hd.key === 'currency'">
              <icon :name="scope.row.currency"/>
              <i>{{scope.row[hd.key]}} </i>
            </span>
            <span v-else-if="hd.key === 'estValue'">{{ scope.row[hd.key] || 0 | fixed(unit.scale) }}</span>
            <span v-else>{{ scope.row[hd.key] || 0 }}</span>
          </template>
        </el-table-column>

        <el-table-column
          header-align='right'
          align="right"
          min-width="230px"
          :label="operate.title">
          <template slot-scope="scope">
            <!-- <span
              @click="showModal = true"
              class="my-fund-operate">{{ $t('account_exchange') }}</span>   -->
            <router-link
              :to="{name: 'OTC'}"
              class="my-fund-operate">{{ $t('asset_trading') }}</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <transfer-modal
      :show-modal.sync="showModal"
      :showModal="showModal"
      @click="hideModal"/>
  </div>
</template>
<script>
  import service from '@/modules/service'
  import {state} from '@/modules/store'
  import utils from '@/modules/utils'
  import transferModal from '@/components/Fund/contract/transfer-modal'

  const ExchangePairs = {
    'BTC': 'BTC_USDT',
    'EOS': 'EOS_BTC',
    'ETH': 'ETH_USDT',
    'IX': 'IX_BTC'
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
        showModal:false,
        rates: {},
        // 我的余额
        balance: {
          available: 0,
          unlocking: 0,
          locked: 0
        },
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
          },
          // {
          //   name: 'BTC',
          //   symbol: 'B',
          //   scale: 8
          // },
        ],
        unit: null,
      }
    },
    components: {
      transferModal
    },
    watch:{
      showModal(val){
        if(!val){
          this.getOtcBalance()
        }
      },
      valueScale() {
        this.getOtcBalance()
      }
    },
    computed: {
      showHistory () {
        return this.$route.name === 'history'
      },
      total () {
        let sum = this.$big(0)
        this.tableData.forEach(item => {
          sum = sum.plus(item.estValue)
        })
        return sum.toString()
      },
      // unit () {
      //   return state.locale === 'zh-CN' ? 'CNY' : 'USD'
      // },
      valueScale() {
        return state.locale === 'zh-CN' ? 2 : 4
      },
      header () {
        return state.locale && [
          {key: 'currency', title: this.$t('fees_name')},
          {key: 'available', title: this.$t('avlb')},
          {key: 'ordering', title: this.$t('asset_th_unavlb')},
          {key: 'estValue', title: this.$t('homechart_fiat') + '(' + this.unit.name + ')'},
        ]
      },
      operate () {
        return state.locale && {key: 'operate', title: this.$t('operation')}
      },

      // ix锁仓/解锁
      maxLock () {
        if (this.balance.available) {
          return this.$big(this.balance.available).div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT).toString()
        }
        return 0
      },
      maxUnLock () {
        if (this.balance.locked) {
          return this.$big(this.balance.locked).div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT).toString()
        }
        return 0
      },
      myRemainTotal () {
        return (this.myPower.power || 0) - (this.myPower.amount || 0)
      },
    },
    async created () {
      this.unit = this.currencyList[0]
      let res = await service.getAllRate()
      if (!res.code && !!res.data) {
        this.rates = res.data;
      }
      await this.getOtcBalance()
      // await this.getEstValue()
      //this.getIxBalance()
      this.$nextTick(
        console.log(this.header)
      )
    },
    methods: {
      hideModal () {
        this.showModal = false
      },
      currencyChange(e) {
        //console.log({e})
        this.getOtcBalance()
      },
      getOtcBalance () {
        return service.getOtcBalance().then(res => {
          this.tableData = (res.data || []).map(item => {
            //item.rates = item.rates || {}
            // item.locking = this.$big(item.locking || 0).plus(item.ordering || 0).toString()
            let scale = 8
            if (item.currency === 'BTC') {
              scale = 8
            }
            else if (item.currency === 'USDT') {
              scale = 4
            }
            item.camount = this.$big(item.ordering).plus(this.$big(item.available)).round(scale, this.C.ROUND_DOWN).toFixed(scale).toString()
            item.estValue = this.getEstValue(item)
            item.ordering = this.$big(item.ordering).round(scale, this.C.ROUND_DOWN).toFixed(scale).toString()
            item.available = this.$big(item.available).round(scale, this.C.ROUND_DOWN).toFixed(scale).toString()
            // item.pairs = ExchangePairs[item.currency] || 'BTC_USDT'
            return item
          })
        })
      },
      getEstValue (item) {

        let res = this.$big(0)
        let unit = this.unit.name
        let {currency,camount} = item
        if (unit === 'BTC'){
          if(currency === 'BTC') {
            res = this.$big(camount)
          }
          else {
            if (this.$big(camount).gt(0) && !!this.rates[currency]) {
              res = this.$big(camount).times(this.rates[currency]['USD'] || 0).div(this.rates['BTC']['USD'])
            }
          }
        }
        else if (item.rates) {
          res = this.$big(camount).times(this.$big(item.rates[unit] || 0))
        }
        else {
          if (this.rates[currency]) {
            res = this.$big(camount).times(this.$big(this.rates[currency][unit] || 0))
          }
        }
        //let num = 8
        //return res.round(num, this.C.ROUND_DOWN).toString()
        return res
      },

    }
  }
</script>
<style lang="scss" scoped>
  @import './../../components/Fund/My/my.scss';
  // .iconfont {
  //   font-size: 27px;
  //   color: rgba(107, 181, 120, 1) !important;
  // }
  .gz-wrapper {
    width: 520px;
    height: 176px;
    background: #F2F5FE;
    border-radius: 4px;
    position: relative;
    text-align: center;
    margin: 30px 0;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 6px;
      background: rgba(107, 181, 120, 1);
      border-radius: 4px;
    }

    span {
      padding: 30px 0;
      font-size: 18px;
      display: block;
      font-weight: 400;
      color: rgba(107, 181, 120, 1);
    }

    h1 {
      font-size: 30px;
      color: rgba(107, 181, 120, 1);
    }
  }
</style>
