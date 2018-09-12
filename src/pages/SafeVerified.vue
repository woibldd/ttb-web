<template>
  <div style="page-invite-wrap">
    <profile-left></profile-left>
    <div class="user-center-right">
      <div class="profile-container">
        <div class="title-box">{{$t('profile_left_invite_safety')}}<span>实名认证</span></div>
        <div class="invinfo-box">
            <div>
                <p>国籍</p>
                <select>
                    <option value="aa"></option>
                </select>
            </div>
            <div>
                <p>姓名</p>
                <input type="text" />
                <span>请输入您的真实姓名</span>
            </div>
            <div>
                <p>身份证号</p>
                <input type="text" />
                <span>请输入正确的身份证号</span>
            </div>
            <div>
                <p></p>
                <button>提交</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileLeft from './ProfileLeft'
  import service from '@/modules/service'

  export default {
    name: 'SafeVerified',
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
        width: 445px;
        margin: 50px auto;
        div{
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
            button{
                width: 340px;
                height: 40px;
                border: none;
                border-radius: 4px;
                box-sizing: border-box;
                background: #C1A538;
                color: #fff;
                cursor: pointer;
            }
            span{
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
