<template>
      <div class="profile-container">
        <div class="title-box">{{ $t('identity_authentication') }}<span>{{ $t('Verified') }}</span></div>
        <div class="invinfo-box">
          <div class="authen_top">
              <i class=""></i>
              <p class="yy">
                  {{$t('identity_authentication1')}}
              </p>
              <p class="">
                  {{$t('kyc_upload')}}
              </p>
              <p>
                  {{$t('kyc_complete')}}
              </p>
              <i></i>
          </div>
          <el-form
            class="form"
            ref="form"
            :rules="rules"
            label-position="left"
            :model="form"
            label-width="104px">
            <el-form-item
              prop="name"
              class="inp_box"
              :label="$t('name')">
              <el-input
                v-model="form.name"/>
            </el-form-item>
            <el-form-item
              class="inp_box"
              :label="$t('kyc_id_type')">
              <el-select v-model="form.id_type">
                <el-option
                  :label="$t('kyc_idcard')"
                  :value="1"/>
                <el-option
                  :label="$t('kyc_passport')"
                  :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="id_number"
              class="inp_box"
              :label="$t('kyc_idcard')">
              <el-input v-model="form.id_number"/>
            </el-form-item>
            <el-form-item class="inp_box">
              <v-btn
                class="submit-btn"
                :label="$t('sub')"
                :loading="loading"
                @click="submit"/>
            </el-form-item>
          </el-form>
        </div>
      </div>
</template>

<script>
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import utils from '@/modules/utils'
import {state, actions} from '@/modules/store'

export default {
  name: 'SafeVerified',
  components: {
    VBtn
  },
  data () {
    let validationFunc = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$i18n.t('kyc_ph_id')))
      }
      if (this.form.id_type === 1) {
        if (!/^[1-9]\d{5}(18|19|2([0-9]))\d{2}(0[0-9]|10|11|12)([0-2][1-9]|30|31)\d{3}[0-9Xx]$/.test(value)) {
          callback(new Error(this.$i18n.t('kyc_id_no_err')))
        }
      } else {
        if (!/^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/.test(value)) {
          callback(new Error(this.$i18n.t('kyc_passport_err')))
        }
      }
      callback()
    }
    return {
      state,
      loading: false,
      form: {
        name: '',
        id_type: 1,
        id_number: ''
      },
      rules: {
        name: [
          { required: true, message: this.$i18n.t('kyc_name_err'), trigger: 'blur' }
        ],
        id_number: [
          { validator: validationFunc, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {

  },
  async beforeRouteEnter(to, from, next) {
    let result = await actions.updateSession()
    if (state.userInfo.kyc) {
      if (state.userInfo.kyc === 1) {
        next({name: 'KycStep2'})
      }
    }

    next()
  },
  methods: {
    async submit () {
      this.$refs['form'].validate(async (valid) => {
        if (!valid) return
        let params = {
          name: this.form.name,
          id_type: this.form.id_type,
          id_number: this.form.id_number
        }
        let result = await service.updateKyc1(params)
        if (result) {
          if (!result.code) {
            utils.alert(result.message)
          }
          await actions.updateSession()
          this.$router.push({
            name: 'KycStep2'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../styles/vars";
  @import '../../../styles/mixins';

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
    width: 960px;
    margin: 20px auto;
    .form {
      width: 445px;
      margin: 50px auto;
    }
    div.inp_box{
        width:100%;
        height: 40px;
        position: relative;

        .el-select{
            width: 100%;
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
  .authen_top{
    width: 100%;
    height: 30px;
    padding: 5px 0;
    margin-bottom: 40px;
    box-sizing: border-box;
    position: relative;
    p{
        width: 90px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        text-indent: 25px;
        position: absolute;
        text-align: center;
        background: #fff;
        &:before{
        content: "";
        width: 20px;
        height: 20px;
        line-height: 20px;
        display: block;
        border-radius: 10px;
        position: absolute;
        left: 6px;
        text-indent: 0;
        background: #B6B6B6;
        color: #fff;
        font-size: 14px;
        }
        &:nth-child(2){
            left: 0;
        &:before{
            content: "1";
        }
        }
        &:nth-child(3){
            left: 50%;
            margin-left: -45px;
        &:before{
            content: "2";
        }
        }
        &:nth-child(4){
            right: 0;
        &:before{
            content: "3";
        }
        }
        &.yy{
          color: #C1A538;
          &:before{
            background: #C1A538;
          }
        }
    }
    i{
        width: 50%;
        height: 2px;
        background: #ccc;
        display: block;
        float: left;
        margin-top: 9px;
        &.jd{
            background: #C1A538;
        }
    }
  }
  .el-form-item__label {
      color: $text-weak
  }
</style>
