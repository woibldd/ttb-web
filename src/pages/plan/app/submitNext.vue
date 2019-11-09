<template>
  <div class="submit-container-h5">
    <div class="submit-container-h5-con">
      <h1> {{ $t('submit_success') }} </h1>
      <p>{{ $t('submit_tip_1') }}</p>
      <em>{{ $t('submit_tip_2') }}</em>
      <div class="submit-container-h5-ipt">
        <div class="ipt">
          <input type="text" disabled="disabled" value="support@ixx.com">
        </div>
      </div>
      <div class="chart-container">
        <dl>
          <dt>{{ $t('news') }}</dt>
          <dd><a href="https://www.instagram.com/ixxexchange" target="_blank"></a></dd>
          <dd><a href="https://www.facebook.com/profile.php?id=100040054419479" target="_blank"></a></dd>
          <dd><a href="https://twitter.com/IXX_Official" target="_blank"></a></dd>
        </dl>
      </div>
      <div class="next-container-btn" @click="nextHandle">
        <input type="button" :value="this.$t('back')">
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {actions} from '@/modules/store'
  export default {
    data() {
      return {
        data: {
          checked: false,
          email: ''
        }
      }
    },
    methods: {
      nextHandle() {
        this.$router.push({
          path: '/'
        })
      }
    },
    mounted () {
      window.switchLang = actions.setLocale
    }
  }
</script>
<style lang="scss">
  .submit-container-h5 {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #323E4A;
    &-con {
      position: absolute;
      width: 84%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      overflow: hidden;
      h1 {
        font-size: 17px;
        color: #23CED0;
        margin-bottom: 20px;
        padding-left: 40px;
        position: relative;
        &:after {
          content: '';
          width: 30px;
          height: 30px;
          position: absolute;
          left: 0;
          top: -.12rem;
          background: url("../../../assets/img/agent/trye.png") center center no-repeat;
          background-size: 70%;
        }
      }
      p {
        font-size: 14px;
        color: #CBCBCB;
      }
      em {
        font-style: normal;
        padding-top: 20px;
        display: block;
        font-size: 13px;
        line-height: 1.5;
      }
    }
    &-ipt {
      width: 100%;
      /*overflow: hidden;*/
      position: relative;
      margin-top: 10px;
      input {
        outline: none;
        border: none;
        width: 100%;
        border-bottom: 1px solid #fff;
        background: transparent;
        height: inherit;
        padding:12px 0 12px 20px;
        color: #23CED0;
        font-size: 16px;
        [placeholder] {
          color: #CBCBCB
        }
      }
      .tips {
        width: 30px;
        height: 30px;
        background: url("../../../assets/images/PC/question.png") center center no-repeat;
        position: absolute;
        right: 10px;
        top: 0;
        &:hover {
          .tip-text {
            display: block;
            opacity: 1;
          }
        }
      }
      .tip-text {
        width: 270px;
        position: absolute;
        right: -20px;
        top: -68px;
        background:rgba(255,255,255,0.22);
        padding: 10px;
        z-index: 999;
        opacity: 0;
        display: none;
        transition: all .3s ease-in;
      }
    }
    &-checked {
      padding: 20px 0;
      color: #fff!important;
      .true {
        color: #fff;
      }
      a {
        color: #23CED0;
        text-decoration: none;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #23CED0;
        border-color: #23CED0;
      }
    }
    .next-container-btn {
      input {
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #fff;
        background-color: #23CED0;
        outline: none;
        border-color: transparent;
        font-size: 14px;
        cursor: pointer;
        &:disabled {
          background: #6F6F6F;
          color: #fff;
        }
      }
    }
    .next-tip {
      font-size: 14px;
      text-align: right;
      margin-top: 14px;
      a {
        padding-left: 10px;
        color: #23CED0
      }
    }
    .chart-container {
      dt {
        margin-top: .24rem;
        font-size: .24rem;
      }
      dd {
        width: 40px;
        height: 40px;
        float: left;
        margin-right: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
        background: url("../../../assets/images/PC/Twitter.png") center center no-repeat;
        a {
          height: 40px;
          display: block;
        }
        &:nth-child(2) {
          background: url("../../../assets/images/PC/instagram.png") center center no-repeat;
        }
        &:nth-child(3) {
          background: url("../../../assets/images/PC/web-Facebook.png") center center no-repeat;
        }
      }
    }
  }
</style>
