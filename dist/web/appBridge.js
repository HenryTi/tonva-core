"use strict";
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
exports.AppBridge = void 0;
//import {nav} from '../components';
var uqApi_1 = require("./uqApi");
var wsChannel_1 = require("./wsChannel");
var host_1 = require("./host");
var tool_1 = require("../tool");
var AppBridge = /** @class */ (function () {
    function AppBridge(web) {
        this.uqTokens = {};
        this.uqTokenActions = {};
        this.brideCenterApis = {};
        this.web = web;
    }
    AppBridge.prototype.addMessageListener = function () {
        var _this = this;
        window.addEventListener('message', function (evt) { return __awaiter(_this, void 0, void 0, function () {
            var message, nav, _a, ret;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        message = evt.data;
                        if (!message)
                            return [2 /*return*/];
                        nav = this.web.tonva.nav;
                        _a = message.type;
                        switch (_a) {
                            case 'sub-frame-started': return [3 /*break*/, 1];
                            case 'ws': return [3 /*break*/, 2];
                            case 'init-sub-win': return [3 /*break*/, 4];
                            case 'pop-app': return [3 /*break*/, 6];
                            case 'center-api': return [3 /*break*/, 7];
                            case 'center-api-return': return [3 /*break*/, 9];
                            case 'app-api': return [3 /*break*/, 10];
                            case 'app-api-return': return [3 /*break*/, 12];
                        }
                        return [3 /*break*/, 14];
                    case 1:
                        this.subFrameStarted(evt);
                        return [3 /*break*/, 15];
                    case 2: 
                    //wsBridge.receive(message.msg);
                    return [4 /*yield*/, nav.onReceive(message.msg)];
                    case 3:
                        //wsBridge.receive(message.msg);
                        _c.sent();
                        return [3 /*break*/, 15];
                    case 4: return [4 /*yield*/, this.initSubWin(message)];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 15];
                    case 6:
                        window.console.log('///\\\\\\ pop-app');
                        nav.navBack();
                        return [3 /*break*/, 15];
                    case 7: return [4 /*yield*/, this.callCenterApiFromMessage(evt.source, message)];
                    case 8:
                        _c.sent();
                        return [3 /*break*/, 15];
                    case 9:
                        this.bridgeCenterApiReturn(message);
                        return [3 /*break*/, 15];
                    case 10: return [4 /*yield*/, this.onReceiveAppApiMessage(message.hash, message.apiName)];
                    case 11:
                        ret = _c.sent();
                        evt.source.postMessage({
                            type: 'app-api-return',
                            apiName: message.apiName,
                            db: ret.db,
                            url: ret.url,
                            token: ret.token
                        }, "*");
                        return [3 /*break*/, 15];
                    case 12:
                        console.log("app-api-return: %s", JSON.stringify(message));
                        console.log('await onAppApiReturn(message);');
                        return [4 /*yield*/, this.onAppApiReturn(message)];
                    case 13:
                        _c.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        if (((_b = message.source) === null || _b === void 0 ? void 0 : _b.startsWith('react-devtools')) === true)
                            return [3 /*break*/, 15];
                        window.console.log('message: %s', JSON.stringify(message));
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        }); });
    };
    AppBridge.prototype.logoutUqTokens = function () {
        for (var i in this.uqTokens) {
            this.uqTokens[i] = undefined;
        }
        uqApi_1.UqTokenApi.clearLocal();
    };
    AppBridge.prototype.isBridged = function () {
        return window.self !== window.parent;
    };
    AppBridge.prototype.subFrameStarted = function (evt) {
        var message = evt.data;
        var subWin = evt.source;
        (0, wsChannel_1.setSubAppWindow)(subWin);
        this.hideFrameBack(message.hash);
        var msg = Object.assign({}, this.web.tonva.nav.user);
        msg.type = 'init-sub-win';
        subWin.postMessage(msg, '*');
    };
    AppBridge.prototype.hideFrameBack = function (hash) {
        var el = document.getElementById(hash);
        if (el !== undefined)
            el.hidden = true;
    };
    AppBridge.prototype.initSubWin = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('initSubWin: set nav.user', message);
                        user = this.web.tonva.nav.user = message;
                        this.web.setCenterToken(user.id, user.token);
                        return [4 /*yield*/, this.web.tonva.nav.showAppView()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppBridge.prototype.onReceiveAppApiMessage = function (hash, apiName) {
        return __awaiter(this, void 0, void 0, function () {
            var unit, parts, param, ret, db, url, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unit = tool_1.env.unit;
                        if (!unit) {
                            console.error('no unit defined in unit.json or in index.html, or not logined in', unit);
                        }
                        parts = apiName.split('/');
                        param = { unit: unit, uqOwner: parts[0], uqName: parts[1], appOwner: parts[2], appName: parts[3] };
                        console.log('uqTokenApi.uq onReceiveAppApiMessage', param);
                        return [4 /*yield*/, this.web.uqTokenApi.uq(param)];
                    case 1:
                        ret = _a.sent();
                        db = ret.db, url = ret.url, token = ret.token;
                        return [2 /*return*/, { name: apiName, db: db, url: url, token: token }];
                }
            });
        });
    };
    AppBridge.prototype.onAppApiReturn = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var apiName, db, url, urlTest, token, action, realUrl;
            return __generator(this, function (_a) {
                apiName = message.apiName, db = message.db, url = message.url, urlTest = message.urlTest, token = message.token;
                action = this.uqTokenActions[apiName];
                if (action === undefined) {
                    throw new Error('error app api return');
                    //return;
                }
                realUrl = host_1.host.getUrlOrTest(db, url, urlTest);
                console.log('onAppApiReturn(message:any): url=' + url + ', real=' + realUrl);
                //action.url = realUrl;
                //action.token = token;
                action.resolve({
                    name: apiName,
                    db: db,
                    url: realUrl,
                    token: token,
                });
                return [2 /*return*/];
            });
        });
    };
    AppBridge.prototype.buildAppUq = function (uq, uqOwner, uqName) {
        return __awaiter(this, void 0, void 0, function () {
            var unit, uqToken, db, url, urlTest, realUrl, bp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isBridged()) return [3 /*break*/, 2];
                        unit = tool_1.env.unit;
                        return [4 /*yield*/, this.web.uqTokenApi.uq({ unit: unit, uqOwner: uqOwner, uqName: uqName })];
                    case 1:
                        uqToken = _a.sent();
                        if (uqToken.token === undefined)
                            uqToken.token = this.web.centerToken;
                        db = uqToken.db, url = uqToken.url, urlTest = uqToken.urlTest;
                        realUrl = host_1.host.getUrlOrTest(db, url, urlTest);
                        console.log('realUrl: %s', realUrl);
                        uqToken.url = realUrl;
                        this.uqTokens[uq] = uqToken;
                        return [2 /*return*/, uqToken];
                    case 2:
                        bp = this.uqTokenActions[uq];
                        if (bp !== undefined)
                            return [2 /*return*/];
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                _this.uqTokenActions[uq] = {
                                    resolve: function (at) { return __awaiter(_this, void 0, void 0, function () {
                                        var _a, db, url, token;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4 /*yield*/, at];
                                                case 1:
                                                    _a = _b.sent(), db = _a.db, url = _a.url, token = _a.token;
                                                    this.uqTokens[uq] = {
                                                        name: uq,
                                                        db: db,
                                                        url: url,
                                                        token: token,
                                                    };
                                                    this.uqTokenActions[uq] = undefined;
                                                    //console.log("**** after buildAppUq ****", appInFrame);
                                                    resolve();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                    reject: reject,
                                };
                                (window.opener || window.parent).postMessage({
                                    type: 'app-api',
                                    apiName: uq,
                                    //hash: appInFrame.hash,
                                }, "*");
                            })];
                }
            });
        });
    };
    AppBridge.prototype.getUqToken = function (uq) {
        var uts = this.uqTokens;
        return uts[uq];
    };
    AppBridge.prototype.bridgeCenterApi = function (url, method, body) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('bridgeCenterApi: url=%s, method=%s', url, method);
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var callId, bca;
                        return __generator(this, function (_a) {
                            for (;;) {
                                callId = (0, tool_1.uid)();
                                bca = this.brideCenterApis[callId];
                                if (bca === undefined) {
                                    this.brideCenterApis[callId] = {
                                        id: callId,
                                        resolve: resolve,
                                        reject: reject,
                                    };
                                    break;
                                }
                            }
                            (window.opener || window.parent).postMessage({
                                type: 'center-api',
                                callId: callId,
                                url: url,
                                method: method,
                                body: body
                            }, '*');
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    AppBridge.prototype.callCenterApiFromMessage = function (from, message) {
        return __awaiter(this, void 0, void 0, function () {
            var callId, url, method, body, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        callId = message.callId, url = message.url, method = message.method, body = message.body;
                        return [4 /*yield*/, this.web.callCenterapi.directCall(url, method, body)];
                    case 1:
                        result = _a.sent();
                        from.postMessage({
                            type: 'center-api-return',
                            callId: callId,
                            result: result,
                        }, '*');
                        return [2 /*return*/];
                }
            });
        });
    };
    AppBridge.prototype.bridgeCenterApiReturn = function (message) {
        var callId = message.callId, result = message.result;
        var bca = this.brideCenterApis[callId];
        if (bca === undefined)
            return;
        this.brideCenterApis[callId] = undefined;
        bca.resolve(result);
    };
    return AppBridge;
}());
exports.AppBridge = AppBridge;
//# sourceMappingURL=appBridge.js.map