<template>
  <div class="next-container">
    <div class="next-container-con">
      <h1> {{ $t('application_account') }} </h1>
      <p>{{ $t('application_tip') }}</p>
      <div class="error-msg"> {{ errorMsg }} </div>
      <div class="next-container-ipt" style="margin-top: 0" :class="{err: errorMsg}">
        <div class="ipt">
          <label class="tip" for="email"> {{ $t('application_ipt_email') }} </label>
          <input type="text" id="email" autocomplete="off" v-model="form.email" v-on:input="emailHandle">
          <div class="tips">
            <div class="tip-text">
              <p>{{ $t('application_email_tip_1') }}</p>
              <p>{{ $t('application_email_tip_2') }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="next-container-ipt">
        <div class="ipt">
          <label class="tip" for="name">{{ $t('realName') }}</label>
          <input type="text" id="name" autocomplete="off" :disabled="!emailFlag" v-model="form.name" name="name" v-on:input="realHandle">
        </div>
      </div>
      <div class="next-container-ipt">
        <div class="ipt">
          <div class="tip" for="region">{{$t('country')}}</div>
          <el-select v-model="form.region" :disabled="!emailFlag" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in regionData.data"
              :key="item.id"
              :label="lang === 'en' ? item.fullname : item.cname"
              :value="item.id">
            </el-option>
          </el-select>
<!--          <select id="region" autocomplete="off" :disabled="!emailFlag" v-model="form.region" name="region">-->
<!--            <option v-for="(item, index) in regionData.data" :key="index" :value="item.id">-->
<!--              <template v-if="lang === 'en'">{{ item.fullname }}</template>-->
<!--              <template v-else> {{ item.cname }} </template>-->
<!--            </option>-->
<!--          </select>-->
        </div>
      </div>
      <div  class="next-container-checked">
        <el-checkbox v-model="checked">
          <span class="true">{{ $t('application_check') }}</span>
          <a href="javascript:;">{{ $t('application_xy') }}</a>
        </el-checkbox>
      </div>
      <div class="next-container-btn" @click="nextHandle">
        <input type="button" :disabled="!checked" :value="this.$t('submit')">
      </div>
      <!-- <div class="register">
        <router-link to="/user/register/email">{{ $t('not') }}? <span>{{ $t('now') }}</span></router-link>
      </div> -->
    </div>
    <div class="submit-alert-mask" v-if="emailAlertFlag">
      <div class="submit-alert-container">
        <div class="close" @click="emailAlertFlag = false">
          <img src="../../assets/images/close.png" alt="" width="36" height="36">
        </div>
        <div class="title">
          {{ $t('s_email') }}
        </div>
        <div class="button" @click="emailAlertHandle">
          {{ $t('bd') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { regionData } from "../../lang/region"
  import service from '@/modules/service'
  import {state} from '@/modules/store'
  import qs from 'qs'
  export default {
    data() {
      return {
        checked: true,
        form: {
          'name': '',
          'uid': 0,
          'email': '',
          'region': '',
          'create_time': Date.parse(new Date()),
          'update_time': Date.parse(new Date())
        },
        emailAlertFlag: false,
        regionData,
        errorMsg: '',
        emailFlag: false
      }
    },
    computed: {
      lang() {
        return this.$route.query.lang
      },
      uid () {
        if (state.userInfo) {
          return state.userInfo.id
        }
        return ''
      }
    },
    methods: {
      nextHandle() {
        if(!this.form.email) {
          this.$message.error(this.$t('login_ph_pw'))
        } else if(!this.form.name) {
          this.$message.error(this.$t('kyc_name_err'))
        } else if(!this.form.email) {
          this.$message.error(this.$t('region_ph'))
        } else {
          service.proxyApply({
            uid: this.uid,
            email: this.form.email
          }).then((res) => {
            if (res.code === 0) {
              service.proxyApplyInsert(this.form).then((res) => {
                if (res.code === 0) {
                  this.$router.push('/planSuccess')
                } else {
                  this.$message.error(res.message)
                }
              })
            } else {
              if (res.code === 30015) {
                this.emailAlertFlag = true
              } else {
                this.$message.error(res.message)
              }
            }
          })
        }
      },
      emailAlertHandle() {
        this.$router.push('/profile/info')
      },
      emailHandle() {
        this.emailFlag = false
        var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,10}$/
        if (!email.test(this.form.email)) {
          this.errorMsg = this.$t('err_invalid_email')
          this.emailFlag = false
        } else {
          this.errorMsg = ''
          this.emailFlag = true
        }
      },
      realHandle() {
        if (!this.form.name) {
          this.errorMsg = this.$t('otc_kvcoc_9')
        } else {
          this.errorMsg = ''
        }
      }
    },
    created() {
      this.form.uid = Number(this.uid)
    }
  }
</script>
<style lang="scss">
  .next-container {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #323E4A;
    &-con {
      position: absolute;
      width: 448px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      overflow: hidden;
      h1 {
        font-size: 18px;
        color: #23CED0;
        margin-bottom: 20px;
      }
      p {
        font-size: 14px;
        color: #CBCBCB;
      }
    }
    &-ipt {
      width: 100%;
      /*overflow: hidden;*/
      position: relative;
      margin-top: 20px;
      &:first-child{
        margin-top: 0;
      }
      select {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        border: 0;
        background: transparent;
        border-bottom: 1px solid #fff;
        border-radius: 0;
        width: 100%;
        color: #fff;
        padding:6px 0;
      }
      input {
        outline: none;
        border: none;
        width: 100%;
        border-bottom: 1px solid #fff;
        background: transparent;
        height: inherit;
        padding:6px 0;
        transition: border-bottom-width .3s ease-in-out;
        color: #fff;
        border-radius: 0;
        &:focus {
          outline: none;
          box-shadow: none;
          border-color: #fff;
        }
        &::placeholder {
          color: #CBCBCB
        }
        &:focus + label {
          transform: translateY(-35px) scale(0.85);
        }
        option {
          color: #666;
        }
      }
      .el-select .el-input__inner:focus {
        border-color: #fff;
      }
      .el-input.is-disabled .el-input__inner {
        background: transparent;
      }
      .tip {
        font-size: 14px;
        color: #c4c5ca;
        transform-origin: top left;
        transition: all 0.3s ease-out;
        /*transform: perspective(300px);*/
        /*position: absolute;*/
        /*bottom: 20px;*/
        line-height: 14px;
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
        height: 48px;
        line-height: 48px;
        text-align: center;
        color: #fff;
        background-color: #23CED0;
        outline: none;
        border-color: transparent;
        font-size: 16px;
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
  }
  .mt0 {
    margin-top: 0;
  }
  .email {
    // margin-top: 20px;
    color: #23CED0
  }
  .error-msg {
    color: red;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding-top: 14px
  }
  .register {
    color: #fff;
    font-size: 13px;
    margin-top: 20px;
    text-align: right;
    a {
      color: #fff;
      text-decoration: none;
      span {
        color: #23CED0
      }
    }
  }
  .submit-alert-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, .6);
    .submit-alert-container {
      width: 376px;
      padding: 40px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      box-shadow: 0 8px 16px rgba(0,0,0,.8);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
      .close {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        img {
          zoom: 1
        }
      }
      .title {
        font-size: 18px;
        text-align: center;
      }
      .button {
        width:229px;
        height:40px;
        background:rgba(35,206,208,1);
        border-radius:5px;
        margin: 30px auto 0;
        text-align: center;
        line-height: 40px;
        color: #fff;
      }
    }
  }
</style>
