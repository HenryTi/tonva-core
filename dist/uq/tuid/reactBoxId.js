"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tv = exports.ReactBoxId = exports.uqStringify = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var mobx_react_1 = require("mobx-react");
var TuidContent = function (tuidName, values, x) {
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [tuidName, ": ", uqStringify(values)] }, void 0);
};
function uqStringify(values) {
    var s = '{';
    if (values === undefined)
        return 'undefined';
    for (var i in values) {
        var v = values[i];
        s += i + ': ';
        if (v === undefined) {
            s += 'undefined';
        }
        else if (v === null) {
            s += 'null';
        }
        else {
            switch (typeof v) {
                default:
                    s += v;
                    break;
                case 'function':
                    s += 'function';
                    break;
                case 'object':
                    s += '{obj}';
                    break;
            }
        }
        s += ', ';
    }
    return s + '}';
}
exports.uqStringify = uqStringify;
var ReactBoxId = /** @class */ (function () {
    function ReactBoxId(id, tuid, ui) {
        this.id = Number(id);
        this.tuid = tuid;
        this.ui = ui;
        this.isUndefined = (this.tuid === undefined);
    }
    Object.defineProperty(ReactBoxId.prototype, "obj", {
        get: function () {
            return this.tuid.valueFromId(this.id);
        },
        enumerable: false,
        configurable: true
    });
    ReactBoxId.prototype.equ = function (id) {
        if (id === undefined || id === null)
            return false;
        if (typeof id === 'object')
            return this.id === id.id;
        return this.id === id;
    };
    ReactBoxId.prototype.render = function (ui, x) {
        if (this.id === undefined || this.id === null || isNaN(this.id) === true)
            return;
        var boxName = this.boxName; // this.tuid.name;
        var val = this.obj; // this.tuid.valueFromId(this.id);
        if (this.isUndefined === true) {
            if (ui !== undefined)
                return ui(val, x);
            return TuidContent(boxName, val, x);
        }
        switch (typeof val) {
            case 'undefined':
                return (0, jsx_runtime_1.jsxs)("span", __assign({ className: "text-black-50" }, { children: [boxName, " undefined"] }), void 0);
            case 'number':
                return (0, jsx_runtime_1.jsxs)("span", __assign({ className: "text-light" }, { children: [boxName, " ", this.id] }), void 0);
        }
        if (ui === undefined) {
            ui = this.ui;
        }
        if (ui !== undefined) {
            if (typeof ui !== 'function') {
                ui = ui.content;
            }
            if (ui !== undefined) {
                var ret = ui(val /*, this.tuidUR.res*/);
                if (ret !== undefined)
                    return ret;
                return (0, jsx_runtime_1.jsxs)("span", __assign({ className: "text-danger" }, { children: [boxName, " ", this.id] }), void 0);
            }
        }
        return TuidContent(boxName, val);
    };
    Object.defineProperty(ReactBoxId.prototype, "boxName", {
        get: function () { return this.tuid.name; },
        enumerable: false,
        configurable: true
    });
    // ui(): TvTemplet {return this.tuid.ui}
    // res(): any {return this.tuid.res}
    ReactBoxId.prototype.assure = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tuid.assureBox(this.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    return ReactBoxId;
}());
exports.ReactBoxId = ReactBoxId;
function boxIdContent(bi, ui, x) {
    var logContent;
    var boxId = bi;
    switch (typeof bi) {
        case 'undefined':
            logContent = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "boxId undefined" }, void 0);
            break;
        case 'number':
            logContent = (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["id:", bi] }, void 0);
            break;
        default:
            if (typeof boxId.render !== 'function') {
                if (ui === undefined) {
                    logContent = TuidContent(boxId.boxName, bi, x);
                }
                else {
                    return ui(bi, x);
                }
            }
            break;
    }
    if (logContent !== undefined) {
        return (0, jsx_runtime_1.jsx)("del", __assign({ className: "text-danger" }, { children: logContent }), void 0);
    }
    return boxId.render(ui, x);
}
var Tv = (0, mobx_react_1.observer)(function (_a) {
    var tuidValue = _a.tuidValue, ui = _a.ui, x = _a.x, nullUI = _a.nullUI;
    if (tuidValue === undefined) {
        if (nullUI === undefined)
            return (0, jsx_runtime_1.jsx)("small", __assign({ className: "text-muted" }, { children: "[\u65E0]" }), void 0);
        return nullUI();
    }
    if (tuidValue === null) {
        if (nullUI === undefined)
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "[null]" }, void 0);
        return nullUI();
    }
    var ttv = typeof tuidValue;
    switch (ttv) {
        default:
            if (ui === undefined)
                return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [ttv, "-", tuidValue] }, void 0);
            else {
                var ret = ui(tuidValue, x);
                if (ret !== undefined)
                    return ret;
                return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: tuidValue }, void 0);
            }
        case 'object':
            var divObj = boxIdContent(tuidValue, ui, x);
            if (divObj !== undefined)
                return divObj;
            return nullUI === undefined ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "id null" }, void 0) : nullUI();
        case 'number':
            return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["id...", tuidValue] }, void 0);
    }
});
var tv = function (tuidValue, ui, x, nullUI) {
    return (0, jsx_runtime_1.jsx)(Tv, { tuidValue: tuidValue, ui: ui, x: x, nullUI: nullUI }, void 0);
};
exports.tv = tv;
//# sourceMappingURL=reactBoxId.js.map