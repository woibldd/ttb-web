<template>
  <div class="profile-container">
    <div class="title-box">{{ $t('identity_authentication') }}<span>{{ $t('Verified') }}</span></div>
    <div class="invinfo-box">
      <div class="authen_top">
        <i class=""/>
        <p class="yy">
          {{ $t('kyc_top_authen_1') }}
        </p>
        <p class="">
          {{ $t('kyc_top_authen_2') }}
        </p>
      </div>
      <div class="invinfo-content" v-if="step===1">
        <div class="option-title">
          <h3>
            <i>1</i>
            <span>{{ $t('kyc_title_info') }}</span>
            <label>{{ $t('kyc_title_state_padding')}}</label>
          </h3>
        </div>
        <el-form
          class="form"
          ref="form"
          :rules="rules"
          label-position="left"
          :model="form"
          label-width="104px">

          <el-form-item
            prop="nationality"
            class="inp_box"
            :label="$t('kyc_form_nationality')">
            <v-loading
              v-if="!regionOptions.length"
              color="gray"/>
            <el-select v-model="form.regionId" filterable>
              <el-option
                v-for="option in regionOptions"
                :value="option.id"
                :label="state.locale === 'zh-CN' ? option.cname : option.fullname "
                :key="option.id">
              </el-option>
            </el-select>
          </el-form-item>
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
            :label="$t('kyc_cf_id')">
            <el-input v-model="form.id_number"/>
          </el-form-item>
          <el-form-item class="inp_box">
            <v-btn
              class="submit-btn"
              :label="$t('提交认证')"
              :loading="loading"
              @click="submit"/>
          </el-form-item>
        </el-form>
      </div>
      <div class="invinfo-content" v-if="step===2">
        <div class="option-title">
          <h3>
            <icon name="true" />
            <span>1级认证完成</span>
          </h3>
        </div>
        <div class="option-notice">
          <p class="notice">
            {{ $t('kyc_notice_1')}}
          </p>
          <p class="notice">
            {{ $t('kyc_notice_2')}}
          </p>
        </div>
        <div class="option-button">
          <router-link
            class=" mr-22 router-btn light"
            to="/profile/kyc/kyc_step2"> {{ $t('kyc_to_kyc2') }}</router-link>
          <router-link
            class=" mr-22 router-btn"
            :to="{ name:'trading'}"> {{ $t('trading') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import utils from '@/modules/utils'
import {state, actions} from '@/modules/store'
let kycInfo = {};
export default {
  data() {
    let validationFunc = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$i18n.t('kyc_ph_id')))
      }
      if (this.form.id_type === 1 && this.form.regionId === 86) {

        if (!/^[1-9]\d{5}(18|19|2([0-9]))\d{2}(0[0-9]|10|11|12)([0-2][0-9]|30|31)\d{3}[0-9Xx]$/.test(value)) {
        // if (!/^.+$/g.test(value)) {
          callback(new Error(this.$i18n.t('kyc_id_no_err')))
        }
      } else {
        if (!/^[0-9A-Za-z]{6,32}$/.test(value)) {
          callback(new Error(this.$i18n.t('kyc_passport_err')))
        }
      }
      callback()
    }
    return {
      regionId: '',
      regionOptions: [],
      state,
      loading: false,
      form: {
        name: '',
        regionId: 86,
        id_type: 1,
        id_number: ''
      },
      rules: {
        name: [
          { required: true, message: this.$i18n.t('kyc_name_err'), trigger: 'blur' }
        ],
        id_number: [
          { validator: validationFunc, trigger: 'blur' }
        ]
      },
      step: 1, //1：填写基本信息， 2：前往kyc2 或 前往币币
    }
  },
  async beforeRouteEnter (to, from, next) {
    // await actions.updateSession()
    // if (state.userInfo.lv) {
    //   if (state.userInfo.lv > 1) {
    //     console.log('goto:: step2')
    //     next({name: 'KycStep2'})
    //   }
    // }
    console.log('sdjfklajdslkfjlasdjflasjdfkljskdl')
    let res = await service.getKycInfo();
    if (!res.code && !!res.data) {
      kycInfo = res.data
      if (res.data.lv >= 1) {
        console.log('goto:: step2')
        next({name: 'KycStep2'})
      }
    }
    next()
  },
  methods: {
    async fetchRegion () {
      const res = await service.getRegionList()
      if (!res.code) {
        this.regionOptions = res.data
      }
    },
    async submit () {
      this.$refs['form'].validate(async (valid) => {
        if (!valid) return
        let params = {
          name: this.form.name,
          region: this.form.regionId,
          id_type: this.form.id_type,
          id_number: this.form.id_number
        }
        let result = await service.updateKyc1(params)
        if (result) {
          if (result.code) {
            utils.alert(result.message)
          }
          await actions.updateSession()
          // this.$router.push({
          //   name: 'KycStep2'
          // })
          this.step = 2
        }
      })
    },
    async getKycInfo() {
      let res = await service.getKycInfo();
      if (!res.code) {
        kycInfo = res.data;
      }
    },
  },
  async created() {
    // if(state.userInfo.lv === 1) {
    //   this.step = 2
    // }
    this.fetchRegion()
    let res = await service.getKycInfo();
    if (!res.code && !!res.data) {
      if (res.data.lv === 0) {
        this.form.name = res.data.name || ""
        this.form.regionId = res.data.region || 86
        this.form.id_type = res.data.id_type || 1
        this.form.id_number = res.data.id_number || ""
      }
      else if (kycInfo.lv === 1 && kycInfo.state === 1 && kycInfo.region !== 86) {
        this.$router.replace({
          name: "KycStep3"
        });
      }
      else if (res.data.lv = 1) {
        this.$router.replace({
          name: 'KycStep2',
        })
      }
      else if (res.data.lv = 2) {
        this.$router.replace({
          name: 'KycStep3',
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>

@import "./index.scss";

</style>
