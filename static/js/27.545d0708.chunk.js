(window.webpackJsonpShaadiOnChain=window.webpackJsonpShaadiOnChain||[]).push([[27],{1017:function(t,e,r){"use strict";r.r(e);var n=r(110),o=r(2),a=r(26),i=r(0),c=r.n(i),u=(r(88),r(5)),s=r(20),f=r(82);function l(){l=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",a=n.asyncIterator||"@@asyncIterator",i=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(_){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof h?e:h,a=Object.create(o.prototype),i=new j(n||[]);return a._invoke=function(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return k()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=x(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,i),a}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(_){return{type:"throw",arg:_}}}t.wrap=u;var f={};function h(){}function p(){}function d(){}var v={};c(v,o,(function(){return this}));var y=Object.getPrototypeOf,m=y&&y(y(L([])));m&&m!==e&&r.call(m,o)&&(v=m);var g=d.prototype=h.prototype=Object.create(v);function w(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){var n;this._invoke=function(o,a){function i(){return new e((function(n,i){!function n(o,a,i,c){var u=s(t[o],t,a);if("throw"!==u.type){var f=u.arg,l=f.value;return l&&"object"==typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(l).then((function(t){f.value=t,i(f)}),(function(t){return n("throw",t,i,c)}))}c(u.arg)}(o,a,n,i)}))}return n=n?n.then(i,i):i()}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function L(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:k}}function k(){return{value:void 0,done:!0}}return p.prototype=d,c(g,"constructor",d),c(d,"constructor",p),p.displayName=c(d,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,i,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},w(b.prototype),c(b.prototype,a,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new b(u(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},w(g),c(g,i,"Generator"),c(g,o,(function(){return this})),c(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=L,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:L(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}e.default=function(t){var e=Object(u.g)().goBack,r=t.match.params.itemId,h=Object(i.useState)({itemId:"",tokenId:"",name:"",description:"",image:"",creator:"",owner:"",price:"",ringType:"",creatorName:""}),p=Object(a.a)(h,2),d=p[0],v=p[1];Object(i.useEffect)((function(){(function(){var t=Object(o.a)(l().mark((function t(){var e,o,a,i;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(s.m)(r);case 2:return e=t.sent,t.next=5,Object(f.g)(e.tokenId);case 5:return o=t.sent,t.next=8,Object(f.d)(e.tokenId);case 8:return a=t.sent,t.next=11,Object(s.n)(e.creator);case 11:i=t.sent,v((function(t){return Object(n.a)(Object(n.a)({},t),{},{itemId:e.itemId,tokenId:e.tokenId,name:o.name,description:o.description,image:a,creator:e.creator,owner:e.owner,price:e.price,ringType:o.ringType,creatorName:i.name})}));case 13:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[r]);var y=function(){var t=Object(o.a)(l().mark((function t(e){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(s.y)(d.itemId,d.price);case 2:t.sent&&(window.alert("Purchase is successfully completed!"),window.location.href="/#/dashboard");case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return c.a.createElement("div",{className:"purchase"},c.a.createElement("div",{className:"goback"},c.a.createElement("img",{style:{width:"48px"},src:"/ShaadiOnChain/assets/images/wedding-img/icon/left-arrow3.png",onClick:e,alt:"Go back",className:"gobackButton"})),c.a.createElement("div",null),c.a.createElement("div",{className:"purchase__artwork"},c.a.createElement("img",{src:d.image,alt:"Ring NFT"})),c.a.createElement("div",{className:"purchase__details"},c.a.createElement("h1",null,"#",d.tokenId," ",d.name),c.a.createElement("h3",null,d.description),c.a.createElement("h4",null,"Creator: ",d.creatorName),c.a.createElement("h4",null,"Current Owner: ",d.owner.slice(0,10),"..."),c.a.createElement("h4",null,d.ringType," Ring"),c.a.createElement("div",{className:"purchase__detailsBuy"},c.a.createElement("div",{className:"value"},c.a.createElement("h2",null,s.I.utils.fromWei(d.price)),c.a.createElement("img",{src:"/ShaadiOnChain/assets/images/ethereum3.svg",alt:"ETH",width:"30",height:"30",className:"symbol"})),c.a.createElement("button",{onClick:y}," Buy now"))))}},110:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r(16);function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},82:function(t,e,r){"use strict";r.d(e,"i",(function(){return s})),r.d(e,"d",(function(){return f})),r.d(e,"g",(function(){return l})),r.d(e,"e",(function(){return h})),r.d(e,"c",(function(){return d})),r.d(e,"h",(function(){return v})),r.d(e,"a",(function(){return y})),r.d(e,"f",(function(){return g})),r.d(e,"b",(function(){return w}));var n=r(2),o=r(20),a=r(97),i=r.n(a);function c(){c=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",a=n.asyncIterator||"@@asyncIterator",i=n.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(_){u=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof h?e:h,a=Object.create(o.prototype),i=new j(n||[]);return a._invoke=function(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return k()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=x(i,r);if(c){if(c===l)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=f(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,i),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(_){return{type:"throw",arg:_}}}t.wrap=s;var l={};function h(){}function p(){}function d(){}var v={};u(v,o,(function(){return this}));var y=Object.getPrototypeOf,m=y&&y(y(L([])));m&&m!==e&&r.call(m,o)&&(v=m);var g=d.prototype=h.prototype=Object.create(v);function w(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){var n;this._invoke=function(o,a){function i(){return new e((function(n,i){!function n(o,a,i,c){var u=f(t[o],t,a);if("throw"!==u.type){var s=u.arg,l=s.value;return l&&"object"==typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(l).then((function(t){s.value=t,i(s)}),(function(t){return n("throw",t,i,c)}))}c(u.arg)}(o,a,n,i)}))}return n=n?n.then(i,i):i()}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function L(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:k}}function k(){return{value:void 0,done:!0}}return p.prototype=d,u(g,"constructor",d),u(d,"constructor",p),p.displayName=u(d,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,u(t,i,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},w(b.prototype),u(b.prototype,a,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new b(s(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},w(g),u(g,i,"Generator"),u(g,o,(function(){return this})),u(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=L,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,l):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:L(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}var u=function(){var t=Object(n.a)(c().mark((function t(e){var r;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(o.F)(e);case 2:return r="https://"+(r=(r=(r=t.sent).slice(7)).substring(0,r.length-14))+".ipfs.dweb.link/metadata.json",t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),s=function(t){var e=t.slice(7);return e="https://"+(e=e.substring(0,e.length-5))+".ipfs.dweb.link/blob"},f=function(){var t=Object(n.a)(c().mark((function t(e){var r,n,o;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u(e);case 2:return r=t.sent,t.next=5,i()(r);case 5:return n=t.sent,o=s(n.data.image),t.abrupt("return",o);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),l=function(){var t=Object(n.a)(c().mark((function t(e){var r,n;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u(e);case 2:return r=t.sent,t.next=5,i()(r);case 5:return n=t.sent,t.abrupt("return",n.data);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),h=function(){var t=Object(n.a)(c().mark((function t(e){var r,n;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(o.G)(e);case 2:return r=t.sent,n="https://"+r+".ipfs.dweb.link",t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),p=function(){var t=Object(n.a)(c().mark((function t(e){var r;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(o.t)(e);case 2:return r="https://"+(r=(r=(r=t.sent).slice(7)).substring(0,r.length-14))+".ipfs.dweb.link/metadata.json",t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),d=function(){var t=Object(n.a)(c().mark((function t(e){var r,n,o;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p(e);case 2:return r=t.sent,t.next=5,i()(r);case 5:return n=t.sent,o=s(n.data.image),t.abrupt("return",o);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),v=function(){var t=Object(n.a)(c().mark((function t(e){var r,n;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(o.H)(e);case 2:return r=t.sent,n=w(r),t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),y=function(t){for(var e=atob(t.split(",")[1]),r=new ArrayBuffer(e.length),n=new Uint8Array(r),o=0;o<e.length;o++)n[o]=e.charCodeAt(o);return new Blob([r],{type:"image/*"})},m=function(){var t=Object(n.a)(c().mark((function t(e){var r;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r="https://"+(r=(r=(r=e).slice(7)).substring(0,r.length-14))+".ipfs.dweb.link/metadata.json",t.abrupt("return",r);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),g=function(){var t=Object(n.a)(c().mark((function t(e){var r,n;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m(e);case 2:return r=t.sent,t.next=5,i()(r);case 5:return n=t.sent,t.abrupt("return",n.data);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),w=function(t){return"https://"+t+".ipfs.dweb.link"}},88:function(t,e,r){}}]);
//# sourceMappingURL=27.545d0708.chunk.js.map