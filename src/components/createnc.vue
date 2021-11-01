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
      default: false
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
