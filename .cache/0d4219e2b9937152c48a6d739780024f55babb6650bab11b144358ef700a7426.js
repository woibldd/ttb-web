{"source":"webpackJsonp([15],{e0kV:function(t,e,r){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var n=r(\"lC5x\"),a=r.n(n),s=r(\"J0Oq\"),i=r.n(s),c=r(\"EVD2\"),o=r.n(c),l=r(\"6lib\"),u=r(\"+m19\"),d=r(\"j3T7\"),_={name:\"RememeberAlert\",props:{open:{type:Boolean,default:!1},content:{type:String,default:\"rate_tips_g\"},bgColor:{type:String,default:\"#283B4C\"},localKey:{type:String,default:\"ixAlert\"},curreryCoin:{type:String,default:\"\"}},computed:{canOpen:function(){return this.open&&!d.b[this.localKey]}},methods:{close:function(){this.$emit(\"update:open\",!1)},closeLong:function(){d.b[this.localKey]=!0,this.close()}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(\"v-modal\",{attrs:{open:e.canOpen,\"bg-color\":e.bgColor}},[[n(\"div\",{staticClass:\"modal-container\"},[n(\"div\",{staticClass:\"title\"},[e._v(\"\\n        \"+e._s(e.$t(\"gentle_hint\"))+\"\\n      \")]),e._v(\" \"),n(\"div\",{staticClass:\"body\"},[e._v(\"\\n        \"+e._s(e.$t(\"rate_tips_i\",{currery:e.curreryCoin}))+\"\\n      \")]),e._v(\" \"),n(\"v-btn\",{staticClass:\"btn\",attrs:{fontsize:\"14\",height:\"40\",label:e.$t(\"confirm\")},on:{click:e.close}})],1)],e._v(\" \"),n(\"template\",{slot:\"close\"},[n(\"a\",{staticClass:\"custom-close-btn\",on:{click:function(t){return t.preventDefault(),e.closeLong(t)}}},[n(\"input\",{staticClass:\"ckbox\",attrs:{type:\"checkbox\"}}),e._v(\" \"),n(\"span\",{staticStyle:{\"margin-left\":\"2px\"}},[e._v(e._s(e.$t(\"no_alert_again\")))])])])],2)},staticRenderFns:[]};var v=r(\"C7Lr\")(_,p,!1,function(t){r(\"lbl+\")},\"data-v-35f58a2c\",null).exports,f=r(\"xd7I\"),m={name:\"Deposit\",components:{RememberAlert:v},data:function(){return{address:\"\",memo:\"\",allCoins:[],selectCoin:{},tableData:[],openEosAlert:!1,lianData:[],curreryCoin:\"\",selectLian:{},contract:\"\",showQr:!1}},computed:{robotAttention:function(){return' <div\\n            class=\"attention__tips\">\\n            <p class=\"title mb-8\">'+this.$t(\"about_eos_address_label\")+'</p>\\n            <p class=\"mb-4\">'+this.$t(\"about_eos_address_label_a\",{currency:this.selectCoin.currency})+\"</p>\\n            <p >\"+this.$t(\"about_eos_address_label_b\",{currency:this.selectCoin.currency})+\"</p>\\n          </div>\"},depTip:function(){return d.c.locale&&this.$t(\"dep_tip\")}},created:function(){var e=this;return i()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.getDepositHistory(),t.next=3,e.getAllCoinTypes();case 3:return t.next=5,e.getCoinAddress();case 5:e.setQr(e.address);case 6:case\"end\":return t.stop()}},t,e)}))()},methods:{copy:function(){o()(this.address),l.a.success(this.$i18n.t(\"copyed\"))},copyMemo:function(){o()(this.memo||\"\"),l.a.success(this.$i18n.t(\"copyed\"))},getCoinAddress:function(){var n=this;return i()(a.a.mark(function t(){var e;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e={chain:n.selectCoin.chain,currency:n.selectCoin.currency},n.address=\"\",n.memo=\"\",n.contract=\"\",t.abrupt(\"return\",u.a.getMyCoinAddress(e).then(function(t){t&&t.data&&(n.address=t.data.address,n.memo=t.data.memo,n.contract=t.data.contract)}));case 5:case\"end\":return t.stop()}},t,n)}))()},setQr:function(n){var s=this;return i()(a.a.mark(function t(){var e;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(e=s).showQr=!0,t.next=4,r.e(80).then(r.bind(null,\"tSqM\"));case 4:t.sent.toCanvas(s.$refs.qr,n,{margin:0,width:136,height:136,errorCorrectionLevel:\"H\"},function(t){if(t)return e.showQr=!1,l.a.log(\"qrcode error\");s.qrReady=!0});case 6:case\"end\":return t.stop()}},t,s)}))()},changeCoinType:function(e){var n=this;return i()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.curreryCoin=\"\",n.showQr=!1,t.next=4,n.getCoinAddress();case 4:n.setQr(n.address),\"EOS\"!==e.currency&&\"PAN\"!==e.currency||(n.openEosAlert=!0,n.curreryCoin=e.currency);case 6:case\"end\":return t.stop()}},t,n)}))()},lianSelect:function(e){var n=this;return i()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.selectCoin=e,n.showQr=!1,t.next=4,n.getCoinAddress();case 4:n.setQr(n.address);case 5:case\"end\":return t.stop()}},t,n)}))()},getAllCoinTypes:function(){var n=this;return i()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.getAllCoinTypes().then(function(t){if(t&&t.data){if(n.lianData=[],t.data.forEach(function(t){\"USDT\"===t.currency&&n.lianData.push(t)}),n.lianData.forEach(function(t){\"OMNI\"===t.chain?f.a.set(t,\"currencyName\",t.currency+\"-Omni\"):f.a.set(t,\"currencyName\",t.currency+\"-ERC20\")}),n.lianData=n.lianData.reverse(),n.allCoins=n.removalData(t.data.filter(function(t){return t.depositable})),n.allCoins.forEach(function(t){\"zh-CN\"===d.c.locale?f.a.set(t,\"full_name\",t.zh_name):f.a.set(t,\"full_name\",t.full_name)}),n.$route.params.currency){var e=n.$route.params.currency.toUpperCase();return void(n.selectCoin=n.allCoins.find(function(t){return t.currency.toUpperCase()===e}))}\"USDT\"===n.allCoins[0].currency?n.lianData.forEach(function(t){\"USDT-Omni\"===t.currencyName&&(n.selectLian=t,n.selectCoin=t)}):n.selectCoin=n.allCoins[0]}});case 2:case\"end\":return t.stop()}},t,n)}))()},removalData:function(t){var n={};return t=t.reduce(function(t,e){return n[e.currency]||(n[e.currency]=t.push(e)),t},[])},quickSelectCoin:function(t){var e=this;\"USDT\"===t.currency?this.lianData.forEach(function(t){\"USDT-Omni\"===t.currencyName&&(e.selectLian=t,e.selectCoin=t)}):this.selectCoin=t,this.changeCoinType(t)},getDepositHistory:function(){var e=this;u.a.getDepositHistory({page:1,size:10}).then(function(t){e.tableData=[]})}}},C={render:function(){var n=this,t=n.$createElement,s=n._self._c||t;return s(\"div\",{staticClass:\"deposit-container fund-container\"},[s(\"div\",{staticClass:\"title-box\"},[s(\"div\",[n._v(\" \"+n._s(n.$t(\"deposit\")))]),n._v(\" \"),s(\"router-link\",{staticClass:\"fund-history\",attrs:{to:\"/fund/my/assets/history/deposit\"}},[n._v(\" \"+n._s(n.$t(\"capital_record\")))])],1),n._v(\" \"),s(\"div\",{staticClass:\"fund-items-content\"},[s(\"div\",{staticClass:\"fund-item-row mb-24\"},[s(\"div\",{staticClass:\"row__label\"},[n._v(n._s(n.$t(\"coin\")))]),n._v(\" \"),s(\"div\",{staticClass:\"row__value\"},[s(\"el-select\",{staticStyle:{width:\"440px\"},attrs:{filterable:\"\",\"value-key\":\"currency\"},on:{change:n.changeCoinType},model:{value:n.selectCoin,callback:function(t){n.selectCoin=t},expression:\"selectCoin\"}},n._l(n.allCoins,function(t,e){return s(\"el-option\",{key:e,attrs:{label:t.currency,value:t}},[s(\"b\",{staticStyle:{display:\"inline-block\",width:\"40px\"}},[n._v(n._s(t.currency))]),n._v(\" \"),s(\"span\",{staticStyle:{color:\"#CCC\",\"font-size\":\"12px\",\"padding-left\":\"20px\"}},[n._v(\"\\n              \"+n._s(t.full_name)+\"\\n            \")])])}),1)],1)]),n._v(\" \"),s(\"div\",{staticClass:\"fund-item-other mb-14 coin-list\"},n._l(n.allCoins,function(e,t){return s(\"span\",{key:t,class:[\"quick-btn mb-10 mr-10\",n.selectCoin.currency===e.currency&&\"selected\"],on:{click:function(t){return n.quickSelectCoin(e)}}},[n._v(\"\\n        \"+n._s(e.currency)+\"\\n      \")])}),0),n._v(\" \"),\"USDT\"===n.selectCoin.currency?s(\"div\",{staticClass:\"fund-item-row mb-24\"},[s(\"div\",{staticClass:\"row__label\"},[s(\"el-popover\",{attrs:{content:n.depTip,placement:\"bottom-start\",title:\"\",trigger:\"hover\",width:\"240\",effect:\"dark\"}},[s(\"el-button\",{staticClass:\"lian\",attrs:{slot:\"reference\",type:\"text\"},slot:\"reference\"},[n._v(n._s(n.$t(\"link_name\")))])],1)],1),n._v(\" \"),s(\"div\",{staticClass:\"row__value\"},[s(\"el-select\",{staticStyle:{width:\"440px\"},attrs:{\"value-key\":\"chain\"},on:{change:n.lianSelect},model:{value:n.selectLian,callback:function(t){n.selectLian=t},expression:\"selectLian\"}},n._l(n.lianData,function(t,e){return s(\"el-option\",{key:e,attrs:{label:t.currencyName,value:t}})}),1)],1)]):n._e(),n._v(\" \"),s(\"div\",{staticClass:\"fund-item-row mb-24\",staticStyle:{height:\"auto\"}},[s(\"div\",{staticClass:\"row__label\"},[n._v(n._s(n.$t(\"fund.deposit.address\")))]),n._v(\" \"),s(\"div\",{staticClass:\"row__value\"},[s(\"div\",{staticClass:\"deposit-address-textarea\"},[s(\"div\",{staticClass:\"text-info\"},[n._v(\"\\n            \"+n._s(n.address)+\"\\n          \")]),n._v(\" \"),s(\"span\",{staticClass:\"address-copy pointer\",on:{click:n.copy}},[n._v(n._s(n.$t(\"copy\")))])])])]),n._v(\" \"),s(\"div\",{staticClass:\"fund-item-other deposit-least\"},[n._v(\"\\n      \"+n._s(n.$t(\"deposit_hint_min\",{min:n.selectCoin.min_deposit_amount}))+\"\\n      \"+n._s(n.selectCoin.currency)+\"\\n    \")]),n._v(\" \"),s(\"div\",{staticClass:\"fund-item-other deposit-qrcode\"},[s(\"div\",{staticClass:\"qrcode\"},[n.showQr?s(\"canvas\",{ref:\"qr\",staticClass:\"qr-img\"}):n._e()])]),n._v(\" \"),n.selectCoin.memo_support?s(\"div\",{staticClass:\"fund-item-row\"},[s(\"div\",{staticClass:\"row__label\"},[n._v(n._s(n.$t(\"address_tag\")))]),n._v(\" \"),s(\"div\",{staticClass:\"row__value\"},[s(\"div\",{staticClass:\"deposit-address\"},[s(\"span\",{staticClass:\"address-txt\"},[n._v(n._s(n.memo))]),n._v(\" \"),s(\"span\",{staticClass:\"address-copy pointer\",on:{click:n.copyMemo}},[n._v(n._s(n.$t(\"copy\")))])])]),n._v(\" \"),s(\"div\",{staticClass:\"attention\"},[s(\"icon\",{directives:[{name:\"tooltip\",rawName:\"v-tooltip.top-center\",value:{html:!0,content:n.robotAttention,classes:\"myfund\"},expression:\"{html: true,content: robotAttention, classes: 'myfund'} \",modifiers:{\"top-center\":!0}}],staticClass:\"icon-eos ml-5 pointer\",attrs:{name:\"robot-info\"}})],1)]):n._e(),n._v(\" \"),n.selectCoin.memo_support?s(\"div\",{staticClass:\"fund-item-other eos-deposit-tips\"},[n._v(\"\\n      \"+n._s(n.$t(\"eos_deposit_tip_label\"))+\"\\n    \")]):n._e(),n._v(\" \"),s(\"ul\",{staticClass:\"fund-item-other mt-10 text-des\"},[s(\"li\",[n._v(\" \"+n._s(n.$t(\"deposit_hint_addr\",{coin:n.selectCoin.currency})))]),n._v(\" \"),s(\"li\",[n._v(\" \"+n._s(n.$t(\"deposit_hint_confirm\",{confirm:n.selectCoin.min_confirm,coin:n.selectCoin.currency})))]),n._v(\" \"),n.selectCoin.memo_support?s(\"li\",[n._v(n._s(n.$t(\"eos_deposit_tip_security_third\")))]):n._e(),n._v(\" \"),\"YTA\"===n.selectCoin.currency?s(\"li\",[n._v(n._s(n.$t(\"watch_tips_yta\")))]):s(\"li\",[n._v(n._s(n.$t(\"watch_tips\")))]),n._v(\" \"),n.contract?s(\"li\",[n._v(\" \\n        \"+n._s(n.$t(\"fund_deposit_tip_contract\",{contract:n.contract}))+\"\\n      \")]):n._e(),n._v(\" \"),\"MPV\"===n.selectCoin.currency?s(\"li\",[s(\"span\",[n._v(n._s(n.$t(\"fund_deposit_mpv_tips1\")))]),n._v(\" \"),s(\"dl\",[s(\"dd\",{domProps:{innerHTML:n._s(n.$t(\"fund_deposit_mpv_tips2\"))}}),n._v(\" \"),s(\"dd\",{domProps:{innerHTML:n._s(n.$t(\"fund_deposit_mpv_tips3\"))}}),n._v(\" \"),s(\"dd\",{domProps:{innerHTML:n._s(n.$t(\"fund_deposit_mpv_tips4\"))}})])]):n._e()])]),n._v(\" \"),s(\"remember-alert\",{staticClass:\"remember\",attrs:{open:n.openEosAlert,\"local-key\":\"eosAlert\",\"currery-coin\":n.curreryCoin,content:\"rate_tips_i\",\"bg-color\":\"#fff\"},on:{\"update:open\":function(t){n.openEosAlert=t}}})],1)},staticRenderFns:[]};var y=r(\"C7Lr\")(m,C,!1,function(t){r(\"i4GX\")},\"data-v-a6843aec\",null);e.default=y.exports},i4GX:function(t,e){},\"lbl+\":function(t,e){}});"}