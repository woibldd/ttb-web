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
              <p class="api-oper">{{ $t('operation') }}</p>
            </li>
          </ul>
          <ul>
            <li>
              <p class="api-tit">1231231</p>
              <p class="api-key">6169e13*****</p>
              <p class="api-secret">3772ace*****</p>
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
      :open.sync="showModal"
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
        <div class="bot-prompt">
          <p>{{ $t('tips') }}</p>
          <p class="pro-txt">{{ $t('not_less') }} <br>
            {{ $t('t_minutes') }}<br>
            {{ $t('bq') }}<a>{{ $t('api_doc') }}</a>查看如何使用。</p>
        </div>
        <div class="modal__content">
          <v-btn
            class="w-340"
            @click="cofirmCreateApi"
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
          <button class="qx">{{ $t('cancel') }}</button>
          <button class="qr">{{ $t('confirm') }}</button>
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

export default {
  name: 'SafeVerified',
  components: {
    ProfileLeft,
    VBtn,
    service,
    vModal
  },
  data () {
    return {
      showModal: false,
      btnconfirm: false,
      apiKey: '',
      apiSecret: ''
    }
  },
  computed: {

  },
  methods: {
    deleteApi (api) {
      this.btnconfirm = true
      console.log('delete api')
    },
    changeApi (api) {
      this.showModal = true
      console.log('delete api')
    },
    createApi () {
      this.showModal = true
    },
    cofirmCreateApi () {
      const params = {}
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
    height: 500px;
    border-radius: 4px;
    padding-top: 16px;
    box-sizing: border-box;
    padding: 16px 40px 0 40px;
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
</style>
