<template>
  <div class="share-option" flex="main:justify cross:strech">
    <div class="share-option-bg" />

    <div v-loading="!marketData" class="left-side-bar" element-loading-background="rgba(0, 0, 0, 0.3)" element-loading-spinner="el-icon-loading">
      <div v-for="(value,key) in mapLeftNav" :key="key" :class="{active:drawerIsOpen && activeName === key}" @click="handleClickleftTab(key)">
        <svg-icon :icon-class="mapIcons[key]" style="font-size:24px" />
        <p>{{ $tR(`mapLeftNav.${key}`) }}</p>
      </div>
    </div>
    <transition name="fade" @after-leave="afterLeaveOrEnter" @enter="afterLeaveOrEnter">
      <div v-if="drawerIsOpen" class="left-drawer">
        <div slot="title" flex="cross:center main:justify" style="height:40px">
          <p>
            {{ $tR(`mapLeftNav.${activeName}`) }}
            <span v-if="temComponet.name=== 'SpotIndex'" class="share-text-info" style="font-size:12px;">(USDT/USD)</span>
            <el-link v-else type="primary" style="font-size:12px" @click="$router.push('/fund/share')"> {{ $tR('fullHistory') }}</el-link></p>
        </div>
        <component :is="temComponet" :data="temComponet.name=== 'ShareHistory'?historyData:marketData" @loadData="loadHistoryData" />
        <i class="el-icon-close" @click="drawerIsOpen = false" />
      </div>
    </transition>
    <div class="content" flex="dir:bottom">
      <charts-dynamic-update ref="dynamic-charts" style="width:100%" class="dynamic-update" @loadingData="showLoadBox" @handleTimeTabClick="handleTimeTabClick" @settleOrder="settleOrder" @pushData="data=>(marketData = data)" />
      <ul class="time-tab" flex="main:justify cross:center box:mean">
        <li v-for="(item,index) in mapTabTimes" :key="index" :class="{active:+activePeriod === +index}" @click="handleTimeTabClick(index)">{{ item }}</li>
      </ul>
      <div style="position:absolute;top:20px;left:50px;z-index:14">
        <el-cascader
          v-model="activeProduct"
          :options="mapProduct"
          popper-class="popper-class"
          :props="{ expandTrigger: 'hover',children:'periodList' }"
        ><template slot-scope="{ node, data }">
          <span v-if="data.symbol">{{ data.symbol }}</span>
          <span v-if="data.period">{{ mapTabTimes[data.period] }}</span>
          <!-- <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span> -->
        </template>
        </el-cascader>
      </div>
      <div v-if="!!loadingBoxWidth" v-loading="!!loadingBoxWidth" element-loading-background="rgba(0, 0, 0, 0.1)" style="position:absolute;top:10px;bottom:76px;left:30px;z-index:14" :style="{width:loadingBoxWidth+'px'}" />
    </div>
    <!-- <charts-dynamic-update class="content" /> -->
    <div class="right-side-bar">
      <div class="content-top hover-scale">
        <p class="share-text-info"> {{$tR(`rightSideBar.inputTitle`)}} <span>（{{(activeShareAccount||{}).min_amount}}-{{(activeShareAccount||{}).max_amount}}）</span></p>
        <input v-model.number="orderCount" min="1" type="text" maxlength="8">
        <div class="btn-group">
          <div @click="orderCount++"> + </div>
          <div @click="orderCount>1 && orderCount--"> - </div>
        </div>
      </div>
      <div class="content-center hover-scale" flex="dir:top main:justify cross:center box:mean">
        <div flex="main:center cross:center" class="center-info">
          <el-tooltip placement="bottom" effect="dark">
            <div slot="content" style="width:200px;line-height:2">{{ $tR('up_rate') }}{{ $tR('describe') }}</div>
            <i class="el-icon-bell" style="position:absolute;top:10px;right:10px;color:#fff" />
          </el-tooltip>
          <div v-if="mapCurrencyList[0]" class="share-text-info">
            <span>{{ mapCurrencyList[0].up_rate|bigRound(2) }}%</span>
            <p><svg-icon :icon-class="activeShareAccount?activeShareAccount.currency.toLowerCase():'dollar'" style="font-size:16px" /> {{ orderCount/100*(+mapCurrencyList[0].up_rate)|bigRound(8) }}</p>
          </div>
        </div>
        <div class="center-btn success" flex="dir:top main:center cross:center" :disabled="!$store.state.userData" type="success" @click="addLabels('green')" @mouseover.native="dynamicChart.activeHover('success')" @mouseout.native="dynamicChart.disableHover('success')">
          <svg-icon icon-class="share-up" style="font-size:40px" /> <h2 style="margin-top:5px">{{ $tR('up_rate') }}</h2>
        </div>
      </div>
      <div class="content-center hover-scale" flex="dir:top main:justify cross:center box:mean">
        <div class="center-btn danger" flex="dir:top main:center cross:center" :disabled="!$store.state.userData" type="danger" @click="addLabels('red')" @mouseover.native="dynamicChart.activeHover('danger')" @mouseout.native="dynamicChart.disableHover('danger')">
          <svg-icon icon-class="share-down" style="font-size:40px" /> <h2 style="margin-top:5px">{{ $tR('down_rate') }}</h2>
        </div>
        <div flex="main:center cross:center" class="center-info">
          <el-tooltip placement="bottom" effect="dark">
            <div slot="content" style="width:200px;line-height:2">{{ $tR('down_rate') }}{{ $tR('describe') }}</div>
            <i class="el-icon-bell" style="position:absolute;bottom:10px;right:10px;color:#fff" />
          </el-tooltip>
          <div v-if="mapCurrencyList[0]" class="share-text-info">
            <span>{{ mapCurrencyList[0].down_rate|bigRound(2) }}%</span>
            <p><svg-icon :icon-class="activeShareAccount?activeShareAccount.currency.toLowerCase():'dollar'" style="font-size:16px" /> {{ orderCount/100*(+mapCurrencyList[0].down_rate)|bigRound(8) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="marketData" ref="square-container" class="square-container" flex="dir:top box:mean">
      <div class="text">{{ $tR('up_rate') }} <br><span>{{ +marketData.Bullish*100|bigRound(0) }}%</span></div>
      <div class="mark-box" flex="dir:top box:mean">
        <div class="top" :style="{height:+marketData.Bullish*100+'%'}" />
        <div class="bottom" />
      </div>
      <div class="text"><span>{{ +marketData.Bearish*100|bigRound(0) }}%</span><br>{{ $tR('down_rate') }}</div>
    </div>
    <!-- <div class="test" style="margin-left:40px" />
    <div class="test" /> -->
  </div>
</template>
<script>
import chartsDynamicUpdate from './componets/dynamic-update'
import customSelect from '@/components/customSelect'
import websoketMixin from '@/mixins/soket'
import { createOrder, getHistory, getProduct } from '@/api/share_option'
import { deepCopy } from '@/utils'
import { bigMinus, bigPlus } from '@/utils/handleNum'
import { mapTabTimes } from '@/const'
import { clearTimeout } from 'highcharts'
export default {
  name: 'ShareOption',
  components: {
    chartsDynamicUpdate,
    customSelect
  },
  mixins: [websoketMixin],
  data() {
    return {
      drawerIsOpen: false,
      activeName: '',
      temComponet: null,
      historyData: [],
      mapProduct: [],
      mapTabTimes,

      marketData: null,
      activePeriod: '',

      loadingBoxWidth: '',

      orderCount: 1,

      activeProduct: [],
      cacheOrderObj: {}
    }
  },
  computed: {
    mapComponentNames() {
      return {
        'spot-index': '现货指数',
        'history': '历史记录'
        // 'ranking-list': '排行榜',
        // 'teach-view': '教学视频'
      }
    },
    mapLeftNav() {
      return this.chineseLangData.mapLeftNav
    },
    mapIcons() {
      return {
        'spot-index': 'chart',
        'history': 'history'
      }
    },
    dynamicChart() {
      return this.$refs['dynamic-charts']
    },
    userData() {
      return this.$store.state.userData
    },
    activeShareAccount() {
      return this.$store.state.activeShareAccount
    },
    mapShareAccount() {
      return this.$store.state.mapShareAccount
    },
    mapCurrencyList() {
      const found = this.mapProduct.find(item => item.value === this.activeProduct[0])
      return found && found.periodList[this.activeProduct[1]].currencyList || []
    }
  },
  watch: {
    activeProduct: {
      handler(product) {
        if (this.dynamicChart && this.dynamicChart.websockets[0]) {
          if (this.dynamicChart.websockets[0].readyState) {
            this.activePeriod = +product[1]
            this.dynamicChart.switchProduct([+product[1] + 1 + '', product[0]])
          }
        }
        this.$store.dispatch('getShareAccountList', { accountArr: this.mapCurrencyList })
      }
    },
    activeShareAccount: {
      handler(newValue) {
        if (!newValue) return
        this.orderCount =  Math.max(this.orderCount,+newValue.min_amount)
      }
    }
  },
  mounted() {
    getProduct().then(res => {
      this.mapProduct = this.handleProductData(res.data)
      this.activeProduct = ['BTCUSD', '0']
    })
  },
  methods: {
    loadHistoryData() {
      // this.getHistory()
    },
    handleProductData(productArr) {
      productArr.forEach(item => {
        Object.assign(item, { value: item.symbol, label: item.symbol })
        item.periodList.forEach(subItem => {
          Object.assign(subItem, { value: subItem.period, label: this.mapTabTimes[subItem.period] })
        })
      })
      return productArr
    },
    handleClickleftTab(name) {
      if (this.activeName === name && this.drawerIsOpen) return
      this.drawerIsOpen = true
      this.activeName = name
      this.temComponet = require(`./componets/${name}.vue`).default
      if (this.temComponet.name === 'ShareHistory') {
        this.getHistory()
      }
    },
    getHistory() {
      if (!this.userData) return
      // const params = { user_id: this.userData.id, currency: this.activeShareAccount.currency }
      const params = { user_id: this.userData.id, page: 1, size: 10 }
      return getHistory(params).then(res => {
        this.historyData = res.data.data
        return Promise.resolve(res.data.data)
      })
    },
    afterLeaveOrEnter(el) {
      if (!this.$refs['square-container']) return
      this.$refs['square-container'].style.left = el.clientWidth + 75 + 'px'
      this.dynamicChart.chart.reflow()
    },
    addLabels(color) {
      const tradeType = color === 'green' ? 0 : 1
      createOrder({ user_id: this.userData.id, symbol: this.activeProduct[0], amount: this.orderCount, currency: this.activeShareAccount.currency, 'trade_type': tradeType, period: this.activeProduct[1] }).then(res => {
        return this.$store.dispatch('getShareAccountList', { accountArr: this.mapCurrencyList, isAssignment: true })
      }).then(res => {
        // if (this.marketData.time > this.marketData.orderTime) {
        //   this.cacheOrderObj[this.activeShareAccount.currency] = +this.orderCount + (this.cacheOrderObj[this.activeShareAccount.currency] || 0)
        // }
        this.dynamicChart.addLabels(color, this.orderCount)
        this.getHistory()
      })
    },
    handleTimeTabClick(periodIndex) {
      this.activePeriod = periodIndex
      this.dynamicChart.initChartsByReqType(periodIndex)
    },
    settleOrder(callback) {
      if (!this.userData) return
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const mapShareAccount = deepCopy(this.mapShareAccount)
        this.$store.dispatch('getShareAccountList', { accountArr: this.mapCurrencyList, isAssignment: true }).then(dataArr => {
          this.getHistory().then(res => {
            // console.log(this.marketData.time > this.marketData.orderTime);
            const incomeObj = dataArr.reduce((prev, curr, index) => {
              const value = bigMinus([curr.available, mapShareAccount[index].available,mapShareAccount[index].ordering], 4)
              prev[curr.currency] = bigPlus([value, curr.ordering])
              return prev
            }, {})
            // this.cacheOrderObj = {}
            this.userData && callback && callback(incomeObj)
          })
        })
      }, 1000)
    },
    showLoadBox(width) {
      this.loadingBoxWidth = width
    }
  }
}
</script>
<style>
.popper-class{
  background: rgba(0, 0, 0, 0.3);
  color: #ccc
}
.el-cascader input.el-input__inner{
    background: rgba(0, 0,0, 0.3);
    color: #ccc
  }
