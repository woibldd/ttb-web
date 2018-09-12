<template>
  <div style="page-invite-wrap">
    <profile-left></profile-left>
    <div class="user-center-right">
      <div class="profile-container">
        <div class="title-box">{{$t('profile_left_invite_safety')}}<span>{{$t('Phone_binding')}}</span></div>
        <div class="invinfo-box">
            <div class="inp_box">
                <p>{{$t('Country')}}</p>
                <select>
                    <option value="aa"></option>
                </select>
            </div>
            <div class="inp_box">
                <p>{{$t('name')}}</p>
                <input type="text" />
                <span class="tips">请输入您的真实姓名</span>
            </div>
            <div class="inp_box">
                <p>{{$t('kyc_idcard')}}</p>
                <input type="text" />
                <span class="tips">请输入正确的身份证号</span>
            </div>
            <div class="inp_box">
                <v-btn class="submit-btn" :label="$t('sub')"
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
            select,input{
                display: block;
                width: 340px;
                height: 40px;
                float: left;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                border-radius: 4px;
                border:none;
                border:1px solid #C2A538;
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
            &:nth-child(1){
                margin-bottom: 40px;
            }
            &:nth-child(2){
                margin-bottom: 40px;
            }
            &:nth-child(3){
                margin-bottom: 40px;
            }
        }
      }
    }
  }
</style>
