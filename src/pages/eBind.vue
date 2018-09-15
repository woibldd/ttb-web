<template>
  <div class="profile-container">
    <div class="title-box">{{ $t('profile_left_invite_safety') }}<span>{{ $t('email_binding') }}</span></div>
    <el-form
      class="invinfo-box"
      ref="form"
      :rules="rules"
      label-position="left"
      :model="form"
      label-width="104px">
      <el-form-item
        prop="email"
        class="inp_box"
        :label="$t('register_by_email')">
        <el-input
          v-model="form.email"/>
      </el-form-item>
      <el-form-item
        prop="code"
        class="inp_box"
        :label="$t('email_code')">
        <div class="inp_cox">
          <el-input
            v-model="form.code"/>
          <countdown-code-button
            :send-text="$t('hq_send')"
            :validation="validation"
            :send-code-func="sendCode"/>
        </div>
      </el-form-item>
      <el-form-item class="inp_box">
        <v-btn
          class="submit-btn"
          :label="$t('bind')"
          :loading="loading"
          @click="submit"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import countdownCodeButton from '@/components/common/countdown-code-button'
import utils from '@/modules/utils'

export default {
  name: 'SafeVerified',
  components: {
    VBtn,
    countdownCodeButton
  },
  data () {
    const validataEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$i18n.t('不能为空')))
      } else {
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          this.$refs.form.validateField('email')
        }
        callback(new Error(this.$t('err_invalid_email')))
      }
    }
    return {
      form: {
        email: '',
        code: ''
      },
      loading: false,
      rules: {
        email: [
          { validator: validataEmail, trigger: 'blur' }
        ],
        code: [
          { required: true, message: this.$i18n.t('不能为空'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  methods: {
    validation () {
      if (!this.form.email) {
        return false
      }
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
        return false
      }
      return true
    },
    sendCode () {
      return service.bindEmailCode({email: this.email})
    },
    async submit () {
      let params = {
        email: this.form.email,
        code: this.form.code
      }
      let result = await service.bindEmail(params)
      if (!result.code) {
        this.$router.push({
          name: 'ProfileInfo'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../styles/vars";
  @import '../styles/mixins';

  .user-center-right {
    // padding-left: 60px;
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
            color: #666;
            font-size: 18px;
            font-weight: lighter;
            padding-left: 10px;
            i{
                color: #EB5757;
            }
            &:before{
                content: ">";
                color: #333;
                font-size: 18px;
                margin-right: 10px;
            }
        }
      }
      .invinfo-box {
        width: 445px;
        margin: 50px auto;
        div.inp_box{
            width:100%;
            height: 40px;
            margin-bottom: 30px;
            position: relative;
            p{
                float: left;
                width: 104px;
                height: 40px;
                line-height: 40px;
                color: #999;
            }
            input{
                display: block;
                width: 340px;
                height: 40px;
                float: left;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                border-radius: 4px;
                border:none;
            }
            .submit-btn{
                width: 340px;
                height: 40px;
            }
            span.tips{
                display: block;
                width: 300px;
                height: 30px;
                line-height: 20px;
                position: absolute;
                left: 104px;
                top: 40px;
                font-size: 10px;
                color: #EB5757;
            }
            .inp_cox{
                width: 340px;
                float: left;
                height: 40px;
                border-radius: 4px;
                box-sizing: border-box;
                position: relative;
                a{
                    height: 38px;
                    line-height: 38px;
                    width: 100px;
                    text-align: center;
                    display: block;
                    position: absolute;
                    right: 0;
                    top: 0;
                    &:before{
                        content: "";
                        width: 1px;
                        height: 20px;
                        background: $c;
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        margin-top: -10px;
                    }
                }
                input{
                    padding-left: 35px;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    padding-left:15px;
                }
            }
        }
      }
    }
  }
</style>
