{"source":"webpackJsonp([44],{MWSM:function(e,t,s){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var o=s(\"lC5x\"),r=s.n(o),a=s(\"aA9S\"),n=s.n(a),i=s(\"J0Oq\"),l=s.n(i),d=s(\"+m19\"),c=s(\"30IV\"),p=s(\"DPnK\"),u=s(\"6lib\"),f=s(\"36He\"),m=s(\"j3T7\"),v={name:\"SafeVerified\",components:{VBtn:c.a,countDown:f.a},data:function(){var a=this;return{loading:!1,form:{},atPw:!1,pwCheckList:p.a.getState(\"\"),rules:{password_repeat:[{validator:function(e,t,s){return t?t!==a.form.password_new?s(new Error(a.$t(\"change_password_diff\"))):s():s(new Error(a.$i18n.t(\"err_empty_password\")))},trigger:\"blur\"}],password_new:[{validator:function(e,t,s){if(!t)return s(new Error(a.$i18n.t(\"err_empty_password\")));var o=p.a.getState(t);if(_.filter(o,function(e){return e.pass}).length<4)return s(new Error(a.$i18n.t(\"err_weak_password\")));s()},trigger:\"change\"}],password_orig:[{required:!0,message:this.$i18n.t(\"err_empty_password\"),trigger:\"blur\"}]},showModal:!1,phoneCode:\"\",emailCode:\"\",googleCode:\"\",state:m.c}},computed:{userInfo:function(){return this.state.userInfo||{}},phone:function(){return this.userInfo.phone},regionId:function(){return this.userInfo.region},email:function(){return this.userInfo.email},verify_email:function(){return this.userInfo&&this.state.userInfo.verify_email},verify_phone:function(){return this.userInfo&&this.state.userInfo.verify_phone},verify_google:function(){return this.userInfo&&this.state.userInfo.verify_google}},methods:{toLogin:function(){u.a.success(this.$i18n.t(\"reset_success\")),m.a.setUserInfo(null),d.a.signout(),this.$router.push({name:\"login\"})},submit:function(){var a=this;return l()(r.a.mark(function e(){var t,s,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a.form.password_new!==a.form.password_repeat){e.next=14;break}if(!(a.verify_phone||a.verify_email||a.verify_google)){e.next=5;break}a.showModal=!0,e.next=12;break;case 5:return t=a.verifyCode(),a.form.password_orig,a.form.password_new,s=n()(t),e.next=10,d.a.changePassword(s);case 10:(o=e.sent)&&!o.code?a.toLogin():u.a.alert(o.message);case 12:e.next=16;break;case 14:return e.abrupt(\"return\",!1);case 16:case\"end\":return e.stop()}},e,a)}))()},hideModal:function(){this.showModal=!1},pwChange:function(){this.pwCheckList=p.a.getState(this.form.password_new||\"\")},focus:function(){this.atPw=!0},blur:function(){this.atPw=!1},getPhoneVerifyCode:function(){var e={region:this.regionId,phone:this.phone};d.a.getCode4modifyPhonePassword(e).then(function(e){e.code&&u.a.alert(e.message)})},getEmailVerifyCode:function(){var e={email:this.email};d.a.getCode4modifyEmailPassword(e).then(function(e){e.code&&u.a.alert(e.message)})},keyPress:function(e){var t=e.srcElement.value;t&&6===t.length&&/^\\d{6}$/.test(t)&&this.toVerifyCode()},toVerifyCode:function(){var a=this;return l()(r.a.mark(function e(){var t,s,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.verifyCode(),s={old_password:a.form.password_orig,new_password:a.form.password_new},s=n()(s,t),e.next=5,d.a.changePassword(s);case 5:(o=e.sent)&&!o.code?a.toLogin():u.a.alert(o.message);case 7:case\"end\":return e.stop()}},e,a)}))()},verifyCode:function(){return this.verify_google?{google_code:this.googleCode}:this.verify_phone?{phone_code:this.phoneCode}:{email_code:this.emailCode}}}},w={render:function(){var s=this,e=s.$createElement,o=s._self._c||e;return o(\"div\",{staticClass:\"profile-container\"},[o(\"div\",{staticClass:\"title-box\"},[s._v(s._s(s.$t(\"profile_left_invite_safety\"))),o(\"span\",[s._v(s._s(s.$t(\"change_password\")))])]),s._v(\" \"),o(\"el-form\",{ref:\"form\",staticClass:\"invinfo-box\",attrs:{rules:s.rules,\"label-position\":\"left\",model:s.form,\"label-width\":\"170px\"}},[o(\"el-form-item\",{staticClass:\"inp_box\",attrs:{prop:\"password_orig\",label:s.$t(\"change_password_orig\")}},[o(\"el-input\",{attrs:{type:\"password\"},model:{value:s.form.password_orig,callback:function(e){s.$set(s.form,\"password_orig\",e)},expression:\"form.password_orig\"}})],1),s._v(\" \"),o(\"el-form-item\",{staticClass:\"inp_box\",attrs:{prop:\"password_new\",label:s.$t(\"change_password_new\")}},[o(\"el-input\",{attrs:{type:\"password\"},on:{input:s.pwChange,focus:s.focus,blur:s.blur},model:{value:s.form.password_new,callback:function(e){s.$set(s.form,\"password_new\",e)},expression:\"form.password_new\"}}),s._v(\" \"),o(\"div\",{staticClass:\"pw-helps\",class:{show:s.atPw}},[o(\"div\",{directives:[{name:\"t\",rawName:\"v-t\",value:\"pwcheck_guide\",expression:\"'pwcheck_guide'\"}],staticClass:\"title\"}),s._v(\" \"),o(\"ul\",{staticClass:\"pw-checks\"},s._l(s.pwCheckList,function(e,t){return o(\"li\",{key:t,staticClass:\"pw-check\"},[o(\"span\",{staticClass:\"pw-state\",class:{pass:e.pass}}),s._v(\" \"),o(\"span\",{staticClass:\"desc\"},[s._v(s._s(s.$t(e.desc)))])])}),0)])],1),s._v(\" \"),o(\"el-form-item\",{staticClass:\"inp_box\",attrs:{prop:\"password_repeat\",label:s.$t(\"change_password_repeat\")}},[o(\"el-input\",{attrs:{type:\"password\"},model:{value:s.form.password_repeat,callback:function(e){s.$set(s.form,\"password_repeat\",e)},expression:\"form.password_repeat\"}})],1),s._v(\" \"),o(\"el-form-item\",{staticClass:\"inp_box\"},[o(\"v-btn\",{staticClass:\"submit-btn\",attrs:{label:s.$t(\"modify\"),loading:s.loading},on:{click:s.submit}})],1)],1),s._v(\" \"),o(\"v-modal\",{attrs:{open:s.showModal,backdrop:!1},on:{\"update:open\":function(e){s.showModal=e},click:s.hideModal}},[o(\"div\",{staticClass:\"ensure-modal\"},[o(\"div\",{staticClass:\"modal__title mb-30\"},[s._v(s._s(s.$t(\"security_verification\")))]),s._v(\" \"),o(\"div\",{staticClass:\"modal__content\"},[s.verify_google?o(\"div\",{staticClass:\"modal__row mt-12 mb-25\"},[o(\"div\",{staticClass:\"row__label mb-9\"},[s._v(s._s(s.$t(\"fa2_google_code_mobile\")))]),s._v(\" \"),o(\"div\",{staticClass:\"row__input\"},[o(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:s.googleCode,expression:\"googleCode\"},{name:\"focus\",rawName:\"v-focus\"}],staticClass:\"input-validate google mr-14\",attrs:{maxlength:\"6\"},domProps:{value:s.googleCode},on:{input:[function(e){e.target.composing||(s.googleCode=e.target.value)},s.keyPress],keydown:function(e){return!e.type.indexOf(\"key\")&&s._k(e.keyCode,\"enter\",13,e.key,\"Enter\")?null:(e.stopPropagation(),e.preventDefault(),s.toVerifyCode(e))}}})])]):s.verify_phone?o(\"div\",{staticClass:\"modal_phone\"},[o(\"div\",{staticClass:\"modal__row\"},[o(\"div\",{staticClass:\"row__label mb-9\"},[s._v(s._s(s.$t(\"register_by_phone\")))]),s._v(\" \"),o(\"div\",{staticClass:\"row__input\"},[s._v(s._s(s.phone)+\" \")])]),s._v(\" \"),o(\"div\",{staticClass:\"modal__row mt-12 mb-25\"},[o(\"div\",{staticClass:\"row__label mb-9\"},[s._v(s._s(s.$t(\"phone_code\")))]),s._v(\" \"),o(\"div\",{staticClass:\"row__input\"},[o(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:s.phoneCode,expression:\"phoneCode\"}],staticClass:\"input-validate mr-14\",attrs:{maxlength:\"6\"},domProps:{value:s.phoneCode},on:{input:[function(e){e.target.composing||(s.phoneCode=e.target.value)},s.keyPress],keydown:function(e){return!e.type.indexOf(\"key\")&&s._k(e.keyCode,\"enter\",13,e.key,\"Enter\")?null:(e.stopPropagation(),e.preventDefault(),s.toVerifyCode(e))}}}),s._v(\" \"),o(\"count-down\",{attrs:{\"send-text\":s.$t(\"hq_send\"),\"start-when-loaded\":s.showModal,\"send-code-func\":s.getPhoneVerifyCode}})],1)])]):s.verify_email?o(\"div\",{staticClass:\"modal_phone\"},[o(\"div\",{staticClass:\"modal__row\"},[o(\"div\",{staticClass:\"row__label mb-9\"},[s._v(s._s(s.$t(\"register_by_email\")))]),s._v(\" \"),o(\"div\",{staticClass:\"row__input\"},[s._v(s._s(s.email)+\" \")])]),s._v(\" \"),o(\"div\",{staticClass:\"modal__row mt-12 mb-25\"},[o(\"div\",{staticClass:\"row__label mb-9\"},[s._v(s._s(s.$t(\"email_code\")))]),s._v(\" \"),o(\"div\",{staticClass:\"row__input\"},[o(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:s.emailCode,expression:\"emailCode\"}],staticClass:\"input-validate mr-14\",attrs:{maxlength:\"6\"},domProps:{value:s.emailCode},on:{input:[function(e){e.target.composing||(s.emailCode=e.target.value)},s.keyPress],keydown:function(e){return!e.type.indexOf(\"key\")&&s._k(e.keyCode,\"enter\",13,e.key,\"Enter\")?null:(e.stopPropagation(),e.preventDefault(),s.toVerifyCode(e))}}}),s._v(\" \"),o(\"count-down\",{attrs:{\"send-text\":s.$t(\"hq_send\"),\"start-when-loaded\":s.showModal,\"send-code-func\":s.getEmailVerifyCode}})],1)])]):s._e(),s._v(\" \"),o(\"v-btn\",{staticClass:\"w-340\",attrs:{label:s.$t(\"modify\")},on:{click:s.toVerifyCode}})],1)])])],1)},staticRenderFns:[]};var g=s(\"C7Lr\")(v,w,!1,function(e){s(\"fXcU\")},\"data-v-090ee3dd\",null);t.default=g.exports},fXcU:function(e,t){}});"}