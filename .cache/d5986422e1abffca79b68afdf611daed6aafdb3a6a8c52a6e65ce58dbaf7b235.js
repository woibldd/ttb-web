{"source":"webpackJsonp([66],{\"0LNh\":function(t,e){},yRGQ:function(t,e,i){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var a=i(\"XzMP\"),s=i(\"+m19\"),r=i(\"j3T7\"),n=(i(\"6lib\"),i(\"zOMd\"),{data:function(){return{checked:!0,form:{name:\"\",uid:0,email:\"\",region:\"\",create_time:Date.parse(new Date),update_time:Date.parse(new Date)},emailAlertFlag:!1,regionData:a.a,errorMsg:\"\",emailFlag:!1}},computed:{lang:function(){return r.c.locale},uid:function(){return r.c.userInfo?r.c.userInfo.id:\"\"},plc:function(){return this.$t(\"please_choose\")}},methods:{filterInput:function(t){return t.replace(/[^A-z0-9]/,\"\")},nextHandle:function(){var e=this;this.form.email?this.form.name?this.form.email?s.a.proxyApply({uid:this.uid,email:this.form.email}).then(function(t){0===t.code?(e.form.uid=e.uid,s.a.proxyApplyInsert(e.form).then(function(t){0===t.code?e.$router.push(\"/planSuccess\"):e.$message.error(t.message)})):30015===t.code?e.emailAlertFlag=!0:e.$message.error(t.message)}):this.$message.error(this.$t(\"region_ph\")):this.$message.error(this.$t(\"kyc_name_err\")):this.$message.error(this.$t(\"application_ipt_email\"))},emailAlertHandle:function(){this.$router.push(\"/profile/security/summary\")},emailHandle:function(){this.emailFlag=!1;/^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,10}$/.test(this.form.email)?(this.errorMsg=\"\",this.emailFlag=!0):(this.errorMsg=this.$t(\"err_invalid_email\"),this.emailFlag=!1)},realHandle:function(){this.form.name?this.errorMsg=\"\":this.errorMsg=this.$t(\"otc_kvcoc_9\")},applyHandle:function(){this.$router.push(\"/treaty\")}},created:function(){this.form.uid=Number(this.uid)}}),l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",{staticClass:\"next-container\"},[a(\"div\",{staticClass:\"next-container-con\"},[a(\"h1\",[e._v(\" \"+e._s(e.$t(\"application_account\"))+\" \")]),e._v(\" \"),a(\"p\",[e._v(e._s(e.$t(\"application_tip\")))]),e._v(\" \"),a(\"div\",{staticClass:\"error-msg\"},[e._v(\" \"+e._s(e.errorMsg)+\" \")]),e._v(\" \"),a(\"div\",{staticClass:\"next-container-ipt\",class:{err:e.errorMsg},staticStyle:{\"margin-top\":\"0\"}},[a(\"div\",{staticClass:\"ipt\"},[a(\"label\",{staticClass:\"tip\",attrs:{for:\"email\"}},[e._v(\" \"+e._s(e.$t(\"application_ipt_email\"))+\" \")]),e._v(\" \"),a(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:e.form.email,expression:\"form.email\"}],attrs:{type:\"text\",id:\"email\",autocomplete:\"off\"},domProps:{value:e.form.email},on:{input:[function(t){t.target.composing||e.$set(e.form,\"email\",t.target.value)},e.emailHandle]}}),e._v(\" \"),a(\"div\",{staticClass:\"tips\"},[a(\"div\",{staticClass:\"tip-text\"},[a(\"p\",[e._v(e._s(e.$t(\"application_email_tip_1\")))]),e._v(\" \"),a(\"p\",[e._v(e._s(e.$t(\"application_email_tip_2\")))])])])])]),e._v(\" \"),a(\"div\",{staticClass:\"next-container-ipt\"},[a(\"div\",{staticClass:\"ipt\"},[a(\"label\",{staticClass:\"tip\",attrs:{for:\"name\"}},[e._v(e._s(e.$t(\"realName\")))]),e._v(\" \"),a(\"el-input\",{attrs:{type:\"text\",id:\"name\",autocomplete:\"off\",disabled:!e.emailFlag,name:\"name\"},on:{input:function(t){return e.form.name=e.validSe(t)}},model:{value:e.form.name,callback:function(t){e.$set(e.form,\"name\",t)},expression:\"form.name\"}})],1)]),e._v(\" \"),a(\"div\",{staticClass:\"next-container-ipt\"},[a(\"div\",{staticClass:\"ipt\"},[a(\"div\",{staticClass:\"tip\",attrs:{for:\"region\"}},[e._v(e._s(e.$t(\"country\")))]),e._v(\" \"),a(\"el-select\",{staticStyle:{width:\"100%\"},attrs:{placeholder:e.plc,disabled:!e.emailFlag},model:{value:e.form.region,callback:function(t){e.$set(e.form,\"region\",t)},expression:\"form.region\"}},e._l(e.regionData.data,function(t){return a(\"el-option\",{key:t.id,attrs:{label:\"en\"===e.lang?t.fullname:t.cname,value:t.id}})}),1)],1)]),e._v(\" \"),a(\"div\",{staticClass:\"next-container-checked\"},[a(\"el-checkbox\",{model:{value:e.checked,callback:function(t){e.checked=t},expression:\"checked\"}},[a(\"span\",{staticClass:\"true\"},[e._v(e._s(e.$t(\"application_check\")))])]),e._v(\" \"),a(\"a\",{attrs:{href:\"javascript:;\"},on:{click:e.applyHandle}},[e._v(e._s(e.$t(\"application_xy\")))])],1),e._v(\" \"),a(\"div\",{staticClass:\"next-container-btn\",on:{click:e.nextHandle}},[a(\"input\",{attrs:{type:\"button\",disabled:!e.checked,value:this.$t(\"submit\")}})])]),e._v(\" \"),e.emailAlertFlag?a(\"div\",{staticClass:\"submit-alert-mask\"},[a(\"div\",{staticClass:\"submit-alert-container\"},[a(\"div\",{staticClass:\"close\",on:{click:function(t){e.emailAlertFlag=!1}}},[a(\"img\",{attrs:{src:i(\"/TeD\"),alt:\"\",width:\"36\",height:\"36\"}})]),e._v(\" \"),a(\"div\",{staticClass:\"title\"},[e._v(\"\\n          \"+e._s(e.$t(\"s_email\"))+\"\\n        \")]),e._v(\" \"),a(\"div\",{staticClass:\"button\",on:{click:e.emailAlertHandle}},[e._v(\"\\n          \"+e._s(e.$t(\"bd\"))+\"\\n        \")])])]):e._e()])},staticRenderFns:[]};var o=i(\"C7Lr\")(n,l,!1,function(t){i(\"0LNh\")},null,null);e.default=o.exports}});"}