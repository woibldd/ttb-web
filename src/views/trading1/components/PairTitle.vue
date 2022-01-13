<template>
  <div class="grid-title" flex="box:last"  :skin="state.skin">
    <div class="row clearfix" flex="main:left cross:center">
      <!-- @click="showPair" -->
      <div
        class="fl grid-currency pointer"
        :skin="state.skin"
        @switchPair="showPair(false)"
        @mouseover="showPair(true)"
        @mouseout="showPair(false)"
      >
        {{ pair | pairfix }} 
        <icon :class="{up: show}" name="arrow-down" class="arrow"/>
        <div v-show="show" :class="{show: show}" class="grid-pairtable" :skin="state.skin"> 
          <PairNav ref="PairNav" :init-height="400" :sort="true"/>
        </div>
      </div>
      <!-- <el-popover
        placement="bottom-start" 
        width="500"
        trigger="hover" > 
        <div
          slot="reference"
          class="fl grid-currency pointer"
          :skin="state.skin"
          @switchPair="showPair(false)"
          @mouseover="showPair(true)"
          @mouseout="showPair(false)"
        >
          {{ pair | pairfix }} 
          <icon :class="{up: show}" name="arrow-down" class="arrow"/>
        </div>
        <div  class="grid-pairtable show" :skin="state.skin">
          <PairNav ref="PairNav" :init-height="400" :sort="false"/>
        </div>
      </el-popover> -->
      <div class="fl grid-value" >
        <p  :class="{'color-up': delta > 0, 'color-down': delta < 0}">{{ lastPrice }}</p> 
        <p class="fl grid-abt">
          ≈ {{ state.fiatMoneySymbol }}
          <fiat-money :base="state.pro.currency_name" :value="lastPrice"/>
        </p>
      </div> 
      <div class="fl grid-increase" :skin="state.skin">
        <p class="tick-info">{{ $t('increase') }}</p>
        <p class="tick-value"> 
          <i :class="{'color-up': delta > 0, 'color-down': delta < 0}">
            {{ delta > 0 ? '+' : '' }}{{ delta }}% 
          </i>
        </p>
      </div>
      <div class="fl grid-high"  :skin="state.skin">
        <p class="tick-info">{{ $t('homechart_24h_h') }}</p>
        <p class="tick-value">
          {{ pairTick.highest_24h | round(pair.price_scale) }}
        </p> 
      </div>
      <div class="fl grid-low"  :skin="state.skin">
        <p class="tick-info">{{ $t('homechart_24h_l') }}</p>
        <p class="tick-value">{{ pairTick.lowest_24h | round(pair.price_scale) }}</p>
      </div>
      <div class="fl grid-tf-amount" :skin="state.skin">
        <p class="tick-info">{{ $t('homechart_24h_v') }}</p>
        <p class="tick-value">{{ fixAmount(pairTick.volume_24h) }} {{ state.pro.product_name }}</p> 
      </div>
    </div>
    <div class="skin"> 
      <label class="pointer tool" @click="swithStyle" 
        style="text-align:center; height: 60px; line-height: 60px;"  > 
        <icon  v-if="state.skin==='dark'" name="sun" />
        <icon  v-if="state.skin==='light'" name="moon" />
      </label>
    </div> 
  </div>
</template>

<script>
import { state, local } from '@/modules/store'
import { pairfix } from '@/mixins/index'
import isEmpty from 'lodash/isEmpty'
import PairNav from './PairNavForTitle'
import utils from "@/modules/utils"

