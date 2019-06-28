<template>
  <div class="profile-container">
    <div class="title-box">{{ $t('identity_authentication') }}</div>
    <div class="invinfo-box">
      <div class="authen_top">
        <i class="jd"/>
        <p class="yy">{{ $t('kyc_top_authen_1') }}</p>
        <p class="yy">{{ $t('kyc_top_authen_2') }}</p>
      </div>
      <div class="notify">
        <div
          class="content mb-30"
          v-if="kycState === 1">
          <p class="p1">
            <icon name="kyc_review"/>
            {{ $t('profile_kyc_ing') }}
          </p>
          <p class="p2 mt-24">
            {{ $t('profile_kyc_ing_desc') }}
          </p>
        </div>
        <div
          class="content mb-30"
          v-else-if="kycState === 1 && kyclv === 2">
          <p class="p1">
            <icon name="kyc_pass"/>
            {{ $t('profile_kyc_success') }}
          </p>
        </div>
        <div
          class="content mb-30"
          v-else-if="kycState === 2">
          <p class="p1">
            <icon name="kyc_pass"/>
            {{ $t('profile_kyc_success') }}
          </p>
        </div>
        <div
          class="content mb-30"
          v-else-if="kycState === -1">
          <p class="p1">
            <icon name="kyc_fail"/>
            {{ $t('profile_kyc_fail') }}
          </p>
          <p
            class="p2 mt-24"
            v-html="$t('profile_kyc_again', {kyc: '/profile/kyc/kyc_step2?reload=true'})"/>
          <p class="p3 mt-24">
            <span
              class="reason"
              v-for="item in rejectReasons"
              :key="item">
              {{ $i18n.t(item) }}
            </span>
          </p>
        </div>
        <div
          class="content mb-30"
          v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import {state} from '@/modules/store'
let kycInfo = {}
export default {
  name: 'SafeVerified',
  components: {
    VBtn
  },
  i18n: {
    messages: {
      en: {
        101: 'Identification certificate is not clear enough;',
        102: 'The identification certificate is smeared or modified;',
        103: 'The identity certificate is covered or misses a corner;',
        104: 'Identification certificate with watermark or Logo;',
        105: 'Identification certificate is invalid;',
        106: 'The identity certificate registered place does not match the selected country or region;',
        107: 'The identity certificate type does not match the selected type;',
        108: 'The identity certificate information does not match the information you filled in;',
        109: 'The identity certificate applicant is under 18 years old;',
        110: 'The identity certificate holder is on the list of rejected verification;',
        111: 'Identity certificate does not support the the country of user;',
        201: 'Hand-held white paper and ID photos are not clear enough;',
        202: 'Hand-held white paper and ID are smeared or modified;',
        203: 'Hand-held white paper and ID photo of the are covered or incomplete ;',
        204: 'Hand-held white paper and ID photo with watermark or Logo;',
        205: 'Hands with blank paper and ID photo without certificate;',
        206: 'Hands with white paper and ID photos using others’ certificate;',
        207: 'Hands with blank paper and ID photos without IX on a white paper and date for verification;',
        208: 'Hand-held white paper and ID photo ID are not the same as previously uploaded certificate;',
        209: 'Hand-held white paper and ID photo paper without “IX”;',
        210: 'Hand-held white paper and ID photo papers without date for verification;',
        211: 'The date on the hand-held white paper and the paper of ID photo does not match;'
      },
      'zh-CN': {
        0: '',
        101: '身份证明证件不够清晰',
        102: '身份证明证件存在涂抹修改',
        103: '身份证明证件存在遮盖或缺角',
        104: '身份证明证件带有水印或Logo',
        105: '身份证明证件失效',
        106: '身份证明证件与所选择的国家或地区不符',
        107: '身份证明证件与所选证件类型不符',
        108: '身份证明证件与填写的信息不符',
        109: '身份证明证件申请人未满18岁',
        110: '身份证明证件持有人在拒绝审核名单内',
        111: '身份证明证件暂不支持该国家用户',
        201: '手持白纸及证件照片不够清晰',
        202: '手持白纸及证件照片存在涂抹修改',
        203: '手持白纸及证件照片存在遮盖或缺角',
        204: '手持白纸及证件照片带有水印或Logo',
        205: '手持白纸及证件照片缺少证件',
        206: '手持白纸及证件照片使用了别人的证件',
        207: '手持白纸及证件照片缺少手持写上IX及提审日期的白纸',
        208: '手持白纸及证件照片证件与先前上传的证件不相同',
        209: '手持白纸及证件照片纸片没有写上IX',
        210: '手持白纸及证件照片纸片没有写上提审日期',
        211: '手持白纸及证件照片纸片上的日期与提审日期不符',
        212: '证件持有人、证件、白纸没有同时出现在照片内'
      }
    }
  },
  data () {
    return {
      state,
      kycInfo
    }
  },
  computed: {
    kycState () {
      if (this.kycInfo) {
        return this.kycInfo.state
      }
      return -2
    },
    kyclv () {
      if (this.kycInfo) {
        return this.kycInfo.lv
      }
    },
    rejectReasons () {
      if (this.kycInfo && this.kycInfo.reason) {
        return this.kycInfo.reason.split(',')
      }
      return []
    }
  },
  methods: {

  },
  async created () {
    let res = await service.getKycInfo()
    if (!res.code) {
      this.kycInfo = res.data
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
    width: 100%;
    margin: 20px auto 50px auto;

  }
  .authen_top{
    width: 50%;
    height: 30px;
    padding: 5px 0;
    margin-bottom: 40px;
    box-sizing: border-box;
    position: relative;
    p{
      width: 180px;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      //text-indent: 25px;
      position: absolute;
      text-align: center;
      background: #DEDEDE;
      color:#999;
      border-radius: 20px;
      &:nth-child(2){
        left: 0;
      }
      &:nth-child(3){
        left: 100%;
        margin-left: -45px;
      }
      &:nth-child(4){
        right: 0;
      }
      &.yy{
        color: #fff;
        background-color: $primary;
        &:before{
          background: $primary;
        }
      }
    }
    i{
      width: 40%;
      height: 2px;
      background: #ccc;
      display: block;
      float: left;
      margin-left: 210px;
      margin-top: 19px;
      &.jd{
        background: $primary;
      }
    }
  }
  .notify {
    width: 100%;
    margin-top: 100px;

    .content {
      text-align: center;

      .p1 {
        font-size: 18px;
        font-weight: bold;
      }
      .p2 {
        font-size: 12px;
        color: $text-light;
      }
      .p3 {
        font-size: 14px;
        line-height: 24px;
        color: $text-light;
        width: 300px;
        margin: 0 auto;
        text-align: left;
        .reason {
          display: block;
        }
      }

    }
  }
</style>
