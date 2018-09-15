<template>
  <div style="page-invite-wrap">
    <div class="user-center-right safe-verified-container">
      <div class="profile-container">
        <div class="title-box">{{ $t('identity_authentication') }}<span>{{ $t('Verified') }}</span></div>
        <el-form
          class="invinfo-box"
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
            prop="kyc_idcard"
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
  </div>
</template>

<script>
import ProfileLeft from './ProfileLeft'
import service from '@/modules/service'
import VBtn from '@/components/VBtn'

export default {
  name: 'SafeVerified',
  components: {
    ProfileLeft,
    VBtn
  },
  data () {
    return {
      loading: false,
      form: {
        name: '',
        id_type: 1,
        id_number: ''
      },
      rules: {
        name: [
          { required: true, message: this.$i18n.t('不能为空'), trigger: 'blur' }
        ],
        kyc_idcard: [
          { required: true, message: this.$i18n.t('不能为空'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  methods: {
    async submit () {
      let params = {
        name: this.form.name,
        id_type: this.form.id_type,
        id_number: this.form.id_number
      }
      let result = await service.updateKyc1(params)
      if (result) {
        this.$router.push({
          name: 'ProfileInfo'
        })
      }
    }
  }
}
</script>
<style lang="scss">
  @import "../styles/vars";
  @import '../styles/mixins';

  .user-center-right.safe-verified-container{
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

      .el-form-item__label {
          color: $text-weak
      }
    }

    // 隐藏form的必填标志
    .el-form-item.is-required>.el-form-item__label:before {
        display: none
    }
  }
</style>
