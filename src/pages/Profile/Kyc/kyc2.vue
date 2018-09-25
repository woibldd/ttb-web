<template>
  <div class="profile-container">
    <div class="title-box">{{ $t('identity_authentication') }}</div>
    <div
      class="invinfo-box"
      :class="['id_type_' + id_type]">
      <div class="authen_top">
        <i class="jd"/>
        <p class="yy">
          {{ $t('identity_authentication1') }}
        </p>
        <p class="yy">
          {{ $t('kyc_upload') }}
        </p>
        <p>
          {{ $t('kyc_complete') }}
        </p>
        <i/>
      </div>
      <div class="aut_box">
        <div class="aut_lt">{{ $t('kyc_upload') }}</div>
        <div class="aut_rt">
          <div class="aut_up">
            <image-upload
              type="front"
              :url="front.url"
              :host="uploadConfig.host"
              :config="frontConfig"
              @uploadProgress="uploadProgress"
              @uploadSuccess="uploadSuccess"
              @uploadError="uploadError"
              @uploadStart="uploadStart">
              <template slot-scope="file">
                <img
                  class="img"
                  v-if="file.dataUrl"
                  :src="file.dataUrl"
                  alt="">
                <div class="upload_box up_face">
                  <div
                    ref="front_mask"
                    class="mask"
                    v-if="file.dataUrl"/>
                  <span class="upload_desc"><icon
                    class="upload_icon"
                    name="upload"/> {{ $t(id_type === 1 ? 'kyc_id_front_upload': 'kyc_passport_front_upload') }}</span>
                </div>
              </template>
            </image-upload>
          </div>
          <div class="aut_up_txt">
            <!-- <p>{{ $t('kyc_name') }}</p> -->
            <!-- <p>{{ $t('kyc_id_number') }}：10010198802022222</p> -->
          </div>
        </div>
        <div class="aut_rt">
          <div class="aut_up">
            <image-upload
              type="back"
              :url="back.url"
              :host="uploadConfig.host"
              :config="backConfig"
              @uploadProgress="uploadProgress"
              @uploadSuccess="uploadSuccess"
              @uploadError="uploadError"
              @uploadStart="uploadStart">
              <template slot-scope="file">
                <img
                  class="img"
                  v-if="file.dataUrl"
                  :src="file.dataUrl"
                  alt="">
                <div class="upload_box up_emblem">
                  <div
                    ref="back_mask"
                    class="mask"
                    v-if="file.dataUrl"/>
                  <span class="upload_desc"><icon
                    class="upload_icon"
                    name="upload"/> {{ $t(id_type === 1 ? 'kyc_id_back_upload' : 'kyc_passport_back_upload') }}</span>
                </div>
              </template>
            </image-upload>
            <p>{{ $t('kyc_notice1') }}</p>
          </div>
          <div class="aut_up_txt">
            <!-- <p>{{ $t('kyc_valid_time') }}：2018.03.22-2038.03.22</p> -->
          </div>
        </div>
      </div>
      <div class="aut_box">
        <div class="aut_lt">{{ $t('kyc_hand') }}</div>
        <div class="aut_rt">
          <div class="aut_up">
            <image-upload
              type="hold"
              :url="hold.url"
              :host="uploadConfig.host"
              :config="holdConfig"
              @uploadProgress="uploadProgress"
              @uploadSuccess="uploadSuccess"
              @uploadError="uploadError"
              @uploadStart="uploadStart">
              <template slot-scope="file">
                <img
                  class="img"
                  v-if="file.dataUrl"
                  :src="file.dataUrl"
                  alt="">
                <div class="upload_box up_take">
                  <div
                    ref="hold_mask"
                    class="mask"
                    v-if="file.dataUrl"/>
                  <span class="upload_desc"><icon
                    class="upload_icon"
                    name="upload"/> {{ $t(id_type === 1 ? 'kyc_id_hold_upload': 'kyc_passport_hold_upload') }}</span>
                </div>
              </template>
            </image-upload>
            <p v-html="$t('kyc_notice2')"/>
          </div>
          <div/>
        </div>
      </div>
      <div class="aut_box">
        <div class="aut_lt"/>
        <div class="aut_rta">
          <v-btn
            class="submit-btn"
            :label="$t('kyc_submit')"
            :loading="loading"
            @click="submit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import VBtn from '@/components/VBtn'
