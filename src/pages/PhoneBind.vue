<template>
  <div style="page-invite-wrap">
    <profile-left></profile-left>
    <div class="user-center-right">
      <div class="profile-container">
        <div class="title-box">{{$t('profile_left_invite_safety')}}<span>{{$t('Phone_binding')}}</span></div>
        <div class="invinfo-box">
            <div class="inp_box">
                <p>{{$t('phone_number')}}</p>
                <div class="inp_cox">
                    <span class="gh">+86</span>
                    <input type="text" class="a" />
                </div>
                <span class="tips">错误提示</span>
            </div>
            <div class="inp_box">
                <p>{{$t('phone_code')}}</p>
                <div class="inp_cox">
                    <input type="text" class="b" />
                    <a href="javascript:void(0)">{{$t('hq_send')}}</a>
                </div>
                <span class="tips">错误提示</span>
            </div>
            <div class="inp_box">
                <v-btn class="submit-btn" :label="$t('bind')"
                :loading="loading"
                @click="submit"></v-btn>
            </div>
        </div>
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
            p{
                float: left;
                width: 104px;
                height: 40px;
                line-height: 40px;
                color: #999;
            }
            input{
                display: block;
                width: 340px;
                height: 40px;
                float: left;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                border-radius: 4px;
                border:none;
            }
            .submit-btn{
                width: 340px;
                height: 40px;
                margin-left: 104px;
            }
            span.tips{
                display: block;
                width: 300px;
                height: 30px;
                line-height: 30px;
                position: absolute;
                left: 104px;
                top: 40px;
                font-size: 10px;
                color: #EB5757;
            }
            .inp_cox{
                border: 1px solid #ccc;
                width: 340px;
                float: left;
                height: 40px;
                border-radius: 4px;
                box-sizing: border-box;
                position: relative;
                .gh{
                    display: block;
                    width: 50px;
                    height: 38px;
                    line-height: 38px;
                    text-align: center;
                    border-right: 1px solid #ccc;
                    color: #333;
                    z-index: 11;
                    position: relative;
                }
                a{
                    height: 38px;
                    line-height: 38px;
                    width: 100px;
                    text-align: center;
                    display: block;
                    position: absolute;
                    right: 0;
                    top: 0;
                    &:before{
                        content: "";
                        width: 1px;
                        height: 20px;
                        background: #ccc;
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        margin-top: -10px;
                    }
                }
                input{
                    padding-left: 35px;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    &.a{
                        padding-left:65px;
                    }
                    &.b{
                        padding-left:15px;
                    }
                }
            }
            &:nth-child(1){
                margin-bottom: 40px;
            }
            &:nth-child(2){
                margin-bottom: 40px;
            }
        }
      }
    }
  }
</style>