</style>
<style lang="scss" scoped="this api replaced by slot-scope in 2.5.0+">
.share-option{
  height: calc(100vh - 60px);
  box-sizing: border-box;
  font-size: 13px;
  background-image: url('./img/bj.png');
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  width: 100%;
  .share-option-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba($color: $--contract-table-bg, $alpha: .9);
    z-index: -1;
  }

  .left-side-bar{
    color: #6C7482;
    background: $--share-bg-color;
    width: 66px;
    text-align: center;
    border-right:1px solid $--share-border-color;
    line-height: 1.8;
    z-index: 4;
    &>div{
      padding: 10px 0;
      margin-bottom: 10px;
      &:hover{
        cursor: pointer;
      }
      &.active{
        background:#2C3343;
        color: #fff;
      }
    }
  }
  .left-drawer{
    width: 300px;
    background: $--share-bg-color;
    color: #D6DAE2;
    padding: 0 15px;
    border-right:1px solid $--share-border-color;
    position: relative;
    overflow: hidden;
    &>.el-icon-close{
      font-size: 26px;
      position: absolute;
      transition: all 0.5s ease;
      top: 10px;
      right: 10px;
      &:hover{
        transform: rotate(90deg);
        color: #fff;
        cursor: pointer
      }
    }
  }
  .content{
    position: relative;
    flex: 1;
    &>.dynamic-update{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 40px;
    };
    &>.time-tab{
      height: 34px;
      text-align: center;
      background: #363E4F;
      line-height: 34px;
      color: #999;
      &>li{
        &.active,&:hover{
          box-shadow: 0 2px 0 0 #fff inset;
          background: #4F596D;
          color: #fff;
          cursor: pointer;
        }
      }
  }
    // background: rgba$--share-bg-color;
  }
  .right-side-bar{
    width: 160px;
    box-sizing: border-box;
    padding: 10px;
    .hover-scale{
      transition: all .5s;
      &:hover{
         transform: scale(1.05)
      }
    }
    .content-top{
      // background: $--share-bg-color;
      background: rgba($color: #fff, $alpha: .1);
      border-radius: 4px;
      box-sizing: border-box;
      .share-text-info{
        line-height: 26px;
        text-indent: 6px;
      }
      input{
        background: transparent;
        border: none;
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        letter-spacing: 1;
        outline: none;
        color: #fff;
        text-indent: 6px;
      }
      .btn-group{
        display: flex;
        border-top: 1px solid rgb(41, 48, 63);
        &>div{
          flex: 1;
          text-align: center;
          line-height: 30px;
          color: #fff;
          user-select:none;
          &:first-child{
            border-right:1px solid rgb(41, 48, 63);
            border-bottom-left-radius:4px;
          }
          &:last-child{
            border-bottom-right-radius: 4px;
          }
          &:hover{
            background:#2C3343;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
    .content-center{
      height: 200px;
      background: rgba($color: #fff, $alpha: .1);
      margin-top: 15px;
      border-radius: 6px;
      line-height: 26px;
      .center-info{
        width: 100%;
        text-align: center;
        position: relative;
        &>.share-text-info{
          span{
            font-size: 20px;
            color: $--color-success
          }
        }
      }
      .center-btn{
        width:100%;
        box-sizing: border-box;
        padding: 0;
        border: none;
        opacity: 0.8;
        color: #fff;
        &.success{
          border-bottom-left-radius:4px;
          border-bottom-right-radius:4px;
          background: #67C23A;
        }
        &.danger{
          border-top-left-radius:4px;
          border-top-right-radius:4px;
          background: #F56C6C;
        }
        &:hover{
          opacity: 1;
          cursor: pointer;
        }
      }
    }
  }
  .square-container{
    position: absolute;
    left:75px;
    top: 10px;
    bottom: 75px;
    opacity: .5;
    &>.text{
      flex: none;
      flex-basis: 40px;
      font-size: 12px;
      line-height: 20px;
      width: 26px;
      color: #ccc
    }
    &>.mark-box{
      &>.top{
        transition: all .5s ease-out;
        flex: none;
        border-top:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
        z-index: 0;
        position: relative;
        border-bottom:5px solid rgba($color: rgb(116, 116, 116), $alpha: .2);
        // border-left:13px solid rgba($color: red, $alpha: .8);
        border-right:13px solid rgba($color: green, $alpha: .6);
        transform: translate(-13px,5px);
        &::before{
          content: '';
          position: absolute;
          top: -5px;
          height: 100%;
          left: 26px;
          border-top:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
          border-bottom:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
          border-left:13px solid rgba($color: rgb(0, 36, 0), $alpha: .8);
          // transform: translateX(13px);
        }
      }
      &>.bottom{
        // height:0px;
        border-top:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
        z-index: -1;
        position: relative;
        border-bottom:5px solid rgba($color: rgb(116, 116, 116), $alpha: .6);
        // border-left:13px solid rgba($color: red, $alpha: .8);
        border-right:13px solid rgba($color: red, $alpha: .6);
        transform: translate(-13px,-5px);
        &::before{
          content: '';
          position: absolute;
          top: -5px;
          height: 100%;
          left: 26px;
          border-top:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
          border-bottom:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
          border-left:13px solid rgba($color: rgb(68, 2, 2), $alpha: .6);
          // transform: translateX(13px);
        }
      }
      // &.bottom{
      //   // height:10px;
      //   position: relative;
      //   z-index: -1;
      //   border-top:5px solid rgba($color: rgb(116, 116, 116), $alpha: 0);
      //   border-bottom:0;
      //   border-left:13px solid rgba($color: green, $alpha: .8);
      //   border-right:13px solid rgba($color: rgb(0, 36, 0), $alpha: .8);
      //   // transform: translateY(-10px);
      // }
    }
  }
  .test{
    position: fixed;
    left: 40%;
    // width: 200px;
    height: 200px;
    border-left: 10px solid red;
    border-right: 10px solid green;
    border-top: 10px solid steelblue;
    border-bottom: 10px solid hotpink;
    transform: skewY(45deg);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(-300px);
  z-index:0;
}
</style>
