<template>
  <div class="profile-container">
    <div class="title-box">{{ $t('profile_left_invite_safety') }}<span>{{ $t('secure_level') }}：
      <i v-if="secure_level <= 1">{{ $t('secure_level_0') }}</i>
      <i
        v-if="secure_level == 2"
        style="color:#C9A96C">{{ $t('secure_level_1') }}</i>
      <i
        v-if="secure_level == 3"
        style="color:#2FB883">{{ $t('secure_level_2') }}</i>
    </span></div>
    <div class="invinfo-box">
      <ul>
        <li :class="{pass: !!phone}">
          <div><span/><p>{{ $t('Phone_binding') }}</p></div>
          <div>{{ $t( !!phone ? 'Bindings' : 'No_Bindings') }}</div>
          <div>
            {{ phone }}
            <router-link
              v-if="phone"
              :to="{name: 'PhoneBind'}">{{ $t('modify') }}</router-link>
            <a
              v-if="phone"
              @click="closePhoneBind">{{ $t('close') }}</a>
            <router-link
              v-if="!phone"
              :to="{name: 'PhoneBind'}">{{ $t('to_bind') }}</router-link>
          </div>
        </li>
        <li :class="{pass: !!email}">
          <div><span/><p>{{ $t('email') }}</p></div>
          <div>{{ $t( !!email ? 'Bindings' : 'No_Bindings') }}</div>
          <div>
            {{ email }}
            <a
              v-if="email"
              @click="closeEmailBind">{{ $t('close') }}</a>
            <router-link
              v-if="!email"
              :to="{name: 'EmailBind'}">{{ $t('to_bind') }}</router-link>
          </div>
        </li>
        <li :class="{pass: !!google_key_bound}">
          <div><span/><p>{{ $t('google_validator') }}</p></div>
          <div>{{ $t( !!google_key_bound ? 'Bindings' : 'No_Bindings') }}</div>
          <div>
            <a
              v-if="google_key_bound"
              @click="closeGoogleBind">{{ $t('close') }}</a>
            <router-link
              v-if="!google_key_bound"
              :to="{name: 'GoogleBind'}">{{ $t('to_bind') }}</router-link>
          </div>
        </li>
        <li class="pass">
          <div><span/><p>{{ $t('log_pwd') }}</p></div>
          <div>{{ $t('settinged') }}</div>
          <div>
            <router-link :to="{name: 'ModPwd'}">{{ $t('modify') }}</router-link>
          </div>
        </li>
      </ul>
    </div>
    <verify-modal
      :open.sync="showModal"
      :code.sync="verifyCode"
      :hide-count-down="hideCountDown"
      :ensure-callback="modalEnsureCallback"
      :get-code-func="currentGetCodeFunc"/>
  </div>
</template>
<script>
import service from '@/modules/service'
import utils from '@/modules/utils'
import {state} from '@/modules/store'
import verifyModal from '@/components/common/verify-modal'

export default {
  data () {
    return {
      showModal: false,
      currentGetCodeFunc: () => {},
      modalEnsureCallback: () => {},
      verifyCode: '',
      hideCountDown: false,
      state
    }
  },
  components: {
    verifyModal
  },
  computed: {
    secure_level () {
      let secure_level_count = 0
      if (this.phone) { secure_level_count++ }
      if (this.email) { secure_level_count++ }
      if (this.google_key_bound) { secure_level_count++ }
      return secure_level_count
    },
    phone () {
      if (state.userInfo && state.userInfo.phone) {
        return utils.publicDesensitization(state.userInfo.phone)[0]
      }
      return ''
    },
    email () {
      if (state.userInfo && state.userInfo.email) {
        return utils.publicDesensitization(state.userInfo.email)[0]
      }
      return ''
    },
    google_key_bound () {
      if (state.userInfo && state.userInfo.google_key_bound) {
        return true
      }
      return false
    }

  },
  methods: {
    closePhoneBind () {
      this.showModal = !this.showModal
      this.currentGetCodeFunc = this.getCode4switchPhoneVerify
      this.modalEnsureCallback = this.ensureClosePhoneBind
    },
    closeEmailBind () {
      this.showModal = !this.showModal
      this.currentGetCodeFunc = this.getCode4switchEmailVerify
      this.modalEnsureCallback = this.ensureCloseEmailBind
    },
    closeGoogleBind () {
      this.showModal = !this.showModal
      this.hideCountDown = true
      this.currentGetCodeFunc = this.getCode4switchEmailVerify
      this.modalEnsureCallback = () => {
        let params = {
          verify_google: 1,
          google_code: this.verifyCode
        }
        service.switchBindAction(params).then(res => {
          console.log(res)
          if (res.code === 200) {
            utils.success(this.$i18n.t('already_closed'))
          } else {
            utils.alert(res.message || 'error')
          }
        }).finally(() => {
          this.showModal = false
          this.hideCountDown = false
          this.verifyCode = ''
        })
      }
    },
    getCode4switchEmailVerify () {
      return service.getCode4switchEmailVerify()
    },
    getCode4switchPhoneVerify () {
      return service.getCode4switchPhoneVerify()
    },
    ensureClosePhoneBind () {
      const params = {
        verify_phone: 1,
        phone_code: this.verifyCode
      }
      service.switchBindAction(params).then(res => {
        console.log(res, 'email res')
      })
    },
    ensureCloseEmailBind () {
      const params = {
        verify_email: 1,
        email_code: this.verifyCode
      }
      service.switchBindAction(params).then(res => {
        if (res.code === 200) {
          utils.success(this.$t('already_closed'))
        } else {
          utils.alert(res.message)
        }
        this.showModal = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
            float: right;
            font-weight: lighter;
            padding-right: 25px;
            i{
                color: #EB5757;
            }
        }
      }

.invinfo-box {
  width: 100%;
  ul{
      li{
          height: 60px;
          line-height: 60px;
          color: #666;
          border-bottom: 1px dashed #dcdcdc;
          div{
              float: left;
              a{
                  margin-left: 20px;
              }
              span{
                  display: block;
                  float: left;
                  width:22px;
                  height: 60px;
                  background-repeat: no-repeat;
                  background-position: left center;
                  background-image: url(../assets/pdg_a.png);
              }
              p{
                  float: left;
              }
              &:nth-child(1){
                  width: 25%;
              }
              &:nth-child(2){
                  width: 35%;
              }
              &:nth-child(3){
                  float: right;
                  padding-right: 25px;
              }
          }
          &.pass {
              div {
                  span{
                      background-image: url(../assets/pdg.png);
                  }
                  &:nth-child(2){
                      color: #2FB883;
                  }
              }
          }
      }
  }
}
</style>
