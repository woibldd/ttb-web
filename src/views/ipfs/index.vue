<template>
  <div class="ipfs-container">
    <div class="banner" :class="['banner', state.locale ]" >
      <!-- <h1>filecoin算力</h1>
      <h2>火热进行中</h2> -->
    </div>
    <div class="content"
      v-loading="loading">
      <div class="list">
        <div class="item clearfix"
          v-for="item in dataList"
          :key="item.id">
          <div class="img fl"> 
            <img :src="item.productImg" alt="">
          </div>
          <div class="describe fl">
            <p>  
              <b class="title" v-if="state.locale==='zh-CN'"> {{item.product}} </b>
              <b class="title" v-else-if="state.locale==='zh-HK'"> {{item.productCt}} </b>
              <b class="title" v-else-if="state.locale==='ko'"> {{item.productKn}} </b>
              <b class="title" v-else> {{item.productEn}} </b>
              <label class="ml-20" :style="{color: stateColor[item.state] }">{{ $tR(orderState[item.state])}}</label>
            </p>
            <p class="between">
              <i>{{$tR('start_and_end')}}</i>
              <b>{{`${ utils.dateFormatter(item.beginTime, 'Y-M-D H:m')}~${utils.dateFormatter(item.endTime, 'Y-M-D H:m')}`}}</b>
            </p>
          </div>
          <div class="progress fl">
            <div class="between">
              <i>{{$tR('schedule')}}</i> 
              <i>{{$tR('buy_calc')}}</i>
            </div>
            <el-progress  class="mt-5 mb-5" :percentage="$big(item.lockedAmount || 0).times(100).div(item.total || 1).round(2)"  :show-text="false"></el-progress>
            <div class="between">
              <span>{{$big(item.lockedAmount || 0).times(100).div(item.total || 1).round(2)}}%</span>
              <span>{{item.lockedAmount}}/{{item.total}}T</span>
            </div>
          </div>
          <div class="option fl">
            <el-button :type="item.state === 1 ? 'primary' : 'info'" :disabled="item.total===item.lockedAmount"  @click="handleClick(item.manageId)">{{ $tR('buy_now') }}</el-button>
          </div> 
        </div>
      </div>
      <div class="page">
        <el-pagination
          background 
          layout="prev, pager, next"
          :hide-on-single-page="true"
          :page-size="pageConfig.size"
          :current-page="pageConfig.page"
          @current-change="handleCurrentChange"
          :total="pageConfig.total">
        </el-pagination>
      </div>
      </div>
  </div>
</template>

<script>
import api from '@/modules/api/ipfs' 
import { state, local } from '@/modules/store'
import utils from '@/modules/utils'
import mixin from '@/mixins/index'
export default {
  name: 'mining_power',
  data() {
    return {
      state,
      utils,
      loading: true,
      dataList: [],
      orderState: {
        0: 'not_start',
        1: 'processing',
        2: 'pending',
        3: 'in_effect',
        4: 'ended',
        5: 'expired'
      },
      stateColor: {
        0: '#C7C7C7', 
        1: '#FB9246',
        2: '#FF5454',
        3: '#01CED1',
        4: '#C7C7C7', 
      },
      pageConfig: {
        page: 1,
        size: 5,
        total: 0
      }
    }
  },
  mixins: [mixin],
  methods: {
    handleClick(e) {
      this.$router.push({
        name: 'ipfs-detail',
        query: {
          manage: e
        }
      })
    },
    handleCurrentChange(e) { 
      this.pageConfig.page = e
      this.getDataList()
    },
    getDataList() {
      this.loading = true
      const params = {
        start: this.pageConfig.page,
        pageSize: this.pageConfig.size
      }
      api.getPowerFindPage(params).then(res => {
        this.loading = false
        if (res && !res.code) {
          this.dataList = res.data.data
          this.pageConfig.total = res.data.total
        }
      })
    }, 
  },
  created() {
    this.getDataList()
  }
}
</script>

<style lang="scss">
  .ipfs-container {
    .banner {
      height: 430px;
      background: url('./assets/banner.png') center center;
      &.zh-CN {
        background: url('./assets/banner-zh-CN.png') center center;
      }
      &.zh-HK {
        background: url('./assets/banner-zh-HK.png') center center; 
      }
      &.ko {
        background: url('./assets/banner-ko.png') center center; 
      }
      &.en {
        background: url('./assets/banner-en.png') center center; 
      }
      h1 {
        font-size: 120px;
        font-family: FZZhengHeiS-B-GB Regular, FZZhengHeiS-B-GB Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #ffffff;
        line-height: 200px;
        letter-spacing: 9px;
        text-shadow: 5px 15px 6px 8px rgba(3,6,39,0.78);  
      }
      h2 {
        font-size: 60px;
        font-family: FZZhengHeiS-B-GB Regular, FZZhengHeiS-B-GB Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        line-height: 190px;
        letter-spacing: 12px;
      }

    }
    .content { 
      min-height: 900px;
      background-color: #F9F9F9; 
      .between { 
        display: flex;
        justify-content: space-between; 
      }
      .list {
        padding: 32px;
        width: 1200px;
        margin: 0 auto;
        .item {
          padding:29px;
          margin-top: 21px;
          background: #ffffff;
          box-shadow: 0px 0px 16px 0px rgba(235,235,235,0.78); 
          .img { 
            margin-right: 22px;
            vertical-align: bottom;
            img {
              height: 82px;
              width: 82px;
            }
          }
          .describe {
            margin-right: 120px;
            width: 365px;
            p { 
              font-size: 12px;
              b {
                font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular; 
                color: #242424;
                &.title { 
                  font-size: 20px;
                }
              }
              label {
                padding: 4px 11px;
                line-height: 24px; 
                vertical-align: top;
                border: 2px solid ;
                border-radius: 16px 0px 16px 0px; 
              }
              &:nth-child(2) {
                margin-top: 39px;
              }
              i {
                color: #999999;
              }
            }
          }
          .progress {
            margin-right: 90px;
            padding-top: 20px;
            .between {
              display: flex;
              justify-content: space-between;
              i {
                color: #999999;
              }
            }
            .el-progress {
              width: 319px;
            }
          }
          .option {
            height: 82px;
            line-height: 82px;
            .el-button {
              // padding: 13px 41px;
              width: 140px;
            }
          }
        }
      }
      .page {
        padding: 50px 0 80px;
        text-align: center;
      }
    }

    .el-button--info:focus, .el-button--info:hover {
        background: #a6a9ad;
        border-color: #a6a9ad;
        color: #FFF;
    }
    .el-progress-bar__inner {
      background-color: $primary;
    }
  }
</style>