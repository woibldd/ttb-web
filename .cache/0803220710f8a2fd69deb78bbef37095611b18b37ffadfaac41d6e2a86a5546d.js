{"source":"webpackJsonp([21],{Lm0K:function(t,e){},kIPY:function(t,e,a){\"use strict\";var n=a(\"lC5x\"),i=a.n(n),s=a(\"J0Oq\"),r=a.n(s),c=a(\"+m19\"),l={data:function(){return{kycRouter:{path:\"/profile/kyc/\"},info:{}}},methods:{init:function(){var a=this;return r()(i.a.mark(function t(){var e;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.a.getKycInfo();case 2:(e=t.sent).code||(a.info=e.data);case 4:case\"end\":return t.stop()}},t,a)}))()}},created:function(){this.init()}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"profile-left-container\"},[a(\"div\",{staticClass:\"left-menu-container left-menu-nobottom\"},[a(\"p\",{staticClass:\"left-menu-title\"},[a(\"icon\",{attrs:{name:\"personal-center\"}}),t._v(\" \"),a(\"span\",{staticClass:\"menu-title\"},[t._v(t._s(t.$t(\"profile_personal_center\")))])],1),t._v(\" \"),a(\"ul\",{staticClass:\"left-menu-list\"},[a(\"li\",{},[a(\"router-link\",{staticClass:\"menu-name\",attrs:{\"active-class\":\"active\",to:{name:\"ProfileInfo\"}}},[t._v(t._s(t.$t(\"profile_left_invite_perinfo\")))])],1),t._v(\" \"),a(\"li\",{},[a(\"router-link\",{staticClass:\"menu-name\",attrs:{\"active-class\":\"active\",to:{name:\"ProfileSafety\"}}},[t._v(t._s(t.$t(\"profile_left_invite_safety\")))])],1),t._v(\" \"),a(\"li\",{},[2===t.info.lv&&2===t.info.state?[a(\"router-link\",{staticClass:\"menu-name\",attrs:{replace:!0,\"active-class\":\"active\",to:\"/profile/kyc/kyc_step3\"}},[t._v(t._s(t.$t(\"profile_sec_kyc\")))])]:[a(\"router-link\",{staticClass:\"menu-name\",attrs:{replace:!0,\"active-class\":\"active\",to:t.kycRouter}},[t._v(t._s(t.$t(\"profile_sec_kyc\")))])]],2),t._v(\" \"),a(\"li\",{},[a(\"router-link\",{staticClass:\"menu-name\",attrs:{\"active-class\":\"active\",to:{name:\"ProfileApi\"}}},[t._v(t._s(t.$t(\"api_management\")))])],1),t._v(\" \"),a(\"li\",{},[a(\"router-link\",{staticClass:\"menu-name\",attrs:{to:{name:\"invite\"},\"active-class\":\"active\"}},[t._v(\"\\n          \"+t._s(t.$t(\"profile_left_invite\"))+\"\\n        \")])],1),t._v(\" \"),a(\"li\",{},[a(\"router-link\",{staticClass:\"menu-name\",attrs:{to:{name:\"MessageSettings\"},\"active-class\":\"active\"}},[t._v(\"\\n          \"+t._s(t.$t(\"profile_left_message_setting\"))+\"\\n        \")])],1)])])])},staticRenderFns:[]};var f=a(\"C7Lr\")(l,o,!1,function(t){a(\"Lm0K\")},\"data-v-31d54774\",null);e.a=f.exports},qKQV:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var n=a(\"kIPY\"),i={mixins:[a(\"yx0X\").a],name:\"Profile\",components:{ProfileLeft:n.a}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"page page-profile\"},[a(\"div\",{staticStyle:{}},[a(\"profile-left\"),t._v(\" \"),a(\"router-view\")],1)])},staticRenderFns:[]};var r=a(\"C7Lr\")(i,s,!1,function(t){a(\"rIhW\")},\"data-v-685c23fd\",null);e.default=r.exports},rIhW:function(t,e){}});"}