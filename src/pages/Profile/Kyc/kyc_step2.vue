show_box
<template>
  <div class="profile-container">
    <div class="title-box">
      {{ $t('identity_authentication') }}
      <span>{{ $t('Verified') }}</span>
    </div>
    <div class="invinfo-box">
      <div class="authen_top">
        <i class="jd"/>
        <p class="yy">{{ $t('kyc_top_authen_1') }}</p>
        <p class="yy">{{ $t('kyc_top_authen_2') }}</p>
      </div>
      <div class="option-title">
        <h3>
          <i>1</i>
          <span>{{$t('kyc_title_info')}} </span>
          <label class="finish">{{$t('kyc_title_state_complete')}}</label> 
          <b v-if="!!userName">{{ userName }},</b>
          <b>{{ userNumber }}</b>
        </h3>
        <h3>
          <i>2</i>
          <span>{{$t('kyc_advanced')}}</span>
          <label class="pending">{{$t('kyc_title_state_padding')}}</label>
        </h3>
      </div>
      <div v-if="step===1" class="option-content" :class="['id_type_' + id_type]">
        <div class="aut_box">
          <!-- <div class="aut_lt">{{ $t('kyc_upload') }}</div> -->
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
                @uploadStart="uploadStart"
              >
                <template slot-scope="file">
                  <div class="upload_box up_face">
                    <div ref="front_mask" class="mask" v-if="file.dataUrl"/>
                    <span class="upload_desc">
                      <icon class="upload_icon" name="upload"/>
                      {{ $t(id_type === 1 ? 'kyc_id_front_upload': 'kyc_passport_front_upload') }}
                    </span>
                  </div>
                  <!-- <div class="show_box" v-if="file.dataUrl">
                    <img class="img" v-if="file.dataUrl" :src="file.dataUrl" alt>
                    <span class="upload_desc">
                      <icon class="upload_icon" name="big"/>
                      <icon class="upload_icon" name="delete"/>
                    </span>
                  </div>-->
                </template>
              </image-upload>
              <div class="show_box" v-if="front.url">
                <img class="img" v-if="front.url" :src="front.url" alt>
                <div class="upload_desc"> 
                  <div class="tools">
                    <div class="button" @click="openImage(front.url)">
                      <icon class="upload_icon" name="big"/>
                    </div>
                    <div class="button" @click="front.url=''">
                      <icon class="upload_icon" name="delete"/>
                    </div>
                  </div>
                </div>
              </div>
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
                @uploadStart="uploadStart"
              >
                <template slot-scope="file">
                  <!-- <img class="img" v-if="file.dataUrl" :src="file.dataUrl" alt> -->
                  <div class="upload_box up_emblem">
                    <div ref="back_mask" class="mask" v-if="file.dataUrl"/>
                    <span class="upload_desc">
                      <icon class="upload_icon" name="upload"/>
                      {{ $t(id_type === 1 ? 'kyc_id_back_upload' : 'kyc_passport_back_upload') }}
                    </span>
                  </div>
                  <!-- <div class="show_box" v-if="file.dataUrl">
                    <img class="img" v-if="file.dataUrl" :src="file.dataUrl" alt>
                    <span class="upload_desc">
                      <icon class="upload_icon" name="big"/>
                      <icon class="upload_icon" name="delete"/>
                    </span>
                  </div> -->
                </template>
              </image-upload>
              <div class="show_box" v-if="back.url">
                <img class="img" v-if="back.url" :src="back.url" alt>
                <div class="upload_desc"> 
                  <div class="tools">
                    <div class="button" @click="openImage(back.url)">
                      <icon class="upload_icon" name="big"/>
                    </div>
                    <div class="button" @click="back.url=''">
                      <icon class="upload_icon" name="delete"/>
                    </div>
                  </div>
                </div>
              </div>
              <p>{{ $t('kyc_notice1') }}</p>
            </div>
            <div class="aut_up_txt">
              <!-- <p>{{ $t('kyc_valid_time') }}：2018.03.22-2038.03.22</p> -->
            </div>
          </div>
          <div class="aut_rta"></div>
        </div>
        <div v-if="!isChinese" class="aut_box">
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
                @uploadStart="uploadStart"
              >
                <template slot-scope="file">
                  <!-- <img class="img" v-if="file.dataUrl" :src="file.dataUrl" alt> -->
                  <div class="upload_box up_take">
                    <div ref="hold_mask" class="mask" v-if="file.dataUrl"/>
                    <span class="upload_desc">
                      <icon class="upload_icon" name="upload"/>
                      {{ $t(id_type === 1 ? 'kyc_id_hold_upload': 'kyc_passport_hold_upload') }}
                    </span>
                  </div>
                  <!-- <div class="show_box" v-if="file.dataUrl">
                    <img class="img" v-if="file.dataUrl" :src="file.dataUrl" alt>
                    <span class="upload_desc">
                      <icon class="upload_icon" name="big" @click.stop="openImage(file.dataUrl)"/>
                      <icon class="upload_icon" name="delete"/>
                    </span>
                  </div> -->
                </template>
              </image-upload>
               <div class="show_box" v-if="hold.url">
                <img class="img" v-if="hold.url" :src="hold.url" alt>
                <div class="upload_desc">
                  <div class="tools">
                    <div class="button" @click="openImage(hold.url)">
                      <icon class="upload_icon" name="big"/>
                    </div>
                    <div class="button" @click="hold.url=''">
                      <icon class="upload_icon" name="delete"/>
                    </div>
                  </div>
                </div>
              </div>
              <p v-html="$t('kyc_notice2')"/>
            </div>
            <div class="aut_show"></div>
          </div>
        </div>
        <div class="aut_box">
          <!-- <div class="aut_lt"/> -->
          <div class="aut_rt">
            <v-btn class="submit-btn" :label="$t('nextstep')" :loading="loading" @click="submit"/>
          </div>
          <div class="aut_rta"></div>
        </div>
      </div>
      <div v-if="step===2" class="option-content">
        <div class="gt_ewm">
          <div class="pd-10" style="background:#fff; height: 160px; box-sizing: border-box">
            <canvas class="qr-img" ref="qr"/>
          </div>
        </div>
        <p class="mt-20">{{$t('kyc_notice_3')}}</p>
        <div class="option-button">
          <p class="message">
            {{message}}
          </p>
          <v-btn class="mr-22 router-btn light kyc-btn" :label="$t('kyc_btn_face_recognition')" @click="isFaceComplete"></v-btn>
          <!-- <router-link class="mr-22 router-btn" :to="{ name:'KycStep3'}">{{ $t('我已在手机上完成人脸识别验证') }}</router-link> --> 
          <v-btn class="mr-22 router-btn " :label="$t('kyc_btn_failure')" @click="revalidation"></v-btn>
        </div>
      </div>
      <div v-if="step===3" class="option-content">
         <div class="option-button">
            <v-btn class="mr-22 router-btn  kyc-btn" :label="$t('kyc_btn_failure')" @click="revalidation"></v-btn>
        </div>
      </div>
    </div>
    <v-modal  :open.sync="showImage">
      <div class="qr">
        <img :src="imgsrc" alt style="max-height:600px;">
      </div>
    </v-modal>
  </div>
