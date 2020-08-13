<template>
  <div class="page-guide" id="page-guide">
      <div class="guide-body">

        <div class="guide-step" style="margin-top:60px;" v-show="step === 0">
          <!-- {{message}} -->
          <span class="guide-dialogue">{{ $t('guide_title_index0_step0') }}</span>
          <h1 class="guide-title">{{ $t('guide_title_index0_step1') }}</h1>
          <ul>
            <!-- <li　class="listAn">{{ $t('guide_title_index0_step2') }}</li>
            <li　class="listAn">{{ $t('guide_title_index0_step3') }}</li>
            <li　class="listAn">{{ $t('guide_title_index0_step4') }}</li>
            <li　class="listAn">{{ $t('guide_title_index0_step5') }}</li>
            <li　class="listAn">{{ $t('guide_title_index0_step6') }}</li> -->
          </ul>
          <button type="button" name="button" class="guide-index-btn" @click="step = 1">{{ $t('guide_title_index0_step7') }}</button>
          <a href="/future/" class="guide-back">{{ $t('guide_title_index0_step8') }} <i></i><i></i>  </a>
        </div>

        <button @click="oldStepClick" v-show="step > 2" class="guide-up-step"> <img src="@/assets/fanhui.png" alt=""> </button>

        <div class="guide-line" v-show="this.step !== 9&&this.step !== 0">
          <img src="@/assets/guide-bg.jpg" alt="">
          <div class="guide-am guide-line-problem" :class="{'guide-am-problem': step === 2}">?</div>
          <div v-show="rise">

            <div class="guide-am guide-line-make"
            :class="{'guide-am-make': step > 2}">{{ $t('guide_title_index0_step9') }}</div>

            <div class="guide-am guide-line-compensate"
            :class="{'guide-am-compensate': step === 3||step === 4,
            'guide-am-compensat': step > 4}">{{ $t('guide_title_index0_step10') }}</div>

            <div class="guide-am guide-line-boom"
            :class="{'guide-am-boom': step > 4}">{{ $t('guide_title_index0_step11') }}</div>

            <div class="guide-am guide-line-rise" v-show="rise"
            :class="{'guide-am-rise': step > 6&& step < 14,'guide-am-rise-z':step > 9&& step < 14,'guide-am-rise-h':step > 11}">
            <img src="@/assets/guide-die.png" alt="">
            </div>

            <div class="guide-green-block" :class="{ 'guide-green-block-op1':step > 6}">{{ $t('guide_title_index29_step0') }}</div>

            <div class="guide-profit-number-5000" v-show="step > 6">$5000</div>
            <div class="guide-profit-number-3800" v-show="step > 10">$3800</div>
            <div class="guide-profit-number-3636" v-show="step > 11">$3636</div>

          </div>
          <div class="guide-profit-number-4000" v-show="step > 2">$4000</div>

          <div v-show="!rise">

            <div class="guide-am guide-line-make rise"
            :class="{'guide-am-make': step > 13}">{{ $t('guide_title_index0_step9') }}</div>

            <div class="guide-am guide-line-compensate rise"
            :class="{'guide-am-compensate': step === 14||step === 15,
            'guide-am-compensat': step > 15}">{{ $t('guide_title_index0_step10') }}</div>

            <div class="guide-am guide-line-boom rise"
            :class="{'guide-am-boom': step > 15}">{{ $t('guide_title_index0_step11') }}</div>

             <div class="guide-am guide-line-die"
              :class="{'guide-am-die': step > 16,'guide-am-die-z':step > 19,'guide-am-die-h': step > 22}">
              <img src="@/assets/guide-rise.png" alt="">
            </div>
            <div class="guide-profit-number-4200" v-show="step > 15">$4200</div>
            <div class="guide-profit-number-3800-1" v-show="step > 20">$3800</div>
            <div class="guide-profit-number-4444" v-show="step > 22">$4444</div>
          </div>
        </div>
        <!-- 第一步 -->
        <div class="guide-step" v-show="step === 1">
          <div class="guide-text">
            {{ $t('guide_title_index1_step0') }}<br/> {{ $t('guide_title_index1_step1') }}
            <button type="button" name="button" class="guide-index-btn" @click="step = 2" style="margin-top:20px">{{ $t('guide_title_index1_step2') }}</button>
          </div>
        </div>
        <!-- 第二步 -->
        <div class="guide-step" v-show="step === 2">
          <div class="guide-text">
            <p>
               {{ $t('guide_title_index2_step0') }}
            </p>
            <button @click="step = 3,rise = true" class="guide-btn green"> {{ $t('guide_title_index2_step1') }}</button>
            <button @click="step = 14,rise = false" class="guide-btn red"> {{ $t('guide_title_index2_step2') }}</button>
          </div>
        </div>
        <!-- 第三步 -->
        <div class="guide-step" v-show="step === 3">
          <div class="guide-text">
            {{ $t('guide_title_index3_step0') }}
            <br/>
            <p v-html="$t('guide_title_index3_step1')"></p>
            <button type="button" name="button" class="guide-index-btn" @click="step = 4"
            style="margin-top:20px" v-html="$t('guide_title_index3_step2')">
            </button>
          </div>
        </div>
        <!-- 第四步 -->
        <div class="guide-step" v-show="step === 4">
          <div class="guide-text">
            <h1>{{ $t('guide_title_index4_step0') }}</h1>
            <input class="guide-number" @keyup="inspect" @change="noZero" type="number" max="10" min="1" v-model="numberValue">
            <span class="guide-number-label">{{ $t('guide_title_index4_step1' , {number: numberValue * 4000}) }}</span>
            <b class="guide-number-smail">{{ $t('guide_title_index4_step2') }}</b>
            <button type="button" name="button" class="guide-index-btn" @click="step = 5" style="margin-top:20px">{{ $t('guide_title_index4_step3') }}</button>
          </div>
        </div>

        <div class="guide-step" v-show="step === 5">
          <div class="guide-text">
            <div class="guide-calc">
              <p>
                {{$t('guide_title_index5_step0',{number :numberValue,number1 :numberValue*4000,})}}
              </p>
              <p>{{ $t('guide_title_index5_step1') }}</p>
              <div class="guide-math" v-html="$t('guide_title_index5_step2',
              {
                guide_number2:  numberValue ,
                guide_number:  numberValue/10 ,
                guide_number1: numberValue * 400
              })">
              </div>
              <button class="guide-right-btn" @click="step = 6" v-html="$t('guide_title_index5_step3',{guide_number2 :numberValue/10}) ">
         
            </button>
            </div>
          </div>
        </div>

         <div class="guide-step" v-show="step === 6">
          <div class="guide-text">
            {{ $t('guide_title_index6_step0') }}
            <!-- <button @click="step = 7">立即开仓<span>支付{{numberValue * 0.1}} BTC</span></button> -->
          </div>
        </div>

         <div class="guide-step" v-show="step === 7">
          <div class="guide-text">
            {{ $t('guide_title_index7_step0') }}
             <br>
            <button @click="step = 10" class="guide-btn yellow">{{ $t('guide_title_index7_step1') }}</button>
            <button @click="step = 8" class="guide-btn yellow">{{ $t('guide_title_index7_step2') }}</button>
          </div>
        </div>

        <div class="guide-step" v-show="step === 8">
          <div class="guide-text">
            <div class="guide-calc">
              <p>{{ $t('guide_title_index8_step0') }}</p>
              <p>{{ $t('guide_title_index8_step1') }}</p>

              <div class="guide-math" v-html="$t('guide_title_index8_step2',{
                guide_number3:numberValue,
                guide_number4:2 * numberValue / 10 ,})">
              </div>
              <p>{{ $t('guide_title_index8_step3',{guide_number5:2 * numberValue / 10 ,}) }}</p>
              <div class="guide-right-dom">
                {{ $t('guide_title_index8_step4') }}
                <button class="guide-right-btn-yellow"  @click="step = 9" >{{ $t('guide_title_index8_step5') }}</button>
              </div>
            </div>
          </div>
        </div>

         <div class="guide-step" v-show="step === 9">
          <div class="guide-text">
           <p style="font-size: 30px;">{{ $t('guide_title_index9_step0') }}</p>
           <br>
           <div class="guide-calc" style=" text-indent: 40px;width: 1270px;">
            <p v-html="$t('guide_title_index9_step1')" style="font-size: 16px;"> </p>
           </div>
           <a href="/future/"  class="guide-back-btn"   style="color:#fff">{{ $t('guide_title_index9_step2') }}</a>

          </div>
        </div>
        <div class="guide-step" v-show="step === 10">
          <div class="guide-text">
            {{ $t('guide_title_index10_step0') }} <br>
            {{ $t('guide_title_index10_step1') }}
          </div>
        </div>

        <div class="guide-step" v-show="step === 11">
          <div class="guide-text">
            <div  v-html="$t('guide_title_index11_step0')"></div>
         <br>
            <button @click="step = 12" class="guide-btn yellow">{{$t('guide_title_index11_step1')}}</button>
            <button @click="step = 24" class="guide-btn yellow">{{$t('guide_title_index11_step2')}}</button>
          </div>
        </div>

        <div class="guide-step" v-show="step === 12">
          <div class="guide-text">
            {{ $t('guide_title_index12_step0') }} <br>
            <button @click="step = 13" class="guide-btn yellow">{{ $t('guide_title_index12_step1') }}</button>
          </div>
        </div>

        <div class="guide-step" v-show="step === 13">
          <div class="guide-text">
            <div class="guide-calc">
              <p>{{ $t('guide_title_index13_step0') }}</p>
              <div class="guide-math" v-html="$t('guide_title_index13_step1',{
                guide_number6: numberValue,
                guide_number7: numberValue / 10,
              })">

              </div>
              <p>{{ $t('guide_title_index13_step2',{
                guide_number8: numberValue / 10,
              }) }}</p>
              <div class="guide-right-dom">
                <button @click="step = 11" class="guide-btn yellow">{{ $t('guide_title_index13_step3') }}</button>
                <button @click="step = 0" class="guide-btn yellow">{{ $t('guide_title_index13_step4') }}</button>
              </div>
            </div>
          </div>
        </div>

        <div class="guide-step" v-show="step === 24">
          <div class="guide-text">
            <div class="guide-calc">
              <p>{{ $t('guide_title_index24_step0') }}</p>
              <div class="guide-math" v-html="$t('guide_title_index24_step1',{
                guide_number23: numberValue,
                guide_number24: numberValue*526/10000
              })">
              </div>
              <p>{{ $t('guide_title_index24_step2',{
                guide_number25: numberValue*526/10000,
              }) }}</p>
              <div class="guide-right-dom">

                <a href="/future" class="guide-btn yellow">{{ $t('guide_title_index24_step3') }}</a>
                <button @click="step = 0" class="guide-btn yellow">{{ $t('guide_title_index24_step4') }}</button>
              </div>
            </div>
          </div>
        </div>

         <div class="guide-step" v-show="step === 14">
          <div class="guide-text">
            {{ $t('guide_title_index14_step0') }}
            <p>
              {{ $t('guide_title_index14_step1') }}
            </p>
            <span class="guide-smail-text">{{ $t('guide_title_index14_step2') }}</span> <br>
            <button @click="step=15" class="guide-btn yellow" v-html="$t('guide_title_index14_step3') "> </button>
          </div>
        </div>

        <div class="guide-step" v-show="step === 15">
            <div class="guide-text">
            <h1>{{ $t('guide_title_index15_step0') }}</h1>
            <input class="guide-number" @keyup="inspect" @change="noZero" type="number" max="10" min="1" v-model="numberValue">
            <span class="guide-number-label">
            {{ $t('guide_title_index15_step2',{guide_number9:numberValue * 4000}) }}
            </span>
            <button type="button" name="button" class="guide-index-btn" @click="step = 16" style="margin-top:20px">{{ $t('guide_title_index15_step2') }}</button>
          </div>
        </div>

        <div class="guide-step" v-show="step === 16">
          <div class="guide-text">
            <div class="guide-calc">
              <p v-html="$t('guide_title_index16_step0',{
                guide_number11: numberValue * 4000,
                guide_number12: numberValue})">
             </p>
              <p v-html="$t('guide_title_index16_step1')"></p>
              <div class="guide-math" v-html="$t('guide_title_index16_step2',{
                guide_number13:numberValue/10,
                guide_number20:numberValue,
                guide_number14:numberValue*400
              }) ">
              </div>
              <button class="guide-right-btn red" @click="step = 17" v-html=" $t('guide_title_index16_step3',{guide_number10:numberValue/10})">
              </button>
            </div>
          </div>
        </div>

        <div class="guide-step" v-show="step === 17">
          <div class="guide-text">
            {{ $t('guide_title_index17_step0') }}
          </div>
        </div>

         <div class="guide-step" v-show="step === 18">
          <div class="guide-text">
            {{ $t('guide_title_index18_step0') }} <br>
            <button @click="step = 20" class="guide-btn yellow">{{ $t('guide_title_index18_step1') }}</button>
            <button @click="step = 19" class="guide-btn yellow">{{ $t('guide_title_index18_step2') }}</button>
          </div>
        </div>

        <div class="guide-step" v-show="step === 19">
          <div class="guide-text">
            <div class="guide-calc">
              <p>>{{ $t('guide_title_index19_step0') }}</p>
              <div class="guide-math" v-html="$t('guide_title_index19_step1',
              {guide_number16:numberValue,guide_number15:numberValue * 476 /1000,})">
              </div>
              <p>{{ $t('guide_title_index19_step2',{guide_number17:numberValue * 476 /1000}) }}</p>
              <div class="guide-right-dom">
                <a href="/future" class="guide-btn yellow">{{ $t('guide_title_index24_step3') }}</a>
                <button @click="step = 0" class="guide-btn yellow">{{ $t('guide_title_index13_step4') }}</button>
              </div>
            </div>
          </div>
        </div>

         <div class="guide-step" v-show="step === 20">
          <div class="guide-text" v-html="$t('guide_title_index20_step0')">
          </div>
        </div>

         <div class="guide-step" v-show="step === 21">
          <div class="guide-text">
            {{ $t('guide_title_index21_step0') }} <br>
            <button @click="step = 23" class="guide-btn yellow">{{ $t('guide_title_index21_step1') }}</button>
            <button @click="step = 22" class="guide-btn yellow">{{ $t('guide_title_index21_step2') }}</button>
          </div>
        </div>

        <div class="guide-step" v-show="step === 22">
          <div class="guide-text">
            <div class="guide-calc">
              <p>{{ $t('guide_title_index22_step0') }}</p>
              <p>{{ $t('guide_title_index22_step1') }}</p>
              <div class="guide-math" v-html="$t('guide_title_index22_step2',{
                guide_number18:numberValue,
                guide_number19:numberValue * 526 / 10000})">
              </div>
              <p>{{ $t('guide_title_index22_step3',{
                guide_number20:numberValue * 526 / 10000}) }}</p>
              <div class="guide-right-dom">
                <button @click="step = 21" class="guide-btn yellow">{{ $t('guide_title_index13_step3') }}</button>
                <button @click="step = 0" class="guide-btn yellow">{{ $t('guide_title_index13_step4') }}</button>
              </div>
            </div>
          </div>
        </div>

        <div class="guide-step" v-show="step === 23">
          <div class="guide-text">
          {{ $t('guide_title_index23_step0') }} <br>
            <button @click="step = 25" class="guide-btn yellow">
            {{ $t('guide_title_index23_step1') }}
          </button>
          </div>
        </div>

        <div class="guide-step" v-show="step === 25">
          <div class="guide-text">
            <div class="guide-calc">
              <p>{{ $t('guide_title_index25_step0') }}</p>
              <div class="guide-math" v-html="$t('guide_title_index25_step1',{
                guide_number21:numberValue,
                guide_number22:numberValue/10
              })">
              </div>
              <p>
                {{ $t('guide_title_index25_step2',{
                  guide_number23:numberValue/10
                }) }}
              </p>
              <p>  {{ $t('guide_title_index25_step3') }}</p>
              <p class="guide-smail-text">*{{ $t('guide_title_index25_step4') }}</p>
              <div class="guide-right-dom">
                <button @click="step = 21" class="guide-btn yellow">{{ $t('guide_title_index25_step5') }}</button>
                <button @click="step = 0" class="guide-btn yellow">{{ $t('guide_title_index25_step6') }}</button>
              </div>
            </div>
          </div>
        </div>

        <ul class="guide-three-footer" v-show="step === 3||step === 4||step === 5||step === 14||step === 15||step === 16">
          <li :class="{'avtive': step === 3 ||  step === 14}">{{ $t('guide_title_index26_step0') }}</li>
          <li :class="{'avtive': step === 4 ||  step === 15}">{{ $t('guide_title_index26_step1') }}</li>
          <li :class="{'avtive': step === 5 ||  step === 16}">{{ $t('guide_title_index26_step2') }}</li>
        </ul>
      </div>
  </div>
