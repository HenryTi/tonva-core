"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ControllerCore = exports.ControllerBaseCore = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// import {nav, Page, PageHeaderProps, PageWebNav} from '../components';
var res_1 = require("../res");
var tool_1 = require("../tool");
var ControllerBaseCore = /** @class */ (function () {
    function ControllerBaseCore(nav) {
        var _this = this;
        this.res = {};
        this.t = function (str) { return _this.internalT(str) || str; };
        this.isDev = tool_1.env.isDevelopment;
        this.nav = nav;
    }
    Object.defineProperty(ControllerBaseCore.prototype, "user", {
        get: function () { return this.nav.user; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ControllerBaseCore.prototype, "isLogined", {
        get: function () {
            var user = this.nav.user;
            if (!user)
                return false;
            return user.id > 0;
        },
        enumerable: false,
        configurable: true
    });
    ControllerBaseCore.prototype.beforeInit = function () { };
    ControllerBaseCore.prototype.afterInit = function () { };
    ControllerBaseCore.prototype.internalInit = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.beforeInit();
        this.init.apply(this, param);
        this.pageWebNav = this.getPageWebNav();
        this.afterInit();
    };
    ControllerBaseCore.prototype.init = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    ControllerBaseCore.prototype.internalT = function (str) {
        var _a, _b;
        return (_b = (_a = this.res) === null || _a === void 0 ? void 0 : _a[str]) !== null && _b !== void 0 ? _b : (0, res_1.t)(str);
    };
    Object.defineProperty(ControllerBaseCore.prototype, "webNav", {
        get: function () { return undefined; },
        enumerable: false,
        configurable: true
    });
    ControllerBaseCore.prototype.getWebNav = function () { return this.webNav; };
    ControllerBaseCore.prototype.getPageWebNav = function () { return undefined; };
    Object.defineProperty(ControllerBaseCore.prototype, "isWebNav", {
        get: function () { return this.nav.isWebNav; },
        enumerable: false,
        configurable: true
    });
    ControllerBaseCore.prototype.navigate = function (url) {
        this.nav.navigate(url);
    };
    ControllerBaseCore.prototype.setRes = function (res) {
        if (res === undefined)
            return;
        var $lang = res_1.resOptions.$lang, $district = res_1.resOptions.$district;
        Object.assign(this.res, res);
        if ($lang !== undefined) {
            var l = res[$lang];
            if (l !== undefined) {
                Object.assign(this.res, l);
                var d = l[$district];
                if (d !== undefined) {
                    Object.assign(this.res, d);
                }
            }
        }
    };
    ControllerBaseCore.prototype.getRes = function () { return this.res; };
    ControllerBaseCore.prototype.onDispose = function () {
    };
    ControllerBaseCore.prototype.isMe = function (id) {
        if (id === null)
            return false;
        var user = this.user;
        var userId = user.id;
        switch (typeof id) {
            default: return false;
            case 'string': return Number(id) === userId;
            case 'number': return id === userId;
            case 'object': return id.id === userId;
        }
    };
    ControllerBaseCore.prototype.openVPage = function (vp, param, afterBack) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ret = new vp(this);
                        return [4 /*yield*/, ret.open(param, afterBack)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    ControllerBaseCore.prototype.replaceVPage = function (vp, param, afterBack) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ret = new vp(this);
                        return [4 /*yield*/, ret.replaceOpen(param, afterBack)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    ControllerBaseCore.prototype.renderView = function (view, param) {
        var v = new view(this);
        return v.render(param);
    };
    ControllerBaseCore.prototype.event = function (type, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onEvent(type, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ControllerBaseCore.prototype.onEvent = function (type, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ControllerBaseCore.prototype.msg = function (text) {
        alert(text);
    };
    ControllerBaseCore.prototype.errorPage = function (header, err) {
        this.openPage(this.renderErrorPage(header, err));
    };
    ControllerBaseCore.prototype.beforeStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    ControllerBaseCore.prototype.afterStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ControllerBaseCore.prototype.start = function (param) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.beforeStart()];
                    case 1:
                        ret = _a.sent();
                        if (ret === false)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.internalStart.apply(this, __spreadArray([param], params, false))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.afterStart()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ControllerBaseCore.prototype, "isCalling", {
        get: function () { return this._resolve_$ !== undefined; },
        enumerable: false,
        configurable: true
    });
    ControllerBaseCore.prototype.call = function (param) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this._resolve_$ === undefined)
                    this._resolve_$ = [];
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this._resolve_$.push(resolve);
                                    return [4 /*yield*/, this.start.apply(this, __spreadArray([param], params, false))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ControllerBaseCore.prototype.vCall = function (vp, param) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this._resolve_$ === undefined)
                    this._resolve_$ = [];
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this._resolve_$.push(resolve);
                                    return [4 /*yield*/, (new vp(this)).open(param)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ControllerBaseCore.prototype.returnCall = function (value) {
        if (this._resolve_$ === undefined)
            return;
        var resolve = this._resolve_$.pop();
        if (resolve === undefined) {
            alert('the Controller call already returned, or not called');
            return;
        }
        resolve(value);
    };
    ControllerBaseCore.prototype.openPage = function (page, onClosePage) {
        var disposer;
        if (onClosePage !== undefined) {
            disposer = function () {
                //if (this.disposer) this.disposer();
                onClosePage(undefined);
            };
        }
        this.nav.push(page, disposer);
        //this.disposer = undefined;
    };
    ControllerBaseCore.prototype.replacePage = function (page, onClosePage) {
        this.nav.replace(page, onClosePage);
        //this.disposer = undefined;
    };
    ControllerBaseCore.prototype.backPage = function () {
        this.nav.back();
    };
    ControllerBaseCore.prototype.closePage = function (level) {
        this.nav.pop(level);
    };
    ControllerBaseCore.prototype.ceasePage = function (level) {
        this.nav.ceaseTop(level);
    };
    ControllerBaseCore.prototype.go = function (showPage, url, absolute) {
        this.nav.go(showPage, url, absolute);
    };
    ControllerBaseCore.prototype.removeCeased = function () {
        this.nav.removeCeased();
    };
    ControllerBaseCore.prototype.regConfirmClose = function (confirmClose) {
        this.nav.regConfirmClose(confirmClose);
    };
    ControllerBaseCore.prototype.startAction = function () {
        this.topPageKey = this.nav.topKey();
    };
    Object.defineProperty(ControllerBaseCore.prototype, "TopKey", {
        get: function () {
            return this.topPageKey;
        },
        enumerable: false,
        configurable: true
    });
    ControllerBaseCore.prototype.SetTopKey = function (key) {
        this.topPageKey = key;
    };
    ControllerBaseCore.prototype.popToTopPage = function () {
        this.nav.popTo(this.topPageKey);
    };
    /*{
        let {caption, message, ok, yes, no, classNames} = options;
        let buttons:any[] = [];
        if (ok !== undefined) {
            buttons.push(<button key="ok" className="btn btn-primary me-3" onClick={()=>close('ok')}>{ok}</button>);
        }
        if (yes !== undefined) {
            buttons.push(<button key="yes" className="btn btn-success me-3" onClick={()=>close('yes')}>{yes}</button>);
        }
        if (no !== undefined) {
            buttons.push(<button key="no" className="btn btn-outline-danger me-3" onClick={()=>close('no')}>{no}</button>);
        }
        return <Page header={caption || '请确认'} back="close">
            <div className={classNames || "rounded bg-white m-5 p-3 border"}>
                <div className="d-flex align-items-center justify-content-center">
                    {message}
                </div>
                <div className="mt-3 d-flex align-items-center justify-content-center">
                    {buttons}
                </div>
            </div>
        </Page>);
    }*/
    ControllerBaseCore.prototype.confirm = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var caption, message, ok, yes, no, classNames, close, buttons;
                        var _this = this;
                        return __generator(this, function (_a) {
                            caption = options.caption, message = options.message, ok = options.ok, yes = options.yes, no = options.no, classNames = options.classNames;
                            close = function (res) {
                                _this.closePage();
                                resolve(res);
                            };
                            buttons = [];
                            if (ok !== undefined) {
                                buttons.push((0, jsx_runtime_1.jsx)("button", __assign({ className: "btn btn-primary me-3", onClick: function () { return close('ok'); } }, { children: ok }), "ok"));
                            }
                            if (yes !== undefined) {
                                buttons.push((0, jsx_runtime_1.jsx)("button", __assign({ className: "btn btn-success me-3", onClick: function () { return close('yes'); } }, { children: yes }), "yes"));
                            }
                            if (no !== undefined) {
                                buttons.push((0, jsx_runtime_1.jsx)("button", __assign({ className: "btn btn-outline-danger me-3", onClick: function () { return close('no'); } }, { children: no }), "no"));
                            }
                            this.openPage(this.renderConfirm(options));
                            this.nav.regConfirmClose(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    resolve(undefined);
                                    return [2 /*return*/, true];
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    return ControllerBaseCore;
}());
exports.ControllerBaseCore = ControllerBaseCore;
var ControllerCore = /** @class */ (function (_super) {
    __extends(ControllerCore, _super);
    function ControllerCore(tonva) {
        return _super.call(this, tonva.nav) || this;
    }
    return ControllerCore;
}(ControllerBaseCore));
exports.ControllerCore = ControllerCore;
//# sourceMappingURL=controller.js.map