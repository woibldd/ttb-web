{"source":"webpackJsonp([22],{\"4q78\":function(t,s,i){t.exports=i.p+\"static/img/ixx_kefu_big.651d053.jpg\"},\"6nhK\":function(t,s){},V2Ay:function(t,s,a){\"use strict\";Object.defineProperty(s,\"__esModule\",{value:!0});var i=a(\"Xxa5\"),e=a.n(i),n=a(\"exGp\"),o=a.n(n),l=a(\"+m19\"),_=a(\"j3T7\"),c={data:function(){return{state:_.c,showModal:!1,rates:[],gift_a:{amount:10,symbol:\"$\",unit:\"USD\"},gift_b:{amount:50,symbol:\"$\",unit:\"USD\"}}},methods:{show:function(){this.isLogin?this.showModal=!0:this.$router.replace({name:\"login\"})}},computed:{isLogin:function(){return null!==this.state.userInfo},valueA:function(){return this.rates?this.$big(this.gift_a.amount).div(this.rates.USD||1).round(8,0).toFixed(8):\"\"},valueB:function(){return this.rates?this.$big(this.gift_b.amount).div(this.rates.USD||1).round(8,0).toFixed(8):\"\"}},created:function(){var i=this;return o()(e.a.mark(function t(){var s;return e.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.getRates({currency:\"BTC\"});case 2:(s=t.sent)&&!s.code&&(i.rates=s.data.BTC);case 4:case\"end\":return t.stop()}},t,i)}))()}},v={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i(\"div\",{staticClass:\"receive-container\"},[i(\"div\",{staticClass:\"header\"},[i(\"div\",{staticClass:\"banner\",style:{backgroundImage:\"zh-CN\"==s.state.locale?\"url(/static/receive/banner-zh-CN.png)\":\"url(/static/receive/banner-en.png)\"}},[i(\"div\",{staticClass:\"option\"},[i(\"el-button\",{staticClass:\"button\",attrs:{type:\"primary\"},on:{click:s.show}},[s._v(s._s(s.$t(\"gift.banner.btn_text\")))])],1)])]),s._v(\" \"),i(\"div\",{staticClass:\"content\"},[i(\"div\",{staticClass:\"card registration\"},[i(\"div\",{staticClass:\"left\"},[i(\"i\",{class:{en:\"zh-CN\"!=s.state.locale}},[s._v(s._s(s.$t(\"gift.content.tips_1\")))]),s._v(\" \"),i(\"p\",[i(\"label\",[s._v(s._s(s.gift_a.symbol+s.gift_a.amount))])]),s._v(\" \"),i(\"p\",[i(\"span\",[s._v(s._s(s.$t(\"gift.content.valuation\",{value:s.valueA})))])])]),s._v(\" \"),i(\"div\",{staticClass:\"right\"},[i(\"ul\",{class:{en:\"zh-CN\"!=s.state.locale}},[i(\"li\",[s._v(\"1.\"+s._s(s.$t(\"gift.content.detail_a\")))]),s._v(\" \"),i(\"li\",[s._v(\"2.\"+s._s(s.$t(\"gift.content.detail_b\")))]),s._v(\" \"),i(\"li\",[s._v(\"3.\"+s._s(s.$t(\"gift.content.detail_c\")))]),s._v(\" \"),i(\"li\",[s._v(\"4.\"+s._s(s.$t(\"gift.content.detail_d\")))]),s._v(\" \"),i(\"li\",[s._v(\"5.\"+s._s(s.$t(\"gift.content.detail_e\")))])])])]),s._v(\" \"),i(\"div\",{staticClass:\"card deposit\"},[i(\"div\",{staticClass:\"left\"},[i(\"i\",{class:{en:\"zh-CN\"!=s.state.locale}},[s._v(s._s(s.$t(\"gift.content.tips_2\")))]),s._v(\" \"),i(\"p\",[i(\"label\",[s._v(s._s(s.gift_b.symbol+s.gift_b.amount))])]),s._v(\" \"),i(\"p\",[i(\"span\",[s._v(s._s(s.$t(\"gift.content.valuation\",{value:s.valueB})))])])]),s._v(\" \"),i(\"div\",{staticClass:\"right\"},[i(\"ul\",{class:{en:\"zh-CN\"!=s.state.locale}},[i(\"li\",[s._v(\"1.\"+s._s(s.$t(\"gift.content.detail_f\")))]),s._v(\" \"),i(\"li\",[s._v(\"2.\"+s._s(s.$t(\"gift.content.detail_g\")))]),s._v(\" \"),i(\"li\",[s._v(\"3.\"+s._s(s.$t(\"gift.content.detail_h\")))]),s._v(\" \"),i(\"li\",[s._v(\"4.\"+s._s(s.$t(\"gift.content.detail_i\")))]),s._v(\" \"),i(\"li\",[s._v(\"5.\"+s._s(s.$t(\"gift.content.detail_j\")))])])])]),s._v(\" \"),i(\"div\",{staticClass:\"option\"},[i(\"el-button\",{staticClass:\"button\",attrs:{type:\"primary\"},on:{click:s.show}},[s._v(s._s(s.$t(\"gift.content.btn_text\")))])],1)]),s._v(\" \"),i(\"div\",{staticClass:\"footer\"},[i(\"article\",[i(\"h3\",[s._v(s._s(s.$t(\"gift.footer.title\")))]),s._v(\" \"),i(\"p\",[s._v(s._s(s.$t(\"gift.footer.content\")))])])]),s._v(\" \"),i(\"v-modal\",{attrs:{open:s.showModal},on:{\"update:open\":function(t){s.showModal=t}}},[i(\"div\",{staticClass:\"pop\"},[i(\"div\",{staticClass:\"title\"},[s._v(s._s(s.$t(\"gift.modal.title\")))]),s._v(\" \"),i(\"p\",{staticClass:\"describe\"},[s._v(s._s(s.$t(\"gift.modal.describe\")))]),s._v(\" \"),i(\"div\",{staticClass:\"qr-code\"},[i(\"div\",{staticClass:\"lt left\"},[i(\"img\",{staticClass:\"footer_ewm\",attrs:{src:a(\"4q78\")}}),s._v(\" \"),i(\"p\",{staticClass:\"footer_ewm_ltxt\"},[s._v(s._s(s.$t(\"gift.modal.qr_a\")))])]),s._v(\" \"),i(\"div\",{staticClass:\"lt right\"},[i(\"img\",{staticClass:\"footer_ewm\",attrs:{src:a(\"yLmM\")}}),s._v(\" \"),i(\"p\",{staticClass:\"footer_ewm_ltxt\"},[s._v(s._s(s.$t(\"gift.modal.qr_b\")))])])]),s._v(\" \"),i(\"div\",{staticClass:\"contact\"},[i(\"div\",{staticClass:\"item\"},[s._v(s._s(s.$t(\"gift.modal.contact_a\")))]),s._v(\" \"),i(\"div\",{staticClass:\"item\"},[s._v(s._s(s.$t(\"gift.modal.contact_b\")))]),s._v(\" \"),i(\"div\",{staticClass:\"item\"},[s._v(s._s(s.$t(\"gift.modal.contact_c\")))])])])])],1)},staticRenderFns:[]};var r=a(\"VU/8\")(c,v,!1,function(t){a(\"6nhK\")},\"data-v-6cb09c46\",null);s.default=r.exports},yLmM:function(t,s,i){t.exports=i.p+\"static/img/kefu_telegran_ewm.86e91c4.jpg\"}});"}