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
exports.UserApi = exports.CenterAppApi = exports.CallCenterApi = exports.UqTokenApi = exports.CenterApiBase = exports.UnitxApi = exports.UqApi = void 0;
var httpChannel_1 = require("./httpChannel");
var httpChannelUI_1 = require("./httpChannelUI");
//import {getUqToken, logoutUqTokens, buildAppUq} from './appBridge';
var apiBase_1 = require("./apiBase");
var host_1 = require("./host");
var tool_1 = require("../tool");
var UqApi = /** @class */ (function (_super) {
    __extends(UqApi, _super);
    function UqApi(web, basePath, uqOwner, uqName, showWaiting) {
        var _this = _super.call(this, web, basePath, showWaiting) || this;
        if (uqName) {
            _this.uqOwner = uqOwner;
            _this.uqName = uqName;
            _this.uq = uqOwner + '/' + uqName;
        }
        _this.showWaiting = showWaiting;
        return _this;
    }
    UqApi.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web.appBridge.buildAppUq(this.uq, this.uqOwner, this.uqName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UqApi.prototype.getHttpChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var channels, channelUI, channel, arr;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.showWaiting === true || this.showWaiting === undefined) {
                    channels = this.web.channelUIs;
                    channelUI = new httpChannelUI_1.HttpChannelNavUI(this.web);
                }
                else {
                    channels = this.web.channelNoUIs;
                }
                channel = channels[this.uq];
                if (channel !== undefined) {
                    if (Array.isArray(channel) === false)
                        return [2 /*return*/, channel];
                }
                else {
                    channel = channels[this.uq] = [];
                }
                arr = channel;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var uqToken, url, token, _i, arr_1, pv;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    arr.push({ resolve: resolve, reject: reject });
                                    if (arr.length !== 1)
                                        return [2 /*return*/];
                                    uqToken = this.web.appBridge.getUqToken(this.uq);
                                    if (!!uqToken) return [3 /*break*/, 2];
                                    //debugger;
                                    return [4 /*yield*/, this.init()];
                                case 1:
                                    //debugger;
                                    _a.sent();
                                    uqToken = this.web.appBridge.getUqToken(this.uq);
                                    _a.label = 2;
                                case 2:
                                    url = uqToken.url, token = uqToken.token;
                                    this.token = token;
                                    channel = new httpChannel_1.UqHttpChannel(this.web, url, token, channelUI);
                                    channels[this.uq] = channel;
                                    for (_i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                                        pv = arr_1[_i];
                                        pv.resolve(channel);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /*async update():Promise<string> {
        return await this.get('update');
    }*/
    /*
    async __loadAccess():Promise<any> {
        let acc = this.access === undefined?
            '' :
            this.access.join('|');
        let ret = await this.get('access', {acc:acc});
        return ret;
    }
    */
    UqApi.prototype.loadEntities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('entities')];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqApi.prototype.getAdmins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('get-admins')];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqApi.prototype.getRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, parts, s, _i, parts_1, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('get-roles')];
                    case 1:
                        ret = _a.sent();
                        if (!ret)
                            return [2 /*return*/, null];
                        parts = ret.split('|');
                        s = [];
                        for (_i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
                            p = parts_1[_i];
                            p = p.trim();
                            if (!p)
                                continue;
                            s.push(p);
                        }
                        if (s.length === 0)
                            return [2 /*return*/, null];
                        return [2 /*return*/, s];
                }
            });
        });
    };
    UqApi.prototype.getAllRoleUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('get-all-role-users')];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqApi.prototype.setUserRoles = function (theUser, roles) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('set-user-roles', { theUser: theUser, roles: roles })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UqApi.prototype.deleteUserRoles = function (theUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('delete-user-roles', { theUser: theUser })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UqApi.prototype.allSchemas = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('all-schemas')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.schema = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('schema/' + name)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqApi.prototype.queueModify = function (start, page, entities) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('queue-modify', { start: start, page: page, entities: entities })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UqApi;
}(apiBase_1.ApiBase));
exports.UqApi = UqApi;
/*
let channels:{[unitId:number]: HttpChannel} = {};

export function logoutUnitxApis() {
    channels = {};
}
*/
var UnitxApi = /** @class */ (function (_super) {
    __extends(UnitxApi, _super);
    function UnitxApi(web, unitId) {
        var _this = _super.call(this, web, 'tv/', undefined, undefined, true) || this;
        _this.unitId = unitId;
        return _this;
    }
    UnitxApi.prototype.getHttpChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var channel, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        channel = this.web.channels[this.unitId];
                        if (channel !== undefined)
                            return [2 /*return*/, channel];
                        _a = this.web.channels;
                        _b = this.unitId;
                        return [4 /*yield*/, this.buildChannel()];
                    case 1: return [2 /*return*/, _a[_b] = _c.sent()];
                }
            });
        });
    };
    UnitxApi.prototype.buildChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var channelUI, centerAppApi, ret, token, db, url, urlTest, realUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelUI = new httpChannelUI_1.HttpChannelNavUI(this.web);
                        centerAppApi = new CenterAppApi(this.web, 'tv/', undefined);
                        return [4 /*yield*/, centerAppApi.unitxUq(this.unitId)];
                    case 1:
                        ret = _a.sent();
                        token = ret.token, db = ret.db, url = ret.url, urlTest = ret.urlTest;
                        realUrl = host_1.host.getUrlOrTest(db, url, urlTest);
                        this.token = token;
                        return [2 /*return*/, new httpChannel_1.UqHttpChannel(this.web, realUrl, token, channelUI)];
                }
            });
        });
    };
    return UnitxApi;
}(UqApi));
exports.UnitxApi = UnitxApi;
var CenterApiBase = /** @class */ (function (_super) {
    __extends(CenterApiBase, _super);
    function CenterApiBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CenterApiBase.prototype.getHttpChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (this.showWaiting === true || this.showWaiting === undefined) ?
                        this.web.getCenterChannelUI() :
                        this.web.getCenterChannel()];
            });
        });
    };
    return CenterApiBase;
}(apiBase_1.ApiBase));
exports.CenterApiBase = CenterApiBase;
var uqTokensName = 'uqTokens';
var UqTokenApi = /** @class */ (function (_super) {
    __extends(UqTokenApi, _super);
    function UqTokenApi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.localMap = tool_1.env.localDb.map(uqTokensName);
        return _this;
    }
    UqTokenApi.clearLocal = function () {
        tool_1.env.localDb.removeItem(uqTokensName);
    };
    UqTokenApi.prototype.uq = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var uqOwner, uqName, un, localCache, uqToken, unit, user, nowTick, tick, value, uqParams, ret, unit, uqOwner_1, uqName_1, err, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uqOwner = params.uqOwner, uqName = params.uqName;
                        un = uqOwner + '/' + uqName;
                        localCache = this.localMap.child(un);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        uqToken = localCache.get();
                        if (uqToken !== undefined) {
                            unit = uqToken.unit, user = uqToken.user;
                            if (unit !== params.unit || user !== this.web.loginedUserId) {
                                localCache.remove();
                                uqToken = undefined;
                            }
                        }
                        nowTick = Math.floor(Date.now() / 1000);
                        if (uqToken !== undefined) {
                            tick = uqToken.tick, value = uqToken.value;
                            if (value !== undefined && (nowTick - tick) < 24 * 3600) {
                                return [2 /*return*/, Object.assign({}, value)];
                            }
                        }
                        uqParams = Object.assign({}, params);
                        uqParams.testing = host_1.host.testing;
                        return [4 /*yield*/, this.get('uq-token', uqParams)];
                    case 2:
                        ret = _a.sent();
                        if (ret === undefined) {
                            unit = params.unit, uqOwner_1 = params.uqOwner, uqName_1 = params.uqName;
                            err = "center get app-uq(unit=" + unit + ", '" + uqOwner_1 + "/" + uqName_1 + "') - not exists or no unit-service";
                            throw err;
                        }
                        uqToken = {
                            unit: params.unit,
                            user: this.web.loginedUserId,
                            tick: nowTick,
                            value: ret,
                        };
                        localCache.set(uqToken);
                        return [2 /*return*/, Object.assign({}, ret)];
                    case 3:
                        err_1 = _a.sent();
                        localCache.remove();
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UqTokenApi;
}(CenterApiBase));
exports.UqTokenApi = UqTokenApi;
var CallCenterApi = /** @class */ (function (_super) {
    __extends(CallCenterApi, _super);
    function CallCenterApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallCenterApi.prototype.directCall = function (url, method, body) {
        return this.call(url, method, body);
    };
    return CallCenterApi;
}(CenterApiBase));
exports.CallCenterApi = CallCenterApi;
//const appUqsName = 'appUqs';
var CenterAppApi = /** @class */ (function (_super) {
    __extends(CenterAppApi, _super);
    function CenterAppApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CenterAppApi.prototype.appUqs = function (appOwner, appName) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/app-uqs', { appOwner: appOwner, appName: appName })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    CenterAppApi.prototype.uqs = function (uqs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tie/pure-uqs', uqs)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CenterAppApi.prototype.unitxUq = function (unit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/unitx-uq', { unit: unit })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CenterAppApi.prototype.changePassword = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tie/change-password', param)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CenterAppApi.prototype.userQuit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/user-ask-quit', {})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CenterAppApi;
}(CenterApiBase));
exports.CenterAppApi = CenterAppApi;
;
var UserApi = /** @class */ (function (_super) {
    __extends(UserApi, _super);
    function UserApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserApi.prototype.login = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, token, user, nick, icon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('user/login', params)];
                    case 1:
                        ret = _a.sent();
                        switch (typeof ret) {
                            default: return [2 /*return*/];
                            case 'string': return [2 /*return*/, (0, tool_1.decodeUserToken)(ret)];
                            case 'object':
                                token = ret.token;
                                user = (0, tool_1.decodeUserToken)(token);
                                nick = ret.nick, icon = ret.icon;
                                if (nick)
                                    user.nick = nick;
                                if (icon)
                                    user.icon = icon;
                                return [2 /*return*/, user];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApi.prototype.register = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('user/register', params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.sendVerify = function (account, type, oem) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('user/set-verify', { account: account, type: type, oem: oem })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.checkVerify = function (account, verify) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('user/check-verify', { account: account, verify: verify })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.isExists = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('user/is-exists', { account: account })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.resetPassword = function (account, password, verify, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('user/reset-password', { account: account, password: password, verify: verify, type: type })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.userSetProp = function (prop, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tie/user-set-prop', { prop: prop, value: value })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApi.prototype.me = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/me')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.user = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/user', { id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.fromKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/user-from-key', { key: key })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserApi;
}(CenterApiBase));
exports.UserApi = UserApi;
//# sourceMappingURL=uqApi.js.map