<template>
  <div class="nc-box" :class="{succls}">
    <div class="mask" v-if="mask"></div>
    <div id="nc"></div>
  </div> 
</template>

<script>
import {state} from '@/modules/store';
import utils from '@/modules/utils'

export default {
  props: {
    mask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      state, utils, nc: null, succls: false, ncmask: true
    }
  },
  mounted() {
    this.initnc();
  },
  methods: {
    initnc() {
      const vm = this;
      const lang = {'zh-CN': 'cn', 'zh-HK': 'tw', 'en': 'en', 'ko': 'ko_KR'};
      AWSC.use("nc", function (state, module) {
        const isMobile = vm.utils.isMobile();
        const scene = isMobile ? 'nc_login_h5' : 'nc_login';
        const routerLan = vm.$route.query.lang;
        const language = routerLan ? lang[routerLan] : lang[vm.state.locale];

        vm.nc = module.init({
          language,
          appkey: "FFFF0N0000000000A411",
          scene,
          renderTo: "nc",
          upLang: {
            'cn': {
              'SLIDE': "向右滑动安全验证"
            },
            'tw': {
              'SLIDE': '向右滑動安全驗證'
            },
            'en': {
              'SLIDE': 'Slide security verification to the right'
            },
            'ko_KR': {
              'SLIDE': '오른쪽으로 미끄럼 안전 검증'
            }
          },
          success: function (data) {
            vm.succls = true;
            vm.isnc = true;
            vm.$emit('getnc', {...data, scene});
          },
          fail: function (failCode) {
            console.log('failCode', failCode)
          },
          error: function (errorCode) {
            console.log('errorCode', errorCode)
          }
        });
      })
    },
    ncshow() {
      this.nc.show();
    },
    nchidde() {
      this.nc.hide();
    },
    ncreset() {
      this.nc.reset();
    }
  }
}
</script>

<style lang="scss" scoped>
.nc-box{
  width: 100%; height: 40px; position: relative;
  .common{height: 40px!important; line-height: 40px!important; border-radius: 4px!important;}
  .nc-container .nc_wrapper{width: 100%!important;}
  .mask{position: absolute; z-index: 10; left: 0; right: 0; top: 0; bottom: 0;}

  .nc-container .nc_wrapper, .nc_scale, .scale_text, .nc_bg {
    @extend .common;
  }
  .nc_bg{background: $primary!important;}
  .btn_slide, .btn_ok {height: 38px!important; line-height: 38px !important;}
  .btn_slide{border-radius: 4px 0 0 4px;}
  .btn_ok{border-radius: 0 4px 4px 0;}
  .nc-lang-cnt{@extend .common; font-size: 14px;}
}
</style>