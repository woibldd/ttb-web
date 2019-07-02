<template>
  <div class="bid-container">
    <div class="bid-banner">
      <div class="bid-text"></div>
    </div>
    <div class="bid-list">
      <div class="bid-list-item" v-for="(item, index) in list" :key="index" :data-id="'dataId-'+ item.id">
        <div class="week-day">
          <div class="title">
            <div class="icon"><i></i></div>
            <em>{{ item.currency }}</em>
            {{ item.money_days }}天存币计划
          </div>
          <div class="time">
            <span>抢购周期:</span>
            <b>{{ item.startTime }}~{{ item.endTime }}</b>
          </div>
        </div>
        <div class="rate">
          <h1>{{ item.annualized_returns > 0 ? (Number(item.annualized_returns)).toFixed(2) : 0 }}%</h1>
          <span>年化收益率</span>
        </div>
        <div class="num">
          <p class="lock">已锁 {{ item.locked_amount }}</p>
          <p class="join">{{ item.join_amount }} 人参与</p>
        </div>
        <div class="btn">
          <button class="bid-btn" :disabled="item.isTrue" @click="detail(item)">参与</button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
import { getLocalTime } from './mixins'
import Vue from 'vue'
import axios from 'axios'
export default {
  data() {
    return {
      params: {
        start: 1,
        pageSize: 8
      },
      list: []
    }
  },
  methods: {
    detail(item) {
      this.$router.push({
        name: 'BidDetail',
        query: {
          detail: item
        }
      })
    },
    init (params) {
      let timestamp = Date.parse(new Date())
      axios.get('http://192.168.1.137:2016/moneyManage/findPage', {
        params: {
          ...params
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.data.data
          if (this.list.length > 0) {
            this.list.forEach((item) => {
              Vue.set(item, 'startTime', getLocalTime(item.begin_time))
              Vue.set(item, 'endTime', getLocalTime(item.end_time))
              if (item.end_time * 1000 > timestamp) {
                Vue.set(item, 'isTrue', false)
              } else {
                Vue.set(item, 'isTrue', true)
              }
            })
          }
        }
      })
    }
  },
  created () {
    this.init(this.params)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
$main-bg: #C9A96C;
$disabled-bg: #F2F3F5;
$white-color: #fff;
$disabled-color: #B0B4B9;
.bid-container {
  min-width: 1080px;
  overflow: hidden;
  color: #333;
  font-size: 14px;
  .bid-banner {
    position: relative;
    height: 540px;
    background: url("./assets/banner.png") center center no-repeat;
    .bid-text {
      width: 648px;
      height: 288px;
      background: url("./assets/font.png") center center no-repeat;
      background-clip: border-box;
      background-size: auto;
      position: absolute;
      top: 50%;
      margin-top: -144px;
      left: 50%;
      margin-left: -324px;
    }
  }
  .bid-list {
    width: 1080px;
    overflow: hidden;
    margin: 0 auto;
    .bid-list-item {
      padding: 40px 0;
      display: flex;
      border-bottom: 1px solid #ececec;
      background: #fff;
      transition: all .3s;
      justify-items: center;
      align-items: center;
      &:hover {
        transition: all .3s;
        .btn {
          .bid-btn {
            background: $main-bg;
            color: $white-color;
          }
        }
        /*background: rgba(176, 180, 185, .06);*/
      }
      span {
        color: $disabled-color;
      }
      h1 {
        color: $main-bg;
        font-weight: bold;
      }
      .week-day {
        flex: 460px 0 0 0;
        width: 460px;
        .title {
          overflow: hidden;
          margin-top: 12px;
          margin-bottom: 12px
        }
      }
      .rate,.num {
        flex: 220px 0 0 0;
        width: 220px;
      }
      .num {
        .lock {
          overflow: hidden;
          margin-top: 12px;
          margin-bottom: 12px
        }
      }
      .btn {
        flex: 1;
        .bid-btn {
          width: 100%;
          height: 40px;
          background: $white-color;
          color: $main-bg;
          display: block;
          box-sizing: border-box;
          font-size: 14px;
          border-color: $main-bg;
          cursor: pointer;
          outline: none;
          box-shadow: none;
          transition: all .3s;
          &:disabled {
            background: $disabled-bg;
            color: $disabled-color;
            border-color: $disabled-bg;
            cursor: not-allowed;
          }
        }
      }
    }
  }
}
</style>

