"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var _62_1 = require("./62");
var localDb_1 = require("./localDb");
exports.env = (function () {
    var _a = initEnv(), unit = _a.unit, testing = _a.testing, buildingUq = _a.buildingUq, params = _a.params, lang = _a.lang, district = _a.district, timeZone = _a.timeZone, isMobile = _a.isMobile;
    return {
        unit: unit,
        testing: testing,
        buildingUq: buildingUq,
        params: params,
        lang: lang,
        district: district,
        timeZone: timeZone,
        browser: detectBrowser(),
        isDevelopment: process.env.NODE_ENV === 'development',
        isMobile: isMobile,
        localDb: new localDb_1.LocalMap(testing === true ? '$$' : '$'),
        setTimeout: function (tag, callback, ms) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            return global.setTimeout.apply(global, __spreadArray([callback, ms], args, false));
        },
        clearTimeout: function (handle) {
            global.clearTimeout(handle);
        },
        setInterval: function (callback, ms) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return global.setInterval.apply(global, __spreadArray([callback, ms], args, false));
        },
        clearInterval: function (handle) {
            global.clearInterval(handle);
        }
    };
}());
function initEnv() {
    var pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g, decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); }, query = window.location.search.substring(1);
    var params = {};
    for (;;) {
        var match = search.exec(query);
        if (!match)
            break;
        params[decode(match[1])] = decode(match[2]);
    }
    var testing; // = isTesting();
    var unit;
    var sUnit = params['u'] || params['unit'];
    if (sUnit) {
        var p = sUnit.indexOf('-');
        if (p >= 0) {
            var tc = sUnit.charCodeAt(p + 1);
            var tt = 'tT';
            testing = tc === tt.charCodeAt(0) || tc === tt.charCodeAt(1);
            sUnit = sUnit.substr(0, p);
        }
        else {
            testing = false;
        }
        if (sUnit[0] === '0') {
            unit = Number(sUnit);
        }
        else {
            unit = (0, _62_1.from62)(sUnit);
        }
        if (isNaN(unit) === true)
            unit = undefined;
    }
    else {
        // 下面都是为了兼容以前的操作。
        // 整个url上，只要有test作为独立的字符串出现，就是testing
        testing = /(\btest\b)/i.test(document.location.href);
        var unitName = void 0;
        var el = document.getElementById('unit');
        if (el) {
            unitName = el.innerText;
        }
        else {
            el = document.getElementById('unit.json');
            if (el) {
                var json = el.innerHTML;
                if (json) {
                    var res = JSON.parse(json);
                    unitName = res === null || res === void 0 ? void 0 : res.unit;
                }
            }
        }
        if (!unitName) {
            unitName = process.env.REACT_APP_UNIT;
        }
        if (unitName) {
            unit = Number.parseInt(unitName);
            if (Number.isInteger(unit) === false) {
                if (unitName === '百灵威') {
                    unit = 24;
                }
            }
        }
        if (!unit)
            unit = 0;
    }
    var lang, district;
    var language = (navigator.languages && navigator.languages[0]) // Chrome / Firefox
        || navigator.language; // ||   // All browsers
    //navigator.userLanguage; // IE <= 10
    if (!language) {
        lang = 'zh';
        district = 'CN';
    }
    else {
        var parts = language.split('-');
        lang = parts[0];
        if (parts.length > 1)
            district = parts[1].toUpperCase();
    }
    var timeZone = -new Date().getTimezoneOffset() / 60;
    var regEx = new RegExp('Android|webOS|iPhone|iPad|' +
        'BlackBerry|Windows Phone|' +
        'Opera Mini|IEMobile|Mobile', 'i');
    var isMobile = regEx.test(navigator.userAgent);
    return { unit: unit, testing: testing, buildingUq: false, params: params, lang: lang, district: district, timeZone: timeZone, isMobile: isMobile };
}
function detectBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) >= 0)
        return 'Opera';
    if (navigator.userAgent.indexOf("Chrome") >= 0)
        return 'Chrome';
    if (navigator.userAgent.indexOf("Safari") >= 0)
        return 'Safari';
    if (navigator.userAgent.indexOf("Firefox") >= 0)
        return 'Firefox';
    if ((navigator.userAgent.indexOf("MSIE") >= 0) || (!!document.documentMode === true))
        return 'IE'; //crap
    return 'Unknown';
}
//# sourceMappingURL=env.js.map