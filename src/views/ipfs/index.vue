<template>
  <div class="ipfs-container">
    <div class="banner">
      <!-- <h1>filecoin算力</h1>
      <h2>火热进行中</h2> -->
    </div>
    <div class="content">
      <div class="list">
        <div class="item clearfix"
          v-for="item in dataList"
          :key="item.id">
          <div class="img fl">
            <img src="./assets/product.png" alt="">
          </div>
          <div class="describe fl">
            <p>
              <b class="title">{{item.title}}</b>
              <label :style="{color: stateColor[item.state] }">{{ state[item.state]}}</label>
            </p>
            <p>
              <i>开始结束日期</i>
              <b>{{`${item.start}~${item.end}`}}</b>
            </p>
          </div>
          <div class="progress fl">
            <div>
              <i>进度</i> 
              <i>可购买算力值</i>
            </div>
            <el-progress :percentage="item.progress" status="success"></el-progress>
            <div>
              <span>{{$big(item.progress || 0).times(100).div(item.total || 1).round(2)}}%</span>
              <span>{{item.total}}T</span>
            </div>
          </div>
          <div class="option fl">
            <el-button type="primary" :disabled="item.state > 1" @click="handleClick">立即购买</el-button>
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
          :total="pageConfig.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        {
          id:1,
          title: '算力云IPFS云算力抢购邀请专场',
          start: '2018-08-22,15:30:22',
          end: '2018-08-22,15:30:22',
          progress: '25',
          total: '100',
          state: 1
        },
        {
          id:2,
          title: '算力云IPFS云算力抢购邀请专场',
          start: '2018-08-22,15:30:22',
          end: '2018-08-22,15:30:22',
          progress: '25',
          total: '100',
          state: 2
        },
        {
          id:3,
          title: '算力云IPFS云算力抢购邀请专场',
          start: '2018-08-22,15:30:22',
          end: '2018-08-22,15:30:22',
          progress: '25',
          total: '100',
          state: 3
        },
        {
          id:4,
          title: '算力云IPFS云算力抢购邀请专场',
          start: '2018-08-22,15:30:22',
          end: '2018-08-22,15:30:22',
          progress: '25',
          total: '100',
          state: 4
        },
      ],
      state: {
        1: '进行中',
        2: '待生效',
        3: '生效中',
        4: '已结束',
      },
      stateColor: {
        1: '#FB9246',
        2: '#FF5454',
        3: '#01CED1',
        4: '#B2B2B2', 
      },
      pageConfig: {
        page: 1,
        size: 5,
        total: 5
      }
    }
  },
  methods: {
    handleClick() {
      this.$router.push({name: 'ipfs-detail'})
    }
  }
}
</script>

<style lang="scss">
  .ipfs-container {
    .banner {
      height: 430px;
      background: url('./assets/banner.png') center center;
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
          }
          .describe {
            margin-right: 120px;
            width: 365px;
            p {
              display: flex;
              justify-content: space-between; 
              font-size: 12px;
              b {
                font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular; 
                color: #242424;
                &.title { 
                  font-size: 20px;
                }
              }
              label {
                padding: 0 11px;
                line-height: 24px; 
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
            .el-progress {
              width: 319px;
            }
          }
          .option {
            height: 82px;
            line-height: 82px;
            .el-button {
              padding: 13px 43px;
            }
          }
        }
      }
      .page {
        margin: 50px 0 80px;
        text-align: center;
      }
    }
  }
</style>