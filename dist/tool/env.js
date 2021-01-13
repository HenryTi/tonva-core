"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var _62_1 = require("./62");
var localDb_1 = require("./localDb");
/*
// 如果路径上有独立的test单词，则是test环境
// 这段代码移到下面 initEnv 去了
function isTesting():boolean {
    let ret = /(\btest\b)/i.test(document.location.href);
    return ret;
}
*/
exports.env = (function () {
    var _a = initEnv(), unit = _a.unit, testing = _a.testing, params = _a.params;
    //let localDb = new LocalMap(testing===true? '$$':'$');
    return {
        unit: unit,
        testing: testing,
        params: params,
        isDevelopment: process.env.NODE_ENV === 'development',
        localDb: new localDb_1.LocalMap(testing === true ? '$$' : '$'),
        setTimeout: function (tag, callback, ms) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            return global.setTimeout.apply(global, __spreadArrays([callback, ms], args));
        },
        clearTimeout: function (handle) {
            global.clearTimeout(handle);
        },
        setInterval: function (callback, ms) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return global.setInterval.apply(global, __spreadArrays([callback, ms], args));
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
            unit = _62_1.from62(sUnit);
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
    return { unit: unit, testing: testing, params: params };
}
//# sourceMappingURL=env.js.map