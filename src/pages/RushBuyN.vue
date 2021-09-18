<template>
  <div id="RushBuy">
      <div class="RushBuy-banner" :class="{
      'fz':state.locale === 'zh-HK',
      'ko':state.locale === 'ko',
      'en':state.locale === 'en'}"  >
        <!-- <img src="@/assets/sprushbuy.jpg" alt=""> -->
      </div>
      <div class="RushBuy-content">
        <div class="RushBuy-main">
          <div class="RushBuy-main-left"> 
            <div class="rushbuy-main-count-down" flex>
              <div class="label">
                <img src="@/assets/hot.png" alt="" class="icon">
                <span>开始倒计时：</span>
              </div>
              <div class="count-down-control">
                <label>10</label>
                <span>:</span>
                <label>10</label>
                <span>:</span>
                <label>10</label>
              </div>
            </div>
            <div class="rushbuy-main-total">
              <div class="rushbuy-total-title">
                NBZZ抢购总额
              </div>
              <div class="total-control">
                <label>6</label>
                <label>6</label>
                <label>6</label>
                <span>,</span>
                <label>6</label>
                <label>6</label>
                <label>6</label> 
                <i>NBZZ</i>
              </div>
              <div class="rushbuy-progress" flex>
                <label>当前抢购进度</label>
                <!-- <div class="rushBuy-slider" :class="{'hidden': percentage!==0}">
                  <span :style="{width:percentage+'%'}"><em>{{percentage}}%</em></span>
                </div> -->
                <div style="width: 421px;">
                  <el-slider 
                    v-model="current" 
                    :marks="marks"/> 
                </div>
              </div> 
            </div>
          </div>
          <div class="RushBuy-main-right">
              <div class="rushbuy-form">
                <div class="input-box">
                  <label for="">{{ $t('RushBuy_text_list_6') }}</label>
                    <input type="text" :placeholder="$t('RushBuy_text_list_34')" maxlength="4" v-model="number">
                  <span class="poa-input-text">SP</span>
                </div>
                <div class="ix-slider">
                  1
                   <ix-slider 
                    ref="sliderBuy" 
                    @input="onSliderDragEnd($event, 'buy')"
                    :height="4" 
                    :dot-size="14"
                    :lazy="true"
                    :value="amount"
                    :min="0"
                    :max="100"
                    :piecewise-label="true"
                    :interval="1" 
                    :piecewise="false">
                    <template
                      slot="label"
                      slot-scope="{ label, active }">
                      <span
                        :class="['custom-label', { active }]"
                        v-if="label % 25 === 0"/>
                      <span 
                        class="vue-slider-piecewise-label" >
                        {{ label }}
                      </span>
                    </template>
                    <template
                      slot="tooltip"
                      slot-scope="tooltip">
                      <div class="custom-tooltip">
                        {{ tooltip.value }}%
                      </div>
                    </template>
                  </ix-slider>
                  2
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
              </div>
              <ul>
                <li>{{$t('available')}} {{data.usdt_available | number}} USDT <a href="/fund/deposit/USDT" class="text-right">{{$t('TopUp')}}</a></li> 
              </ul>
              <button v-if="isLogin" class="submit" @click="submit">{{$t('RushBuy_text_list_10')}}</button>
              <router-link v-else :to="'/user/login/email'" style="background:#01CED1;color:#fff;" class="submit">{{$t('signin')}}/{{$t('signup_title')}}</router-link>
          </div>
        </div>
        <!-- <div class="RushBuy-flow">
          <h2>sp{{$t('RushBuy_text_list_11')}}</h2>
          <ul>
            <li><span>01</span>{{$t('RushBuy_text_list_12')}}</li>
            <li><span :class="{avtive:data.total_amount != 0}">02</span>sp{{$t('RushBuy_text_list_13')}}</li>
            <li><span :class="{avtive:data.total_amount == 0}">03</span>{{$t('RushBuy_text_list_14')}}</li>
          </ul>
        </div> -->
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
import ixSlider from '@/components/common/ix-slider/'

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
      data:{},
      total: 100,
      current: 10,
      marks: {
        0: '0%',
        25: '25%',
        50: '50%',
        75: '75%',
        100: '100%',
      },
      amount: 0,
    }
  },
  components: {
    ixSlider
  },
  watch:{
    type(val){
      if(val === 'USDT'){
        this.typeNumber =  this.mul(this.number , this.data.usdt_price)
      } else {
        this.typeNumber =  this.mul(this.number , this.data.ix_price)
      }
    },
    number(val,old){
      if(isNaN(val)){
          this.number = old
      }

      this.errorText = val>(this.data.sp_remaining_amount)*1 ?  true :  false

      if(this.type === 'USDT'){
        this.typeNumber =  this.mul(this.number , this.data.usdt_price)
      } else {
        this.typeNumber =  this.mul(this.number , this.data.ix_price)
      }

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
  },
  computed: {
    isLogin () {
      return this.state.userInfo
    }
  },
  methods: {
    mul(a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    },
    getSpPageInfo(){
      service.spPageInfo().then(resp => {
        if (!resp.code) {
          this.data = resp.data
          console.log(this.data.total_amount)
          console.log(this.data.executed)
          console.log(this.data.total_amount + this.data.executed)

          this.percentage = Math.ceil(this.data.executed  /  (this.data.total_amount*1 + this.data.executed*1)*100)
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

          let timeIf = this.$moment(this.$moment().format('YYYY-MM-DD HH:mm:ss')).isAfter(this.$moment.unix(this.data.begin_time/1000).format('YYYY-MM-DD HH:mm:ss'))
          let ifTime = this.$moment(this.$moment().format('YYYY-MM-DD HH:mm:ss')).isBefore(this.$moment.unix(this.data.end_time/1000).format('YYYY-MM-DD HH:mm:ss'))
          if(timeIf&&ifTime){
            setinterval(()=>{
              this.getSpPageInfo()
            },1000)
          }
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
    }, 
    onSliderDragEnd (value, dir) {  
      this.amount = value
      value = value / 100.0  
    }, 
  }
}
</script>
<style>
.RushBuy-banner{
  background-size: 1920px;
  background-position: center;
  height: 747px;
  background-image: url(~@/assets/sprushbuy.jpg)

}
.RushBuy-banner.en{
  background-image: url(~@/assets/banner-en.jpg)
}
.RushBuy-banner.fz{
  background-image: url(~@/assets/banner-ft.jpg)
}
.RushBuy-banner.ko{
  background-image: url(~@/assets/banner-ko.jpg)
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
<style lang="scss"  scoped>
.RushBuy-content{
  width: 1200px;
  margin: 0 auto;
}
.RushBuy-main{
  overflow: hidden;
  margin-bottom: 80px;
  .RushBuy-main-left{
    float: left;
    width: 604px;
    background-color:#2A3743;
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
      &.hidden{
        &:after{
          display: none;
        }
        &:before{
          display: none;
        }
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
          z-index: 9999;
          color: #19fcff;
          width: 30px;
          right: -26px;
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
          right: -16px;
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
    margin-left: 37px;
    float: left;
    width: 558px;
    background-color:#2A3743;
    box-sizing: border-box;
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
      width: 72px;
      line-height: 75px;
      display: inline-block;
    }
    .input-box{
      position: relative;
      overflow: hidden;
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
        float: right;
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
  color:#fff;

  &:hover{
    opacity: .9;
    color:#fff;
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


.ix-slider {
  padding: 0;
  margin-right: 20px;
  position: relative;
  box-sizing: border-box;
  @include clearfix(); 
  .custom-label {
    position: absolute;
    bottom: -15px;
    left: 0;
    transform: translate(-50%, -12px);
    margin-left: 3px;
    width:10px;
    height:10px;
    background:#fff;
    border-radius:50%;
    cursor: pointer;
  }
  .custom-tooltip {
    position: absolute;
    bottom: -38px;
    left: -7px;
    font-size: 10px;
    color: #A5B4C5;
  }
  .custom-label.active {
    background-color: $primary;
    font-weight: bold;
  }
  .custom-label.active::after {
    background-color: $primary;
    width: 2px;
  }
}
</style>
