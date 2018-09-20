<template>
  <div class="page-home">
    <div class="header">
      <v-nav2
        is-home="true"
        :notice="notice"
        @hide="notice = null"/>
    </div>
    <div class="banner">
      <div class="banner_txt">
        <p class="ban-txt">所有交易手续费的<span>40%</span>等你来拿</p>
        <p>盯紧屏幕，下一个中奖的就是你</p>
        <p>您距离中奖还有<span>20</span>秒</p>
      </div>
    </div>
    <div class="top-txt">
      <div class="t-t lt">开始时间：<span>2018年9月20日 12:00:00</span></div>
      <div class="t-t rt">每日<span>00:00:00重启</span>进入下一轮</div>
    </div>
    <div class="cen_scr">
      <div class="scr-cen scr-l">
        <p class="scr-txt">奖池累计额度：<span>85.92114584</span>BTC</p>
        <div class="scr-box">
          <p class="scr-tit">BTC/USDT</p>
          <div class="scr">
            <div class="scr-title">
              <p class="scr_l">交易量</p>
              <p class="scr_m">操作</p>
              <p class="scr_r">交易时间</p>
            </div>
            <div
              class="scr-cen"
              id="box">
              <ul
                id="con1"
                ref="con1"
                :class="{anim:animate==true}">
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a
          href="#"
          class="join">立即参加</a>
      </div>
      <div class="scr-cen scr-m">
        <p class="scr-txt">奖池累计额度：<span>85.92114584</span>BTC</p>
        <div class="scr-box">
          <p class="scr-tit">BTC/USDT</p>
          <div class="scr">
            <div class="scr-title">
              <p class="scr_l">交易量</p>
              <p class="scr_m">操作</p>
              <p class="scr_r">交易时间</p>
            </div>
            <div class="scr-cen">
              <ul>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a
          href="#"
          class="join">立即参加</a>
      </div>
      <div class="scr-cen scr-r">
        <p class="scr-txt">奖池累计额度：<span>85.92114584</span>BTC</p>
        <div class="scr-box">
          <p class="scr-tit">BTC/USDT</p>
          <div class="scr">
            <div class="scr-title">
              <p class="scr_l">交易量</p>
              <p class="scr_m">操作</p>
              <p class="scr_r">交易时间</p>
            </div>
            <div class="scr-cen">
              <ul>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
                <li>
                  <p class="scr_l">23.89001237</p>
                  <p class="scr_m">买</p>
                  <p class="scr_r">2018-09-26 13:24:46</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a
          href="#"
          class="join">立即参加</a>
      </div>
    </div>
    <div class="rule">
      <p>规则介绍</p>
      <ul>
        <li>1、平台所有币对适用于此规则，交易功能开启后，该规则生效</li>
        <li>2、以平台币对BTC/USDT为例，如果该币对超过20秒没有产生交易 ，则20秒前的最后一位交易用户为中奖用户</li>
        <li>3、中奖用户获得从规则开启到获奖期间所有BTC/USDT交易者交易手续费的40%</li>
        <li>4、该币对下一位交易者出现；奖池金额继续开始累积；直至24:00奖池金额清零（用于发放奖励或归入社区手续费返还）</li>
        <li>5、中奖用户奖励派发时间为：次日12:00-14:00。</li>
      </ul>
    </div>
    <div class="example">
      <p class="ex_tit">举个例子：</p>
      <div class="ex_jd">
        <div class="e_a ex_b">
          <div class="ex_ct">
            <p>以BTC/USDT为例<br >开启时间：12:00</p>
          </div>
        </div>
        <div class="e_b ex_b">
          <div class="ex_ct">
            <p>第一位获奖者A<br >在16:00出现</p>
          </div>
          <span>A：获得12:00-16:00期间，<br>BTC/USDT交易手续费的40%</span>
        </div>
        <div class="e_c ex_b">
          <div class="ex_ct">
            <p>第二位获奖者B<br >在21:00出现</p>
          </div>
          <span>B：获得16:00-21:00期间，<br>BTC/USDT交易手续费的40%</span>
        </div>
        <div class="e_d ex_b">
          <div class="ex_ct">
            <p>重置时间：24:00</p>
          </div>
          <span>从21:00-24:00没有产生获奖者，<br>那么该区间段产生的交易手续费<br>归入平台手续费收入分配</span>
        </div>
      </div>
    </div>
    <div class="fbg"/>
  </div>

</template>
<script>
import VNav2 from '@/components/VNav2'
export default {
  data () {
    return {
      animate: false
    }
  },
  components: {
    VNav2
  },
  created () {
    setInterval(this.scroll, 1000)
  },
  methods: {
    scroll () {
      let con1 = this.$refs.con1
      con1.style.marginTop = '-30px'
      this.animate = !this.animate
      var that = this
      setTimeout(function () {
        that.items.push(that.items[0])
        that.items.shift()
        con1.style.marginTop = '0px'
        that.animate = !that.animate
      }, 500)
    }
  }

}
</script>
<style lang="scss">
  @import "~@/styles/vars";
  @import "~@/styles/mixins";
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
