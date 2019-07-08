<template>
  <div class="bid-detail-container">
    <div class="backTop" @click="backTop">
      <i class="iconfont">&#xe64e;</i>
      <span>{{$t('bby_shouy7')}}</span>
    </div>
    <div class="title-box">
      <div class="logo"></div>
      <h1>{{cell.currency}}</h1>
      <h2>{{cell.product}}</h2>
      <em class="jl" @click="jl">币盈盈记录</em>
    </div>
    <div class="bid-detail-area">
      <div class="message-box">
        <div class="tips">
          <div class="rate">
            <h1>{{ cell.annualizedReturns > 0 ? (Number(cell.annualizedReturns)).toFixed(2) : 0 }}%</h1>
            <span>{{$t('bby_shouy8')}}</span>
          </div>
          <div class="week">
            <h1>{{ cell.moneyDays }}{{$t('bby_shouy9')}}</h1>
            <span>{{$t('bby_shouy10')}}</span>
          </div>
        </div>
        <div class="range-box">
          <div class="range">
            <el-progress :text-inside="true" :stroke-width="12" :percentage="cell.down_amount" status="warning"/>
          </div>
          <div class="range-txt">
            <span class="lock">{{$t('bby_shouy3')}} {{cell.lockedAmount}}</span>
            <span class="join">{{ cell.joinAmount }} {{$t('bby_shouy5')}}</span>
          </div>
          <dl>
            <dd>
              <span>{{$t('bby_shouy11')}}</span>
              <em>{{cell.total}} {{cell.currency}}</em>
            </dd>
            <dd>
              <span>{{$t('bby_shouy12')}}</span>
              <em>{{ cell.remaining_amount }} {{cell.currency}}</em>
            </dd>
            <dd>
              <span>{{$t('bby_shouy13')}}</span>
              <em>{{ cell.maxLimit }} {{cell.currency}}</em>
            </dd>
            <dd>
              <span>{{$t('bby_shouy14')}}</span>
              <em>{{ cell.minLimit }} {{cell.currency}}</em>
            </dd>
          </dl>
          <div class="time-line">
            <el-timeline>
              <el-timeline-item
                color="#C9A96C">
                {{$t('bby_shouy28')}}
                <span style="padding-left: 10px;color: #333">{{ detail.timeLine[0].timestamp }}</span>
              </el-timeline-item>
              <el-timeline-item
                color="#C9A96C">
                 {{$t('bby_shouy29')}}
                <span style="padding-left: 10px;color: #333">{{ detail.timeLine[1].timestamp }}</span>
              </el-timeline-item>
              <el-timeline-item
                color="#C9A96C">
                {{$t('bby_shouy30')}}
                <span style="padding-left: 10px;color: #333">{{ detail.timeLine[2].timestamp }}</span>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>

      <div class="ipt">
        <div class="buy-area">
          <span>{{$t('account_balance')}} {{accountBalance}} {{cell.currency}}</span>
          <em class="pay">
            <router-link to="/fund/deposit" tag="a">{{$t('bby_shouy15')}}</router-link>
            <!--<a href="http://127.0.0.1:8080/fund/deposit">{{$t('bby_shouy15')}}</a></em>-->
          </em>
          <em class="buy">
            <router-link to="/trading/BTC_USDT" tag="a">{{$t('bby_shouy16')}}</router-link>
            <!--<a href="http://127.0.0.1:8080/fund/deposit">{{$t('bby_shouy16')}}</a>-->
          </em>
        </div>
        <div class="buy-ipt">
          <div class="title">{{$t('bby_shouy17')}}</div>
          <div class="ipt-inner">
            <!--<input type="number" :placeholder="$t('bby_shouy19')" @input="inputKeyBoard" />-->
            <!-- <el-input-number v-model.number="count" :min="Number(cell.minLimit)" @change="inputKeyBoard"
                             :max="Number(cell.maxLimit)" label="请输入存币数量"  :controls="controls"></el-input-number> -->
                             <number-input
                    class="number-input"
                    v-model="count"
                    :scale="point"
                    placeholder="请输入存币数量"
                />
            <div class="rage">
              <span class="cell">{{cell.currency}}</span>
              <em @click="allMoney">{{$t('allin')}}</em>
            </div>
          </div>
          <div class="tip">{{$t('bby_shouy18')}}<em>{{ money }}</em>{{cell.currency}}</div>
        </div>
        <button class="join-btn" :disabled="disabled" @click="submit">
          {{$t('bby_shouy20')}}
        </button>
      </div>
    </div>
    <div class="rule-msg">
      <dl>
        <dt>{{$t('bby_shouy21')}}<i class="iconfont">&#xe62e;</i></dt>
        <dd>{{$t('bby_shouy22')}}</dd>
        <dd>{{$t('bby_shouy23')}}</dd>
        <dd>{{$t('bby_shouy24')}}</dd>
        <dd>{{$t('bby_shouy25')}}</dd>
        <dd>{{$t('bby_shouy26')}}</dd>
        <!-- <dd>{{$t('bby_shouy27')}}</dd> -->
      </dl>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import {getLocalTime} from './mixins'
