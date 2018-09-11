<template>
  <div style="page-invite-wrap">
    <profile-left></profile-left>
    <div class="user-center-right">
      <div class="profile-container">
        <div class="title-box">{{$t('Profile_left_invite_Safety')}}<span>安全等级： <i>低</i></span></div>
        <div class="invinfo-box">
            <ul>
                <li class="yz">
                    <div><span></span><p>{{$t('Phone_binding')}}</p></div>
                    <div>{{$t('Bindings')}}</div>
                    <div>185****6608<a>开启验证</a></div>
                </li>
                <li>
                    <div><span></span><p>{{$t('email')}}</p></div>
                    <div>{{$t('No_Bindings')}}</div>
                    <div><a>绑定</a></div>
                </li>
                <li>
                    <div><span></span><p>{{$t('google_validator')}}</p></div>
                    <div>{{$t('No_Bindings')}}</div>
                    <div>关闭验证</div>
                </li>
                <li>
                    <div><span></span><p>{{$t('log_pwd')}}</p></div>
                    <div>{{$t('settinged')}}</div>
                    <div><a>修改</a></div>
                </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileLeft from './ProfileLeft'
  import service from '@/modules/service'

  export default {
    name: 'ProfileSafety',
    components: {
      ProfileLeft
    },
    data () {
      return {
        
      }
    },
    computed: {
      
    },
    methods: {
      
    }
  }
</script>
<style lang="scss">
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
            float: right;
            font-weight: lighter;
            padding-right: 25px;
            i{
                color: #EB5757;
            }
        }
      }
      .invinfo-box {
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
                &.yz{
                    div{
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
    }
  }
</style>
