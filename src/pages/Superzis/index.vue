<template>
  <div>
    <div class="home">
      <span><img></span>
      <p>参考单价：<span>1233132</span></p>
      <span>按金额购买</span>|<span>按数量购买</span>
      <br>
       <number-input v-if="!count"
              class="number-input"
              v-model="count"
              :scale="point"
              placeholder="请输入金额"
           />

       <number-input v-if="count"
              class="number-input"
              v-model="count"
              :scale="point"
              placeholder="请输入数量"
            />
           
            <h3>选择付款方式</h3>
            <sapn>支付宝</sapn>
            <sapn>银行卡</sapn>
            <sapn>微信</sapn>
            <p>成交单价：<span>11111</span></p>
            <p>成交数量：<span>11111</span></p>
            <p>成交总额：<span>11111</span></p>
             <el-button type="primary">购买USDT</el-button>
              <el-button type="warning">报价已过期，点击获取最新价格</el-button>
    </div>

  </div>
</template>
<style lang="scss">
.home{
  width: 430px;
  height: 405px;
  margin: auto;
  background-color: rgb(245, 222, 222)
  }
  
</style>
<script>
export default{
  data () {
    return {
 count: true,

    }
  }
}
</script>
