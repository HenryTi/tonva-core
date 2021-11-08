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
exports.IDCache = void 0;
var mobx_1 = require("mobx");
var maxCacheSize = 1000;
var delayLoad = 30; // 延迟loading的时间
var IDCache = /** @class */ (function () {
    function IDCache(tonva, uq) {
        var _this = this;
        this.queue = []; // 每次使用，都排到队头
        this.cache = mobx_1.observable.map({}, { deep: false }); // 已经缓冲的, 如果是数值，则是重复取的次数
        this.waitingIds = []; // 等待loading的
        this.timeOut = function () { return __awaiter(_this, void 0, void 0, function () {
            var waitingIds, values, _loop_1, this_1, _i, values_1, val, _a, waitingIds_1, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        waitingIds = this.waitingIds;
                        this.waitingIds = [];
                        if (waitingIds.length === 0)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.TvIdValues(waitingIds)];
                    case 1:
                        values = _b.sent();
                        _loop_1 = function (val) {
                            var id = val.id;
                            if (waitingIds[0] < 0)
                                id = -id;
                            this_1.cache.set(id, val);
                            var index = waitingIds.findIndex(function (v) { return v === id; });
                            if (index >= 0)
                                waitingIds.splice(index, 1);
                        };
                        this_1 = this;
                        for (_i = 0, values_1 = values; _i < values_1.length; _i++) {
                            val = values_1[_i];
                            _loop_1(val);
                        }
                        for (_a = 0, waitingIds_1 = waitingIds; _a < waitingIds_1.length; _a++) {
                            id = waitingIds_1[_a];
                            this.cache.set(id, null);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.tonva = tonva;
        this.uq = uq;
    }
    IDCache.prototype.getValue = function (id) {
        var ret = this.cache.get(id);
        if (ret === null)
            return;
        if (ret === undefined) {
            this.useId(id);
            return;
        }
        if (typeof ret === 'number')
            return;
        return ret;
    };
    IDCache.prototype.TvIdValues = function (waitingIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uq.IDTv(waitingIds)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IDCache.prototype.useId = function (id) {
        if (!id)
            return;
        if (typeof id !== 'number') {
            console.error('id cache ' + id + ' is not number');
            return;
        }
        if (this.cache.has(id) === true) {
            this.moveToHead(id);
            return;
        }
        clearTimeout(this.timeoutHandler);
        this.timeoutHandler = setTimeout(this.timeOut, delayLoad);
        //this.cache.set(id, 0);
        if (this.waitingIds.findIndex(function (v) { return v === id; }) >= 0) {
            this.moveToHead(id);
            return;
        }
        if (this.queue.length >= maxCacheSize) {
            // 缓冲已满，先去掉最不常用的
            var r_1 = this.queue.shift();
            if (r_1 === id) {
                // 如果移除的，正好是现在用的，则插入
                this.queue.push(r_1);
                return;
            }
            //let rKey = String(r);
            if (this.cache.has(r_1) === true) {
                // 如果移除r已经缓存
                this.cache.delete(r_1);
            }
            else {
                // 如果移除r还没有缓存
                var index = this.waitingIds.findIndex(function (v) { return v === r_1; });
                this.waitingIds.splice(index, 1);
            }
        }
        this.waitingIds.push(id);
        this.queue.push(id);
        return;
    };
    IDCache.prototype.moveToHead = function (id) {
        var index = this.queue.findIndex(function (v) { return v === id; });
        this.queue.splice(index, 1);
        this.queue.push(id);
    };
    IDCache.prototype.remove = function (id) {
        this.cache.delete(id);
        var index = this.queue.findIndex(function (v) { return v === id; });
        this.queue.splice(index, 1);
        //this.localArr.removeItem(id);
    };
    IDCache.prototype.resetCache = function (id) {
        this.remove(id);
        this.useId(id);
    };
    return IDCache;
}());
exports.IDCache = IDCache;
//# sourceMappingURL=IDCache.js.map