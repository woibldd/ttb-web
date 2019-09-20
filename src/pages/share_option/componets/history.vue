<template>
  <div class="history">
    <ul class="content">
      <li v-for="index in 6" :key="index">
        <div flex="main:justify cross:center">
          <span class="rise_or_fall">BTC/USD<i class="iconfont icon-arrow1-down red" /></span>
          <span class="share-text-info">2019.8.27 22:43:09</span>
        </div>
        <div flex="main:justify cross:center">
          <div class="money"><span class="share-text-info">投资 </span><p>1000</p></div>
          <div><span class="share-text-info">收益 </span><p class="share-text-success">+1000.00</p></div>
          <div class="earning"><span class="share-text-info">价值 </span><p>2000.00000000</p></div>
        </div>
      </li>
    </ul>
    <span class="xiaoguo" />
  </div>
</template>
<style lang="scss" scope>
.history{
  .content{
    &>li{
      line-height:1.8;
      padding: 10px;
      margin-bottom:10;
      border-bottom: 1px dashed #3B414F;
      font-size: 12px;
    }
  }

}

</style>
