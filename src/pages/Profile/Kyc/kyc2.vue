<template>
<div class="profile-container">
  <div class="title-box">{{$t('identity_authentication')}}</div>
  <div class="invinfo-box">
    <div class="authen_top">
          <i class="jd"></i>
          <p class="yy">
              {{$t('identity_authentication1')}}
          </p>
          <p class="yy">
              {{$t('kyc_upload')}}
          </p>
          <p>
              {{$t('kyc_complete')}}
          </p>
          <i></i>
      </div>
      <div class="aut_box">
          <div class="aut_lt">证件上传</div>
          <div class="aut_rt">
              <div class="aut_up">
                <el-upload class="upload" :action="uploadConfig.host" :data="frontConfig" :show-file-list="false" :drag="true" accept="image/*" :on-success="handleIdFrontSuccess">
                  <img class="img" v-if="photo1" :src="photo1" alt="">
                  <div class="upload_box up_face" v-else></div>
                </el-upload>
              </div>
              <div class="aut_up_txt">
                  <p>姓名：张三</p>
                  <p>身份证号：10010198802022222</p>
              </div>
          </div>
          <div class="aut_rt">
              <div class="aut_up">
                <el-upload class="upload" :action="uploadConfig.host" :data="backConfig" :show-file-list="false" :drag="true" accept="image/*" :on-success="handleIdBackSuccess">
                  <img class="img" v-if="photo2" :src="photo2" alt="">
                  <div class="upload_box up_emblem" v-else></div>
                </el-upload>
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
                <el-upload class="upload" :action="uploadConfig.host" :data="holdConfig" :show-file-list="false" :drag="true" accept="image/*" :on-success="handleIdHoldSuccess">
                  <img class="img" v-if="photo3" :src="photo3" alt="">
                  <div class="upload_box up_take" v-else></div>
                </el-upload>
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
</template>

<script>
  import service from '@/modules/service'
  import VBtn from '@/components/VBtn'
  import isEmpty from 'lodash/isEmpty'
  import {state, actions} from '@/modules/store'
  import utils from '@/modules/utils'
  let kycInfo = {}
  export default {
    name: 'SafeVerified',
    components: {
      VBtn
    },
    data () {
      return {
        state,
        loading: false,
        policy: {},
        uploadConfig: {
          host: '//ix-test.oss-cn-beijing.aliyuncs.com'
        },
        photo1: '',
        photo2: '',
        photo3: '',
        filedir: ''
      }
    },
    computed: {
      userInfo () {
        return state.userInfo || {}
      },
      id () {
        return this.userInfo.id
      },
      frontConfig () {
        let policy = Object.assign({}, this.policy)
        let newKey = policy.key
        if (newKey) {
          newKey = newKey.replace('${filename}', '_front_${filename}')
          policy.key = newKey
          return policy
        }
        return {}
      },
      backConfig () {
        let policy = Object.assign({}, this.policy)
        let newKey = policy.key
        if (newKey) {
          newKey = newKey.replace('${filename}', '_back_${filename}')
          policy.key = newKey
          return policy
        }
        return {}
      },
      holdConfig () {
        let policy = Object.assign({}, this.policy)
        let newKey = policy.key
        if (newKey) {
          newKey = newKey.replace('${filename}', '_hold_${filename}')
          policy.key = newKey
          return policy
        }
        return {}
      }
      
    },
    methods: {
      getPolicy (type) {
        let policy = Object.assign({}, this.policy)
        let newKey = policy.key
        if (newKey) {
          newKey = newKey.replace('${filename}', '_' + type + '_${filename}')
          policy.key = newKey
          return policy
        }

        return {}
      },
      async submit () {
        if (!this.photo1) {
          utils.alert(this.$i18n.t('kyc_photo1_empty'))
          return
        }
        if (!this.photo2) {
          utils.alert(this.$i18n.t('kyc_photo2_empty'))
          return
        }
        if (!this.photo3) {
          utils.alert(this.$i18n.t('kyc_photo3_empty'))
          return
        }
        let result = await service.updateKycInfo({
          photo1: this.photo1,
          photo2: this.photo2,
          photo3: this.photo3
        })

        if (!result.code) {
          this.$router.push({
            name: 'KycStep3'
          })
        } else {
          utils.alert(result.message)
        }
      },
      handleIdFrontSuccess (res, file) {
        this.photo1 = `${this.uploadConfig.host}/${this.policy.dir}${this.filedir}_front_${file.name}`
      },
      handleIdBackSuccess (res, file) {
        this.photo2 = `${this.uploadConfig.host}/${this.policy.dir}${this.filedir}_back_${file.name}`
      },
      handleIdHoldSuccess (res, file) {
        this.photo3 = `${this.uploadConfig.host}/${this.policy.dir}${this.filedir}_hold_${file.name}`
      }
    },
    async beforeRouteEnter(to, from, next) {
      let res = await service.getKycInfo()
      if (!res.code) {
        kycInfo = res.data
        if (kycInfo.state != 0) {
          console.log('goto:: step3')
          next({
            name: 'KycStep3'
          })
        }
      }
      next()
    },
    async created () {
      this.filedir = this.id + '_' + utils.generateToken(32)
      this.photo1 = kycInfo.photo1
      this.photo2 = kycInfo.photo2
      this.photo3 = kycInfo.photo3
      let policy = await service.getOSSPolicy()
      if (!policy.code) {
        this.policy = JSON.parse(policy.data)
        this.uploadConfig.host = this.policy.host
        let obj = {
          'key' : this.policy.dir +  this.filedir + '${filename}', // this.policy.dir,
          'policy': this.policy.policy,
          'OSSAccessKeyId': this.policy.accessid, 
          'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
          'signature': this.policy.signature,
          'dir': this.policy.dir
        }

        this.policy = obj
        
      } else {
        utils.alert('获取服务端签名失败')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../styles/vars";
  @import '../../../styles/mixins';

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
                .upload {
                    width: 260px;
                    height: 190px;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    background-color: #f7f7f7;
                    
                    float: left;

                    .upload_box {
                      width: 100%;
                      height: 100%;
                      background-repeat: no-repeat;
                      background-position: center 32px;
                      
                    }
                    .img {
                      width: 100%;
                    }
                    .up_face{
                        background-image: url(../../../assets/id-up.png);
                    }
                    .up_emblem{
                        background-image: url(../../../assets/id-down.png);
                    }
                    .up_take{
                        background-image: url(../../../assets/id-people.png);
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
</style>

<style lang="scss">
.el-upload-dragger {
  width: 260px;
  height: 190px;
  border: none;
  background: transparent;
}
</style>
