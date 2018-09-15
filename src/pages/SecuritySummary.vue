<template>
<div class="profile-container">
  <div class="title-box">{{$t('profile_left_invite_safety')}}<span>安全等级： <i>低</i></span></div>
  <div class="invinfo-box">
    <ul>
      <li :class="{pass: !!phone}">
        <div><span></span><p>{{$t('Phone_binding')}}</p></div>
        <div>{{$t( !!phone ? 'Bindings' : 'No_Bindings')}}</div>
        <div>
          {{phone}}
          <router-link v-if="!phone" :to="{name: 'PhoneBind'}">{{$t('bind')}}</router-link>
        </div>
      </li>
      <li>
        <div><span></span><p>{{$t('email')}}</p></div>
        <div>{{$t('No_Bindings')}}</div>
        <div>
          {{email}}
          <router-link v-if="!email" :to="{name: 'EmailBind'}">{{$t('bind')}}</router-link>
        </div>
      </li>
      <li>
        <div><span></span><p>{{$t('google_validator')}}</p></div>
        <div>{{$t('No_Bindings')}}</div>
        <div>关闭验证</div>
      </li>
      <li>
        <div><span></span><p>{{$t('log_pwd')}}</p></div>
        <div>{{$t('settinged')}}</div>
        <div>
          <router-link :to="{name: 'ModPwd'}">{{$t('modify')}}</router-link>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import service from '@/modules/service'
import utils from '@/modules/utils'
import {state} from '@/modules/store'

export default {
  data () {
    return {
      state
    }
  },
  computed: {
    phone () {
      if (state.userInfo.phone) {
        return utils.publicDesensitization(state.userInfo.phone)[0]
      }
      return ''
    },
    email () {
      if (state.userInfo.email) {
        return utils.publicDesensitization(state.userInfo.phone)[0]
      }
      return ''
    }

  },
  methods: {

  }
}
</script>


<style lang="scss" scoped>
.invinfo-box {
  width: 100%;
  ul{
      li{
          height: 60px;
          line-height: 60px;
          color: #666;
          border-bottom: 1px dashed #dcdcdc;
          div{
              float: left;
              a{
                  margin-left: 20px;
              }
              span{
                  display: block;
                  float: left;
                  width:22px;
                  height: 60px;
                  background-repeat: no-repeat;
                  background-position: left center;
                  background-image: url(../assets/pdg_a.png);
              }
              p{
                  float: left;
              }
              &:nth-child(1){
                  width: 25%;
              }
              &:nth-child(2){
                  width: 35%;
              }
              &:nth-child(3){
                  float: right;
                  padding-right: 25px;
              }
          }
          &.pass {
              div {
                  span{
                      background-image: url(../assets/pdg.png);
                  }
                  &:nth-child(2){
                      color: #2FB883;
                  }
              }
          }
      }
  }
}
</style>

