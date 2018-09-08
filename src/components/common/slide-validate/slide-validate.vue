<template>
    <div class="v-slide-validate" id="v-slide-validate">

    </div>
</template>
<script>
export default {
  name: 'v-validate',
  mounted () {
    const nc_token = ['CF_APP_1', (new Date()).getTime(), Math.random()].join(':')
    const NC_Opt =
        {
          renderTo: '#v-slide-validate',
          appkey: 'CF_APP_1',
          scene: 'register',
          token: nc_token,
          customWidth: 280,
          trans: {'key1': 'code0'},
          elementID: ['usernameID'],
          is_Opt: 0,
          language: 'cn',
          isEnabled: true,
          timeout: 3000,
          times: 5,
          apimap: {
            // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
            // 'get_captcha': '//b.com/get_captcha/ver3',
            // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
            // 'get_img': '//c.com/get_img',
            // 'checkcode': '//d.com/captcha/checkcode.jsonp',
            // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
            // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
            // 'umid_serUrl': 'https://g.com/service/um.json'
          },
          callback: function (data) {
            window.console && console.log(nc_token)
            window.console && console.log(data.csessionid)
            window.console && console.log(data.sig)
          }
        }
    const nc = new noCaptcha(NC_Opt)
    nc.upLang('en', {
      _startTEXT: '请按住滑块，拖动到最右边',
      _yesTEXT: '验证通过',
      _error300: '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
      _errorNetwork: '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
    })
  }
}
</script>
<style lang="scss">
    .v-slide-validate.nc-container{
        width: 280px;
        .nc_wrapper {
            width: 100% !important;
        }
        .nc_scale {
            background-color: #313e4b;
            border: 1px solid $text-link;
            border-radius: 4px;
            overflow: hidden;

            > span {
                background-color: $text-link;
                border: 0;
                height: 100%;
                color: #ffffff;
            }
            .scale_text2 {
                color: $text-link;
            }
            .nc_bg {
                background-color: #313e4b;
            }
            .btn_ok {
                background: $text-link url('../../../assets/icon_slide-validate-success.png') no-repeat center !important;
                & > * {
                    display: none;
                }
            }
        }
    }
</style>
