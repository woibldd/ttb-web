<template>
  <div
    class="pc-download-container"
    ref="pcDown">
    <div class="banner">
      <div class="main-info">
        <div class="slogan-txt">
          <p>{{ $t('dowload_text_1') }}</p>
          <p>{{ $t('dowload_text_2') }}</p>
        </div>
        <div class="qr-note-row">{{ $t('download_scan_qr') }}</div>
        <div class="download-btns">
          <div class="qr-img">
            <img v-if="ix"
              src="../../assets/download/ix_download_qr.png"
              alt="dl">
            <img v-else
              src="../../assets/download/ixex.io.png"
              alt="dl">
          </div>
          <div class="btns">
            <div
              class="download__btn">
              <img
                v-if="ix"
                src="../../assets/download/ix_download_qr.png"
                alt=""
                class="qr__img">
                <img
                  v-else
                  src="../../assets/download/ixex.io.png"
                  alt=""
                  class="qr__img">
              <icon
                name="android"
                class="download__icon"/> {{ $t('download_android') }}
            </div>
            <div
              class="download__btn ios">
              <img
                v-if="ix"
                src="../../assets/download/ix_download_qr.png"
                alt=""
                class="qr__img">
                <img
                  v-else
                  src="../../assets/download/ixex.io.png"
                  alt=""
                  class="qr__img">
              <icon
                name="iphone"
                class="download__icon"/> {{ $t('download_ios') }}
            </div>
            <div
              class="download__text"
              @click="goIosTurorial">
              {{ $t('download_ios_tutorial') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="attrct-features">
      <div class="bg bg-one">
        <div class="feature--txt mr-30">
          <div class="txt-1">IXX APP</div>
          <div class="txt-2">
            {{ $t('dowload_text_3') }}
          </div>
          <div class="txt-3">
            {{ $t('dowload_text_4') }}
          </div>
        </div>
        <div class="phone phone-one"/>
      </div>
      <div class="bg bg-two">
        <div class="phone phone-two mr-30"/>

        <div class="feature--txt">
          <div class="txt-1">
            {{ $t('dowload_text_5') }}
          </div>
          <div class="txt-2">
            {{ $t('dowload_text_6') }}
          </div>
          <div class="txt-3">
            {{ $t('dowload_text_7') }}
          </div>
        </div>
      </div>
      <div class="bg bg-three">
        <div class="feature--txt">
          <div class="txt-1">
            {{ $t('download_pc_txt_3_1') }}
          </div>
          <div class="txt-2">
            {{ $t('download_pc_txt_3_2') }}
          </div>
          <div class="txt-3">
            {{ $t('download_pc_txt_3_3') }}
          </div>
        </div>
        <div class="phone phone-three"/>
      </div>
      <div class="bg bg-four">
        <div class="phone phone-four mr-30"/>
        <div class="feature--txt">
          <div class="txt-1">
            {{ $t('dowload_text_11') }}

          </div>
          <div class="txt-3">
            {{ $t('dowload_text_12') }}
          </div>
        </div>
      </div>
<!--
      <div class="bg bg-five">
        <div class="feature--txt">
          <div class="txt-1">
            {{ $t('download_pc_txt_5_1') }}
          </div>
          <div class="txt-3">
            {{ $t('download_pc_txt_5_2') }}
          </div>
        </div>
        <div class="phone phone-five"/>
      </div>
-->
    </div>
    <div
      class="download-immediate"
      @click="downloadImme">
            {{ $t('download_down_imme') }}

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      href : location.origin,
      ix: false
    }
  },
  created(){
    if(location.origin === 'https://ixx.com'){
      this.ixx = true
    }
   },
  methods: {
    download (type) {
      let url = 'https://ixx.com/app/ixx.apk'
      if (type === 'ios') {
        url = 'itms-services://?action=download-manifest&url=https://ixx.com/app/IXX.plist'
      }
      window.open(url, '_blank')
    },
    downloadImme () {
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0
      } else {
        document.body.scrollTop = 0
      }
    },
    goIosTurorial () {
      window.open('https://ixcustomer.zendesk.com/hc/zh-cn/articles/360020414512', '_blank')
    }
  }
}
</script>
<style>
.router-Download {
    min-width: 1200px;
}
</style>
<style scoped lang="scss">
.pc-download-container {
    color: #fff;
    min-width: 1200px;
}
.banner {
    width: 100%;
    height: 100vw * (690/1920);
    background-image: url(~@/assets/download/banner.jpg);
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    min-width: 1200px;
    .main-info {
        height: 100%;
        box-sizing: border-box;
        padding-top: 120px * 100vw / 1920px;
        padding-left: 50%;
    }

}
.slogan-txt {
    font-size:36px;
}
.qr-note-row {
    font-size: 18px;
    margin-top: 30px;
    margin-bottom: 19px;
}
.download-btns {
    display: flex;
}
.qr-img {
    width:160px;
    height:160px;
    margin-right: 16px;
    border-radius: 4px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
}
.btns {
    box-sizing: border-box;
    padding-top: 10px;
}
.download__btn {
    cursor: pointer;
    width:200px;
    height:48px;
    background:rgba(0,139,250,1);
    border-radius:6px;
    box-sizing: border-box;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;

    .download__icon {
        margin-right: 10px;
    }

    &.ios {
        background-color: #23CED0;
    }
    position: relative;
    .qr__img {
        position: absolute;
        left: 120%;
        bottom: -24px;
        width: 160px;
        height: 160px;
        display: none;
    }

    &:hover {
        .qr__img {
            display: block;
        }
    }
}
.download__text {
    color: #CECECE;
    font-size: 14px;
    width: 200px;
    text-align: center;
    cursor: pointer;
}

.attrct-features {
    background-color: #fff;
    padding-top: 60px;

    .txt-1 {
        font-size: 32px;
        color: #23CED0;
    }
    .txt-2 {
        font-size:32px;
        font-weight:600;
        color:#23CED0;
    }
    .txt-3 {
        font-size:16px;
        font-weight:400;
        color:rgba(102,102,102,1);
        width: 100%;
    }
    .bg {
        width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        height: 100vw * (690 / 1920) ;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &.bg-one {
            background-image: url(~@/assets/download/bg-one.jpg)
        }
        &.bg-two {
            background-image: url(~@/assets/download/bg-two.jpg)
        }
        &.bg-three {
            background-image: url(~@/assets/download/bg-three.jpg)
        }
        &.bg-four {
            background-image: url(~@/assets/download/bg-four.jpg)
        }
        &.bg-five {
            padding-top: 45px;
            height: 100vw * (330 / 1920);
            background-image: url(~@/assets/download/bg-five.jpg)
        }
        .phone {
            width: 291px;
            height: 576px;
            background-size: 100%;
            background-repeat: no-repeat;

            &.phone-one {
                background-image: url(~@/assets/download/iphone-1.png)
            }
            &.phone-two {
                background-image: url(~@/assets/download/iphone-2.png)
            }
            &.phone-three {
                background-image: url(~@/assets/download/iphone-3.png)
            }
            &.phone-four {
                background-image: url(~@/assets/download/iphone-5.png)
            }
            &.phone-five {
/*                background-image: url(~@/assets/download/iphone-5.png)*/
            }
        }

    }
    .feature--txt {
        width: 549px;
    }
}
.download-immediate{
    width:300px;
    height:64px;
    font-size:28px;
    text-align: center;
    line-height: 64px;
    background:#23CED0;
    border-radius:6px;
    margin: 240px auto 60px;
    cursor: pointer;
}
@media screen and (max-width: 1600px) {
  .banner{
      height: 690px;
  }

}
</style>
