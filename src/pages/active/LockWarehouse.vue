<template>
  <div class="page-home">
    <div class="header">
      <v-nav2
        is-home="true"
        :notice="notice"
        @hide="notice = null"/>
    </div>
    <div class="banner"/>
    <div class="c-box">
      <div class="top-box">
        <div class="top-cen">
          <span class="top-tit">昨日挖矿总收益折合(btc)</span>
          <p class="top-txt top-txt-yellow">1.00009999</p>
        </div>
        <div class="top-cen">
          <span class="top-tit">我的算力</span>
          <p class="top-txt top-txt-blue">100.XXX<em>IX/H</em></p>
        </div>
        <div class="top-cen">
          <span class="top-tit">昨日挖矿量(btc)</span>
          <p class="top-txt top-txt-blue">100.XXX<em>IX/H</em></p>
        </div>
        <div class="top-cen">
          <span class="top-tit">累计挖矿</span>
          <p class="top-txt top-txt-blue">100.XXX<em>IX/H</em></p>
        </div>
      </div>
    </div>
    <div class="c-box operating">
      <div class="oper-cen">
        <div class="oper-cen-tit col-yel">提升算力</div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>可用余额</span>
          </p>
          <p class="balance">888000000  IX</p>
        </div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>锁仓量</span>
          </p>
          <input
            type="text"
            placeholder="请输入20000的整数倍  IX"
            class="balance">
          <a
            href="javascript:void(0)"
            class="num-max">最大</a>
        </div>
        <button
          disabled="disabled"
          class="oper-but change">锁仓</button>
      </div>
      <div class="oper-cen">
        <div class="oper-cen-tit">解锁</div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>可解锁</span>
          </p>
          <p class="balance">888000000  IX</p>
        </div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>解锁量</span>
          </p>
          <input
            type="text"
            placeholder="请输入20000的整数倍  IX"
            class="balance">
          <a
            href="javascript:void(0)"
            class="num-max">最大</a>
        </div>
        <button
          disabled="disabled"
          class="oper-but">解锁</button>
      </div>
      <div class="oper-cen">
        <div class="oper-cen-tit">解锁中</div>
        <div class="oper-wait">
          <p class="num">20000  IX</p>
          <span class="tips">*解锁部分于1小时后释放</span>
        </div>
      </div>
    </div>
    <div class="c-box record">
      <div class="rec record-l">
        <div class="rec-tit">
          锁仓记录
        </div>
        <div class="rec-t">
          <p class="re-a">锁仓时间</p>
          <p class="re-b">数量（IX）</p>
          <p class="re-c">状态</p>
        </div>
        <div class="scroll-con">
          <ul>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">20000</p>
              <p class="re-c c-yellow">已派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">20000</p>
              <p class="re-c c-blue">待明日派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">20000</p>
              <p class="re-c c-yellow">已派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">20000</p>
              <p class="re-c c-blue">待明日派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">20000</p>
              <p class="re-c c-yellow">已派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">20000</p>
              <p class="re-c c-blue">待明日派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">20000</p>
              <p class="re-c c-yellow">已派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">20000</p>
              <p class="re-c c-blue">待明日派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">20000</p>
              <p class="re-c c-yellow">已派发</p>
            </li>
            <li>
              <p class="re-a">2018.9.09  13:00:00</p>
              <p class="re-b">20000</p>
              <p class="re-c c-blue">待明日派发</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="rec record-r">
        <div class="rec-tit">
          挖矿记录
          <a href="#">更多</a>
        </div>
        <div class="rec-t">
          <p class="re-a">锁仓时间</p>
          <p class="re-b">数量（IX）</p>
          <p class="re-c">状态</p>
        </div>
        <div class="scroll-con">
          <p class="no-record">暂无记录</p>
        </div>
      </div>
    </div>
    <div class="c-box condition">
      <p class="cdt-title">参与条件</p>
      <ul>
        <li><i>1.</i>参与条件：锁仓至少20000 IX；挖矿基准算力：100 IX/H<br >挖矿基准算力：即每个账户锁仓20000IX后，每小时可挖出的IX数量。您每小时挖矿产出数量=（您的IX锁仓量/20000)*</li>
        <li><i>2.</i>锁仓：随时锁仓，锁仓后算力从下一整点开始计算；</li>
        <li><i>3.</i>解锁：随时解锁，解锁的IX将在24小时后释放<br >锁仓和解锁的最小额度为20000 IX，总额为20000的整数倍；</li>
        <li><i>4.</i>锁仓的IX正常参与每日平台50%交易手续费分红；</li>
        <li><i>5.</i>每小时进行锁仓快照；取锁仓快照时的基准算力与该小时您的交易手续费中的较小的值作为您该小时实际挖矿量</li>
        <li><i>6.</i>根据前一天的挖矿产出总量和难度值，调整当天的基准算力；并于每天的0点更新基准算力；</li>
        <li><i>7.</i>IX保留调整交易挖矿规则的最终解释权；</li>
      </ul>
    </div>
  </div>

</template>
<script>
import VNav2 from '@/components/VNav2'
export default {
  data () {
  },
  components: {
    VNav2
  }

}
</script>
<style lang="scss">
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
      padding-top: 33px;
      border-radius: 8px;
      text-align: center;
      margin-right: 13px;
      background: #2D3540;
      box-sizing: border-box;
      box-shadow:0px 0px 21px 0px rgba(32,36,39,0.3);
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
          width: 103px;
          height: 58px;
          display: table;
          text-indent: 15px;
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
          display: block;
          height: 58px;
          width: 56px;
          right: 0;
          top: 0;
          &::before{
            content: "";
            background: #343E4C;
            position: absolute;
            margin-top: -11px;
            display: block;
            height: 22px;
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
        cursor: pointer;
        margin-top: 23px;
        color: #A6BED3;
        border-radius: 4px;
        background: #353F4D;
      }
      .change{
        background: #CAAA6C;
        color: #fff;
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
    .record-r{
      float: right;
    }
    .rec{
      padding: 18px 15px 0 15px;
      box-sizing: border-box;
      background: #2D3540;
      border-radius: 8px;
      text-align: center;
      height: 477px;
      width: 590px;
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
      width: 35%;
      float: left;
    }
    .re-b{
      width: 25%;
      float: left;
    }
    .re-c{
      width: 40%;
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
</style>