import Vue from 'vue'
import qs from 'qs'
import service from '@/modules/service'
import { envApi } from '../../modules/request'

export default {
  data () {
    return {
      count: 0,
      controls: false,
      // 账户余额
      accountBalance: 10000,
      // 预计收益
      money: 0,
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
          content: this.$t('bby_shouy28'),
          timestamp: '2018-04-15',
          color: '#C9A96C'
        }, {
          content: this.$t('bby_shouy29'),
          timestamp: '2018-04-13',
          color: '#C9A96C'
        }, {
          content: this.$t('bby_shouy30'),
          timestamp: '2018-04-11',
          color: '#C9A96C'
        }]
      },
      disabled: true,
      cell: {},
      point: 0
    }
  },
  mounted() {

  },
methods: {
    //   manageResopetate
    getAccountWalletList () {
      this.accountBalance  = 0
      service.getAccountWalletList().then(res => {
        if (res.code === 0) {
          res.data.forEach((item) => {
            if (item.currency === this.cell.currency) {
              console.log(item.currency)
              console.log(this.cell.currency)
              this.accountBalance = Number(item.available)
            }
          })
        }
      })
    },
    backTop () {
      this.$router.push('/snowball')
    },
    inputKeyBoard (e) {
      if (e > this.accountBalance) {
        this.count = this.accountBalance
      }
    },
    allMoney () {
    //   if (this.accountBalance < Number(this.cell.minLimit)) {
    //     // this.$message.warning('余额不足，请充值')
    //      this.$message({
    //               type: 'warning',
    //                message: this.$t('bby_shouy32')
    //             })
    //   } else {
    //       if(this.accountBalance >= this.cell.maxLimit) {
    //           this.count = this.cell.maxLimit
    //       }
    //   }
      this.disabled = false
      let towTotal = Number(this.cell.maxLimit) -Number(this.cell.lockedAmount)
      if (towTotal > 0) {
         if (this.accountBalance < towTotal) {
             this.$message.warning(`${this.$t('bby_shouy32')}`)
             this.disabled = true
         } else {
            this.count = towTotal
            this.disabled = false
         }
      } else {
           this.$message.warning(`可用数量不足`)
           this.disabled = true
      }
    },
    jl() {
        this.$router.push({
            name: 'bidtable'
        })
    },
    submit () {
      if (this.accountBalance !== 0) {
        service.manageRecord(qs.stringify({
          site: this.cell.site,
          currency: this.cell.currency,
          amount: this.count,
          manageId: this.cell.manageId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }).then((res) => {
          if (res.code === 0) {
            // this.$message.success('购买成功')
             this.$message({
                  type: 'success',
                   message: this.$t('bby_shouy31')
                })
            this.$router.push({
              path: '/bid'
            })
          } else {
            this.$message.warning(`${res.message}`)
          }
        })
      } else if (this.accountBalance < this.account) {
        this.$message.warning(this.$t('bby_shouy32'))
      } else {
        this.$message.warning(this.$t('bby_shouy32'))
      }
    }
  },
  mounted() {
       this.timeLine = [{
        content: this.$t('bby_shouy28'),
        timestamp: '2018-04-15',
        color: '#C9A96C'
    }, {
        content: this.$t('bby_shouy29'),
        timestamp: '2018-04-13',
        color: '#C9A96C'
    }, {
        content: this.$t('bby_shouy30'),
        timestamp: '2018-04-11',
        color: '#C9A96C'
    }]
  },
  created () {
    this.cell = JSON.parse(window.localStorage.getItem('detail'))
    const remaining_amount = Number(this.cell.total) - Number(this.cell.lockedAmount)
    let c = Number(this.cell.lockedAmount) / (Number(this.cell.total) / 100)
    if (this.cell.lockedAmount.indexOf('.') > 0) {
        let minArr = this.cell.lockedAmount.split('.')
      Vue.set(this.cell, 'remaining_amount', remaining_amount.toFixed(minArr[1].length))
    } else {
      Vue.set(this.cell, 'remaining_amount', remaining_amount)
    }
    Vue.set(this.cell, 'down_amount', c)
    Vue.set(this.cell, 'max_limit', Number(this.cell.maxLimit))
    Vue.set(this.cell, 'min_limit', Number(this.cell.minLimit))
    this.detail.timeLine[0].timestamp = getLocalTime(this.cell.deadlineTime)
    this.detail.timeLine[1].timestamp = getLocalTime(this.cell.bearingTime)
    this.detail.timeLine[2].timestamp = getLocalTime(this.cell.unlockTime)
    this.count = 0
    this.getAccountWalletList()
    if(this.cell.minLimit.indexOf('.') > 0) {
         let minArr = this.cell.minLimit.split('.')
         this.point = minArr[1].length
         let towTotal = Number(this.cell.maxLimit) -Number(this.cell.lockedAmount)
         if (towTotal > 0) {
            if (this.accountBalance < towTotal) {
                this.disabled = true
                this.money = 0
                this.count = 0
            } else {
                this.money =  this.$big(this.cell.moneyDays).div(365).times(this.cell.annualizedReturns).div(100).times(this.count).round(minArr[1].length + 2, 0).toString()
                this.disabled = false
            }
        } else {
            this.disabled = true
            this.money = 0
        }
    } else {
        let towTotal = Number(this.cell.maxLimit) - Number(this.cell.lockedAmount)
         if (towTotal > 0) {
            if (this.accountBalance < towTotal) {
                this.disabled = true
                this.money = 0
                this.count = 0
            } else {
                this.money = this.$big(this.cell.annualizedReturns).div(365).times(this.cell.moneyDays).times(this.count).div(100).round(2, 0).toString()
                this.disabled = false
            }
        } else {
            this.disabled = true
            this.money = 0
        }
    }
    let timestamp = Date.parse(new Date())
    if (this.cell.state === 1) {
        this.disabled = false
    } else {
         this.disabled = true
    }
  },
  watch: {
    count () {
    if (this.cell.state === 1) {
        if (this.count) {
            if(this.cell.minLimit.indexOf('.') > 0) {
                let minArr = this.cell.minLimit.split('.')
                
                this.point = minArr[1].length
                let towTotal = Number(this.cell.maxLimit) -Number(this.cell.lockedAmount)
                if (towTotal > 0) {
                    if (this.accountBalance < towTotal) {
                        this.disabled = true
                        this.money = 0
                        this.count = 0
                    } else {
                        this.money =  this.$big(this.cell.moneyDays).div(365).times(this.cell.annualizedReturns).div(100).times(this.count).round(minArr[1].length + 2, 0).toString()
                        this.disabled = false
                    }
                } else {
                    this.disabled = true
                    this.money = 0
                }
            } else {
                if (towTotal > 0) {
                    if (this.accountBalance < towTotal) {
                        this.disabled = true
                        this.money = 0
                        this.count = 0
                    } else {
                        this.money = this.$big(this.cell.annualizedReturns).div(365).times(this.cell.moneyDays).times(this.count).div(100).round(2, 0).toString()
                        this.disabled = false
                    }
                } else {
                    this.disabled = true
                    this.money = 0
                }
            }
        } else {
            this.disabled = true
        }
    } else {
        this.disabled = true
    }
  }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $main-bg: #00CED2;
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
      position: relative;
      width: 100%;
      .jl {
        color: $main-bg;
        position: absolute;
        right: 0;
        top: 24px;
        cursor: pointer;
        display: block;
    }
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
    .el-progress.is-warning .el-progress-bar__inner {
      background: $main-bg;
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
        position: relative;
        input {
          width: 100%;
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
          position: absolute;
          right: 20px;
          top: 0;
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
