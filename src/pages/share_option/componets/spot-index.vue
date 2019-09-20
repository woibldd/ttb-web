<template>
  <div class="drawer-box">
    <ul class="drawer-content">
      <li v-for="index in 3" :key="index" flex="main:justify cross:center">
        <div flex="cross:center">
          <img width="24" style="margin-right:10px" src="https://img.fota.com/group1/M00/00/01/Ch8Ci1v_iZaAWSGvAAAscH2KM68456.png" alt="Binance">
          <span>Binance</span>
        </div>
        <span>10175.61</span>
      </li>
      <div class="line" />
      <li flex="main:justify cross:center">
        <p class="text">USDT指数</p>
        <span class="num">10176.02</span>
      </li>
      <li flex="main:justify cross:center">
        <p class="text">USDT指数</p>
        <span class="num">10176.02</span>
      </li>
      <div class="line" />
      <li flex="main:justify cross:center">
        <p class="text">现货指数<span class="graysmall">(USD)</span></p>
        <span class="num">10166.72</span>
      </li>
    </ul>
    <el-button type="info" style="margin-top:30px;width:100%">点击了解更多信息</el-button>
  </div>
</template>
<script>
export default {
  name: 'SpotIndex'
}
</script>
<style lang="scss" scope>
.drawer-box{
  .drawer-content{
    &>li{
      height: 30px;
    }
    .line{
      border-bottom: 1px dashed #3B414F;
      height:0;
      margin:10px 0
    }
  }
}
</style>
