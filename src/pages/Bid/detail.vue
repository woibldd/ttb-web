<template>
  <div class="bid-detail-container">
    <div class="backTop" @click="backTop">
      <i class="iconfont">&#xe64e;</i>
      <span>返回币必盈</span>
    </div>
    <div class="title-box">
      <div class="logo"></div>
      <h1>IXX</h1>
      <h2>{{cell.money_days}}天存币计划</h2>
    </div>
    <div class="bid-detail-area">
      <div class="message-box">
        <div class="tips">
          <div class="rate">
            <h1>{{ cell.annualized_returns > 0 ? (Number(cell.annualized_returns)).toFixed(2) : 0 }}%</h1>
            <span>年化利率</span>
          </div>
          <div class="week">
            <h1>{{ cell.money_days }}天</h1>
            <span>存币期限</span>
          </div>
        </div>
        <div class="range-box">
          <div class="range">
            <el-progress :text-inside="true" :stroke-width="12" :percentage="cell.down_amount" status="warning" />
          </div>
          <div class="range-txt">
            <span class="lock">已锁 {{cell.locked_amount}}</span>
            <span class="join">{{ cell.join_amount }} 人参与</span>
          </div>
          <dl>
            <dd>
              <span>抢购总额度</span>
              <em>{{cell.total}} ix</em>
            </dd>
            <dd>
              <span>剩余额度</span>
              <em>{{ cell.remaining_amount }} ix</em>
            </dd>
            <dd>
              <span>存币上限</span>
              <em>{{ cell.max_limit }} ix</em>
            </dd>
            <dd>
              <span>单次起购数量</span>
              <em>{{ cell.min_limit }} ix</em>
            </dd>
          </dl>
          <div class="time-line">
            <el-timeline>
              <el-timeline-item
                  v-for="(activity, index) in detail.timeLine"
                  :key="index"
                  :color="activity.color">
                {{activity.content}}
                <span style="padding-left: 10px;color: #333">{{ activity.timestamp }}</span>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
      <div class="ipt">
        <div class="buy-area">
          <span>账户余额 0 ix</span>
          <em class="pay">充值</em>
          <em class="buy">去购买</em>
        </div>
        <div class="buy-ipt">
          <div class="title">存币数量</div>
          <div class="ipt-inner">
            <input type="number" v-model="count" placeholder="请输入存币数量" @input="inputKeyBoard" />
            <!--<el-input-number v-model.number="count" :min="cell.min_limit" :max="cell.max_limit" label="请输入存币数量"></el-input-number>-->
            <div class="rage">
              <span class="cell">ixx</span>
              <em>全部</em>
            </div>
          </div>
          <div class="tip">预计收益<em>--</em>ix</div>
        </div>
        <button class="join-btn" :disabled="disabled" @click="submit">
          参加
        </button>
      </div>
    </div>
    <div class="rule-msg">
      <dl>
        <dt>规则说明<i class="iconfont">&#xe62e;</i></dt>
        <dd>1.币必盈是基于数字资产的理财产品，每个项目有相应的锁定周期和利率，您可以自由选择购买，购买后本金锁定，根据约定时间开始计算利</dd>
        <dd>1.币必盈是基于数字资产的理财产品，每个项目有相应的锁定周期和利率，您可以自由选择购买，购买后本金锁定，根据约定时间开始计算利</dd>
        <dd>1.币必盈是基于数字资产的理财产品，每个项目有相应的锁定周期和利率，您可以自由选择购买，购买后本金锁定，根据约定时间开始计算利</dd>
        <dd>1.币必盈是基于数字资产的理财产品，每个项目有相应的锁定周期和利率，您可以自由选择购买，购买后本金锁定，根据约定时间开始计算利</dd>
        <dd>1.币必盈是基于数字资产的理财产品，每个项目有相应的锁定周期和利率，您可以自由选择购买，购买后本金锁定，根据约定时间开始计算利</dd>
        <dd>1.币必盈是基于数字资产的理财产品，每个项目有相应的锁定周期和利率，您可以自由选择购买，购买后本金锁定，根据约定时间开始计算利</dd>
      </dl>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import { getLocalTime } from './mixins'
