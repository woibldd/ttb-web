<template>
  <div class="industry">
    <div class="industry-banner"></div>
    <div class="con clearfix">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item>行业资讯</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="new-container">
        <div class=""></div>
        <div class="inner ">
          <template v-if="list.length > 0">
            <div class="new-list" v-for="(item, index) in list" :key="index">
              <div class="icon" :class="{active: item.collect === 1}" @click="collectHadnle(item)">
                <i class="overseas-icon" v-if="item.collect === 1">&#xe62d;</i>
                 <i class="overseas-icon" v-else>&#xe62c;</i>
              </div>
              <div class="text" @click="detialHandle(item)">
                <div class="top">
                  <h1> {{ item.title }} </h1>
                  <p> {{ item.summary }} </p >
                </div>
                <div class="time">
                  <div class="from">
                    <p>来源: <span> {{ item.source }} </span></p >
                  </div>
                  <div class="time">
                    <p>发布时间: <span style="padding-left: 10px;"> {{ item.release_time }} </span></p >
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-data">
              <img src="./img/no.png" alt="" class="no">
              <p>暂无文章</p >
            </div>
          </template>
        </div>
        <el-pagination
            style="text-align: center;margin-top: 20px;"
            background
            v-if="list.length > 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="params.size"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
      <div class="quotation">
        <div class="btn-1" @click="collectHandle">
          我的收藏
        </div>
        <div class="inner" 
          :class="{fixtool: whether === 1, fixbottom : whether === 2 }">
          <div class="title">
            <h1>最新行情</h1>
            <span @click="moreHandle">更多 ></span>
          </div>
          <market />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { activity, collectActivity } from '../../api/user'
import {state} from '@/modules/store'
import market from "./market";
export default {
  components: {
    market
  },
  data() {
    return {
      loading: true,
      list: [],
      total: 0,

      params: {
        page: 1,
        size: 6,
        userId: ''
      },
      currentPage: 1,
      whether: 0
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
    moreHandle() {
      this.$router.push('/')
    },
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
          id: item.id,
          rank: item.rank
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
            item.collect = collect
            // this.getGoodLists()
          }
        })
      } else {
        this.$router.push('/user/login')
      }
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D
    },
    getGoodLists() {
      this.list = []
      this.params.userId = this.userId
      activity(this.params).then((res) => {
        if (res.code === 200) {
          this.list = res.data.data
          this.list.forEach((item) => {
            item.release_time = this.timestampToTime(item.release_time)
          })
          this.total = res.data.total
          window.localStorage.setItem('activityData', JSON.stringify(this.list))
        } else {
          window.localStorage.setItem('activityData', [])
        }
      })
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; 
      console.log(scrollTop)
      if(scrollTop>500){
        if(document.documentElement.scrollHeight - scrollTop < 1085) {
          this.whether = 2;
        } else { 
          this.whether = 1;
        }
      }else{
        this.whether = 0;
      } 
    }
  },
  created() {
    this.getGoodLists()
  },
  mounted() { 
    window.addEventListener("scroll", this.handleScroll);
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .no-data {
    width:100%;
    text-align: center;
    .no {
      margin: 120px auto 10px
    }
    p {
      font-size: 14px;
      margin-bottom: 120px;
      vertical-align: middle;
      img {
        height: 30px;
        zoom: 1;
        vertical-align: middle;
        color: #777777;
      }
    }
  }
.industry {
  overflow: hidden;
  margin-bottom: 30px;
  clear: both;
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
          cursor: pointer;
          .icon {
            flex: 50px 0 0 0;
            width: 40px;
            margin-right: 10px;
            cursor: pointer;
            height: 40px;
            background: #dbdbdb;
            border-radius: 4px;
            line-height: 40px;
            text-align: center;
            i {
              font-size: 24px;
              color: #AFAFAF;
            }
            &:hover {
              background: #F5C109;
              i {
                color: #fff
              }
            }
          }
          .active {
            background: #F5C109;
            i {
              color: #fff
            }
          }
          .text {
            flex: 1;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .time {
            .from, .to {
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
            font-size: 18px;
            color: #030303;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-weight: 500;
            margin-bottom: 10px;
            &:hover{
              color: #F5C109;
            }
          }
          p {
            font-size: 14px;
            color: #959595;
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
      margin-bottom: 20px;
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
        color: #F5C109;
      }
      .inner {
        width: 332px;
        padding: 12px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 15px 0px rgba(209,209,209,1);
        clear: both;
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
            cursor: pointer;
          }
        }
      }
    }
  }
  .clearfix {
    @include clearfix()
  }
  .fixtool {
    position: fixed;
    top: 84px; 
  }
  .fixbottom {
    position: absolute; 
    bottom: 81px;
  }
}
</style>