export default {
  components: {
    PairNav
  },
  mixins: [pairfix],
  data() {
    return {
      state,
      local,
      show: false,
      startTime: 0,
      endTime: 0,
      countDown: '',
      interval: 0,
      countDownStatus: 1
    }
  },
  computed: {
    ready() {
      return !isEmpty(this.pairTick)
    },
    pair() {
      if (this.state.pro.pair) {
        return this.state.pro.pair
      } else {
        return ''
      }
    },
    // showCountDown() {
    //   if (this.state.pro.pair === 'SP_USDT') {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    lastPrice() {
      if (this.state.pro.lastPrice) {
        return this.state.pro.lastPrice.toFixed(
          _.get(this, 'state.pro.pairInfo.price_scale', 4)
        )
      }
    },
    pairTick() {
      if (this.state.pro.pairTick) {
        return this.state.pro.pairTick
      }
      return {}
    },
    delta() {
      const tick = this.state.pro.pairTick
      if (!tick || tick.increment_24h === tick.current) {
        return 0
      }
      // if(this.pair === "SP_USDT"){
      //   tick.increment_24h = this.$big(tick.current).minus(this.state.price_open || 0.017);
      // }
      return this.$big(tick.increment_24h)
        .mul(100)
        .div(this.$big(tick.current).minus(tick.increment_24h))
        .round(2, this.C.ROUND_HALF_UP)
        .toFixed(2)
    },
    startCountDown() {
      if (this.pair === 'SP_USDT') {
        let closelist = []
        if (this.state.close_time) {
          closelist = this.state.close_time.match(
            /\[[\d\S]\]|\[[\d\S]*\-[\d\S]*\]/g
          )
        } else {
          closelist = '[*][*][*][9:59-10:00]'.match(
            /\[[\d\S]\]|\[[\d\S]*\-[\d\S]*\]/g
          )
        }
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const timeReg = closelist[3].replace('[', '').replace(']', '')
        // timeReg = "16:50-17:06"
        const end = timeReg.split('-')[0]
        const start = timeReg.split('-')[1]

        const tickEnd = this.$moment(`${year}-${month}-${day} ${end}`)
        const tickStart = this.$moment(`${year}-${month}-${day} ${start}`)

        this.startTime = tickStart.unix()
        this.endTime = tickEnd.unix()

        var $this = this
        setTimeout(function() {
          let curTime = Math.round(new Date() / 1000) // 开始时间

          if (curTime > $this.endTime && curTime > $this.startTime) {
            $this.endTime += 86400
            // 停盘倒计时
            $this.countDownStatus = 1
          } else if (curTime < $this.endTime && curTime < $this.startTime) {
            $this.startTime -= 86400
            // 停盘倒计时
            $this.countDownStatus = 1
          } else {
            // 开盘倒计时
            $this.countDownStatus = 2
          }

          this.interval = setInterval(function() {
            var ts = $this.endTime - curTime // 计算剩余的毫秒数
            if ($this.endTime > $this.startTime) {
              ts = $this.endTime - curTime
              // console.log("停盘倒计时")
              // 停盘倒计时
              $this.countDownStatus = 1
            } else {
              ts = $this.startTime - curTime
              // console.log("开盘倒计时")
              // 开盘倒计时
              $this.countDownStatus = 2
            }
            var hh = parseInt((ts / 60 / 60) % 24, 10) // 计算剩余的小时数
            var mm = parseInt((ts / 60) % 60, 10) // 计算剩余的分钟数
            var ss = parseInt(ts % 60, 10) // 计算剩余的秒数
            hh = checkTime(hh)
            mm = checkTime(mm)
            ss = checkTime(ss)
            if (ts > 0) {
              $this.countDown = ` ${hh}:${mm}:${ss}`
              curTime = Math.round(new Date() / 1000)
            } else {
              if ($this.endTime > $this.startTime) {
                $this.startTime += 86400 // 一天的秒数
                // 转到开盘倒计时
              } else {
                $this.endTime += 86400
                // 转到停盘倒计时
              }
            }
          }, 1000)
          function checkTime(i) {
            if (i < 10) {
              i = '0' + i
            }
            return i
          }
        }, 3000)
      } else {
        clearInterval(this.interval)
      }
    }
  },
  watch: {
    pair() {
      // if (this.startCountDown) {
      //   this.startCountDown()
      // }
    },
    countDownStatus(v) {
      if (v = 2) {
        this.state.price_open = this.state.pro.lastPrice
      }
    }
  },
  created() { 
    this.state.skin =  this.local.skin
    //  this.$eh.$on("trading:countDown", this.startCountDown);
  },
  mounted() {
    // if (this.startCountDown) {
    //   this.startCountDown()
    // }
  },
  methods: {
    showPair(toggle) {
      if (typeof toggle === 'boolean') {
        this.show = toggle
      } else {
        this.show = !this.show
      }
    },
    swithStyle() { 
      if (this.state.skin === 'light') 
      {
        this.local.skin = 'dark'
        this.state.skin = 'dark'    
        this.$eh.$emit('tradingview:skin')
      } else {
        this.local.skin = 'light'
        this.state.skin = 'light'  
        this.$eh.$emit('tradingview:skin')
      } 
    },
    fixAmount (big) {
      if (!big) {
        return ''
      } 
      return utils.toPretty(big)
    },
  }
}
</script>

<style lang="scss" scoped>
.grid-title {
  // height: 56px;
  // line-height: 60px;
  //overflow-y: hidden;
  box-sizing: border-box;
  padding-left: 20px;
  // border: 4px solid $splitter;
  border-bottom: none;
  border-right: none;
  // background-color: $nav;
  position: relative; 
  .tick-info {
    font-size: 12px;
    color: #888888;
  }
  .tick-value {
    font-size: 12px;
    color: #2C2C2C;
  }
  &[skin~="dark"] { 
     .tick-info {
        color: #ACACAC;
      }
      .tick-value {
        color: #ffffff;
      }
  } 

  .fl {
    float: left;
  }

  .grid-currency {
    height: 50px;
    line-height: 50px;
    color: $--pair-title-color;
    &[skin~="dark"] { 
      color: #ffffff;
    }
    font-size: 20px;
    margin-right: 20px;
    font-weight: bold;
    .arrow {
      transition: all 0.2s ease-in-out; 
      &.up {
        transform: rotate(180deg);
      }
    }
  }
  .grid-pairtable {
    position: absolute;
    top: 52px;
    left: 0;
    z-index: 99999;
    width: 480px;
    box-shadow: 0px 0px 2px 0px;
    // display: none;
    opacity: 0;
    transition: all 0.5s ease-in-out;
    background: $--table-nth-odd;
    &[skin~="dark"] { 
      background: $--table-nth-odd2;
    }
    &.show {
      display: block;
      opacity: 1;
    }
  }
  .grid-value {
    font-size: 12px;
    font-weight: bold;
    margin-right: 10px;
  }
  .grid-abt {
    // font-size: 14px;
    font-weight: normal;
    margin-right: 20px;
  }
  .grid-increase {
    font-size: 14px;
    color: $--pair-title-color;
    margin-right: 20px;
    &[skin~="dark"] { 
      color: $--pair-title-color2;
    }
  }
  .grid-high,
  .grid-low,
  .grid-tf-amount {
    font-size: 14px;
    color: $--pair-title-color;
    margin-right: 20px;
    &[skin~="dark"] { 
      color: $--pair-title-color2;
    }
  }
  .clearfix:after {
    display: block;
    content: "";
    clear: both;
  }

  .skin {
    width: 200px;
    text-align: center;
  }
}
</style>
