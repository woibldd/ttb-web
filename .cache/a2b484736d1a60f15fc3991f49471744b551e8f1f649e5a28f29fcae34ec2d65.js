{"source":"webpackJsonp([43],{\"4Eoj\":function(t,e){},ORgC:function(t,e,_){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var a=_(\"Xxa5\"),r=_.n(a),s=_(\"exGp\"),n=_.n(s),i=_(\"+m19\"),c={name:\"ContractFee\",mixins:[_(\"msXN\").b],data:function(){return{pairList:[],symbolList:[]}},created:function(){var _=this;return n()(r.a.mark(function t(){var e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.getContractSymList();case 2:return(e=t.sent).code||(_.pairList=e.data.items),t.next=6,i.a.getContractSymInfo({symbol:\"FUTURE_BTCUSD\"});case 6:(e=t.sent).code||(_.symbolList=e.data.future_symbol_info_list),0<_.pairList.length&&0<_.symbolList.length&&_.pairList.map(function(e){var t=_.symbolList.filter(function(t){return t.currency==e.currency});t.length&&(e.fee_rate=t[0].fee_rate,e.next_fee_time=t[0].next_fee_time,e.ss=t[0].currency)});case 9:case\"end\":return t.stop()}},t,_)}))()}},v={render:function(){var e=this,t=e.$createElement,_=e._self._c||t;return _(\"div\",{staticClass:\"profile-container\"},[_(\"div\",{staticClass:\"title-box rate-tit\"},[e._v(e._s(e.$t(\"contract_fees\")))]),e._v(\" \"),_(\"div\",{staticClass:\"rate-tab\"},[_(\"table\",{staticClass:\"rate-table\"},[_(\"tr\",[_(\"th\",[e._v(e._s(e.$t(\"transaction_pair\")))]),e._v(\" \"),_(\"th\",[e._v(e._s(e.$t(\"fee.contract.leverage\")))]),e._v(\" \"),_(\"th\",[e._v(e._s(e.$t(\"fee.contract.provision_fee\")))]),e._v(\" \"),_(\"th\",[e._v(e._s(e.$t(\"fee.contract.withdraw_fee\")))]),e._v(\" \"),_(\"th\",[e._v(e._s(e.$t(\"fee.contract.capital_fee\")))]),e._v(\" \"),_(\"th\",[e._v(e._s(e.$t(\"fee.contract.capital_fee_period\")))]),e._v(\" \"),_(\"th\",[e._v(e._s(e.$t(\"fee.contract.next_capital_fee\")))])]),e._v(\" \"),_(\"tbody\",e._l(e.pairList,function(t){return _(\"tr\",{key:t.name},[_(\"td\",{},[e._v(e._s(e.$t(\"FUTURE_&USD\",{currency:t.currency.replace(\"USD\",\"\")})))]),e._v(\" \"),_(\"td\",{},[e._v(e._s(t.max_leverage))]),e._v(\" \"),_(\"td\",{},[e._v(e._s(e._f(\"fixed\")(e.$big(t.make_rate||0).mul(100),4))+\"%\")]),e._v(\" \"),_(\"td\",{},[e._v(e._s(e._f(\"fixed\")(e.$big(t.take_rate||0).mul(100),4))+\"%\")]),e._v(\" \"),_(\"td\",{},[e._v(e._s(e._f(\"fixed\")(e.$big(t.fee_rate||0).mul(100),4))+\"%\")]),e._v(\" \"),_(\"td\",{},[e._v(e._s(e.$t(\"fee.contract.every_8_hours\")))]),e._v(\" \"),_(\"td\",{},[e._v(e._s(e._f(\"date\")(t.next_fee_time,\"Y-M-D H:m:s\")))])])}),0)])]),e._v(\" \"),_(\"div\",{staticClass:\"rate-tips\"},[_(\"p\",{staticClass:\"rate-tips-title\"},[e._v(e._s(e.$t(\"tips\")))]),e._v(\" \"),_(\"p\",[e._v(\"1. \"+e._s(e.$t(\"fee.contract.tips_1\")))]),e._v(\" \"),_(\"p\",[e._v(\"2. \"+e._s(e.$t(\"fee.contract.tips_2\")))]),e._v(\" \"),_(\"p\",[e._v(\"3. \"+e._s(e.$t(\"fee.contract.tips_3\")))]),e._v(\" \"),_(\"p\",[e._v(\"4. \"+e._s(e.$t(\"fee.contract.tips_4\")))]),e._v(\" \"),_(\"p\",[e._v(\"5. \"+e._s(e.$t(\"fee.contract.tips_5\")))])])])},staticRenderFns:[]};var o=_(\"VU/8\")(c,v,!1,function(t){_(\"4Eoj\")},null,null);e.default=o.exports}});"}