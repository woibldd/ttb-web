<template>
  <div class="page-home">
    <div class="header">
      <v-nav
        v-if="!isMobile"
        is-home="true"/>
      <mobile-nav
        v-if="isMobile"
      />
    </div>
    <div class="banner">
      <div class="banner_txt">
        <p
          class="ban-txt"
          v-html="$t('active_relay_h1')"/>
        <p v-t="'active_relay_h2'"/>
        <p v-html="$t('active_relay_h3')"/>
      </div>
    </div>
    <div class="top-txt">
      <!-- <div class="t-t lt"><span v-t="'active_relay_start'"/></div> -->
      <div
        class="t-t rt"
        v-html="$t('active_relay_next')"/>
    </div>
    <div class="cen_scr">
      <div
        class="scr-cen scr-l"
        v-if="pairs[0]">
        <p
          class="scr-txt"
          v-if="typeof relayTotal[pairs[0]] !== 'undefined'">{{ $t('active_relay_totally') }}<span>{{ relayTotal[pairs[0]] | round(4) }} </span>USDT</p>
        <div class="scr-box">
          <p class="scr-tit">{{ pairs[0] | pairfix }}</p>
          <div class="scr">
            <div class="scr-title">
              <p class="scr_l">{{ $t('active_relay_amount') }}</p>
              <p class="scr_m">{{ $t('active_relay_operator') }}</p>
              <p class="scr_r">{{ $t('active_relay_time') }}</p>
            </div>
            <div
              class="scr-cen"
              id="box">
              <ul
                id="con1"
                ref="con1"
              >
                <li
                  :class="ticker.side"
                  v-for="(ticker, $index) in tickers[pairs[0]]"
                  :key="pairs[0] + ticker.time + $index">
                  <p class="scr_l">{{ ticker.values[1] | fixed(4) }}</p>
                  <p class="scr_m">{{ $t(ticker.side === 'buy' ? 'order_side_buy':'order_side_sell') }}</p>
                  <p class="scr_r">{{ ticker.time | ts2date('Y-M-D H:m:s') }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <router-link
          class="join"
          :to="{name: 'trading', params: {pair: pairs[0]}}">{{ $t('active_relay_join') }}</router-link>
      </div>
      <div
        class="scr-cen scr-m"
        v-if="pairs[1]">
        <p
          class="scr-txt"
          v-if="typeof relayTotal[pairs[1]] !== 'undefined'">{{ $t('active_relay_totally') }}<span>{{ relayTotal[pairs[1]] | round(4) }} </span>USDT</p>
        <div class="scr-box">
          <p class="scr-tit">{{ pairs[1] | pairfix }}</p>
          <div class="scr">
            <div class="scr-title">
              <p class="scr_l">{{ $t('active_relay_amount') }}</p>
              <p class="scr_m">{{ $t('active_relay_operator') }}</p>
              <p class="scr_r">{{ $t('active_relay_time') }}</p>
            </div>
            <div
              class="scr-cen"
              id="box">
              <ul
                id="con1"
                ref="con1"
              >
                <li
                  :class="ticker.side"
                  v-for="(ticker, $index) in tickers[pairs[1]]"
                  :key="pairs[1] + ticker.time + $index">
                  <p class="scr_l">{{ ticker.values[1] | fixed(4) }}</p>
                  <p class="scr_m">{{ $t(ticker.side === 'buy' ? 'order_side_buy':'order_side_sell') }}</p>
                  <p class="scr_r">{{ ticker.time | ts2date('Y-M-D H:m:s') }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <router-link
          class="join"
          :to="{name: 'trading', params: {pair: pairs[1]}}">{{ $t('active_relay_join') }}</router-link>
      </div>
      <div
        class="scr-cen scr-r"
        v-if="pairs[2]">
        <p
          class="scr-txt"
          v-if="typeof relayTotal[pairs[2]] !== 'undefined'">{{ $t('active_relay_totally') }}<span>{{ relayTotal[pairs[2]] | round(4) }} </span>USDT</p>
        <div class="scr-box">
          <p class="scr-tit">{{ pairs[2] | pairfix }}</p>
          <div class="scr">
            <div class="scr-title">
              <p class="scr_l">{{ $t('active_relay_amount') }}</p>
              <p class="scr_m">{{ $t('active_relay_operator') }}</p>
              <p class="scr_r">{{ $t('active_relay_time') }}</p>
            </div>
            <div
              class="scr-cen"
              id="box">
              <ul
                id="con1"
                ref="con1"
              >
                <li
                  :class="ticker.side"
                  v-for="(ticker, $index) in tickers[pairs[2]]"
                  :key="pairs[2] + ticker.time + $index">
                  <p class="scr_l">{{ ticker.values[1] | fixed(4) }}</p>
                  <p class="scr_m">{{ $t(ticker.side === 'buy' ? 'order_side_buy':'order_side_sell') }}</p>
                  <p class="scr_r">{{ ticker.time | ts2date('Y-M-D H:m:s') }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <router-link
          class="join"
          :to="{name: 'trading', params: {pair: pairs[2]}}">{{ $t('active_relay_join') }}</router-link>
      </div>
      <div
        class="scr-cen scr-l"
        v-if="pairs[3]">
        <p
          class="scr-txt"
          v-if="typeof relayTotal[pairs[3]] !== 'undefined'">{{ $t('active_relay_totally') }}<span>{{ relayTotal[pairs[3]] | round(4) }} </span>USDT</p>
        <div class="scr-box">
          <p class="scr-tit">{{ pairs[3] | pairfix }}</p>
          <div class="scr">
            <div class="scr-title">
              <p class="scr_l">{{ $t('active_relay_amount') }}</p>
              <p class="scr_m">{{ $t('active_relay_operator') }}</p>
              <p class="scr_r">{{ $t('active_relay_time') }}</p>
            </div>
            <div
              class="scr-cen"
              id="box">
              <ul
                id="con1"
                ref="con1"
              >
                <li
                  :class="ticker.side"
                  v-for="(ticker, $index) in tickers[pairs[3]]"
                  :key="pairs[3] + ticker.time + $index">
                  <p class="scr_l">{{ ticker.values[1] | fixed(4) }}</p>
                  <p class="scr_m">{{ $t(ticker.side === 'buy' ? 'order_side_buy':'order_side_sell') }}</p>
                  <p class="scr_r">{{ ticker.time | ts2date('Y-M-D H:m:s') }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <router-link
          class="join"
          :to="{name: 'trading', params: {pair: pairs[3]}}">{{ $t('active_relay_join') }}</router-link>
      </div>
      <div
        class="scr-cen scr-m"
        v-if="pairs[4]">
        <p
          class="scr-txt"
          v-if="typeof relayTotal[pairs[4]] !== 'undefined'">{{ $t('active_relay_totally') }}<span>{{ relayTotal[pairs[4]] | round(4) }} </span>USDT</p>
        <div class="scr-box">
          <p class="scr-tit">{{ pairs[4] | pairfix }}</p>
          <div class="scr">
            <div class="scr-title">
              <p class="scr_l">{{ $t('active_relay_amount') }}</p>
              <p class="scr_m">{{ $t('active_relay_operator') }}</p>
              <p class="scr_r">{{ $t('active_relay_time') }}</p>
            </div>
            <div
              class="scr-cen"
              id="box">
              <ul
                id="con1"
                ref="con1"
              >
                <li
                  :class="ticker.side"
                  v-for="(ticker, $index) in tickers[pairs[4]]"
                  :key="pairs[4] + ticker.time + $index">
                  <p class="scr_l">{{ ticker.values[1] | fixed(4) }}</p>
                  <p class="scr_m">{{ $t(ticker.side === 'buy' ? 'order_side_buy':'order_side_sell') }}</p>
                  <p class="scr_r">{{ ticker.time | ts2date('Y-M-D H:m:s') }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <router-link
          class="join"
          :to="{name: 'trading', params: {pair: pairs[4]}}">{{ $t('active_relay_join') }}</router-link>
      </div>
      <div
        class="scr-cen scr-r"
        v-if="pairs[5]">
        <p
          class="scr-txt"
          v-if="typeof relayTotal[pairs[5]] !== 'undefined'">{{ $t('active_relay_totally') }}<span>{{ relayTotal[pairs[5]] | round(4) }} </span>USDT</p>
        <div class="scr-box">
          <p class="scr-tit">{{ pairs[5] | pairfix }}</p>
          <div class="scr">
            <div class="scr-title">
              <p class="scr_l">{{ $t('active_relay_amount') }}</p>
              <p class="scr_m">{{ $t('active_relay_operator') }}</p>
              <p class="scr_r">{{ $t('active_relay_time') }}</p>
            </div>
            <div
              class="scr-cen"
              id="box">
              <ul
                id="con1"
                ref="con1"
              >
                <li
                  :class="ticker.side"
                  v-for="(ticker, $index) in tickers[pairs[5]]"
                  :key="pairs[5] + ticker.time + $index">
                  <p class="scr_l">{{ ticker.values[1] | fixed(4) }}</p>
                  <p class="scr_m">{{ $t(ticker.side === 'buy' ? 'order_side_buy':'order_side_sell') }}</p>
                  <p class="scr_r">{{ ticker.time | ts2date('Y-M-D H:m:s') }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <router-link
          class="join"
          :to="{name: 'trading', params: {pair: pairs[5]}}">{{ $t('active_relay_join') }}</router-link>
      </div>
    </div>
    <div class="rule">
      <p v-t="'active_relay_rule'"/>
      <ul>
        <li>1???{{ $t('active_relay_rule1') }}</li>
        <li>2???{{ $t('active_relay_rule2') }}</li>
        <li>3???{{ $t('active_relay_rule3') }}</li>
        <li>4???{{ $t('active_relay_rule4') }}</li>
      </ul>
    </div>
    <div class="example">
      <p
        class="ex_tit"
        v-t="'active_relay_example'"/>
      <div class="ex_jd">
        <div class="e_a ex_b">
          <div class="ex_ct">
            <p v-html="$t('active_relay_example_1')"/>
          </div>
        </div>
        <div class="e_b ex_b">
          <div class="ex_ct">
            <p v-html="$t('active_relay_example_2')"/>
          </div>
          <span v-html="$t('active_relay_example_3')"/>
        </div>
        <div class="e_c ex_b">
          <div class="ex_ct">
            <p v-html="$t('active_relay_example_4')"/>
          </div>
          <span v-html="$t('active_relay_example_5')"/>
        </div>
        <div class="e_d ex_b">
          <div class="ex_ct">
            <p>{{ $t('active_relay_example_reset') }}</p>
          </div>
          <span v-html="$t('active_relay_example_6')"/>
        </div>
      </div>
    </div>
    <div class="fbg"/>
  </div>

</template>
<script>
import VNav from '@/components/VNav3'
import ws from '@/modules/ws'
import service from '@/modules/service'
import utils from '@/modules/utils'
import { pairfix } from '@/mixins/index'
import responsiveScale from '@/mixins/responsiveScale'
import MobileNav from '@/components/Mobile/MobileNav.vue'

export default {
  mixins: [ pairfix, responsiveScale ],
  data () {
    return {
      pairs: ['BTC_USDT', 'ETH_USDT', 'ETH_BTC', 'EOS_USDT', 'IX_BTC', 'IX_USDT'],
      sockets: {},
      tickers: {
        BTC_USDT: [],
        ETH_USDT: [],
        ETH_BTC: []
      },
      relayTotal: {},
      isMobile: utils.isMobile(),
      timer: 0
    }
  },
  components: {
    VNav,
    MobileNav
  },
  created () {
    this.pairs.forEach(pair => {
      this.history(pair)
      this.wsConnect(pair)
    })

    this.getRelayTotal()
    this.timer = setInterval(() => {
      this.getRelayTotal()
    }, 6e4)
  },

  methods: {
    async history (pair) {
      let res = await service.getQuoteDeal({pair, size: 10})
      if (!res.code) {
        this.update(pair, res.data)
      }
    },
    async getRelayTotal () {
      let res = await service.getRelayTotal()
      if (!res.code) {
        this.relayTotal = res.data
      }
    },
    wsConnect (pair) {
      this.sockets[pair] = ws.create(`deal/${pair}`)
      this.sockets[pair].$on('open', () => {
        this.sockets[pair].heartCheck.start()
      })
      this.sockets[pair].$on('message', data => {
        this.sockets[pair].heartCheck.start()
        this.loading = false
        this.update(pair, data)
      })
      this.socket.$on('reopen', this.sub)
    },
    update (pair, data) {
      if (!this.tickers[pair]) {
        this.tickers[pair] = data.sort((a, b) => {
          return b.time - a.time
        })
      } else {
        this.tickers[pair] = this.tickers[pair].concat(data).sort((a, b) => {
          return b.time - a.time
        }).map(ticker => {
          if (ticker.values.lenth > 2) {
            ticker.values[1] = ticker.values[4]
          }
          return ticker
        })
      }
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
  
  
  .header{
    background: #1A1A1A;
  }
  .banner{
    width:100%;
    height: 520px;
    background-image: url(/static/active/relay/banner.jpg);
    text-align: center;
    font-size: 48px;
    font-weight: bold;
    color: #fff;
    display: table;
    line-height: 72px;
    .banner_txt{
      margin-top: 90px;
      span{
        font-size: 54px;
        color: #E96D1B;
        padding: 0 8px;
      }
      .ban-txt{
        background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(250, 137, 80, 1)), to(rgba(251, 88, 80, 1)));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .top-txt{
    width: 1200px;
    margin: 0 auto;
    height: auto;
    line-height: 30px;
    margin-top: 25px;
    padding: 0 54px;
    overflow: hidden;
    box-sizing: border-box;
    .t-t{
      font-size: 20px;
      color: #1a0e60;
      font-weight: bold;
      span{
        color: #E96D1B;
      }
    }
    .lt{
      float: left;
    }
    .rt{
      float: right;
    }
    .top-title{
      color: #E96D1B;
      font-size: 16px;
      font-weight: bold;
      width: 100%;
      float: left;
      margin-top: 30px;
    }
    ul{
      float: left;
      li{
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #1E164E;
      }
    }
  }
  .cen_scr{
    width: 1200px;
    margin: 58px auto 145px auto;
    position: relative;
    &::after{
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      clear: both;
    }
    .scr-cen{
      width: 380px;
      .scr-txt{
        height: 68px;
        line-height: 68px;
        text-align: center;
        font-size: 16px;
        span{
          font-size: 24px;
          font-weight: bold;
        }
      }
      .buy p {

        &.scr_m {
          color: #09C989;
          animation: shark_buy .5s ease-in-out;
          transition: all 2s;
        }

        @keyframes shark_buy {
          from {
            opacity: 0;
            color: #666666;
          }
          to {
            opacity: 1;
            color: #09C989;
          }

        }
      }
      .sell p {

        &.scr_m {
          color: #F24E4D;
          animation: shark_sell .5s ease-in-out;
          transition: all 2s;
        }

        @keyframes shark_sell {
          from {
            opacity: 0;
            color: #666666;
          }
          to {
            opacity: 1;
            color: #F24E4D;
          }

        }
      }
    }
    .scr-l{
      float: left;
      .scr-txt{
        color: #2A94FF;
      }
      .scr-tit{
        background-image: url(/static/active/relay/tit1.png);
      }
      .join{
        background:linear-gradient(90deg,rgba(10,207,254,1) 0%,rgba(73,90,255,1) 100%);
        box-shadow:0px 10px 20px 0px rgba(41,148,255,0.4);
      }
    }
    .scr-m{
      float: left;
      margin-left: 30px;
      .scr-tit{
        background-image: url(/static/active/relay/tit2.png);
      }
      .scr-txt{
        color: #FB9168;
      }
      .join{
        background:linear-gradient(90deg,rgba(255,201,116,1) 1%,rgba(248,92,92,1) 100%);
        box-shadow:0px 10px 20px 0px rgba(252,147,105,0.4);
      }
    }
    .scr-r{
      float: right;
      .scr-txt{
        color: #8D5CDF;
      }
      .scr-tit{
        background-image: url(/static/active/relay/tit3.png);
      }
      .join{
        background:linear-gradient(90deg,rgba(102,126,234,1) 0%,rgba(178,58,212,1) 100%);
        box-shadow:0px 10px 20px 0px rgba(140,92,222,0.4);
      }
    }
    .scr-box{
      box-shadow: 0px 0px 20px 0px rgba(41,148,255,0.1);
      width: 100%;
      .scr-tit{
        width: 100%;
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
      }
      .scr-title{
        height: 52px;
        line-height: 52px;
        color: #333;
        font-size: 16px;
        p{
          float: left;
        }
      }
    }
    .scr{
      padding: 8px 20px 20px 20px;
      .scr-cen{
        width: 100%;
        height: 270px;
        overflow: hidden;
        transition: all 0.5s;
        ul{
          li{
            height: 30px;
            line-height: 30px;
            p{
              color: #666;
              float: left;
            }
          }
        }
      }

    }
    .scr_l{
      width: 35%;
      text-align: left;
    }
    .scr_m{
      width: 15%;
      text-align: center;
    }
    .scr_r{
      width: 50%;
      text-align: right;
    }
    .join{
      display: block;
      width: 240px;
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: bold;
      margin: 60px auto;
      text-align: center;
      color: #fff;
      border-radius: 40px;
    }
  }
  .anim{
    transition: all 0.5s;
  }
  .rule{
    padding: 0 240px 37px 240px;
    p{
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      height: 82px;
      line-height: 82px;
      color: #E96D1B;
      position: relative;
      &::after{
        content: "";
        display: block;
        width: 20px;
        height: 5px;
        background: #E96D1B;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -10px;
      }
    }
    ul{
      margin-top: 53px;
      li{
        color: #1E164E;
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
  .example{
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 215px;
    .ex_tit{
      color: #E96D1B;
      font-size: 16px;
      font-weight: bold;
    }
    .ex_jd{
      margin-top: 104px;
      margin-bottom: 190px;
      width: 100%;
      height: 10px;
      border-radius: 10px;
      position: relative;
      background: linear-gradient(90deg, #00D0FF, #3A39FF);
      .ex_b{
        width: 24px;
        height: 24px;
        background: url(/static/active/relay/yuan.png);
        position: absolute;
        top: -6px;
        text-align: center;
        font-size: 14px;
        color: #666;
        line-height: 30px;
        .ex_ct{
          width: 120px;
          height: 74px;
          line-height: 30px;
          position: absolute;
          top: -94px;
          left: 50%;
          margin-left: -60px;
          display: table;
          p{
            display: table-cell;
            vertical-align: middle;
          }
        }
        span{
          width: 210px;
          height: 90px;
          color: #E96D1B;
          display: block;
          position: absolute;
          left: 50%;
          margin-left: -100px;
          bottom: -110px;
        }
      }
      .e_a{
        left: 120px;
      }
      .e_b{
        left: 432px;
      }
      .e_c{
        right: 432px;
      }
      .e_d{
        right: 120px;
      }
    }
  }
  .fbg{
    width: 100%;
    height: 264px;
    background-image: url(/static/active/relay/footer.png);
    background-position: center center;
  }
</style>
