(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[276],{1437:function(e,n,t){"use strict";t.d(n,{an:function(){return r},i4:function(){return u},xh:function(){return a},EF:function(){return c},rY:function(){return s},My:function(){return i},cx:function(){return o}});var r=["Monday","Tuesday","Wednesday","Thursday","Friday"],u=["8:00-8:55","9:05-10:00","10:10-11:05","11:15-12:10","12:20-1:15","1:25-2:20","2:30-3:25","3:35-4:30"],a=function(e){switch(e){case"Monday":return 0;case"Tuesday":return 1;case"Wednesday":return 2;case"Thursday":return 3;case"Friday":return 4}},c=function(e){switch(e){case"Monday":return"M";case"Tuesday":return"T";case"Wednesday":return"W";case"Thursday":return"Th";case"Friday":return"F"}},s=function(e){var n=parseInt(e.match(/[^-]*/)[0].replace(":",""));return n<600&&(n+=1200),n},i=function(e){return u.find((function(n){return s(n)===e}))},o=function(e){return e.split(",").map((function(e){switch(e){case"M":return"Monday";case"T":return"Tuesday";case"W":return"Wednesday";case"Th":return"Thursday";case"F":return"Friday"}}))}},6038:function(e,n,t){"use strict";t.r(n),t.d(n,{SIPage:function(){return h}});var r=t(266),u=t(809),a=t.n(u),c=t(1437),s=t(7294),i=t(5893);function o(e,n){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=function(e,n){if(!e)return;if("string"===typeof e)return d(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return d(e,n)}(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var r=0,u=function(){};return{s:u,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:u}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,s=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return c=e.done,e},e:function(e){s=!0,a=e},f:function(){try{c||null==t.return||t.return()}finally{if(s)throw a}}}}function d(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var f=c.i4.map((function(e){return{hour:e,active:!1}})),l=c.an.map((function(e){return{day:e,hours:f}})),h=function(){var e=(0,s.useState)([]),n=e[0],t=e[1],r=(0,s.useState)(null),u=r[0],a=r[1],c=(0,s.useState)(l),o=c[0],d=c[1];(0,s.useEffect)((function(){b().then((function(e){t((function(){return e})),a((function(){return e[0]}))}))}),[]);var f=function(e){var n=e.target.name,t=e.target.checked,r=n.match(/[^-]*/)[0],u=n.match(/-([\s\S]*)$/)[0].substring(1),a=o.map((function(e){if(e.day===r){var n=e.hours.map((function(e){return e.hour===u?{hour:u,active:t}:e}));return{day:r,hours:n}}return e}));d((function(){return a}))};return(0,i.jsxs)("div",{className:"bg-blue-800 p-4 h-screen",children:[(0,i.jsxs)("div",{className:"flex",children:[(0,i.jsx)("h1",{className:"text-lg text-blue-200 pr-2",children:"Select SI: "}),(0,i.jsx)("select",{className:"bg-blue-200 border-2 border-blue-500 text-black mb-6",value:null===u||void 0===u?void 0:u.studentId,onChange:function(e){var t=parseInt(e.target.value),r=n.find((function(e){return e.studentId===t}));a((function(){return r}))},children:u?n.map((function(e){return(0,i.jsx)("option",{value:e.studentId,children:e.name},e.studentId)})):(0,i.jsx)("option",{value:"blank"})})]}),(0,i.jsx)("h1",{className:"text-center p-2 text-2xl border-b-2 bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200",children:"SI - Weekly Schedule"}),(0,i.jsx)("p",{className:"text-lg text-blue-200 text-center m-2",children:"Select class hours that have a conflict."}),(0,i.jsxs)("form",{className:"bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200 accent-gray-800",children:[(0,i.jsx)("div",{className:"flex space-x-4 justify-between items-start py-4 px-8",children:o.map((function(e){var n=e.day,t=e.hours;return(0,i.jsxs)("div",{className:"divide-y divide-black bg-blue-800 flex-center border-2 border-black rounded-lg",children:[(0,i.jsx)("h1",{className:"text-center text-lg",children:n}),t.map((function(e){var t=e.hour,r=e.active;return(0,i.jsxs)("div",{className:"p-2 flex justify-between items-center bg-blue-800 flex-center",children:[(0,i.jsx)("span",{className:"pr-2",children:t}),(0,i.jsx)("input",{type:"checkbox",checked:r,name:"".concat(n,"-").concat(t),onChange:f})]},"".concat(n,"-").concat(t))}))]},n)}))}),(0,i.jsx)("div",{className:"flex items-center justify-center mb-4",children:(0,i.jsx)("button",{className:"shadow bg-blue-600 border-2 border-black hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded",type:"button",onClick:function(){null!==u&&void 0!==u&&u.studentId&&p(o,u.studentId).then()},children:"Submit"})})]})]})};h.displayName="SIPage";var p=function(){var e=(0,r.Z)(a().mark((function e(n,t){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(t);case 2:return e.next=4,y(n,t);case 4:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),b=function(){var e=(0,r.Z)(a().mark((function e(){var n,t,r,u;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/view-sis-with-conflicts.php");case 2:return n=e.sent,e.next=5,n.json();case 5:return t=e.sent,r=t.sort((function(e,n){return e.studentId-n.studentId})),u=r.filter((function(e,n){return!n||e.studentId!==r[n-1].studentId})),e.abrupt("return",u);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=(0,r.Z)(a().mark((function e(n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/delete-conflicts.php",{method:"Post",headers:{"Content-Type":"application/json"},body:JSON.stringify({student:n})});case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),y=function(){var e=(0,r.Z)(a().mark((function e(n,t){var r,u,s,i,d,f,l,h,p;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=o(n),e.prev=1,r.s();case 3:if((u=r.n()).done){e.next=25;break}s=u.value,i=s.day,d=s.hours,f=o(d),e.prev=6,f.s();case 8:if((l=f.n()).done){e.next=15;break}if(h=l.value,p=h.hour,!h.active){e.next=13;break}return e.next=13,fetch("/api/add-conflict.php",{method:"Post",headers:{"Content-Type":"application/json"},body:JSON.stringify({student:t,time:(0,c.rY)(p),day:(0,c.xh)(i)})});case 13:e.next=8;break;case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(6),f.e(e.t0);case 20:return e.prev=20,f.f(),e.finish(20);case 23:e.next=3;break;case 25:e.next=30;break;case 27:e.prev=27,e.t1=e.catch(1),r.e(e.t1);case 30:return e.prev=30,r.f(),e.finish(30);case 33:case"end":return e.stop()}}),e,null,[[1,27,30,33],[6,17,20,23]])})));return function(n,t){return e.apply(this,arguments)}}();n.default=h},5525:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/si",function(){return t(6038)}])},266:function(e,n,t){"use strict";function r(e,n,t,r,u,a,c){try{var s=e[a](c),i=s.value}catch(o){return void t(o)}s.done?n(i):Promise.resolve(i).then(r,u)}function u(e){return function(){var n=this,t=arguments;return new Promise((function(u,a){var c=e.apply(n,t);function s(e){r(c,u,a,s,i,"next",e)}function i(e){r(c,u,a,s,i,"throw",e)}s(void 0)}))}}t.d(n,{Z:function(){return u}})}},function(e){e.O(0,[774,888,179],(function(){return n=5525,e(e.s=n);var n}));var n=e.O();_N_E=n}]);