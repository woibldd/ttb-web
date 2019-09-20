<template>
  <div class="ranking-list">
    <el-select v-model="account" class="account-select" size="small" placeholder="请选择">
      <el-option
        v-for="name in mapAccountOptions"
        :key="name"
        :label="name"
        :value="name"
      />
    </el-select>
    <p class="share-text-info">我的排名</p>
    <div class="rank-myrank" flex="main:justify cross:center">
      <div>
        <svg-icon icon-class="bug" />
        <span>zgmurder</span>
      </div>
      <div>
        <span class="win-num">68740.35</span>
        <span> 模拟</span>
      </div>
    </div>
    <ul class="rank-tabs">
      <li class="active">本周</li>
      <li>本周</li>
      <li>本周</li>
      <li>本周</li>
    </ul>
    <div class="tab-content">
      <div v-for="index in 6" :key="index" class="rank-myrank" flex="main:justify cross:center">
        <div>
          <svg-icon icon-class="bug" />
          <span>zgmurder</span>
        </div>
        <div>
          <span class="win-num">68740.35</span>
          <span> 模拟</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RankingList',
  data() {
    return {
      account: '模拟'
    }
  },
  computed: {
    mapAccountOptions() {
      return ['BTC', 'ETH', 'FOTA', 'DOGE', '模拟']
    }
  }
}
</script>
<style lang="scss" scope>
.ranking-list{
  .account-select{
    width:100%;
    margin-top: 20px;
    margin-bottom: 30px;
    & /deep/ .el-input__inner{
      background:#2C3343;
      color: #fff;
      border: none
    }
  }
  .rank-myrank{
    // margin-top: 15px;
    line-height: 40px;
    border-bottom: 1px solid #3B414F;
  }
  .rank-tabs{
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    &>li{
      text-align: center;
      flex: 1;
      line-height: 40px;
      border-radius: 8px 8px 0 0;
      &.active,&:hover{
        background:#2C3343;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .tab-content{
    background:#2C3343;
    padding: 10px;
  }
}

</style>
