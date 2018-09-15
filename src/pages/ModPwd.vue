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
          v-model="form.password_orig"/>
      </el-form-item>
      <el-form-item
        prop="password_new"
        class="inp_box"
        :label="$t('change_password_new')">
        <el-input
          type="password"
          v-model="form.password_new"/>
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

export default {
  name: 'SafeVerified',
  components: {
    VBtn
  },
  data () {
    const validataPswRepeat = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$i18n.t('不能为空')))
      } else {
        if (value === this.form.password_new) {
          this.$refs.form.validateField('email')
        }
        callback(new Error(this.$t('change_password_diff')))
      }
    }
    return {
      loading: false,
      form: {},
      rules: {
        password_repeat: [
          { validator: validataPswRepeat, trigger: 'blur' }
        ],
        password_new: [
          { validator: validataPswRepeat, trigger: 'blur' }
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
    async changePassword () {
      let result = await service.changePassword()
    },
    submit () {

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
</style>
