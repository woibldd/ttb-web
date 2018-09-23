<template>
  <div class="profile-container">
    <div class="title-box">{{ $t('identity_authentication') }}</div>
    <div class="invinfo-box">
      <div class="authen_top">
        <i class="jd"/>
        <p class="yy">
          {{ $t('identity_authentication1') }}
        </p>
        <p class="yy">
          {{ $t('kyc_upload') }}
        </p>
        <p :class="{yy: kycState === 2}">
          {{ $t('kyc_complete') }}
        </p>
        <i class="jd"/>
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
            v-html="$t('profile_kyc_again', {kyc: '/profile/kyc/kyc_step2'})"/>
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
import isEmpty from 'lodash/isEmpty'
import {state, actions} from '@/modules/store'
import utils from '@/modules/utils'
let kycInfo = {}
export default {
  name: 'SafeVerified',
  components: {
    VBtn
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
    width: 100%;
    margin: 20px auto 50px auto;

  }
  .authen_top{
    width: 100%;
    height: 30px;
    padding: 5px 0;
    margin-bottom: 40px;
    box-sizing: border-box;
    position: relative;
    p {
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
    }
  }
</style>
