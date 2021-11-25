<template>
  <div class="user-center-right">
    <div class="profile-container">  
      <div class="profile-panel header-panel">
        <div class="profile-panel-title">{{$t('profile.basicInfo')}}</div>
        <div class="profile-panel-box">
          <div class="profile-panel-row" flex>
            <div class="profile-panel-item" flex>
              <div class="header mr-6">
                <img src="@/assets/profile/info-header.png" alt="">
              </div>
              <div class="info">
                <div class="value">
                  <span v-if="phone"> {{ phone }}</span>
                  <span v-else><router-link :to="{name: 'PhoneBind'}">{{ $t('to_bind') }}</router-link></span>
                </div>
                <div class="label">UID:{{uid}}</div>
              </div>
            </div>
            <div class="profile-panel-item">
              <div class="label">{{$t('u_name')}}</div>
              <div class="value">
                <span v-if="name===-1"><router-link :to="{name: 'Kyc'}">{{ $t("kyc_failure") }}</router-link></span>
                <span v-else-if="name">{{ name }}</span>
                <span v-else><router-link :to="{name: 'Kyc'}">{{ $t("to_verify") }}</router-link> </span>
              </div>
            </div>
            <div class="profile-panel-item">
              <div class="label">{{$t('register_by_email')}}</div>
              <div class="value">
                <span v-if="email"> {{ email }}</span>
                <span v-else><router-link :to="{name: 'EmailBind'}">{{ $t('to_bind') }}</router-link></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-panel mt-20">
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
                <div v-if="state.locale==='zh-CN'">{{ item.address }}</div>
                <div v-else>{{ item.address_en }}</div> 
              </li>
            </ul>
          </div>
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
      if (state.userInfo && state.userInfo.state === -1) {
        return state.userInfo.state
      } else if (state.userInfo) {
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
  
  // @import '../styles/mixins'; 
  .user-center-right {
    float: left;
    margin-left: 29px;
    width: 954px;
    .profile-container {
      // width: 960px;
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
            p {
                float: left;
                width: 135px;
                color: #666;
            }
            span{
                color: #333;
                font-weight: bold;
                a{
                    color:$primary-hover;
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
      .profile-panel { 
        padding: 30px 28px;
        border: 1px solid #eaeaea;
        border-radius: 6px; 
        &.header-panel {
          .profile-panel-title {
            font-size: 16px;
            font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
            font-weight: 700;
            text-align: justifyLeft;
            color: #1f2533;
          }
          .profile-panel-box {
            .profile-panel-row {
              margin-top: 22px;
              .profile-panel-item {
                margin-right: 80px;
                .value {
                  font-size: 14px;
                  color: #1F2533;
                }
                .label {
                  font-size: 12px;
                  color: #7B8293;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
