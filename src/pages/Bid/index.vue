<template>
  <div class="bid-container">
    <div class="bid-banner">
      <div class="bid-text">
        <img
          v-if="state.locale === 'zh-CN'"
          src="./assets/font.png"
          class="swiper-image">
        <img
          v-else-if="state.locale === 'en'"
          src="./assets/font_en.png"
          class="swiper-image">
        <img
          v-else-if="state.locale === 'zh-HK'"
          src="./assets/font_zh-HK.png"
          class="swiper-image">
        <img
          v-else-if="state.locale === 'ko'"
          src="./assets/font_ko.png"
          class="swiper-image">
      </div>
    </div>
    <div class="bid-list">
      <div
        class="bid-list-item"
        v-for="(item, index) in list"
        :key="index"
        :data-id="'dataId-'+ item.id">
        <div class="week-day">
          <a
            href="javascript:;"
            @click="detail(item)"
            class="title">
            <div class="icon"><i/></div>
            <em>{{ item.currency }}</em>
            <!-- {{ item.moneyDays }}{{$t('bby_shouy4')}} -->
          </a>
          <b v-if="state.locale==='zh-CN'">{{ item.product }}</b>
          <b v-else-if="state.locale==='zh-HK'">{{ item.productCt }}</b>
          <b v-else-if="state.locale==='en'">{{ item.productEn }}</b>
          <b v-else-if="state.locale==='ko'">{{ item.productKn }}</b>
          <div class="time">
            <span>{{ $t('bby_shouy1') }}:</span>
            <b>{{ item.beginTime | date('Y-M-D H:m') }}~{{ item.deadlineTime | date('Y-M-D H:m') }}</b>
          </div>
        </div>
        <div class="rate">
          <h1>{{ item.annualizedReturns > 0 ? (Number(item.annualizedReturns)).toFixed(2) : 0 }}%</h1>
          <span>{{ $t('bby_shouy2') }}</span>
        </div>
        <div class="num">
          <p class="lock">{{ $t('bby_shouy3') }} {{ item.lockedAmount }}</p>
          <p class="join">{{ item.joinAmount }} {{ $t('bby_shouy5') }}</p>
        </div>
        <div class="btn">
          <el-button
            class="bid-btn"
            :class="{active: item.isTrue}"
            @click="detail(item)"
            v-html="item.state === 1 ? $t('bby_shouy6') : item.state === 2 ? $t('bby_shise3') : item.state === 3 ? $t('bby_shise4') : $t('bby_shise5')"
          />
        </div>
      </div>
    </div>
    <div
      class="page"
      style="text-align: center;margin: 30px auto">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
import {getLocalTime1} from './mixins'
import Vue from 'vue'
import axios from 'axios'
import {state} from '../../modules/store'
import service from '@/modules/service'
// import { envApi } from '../../modules/request'
export default {
  data () {
    return {
      params: {
        start: 1,
        pageSize: 9
      },
      list: [],
      total: 0,
      hotList: [],
      state
      // img: require('./assets/banner-zh-CN.png')
    }
  },
  methods: {
    handleCurrentChange (e) {
      this.params.start = e
      this.init(this.params)
    },
    detail (item) {
      this.$router.push({
        name: 'BidDetail',
        query: {
          detail: item
        }
      })
      window.localStorage.setItem('detail', JSON.stringify(item))
    },
    init (params) {
      this.hotList = []
      let timestamp = Date.parse(new Date())
      console.log(timestamp)
      service.findPage({
        ...params
      }).then((res) => {
        if (res.code === 0) {
          this.list = res.data.data
          this.total = res.data.total
          if (this.list.length > 0) {
            this.list.forEach((item) => {
              // Vue.set(item, 'startTime', getLocalTime1(item.beginTime))
              // Vue.set(item, 'end_time', getLocalTime1(item.endTime))
              Vue.set(item, 'isTrue', true)
              if (item.deadlineTime > timestamp) {
                Vue.set(item, 'isTrue', false)
                if (item.beginTime > timestamp) {
                  Vue.set(item, 'isTrue', true)
                }
              }
            })
          }
          this.hotList.push(this.list[0])
        }
      })
    }
  },
  created () {
    this.init(this.params)
    // this.img = require('./assets/banner-' + state.locale + '.png')
  },
  mounted () {
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
    height: 400px;
    background: url("./assets/banner.png") top center no-repeat;
    background-size: cover;
    .bid-text {
      width: 100%;
      height: auto;
      // background: url("./assets/font.png") center center no-repeat;
      background-clip: border-box;
      background-size: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
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
        font-size: 22px;
        margin-bottom: 10px;
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
          height: 36px;
          background: $main-bg;
          color: $white-color !important;
          display: block;
          box-sizing: border-box;
          font-size: 14px;
          border-color: $main-bg;
          cursor: pointer;
          outline: none;
          box-shadow: none;
          transition: all .3s;

          &:disabled {
            background: $disabled-bg !important;
            color: $disabled-color !important;
            border-color: $disabled-bg;
            cursor: not-allowed;

            &:hover {
              border-color: transparent !important;;

            }
          }
        }
        .active {
          background: $disabled-bg !important;
          color: $disabled-color !important;
          border-color: $disabled-bg;
        }
      }
    }
  }
}
</style>
