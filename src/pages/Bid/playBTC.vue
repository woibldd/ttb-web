<template>
  <div class="play-btc">
    <el-carousel :interval="5000" arrow="always" style="z-index: 0;">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <div class="container content" v-loading="loading">
      <div class="content-item" v-for="(item,index) in mapData" :key="index">
        <img :src="item.src" class="item-img">
        <div class="item-describe">
          <div style="display:flex;align-items:center">
            <img :src="item.dessrc" height="64px" style="margin-right:16px">
            <div>
              <p style="font-size:18px;color:#3A3A3A">{{item.text[0]}}</p>
              <p style="font-size:16px;color:#999999" class="text-overflow">{{item.text[1]}}</p>
            </div>
          </div>
          <div class="container-btn" @click="play(item.key)">{{item.btntext}}</div>
        </div>
        <div class="tips">{{item.tips}}</div>
      </div>
    </div>
  </div>
</template>
<script>

import service from '@/modules/service'
import {state} from '@/modules/store'

export default {
  data(){
    return {
      loading: false,
      state,
    }
  },
  methods: {
    play(key) { 
      if (!this.isLogin) {
        this.$router.push({
          name: 'login'
        })
        return
      }


      this.loading = true
      const params = {
        uid: state.userInfo.id 
      }
      service.createCode(params).then(res => { 
        this.loading = false
        if(res.code) {  
          this.enter(key, res.code)
        } 
        // else {
        //   console.log(res.code)
        // }
      }) 
    },
    enter(key, code) {
      // 1 极速火箭， 2足球神射，3绝杀卡当，4疯狂二八红，5发哥百家乐，6竞猜大师
      let url = {
        1: `https://testing-sso.cointest.link/channel/callbacks/IXX/ROCKET?code=${code}&langue=zh`,
        2: `https://testing-sso.cointest.link/channel/callbacks/IXX/GOAL?code=${code}&langue=zh`,
        3: `https://testing-sso.cointest.link/channel/callbacks/IXX/MEDIAN?code=${code}&langue=zh`,
        4: `https://testing-sso.cointest.link/channel/callbacks/IXX/MAGNATE?code=${code}&langue=zh`,
        5: `https://testing-sso.cointest.link/channel/callbacks/IXX/BACCARAT?code=${code}&langue=zh`,
        6: `https://testing-sso.cointest.link/channel/callbacks/IXX/GAME-COLLECTION-INNER?code=${code}&langue=zh`,
      }[key]
      // window.location.href = url
      window.open(url)
    }
  },
  computed: { 
    isLogin () {
      return this.state.userInfo !== null
    },
    mapData(){
      console.log();
     
      return Array.from({length:6}).map((e,i)=>(
        {
          key:i+1,
          src:require(`./assets/playBTC/${i+1}/${this.$i18n.locale.toLowerCase()}.png`),
          dessrc:require(`./assets/playBTC/${i+1}/icon.png`),
          text:[this.$t(`playbtcMaptext.${i+1}.title`),this.$t(`playbtcMaptext.${i+1}.describe`)],
          tips:this.$t(`playbtcMaptext.${i+1}.tips`),
          btntext:this.$t(`playbtcMaptext.${i+1}.btntext`)
        }
      ))
      // return [
      //   {
      //     key:2,
      //     src:require('./assets/play-btc-2.png'),
      //     dessrc:require('./assets/play-btc-2-1.png'),
      //     text:['足球神射','足球进门，财富满盆']
      //   },
      //   {
      //     key:3,
      //     src:require('./assets/play-btc-3.png'),
      //     dessrc:require('./assets/play-btc-3-1.png'),
      //     text:['绝杀卡当','点位插队，赢者翻倍']
      //   },
      //   {
      //     key:4,
      //     src:require('./assets/play-btc-4.png'),
      //     dessrc:require('./assets/play-btc-4-1.png'),
      //     text:['疯狂二八红','多人对决 ，等你通杀']
      //   },
      //   {
      //     key:5,
      //     src:require('./assets/play-btc-5.png'),
      //     dessrc:require('./assets/play-btc-5-1.png'),
      //     text:['发哥百家乐','文明公正，用实力做发哥']
      //   },
      //   {
      //     key:6,
      //     src:require('./assets/play-btc-6.png'),
      //     dessrc:require('./assets/play-btc-6-1.png'),
      //     text:['竞猜大师','全球联赛尽收其中']
      //   },
      // ]
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
  .text-overflow{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  };
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
      position: relative;
      &>.item-img{
        display: block;
        border-radius: 5px 5px 0 0;
      }
      &>.item-describe{
        padding: 25px 31px;
        line-height: 28px;
        border: 1px solid #DDDDDD;
      }
      &>.tips{
        position: absolute;
        right: 22px;
        top: 22px;
        width:56px;
        height:20px;
        background:rgba(1,206,209,1);
        border-radius:2px;
        color: #fff;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
      };
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