{"source":"webpackJsonp([41],{Eu7X:function(t,s,a){\"use strict\";Object.defineProperty(s,\"__esModule\",{value:!0});var e=a(\"rVsN\"),o=a.n(e),n=a(\"lC5x\"),i=a.n(n),l=a(\"J0Oq\"),c=a.n(l),_=a(\"Y176\"),r=a(\"30IV\"),u=a(\"j3T7\"),v=a(\"+m19\"),d=a(\"6lib\"),m=2e4,p={data:function(){return{state:u.c,lock_loading:!1,unlock_loading:!1,lock_disable:!0,unlock_disable:!0,unlock_amount:\"\",lock_amount:\"\",balance:{available:0,unlocking:0,locked:0},myPower:{},myTotal:{},list:[],basePower:{power:100}}},computed:{isLogin:function(){return this.state.userInfo},maxLock:function(){return this.balance.available?this.$big(this.balance.available).div(m).round(0,this.C.ROUND_DOWN).times(m).toString():0},maxUnLock:function(){return this.balance.locked?this.$big(this.balance.locked).div(m).round(0,this.C.ROUND_DOWN).times(m).toString():0},myRemainTotal:function(){return(this.myPower.power||0)-(this.myPower.amount||0)}},components:{VNav:_.a,VBtn:r.a},methods:{doLock:function(){var e=this;return c()(i.a.mark(function t(){var s,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.isLogin){t.next=4;break}return u.a.setLoginBack({fullPath:e.$route.fullPath}),e.$router.push({name:\"login\"}),t.abrupt(\"return\");case 4:return s=e.lock_amount,e.lock_loading=!0,t.next=8,v.a.balanceLock({amount:s});case 8:a=t.sent,e.lock_loading=!1,a.code?d.a.alert(a.message):(e.lock_amount=\"\",d.a.success(e.$t(\"lock_success\")+s+\" IXX\"),e.reset(\"lock\"),e.fetch());case 11:case\"end\":return t.stop()}},t,e)}))()},reset:function(t){this.blur(t)},doUnLock:function(){var e=this;return c()(i.a.mark(function t(){var s,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.isLogin){t.next=4;break}return u.a.setLoginBack({fullPath:e.$route.fullPath}),e.$router.push({name:\"login\"}),t.abrupt(\"return\");case 4:return s=e.unlock_amount,e.unlock_loading=!0,t.next=8,v.a.balanceUnLock({amount:s});case 8:a=t.sent,e.unlock_loading=!1,a.code?d.a.alert(a.message):(e.unlock_amount=\"\",d.a.success(e.$t(\"unlock_success\")+s+\" IXX\"),e.reset(\"unlock\"),e.fetch());case 11:case\"end\":return t.stop()}},t,e)}))()},fetch:function(){var n=this;return c()(i.a.mark(function t(){var s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.isLogin&&o.a.all([v.a.getMyPower(),v.a.getIxBalance(),v.a.getLockMineHistory(),v.a.getMyLockTotal()]).then(function(t){var s=t[0];s.code||(n.myPower=s.data);var a=t[1];a.code||(n.balance=a.data);var e=t[2];e.code||(n.list=e.data);var o=t[3];o.code||(n.myTotal=o.data)}),t.next=3,v.a.getLockMineTotal();case 3:(s=t.sent).code||(n.basePower=s.data);case 5:case\"end\":return t.stop()}},t,n)}))()},blur:function(t){var s=0;if(\"lock\"===t){if(\"\"===this.lock_amount)return void(this.lock_disable=!0);0!==(s=this.$big(this.lock_amount)).mod(m)&&(this.lock_amount=s.div(m).round(0,this.C.ROUND_DOWN).times(m).toString(),parseInt(this.lock_amount)||(this.lock_disable=!0))}else{if(\"\"===this.unlock_amount)return void(this.unlock_disable=!0);0!==(s=this.$big(this.unlock_amount)).mod(m)&&(this.unlock_amount=s.div(m).round(0,this.C.ROUND_DOWN).times(m).toString(),parseInt(this.unlock_amount)||(this.unlock_disable=!0))}},setMax:function(t){\"lock\"===t?(this.lock_amount=this.maxLock,this.lockAmountChanged()):(this.unlock_amount=this.maxUnLock,this.unlockAmountChanged()),this.blur(t)},unlockAmountChanged:function(){parseInt(this.unlock_amount)?(this.$big(this.unlock_amount).gt(this.maxUnLock)&&(this.unlock_amount=this.maxUnLock),this.unlock_amount?this.unlock_disable=!1:this.unlock_disable=!0):this.unlock_disable=!0},lockAmountChanged:function(){parseInt(this.lock_amount)?(this.$big(this.lock_amount).gt(this.maxLock)&&(this.lock_amount=this.maxLock),this.lock_amount?this.lock_disable=!1:this.lock_disable=!0):this.lock_disable=!0}},created:function(){var s=this;return c()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.updateSession();case 2:return t.next=4,s.fetch();case 4:case\"end\":return t.stop()}},t,s)}))()}},k={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a(\"div\",{staticClass:\"page-home\"},[a(\"div\",{staticClass:\"header\"},[a(\"v-nav\",{attrs:{\"is-home\":\"true\"}})],1),s._v(\" \"),a(\"div\",{staticClass:\"banner\"},[a(\"span\",{staticClass:\"title\"},[s._v(\"IXX \"+s._s(s.$t(\"mining\")))]),s._v(\" \"),a(\"span\",{staticClass:\"tips\"},[s._v(s._s(s.$t(\"activity_lottery_warm_tips\"))+\": \"+s._s(s.$t(\"rate_tips_g\")))])]),s._v(\" \"),a(\"div\",{staticClass:\"c-box\"},[a(\"div\",{staticClass:\"top-box\"},[a(\"div\",{staticClass:\"top-cen\"},[s.isLogin?a(\"div\",{staticClass:\"m-middle\"},[a(\"span\",{staticClass:\"top-s-tit\"},[s._v(s._s(s.$t(\"ystd_trad\")))]),s._v(\" \"),a(\"p\",{staticClass:\"top-s-txt top-txt-blue mar-bot\"},[s._v(s._s(s._f(\"thousand\")(s._f(\"round\")(s.myTotal.amount_yesterday,2)))),a(\"em\",[s._v(\"IXX\")])]),s._v(\" \"),a(\"span\",{staticClass:\"top-s-tit\"},[s._v(s._s(s.$t(\"td_trad_amount\")))]),s._v(\" \"),a(\"p\",{staticClass:\"top-s-txt top-txt-blue\"},[s._v(s._s(s._f(\"thousand\")(s._f(\"round\")(s.myTotal.amount_today,2)))),a(\"em\",[s._v(\"IXX\")])])]):a(\"div\",{staticClass:\"m-middle\"},[a(\"span\",{staticClass:\"top-tit\"},[s._v(s._s(s.$t(\"ystd_trad_total\")))]),s._v(\" \"),a(\"p\",{staticClass:\"top-txt top-txt-blue\"},[s._v(s._s(s._f(\"thousand\")(s._f(\"round\")(s.basePower.amount_yesterday,2)))),a(\"em\",[s._v(\"IXX\")])])])]),s._v(\" \"),a(\"div\",{staticClass:\"top-cen\"},[s.isLogin?a(\"div\",{staticClass:\"m-middle\"},[a(\"span\",{staticClass:\"top-s-tit\"},[s._v(s._s(s.$t(\"hash_rate\")))]),s._v(\" \"),a(\"p\",{staticClass:\"top-s-txt top-txt-blue mar-bot\"},[s._v(s._s(s._f(\"round\")(s.myPower.power,2))),a(\"em\",[s._v(\"IXX/H\")])]),s._v(\" \"),a(\"span\",{staticClass:\"top-s-tit\"},[s._v(s._s(s.$t(\"hash_rate_remain\")))]),s._v(\" \"),a(\"p\",{staticClass:\"top-s-txt top-txt-blue\"},[s._v(s._s(s._f(\"round\")(0<=s.myRemainTotal?s.myRemainTotal:0,2))),a(\"em\",[s._v(\"IXX\")])])]):a(\"div\",{staticClass:\"m-middle\"},[a(\"span\",{staticClass:\"top-tit\"},[s._v(s._s(s.$t(\"current_base_power\")))]),s._v(\" \"),a(\"p\",{staticClass:\"top-txt top-txt-blue\"},[s._v(s._s(s._f(\"round\")(s.basePower.power,2))),a(\"em\",[s._v(\"IXX/H\")])])])]),s._v(\" \"),a(\"div\",{staticClass:\"top-cen\"},[s.isLogin?a(\"div\",{staticClass:\"m-middle\"},[a(\"span\",{staticClass:\"top-tit\"},[s._v(s._s(s.$t(\"current_base_power\")))]),s._v(\" \"),a(\"p\",{staticClass:\"top-txt top-txt-blue\"},[s._v(s._s(s._f(\"round\")(s.basePower.power,2))),a(\"em\",[s._v(\"IXX/H\")])])]):a(\"div\",{staticClass:\"m-middle\"},[a(\"span\",{staticClass:\"top-tit\"},[s._v(s._s(s.$t(\"today_trad_total\")))]),s._v(\" \"),a(\"p\",{staticClass:\"top-txt top-txt-blue\"},[s._v(s._s(s._f(\"thousand\")(s._f(\"round\")(s.basePower.amount_today,2)))),a(\"em\",[s._v(\"IXX\")])])])]),s._v(\" \"),a(\"div\",{staticClass:\"top-cen\"},[s.isLogin?a(\"div\",{staticClass:\"m-middle\"},[a(\"span\",{staticClass:\"top-tit\"},[s._v(s._s(s.$t(\"cum_trad_amount\")))]),s._v(\" \"),a(\"p\",{staticClass:\"top-txt top-txt-blue\",style:{fontSize:s.basePower.total&&10<s.basePower.total.toString().length&&\"22px\"}},[s._v(s._s(s._f(\"thousand\")(s._f(\"round\")(s.myTotal.total,2)))),a(\"em\",[s._v(\"IXX\")])])]):a(\"div\",{staticClass:\"m-middle\"},[a(\"span\",{staticClass:\"top-tit\"},[s._v(s._s(s.$t(\"totally_mine_total\")))]),s._v(\" \"),a(\"p\",{staticClass:\"top-txt top-txt-blue\",style:{fontSize:s.basePower.total&&10<s.basePower.total.toString().length&&\"22px\"}},[s._v(s._s(s._f(\"thousand\")(s._f(\"round\")(s.basePower.total,2)))),a(\"em\",[s._v(\"IXX\")])])])])])]),s._v(\" \"),a(\"div\",{staticClass:\"c-box operating\"},[a(\"div\",{staticClass:\"oper-cen\"},[a(\"div\",{staticClass:\"oper-cen-tit col-yel\"},[s._v(s._s(s.$t(\"improve_hash_rate\")))]),s._v(\" \"),a(\"div\",{staticClass:\"oper-con\"},[a(\"p\",{staticClass:\"oper-con-l\"},[a(\"span\",[s._v(s._s(s.$t(\"available_balance\")))])]),s._v(\" \"),a(\"p\",{staticClass:\"balance\"},[s._v(s._s(s._f(\"round\")(s.balance.available,4))+\" IXX\")])]),s._v(\" \"),a(\"div\",{staticClass:\"oper-con\"},[a(\"p\",{staticClass:\"oper-con-l\"},[a(\"span\",[s._v(s._s(s.$t(\"lock_amount\")))])]),s._v(\" \"),a(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:s.lock_amount,expression:\"lock_amount\"}],staticClass:\"balance\",attrs:{type:\"number\",min:\"20000\",max:s.maxLock,step:\"20000\",placeholder:s.$t(\"integer_ultiple\")},domProps:{value:s.lock_amount},on:{input:[function(t){t.target.composing||(s.lock_amount=t.target.value)},s.lockAmountChanged],blur:function(t){return s.blur(\"lock\")}}}),s._v(\" \"),a(\"a\",{staticClass:\"num-max\",on:{click:function(t){return s.setMax(\"lock\")}}},[s._v(s._s(s.$t(\"maximum\")))])]),s._v(\" \"),a(\"div\",{staticClass:\"current-lock-ix\"},[s._v(\"\\n        \"+s._s(s.$t(\"current_lock_ix\"))+\" \"+s._s(s.balance.locked)+\"IXX\\n      \")]),s._v(\" \"),a(\"v-btn\",{staticClass:\"oper-but\",attrs:{height:\"70\",fontsize:\"16\",loading:s.lock_loading,disabled:s.lock_disable&&s.isLogin,label:s.isLogin?s.$t(\"locked\"):s.$t(\"lock_login\")},on:{click:s.doLock}})],1),s._v(\" \"),a(\"div\",{staticClass:\"oper-cen\"},[a(\"div\",{staticClass:\"oper-cen-tit\"},[s._v(s._s(s.$t(\"unlock\")))]),s._v(\" \"),a(\"div\",{staticClass:\"oper-con\"},[a(\"p\",{staticClass:\"oper-con-l\"},[a(\"span\",[s._v(s._s(s.$t(\"unlock_available\")))])]),s._v(\" \"),a(\"p\",{staticClass:\"balance\"},[s._v(s._s(s.balance.locked)+\" IXX\")])]),s._v(\" \"),a(\"div\",{staticClass:\"oper-con\"},[a(\"p\",{staticClass:\"oper-con-l\"},[a(\"span\",[s._v(s._s(s.$t(\"unlocked_amount\")))])]),s._v(\" \"),a(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:s.unlock_amount,expression:\"unlock_amount\"}],staticClass:\"balance\",attrs:{type:\"number\",min:\"20000\",max:s.maxUnLock,step:\"20000\",placeholder:s.$t(\"integer_ultiple\")},domProps:{value:s.unlock_amount},on:{input:[function(t){t.target.composing||(s.unlock_amount=t.target.value)},s.unlockAmountChanged],blur:function(t){return s.blur(\"unlock\")}}}),s._v(\" \"),a(\"a\",{staticClass:\"num-max\",on:{click:function(t){return s.setMax(\"unlock\")}}},[s._v(s._s(s.$t(\"maximum\")))])]),s._v(\" \"),a(\"div\",{staticClass:\"current-lock-ix\"}),s._v(\" \"),a(\"v-btn\",{staticClass:\"oper-but\",attrs:{height:\"70\",fontsize:\"16\",loading:s.unlock_loading,disabled:s.unlock_disable&&s.isLogin,label:s.isLogin?s.$t(\"unlock\"):s.$t(\"unlock_login\")},on:{click:s.doUnLock}})],1),s._v(\" \"),a(\"div\",{staticClass:\"oper-cen\"},[a(\"div\",{staticClass:\"oper-cen-tit\"},[s._v(s._s(s.$t(\"unlocking\")))]),s._v(\" \"),a(\"div\",{staticClass:\"oper-wait\"},[a(\"p\",{staticClass:\"num\"},[s._v(s._s(s.balance.unlocking)+\" IXX\")]),s._v(\" \"),a(\"span\",{staticClass:\"tips\"},[s._v(\"*\"+s._s(s.$t(\"unlocked\")))])])])]),s._v(\" \"),s.list.length?a(\"div\",{staticClass:\"c-box record\"},[a(\"div\",{staticClass:\"rec record-l\"},[a(\"div\",{staticClass:\"rec-tit\"},[s._v(\"\\n        \"+s._s(s.$t(\"mining_records\"))+\"\\n        \"),s.isLogin?a(\"router-link\",{staticClass:\"more\",attrs:{to:{name:\"history\"}}},[s._v(s._s(s.$t(\"more\")))]):s._e()],1),s._v(\" \"),a(\"div\",{staticClass:\"rec-t\"},[a(\"p\",{staticClass:\"re-a\"},[s._v(s._s(s.$t(\"time\")))]),s._v(\" \"),a(\"p\",{staticClass:\"re-b\"},[s._v(s._s(s.$t(\"transaction_fee\")))]),s._v(\" \"),a(\"p\",{staticClass:\"re-c\"},[s._v(s._s(s.$t(\"hash_rate_hour\")))]),s._v(\" \"),a(\"p\",{staticClass:\"re-d\"},[s._v(s._s(s.$t(\"mining_output\")))]),s._v(\" \"),a(\"p\",{staticClass:\"re-e\"},[s._v(s._s(s.$t(\"status\")))])]),s._v(\" \"),a(\"div\",{staticClass:\"scroll-con\"},[a(\"ul\",s._l(s.list,function(t){return a(\"li\",{key:t.mine_time},[a(\"p\",{staticClass:\"re-a\"},[s._v(s._s(s._f(\"ts2date\")(t.mine_time)))]),s._v(\" \"),a(\"p\",{staticClass:\"re-b\"},[s._v(s._s(s._f(\"thousand\")(s._f(\"round\")(t.fee,4))))]),s._v(\" \"),a(\"p\",{staticClass:\"re-c\"},[s._v(s._s(s._f(\"thousand\")(t.power)))]),s._v(\" \"),a(\"p\",{staticClass:\"re-d\"},[s._v(s._s(s._f(\"thousand\")(s._f(\"round\")(t.amount,4))))]),s._v(\" \"),a(\"p\",{staticClass:\"re-e\",class:{\"c-yellow\":1===t.state,\"c-blue\":0===t.state}},[s._v(s._s(1===t.state?s.$t(\"has_send\"):s.$t(\"has_no_send\"))+\"\\n              \"),0===t.state?a(\"span\",[a(\"em\",[s._v(s._s(s._f(\"ts2date\")(t.release_time))+\" \"+s._s(s.$t(\"has_done\"))+\" \"),a(\"i\")])]):s._e()])])}),0)])])]):s._e(),s._v(\" \"),a(\"div\",{staticClass:\"c-box condition\"},[a(\"p\",{staticClass:\"cdt-title\"},[s._v(s._s(s.$t(\"requirements\")))]),s._v(\" \"),a(\"ul\",[a(\"li\",[a(\"i\",[s._v(\"1.\")]),s._v(s._s(s.$t(\"req_a\")))]),s._v(\" \"),a(\"li\",[a(\"i\",[s._v(\"2.\")]),s._v(s._s(s.$t(\"req_b\",{power:s.basePower.power})))]),s._v(\" \"),a(\"li\",[a(\"i\",[s._v(\"3.\")]),s._v(s._s(s.$t(\"req_c\"))+\" \"),a(\"br\"),s._v(\"\\n        \"+s._s(s.$t(\"req_c_a\"))+\" \"),a(\"br\"),s._v(\"\\n        \"+s._s(s.$t(\"req_c_b\"))+\" \"),a(\"br\"),s._v(\"\\n        \"+s._s(s.$t(\"req_c_c\"))+\" \"),a(\"br\")]),s._v(\" \"),a(\"li\",[a(\"i\",[s._v(\"4.\")]),s._v(s._s(s.$t(\"req_d\")))]),s._v(\" \"),a(\"li\",[a(\"i\",[s._v(\"5.\")]),s._v(s._s(s.$t(\"req_e\")))]),s._v(\" \"),a(\"li\",[a(\"i\",[s._v(\"6.\")]),s._v(s._s(s.$t(\"req_f\")))]),s._v(\" \"),a(\"li\",[a(\"i\",[s._v(\"7.\")]),s._v(s._s(s.$t(\"rate_tips_g\")))]),s._v(\" \"),a(\"li\",[s._v(s._s(s.$t(\"req_g\")))])])])])},staticRenderFns:[]};var h=a(\"C7Lr\")(p,k,!1,function(t){a(\"U00Z\")},\"data-v-1e92cffb\",null);s.default=h.exports},U00Z:function(t,s){}});"}