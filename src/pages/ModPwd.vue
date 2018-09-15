<template>
  <div class="profile-container">
    <div class="title-box">{{$t('profile_left_invite_safety')}}<span>{{$t('email_binding')}}</span></div>
    <div class="invinfo-box">
        <div class="inp_box">
            <p>{{$t('change_password_orig')}}</p>
            <div class="inp_cox">
                <input type="text" />
            </div>
            <span class="tips">错误提示</span>
        </div>
        <div class="inp_box">
            <p>{{$t('change_password_new')}}</p>
            <div class="inp_cox">
                <input type="text" />
            </div>
            <span class="tips">错误提示</span>
        </div>
        <div class="inp_box">
            <p>{{$t('change_password_repeat')}}</p>
            <div class="inp_cox">
                <input type="text" />
            </div>
            <span class="tips">错误提示</span>
        </div>
        <div class="inp_box">
            <v-btn class="submit-btn" :label="$t('modify')"
            :loading="loading"
            @click="submit"></v-btn>
        </div>
    </div>
  </div>
</template>

<script>
  import service from '@/modules/service'
  import VBtn from '@/components/VBtn'

  export default {
    name: 'SafeVerified',
    components: {
      VBtn
    },
    data () {
      return {
        
      }
    },
    computed: {

    },
    methods: {
      async changePassword () {
        let result = await service.changePassword()
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../styles/vars";
  @import '../styles/mixins';

  .user-center-right {
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
            margin-bottom: 30px;
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
                line-height: 20px;
                position: absolute;
                left: 104px;
                top: 40px;
                font-size: 10px;
                color: #EB5757;
            }
            .inp_cox{
                border: 1px solid $c;
                width: 340px;
                float: left;
                height: 40px;
                border-radius: 4px;
                box-sizing: border-box;
                position: relative;
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
                        background: $c;
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
                    padding-left:15px;
                }
            }
        }
      }
    }
  }
</style>