</template>
<script>
import service from "@/modules/service";
import VBtn from "@/components/VBtn";
import ImageUpload from "@/components/common/ix-upload";
import { state, actions } from "@/modules/store";
import utils from "@/modules/utils";
import qs from "query-string";
const qrcode = () => import(/* webpackChunkName: "Qrcode" */ "qrcode");

const { reload } = qs.parse(location.search);
let kycInfo = {};

export default {
  name: "SafeVerified",
  components: {
    VBtn,
    ImageUpload
  },
  data() {
    return {
      state,
      loading: false,
      policy: {},
      uploadConfig: {
        host: "//ix-test.oss-cn-beijing.aliyuncs.com"
      },
      id_type: 1,
      front: {
        loading: false,
        error: false,
        url: ""
      },
      back: {
        loading: false,
        error: false,
        url: ""
      },
      hold: {
        loading: false,
        error: false,
        url: ""
      },
      filedir: "",
      step: 1, // 1：上传照片， 2：人脸识别
      url: "",
      imgsrc: "",
      showImage: false,
      message: ""
    };
  },
  computed: {
    userInfo() {
      return state.userInfo || {};
    },
    id() {
      return this.userInfo.id;
    },
    isChinese() {
      return kycInfo.region === 86;
    },
    frontConfig() {
      let policy = Object.assign({}, this.policy);
      let newKey = policy.key;
      if (newKey) {
        newKey = newKey.replace("${filename}", "_front_${filename}");
        policy.key = newKey;
        return policy;
      }
      return {};
    },
    backConfig() {
      let policy = Object.assign({}, this.policy);
      let newKey = policy.key;
      if (newKey) {
        newKey = newKey.replace("${filename}", "_back_${filename}");
        policy.key = newKey;
        return policy;
      }
      return {};
    },
    holdConfig() {
      let policy = Object.assign({}, this.policy);
      let newKey = policy.key;
      if (newKey) {
        newKey = newKey.replace("${filename}", "_hold_${filename}");
        policy.key = newKey;
        return policy;
      }
      return {};
    },
    userName() { 
      if (!kycInfo.name) {
        return ""
      }
      else if (kycInfo.name.length <= 4) {
        return kycInfo.name.substr(0, 1) + "***"
      }
      else { 
        return utils.publicDesensitization(kycInfo.name).toString() 
      }
    },
    userNumber() {
      return utils.publicDesensitization(kycInfo.id_number).toString()
    }
  },
  methods: {
    openImage(src) {
      if (!!src) {
        this.imgsrc = src;
        this.showImage = true;
      }
    },
    getPolicy(type) {
      let policy = Object.assign({}, this.policy);
      let newKey = policy.key;
      if (newKey) {
        newKey = newKey.replace("${filename}", "_" + type + "_${filename}");
        policy.key = newKey;
        return policy;
      }
      return {};
    },
    async submit() {
      if (this.front.loading || this.back.loading || this.hold.loading) {
        utils.alert(this.$i18n.t("kyc_image_uploading"));
        return;
      }

      if (!this.front.url) {
        utils.alert(this.$i18n.t("kyc_photo1_empty"));
        return;
      }
      if (!this.back.url) {
        utils.alert(this.$i18n.t("kyc_photo2_empty"));
        return;
      }
      if (!this.hold.url) {
        if (this.isChinese) {
          this.hold.url = "";
        } else {
          utils.alert(this.$i18n.t("kyc_photo3_empty"));
          return;
        }
      }

      let result = await service.updateKycInfo({
        photo1: this.front.url,
        photo2: this.back.url,
        photo3: this.hold.url
      });

      if (!result.code) {
        if (this.isChinese) {
          this.getKycInfo();
          this.step = 2;
        } else {
          this.$router.replace({
            name: "KycStep3"
          });
        }
      } else {
        utils.alert(result.message);
      }
    },
    //重新验证
    async revalidation() {
      await this.getKycInfo()
      if (kycInfo.lv === 0) {
        this.$router.replace({
          name: 'KycStep1',
        })
      }
      if (this.isChinese) { 
        this.message = ""
        this.step = 1;
      }
    },
    uploadStart({ type }) {
      this[type].loading = true;
      try {
        this.$refs[type + "_mask"].innerHTML = "0.00%";
      } catch (e) {}
    },
    uploadProgress({ type, file }) {
      try {
        this.$refs[type + "_mask"].style.transform =
          "translateY(" + file.percentage + "%)";
        this.$refs[type + "_mask"].innerHTML = file.percentage.toFixed(2) + "%";
      } catch (e) {
        console.log(e);
      }
    },
    uploadSuccess({ type, file }) {
      console.log(type, file);
      try {
        this.$refs[type + "_mask"].style.transform = "translateY(100%)";
      } catch (e) {
        console.log(e);
      }
      this[type].loading = false;
      this[type].url = `${this.uploadConfig.host}/${this.policy.dir}${
        this.filedir
      }_${type}_${file.name}`;
      console.log(this[type].url);
    },
    uploadError({ type, message }) {
      this[type].error = message;
      this[type].loading = false;
      utils.alert(message);
    },
    removeFile({ file }) {
      console.log(file.name);
    },
    async getFaceToken() {
      let res = await service.getFaceToken({ client: 1 });
      if (!res.code && !!res.data) {
        this.url = res.data.url;
        if (!!this.url) {
          this.setQr(this.url);
        }
      }
    },
    async faceComplete() {
      return await service.faceComplete({ client: 1 }); 
    },
    async getKycInfo() {
      let res = await service.getKycInfo();
      if (!res.code) {
        kycInfo = res.data;
        if (kycInfo.state !== 0) {
          if (kycInfo.state === -1 && reload) {
            return;
          }

          this.step = 2;
          this.getFaceToken();
        }
      }
      return res
    },
    async setQr(url) {
      const QRCode = await qrcode();
      QRCode.toCanvas(
        this.$refs.qr,
        url,
        {
          margin: 0,
          width: 140,
          height: 140,
          errorCorrectionLevel: "H"
        },
        err => {
          if (err) {
            // @improve
            return utils.log("qrcode error");
          }
          this.qrReady = true;
        }
      );
    },
    isFaceComplete () {
      service.faceComplete({ client: 1 })
      .then(res => {
        if(!res.code) {
          // console.log({faceComplete: res})
           this.$router.push({
            name: "KycStep3"
          });
        }
        else {
          this.message = res.message
        }
      })
    }
  },
  async beforeRouteEnter(to, from, next) { 
    let res = await service.getKycInfo();
    if (!res.code && !!res.data) {
      kycInfo = res.data;
      if (kycInfo.state !== 0) {
        if (kycInfo.state === -1 && reload) {
          next();
          return;
        }
        if (kycInfo.lv === 0) {
          console.log("goto:: step1");
          next({
            name: "KycStep1"
          });
        }
        else if (kycInfo.lv === 2) {
          console.log("goto:: step3");
          next({
            name: "KycStep3"
          });
        }
        else if (kycInfo.lv === 1 && kycInfo.state === 1 && kycInfo.region !== 86) {
          next({
            name: "KycStep3"
          }); 
        }
        // console.log("goto:: step3");
        // await actions.updateSession();
        // console.log(state.userInfo.region);
        // if (state.userInfo.region !== 86) {
        //   next({
        //     name: "KycStep3"
        //   });
        // }
      }
    }
    next();
  },
  async created() {
    await this.getKycInfo();
    
    if (kycInfo.lv === 2) {
      console.log("goto:: step3");
      next({
        name: "KycStep3"
      });
    }
    else if (kycInfo.lv === 1 && kycInfo.state === 1 && kycInfo.region !== 86) {
      this.$router.replace({
        name: "KycStep3"
      }); 
    }

    this.filedir = this.id + "_" + utils.generateToken(32);
    this.photo1 = kycInfo.photo1;
    this.photo2 = kycInfo.photo2;
    this.photo3 = kycInfo.photo3;
    this.id_type = kycInfo.id_type;

    this.front.url = this.photo1;
    this.back.url = this.photo2;
    this.hold.url = this.photo3;
    let policy = await service.getOSSPolicy();
    if (!policy.code) {
      this.policy = JSON.parse(policy.data);
      this.uploadConfig.host = this.policy.host;
      let obj = {
        key: this.policy.dir + this.filedir + "${filename}", // this.policy.dir,
        policy: this.policy.policy,
        OSSAccessKeyId: this.policy.accessid,
        success_action_status: "200", // 让服务端返回200,不然，默认会返回204
        signature: this.policy.signature,
        dir: this.policy.dir
      };

      this.policy = obj;
    } else {
      utils.alert("获取服务端签名失败");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";

</style>


<style lang="scss">
.el-upload-dragger {
  width: 260px !important;
  height: 190px !important;
  border: none !important;
  background: transparent !important;
}
</style>