import ImageUpload from '@/components/common/ix-upload'
import {state} from '@/modules/store'
import utils from '@/modules/utils'
let kycInfo = {}
export default {
  name: 'SafeVerified',
  components: {
    VBtn,
    ImageUpload
  },
  data () {
    return {
      state,
      loading: false,
      policy: {},
      uploadConfig: {
        host: '//ix-test.oss-cn-beijing.aliyuncs.com'
      },
      id_type: 1,
      front: {
        loading: false,
        error: false,
        url: ''
      },
      back: {
        loading: false,
        error: false,
        url: ''
      },
      hold: {
        loading: false,
        error: false,
        url: ''
      },
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
      if (this.front.loading || this.back.loading || this.hold.loading) {
        debugger
        utils.alert(this.$i18n.t('kyc_image_uploading'))
        return
      }

      if (!this.front.url) {
        utils.alert(this.$i18n.t('kyc_photo1_empty'))
        return
      }
      if (!this.back.url) {
        utils.alert(this.$i18n.t('kyc_photo2_empty'))
        return
      }
      if (!this.hold.url) {
        utils.alert(this.$i18n.t('kyc_photo3_empty'))
        return
      }

      let result = await service.updateKycInfo({
        photo1: this.front.url,
        photo2: this.back.url,
        photo3: this.hold.url
      })

      if (!result.code) {
        this.$router.push({
          name: 'KycStep3'
        })
      } else {
        utils.alert(result.message)
      }
    },
    uploadStart ({type}) {
      this[type].loading = true
    },
    uploadProgress ({type, file}) {
      this.$refs[type + '_mask'].style.transform = 'translateY(' + file.percentage + '%)'
    },
    uploadSuccess ({type, file}) {
      this.$refs[type + '_mask'].style.transform = 'translateY(100%)'
      this[type].loading = false
      this[type].url = `${this.uploadConfig.host}/${this.policy.dir}${this.filedir}_${type}_${file.name}`
      console.log(this[type].url)
    },
    uploadError ({type, message}) {
      this[type].error = message
      this[type].loading = false
      utils.alert(message)
    }
  },
  async beforeRouteEnter (to, from, next) {
    let res = await service.getKycInfo()
    if (!res.code) {
      kycInfo = res.data
      if (kycInfo.state !== 0) {
        if (kycInfo.state === -1) {
          next()
          return
        }
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
    this.id_type = kycInfo.id_type

    this.front.url = this.photo1
    this.back.url = this.photo2
    this.hold.url = this.photo3
    let policy = await service.getOSSPolicy()
    if (!policy.code) {
      this.policy = JSON.parse(policy.data)
      this.uploadConfig.host = this.policy.host
      let obj = {
        'key': this.policy.dir + this.filedir + '${filename}', // this.policy.dir,
        'policy': this.policy.policy,
        'OSSAccessKeyId': this.policy.accessid,
        'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
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

    &.id_type_2 {
      .aut_box .aut_rt div.aut_up .upload .up_face {
        background-image: url(../../../assets/id-passport.png)
      }
    }
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
                      @include clearfix();
                      background-repeat: no-repeat;
                      background-position: center 32px;

                      .mask {
                        position: absolute;
                        width: 100%;
                        top: 0;
                        height: 100%;
                        background: #eee;
                        transform: translateY(0%);
                        transition: translateY 2s;
                        opacity: 0.5;
                      }

                      .upload_desc {
                        position: absolute;
                        bottom: 20px;
                        color: #C1A538;
                        display: block;
                        width: 100%;
                      }
                    }
                    .img {
                      width: 100%;
                      position: absolute;
                      left: 0;
                      top: 0;
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
  width: 260px !important;
  height: 190px !important;
  border: none !important;
  background: transparent !important;
}
</style>
