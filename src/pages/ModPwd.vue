<template>
  <div class="profile-container">
    <div class="title-box">{{ $t('profile_left_invite_safety') }}<span>{{ $t('change_password') }}</span></div>
    <el-form
      class="invinfo-box"
      ref="form"
      :rules="rules"
      label-position="left"
      :model="form"
      label-width="104px">
      <el-form-item
        prop="password_orig"
        class="inp_box"
        :label="$t('change_password_orig')">
        <el-input
          type="password"
          v-model="form.password_orig"/>
      </el-form-item>
      <el-form-item
        prop="password_new"
        class="inp_box"
        :label="$t('change_password_new')">
        <el-input
          type="password"
          @input="pwChange"
          @focus="focus"
          @blur="blur"
          v-model="form.password_new"/>
        <div class="pw-helps" :class="{show: atPw}">
            <div class="title" v-t="'pwcheck_guide'"></div>
            <ul class="pw-checks">
            <li v-for="(check, index) in pwCheckList"
                class="pw-check" :key="index">
                <span class="pw-state" :class="{pass: check.pass}"></span>
                <span class="desc">{{ $t(check.desc) }}</span>
            </li>
            </ul>
        </div>
      </el-form-item>
      <el-form-item
        prop="password_repeat"
        class="inp_box"
        :label="$t('change_password_repeat')">
        <el-input
          type="password"
          v-model="form.password_repeat"/>
      </el-form-item>
      <el-form-item class="inp_box">
        <v-btn
          class="submit-btn"
          :label="$t('modify')"
          :loading="loading"
          @click="submit"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import pwChecker from '@/modules/pw-checker'

export default {
  name: 'SafeVerified',
  components: {
    VBtn
  },
  data () {
    const validataPswRepeat = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$i18n.t('err_empty_password')))
      } else {
        if (value !== this.form.password_new) {
          return callback(new Error(this.$t('change_password_diff')))
        }
      }
      return callback()
    }
    const validataPswStrong = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$i18n.t('err_empty_password')))
      } 
      const pwCheckList = pwChecker.getState(value)
      if (_.filter(pwCheckList, r => r.pass).length < 4) {
        return callback(new Error(this.$i18n.t('err_weak_password')))
      }
      callback()
    }
    return {
      loading: false,
      form: {},
      atPw: false,
      pwCheckList: pwChecker.getState(''),
      rules: {
        password_repeat: [
          { validator: validataPswRepeat, trigger: 'blur' }
        ],
        password_new: [
          { validator: validataPswStrong, trigger: 'change' }
        ],
        password_orig: [
          { required: true, message: this.$i18n.t('不能为空'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    
  },
  methods: {
    async submit () {
      if (this.form.password_new == this.form.password_repeat) {
        let params = {
          old_password: this.form.password_orig,
          new_password: this.form.password_new
        }
        let result = await service.changePassword(params)
        if (result && !result.code) {
          this.$router.push({
            name: 'Safety'
          })
        } else {
          utils.alert(result.message)
        }
      } else {
        console.log('error submit!!');
        return false;
      }
    },
    pwChange () {
      this.pwCheckList = pwChecker.getState(this.form.password_new || '')
    },
    focus () {
      this.atPw = true
    },
    blur () {
      this.atPw = false
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../styles/vars";
  @import '../styles/mixins';

  .user-center-right {
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
        }
      }
    }
  }
  .pw-helps {
    border-radius: 3px;
    position: absolute;
    right: -229px;
    transform: translateX(10px);
    top: 0;
    width: 216px;
    min-height: 160px;
    color: #000;
    background-color: white;
    box-sizing: border-box;
    padding: 16px;
    font-size: 12px;
    opacity: 0;
    transition: visibility 300ms 300ms, transform 300ms, opacity 300ms;
    &.show {
        opacity: 1;
        transition: visibility 300ms, transform 300ms, opacity 300ms;
        right: -223px;
        transform: translateX(0);
        visibility: visible;
    }
    .pw-state {
        width: 20px;
        height: 20px;
        margin-right: 4px;
        background-color: white;
        border: 1px solid #979797;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        border-radius: 2px;
        transition: background-color 300ms;
        &.pass {
        @include bg-retina('../assets/check', 'png', 12px, 9px);
        width: 20px;
        height: 20px;
        border: 1px solid $primary;
        background-color: $primary;
        }
    }
    .title {
        margin-bottom: 10px;
        font-weight: bold;
    }
    .desc {
        width: 160px;
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        line-height: 20px;
        white-space: normal;
    }
    .pw-check {
        font-size: 0;
        white-space: nowrap;
        margin-bottom: 4px;
    }
}
</style>
