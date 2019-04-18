<template>
  <div id="RushBuy">
      <div class="RushBuy-banner">
        <!-- <img src="@/assets/sprushbuy.jpg" alt=""> -->
      </div>
      <div class="RushBuy-content">
        <div class="RushBuy-main">
          <div class="RushBuy-main-left">
            <div class="grab-more">
              SP{{ $t('RushBuy_text_list_1') }}
              <h1>{{data. total_amount | number}} SP</h1>
            </div>
            <div class="rushBuy-slider">
              <span :style="{width:percentage+'%'}"><em>{{percentage}}%</em></span>
            </div>
            <div class="grab-more-text">
              <span>{{ $t('RushBuy_text_list_3',{day:day}) }}：</span>{{ $t('RushBuy_text_list_2') }} {{starTime}}-{{endTime}}
              <ul>
                <li><span>{{ $t('RushBuy_text_list_4') }}：</span>{{data.sp_remaining_amount | number}} sp</li>
                <li style="float:right"><span>{{ $t('RushBuy_text_list_5') }}:</span>1sp = {{data.usdt_price}} USDT = {{data.ix_price}} IX</li>
              </ul>
            </div>
          </div>
          <div class="RushBuy-main-right">
              <div class="rushbuy-form">
                <div class="input-box">
                  <label for="">{{ $t('RushBuy_text_list_6') }}</label>
                    <input type="text" placeholder="输入抢购数量" maxlength="4" v-model="number">
                  <span class="poa-input-text">SP</span>
                </div>
                <div class="rushbuy-error-info" >
                  <b v-show="errorText">{{ $t('RushBuy_text_list_7') }}</b>
                  <span class="text-right">{{ $t('RushBuy_text_list_8') }}：{{data.sp_remaining_amount | number}} sp</span>
                </div>
                <div class="input-box">
                  <label for="">{{$t('RushBuy_text_list_9')}}</label>
                    <input type="text" readonly v-model="typeNumber">
                    <select class="poa-input-text" v-model="type"><option value="USDT">USDT</option><option value="IX">IX</option></select>
                </div>
                <!-- <div class="rushbuy-error-info">
                  您输入数量超出抢购范围
                  <span class="text-right">剩余可抢购额度：500 sp</span>
                </div> -->
              </div>
              <ul>
                <li>{{$t('available')}} {{data.usdt_available | number}} USDT <a href="/fund/deposit/USDT" class="text-right">{{$t('TopUp')}}</a></li>
                <li>{{$t('available')}} {{data.ix_available | number}} IX <a href="/fund/deposit/IX" class="text-right">{{$t('TopUp')}}</a></li>
              </ul>
              <button v-if="isLogin" class="submit" @click="submit">{{$t('RushBuy_text_list_10')}}</button>
              <router-link v-else :to="'/user/login/email'" style="background:#01CED1" class="submit">登录/注册</router-link>
          </div>
        </div>
        <div class="RushBuy-flow">
          <h2>sp{{$t('RushBuy_text_list_11')}}</h2>
          <ul>
            <li><span>01</span>{{$t('RushBuy_text_list_12')}}</li>
            <li><span class="avtive">02</span>sp{{$t('RushBuy_text_list_13')}}</li>
            <li><span>03</span>{{$t('RushBuy_text_list_14')}}</li>
          </ul>
        </div>
        <div class="RushBuy-lsit-text">
          <h2>{{$t('RushBuy_text_list_15')}}</h2>
          <ul>
              <li>{{$t('RushBuy_text_list_16')}}</li>
              <li>{{$t('RushBuy_text_list_17')}}</li>
              <li>{{$t('RushBuy_text_list_18')}}</li>
              <li>{{$t('RushBuy_text_list_19')}}</li>
              <li>{{$t('RushBuy_text_list_20')}}</li>
              <li>{{$t('RushBuy_text_list_21')}}</li>
          </ul>
        </div>
        <div class="RushBuy-lsit-text">
          <h2>{{$t('RushBuy_text_list_22')}}</h2>
          <ul>
          <li>{{$t('RushBuy_text_list_23')}}</li></ul>
        </div>
        <div class="RushBuy-lsit-text">
          <h2>{{$t('RushBuy_text_list_24')}}</h2>
          <ul>
            <li>{{$t('RushBuy_text_list_25')}}。</li>
            <li>{{$t('RushBuy_text_list_26')}} <br>
            {{$t('RushBuy_text_list_27')}}<a href="https://www.sunpower.io">https://www.sunpower.io</a>  <br>
            {{$t('RushBuy_text_list_28')}}<a href="https://www.sunpower.io/sp.pdf">https://www.sunpower.io/sp.pdf</a>  <br>
            {{$t('RushBuy_text_list_29')}}<a href="https://etherscan.io/address/0x33ad8ccd192c2b1782b0d3e557e32a54771e16f1">https://etherscan.io/address/0x33ad8ccd192c2b1782b0d3e557e32a54771e16f1</a>
          </li>
          </ul>
        </div>
        <div class="RushBuy-lsit-text">
          <h2>{{$t('RushBuy_text_list_30')}}</h2>
          <ul>
          <li>{{$t('RushBuy_text_list_31')}}</li>
          <li>{{$t('RushBuy_text_list_32')}}</li>
          <li>{{$t('RushBuy_text_list_33')}}</li>
          </ul>
        </div>
      </div>
  </div>
