(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{2167:function(e,t,n){"use strict";var r=n(3848);t.default=void 0;var o,a=(o=n(7294))&&o.__esModule?o:{default:o},c=n(1063),i=n(4651),s=n(7426);var u={};function l(e,t,n,r){if(e&&c.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;u[t+"%"+n+(o?"%"+o:"")]=!0}}var f=function(e){var t,n=!1!==e.prefetch,o=i.useRouter(),f=a.default.useMemo((function(){var t=c.resolveHref(o,e.href,!0),n=r(t,2),a=n[0],i=n[1];return{href:a,as:e.as?c.resolveHref(o,e.as):i||a}}),[o,e.href,e.as]),d=f.href,p=f.as,v=e.children,m=e.replace,h=e.shallow,y=e.scroll,b=e.locale;"string"===typeof v&&(v=a.default.createElement("a",null,v));var j=(t=a.default.Children.only(v))&&"object"===typeof t&&t.ref,g=s.useIntersection({rootMargin:"200px"}),w=r(g,2),x=w[0],O=w[1],P=a.default.useCallback((function(e){x(e),j&&("function"===typeof j?j(e):"object"===typeof j&&(j.current=e))}),[j,x]);a.default.useEffect((function(){var e=O&&n&&c.isLocalURL(d),t="undefined"!==typeof b?b:o&&o.locale,r=u[d+"%"+p+(t?"%"+t:"")];e&&!r&&l(o,d,p,{locale:t})}),[p,d,O,b,n,o]);var E={ref:P,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,a,i,s){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&c.isLocalURL(n))&&(e.preventDefault(),null==i&&r.indexOf("#")>=0&&(i=!1),t[o?"replace":"push"](n,r,{shallow:a,locale:s,scroll:i}))}(e,o,d,p,m,h,y,b)},onMouseEnter:function(e){c.isLocalURL(d)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),l(o,d,p,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var _="undefined"!==typeof b?b:o&&o.locale,k=o&&o.isLocaleDomain&&c.getDomainLocale(p,_,o&&o.locales,o&&o.domainLocales);E.href=k||c.addBasePath(c.addLocale(p,_,o&&o.defaultLocale))}return a.default.cloneElement(t,E)};t.default=f},7426:function(e,t,n){"use strict";var r=n(3848);Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!c,s=o.useRef(),u=o.useState(!1),l=r(u,2),f=l[0],d=l[1],p=o.useCallback((function(e){s.current&&(s.current(),s.current=void 0),n||f||e&&e.tagName&&(s.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=i.get(t);if(n)return n;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return i.set(t,n={id:t,observer:o,elements:r}),n}(n),o=r.id,a=r.observer,c=r.elements;return c.set(e,t),a.observe(e),function(){c.delete(e),a.unobserve(e),0===c.size&&(a.disconnect(),i.delete(o))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[n,t,f]);return o.useEffect((function(){if(!c&&!f){var e=a.requestIdleCallback((function(){return d(!0)}));return function(){return a.cancelIdleCallback(e)}}}),[f]),[p,f]};var o=n(7294),a=n(3447),c="undefined"!==typeof IntersectionObserver;var i=new Map},5018:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(t),n.d(t,{default:function(){return p}});n(3498);var o=n(1664),a=n(5893),c=[{name:"Home Page",href:"/"},{name:"Scheduler",href:"/scheduler"},{name:"SI",href:"/si"},{name:"Professor",href:"/professor"}],i=function(){return(0,a.jsx)("ul",{className:"m-4 flex justify-evenly",children:c.map((function(e){var t=e.name,n=e.href;return(0,a.jsx)("li",{children:(0,a.jsx)(o.default,{href:n,children:(0,a.jsx)("a",{className:"p-2 border-2 border-black",children:t})})},t)}))})};i.displayName="Header";var s=function(e){var t=e.children;return(0,a.jsxs)("div",{children:[(0,a.jsx)(l,{}),(0,a.jsx)(i,{}),t]})};s.displayName="Layout";var u=n(9008),l=function(e){var t=e.title,n=e.keywords,r=e.description;return(0,a.jsxs)(u.default,{children:[(0,a.jsx)("title",{children:t}),(0,a.jsx)("meta",{name:"keywords",content:n}),(0,a.jsx)("meta",{name:"description",content:r}),(0,a.jsx)("meta",{charSet:"utf-8"}),(0,a.jsx)("meta",{httpEquiv:"X-UA-Compatible",content:"IE=edge"}),(0,a.jsx)("meta",{name:"viewport",content:"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"}),(0,a.jsx)("meta",{name:"theme-color",content:"#151515"}),(0,a.jsx)("link",{rel:"icon",href:"/images/icons/favicon.ico"})]})};function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}l.displayName="Meta",l.defaultProps={title:"Programming Assessment",keywords:"Programming Assessment",description:"Programming Assessment for CS-358"};var p=function(e){var t=e.Component,n=e.pageProps;return(0,a.jsx)(s,{children:(0,a.jsx)(t,d({},n))})}},6363:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(5018)}])},3498:function(){},9008:function(e,t,n){e.exports=n(639)},1664:function(e,t,n){e.exports=n(2167)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(6363),t(4651)}));var n=e.O();_N_E=n}]);