</template>
<script>

export default{
  data () {
    return {
      loding: false,  //加载完成动画
      oldStep: 0,
      numberValue:1,
      rise: true,
      step: 0  //每一步的进行
    }
  },
  watch:{
    step(curVal,oldVal){
      this.oldStep = oldVal
      let $this = this
      if (curVal === 6||curVal === 10||curVal === 17||curVal === 20) {
        setTimeout(function(){
        console.log(curVal,curVal++,$this.step)
            $this.step = curVal++
        },2000)
      }
　　}
  },
  methods: {
    oldStepClick:function(){
      this.step = this.oldStep
    },
    noZero:function(){
      this.numberValue == 0 ? this.numberValue = 1 : ''
    },
    inspect:function(e){   // 数值检测  正整数 小于10
      this.numberValue = parseInt(this.numberValue)
      if(this.numberValue > 10){
        this.numberValue = 10
      } else if(this.numberValue<1){
        this.numberValue = 1
      }
      isNaN(this.numberValue) ? this.numberValue = 0 : ''
    }
  },
  components: {
  },
  mounted () {
    let $this = this
    setTimeout(function(){
      $this.loding = true
    },100)
  }
}
</script>

<style lang="scss">
  .guide-line-die{
    left: 471px;
    top: 140px;
    overflow: hidden;
    width: 0;
  }
  .guide-am-die{
    left: 471px;
    top: 140px;
    overflow: hidden;
    width: 272px;
    z-index: 3;
  }
  .guide-am-die-z{
    width: 410px;
  }
  .guide-am-die-h{
    width: 690px;
  }
  .guide-line{
    width: 1195px;
    margin: 0 auto;
    overflow: hidden;
  }
  .guide-line-rise{
    left: 467px;
    top: 120px;
    overflow: hidden;
    width: 0;
  }
  .guide-am-rise{
    left: 467px;
    top: 110px;
    overflow: hidden;
    width: 278px;
    z-index: 3;
  }
  .guide-am-rise-z{
    width: 419px;
  }
  .guide-am-rise-h{
    width: 699px
  }
  .guide-am{
    -webkit-transition: all .5s;
    transition: all .5s;
    position: absolute;
  }
  .guide-line-make{
    width: 0;
    overflow: hidden;
    height: 190px;
    background-color: rgba(9, 201, 137, 0.1);
    right: 40px;
    color: #09c989;
    top: 43px;
    font-size: 16px;
    line-height: 13.5;
  }
  .guide-am-make{
    width: 699px;
  }
  .guide-line-compensate{
    width: 0;
    overflow: hidden;
    height: 190px;
    background-color: rgba(242, 78, 77, 0.1);
    right: 40px;
    color: #f24e4d;
    top: 234px;
    line-height: 14.5;
  }
  .guide-line-boom{
    width: 0;
    overflow: hidden;
    height: 95px;
    background-color: rgba(255, 169, 0, 0.1);
    right: 40px;
    color: #ffa900;
    top: 329px;
  }
  .guide-am-boom{
    width: 699px;
    height: 95px;
    line-height: 7.5
  }
  .guide-am-compensat{
    width: 699px;
    height: 95px;
    line-height: 7.5
  }
  .guide-am-compensate{
    width: 699px;
  }
  .guide-line-problem{
    right: 40px;
    top: 45px;
    height: 79.1%;
    width: 0;
    overflow: hidden;
    z-index: 1;
    text-align: center;
    font-size: 50px;
    line-height: 7.5;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .guide-am-problem{
    width: 699px;
  }
  .guide-smail-text{
    font-size: 14px;
  }
  .page-guide{
    background-color: #262E36;
    top: 0;
    left:0;
    width: 100%;
    padding-bottom: 60px;
    min-height: 710px;
  }
  .guide-math{
    strong{
      background-color: #212121;
      display: inline-block;
      font-size: 18px;
      padding: 5px 10px;
    }
    b{
      display: block;
      color:#999;
      font-size: 14px;
    }
    span{
      display: inline-block;
      text-align: center;
      position: relative;
      top: 15px;
      &.guide-math-color{
        color:$primary;
        &:after{
          background: $primary;
        }
      }
      &:after{
        position: absolute;
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        top: 30px;
        background: #fff;
      }
    }
  }
  .guide-number-label{
    font-size: 18px;
    position: relative;
    &:after{
      content: 'BTC';
      font-size: 16px;
      position: absolute;
      left: -49px;
      top: 0;
      color: #999;
      line-height: 23px;
    }
  }
  .guide-number{
    width: 140px;
    line-height: 35px;
    height: 35px;
    border-radius: 8px;
    padding-left: 15px;
  }
  .guide-number-smail{
    font-size: 14px;
    color: #999999;
  }
  .guide-btn{
    min-width: 240px;
    height: 44px;
    line-height: 44px;
    display: inline-block;
    background: #09c989;
    border-radius: 3px;
    border: none;
    margin: 40px;
    cursor: pointer;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: 400;
    color: white;
    &.red{
      background:rgba(242,78,77,1);
    }
    &.yellow{
      background:$primary;
      color:#fff;
      font-size: 14px;
    }
  }
  .guide-line,.guide-text{
    text-align: center;
    position: relative;
  }
  .guide-back-btn{
    width: 320px;
    height: 40px;
    background: $primary;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    border: none;
    display: block;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 80px;
    font-size: 20px;
    line-height: 40px;
  }
  .guide-calc{
    text-align: left;
    width: 1050px;
    margin: 0 auto;
    font-size: 20px;
    position: relative;
    .guide-right-btn-yellow{
      width: 110px;
      height: 34px;
      background: $primary;
      border-radius: 3px;
      color: #fff;
      display: block;
      border: none;
      margin: 0 auto;
      margin-top: 10px;
      cursor: pointer;
    }
    .guide-right-dom{
      position: absolute;
      text-align: center;
      right:10px;
      top:20px;
      padding-top: 20px;
      .guide-btn{
        display: block;
        margin: 10px;
        width: 160px;
        height: 35px;
        line-height: 35px;
      }
    }
    .guide-right-btn{
        position: absolute;
        right: 0;
        top: 0;
        width: 101px;
        height: 135px;
        background: #09c989;
        border-radius: 3px;
        color: #fff;
        border: none;
        cursor: pointer;
        &.red{
          background:rgba(242,78,77,1);
        }
      span{
        display: block;
        margin-top: 10px;
        font-size: 12px;
      }
    }
  }
  .guide-three-footer{
    overflow: hidden;
    width: 1200px;
    margin: 0 auto;
    margin-top: 40px;
    li{
      float: left;
      width: 33.33%;
      height: 30px;
      background: rgba(30, 106, 109, 1);
      border-radius: 0px 20px 20px 0px;
      text-align: center;
      line-height: 30px;
      font-size: 15px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      position: relative;
      color: white;
      font-size: 12px;
      &.avtive{
        background:$primary;
      }
      &:after{
        position: absolute;
        border: 16px solid #262E36;
        content: '';
        display: block;
        width: 0px;
        top: 0;
        left: -16px;
        height: 0;
        border-radius: 30px;
        border-left-color: transparent;
        border-top-color: transparent;
        transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
      }
    }
  }
  .guide-text{
    font-size: 24px;
    font-weight: 500;
    line-height: 30px;
    padding-top: 20px;
    p{
      margin-top: 10px;
    }
    h1{
      padding-bottom: 10px;
    }
  }
  .guide-step{
    position: relative;
    color:#fff;
    top: 0px;
    .guide-back{
      display: block;
      margin: 20px auto;
      color:#fff;
      text-align: center;
      color:rgba(255,255,255,1);
      font-size: 16px;
      i{
        display: inline-block;
        width: 6px;
        height: 6px;
        border: 1.5px solid #ddd;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        border-left: none;
        border-bottom: none;
        position: relative;
        top: -3px;
      }
    }
    .guide-index-btn{
      width: 350px;
      height: 44px;
      background: $primary;
      border-radius: 3px;
      text-align: center;
      color: #fff;
      border: none;
      display: block;
      cursor: pointer;
      margin: 0 auto;
      font-size: 18px;
      margin-top: 270px;
      span{
        font-size: 12px;
      }
    }
    .guide-dialogue{
      display: inline-block;
      text-align: center;
      padding: 10px 20px;
      font-size: 20px;
      position: relative;
      margin-left: 65%;
      width:100px;
      height:28px;
      background: $primary;
      border-radius:3px;
      border-radius: 4px;
      &:after{
        position: absolute;
        content: '';
        display: block;
        left: 9px;
        bottom: -14px;
        width: 0;
        height: 0;
        border: 8px solid $primary;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
    }
    .guide-title{
      font-size: 52px;
      text-align: center;
      height: 52px;
      line-height: 52px;
      margin-bottom: 100px;
      margin-top: 20px;
    }
    li{
      -webkit-transition: all .5s;
      transition: all .5s;
      color:#fff;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: white;
      position: absolute;
      left: 0;
      right:0;
      bottom:0;
      top:50px;
      height: 40px;
      &.listAn:nth-child(1){
        font-size: 20px;
        opacity: 0.2;
        left: 430px;
        top: 195px;
      }
      &.listAn:nth-child(2){
        font-size: 32px;
        opacity: 0.2;
        right: 26%;
        top: 175px;
        left: auto;
      }
      &.listAn:nth-child(3){
        font-size: 32px;
        opacity: 0.8;
        left: 510px;
        top: 222px;
      }
      &.listAn:nth-child(4){
        font-size: 26px;
        opacity: 0.5;
        right: 668px;
        top: 270px;
        left: auto;
      }
      &.listAn:nth-child(5){
        font-size: 20px;
        opacity: 0.2;
        left: 60%;
        top: 300px;
      }
    }
  }
  .rise{
    &.guide-line-make{
      top:233px;
    }
    &.guide-line-compensate{
      top: 44px;
      &.guide-am-compensat{
        top: 140px;
      }
    }
    &.guide-line-boom{
      top: 44px;
    }
  }
  .guide-green-block{
    position: absolute;
    left: 456px;
    bottom: 249px;
    background-color: rgba(9, 201, 137, 0.5);
    width: 279px;
    color: #fff;
    text-align: right;
    padding-top: 90px;
    font-size: 16px;
    -webkit-transition: all .5s;
    transition: all .5s;
    opacity: 0
  }
  .guide-green-block-op1{
    opacity: 1
  }
  .guide-body{
    width: 1360px;
    display: block;
    margin: 50px auto;
    margin-top: 0;
    padding-top: 50px;
  }
  .guide-profit-number-5000 {
    position: absolute;
    left: 707px;
    color: #fff;
    font-size: 18px;
    top: 91px;
  }
  .guide-profit-number-4000 {
    position: absolute;
    left: 427px;
    color: #fff;
    font-size: 18px;
    top: 190px;
  }
  .guide-profit-number-3800 {
    position: absolute;
    left: 847px;
    color: #fff;
    font-size: 18px;
    top: 280px;
  }
  .guide-profit-number-3636 {
    position: absolute;
    left: 1127px;
    color: #fff;
    font-size: 18px;
    top: 355px;
  }

  .guide-profit-number-4200 {
    position: absolute;
    left: 707px;
    color: #fff;
    font-size: 18px;
    top: 156px;

  }

  .guide-profit-number-3800-1 {
    position: absolute;
    left: 844px;
    color: #fff;
    font-size: 18px;
    top: 251px;
  }
  .guide-up-step{
    position: absolute;
    top: 690px;
    background: none;
    border: none;
    border-radius: 50%;
    width: 40px;
    cursor: pointer;
    -webkit-transition: all .5s;
    transition: all .5s;
    height: 40px;
    z-index: 999;
    left: 180px;
    &:hover{
      background-color: #2f3941
    }
  }
  .guide-profit-number-4444 {
    position: absolute;
    left: 1127px;
    color: #fff;
    font-size: 18px;
    top: 121px;
  }

</style>
