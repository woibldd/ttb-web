<template>
  <div class="ipfs-details-container">
    <div class="top">
      <div class="l">
        <div class="title">
            <img src="./assets/product.png" alt="">
            <b>
              算力云IPFS云算力抢购邀请专场
            </b>
        </div>
        <div class="m">
          <table>
            <tr>
              <th>预计回报率</th>
              <th>算力总发值</th>
              <th>算力价格</th>
              <th>最大购买总数量</th> 
            </tr>
            <tr>
              <td>80%至100%</td>
              <td>1234.65 T</td>
              <td>500.00 USDT/T</td>
              <td>323246.36 T</td> 
            </tr>
          </table> 
        </div>
        <div class="line"></div>
        <div class="b">
          <table>
            <tr>
              <th style="width: 15%;">期限</th>
              <th style="width: 15%;">参数TOKEN</th>
              <th style="width: 15%;">维护费用</th>
              <th>开始结束时间</th>
              <th style="width: 15%;">预计生效时间</th> 
            </tr>
            <tr>
              <td>300天</td>
              <td>IPFS</td>
              <td>100%</td>
              <td>2020.7.10 12:33:00 ~ 2020.7.12 11:33:44</td>
              <td>购买成功后生效</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="r">
        <div class="progress mb-28">
          <div class="between">
            <i>进度</i> 
            <i>可购买算力值</i>
          </div>
          <el-progress class="mt-5 mb-5" :percentage="36.6" :show-text="false"></el-progress>
          <div class="between">
            <span>36.6%</span>
            <span>1000T</span>
          </div>
        </div>
        <div class="input mb-23">
          <el-input-number style="width:100%;" v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
        </div>
        <div class="mb-19">
          <span>购买价值  1993.44 USDT</span>
        </div>
        <div class="mb-16">
          <el-checkbox v-model="checked">我已阅读并同意：</el-checkbox>
          <label>算力合同</label>
        </div>
        <div>
          <el-button style="width: 100%;" type="primary" @click="handleClick">立即购买</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="box">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="产品说明" name="first">产品说明</el-tab-pane>
          <el-tab-pane label="项目图片" name="second">项目图片</el-tab-pane> 
        </el-tabs> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      checked: false,
      activeName: "first"
    }
  },
  methods: {
    handleChange() {

    },
    handleClick() {

    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="scss">
.ipfs-details-container {
  .top {
    display:flex;
    width: 1200px;
    margin: 47px auto 0;
    box-shadow: 0px 0px 16px 0px rgba(221,221,221,0.78); 
    height: 329px;
    .l { 
      flex: 1;
      padding: 32px 42px; 
      .title {
        b {
          vertical-align: top;
          font-size: 20px; 
          margin-left: 20px;
        }
      }
      .line {
        height: 1px;
        background: #e5e5e5;
      }
      table {
        margin: 30px 15px 22px;
        width: 100%; 
        text-align: left;
        font-size: 12px;
        th {
          font-weight: 400;    
          padding-bottom: 1em;
          color: #565656;
        }
      }
      .m {
        tr {
          td {
            width: 25%;
            color: $primary;
            font-size: 16px;
            font-weight: Bold;
          }
        }
      }
    }
    .r { 
      padding: 32px 42px;
      width: 322px;
      background-color: #FAFAFA;
      .progress {
        .between {
          display: flex;
          justify-content: space-between;
          i {
            color: #999999;
          }
        }
      }
      .el-checkbox {
        margin-right: 0;
      }
    }
  }
  .content {
    width: 1200px;
    margin: 25px auto; 
    .box {
      
    padding: 37px 51px;
    height: 900px;
    box-shadow: 0px 0px 16px 0px rgba(221,221,221,0.78); 
    .tabs {
      font-size: 16px;
    }
    .describe {
      font-size: 12px; 
    }
    }
  }
}
</style>