</template>
<script>
import service from '@/modules/service'
import {state} from '@/modules/store'
import utils from '@/modules/utils'

export default {
  data () {
    return {
      state,
      percentage:0,
      number:'',
      type: 'USDT',
      errorText: false,
      day:'一',
      starTime :'',
      endTime:'',
      typeNumber:0.00000000,
      data:{}
    }
  },
  watch:{
    type(val){
      if(val === 'USDT'){
        this.typeNumber = this.number * this.data.usdt_price
      } else {
        this.typeNumber = this.number * this.data.ix_price
      }
    },
    number(val,old){
      if(isNaN(val)){
          this.number = old
      }
      this.errorText = val>(this.data.sp_remaining_amount)*1 ?  true :  false
      if(this.type === 'USDT'){
        this.typeNumber = this.number * this.data.usdt_price
      } else {
        this.typeNumber = this.number * this.data.ix_price
      }
      console.log(val,String(val),String(val).indexOf("."),String(val).indexOf("-"))
      if(String(val).indexOf(".") !== -1 ){
          this.number = String(val).replace('.','')
      }
      if( String(val).indexOf("-") !== -1){
          this.number = String(val).replace('-','')
      }
    }
  },
  filters:{
    number(nStr){
      nStr += '';
      let x = nStr.split('.');
      let x1 = x[0];
      let x2 = x.length > 1 ? '.' + x[1] : '';
      let rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    }
  },
  created() {
    this.getSpPageInfo()
    setInterval(() => {
      this.getSpPageInfo()
    }, 1000)
  },
  computed: {
    isLogin () {
      return this.state.userInfo
    }
  },
  methods: {
    getSpPageInfo(){
      service.spPageInfo().then(resp => {
        if (!resp.code) {
          this.data = resp.data
          console.log(this.data.executed,this.data.total_amount,this.data.executed)
          this.percentage = Math.ceil(this.data.executed  /  (this.data.total_amount + this.data.executed)*100)
          switch(this.data.day){
          case "1":
            this.day = '一'
            break;
          case "2":
            this.day = '二'
            break;
          case "3":
            this.day = '三'
            break;
          }
          this.starTime = this.timer(this.data.begin_time)
          this.endTime = this.timer(this.data.end_time,true)
        }
      })
    },
    submit(){
      if(this.number === ''||this.number === 0){
        utils.alert('输入金额不合法')
        return
      }
      service.rushToBuy({
        currency: this.type,
        amount : this.number
      }).then(resp => {
        if (!resp.code) {
          this.getSpPageInfo()
          utils.success('抢购成功')
        } else {
          utils.alert(resp.message)
        }
      })
    },

    timer(date,type){
      function add0(m){return m<10?'0'+m:m }
      let time = new Date(date);
      let y = time.getFullYear();
      let m = time.getMonth()+1;
      let d = time.getDate();
      let h = time.getHours();
      let mm = time.getMinutes();
      let s = time.getSeconds();
      if(type){
        return add0(h)+':'+add0(mm);
      } else {
        return y+'年'+add0(m)+'月'+add0(d)+'日'+add0(h)+':'+add0(mm);
      }
    }
  }
}
</script>
<style lang="scss">
.RushBuy-banner{
  background-size: 1920px;
  background-position: center;
  height: 747px;
  background-image: url(~@/assets/sprushbuy.jpg)
}
.router-RushBuy{
  background: #262d37;
}
.absolute{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}
</style>
<style lang="scss" scoped>
.RushBuy-content{
  width: 1200px;
  margin: 0 auto;
}
.RushBuy-main{
  overflow: hidden;
  margin-bottom: 80px;
  .RushBuy-main-left{
    float: left;
    width: 55%;
    .rushBuy-slider{
      width: 100%;
      position: relative;
      height: 8px;
      border-radius: 8px;
      background:rgba(52,58,66,1);
      margin-top: 30px;
      &:before{
        content: '0%';
        position: absolute;
        top: -25px;
        left: 0;
        font-size: 16px;
      }
      &:after{
        content: '100%';
        position: absolute;
        top: -25px;
        right:-8px;
        font-size: 16px;
      }
      span{
        width: 80%;
        display: block;
        height: 100%;
        border-radius: 8px;
        background:rgba(25,252,255,1);
        position: relative;
        em{
          position: absolute;
          right: -13px;
          background: #262d37;
          top: -25px;
          color: #19fcff;
          width: 30px;
          right: -17px;
          display: block;
          text-align: center;
        }
        &:after{
          content: '';
          width: 15px;
          height: 15px;
          border-radius: 15px;
          background: #19fcff;
          position: absolute;
          right: -9px;
          top: -3px;
        }
      }
    }
    .grab-more{
      background: #24292f;
      height: 250px;
      text-align: center;
      font-size: 24px;
      color: #fff;
      box-sizing: border-box;
      padding-top: 50px;
      h1{
        margin-top: 10px;
        font-family: auto;
        font-size: 72px;
      }
    }
    .grab-more-text{
      color:#fff;
      font-size: 16px;
      margin-top: 10px;
      padding-left: 0;
      span{
        color:rgba(203,230,253,1);
      }
      li{
        &:before{
          display: none;
        }
        float: left;
        font-size: 16px;
        margin-top: 10px;
        padding-left: 0;
      }
    }
  }
  .RushBuy-main-right{
    float: left;
    width: 45%;
    box-sizing: border-box;
    padding-left: 64px;
    li{
      &:before{
        display: none;
      }
      color:#fff;
      font-size: 18px;
      margin-top: 10px;
      padding-left: 0;
    }
    label{
      font-size: 18px;
      color:#fff;
    }
    .input-box{
      position: relative;
      input{
        height: 50px;
        line-height: 75px;
        border: none;
        background-color: #24292f;
        color: #fff;
        width: 355px;
        margin-left: 20px;
        height: 75px;
        padding-left: 20px;
        border-radius: 3px;
        font-size: 18px;
      }
    }
  }
}
.poa-input-text{
  position: absolute;
  right: 20px;
  top: 26px;
  background: transparent;
  font-size: 20px;
  color:rgba(0,206,209,1);
  border: none;
}
.absolute{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}
.RushBuy-content{
  color:#CBE6FD;
  h2{
    color: #fff;
    font-size: 18px;
    line-height: 70px;
  }
  li{
    line-height: 2;
    position: relative;
    padding-left:30px;
    &:before{
      display: inline-block;
      content: '';
      width: 5px;
      position: absolute;
      height: 5px;
      border-radius: 5px;
      background-color: #CBE6FD;
      left: 5px;
      top: 12px;
    }
  }
  .RushBuy-flow{
    height: 300px;
    width: 100%;
    text-align: center;
    background-color: rgba(36,41,47,1);
    overflow: hidden;
    h2{
      font-size:24px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:125px;
    }
    li{
      list-style: none;
      width: 33%;
      float: left;
      padding-left: 0;
      position: relative;
      span{
        display: block;
        width: 75px;
        height: 75px;
        border-radius: 75px;
        display: block;
        margin: 0 auto;
        background-color: rgba(53,63,77,1);
        line-height: 75px;
        text-align: center;
        font-size: 24px;
        color:#fff;
        margin-bottom: 20px;
        border: 10px solid #24292f;
        &.avtive{
          background: rgba(0,206,209,1);
          border: 10px solid rgba(0, 0, 0, 0.3);
        }
      }
      &:before{
        display: none;
      }
      &:after{
        content: '';
        position: absolute;
        height: 1px;
        width: 90px;
        background: #fff;
        right: -42px;
        top: 45px;
      }
      &:last-child:after{
        display: none;
      }
    }
  }
}
.text-right{
  float: right;
}
.submit{
  height: 60px;
  line-height: 75px;
  border: none;
  background: #353f4d;
  color: #fff;
  width: 475px;
  margin-left: 0px;
  line-height: 60px;
  display: block;
  text-align: center;
  font-size: 20px;
  border-radius: 3px;
  margin-top: 20px;
  cursor: pointer;
  &:hover{
    opacity: .9;
  }
}
.rushbuy-error-info{
  margin: 10px 0;
  font-size: 12px;
  display: block;
  height: 17px;
  color:rgba(238,86,83,1);
  padding-left: 100px;
  span{
    color:#fff;
  }
}
#RushBuy{
  background: #262d37;
  border-bottom: 100px solid #000;
  padding-bottom: 80px;
}
</style>
