<template>
  <div class="bid-container">
    <div class="bid-banner">
      <div class="bid-con clearfix">
        <div class="banner-item-list">
          <img src="./assets/item-banner.png">
        </div>
        <div class="banner-item-text" v-for="(item, index) in hotList" :key="index">
          <div class="title">
            热门推荐
          </div>
          <p style="font-size: 16px;">{{ item.currency }} {{ item.product }}</p>
          <p style="font-size: 13px;">限期 {{ item.moneyDays }}天</p>
          <div class="rate">
            <h1>{{ item.annualizedReturns > 0 ? (Number(item.annualizedReturns)).toFixed(2) : 0 }}%</h1>
            <em>预计年化收益率</em>
          </div>
          <div class="btn">
            <el-button class="bid-btn"v-html="item.state === 1 ? '参与' : item.state === 2 ? '结束' : item.state === 3 ? '已售罄' : '抢购时间未到'"></el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bid-list clearfix">
      <div class="bid-list-item" v-for="(item, index) in list" :key="index" :data-id="'dataId-'+ item.id">
        <div class="week-day">
          <div class="title">
            <div class="icon"><i></i></div>
            <em>{{ item.currency }}</em>
            {{ item.product }}

          </div>
          <div class="time">
            <span>{{$t('bby_shouy1')}}:</span>
            <b>{{ item.startTime }}~{{ item.end_time }}</b>
          </div>
        </div>
        <div class="rate">
          <h1>{{ item.annualizedReturns > 0 ? (Number(item.annualizedReturns)).toFixed(2) : 0 }}%</h1>
          <span>{{$t('bby_shouy2')}}</span>
        </div>
        <div class="num">
          <p class="lock">{{$t('bby_shouy3')}} {{ item.lockedAmount }}</p>
          <p class="join">{{ item.joinAmount }} {{$t('bby_shouy5')}}</p>
        </div>
        <div class="btn">
          <el-button
            class="bid-btn"
            :disabled="item.isTrue"
            @click="detail(item)"
            v-html="item.state === 1 ? '参与' : item.state === 2 ? '结束' : item.state === 3 ? '已售罄' : '抢购时间未到'"
          >
            {{$t('bby_shouy6')}}
          </el-button>
        </div>
      </div>
    </div>
    <div class="page" style="text-align: center;margin: 30px auto">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import {getLocalTime} from './mixins'
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
        pageSize: 8
      },
      list: [],
      total: 0,
      hotList: [],
      state
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
              Vue.set(item, 'startTime', getLocalTime(item.beginTime))
              Vue.set(item, 'end_time', getLocalTime(item.endTime))
              Vue.set(item, 'isTrue', true)
              if (item.endTime > timestamp) {
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

<style lang="scss" rel="stylesheet/scss">
  $main-bg: #00CED2;
  $disabled-bg: #F2F3F5;
  $white-color: #fff;
  $disabled-color: #B0B4B9;
  .bid-container {
    min-width: 1080px;
    overflow: hidden;
    color: #333;
    width: 100%;
    font-size: 14px;
    .bid-banner {
      position: relative;
      height: 400px;
      background-size: cover;
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
            height: 40px;
            background: $main-bg;
            color: $white-color!important;
            display: block;
            box-sizing: border-box;
            font-size: 14px;
            border-color: $main-bg;
            cursor: pointer;
            outline: none;
            box-shadow: none;
            transition: all .3s;

            &:disabled {
              background: $disabled-bg!important;
              color: $disabled-color!important;
              border-color: $disabled-bg;
              cursor: not-allowed;
              &:hover {
                border-color: transparent!important;;
              }
            }
          }
        }
      }
    }
  }
</style>
