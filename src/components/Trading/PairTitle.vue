<template>
  <div class="grid-title">
    <div class="row clearfix">
      <div
        class="fl grid-currency pointer"
        @click="showPair"
        @mouseover="showPair(true)"
        @mouseout="showPair(false)"
      >
        {{ pair | pairfix }}
        <icon name="arrow-down" class="arrow" :class="{up: show}"/>
        <div class="grid-pairtable" :class="{show: show}">
          <PairNav :init-height="400" :sort="false" ref="PairNav"/>
        </div>
      </div>
      <p
        class="fl grid-value"
        :class="{'color-up': delta > 0, 'color-down': delta < 0}"
      >{{ lastPrice }}</p>
      <p class="fl grid-abt" :class="{'color-up': delta > 0, 'color-down': delta < 0}">
        ≈ {{ state.fiatMoneySymbol }}
        <fiat-money :base="state.pro.currency_name" :value="lastPrice"/>
      </p>
      <p class="fl grid-increase">
        {{ $t('increase') }}
        <i
          :class="{'color-up': delta > 0, 'color-down': delta < 0}"
        >{{ delta > 0 ? '+' : '' }}{{ delta }}% </i>
      </p>
      <p
        class="fl grid-high"
      >{{ $t('secure_level_2') }} {{ pairTick.highest_24h | round(pair.price_scale) }}</p>
      <p
        class="fl grid-low"
      >{{ $t('secure_level_0') }} {{ pairTick.lowest_24h | round(pair.price_scale) }}</p>
      <p
        class="fl grid-tf-amount"
      >24H {{ $t('vol') }} {{ pairTick.volume_24h | round(2) }} {{ state.pro.product_name }}</p>
    </div>
    <div class="row clearfix" v-if="showCountDown">
      <p
        class="fl grid-increase"
      >{{ $t('trading_title_start_time', {startTime: $moment.unix(startTime).format('hh:mm:ss')}) }}</p>
      <p
        class="fl grid-increase"
        v-html="$t('trading_title_end_time', {endTime: $moment.unix(endTime).format('hh:mm:ss'), countDownText: $t('trading_title_count_down', {countdown:countDown}) }) "
      ></p>
      <p class="fl grid-increase">{{ $t('trading_title_start_price', {price: state.price_open || "0.017"}) }}</p>
    </div>
  </div>
</template>

<script>
import { state } from "@/modules/store";
import { pairfix } from "@/mixins/index";
import isEmpty from "lodash/isEmpty";
import PairNav from "@/components/Trading/PairNavForTitle";

export default {
  mixins: [pairfix],
  data() {
    return {
      state,
      show: false,
      startTime: 0,
      endTime: 0,
      countDown: "", 
      interval: 0
    };
  },
  components: {
    PairNav
  },
  methods: {
    showPair(toggle) {
      if (typeof toggle === "boolean") {
        this.show = toggle;
      } else {
        this.show = !this.show;
      }
    }
  },
  computed: {
    ready() {
      return !isEmpty(this.pairTick);
    },
    pair() {
      if (this.state.pro.pair) {
        return this.state.pro.pair;
      } else {
        return "";
      }
    },
    showCountDown() {
      if (this.state.pro.pair === "SP_USDT") {
        return true;
      } else {
        return false;
      }
    },
    lastPrice() {
      if (this.state.pro.lastPrice) {
        return this.state.pro.lastPrice.toFixed(
          _.get(this, "state.pro.pairInfo.price_scale", 4)
        );
      }
    },
    pairTick() {
      if (this.state.pro.pairTick) {
        return this.state.pro.pairTick;
      }
      return {};
    },
    delta() { 
      const tick = this.state.pro.pairTick;
      if (!tick || tick.increment_24h === tick.current) {
        return 0;
      } 
      if(this.pair === "SP_USDT"){
        tick.increment_24h = this.$big(tick.current).minus(this.state.price_open || 0.017);
      }
      return this.$big(tick.increment_24h)
        .mul(100)
        .div(this.$big(tick.current).minus(tick.increment_24h))
        .round(2, this.C.ROUND_HALF_UP)
        .toFixed(2);
    },
    startCountDown() {
      //debugger
        if(this.pair === "SP_USDT"){
        let closelist = [];
        if (this.state.close_time) {
          closelist = this.state.close_time.match(
            /\[[\d\S]\]|\[[\d\S]*\-[\d\S]*\]/g
          );
        }
        else {
          closelist =  "[*][*][*][9:59-10:00]".match(
            /\[[\d\S]\]|\[[\d\S]*\-[\d\S]*\]/g
          );
        }
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let timeReg = closelist[3].replace("[", "").replace("]", "");
        let end = timeReg.split("-")[0];
        let start = timeReg.split("-")[1];

        let tickEnd = this.$moment(`${year}-${month}-${day} ${end}`);
        let tickStart = this.$moment(`${year}-${month}-${day} ${start}`);

        this.startTime = tickStart.unix();
        this.endTime = tickEnd.unix();

        var $this = this;
        setTimeout(function() {
          let curTime = Math.round(new Date() / 1000); //开始时间
          this.interval = setInterval(function() {
            var ts = $this.endTime - curTime; //计算剩余的毫秒数
            var hh = parseInt((ts / 60 / 60) % 24, 10); //计算剩余的小时数
            var mm = parseInt((ts / 60) % 60, 10); //计算剩余的分钟数
            var ss = parseInt(ts % 60, 10); //计算剩余的秒数
            hh = checkTime(hh);
            mm = checkTime(mm);
            ss = checkTime(ss);
            if (ts > 0) {
              $this.countDown = ` ${hh}:${mm}:${ss}`;
              curTime = Math.round(new Date() / 1000);
            } else {
              $this.endTime += 86400;
            }
          }, 1000);
          function checkTime(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
          }
        }, 3000);
      }
      else {
        clearInterval(this.interval)
      }
    }
  },
  created() {
    this.startCountDown()
    //  this.$eh.$on("trading:countDown", this.startCountDown);
  },
  watch: {
    pair() {
      this.startCountDown()
    }
  }
};
</script>

<style lang="scss" scoped>
.grid-title {
  // height: 56px;
  line-height: 30px;
  //overflow-y: hidden;
  box-sizing: border-box;
  padding-left: 20px;
  border: 4px solid $splitter;
  border-bottom: none;
  border-right: none;
  background-color: $nav;
  position: relative;
  .fl {
    float: left;
  }
  .grid-currency {
    color: #fff;
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
    top: 28px;
    left: 0;
    z-index: 99999;
    width: 480px;
    background: #192d3f;
    display: none;
    opacity: 0;
    transition: all 0.5s ease-in-out;
    &.show {
      display: block;
      opacity: 1;
    }
  }
  .grid-value {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  }
  .grid-abt {
    font-size: 14px;
    margin-right: 20px;
  }
  .grid-increase {
    font-size: 14px;
    color: #fff;
    margin-right: 20px;
  }
  .grid-high,
  .grid-low,
  .grid-tf-amount {
    font-size: 14px;
    color: #d7d7d7;
    margin-right: 20px;
  }
  .clearfix:after {
    display: block;
    content: "";
    clear: both;
  }
}
</style>
