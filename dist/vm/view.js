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
exports.ViewCore = void 0;
//import { Image, UserView } from '../components';
var tool_1 = require("../tool");
var ViewCore = /** @class */ (function () {
    function ViewCore(controller) {
        this.controller = controller;
        this.t = controller.t;
    }
    Object.defineProperty(ViewCore.prototype, "isDev", {
        get: function () { return tool_1.env.isDevelopment; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewCore.prototype, "isWebNav", {
        get: function () { return this.controller.isWebNav; },
        enumerable: false,
        configurable: true
    });
    ViewCore.prototype.navigate = function (url) { this.controller.navigate(url); };
    ViewCore.prototype.isMe = function (id) { return this.controller.isMe(id); };
    ViewCore.prototype.renderVm = function (vm, param) {
        return (new vm(this.controller)).render(param);
    };
    ViewCore.prototype.openVPage = function (vp, param, afterBack) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (new vp(this.controller)).open(param, afterBack)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewCore.prototype.event = function (type, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.event(type, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewCore.prototype.go = function (showPage, url, absolute) {
        this.controller.go(showPage, url, absolute);
    };
    ViewCore.prototype.vCall = function (vp, param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.vCall(vp, param)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ViewCore.prototype.returnCall = function (value) {
        this.controller.returnCall(value);
    };
    /*
    protected renderUserText(user:any) {
        let renderUser = (user:User) => {
            let {name, nick} = user;
            return <>{nick || name}</>;
        }
        return <UserView user={user} render={renderUser} />
    }
    */
    ViewCore.prototype.renderMe = function (imageClassName, textClassName) {
        var user = this.controller.user;
        if (!user)
            return;
        return this.renderUser(user.id, imageClassName, textClassName);
    };
    /*
    protected openPage(view: React.StatelessComponent<any>, param?:any, onClosePage?:(ret:any)=>void) {
        let type = typeof param;
        if (type === 'object' || type === 'undefined') {
            this.controller.openPage(React.createElement(view, param), onClosePage);
        }
        else {
            this.controller.openPage(<Page header="param type error">
                View.openPage param must be object, but here is {type}
            </Page>, onClosePage);
        }
    }
    */
    ViewCore.prototype.replacePage = function (view, param) {
        this.controller.replacePage(view, param);
    };
    ViewCore.prototype.openPageElement = function (page, onClosePage) {
        this.controller.openPage(page, onClosePage);
    };
    ViewCore.prototype.replacePageElement = function (page, onClosePage) {
        this.controller.replacePage(page, onClosePage);
    };
    ViewCore.prototype.backPage = function () {
        this.controller.backPage();
    };
    ViewCore.prototype.closePage = function (level) {
        this.controller.closePage(level);
    };
    ViewCore.prototype.ceasePage = function (level) {
        this.controller.ceasePage(level);
    };
    ViewCore.prototype.removeCeased = function () {
        this.controller.removeCeased();
    };
    ViewCore.prototype.regConfirmClose = function (confirmClose) {
        this.controller.regConfirmClose(confirmClose);
    };
    ViewCore.prototype.popToTopPage = function () {
        this.controller.popToTopPage();
    };
    return ViewCore;
}());
exports.ViewCore = ViewCore;
//# sourceMappingURL=view.js.map