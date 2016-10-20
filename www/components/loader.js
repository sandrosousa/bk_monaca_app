/**
 * This is an auto-generated code by Monaca JS/CSS Components.
 * Please do not edit by hand.
 */

/*** <GENERATED> ***//*** <Start:monaca-core-utils> ***/
/*** <Start:monaca-core-utils LoadJs:"components/monaca-core-utils/monaca-core-utils.js"> ***/
/**
 * Monaca Core Utility Library
 * This library requires cordova.js
 *
 * @version 2.0.4
 * @author  Asial Corporation
 */
window.monaca = window.monaca || {};

(function() {
    /*
     * monaca api queue.
     */
    monaca.apiQueue = monaca.apiQueue || {};
    monaca.apiQueue.paramsArray = [];
    monaca.apiQueue.exec = function(a,b,c,d,e){
        if (!monaca.isDeviceReady) {
            monaca.apiQueue.paramsArray.push([a,b,c,d,e]);
        } else {
            window.cordova.exec(a,b,c,d,e);
        }
    };
    monaca.apiQueue.next = function(){
        var params = monaca.apiQueue.paramsArray.shift();
        if (params) {
            window.cordova.exec(
                function(r) {
                  if (typeof params[0] === 'function') params[0](r); 
                  monaca.apiQueue.next();
                },
                function(r) {
                  if (typeof params[1] === 'function') params[1](r); 
                  monaca.apiQueue.next();
                },
                params[2],
                params[3],
                params[4]
            );
        }
    };

    monaca.isDeviceReady = monaca.isDeviceReady || false;
    document.addEventListener('deviceready', function(){
        window.monaca.isDeviceReady = true;
        monaca.apiQueue.next();
    }, false);

    /**
     * Check User-Agent
     */
    var isAndroid = !!(navigator.userAgent.match(/Android/i));
    var isIOS     = !!(navigator.userAgent.match(/iPhone|iPad|iPod/i));
    monaca.isAndroid = isAndroid;
    monaca.isIOS     = isIOS;

    /**
     * Obtain style property
     */
    monaca.retrieveUIStyle = function() {
        var argsArray = [].slice.apply(arguments);
        monaca.apiQueue.exec(arguments[arguments.length-1], null, "mobi.monaca.nativecomponent", "retrieve", argsArray);
    };

    /**
     * Update style property
     */
    monaca.updateUIStyle = function(id, name, value) {
        if (typeof id == "string") {
            var argsArray = [].slice.apply(arguments);
            monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", "update", argsArray);
        } else {
            for (var i = 0; i < id.length; i++) {
                monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", "update", [id[i], name, value]);
            }
        }
    };
    
    if (isAndroid) {
        monaca.retrieveUIStyle = function(id, name, success, failure) {
            monaca.apiQueue.exec(
                function(style) { success(style[name]); } || function() { }, 
                failure || function() { }, 
                "mobi.monaca.nativecomponent",
                "retrieve", 
                [id]
            );
        };
            
        monaca.updateUIStyle = function(id, name, value, success, failure) {
            var style = {};
            style[name] = value;
            
            monaca.apiQueue.exec(
                success || function() { }, 
                failure || function() { }, 
                "mobi.monaca.nativecomponent",
                "update", 
                [id, style]
            );
        };
    }

    /**
     * Spinner handling
     */
    monaca.showSpinner = function (options) {
        options = options || {};
        var src = options.src ? options.src : null;
        var frames = options.frames != null ? options.frames : null;
        var interval = options.interval != null ? options.interval : null;
        var backgroundColor = options.backgroundColor ? options.backgroundColor : null;
        var backgroundOpacity = options.backgroundOpacity != null ? options.backgroundOpacity : null;
        var title = options.title ? options.title : null;
        var titleColor = options.titleColor ? options.titleColor : null;
        var titleFontScale = options.titleFontScale != null ? options.titleFontScale : null;
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'showSpinner', [ src, frames, interval, backgroundColor, backgroundOpacity, title, titleColor, titleFontScale, null ]);
    };

    monaca.hideSpinner = function(){
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'hideSpinner', []);
    };

    monaca.updateSpinnerTitle = function(newTitle){
        if (!newTitle) newTitle = "";
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'updateSpinnerTitle', [ newTitle ]);
    };

    var transitionPluginName = "Transit";
    
    /**
     * Open new page.
     */
    monaca.pushPage = function(path, options, param) {
        options = options || {};
        var animation = null;
        switch (options.animation) {
        case "lift":
          animation = "modal"; break;
        case "slide":
        case "slideLeft":
          animation = "push"; break;
        case "slideRight":
          animation = "slideRight"; break;
        default:
          animation = "push";
        }
        monaca.apiQueue.exec(null, null, transitionPluginName, animation, [path, options, param]);
    };
    /**
     * Close current page.
     */
    monaca.popPage = function(options) {
        options = options || {};
        var name = options.animation == 'lift' ? 'dismiss' : 'pop';
        monaca.apiQueue.exec(null, null, transitionPluginName, name, [options]);
    };

    /**
     * Open in browser.
     */
    monaca.invokeBrowser = function(url) {
        monaca.apiQueue.exec(null, null, transitionPluginName, "browse", [url]);
    };

    /** 
     * Load in current page.
     */
    monaca.load = function(path, options, param) {
        monaca.apiQueue.exec(null, null, transitionPluginName, "link", [path, options, param]);
    };

    /**
     * return to top page.
     */
    monaca.home = function(options) {
        options = options || {};
        monaca.apiQueue.exec(null, null, transitionPluginName, "home", [options]);
    };

    /**
     * Clear stack
     */
    monaca.clearPageStack = function(clearAll) {
        clearAll = clearAll || false;
        monaca.apiQueue.exec(null, null, transitionPluginName, "clearPageStack", [clearAll]);
    };


    /**
     * Console API from independent PhoneGap.
     */
    window.monaca.console = window.monaca.console || {};

    /**
     * base method for send log.
     */
    monaca.console.sendLog = function(level, url, line, char, arguments) {
        var message;
        for (var i=0; i<arguments.length; i++){
            if (typeof arguments[i] == "string") {
                message = arguments[i];
            } else {
                message = JSON.stringify(arguments[i]);
            }

            if (isIOS) {
                var head = message.substr(0, 5);
                if (window.monaca.isDeviceReady !== true || (head != 'ERROR' && head != 'WARN:')) {
                    var xhr = new XMLHttpRequest();
                    var path = "monaca://log?level=" + encodeURIComponent(level) + "&message=" + encodeURIComponent(message);
                    xhr.open("GET", path);
                    xhr.send();
                }
            } else {
                window.console[level](message);
            }
        }
    }

    /**
     * monaca console methods
     */
    var methods = ["debug", "info", "log", "warn", "error"];
    for (var i=0; i<methods.length; i++) {
        var method = methods[i];
        monaca.console[method] = function(method) {
            return function() {
                monaca.console.sendLog(method, null, null, null, arguments);
            };
        }(method);
    }
    
    /** Replace window.console if iOS **/
    if (isIOS) {
      window.console = window.monaca.console;
    }
    /* Comment out for now
    window.onerror = function (desc, page, line, char) {
      monaca.console.sendLog("error", page, line, char, [desc]);
    };
    */

    window.monaca.splashScreen = window.monaca.splashScreen || {};
    var splashScreenPluginName = "MonacaSplashScreen";

    /**
     * hide SplashScreen.
     */
    monaca.splashScreen.hide = function() {
        if (isAndroid) {
            monaca.apiQueue.exec(null, null, splashScreenPluginName, "hide", []);
        } else {
            navigator.splashscreen.hide();
        }
    };

    // Set monaca.baseUrl
    if (typeof location.href !== "string") {
        console.warn("Cannot find base url");
        monaca.baseUrl = null;
    } else {
        monaca.baseUrl = location.href.split("/www/")[0] + "/www/";
    }

    /**
     * Get device ID
     */
    monaca.getDeviceId = function(callback) {
        monaca.apiQueue.exec(function(result) { callback(result.deviceId); }, null, "Monaca", "getRuntimeConfiguration", []);
    };

})();

/**
 * iOS Status Bar Plugin
 *
 * @author Asial Corporation
 * @date   2014/1/15
 */
window.StatusBar = window.StatusBar || {};

(function() {

  /*
    hideStatusBar
    support : iOS6,iOS7
  */
  StatusBar.hideStatusBar = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'hideStatusBar', []);
  }

  /*
    showStatusBar
    support : iOS6,iOS7
  */
  StatusBar.showStatusBar = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'showStatusBar', []);
  }

  /* 
    statusBarStyleDefault
    support : iOS6,iOS7
  */
  StatusBar.statusBarStyleDefault = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleDefault', []);
  }

  /* 
    statusBarStyleLightContent
    support : iOS7
  */
  StatusBar.statusBarStyleLightContent = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleLightContent', []);
  }

  /* 
    statusBarStyleBlackOpaque
    support : iOS6
  */
  StatusBar.statusBarStyleBlackOpaque = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleBlackOpaque', []);
  }

  /* 
    statusBarStyleBlackTranslucent
    support : iOS6
  */
  StatusBar.statusBarStyleBlackTranslucent = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleBlackTranslucent', []);
  }

})();

/**
 * Monaca Cloud Functions
 *  Version 1.5.0
 *
 * @author Masahiro TANAKA <info@monaca.mobi>
 * @date   2013/03/17
 */
window.monaca = window.monaca || {};
window.monaca.cloud = window.monaca.cloud || {};

(function() {
    /**
     * Push Notification
     */
    monaca.cloud.Push = {};
    monaca.cloud.Push.callback = null;
    monaca.cloud.Push.callbackData = null;

    monaca.cloud.Push.send = function(data) {
        if (typeof monaca.cloud.Push.callback === "function") {
            monaca.cloud.Push.callback(data);
        } else {
            monaca.cloud.Push.callbackData = data;
        }
    };
    monaca.cloud.Push.setHandler = function(fn) {
        if (typeof fn !== "function") {
            console.warn("Push callback must be a function");
        } else {
            monaca.cloud.Push.callback = fn;
            if (monaca.cloud.Push.callbackData) {
                monaca.cloud.Push.callback(monaca.cloud.Push.callbackData);
                monaca.cloud.Push.callbackData = null;
            }
        }
    }; 
    
})();


/*
 * cloud
 */
