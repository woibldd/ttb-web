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
           
        </div>
        <div class="b">
          <table>
            <tr>
              <th>期限</th>
              <th>参数TOKEN</th>
              <th>维护费用</th>
              <th>开始结束时间</th>
              <th>预计生效时间</th> 
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
        <div class="progress">
          <div>
            <i>进度</i> 
            <i>可购买算力值</i>
          </div>
          <el-progress :percentage="36.6" status="success"></el-progress>
          <div>
            <span>36.6%</span>
            <span>1000T</span>
          </div>
        </div>
        <div class="input">
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
        </div>
        <div>
          <span>购买价值  1993.44 USDT</span>
        </div>
        <div>
          <el-checkbox v-model="checked">我已阅读并同意：</el-checkbox>
          <label for="">算力合同</label>
        </div>
        <div>
          <el-button type="primary" @click="handleClick">立即购买</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="产品说明" name="first">产品说明</el-tab-pane>
        <el-tab-pane label="项目图片" name="second">项目图片</el-tab-pane> 
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      checked: false,
      activeName: "产品说明"
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
    }
    .r { 
      padding: 32px 42px;
      width: 322px;
      background-color: #FAFAFA;
    }
  }
  .content {
    margin: 25px auto; 
    width: 1200px;
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
</style>
