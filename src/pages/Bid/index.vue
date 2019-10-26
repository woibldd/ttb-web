<template>
  <div class="bid-container">
   <div class="bid-banner">
      <div class="bid-con clearfix">
        <div class="banner-item-list">
          <img :src="bannerPath">
        </div>
        <div class="banner-item-text">
            <div v-for="(item, index) in hotList" :key="index">
                 <div class="title">
                    {{$t('bby_shise9')}}
                </div>
                <p style="font-size: 16px;">{{ item.currency }}
                  <b v-if="state.locale==='zh-CN'">{{ item.product }}</b>
                  <b v-else-if="state.locale==='zh-HK'">{{ item.productCt }}</b>
                  <b v-else-if="state.locale==='en'">{{ item.productEn }}</b>
                  <b v-else-if="state.locale==='ko'">{{ item.productKn }}</b>
                </p >
                <p style="font-size: 13px;">{{$t('bby_shise10')}} {{ item.moneyDays }}{{$t('bby_shouy9')}}</p >
                <div class="rate">
                    <h1>{{ item.annualizedReturns > 0 ? (Number(item.annualizedReturns)).toFixed(2) : 0 }}%</h1>
                    <em>{{$t('bby_shouy2')}}</em>
                </div>
                <div class="btn">
                    <el-button class="bid-btn" v-html="item.state === 1 ? $t('bby_shouy6') : item.state === 2 ? $t('bby_shise3') : item.state === 3 ?  $t('bby_shise4') : $t('bby_shise5')" :disabled="item.isTrue"
                    @click="detail(item)"></el-button>
                </div>
            </div>
        </div>
      </div>
    </div>
    <!-- <div class="bid-banner">
      <img :src="img">
    </div> -->
    <div class="bid-list clearfix">
      <div class="bid-list-item" v-for="(item, index) in list" :key="index" :data-id="'dataId-'+ item.id">
        <div class="left">
            <div class="week-day">
                <div class="title">
                    <div class="icon"><i></i></div>
                    <em>{{ item.currency }}</em>
                    <b v-if="state.locale==='zh-CN'">{{ item.product }}</b>
                    <b v-else-if="state.locale==='zh-HK'">{{ item.productCt }}</b>
                    <b v-else-if="state.locale==='en'">{{ item.productEn }}</b>
                    <b v-else-if="state.locale==='ko'">{{ item.productKn }}</b>
                </div>
                <div class="time">
                    <span>{{$t('bby_shouy1')}}:</span>
                    <b>{{ item.beginTime | date('Y-M-D H:m') }}~{{ item.deadlineTime |  date('Y-M-D H:m')}}</b>
                </div>
            </div>

        </div>
        <div class="bottom">
            <div class="rate" :style={}>
                <h1>{{ item.annualizedReturns > 0 ? (Number(item.annualizedReturns)).toFixed(2) : 0 }}%</h1>
                <span>{{$t('bby_shouy2')}}</span>
            </div>
            <div class="right">
                <div class="num">
                    <p class="lock">{{$t('bby_shouy3')}} {{ item.lockedAmount }}</p>
                    <p class="join">{{ item.joinAmount }} {{$t('bby_shouy5')}}</p>
                </div>
                <div class="btn">
                    <el-button
                        class="bid-btn"
                        :disabled="item.isTrue"
                        @click="detail(item)"
                        v-html="item.state === 1 ?  $t('bby_shouy6') : item.state === 2 ? $t('bby_shise3') : item.state === 3 ?  $t('bby_shise4') : $t('bby_shise5')"
                    >
                    </el-button>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div class="page" style="text-align: center;margin: 30px auto" v-if="list.length > 0">
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
        pageSize: 8
      },
      list: [],
      total: 0,
      hotList: [],
      state,
      //img: require('./assets/banner-zh-CN.png')
    }
  },
  computed: {
    bannerPath () {
      let path = require(`./assets/item-banner-${this.state.locale}.png`)
      return path
    },

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

<style lang="scss" rel="stylesheet/scss">
 $main-bg: #00CED2;
$disabled-bg: #F2F3F5;
$white-color: #fff;
$disabled-color: #B0B4B9;
.bid-container {
  min-width: 1200px;
  overflow: hidden;
  color: #333;
  width: 100%;
  font-size: 14px;
  background: url("./assets/bj.png");
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 122%;
  padding: 20px 0;

  .bid-banner {
    position: relative;
    height: 400px;

    .bid-con {
      width: 1200px;
      margin: 0 auto 20px;
      position: relative;

      .banner-item-list {
        width: 790px;
        height: 400px;
        float: left;

        img {
          display: block;
          zoom: 1
        }
      }

      .banner-item-text {
        width: 380px;
        height: 400px;
        float: left;
        margin-left: 20px;
        color: #fff;
        text-align: center;
        background: linear-gradient(-48deg, rgba(65, 132, 254, 1), rgba(153, 77, 246, 1));
        .title {
          font-size: 20px;
          padding: 40px 0 20px 0;
        }
        p {
          line-height: 30px;
        }
        h1 {
          font-size: 54px;
        }
        .rate {
          margin: 30px;
        }
        .btn {
          .el-button {
            width: 80%;
            border-radius: 0;
            background: transparent;
            color: #fff
          }
        }
      }
    }
  }

  .bid-list {
    width: 1200px;
    overflow: hidden;
    margin: -40px auto 0;
    .bid-list-item {
      padding: 20px 0;
      float: left;
      width:390px;
      box-sizing: border-box;
      border: 1px solid #ececec;
      margin-top: 20px;
      transition: all .3s;
      background: #fff url("./assets/yuan.png") no-repeat;
      background-position: 108% 20px;
      margin-right: 10px;
      position: relative;
      overflow: hidden;
      &::after {
          content: '';
          width: 80px;
          height: 80px;
          position: absolute;
          right: -30px;
          bottom: -30px;
          background:rgba(91, 203, 207, .1);
          border-radius: 50%;
          z-index: 1;
      }
    //   span {
    //     color: $disabled-color;
    //   }

    //   h1 {
    //     color: $main-bg;
    //     font-weight: bold;
    //     font-size: 22px;
    //     margin-bottom: 10px;
    //   }

      .week-day {
        padding: 0 20px;
        color: #333;
         position: relative;
        z-index: 2;
        .title {
          overflow: hidden;
          font-size: 18px;
        }
        .time {
            font-size: 12px;
            span {
                color: #B0B4B9
            }
        }
      }
      .bottom {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          align-content: center;
          align-items: center;
          margin-top: 20px;
          .rate {
              width: 36%;
              text-align: center;
              flex: 36% 0 0 0;
              h1 {
                  font-size: 28px;
                //   margin-bottom: 8px;
                  color: $main-bg;
                  font-weight: bold;
              }
              span {
                  color: $disabled-color;
                  font-size: 12px;
              }
          }
          .right{
              flex: 1;
              margin-right: 20px;
          }
      }
    //   .rate, .num {
    //     flex: 220px 0 0 0;
    //     width: 220px;
    //   }

      .num {
          display: flex;
          font-size: 12px;
          text-align: right;
        p {
            flex: 1;
        }
        .lock {
            text-align: left;
            margin-bottom: 12px
        }
      }
      .zhCn {
          width: 48%;
          flex: 48% 0 0 0;
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
      }
    }
  }
}
</style>
