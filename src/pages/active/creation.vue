<template>
  <div class="page-home">
    <div class="header">
      <v-nav2
        is-home="true"
        :notice="notice"
        @hide="notice = null"/>
    </div>
    <div class="banner">
      <div class="banner-txt"/>
    </div>
    <div class="c_box">
      <div class="tl">
        <div class="tlt">
          <p class="tl-tt">{{ $t('imta') }}</p>
          <p class="tl-ct">1000,000,000 IX</p>
        </div>
        <div class="cre_jd">
          <div
            class="cre_jdc"
            style="width:50%">
            <p>
              <em>50%</em>
            </p>
          </div>
          <span class="cre slt">0%</span>
          <span class="cre srt">100%</span>
        </div>
        <div class="cre_jdt cr_jd_lt">
          <p><span>{{ $t('Openingtime') }}</span>{{ $t('Ota') }}</p>
          <p><span>{{ $t('distime') }}</span>{{ $t('distimea') }}</p>
        </div>
        <div class="cre_jdt cr_jd_rt">
          <p><span>{{ $t('sinin') }}</span>10-250000 ix</p>
          <p><span>{{ $t('Priceof') }}</span>1ix=0.00289855usdt=0.00000045btc</p>
        </div>
      </div>
      <div class="tr">
        <div class="tr_d">
          <span class="tr_dt">{{ $t('miningamount') }}</span>
          <div class="tr_dc">
            <input
              type="text"
              class="tr-inp-t" >
            <span class="tr-tlt">IX</span>
          </div>
          <div class="tr-ts">{{ $t('entexceeds') }}</div>
        </div>
        <div class="tr_d">
          <span class="tr_dt">{{ $t('paymentcurrencyd') }}</span>
          <div class="tr_dc">
            <input
              type="text"
              class="tr-inp-t" >
            <select name="">
              <option value="">usdt</option>
              <option value="">usdt</option>
              <option value="">usdt</option>
            </select>
            <div class="sjb"/>
          </div>
          <div class="tr-ts">{{ $t('entexceeds') }}</div>
        </div>
        <p class="tr_ct">{{ $t('available') }}666.22 usdt<a href="">{{ $t('TopUp') }}</a></p>
        <p class="tr_ct tmb">{{ $t('available') }}666.22 btc<a href="">{{ $t('TopUp') }}</a></p>

        <div class="inp_box">
          <button>{{ $t('mined') }}</button>
        </div>
      </div>
    </div>
    <div class="c_box process">
      <p class="pro_title">{{ $t('inMin') }}</p>
      <div class="pro-box b_a">01
        <span>{{ $t('applysub') }}</span>
      </div>
      <div class="pro-box b_b">02
        <span>{{ $t('topupa') }}</span>
      </div>
      <div class="pro-box b_c">
        <div class="bc_box">
          03
          <span>{{ $t('openInnov') }}</span>
        </div>
      </div>
      <div class="pro-box b_d">04
        <span>{{ $t('activityends') }}</span>
      </div>
      <div class="pro-box b_e">05
        <span>{{ $t('completeconfirmation') }}</span>
      </div>
    </div>
    <div class="c_box b_txt">
      <p>{{ $t('Subrules') }}</p>
      <ul>
        <li>{{ $t('eligibility') }}</li>
        <li>{{ $t('preparetopup') }}</li>
        <li>{{ $t('ofi') }}</li>
        <li>{{ $t('aends') }}</li>
        <li>{{ $t('comptright') }}</li>
        <li>{{ $t('totalamount') }}</li>
        <li>{{ $t('actbeloplat') }}</li>
      </ul>
    </div>
  </div>

</template>
<script>
import VNav2 from '@/components/VNav2'
import VBtn from '@/components/VBtn'

