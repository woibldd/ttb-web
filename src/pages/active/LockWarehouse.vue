<template>
  <div class="page-home">
    <div class="header">
      <v-nav
        is-home="true"
      />
    </div>
    <div class="banner"/>
    <div class="c-box">
      <div class="top-box">
        <div class="top-cen">
          <div class="m-middle">
            <span class="top-s-tit">{{ $t('ystd_trad') }}</span>
            <p class="top-s-txt top-txt-yellow mar-bot">1BTC≈￥49999.98789</p>
            <span class="top-s-tit">{{ $t('td_trad') }}</span>
            <p class="top-s-txt top-txt-yellow">1BTC≈￥49999.98189</p>
          </div>
        </div>
        <div class="top-cen">
          <div class="m-middle">
            <span class="top-tit">{{ $t('hash_rate') }}</span>
            <p class="top-txt top-txt-blue">100.XXX<em>IX/H</em></p>
          </div>
        </div>
        <div class="top-cen">
          <div class="m-middle">
            <span class="top-tit">{{ $t('td_trad_amount') }}</span>
            <p class="top-txt top-txt-blue">100.XXX<em>IX/H</em></p>
          </div>
        </div>
        <div class="top-cen">
          <div class="m-middle">
            <span class="top-s-tit">{{ $t('cum_trad_amount') }}</span>
            <p class="top-s-txt top-txt-blue mar-bot">10000.9988<em>IX/H</em></p>
            <span class="top-s-tit">{{ $t('cum_trad_revenue') }}</span>
            <p class="top-s-txt top-txt-blue">10000.9988<em>IX/H</em></p>
          </div>
        </div>
      </div>
    </div>
    <div class="c-box operating">
      <div class="oper-cen">
        <div class="oper-cen-tit col-yel">{{ $t('improve_hash_rate') }}</div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>{{ $t('available_balance') }}</span>
          </p>
          <p class="balance">888000000  IX</p>
        </div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>{{ $t('lock_amount') }}</span>
          </p>
          <input
            type="number"
            min="20000"
            step="20000"
            :placeholder="$t('integer_ultiple')"
            class="balance">
          <a
            href="javascript:void(0)"
            class="num-max">{{ $t('maximum') }}</a>
        </div>
        <v-btn
          class="oper-but"
          height="70"
          fontsize="16"
          :loading="lock_loading"
          @click="doLock"
          :disabled="lock_disable"
          :label="$t('locked')"
        />
      </div>
      <div class="oper-cen">
        <div class="oper-cen-tit">{{ $t('unlock') }}</div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>{{ $t('unlock_available') }}</span>
          </p>
          <p class="balance">888000000  IX</p>
        </div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>{{ $t('unlocked_amount') }}</span>
          </p>
          <input
            type="number"
            min="20000"
            step="20000"
            :placeholder="$t('integer_ultiple')"
            class="balance">
          <a
            href="javascript:void(0)"
            class="num-max">{{ $t('maximum') }}</a>
        </div>
        <v-btn
          class="oper-but"
          height="70"
          fontsize="16"
          :loading="unlock_loading"
          @click="doUnLock"
          :disabled="unlock_disable"
          :label="$t('unlock')"
        />
      </div>
      <div class="oper-cen">
        <div class="oper-cen-tit">{{ $t('unlocking') }}</div>
        <div class="oper-wait">
          <p class="num">20000  IX</p>
          <span class="tips">*{{ $t('unlocked') }}</span>
        </div>
      </div>
    </div>
    <div class="c-box record">
      <div class="rec record-l">
        <div class="rec-tit">
          {{ $t('mining_records') }}
          <a href="">{{ $t('more') }}</a>
        </div>
        <div class="rec-t">
          <p class="re-a">{{ $t('time') }}</p>
          <p class="re-b">{{ $t('transaction_fee') }}</p>
          <p class="re-c">{{ $t('hash_rate_hour') }}</p>
          <p class="re-d">{{ $t('mining_output') }}</p>
          <p class="re-e">{{ $t('situation') }}</p>
        </div>
        <div class="scroll-con">
          <ul>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">0.3</p>
              <p class="re-c">0.00007</p>
              <p class="re-d">100</p>
              <p class="re-e c-yellow">已派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">0.3</p>
              <p class="re-c">0.00007</p>
              <p class="re-d">100</p>
              <p class="re-e c-blue">未派发
                <span>
                  <em>2018—09—24 发放 <i/> </em>
                </span>
              </p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">0.3</p>
              <p class="re-c">0.00007</p>
              <p class="re-d">100</p>
              <p class="re-e c-yellow">已派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">0.3</p>
              <p class="re-c">0.00007</p>
              <p class="re-d">100</p>
              <p class="re-e c-blue">未派发
                <span>
                  <em>2018—09—24 发放 <i/> </em>
                </span>
              </p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">0.3</p>
              <p class="re-c">0.00007</p>
              <p class="re-d">100</p>
              <p class="re-e c-yellow">已派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">0.3</p>
              <p class="re-c">0.00007</p>
              <p class="re-d">100</p>
              <p class="re-e c-blue">未派发
                <span>
                  <em>2018—09—24 发放 <i/> </em>
                </span>
              </p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">0.3</p>
              <p class="re-c">0.00007</p>
              <p class="re-d">100</p>
              <p class="re-e c-yellow">已派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">0.3</p>
              <p class="re-c">0.00007</p>
              <p class="re-d">100</p>
              <p class="re-e c-blue">未派发
                <span>
                  <em>2018—09—24 发放 <i/> </em>
                </span>
              </p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">0.3</p>
              <p class="re-c">0.00007</p>
              <p class="re-d">100</p>
              <p class="re-e c-yellow">已派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">0.3</p>
              <p class="re-c">0.00007</p>
              <p class="re-d">100</p>
              <p class="re-e c-blue">未派发
                <span>
                  <em>2018—09—24 发放 <i/> </em>
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="c-box condition">
      <p class="cdt-title">{{ $t('requirements') }}</p>
      <ul>
        <li><i>1.</i>{{ $t('req_a') }}<br >{{ $t('req_a_a') }}</li>
        <li><i>2.</i>{{ $t('req_b') }}</li>
        <li><i>3.</i>{{ $t('req_c') }}</li>
        <li><i>4.</i>{{ $t('req_d') }}</li>
        <li><i>5.</i>{{ $t('req_e') }}</li>
        <li><i>6.</i>{{ $t('req_f') }}</li>
        <li><i>7.</i>{{ $t('req_g') }}</li>
      </ul>
    </div>
  </div>

