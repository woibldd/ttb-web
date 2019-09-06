<template>
  <div class="play-btc">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <div class="container content">
      <div class="content-item" v-for="(item,index) in mapData" :key="index">
        <img :src="item.src" class="item-img">
        <div class="item-describe">
          <div style="display:flex;align-items:center">
            <img :src="item.dessrc" height="64px" style="margin-right:16px">
            <div>
              <p style="font-size:18px;color:#3A3A3A">{{item.text[0]}}</p>
              <p style="font-size:16px;color:#999999">{{item.text[1]}}</p>
            </div>
          </div>
          <div class="container-btn">点击试玩</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return {
      mapData:[
        {
          key:1,
          src:require('./assets/play-btc-1.png'),
          dessrc:require('./assets/play-btc-1-1.png'),
          text:['极速火箭','火箭一爆，收益全开']
        },
        {
          key:2,
          src:require('./assets/play-btc-2.png'),
          dessrc:require('./assets/play-btc-2-1.png'),
          text:['足球神射','足球进门，财富满盆']
        },
        {
          key:3,
          src:require('./assets/play-btc-3.png'),
          dessrc:require('./assets/play-btc-3-1.png'),
          text:['绝杀卡当','点位插队，赢者翻倍']
        },
        {
          key:4,
          src:require('./assets/play-btc-4.png'),
          dessrc:require('./assets/play-btc-4-1.png'),
          text:['疯狂二八红','多人对决 ，等你通杀']
        },
        {
          key:5,
          src:require('./assets/play-btc-5.png'),
          dessrc:require('./assets/play-btc-5-1.png'),
          text:['发哥百家乐','文明公正，用实力做发哥']
        },
        {
          key:6,
          src:require('./assets/play-btc-6.png'),
          dessrc:require('./assets/play-btc-6-1.png'),
          text:['竞猜大师','全球联赛尽收其中']
        },
      ]
    }
  }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.play-btc{
  .content{
    margin-top: 34px;
    margin-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .content-item{
      width: 378px;
      overflow: hidden;
      margin-bottom: 30px;
      &>.item-img{
        display: block;
        border-radius: 5px 5px 0 0;
      }
      &>.item-describe{
        padding: 25px 31px;
        line-height: 28px;
        border: 1px solid #DDDDDD;
      }
      .container-btn{
        width:100%;
        height:42px;
        line-height: 42px;
        text-align: center;
        background:#01CED1;
        border-radius:5px;
        font-weight:400;
        color: #fff;
        margin-top: 20px;
        &:hover{
          cursor: pointer;
          background: rgb(5, 229, 233)
        }
      }
    }
  }
}
  
</style>