(function(root) {
  var original$ = root.$;
  var originalZepto = root.Zepto;

  /* Zepto 1.1.3 - zepto event ajax deferred callbacks - zeptojs.com/license */
  var Zepto=function(){function k(t){return null==t?String(t):j[T.call(t)]||"object"}function $(t){return"function"==k(t)}function L(t){return null!=t&&t==t.window}function D(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function F(t){return"object"==k(t)}function Z(t){return F(t)&&!L(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function R(t){return s.call(t,function(t){return null!=t})}function _(t){return t.length>0?n.fn.concat.apply([],t):t}function q(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function W(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function z(t,e){return"number"!=typeof e||c[q(t)]?e:e+"px"}function H(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function I(n,i,r){for(e in i)r&&(Z(i[e])||A(i[e]))?(Z(i[e])&&!Z(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),I(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function B(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return $(e)?e.call(t,n,i):e}function U(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function X(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n in t.childNodes)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},T=j.toString,S={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return S.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~S.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},S.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),Z(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},S.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},S.isZ=function(t){return t instanceof S.Z},S.init=function(e,i){var r;if(!e)return S.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=S.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}else{if($(e))return n(a).ready(e);if(S.isZ(e))return e;if(A(e))r=R(e);else if(F(e))r=[e],e=null;else if(l.test(e))r=S.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}}return S.Z(r,e)},n=function(t,e){return S.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){I(t,n,e)}),t},S.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return D(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=function(t,e){return t!==e&&t.contains(e)},n.type=k,n.isFunction=$,n.isWindow=L,n.isArray=A,n.isPlainObject=Z,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return _(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return $(t)?this.not(this.not(t)):n(s.call(this,function(e){return S.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&S.matches(this[0],t)},not:function(e){var i=[];if($(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&$(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return F(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!F(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!F(t)?t:n(t)},find:function(t){var e,i=this;return e="object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(S.qsa(this[0],t)):this.map(function(){return S.qsa(this,t)})},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:S.matches(i,t));)i=i!==e&&!D(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!D(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return B(e,t)},parent:function(t){return B(N(this.pluck("parentNode")),t)},children:function(t){return B(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return B(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=H(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=$(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=$(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))})},text:function(e){return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=e===t?"":""+e})},attr:function(n,i){var r;return"string"==typeof n&&i===t?0==this.length||1!==this[0].nodeType?t:"value"==n&&"INPUT"==this[0].nodeName?this.val():!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:this.each(function(t){if(1===this.nodeType)if(F(n))for(e in n)U(this,e,n[e]);else U(this,n,J(this,i,t,this.getAttribute(n)))})},removeAttr:function(t){return this.each(function(){1===this.nodeType&&U(this,t)})},prop:function(e,n){return e=P[e]||e,n===t?this[0]&&this[0][e]:this.each(function(t){this[e]=J(this,n,t,this[e])})},data:function(e,n){var i=this.attr("data-"+e.replace(m,"-$1").toLowerCase(),n);return null!==i?Y(i):t},val:function(t){return 0===arguments.length?this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(e){this.value=J(this,t,e,this.value)})},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(0==this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==k(t))i||0===i?a=q(t)+":"+z(t,i):this.each(function(){this.style.removeProperty(q(t))});else for(e in t)t[e]||0===t[e]?a+=q(e)+":"+z(e,t[e])+";":this.each(function(){this.style.removeProperty(q(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(X(t))},W(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=X(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&X(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?X(this,""):(i=X(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(W(t)," ")}),void X(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,X(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?L(s)?s["inner"+i]:D(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=k(e),"object"==t||"array"==t||null==e?e:S.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null,r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();G(o.insertBefore(t,a),function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),S.Z.prototype=n.fn,S.uniq=N,S.deserializeValue=Y,n.zepto=S,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function T(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){if(r(e)){var i=function(){return e.apply(n,arguments)};return i._zid=l(e),i}if(o(n))return t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(T(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=T(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function S(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?S(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n),n.cache===!1&&(n.url=w(n.url,"_="+Date.now()));var s=n.dataType,a=/\?.+=\?/.test(n.url);if("jsonp"==s||a)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var T="async"in n?n.async:!0;d.open(n.type,n.url,T,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var T=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(T(t)+"="+T(e))},S(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto);

  root.$ = original$;
  root.Zepto = originalZepto;
  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};

  monaca.cloud.timeout = 30000;
  monaca.cloud.url = '%%%CLOUD_HOST%%%';
  monaca.cloud.backendId = '%%%BACKEND_ID%%%';
  monaca.cloud.apiKey = '%%%BACKEND_API_KEY%%%';
  monaca.cloud.deviceId = null;
  monaca.cloud.postQueue = [];

  /**
   * @property {jQuery} .
   */
  monaca.cloud.$ = Zepto;

  var MonacaCloudError = (function() {
    function MonacaCloudError(code, message, data) {
      if (typeof data === "undefined") {
        data = {};
      }
      this.code = code;
      this.message = message;
      this.data = data;
    }
    return MonacaCloudError;
  })();

  /**
   * @class
   */
  monaca.cloud.Error = function(code, message, data) {
    return new MonacaCloudError(code, message, data);
  };

  /**
   * @param {Number} msec .
   */
  monaca.cloud.setTimeout = function(msec) {
    this.timeout = msec;
  };

  // Get device id
  document.addEventListener("deviceready", function() {

    cordova.exec(function(result) {
        monaca.cloud.deviceId = new String(result.deviceId);
        monaca.cloud.url = new String(result.url);
        monaca.cloud.backendId = new String(result.backendId);
        monaca.cloud.apiKey = new String(result.apiKey);

        // execute and clear postQueue
        for (var i = 0; i < monaca.cloud.postQueue.length; i++) {
          monaca.cloud._doPost.apply(monaca.cloud, monaca.cloud.postQueue[i]);
        }
        monaca.cloud.postQueue = [];
      }, function(error) {
        console.error(error);
      },

      "Monaca",
      "getRuntimeConfiguration", []
    );

  }, false);

  // Others
  monaca.cloud._post = function(method, params, dfd, ajaxOptions, beforeSuccess) {
    if (monaca.cloud.deviceId == null) {
      monaca.cloud.postQueue.push([method, params, dfd, ajaxOptions, beforeSuccess]);
    } else {
      monaca.cloud._doPost(method, params, dfd, ajaxOptions, beforeSuccess);
    }
  };

  monaca.cloud._doPost = function(method, params, dfd, ajaxOptions, beforeSuccess) {
    var $ = monaca.cloud.$;

    if (typeof(ajaxOptions) === 'undefined') ajaxOptions = {};
    if ((typeof(method) === 'undefined') && (typeof(params) === 'undefined')) {
      throw new Error('Invalid arguments');
    }

    params['__api_key'] = monaca.cloud.apiKey;
    params['__device'] = monaca.cloud.deviceId;
    var sid = monaca.cloud._getSessionId();
    if (sid.length > 0) {
      params['__session'] = sid;
    }
    var data = JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: '1'
    });

    var o = $.extend(true, {
      url: this.url + this.backendId,
      data: data,
      dataType: 'json',
      type: 'POST',
      timeout: this.timeout,
      success: function(jsonResponse, status, xhr) {
        var sessionHeader = xhr.getResponseHeader('X-Set-Monaca-Cloud-Session');
        if (sessionHeader) {
          monaca.cloud._setSessionId(sessionHeader);
        }

        if (typeof(jsonResponse.error) !== 'undefined') {
          // has error code
          dfd.reject(jsonResponse.error);
        } else {
          // success
          if (typeof(jsonResponse.result.loginToken) !== 'undefined') {
            localStorage.monacaCloudLoginToken = jsonResponse.result.loginToken;
          }
          if (typeof(beforeSuccess) !== 'undefined') {
            beforeSuccess(jsonResponse, status, xhr, dfd);
          }
          dfd.resolve(jsonResponse.result);
        }
      },
      error: function(xhr, status) {
        switch (status) {
          case 'timeout':
            var err = monaca.cloud.Error(-11, 'Connection timeout');
            break;
          case 'parsererror':
            var err = monaca.cloud.Error(-12, 'Invalid response');
            break;
          default:
            var err = monaca.cloud.Error(-13, 'Invalid status code');
        }
        dfd.reject(err);
      }
    }, ajaxOptions);

    $.ajax(o);
  };

  var _sessionId = '';

  monaca.cloud._getSessionId = function() {
    return _sessionId;
  };

  monaca.cloud._setSessionId = function(id) {
    if (typeof id != 'string') {
      id = '';
    }
    _sessionId = id;
  };

})(window);
/*
 * CollectionItem
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCollectionItem = (function() {

    function MonacaCloudCollectionItem(item, collection) {

      /**
       * @property {String} .
       */
      this._id = item._id;

      /**
       * @property {String} .
       */
      this._ownerUserOid = item._ownerUserOid;

      /**
       * @property {Date} .
       */
      this._createdAt = new Date(item._createdAt);

      /**
       * @property {Date} .
       */
      this._updatedAt = new Date(item._updatedAt);

      /**
       * @property {MonacaCloudCollection} .
       */
      this._collection = collection;


      for (var key in item) {
        if (key.substr(0, 1) != '_') {
          this[key] = item[key];
        }
      }
    }

    MonacaCloudCollectionItem.prototype = {

      /**
       * @return {$.Promise} .
       */
      update: function() {
        var dfd = new $.Deferred();
        var col = this._collection;
        var data = {};

        for (var key in this) {
          if (key.indexOf('_') !== 0) {
            data[key] = this[key];
          }
        }

        monaca.cloud._post('Collection.update', {
          collectionName: col.name,
          itemOid: this._id,
          data: data,
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      getPermission: function() {
        var dfd = new $.Deferred();
        var col = this._collection;

        monaca.cloud._post('Collection.getPermission', {
          collectionName: col.name,
          itemOid: this._id
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @param {Object} permission .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      updatePermission: function(permission, options) {
        var dfd = new $.Deferred();
        var col = this._collection;

        if (typeof(options) === 'undefined') {
          options = {};
        }

        monaca.cloud._post('Collection.updatePermission', {
          collectionName: col.name,
          criteria: '_id == ?',
          bindParams: [this._id],
          permission: permission,
          options: options
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      remove: function() {
        var dfd = new $.Deferred();
        var col = this._collection;

        monaca.cloud._post('Collection.delete', {
          collectionName: col.name,
          itemOid: this._id,
        }, dfd, {});

        return dfd.promise();
      },

      'delete': function() {
        return this.remove();
      }

    };


    return MonacaCloudCollectionItem;
  })();

  monaca.cloud.CollectionItem = function(item, collection) {
    return new MonacaCloudCollectionItem(item, collection);
  };

})(window);
/*
 * Collection
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCollection = (function() {

    function MonacaCloudCollection(name) {
      this.name = name;
    }

    MonacaCloudCollection.prototype = {

      /**
       * @param {Object|Array} items .
       * @return {Array} result .
       */
      _makeCollectionItem: function(items) {
        var result = [];

        if (items instanceof Array) {
          for (var i = 0; i < items.length; i++) {
            result[i] = monaca.cloud.CollectionItem(items[i], this);
          }
        } else {
          result = monaca.cloud.CollectionItem(items, this);
        }

        return result;
      },

      /**
       * @param {Criteria|Array} criteria .
       */
      _validateCriteria: function(criteria) {
        if ((typeof(criteria) === 'undefined') || (typeof(criteria) === 'null')) {
          criteria = monaca.cloud.Criteria('');
        } else if (typeof(criteria) === 'string') {
          criteria = monaca.cloud.Criteria(criteria);
        }

        return criteria;
      },

      /**
       * @param {Object|Array} orderBy .
       * @param {Object} options .
       */
      _validateOptions: function(orderBy, options) {
        //if orderBy is hash, consider it as "options"
        if ((typeof(orderBy) === 'object') && (typeof(orderBy.length) === 'undefined')) {
          options = orderBy;
          if (typeof(options.orderBy) !== 'undefined') {
            orderBy = orderBy.orderBy;
          } else {
            orderBy = null;
          }
        }

        if (orderBy === '') {
          orderBy = null;
        }

        return {
          orderBy: orderBy,
          options: options
        };
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      find: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            e.result.items = self._makeCollectionItem(e.result.items);
            dfd.resolve(e.result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findMine: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        var userOid = monaca.cloud.User._oid;

        if (criteria.query != '') {
          criteria.query = '(' + criteria.query + ') && ';
        }
        if (userOid != null) {
          criteria.query += '(_ownerUserOid == ?)';
          criteria.bindParams.push(userOid);
        } else {
          criteria.query += '(_ownerDeviceOid == ?)';
          criteria.bindParams.push(monaca.cloud.deviceId);
        }

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            e.result.items = self._makeCollectionItem(e.result.items);
            dfd.resolve(e.result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findOne: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var result = (e.result.totalItems > 0) ? self._makeCollectionItem(e.result.items[0]) : null;
            dfd.resolve(result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findOneMine: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        var userOid = monaca.cloud.User._oid;

        if (criteria.query != '') {
          criteria.query = '(' + criteria.query + ') && ';
        }
        if (userOid != null) {
          criteria.query += '(_ownerUserOid == ?)';
          criteria.bindParams.push(userOid);
        } else {
          criteria.query += '(_ownerDeviceOid == ?)';
          criteria.bindParams.push(monaca.cloud.deviceId);
        }

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var result = (e.result.totalItems > 0) ? self._makeCollectionItem(e.result.items[0]) : null;
            dfd.resolve(result);
          });

        return dfd.promise();
      },

      /**
       * @param {Object} item .
       * @param {Object} [permission] .
       * @return {$.Promise} .
       */
      insert: function(item, permission) {
        var self = this;
        var dfd = new $.Deferred();

        if (typeof(permission) === 'undefined') {
          permission = {};
        }

        monaca.cloud._post('Collection.insert', {
            collectionName: this.name,
            item: item,
            permission: permission
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var item = self._makeCollectionItem(e.result.item);
            dfd.resolve(item);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {Object} permission .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      updatePermission: function(criteria, permission, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);

        monaca.cloud._post('Collection.updatePermission', {
          collectionName: this.name,
          criteria: criteria.query,
          bindParams: criteria.bindParams,
          permission: permission,
          options: options
        }, dfd, {});

        return dfd.promise();
      }
    };

    return MonacaCloudCollection;
  })();


  monaca.cloud.Collection = function(name) {
    return new MonacaCloudCollection(name);
  };

})(window);
/*
 * Criteria
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCriteria = (function() {

    function MonacaCloudCriteria(query, bindParams) {
      this.query = query;
      this.bindParams = (typeof(bindParams) !== 'undefined') ? bindParams : [];
    }

    return MonacaCloudCriteria;
  })();


  monaca.cloud.Criteria = function(query, bindParams) {
    return new MonacaCloudCriteria(query, bindParams);
  };

})(window);
/*
 * Device
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.Device = {

    /**
     * @param {String} name .
     * @return {$.Promise} .
     */
    getProperty: function(name) {
      var dfd = new $.Deferred();

      monaca.cloud._post('Device.getProperties', {
          names: [name]
        }, dfd, {},
        function(e, status, xhr, dfd) {
          dfd.resolve(e.result.properties[name]);
        }
      );

      return dfd.promise();
    },

    /**
     * @param {Array} names .
     * @return {$.Promise} .
     */
    getProperties: function(names) {
      var dfd = new $.Deferred();

      monaca.cloud._post('Device.getProperties', {
          names: names
        }, dfd, {},
        function(e, status, xhr, dfd) {
          dfd.resolve(e.result.properties);
        }
      );

      return dfd.promise();
    },

    /**
     * @param {String} name .
     * @param {String} value .
     * @return {$.Promise} .
     */
    saveProperty: function(name, value) {
      var dfd = new $.Deferred();
      var param = {};

      if ((typeof(name) !== 'undefined') && (typeof(value) !== 'undefined')) {
        param = {
          properties: {}
        };
        param.properties[name] = value;
      }

      monaca.cloud._post('Device.saveProperties', param, dfd);

      return dfd.promise();
    },

    /**
     * @param {Object} properties .
     * @return {$.Promise} .
     */
    saveProperties: function(properties) {
      var dfd = new $.Deferred();
      var param = {};

      if (typeof(properties) !== 'undefined') param.properties = properties;
      monaca.cloud._post('Device.saveProperties', param, dfd);

      return dfd.promise();
    }

  };

})(window);
/*
 * Mailer
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.Mailer = {

    /**
     * @param {String} userOid .
     * @param {String} templateName .
     * @param {Object} substituteParams .
     * @param {Object} [options] .
     * @return {$.Promise} .
     */
    sendMail: function(userOid, templateName, substituteParams, options) {
      var dfd = new $.Deferred();

      if (typeof(options) === 'undefined') {
        options = {};
      }

      monaca.cloud._post('Mailer.sendMail', {
        userOid: userOid,
        templateName: templateName,
        substituteParams: substituteParams,
        options: options
      }, dfd);

      return dfd.promise();
    }
  };

})(window);
/*
 * User
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.User = (function() {


    return {

      _oid: null,

      /**
       * @return {Boolean} .
       */
      isAuthenticated: function() {
        return (this._oid === null) ? false : true;
      },


      /**
       * @param {String} username .
       * @param {String} password .
       * @param {Object} [properties] .
       * @return {$.Promise} .
       */
      register: function(username, password, properties) {
        var dfd = new $.Deferred();
        var self = this;

        if (typeof(properties) === 'undefined') properties = {};

        monaca.cloud._post('User.register', {
            username: username,
            password: password,
            properties: properties
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );


        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {Object} properties .
       * @return {$.Promise} .
       */
      validate: function(username, properties) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.validate', {
          username: username,
          properties: properties
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} password .
       * @return {$.Promise} .
       */
      unregister: function(password) {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.unregister', {
            password: password
          }, dfd, {},
          function() {
            self._oid = null;
            monaca.cloud._setSessionId('');
            localStorage.removeItem('monacaCloudLoginToken');
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {String} password .
       * @return {$.Promise} .
       */
      login: function(username, password) {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.login', {
            username: username,
            password: password
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      autoLogin: function() {
        var dfd = new $.Deferred();
        var token = localStorage.monacaCloudLoginToken || '';
        var self = this;

        monaca.cloud._post('User.autoLogin', {
            loginToken: token
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      logout: function() {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.logout', {}, dfd, {},
          function() {
            self._oid = null;
            monaca.cloud._setSessionId('');
            localStorage.removeItem('monacaCloudLoginToken');
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} oldPassword .
       * @param {String} newPassword .
       * @return {$.Promise} .
       */
      updatePassword: function(oldPassword, newPassword) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.updatePassword', {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {Object} options .
       * @return {$.Promise} .
       */
      sendPasswordResetToken: function(username, options) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.sendPasswordResetToken', {
          username: username,
          options: options
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {String} newPassword .
       * @param {String} token .
       * @return {$.Promise} .
       */
      resetPasswordAndLogin: function(username, newPassword, token) {
        var dfd = new $.Deferred();
        var self = this;

        monaca.cloud._post('User.resetPasswordAndLogin', {
            username: username,
            newPassword: newPassword,
            token: token
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} name .
       * @return {$.Promise} .
       */
      getProperty: function(name) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.getProperties', {
            names: [name]
          }, dfd, {},
          function(e, status, xhr, dfd) {
            dfd.resolve(e.result.properties[name]);
          }
        );

        return dfd.promise();
      },

      /**
       * @param {Array} names .
       * @return {$.Promise} .
       */
      getProperties: function(names) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.getProperties', {
            names: names
          }, dfd, {},
          function(e, status, xhr, dfd) {
            dfd.resolve(e.result.properties);
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} name .
       * @param {String} value .
       * @return {$.Promise} .
       */
      saveProperty: function(name, value) {
        var dfd = new $.Deferred();
        var param = {};

        if (typeof(name) !== 'undefined') {
          param = {
            properties: {}
          };
          param.properties[name] = value;
        }

        monaca.cloud._post('User.saveProperties', param, dfd);

        return dfd.promise();
      },

      /**
       * @param {Object} properties .
       * @return {$.Promise} .
       */
      saveProperties: function(properties) {
        var dfd = new $.Deferred();
        var param = {};

        if (typeof(properties) !== 'undefined') param.properties = properties;
        monaca.cloud._post('User.saveProperties', param, dfd);

        return dfd.promise();
      }

    };
  })();

})(window);

/*** <End:monaca-core-utils LoadJs:"components/monaca-core-utils/monaca-core-utils.js"> ***/
/*** <End:monaca-core-utils> ***/


/*** <Start:monaca-cordova-loader> ***/
/*** <Start:monaca-cordova-loader LoadJs:"components/monaca-cordova-loader/cordova-loader.js"> ***/
(function(){
  if ((navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPhone|iPad|iPod/i))) {
    if (typeof location.href === "string") {
      var relativePath = location.href.split("/www")[1];
      var paths = relativePath.split("/");
      var cordovaJsUrl = ""; 
      for (var i = 0; i < paths.length - 2; i++) {
        cordovaJsUrl += "../";
      }
      document.write("<script src=\"" + cordovaJsUrl+ "cordova.js" + "\"></script>");
    }
  } else if ((navigator.userAgent.match(/MSIE\s10.0/)) && (navigator.userAgent.match(/Windows\sNT\s6.2/))) {
    var elm = document.createElement('script');
    elm.setAttribute("src", "cordova.js");
    document.getElementsByTagName("head")[0].appendChild(elm);
  };
})();
/*** <End:monaca-cordova-loader LoadJs:"components/monaca-cordova-loader/cordova-loader.js"> ***/
/*** <End:monaca-cordova-loader> ***/

/*** <Start:ngCordova> ***/
/*** <Start:ngCordova LoadJs:"components/ngCordova/dist/ng-cordova.min.js"> ***/
/*!
 * ngCordova
 * v0.1.27-alpha
 * Copyright 2015 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
!function(){angular.module("ngCordova",["ngCordova.plugins"]),angular.module("ngCordova.plugins.3dtouch",[]).factory("$cordova3DTouch",["$q",function(e){var n=[],r={},o=function(e){return function(n){for(var r in e)n.type===r&&e[r]()}};return{isAvailable:function(){var n=e.defer();return window.cordova?window.ThreeDeeTouch?window.ThreeDeeTouch.isAvailable(function(e){n.resolve(e)},function(e){n.reject(e)}):n.reject("Could not find 3D touch plugin"):n.reject("Not supported in browser"),n.promise},addQuickAction:function(t,i,a,c,u,s){var l=e.defer(),f={type:t,title:i,subtitle:u};return a&&(f.iconType=a),c&&(f.iconTemplate=c),this.isAvailable().then(function(){n.push(f),r[t]=s,window.ThreeDeeTouch.configureQuickActions(n),window.ThreeDeeTouch.onHomeIconPressed=o(r),l.resolve(n)},function(e){l.reject(e)}),l.promise},addQuickActionHandler:function(n,t){var i=e.defer();return this.isAvailable().then(function(){r[n]=t,window.ThreeDeeTouch.onHomeIconPressed=o(r),i.resolve(!0)},function(e){i.reject(e)}),i.promise},enableLinkPreview:function(){var n=e.defer();return this.isAvailable().then(function(){window.ThreeDeeTouch.enableLinkPreview(),n.resolve(!0)},function(e){n.reject(e)}),n.promise},addForceTouchHandler:function(n){var r=e.defer();return this.isAvailable().then(function(){window.ThreeDeeTouch.watchForceTouches(n),r.resolve(!0)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.actionSheet",[]).factory("$cordovaActionSheet",["$q","$window",function(e,n){return{show:function(r){var o=e.defer();return n.plugins.actionsheet.show(r,function(e){o.resolve(e)}),o.promise},hide:function(){return n.plugins.actionsheet.hide()}}}]),angular.module("ngCordova.plugins.adMob",[]).factory("$cordovaAdMob",["$q","$window",function(e,n){return{createBannerView:function(r){var o=e.defer();return n.plugins.AdMob.createBannerView(r,function(){o.resolve()},function(){o.reject()}),o.promise},createInterstitialView:function(r){var o=e.defer();return n.plugins.AdMob.createInterstitialView(r,function(){o.resolve()},function(){o.reject()}),o.promise},requestAd:function(r){var o=e.defer();return n.plugins.AdMob.requestAd(r,function(){o.resolve()},function(){o.reject()}),o.promise},showAd:function(r){var o=e.defer();return n.plugins.AdMob.showAd(r,function(){o.resolve()},function(){o.reject()}),o.promise},requestInterstitialAd:function(r){var o=e.defer();return n.plugins.AdMob.requestInterstitialAd(r,function(){o.resolve()},function(){o.reject()}),o.promise}}}]),angular.module("ngCordova.plugins.appAvailability",[]).factory("$cordovaAppAvailability",["$q",function(e){return{check:function(n){var r=e.defer();return appAvailability.check(n,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.appRate",[]).provider("$cordovaAppRate",[function(){this.setPreferences=function(e){e&&angular.isObject(e)&&(AppRate.preferences.useLanguage=e.language||null,AppRate.preferences.displayAppName=e.appName||"",AppRate.preferences.promptAgainForEachNewVersion=e.promptForNewVersion||!0,AppRate.preferences.openStoreInApp=e.openStoreInApp||!1,AppRate.preferences.usesUntilPrompt=e.usesUntilPrompt||3,AppRate.preferences.useCustomRateDialog=e.useCustomRateDialog||!1,AppRate.preferences.storeAppURL.ios=e.iosURL||null,AppRate.preferences.storeAppURL.android=e.androidURL||null,AppRate.preferences.storeAppURL.blackberry=e.blackberryURL||null,AppRate.preferences.storeAppURL.windows8=e.windowsURL||null)},this.setCustomLocale=function(e){var n={title:"Rate %@",message:"If you enjoy using %@, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!",cancelButtonLabel:"No, Thanks",laterButtonLabel:"Remind Me Later",rateButtonLabel:"Rate It Now"};n=angular.extend(n,e),AppRate.preferences.customLocale=n},this.$get=["$q",function(e){return{promptForRating:function(n){var r=e.defer(),o=AppRate.promptForRating(n);return r.resolve(o),r.promise},navigateToAppStore:function(){var n=e.defer(),r=AppRate.navigateToAppStore();return n.resolve(r),n.promise},onButtonClicked:function(e){AppRate.preferences.callbacks.onButtonClicked=e.bind(this)},onRateDialogShow:function(e){AppRate.preferences.callbacks.onRateDialogShow=e.bind(this)}}}]}]),angular.module("ngCordova.plugins.appVersion",[]).factory("$cordovaAppVersion",["$q",function(e){return{getAppName:function(){var n=e.defer();return cordova.getAppVersion.getAppName(function(e){n.resolve(e)}),n.promise},getPackageName:function(){var n=e.defer();return cordova.getAppVersion.getPackageName(function(e){n.resolve(e)}),n.promise},getVersionNumber:function(){var n=e.defer();return cordova.getAppVersion.getVersionNumber(function(e){n.resolve(e)}),n.promise},getVersionCode:function(){var n=e.defer();return cordova.getAppVersion.getVersionCode(function(e){n.resolve(e)}),n.promise}}}]),angular.module("ngCordova.plugins.backgroundGeolocation",[]).factory("$cordovaBackgroundGeolocation",["$q","$window",function(e,n){return{init:function(){n.navigator.geolocation.getCurrentPosition(function(e){return e})},configure:function(r){this.init();var o=e.defer();return n.plugins.backgroundGeoLocation.configure(function(e){o.notify(e),n.plugins.backgroundGeoLocation.finish()},function(e){o.reject(e)},r),this.start(),o.promise},start:function(){var r=e.defer();return n.plugins.backgroundGeoLocation.start(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},stop:function(){var r=e.defer();return n.plugins.backgroundGeoLocation.stop(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.badge",[]).factory("$cordovaBadge",["$q",function(e){return{hasPermission:function(){var n=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?n.resolve(!0):n.reject("You do not have permission")}),n.promise},promptForPermission:function(){return cordova.plugins.notification.badge.promptForPermission()},set:function(n,r,o){var t=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?t.resolve(cordova.plugins.notification.badge.set(n,r,o)):t.reject("You do not have permission to set Badge")}),t.promise},get:function(){var n=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?cordova.plugins.notification.badge.get(function(e){n.resolve(e)}):n.reject("You do not have permission to get Badge")}),n.promise},clear:function(n,r){var o=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?o.resolve(cordova.plugins.notification.badge.clear(n,r)):o.reject("You do not have permission to clear Badge")}),o.promise},increase:function(n,r,o){var t=e.defer();return this.hasPermission().then(function(){t.resolve(cordova.plugins.notification.badge.increase(n,r,o))},function(){t.reject("You do not have permission to increase Badge")}),t.promise},decrease:function(n,r,o){var t=e.defer();return this.hasPermission().then(function(){t.resolve(cordova.plugins.notification.badge.decrease(n,r,o))},function(){t.reject("You do not have permission to decrease Badge")}),t.promise},configure:function(e){return cordova.plugins.notification.badge.configure(e)}}}]),angular.module("ngCordova.plugins.barcodeScanner",[]).factory("$cordovaBarcodeScanner",["$q",function(e){return{scan:function(n){var r=e.defer();return cordova.plugins.barcodeScanner.scan(function(e){r.resolve(e)},function(e){r.reject(e)},n),r.promise},encode:function(n,r){var o=e.defer();return n=n||"TEXT_TYPE",cordova.plugins.barcodeScanner.encode(n,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}}}]),angular.module("ngCordova.plugins.batteryStatus",[]).factory("$cordovaBatteryStatus",["$rootScope","$window","$timeout",function(e,n,r){var o=function(n){r(function(){e.$broadcast("$cordovaBatteryStatus:status",n)})},t=function(n){r(function(){e.$broadcast("$cordovaBatteryStatus:critical",n)})},i=function(n){r(function(){e.$broadcast("$cordovaBatteryStatus:low",n)})};return document.addEventListener("deviceready",function(){navigator.battery&&(n.addEventListener("batterystatus",o,!1),n.addEventListener("batterycritical",t,!1),n.addEventListener("batterylow",i,!1))},!1),!0}]).run(["$injector",function(e){e.get("$cordovaBatteryStatus")}]),angular.module("ngCordova.plugins.beacon",[]).factory("$cordovaBeacon",["$window","$rootScope","$timeout","$q",function(e,n,r,o){var t=null,i=null,a=null,c=null,u=null,s=null,l=null,f=null;return document.addEventListener("deviceready",function(){if(e.cordova&&e.cordova.plugins&&e.cordova.plugins.locationManager){var o=new e.cordova.plugins.locationManager.Delegate;o.didDetermineStateForRegion=function(e){r(function(){n.$broadcast("$cordovaBeacon:didDetermineStateForRegion",e)}),t&&t(e)},o.didStartMonitoringForRegion=function(e){r(function(){n.$broadcast("$cordovaBeacon:didStartMonitoringForRegion",e)}),i&&i(e)},o.didExitRegion=function(e){r(function(){n.$broadcast("$cordovaBeacon:didExitRegion",e)}),a&&a(e)},o.didEnterRegion=function(e){r(function(){n.$broadcast("$cordovaBeacon:didEnterRegion",e)}),c&&c(e)},o.didRangeBeaconsInRegion=function(e){r(function(){n.$broadcast("$cordovaBeacon:didRangeBeaconsInRegion",e)}),u&&u(e)},o.peripheralManagerDidStartAdvertising=function(e){r(function(){n.$broadcast("$cordovaBeacon:peripheralManagerDidStartAdvertising",e)}),s&&s(e)},o.peripheralManagerDidUpdateState=function(e){r(function(){n.$broadcast("$cordovaBeacon:peripheralManagerDidUpdateState",e)}),l&&l(e)},o.didChangeAuthorizationStatus=function(e){r(function(){n.$broadcast("$cordovaBeacon:didChangeAuthorizationStatus",e)}),f&&f(e)},e.cordova.plugins.locationManager.setDelegate(o)}},!1),{setCallbackDidDetermineStateForRegion:function(e){t=e},setCallbackDidStartMonitoringForRegion:function(e){i=e},setCallbackDidExitRegion:function(e){a=e},setCallbackDidEnterRegion:function(e){c=e},setCallbackDidRangeBeaconsInRegion:function(e){u=e},setCallbackPeripheralManagerDidStartAdvertising:function(e){s=e},setCallbackPeripheralManagerDidUpdateState:function(e){l=e},setCallbackDidChangeAuthorizationStatus:function(e){f=e},createBeaconRegion:function(n,r,o,t,i){return o=o||void 0,t=t||void 0,new e.cordova.plugins.locationManager.BeaconRegion(n,r,o,t,i)},isBluetoothEnabled:function(){return o.when(e.cordova.plugins.locationManager.isBluetoothEnabled())},enableBluetooth:function(){return o.when(e.cordova.plugins.locationManager.enableBluetooth())},disableBluetooth:function(){return o.when(e.cordova.plugins.locationManager.disableBluetooth())},startMonitoringForRegion:function(n){return o.when(e.cordova.plugins.locationManager.startMonitoringForRegion(n))},stopMonitoringForRegion:function(n){return o.when(e.cordova.plugins.locationManager.stopMonitoringForRegion(n))},requestStateForRegion:function(n){return o.when(e.cordova.plugins.locationManager.requestStateForRegion(n))},startRangingBeaconsInRegion:function(n){return o.when(e.cordova.plugins.locationManager.startRangingBeaconsInRegion(n))},stopRangingBeaconsInRegion:function(n){return o.when(e.cordova.plugins.locationManager.stopRangingBeaconsInRegion(n))},getAuthorizationStatus:function(){return o.when(e.cordova.plugins.locationManager.getAuthorizationStatus())},requestWhenInUseAuthorization:function(){return o.when(e.cordova.plugins.locationManager.requestWhenInUseAuthorization())},requestAlwaysAuthorization:function(){return o.when(e.cordova.plugins.locationManager.requestAlwaysAuthorization())},getMonitoredRegions:function(){return o.when(e.cordova.plugins.locationManager.getMonitoredRegions())},getRangedRegions:function(){return o.when(e.cordova.plugins.locationManager.getRangedRegions())},isRangingAvailable:function(){return o.when(e.cordova.plugins.locationManager.isRangingAvailable())},isMonitoringAvailableForClass:function(n){return o.when(e.cordova.plugins.locationManager.isMonitoringAvailableForClass(n))},startAdvertising:function(n,r){return o.when(e.cordova.plugins.locationManager.startAdvertising(n,r))},stopAdvertising:function(){return o.when(e.cordova.plugins.locationManager.stopAdvertising())},isAdvertisingAvailable:function(){return o.when(e.cordova.plugins.locationManager.isAdvertisingAvailable())},isAdvertising:function(){return o.when(e.cordova.plugins.locationManager.isAdvertising())},disableDebugLogs:function(){return o.when(e.cordova.plugins.locationManager.disableDebugLogs())},enableDebugNotifications:function(){return o.when(e.cordova.plugins.locationManager.enableDebugNotifications())},disableDebugNotifications:function(){return o.when(e.cordova.plugins.locationManager.disableDebugNotifications())},enableDebugLogs:function(){return o.when(e.cordova.plugins.locationManager.enableDebugLogs())},appendToDeviceLog:function(n){return o.when(e.cordova.plugins.locationManager.appendToDeviceLog(n))}}}]),angular.module("ngCordova.plugins.ble",[]).factory("$cordovaBLE",["$q","$timeout","$log",function(e,n,r){return{scan:function(r,o){var t=e.defer();return ble.startScan(r,function(e){t.notify(e)},function(e){t.reject(e)}),n(function(){ble.stopScan(function(){t.resolve()},function(e){t.reject(e)})},1e3*o),t.promise},startScan:function(e,n,r){return ble.startScan(e,n,r)},stopScan:function(){var n=e.defer();return ble.stopScan(function(){n.resolve()},function(e){n.reject(e)}),n.promise},connect:function(n){var r=e.defer();return ble.connect(n,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},disconnect:function(n){var r=e.defer();return ble.disconnect(n,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},read:function(n,r,o){var t=e.defer();return ble.read(n,r,o,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},write:function(n,r,o,t){var i=e.defer();return ble.write(n,r,o,t,function(e){i.resolve(e)},function(e){i.reject(e)}),i.promise},writeWithoutResponse:function(n,r,o,t){var i=e.defer();return ble.writeWithoutResponse(n,r,o,t,function(e){i.resolve(e)},function(e){i.reject(e)}),i.promise},writeCommand:function(e,n,o,t){return r.warning("writeCommand is deprecated, use writeWithoutResponse"),this.writeWithoutResponse(e,n,o,t)},startNotification:function(e,n,r,o,t){return ble.startNotification(e,n,r,o,t)},stopNotification:function(n,r,o){var t=e.defer();return ble.stopNotification(n,r,o,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},isConnected:function(n){var r=e.defer();return ble.isConnected(n,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},enable:function(){var n=e.defer();return ble.enable(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},isEnabled:function(){var n=e.defer();return ble.isEnabled(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.bluetoothSerial",[]).factory("$cordovaBluetoothSerial",["$q","$window",function(e,n){return{connect:function(r){var o=e.defer(),t=e.defer(),i=!1;return n.bluetoothSerial.connect(r,function(){i=!0,o.resolve(t)},function(e){i===!1&&t.reject(e),o.reject(e)}),o.promise},connectInsecure:function(r){var o=e.defer();return n.bluetoothSerial.connectInsecure(r,function(){o.resolve()},function(e){o.reject(e)}),o.promise},disconnect:function(){var r=e.defer();return n.bluetoothSerial.disconnect(function(){r.resolve()},function(e){r.reject(e)}),r.promise},list:function(){var r=e.defer();return n.bluetoothSerial.list(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},discoverUnpaired:function(){var r=e.defer();return n.bluetoothSerial.discoverUnpaired(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},setDeviceDiscoveredListener:function(){var r=e.defer();return n.bluetoothSerial.setDeviceDiscoveredListener(function(e){r.notify(e)}),r.promise},clearDeviceDiscoveredListener:function(){n.bluetoothSerial.clearDeviceDiscoveredListener()},showBluetoothSettings:function(){var r=e.defer();return n.bluetoothSerial.showBluetoothSettings(function(){r.resolve()},function(e){r.reject(e)}),r.promise},isEnabled:function(){var r=e.defer();return n.bluetoothSerial.isEnabled(function(){r.resolve()},function(){r.reject()}),r.promise},enable:function(){var r=e.defer();return n.bluetoothSerial.enable(function(){r.resolve()},function(){r.reject()}),r.promise},isConnected:function(){var r=e.defer();return n.bluetoothSerial.isConnected(function(){r.resolve()},function(){r.reject()}),r.promise},available:function(){var r=e.defer();return n.bluetoothSerial.available(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},read:function(){var r=e.defer();return n.bluetoothSerial.read(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},readUntil:function(r){var o=e.defer();return n.bluetoothSerial.readUntil(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},write:function(r){var o=e.defer();return n.bluetoothSerial.write(r,function(){o.resolve()},function(e){o.reject(e)}),o.promise},subscribe:function(r){var o=e.defer();return n.bluetoothSerial.subscribe(r,function(e){o.notify(e)},function(e){o.reject(e)}),o.promise},subscribeRawData:function(){var r=e.defer();return n.bluetoothSerial.subscribeRawData(function(e){r.notify(e)},function(e){r.reject(e)}),r.promise},unsubscribe:function(){var r=e.defer();return n.bluetoothSerial.unsubscribe(function(){r.resolve()},function(e){r.reject(e)}),r.promise},unsubscribeRawData:function(){var r=e.defer();return n.bluetoothSerial.unsubscribeRawData(function(){r.resolve()},function(e){r.reject(e)}),r.promise},clear:function(){var r=e.defer();return n.bluetoothSerial.clear(function(){r.resolve()},function(e){r.reject(e)}),r.promise},readRSSI:function(){var r=e.defer();return n.bluetoothSerial.readRSSI(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.brightness",[]).factory("$cordovaBrightness",["$q","$window",function(e,n){return{get:function(){var r=e.defer();return n.cordova?n.cordova.plugins.brightness.getBrightness(function(e){r.resolve(e)},function(e){r.reject(e)}):r.reject("Not supported without cordova.js"),r.promise},set:function(r){var o=e.defer();return n.cordova?n.cordova.plugins.brightness.setBrightness(r,function(e){o.resolve(e)},function(e){o.reject(e)}):o.reject("Not supported without cordova.js"),o.promise},setKeepScreenOn:function(r){var o=e.defer();return n.cordova?n.cordova.plugins.brightness.setKeepScreenOn(r,function(e){o.resolve(e)},function(e){o.reject(e)}):o.reject("Not supported without cordova.js"),o.promise}}}]),angular.module("ngCordova.plugins.calendar",[]).factory("$cordovaCalendar",["$q","$window",function(e,n){return{createCalendar:function(r){var o=e.defer(),t=n.plugins.calendar.getCreateCalendarOptions();return"string"==typeof r?t.calendarName=r:t=angular.extend(t,r),n.plugins.calendar.createCalendar(t,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},deleteCalendar:function(r){var o=e.defer();return n.plugins.calendar.deleteCalendar(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},createEvent:function(r){var o=e.defer(),t={title:null,location:null,notes:null,startDate:null,endDate:null};return t=angular.extend(t,r),n.plugins.calendar.createEvent(t.title,t.location,t.notes,new Date(t.startDate),new Date(t.endDate),function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},createEventWithOptions:function(r){var o=e.defer(),t=[],i=window.plugins.calendar.getCalendarOptions(),a={title:null,location:null,notes:null,startDate:null,endDate:null};t=Object.keys(a);for(var c in r)-1===t.indexOf(c)?i[c]=r[c]:a[c]=r[c];return n.plugins.calendar.createEventWithOptions(a.title,a.location,a.notes,new Date(a.startDate),new Date(a.endDate),i,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},createEventInteractively:function(r){var o=e.defer(),t={title:null,location:null,notes:null,startDate:null,endDate:null};return t=angular.extend(t,r),n.plugins.calendar.createEventInteractively(t.title,t.location,t.notes,new Date(t.startDate),new Date(t.endDate),function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},createEventInNamedCalendar:function(r){var o=e.defer(),t={title:null,location:null,notes:null,startDate:null,endDate:null,calendarName:null};return t=angular.extend(t,r),n.plugins.calendar.createEventInNamedCalendar(t.title,t.location,t.notes,new Date(t.startDate),new Date(t.endDate),t.calendarName,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},findEvent:function(r){var o=e.defer(),t={title:null,location:null,notes:null,startDate:null,endDate:null};return t=angular.extend(t,r),n.plugins.calendar.findEvent(t.title,t.location,t.notes,new Date(t.startDate),new Date(t.endDate),function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},listEventsInRange:function(r,o){var t=e.defer();return n.plugins.calendar.listEventsInRange(r,o,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},listCalendars:function(){var r=e.defer();return n.plugins.calendar.listCalendars(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},findAllEventsInNamedCalendar:function(r){var o=e.defer();return n.plugins.calendar.findAllEventsInNamedCalendar(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},modifyEvent:function(r){var o=e.defer(),t={title:null,location:null,notes:null,startDate:null,endDate:null,newTitle:null,newLocation:null,newNotes:null,newStartDate:null,newEndDate:null};return t=angular.extend(t,r),n.plugins.calendar.modifyEvent(t.title,t.location,t.notes,new Date(t.startDate),new Date(t.endDate),t.newTitle,t.newLocation,t.newNotes,new Date(t.newStartDate),new Date(t.newEndDate),function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},deleteEvent:function(r){var o=e.defer(),t={newTitle:null,location:null,notes:null,startDate:null,endDate:null};return t=angular.extend(t,r),n.plugins.calendar.deleteEvent(t.newTitle,t.location,t.notes,new Date(t.startDate),new Date(t.endDate),function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}}}]),angular.module("ngCordova.plugins.camera",[]).factory("$cordovaCamera",["$q",function(e){return{getPicture:function(n){var r=e.defer();return navigator.camera?(navigator.camera.getPicture(function(e){r.resolve(e)},function(e){r.reject(e)},n),r.promise):(r.resolve(null),r.promise)},cleanup:function(){var n=e.defer();return navigator.camera.cleanup(function(){n.resolve()},function(e){n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.capture",[]).factory("$cordovaCapture",["$q",function(e){return{captureAudio:function(n){var r=e.defer();return navigator.device.capture?(navigator.device.capture.captureAudio(function(e){r.resolve(e)},function(e){r.reject(e)},n),r.promise):(r.resolve(null),r.promise)},captureImage:function(n){var r=e.defer();return navigator.device.capture?(navigator.device.capture.captureImage(function(e){r.resolve(e)},function(e){r.reject(e)},n),r.promise):(r.resolve(null),r.promise)},captureVideo:function(n){var r=e.defer();return navigator.device.capture?(navigator.device.capture.captureVideo(function(e){r.resolve(e)},function(e){r.reject(e)},n),r.promise):(r.resolve(null),r.promise)}}}]),angular.module("ngCordova.plugins.cardIO",[]).provider("$cordovaNgCardIO",[function(){var e=["card_type","redacted_card_number","card_number","expiry_month","expiry_year","short_expiry_year","cvv","zip"],n={expiry:!0,cvv:!0,zip:!1,suppressManual:!1,suppressConfirm:!1,hideLogo:!0};this.setCardIOResponseFields=function(n){n&&angular.isArray(n)&&(e=n)},this.setScanerConfig=function(e){e&&angular.isObject(e)&&(n.expiry=e.expiry||!0,n.cvv=e.cvv||!0,n.zip=e.zip||!1,n.suppressManual=e.suppressManual||!1,n.suppressConfirm=e.suppressConfirm||!1,n.hideLogo=e.hideLogo||!0)},this.$get=["$q",function(r){return{scanCard:function(){var o=r.defer();return CardIO.scan(n,function(n){if(null===n)o.reject(null);else{for(var r={},t=0,i=e.length;i>t;t++){var a=e[t];"short_expiry_year"===a?r[a]=String(n.expiry_year).substr(2,2)||"":r[a]=n[a]||""}o.resolve(r)}},function(){o.reject(null)}),o.promise}}}]}]),angular.module("ngCordova.plugins.clipboard",[]).factory("$cordovaClipboard",["$q","$window",function(e,n){return{copy:function(r){var o=e.defer();return n.cordova.plugins.clipboard.copy(r,function(){o.resolve()},function(){o.reject()}),o.promise},paste:function(){var r=e.defer();return n.cordova.plugins.clipboard.paste(function(e){r.resolve(e)},function(){r.reject()}),r.promise}}}]),angular.module("ngCordova.plugins.contacts",[]).factory("$cordovaContacts",["$q",function(e){return{save:function(n){var r=e.defer(),o=navigator.contacts.create(n);return o.save(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},remove:function(n){var r=e.defer(),o=navigator.contacts.create(n);return o.remove(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},clone:function(e){var n=navigator.contacts.create(e);return n.clone(e)},find:function(n){var r=e.defer(),o=n.fields||["id","displayName"];return delete n.fields,0===Object.keys(n).length?navigator.contacts.find(o,function(e){r.resolve(e)},function(e){r.reject(e)}):navigator.contacts.find(o,function(e){r.resolve(e)},function(e){r.reject(e)},n),r.promise},pickContact:function(){var n=e.defer();return navigator.contacts.pickContact(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.datePicker",[]).factory("$cordovaDatePicker",["$window","$q",function(e,n){return{show:function(r){var o=n.defer();return r=r||{date:new Date,mode:"date"},e.datePicker.show(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}}}]),angular.module("ngCordova.plugins.device",[]).factory("$cordovaDevice",[function(){return{getDevice:function(){return device},getCordova:function(){return device.cordova},getModel:function(){return device.model},getName:function(){return device.name},getPlatform:function(){return device.platform},getUUID:function(){return device.uuid},getVersion:function(){return device.version},getManufacturer:function(){return device.manufacturer}}}]),angular.module("ngCordova.plugins.deviceMotion",[]).factory("$cordovaDeviceMotion",["$q",function(e){return{getCurrentAcceleration:function(){var n=e.defer();return angular.isUndefined(navigator.accelerometer)||!angular.isFunction(navigator.accelerometer.getCurrentAcceleration)?(n.reject("Device do not support watchAcceleration"),n.promise):(navigator.accelerometer.getCurrentAcceleration(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise)},watchAcceleration:function(n){var r=e.defer();if(angular.isUndefined(navigator.accelerometer)||!angular.isFunction(navigator.accelerometer.watchAcceleration))return r.reject("Device do not support watchAcceleration"),r.promise;var o=navigator.accelerometer.watchAcceleration(function(e){r.notify(e)},function(e){r.reject(e)},n);return r.promise.cancel=function(){navigator.accelerometer.clearWatch(o)},r.promise.clearWatch=function(e){navigator.accelerometer.clearWatch(e||o)},r.promise.watchID=o,r.promise},clearWatch:function(e){return navigator.accelerometer.clearWatch(e)}}}]),angular.module("ngCordova.plugins.deviceOrientation",[]).factory("$cordovaDeviceOrientation",["$q",function(e){var n={frequency:3e3};return{getCurrentHeading:function(){var n=e.defer();return navigator.compass?(navigator.compass.getCurrentHeading(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise):(n.reject("No compass on Device"),n.promise)},watchHeading:function(r){var o=e.defer();if(!navigator.compass)return o.reject("No compass on Device"),o.promise;var t=angular.extend(n,r),i=navigator.compass.watchHeading(function(e){o.notify(e)},function(e){o.reject(e)},t);return o.promise.cancel=function(){navigator.compass.clearWatch(i)},o.promise.clearWatch=function(e){navigator.compass.clearWatch(e||i)},o.promise.watchID=i,o.promise},clearWatch:function(e){return navigator.compass.clearWatch(e)}}}]),angular.module("ngCordova.plugins.dialogs",[]).factory("$cordovaDialogs",["$q","$window",function(e,n){return{alert:function(r,o,t){var i=e.defer();return n.navigator.notification?navigator.notification.alert(r,function(){i.resolve()},o,t):(n.alert(r),i.resolve()),i.promise},confirm:function(r,o,t){var i=e.defer();return n.navigator.notification?navigator.notification.confirm(r,function(e){i.resolve(e)},o,t):n.confirm(r)?i.resolve(1):i.resolve(2),i.promise},prompt:function(r,o,t,i){var a=e.defer();if(n.navigator.notification)navigator.notification.prompt(r,function(e){a.resolve(e)},o,t,i);else{var c=n.prompt(r,i);null!==c?a.resolve({input1:c,buttonIndex:1}):a.resolve({input1:c,buttonIndex:2})}return a.promise},beep:function(e){return navigator.notification.beep(e)},activityStart:function(n,r){var o=e.defer();return"android"===cordova.platformId?(navigator.notification.activityStart(r,n),o.resolve()):o.reject(n,r),o.promise},activityStop:function(){var n=e.defer();return"android"===cordova.platformId?(navigator.notification.activityStop(),n.resolve()):n.reject(),n.promise},progressStart:function(n,r){var o=e.defer();return"android"===cordova.platformId?(navigator.notification.progressStart(r,n),o.resolve()):o.reject(n,r),o.promise},progressStop:function(){var n=e.defer();return"android"===cordova.platformId?(navigator.notification.progressStop(),n.resolve()):n.reject(),n.promise},progressValue:function(n){var r=e.defer();return"android"===cordova.platformId?(navigator.notification.progressValue(n),r.resolve()):r.reject(n),r.promise}}}]),angular.module("ngCordova.plugins.emailComposer",[]).factory("$cordovaEmailComposer",["$q",function(e){return{isAvailable:function(){var n=e.defer();return cordova.plugins.email.isAvailable(function(e){e?n.resolve():n.reject()}),n.promise},open:function(n){var r=e.defer();return cordova.plugins.email.open(n,function(){r.reject()}),r.promise},addAlias:function(e,n){cordova.plugins.email.addAlias(e,n)}}}]),angular.module("ngCordova.plugins.facebook",[]).provider("$cordovaFacebook",[function(){this.browserInit=function(e,n){this.appID=e,this.appVersion=n||"v2.0",facebookConnectPlugin.browserInit(this.appID,this.appVersion)},this.$get=["$q",function(e){return{login:function(n){var r=e.defer();return facebookConnectPlugin.login(n,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},showDialog:function(n){var r=e.defer();return facebookConnectPlugin.showDialog(n,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},api:function(n,r){var o=e.defer();return facebookConnectPlugin.api(n,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},getAccessToken:function(){var n=e.defer();return facebookConnectPlugin.getAccessToken(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},getLoginStatus:function(){var n=e.defer();return facebookConnectPlugin.getLoginStatus(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},logout:function(){var n=e.defer();return facebookConnectPlugin.logout(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]}]),angular.module("ngCordova.plugins.facebookAds",[]).factory("$cordovaFacebookAds",["$q","$window",function(e,n){return{setOptions:function(r){var o=e.defer();return n.FacebookAds.setOptions(r,function(){o.resolve()},function(){o.reject()}),o.promise},createBanner:function(r){var o=e.defer();return n.FacebookAds.createBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},removeBanner:function(){var r=e.defer();return n.FacebookAds.removeBanner(function(){r.resolve()},function(){r.reject()}),r.promise},showBanner:function(r){var o=e.defer();return n.FacebookAds.showBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},showBannerAtXY:function(r,o){var t=e.defer();return n.FacebookAds.showBannerAtXY(r,o,function(){t.resolve()},function(){t.reject()}),t.promise},hideBanner:function(){var r=e.defer();return n.FacebookAds.hideBanner(function(){r.resolve()},function(){r.reject()}),r.promise},prepareInterstitial:function(r){var o=e.defer();return n.FacebookAds.prepareInterstitial(r,function(){o.resolve()},function(){o.reject()}),o.promise},showInterstitial:function(){var r=e.defer();return n.FacebookAds.showInterstitial(function(){r.resolve()},function(){
r.reject()}),r.promise}}}]),angular.module("ngCordova.plugins.file",[]).constant("$cordovaFileError",{1:"NOT_FOUND_ERR",2:"SECURITY_ERR",3:"ABORT_ERR",4:"NOT_READABLE_ERR",5:"ENCODING_ERR",6:"NO_MODIFICATION_ALLOWED_ERR",7:"INVALID_STATE_ERR",8:"SYNTAX_ERR",9:"INVALID_MODIFICATION_ERR",10:"QUOTA_EXCEEDED_ERR",11:"TYPE_MISMATCH_ERR",12:"PATH_EXISTS_ERR"}).provider("$cordovaFile",[function(){this.$get=["$q","$window","$cordovaFileError",function(e,n,r){return{getFreeDiskSpace:function(){var n=e.defer();return cordova.exec(function(e){n.resolve(e)},function(e){n.reject(e)},"File","getFreeDiskSpace",[]),n.promise},checkDir:function(o,t){var i=e.defer();/^\//.test(t)&&i.reject("directory cannot start with /");try{var a=o+t;n.resolveLocalFileSystemURL(a,function(e){e.isDirectory===!0?i.resolve(e):i.reject({code:13,message:"input is not a directory"})},function(e){e.message=r[e.code],i.reject(e)})}catch(c){c.message=r[c.code],i.reject(c)}return i.promise},checkFile:function(o,t){var i=e.defer();/^\//.test(t)&&i.reject("directory cannot start with /");try{var a=o+t;n.resolveLocalFileSystemURL(a,function(e){e.isFile===!0?i.resolve(e):i.reject({code:13,message:"input is not a file"})},function(e){e.message=r[e.code],i.reject(e)})}catch(c){c.message=r[c.code],i.reject(c)}return i.promise},createDir:function(o,t,i){var a=e.defer();/^\//.test(t)&&a.reject("directory cannot start with /"),i=i?!1:!0;var c={create:!0,exclusive:i};try{n.resolveLocalFileSystemURL(o,function(e){e.getDirectory(t,c,function(e){a.resolve(e)},function(e){e.message=r[e.code],a.reject(e)})},function(e){e.message=r[e.code],a.reject(e)})}catch(u){u.message=r[u.code],a.reject(u)}return a.promise},createFile:function(o,t,i){var a=e.defer();/^\//.test(t)&&a.reject("file-name cannot start with /"),i=i?!1:!0;var c={create:!0,exclusive:i};try{n.resolveLocalFileSystemURL(o,function(e){e.getFile(t,c,function(e){a.resolve(e)},function(e){e.message=r[e.code],a.reject(e)})},function(e){e.message=r[e.code],a.reject(e)})}catch(u){u.message=r[u.code],a.reject(u)}return a.promise},removeDir:function(o,t){var i=e.defer();/^\//.test(t)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(o,function(e){e.getDirectory(t,{create:!1},function(e){e.remove(function(){i.resolve({success:!0,fileRemoved:e})},function(e){e.message=r[e.code],i.reject(e)})},function(e){e.message=r[e.code],i.reject(e)})},function(e){e.message=r[e.code],i.reject(e)})}catch(a){a.message=r[a.code],i.reject(a)}return i.promise},removeFile:function(o,t){var i=e.defer();/^\//.test(t)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(o,function(e){e.getFile(t,{create:!1},function(e){e.remove(function(){i.resolve({success:!0,fileRemoved:e})},function(e){e.message=r[e.code],i.reject(e)})},function(e){e.message=r[e.code],i.reject(e)})},function(e){e.message=r[e.code],i.reject(e)})}catch(a){a.message=r[a.code],i.reject(a)}return i.promise},removeRecursively:function(o,t){var i=e.defer();/^\//.test(t)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(o,function(e){e.getDirectory(t,{create:!1},function(e){e.removeRecursively(function(){i.resolve({success:!0,fileRemoved:e})},function(e){e.message=r[e.code],i.reject(e)})},function(e){e.message=r[e.code],i.reject(e)})},function(e){e.message=r[e.code],i.reject(e)})}catch(a){a.message=r[a.code],i.reject(a)}return i.promise},writeFile:function(o,t,i,a){var c=e.defer();/^\//.test(t)&&c.reject("file-name cannot start with /"),a=a?!1:!0;var u={create:!0,exclusive:a};try{n.resolveLocalFileSystemURL(o,function(e){e.getFile(t,u,function(e){e.createWriter(function(e){u.append===!0&&e.seek(e.length),u.truncate&&e.truncate(u.truncate),e.onwriteend=function(e){this.error?c.reject(this.error):c.resolve(e)},e.write(i),c.promise.abort=function(){e.abort()}})},function(e){e.message=r[e.code],c.reject(e)})},function(e){e.message=r[e.code],c.reject(e)})}catch(s){s.message=r[s.code],c.reject(s)}return c.promise},writeExistingFile:function(o,t,i){var a=e.defer();/^\//.test(t)&&a.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(o,function(e){e.getFile(t,{create:!1},function(e){e.createWriter(function(e){e.seek(e.length),e.onwriteend=function(e){this.error?a.reject(this.error):a.resolve(e)},e.write(i),a.promise.abort=function(){e.abort()}})},function(e){e.message=r[e.code],a.reject(e)})},function(e){e.message=r[e.code],a.reject(e)})}catch(c){c.message=r[c.code],a.reject(c)}return a.promise},readAsText:function(o,t){var i=e.defer();/^\//.test(t)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(o,function(e){e.getFile(t,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsText(e)})},function(e){e.message=r[e.code],i.reject(e)})},function(e){e.message=r[e.code],i.reject(e)})}catch(a){a.message=r[a.code],i.reject(a)}return i.promise},readAsDataURL:function(o,t){var i=e.defer();/^\//.test(t)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(o,function(e){e.getFile(t,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsDataURL(e)})},function(e){e.message=r[e.code],i.reject(e)})},function(e){e.message=r[e.code],i.reject(e)})}catch(a){a.message=r[a.code],i.reject(a)}return i.promise},readAsBinaryString:function(o,t){var i=e.defer();/^\//.test(t)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(o,function(e){e.getFile(t,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsBinaryString(e)})},function(e){e.message=r[e.code],i.reject(e)})},function(e){e.message=r[e.code],i.reject(e)})}catch(a){a.message=r[a.code],i.reject(a)}return i.promise},readAsArrayBuffer:function(o,t){var i=e.defer();/^\//.test(t)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(o,function(e){e.getFile(t,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsArrayBuffer(e)})},function(e){e.message=r[e.code],i.reject(e)})},function(e){e.message=r[e.code],i.reject(e)})}catch(a){a.message=r[a.code],i.reject(a)}return i.promise},moveFile:function(r,o,t,i){var a=e.defer();i=i||o,(/^\//.test(o)||/^\//.test(i))&&a.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){n.resolveLocalFileSystemURL(t,function(n){e.moveTo(n,i,function(e){a.resolve(e)},function(e){a.reject(e)})},function(e){a.reject(e)})},function(e){a.reject(e)})},function(e){a.reject(e)})}catch(c){a.reject(c)}return a.promise},moveDir:function(r,o,t,i){var a=e.defer();i=i||o,(/^\//.test(o)||/^\//.test(i))&&a.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getDirectory(o,{create:!1},function(e){n.resolveLocalFileSystemURL(t,function(n){e.moveTo(n,i,function(e){a.resolve(e)},function(e){a.reject(e)})},function(e){a.reject(e)})},function(e){a.reject(e)})},function(e){a.reject(e)})}catch(c){a.reject(c)}return a.promise},copyDir:function(o,t,i,a){var c=e.defer();a=a||t,(/^\//.test(t)||/^\//.test(a))&&c.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(o,function(e){e.getDirectory(t,{create:!1,exclusive:!1},function(e){n.resolveLocalFileSystemURL(i,function(n){e.copyTo(n,a,function(e){c.resolve(e)},function(e){e.message=r[e.code],c.reject(e)})},function(e){e.message=r[e.code],c.reject(e)})},function(e){e.message=r[e.code],c.reject(e)})},function(e){e.message=r[e.code],c.reject(e)})}catch(u){u.message=r[u.code],c.reject(u)}return c.promise},copyFile:function(o,t,i,a){var c=e.defer();a=a||t,/^\//.test(t)&&c.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(o,function(e){e.getFile(t,{create:!1,exclusive:!1},function(e){n.resolveLocalFileSystemURL(i,function(n){e.copyTo(n,a,function(e){c.resolve(e)},function(e){e.message=r[e.code],c.reject(e)})},function(e){e.message=r[e.code],c.reject(e)})},function(e){e.message=r[e.code],c.reject(e)})},function(e){e.message=r[e.code],c.reject(e)})}catch(u){u.message=r[u.code],c.reject(u)}return c.promise},readFileMetadata:function(o,t){var i=e.defer();/^\//.test(t)&&i.reject("directory cannot start with /");try{var a=o+t;n.resolveLocalFileSystemURL(a,function(e){e.file(function(e){i.resolve(e)},function(e){e.message=r[e.code],i.reject(e)})},function(e){e.message=r[e.code],i.reject(e)})}catch(c){c.message=r[c.code],i.reject(c)}return i.promise}}}]}]),angular.module("ngCordova.plugins.fileOpener2",[]).factory("$cordovaFileOpener2",["$q",function(e){return{open:function(n,r){var o=e.defer();return cordova.plugins.fileOpener2.open(n,r,{error:function(e){o.reject(e)},success:function(){o.resolve()}}),o.promise},uninstall:function(n){var r=e.defer();return cordova.plugins.fileOpener2.uninstall(n,{error:function(e){r.reject(e)},success:function(){r.resolve()}}),r.promise},appIsInstalled:function(n){var r=e.defer();return cordova.plugins.fileOpener2.appIsInstalled(n,{success:function(e){r.resolve(e)}}),r.promise}}}]),angular.module("ngCordova.plugins.fileTransfer",[]).factory("$cordovaFileTransfer",["$q","$timeout",function(e,n){return{download:function(r,o,t,i){var a=e.defer(),c=new FileTransfer,u=t&&t.encodeURI===!1?r:encodeURI(r);return t&&void 0!==t.timeout&&null!==t.timeout&&(n(function(){c.abort()},t.timeout),t.timeout=null),c.onprogress=function(e){a.notify(e)},a.promise.abort=function(){c.abort()},c.download(u,o,a.resolve,a.reject,i,t),a.promise},upload:function(r,o,t,i){var a=e.defer(),c=new FileTransfer,u=t&&t.encodeURI===!1?r:encodeURI(r);return t&&void 0!==t.timeout&&null!==t.timeout&&(n(function(){c.abort()},t.timeout),t.timeout=null),c.onprogress=function(e){a.notify(e)},a.promise.abort=function(){c.abort()},c.upload(o,u,a.resolve,a.reject,t,i),a.promise}}}]),angular.module("ngCordova.plugins.flashlight",[]).factory("$cordovaFlashlight",["$q","$window",function(e,n){return{available:function(){var r=e.defer();return n.plugins.flashlight.available(function(e){r.resolve(e)}),r.promise},switchOn:function(){var r=e.defer();return n.plugins.flashlight.switchOn(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},switchOff:function(){var r=e.defer();return n.plugins.flashlight.switchOff(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},toggle:function(){var r=e.defer();return n.plugins.flashlight.toggle(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.flurryAds",[]).factory("$cordovaFlurryAds",["$q","$window",function(e,n){return{setOptions:function(r){var o=e.defer();return n.FlurryAds.setOptions(r,function(){o.resolve()},function(){o.reject()}),o.promise},createBanner:function(r){var o=e.defer();return n.FlurryAds.createBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},removeBanner:function(){var r=e.defer();return n.FlurryAds.removeBanner(function(){r.resolve()},function(){r.reject()}),r.promise},showBanner:function(r){var o=e.defer();return n.FlurryAds.showBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},showBannerAtXY:function(r,o){var t=e.defer();return n.FlurryAds.showBannerAtXY(r,o,function(){t.resolve()},function(){t.reject()}),t.promise},hideBanner:function(){var r=e.defer();return n.FlurryAds.hideBanner(function(){r.resolve()},function(){r.reject()}),r.promise},prepareInterstitial:function(r){var o=e.defer();return n.FlurryAds.prepareInterstitial(r,function(){o.resolve()},function(){o.reject()}),o.promise},showInterstitial:function(){var r=e.defer();return n.FlurryAds.showInterstitial(function(){r.resolve()},function(){r.reject()}),r.promise}}}]),angular.module("ngCordova.plugins.ga",[]).factory("$cordovaGA",["$q","$window",function(e,n){return{init:function(r,o){var t=e.defer();return o=o>=0?o:10,n.plugins.gaPlugin.init(function(e){t.resolve(e)},function(e){t.reject(e)},r,o),t.promise},trackEvent:function(r,o,t,i,a,c){var u=e.defer();return n.plugins.gaPlugin.trackEvent(function(e){u.resolve(e)},function(e){u.reject(e)},t,i,a,c),u.promise},trackPage:function(r,o,t){var i=e.defer();return n.plugins.gaPlugin.trackPage(function(e){i.resolve(e)},function(e){i.reject(e)},t),i.promise},setVariable:function(r,o,t,i){var a=e.defer();return n.plugins.gaPlugin.setVariable(function(e){a.resolve(e)},function(e){a.reject(e)},t,i),a.promise},exit:function(){var r=e.defer();return n.plugins.gaPlugin.exit(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.geolocation",[]).factory("$cordovaGeolocation",["$q",function(e){return{getCurrentPosition:function(n){var r=e.defer();return navigator.geolocation.getCurrentPosition(function(e){r.resolve(e)},function(e){r.reject(e)},n),r.promise},watchPosition:function(n){var r=e.defer(),o=navigator.geolocation.watchPosition(function(e){r.notify(e)},function(e){r.reject(e)},n);return r.promise.cancel=function(){navigator.geolocation.clearWatch(o)},r.promise.clearWatch=function(e){navigator.geolocation.clearWatch(e||o)},r.promise.watchID=o,r.promise},clearWatch:function(e){return navigator.geolocation.clearWatch(e)}}}]),angular.module("ngCordova.plugins.globalization",[]).factory("$cordovaGlobalization",["$q",function(e){return{getPreferredLanguage:function(){var n=e.defer();return navigator.globalization.getPreferredLanguage(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},getLocaleName:function(){var n=e.defer();return navigator.globalization.getLocaleName(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},getFirstDayOfWeek:function(){var n=e.defer();return navigator.globalization.getFirstDayOfWeek(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},dateToString:function(n,r){var o=e.defer();return navigator.globalization.dateToString(n,function(e){o.resolve(e)},function(e){o.reject(e)},r),o.promise},stringToDate:function(n,r){var o=e.defer();return navigator.globalization.stringToDate(n,function(e){o.resolve(e)},function(e){o.reject(e)},r),o.promise},getDatePattern:function(n){var r=e.defer();return navigator.globalization.getDatePattern(function(e){r.resolve(e)},function(e){r.reject(e)},n),r.promise},getDateNames:function(n){var r=e.defer();return navigator.globalization.getDateNames(function(e){r.resolve(e)},function(e){r.reject(e)},n),r.promise},isDayLightSavingsTime:function(n){var r=e.defer();return navigator.globalization.isDayLightSavingsTime(n,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},numberToString:function(n,r){var o=e.defer();return navigator.globalization.numberToString(n,function(e){o.resolve(e)},function(e){o.reject(e)},r),o.promise},stringToNumber:function(n,r){var o=e.defer();return navigator.globalization.stringToNumber(n,function(e){o.resolve(e)},function(e){o.reject(e)},r),o.promise},getNumberPattern:function(n){var r=e.defer();return navigator.globalization.getNumberPattern(function(e){r.resolve(e)},function(e){r.reject(e)},n),r.promise},getCurrencyPattern:function(n){var r=e.defer();return navigator.globalization.getCurrencyPattern(n,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.googleAds",[]).factory("$cordovaGoogleAds",["$q","$window",function(e,n){return{setOptions:function(r){var o=e.defer();return n.AdMob.setOptions(r,function(){o.resolve()},function(){o.reject()}),o.promise},createBanner:function(r){var o=e.defer();return n.AdMob.createBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},removeBanner:function(){var r=e.defer();return n.AdMob.removeBanner(function(){r.resolve()},function(){r.reject()}),r.promise},showBanner:function(r){var o=e.defer();return n.AdMob.showBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},showBannerAtXY:function(r,o){var t=e.defer();return n.AdMob.showBannerAtXY(r,o,function(){t.resolve()},function(){t.reject()}),t.promise},hideBanner:function(){var r=e.defer();return n.AdMob.hideBanner(function(){r.resolve()},function(){r.reject()}),r.promise},prepareInterstitial:function(r){var o=e.defer();return n.AdMob.prepareInterstitial(r,function(){o.resolve()},function(){o.reject()}),o.promise},showInterstitial:function(){var r=e.defer();return n.AdMob.showInterstitial(function(){r.resolve()},function(){r.reject()}),r.promise}}}]),angular.module("ngCordova.plugins.googleAnalytics",[]).factory("$cordovaGoogleAnalytics",["$q","$window",function(e,n){return{startTrackerWithId:function(r){var o=e.defer();return n.analytics.startTrackerWithId(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},setUserId:function(r){var o=e.defer();return n.analytics.setUserId(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},debugMode:function(){var r=e.defer();return n.analytics.debugMode(function(e){r.resolve(e)},function(){r.reject()}),r.promise},trackView:function(r){var o=e.defer();return n.analytics.trackView(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},addCustomDimension:function(r,o){var t=e.defer(),i=parseInt(r,10);return isNaN(i)&&t.reject('Parameter "key" must be an integer.'),n.analytics.addCustomDimension(i,o,function(){t.resolve()},function(e){t.reject(e)}),t.promise},trackEvent:function(r,o,t,i){var a=e.defer();return n.analytics.trackEvent(r,o,t,i,function(e){a.resolve(e)},function(e){a.reject(e)}),a.promise},trackException:function(r,o){var t=e.defer();return n.analytics.trackException(r,o,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},trackTiming:function(r,o,t,i){var a=e.defer();return n.analytics.trackTiming(r,o,t,i,function(e){a.resolve(e)},function(e){a.reject(e)}),a.promise},addTransaction:function(r,o,t,i,a,c){var u=e.defer();return n.analytics.addTransaction(r,o,t,i,a,c,function(e){u.resolve(e)},function(e){u.reject(e)}),u.promise},addTransactionItem:function(r,o,t,i,a,c,u){var s=e.defer();return n.analytics.addTransactionItem(r,o,t,i,a,c,u,function(e){s.resolve(e)},function(e){s.reject(e)}),s.promise}}}]),angular.module("ngCordova.plugins.googleMap",[]).factory("$cordovaGoogleMap",["$q","$window",function(e,n){var r=null;return{getMap:function(o){var t=e.defer();if(n.plugin.google.maps){var i=document.getElementById("map_canvas");r=n.plugin.google.maps.Map.getMap(o),r.setDiv(i),t.resolve(r)}else t.reject(null);return t.promise},isMapLoaded:function(){return!!r},addMarker:function(n){var o=e.defer();return r.addMarker(n,function(e){o.resolve(e)}),o.promise},getMapTypeIds:function(){return n.plugin.google.maps.mapTypeId},setVisible:function(n){var o=e.defer();return r.setVisible(n),o.promise},cleanup:function(){r=null}}}]),angular.module("ngCordova.plugins.googlePlayGame",[]).factory("$cordovaGooglePlayGame",["$q",function(e){return{auth:function(){var n=e.defer();return googleplaygame.auth(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},signout:function(){var n=e.defer();return googleplaygame.signout(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},isSignedIn:function(){var n=e.defer();return googleplaygame.isSignedIn(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},showPlayer:function(){var n=e.defer();return googleplaygame.showPlayer(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},submitScore:function(n){var r=e.defer();return googleplaygame.submitScore(n,function(e){return r.resolve(e)},function(e){return r.reject(e)}),r.promise},showAllLeaderboards:function(){var n=e.defer();return googleplaygame.showAllLeaderboards(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},showLeaderboard:function(n){var r=e.defer();return googleplaygame.showLeaderboard(n,function(e){return r.resolve(e)},function(e){return r.reject(e)}),r.promise},unlockAchievement:function(n){var r=e.defer();return googleplaygame.unlockAchievement(n,function(e){return r.resolve(e)},function(e){return r.reject(e)}),r.promise},incrementAchievement:function(n){var r=e.defer();return googleplaygame.incrementAchievement(n,function(e){return r.resolve(e)},function(e){return r.reject(e)}),r.promise},showAchievements:function(){var n=e.defer();return googleplaygame.showAchievements(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.googlePlus",[]).factory("$cordovaGooglePlus",["$q","$window",function(e,n){return{login:function(r){var o=e.defer();return void 0===r&&(r={}),n.plugins.googleplus.login({iOSApiKey:r},function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},silentLogin:function(r){var o=e.defer();return void 0===r&&(r={}),n.plugins.googleplus.trySilentLogin({iOSApiKey:r},function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},logout:function(){var r=e.defer();n.plugins.googleplus.logout(function(e){r.resolve(e)})},disconnect:function(){var r=e.defer();n.plugins.googleplus.disconnect(function(e){r.resolve(e)})},isAvailable:function(){var r=e.defer();return n.plugins.googleplus.isAvailable(function(e){e?r.resolve(e):r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.healthKit",[]).factory("$cordovaHealthKit",["$q","$window",function(e,n){return{isAvailable:function(){var r=e.defer();return n.plugins.healthkit.available(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},checkAuthStatus:function(r){var o=e.defer();return r=r||"HKQuantityTypeIdentifierHeight",n.plugins.healthkit.checkAuthStatus({type:r},function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},requestAuthorization:function(r,o){var t=e.defer();return r=r||["HKCharacteristicTypeIdentifierDateOfBirth","HKQuantityTypeIdentifierActiveEnergyBurned","HKQuantityTypeIdentifierHeight"],o=o||["HKQuantityTypeIdentifierActiveEnergyBurned","HKQuantityTypeIdentifierHeight","HKQuantityTypeIdentifierDistanceCycling"],n.plugins.healthkit.requestAuthorization({readTypes:r,writeTypes:o},function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},readDateOfBirth:function(){var r=e.defer();return n.plugins.healthkit.readDateOfBirth(function(e){r.resolve(e)},function(e){r.resolve(e)}),r.promise},readGender:function(){var r=e.defer();return n.plugins.healthkit.readGender(function(e){r.resolve(e)},function(e){r.resolve(e)}),r.promise},saveWeight:function(r,o,t){var i=e.defer();return n.plugins.healthkit.saveWeight({unit:o||"lb",amount:r,date:t||new Date},function(e){i.resolve(e)},function(e){i.resolve(e)}),i.promise},readWeight:function(r){var o=e.defer();return n.plugins.healthkit.readWeight({unit:r||"lb"},function(e){o.resolve(e)},function(e){o.resolve(e)}),o.promise},saveHeight:function(r,o,t){var i=e.defer();return n.plugins.healthkit.saveHeight({unit:o||"in",amount:r,date:t||new Date},function(e){i.resolve(e)},function(e){i.resolve(e)}),i.promise},readHeight:function(r){var o=e.defer();return n.plugins.healthkit.readHeight({unit:r||"in"},function(e){o.resolve(e)},function(e){o.resolve(e)}),o.promise},findWorkouts:function(){var r=e.defer();return n.plugins.healthkit.findWorkouts({},function(e){r.resolve(e)},function(e){r.resolve(e)}),r.promise},saveWorkout:function(r){var o=e.defer();return n.plugins.healthkit.saveWorkout(r,function(e){o.resolve(e)},function(e){o.resolve(e)}),o.promise},querySampleType:function(r){var o=e.defer();return n.plugins.healthkit.querySampleType(r,function(e){o.resolve(e)},function(e){o.resolve(e)}),o.promise}}}]),angular.module("ngCordova.plugins.httpd",[]).factory("$cordovaHttpd",["$q",function(e){return{startServer:function(n){var r=e.defer();return cordova.plugins.CorHttpd.startServer(n,function(){r.resolve()},function(){r.reject()}),r.promise},stopServer:function(){var n=e.defer();return cordova.plugins.CorHttpd.stopServer(function(){n.resolve()},function(){n.reject()}),n.promise},getURL:function(){var n=e.defer();return cordova.plugins.CorHttpd.getURL(function(e){n.resolve(e)},function(){n.reject()}),n.promise},getLocalPath:function(){var n=e.defer();return cordova.plugins.CorHttpd.getLocalPath(function(e){n.resolve(e)},function(){n.reject()}),n.promise}}}]),angular.module("ngCordova.plugins.iAd",[]).factory("$cordovaiAd",["$q","$window",function(e,n){return{setOptions:function(r){var o=e.defer();return n.iAd.setOptions(r,function(){o.resolve()},function(){o.reject()}),o.promise},createBanner:function(r){var o=e.defer();return n.iAd.createBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},removeBanner:function(){var r=e.defer();return n.iAd.removeBanner(function(){r.resolve()},function(){r.reject()}),r.promise},showBanner:function(r){var o=e.defer();return n.iAd.showBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},showBannerAtXY:function(r,o){var t=e.defer();return n.iAd.showBannerAtXY(r,o,function(){t.resolve()},function(){t.reject()}),t.promise},hideBanner:function(){var r=e.defer();return n.iAd.hideBanner(function(){r.resolve()},function(){r.reject()}),r.promise},prepareInterstitial:function(r){var o=e.defer();return n.iAd.prepareInterstitial(r,function(){o.resolve()},function(){o.reject()}),o.promise},showInterstitial:function(){var r=e.defer();return n.iAd.showInterstitial(function(){r.resolve()},function(){r.reject()}),r.promise}}}]),angular.module("ngCordova.plugins.imagePicker",[]).factory("$cordovaImagePicker",["$q","$window",function(e,n){return{getPictures:function(r){var o=e.defer();return n.imagePicker.getPictures(function(e){o.resolve(e)},function(e){o.reject(e)},r),o.promise}}}]),angular.module("ngCordova.plugins.inAppBrowser",[]).provider("$cordovaInAppBrowser",[function(){var e,n=this.defaultOptions={};this.setDefaultOptions=function(e){n=angular.extend(n,e)},this.$get=["$rootScope","$q","$window","$timeout",function(r,o,t,i){return{open:function(a,c,u){var s=o.defer();if(u&&!angular.isObject(u))return s.reject("options must be an object"),s.promise;var l=angular.extend({},n,u),f=[];angular.forEach(l,function(e,n){f.push(n+"="+e)});var d=f.join();return e=t.open(a,c,d),e.addEventListener("loadstart",function(e){i(function(){r.$broadcast("$cordovaInAppBrowser:loadstart",e)})},!1),e.addEventListener("loadstop",function(e){s.resolve(e),i(function(){r.$broadcast("$cordovaInAppBrowser:loadstop",e)})},!1),e.addEventListener("loaderror",function(e){s.reject(e),i(function(){r.$broadcast("$cordovaInAppBrowser:loaderror",e)})},!1),e.addEventListener("exit",function(e){i(function(){r.$broadcast("$cordovaInAppBrowser:exit",e)})},!1),s.promise},close:function(){e.close(),e=null},show:function(){e.show()},executeScript:function(n){var r=o.defer();return e.executeScript(n,function(e){r.resolve(e)}),r.promise},insertCSS:function(n){var r=o.defer();return e.insertCSS(n,function(e){r.resolve(e)}),r.promise}}}]}]),angular.module("ngCordova.plugins.insomnia",[]).factory("$cordovaInsomnia",["$window",function(e){return{keepAwake:function(){return e.plugins.insomnia.keepAwake()},allowSleepAgain:function(){return e.plugins.insomnia.allowSleepAgain()}}}]),angular.module("ngCordova.plugins.instagram",[]).factory("$cordovaInstagram",["$q",function(e){return{share:function(n){var r=e.defer();return window.Instagram?(Instagram.share(n.image,n.caption,function(e){e?r.reject(e):r.resolve(!0)}),r.promise):(console.error("Tried to call Instagram.share but the Instagram plugin isn't installed!"),r.resolve(null),r.promise)},isInstalled:function(){var n=e.defer();return window.Instagram?(Instagram.isInstalled(function(e,r){e?n.reject(e):n.resolve(r)}),n.promise):(console.error("Tried to call Instagram.isInstalled but the Instagram plugin isn't installed!"),n.resolve(null),n.promise)}}}]),angular.module("ngCordova.plugins.keyboard",[]).factory("$cordovaKeyboard",["$rootScope",function(e){var n=function(){e.$evalAsync(function(){e.$broadcast("$cordovaKeyboard:show")})},r=function(){e.$evalAsync(function(){e.$broadcast("$cordovaKeyboard:hide")})};return document.addEventListener("deviceready",function(){cordova.plugins.Keyboard&&(window.addEventListener("native.keyboardshow",n,!1),window.addEventListener("native.keyboardhide",r,!1))}),{hideAccessoryBar:function(e){return cordova.plugins.Keyboard.hideKeyboardAccessoryBar(e)},close:function(){return cordova.plugins.Keyboard.close()},show:function(){return cordova.plugins.Keyboard.show()},disableScroll:function(e){return cordova.plugins.Keyboard.disableScroll(e)},isVisible:function(){return cordova.plugins.Keyboard.isVisible},clearShowWatch:function(){document.removeEventListener("native.keyboardshow",n),e.$$listeners["$cordovaKeyboard:show"]=[]},clearHideWatch:function(){document.removeEventListener("native.keyboardhide",r),e.$$listeners["$cordovaKeyboard:hide"]=[]}}}]),angular.module("ngCordova.plugins.keychain",[]).factory("$cordovaKeychain",["$q",function(e){return{getForKey:function(n,r){var o=e.defer(),t=new Keychain;return t.getForKey(o.resolve,o.reject,n,r),o.promise},setForKey:function(n,r,o){var t=e.defer(),i=new Keychain;return i.setForKey(t.resolve,t.reject,n,r,o),t.promise},removeForKey:function(n,r){var o=e.defer(),t=new Keychain;return t.removeForKey(o.resolve,o.reject,n,r),o.promise}}}]),angular.module("ngCordova.plugins.launchNavigator",[]).factory("$cordovaLaunchNavigator",["$q",function(e){return{navigate:function(n,r,o){var t=e.defer();return launchnavigator.navigate(n,r,function(){t.resolve()},function(e){t.reject(e)},o),t.promise}}}]),angular.module("ngCordova.plugins.localNotification",[]).factory("$cordovaLocalNotification",["$q","$window","$rootScope","$timeout",function(e,n,r,o){return document.addEventListener("deviceready",function(){n.cordova&&n.cordova.plugins&&n.cordova.plugins.notification&&n.cordova.plugins.notification.local&&(n.cordova.plugins.notification.local.on("schedule",function(e,n){o(function(){r.$broadcast("$cordovaLocalNotification:schedule",e,n)})}),n.cordova.plugins.notification.local.on("trigger",function(e,n){o(function(){r.$broadcast("$cordovaLocalNotification:trigger",e,n)})}),n.cordova.plugins.notification.local.on("update",function(e,n){o(function(){r.$broadcast("$cordovaLocalNotification:update",e,n)})}),n.cordova.plugins.notification.local.on("clear",function(e,n){o(function(){r.$broadcast("$cordovaLocalNotification:clear",e,n)})}),n.cordova.plugins.notification.local.on("clearall",function(e){o(function(){r.$broadcast("$cordovaLocalNotification:clearall",e)})}),n.cordova.plugins.notification.local.on("cancel",function(e,n){o(function(){r.$broadcast("$cordovaLocalNotification:cancel",e,n)})}),n.cordova.plugins.notification.local.on("cancelall",function(e){o(function(){r.$broadcast("$cordovaLocalNotification:cancelall",e)})}),n.cordova.plugins.notification.local.on("click",function(e,n){o(function(){r.$broadcast("$cordovaLocalNotification:click",e,n)})}))},!1),{schedule:function(r,o){var t=e.defer();return o=o||null,n.cordova.plugins.notification.local.schedule(r,function(e){t.resolve(e)},o),t.promise},add:function(r,o){console.warn('Deprecated: use "schedule" instead.');var t=e.defer();return o=o||null,n.cordova.plugins.notification.local.schedule(r,function(e){t.resolve(e)},o),t.promise},update:function(r,o){var t=e.defer();return o=o||null,n.cordova.plugins.notification.local.update(r,function(e){t.resolve(e)},o),t.promise},clear:function(r,o){var t=e.defer();
return o=o||null,n.cordova.plugins.notification.local.clear(r,function(e){t.resolve(e)},o),t.promise},clearAll:function(r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.clearAll(function(e){o.resolve(e)},r),o.promise},cancel:function(r,o){var t=e.defer();return o=o||null,n.cordova.plugins.notification.local.cancel(r,function(e){t.resolve(e)},o),t.promise},cancelAll:function(r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.cancelAll(function(e){o.resolve(e)},r),o.promise},isPresent:function(r,o){var t=e.defer();return o=o||null,n.cordova.plugins.notification.local.isPresent(r,function(e){t.resolve(e)},o),t.promise},isScheduled:function(r,o){var t=e.defer();return o=o||null,n.cordova.plugins.notification.local.isScheduled(r,function(e){t.resolve(e)},o),t.promise},isTriggered:function(r,o){var t=e.defer();return o=o||null,n.cordova.plugins.notification.local.isTriggered(r,function(e){t.resolve(e)},o),t.promise},hasPermission:function(r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.hasPermission(function(e){e?o.resolve(e):o.reject(e)},r),o.promise},registerPermission:function(r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.registerPermission(function(e){e?o.resolve(e):o.reject(e)},r),o.promise},promptForPermission:function(r){console.warn('Deprecated: use "registerPermission" instead.');var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.registerPermission(function(e){e?o.resolve(e):o.reject(e)},r),o.promise},getAllIds:function(r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.getAllIds(function(e){o.resolve(e)},r),o.promise},getIds:function(r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.getIds(function(e){o.resolve(e)},r),o.promise},getScheduledIds:function(r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.getScheduledIds(function(e){o.resolve(e)},r),o.promise},getTriggeredIds:function(r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.getTriggeredIds(function(e){o.resolve(e)},r),o.promise},get:function(r,o){var t=e.defer();return o=o||null,n.cordova.plugins.notification.local.get(r,function(e){t.resolve(e)},o),t.promise},getAll:function(r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.getAll(function(e){o.resolve(e)},r),o.promise},getScheduled:function(r,o){var t=e.defer();return o=o||null,n.cordova.plugins.notification.local.getScheduled(r,function(e){t.resolve(e)},o),t.promise},getAllScheduled:function(r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.getAllScheduled(function(e){o.resolve(e)},r),o.promise},getTriggered:function(r,o){var t=e.defer();return o=o||null,n.cordova.plugins.notification.local.getTriggered(r,function(e){t.resolve(e)},o),t.promise},getAllTriggered:function(r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.getAllTriggered(function(e){o.resolve(e)},r),o.promise},getDefaults:function(){return n.cordova.plugins.notification.local.getDefaults()},setDefaults:function(e){n.cordova.plugins.notification.local.setDefaults(e)}}}]),angular.module("ngCordova.plugins.mMediaAds",[]).factory("$cordovaMMediaAds",["$q","$window",function(e,n){return{setOptions:function(r){var o=e.defer();return n.mMedia.setOptions(r,function(){o.resolve()},function(){o.reject()}),o.promise},createBanner:function(r){var o=e.defer();return n.mMedia.createBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},removeBanner:function(){var r=e.defer();return n.mMedia.removeBanner(function(){r.resolve()},function(){r.reject()}),r.promise},showBanner:function(r){var o=e.defer();return n.mMedia.showBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},showBannerAtXY:function(r,o){var t=e.defer();return n.mMedia.showBannerAtXY(r,o,function(){t.resolve()},function(){t.reject()}),t.promise},hideBanner:function(){var r=e.defer();return n.mMedia.hideBanner(function(){r.resolve()},function(){r.reject()}),r.promise},prepareInterstitial:function(r){var o=e.defer();return n.mMedia.prepareInterstitial(r,function(){o.resolve()},function(){o.reject()}),o.promise},showInterstitial:function(){var r=e.defer();return n.mMedia.showInterstitial(function(){r.resolve()},function(){r.reject()}),r.promise}}}]),angular.module("ngCordova.plugins.media",[]).service("NewMedia",["$q","$interval",function(e,n){function r(e){angular.isDefined(s)||(s=n(function(){0>d&&(d=e.getDuration(),a&&d>0&&a.notify({duration:d})),e.getCurrentPosition(function(e){e>-1&&(f=e)},function(e){console.log("Error getting pos="+e)}),a&&a.notify({position:f})},1e3))}function o(){angular.isDefined(s)&&(n.cancel(s),s=void 0)}function t(){f=-1,d=-1}function i(e){this.media=new Media(e,function(e){o(),t(),a.resolve(e)},function(e){o(),t(),a.reject(e)},function(e){l=e,a.notify({status:l})})}var a,c,u,s,l=null,f=-1,d=-1;return i.prototype.play=function(n){return a=e.defer(),"object"!=typeof n&&(n={}),this.media.play(n),r(this.media),a.promise},i.prototype.pause=function(){o(),this.media.pause()},i.prototype.stop=function(){this.media.stop()},i.prototype.release=function(){this.media.release(),this.media=void 0},i.prototype.seekTo=function(e){this.media.seekTo(e)},i.prototype.setVolume=function(e){this.media.setVolume(e)},i.prototype.startRecord=function(){this.media.startRecord()},i.prototype.stopRecord=function(){this.media.stopRecord()},i.prototype.currentTime=function(){return c=e.defer(),this.media.getCurrentPosition(function(e){c.resolve(e)}),c.promise},i.prototype.getDuration=function(){return u=e.defer(),this.media.getDuration(function(e){u.resolve(e)}),u.promise},i}]).factory("$cordovaMedia",["NewMedia",function(e){return{newMedia:function(n){return new e(n)}}}]),angular.module("ngCordova.plugins.mobfoxAds",[]).factory("$cordovaMobFoxAds",["$q","$window",function(e,n){return{setOptions:function(r){var o=e.defer();return n.MobFox.setOptions(r,function(){o.resolve()},function(){o.reject()}),o.promise},createBanner:function(r){var o=e.defer();return n.MobFox.createBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},removeBanner:function(){var r=e.defer();return n.MobFox.removeBanner(function(){r.resolve()},function(){r.reject()}),r.promise},showBanner:function(r){var o=e.defer();return n.MobFox.showBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},showBannerAtXY:function(r,o){var t=e.defer();return n.MobFox.showBannerAtXY(r,o,function(){t.resolve()},function(){t.reject()}),t.promise},hideBanner:function(){var r=e.defer();return n.MobFox.hideBanner(function(){r.resolve()},function(){r.reject()}),r.promise},prepareInterstitial:function(r){var o=e.defer();return n.MobFox.prepareInterstitial(r,function(){o.resolve()},function(){o.reject()}),o.promise},showInterstitial:function(){var r=e.defer();return n.MobFox.showInterstitial(function(){r.resolve()},function(){r.reject()}),r.promise}}}]),angular.module("ngCordova.plugins",["ngCordova.plugins.3dtouch","ngCordova.plugins.actionSheet","ngCordova.plugins.adMob","ngCordova.plugins.appAvailability","ngCordova.plugins.appRate","ngCordova.plugins.appVersion","ngCordova.plugins.backgroundGeolocation","ngCordova.plugins.badge","ngCordova.plugins.barcodeScanner","ngCordova.plugins.batteryStatus","ngCordova.plugins.beacon","ngCordova.plugins.ble","ngCordova.plugins.bluetoothSerial","ngCordova.plugins.brightness","ngCordova.plugins.calendar","ngCordova.plugins.camera","ngCordova.plugins.capture","ngCordova.plugins.clipboard","ngCordova.plugins.contacts","ngCordova.plugins.datePicker","ngCordova.plugins.device","ngCordova.plugins.deviceMotion","ngCordova.plugins.deviceOrientation","ngCordova.plugins.dialogs","ngCordova.plugins.emailComposer","ngCordova.plugins.facebook","ngCordova.plugins.facebookAds","ngCordova.plugins.file","ngCordova.plugins.fileTransfer","ngCordova.plugins.fileOpener2","ngCordova.plugins.flashlight","ngCordova.plugins.flurryAds","ngCordova.plugins.ga","ngCordova.plugins.geolocation","ngCordova.plugins.globalization","ngCordova.plugins.googleAds","ngCordova.plugins.googleAnalytics","ngCordova.plugins.googleMap","ngCordova.plugins.googlePlayGame","ngCordova.plugins.googlePlus","ngCordova.plugins.healthKit","ngCordova.plugins.httpd","ngCordova.plugins.iAd","ngCordova.plugins.imagePicker","ngCordova.plugins.inAppBrowser","ngCordova.plugins.instagram","ngCordova.plugins.keyboard","ngCordova.plugins.keychain","ngCordova.plugins.launchNavigator","ngCordova.plugins.localNotification","ngCordova.plugins.media","ngCordova.plugins.mMediaAds","ngCordova.plugins.mobfoxAds","ngCordova.plugins.mopubAds","ngCordova.plugins.nativeAudio","ngCordova.plugins.network","ngCordova.plugins.pinDialog","ngCordova.plugins.preferences","ngCordova.plugins.printer","ngCordova.plugins.progressIndicator","ngCordova.plugins.push","ngCordova.plugins.push_v5","ngCordova.plugins.sms","ngCordova.plugins.socialSharing","ngCordova.plugins.spinnerDialog","ngCordova.plugins.splashscreen","ngCordova.plugins.sqlite","ngCordova.plugins.statusbar","ngCordova.plugins.toast","ngCordova.plugins.touchid","ngCordova.plugins.vibration","ngCordova.plugins.videoCapturePlus","ngCordova.plugins.zip","ngCordova.plugins.insomnia"]),angular.module("ngCordova.plugins.mopubAds",[]).factory("$cordovaMoPubAds",["$q","$window",function(e,n){return{setOptions:function(r){var o=e.defer();return n.MoPub.setOptions(r,function(){o.resolve()},function(){o.reject()}),o.promise},createBanner:function(r){var o=e.defer();return n.MoPub.createBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},removeBanner:function(){var r=e.defer();return n.MoPub.removeBanner(function(){r.resolve()},function(){r.reject()}),r.promise},showBanner:function(r){var o=e.defer();return n.MoPub.showBanner(r,function(){o.resolve()},function(){o.reject()}),o.promise},showBannerAtXY:function(r,o){var t=e.defer();return n.MoPub.showBannerAtXY(r,o,function(){t.resolve()},function(){t.reject()}),t.promise},hideBanner:function(){var r=e.defer();return n.MoPub.hideBanner(function(){r.resolve()},function(){r.reject()}),r.promise},prepareInterstitial:function(r){var o=e.defer();return n.MoPub.prepareInterstitial(r,function(){o.resolve()},function(){o.reject()}),o.promise},showInterstitial:function(){var r=e.defer();return n.MoPub.showInterstitial(function(){r.resolve()},function(){r.reject()}),r.promise}}}]),angular.module("ngCordova.plugins.nativeAudio",[]).factory("$cordovaNativeAudio",["$q","$window",function(e,n){return{preloadSimple:function(r,o){var t=e.defer();return n.plugins.NativeAudio.preloadSimple(r,o,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},preloadComplex:function(r,o,t,i,a){var c=e.defer();return n.plugins.NativeAudio.preloadComplex(r,o,t,i,a,function(e){c.resolve(e)},function(e){c.reject(e)}),c.promise},play:function(r,o){var t=e.defer();return n.plugins.NativeAudio.play(r,function(e){t.resolve(e)},function(e){t.reject(e)},o),t.promise},stop:function(r){var o=e.defer();return n.plugins.NativeAudio.stop(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},loop:function(r){var o=e.defer();return n.plugins.NativeAudio.loop(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},unload:function(r){var o=e.defer();return n.plugins.NativeAudio.unload(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},setVolumeForComplexAsset:function(r,o){var t=e.defer();return n.plugins.NativeAudio.setVolumeForComplexAsset(r,o,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.network",[]).factory("$cordovaNetwork",["$rootScope","$timeout",function(e,n){var r=function(){var r=navigator.connection.type;n(function(){e.$broadcast("$cordovaNetwork:offline",r)})},o=function(){var r=navigator.connection.type;n(function(){e.$broadcast("$cordovaNetwork:online",r)})};return document.addEventListener("deviceready",function(){navigator.connection&&(document.addEventListener("offline",r,!1),document.addEventListener("online",o,!1))}),{getNetwork:function(){return navigator.connection.type},isOnline:function(){var e=navigator.connection.type;return e!==Connection.UNKNOWN&&e!==Connection.NONE},isOffline:function(){var e=navigator.connection.type;return e===Connection.UNKNOWN||e===Connection.NONE},clearOfflineWatch:function(){document.removeEventListener("offline",r),e.$$listeners["$cordovaNetwork:offline"]=[]},clearOnlineWatch:function(){document.removeEventListener("online",o),e.$$listeners["$cordovaNetwork:online"]=[]}}}]).run(["$injector",function(e){e.get("$cordovaNetwork")}]),angular.module("ngCordova.plugins.pinDialog",[]).factory("$cordovaPinDialog",["$q","$window",function(e,n){return{prompt:function(r,o,t){var i=e.defer();return n.plugins.pinDialog.prompt(r,function(e){i.resolve(e)},o,t),i.promise}}}]),angular.module("ngCordova.plugins.preferences",[]).factory("$cordovaPreferences",["$window","$q",function(e,n){return{pluginNotEnabledMessage:"Plugin not enabled",decoratePromise:function(e){e.success=function(n){return e.then(n),e},e.error=function(n){return e.then(null,n),e}},store:function(r,o,t){function i(e){c.resolve(e)}function a(e){c.reject(new Error(e))}var c=n.defer(),u=c.promise;if(e.plugins){var s;s=3===arguments.length?e.plugins.appPreferences.store(t,r,o):e.plugins.appPreferences.store(r,o),s.then(i,a)}else c.reject(new Error(this.pluginNotEnabledMessage));return this.decoratePromise(u),u},fetch:function(r,o){function t(e){a.resolve(e)}function i(e){a.reject(new Error(e))}var a=n.defer(),c=a.promise;if(e.plugins){var u;u=2===arguments.length?e.plugins.appPreferences.fetch(o,r):e.plugins.appPreferences.fetch(r),u.then(t,i)}else a.reject(new Error(this.pluginNotEnabledMessage));return this.decoratePromise(c),c},remove:function(r,o){function t(e){a.resolve(e)}function i(e){a.reject(new Error(e))}var a=n.defer(),c=a.promise;if(e.plugins){var u;u=2===arguments.length?e.plugins.appPreferences.remove(o,r):e.plugins.appPreferences.remove(r),u.then(t,i)}else a.reject(new Error(this.pluginNotEnabledMessage));return this.decoratePromise(c),c},show:function(){function r(e){t.resolve(e)}function o(e){t.reject(new Error(e))}var t=n.defer(),i=t.promise;return e.plugins?e.plugins.appPreferences.show().then(r,o):t.reject(new Error(this.pluginNotEnabledMessage)),this.decoratePromise(i),i}}}]),angular.module("ngCordova.plugins.printer",[]).factory("$cordovaPrinter",["$q","$window",function(e,n){return{isAvailable:function(){var r=e.defer();return n.plugin.printer.isAvailable(function(e){r.resolve(e)}),r.promise},print:function(r,o){var t=e.defer();return n.plugin.printer.print(r,o,function(){t.resolve()}),t.promise}}}]),angular.module("ngCordova.plugins.progressIndicator",[]).factory("$cordovaProgress",[function(){return{show:function(e){var n=e||"Please wait...";return ProgressIndicator.show(n)},showSimple:function(e){var n=e||!1;return ProgressIndicator.showSimple(n)},showSimpleWithLabel:function(e,n){var r=e||!1,o=n||"Loading...";return ProgressIndicator.showSimpleWithLabel(r,o)},showSimpleWithLabelDetail:function(e,n,r){var o=e||!1,t=n||"Loading...",i=r||"Please wait";return ProgressIndicator.showSimpleWithLabelDetail(o,t,i)},showDeterminate:function(e,n){var r=e||!1,o=n||5e4;return ProgressIndicator.showDeterminate(r,o)},showDeterminateWithLabel:function(e,n,r){var o=e||!1,t=n||5e4,i=r||"Loading...";return ProgressIndicator.showDeterminateWithLabel(o,t,i)},showAnnular:function(e,n){var r=e||!1,o=n||5e4;return ProgressIndicator.showAnnular(r,o)},showAnnularWithLabel:function(e,n,r){var o=e||!1,t=n||5e4,i=r||"Loading...";return ProgressIndicator.showAnnularWithLabel(o,t,i)},showBar:function(e,n){var r=e||!1,o=n||5e4;return ProgressIndicator.showBar(r,o)},showBarWithLabel:function(e,n,r){var o=e||!1,t=n||5e4,i=r||"Loading...";return ProgressIndicator.showBarWithLabel(o,t,i)},showSuccess:function(e,n){var r=e||!1,o=n||"Success";return ProgressIndicator.showSuccess(r,o)},showText:function(e,n,r){var o=e||!1,t=n||"Warning",i=r||"center";return ProgressIndicator.showText(o,t,i)},hide:function(){return ProgressIndicator.hide()}}}]),angular.module("ngCordova.plugins.push",[]).factory("$cordovaPush",["$q","$window","$rootScope","$timeout",function(e,n,r,o){return{onNotification:function(e){o(function(){r.$broadcast("$cordovaPush:notificationReceived",e)})},register:function(r){var o,t=e.defer();return void 0!==r&&void 0===r.ecb&&(o=null===document.querySelector("[ng-app]")?"document.body":"document.querySelector('[ng-app]')",r.ecb="angular.element("+o+").injector().get('$cordovaPush').onNotification"),n.plugins.pushNotification.register(function(e){t.resolve(e)},function(e){t.reject(e)},r),t.promise},unregister:function(r){var o=e.defer();return n.plugins.pushNotification.unregister(function(e){o.resolve(e)},function(e){o.reject(e)},r),o.promise},setBadgeNumber:function(r){var o=e.defer();return n.plugins.pushNotification.setApplicationIconBadgeNumber(function(e){o.resolve(e)},function(e){o.reject(e)},r),o.promise}}}]),angular.module("ngCordova.plugins.push_v5",[]).factory("$cordovaPushV5",["$q","$rootScope","$timeout",function(e,n,r){var o;return{initialize:function(n){var r=e.defer();return o=PushNotification.init(n),r.resolve(o),r.promise},onNotification:function(){r(function(){o.on("notification",function(e){n.$emit("$cordovaPushV5:notificationReceived",e)})})},onError:function(){r(function(){o.on("error",function(e){n.$emit("$cordovaPushV5:errorOccurred",e)})})},register:function(){var n=e.defer();return void 0===o?n.reject(new Error("init must be called before any other operation")):o.on("registration",function(e){n.resolve(e.registrationId)}),n.promise},unregister:function(){var n=e.defer();return void 0===o?n.reject(new Error("init must be called before any other operation")):o.unregister(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},getBadgeNumber:function(){var n=e.defer();return void 0===o?n.reject(new Error("init must be called before any other operation")):o.getApplicationIconBadgeNumber(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},setBadgeNumber:function(n){var r=e.defer();return void 0===o?r.reject(new Error("init must be called before any other operation")):o.setApplicationIconBadgeNumber(function(e){r.resolve(e)},function(e){r.reject(e)},n),r.promise},finish:function(){var n=e.defer();return void 0===o?n.reject(new Error("init must be called before any other operation")):o.finish(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.recentsControl",[]).factory("$cordovaRecents",function(){return{setColor:function(e){return RecentsControl.setColor(e)},setDescription:function(e){return RecentsControl.setDescription(e)},setOptions:function(e,n){return RecentsControl.setOptions(e,n)}}}),angular.module("ngCordova.plugins.screenshot",[]).factory("$cordovaScreenshot",["$q",function(e){return{captureToFile:function(n){var r=n||{},o=r.extension||"jpg",t=r.quality||"100",i=e.defer();return navigator.screenshot?(navigator.screenshot.save(function(e,n){e?i.reject(e):i.resolve(n.filePath)},o,t,r.filename),i.promise):(i.resolve(null),i.promise)},captureToUri:function(n){var r=n||{},o=r.extension||"jpg",t=r.quality||"100",i=e.defer();return navigator.screenshot?(navigator.screenshot.URI(function(e,n){e?i.reject(e):i.resolve(n.URI)},o,t,r.filename),i.promise):(i.resolve(null),i.promise)}}}]),angular.module("ngCordova.plugins.serial",[]).factory("$cordovaSerial",["$q",function(e){var n={};return n.requestPermission=function(n){var r=e.defer();return serial.requestPermission(n,function(){r.resolve()},function(e){r.reject(e)}),r.promise},n.open=function(n){var r=e.defer();return serial.open(n,function(){r.resolve()},function(e){r.reject(e)}),r.promise},n.write=function(n){var r=e.defer();return serial.write(n,function(){r.resolve()},function(e){r.reject(e)}),r.promise},n.writeHex=function(n){var r=e.defer();return serial.writeHex(n,function(){r.resolve()},function(e){r.reject(e)}),r.promise},n.read=function(){var n=e.defer();return serial.read(function(e){var r=new Uint8Array(e);n.resolve(r)},function(e){n.reject(e)}),n.promise},n.registerReadCallback=function(e,n){serial.registerReadCallback(function(n){var r=new Uint8Array(n);e(r)},n)},n.close=function(){var n=e.defer();return serial.close(function(){n.resolve()},function(e){n.reject(e)}),n.promise},n}]),angular.module("ngCordova.plugins.sms",[]).factory("$cordovaSms",["$q",function(e){return{send:function(n,r,o){var t=e.defer();return sms.send(n,r,o,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.socialSharing",[]).factory("$cordovaSocialSharing",["$q","$window",function(e,n){return{share:function(r,o,t,i){var a=e.defer();return o=o||null,t=t||null,i=i||null,n.plugins.socialsharing.share(r,o,t,i,function(){a.resolve(!0)},function(){a.reject(!1)}),a.promise},shareWithOptions:function(r){var o=e.defer();return n.plugins.socialsharing.shareWithOptions(r,function(){o.resolve(!0)},function(){o.reject(!1)}),o.promise},shareViaTwitter:function(r,o,t){var i=e.defer();return o=o||null,t=t||null,n.plugins.socialsharing.shareViaTwitter(r,o,t,function(){i.resolve(!0)},function(){i.reject(!1)}),i.promise},shareViaWhatsApp:function(r,o,t){var i=e.defer();return o=o||null,t=t||null,n.plugins.socialsharing.shareViaWhatsApp(r,o,t,function(){i.resolve(!0)},function(){i.reject(!1)}),i.promise},shareViaFacebook:function(r,o,t){var i=e.defer();return r=r||null,o=o||null,t=t||null,n.plugins.socialsharing.shareViaFacebook(r,o,t,function(){i.resolve(!0)},function(){i.reject(!1)}),i.promise},shareViaFacebookWithPasteMessageHint:function(r,o,t,i){var a=e.defer();return o=o||null,t=t||null,n.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(r,o,t,i,function(){a.resolve(!0)},function(){a.reject(!1)}),a.promise},shareViaSMS:function(r,o){var t=e.defer();return n.plugins.socialsharing.shareViaSMS(r,o,function(){t.resolve(!0)},function(){t.reject(!1)}),t.promise},shareViaEmail:function(r,o,t,i,a,c){var u=e.defer();return t=t||null,i=i||null,a=a||null,c=c||null,n.plugins.socialsharing.shareViaEmail(r,o,t,i,a,c,function(){u.resolve(!0)},function(){u.reject(!1)}),u.promise},shareVia:function(r,o,t,i,a){var c=e.defer();return o=o||null,t=t||null,i=i||null,a=a||null,n.plugins.socialsharing.shareVia(r,o,t,i,a,function(){c.resolve(!0)},function(){c.reject(!1)}),c.promise},canShareViaEmail:function(){var r=e.defer();return n.plugins.socialsharing.canShareViaEmail(function(){r.resolve(!0)},function(){r.reject(!1)}),r.promise},canShareVia:function(r,o,t,i,a){var c=e.defer();return n.plugins.socialsharing.canShareVia(r,o,t,i,a,function(e){c.resolve(e)},function(e){c.reject(e)}),c.promise},available:function(){var n=e.defer();return window.plugins.socialsharing.available(function(e){e?n.resolve():n.reject()}),n.promise}}}]),angular.module("ngCordova.plugins.spinnerDialog",[]).factory("$cordovaSpinnerDialog",["$window",function(e){return{show:function(n,r,o,t){return o=o||!1,e.plugins.spinnerDialog.show(n,r,o,t)},hide:function(){return e.plugins.spinnerDialog.hide()}}}]),angular.module("ngCordova.plugins.splashscreen",[]).factory("$cordovaSplashscreen",[function(){return{hide:function(){return navigator.splashscreen.hide()},show:function(){return navigator.splashscreen.show()}}}]),angular.module("ngCordova.plugins.sqlite",[]).factory("$cordovaSQLite",["$q","$window",function(e,n){return{openDB:function(e,r){return angular.isObject(e)&&!angular.isString(e)?("undefined"!=typeof r&&(e.bgType=r),n.sqlitePlugin.openDatabase(e)):n.sqlitePlugin.openDatabase({name:e,bgType:r})},execute:function(n,r,o){var t=e.defer();return n.transaction(function(e){e.executeSql(r,o,function(e,n){t.resolve(n)},function(e,n){t.reject(n)})}),t.promise},insertCollection:function(n,r,o){var t=e.defer(),i=o.slice(0);return n.transaction(function(e){!function n(){var o=i.splice(0,1)[0];try{e.executeSql(r,o,function(e,r){0===i.length?t.resolve(r):n()},function(e,n){t.reject(n)})}catch(a){t.reject(a)}}()}),t.promise},nestedExecute:function(n,r,o,t,i){var a=e.defer();return n.transaction(function(e){e.executeSql(r,t,function(e,n){a.resolve(n),e.executeSql(o,i,function(e,n){a.resolve(n)})})},function(e,n){a.reject(n)}),a.promise},deleteDB:function(r){var o=e.defer();return n.sqlitePlugin.deleteDatabase(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}}}]),angular.module("ngCordova.plugins.statusbar",[]).factory("$cordovaStatusbar",[function(){return{overlaysWebView:function(e){return StatusBar.overlaysWebView(!!e)},STYLES:{DEFAULT:0,LIGHT_CONTENT:1,BLACK_TRANSLUCENT:2,BLACK_OPAQUE:3},style:function(e){switch(e){case 0:return StatusBar.styleDefault();case 1:return StatusBar.styleLightContent();case 2:return StatusBar.styleBlackTranslucent();case 3:return StatusBar.styleBlackOpaque();default:return StatusBar.styleDefault()}},styleColor:function(e){return StatusBar.backgroundColorByName(e)},styleHex:function(e){return StatusBar.backgroundColorByHexString(e)},hide:function(){return StatusBar.hide()},show:function(){return StatusBar.show()},isVisible:function(){return StatusBar.isVisible}}}]),angular.module("ngCordova.plugins.toast",[]).factory("$cordovaToast",["$q","$window",function(e,n){return{showShortTop:function(r){var o=e.defer();return n.plugins.toast.showShortTop(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},showShortCenter:function(r){var o=e.defer();return n.plugins.toast.showShortCenter(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},showShortBottom:function(r){var o=e.defer();return n.plugins.toast.showShortBottom(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},showLongTop:function(r){var o=e.defer();return n.plugins.toast.showLongTop(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},showLongCenter:function(r){var o=e.defer();return n.plugins.toast.showLongCenter(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},showLongBottom:function(r){var o=e.defer();return n.plugins.toast.showLongBottom(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},showWithOptions:function(r){var o=e.defer();return n.plugins.toast.showWithOptions(r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},show:function(r,o,t){var i=e.defer();return n.plugins.toast.show(r,o,t,function(e){i.resolve(e)},function(e){i.reject(e)}),i.promise},hide:function(){var r=e.defer();try{n.plugins.toast.hide(),r.resolve()}catch(o){r.reject(o&&o.message)}return r.promise}}}]),angular.module("ngCordova.plugins.touchid",[]).factory("$cordovaTouchID",["$q",function(e){return{checkSupport:function(){var n=e.defer();return window.cordova?touchid.checkSupport(function(e){n.resolve(e)},function(e){n.reject(e)}):n.reject("Not supported without cordova.js"),n.promise},authenticate:function(n){var r=e.defer();return window.cordova?touchid.authenticate(function(e){r.resolve(e)},function(e){r.reject(e)},n):r.reject("Not supported without cordova.js"),r.promise}}}]),angular.module("ngCordova.plugins.tts",[]).factory("$cordovaTTS",function(){return{speak:function(e,n,r){return TTS.speak(e,n,r)}}}),angular.module("ngCordova.plugins.upsPush",[]).factory("$cordovaUpsPush",["$q","$window","$rootScope","$timeout",function(e,n,r,o){return{register:function(t){var i=e.defer();return n.push.register(function(e){o(function(){r.$broadcast("$cordovaUpsPush:notificationReceived",e)})},function(){i.resolve()},function(e){i.reject(e)},t),i.promise},unregister:function(r){var o=e.defer();return n.push.unregister(function(){o.resolve()},function(e){o.reject(e)},r),o.promise},setBadgeNumber:function(r){var o=e.defer();return n.push.setApplicationIconBadgeNumber(function(){o.resolve()},r),o.promise}}}]),angular.module("ngCordova.plugins.vibration",[]).factory("$cordovaVibration",[function(){return{vibrate:function(e){return navigator.notification.vibrate(e)},vibrateWithPattern:function(e,n){return navigator.notification.vibrateWithPattern(e,n)},cancelVibration:function(){return navigator.notification.cancelVibration()}}}]),angular.module("ngCordova.plugins.videoCapturePlus",[]).provider("$cordovaVideoCapturePlus",[function(){var e={};this.setLimit=function(n){e.limit=n},this.setMaxDuration=function(n){e.duration=n},this.setHighQuality=function(n){e.highquality=n},this.useFrontCamera=function(n){e.frontcamera=n},this.setPortraitOverlay=function(n){e.portraitOverlay=n},this.setLandscapeOverlay=function(n){e.landscapeOverlay=n},this.setOverlayText=function(n){e.overlayText=n},this.$get=["$q","$window",function(n,r){return{captureVideo:function(o){var t=n.defer();return r.plugins.videocaptureplus?(r.plugins.videocaptureplus.captureVideo(t.resolve,t.reject,angular.extend({},e,o)),t.promise):(t.resolve(null),t.promise)}}}]}]),angular.module("ngCordova.plugins.zip",[]).factory("$cordovaZip",["$q","$window",function(e,n){return{unzip:function(r,o){var t=e.defer();return n.zip.unzip(r,o,function(e){0===e?t.resolve():t.reject()},function(e){t.notify(e)}),t.promise}}}])}();
/*** <End:ngCordova LoadJs:"components/ngCordova/dist/ng-cordova.min.js"> ***/
/*** <End:ngCordova> ***/