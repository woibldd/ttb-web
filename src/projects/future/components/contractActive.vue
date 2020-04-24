<template>
  <div class="contract-active-modal">
    <div class="m_title_new">
      {{ $t('contract.active.contract_title') }}
      <p>{{ $t('contract.active.contract_body') }}</p>
    </div>
    <div class="contract-switch">
      <ul><li :class="{'contract-active':problemType}"><span>1</span>{{ $t('contract.active.contract_answer') }}</li>
      <li :class="{'contract-active':!problemType}"><span>2</span>{{ $t('contract.active.contract_tips') }}</li></ul>
    </div>
    <div
      class="contract-problem"
      v-show="problemType">
      <div class="contract-problem-list">
        <h1>{{ $t('contract.active.problem_list1') }}<strong v-show="problemLstt[0] === 'false'|| !problemLstt[0] && !problemError">x</strong></h1>
        <span><input
          type="radio"
          value="false"
          v-model="problemLstt[0]"><label for="">{{ $t('contract.active.answer_list2_1') }}</label></span>
        <span><input
          type="radio"
          value="true"
          v-model="problemLstt[0]"><label for="">{{ $t('contract.active.answer_list2_2') }}</label></span>
      </div>
      <div class="contract-problem-list">
        <h1>{{ $t('contract.active.problem_list2') }}<strong v-show="problemLstt[1] === 'false'|| !problemLstt[1] && !problemError">x</strong></h1>
        <span><input
          type="radio"
          value="true"
          v-model="problemLstt[1]"><label for="">0.1</label></span>
        <span><input
          type="radio"
          value="false"
          v-model="problemLstt[1]"><label for="">1</label></span>
      </div>
      <div class="contract-problem-list">
        <h1>{{ $t('contract.active.problem_list3') }}<strong v-show="problemLstt[2] === 'false'|| !problemLstt[2] && !problemError">x</strong></h1>
        <span><input
          type="radio"
          value="true"
          v-model="problemLstt[2]"><label for="">{{ $t('contract.active.answer_list3_1') }}</label></span>
        <span><input
          type="radio"
          value="false"
          v-model="problemLstt[2]"><label for="">{{ $t('contract.active.answer_list3_2') }}</label></span>
      </div>
      <div class="contract-problem-list">
        <h1>{{ $t('contract.active.problem_list4') }}<strong v-show="problemLstt[3] === 'false'|| !problemLstt[3] && !problemError">x</strong></h1>
        <span><input
          type="radio"
          value="true"
          v-model="problemLstt[3]"><label for="">{{ $t('contract.active.answer_list4_1') }}</label></span>
        <span><input
          type="radio"
          value="false"
          v-model="problemLstt[3]"><label for="">{{ $t('contract.active.answer_list4_2') }}</label></span>
      </div>
      <div class="contract-problem-list">
        <h1>{{ $t('contract.active.problem_list5') }}<strong v-show="problemLstt[4] === 'false'|| !problemLstt[4] && !problemError">x</strong></h1>
        <span><input
          type="radio"
          value="false"
          v-model="problemLstt[4]"><label for="">{{ $t('contract.active.answer_list5_1') }}</label></span>
        <span><input
          type="radio"
          value="true"
          v-model="problemLstt[4]"><label for="">{{ $t('contract.active.answer_list5_2') }}</label></span>
      </div>
      <div class="contract-problem-list">
        <h1>{{ $t('contract.active.problem_list6') }}<strong v-show="problemLstt[5] === 'false'|| !problemLstt[5] && !problemError">x</strong></h1>
        <span><input
          type="radio"
          v-model="problemLstt[5]"
          value="true"><label for="">{{ $t('contract.active.answer_list6_1') }}</label></span>
        <span><input
          type="radio"
          v-model="problemLstt[5]"
          value="false"><label for="">{{ $t('contract.active.answer_list6_2') }}</label></span>
      </div>
      <div class="contract-problem-list">
        <h1>{{ $t('contract.active.problem_list7') }}<strong v-show="problemLstt[6] === 'false'|| !problemLstt[6] && !problemError">x</strong></h1>
        <span><input
          type="radio"
          v-model="problemLstt[6]"
          value="true"><label for="">{{ $t('contract.active.answer_list7_1') }}</label></span>
        <span><input
          type="radio"
          v-model="problemLstt[6]"
          value="false"><label for="">{{ $t('contract.active.answer_list7_2') }}</label></span>
      </div>
      <div class="contract-problem-list">
        <h1>{{ $t('contract.active.problem_list8') }}<strong v-show="problemLstt[7] === 'false'|| !problemLstt[7] && !problemError">x</strong></h1>
        <span><input
          type="radio"
          value="true"
          v-model="problemLstt[7]"><label for="">{{ $t('contract.active.answer_list8_1') }}</label></span>
        <span><input
          type="radio"
          value="false"
          v-model="problemLstt[7]"><label for="">{{ $t('contract.active.answer_list8_2') }}</label></span>
      </div>
      <div class="contract-eqcode">
        <img
          src="@/assets/ewm.png"
          alt="">
        <span>如有疑问，请联系 官方微信客服寻求 帮助</span>
      </div>
      <span
        class="contract-error"
        v-show="!problemError">{{ problemText }}</span>
      <el-button
        class="mt-25"
        type="primary"
        @click="downStep">
        {{ $t('contract.active.contract_submission') }}
      </el-button>
    </div>
    <div
      class="contract-problem"
      v-show="!problemType">
      <p
        class="m_detail"
        style="margin-top:50px">{{ $t('contract.active.contract_content1') }}</p>
      <p class="m_detail">{{ $t('contract.active.contract_content2') }}</p>
      <p class="m_detail">{{ $t('contract.active.contract_content3') }}</p>
      <p class="m_detail">{{ $t('contract.active.contract_content4') }}</p>
      <p class="m_detail">{{ $t('contract.active.contract_content5') }}</p>
      <p class="m_detail">{{ $t('contract.active.contract_content6') }}</p>
      <p class="m_detail">{{ $t('contract.active.contract_content7') }}</p>
      <p class="m_detail">{{ $t('contract.active.contract_content8') }}</p>
      <el-button
        class="mt-25"
        type="primary"
        @click="openContractAccount">
        {{ $t(state.isSimulation ? 'contract.active.contract_simulation_risk_known' : 'contract.active.contract_risk_known') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import {state} from '@/modules/store'
export default {
  data () {
    return {
      problemType: true,
      problemError: true,
      problemLstt: ['', '', '', '', '', '', '', ''],
      problemText: '',
      state
    }
  },
  methods: {
    downStep () {
      for (var i = 0; i < this.problemLstt.length; i++) {
        if (this.problemLstt[i] === '') {
          this.problemError = false
          this.problemText = this.$t('contract.active.answer_the_question')
          return false
        } else if (this.problemLstt[i] !== 'true') {
          this.problemError = false
          this.problemText = this.t('contract_error')
          return false
        } else {
          this.problemError = true
        }
      }
      if (this.problemError) {
        this.problemType = false
      }
    },
    openContractAccount () {
      service
        .activeContract('BTCUSD', this.state.isSimulation)
        .then(res => {
          if (!res.code) {
            if (res.data.state) {
              this.$message.success(this.$t('contract.active.contract_has_active'))
              this.$emit('close')
            }
            // this.$eh.$emit('protrade:balance:refresh')
          } else {
            this.$message.error(res.message)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .contract-active-modal {
    width: 800px;
    box-sizing: border-box;
    padding: 30px;
    .contract-eqcode{
      width: 100px;
      float: right;
      padding: 10px;
      line-height: 1.2;
      background: rgba(247,247,247,1);
      margin-top: -150px;
      color: rgba(201,170,109,1);
      font-size: 12px;
      img{
        width: 100%;
        display: block;
        margin-bottom: 10px;
      }
    }
    .contract-switch{
      overflow: hidden;
      display: block;
      height: 50px;
      text-align: center;
      ul{
        width: 500px;
        text-align: center;
        display: block;
        border-bottom: 1px solid #ddd;
        margin: 0 auto;
        margin-top: 20px;
        padding-bottom: 5px;
      }
      li{
        display: inline-block;
        width: 200px;
        &.contract-active{
          color:rgba(201, 170, 109, 1);
          position: relative;
          span{
            background-color: $--color-primary
          }
          &:after{
            content: '';
            position: absolute;
            bottom: -5px;
            left: 70px;
            display: block;
            height: 2px;
            background-color: $--color-primary;
            width: 60px;
          }
        }
        span{
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 20px;
          background-color: #999999;
          color: #fff;
          font-size: 12px;
          line-height: 22px;
          margin-right: 5px;
        }
      }
    }
    .m_title_new{
      font-size: 22px;
      display: block;
      text-align: center;
      p{
        font-size: 14px;
        margin-top: 20px;
        color:rgba(153,153,153,1);
      }
    }
    .contract-error{
      display: block;
      text-align: center;
      color:rgba(242, 78, 77, 1);
      margin-top: 10px;
      font-size: 12px;
    }
    .contract-problem {
      height: 600px;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .contract-problem-list {
        font-size: 14px;
        margin-top: 10px;
        padding: 0 10px;
        line-height: 1.5;
        color: rgba(33, 33, 33, 1);
        h1{
          margin-bottom: 10px;
          strong{
            width: 15px;
            height: 15px;
            background-color: #f24e4d;
            text-align: center;
            display: inline-block;
            color: #fff;
            border-radius: 20px;
            line-height: 15px;
            font-size: 12px;
          }
        }

        span{
          color:rgba(153, 153, 153, 1);
          display: block;
          position: relative;
          font-size: 12px;
          cursor: pointer;
          input{
            position: absolute;
            width: 100%;
            top:0;
            left:0;
            height: 100%;
            z-index: 1;
            opacity: 0;
          }
          input:checked+label{
            &:after{
              position: absolute;
              left: -23px;
              content: '';
              display: block;
              top: -1px;
              width: 6px;
              height: 6px;
              background-color: #fff;
              border-radius: 10px;
              border: 6px solid $--color-primary;
              color: #fff;
              text-align: center;
              font-size: 30px;
              line-height: 0.2;
            }
          }
          label{
            position: relative;
            top: -4px;
          }
          &:before{
            display: inline-block;
            content: '';
            width: 15px;
            height: 15px;
            border-radius: 20px;
            border: 1px solid #999999;
            margin-right: 5px;
          }
        }
    }
    @media screen and (max-height: 900px) {
      .contract-problem {
        height: 400px;
        overflow-x: hidden;
        overflow-y: scroll;
      }
    }
  }
</style>
