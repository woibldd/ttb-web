<template>
  <div class="h5-home-container">
    <!-- <mobile-nav/> -->
    <div class="header">
      <img src="~@/assets/h5/home/logo@2x.png" alt="ixx">
    </div>
    <div class="content">
      <div class="quotation box">
        <div class="title"> 
          <p>{{$t('h5_home_new.title')}}</p>
        </div>
        <div class="tabs">
          <ul flex>
            <li 
              flex-box="1"
              v-for="(item, index) in mapTabs"
              :key="index"
              :class="{active: selectCurrency.name === item.name}"
              @click="currencyChange(item)">
              {{item.name}}
            </li>
          </ul>
          <p>
            {{ `1 ${selectCurrency.name} ≈ ${utils.getFiatMoneySymbolByFiat(currency)} ${ $big((pair.tick || {}).current || 0).times(rate).round(selectCurrency.scale, 0) }` }}
          </p>
          <div> 
            <div id="high" class="high" :option="option" ref="lineCharts"></div>
          </div>
        </div>
        <div class="login-box" v-if="!isLogin">
          <div class="buttons" flex>
            <router-link 
              class="button login" 
              flex-box="1"
              to="user/login">
              {{ $t('signin') }}
            </router-link> 
            <router-link 
              class="button register" 
              flex-box="1"
              to="user/register">
              {{ $t('now') }}
            </router-link> 
            <!-- <div class="button register"  flex-box="1">
             {{ $t('now') }}
            </div> -->
          </div>
        </div>
      </div>
      <div class="introduce box">
        <div class="title">
          <p>{{$t('h5_home_new.describe2')}}</p>
        </div> 
        <div class="row">
          <div class="item">
            <div class="h" >
              <img src="~@/assets/h5/home/btc@2x.png" alt="">
              <h3>{{$t('h5_home_new.trading')}}</h3>
            </div>
            <p class="c">
              {{$t('h5_home_new.describe3')}}
            </p> 
          </div>
          <div class="item">
            <div class="h">
              <img src="~@/assets/h5/home/safe@2x.png" alt="">
              <h3>{{$t('h5_home_new.safe')}}</h3>
            </div>
            <p class="c">
              {{$t('h5_home_new.describe4')}}
            </p> 
          </div>
        </div> 
        <div class="row">
          <div class="item">
            <div class="h">
              <img src="~@/assets/h5/home/service@2x.png" alt="">
              <h3>{{$t('h5_home_new.service')}}</h3>
            </div>
            <p class="c">
              {{$t('h5_home_new.describe5')}}
            </p> 
          </div>
          <div class="item">
            <div class="h">
              <img src="~@/assets/h5/home/rocket@2x.png" alt="">
              <h3>{{$t('h5_home_new.efficiency')}}</h3>
            </div>
            <p class="c">
              {{$t('h5_home_new.describe6')}}
            </p> 
          </div>
        </div> 
      </div>
      <div class="download box">
        <div class="title">
          <p>{{$t('h5_home_new.describe1')}}</p>
        </div>
        <div class="list">
          <!-- <div class="row">
            <div class="btn">
              <img src="~@/assets/h5/home/computer@2x.png" alt="">
              <span>{{$t('h5_home_new.computer')}}</span>
            </div>
            <div class="btn"
              @click="download('android')">
              <img src="~@/assets/h5/home/android@2x.png" alt="">
              <span>{{$t('h5_home_new.android')}}</span>
            </div>
          </div>
          <div class="row">
            <div class="btn"
              @click="download('ios-test')">
              <img src="~@/assets/h5/home/apple@2x.png" alt="">
              <span>{{$t('h5_home_new.ios1')}}</span>
            </div>
            <div class="btn"
              @click="download('ios')">
              <img src="~@/assets/h5/home/apple@2x.png" alt="">
              <span>{{$t('h5_home_new.ios2')}}</span>
            </div>
          </div> -->
          <div class="row"> 
            <div class="btn"
              @click="download('android')">
              <img src="~@/assets/h5/home/android@2x.png" alt="">
              <span>{{$t('h5_home_new.android')}}</span>
            </div>
            <div class="btn"
              @click="download('ios')">
              <img src="~@/assets/h5/home/apple@2x.png" alt="">
              <span>{{$t('h5_home_new.ios2')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <div class="footer" flex="main:right">
      <el-popover
        placement="top"
        width="80"
        v-model="localeVisible"
        popper-class="my-popper-h5"
        trigger="click">
        <div>
          <ul>
            <li 
              v-for="(value, key) in locales"
              :key="key"
              :class="{select:key===state.locale}"
              @click="switchLang(key)">
              {{value}}
            </li> 
          </ul>
        </div>
        <el-button slot="reference" size="mini" round>{{ locales[state.locale] }}</el-button> 
      </el-popover>
    </div>
    <!-- <h5-footer/> -->
    <!-- <div class="corperator">
      <div class="corperator-container">
        <img src="@/assets/h5/h5-logo@2x.png" alt="" style="width: 110px;margin-left: 20px;">
        <span style="color: #fff;padding-left: 20px;display: block;margin: 10px 0;margin-bottom: 30px;font-size: 12px">{{ exchangeNameConfig }}</span>
        <div class="corp-row row-60">
          <div
            class="corp-title"
            v-t="'footer_investors'"/>
          <div class="corp-wrap">
            <div class="corp-logo">
              <a
                class="link"
                href="http://gs.holdings/"
                target="_blank">
                <img
                  class="logo gs"
                  src="~@/assets/copr-logo-gs.png" >
              </a>
            </div>
            <div class="corp-logo">
              <a
                class="link"
                href="javascript:;"
              >
                <img
                  class="logo may"
                  src="~@/assets/copr-logo-may.png" >
              </a>
            </div>
            <div class="corp-logo">
              <a
                class="link"
                href="https://peckshield.com/"
                target="_blank"
              >
                <img
                  class="logo ps"
                  src="~@/assets/copr_logo_ps.png" >
              </a>
            </div>
          </div>
        </div>
        <div class="corp-row row-20">
          <div
            class="corp-title"
            v-t="'footer_partners'"/>
          <div class="corp-wrap">
            <div class="corp-logo">
              <a
                class="link"
                href="https://www.bishijie.com"
                target="_blank">
                <img
                  class="logo cw"
                  src="~@/assets/copr-logo-cw.png">
              </a>
            </div>
            <div class="corp-logo">
              <a
                class="link"
                href="http://hangliancj.com"
                target="_blank">
                <img
                  class="logo hl"
                  src="~@/assets/copr-logo-hl.png">
              </a>
            </div>
            <div class="corp-logo">
              <a
                class="link"
                href="http://www.huoxing24.com/"
                target="_blank">
                <img
                  class="logo hx"
                  src="~@/assets/copr-logo-hx.png" >
              </a>
            </div>
            <div class="corp-logo">
              <a
                class="link"
                href="https://www.jinse.com/"
                target="_blank">
                <img
                  class="logo js"
                  src="~@/assets/copr-logo-js.png">
              </a>
            </div>
            <div class="corp-logo">
              <a
                class="link"
                href="https://www.hecaijing.com/"
                target="_blank">
                <img
                  class="logo he"
                  src="~@/assets/copr-logo-he.png">
              </a>
            </div>
            <div class="corp-logo">
              <a
                class="link"
                href="http://www.youjiatuanjian.com/"
                target="_blank">
                <img
                  class="logo blk"
                  src="~@/assets/copr-logo-blk.png">
              </a>
            </div>
          </div>
        </div>
        <div
          class="corp-row row-60"
          v-if="isKorean">
          <div
            class="corp-title">
            {{ $t('footer_copr') }}
          </div>
          <div class="corp-wrap"> 
            <div class="corp-logo">
              <a
                class="link"
                href="http://www.csi.link/"
                target="_blank">
                <img
                  class="logo hx"
                  src="~@/assets/copr-logo-cs.png" >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>  -->
    <v-download /> 
    <div v-if="showTutorialArrow"
      class="tt-mask" 
      @click="touch">
      <div
        class="tutorial-arrow">
        <img
          src="~@/assets/download/ios-tutorial-arrow.png"
          alt="">
        <div class="tuto__txt">{{ $t('download_ios_click_right') }}</div>
      </div>
    </div>
  </div>
</template>
<script>

import './index.scss'
// import MineSummary from '../mine-summary'
// import h5Footer from '../footer'
// import PairTable from '@/components/Mobile/PairTable'
import {state, actions} from '@/modules/store'
import service from '@/modules/service'
import responsiveMixin from '@/mixins/responsive'
import MobileNav from '@/components/Mobile/MobileNav'
import utils from '@/modules/utils'
import VDownload from '@/components/VDownload'
import tickTableMixin from '@/mixins/tick-table'

import HighCharts from 'highcharts' 
// import Kyc from '@/components/Mobile/Kyc'
 
// import 'swiper/dist/css/swiper.css'

export default {
  mixins: [responsiveMixin, tickTableMixin],
  data () {
    return {
      state, 
      utils,
      rates: {},
      selectCurrency: {
        name: "BTC",
        pair: "BTC_USDT"
      },
      locales: utils.locales,
      localeVisible: false,
      historyData: [], 
      option: {
        chart: {
          type: 'spline',
          backgroundColor: "#303E4B",
          spacingBottom: 0,
          spacingTop: 0,
          spacingLeft: 0,
          spacingRight: 0,
        },
        colors: ["#01CED1"],
        title: {text: ""},
        subtitle: {},
        xAxis: {
          type: 'datetime',
          labels: { 
          },
          lineColor:'#7C8EA1',
          tickColor: '#7C8EA1',
          tickWidth: 1,
          tickLength: 4

        },
        yAxis: {
          title: {
            text: ''
          }, 
          labels: { enabled: false},
          minorGridLineWidth: 0,
          gridLineWidth: 0,
          alternateGridColor: null,
          plotBands: []
        },
        tooltip: {
          // valueSuffix: ' m/s'
        },
        plotOptions: { 
        },
        series: [{
          name: 'BTC',
          data: []
        }],
        navigation: {
          menuItemStyle: {
            fontSize: '10px'
          }
        },
        credits:{
          enabled: false // 禁用版权信息
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          x: 100,
          y: 0
        }
      }, 
      showTutorialArrow: false,
      // pair: {
      //   tick:{}
      // }
    }
  },
  computed: {
    mapTabs() {
      return [
        {
          name: "BTC", 
          pair: "BTC_USDT",
          scale: 1
        },{
          name: "ETH", 
          pair: "ETH_USDT",
          scale: 2
        },{
          name: "EOS", 
          pair: "EOS_USDT",
          scale: 3
        } 
      ]
    }, 
    exchangeNameConfig() {
      return this.state.theme.exchangeNameConfig[this.state.locale || 'en']
    },
    currency () { 
      if (state.locale === 'zh-CN') {
        return 'CNY'
      } else {
        return 'USD'
      } 
    },
    rate() {
      return (this.rates && this.rates[this.currency]) || 0
    },
    pair() {
      return this.state.pro.pairList.find(item => {
        return item.name === this.selectCurrency.pair
      }) || {}
    },
    isLogin () {
      return this.state.userInfo !== null
    },
    isIos () {
      return utils.isIos()
    }, 
    isWeiXin () {
      return utils.isWeiXin()
    }
    
  },
  async created () { 
    let res = await service.getRates({ currency: "USDT" });
    if (!!res && !res.code) {
      this.rates = res.data.USDT;
    }
    // this.getBanners()
  },
  mounted() {  
    this.getHistory('BTC_USDT')
    this.changePair('BTC_USDT')
  },
  methods: {
    currencyChange (item) {
      this.selectCurrency = item
      this.changePair(item.pair)
      this.getHistory(item.pair)
    }, 
    switchLang(lang) { 
      actions.setLocale(lang);
      localStorage.setItem("locale", lang);
      this.localeVisible = false 
    },
    getHistory(name) {
      console.log({name})
      const to = (new Date) * 1
      const from = to - 1000 * 60 * 60 * 5 //获取5个小时的数据
      service.getQuoteHistory({
        period: '5m',
        pair: name,
        begin: from,
        end: to
      }).then((res) => {
        if (!!res && !res.code) {
          this.option.xAxis.categories=[] //x轴时间
          this.option.xAxis.labels.autoRotation=[]
          this.option.series[0].data=[]
          this.option.series[0].name=name.replace('_','/')  

          for (let i = 0; i < res.data.length; i++) {
            let t = res.data[i] 
            this.option.xAxis.categories.push(utils.dateFormatter(t.time, 'H:m'))
            this.option.xAxis.labels.autoRotation.push(-20) 
            this.option.series[0].data.push( !t.values ? 0 : parseFloat(t.values[0]))  
          } 
          let chart = HighCharts.chart("high",this.option)
        }
      }) 
      //  let chart = HighCharts.chart("high",this.option)
    },
    changePair(name) { 
      // this.pair = this.state.pro.pairList.find(item => {
      //   return item.name === name
      // }) 
    },
    
    download (type) { 
      if (this.isWeiXin) {
        this.showTutorialArrow = true
        return
      }  
      if (type==='android') {
        let url = 'https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/ixx.apk' 
        window.location.href = url
      }
      else if (type==='ios-test') {
        let url = 'https://testflight.apple.com/join/yCUsQxlN' 
        window.location.href = url 
      }
      else if (this.isIos) {
        let url = ''
        if(type==='ios-test') {
          url = 'https://testflight.apple.com/join/yCUsQxlN' 
        } else { 
          url = 'itms-services://?action=download-manifest&url=https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/install-manifest.plist'
          // url = 'https://downloadappios.com:7521/1rsNn.html'
        } 
        window.location.href = url 
      }  
    },
    touch () {
      this.showTutorialArrow = false
    },
  },
  components: { 
    // PairTable,
    // h5Footer, 
    MobileNav,
    VDownload
    // Kyc
  }
}
</script>
<style  lang="scss" >
@media (max-width: 800px) {
  html {
    font-size: 13.3333vw;
  }
  .my-popper-h5 {
    min-width: 80px;
    background: #536677;
    &.el-popper[x-placement^=top] {
      .popper__arrow::after {
        border-top-color: #536677;
      }
    }
    ul { 
      border-color: #536677; 
      li {
        color: #ffffff;
        &.select {
          background: #718291;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped> 
.h5-home-container { 
  background-color: #303E4B; 
  color:#FFFFFF;
  .header {
    text-align:center;
    padding: .3rem; 
    img {
      width: 2.5rem;
    } 
  }
  .content {
    padding: 0 .5rem .5rem;
    .box {
      .title {
        padding: .3rem 0 .5rem; 
        text-align: center;
        font-size: .42rem;
        color: #ffffff;
        font-family: PingFang SC;
        font-weight:400;
        background: url('~@/assets/h5/home/fb@2x.png') no-repeat center 0.63rem/6rem 0.56rem;
      }
    }
    .quotation {
      text-align: center;
      .tabs {
        ul {
          background: #536677;
          border-radius: .35rem;
          li {
            color: #839C9E;
            text-align: center;
            line-height: .7rem;
            border-radius: .35rem;
            &.active {
              background: $primary;
              color: #ffffff;
            }
          } 
        }
        p {
          padding: .65rem 0 0rem;
          font-size: .44rem; 
        }
      }
      .login-box { 
        padding: .5rem 0;
        font-size: .32rem;
        line-height: .88rem;
        text-align: center;
        .button {
          width: 1.5rem;
        }
        .button.login {
          color: $primary;
          margin-right: .3rem;
          border: 1px solid $primary;
          border-radius: 0.44rem;
        }
        .button.register {
          margin-left: .3rem;
          color: #ffffff;
          background: $primary;
          border: 1px solid $primary;
          border-radius: 0.44rem; 
        }
      }
    }
    .introduce {
      .row {
        display: flex;
        padding: .2rem 0; 
        .item {
          flex: 1;
          text-align: center;
          &:first-child {
            margin-right:.35rem;
          }
          .h {
            text-align: center;
            img {
              width:.8rem;
              padding-bottom: .1rem;
            }
            h3 {
              font-size: .28rem;
              padding-bottom: .1rem;
            }
          }
          .c {
            color: #7C8EA1;
          }
        }
      }
    }
    .download {
      .row {
        display: flex;
        .btn {
          margin: .17rem .34rem;
          white-space: nowrap;
          overflow: hidden;
          flex: 1;
          border: 1px solid #ffffff;
          border-radius: .36rem;
          text-align: center;
          line-height: .72rem;
          img {
            height: .28rem;
            vertical-align: middle;
            margin-right: .06rem;
          }
        }
      }
    }
  }
  .footer {
    margin: 0 .357rem;
    padding: .3rem .7rem 1.5rem;
    border-top: 1px solid #56636F;
    button {
      width: 1.8rem;
      background: transparent;
      color: #b2b7bb;
      border-color: #b2b7bb;
    }
  }
  
  .high {
    width: 5.08rem;
    height: 2.84rem;
    margin: .1rem auto;
  }

  .tt-mask {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 1001;

    .tutorial-arrow {
        width: 2.05rem;
        height: 2.65rem;
        position: absolute;
        right: .4rem;
        top: .6rem;
    
        img {
            width: 100%;
            height: 100%;
        }
        .tuto__txt {
            position: absolute;
            left: -2rem;
            bottom: -0.36rem;
            color: #fff;
            width: 2.05rem;
            text-align: center;
            font-size: .24rem;
            line-height: 1.2;
        }
    }   
  }
}
  
</style>
