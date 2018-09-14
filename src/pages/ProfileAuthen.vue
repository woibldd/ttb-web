<template>
  <div style="page-invite-wrap">
    <profile-left></profile-left>
    <div class="user-center-right">
      <div class="profile-container">
        <div class="title-box">{{$t('identity_authentication')}}</div>
        <div class="invinfo-box">
            <div class="inp_box mbo">
                <p>账号类型</p>
                <div class="rd">
                    <p></p>个人
                </div>
            </div>
            <div class="inp_box">
                <p>{{$t('name')}}</p>
                <input type="text" class="s_ip" />
                <input type="text" class="s_ip" />
                <span class="tips"></span>
            </div>
            <div class="inp_box">
                <p>出生日期</p>
                <select class="s_ip">
                    <option value="aa"></option>
                </select>
                <select class="s_ip">
                    <option value="aa"></option>
                </select>
                <select class="s_ip">
                    <option value="aa"></option>
                </select>
            </div>
            <div class="inp_box">
                <p>证件类型</p>
                <select>
                    <option value="aa"></option>
                </select>
            </div>
            <div class="inp_box mbo">
                <p>地址</p>
                <input type="text" />
            </div>
            <div class="inp_box mbo">
                <p></p>
                <input type="text" />
            </div>
            <div class="inp_box">
                <p></p>
                <select class="s_ip">
                    <option value="aa"></option>
                </select>
                <select class="s_ipa">
                    <option value="aa"></option>
                </select>
                <span class="tips"></span>
            </div>
            <div class="inp_box">
                <p>{{$t('kyc_idcard')}}</p>
                <input type="text" />
                <span class="tips"></span>
            </div>
            <div class="inp_box">
                <p>{{$t('kyc_idcard')}}</p>
                <select class="">
                    <option value="aa"></option>
                </select>
                <span class="tips"></span>
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
                padding-left: 15px;
            }
            select,input{
                display: block;
                width: 300px;
                height: 40px;
                float: left;
                margin: 0;
                box-sizing: border-box;
                border-radius: 4px;
                border:none;
                border:1px solid $c;
            }
            select{
                border: 1px solid #999;
                background: #f7f7f7;
            }
            select.s_ip,input.s_ip{
                width: 102px;
                margin-right: 10px;
            }
            select.s_ipa{
                width: 190px;
            }
            .submit-btn{
                width: 300px;
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
            .rd{
                float: left;
                width: 340px;
                height: 40px;
                line-height: 40px;
                p{
                    width: 16px;
                    height: 16px;
                    border-radius: 10px;
                    background: #419BF9;
                    position: relative;
                    margin-top: 12px;
                    margin-right: 12px;
                    color: #333;
                    &:before{
                        content: "";
                        width: 6px;
                        height: 6px;
                        background: #fff;
                        position: absolute;
                        left: 50%;
                        border-radius: 10px;
                        top: 50%;
                        margin-left: -3px;
                        margin-top: -3px;
                    }
                }
            }
        }
        div.mbo{
            margin-bottom: 10px;
        }
      }
    }
  }
</style>
