<template>
  <div class="user-center-right">
    <div class="profile-container">
      <div class="title-box">{{ $t('profile_left_invite_perinfo') }}</div>
      <div class="invinfo-box">
        <div class="inv_tl">
          <p>UID</p>
          <span>{{ uid }}</span>
        </div>
        <div class="inv_tl">
          <p>{{ $t('u_name') }}</p>
          <span v-if="name">{{ name }}</span>
          <span v-else><router-link :to="{name: 'Kyc'}">{{ $t("to_verify") }}</router-link> </span>
        </div>
        <div class="inv_tl">
          <p>{{ $t('register_by_phone') }}</p>
          <span v-if="phone"> {{ phone }}</span>
          <span v-else><router-link :to="{name: 'PhoneBind'}">{{ $t('to_bind') }}</router-link></span>
        </div>
        <div class="inv_tl">
          <p>{{ $t('register_by_email') }}</p>
          <span v-if="email"> {{ email }}</span>
          <span v-else><router-link :to="{name: 'EmailBind'}">{{ $t('to_bind') }}</router-link></span>
        </div>
      </div>
      <div class="title-box">{{ $t('log_recording') }}<span>{{ $t('log_recording_prompt') }}</span></div>
      <div class="invite-list ">
        <div class="invinfo-box">
          <ul>
            <li class="inf-rt">
              <div>{{ $t('date') }}</div>
              <div>{{ $t('ip_address') }}</div>
              <div>{{ $t('region_label') }}</div>
            </li>
            <li
              v-for="item in historyList"
              :key="'h_'+item.id">
              <div>{{ item.login_time }}</div>
              <div>{{ item.ip }}</div>
              <div>{{ item.address }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import {state} from '@/modules/store'
import utils from '@/modules/utils'

export default {
  name: 'ProfileInfo',
  components: {
  },
  data () {
    return {
      state,
      historyList: [],
      kyc: {}
    }
  },
  computed: {
    uid () {
      if (state.userInfo) {
        return state.userInfo.id
      }
      return ''
    },
    name () {
      if (state.userInfo) {
        return state.userInfo.name
      }
      return ''
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
    }
  },
  methods: {

  },
  async created () {
    // let kyc = await service.getKycInfo()
    // if (!kyc.code) {
    //   kyc.data =
    // }

    let historyResult = await service.getLoginHistory()
    if (!historyResult.code) {
      this.historyList = historyResult.data
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../styles/vars";
  @import '../styles/mixins';

  .user-center-right {
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
            color: #999;
            font-size: 14px;
            padding-left: 15px;
            font-weight: lighter;
        }
      }
      .invinfo-box {
        width: 100%;
        margin: 10px auto 60px auto;
        .inv_tl{
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            p{
                float: left;
                width: 135px;
                color: #666;
            }
            span{
                color: #333;
                font-weight: bold;
                a{
                    color:#C1A538;
                    font-weight: lighter;
                }
            }
        }
        ul{
            li{
                width: 100%;
                height: 50px;
                line-height: 50px;
                color: #333;
                font-size: 12px;
                border-bottom: 1px dashed #dcdcdc;
                div{
                    float: left;
                }
                div:nth-child(1){
                    width:25%;
                }
                div:nth-child(2){
                    width:45%;
                }
                div:nth-child(3){
                    float: right;
                    padding-right: 20px;
                }
            }
            li.inf-rt{
                color: #999999;
                font-size: 14px;
            }
        }
      }
    }
  }
</style>