</template>
<script>
import VNav from '@/components/VNav3'
import VBtn from '@/components/VBtn'
export default {
  data () {
    return {
      lock_loading: false,
      unlock_loading: false,
      lock_disable: true,
      unlock_disable: true,
      balance: {
        available: 100223,
        locking: 20000
      }
    }
  },
  components: {
    VNav,
    VBtn
  },
  methods: {
    doLock () {

    },
    doUnLock () {

    },
    async fetch () {

    }
  },
  created () {
    this.fetch()
  }

}
</script>
<style lang="scss" scoped>
  @import "~@/styles/vars";
  @import "~@/styles/mixins";
  .page-home{
    background: #262D36;
  }
  .header{
    background: #1A1A1A;
  }
  .banner{
    height: 600px;
    width: 100%;
    background-image: url(/static/active/LockWarehouse/banner.jpg);
    background-repeat: no-repeat;
    background-position: center center;
  }
  .c-box{
    width: 1200px;
    height: auto;
    position: relative;
    margin: 0 auto;
    &::after{
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      clear: both;
    }
  }
  .top-box{
    overflow: hidden;
    margin-top: -65px;
    margin-bottom: 53px;
    .top-cen{
      float: left;
      width: 290px;
      height: 177px;
      display: table;
      padding-left: 30px;
      border-radius: 8px;
      margin-right: 13px;
      background: #2D3540;
      box-sizing: border-box;
      box-shadow:0px 0px 21px 0px rgba(32,36,39,0.3);
      .m-middle{
        display: table-cell;
        vertical-align: middle;
      }
      &:last-child{
        float: right;
        margin: 0;
      }
      .top-tit{
        font-size: 18px;
        height: 48px;
        line-height: 48px;
        display: block;
        color: #fff;
      }
      .top-txt{
        font-size: 36px;
        line-height: 60px;
        em{
          color: #6C869C;
          font-size: 18px;
          padding-left: 15px;
        }
      }
      .mar-bot{
        margin-bottom: 18px;
      }
      .top-s-tit{
        font-size: 18px;
        line-height: 24px;
        display: block;
        color: #fff;
      }
      .top-s-txt{
        font-size: 16px;
        line-height: 32px;
        em{
          color: #6C869C;
          font-size: 18px;
          padding-left: 15px;
        }
      }
      .top-txt-blue{
        color: #CBE6FD;
      }
      .top-txt-yellow{
        color: #CAAA6C;
      }
    }
  }
  .operating{
    background: #2D3540;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0 30px;
    margin-bottom: 14px;
    .oper-cen{
      float: left;
      width: 338px;
      padding-top: 20px;
      padding-bottom: 50px;
      margin-right: 63px;
      &:last-child{
        float: right;
        margin: 0;
      }
      .oper-cen-tit{
        font-size: 20px;
        text-indent: 15px;
        line-height: 66px;
        color: #fff;
      }
      .col-yel{
        color: #C2A378;
      }
      .oper-con{
        width: 100%;
        height: 58px;
        font-size: 14px;
        position: relative;
        margin-bottom: 12px;
        background: #24292F;
        .oper-con-l{
          width: 93px;
          height: 58px;
          display: table;
          padding-left: 15px;
          box-sizing: border-box;
          color: #A6BED3;
          float: left;
          span{
            display: table-cell;
            vertical-align: middle;
          }
        }
        .balance{
          float: left;
          width: 235px;
          line-height: 58px;
          color: #fff;
          padding: 0;
          margin: 0;
          border: 0;
          outline: none;
          background: none;
          &::placeholder{
            color: #446683;
          }
        }
        .num-max{
          position: absolute;
          text-align: center;
          line-height: 58px;
          color: #A6BED3;
          padding: 0 10px;
          display: block;
          height: 58px;
          right: 0;
          top: 0;
          &::before{
            background: #343E4C;
            position: absolute;
            margin-top: -11px;
            display: block;
            height: 22px;
            content: "";
            width: 1px;
            top: 50%;
            left: 0;
          }
        }
      }
      .oper-but{
        width: 100%;
        height: 68px;
        border: none;
        color: #A6BED3;
        cursor: pointer;
        margin-top: 23px;
        border-radius: 4px;
        background: #CAAA6C;

        &.disabled {
          background: #353F4D;
          cursor: default;
          color: #fff;
        }

        &:hover {
          opacity: 0.8;
        }
      }
      .oper-wait{
        height: 231px;
        background: #24292F;
        border-radius: 8px;
        position: relative;
        .num{
          text-align: center;
          line-height: 231px;
          color: #A6BED3;
          font-size: 30px;
        }
        .tips{
          font-size: 14px;
          color: #446683;
          position: absolute;
          display: block;
          bottom: 15px;
          text-indent: 20px;
        }
      }
    }
  }
  .record{
    font-size: 14px;
    margin-bottom: 37px;
    &::after{
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      clear: both;
    }
    .record-l{
      float: left;
    }
    .rec{
      padding: 18px 15px 0 15px;
      box-sizing: border-box;
      background: #2D3540;
      border-radius: 8px;
      text-align: center;
      height: 477px;
      width: 100%;
      .rec-tit{
        height: auto;
        color: #fff;
        font-size: 24px;
        line-height: 45px;
        position: relative;
        a{
          position: absolute;
          color: #fff;
          font-size: 14px;
          right: 50px;
          &::after{
            content: ">";
            position: absolute;
            right: -15px;
          }
        }
      }
      .scroll-con{
        height: 330px;
        ul{
          li{
            height: 33px;
            line-height: 33px;
            color: #fff;
            .c-yellow{
              color: #C2A378;
            }
            .c-blue{
              color: #446683;
              position: relative;
              span{
                background: #3D4959;
                border-radius: 10px;
                position: absolute;
                margin-top: -10px;
                display: block;
                height: 20px;
                width: 20px;
                right: 40px;
                top: 50%;
                &::before{
                  line-height: 20px;
                  color: #5F7EA7;
                  font-size: 13px;
                  cursor: pointer;
                  display: block;
                  content: "?";
                  height: 20px;
                  width: 20px;
                }
                em{
                  width: 138px;
                  height: 43px;
                  line-height: 43px;
                  display: none;
                  position: absolute;
                  text-align: center;
                  color: #fff;
                  font-size: 12px;
                  background: #3D4959;
                  border-radius: 4px;
                  left: 10px;
                  top: -58px;
                  &::before{
                    content: "";
                    display: block;
                    position: absolute;
                    bottom: -10px;
                    border-top: 12px solid #3D4959;
                    border-right: 14px solid transparent;
                  }
                }
                &:hover{
                  em{
                    display: block;
                  }
                }
              }
            }
          }
        }
        .no-record{
          font-size: 18px;
          line-height: 330px;
          color: #A6BED3;
        }
      }
    }
    .rec-t{
      height: 60px;
      line-height: 60px;
      overflow: hidden;
      font-size: 18px;
      color: #A6BED3;
    }
    .re-a{
      width: 20%;
      float: left;
    }
    .re-b{
      width: 25%;
      float: left;
    }
    .re-c{
      width: 25%;
      float: left;
    }
    .re-d{
      width: 15%;
      float: left;
    }
    .re-e{
      width: 15%;
      float: left;
    }
  }
  .condition{
    color: #CBE6FD;
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 130px;
    .cdt-title{
      font-size: 24px;
      line-height: 38px;
      margin-bottom: 17px;
    }
    ul{
      li{
        padding-left: 25px;
        position: relative;
        margin-bottom: 5px;
        i{
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
  .lang-en {
    .top-s-tit{
      font-size: 13px !important;
      line-height: 24px;
    }
    .top-tit{
      font-size: 13px !important;
      line-height: 24px;
    }
    .condition{
      font-size: 14px;
    }
  }
  input{
    outline: medium;
    background: none;
    border: none;
    font-size: 18px;
    color: #ffffff;
    appearance: none;

    &::placeholder {
      // color: #446683;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
  }
</style>
