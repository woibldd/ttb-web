{"source":"webpackJsonp([27],{AVMk:function(e,t){},DGjQ:function(e,t){},cX8U:function(e,t,s){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var a=s(\"Xxa5\"),r=s.n(a),n=s(\"exGp\"),c=s.n(n),i=s(\"+m19\"),o=s(\"6lib\"),_={data:function(){return{open:!1,totalDiscount:0}},methods:{setFee:function(){var a=this;return c()(r.a.mark(function e(){var t,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={mode:a.open?1:0},console.log(t),e.prev=2,e.next=5,i.a.setFeeDiscount(t);case 5:(s=e.sent)&&!s.code&&o.a.success(a.$t(\"settinged\")),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),console.log(e.t0,\"error\");case 12:case\"end\":return e.stop()}},e,a,[[2,9]])}))()},getStatus:function(){var s=this;return c()(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.getFeeDiscountStatus();case 2:(t=e.sent)&&!t.code&&(s.open=Boolean(t.data));case 4:case\"end\":return e.stop()}},e,s)}))()},getTotalDiscount:function(){var s=this;return c()(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.getIxTotalDiscount();case 2:(t=e.sent)&&!t.code&&(s.totalDiscount=t.data);case 4:case\"end\":return e.stop()}},e,s)}))()}},created:function(){this.getStatus(),this.getTotalDiscount()}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s(\"div\",{staticClass:\"service-fee-set-container\"},[s(\"div\",{staticClass:\"profile-container\"},[s(\"div\",{staticClass:\"title-box\"},[t._v(t._s(t.$t(\"set_service_fee\")))]),t._v(\" \"),s(\"div\",{staticClass:\"set-content\"},[s(\"div\",{staticClass:\"row-switch\"},[s(\"div\",[s(\"span\",[t._v(t._s(t.open?t.$t(\"user_close_sevice_fee\"):t.$t(\"user_open_sevice_fee\")))]),t._v(\" \"),s(\"el-switch\",{staticClass:\"ml-11\",attrs:{\"active-color\":\"#23C88B\"},on:{change:t.setFee},model:{value:t.open,callback:function(e){t.open=e},expression:\"open\"}})],1),t._v(\" \"),s(\"div\",{staticClass:\"ml-20\"},[t._v(\"\\n          \"+t._s(t.$t(\"order_ix_total_discount\"))+\": \"+t._s(t.totalDiscount)+\" IX\\n        \")])]),t._v(\" \"),s(\"div\",{staticClass:\"rules\"},[s(\"div\",{staticClass:\"rules__title mb-13\"},[s(\"span\",{staticClass:\"dot mr-8\"}),t._v(t._s(t.$t(\"user_service_fee_rules\"))+\"\\n        \")]),t._v(\" \"),s(\"div\",{staticClass:\"rules__detail\"},[s(\"p\",{staticClass:\"mb-6\"},[t._v(t._s(t.$t(\"user_service_fee_rule_a\")))]),t._v(\" \"),s(\"p\",{staticClass:\"mb-6\"},[t._v(t._s(t.$t(\"user_service_fee_rule_b\")))]),t._v(\" \"),s(\"p\",{staticClass:\"mb-6\"},[t._v(t._s(t.$t(\"user_service_fee_rule_c\")))]),t._v(\" \"),s(\"p\",{staticClass:\"mb-6\"},[t._v(t._s(t.$t(\"user_service_fee_rule_d\")))]),t._v(\" \"),s(\"p\",{staticClass:\"mb-6\"},[t._v(t._s(t.$t(\"user_service_fee_rule_e\")))])])]),t._v(\" \"),s(\"div\",{staticClass:\"to-history\"},[s(\"router-link\",{attrs:{to:{name:\"MyOrderNew\"}}},[t._v(t._s(t.$t(\"user_service_fee_history\"))+\" >>\")])],1)])])])},staticRenderFns:[]};var l=s(\"VU/8\")(_,u,!1,function(e){s(\"AVMk\"),s(\"DGjQ\")},\"data-v-13a4201b\",null);t.default=l.exports}});"}