export default {
  data () {
  },
  components: {
    VBtn,
    VNav2
  }

}
</script>
<style lang="scss">
  @import "~@/styles/vars";
  @import "~@/styles/mixins";
  .page-home{
    background-color: #262D36;
    background-image: url(/static/active/creation/banner.jpg);
    background-repeat: no-repeat;
    background-position: top center;
  }
  .banner{
    height: 670px;
    width: 100%;
    position: relative;
    .banner-txt{
      position: absolute;
      top: 250px;
      width: 100%;
      height: 137px;
      left: 0;
      background-image: url(/static/active/creation/banner-txt.png);
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  .c_box{
    width: 1200px;
    height: auto;
    margin: 0 auto;
    padding-bottom: 88px;
    &::after{
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      clear: both;
    }
  }
  .tl{
    float: left;
    width: 660px;
    .tlt{
      width: 100%;
      height: 245px;
      background: #24292F;
      text-align: center;
      color: #fff;
      padding-top: 43px;
      box-sizing: border-box;
      .tl-tt{
        font-size: 24px;
        height: 35px;
        line-height: 35px;
      }
      .tl-ct{
        font-size: 72px;
        height: 75px;
        line-height: 75px;
        margin-top: 30px;
      }
    }
    .cre_jd{
      width: 100%;
      height: 8px;
      background: #343A42;
      border-radius: 8px;
      margin: 53px 0 22px 0;
      color: #fff;
      font-size: 16px;
      position: relative;
      .cre_jdc{
        height: 8px;
        background: #CAAA6C;
        border-radius: 8px;
        position: relative;
        p{
          position: absolute;
          top: -6px;
          right: -10px;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          background: #FFC85D;
          em{
            position: absolute;
            text-align: center;
            margin-left: -25px;
            line-height: 24px;
            display: block;
            height: 24px;
            width: 50px;
            top: -30px;
            left: 50%;
          }
        }
      }
      .cre{
        position: absolute;
        top: -36px;
      }
      .slt{
        left: 0;
      }
      .srt{
        right: 0;
      }
    }
    .cre_jdt{
      float: left;
      color: #fff;
      font-size: 16px;
      line-height: 24px;
      margin-top: 16px;
      p{
        margin-bottom: 10px;
      }
      span{
        color: #CBE6FD;
      }
    }
    .cr_jd_lt{
      width: 45%;
    }
    .cr_jd_rt{
      width: 55%;
    }
  }
  .tr{
    float: right;
    width: 480px;
    font-size: 18px;
    .tr_d{
      width: 100%;
      height: 75px;
      margin-bottom: 37px;
      position: relative;
      .tr_dt{
        float: left;
        line-height: 75px;
        width: 90px;
        color: #fff;
      }
      .tr_dc{
        float: left;
        width: 390px;
        height: 75px;
        position: relative;
        background: #24292F;
        span{
          height: 75px;
          height: 75px;
          color: #CAAA6C;
          line-height: 75px;
          position: absolute;
        }
        input{
          height: 75px;
          outline: medium;
          background: none;
          border: none;
          text-indent: 2em;
          color: #fff;
          &.tr-inp-t{
            width: 100%;
          }
        }
        select{
          height: 75px;
          border: none;
          float: right;
          text-align: center;
          display: block;
          font-size: 24px;
          color: #CAAA6C;
          padding: 0 12% 0 0;
          background: none;
          background: transparent;
          appearance: none;
          position: absolute;
          top: 0;
          right:0;
          opacity{
            text-align: center;
            font-size: 12px;
          }
        }
        .sjb{
          position: absolute;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #CAAA6C;
          top: 50%;
          margin-top: -3px;
          right: 20px;
        }
        .tr-tlt{
          position: absolute;
          top: 0;
          right: 20px;
        }
      }
      .tr-ts{
        position: absolute;
        color: #EE5653;
        font-size: 12px;
        bottom: -25px;
        left: 100px;
      }
    }
    .tr_ct{
      width: 100%;
      height: 34px;
      line-height: 34px;
      color: #fff;
      margin-bottom: 10px;
      a{
        float: right;
        font-size: 20px;
      }
    }
  }
  .inp_box{
    button{
      width: 100%;
      height: 70px;
      background: #353F4D;
      border-radius: 5px;
      border: none;
      color: #fff;
      font-size: 24px;
      margin-top: 20px;
    }
  }
  .process{
    background: #24292F;
    font-size: 24px;
    text-align: center;
    height: 307px;
    box-sizing: border-box;
    position: relative;
    .pro_title{
      color: #fff;
      height: 124px;
      line-height: 114px;
    }
    .pro-box{
      height: 76px;
      width: 76px;
      text-align: center;
      line-height: 76px;
      border-radius: 50px;
      background: rgba(53, 63, 77, 1);
      position: absolute;
      color: #fff;
      top: 125px;
      z-index: 1;
      span{
        font-size: 18px;
        display: block;
        position: absolute;
        width: 170px;
        bottom: -55px;
        height: 24px;
        line-height: 24px;
        left: 50%;
        margin-left: -85px;
      }
      &::after{
        content: "";
        width:73px;
        height: 2px;
        background: #A1A0D1;
        display: block;
        top: 50%;
        margin-top: -1px;
        right: -118px;
        position: absolute;
      }
    }
    .b_a{
      left: 82px;
    }
    .b_b{
      left: 322px;
    }
    .b_c{
      width: 104px;
      height: 104px;
      left: 50%;
      margin-left: -52px;
      background: #514C3F;
      top: 110px;
      box-shadow:0px 0px 21px 0px rgba(10,9,19,0.3);
      position: absolute;
    }
    .bc_box{
      width: 76px;
      height: 76px;
      border-radius: 76px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -38px;
      margin-top: -38px;
      position: absolute;
      background: #CAAA6C;
      span{
        bottom: -55px;
        color: #CAAA6C;
      }
    }
    .b_d{
      right: 322px;
    }
    .b_e{
      right: 82px;
      &::after{
        content: "";
        display: none;
      }
    }
  }
  .b_txt{
    margin-top: 15px;
    font-size: 14px;
    color: #CBE6FD;
    line-height: 24px;
    p{
      font-size: 18px;
      color: #fff;
      margin-bottom: 30px;
    }
  }
</style>
