{"source":"webpackJsonp([80],{\"0U5d\":function(t,e,r){var o=r(\"3BNZ\"),i=o.getBCHDigit(1335);e.getEncodedBits=function(t,e){for(var r=t.bit<<3|e,n=r<<10;0<=o.getBCHDigit(n)-i;)n^=1335<<o.getBCHDigit(n)-i;return 21522^(r<<10|n)}},\"1Dla\":function(t,e){var r={}.toString;t.exports=Array.isArray||function(t){return\"[object Array]\"==r.call(t)}},\"2IMn\":function(t,e,r){var n=r(\"o3qn\");function o(t){this.mode=n.NUMERIC,this.data=t.toString()}o.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){var e,r,n;for(e=0;e+3<=this.data.length;e+=3)r=this.data.substr(e,3),n=parseInt(r,10),t.put(n,10);var o=this.data.length-e;0<o&&(r=this.data.substr(e),n=parseInt(r,10),t.put(n,3*o+1))},t.exports=o},\"2M2j\":function(t,e,r){var c=r(\"oleu\");function l(t,e){var r=t.a/255,n=e+'=\"'+t.hex+'\"';return r<1?n+\" \"+e+'-opacity=\"'+r.toFixed(2).slice(1)+'\"':n}function g(t,e,r){var n=t+e;return void 0!==r&&(n+=\" \"+r),n}e.render=function(t,e,r){var n=c.getOptions(e),o=t.modules.size,i=t.modules.data,a=o+2*n.margin,u=n.color.light.a?\"<path \"+l(n.color.light,\"fill\")+' d=\"M0 0h'+a+\"v\"+a+'H0z\"/>':\"\",s=\"<path \"+l(n.color.dark,\"stroke\")+' d=\"'+function(t,e,r){for(var n=\"\",o=0,i=!1,a=0,u=0;u<t.length;u++){var s=Math.floor(u%e),f=Math.floor(u/e);s||i||(i=!0),t[u]?(a++,0<u&&0<s&&t[u-1]||(n+=i?g(\"M\",s+r,.5+f+r):g(\"m\",o,0),o=0,i=!1),s+1<e&&t[u+1]||(n+=g(\"h\",a),a=0)):o++}return n}(i,o,n.margin)+'\"/>',f='viewBox=\"0 0 '+a+\" \"+a+'\"',h='<svg xmlns=\"http://www.w3.org/2000/svg\" '+(n.width?'width=\"'+n.width+'\" height=\"'+n.width+'\" ':\"\")+f+' shape-rendering=\"crispEdges\">'+u+s+\"</svg>\\n\";return\"function\"==typeof r&&r(null,h),h}},\"3BNZ\":function(t,e){var r,n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(t){if(!t)throw new Error('\"version\" cannot be null or undefined');if(t<1||40<t)throw new Error('\"version\" should be in range from 1 to 40');return 4*t+17},e.getSymbolTotalCodewords=function(t){return n[t]},e.getBCHDigit=function(t){for(var e=0;0!==t;)e++,t>>>=1;return e},e.setToSJISFunction=function(t){if(\"function\"!=typeof t)throw new Error('\"toSJISFunc\" is not a valid function.');r=t},e.isKanjiModeEnabled=function(){return void 0!==r},e.toSJIS=function(t){return r(t)}},\"9n1m\":function(t,e,r){var n=r(\"3BNZ\").getSymbolSize;e.getPositions=function(t){var e=n(t);return[[0,0],[e-7,0],[0,e-7]]}},BiGE:function(t,e,r){var n=r(\"c+5m\"),o=r(\"o3qn\");function i(t){this.mode=o.BYTE,this.data=new n(t)}i.getBitsLength=function(t){return 8*t},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){for(var e=0,r=this.data.length;e<r;e++)t.put(this.data[e],8)},t.exports=i},CyXl:function(t,e,r){var n=r(\"o3qn\"),o=r(\"3BNZ\");function i(t){this.mode=n.KANJI,this.data=t}i.getBitsLength=function(t){return 13*t},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){var e;for(e=0;e<this.data.length;e++){var r=o.toSJIS(this.data[e]);if(33088<=r&&r<=40956)r-=33088;else{if(!(57408<=r&&r<=60351))throw new Error(\"Invalid SJIS character: \"+this.data[e]+\"\\nMake sure your charset is UTF-8\");r-=49472}r=192*(r>>>8&255)+(255&r),t.put(r,13)}},t.exports=i},IQWI:function(t,e,r){var n=r(\"o3qn\"),o=[\"0\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\",\"H\",\"I\",\"J\",\"K\",\"L\",\"M\",\"N\",\"O\",\"P\",\"Q\",\"R\",\"S\",\"T\",\"U\",\"V\",\"W\",\"X\",\"Y\",\"Z\",\" \",\"$\",\"%\",\"*\",\"+\",\"-\",\".\",\"/\",\":\"];function i(t){this.mode=n.ALPHANUMERIC,this.data=t}i.getBitsLength=function(t){return 11*Math.floor(t/2)+t%2*6},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){var e;for(e=0;e+2<=this.data.length;e+=2){var r=45*o.indexOf(this.data[e]);r+=o.indexOf(this.data[e+1]),t.put(r,11)}this.data.length%2&&t.put(o.indexOf(this.data[e]),6)},t.exports=i},MsPf:function(t,e,r){var P=r(\"c+5m\"),R=r(\"3BNZ\"),i=r(\"xkxy\"),u=r(\"PnzG\"),c=r(\"z083\"),l=r(\"waWI\"),g=r(\"9n1m\"),d=r(\"O1nW\"),T=r(\"immt\"),C=r(\"dEtd\"),p=r(\"bX8u\"),s=r(\"0U5d\"),f=r(\"o3qn\"),v=r(\"X5rj\"),w=r(\"1Dla\");function y(t,e,r){var n,o,i=t.size,a=s.getEncodedBits(e,r);for(n=0;n<15;n++)o=1==(a>>n&1),n<6?t.set(n,8,o,!0):n<8?t.set(n+1,8,o,!0):t.set(i-15+n,8,o,!0),n<8?t.set(8,i-n-1,o,!0):n<9?t.set(8,15-n-1+1,o,!0):t.set(8,15-n-1,o,!0);t.set(i-8,8,1,!0)}function m(e,t,r){var n=new u;r.forEach(function(t){n.put(t.mode.bit,4),n.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),t.write(n)});var o=8*(R.getSymbolTotalCodewords(e)-T.getTotalCodewordsCount(e,t));for(n.getLengthInBits()+4<=o&&n.put(0,4);n.getLengthInBits()%8!=0;)n.putBit(0);for(var i=(o-n.getLengthInBits())/8,a=0;a<i;a++)n.put(a%2?17:236,8);return function(t,e,r){for(var n=R.getSymbolTotalCodewords(e),o=T.getTotalCodewordsCount(e,r),i=n-o,a=T.getBlocksCount(e,r),u=a-n%a,s=Math.floor(n/a),f=Math.floor(i/a),h=f+1,c=s-f,l=new C(c),g=0,d=new Array(a),p=new Array(a),v=0,w=new P(t.buffer),y=0;y<a;y++){var m=y<u?f:h;d[y]=w.slice(g,g+m),p[y]=l.encode(d[y]),g+=m,v=Math.max(v,m)}var E,A,B=new P(n),b=0;for(E=0;E<v;E++)for(A=0;A<a;A++)E<d[A].length&&(B[b++]=d[A][E]);for(E=0;E<c;E++)for(A=0;A<a;A++)B[b++]=p[A][E];return B}(n,e,t)}function a(t,e,r,n){var o;if(w(t))o=v.fromArray(t);else{if(\"string\"!=typeof t)throw new Error(\"Invalid data\");var i=e;if(!i){var a=v.rawSplit(t);i=p.getBestVersionForData(a,r)}o=v.fromString(t,i||40)}var u=p.getBestVersionForData(o,r);if(!u)throw new Error(\"The amount of data is too big to be stored in a QR Code\");if(e){if(e<u)throw new Error(\"\\nThe chosen QR Code version cannot contain this amount of data.\\nMinimum version required to store current data is: \"+u+\".\\n\")}else e=u;var s=m(e,r,o),f=R.getSymbolSize(e),h=new c(f);return function(t,e){for(var r=t.size,n=g.getPositions(e),o=0;o<n.length;o++)for(var i=n[o][0],a=n[o][1],u=-1;u<=7;u++)if(!(i+u<=-1||r<=i+u))for(var s=-1;s<=7;s++)a+s<=-1||r<=a+s||(0<=u&&u<=6&&(0===s||6===s)||0<=s&&s<=6&&(0===u||6===u)||2<=u&&u<=4&&2<=s&&s<=4?t.set(i+u,a+s,!0,!0):t.set(i+u,a+s,!1,!0))}(h,e),function(t){for(var e=t.size,r=8;r<e-8;r++){var n=r%2==0;t.set(r,6,n,!0),t.set(6,r,n,!0)}}(h),function(t,e){for(var r=l.getPositions(e),n=0;n<r.length;n++)for(var o=r[n][0],i=r[n][1],a=-2;a<=2;a++)for(var u=-2;u<=2;u++)-2===a||2===a||-2===u||2===u||0===a&&0===u?t.set(o+a,i+u,!0,!0):t.set(o+a,i+u,!1,!0)}(h,e),y(h,r,0),7<=e&&function(t,e){for(var r,n,o,i=t.size,a=p.getEncodedBits(e),u=0;u<18;u++)r=Math.floor(u/3),n=u%3+i-8-3,o=1==(a>>u&1),t.set(r,n,o,!0),t.set(n,r,o,!0)}(h,e),function(t,e){for(var r=t.size,n=-1,o=r-1,i=7,a=0,u=r-1;0<u;u-=2)for(6===u&&u--;;){for(var s=0;s<2;s++)if(!t.isReserved(o,u-s)){var f=!1;a<e.length&&(f=1==(e[a]>>>i&1)),t.set(o,u-s,f),-1===--i&&(a++,i=7)}if((o+=n)<0||r<=o){o-=n,n=-n;break}}}(h,s),isNaN(n)&&(n=d.getBestMask(h,y.bind(null,h,r))),d.applyMask(n,h),y(h,r,n),{modules:h,version:e,errorCorrectionLevel:r,maskPattern:n,segments:o}}e.create=function(t,e){if(void 0===t||\"\"===t)throw new Error(\"No input text\");var r,n,o=i.M;return void 0!==e&&(o=i.from(e.errorCorrectionLevel,i.M),r=p.from(e.version),n=d.from(e.maskPattern),e.toSJISFunc&&R.setToSJISFunction(e.toSJISFunc)),a(t,r,o,n)}},O1nW:function(t,u){u.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var h=3,a=3,s=40,o=10;function i(t,e,r){switch(t){case u.Patterns.PATTERN000:return(e+r)%2==0;case u.Patterns.PATTERN001:return e%2==0;case u.Patterns.PATTERN010:return r%3==0;case u.Patterns.PATTERN011:return(e+r)%3==0;case u.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case u.Patterns.PATTERN101:return e*r%2+e*r%3==0;case u.Patterns.PATTERN110:return(e*r%2+e*r%3)%2==0;case u.Patterns.PATTERN111:return(e*r%3+(e+r)%2)%2==0;default:throw new Error(\"bad maskPattern:\"+t)}}u.isValid=function(t){return null!=t&&\"\"!==t&&!isNaN(t)&&0<=t&&t<=7},u.from=function(t){return u.isValid(t)?parseInt(t,10):void 0},u.getPenaltyN1=function(t){for(var e=t.size,r=0,n=0,o=0,i=null,a=null,u=0;u<e;u++){n=o=0,i=a=null;for(var s=0;s<e;s++){var f=t.get(u,s);f===i?n++:(5<=n&&(r+=h+(n-5)),i=f,n=1),(f=t.get(s,u))===a?o++:(5<=o&&(r+=h+(o-5)),a=f,o=1)}5<=n&&(r+=h+(n-5)),5<=o&&(r+=h+(o-5))}return r},u.getPenaltyN2=function(t){for(var e=t.size,r=0,n=0;n<e-1;n++)for(var o=0;o<e-1;o++){var i=t.get(n,o)+t.get(n,o+1)+t.get(n+1,o)+t.get(n+1,o+1);4!==i&&0!==i||r++}return r*a},u.getPenaltyN3=function(t){for(var e=t.size,r=0,n=0,o=0,i=0;i<e;i++){n=o=0;for(var a=0;a<e;a++)n=n<<1&2047|t.get(i,a),10<=a&&(1488===n||93===n)&&r++,o=o<<1&2047|t.get(a,i),10<=a&&(1488===o||93===o)&&r++}return r*s},u.getPenaltyN4=function(t){for(var e=0,r=t.data.length,n=0;n<r;n++)e+=t.data[n];return Math.abs(Math.ceil(100*e/r/5)-10)*o},u.applyMask=function(t,e){for(var r=e.size,n=0;n<r;n++)for(var o=0;o<r;o++)e.isReserved(o,n)||e.xor(o,n,i(t,o,n))},u.getBestMask=function(t,e){for(var r=Object.keys(u.Patterns).length,n=0,o=1/0,i=0;i<r;i++){e(i),u.applyMask(i,t);var a=u.getPenaltyN1(t)+u.getPenaltyN2(t)+u.getPenaltyN3(t)+u.getPenaltyN4(t);u.applyMask(i,t),a<o&&(o=a,n=i)}return n}},PnzG:function(t,e){function r(){this.buffer=[],this.length=0}r.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t.exports=r},W5Tm:function(t,e,r){\"use strict\";var d={single_source_shortest_paths:function(t,e,r){var n={},o={};o[e]=0;var i,a,u,s,f,h,c,l=d.PriorityQueue.make();for(l.push(e,0);!l.empty();)for(u in a=(i=l.pop()).value,s=i.cost,f=t[a]||{})f.hasOwnProperty(u)&&(h=s+f[u],c=o[u],(void 0===o[u]||h<c)&&(o[u]=h,l.push(u,h),n[u]=a));if(void 0===r||void 0!==o[r])return n;var g=[\"Could not find a path from \",e,\" to \",r,\".\"].join(\"\");throw new Error(g)},extract_shortest_path_from_predecessor_list:function(t,e){for(var r=[],n=e;n;)r.push(n),t[n],n=t[n];return r.reverse(),r},find_path:function(t,e,r){var n=d.single_source_shortest_paths(t,e,r);return d.extract_shortest_path_from_predecessor_list(n,r)},PriorityQueue:{make:function(t){var e,r=d.PriorityQueue,n={};for(e in t=t||{},r)r.hasOwnProperty(e)&&(n[e]=r[e]);return n.queue=[],n.sorter=t.sorter||r.default_sorter,n},default_sorter:function(t,e){return t.cost-e.cost},push:function(t,e){var r={value:t,cost:e};this.queue.push(r),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=d},WYCU:function(t,u,e){var h=e(\"oleu\");u.render=function(t,e,r){var n=r,o=e;void 0!==n||e&&e.getContext||(n=e,e=void 0),e||(o=function(){try{return document.createElement(\"canvas\")}catch(t){throw new Error(\"You need to specify a canvas element\")}}()),n=h.getOptions(n);var i,a,u=h.getImageWidth(t.modules.size,n),s=o.getContext(\"2d\"),f=s.createImageData(u,u);return h.qrToImageData(f.data,t,n),i=o,a=u,s.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=a,i.width=a,i.style.height=a+\"px\",i.style.width=a+\"px\",s.putImageData(f,0,0),o},u.renderToDataURL=function(t,e,r){var n=r;void 0!==n||e&&e.getContext||(n=e,e=void 0),n=n||{};var o=u.render(t,e,n),i=n.type||\"image/png\",a=n.rendererOpts||{};return o.toDataURL(i,a.quality)}},X5rj:function(t,a,e){var g=e(\"o3qn\"),o=e(\"2IMn\"),i=e(\"IQWI\"),u=e(\"BiGE\"),s=e(\"CyXl\"),f=e(\"bNNu\"),h=e(\"3BNZ\"),c=e(\"W5Tm\");function l(t){return unescape(encodeURIComponent(t)).length}function d(t,e,r){for(var n,o=[];null!==(n=t.exec(r));)o.push({data:n[0],index:n.index,mode:e,length:n[0].length});return o}function p(t){var e,r,n=d(f.NUMERIC,g.NUMERIC,t),o=d(f.ALPHANUMERIC,g.ALPHANUMERIC,t);return r=h.isKanjiModeEnabled()?(e=d(f.BYTE,g.BYTE,t),d(f.KANJI,g.KANJI,t)):(e=d(f.BYTE_KANJI,g.BYTE,t),[]),n.concat(o,e,r).sort(function(t,e){return t.index-e.index}).map(function(t){return{data:t.data,mode:t.mode,length:t.length}})}function v(t,e){switch(e){case g.NUMERIC:return o.getBitsLength(t);case g.ALPHANUMERIC:return i.getBitsLength(t);case g.KANJI:return s.getBitsLength(t);case g.BYTE:return u.getBitsLength(t)}}function r(t,e){var r,n=g.getBestModeForData(t);if((r=g.from(e,n))!==g.BYTE&&r.bit<n.bit)throw new Error('\"'+t+'\" cannot be encoded with mode '+g.toString(r)+\".\\n Suggested mode is: \"+g.toString(n));switch(r!==g.KANJI||h.isKanjiModeEnabled()||(r=g.BYTE),r){case g.NUMERIC:return new o(t);case g.ALPHANUMERIC:return new i(t);case g.KANJI:return new s(t);case g.BYTE:return new u(t)}}a.fromArray=function(t){return t.reduce(function(t,e){return\"string\"==typeof e?t.push(r(e,null)):e.data&&t.push(r(e.data,e.mode)),t},[])},a.fromString=function(t,e){for(var r=function(t,e){for(var r={},n={start:{}},o=[\"start\"],i=0;i<t.length;i++){for(var a=t[i],u=[],s=0;s<a.length;s++){var f=a[s],h=\"\"+i+s;u.push(h),r[h]={node:f,lastCount:0},n[h]={};for(var c=0;c<o.length;c++){var l=o[c];r[l]&&r[l].node.mode===f.mode?(n[l][h]=v(r[l].lastCount+f.length,f.mode)-v(r[l].lastCount,f.mode),r[l].lastCount+=f.length):(r[l]&&(r[l].lastCount=f.length),n[l][h]=v(f.length,f.mode)+4+g.getCharCountIndicator(f.mode,e))}}o=u}for(c=0;c<o.length;c++)n[o[c]].end=0;return{map:n,table:r}}(function(t){for(var e=[],r=0;r<t.length;r++){var n=t[r];switch(n.mode){case g.NUMERIC:e.push([n,{data:n.data,mode:g.ALPHANUMERIC,length:n.length},{data:n.data,mode:g.BYTE,length:n.length}]);break;case g.ALPHANUMERIC:e.push([n,{data:n.data,mode:g.BYTE,length:n.length}]);break;case g.KANJI:e.push([n,{data:n.data,mode:g.BYTE,length:l(n.data)}]);break;case g.BYTE:e.push([{data:n.data,mode:g.BYTE,length:l(n.data)}])}}return e}(p(t,h.isKanjiModeEnabled())),e),n=c.find_path(r.map,\"start\",\"end\"),o=[],i=1;i<n.length-1;i++)o.push(r.table[n[i]].node);return a.fromArray(o.reduce(function(t,e){var r=0<=t.length-1?t[t.length-1]:null;return r&&r.mode===e.mode?t[t.length-1].data+=e.data:t.push(e),t},[]))},a.rawSplit=function(t){return a.fromArray(p(t,h.isKanjiModeEnabled()))}},bNNu:function(t,e){var r=\"(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+\",n=\"(?:(?![A-Z0-9 $%*+\\\\-./:]|\"+(r=r.replace(/u/g,\"\\\\u\"))+\")(?:.|[\\r\\n]))+\";e.KANJI=new RegExp(r,\"g\"),e.BYTE_KANJI=new RegExp(\"[^A-Z0-9 $%*+\\\\-./:]+\",\"g\"),e.BYTE=new RegExp(n,\"g\"),e.NUMERIC=new RegExp(\"[0-9]+\",\"g\"),e.ALPHANUMERIC=new RegExp(\"[A-Z $%*+\\\\-./:]+\",\"g\");var o=new RegExp(\"^\"+r+\"$\"),i=new RegExp(\"^[0-9]+$\"),a=new RegExp(\"^[A-Z0-9 $%*+\\\\-./:]+$\");e.testKanji=function(t){return o.test(t)},e.testNumeric=function(t){return i.test(t)},e.testAlphanumeric=function(t){return a.test(t)}},bX8u:function(t,o,e){var i=e(\"3BNZ\"),a=e(\"immt\"),u=e(\"xkxy\"),s=e(\"o3qn\"),f=e(\"y5+V\"),h=e(\"1Dla\"),r=i.getBCHDigit(7973);function c(t,e){return s.getCharCountIndicator(t,e)+4}function l(t,r){var n=0;return t.forEach(function(t){var e=c(t.mode,r);n+=e+t.getBitsLength()}),n}o.from=function(t,e){return f.isValid(t)?parseInt(t,10):e},o.getCapacity=function(t,e,r){if(!f.isValid(t))throw new Error(\"Invalid QR Code version\");void 0===r&&(r=s.BYTE);var n=8*(i.getSymbolTotalCodewords(t)-a.getTotalCodewordsCount(t,e));if(r===s.MIXED)return n;var o=n-c(r,t);switch(r){case s.NUMERIC:return Math.floor(o/10*3);case s.ALPHANUMERIC:return Math.floor(o/11*2);case s.KANJI:return Math.floor(o/13);case s.BYTE:default:return Math.floor(o/8)}},o.getBestVersionForData=function(t,e){var r,n=u.from(e,u.M);if(h(t)){if(1<t.length)return function(t,e){for(var r=1;r<=40;r++){if(l(t,r)<=o.getCapacity(r,e,s.MIXED))return r}}(t,n);if(0===t.length)return 1;r=t[0]}else r=t;return function(t,e,r){for(var n=1;n<=40;n++)if(e<=o.getCapacity(n,r,t))return n}(r.mode,r.getLength(),n)},o.getEncodedBits=function(t){if(!f.isValid(t)||t<7)throw new Error(\"Invalid QR Code version\");for(var e=t<<12;0<=i.getBCHDigit(e)-r;)e^=7973<<i.getBCHDigit(e)-r;return t<<12|e}},\"c+5m\":function(t,e,r){\"use strict\";var a=r(\"1Dla\");var n=(u.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(t){return!1}}())?2147483647:1073741823;function u(t,e,r){return u.TYPED_ARRAY_SUPPORT||this instanceof u?\"number\"==typeof t?f(this,t):function(t,e,r,n){if(\"number\"==typeof e)throw new TypeError('\"value\" argument must not be a number');if(\"undefined\"!=typeof ArrayBuffer&&e instanceof ArrayBuffer)return function(t,e,r,n){if(r<0||e.byteLength<r)throw new RangeError(\"'offset' is out of bounds\");if(e.byteLength<r+(n||0))throw new RangeError(\"'length' is out of bounds\");var o;o=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n);u.TYPED_ARRAY_SUPPORT?o.__proto__=u.prototype:o=h(t,o);return o}(t,e,r,n);return(\"string\"!=typeof e?function(t,e){if(u.isBuffer(e)){var r=0|i(e.length),n=s(t,r);return 0===n.length?n:(e.copy(n,0,0,r),n)}if(e){if(\"undefined\"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||\"length\"in e)return\"number\"!=typeof e.length||function(t){return t!=t}(e.length)?s(t,0):h(t,e);if(\"Buffer\"===e.type&&Array.isArray(e.data))return h(t,e.data)}throw new TypeError(\"First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.\")}:function(t,e){var r=0|c(e),n=s(t,r),o=n.write(e);o!==r&&(n=n.slice(0,o));return n})(t,e)}(this,t,e,r):new u(t,e,r)}function i(t){if(n<=t)throw new RangeError(\"Attempt to allocate Buffer larger than maximum size: 0x\"+n.toString(16)+\" bytes\");return 0|t}function s(t,e){var r;return u.TYPED_ARRAY_SUPPORT?(r=new Uint8Array(e)).__proto__=u.prototype:(null===(r=t)&&(r=new u(e)),r.length=e),r}function f(t,e){var r=s(t,e<0?0:0|i(e));if(!u.TYPED_ARRAY_SUPPORT)for(var n=0;n<e;++n)r[n]=0;return r}function h(t,e){for(var r=e.length<0?0:0|i(e.length),n=s(t,r),o=0;o<r;o+=1)n[o]=255&e[o];return n}function o(t,e){var r;e=e||1/0;for(var n=t.length,o=null,i=[],a=0;a<n;++a){if(55295<(r=t.charCodeAt(a))&&r<57344){if(!o){if(56319<r){-1<(e-=3)&&i.push(239,191,189);continue}if(a+1===n){-1<(e-=3)&&i.push(239,191,189);continue}o=r;continue}if(r<56320){-1<(e-=3)&&i.push(239,191,189),o=r;continue}r=65536+(o-55296<<10|r-56320)}else o&&-1<(e-=3)&&i.push(239,191,189);if(o=null,r<128){if(--e<0)break;i.push(r)}else if(r<2048){if((e-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error(\"Invalid code point\");if((e-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function c(t){return u.isBuffer(t)?t.length:\"undefined\"!=typeof ArrayBuffer&&\"function\"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer)?t.byteLength:(\"string\"!=typeof t&&(t=\"\"+t),0===t.length?0:o(t).length)}function l(t,e,r,n){return function(t,e,r,n){for(var o=0;o<n&&!(o+r>=e.length||o>=t.length);++o)e[o+r]=t[o];return o}(o(e,t.length-r),t,r,n)}u.TYPED_ARRAY_SUPPORT&&(u.prototype.__proto__=Uint8Array.prototype,u.__proto__=Uint8Array,\"undefined\"!=typeof Symbol&&Symbol.species&&u[Symbol.species]===u&&Object.defineProperty(u,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1})),u.prototype.write=function(t,e,r){void 0===e||void 0===r&&\"string\"==typeof e?(r=this.length,e=0):isFinite(e)&&(e|=0,isFinite(r)?r|=0:r=void 0);var n=this.length-e;if((void 0===r||n<r)&&(r=n),0<t.length&&(r<0||e<0)||e>this.length)throw new RangeError(\"Attempt to write outside buffer bounds\");return l(this,t,e,r)},u.prototype.slice=function(t,e){var r,n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):n<t&&(t=n),(e=void 0===e?n:~~e)<0?(e+=n)<0&&(e=0):n<e&&(e=n),e<t&&(e=t),u.TYPED_ARRAY_SUPPORT)(r=this.subarray(t,e)).__proto__=u.prototype;else{var o=e-t;r=new u(o,void 0);for(var i=0;i<o;++i)r[i]=this[i+t]}return r},u.prototype.copy=function(t,e,r,n){if(r=r||0,n||0===n||(n=this.length),e>=t.length&&(e=t.length),e=e||0,0<n&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError(\"targetStart out of bounds\");if(r<0||r>=this.length)throw new RangeError(\"sourceStart out of bounds\");if(n<0)throw new RangeError(\"sourceEnd out of bounds\");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var o,i=n-r;if(this===t&&r<e&&e<n)for(o=i-1;0<=o;--o)t[o+e]=this[o+r];else if(i<1e3||!u.TYPED_ARRAY_SUPPORT)for(o=0;o<i;++o)t[o+e]=this[o+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+i),e);return i},u.prototype.fill=function(t,e,r){if(\"string\"==typeof t){if(\"string\"==typeof e?(e=0,r=this.length):\"string\"==typeof r&&(r=this.length),1===t.length){var n=t.charCodeAt(0);n<256&&(t=n)}}else\"number\"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError(\"Out of range index\");if(r<=e)return this;var o;if(e>>>=0,r=void 0===r?this.length:r>>>0,\"number\"==typeof(t=t||0))for(o=e;o<r;++o)this[o]=t;else{var i=u.isBuffer(t)?t:new u(t),a=i.length;for(o=0;o<r-e;++o)this[o+e]=i[o%a]}return this},u.concat=function(t,e){if(!a(t))throw new TypeError('\"list\" argument must be an Array of Buffers');if(0===t.length)return s(null,0);var r;if(void 0===e)for(r=e=0;r<t.length;++r)e+=t[r].length;var n=f(null,e),o=0;for(r=0;r<t.length;++r){var i=t[r];if(!u.isBuffer(i))throw new TypeError('\"list\" argument must be an Array of Buffers');i.copy(n,o),o+=i.length}return n},u.byteLength=c,u.prototype._isBuffer=!0,u.isBuffer=function(t){return!(null==t||!t._isBuffer)},t.exports=u},dEtd:function(t,e,r){var a=r(\"c+5m\"),u=r(\"lcSd\");function n(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}n.prototype.initialize=function(t){this.degree=t,this.genPoly=u.generateECPolynomial(this.degree)},n.prototype.encode=function(t){if(!this.genPoly)throw new Error(\"Encoder not initialized\");var e=new a(this.degree);e.fill(0);var r=a.concat([t,e],t.length+this.degree),n=u.mod(r,this.genPoly),o=this.degree-n.length;if(0<o){var i=new a(this.degree);return i.fill(0),n.copy(i,o),i}return n},t.exports=n},immt:function(t,e,r){var n=r(\"xkxy\"),o=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(t,e){switch(e){case n.L:return o[4*(t-1)+0];case n.M:return o[4*(t-1)+1];case n.Q:return o[4*(t-1)+2];case n.H:return o[4*(t-1)+3];default:return}},e.getTotalCodewordsCount=function(t,e){switch(e){case n.L:return i[4*(t-1)+0];case n.M:return i[4*(t-1)+1];case n.Q:return i[4*(t-1)+2];case n.H:return i[4*(t-1)+3];default:return}}},lcSd:function(t,n,e){var a=e(\"c+5m\"),u=e(\"xiuW\");n.mul=function(t,e){var r=new a(t.length+e.length-1);r.fill(0);for(var n=0;n<t.length;n++)for(var o=0;o<e.length;o++)r[n+o]^=u.mul(t[n],e[o]);return r},n.mod=function(t,e){for(var r=new a(t);0<=r.length-e.length;){for(var n=r[0],o=0;o<e.length;o++)r[o]^=u.mul(e[o],n);for(var i=0;i<r.length&&0===r[i];)i++;r=r.slice(i)}return r},n.generateECPolynomial=function(t){for(var e=new a([1]),r=0;r<t;r++)e=n.mul(e,[1,u.exp(r)]);return e}},o3qn:function(t,r,e){var n=e(\"y5+V\"),o=e(\"bNNu\");r.NUMERIC={id:\"Numeric\",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:\"Alphanumeric\",bit:2,ccBits:[9,11,13]},r.BYTE={id:\"Byte\",bit:4,ccBits:[8,16,16]},r.KANJI={id:\"Kanji\",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(t,e){if(!t.ccBits)throw new Error(\"Invalid mode: \"+t);if(!n.isValid(e))throw new Error(\"Invalid version: \"+e);return 1<=e&&e<10?t.ccBits[0]:e<27?t.ccBits[1]:t.ccBits[2]},r.getBestModeForData=function(t){return o.testNumeric(t)?r.NUMERIC:o.testAlphanumeric(t)?r.ALPHANUMERIC:o.testKanji(t)?r.KANJI:r.BYTE},r.toString=function(t){if(t&&t.id)return t.id;throw new Error(\"Invalid mode\")},r.isValid=function(t){return t&&t.bit&&t.ccBits},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if(\"string\"!=typeof t)throw new Error(\"Param is not a string\");switch(t.toLowerCase()){case\"numeric\":return r.NUMERIC;case\"alphanumeric\":return r.ALPHANUMERIC;case\"kanji\":return r.KANJI;case\"byte\":return r.BYTE;default:throw new Error(\"Unknown mode: \"+t)}}(t)}catch(t){return e}}},oleu:function(t,g){function o(t){if(\"number\"==typeof t&&(t=t.toString()),\"string\"!=typeof t)throw new Error(\"Color should be defined as hex string\");var e=t.slice().replace(\"#\",\"\").split(\"\");if(e.length<3||5===e.length||8<e.length)throw new Error(\"Invalid hex color: \"+t);3!==e.length&&4!==e.length||(e=Array.prototype.concat.apply([],e.map(function(t){return[t,t]}))),6===e.length&&e.push(\"F\",\"F\");var r=parseInt(e.join(\"\"),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:255&r,hex:\"#\"+e.slice(0,6).join(\"\")}}g.getOptions=function(t){(t=t||{}).color||(t.color={});var e=void 0===t.margin||null===t.margin||t.margin<0?4:t.margin,r=t.width&&21<=t.width?t.width:void 0,n=t.scale||4;return{width:r,scale:r?4:n,margin:e,color:{dark:o(t.color.dark||\"#000000ff\"),light:o(t.color.light||\"#ffffffff\")},type:t.type,rendererOpts:t.rendererOpts||{}}},g.getScale=function(t,e){return e.width&&e.width>=t+2*e.margin?e.width/(t+2*e.margin):e.scale},g.getImageWidth=function(t,e){var r=g.getScale(t,e);return Math.floor((t+2*e.margin)*r)},g.qrToImageData=function(t,e,r){for(var n=e.modules.size,o=e.modules.data,i=g.getScale(n,r),a=Math.floor((n+2*r.margin)*i),u=r.margin*i,s=[r.color.light,r.color.dark],f=0;f<a;f++)for(var h=0;h<a;h++){var c=4*(f*a+h),l=r.color.light;if(u<=f&&u<=h&&f<a-u&&h<a-u)l=s[o[Math.floor((f-u)/i)*n+Math.floor((h-u)/i)]?1:0];t[c++]=l.r,t[c++]=l.g,t[c++]=l.b,t[c]=l.a}}},tSqM:function(t,e,r){var f=r(\"v32i\"),h=r(\"MsPf\"),n=r(\"WYCU\"),o=r(\"2M2j\");function i(n,o,i,a,e){var t=[].slice.call(arguments,1),r=t.length,u=\"function\"==typeof t[r-1];if(!u&&!f())throw new Error(\"Callback required as last argument\");if(!u){if(r<1)throw new Error(\"Too few arguments provided\");return 1===r?(i=o,o=a=void 0):2!==r||o.getContext||(a=i,i=o,o=void 0),new Promise(function(t,e){try{var r=h.create(i,a);t(n(r,o,a))}catch(t){e(t)}})}if(r<2)throw new Error(\"Too few arguments provided\");2===r?(e=i,i=o,o=a=void 0):3===r&&(o.getContext&&void 0===e?(e=a,a=void 0):(e=a,a=i,i=o,o=void 0));try{var s=h.create(i,a);e(null,n(s,o,a))}catch(t){e(t)}}e.create=h.create,e.toCanvas=i.bind(null,n.render),e.toDataURL=i.bind(null,n.renderToDataURL),e.toString=i.bind(null,function(t,e,r){return o.render(t,r)})},v32i:function(t,e){t.exports=function(){return\"function\"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},waWI:function(t,a,e){var u=e(\"3BNZ\").getSymbolSize;a.getRowColCoords=function(t){if(1===t)return[];for(var e=Math.floor(t/7)+2,r=u(t),n=145===r?26:2*Math.ceil((r-13)/(2*e-2)),o=[r-7],i=1;i<e-1;i++)o[i]=o[i-1]-n;return o.push(6),o.reverse()},a.getPositions=function(t){for(var e=[],r=a.getRowColCoords(t),n=r.length,o=0;o<n;o++)for(var i=0;i<n;i++)0===o&&0===i||0===o&&i===n-1||o===n-1&&0===i||e.push([r[o],r[i]]);return e}},xiuW:function(t,e,r){var n,o,i=r(\"c+5m\");o=i.alloc?(n=i.alloc(512),i.alloc(256)):(n=new i(512),new i(256)),function(){for(var t=1,e=0;e<255;e++)n[e]=t,o[t]=e,256&(t<<=1)&&(t^=285);for(e=255;e<512;e++)n[e]=n[e-255]}(),e.log=function(t){if(t<1)throw new Error(\"log(\"+t+\")\");return o[t]},e.exp=function(t){return n[t]},e.mul=function(t,e){return 0===t||0===e?0:n[o[t]+o[e]]}},xkxy:function(t,r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2},r.isValid=function(t){return t&&void 0!==t.bit&&0<=t.bit&&t.bit<4},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if(\"string\"!=typeof t)throw new Error(\"Param is not a string\");switch(t.toLowerCase()){case\"l\":case\"low\":return r.L;case\"m\":case\"medium\":return r.M;case\"q\":case\"quartile\":return r.Q;case\"h\":case\"high\":return r.H;default:throw new Error(\"Unknown EC Level: \"+t)}}(t)}catch(t){return e}}},\"y5+V\":function(t,e){e.isValid=function(t){return!isNaN(t)&&1<=t&&t<=40}},z083:function(t,e,r){var n=r(\"c+5m\");function o(t){if(!t||t<1)throw new Error(\"BitMatrix size must be defined and greater than 0\");this.size=t,this.data=new n(t*t),this.data.fill(0),this.reservedBit=new n(t*t),this.reservedBit.fill(0)}o.prototype.set=function(t,e,r,n){var o=t*this.size+e;this.data[o]=r,n&&(this.reservedBit[o]=!0)},o.prototype.get=function(t,e){return this.data[t*this.size+e]},o.prototype.xor=function(t,e,r){this.data[t*this.size+e]^=r},o.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},t.exports=o}});"}