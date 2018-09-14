<template>
  <div style="page-invite-wrap">
    <profile-left></profile-left>
    <div class="user-center-right">
      <div class="profile-container">
        <div class="title-box">{{$t('identity_authentication')}}</div>
        <div class="invinfo-box">
            <div class="authen_top">
                <i class="jd"></i>
                <p class="yy">
                    填写信息
                </p>
                <p class="yy">
                    证件上传
                </p>
                <p>
                    完成认证
                </p>
                <i></i>
            </div>
            <div class="aut_box">
                <div class="aut_lt">证件上传</div>
                <div class="aut_rt">
                    <div class="aut_up">
                        <div class="up_face"></div>
                    </div>
                    <div class="aut_up_txt">
                        <p>姓名：张三</p>
                        <p>身份证号：10010198802022222</p>
                    </div>
                </div>
                <div class="aut_rt">
                    <div class="aut_up">
                        <div class="up_emblem"></div>
                        <p>以上材料需用 JPG / JPEG / PNG 格式上传，并保证照片清晰、边角完整、亮度均匀，且大小不得超过5M</p>
                    </div>
                    <div class="aut_up_txt">
                        <p>签发机关：北京市朝阳分局</p>
                        <p>有效期限：2018.03.22-2038.03.22</p>
                    </div>
                </div>
            </div>
            <div class="aut_box">
                <div class="aut_lt">手持证件照</div>
                <div class="aut_rt">
                    <div class="aut_up">
                        <div class="up_take"></div>
                        <p>提示：手臂前伸证件照更清晰<br />请保证照片中五官清晰，证件信息清晰，无涂改</p>
                    </div>
                    <div></div>
                </div>
            </div>
            <div class="aut_box">
                <div class="aut_lt"></div>
                <div class="aut_rta">
                    <v-btn class="submit-btn" :label="$t('sub')"
                    :loading="loading"
                    @click="submit"></v-btn>
                </div>
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
        p{
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
      .aut_box{
        width: 620px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        .aut_lt{
          width: 110px;
          height: auto;
          color: #333;
          font-size: 14px;
          font-weight: bold;
          position: absolute;
          height: 24px;
          font-size: 14px;
          font-weight: bold;
          left: 0;
          top: 0;
        }
        .aut_rt{
            padding-left: 110px;
            width: 620px;
            float: left;
            box-sizing: border-box;
            margin-bottom: 24px;
            div{
                float: left;
                &.aut_up{
                    width: 260px;
                    height: auto;
                    float: left;
                    color: #666;
                    div{
                        width: 260px;
                        height: 190px;
                        border-radius: 4px;
                        border: 1px solid #ccc;
                        background-color: #f7f7f7;
                        background-repeat: no-repeat;
                        background-position: center 32px ;
                        float: left;
                        &.up_face{
                            background-image: url(../assets/id-up.png);
                        }
                        &.up_emblem{
                            background-image: url(../assets/id-down.png);
                        }
                        &.up_take{
                            background-image: url(../assets/id-people.png);
                        }
                    }
                    p{
                        float: left;
                        font-size: 12px;
                        line-height: 18px;
                        margin-top: 14px;
                    }
                }
                &.aut_up_txt{
                    font-size: 14px;
                    color: #333;
                    padding-left: 20px;
                    box-sizing: border-box;
                    p{
                        margin-bottom: 12px;
                    }
                }
            }
        }
        .aut_rta{
            width: 260px;
            margin-left: 110px;
        }
      }
  }
</style>
