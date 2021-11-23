<template>
  <div class="user-center-right mb-30">
    <div class="profile-container">
      <div class="title-box">
        {{ $t('api_management') }} 
      </div>
      <div class="api-box mb-30">
        <div class="api-ul">
          <ul class="tit">
            <li>
              <p class="api-tit">{{ $t('label') }}</p>
              <p class="api-key">API key</p>
              <p class="api-secret">API secret</p>
              <p class="api-oper">{{ $t('operation') }}</p>
            </li>
          </ul>
          <ul>
            <li
              v-for="api in apiList"
              :key="api.id">
              <p class="api-tit">{{ api.description || '-' }}</p>
              <p class="api-key">{{ api.api_key }}</p>
              <p class="api-secret">{{ api.api_secret }}</p>
              <p class="api-oper">
                <a @click="deleteApi(api)">{{ $t('delete') }}</a>
              </p>
            </li>
          </ul>
          <ul class="tit">
            <li v-if="apiList.length < 10">
              <span v-if="apiList.length === 0">{{ $t('no_keys') }}</span>
              <a @click.prevent="getVerifyCode">{{ $t('click_create') }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="api-tips">
        <div class="api-tips__lead"><span class="dot"/>{{ $t('note') }}</div>
        <div class="api-tips__row"><span v-html="$t('api_tips_one', {link: apiDoc})"/></div>
        <div class="api-tips__row">{{ $t('api_tips_two') }}</div>
        <!-- <div
          class="api-tips__row"
          v-html="$t('api_tips_three', {link: hasApiLink})"/> -->
        <div class="api-tips__row">{{ $t('api_tips_four') }}</div>
      </div>
    </div>
    <!-- 秘钥框 -->
    <v-modal
      :open.sync="showCreateModal"
      :backdrop="false"
    >
      <div class="api-alt-con">
        <div class="alt-title">{{ $t('new_key') }}</div>
        <p class="prompt">{{ $t('key_carefully') }}</p>
        <p class="inp-tit">API key</p>
        <div class="api-inp">
          <input
            type="text"
            disabled
            v-model="apiKey">
          <div
            class="copy"
            @click="copy(apiKey)">{{ $t('copy') }}</div>
        </div>
        <p class="inp-tit">API secret</p>
        <div class="api-inp">
          <input
            type="text"
            disabled
            v-model="apiSecret">
          <div
            class="copy"
            @click="copy(apiSecret)">{{ $t('copy') }}</div>
        </div>
        <div class="bot-prompt">
          <p>{{ $t('tips') }}</p>
          <p class="pro-txt">{{ $t('not_less') }} <br>
            <span v-html="$t('t_minutes')"/><br>
            {{ $t('bq') }}<a
              :href="apiDoc"
              target="_blank">{{ $t('api_doc') }}</a>{{ $t('see_api_doc') }}</p>
        </div>
        <div class="modal__content">
          <v-btn
            class="w-340"
            @click="showCreateModal=false"
            :label="$t('confirm')"/>
        </div>
      </div>
    </v-modal>
    <!-- 确认删除框 -->
    <v-modal
      :open.sync="btnconfirm"
      :backdrop="true"
    >
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
    <!-- 验证码框 -->
    <v-modal
      :open.sync="showVerifyModal"
      :backdrop="true"
    >
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
                  :start-when-loaded="showVerifyModal"
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
                  :start-when-loaded="showVerifyModal"
                  :send-code-func="getEmailVerifyCode"
                />
              </div>
            </div>
          </div>

          <div
            class="modal_phone"
          >
            <div class="modal__row mt-12 mb-25" >
              <div class="row__label mb-9">{{ $t('label') }}</div>
              <div class="row__input">
                <input
                  v-model="label"
                  maxlength="10"
                  class="input-validate google mr-14">
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
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import vModal from '@/components/VModal.vue'
import { state, actions } from '@/modules/store'
import utils from '@/modules/utils'
import countDown from '@/components/common/countdown-code-button'
import copyToClipboard from 'copy-to-clipboard'

export default {
  name: 'SafeVerified',
  components: { 
    VBtn,
    service,
    vModal,
    countDown
  },
  data () {
    return {
      showCreateModal: false,
      btnconfirm: false,
      apiKey: '',
      apiSecret: '',
      emailCode: '',
      phoneCode: '',
      googleCode: '',
      showVerifyModal: false,
      gotCode: '',
      deletingApi: {},
      apiList: [],
      label: '',
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
    email () {
      return this.userInfo && this.userInfo.email
    },
    verify_email () {
      return this.userInfo && this.state.userInfo.verify_email
    },
    verify_phone () {
      return this.userInfo && this.state.userInfo.verify_phone
    },
    verify_google () {
      return this.userInfo && this.state.userInfo.verify_google
    },
    apiDoc () {
      return this.state.theme.apiDoc[this.state.locale || 'en']
    },
    robotUsageUrl () {
      return this.state.locale === 'zh-CN'
        ? 'https://ixcustomer.zendesk.com/hc/zh-cn/articles/360018094072'
        : 'https://ixcustomer.zendesk.com/hc/en-us/articles/360018094072'
    },
    openApi () {
      return this.userInfo.api === 1
    },
    hasApiLink () {
      let link = 'https://ixcustomer.zendesk.com/hc/zh-cn/articles/360017842952'
      if (this.state.locale === 'en') {
        link = link.replace('zh-cn', 'en-us')
      }
      return link
    },
    hasNoApiLink () {
      let link = 'https://ixcustomer.zendesk.com/hc/zh-cn/articles/360017842952'
      if (this.state.locale === 'en') {
        link = link.replace('zh-cn', 'en-us')
      }
      return link
    }
  },
  created () {
    this.getProfileApiList()
    // 获取列表后服务端会更新session状态，需要重新拉取session
    actions.updateSession()
  },
  methods: {
    copy (key) {
      copyToClipboard(key)
      utils.success(this.$i18n.t('copyed'))
    },
    getProfileApiList () {
      service.getProfileApi().then(resp => {
        console.log(resp, 'all api list')
        if (resp.code) {
          utils.alert(resp.message)
        } else {
          if (resp.data && resp.data.length) {
            this.apiList = resp.data.map(item => {
              item.api_key = utils.publicDesensitization(item.api_key, 10)[0]
              item.api_secret = utils.publicDesensitization(item.api_secret, 10)[0]
              return item
            })
          } else {
            this.apiList = []
          }
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
    getVerifyCode () {
      this.showVerifyModal = true
    },
    keyPress ($event) {
      // let code = $event.srcElement.value
      // if (code && code.length === 6 && /^\d{6}$/.test(code)) {
      //   this.verifyCode()
      // }
    },
    /**
     * 提交数据
     */
    async verifyCode (type) {
      let verifyObj = null

      if (this.verify_google) {
        verifyObj = {
          google_code: this.googleCode
        }
        this.gotCode = this.googleCode
      } else if (this.verify_phone) {
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
      verifyObj.description = this.label || ''

      if (!this.gotCode) {
        utils.alert(this.$i18n.t('err_captcha_empty'))
        return
      }
      let res = await service.createProfileApi(verifyObj)
      if (!res.code) {
        this.getProfileApiList()
        this.apiKey = res.data.api_key
        this.apiSecret = res.data.api_secret
        this.showVerifyModal = false
        this.showCreateModal = true
      } else {
        utils.alert(res.message)
      }
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
    getEmailVerifyCode () {
      if (!this.email || !this.showVerifyModal) {
        return
      }
      const param = {
        email: this.email
      }
      service.getProfileApiCode(param, true).then(resp => {
        if (resp.code) {
          utils.alert(resp.message)
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
          this.getProfileApiList()
          utils.success('删除成功')
        }
      }).finally(() => {
        this.btnconfirm = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .user-center-right {
    float: left;
    margin-left: 29px;
    width: 954px;
    .profile-container { 
      position: relative; 
      .title-box {
        width: 100%;
        height: 40px;
        font-size: 18px;
        font-weight: 600;
        color: $text-strong;
        border-bottom: 1px solid #e6e6e6; 
        .tips {
          font-size:16px;
          font-weight:400;
          color:#999999;
          display: flex;
        }
      }
      .api-box{
        max-height: 500px;
        overflow-y: scroll;
        width: 100%;
        font-size: 14px;
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
                width: 18%;
                @include limit(1);
                text-align: left;
              }
              &.api-key{
                width: 28%;
                @include limit(1);
                text-align: left;
              }
              &.api-secret{
                width: 28%;
                @include limit(1);
                text-align: left;
              }
              &.api-oper{
                width: 16%;
                text-align: right;
              }
              a{
                color: $primary-hover
              }
            }
          }
          &.tit{
            color: #999;
          }
        }
      }
      .api-tips__lead{
          color: #666;
          font-size: 12px;
          // height: 17px;
          line-height: 30px;
          display: flex;
          align-items: center;

          .dot {
            width:6px;
            height:6px;
            background:rgba(194,163,104,1);
            border-radius:50%;
            margin-right: 6px;
            display: inline-block;
          }
      }
      .api-tips__row {
          color:#999999;
          font-size: 12px;
          font-weight: 400;
          line-height: 24px;
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
      display: flex;
      justify-content: space-between;
      padding-right: 20px;

      input {
          flex: 1;
          border: 0;
      }

      .copy {
          color: $primary;
          font-size: 16px;
          display: flex;
          align-items: center;
          cursor: pointer;
      }
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
          border: 1px solid $primary-hover;
          color: $primary-hover;
          background: none;
        }
        &.qr{
          background: $primary-hover;
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
