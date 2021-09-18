<template>
<div class="page-buynb" :class="bannerClass">
  <div class="buynb-content">
    <div class="box-main">
      <!-- 倒计时 + 抢购进度 -->
      <div class="box-show">
        <div class="boxBg box-countDowm">
          <i class="icon"></i>
          <span class="text">{{lang.pageStatus[page.status]}}:</span>
          <span class="time">{{hourString}}</span><span class="dian">:</span><span class="time">{{minuteString}}</span><span class="dian">:</span><span class="time">{{secondString}}</span>
        </div>

        <div class="boxBg box-progress">
          <div class="title">{{lang.quota}}</div>
          <div class="number">
            <span>{{amount[0]}}</span><span>{{amount[1]}}</span><span>{{amount[2]}}</span><i>,</i><span>{{amount[3]}}</span><span>{{amount[4]}}</span><span>{{amount[5]}}</span><em>NBZZ</em>
          </div>
          <div class="progress">
            <div class="title">{{lang.progress}}</div>
            <el-progress :percentage="progress" :text-inside="true"></el-progress>
          </div>
        </div>
      </div>

      <!-- 钱包 -->
      <div class="boxBg box-wallet">
        <div class="title">{{lang.wallet.title}}</div>
        <el-form ref="walletForm" :model="forms" :rules="rules" label-width="90px">
          <el-form-item :label="lang.wallet.amount">
            <el-input-number v-model="forms.amount" :controls="false" :min="100" :max="1000" @input="changeAmount" @blur="blurAmount"></el-input-number>
            <span class="currency">NBZZ</span>
          </el-form-item>
          <el-slider v-model="vslider" :marks="marks" @input="changeSlider"></el-slider>
          <el-form-item :label="lang.wallet.pay_amount">
            <el-input-number v-model="forms.pay_amount" placeholder="0.00" :controls="false" :precision="2" disabled></el-input-number>
            <span class="currency">USDT</span>
          </el-form-item>
          <div class="balance">
            <div>{{lang.wallet.Available}}：{{page.usdt_available}} USDT</div>
            <div class="transforms">
              <router-link style="margin-right: 22px" :to="''">{{$t('deposit')}}</router-link>
              <router-link :to="''">{{$t('suvbanean')}}</router-link>
            </div>
          </div>
          <el-button @click="buy" :disabled="page.status == 1 ? false : true">{{lang.wallet.btn[page.status]}}</el-button>
        </el-form>
      </div>
    </div>

    <div class="box-text">
      <div class="box" v-for="(item, index) in lang.text" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="content">
          <div v-for="(text, i) in item.content" :key="i+10">{{text}}</div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog :visible.sync="dialog" :close-on-click-modal="false">
    <div class="title" :class="dialogActive.class">{{dialogActive.title}}</div>
    <div class="content">{{dialogActive.content}}</div>
    <el-button @click="dialogBtn(dialogActive.type)">{{dialogActive.subTxt}}</el-button>
  </el-dialog>
</div>
</template>

<script>
import api from '@/modules/request'
import {state} from '@/modules/store'
import utils from '@/modules/utils'
import CountDowm from '@/mixins/CountDowm'
import Big from "big.js";

const Total = 625000;

