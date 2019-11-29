<template>
  <div class="industry">
    <div class="industry-banner"></div>
    <div class="con">
      <div class="new-container">
        <div class=""></div>
        <div class="inner">
          <div class="detail">
            <div class="top">
             <div class="icon" :class="{active: activityInfo.collect === 1}" @click="collectHadnle">
                <i class="overseas-icon" v-if="activityInfo.collect === 1">&#xe62d;</i>
                 <i class="overseas-icon" v-else>&#xe62c;</i>
              </div>
              <div class="text">
                <h1>{{ activityInfo.title }}</h1>
              </div>
            </div>
            <div class="time">
              <div class="to">
                <p>发布时间: <span> {{ activityInfo.release_time }} </span></p>
              </div>
              <div class="from">
                <p>来源: <span> {{ activityInfo.source }} </span></p>
              </div>
            </div>
            <div>
              <div class="content" v-html="activityInfo.content"></div>
            </div>
          </div>
        </div>
        <div class="group">
          <div class="btn" @click="prev">上一篇</div>
          <div class="btn" @click="next">下一篇</div>
        </div>
      </div>
      <div class="quotation">
        <div class="btn-1" @click="collectHandle">
          我的收藏
        </div>
        <div class="inner">
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
import market from "./market";
import {state} from '@/modules/store'
import { collectActivity, getList2 } from '../../api/user';
import {defaultTilte} from '@/router/default'
export default {
  beforeEach(to, from, next) {
    if(to.path === "/industryDetail") {
      const defultObj = defaultTilte.filter(item => (Number(item.query.id) === Number(to.query.id)))[0]
      document.title = defultObj.title
      document.querySelector('meta[name="keywords"]').setAttribute('content', defultObj.keywords)
      document.querySelector('meta[name="description"]').setAttribute('content', defultObj.description)
    }
  },
  components: {
    market
  },
  data() {
    return {
      loading: true,
      total: 0,
      currentPage: 1,
      i: 1,
      activityInfo: {},
      rank: -1
    }
  },
  computed: {
    activityId() {
      return Number(this.$route.query.id)
    },
    list() {
      return JSON.parse(window.localStorage.getItem('activityData'))
    },
    ids() {
      return this.list.map(item => item.id)
    },
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
    collectHandle() {
      if (this.userId) {
        this.$router.push('/collect')
      } else {
        this.$router.push('/user/login')
      }
    },
    collectHadnle() {
      const collect = this.activityInfo.collect === 0 ? 1 : 0
      if (this.userId) {
        collectActivity({
          user_id: this.userId,
          id: this.activityInfo.id,
          collect: collect
        }).then((res) => {
          if (res.code === 200) {
            this.activityInfo.collect = collect
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
    prev() {
      this.rank++
      console.log(this.rank, 'prev')
      this.activityInfo = this.list.filter(item => (item.rank === this.rank))[0]
      console.log(this.activityInfo, 'prev')
      if (this.activityInfo) {
        this.init(this.activityInfo.id)
      }
    },
    next() {
      this.rank--
      console.log(this.rank, 'next')
      this.activityInfo = this.list.filter(item => (item.rank === this.rank))[0]
      console.log(this.activityInfo, 'next')
      if (this.activityInfo) {
        this.init(this.activityInfo.id)
      }
    },
    getNewQuery (oldQuery, name, val) {
      var obj = {}, // 这里初始化一定是{}而不是null,否则会出错
        flag = false;

      for (key in oldQuery) {
        if (oldQuery.hasOwnProperty(key)) {
          if (key === name) {
            // 这里是修改已有参数
            obj[key] = val;
            flag = true;
          } else {
            obj[key] = oldQuery[key]
          }
        }
      }

      // 这里是新增参数
      if (!flag) {
        obj[name] = val
      }
      return obj;
    },
    init(id) {
      getList2({
        user_id: this.userId,
        id: id
      }).then((res) => {
        if (res.code === 200) {
          this.activityInfo = res.data
          this.activityInfo.release_time = this.timestampToTime(this.activityInfo.release_time)
          this.$router.push({
            query: {
              id: this.activityInfo.id,
              rank: this.activityInfo.rank
            }
          })
        }
      })
    }
  },
  created() {
    this.init(this.activityId)
    this.rank = Number(this.$route.query.rank)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .industry {

    overflow: hidden;
    margin-bottom: 30px;
    clear: both;
    .content {
      margin: 0 20px 20px 20px;
      & >>> p {
        display: block;
      }
      & >>> img {
        display: block;
        margin: 10px auto;
      }
    }
    margin-bottom: 30px;
    &-banner {
      height: 400px;
      background: #00badb;
      background: url('./img/new.png') center center no-repeat;
    }
    .con {
      width: 1200px;
      margin: 30px auto;
      .new-container {
        width: 790px;
        float: left;
        .group {
          display: flex;
          margin: 30px auto;
          width: 100%;
          .btn {
            flex: 1;
            height:52px;
            background:rgba(255,255,255,1);
            box-shadow:0px 1px 15px 0px rgba(209,209,209,1);
            border-radius:3px;
            text-align: center;
            line-height: 52px;
            &:first-child {
              margin-right: 10px;
            }
            &:last-child {
              margin-left: 10px;
            }
          }
        }
        .inner {
          background:rgba(255,255,255,1);
          box-shadow:0px 1px 15px 0px rgba(209,209,209,1);
          box-sizing: border-box;
          overflow: hidden;
          .top {
            margin: 20px 20px 0 20px;
            overflow: hidden;
            display: flex;
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
                background: #01CED1;
                i {
                  color: #fff
                }
              }
            }
            .active {
              background: #01CED1;
              i {
                color: #fff
              }
            }
            .text {
              flex: 1;
              line-height: 40px;
            }
            h1 {
              font-size: 18px;
              color: #030303;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-weight: 500;
              margin-bottom: 10px;
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
          .time {
            width: 100%;
            text-align: right;
            border-bottom: 1px solid #ececec;
            float: right;
            margin-bottom: 20px;
            .from, .to {
              float: right;
              margin-right: 30px;
              color: #959595;
              padding-bottom: 20px;
            }
            overflow: hidden;
            font-size: 14px;
            & > div {
              padding: 20px 0;
              float: left;
            }
          }
        }
      }
      .quotation {
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
        width: 356px;
        float: left;
        padding: 12px;
        margin-left: 30px;
        color: #525252;
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
<style scoped>
  .content >>> p {
    display: block;
  }
  .content >>> img {
    display: block;
    width: 100%;
    zoom: 1;
    margin: 10px auto;
    overflow: hidden;
  }
</style>
