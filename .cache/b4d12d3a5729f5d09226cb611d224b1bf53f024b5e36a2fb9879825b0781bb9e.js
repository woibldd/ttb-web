{"source":"webpackJsonp([10],{\"+Up5\":function(t,a,e){\"use strict\";var c=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return;var t=new String(\"abc\");if(t[5]=\"de\",\"5\"===Object.getOwnPropertyNames(t)[0])return;for(var a={},e=0;e<10;e++)a[\"_\"+String.fromCharCode(e)]=e;if(\"0123456789\"!==Object.getOwnPropertyNames(a).map(function(t){return a[t]}).join(\"\"))return;var n={};return\"abcdefghijklmnopqrst\".split(\"\").forEach(function(t){n[t]=t}),\"abcdefghijklmnopqrst\"!==Object.keys(Object.assign({},n)).join(\"\")?void 0:1}catch(t){return}}()?Object.assign:function(t,a){for(var e,n,r=function(t){if(null==t)throw new TypeError(\"Object.assign cannot be called with null or undefined\");return Object(t)}(t),s=1;s<arguments.length;s++){for(var i in e=Object(arguments[s]))l.call(e,i)&&(r[i]=e[i]);if(c){n=c(e);for(var o=0;o<n.length;o++)u.call(e,n[o])&&(r[n[o]]=e[n[o]])}}return r}},\"7Y3S\":function(t,a){},OBCS:function(t,a){},Q8Fj:function(t,a,e){\"use strict\";t.exports=function(t){return encodeURIComponent(t).replace(/[!'()*]/g,function(t){return\"%\"+t.charCodeAt(0).toString(16).toUpperCase()})}},\"Sh+t\":function(t,a){},ehuB:function(t,a,e){\"use strict\";Object.defineProperty(a,\"__esModule\",{value:!0});var n=e(\"lC5x\"),r=e.n(n),s=e(\"J0Oq\"),i=e.n(s),o=e(\"aA9S\"),c=e.n(o),l=e(\"+m19\"),u=e(\"30IV\"),d=e(\"Oln0\"),p=e(\"j3T7\"),_=e(\"6lib\"),f=e(\"lJi5\"),v=e.n(f).a.parse(location.search).reload,h={},y={name:\"SafeVerified\",components:{VBtn:u.a,ImageUpload:d.a},data:function(){return{state:p.c,loading:!1,policy:{},uploadConfig:{host:\"//ix-test.oss-cn-beijing.aliyuncs.com\"},id_type:1,front:{loading:!1,error:!1,url:\"\"},back:{loading:!1,error:!1,url:\"\"},hold:{loading:!1,error:!1,url:\"\"},filedir:\"\"}},computed:{userInfo:function(){return p.c.userInfo||{}},id:function(){return this.userInfo.id},frontConfig:function(){var t=c()({},this.policy),a=t.key;return a?(a=a.replace(\"${filename}\",\"_front_${filename}\"),t.key=a,t):{}},backConfig:function(){var t=c()({},this.policy),a=t.key;return a?(a=a.replace(\"${filename}\",\"_back_${filename}\"),t.key=a,t):{}},holdConfig:function(){var t=c()({},this.policy),a=t.key;return a?(a=a.replace(\"${filename}\",\"_hold_${filename}\"),t.key=a,t):{}}},methods:{getPolicy:function(t){var a=c()({},this.policy),e=a.key;return e?(e=e.replace(\"${filename}\",\"_\"+t+\"_${filename}\"),a.key=e,a):{}},submit:function(){var e=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.front.loading||e.back.loading||e.hold.loading)return _.a.alert(e.$i18n.t(\"kyc_image_uploading\")),t.abrupt(\"return\");t.next=3;break;case 3:if(e.front.url){t.next=6;break}return _.a.alert(e.$i18n.t(\"kyc_photo1_empty\")),t.abrupt(\"return\");case 6:if(e.back.url){t.next=9;break}return _.a.alert(e.$i18n.t(\"kyc_photo2_empty\")),t.abrupt(\"return\");case 9:if(e.hold.url){t.next=12;break}return _.a.alert(e.$i18n.t(\"kyc_photo3_empty\")),t.abrupt(\"return\");case 12:return t.next=14,l.a.updateKycInfo({photo1:e.front.url,photo2:e.back.url,photo3:e.hold.url});case 14:(a=t.sent).code?_.a.alert(a.message):e.$router.push({name:\"KycStep3\"});case 16:case\"end\":return t.stop()}},t,e)}))()},uploadStart:function(t){var a=t.type;this[a].loading=!0;try{this.$refs[a+\"_mask\"].innerHTML=\"0.00%\"}catch(t){}},uploadProgress:function(t){var a=t.type,e=t.file;try{this.$refs[a+\"_mask\"].style.transform=\"translateY(\"+e.percentage+\"%)\",this.$refs[a+\"_mask\"].innerHTML=e.percentage.toFixed(2)+\"%\"}catch(t){}},uploadSuccess:function(t){var a=t.type,e=t.file;try{this.$refs[a+\"_mask\"].style.transform=\"translateY(100%)\"}catch(t){}this[a].loading=!1,this[a].url=this.uploadConfig.host+\"/\"+this.policy.dir+this.filedir+\"_\"+a+\"_\"+e.name},uploadError:function(t){var a=t.type,e=t.message;this[a].error=e,this[a].loading=!1,_.a.alert(e)}},beforeRouteEnter:function(t,a,e){var n=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.getKycInfo();case 2:if((a=t.sent).code){t.next=11;break}if(0===(h=a.data).state){t.next=11;break}if(-1===h.state&&v)return e(),t.abrupt(\"return\");t.next=9;break;case 9:e({name:\"KycStep3\"});case 11:e();case 12:case\"end\":return t.stop()}},t,n)}))()},created:function(){var n=this;return i()(r.a.mark(function t(){var a,e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.filedir=n.id+\"_\"+_.a.generateToken(32),n.photo1=h.photo1,n.photo2=h.photo2,n.photo3=h.photo3,n.id_type=h.id_type,n.front.url=n.photo1,n.back.url=n.photo2,n.hold.url=n.photo3,t.next=10,l.a.getOSSPolicy();case 10:(a=t.sent).code?_.a.alert(\"获取服务端签名失败\"):(n.policy=JSON.parse(a.data),n.uploadConfig.host=n.policy.host,e={key:n.policy.dir+n.filedir+\"${filename}\",policy:n.policy.policy,OSSAccessKeyId:n.policy.accessid,success_action_status:\"200\",signature:n.policy.signature,dir:n.policy.dir},n.policy=e);case 12:case\"end\":return t.stop()}},t,n)}))()}},m={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e(\"div\",{staticClass:\"profile-container\"},[e(\"div\",{staticClass:\"title-box\"},[a._v(a._s(a.$t(\"identity_authentication\")))]),a._v(\" \"),e(\"div\",{staticClass:\"invinfo-box\",class:[\"id_type_\"+a.id_type]},[e(\"div\",{staticClass:\"authen_top\"},[e(\"i\",{staticClass:\"jd\"}),a._v(\" \"),e(\"p\",{staticClass:\"yy\"},[a._v(\"\\n        \"+a._s(a.$t(\"identity_authentication1\"))+\"\\n      \")]),a._v(\" \"),e(\"p\",{staticClass:\"yy\"},[a._v(\"\\n        \"+a._s(a.$t(\"kyc_upload\"))+\"\\n      \")]),a._v(\" \"),e(\"p\",[a._v(\"\\n        \"+a._s(a.$t(\"kyc_complete\"))+\"\\n      \")]),a._v(\" \"),e(\"i\")]),a._v(\" \"),e(\"div\",{staticClass:\"aut_box\"},[e(\"div\",{staticClass:\"aut_lt\"},[a._v(a._s(a.$t(\"kyc_upload\")))]),a._v(\" \"),e(\"div\",{staticClass:\"aut_rt\"},[e(\"div\",{staticClass:\"aut_up\"},[e(\"image-upload\",{attrs:{type:\"front\",url:a.front.url,host:a.uploadConfig.host,config:a.frontConfig},on:{uploadProgress:a.uploadProgress,uploadSuccess:a.uploadSuccess,uploadError:a.uploadError,uploadStart:a.uploadStart},scopedSlots:a._u([{key:\"default\",fn:function(t){return[t.dataUrl?e(\"img\",{staticClass:\"img\",attrs:{src:t.dataUrl,alt:\"\"}}):a._e(),a._v(\" \"),e(\"div\",{staticClass:\"upload_box up_face\"},[t.dataUrl?e(\"div\",{ref:\"front_mask\",staticClass:\"mask\"}):a._e(),a._v(\" \"),e(\"span\",{staticClass:\"upload_desc\"},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"upload\"}}),a._v(\" \"+a._s(a.$t(1===a.id_type?\"kyc_id_front_upload\":\"kyc_passport_front_upload\")))],1)])]}}])})],1),a._v(\" \"),e(\"div\",{staticClass:\"aut_up_txt\"})]),a._v(\" \"),e(\"div\",{staticClass:\"aut_rt\"},[e(\"div\",{staticClass:\"aut_up\"},[e(\"image-upload\",{attrs:{type:\"back\",url:a.back.url,host:a.uploadConfig.host,config:a.backConfig},on:{uploadProgress:a.uploadProgress,uploadSuccess:a.uploadSuccess,uploadError:a.uploadError,uploadStart:a.uploadStart},scopedSlots:a._u([{key:\"default\",fn:function(t){return[t.dataUrl?e(\"img\",{staticClass:\"img\",attrs:{src:t.dataUrl,alt:\"\"}}):a._e(),a._v(\" \"),e(\"div\",{staticClass:\"upload_box up_emblem\"},[t.dataUrl?e(\"div\",{ref:\"back_mask\",staticClass:\"mask\"}):a._e(),a._v(\" \"),e(\"span\",{staticClass:\"upload_desc\"},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"upload\"}}),a._v(\" \"+a._s(a.$t(1===a.id_type?\"kyc_id_back_upload\":\"kyc_passport_back_upload\")))],1)])]}}])}),a._v(\" \"),e(\"p\",[a._v(a._s(a.$t(\"kyc_notice1\")))])],1),a._v(\" \"),e(\"div\",{staticClass:\"aut_up_txt\"})])]),a._v(\" \"),e(\"div\",{staticClass:\"aut_box\"},[e(\"div\",{staticClass:\"aut_lt\"},[a._v(a._s(a.$t(\"kyc_hand\")))]),a._v(\" \"),e(\"div\",{staticClass:\"aut_rt\"},[e(\"div\",{staticClass:\"aut_up\"},[e(\"image-upload\",{attrs:{type:\"hold\",url:a.hold.url,host:a.uploadConfig.host,config:a.holdConfig},on:{uploadProgress:a.uploadProgress,uploadSuccess:a.uploadSuccess,uploadError:a.uploadError,uploadStart:a.uploadStart},scopedSlots:a._u([{key:\"default\",fn:function(t){return[t.dataUrl?e(\"img\",{staticClass:\"img\",attrs:{src:t.dataUrl,alt:\"\"}}):a._e(),a._v(\" \"),e(\"div\",{staticClass:\"upload_box up_take\"},[t.dataUrl?e(\"div\",{ref:\"hold_mask\",staticClass:\"mask\"}):a._e(),a._v(\" \"),e(\"span\",{staticClass:\"upload_desc\"},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"upload\"}}),a._v(\" \"+a._s(a.$t(1===a.id_type?\"kyc_id_hold_upload\":\"kyc_passport_hold_upload\")))],1)])]}}])}),a._v(\" \"),e(\"p\",{domProps:{innerHTML:a._s(a.$t(\"kyc_notice2\"))}})],1),a._v(\" \"),e(\"div\")])]),a._v(\" \"),e(\"div\",{staticClass:\"aut_box\"},[e(\"div\",{staticClass:\"aut_lt\"}),a._v(\" \"),e(\"div\",{staticClass:\"aut_rta\"},[e(\"v-btn\",{staticClass:\"submit-btn\",attrs:{label:a.$t(\"kyc_submit\"),loading:a.loading},on:{click:a.submit}})],1)])])])},staticRenderFns:[]};var k=e(\"C7Lr\")(y,m,!1,function(t){e(\"jIcA\"),e(\"7Y3S\")},\"data-v-7e8961d5\",null);a.default=k.exports},hKX6:function(t,a,n){\"use strict\";Object.defineProperty(a,\"__esModule\",{value:!0});var e=n(\"lC5x\"),r=n.n(e),s=n(\"J0Oq\"),i=n.n(s),o=n(\"aA9S\"),c=n.n(o),l=n(\"+m19\"),u=n(\"30IV\"),d=n(\"Oln0\"),p=n(\"j3T7\"),_=n(\"6lib\"),f=n(\"lJi5\"),v=n.n(f).a.parse(location.search).reload,h={},y={name:\"SafeVerified\",components:{VBtn:u.a,ImageUpload:d.a},data:function(){return{state:p.c,loading:!1,policy:{},uploadConfig:{host:\"//ix-test.oss-cn-beijing.aliyuncs.com\"},id_type:1,front:{loading:!1,error:!1,url:\"\"},back:{loading:!1,error:!1,url:\"\"},hold:{loading:!1,error:!1,url:\"\"},filedir:\"\",step:1,url:\"\",imgsrc:\"\",showImage:!1,message:\"\"}},computed:{userInfo:function(){return p.c.userInfo||{}},id:function(){return this.userInfo.id},isChinese:function(){return 86===h.region},frontConfig:function(){var t=c()({},this.policy),a=t.key;return a?(a=a.replace(\"${filename}\",\"_front_${filename}\"),t.key=a,t):{}},backConfig:function(){var t=c()({},this.policy),a=t.key;return a?(a=a.replace(\"${filename}\",\"_back_${filename}\"),t.key=a,t):{}},holdConfig:function(){var t=c()({},this.policy),a=t.key;return a?(a=a.replace(\"${filename}\",\"_hold_${filename}\"),t.key=a,t):{}},userName:function(){return h.name?h.name.length<=4?h.name.substr(0,1)+\"***\":_.a.publicDesensitization(h.name).toString():\"\"},userNumber:function(){return _.a.publicDesensitization(h.id_number).toString()}},methods:{openImage:function(t){t&&(this.imgsrc=t,this.showImage=!0)},getPolicy:function(t){var a=c()({},this.policy),e=a.key;return e?(e=e.replace(\"${filename}\",\"_\"+t+\"_${filename}\"),a.key=e,a):{}},submit:function(){var e=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.front.loading||e.back.loading||e.hold.loading)return _.a.alert(e.$i18n.t(\"kyc_image_uploading\")),t.abrupt(\"return\");t.next=3;break;case 3:if(e.front.url){t.next=6;break}return _.a.alert(e.$i18n.t(\"kyc_photo1_empty\")),t.abrupt(\"return\");case 6:if(e.back.url){t.next=9;break}return _.a.alert(e.$i18n.t(\"kyc_photo2_empty\")),t.abrupt(\"return\");case 9:if(e.hold.url){t.next=16;break}if(!e.isChinese){t.next=14;break}e.hold.url=\"\",t.next=16;break;case 14:return _.a.alert(e.$i18n.t(\"kyc_photo3_empty\")),t.abrupt(\"return\");case 16:return t.next=18,l.a.updateKycInfo({photo1:e.front.url,photo2:e.back.url,photo3:e.hold.url});case 18:(a=t.sent).code?_.a.alert(a.message):e.isChinese?(e.getKycInfo(),e.step=2):e.$router.replace({name:\"KycStep3\"});case 20:case\"end\":return t.stop()}},t,e)}))()},revalidation:function(){var a=this;return i()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.getKycInfo();case 2:0===h.lv&&a.$router.replace({name:\"KycStep1\"}),a.isChinese&&(a.message=\"\",a.step=1);case 4:case\"end\":return t.stop()}},t,a)}))()},uploadStart:function(t){var a=t.type;this[a].loading=!0;try{this.$refs[a+\"_mask\"].innerHTML=\"0.00%\"}catch(t){}},uploadProgress:function(t){var a=t.type,e=t.file;try{this.$refs[a+\"_mask\"].style.transform=\"translateY(\"+e.percentage+\"%)\",this.$refs[a+\"_mask\"].innerHTML=e.percentage.toFixed(2)+\"%\"}catch(t){}},uploadSuccess:function(t){var a=t.type,e=t.file;try{this.$refs[a+\"_mask\"].style.transform=\"translateY(100%)\"}catch(t){}this[a].loading=!1,this[a].url=this.uploadConfig.host+\"/\"+this.policy.dir+this.filedir+\"_\"+a+\"_\"+e.name},uploadError:function(t){var a=t.type,e=t.message;this[a].error=e,this[a].loading=!1,_.a.alert(e)},removeFile:function(t){t.file},getFaceToken:function(){var e=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.getFaceToken({client:1});case 2:!(a=t.sent).code&&a.data&&(e.url=a.data.url,e.url&&e.setQr(e.url));case 4:case\"end\":return t.stop()}},t,e)}))()},faceComplete:function(){var a=this;return i()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.faceComplete({client:1});case 2:return t.abrupt(\"return\",t.sent);case 3:case\"end\":return t.stop()}},t,a)}))()},getKycInfo:function(){var e=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.getKycInfo();case 2:if((a=t.sent).code){t.next=10;break}if(0===(h=a.data).state){t.next=10;break}if(-1===h.state&&v)return t.abrupt(\"return\");t.next=8;break;case 8:e.step=2,e.getFaceToken();case 10:return t.abrupt(\"return\",a);case 11:case\"end\":return t.stop()}},t,e)}))()},setQr:function(a){var e=this;return i()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.e(80).then(n.bind(null,\"tSqM\"));case 2:t.sent.toCanvas(e.$refs.qr,a,{margin:0,width:140,height:140,errorCorrectionLevel:\"H\"},function(t){if(t)return _.a.log(\"qrcode error\");e.qrReady=!0});case 4:case\"end\":return t.stop()}},t,e)}))()},isFaceComplete:function(){var a=this;l.a.faceComplete({client:1}).then(function(t){t.code?a.message=t.message:a.$router.push({name:\"KycStep3\"})})}},beforeRouteEnter:function(t,a,e){var n=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.getKycInfo();case 2:if((a=t.sent).code||!a.data){t.next=10;break}if(0===(h=a.data).state){t.next=10;break}if(-1===h.state&&v)return e(),t.abrupt(\"return\");t.next=9;break;case 9:0===h.lv?e({name:\"KycStep1\"}):2===h.lv?e({name:\"KycStep3\"}):1===h.lv&&1===h.state&&86!==h.region&&e({name:\"KycStep3\"});case 10:e();case 11:case\"end\":return t.stop()}},t,n)}))()},created:function(){var n=this;return i()(r.a.mark(function t(){var a,e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.getKycInfo();case 2:return 2===h.lv?next({name:\"KycStep3\"}):1===h.lv&&1===h.state&&86!==h.region&&n.$router.replace({name:\"KycStep3\"}),n.filedir=n.id+\"_\"+_.a.generateToken(32),n.photo1=h.photo1,n.photo2=h.photo2,n.photo3=h.photo3,n.id_type=h.id_type,n.front.url=n.photo1,n.back.url=n.photo2,n.hold.url=n.photo3,t.next=13,l.a.getOSSPolicy();case 13:(a=t.sent).code?_.a.alert(\"获取服务端签名失败\"):(n.policy=JSON.parse(a.data),n.uploadConfig.host=n.policy.host,e={key:n.policy.dir+n.filedir+\"${filename}\",policy:n.policy.policy,OSSAccessKeyId:n.policy.accessid,success_action_status:\"200\",signature:n.policy.signature,dir:n.policy.dir},n.policy=e);case 15:case\"end\":return t.stop()}},t,n)}))()}},m={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e(\"div\",{staticClass:\"profile-container\"},[e(\"div\",{staticClass:\"title-box\"},[a._v(\"\\n    \"+a._s(a.$t(\"identity_authentication\"))+\"\\n    \"),e(\"span\",[a._v(a._s(a.$t(\"Verified\")))])]),a._v(\" \"),e(\"div\",{staticClass:\"invinfo-box\"},[e(\"div\",{staticClass:\"authen_top\"},[e(\"i\",{staticClass:\"jd\"}),a._v(\" \"),e(\"p\",{staticClass:\"yy\"},[a._v(a._s(a.$t(\"kyc_top_authen_1\")))]),a._v(\" \"),e(\"p\",{staticClass:\"yy\"},[a._v(a._s(a.$t(\"kyc_top_authen_2\")))])]),a._v(\" \"),e(\"div\",{staticClass:\"option-title\"},[e(\"h3\",[e(\"i\",[a._v(\"1\")]),a._v(\" \"),e(\"span\",[a._v(a._s(a.$t(\"kyc_title_info\"))+\" \")]),a._v(\" \"),e(\"label\",{staticClass:\"finish\"},[a._v(a._s(a.$t(\"kyc_title_state_complete\")))]),a._v(\" \"),a.userName?e(\"b\",[a._v(a._s(a.userName)+\",\")]):a._e(),a._v(\" \"),e(\"b\",[a._v(a._s(a.userNumber))])]),a._v(\" \"),e(\"h3\",{staticClass:\"pt-10\"},[e(\"i\",[a._v(\"2\")]),a._v(\" \"),e(\"span\",[a._v(a._s(a.$t(\"kyc_advanced\")))]),a._v(\" \"),e(\"label\",{staticClass:\"pending\"},[a._v(a._s(a.$t(\"kyc_title_state_padding\")))])])]),a._v(\" \"),1===a.step?e(\"div\",{staticClass:\"option-content\",class:[\"id_type_\"+a.id_type]},[e(\"div\",{staticClass:\"aut_box\"},[e(\"div\",{staticClass:\"aut_rt\"},[e(\"div\",{staticClass:\"aut_up\"},[e(\"image-upload\",{attrs:{type:\"front\",url:a.front.url,host:a.uploadConfig.host,config:a.frontConfig},on:{uploadProgress:a.uploadProgress,uploadSuccess:a.uploadSuccess,uploadError:a.uploadError,uploadStart:a.uploadStart},scopedSlots:a._u([{key:\"default\",fn:function(t){return[e(\"div\",{staticClass:\"upload_box up_face\"},[t.dataUrl?e(\"div\",{ref:\"front_mask\",staticClass:\"mask\"}):a._e(),a._v(\" \"),e(\"span\",{staticClass:\"upload_desc\"},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"upload\"}}),a._v(\"\\n                    \"+a._s(a.$t(1===a.id_type?\"kyc_id_front_upload\":\"kyc_passport_front_upload\"))+\"\\n                  \")],1)])]}}],null,!1,1606292811)}),a._v(\" \"),a.front.url?e(\"div\",{staticClass:\"show_box\"},[a.front.url?e(\"img\",{staticClass:\"img\",attrs:{src:a.front.url,alt:\"\"}}):a._e(),a._v(\" \"),e(\"div\",{staticClass:\"upload_desc\"},[e(\"div\",{staticClass:\"tools\"},[e(\"div\",{staticClass:\"button\",on:{click:function(t){return a.openImage(a.front.url)}}},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"big\"}})],1),a._v(\" \"),e(\"div\",{staticClass:\"button\",on:{click:function(t){a.front.url=\"\"}}},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"delete\"}})],1)])])]):a._e()],1),a._v(\" \"),e(\"div\",{staticClass:\"aut_up_txt\"})]),a._v(\" \"),e(\"div\",{staticClass:\"aut_rt\"},[e(\"div\",{staticClass:\"aut_up\"},[e(\"image-upload\",{attrs:{type:\"back\",url:a.back.url,host:a.uploadConfig.host,config:a.backConfig},on:{uploadProgress:a.uploadProgress,uploadSuccess:a.uploadSuccess,uploadError:a.uploadError,uploadStart:a.uploadStart},scopedSlots:a._u([{key:\"default\",fn:function(t){return[e(\"div\",{staticClass:\"upload_box up_emblem\"},[t.dataUrl?e(\"div\",{ref:\"back_mask\",staticClass:\"mask\"}):a._e(),a._v(\" \"),e(\"span\",{staticClass:\"upload_desc\"},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"upload\"}}),a._v(\"\\n                    \"+a._s(a.$t(1===a.id_type?\"kyc_id_back_upload\":\"kyc_passport_back_upload\"))+\"\\n                  \")],1)])]}}],null,!1,3502960494)}),a._v(\" \"),a.back.url?e(\"div\",{staticClass:\"show_box\"},[a.back.url?e(\"img\",{staticClass:\"img\",attrs:{src:a.back.url,alt:\"\"}}):a._e(),a._v(\" \"),e(\"div\",{staticClass:\"upload_desc\"},[e(\"div\",{staticClass:\"tools\"},[e(\"div\",{staticClass:\"button\",on:{click:function(t){return a.openImage(a.back.url)}}},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"big\"}})],1),a._v(\" \"),e(\"div\",{staticClass:\"button\",on:{click:function(t){a.back.url=\"\"}}},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"delete\"}})],1)])])]):a._e(),a._v(\" \"),e(\"p\",[a._v(a._s(a.$t(\"kyc_notice1\")))])],1),a._v(\" \"),e(\"div\",{staticClass:\"aut_up_txt\"})]),a._v(\" \"),e(\"div\",{staticClass:\"aut_rta\"})]),a._v(\" \"),a.isChinese?a._e():e(\"div\",{staticClass:\"aut_box\"},[e(\"div\",{staticClass:\"aut_lt\"},[a._v(a._s(a.$t(\"kyc_hand\")))]),a._v(\" \"),e(\"div\",{staticClass:\"aut_rt\"},[e(\"div\",{staticClass:\"aut_up\"},[e(\"image-upload\",{attrs:{type:\"hold\",url:a.hold.url,host:a.uploadConfig.host,config:a.holdConfig},on:{uploadProgress:a.uploadProgress,uploadSuccess:a.uploadSuccess,uploadError:a.uploadError,uploadStart:a.uploadStart},scopedSlots:a._u([{key:\"default\",fn:function(t){return[e(\"div\",{staticClass:\"upload_box up_take\"},[t.dataUrl?e(\"div\",{ref:\"hold_mask\",staticClass:\"mask\"}):a._e(),a._v(\" \"),e(\"span\",{staticClass:\"upload_desc\"},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"upload\"}}),a._v(\"\\n                    \"+a._s(a.$t(1===a.id_type?\"kyc_id_hold_upload\":\"kyc_passport_hold_upload\"))+\"\\n                  \")],1)])]}}],null,!1,3698891167)}),a._v(\" \"),a.hold.url?e(\"div\",{staticClass:\"show_box\"},[a.hold.url?e(\"img\",{staticClass:\"img\",attrs:{src:a.hold.url,alt:\"\"}}):a._e(),a._v(\" \"),e(\"div\",{staticClass:\"upload_desc\"},[e(\"div\",{staticClass:\"tools\"},[e(\"div\",{staticClass:\"button\",on:{click:function(t){return a.openImage(a.hold.url)}}},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"big\"}})],1),a._v(\" \"),e(\"div\",{staticClass:\"button\",on:{click:function(t){a.hold.url=\"\"}}},[e(\"icon\",{staticClass:\"upload_icon\",attrs:{name:\"delete\"}})],1)])])]):a._e(),a._v(\" \"),e(\"p\",{domProps:{innerHTML:a._s(a.$t(\"kyc_notice2\"))}})],1),a._v(\" \"),e(\"div\",{staticClass:\"aut_show\"})])]),a._v(\" \"),e(\"div\",{staticClass:\"aut_box\"},[e(\"div\",{staticClass:\"aut_rt\"},[e(\"v-btn\",{staticClass:\"submit-btn\",attrs:{label:a.$t(\"nextstep\"),loading:a.loading},on:{click:a.submit}})],1),a._v(\" \"),e(\"div\",{staticClass:\"aut_rta\"})])]):a._e(),a._v(\" \"),2===a.step?e(\"div\",{staticClass:\"option-content\"},[e(\"div\",{staticClass:\"gt_ewm\"},[e(\"div\",{staticClass:\"pd-10\",staticStyle:{background:\"#fff\",height:\"160px\",\"box-sizing\":\"border-box\"}},[e(\"canvas\",{ref:\"qr\",staticClass:\"qr-img\"})])]),a._v(\" \"),e(\"p\",{staticClass:\"mt-20\"},[a._v(a._s(a.$t(\"kyc_notice_3\")))]),a._v(\" \"),e(\"div\",{staticClass:\"option-button\"},[e(\"p\",{staticClass:\"message\"},[a._v(\"\\n          \"+a._s(a.message)+\"\\n        \")]),a._v(\" \"),e(\"v-btn\",{staticClass:\"mr-22 router-btn light kyc-btn\",attrs:{label:a.$t(\"kyc_btn_face_recognition\")},on:{click:a.isFaceComplete}}),a._v(\" \"),e(\"v-btn\",{staticClass:\"mr-22 router-btn \",attrs:{label:a.$t(\"kyc_btn_failure\")},on:{click:a.revalidation}})],1)]):a._e(),a._v(\" \"),3===a.step?e(\"div\",{staticClass:\"option-content\"},[e(\"div\",{staticClass:\"option-button\"},[e(\"v-btn\",{staticClass:\"mr-22 router-btn  kyc-btn\",attrs:{label:a.$t(\"kyc_btn_failure\")},on:{click:a.revalidation}})],1)]):a._e()]),a._v(\" \"),e(\"v-modal\",{attrs:{open:a.showImage},on:{\"update:open\":function(t){a.showImage=t}}},[e(\"div\",{staticClass:\"qr\"},[e(\"img\",{staticStyle:{\"max-height\":\"600px\"},attrs:{src:a.imgsrc,alt:\"\"}})])])],1)},staticRenderFns:[]};var k=n(\"C7Lr\")(y,m,!1,function(t){n(\"OBCS\"),n(\"sR/e\")},\"data-v-8785545c\",null);a.default=k.exports},jIcA:function(t,a){},lJi5:function(t,a,e){\"use strict\";var n=e(\"Q8Fj\"),i=e(\"+Up5\");function o(t,a){return a.encode?(a.strict?n:encodeURIComponent)(t):t}a.extract=function(t){return t.split(\"?\")[1]||\"\"},a.parse=function(t,a){var r=function(t){var n;switch(t.arrayFormat){case\"index\":return function(t,a,e){n=/\\[(\\d*)\\]$/.exec(t),t=t.replace(/\\[\\d*\\]$/,\"\"),n?(void 0===e[t]&&(e[t]={}),e[t][n[1]]=a):e[t]=a};case\"bracket\":return function(t,a,e){n=/(\\[\\])$/.exec(t),t=t.replace(/\\[\\]$/,\"\"),n?void 0!==e[t]?e[t]=[].concat(e[t],a):e[t]=[a]:e[t]=a};default:return function(t,a,e){void 0!==e[t]?e[t]=[].concat(e[t],a):e[t]=a}}}(a=i({arrayFormat:\"none\"},a)),s=Object.create(null);return\"string\"!=typeof t?s:(t=t.trim().replace(/^(\\?|#|&)/,\"\"))?(t.split(\"&\").forEach(function(t){var a=t.replace(/\\+/g,\" \").split(\"=\"),e=a.shift(),n=0<a.length?a.join(\"=\"):void 0;n=void 0===n?null:decodeURIComponent(n),r(decodeURIComponent(e),n,s)}),Object.keys(s).sort().reduce(function(t,a){var e=s[a];return Boolean(e)&&\"object\"==typeof e&&!Array.isArray(e)?t[a]=function t(a){return Array.isArray(a)?a.sort():\"object\"==typeof a?t(Object.keys(a)).sort(function(t,a){return Number(t)-Number(a)}).map(function(t){return a[t]}):a}(e):t[a]=e,t},Object.create(null))):s},a.stringify=function(n,r){var s=function(n){switch(n.arrayFormat){case\"index\":return function(t,a,e){return null===a?[o(t,n),\"[\",e,\"]\"].join(\"\"):[o(t,n),\"[\",o(e,n),\"]=\",o(a,n)].join(\"\")};case\"bracket\":return function(t,a){return null===a?o(t,n):[o(t,n),\"[]=\",o(a,n)].join(\"\")};default:return function(t,a){return null===a?o(t,n):[o(t,n),\"=\",o(a,n)].join(\"\")}}}(r=i({encode:!0,strict:!0,arrayFormat:\"none\"},r));return n?Object.keys(n).sort().map(function(a){var t=n[a];if(void 0===t)return\"\";if(null===t)return o(a,r);if(Array.isArray(t)){var e=[];return t.slice().forEach(function(t){void 0!==t&&e.push(s(a,t,e.length))}),e.join(\"&\")}return o(a,r)+\"=\"+o(t,r)}).filter(function(t){return 0<t.length}).join(\"&\"):\"\"}},oFh3:function(t,a,e){\"use strict\";Object.defineProperty(a,\"__esModule\",{value:!0});var n=e(\"lC5x\"),r=e.n(n),s=e(\"J0Oq\"),i=e.n(s),o=e(\"+m19\"),c=e(\"30IV\"),l=e(\"j3T7\"),u={},d={name:\"SafeVerified\",components:{VBtn:c.a},i18n:{messages:{en:{101:\"Identification certificate is not clear enough;\",102:\"The identification certificate is smeared or modified;\",103:\"The identity certificate is covered or misses a corner;\",104:\"Identification certificate with watermark or Logo;\",105:\"Identification certificate is invalid;\",106:\"The identity certificate registered place does not match the selected country or region;\",107:\"The identity certificate type does not match the selected type;\",108:\"The identity certificate information does not match the information you filled in;\",109:\"The identity certificate applicant is under 18 years old;\",110:\"The identity certificate holder is on the list of rejected verification;\",111:\"Identity certificate does not support the the country of user;\",201:\"Hand-held white paper and ID photos are not clear enough;\",202:\"Hand-held white paper and ID are smeared or modified;\",203:\"Hand-held white paper and ID photo of the are covered or incomplete ;\",204:\"Hand-held white paper and ID photo with watermark or Logo;\",205:\"Hands with blank paper and ID photo without certificate;\",206:\"Hands with white paper and ID photos using others’ certificate;\",207:\"Hands with blank paper and ID photos without IX on a white paper and date for verification;\",208:\"Hand-held white paper and ID photo ID are not the same as previously uploaded certificate;\",209:\"Hand-held white paper and ID photo paper without “IX”;\",210:\"Hand-held white paper and ID photo papers without date for verification;\",211:\"The date on the hand-held white paper and the paper of ID photo does not match;\"},\"zh-CN\":{0:\"\",101:\"身份证明证件不够清晰\",102:\"身份证明证件存在涂抹修改\",103:\"身份证明证件存在遮盖或缺角\",104:\"身份证明证件带有水印或Logo\",105:\"身份证明证件失效\",106:\"身份证明证件与所选择的国家或地区不符\",107:\"身份证明证件与所选证件类型不符\",108:\"身份证明证件与填写的信息不符\",109:\"身份证明证件申请人未满18岁\",110:\"身份证明证件持有人在拒绝审核名单内\",111:\"身份证明证件暂不支持该国家用户\",201:\"手持白纸及证件照片不够清晰\",202:\"手持白纸及证件照片存在涂抹修改\",203:\"手持白纸及证件照片存在遮盖或缺角\",204:\"手持白纸及证件照片带有水印或Logo\",205:\"手持白纸及证件照片缺少证件\",206:\"手持白纸及证件照片使用了别人的证件\",207:\"手持白纸及证件照片缺少手持写上IX及提审日期的白纸\",208:\"手持白纸及证件照片证件与先前上传的证件不相同\",209:\"手持白纸及证件照片纸片没有写上IX\",210:\"手持白纸及证件照片纸片没有写上提审日期\",211:\"手持白纸及证件照片纸片上的日期与提审日期不符\",212:\"证件持有人、证件、白纸没有同时出现在照片内\"}}},data:function(){return{state:l.c,kycInfo:u}},computed:{kycState:function(){return this.kycInfo?this.kycInfo.state:-2},kyclv:function(){if(this.kycInfo)return this.kycInfo.lv},rejectReasons:function(){return this.kycInfo&&this.kycInfo.reason?this.kycInfo.reason.split(\",\"):[]}},methods:{},created:function(){var e=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.getKycInfo();case 2:(a=t.sent).code||(e.kycInfo=a.data);case 4:case\"end\":return t.stop()}},t,e)}))()}},p={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e(\"div\",{staticClass:\"profile-container\"},[e(\"div\",{staticClass:\"title-box\"},[a._v(a._s(a.$t(\"identity_authentication\")))]),a._v(\" \"),e(\"div\",{staticClass:\"invinfo-box\"},[e(\"div\",{staticClass:\"authen_top\"},[e(\"i\",{staticClass:\"jd\"}),a._v(\" \"),e(\"p\",{staticClass:\"yy\"},[a._v(a._s(a.$t(\"kyc_top_authen_1\")))]),a._v(\" \"),e(\"p\",{staticClass:\"yy\"},[a._v(a._s(a.$t(\"kyc_top_authen_2\")))])]),a._v(\" \"),e(\"div\",{staticClass:\"notify\"},[1===a.kycState&&1===a.kyclv?e(\"div\",{staticClass:\"content mb-30\"},[e(\"p\",{staticClass:\"p1\"},[e(\"icon\",{attrs:{name:\"kyc_review\"}}),a._v(\"\\n          \"+a._s(a.$t(\"profile_kyc_ing\"))+\"\\n        \")],1),a._v(\" \"),e(\"p\",{staticClass:\"p2 mt-24\"},[a._v(\"\\n          \"+a._s(a.$t(\"profile_kyc_ing_desc\"))+\"\\n        \")])]):1===a.kycState&&2===a.kyclv||2===a.kycState?e(\"div\",{staticClass:\"content mb-30\"},[e(\"p\",{staticClass:\"p1\"},[e(\"icon\",{attrs:{name:\"kyc_pass\"}}),a._v(\"\\n          \"+a._s(a.$t(\"profile_kyc_success\"))+\"\\n        \")],1)]):-1===a.kycState?e(\"div\",{staticClass:\"content mb-30\"},[e(\"p\",{staticClass:\"p1\"},[e(\"icon\",{attrs:{name:\"kyc_fail\"}}),a._v(\"\\n          \"+a._s(a.$t(\"profile_kyc_fail\"))+\"\\n        \")],1),a._v(\" \"),e(\"p\",{staticClass:\"p2 mt-24\",domProps:{innerHTML:a._s(a.$t(\"profile_kyc_again\",{kyc:\"/profile/kyc/kyc_step2?reload=true\"}))}}),a._v(\" \"),e(\"p\",{staticClass:\"p3 mt-24\"},a._l(a.rejectReasons,function(t){return e(\"span\",{key:t,staticClass:\"reason\"},[a._v(\"\\n            \"+a._s(a.$i18n.t(t))+\"\\n          \")])}),0)]):e(\"div\",{staticClass:\"content mb-30\"})])])])},staticRenderFns:[]};var _=e(\"C7Lr\")(d,p,!1,function(t){e(\"Sh+t\")},\"data-v-3704c2d6\",null);a.default=_.exports},\"sR/e\":function(t,a){}});"}