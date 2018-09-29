<template>
  <div class="user-center-right">
    <div class="profile-container">
      <div class="title-box">{{ $t('api_management') }}</div>
      <div class="api-box">
        <div class="api-ul">
          <ul class="tit">
            <li>
              <p class="api-tit">{{ $t('label') }}</p>
              <p class="api-key">API_key</p>
              <p class="api-secret">API_secret</p>
              <p class="api-oper">{{ $t('create_time') }}</p>
              <p class="api-oper">{{ $t('operation') }}</p>
            </li>
          </ul>
          <ul>
            <li
              v-for="api in apiList"
              :key="api.id">
              <p class="api-tit">{{ api.description }}</p>
              <p class="api-key">{{ api.api_key }}p>
              </p><p class="api-secret">{{ api.api_secret }}</p>
              <p class="api-secret">{{ api.create_time }}</p>
              <p class="api-oper">
                <a @click="deleteApi">{{ $t('delete') }}</a>
              </p>
            </li>
          </ul>
          <ul class="tit">
            <li>
              {{ $t('no_keys') }}<a @click.prevent="createApi">{{ $t('click_create') }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <v-modal
      :open.sync="showCreateModal"
      :backdrop="false"
      @click="hideModal">
      <div class="api-alt-con">
        <div class="alt-title">{{ $t('new_key') }}</div>
        <p class="prompt">{{ $t('key_carefully') }}</p>
        <p class="inp-tit">API key</p>
        <input
          type="text"
          class="api-inp"
          v-model="apiKey">
        <p class="inp-tit">API secret</p>
        <input
          type="text"
          class="api-inp"
          v-model="apiSecret">
        <p class="inp-tit">{{ $t('captcha') }}</p>
        <input
          type="text"
          class="api-inp"
          @click="getVerifyCode"
          readonly
          v-model="gotCode">
        <div class="bot-prompt">
          <p>{{ $t('tips') }}</p>
          <p class="pro-txt">{{ $t('not_less') }} <br>
            {{ $t('t_minutes') }}<br>
            {{ $t('bq') }}<a>{{ $t('api_doc') }}</a>查看如何使用。</p>
        </div>
        <div class="modal__content">
          <v-btn
            class="w-340"
            @click="confirmCreateApi"
            :label="$t('confirm')"/>
        </div>
      </div>
    </v-modal>
    <v-modal
      :open.sync="btnconfirm"
      :backdrop="false"
      @click="hideModal">
      <div class="api-alt-oper">
        <p class="api-oper-tit">{{ $t('confirm_deletion') }}</p>
        <p class="api-oper-txt">{{ $t('stopped_after') }}</p>
        <div class="api-alt-but">
          <button
            class="qx"
            @click="hideDeleteModal">{{ $t('cancel') }}</button>
          <button
            class="qr"
            @click="confirmDeleteProfileApi">{{ $t('confirm') }}</button>
        </div>
      </div>
    </v-modal>
    <v-modal
      :open.sync="showVerifyModal"
      :backdrop="false"
      @click="hideVerifyModal">
      <div class="ensure-modal">
        <div class="modal__title mb-30">{{ $t('security_verification') }}</div>
        <div class="modal__content">
          <div
            class="modal__row mt-12 mb-25"
            v-if="verify_google">
            <div class="row__label mb-9">{{ $t('fa2_google_code_mobile') }}</div>
            <div class="row__input" >
              <input
                v-model="googleCode"
                @input="keyPress"
                v-focus
                maxlength="6"
                @keydown.enter.stop.prevent="verifyCode"
                class="input-validate google mr-14">
            </div>
          </div>
          <div
            class="modal_phone"
            v-else-if="verify_phone">
            <div class="modal__row" >
              <div class="row__label mb-9">{{ $t('register_by_phone') }}</div>
              <div class="row__input" >{{ phone }} </div>
            </div>
            <div class="modal__row mt-12 mb-25">
              <div class="row__label mb-9">{{ $t('phone_code') }}</div>
              <div class="row__input" >
                <input
                  v-model="phoneCode"
                  @input="keyPress"
                  maxlength="6"
                  @keydown.enter.stop.prevent="verifyCode"
                  class="input-validate mr-14">
                <count-down
                  :send-text="$t('hq_send')"
                  :start-when-loaded="showCreateModal"
                  :send-code-func="getPhoneVerifyCode"
                />
              </div>
            </div>
          </div>
          <div
            class="modal_phone"
            v-else-if="verify_email">
            <div class="modal__row" >
              <div class="row__label mb-9">{{ $t('register_by_email') }}</div>
              <div class="row__input" >{{ email }} </div>
            </div>
            <div class="modal__row mt-12 mb-25">
              <div class="row__label mb-9">{{ $t('email_code') }}</div>
              <div class="row__input" >
                <input
                  v-model="emailCode"
                  @input="keyPress"
                  maxlength="6"
                  @keydown.enter.stop.prevent="verifyCode"
                  class="input-validate mr-14">
                <count-down
                  :send-text="$t('hq_send')"
                  :start-when-loaded="showCreateModal"
                  :send-code-func="getEmailVerifyCode"
                />
              </div>
            </div>
          </div>

          <v-btn
            class="w-340"
            @click="verifyCode"
            :label="$t('confirm')"/>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
import ProfileLeft from './ProfileLeft'
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import vModal from '@/components/VModal.vue'
import { state } from '@/modules/store'
import utils from '@/modules/utils'
import countDown from '@/components/common/countdown-code-button'

export default {
  name: 'SafeVerified',
  components: {
    ProfileLeft,
    VBtn,
    service,
    vModal,
    countDown
  },
  data () {
    return {
      verifyObj: {},
      showCreateModal: false,
      btnconfirm: false,
      apiKey: '',
      apiSecret: '',
      phoneCode: '',
      showVerifyModal: false,
      gotCode: '',
      deletingApi: {},
      apiList: [],
      state
    }
  },
  computed: {
    userInfo () {
      return this.state.userInfo || {}
    },
    phone () {
      return this.userInfo.phone
    },
    regionId () {
      return this.userInfo.region
    },
    verify_email () {
      return this.userInfo && this.state.userInfo.verify_email
    },
    verify_phone () {
      return this.userInfo && this.state.userInfo.verify_phone
    },
    verify_google () {
      return this.userInfo && this.state.userInfo.verify_google
    }
  },
  created () {
    this.getProfileApiList()
  },
  methods: {
    getProfileApiList () {
      service.getProfileApi().then(resp => {
        console.log(resp, 'all api list')
        if (resp.code) {
          utils.alert(resp.message)
        } else {
          this.apiList = resp.data
        }
      })
    },
    deleteApi (api) {
      this.btnconfirm = true
      this.deletingApi = api
    },
    // changeApi (api) {
    //   this.showCreateModal = true
    //   console.log('delete api')
    // },
    createApi () {
      this.showCreateModal = true
      console.log('点击创建, creatAPI')
    },
    getVerifyCode () {
      this.showVerifyModal = true
      const params = this.verifyObj
      console.log('confirm create api', params)
    },
    hideModal () {

    },
    hideVerifyModal () {
      this.showVerifyModal = false
    },
    keyPress ($event) {
      let code = $event.srcElement.value
      if (code && code.length === 6 && /^\d{6}$/.test(code)) {
        this.verifyCode()
      }
    },
    verifyCode (type) {
      let verifyObj = {}

      if (this.google_key_bound) {
        verifyObj = {
          google_code: this.googleCode
        }
        this.gotCode = this.googleCode
      } else if (this.phone) {
        verifyObj = {
          phone_code: this.phoneCode
        }
        this.gotCode = this.phoneCode
      } else {
        verifyObj = {
          email_code: this.emailCode
        }
        this.gotCode = this.emailCode
      }
      this.verifyObj = verifyObj
      this.showVerifyModal = false
    },
    getPhoneVerifyCode () {
      if (!this.regionId || !this.phone || !this.showVerifyModal) {
        return
      }
      const param = {
        region: this.regionId,
        phone: this.phone
      }
      service.getProfileApiCode(param).then(resp => {
        if (resp.code) {
          utils.alert(resp.message)
        }
      })
    },
    confirmCreateApi () {
      const param = this.verifyObj
      service.createProfileApi(param).then(resp => {
        if (resp.code) {
          utils.alert(resp.message)
        } else {
          utils.success('新建成功')
        }
      })
    },
    hideDeleteModal () {
      this.btnconfirm = false
    },
    confirmDeleteProfileApi () {
      const param = {
        id: this.deletingApi.id
      }
      service.deleteProfileApi(param).then(resp => {
        if (resp.code) {
          utils.alert(resp.message)
        } else {
          utils.success('新建成功')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../styles/vars";
  @import '../styles/mixins';
  .user-center-right {
    padding-left: 60px;
    float: left;
    .profile-container {
      width: 960px;
      position: relative;

      .title-box {
        width: 100%;
        height: 40px;
        font-size: 18px;
        font-weight: 600;
        color: $text-strong;
        border-bottom: 1px solid #e6e6e6;
        span{
          color: #999;
          font-size: 14px;
          padding-left: 15px;
          font-weight: lighter;
        }
      }
      .api-box{
        height: auto;
        width: 100%;
        color: 14px;
        color: #999;
        ul{
          color: #333;
          li{
            overflow: hidden;
            line-height: 60px;
            border-bottom: 1px dotted #ccc;
            text-align: center;
            p{
              float: left;
              &.api-tit{
                width: 28%;
                text-align: left;
              }
              &.api-key{
                width: 28%;
                text-align: left;
              }
              &.api-secret{
                width: 28%;
                text-align: left;
              }
              &.api-oper{
                width: 16%;
                text-align: center;
              }
              a{
                color: #C1A538
              }
            }
          }
          &.tit{
            color: #999;
          }
        }
      }
    }
  }
  .api-alt-con{
    width: 680px;
    border-radius: 4px;
    padding-top: 16px;
    box-sizing: border-box;
    padding: 44px 40px 44px 40px;
    .alt-title {
      font-size:20px;
      font-weight:bold;
      line-height: 50px;
      color:$text-strong;
      text-align: center;
    }
    .prompt{
      font-size: 14px;
      color: #EB5757;
      line-height: 40px;
      position: relative;
      padding-left: 24px;
      &::after{
        left: 0;
        top: 50%;
        width: 18px;
        height: 18px;
        content: "!";
        display: block;
        margin-top: -9px;
        line-height: 18px;
        position: absolute;
        text-align: center;
        border-radius: 10px;
        background: #EB5757;
        color: #fff;
      }
    }
    .inp-tit{
      line-height: 45px;
      font-weight: bold;
      font-size: 14px;
      color: #333;
    }
    .api-inp{
      width: 100%;
      height: 40px;
      color: #333;
      border-radius: 4px;
      padding-left: 14px;
      box-sizing: border-box;
      border: 1px solid #ccc;
    }
    .bot-prompt{
      color: #999;
      font-size: 12px;
      margin-top: 12px;
      line-height: 24px;
      .pro-txt{
        padding-left: 15px;
        position: relative;
        &::after{
          left: 0;
          top: 9px;
          width: 4px;
          content: "";
          height: 4px;
          display: block;
          border-radius: 4px;
          background: #999;
          position: absolute;
        }
      }
    }
    .modal__content{
      width: 120px;
      margin: 18px auto 0 auto;
    }
  }
  .api-alt-oper{
    width: 340px;
    padding: 24px;
    box-sizing: border-box;
    .api-oper-tit{
      height: 40px;
      line-height: 40px;
      font-weight: bold;
      font-size: 16px;
      padding-left: 28px;
      position: relative;
      &::after{
        position: absolute;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        border-radius: 18px;
        background: #EB5757;
        content: "!";
        color: #fff;
        font-size: 12px;
        left: 0;
        top: 50%;
        margin-top: -9px;
      }
    }
    .api-oper-txt{
      font-size: 14px;
      line-height: 22px;
      margin-top: 8px;
      color: #333;
    }
    .api-alt-but{
      display: table;
      float: right;
      width: auto;
      margin-top: 16px;
      margin-bottom: 26px;
      button{
        float: left;
        width: auto;
        height: 28px;
        display: block;
        font-size: 14px;
        padding: 0 10px;
        margin-left: 21px;
        border-radius: 4px;
        box-sizing: border-box;
        &.qx{
          border: 1px solid #C1A538;
          color: #C1A538;
          background: none;
        }
        &.qr{
          background: #C1A538;
          color: #fff;
          border: none;
        }
      }
    }
  }
  .none{
    display: none;
  }
  .ensure-modal {
  width:541px;
  background:rgba(255,255,255,1);
  border-radius:8px;
  padding-bottom: 50px;
  padding-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .modal__title {
      font-size:20px;
      font-weight:bold;
      color:$text-strong;
  }
  .modal__row {
      box-sizing: border-box;
      .row__label {
          font-size:14px;
          font-weight:400;
          color:$text-weak;
      }
      .row__input {
          box-sizing: border-box;
          border: 1px solid $text-normal;
          width: 340px;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          color: $text-weak;
          padding-left: 10px;
      }
      .input-validate {
          width: 220px;
          border: 0;
          border-right: 1px solid $text-normal;

          &.google {
              border: 0;
          }

          &:focus{
              outline: none;
          }
      }

  }
  .w-340 {
      width: 340px;
  }

    }
</style>
