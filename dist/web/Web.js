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
exports.Web = void 0;
var appBridge_1 = require("./appBridge");
var centerApi_1 = require("./centerApi");
var uqApi_1 = require("./uqApi");
var httpChannel_1 = require("./httpChannel");
var guestApi_1 = require("./guestApi");
var messageHub_1 = require("./messageHub");
var httpChannelUI_1 = require("./httpChannelUI");
var wsChannel_1 = require("./wsChannel");
var uq_1 = require("../uq");
var Web = /** @class */ (function () {
    function Web(tonva) {
        this.centerToken = undefined;
        this.loginedUserId = 0;
        this.channelUIs = {};
        this.channelNoUIs = {};
        this.channels = {};
        this.isBuildingUQ = false;
        this.tonva = tonva;
        this.centerApi = new centerApi_1.CenterApi(this, '/tv', undefined);
        this.appBridge = new appBridge_1.AppBridge(this);
        this.userApi = new uqApi_1.UserApi(this, 'tv/', undefined);
        this.uqTokenApi = new uqApi_1.UqTokenApi(this, 'tv/tie/', undefined);
        this.callCenterapi = new uqApi_1.CallCenterApi(this, '', undefined);
        var unitId = 0;
        this.unitxApi = new uqApi_1.UnitxApi(this, unitId);
        this.guestApi = new guestApi_1.GuestApi(this, 'tv/guest/', undefined);
        this.messageHub = new messageHub_1.MessageHub(this);
        this.wsBridge = new wsChannel_1.WsBridge(this);
    }
    Web.prototype.logoutApis = function () {
        this.channelUIs = {};
        this.channelNoUIs = {};
        this.channels = {};
        this.appBridge.logoutUqTokens();
    };
    Web.prototype.setCenterUrl = function (url) {
        console.log('setCenterUrl %s', url);
        this.centerHost = url;
        this.centerChannel = undefined;
        this.centerChannelUI = undefined;
    };
    Web.prototype.setCenterToken = function (userId, t) {
        this.loginedUserId = userId;
        this.centerToken = t;
        this.centerChannel = undefined;
        this.centerChannelUI = undefined;
    };
    Web.prototype.getCenterChannelUI = function () {
        if (this.centerChannelUI !== undefined)
            return this.centerChannelUI;
        this.centerChannelUI = new httpChannel_1.CenterHttpChannel(this, this.centerHost, this.centerToken, new httpChannelUI_1.HttpChannelNavUI(this));
    };
    Web.prototype.getCenterChannel = function () {
        if (this.centerChannel !== undefined)
            return this.centerChannel;
        return this.centerChannel = new httpChannel_1.CenterHttpChannel(this, this.centerHost, this.centerToken);
    };
    Web.prototype.setNetToken = function (userId, token) {
        this.setCenterToken(userId, token);
        wsChannel_1.WSChannel.setCenterToken(token);
    };
    Web.prototype.clearNetToken = function () {
        this.setCenterToken(0, undefined);
        wsChannel_1.WSChannel.setCenterToken(undefined);
    };
    Web.prototype.build = function (appConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var app, uqs, tvs, version, retErrors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        app = appConfig.app, uqs = appConfig.uqs, tvs = appConfig.tvs, version = appConfig.version;
                        if (!app) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadApp(appConfig)];
                    case 1:
                        retErrors = _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!uqs) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loadUqs(uqs, version, tvs)];
                    case 3:
                        retErrors = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error('either uqs or app must be defined in AppConfig');
                    case 5: return [2 /*return*/, retErrors];
                }
            });
        });
    };
    Web.prototype.buildUQs = function (uqsConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var uqs, tvs, version, retErrors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uqs = uqsConfig.uqs, tvs = uqsConfig.tvs, version = uqsConfig.version;
                        if (!uqs) return [3 /*break*/, 2];
                        this.isBuildingUQ = true;
                        return [4 /*yield*/, this.loadUqs(uqs, version, tvs)];
                    case 1:
                        retErrors = _a.sent();
                        return [3 /*break*/, 3];
                    case 2: throw new Error('either uqs or app must be defined in AppConfig');
                    case 3: return [2 /*return*/, retErrors];
                }
            });
        });
    };
    // 返回 errors, 每个uq一行
    Web.prototype.loadApp = function (appConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var app, uqConfigs, tvs, version, name, dev, uqsMan, appOwner, appName, localData, uqAppData, data, _i, _a, uq, id, uqs;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        app = appConfig.app, uqConfigs = appConfig.uqs, tvs = appConfig.tvs, version = appConfig.version;
                        name = app.name, dev = app.dev;
                        uqsMan = this.uqsMan = new uq_1.UQsManApp(this, dev.name + "/" + name, tvs);
                        appOwner = uqsMan.appOwner, appName = uqsMan.appName;
                        localData = uqsMan.localData;
                        uqAppData = localData.get();
                        if (!(!uqAppData || uqAppData.version !== version)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loadAppUqs(appOwner, appName)];
                    case 1:
                        uqAppData = _c.sent();
                        if (!uqAppData.id) {
                            return [2 /*return*/, [
                                    appOwner + "/" + appName + "\u4E0D\u5B58\u5728\u3002\u8BF7\u4ED4\u7EC6\u68C0\u67E5app\u5168\u540D\u3002"
                                ]];
                        }
                        uqAppData.version = version;
                        if (!uqConfigs) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._loadUqs(uqConfigs)];
                    case 2:
                        data = _c.sent();
                        (_b = uqAppData.uqs).push.apply(_b, data);
                        _c.label = 3;
                    case 3:
                        localData.set(uqAppData);
                        // 
                        for (_i = 0, _a = uqAppData.uqs; _i < _a.length; _i++) {
                            uq = _a[_i];
                            uq.newVersion = true;
                        }
                        _c.label = 4;
                    case 4:
                        id = uqAppData.id, uqs = uqAppData.uqs;
                        uqsMan.id = id;
                        return [4 /*yield*/, uqsMan.buildUqs(uqs, version, uqConfigs)];
                    case 5: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // 返回 errors, 每个uq一行
    Web.prototype.loadUqs = function (uqConfigs, version, tvs) {
        return __awaiter(this, void 0, void 0, function () {
            var uqs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.uqsMan = new uq_1.UQsMan(this, tvs);
                        return [4 /*yield*/, this._loadUqs(uqConfigs)];
                    case 1:
                        uqs = _a.sent();
                        return [4 /*yield*/, this.uqsMan.buildUqs(uqs, version, uqConfigs)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Web.prototype.loadAppUqs = function (appOwner, appName) {
        return __awaiter(this, void 0, void 0, function () {
            var centerAppApi, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        centerAppApi = new uqApi_1.CenterAppApi(this, 'tv/', undefined);
                        return [4 /*yield*/, centerAppApi.appUqs(appOwner, appName)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    Web.prototype._loadUqs = function (uqConfigs) {
        return __awaiter(this, void 0, void 0, function () {
            var uqs, centerAppApi, ret, err, i, _a, ownerAlias, alias;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uqs = uqConfigs.map(function (v) {
                            var dev = v.dev, name = v.name, version = v.version, alias = v.alias;
                            var owner = dev.name, ownerAlias = dev.alias;
                            return { owner: owner, ownerAlias: ownerAlias, name: name, version: version, alias: alias };
                        });
                        centerAppApi = new uqApi_1.CenterAppApi(this, 'tv/', undefined);
                        return [4 /*yield*/, centerAppApi.uqs(uqs)];
                    case 1:
                        ret = _b.sent();
                        if (ret.length < uqs.length) {
                            err = "\u4E0B\u5217UQ\uFF1A\n" + uqs.map(function (v) { return v.owner + "/" + v.name; }).join('\n') + "\u4E4B\u4E00\u4E0D\u5B58\u5728";
                            console.error(err);
                            throw Error(err);
                        }
                        for (i = 0; i < uqs.length; i++) {
                            _a = uqs[i], ownerAlias = _a.ownerAlias, alias = _a.alias;
                            ret[i].ownerAlias = ownerAlias;
                            ret[i].uqAlias = alias;
                        }
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    return Web;
}());
exports.Web = Web;
//# sourceMappingURL=Web.js.map