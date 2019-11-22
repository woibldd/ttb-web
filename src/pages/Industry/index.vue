<template>
  <div class="industry">
    <div class="industry-banner"></div>
    <div class="con">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item>行业资讯</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="new-container">
        <div class=""></div>
        <div class="inner">
          <div class="new-list" v-for="(item, index) in list" :key="index">
            <div class="icon" :class="{active: item.collect === 1}" @click="collectHadnle(item)"></div>
            <div class="text" @click="detialHandle(item)">
              <div class="top">
                <h1> {{ item.title }} </h1>
                <p> {{ item.summary }} </p>
              </div>
              <div class="time">
                <div class="from">
                  <p>来源: <span> {{ item.source }} </span></p>
                </div>
                <div class="time">
                  <p>发布时间: <span> {{ item.release_time }} </span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
            style="text-align: center;margin-top: 20px;"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
      <div class="quotation">
        <div class="btn-1" @click="collectHandle">
          我的收藏
        </div>
        <div class="inner">
          <div class="title">
            <h1>最新行情</h1>
            <span>更多</span>
          </div>
          <div class="list-con">
            <div class="list-table">
              <ul class="tab">
                <li class="dt">交易对</li>
                <li class="dt">价格</li>
                <li class="nt">24H涨跌幅</li>
              </ul>
              <ul class="tab" v-for="item in 5" :key="item">
                <li>BTC/USDT</li>
                <li>
                  8210.12 USDT
                  ≈￥56210.12
                </li>
                <li>
                  <div class="btn">
                    2.88%
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { activity, collectActivity } from '../../api/user'
import {state} from '@/modules/store'
export default {
  data() {
    return {
      loading: true,
      list: [],
      total: 0,
      params: {
        page: 1,
        size: 20,
        userId: ''
      },
      currentPage: 1
    }
  },
  computed: {
    userId() {
      let id = ''
      if (state.userInfo) {
        id = state.userInfo.id
      } else {
        id = ''
      }
      return id
    }
  },
  methods: {
    handleSizeChange(val) {
      this.params.size = val
      this.getGoodLists()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getGoodLists()
    },
    detialHandle(item) {
      this.$router.push({
        path: `/industryDetail`,
        query: {
          id: item.id
        }
      })
    },
    collectHandle() {
      if (this.userId) {
        this.$router.push('/collect')
      } else {
        this.$router.push('/user/login')
      }
    },
    collectHadnle(item) {
      const collect = item.collect === 0 ? 1 : 0
      if (this.userId) {
        collectActivity({
          user_id: this.userId,
          id: item.id,
          collect: collect
        }).then((res) => {
          if (res.code === 200) {
            this.getGoodLists()
          }
        })
      } else {
        this.$router.push('/user/login')
      }
    },
    getGoodLists() {
      this.list = []
      this.params.userId = this.userId
      activity(this.params).then((res) => {
        if (res.code === 200) {
          this.list = res.data.data
          this.total = res.data.total
          window.localStorage.setItem('activityData', JSON.stringify(this.list))
        } else {
          window.localStorage.setItem('activityData', [])
        }
      })
    }
  },
  created() {
    this.getGoodLists()
    console.log(state)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.industry {
  margin-bottom: 30px;
  &-banner {
    height: 400px;
    background: #00badb;
    background: url('./img/new.png') center center no-repeat;
  }
  .con {
    width: 1200px;
    margin: 30px auto;
    .bread {
      margin-bottom: 30px;
    }
    .new-container {
      width: 790px;
      float: left;
      .inner {
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 15px 0px rgba(209,209,209,1);
        box-sizing: border-box;
        overflow: hidden;
        .new-list {
          margin: 20px;
          overflow: hidden;
          border-bottom: 1px solid #ececec;
          display: flex;
          .icon {
            flex: 50px 0 0 0;
            width: 40px;
            margin-right: 10px;
            cursor: pointer;
            height: 40px;
            background: url('./img/icon.png') center center no-repeat;
          }
          .active {
            background: url('./img/active.png') center center no-repeat;
          }
          .text {
            flex: 1
          }
          .time {
            .from {
              margin-right: 30px;
              color: #959595;
            }
            float: right;
            overflow: hidden;
            font-size: 14px;
            & > div {
              padding: 20px 0;
              float: left;
            }
          }
          h1 {
            font-size: 20px;
            color: #030303;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-weight: 500;
            margin-bottom: 10px;
          }
          p {
            font-size: 16px;
            color: #595959;
            line-height: 1.2;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .quotation {
      width: 356px;
      float: left;
      margin-left: 30px;
      color: #525252;
      .btn-1 {
        width:156px;
        height:52px;
        text-align: center;
        cursor: pointer;
        line-height: 52px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(1, 206, 209, 1);
        box-shadow:0px 1px 15px 0px rgba(209,209,209,1);
        border-radius:4px;
        float: right;
        margin-bottom: 20px;
        overflow: hidden;
        color: #01CED1;
      }
      .inner {
        width: 332px;
        padding: 12px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 15px 0px rgba(209,209,209,1);
        overflow: hidden;
        .tab {
          display: flex;
          li {
            flex: 1;
            font-size: 14px;
            padding-bottom: 30px;
          }
          .dt {
            flex: 1;
          }
          .nt {
            flex: 0 0 0 64px;
            width: 64px;
            text-align: center;
          }
          .btn {
            width: 60px;
            height: 30px;
            text-align: center;
            background: #4BC384;
            color: #fff;
            line-height: 30px;
            font-size: 14px;
            margin: 0 auto;
          }
        }
        .title {
          font-size: 14px;
          color: #030303;
          display: flex;
          padding-bottom: 12px;
          border-bottom: 1px solid #DBDBDB;
          margin-bottom: 30px;
          h1 {
            flex: 1;
            font-size: 18px;
            padding-left: 8px;
            border-left: 4px solid rgba(1,206,209,1);
          }
          span {
            flex: 1;
            color: #525252;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
