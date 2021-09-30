import {state} from '@/modules/store';
import utils from '@/modules/utils'

export default {
  data() {
    return {
      state, utils,
      nc: null, ncData: {}, isnc: false
    }
  },
  methods: {
    initnc() {
      const vm = this;
      const lang = {
        'zh-CN': 'cn',
        'zh-HK': 'tw',
        'en': 'en',
        'ko': 'ko_KR'
      };
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
          success: function (data) {
            vm.ncData = {...data, scene};
            vm.isnc = true;
            if (vm.ncback) vm.ncback();
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
      this.isnc = false;
    }
  }
}
