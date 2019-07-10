<template>
  <div>
      <div  class="home">
    <div class="homelayout">
      


      <p class="reference"> <icon class="log" name="logug"/>参考单价：<span>1233132 {{$t('CNY/USDT')}}</span></p>
      <!-- <span class="tips">非最终交易单价，仅供参考</span -->
      <p class="price"><span  >按金额购买</span>|<span>按数量购买</span></p>

      <br>
       <number-input v-if="!count"
    
              class="number-input"
              v-model="count"
            
              size=medium 
              placeholder="请输入金额"
           />

       <number-input v-if="count"
       
              class="number-input"
              v-model="count"
            
              placeholder="请输入数量"
            />
        <span class="posn">CNY</span>
            <h3 class="paymentmethod">选择付款方式</h3>
            <sapn class="zhifu">支付宝</sapn>
            <sapn class="zhifu">银行卡</sapn>
            <sapn class="zhifu">微信</sapn>
            <p class="Transactiondetails ">成交单价：<span style="#FDA22D">11111</span></p>
            <p class="Transactiondetails ">成交数量：<span>11111</span></p>
            <p class="Transactiondetails ">成交总额：<span>11111</span></p>
             <el-button class="buttom"   type="primary"><span>购买USDT</span></el-button>

             <el-button class="buttom" style="background:rgba(253,162,45,1);margin-left: -1px;" type="warning"><span>报价已过期,点击获取最新价格</span></el-button>
    </div>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue'
// import Tooltip from 'element-ui'
// Vue.use(Tooltip)
export default{
  data () {
    return {
 count: true,

    }
  }
}
</script>
<style  lang="scss" >

.home{
  width: 860px;
  height: 809px;
  margin: auto;
//   background-color: rgba(247, 240, 240, 0.925);
  .homelayout{ margin-left: 98px;
 
  .reference{width:285px;
height:17px;
font-size:16px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(153,153,153,1);
margin-bottom: 48px;

.log{
    margin:0 5px;
}


      span{
          color: #333333;
       
      }
                //     .tips{
                //         display:none;
                //         width:170px;
                // height:40px;
                // line-height: 40px;
                // background:rgba(255,255,255,1);
                // box-shadow:0px 0px 6px 0px rgba(51,51,51,0.2);
                // display: inline-block;
                // font-size:12px;
                // font-family:MicrosoftYaHei;
                // font-weight:400;
                // color:rgba(153,153,153,1);
                //     }
  }
  .price{
      width:203px;
height:17px;
font-size:16px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(51,51,51,1);
span{
    display: inline-block;
    margin: 0 9px;
    color:#999999;
}
span:hover{color:#000;
cursor:pointer }

  }
  .number-input {
      
    width: 642px;
    height: 76px;
    line-height: 76px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    text-indent: 15px;
    margin: 15px 0 ;
    font-size:20px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(92,92,92,1);
  }
  .posn{
      position: relative;
      left: -58px;
      font-size: 18px;
     color:rgba(117,241,248,1);
  }
  .paymentmethod{
width:96px;
height:17px;
font-size:16px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(153,153,153,1);

  }
  .zhifu{
      width:200px;
height:76px;
line-height: 76px;
border:1px solid rgba(204,204,204,1);
border-radius:6px;
display: inline-block;
text-align: center;
margin-top: 20px;
margin-right: 5px;
font-size:18px;
font-family:MicrosoftYaHei;
font-weight:400;
  }
  .zhifu:hover{
     border:1px solid rgba(35,206,208,1);
     color:rgba(117,241,248,1);
cursor:pointer
  }
  .Transactiondetails{
      width: 642px;
    margin-top:45px;
    font-size:18px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(153,153,153,1);
    span{
        float: right;
        font-size:20px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(51,51,51,1);

    }
  }
  .buttom{
      width:642px;height:80px;background:rgba(35,206,208,1);border-radius:6px;margin-top:54px;
span{
          width:97px;
height:20px;
font-size:20px;
font-family:MicrosoftYaHei;
font-weight:bold;
color:rgba(255,255,255,1);
}

  }
  
  
  }
  
  }
  
</style>

