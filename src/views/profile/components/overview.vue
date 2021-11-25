<template>
  <div class="profile-right-container">
    <div class="profile-overview-wrap">
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
      <div class="my-grid mt-20"> 
        <div class="profile-panel item1"
          v-for="(item, index) in list" :key="index">
          <div class="profile-panel-box" flex="main:justify">
            <div class="panel-box-left">
              <div class="panel-title">
                {{$t(item.name)}}
              </div>
              <div class="panel-subtitle mt-4">
                {{$t(item.tip)}}
              </div>
            </div>
            <div class="panel-box-right" flex="main:center cross:center">
              <img :src="require(`../../../assets/profile/${item.img}`)" alt="">
            </div>
          </div>
          <div class="profile-panel-footer">
            <router-link :to="item.route">{{$t(item.routeText)}} <icon style="font-size: 12px;" name="jiantou" /></router-link>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: 'profile.safeCenter',
          tip:'profile.tip1',
          route: '/profileN/security/summary',
          routeText: 'profile.routeText1',
          img: 'overview-safely.png'
        },
        {
          name: 'profile_sec_kyc',
          tip:'profile.tip2',
          route: '/profileN/kyc',
          routeText: 'profile.routeText2',
          img: 'overview-kyc.png'
        },
        {
          name: 'api_management',
          tip:'profile.tip3',
          route: '/profileN/api',
          routeText: 'profile.routeText3',
          img: 'overview-API.png'
        },
        {
          name: 'invite_friends',
          tip:'profile.tip4',
          route: '/profileN/invite',
          routeText: 'profile.routeText4',
          img: 'overview-invite.png'
        },
      ]
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

}
</script>

<style lang="scss" scoped>
.profile-right-container {
  float: left;
  margin-left: 29px;
  width: 954px;
  .profile-overview-wrap {
    .profile-panel { 
      border: 1px solid #eaeaea;
      border-radius: 6px;
      .panel-title {
        font-size: 16px;
        font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
        font-weight: 700;
        text-align: justifyLeft;
        color: #1f2533;
      }
      &.header-panel {
        padding: 30px 28px;
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
    .my-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 20px;
      column-gap: 20px;
      .profile-panel-box {
        .panel-box-left {
          padding: 24px 0 0 28px;
        }
        .panel-box-right {
          width: 150px;
          height: 102px;
        } 
      }
      .profile-panel-footer {
        border-top: 1px solid #eaeaea;
        padding: 15px 28px;
      }
    }
  }
}
</style>