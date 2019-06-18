<template>
  <div class="user-center-right">
    <div class="profile-container">
      <div class="title-box">
        {{ $t('message_setting_safety')}}
      </div>
      <div class="profile-text">
        <h1>{{ $t('message_setting_notice')}}</h1>
        <p> {{ $t('message_setting_content_01') }}</p>
      </div>
      <div class="invinfo-box">
        <ul>
          <li class="">
            <div>
              <p>{{ $t('message_setting_content_02') }}</p>
            </div>
            <div>
              <input v-model="data.submission" type="checkbox" value="true"><label @click="fanx('submission')" for=""></label>
            </div>
          </li>
          <li class="">
            <div>
              <p>{{ $t('message_setting_content_03') }}</p>
            </div>
            <div>
              <input v-model="data.deal" type="checkbox" name="" value="true"><label @click="fanx('deal')" for=""></label>
            </div>
          </li>
          <li class="">
            <div>
              <p>{{ $t('message_setting_content_04') }}</p>
            </div>
            <div>
              <input v-model="data.cancel" type="checkbox" name="" value="true"><label @click="fanx('cancel')" for=""></label>
            </div>
          </li>
          <li class="">
            <div>
              <p>{{ $t('message_setting_content_05') }}</p>
            </div>
            <div>
              <input v-model="data.stoploss" type="checkbox" name="" value="true"><label @click="fanx('stoploss')" for=""></label>
            </div>
          </li>
          <li class="">
            <div>
              <p>{{ $t('message_setting_content_06') }}</p>
            </div>
            <div>
              <input v-model="data.force" type="checkbox" name="" value="true"><label @click="fanx('force')" for=""></label>
            </div>
          </li>
          <li class="">
            <div>
              <p>{{ $t('message_setting_content_07') }}</p>
            </div>
            <div>
              <input v-model="data.reduce" type="checkbox" name="" value="true"><label @click="fanx('reduce')" for=""></label>
            </div>
          </li>
        </ul>
      </div>
    </div>
 </div>
</template>
<script>
import service from '@/modules/service'
import utils from '@/modules/utils'
import {state} from '@/modules/store'
import verifyModal from '@/components/common/verify-modal'

export default {
  data () {
    return {
      data:{
        submission: false, //提交
        deal:false, //成交
        cancel:false,//取消
        stoploss:false, //止损
        force:false, //强制
        reduce: false//减少
      },
      state
    }
  },
  watch:{
    // 'data.submission'(res){
    //   this.Ajax('submission',res)
    //   // return false
    // },
    // 'data.deal'(res){
    //   this.Ajax('deal',res)
    //   // return false
    // },
    // 'data.cancel'(res){
    //   this.Ajax('cancel',res)
    //   // return false
    // },
    // 'data.stoploss'(res){
    //   this.Ajax('stoploss',res)
    //   // return false
    // },
    // 'data.force'(res){
    //   this.Ajax('force',res)
    //   // return false
    // },
    // 'data.reduce'(res){
    //   this.Ajax('reduce',res)
    //   // return false
    // },
  },
  components: {
    verifyModal
  },
  created:function () {
    let param = {
      user:state.userInfo.id
    }
    service.MessageSettings(param).then(resp => {
      if (!resp.code) {
         this.data = resp.data
      }
    })
  },
  computed: {
  },
  methods: {
    fanx(data){
      let Booleans = !this.data[data]
      this.Ajax(data,Booleans)
    },
    Ajax(name,type){
      let param = {
        msg:name,
        msg_type:type,
        user:state.userInfo.id
      }
      service.MessageSettings(param).then(resp => {
        if (resp.code) {
          utils.alert('请不要多次点击')
        } else {
          this.data[name] = type
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-center-right {
    padding-left: 60px;
    float: left;
    .profile-container {
      width: 960px;
      margin-bottom: 80px;
      position: relative;
  }
}
.profile-text{

  h1{
    font-size:17px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    margin:15px 0
  }
  p{
    font-family:MicrosoftYaHei;
    color:#ccc;
    margin-bottom: 20px;
    line-height:1.5;
  }
}
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
  width: 100%;
  ul{
      li{
          height: 60px;
          line-height: 60px;
          color: #666;
          border-bottom: 1px dashed #dcdcdc;
          input:checked+label:before{
            position: absolute;
            content: '\221A';
            width: 15px;
            height: 15px;
            color: #fff;
            border: 1px solid #C9AA6D;
            top: -16px;
            left: -15px;
            background: #C9AA6D;
            z-index: 2;
            line-height: 1;
            text-align: center;
          }
          label{
            display: inline-block;
            width: 50px;
            position: relative;
            &:after{
              position: absolute;
              content: '';
              width: 15px;
              height: 15px;
                border: 1px solid #ddd;
              top: -16px;
              left: -15px;
              background: #fff;
              z-index: 1;
            }
          }
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
                  // background-image: url(../assets/pdg_a.png);
              }
              p{
                  float: left;
              }
              &:nth-child(1){
                  width: 30%;
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
                      // background-image: url(../assets/pdg.png);
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
