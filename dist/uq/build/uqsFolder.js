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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUqsFolder = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var tools_1 = require("./tools");
var buildTsUqFolder_1 = require("./buildTsUqFolder");
var tool_1 = require("../../tool");
function buildUqsFolder(tonva, uqsFolder /*, appConfig: AppConfig*/) {
    return __awaiter(this, void 0, void 0, function () {
        var uqErrors, uqsMan, uqMans, promiseArr, _i, uqMans_1, uq, tsUqsIndexHeader, tsUqsIndexContent, uqsIndexFile, indexText, p1, pe, tsUqsIndexReExport, tsUqsUI, _a, uqMans_2, uq, _b, o1, n1, uqAlias, files, _c, files_1, file, fullPath;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, uqsStart(tonva /*, appConfig*/)];
                case 1:
                    uqErrors = _d.sent();
                    uqsMan = tonva.uqsMan;
                    uqMans = uqsMan.getUqMans();
                    promiseArr = [];
                    if (uqErrors) {
                        console.error(uqErrors.join('\n'));
                    }
                    for (_i = 0, uqMans_1 = uqMans; _i < uqMans_1.length; _i++) {
                        uq = uqMans_1[_i];
                        promiseArr.push(loadUqEntities(uq));
                    }
                    return [4 /*yield*/, Promise.all(promiseArr)];
                case 2:
                    _d.sent();
                    tsUqsIndexHeader = '';
                    uqsIndexFile = uqsFolder + "/index.ts";
                    if (fs_1.default.existsSync(uqsIndexFile) === true) {
                        indexText = fs_1.default.readFileSync(uqsIndexFile, 'utf8');
                        p1 = indexText.indexOf('///###import AppUQs###///');
                        if (p1 >= 0) {
                            pe = indexText.indexOf('\n', p1);
                            tsUqsIndexHeader = indexText.substring(0, pe + 1);
                            tsUqsIndexContent = "\n\nexport interface UQs extends AppUQs {";
                        }
                        else {
                            tsUqsIndexContent = "\n\nexport interface UQs {";
                        }
                    }
                    else {
                        tsUqsIndexContent = "\n\nexport interface UQs {";
                    }
                    tsUqsIndexHeader += (0, tools_1.buildTsHeader)();
                    tsUqsIndexReExport = '\n';
                    tsUqsUI = "\n\nexport function setUI(uqs:UQs) {";
                    for (_a = 0, uqMans_2 = uqMans; _a < uqMans_2.length; _a++) {
                        uq = uqMans_2[_a];
                        _b = (0, tools_1.getNameFromUq)(uq), o1 = _b.devName, n1 = _b.uqName;
                        uqAlias = o1 + n1;
                        (0, buildTsUqFolder_1.buildTsUqFolder)(uq, uqsFolder, uqAlias);
                        tsUqsIndexHeader += "\nimport * as " + uqAlias + " from './" + uqAlias + "';";
                        tsUqsIndexContent += "\n\t" + uqAlias + ": " + uqAlias + ".UqExt;";
                        tsUqsIndexReExport += "\nexport * as " + uqAlias + " from './" + uqAlias + "';";
                        tsUqsUI += "\n\t" + uqAlias + ".setUI(uqs." + uqAlias + ");";
                    }
                    if (!fs_1.default.existsSync(uqsFolder)) {
                        fs_1.default.mkdirSync(uqsFolder);
                    }
                    else {
                        try {
                            files = fs_1.default.readdirSync(uqsFolder);
                            for (_c = 0, files_1 = files; _c < files_1.length; _c++) {
                                file = files_1[_c];
                                fullPath = path_1.default.join(uqsFolder, file);
                                if (fs_1.default.lstatSync(fullPath).isFile() === true) {
                                    fs_1.default.unlinkSync(fullPath);
                                }
                            }
                        }
                        catch (err) {
                            throw err;
                        }
                    }
                    (0, tools_1.overrideTsFile)(uqsIndexFile, tsUqsIndexHeader + tsUqsIndexContent + '\n}' + tsUqsIndexReExport + tsUqsUI + '\n}\n');
                    return [2 /*return*/];
            }
        });
    });
}
exports.buildUqsFolder = buildUqsFolder;
// 返回每个uq构建时的错误
function uqsStart(tonva /*, uqsConfig: AppConfig*/) {
    return __awaiter(this, void 0, void 0, function () {
        var retErrors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tool_1.env.isDevelopment = true;
                    return [4 /*yield*/, tonva.nav.init()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tonva.uqsMan.buildUQs()];
                case 2:
                    retErrors = _a.sent();
                    return [2 /*return*/, retErrors];
            }
        });
    });
}
function loadUqEntities(uq) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uq.loadAllSchemas()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=uqsFolder.js.map