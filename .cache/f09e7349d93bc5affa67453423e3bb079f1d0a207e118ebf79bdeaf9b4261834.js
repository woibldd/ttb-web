{"source":"webpackJsonp([47],{\"1N8X\":function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var i=a(\"Xxa5\"),s=a.n(i),r=a(\"exGp\"),n=a.n(r),o=a(\"M4fF\"),c=a.n(o),l=a(\"6lib\"),p=a(\"+m19\"),u=a(\"DPnK\"),d=a(\"30IV\"),h=a(\"j3T7\"),m=a(\"4Chz\"),v=a(\"Oz5i\"),g={name:\"H5SignUp\",components:{VBtn:d.a,resbg:m.default,ixInput:v.a},data:function(){var e=this;return{state:h.c,by:\"phone\",errmsg:\"\",email:\"\",invitorId:\"\",password:\"\",captcha:\"\",password2:\"\",atPw:!1,accept:!0,loading:!1,pwCheckList:u.a.getState(\"\"),phone:\"\",regionId:\"\",regionOptions:[],sms:{loading:!1,status:0,countDown:0,timer:null},validateRules:{phone:{errTips:this.$t(\"bind_phone_err_format\"),validateFunc:function(e){return!/\\d+$/.test(e)}},email:{errTips:this.$t(\"err_invalid_email\"),validateFunc:function(e){return!/^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/.test(e)}},password:{errTips:this.$t(\"err_weak_password\"),validateFunc:function(e){var t=u.a.getState(e);return c.a.filter(t,function(e){return e.pass}).length<4}},password2:{errTips:this.$i18n.t(\"change_password_diff\"),validateFunc:function(){return e.password!==e.password2}},captcha:{errTips:this.$t(\"phone_code_ph\"),validateFunc:function(e){return!(e&&6===e.length)}}},triggerValidate:!1}},beforeRouteEnter:function(e,t,a){var i=document.getElementsByTagName(\"head\")[0],s=document.createElement(\"meta\");s.name=\"viewport\",s.content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\",i.appendChild(s),s.name=\"x5-orientation\",s.content=\"portrait\",i.appendChild(s),s.name=\"renderer\",s.content=\"webkit\",i.appendChild(s);var r=document.createElement(\"title\");r.append(\"IXX | 持BTC躺赚20%高额分红！\"),i.getElementsByTagName(\"title\")[0].remove(),i.appendChild(r),a()},computed:{params:function(){var e={email:this.email,password:this.password,code:this.captcha};return\"phone\"===this.by&&(e.region=this.regionId,e.phone=this.phone),this.invitorId&&(e.invitor_id=this.invitorId),e},pwLevel:function(){return c.a.filter(this.pwCheckList,function(e){return e.pass}).length},smsBtnText:function(){return 0===this.sms.status?this.$i18n.t(\"sms_send\"):2===this.sms.status?this.$i18n.t(\"sms_retry\"):this.$i18n.t(\"sms_retry\")+\"(\"+this.sms.countDown+\")\"}},watch:{params:function(){this.resetError()},$route:function(){this.resetError(),this.clearCountDown()}},methods:{submit:function(){var i=this;return n()(s.a.mark(function e(){var t,a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=i.checkParams()).ok||i.triggerValidate)return t.em&&l.a.alert(t.em),e.abrupt(\"return\",!1);e.next=4;break;case 4:return i.resetError(),i.loading=!0,e.next=8,p.a.register(i.params);case 8:if(a=e.sent,i.loading=!1,a.code)return l.a.alert(a.message),i.loading=!1,e.abrupt(\"return\",!1);e.next=14;break;case 14:l.a.eraseCookie(\"invitor\"),l.a.success(i.$i18n.t(\"register_success\")),i.$router.push({name:\"login\"});case 17:case\"end\":return e.stop()}},e,i)}))()},active:function(e){this.atPw=e},input:function(e,t){this[e]=t},switchRegister:function(){this.by=\"phone\"===this.by?\"email\":\"phone\",(document.scrollingElement||document.body).scrollTop=0},checkParams:function(){function e(e,t){return{ok:!1,em:e,field:t}}if(\"phone\"===this.by){if(!this.regionId)return e(this.$i18n.t(\"region_ph\"),\"regionId\");this.phone||(this.triggerValidate=!0)}return\"email\"===this.by&&(this.email||(this.triggerValidate=!0),/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$/.test(this.email)||(this.triggerValidate=!0)),this.password||(this.triggerValidate=!0),this.pwLevel<4&&(this.triggerValidate=!0),this.password!==this.password2&&(this.triggerValidate=!0),this.accept?{ok:!0}:e(this.$i18n.t(\"err_check_agreement\"),\"accept\")},pwChange:function(e){this.pwCheckList=u.a.getState(e)},startCountDown:function(){var e=this;clearInterval(this.sms.timer),this.sms.timer=setInterval(function(){--e.sms.countDown,e.sms.countDown<=0&&(e.sms.countDown=0,e.sms.status=2,clearInterval(e.sms.timer))},1e3)},clearCountDown:function(){this.sms.status=0,clearInterval(this.sms.timer)},getSmsCode:function(){var a=this;return n()(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(1===a.sms.status||a.sms.loading||a.loading)return e.abrupt(\"return\",!1);e.next=2;break;case 2:if(\"phone\"!==a.by){e.next=11;break}if(a.regionId){e.next=6;break}return l.a.alert(a.$i18n.t(\"region_ph\")),e.abrupt(\"return\",!1);case 6:if(a.phone){e.next=9;break}return l.a.alert(a.$i18n.t(\"bind_phone_err_empty\")),e.abrupt(\"return\",!1);case 9:e.next=14;break;case 11:if(a.email){e.next=14;break}return l.a.alert(a.$i18n.t(\"err_empty_email\")),e.abrupt(\"return\",!1);case 14:return a.sms.status=1,a.sms.countDown=60,a.startCountDown(),e.next=19,p.a.sendCode({by:a.by,region:a.regionId,phone:a.phone,email:a.email,lang:h.c.locale});case 19:(t=e.sent).code?l.a.alert(t.message):a.errmsg=\"\";case 21:case\"end\":return e.stop()}},e,a)}))()},goAgreement:function(){return\"/services\"},goPrivacy:function(){return\"/privacypolicy\"},resetError:function(){this.errmsg=\"\",this.triggerValidate=!1}},mounted:function(){},created:function(){var i=this;return n()(s.a.mark(function e(){var t,a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return document.title=\"IXX | 持BTC躺赚平台收入20%\",(t=(t=i.$route.query.invitor)||l.a.getCookie(\"invitor\"))&&/^[A-Za-z0-9]+$/.test(t)&&(i.invitorId=t),e.next=6,p.a.getRegionList();case 6:(a=e.sent).code||(i.regionOptions=a.data),\"zh-CN\"===h.c.locale&&(i.regionId=86);case 9:case\"end\":return e.stop()}},e,i)}))()},destroyed:function(){this.$eh.$off(\"app:resize\")}},f={render:function(){var r=this,e=r.$createElement,a=r._self._c||e;return a(\"div\",{staticClass:\"h5-login-container \"},[a(\"div\",{staticClass:\"panel\"},[r._m(0),r._v(\" \"),a(\"form\",{staticClass:\"form\",attrs:{onsubmit:\"return false\",autocomplete:\"off\"}},[a(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:\"phone\"===r.by,expression:\"by === 'phone'\"}],staticClass:\"field\"},[a(\"div\",{staticClass:\"input-box\"},[r.regionOptions.length?a(\"select\",{directives:[{name:\"model\",rawName:\"v-model\",value:r.regionId,expression:\"regionId\"}],staticClass:\"select item\",on:{change:function(e){var t=Array.prototype.filter.call(e.target.options,function(e){return e.selected}).map(function(e){return\"_value\"in e?e._value:e.value});r.regionId=e.target.multiple?t:t[0]}}},[a(\"option\",{attrs:{value:\"\"}},[r._v(r._s(r.$t(\"region_ph\")))]),r._v(\" \"),r._l(r.regionOptions,function(e){return a(\"option\",{key:e.id,domProps:{value:e.id}},[a(\"span\",[r._v(\"+\"+r._s(e.id))]),r._v(\" \"),\"zh-CN\"===r.state.locale?[r._v(r._s(e.cname))]:[r._v(r._s(e.fullname))]],2)})],2):a(\"v-loading\",{attrs:{color:\"gray\"}})],1)]),r._v(\" \"),a(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:\"phone\"===r.by,expression:\"by === 'phone'\"}],class:[\"field\"]},[a(\"div\",{staticClass:\"input-box\"},[a(\"ix-input\",{ref:\"phone\",attrs:{\"trigger-validate\":r.triggerValidate,required:!0,\"empty-err-tips\":r.$t(\"bind_phone_err_empty\"),rule:r.validateRules.phone,placeholder:r.$t(\"bind_phone_input\"),label:r.$t(\"phone_number\")},on:{input:function(e){r.phone=e}},model:{value:r.phone,callback:function(e){r.phone=\"string\"==typeof e?e.trim():e},expression:\"phone\"}})],1)]),r._v(\" \"),a(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:\"email\"===r.by,expression:\"by === 'email'\"}],class:[\"field\"]},[a(\"div\",{staticClass:\"input-box\"},[a(\"ix-input\",{ref:\"email\",attrs:{\"trigger-validate\":r.triggerValidate,required:!0,\"empty-err-tips\":r.$t(\"err_empty_email\"),rule:r.validateRules.email,placeholder:\"you@example.com\",label:r.$t(\"email\")},on:{input:function(e){r.email=e}},model:{value:r.email,callback:function(e){r.email=\"string\"==typeof e?e.trim():e},expression:\"email\"}})],1)]),r._v(\" \"),a(\"div\",{class:[\"field\"]},[a(\"div\",{staticClass:\"input-box\"},[a(\"ix-input\",{ref:\"captcha\",staticClass:\"register__input-captcha\",attrs:{\"trigger-validate\":r.triggerValidate,required:!0,\"empty-err-tips\":r.$t(\"err_captcha_empty\"),rule:r.validateRules.captcha,placeholder:r.$t(\"captcha\"),label:r.$t(\"captcha\")},on:{input:function(e){r.captcha=e}},model:{value:r.captcha,callback:function(e){r.captcha=\"string\"==typeof e?e.trim():e},expression:\"captcha\"}}),r._v(\" \"),a(\"a\",{staticClass:\"sms-btn\",class:{disabled:1===r.sms.status},on:{click:function(e){return e.preventDefault(),r.getSmsCode(e)}}},[r._v(\"\\n            \"+r._s(r.smsBtnText))])],1)]),r._v(\" \"),a(\"div\",{class:[\"field\"]},[a(\"div\",{staticClass:\"input-box\"},[a(\"ix-input\",{ref:\"password\",attrs:{\"trigger-validate\":r.triggerValidate,type:\"password\",required:!0,\"empty-err-tips\":r.$t(\"err_empty_password\"),rule:r.validateRules.password,placeholder:r.$t(\"pwcheck_ph\"),label:r.$t(\"password\")},on:{input:function(e){r.password=e,r.pwChange(e)},focus:function(e){return r.active(!0)},blur:function(e){return r.active(!1)}},model:{value:r.password,callback:function(e){r.password=\"string\"==typeof e?e.trim():e},expression:\"password\"}}),r._v(\" \"),a(\"div\",{staticClass:\"pw-helps\",class:{show:r.atPw}},[a(\"div\",{directives:[{name:\"t\",rawName:\"v-t\",value:\"pwcheck_guide\",expression:\"'pwcheck_guide'\"}],staticClass:\"title\"}),r._v(\" \"),a(\"ul\",{staticClass:\"pw-checks\"},r._l(r.pwCheckList,function(e,t){return a(\"li\",{key:t,staticClass:\"pw-check\"},[a(\"span\",{staticClass:\"pw-state\",class:{pass:e.pass}}),r._v(\" \"),a(\"span\",{staticClass:\"desc\"},[r._v(r._s(r.$t(e.desc)))])])}),0)])],1)]),r._v(\" \"),a(\"div\",{class:[\"field\"]},[a(\"div\",{staticClass:\"input-box\"},[a(\"ix-input\",{ref:\"password2\",attrs:{\"trigger-validate\":r.triggerValidate,required:!0,type:\"password\",\"empty-err-tips\":r.$t(\"change_password_diff\"),rule:r.validateRules.password2,placeholder:r.$t(\"pwcheck_ph2\"),label:r.$t(\"password2\")},on:{input:function(e){r.password2=e}},model:{value:r.password2,callback:function(e){r.password2=\"string\"==typeof e?e.trim():e},expression:\"password2\"}})],1)]),r._v(\" \"),a(\"div\",{class:[\"field\"]},[a(\"div\",{staticClass:\"input-box\"},[a(\"ix-input\",{ref:\"invitor\",attrs:{rule:r.validateRules.invitor,placeholder:r.$t(\"invitor_ph\"),label:r.$t(\"invitor\")},on:{input:function(e){r.invitorId=e}},model:{value:r.invitorId,callback:function(e){r.invitorId=\"string\"==typeof e?e.trim():e},expression:\"invitorId\"}})],1)]),r._v(\" \"),a(\"div\",{staticClass:\"agreement\"},[a(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:r.accept,expression:\"accept\"}],staticClass:\"checkbox\",attrs:{type:\"checkbox\",name:\"accept\",id:\"accept\"},domProps:{checked:Array.isArray(r.accept)?-1<r._i(r.accept,null):r.accept},on:{change:function(e){var t=r.accept,a=e.target,i=!!a.checked;if(Array.isArray(t)){var s=r._i(t,null);a.checked?s<0&&(r.accept=t.concat([null])):-1<s&&(r.accept=t.slice(0,s).concat(t.slice(s+1)))}else r.accept=i}}}),r._v(\" \"),a(\"label\",{attrs:{for:\"accept\"},domProps:{innerHTML:r._s(r.$t(\"agreement\",{agreement:r.goAgreement(),privacyPolicy:r.goPrivacy()}))}})]),r._v(\" \"),a(\"div\",{staticClass:\"field submit\"},[a(\"v-btn\",{staticClass:\"submit-btn\",attrs:{label:r.$t(\"signup_submit\"),loading:r.loading,height:\"40\",width:\"390\"},on:{click:r.submit}}),r._v(\" \"),a(\"div\",{staticClass:\"switch-btn\",on:{click:r.switchRegister}},[r._v(\"\\n          \"+r._s(\"phone\"===r.by?\"邮箱\":\"手机\")+\"注册\\n        \")])],1)])]),r._v(\" \"),r._m(1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",{staticClass:\"title-wrap\"},[a(\"div\",{staticClass:\"panel-title\"}),e._v(\" \"),a(\"div\",{staticClass:\"panel-head-text\"},[a(\"p\",{staticClass:\"hold-coin\"},[e._v(\"持有比特币\")]),e._v(\" \"),a(\"p\",{staticClass:\"hold-share\"},[e._v(\"每天分平台收入20%\")])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",{staticClass:\"h5__panel-next\"},[a(\"p\",[e._v(\"IXX-全球首家\")]),e._v(\" \"),a(\"p\",[e._v(\"支持比特币作为平台权益证明\")]),e._v(\" \"),a(\"p\",[e._v(\"数字货币交易平台\")])])}]};var _=a(\"VU/8\")(g,f,!1,function(e){a(\"y0v0\")},\"data-v-f41c449c\",null).exports;t.default=_},y0v0:function(e,t){}});"}