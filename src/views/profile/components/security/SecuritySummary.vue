<template>
  <div class="profile-container">
    <div class="title-box" flex="main:justify">
      <div class="title-left">
        <div class="title-label">{{ $t('profile_left_invite_safety') }}</div> 
        <div class="title-sub mt-15" flex="main:left">
          <label flex="cross:center"> <img src="@/assets/profile/security-state-true.png" alt="" class="mr-6"> 双重验证 </label>
          <label flex="cross:center" class="ml-20"> <img src="@/assets/profile/security-state-false.png" alt="" class="mr-6"> 身份认证 </label>
        </div>
      </div>
      <div class="title-right">
        <span>
          <img src="@/assets/profile/security-safely.png" alt="">
          <!-- {{ $t('secure_level') }}： -->
          <i v-if="secure_level <= 1" style="background-color: #EB5757;">{{ $t('secure_level_0') }}</i>
          <i v-if="secure_level == 2" style="background-color:#01CED1">{{ $t('secure_level_1') }}</i>
          <i v-if="secure_level == 3" style="background-color:#2FB883">{{ $t('secure_level_2') }}</i>
        </span>
      </div>
    </div>
    <div class="invinfo-box">
      <ul>
        <li :class="{pass: !!phone}">
          <div class="invinfo-grid">   
            <div class="invinfo-icon">
              <img src="@/assets/profile/binding-phone.png" alt="" />
            </div>
             <p>{{ $t('Phone_binding') }}</p>
             <div>保护您的交易和账户安全</div>
          </div>
          <div flex="cross:center">
            <span v-if="!phone">
              <img src="@/assets/profile/security-state-false.png" alt="" class="mr-6">
               {{ $t('No_Bindings') }}
            </span>
            <span v-else>
              <img src="@/assets/profile/security-state-true.png" alt="" class="mr-6">
              <!-- {{ $t('Bindings') }} -->
              {{ phone }}
            </span>
            <!-- {{ $t( !!phone ? 'Bindings' : 'No_Bindings') }} -->
          </div>
          <div class="option" flex="main:right cross:center">
            <template v-if="!phone">
              <router-link
                :to="{name: 'PhoneBind'}">{{ $t('to_bind') }}</router-link>
            </template>
            <template v-else>
              <a
                v-if="verify_phone"
                @click="switchPhoneBind">{{ $t('close_verify') }}</a>
              <a
                v-if="!verify_phone && phone"
                @click="switchPhoneBind">{{ $t('open_verify') }}</a> 
            </template>
          </div>
        </li>
        <li :class="{pass: !!email}">
          <div class="invinfo-grid">
            <div class="invinfo-icon">
              <img src="@/assets/profile/binding-email.png" alt="" />
            </div>
             <div>{{ $t('email') }}</div>
             <div>保护您的交易和账户安全</div>
          </div>
          <div flex="cross:center"> 
            <span v-if="!email">
              <img src="@/assets/profile/security-state-false.png" alt="" class="mr-6">
               {{ $t('No_Bindings') }}
            </span>
            <span v-else>
              <img src="@/assets/profile/security-state-true.png" alt="" class="mr-6">
              <!-- {{ $t('Bindings') }} -->
              {{ email }}
            </span> 
          </div>
          <div class="option" flex="main:right cross:center">
            
            <a
              v-if="verify_email"
              @click="switchEmailBind">{{ $t('close_verify') }}</a>
            <a
              v-if="!verify_email && email"
              @click="switchEmailBind">{{ $t('open_verify') }}</a>
            <router-link
              v-if="!email"
              :to="{name: 'EmailBind'}">{{ $t('to_bind') }}</router-link>
          </div>
        </li>
        <li :class="{pass: !!google_key_bound}">
          <div class="invinfo-grid">   
            <div class="invinfo-icon">
              <img src="@/assets/profile/binding-google.png" alt="" />
            </div>
            <p>{{ $t('google_validator') }}</p>
            <div>保护您的交易和账户安全</div>  
          </div>
          <div flex="cross:center"> 
            <span v-if="!google_key_bound">
              <img src="@/assets/profile/security-state-false.png" alt="" class="mr-6">
               {{ $t('No_Bindings') }}
            </span>
            <span v-else>
              <img src="@/assets/profile/security-state-true.png" alt="" class="mr-6">
              {{ $t('Bindings') }}
            </span>  
          </div>
          <div class="option" flex="main:right cross:center">
            <template v-if="!google_key_bound">
              <router-link
                :to="{name: 'GoogleBind'}">{{ $t('to_bind') }}</router-link>
            </template>
            <template v-else>
              <a
                v-if="verify_google || !verify_google"
                @click="resetHandle">{{ $t('google_reset') }}</a>
              <a
                v-if="verify_google"
                @click="switchGoogleBind">{{ $t('close_verify') }}</a>
              <a
                v-if="!verify_google && google_key_bound"
                @click="switchGoogleBind">{{ $t('open_verify') }}</a>
            </template>
          </div>
        </li>
        <li class="pass"> 
          <div class="invinfo-grid">   
            <div class="invinfo-icon">
              <img src="@/assets/profile/binding-password.png" alt="" />
            </div>
            <p>{{ $t('log_pwd') }}</p>
            <div>保护您的交易和账户安全</div>  
          </div> 
          <div flex="cross:center"> 
            <span  flex="cross:center">
              <img src="@/assets/profile/security-state-true.png" alt="" class="mr-6">
              {{ $t('settinged') }}
            </span>  
          </div>
          <div class="option" flex="main:right cross:center">
            <router-link :to="{name: 'ModPwd'}">{{ $t('modify') }}</router-link>
            <em
              style="color: #999"
              v-if="google_key_bound && !verify_google">{{ $t('google_login') }}</em>
            <em
              style="color: #999"
              v-else-if="!google_key_bound">{{ $t('google_login') }}</em>
            <template v-else>
              <a
                v-if="verify_login_google"
                @click="switchLoginGoogleBind">{{ $t('google_login') }}</a>
              <a
                v-if="!verify_login_google"
                @click="switchLoginGoogleBind">{{ $t('google_turn_off') }}</a>
            </template>
          </div>
        </li>
      </ul>
    </div>
    <verify-modal
      :open.sync="showModal"
      :code.sync="form"
      :google="googleFlag"
      :hide-count-down="hideCountDown"
      :open-or-close="openOrClose"
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
        // 1 已开启 0 已关闭
        openOrClose: true,
        currentGetCodeFunc: () => {},
        modalEnsureCallback: () => {},
        form: {
          verifyCode: '',
          google_code: ''
        },
        hideCountDown: false,
        googleFlag: false,
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
      },
      verify_phone () {
        if (state.userInfo && state.userInfo.verify_phone && this.phone) {
          return true
        }
        return false
      },
      verify_email () {
        if (state.userInfo && state.userInfo.verify_email && this.email) {
          return true
        }
        return false
      },
      verify_login_google () {
        if (state.userInfo && state.userInfo.verify_login_google === 0) {
          return true
        }
        return false
      },
      verify_google () {
        if (state.userInfo && state.userInfo.verify_google && this.google_key_bound) {
          return true
        }
        return false
      },
      verify_type () {
        let type = ''
        if (this.verify_phone) {
          type = 'phone'
        } else if (this.verify_email) {
          type = 'email'
        }
        return type
      }

    },
    methods: {
      resetHandle () {
        this.$router.push({
          name: 'GoogleBind',
          query: {
            reset: 1
          }
        })
      },
      switchPhoneBind () {
        if (this.verify_phone && !this.verify_email) {
          utils.alert(this.$t('profile.security.close_verify_tips'))
          return
        }
        this.googleFlag = this.verify_google
        this.showModal = !this.showModal
        this.openOrClose = this.verify_phone
        this.hideCountDown = false
        this.currentGetCodeFunc = this.getCode4switchPhoneVerify
        this.modalEnsureCallback = this.ensureSwitchPhoneBind
        this.form = {}
      },
      switchEmailBind () {
        if (!this.verify_phone && this.verify_email) {
          utils.alert(this.$t('profile.security.close_verify_tips'))
          return
        }
        this.googleFlag = this.verify_google
        this.showModal = !this.showModal
        this.openOrClose = this.verify_email
        this.hideCountDown = false
        this.currentGetCodeFunc = this.getCode4switchEmailVerify
        this.modalEnsureCallback = this.ensureSwitchEmailBind
        this.form = {}
      },
      switchLoginGoogleBind () {
        this.googleFlag = true
        this.showModal = !this.showModal
        this.openOrClose = !this.verify_login_google
        this.hideCountDown = true
        this.currentGetCodeFunc = this.getCode4switchEmailVerify
        this.modalEnsureCallback = () => {
          let params = {
            verify_login_google: state.userInfo.verify_login_google === 0 ? 1 : 0,
            google_code: this.form.code
          }
          service.switchBindAction(params).then(res => {
            if (!res.code) {
              utils.success(this.$i18n.t(res.data.verify_login_google === 0 ? 'already_closed' : 'already_open'))
              this.state.userInfo.verify_login_google = res.data.verify_login_google
              this.form = {}
            } else {
              utils.alert(res.message || 'error')
            }
          }).finally(() => {
            this.showModal = false
            this.hideCountDown = false
          })
        }
      },
      switchGoogleBind () {
        this.googleFlag = true
        this.showModal = !this.showModal
        this.hideCountDown = false
        if (this.verify_type === 'email') {
          this.currentGetCodeFunc = this.getCode4switchEmailVerify
          this.modalEnsureCallback = this.ensureSwitchEmailBind
          this.openOrClose = this.verify_google
        } else {
          this.currentGetCodeFunc = this.getCode4switchPhoneVerify
          this.modalEnsureCallback = this.ensureSwitchPhoneBind
          this.openOrClose = this.verify_google
        }
        this.modalEnsureCallback = () => { 
          let query = {}
          if (this.verify_type === 'phone') {
            query = {
              phone_code: this.form.code
            }
          } else {
            query = {
              email_code: this.form.code
            }
          }
          let params = {
            verify_google: this.verify_google ? 0 : 1,
            google_code: this.form.google_code,
            ...query
          }
          service.switchBindAction(params).then(res => {
            if (!res.code) {
              utils.success(this.$i18n.t(this.verify_google ? 'already_closed' : 'already_open'))
              this.state.userInfo.verify_google = this.verify_google ? 0 : 1
              this.state.userInfo.verify_login_google = this.state.userInfo.verify_google
              this.form = {}
            } else {
              utils.alert(res.message || 'error')
            }
          }).finally(() => {
            this.showModal = false
            this.hideCountDown = false
          })
        }
      },
      async getCode4switchEmailVerify () {
        let res = await service.getCode4switchEmailVerify()
        if (res.code) {
          utils.alert(res.message)
        }
      },
      async getCode4switchPhoneVerify () {
        let res = await service.getCode4switchPhoneVerify()
        if (res.code) {
          utils.alert(res.message)
        }
      },
      ensureSwitchPhoneBind () {
        const params = {
          verify_phone: this.verify_phone ? 0 : 1,
          phone_code: this.form.code,
          google_code: this.form.google_code
        }
        service.switchBindAction(params).then(res => {
          if (!res.code) {
            utils.success(this.$i18n.t(this.verify_phone ? 'already_closed' : 'already_open'))
            this.showModal = false
            this.state.userInfo.verify_phone = this.verify_phone ? 0 : 1
            this.form = {}
          } else {
            utils.alert(res.message)
          }
        })
      },
      ensureSwitchEmailBind () {
        const params = {
          verify_email: this.verify_email ? 0 : 1,
          email_code: this.form.code,
          google_code: this.form.google_code
        }
        service.switchBindAction(params).then(res => {
          if (!res.code) {
            utils.success(this.$i18n.t(this.verify_email ? 'already_closed' : 'already_open'))
            this.showModal = false
            this.state.userInfo.verify_email = this.verify_email ? 0 : 1
            this.form = {}
          } else {
            utils.alert(res.message)
          }
        })
      }
    },
    created () {
      if (window.localStorage.getItem('refere') === true) {
        window.location.reload()
        window.localStorage.setItem('refere', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title-box {
    width: 100%;
    height: 90px;
    font-size: 18px;
    font-weight: 600;
    color: $text-strong;
    // border-bottom: 1px solid #e6e6e6;
    span{
      color: #999;
      font-size: 14px;
      float: right;
      font-weight: lighter;
      // padding-right: 25px;
      i{
        color: #EB5757;
      }
    }
    .title-left {
      .title-sub {
        label {
          font-size: 12px;
          font-weight: 400;
        }
      } 
    }
    .title-right {
      position: relative;
      i {
        position:absolute;
        bottom: 18px;
        right: -5px;
        background-color: red;
        color: #fff; 
        border-radius: 20px;
        height: 15px;
        width: 15px;
        line-height: 15px;
      }
    }
  }

  .invinfo-box {
    padding: 0 28px;  
    border: 1px solid #eaeaea;
    border-radius: 6px; 
    .invinfo-grid {
      display: grid;
      align-content: center;
      grid-template-columns: 50px 1fr;
      .invinfo-icon {
        display: grid;
        grid-row-start: 1;
        grid-row-end: 3;
        align-items: center;
      }
    }
    ul{
      li{
        display: grid;
        grid-template-columns: 460px 166px 1fr;
        height: 91px;
        // line-height: 91px;
        color: #666;
        border-bottom: 1px solid #dcdcdc;
        &:last-child {
          border: none;
        }
        div{
          // float: left;
          a{
            margin-left: 20px;
          }
          span{
            display: flex;
            align-items: center;
            // float: left;
            // width:22px;
            // height: 60px;
            // background-repeat: no-repeat;
            // background-position: left center;
            // background-image: url(../assets/pdg_a.png);
          }
          p{
            // float: left;
          } 
          &.option{
            text-align: right; 
          }
        }
        &.pass {
          div {
            // span{
            //   background-image: url(../assets/pdg.png);
            // }
            &:nth-child(2){
              color: #2FB883;
            }
          }
        }
      }
    }
  }
</style>
