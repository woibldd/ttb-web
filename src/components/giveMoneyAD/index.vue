<template>
  <div class="messageBox-container" v-show="visible">
      <div class="model"></div>
      <div class="content-container">
        <div class="container-title">
          <span class="title">注册赠金</span>
          <span @click="close" class="el-icon-close icon"></span>
        </div>
        <p class="text">扫码添加微信客服，加入ixx.com官方社区立即领取$50等值合约交易体验金！</p>
        <img class="contact-img" width="120" src="@/assets/pic-contact-wx.png">
        <p class="text">如有疑问，请直接咨询微信客服。</p>
        <div class="container-bottom">
          <div @click="close" class="container-btn">确定</div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  model: {
    prop: 'visible',
    event: 'close'
  },
  props:{
    visible:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    close(){
      this.$emit('close',false)
    }
  }
}
</script>
<style lang="scss" scope>
  .messageBox-container{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,.6);
  z-index: 100;
  .content-container{
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width:426px;
    height:459px;
    background:rgba(29,36,52,1);
    border-radius:10px;
    color:rgba(236,236,236,1);
    font-size:16px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    .text{
      width:290px;
      font-weight:400;
      text-align: center;
      line-height: 1.6;
    }
    .container-title{
      width:100%;
      height:64px;
      background:rgba(37,46,67,1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 30px;
      border-radius:10px 10px 0 0;
      .icon{
        font-size: 18px;
        color: #161F33;
        font-weight: bold;
        &:hover{
          color:rgba(236,236,236,1);
          cursor: pointer;
        }
      }
    }
    .container-bottom{
      width: 100%;
      border-top: 1px solid rgba(34,44,66,1);
      padding: 25px 42px;
      box-sizing: border-box;
      .container-btn{
        width:100%;
        height:42px;
        line-height: 42px;
        text-align: center;
        background:rgba(9,201,137,1);
        border-radius:5px;
        font-weight:400;
        &:hover{
          cursor: pointer;
          background: rgb(12, 235, 160)
        }
      }
    }
  
}
}
</style>