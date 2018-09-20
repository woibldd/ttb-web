<template>
  <div class="page-home">
    <div class="header">
      <v-nav2
        is-home="true"
        @hide="notice = null"/>
    </div>
    <div class="banner">
      <div class="banner_txt">
        <p class="ban-txt" v-html="$t('active_relay_h1')"></p>
        <p v-t="'active_relay_h2'"></p>
        <p v-html="$t('active_relay_h3')"></p>
      </div>
    </div>
    <div class="top-txt">
      <div class="t-t lt"><span v-t="'active_relay_start'"></span></div>
      <div class="t-t rt" v-html="$t('active_relay_next')"></div>
    </div>
    <div class="cen_scr">
      <div class="scr-cen scr-l">
        <p class="scr-txt">{{$t('active_relay_totally')}}<span>85.92114584</span>BTC</p>
        <div class="scr-box">
          <p class="scr-tit">BTC/USDT</p>
          <div class="scr">
            <div class="scr-title">
              <p class="scr_l">{{$t('active_relay_amount')}}</p>
              <p class="scr_m">{{$t('active_relay_operator')}}</p>
              <p class="scr_r">{{$t('active_relay_time')}}</p>
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
                  <p class="scr_m">{{$t('order_side_buy')}}</p>
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
          class="join">{{$t('active_relay_join')}}</a>
      </div>
      <div class="scr-cen scr-m">
        <p class="scr-txt">{{$t('active_relay_totally')}}<span>85.92114584</span>BTC</p>
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
        <p class="scr-txt">{{$t('active_relay_totally')}}<span>85.92114584</span>BTC</p>
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
      <p v-t="'active_relay_rule'"></p>
      <ul>
        <li>1、{{$t('active_relay_rule1')}}</li>
        <li>2、{{$t('active_relay_rule2')}}</li>
        <li>3、{{$t('active_relay_rule3')}}</li>
        <li>4、{{$t('active_relay_rule4')}}</li>
      </ul>
    </div>
    <div class="example">
      <p class="ex_tit" v-t="'active_relay_example'"></p>
      <div class="ex_jd">
        <div class="e_a ex_b">
          <div class="ex_ct">
            <p v-html="$t('active_relay_example_1')"></p>
          </div>
        </div>
        <div class="e_b ex_b">
          <div class="ex_ct">
            <p v-html="$t('active_relay_example_2')"></p>
          </div>
          <span v-html="$t('active_relay_example_3')"></span>
        </div>
        <div class="e_c ex_b">
          <div class="ex_ct">
            <p v-html="$t('active_relay_example_4')"></p>
          </div>
          <span v-html="$t('active_relay_example_5')"></span>
        </div>
        <div class="e_d ex_b">
          <div class="ex_ct">
            <p>{{$t('active_relay_example_reset')}}</p>
          </div>
          <span v-html="$t('active_relay_example_6')"></span>
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