export default {
  mixins: [CountDowm],
  data () {
    return {
      state,
      forms: {amount: 100, pay_amount: 100.00},
      rules: {},
      page: {},
      vslider: 0, marks: {0: '0%', 25: '25%', 50: '50%', 75: '75%', 100: '100%'},
      amount: 0, progress: 0,
      dialog: false, dialogActive: {},
      buyoff: true,

      dialogInfo: {
        succ: {
          title: '恭喜你，抢购成功！',
          content: '抢购结束后，您得到的配售额度将发放至您的账户，请查看。',
          subTxt: '确定', class: 'succ', type: 'succ'
        },
        fail: {title: '很遗憾，抢购失败…', content: '温馨提示：不要灰心，再试一次会有可能抢到哦。', subTxt: '继续试试', type: 'fail'},
        balance: {title: '提示', content: '温馨提示：余额不足', subTxt: '确定', type: 'balance'}
      }
    }
  },
  computed: {
    lang() {
      return this.$t('buy_nbzz');
    },
    userInfo() {
      return JSON.parse(utils.getStorageValue('user_info'));
    },
    bannerClass() {
      let cls = {};
      switch(this.state.locale) {
        case 'zh-HK': cls.fz = true; break;
        case 'ko': cls.ko = true; break;
        case 'en': cls.en = true; break;
      }
      return cls;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    dialogBtn(type) {
      switch(type) {
        case 'balance': this.dialog = false; break;
        case 'succ':
          this.getData();
          this.dialog = false;
          break;
      }
    },
    async buy() {
      if (this.forms.pay_amount > this.page.usdt_available) {
        this.dialogActive = this.dialogInfo.balance;
        this.dialog = true;
      }

      if (this.buyoff) {
        this.buyoff = false;
        const user_id = this.userInfo ? +this.userInfo.id : '';
        const res = await api.post('/future/activity/buy_wgt', {user_id, ...this.forms});

        if (res.code == 200) this.dialogActive = this.dialogInfo.succ;
        else this.dialogActive = this.dialogInfo.fail;

        this.dialog = true;
        this.buyoff = true;
      }
    },
    blurAmount() {
      if (!this.forms.amount) this.forms.amount = 100;
    },
    changeAmount(val) {
      if (val) this.vslider = parseInt(new Big(val).minus(100).div(9));
      else this.vslider = 0;
    },
    changeSlider(val) {
      const pro = 900 / 100;
      this.forms.amount = 100 + pro * val;
      this.forms.pay_amount = new Big(this.forms.amount).times(1);
    },
    async getData() {
      const user_id = this.userInfo ? +this.userInfo.id : '';
      const res = await api.get('/future/activity/wgt_info', {params: {user_id}});

      if (res.code == 200) {
        this.page = res.data;
        
        this.remainTime = this.page.end_time / 1000;
        this.countDowmInit();
        this.CountTotal();
      }
    },
    CountTotal() {
      if (!this.page.wgt_remaining_amount) {
        this.amount = '000000';
        return false;
      }

      const amount = this.page.wgt_remaining_amount + '';
      let str = '';

      switch(amount.length) {
        case 6: str = amount; break;
        case 5: str = '0' + amount; break;
        case 4: str = '00' + amount; break;
        case 3: str = '000' + amount; break;
        case 2: str = '0000' + amount; break;
        case 1: str = '00000' + amount; break;
      }

      this.amount = str.split('');
      this.progress = parseInt(new Big(this.page.executed).div(Total) * 100);
    }
  }
}
</script>


<style lang="scss">
.absolute{position: absolute; top: 0; left: 0; z-index: 9;}
.page-buynb{
  .el-progress-bar__outer{overflow:inherit;}
  .el-progress-bar__outer{background-color: #4e6072;}
  .el-progress-bar__inner{background-color: #19fcff;}
  .el-progress-bar__inner::after{position: absolute; top: -3px; right: -3px; width: 12px; height: 12px; border-radius: 50%; background: #19fcff;}
  .el-progress-bar__innerText{position: absolute; top: -20px; right: -20px; font-size: 16px;}
  
  .el-form-item__label{line-height: 55px; text-align: left; color: #fff;}
  .el-input__inner{height: 55px; border: none; text-align: left; color: #fff; background-color: #232f3b;}
  .el-input-number{width: 100%; padding-right: 70px; box-sizing: border-box;}
  .currency{position: absolute; top: 0; right: 0; width: 70px; height:55px; line-height: 55px; font-size: 16px; border-radius: 4px; background-color: #232f3b;}
  .el-input.is-disabled .el-input__inner{background-color: #232f3b;}
  .el-input-group__append{font-size: 16px; color: #fff; background-color: #232f3b; border: none;}
  .el-slider__runway{height: 4px; margin: 18px auto 46px; background-color: #4e6072;}
  .el-slider__bar{height: 4px; background-color: #19fcff;}
  .el-slider__stop{top: -3px; width: 10px; height: 10px; background-color: #19fcff;}
  .el-slider__button-wrapper{top: -16px;}
  .el-slider__button{width: 14px; height: 14px; border: none; background-color: #19fcff;}
  .el-slider__marks-text{
    color: #fff;
    &:nth-of-type(1){left: 1%!important;}
    &:nth-of-type(2){left: 26%!important;}
    &:nth-of-type(3){left: 51%!important;}
    &:nth-of-type(4){left: 76%!important;}
    &:nth-of-type(5){left: 98%!important;}
  }

  .el-dialog{
    width: 410px; height: 240px; padding: 0 50px; border-radius: 4px; background: #2a3743; text-align: center;
    .el-dialog__body{padding: 0; color: #bfcedd;}
    .title{margin-bottom: 32px; font-size: 18px;}
    .title.succ{color: #00ced1;}
    .content{line-height: 30px; margin-bottom: 32px; font-size: 14px; text-align: left;}
    .el-button{width: 100%; height: 46px; font-size: 16px; color: #fff; background: #00ced1; border: none;}
    // .el-dialog__header{display: none;}
  }
}
</style>

<style lang="scss" scoped>
.boxBg{background: #2a3743;}
.page-buynb{
  padding: 60px 0 80px; background: url(~@/assets/activity_nbzz/banner-zh.png) no-repeat center 30px, #0c1222;
  &.en{background-image: url(~@/assets/activity_nbzz/banner-en.png)}
  &.fz{background-image: url(~@/assets/activity_nbzz/banner-ft.png)}
  &.ko{background-image: url(~@/assets/activity_nbzz/banner-ko.png)}
}
.buynb-content{
  width: 1200px; margin: 0 auto; color:#CBE6FD;
  h2{color: #fff; font-size: 18px; line-height: 70px;}
  li{
    position: relative; line-height: 2; padding-left:30px;
    &:before{content: ''; position: absolute; left: 5px; top: 12px; width: 5px; height: 5px; border-radius: 5px; background: #CBE6FD;}
  }
}
.box-main{display: flex; justify-content: space-between; margin: 350px auto 60px;}
.box-show{width: 604px; margin-right: 37px;}
.box-wallet{width: 558px;}
.box-countDowm{
  height: 70px; line-height: 70px; padding: 20px 0; margin-bottom: 30px; font-size: 24px; color: #00ced1; text-align: center; border-radius: 5px;
  .icon{display: inline-block; width: 27px; height: 37px; margin-right: 15px; transform: translateY(10px); background: url(~@/assets/activity_nbzz/hot.png) no-repeat;}
  .text{margin-right: 25px; font-size: 18px; color: #fff;}
  .time{display: inline-block; padding: 0 16px; background: #232f3b;}
  .dian{margin: 0 18px;}
}
.box-progress{
  padding: 36px 27px 48px 36px; color: #fff; text-align: center; border-radius: 5px;
  .title{margin-bottom: 48px; font-size: 18px;}
  .number{
    display: flex; justify-content: space-between; height: 80px; line-height: 80px; margin-bottom: 75px; font-size: 28px;
    span{width: 58px; background: #232f3b;}
    i{transform: translateY(22px);}
    em{font-size: 16px; color: #4e6072;}
  }
  .progress{
    display: flex;
    .title{margin-right: 20px; margin-bottom: 0; font-size: 14px;}
  }
  .el-progress{width: 380px; line-height: 18px;}
}
.box-wallet{
  padding: 29px 44px 35px 47px; text-align: center; color: #fff;
  .title{margin-bottom: 38px; font-size: 18px;}
  .usdt{color: #19fcff;}
  .balance{display: flex; justify-content: space-between; margin: 10px auto 28px;}
  .el-button{width: 100%; padding: 18px 20px; font-size: 16px; color: #fff; background: #00ced1; border: none;}
  .el-button.is-disabled{background: #7b7b7b;}
}
.box-text{
  .box{margin-bottom: 30px;}
  .title{margin-bottom: 10px; font-size: 16px; color: #fff;}
  .content{line-height: 36px; font-size: 12px;}
}
</style>