import Vue from 'vue'
import qs from 'qs'
export default {
  data () {
    return{
      count: 0,
      detail: {
        id: 2,
        lock: 40,
        join: 100,
        rate: 0.09,
        term: 30,
        currency: 'USDT',
        snap_all_amount: 50000,
        join_amount: 36000,
        remaining_amount: 46000,
        save_max_money: 1000,
        step_money: 100,
        time_limit: 30,
        cycle: 40,
        startTime: '05/14 10:00',
        endTime: '05/15 13:00',
        timeLine: [{
          content: '存币截止时间',
          timestamp: '2018-04-15',
          color: '#C9A96C'
        }, {
          content: '计息时间',
          timestamp: '2018-04-13',
          color: '#C9A96C'
        }, {
          content: '解锁时间',
          timestamp: '2018-04-11',
          color: '#C9A96C'
        }]
      },
      disabled: true,
      cell: {}
    }
  },
  methods: {
    backTop() {
      this.$router.push('/')
    },
    inputKeyBoard(e) {
      e.target.value = e.target.value.toString().match(/^\d*(\.?\d{0,2})/g)[0] || null
      if (e.target.value) {
        this.disabled = false
        if (e.target.value < this.cell.min_limit) {
          e.target.value = this.cell.min_limit
        } else if (e.target.value > this.cell.max_limit) {
          e.target.value = this.cell.max_limit
        }
      } else {
        this.disabled = true
      }
    },
    submit() {
      axios.post('http://192.168.1.137:2016/manageRecord/buy', qs.stringify({
        site: this.cell.site,
        currency: this.cell.currency,
        userId: '99999999',
        amount: this.count,
        manageId: this.cell.manage_id
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success('购买成功')
          this.$router.push('/')
        } else {
          this.$message.warning(`${res.data.code}`)
        }
      })
    }
  },
  created() {
    this.cell = this.$router.history.current.query.detail
    let remaining_amount = Number(this.cell.total) - Number(this.cell.locked_amount)
    let c = Number(this.cell.locked_amount) / (Number(this.cell.total) / 100)
    Vue.set(this.cell, 'remaining_amount', remaining_amount)
    Vue.set(this.cell, 'down_amount', c)
    Vue.set(this.cell, 'max_limit', Number(this.cell.max_limit))
    Vue.set(this.cell, 'min_limit', Number(this.cell.min_limit))
    this.detail.timeLine[0].timestamp = getLocalTime(this.cell.deadline_time)
    this.detail.timeLine[1].timestamp = getLocalTime(this.cell.bearing_time)
    this.detail.timeLine[2].timestamp = getLocalTime(this.cell.unlock_time)
    this.count = 0
  },
  watch: {
    count () {
      if (this.count) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
$main-bg: #C9A96C;
$disabled-bg: #F2F3F5;
$white-color: #fff;
$disabled-color: #B0B4B9;
@font-face {
  font-family: 'iconfont';  /* project id 1244642 */
  src: url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.eot');
  src: url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.woff') format('woff'),
  url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.bid-detail-container {
  width: 960px;
  margin: 0 auto;
  .backTop {
    padding: 16px 0;
    font-size: 14px;
    color: $main-bg;
    cursor: pointer;
    i {
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  .title-box {
    padding: 12px 0;
    border-bottom: 2px solid #ececec;
    .logo {
      width: 36px;
      height: 36px;
      vertical-align: middle;
      display: inline-block;
      background: $disabled-bg;
      margin-right: 10px;
    }
    h1,h2 {
      display: inline-block;
      color: #333;
      vertical-align: middle;
      font-size: 18px;
    }
    h1 {
      font-size: 24px;
      margin-right: 10px;
    }
  }
  .bid-detail-area {
    overflow: hidden;
    display: flex;
    & > div {
      flex: 1;
      padding: 20px;
    }
    .message-box {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 2px;
        background-color: #ececec;
        right: 0;
        top: 0;
      }
      & > div {
        h1 {
          font-size: 28px;
          font-weight: bold;
          color: $main-bg;
        }
        span {
          color: $disabled-color;
          font-size: 12px;
        }
      }
      .tips {
        display: flex;
        .rate {
          flex: 1;
        }
        .week {
          flex: 0 0 0 80px;
          width: 80px;
          h1 {
            color: #333;
          }
          span {
            text-align: center;
          }
        }
      }
      .range-box {
        width: 70%;
        margin-top: 40px;
        .range-txt {
          font-size: 13px;
          display: flex;
          margin: 12px 0;
          span {
            color: #333;
            flex: 1;
            &:last-child {
              text-align: right;
            }
          }
        }
        dl {
          padding: 12px 0;
          border-top: 2px solid #ececec;
          border-bottom: 2px solid #ececec;
          dd {
            font-size: 14px;
            display: flex;
            em, span {
              flex: 1
            }
            em {
              text-align: right;
            }
          }
        }
        .time-line {
          margin-top: 12px;
        }
      }
    }
  }
  .el-progress-bar__innerText {
    color: transparent;
  }
  .el-timeline-item__tail {
    border-color: rgba(193,165,56, .3)
  }
  .el-timeline-item__node--normal {
    width: 6px;
    height: 6px;
    border: 2px solid #fff;
    left: 0px;
  }
  .el-timeline-item {
    padding-bottom: 6px
  }
  .el-timeline-item__content {
    font-size: 12px;
  }
  .buy-area {
    float: right;
    font-size: 12px;
    span {
      color: $disabled-color;
    }
    em {
      display: inline-block;
      padding-left: 18px;
      color: $main-bg;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 9px;
        top: 15%;
        width:1px;
        background: $main-bg;
        height: 70%;
        cursor: pointer;
      }
    }
  }
  .buy-ipt {
    width: 100%;
    clear: both;
    .tip {
      font-size: 13px;
      color: $disabled-color;
      line-height: 40px;
      em {
        padding:0 12px;
        color: $main-bg;
      }
    }
    .title {
      padding: 16px 0 10px 0;
      font-size: 12px;
    }
    .ipt-inner {
      width: 100%;
      box-sizing: border-box;
      height: 48px;
      border: 1px solid $main-bg;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      overflow: hidden;
      input {
        width: 68%;
        padding: 11px 12px;
        margin: 2px;
        border-color: transparent;
        outline: none;
        float: left;
        font-size: 16px;
        text-align: center;
        -moz-appearance:textfield;
        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          appearance: none;
          margin: 0;
        }
      }
      .rage {
        float: left;;
        line-height: 48px;
        font-size: 14px;
        text-align: right;
        margin-left: 8px;
        color: $main-bg;
        em {
          display: inline-block;
          padding-left: 18px;
          color: $main-bg;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            left: 9px;
            top: 50%;
            margin-top: -6px;
            width:1px;
            background: $main-bg;
            height: 12px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .join-btn {
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: $main-bg;
    color: $white-color;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    outline: none;
    border-color: transparent;
    cursor: pointer;
    font-size: 16px;
    &:disabled {
      background: $disabled-bg;
      color: $disabled-color;
      border-color: $disabled-bg;
      cursor: not-allowed;
    }
  }
  .rule-msg {
    width: 100%;
    overflow: hidden;
    margin-top: 30px;
    dt {
      display: inline-block;
      font-size: 16px;
      padding-bottom: 4px;
      color: $main-bg;
      border-bottom: 1px solid $main-bg;
      margin-bottom: 12px;
    }
    dd {
      font-size: 14px;
      line-height: 24px;
    }
  }
}
</style>
