"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameFromUq = exports.entityName = exports.buildTsHeader = exports.saveTsFileIfNotExists = exports.overrideTsFile = exports.saveTsFile = exports.saveSrcTsFileIfNotExists = exports.lastBuildTime = exports.red = void 0;
var fs_1 = __importDefault(require("fs"));
var tool_1 = require("../../tool");
exports.red = '\x1b[41m%s\x1b[0m';
exports.lastBuildTime = 0;
//export const uqTsSrcPath = 'src/UqApp';
function saveSrcTsFileIfNotExists(context, fileName, suffix, content) {
    var tsFilePath = context.uqTsSrcPath + "/" + fileName + "." + suffix;
    saveTsFileIfNotExists(tsFilePath, content);
    //if (fs.existsSync(tsFile) === true) return;
    //saveTsFile(fileName, content, suffix);
}
exports.saveSrcTsFileIfNotExists = saveSrcTsFileIfNotExists;
function saveTsFile(context, fileName, content, suffix) {
    if (suffix === void 0) { suffix = 'ts'; }
    var uqTsSrcPath = context.uqTsSrcPath;
    var srcFile = uqTsSrcPath + "/" + fileName + "." + suffix + ".txt";
    var tsFile = uqTsSrcPath + "/" + fileName + "." + suffix;
    if (!fs_1.default.existsSync(srcFile)) {
        if (fs_1.default.existsSync(tsFile)) {
            fs_1.default.renameSync(tsFile, srcFile);
        }
    }
    fs_1.default.writeFileSync(tsFile, content);
    exports.lastBuildTime = Date.now();
    console.log(exports.red, tsFile + " is built");
}
exports.saveTsFile = saveTsFile;
function overrideTsFile(path, content) {
    //let tsFile = `${path}/${fileName}.${suffix}`;
    fs_1.default.writeFileSync(path, content);
    exports.lastBuildTime = Date.now();
    console.log(exports.red, path + " is built");
}
exports.overrideTsFile = overrideTsFile;
//fileName:string, 
//, suffix:string = 'ts'
function saveTsFileIfNotExists(tsFilePath, content) {
    //let tsFilePath = `${path}/${fileName}.${suffix}`;
    if (fs_1.default.existsSync(tsFilePath) === true)
        return;
    overrideTsFile(tsFilePath, content);
}
exports.saveTsFileIfNotExists = saveTsFileIfNotExists;
/*
function createTsFile(path:string, fileName:string, content:string, suffix:string = 'ts') {
    let tsFile = `${path}/${fileName}.${suffix}`;
    if (fs.existsSync(tsFile) === true) return;
    fs.writeFileSync(tsFile, content);
    lastBuildTime = Date.now();
    console.log(red, `${tsFile} is built`);
}
*/
function buildTsHeader() {
    return "//=== UqApp builder created on " + new Date() + " ===//";
}
exports.buildTsHeader = buildTsHeader;
function entityName(s) {
    return (0, tool_1.capitalCase)(s);
}
exports.entityName = entityName;
function getNameFromUq(uqMan) {
    var config = uqMan.config;
    var devPart, uqPart;
    if (config) {
        var dev = config.dev, name_1 = config.name, alias = config.alias;
        var devName = dev.name, devAlias = dev.alias;
        devPart = devAlias || devName;
        uqPart = alias || name_1;
    }
    else {
        var uqOwner = uqMan.uqOwner, uqName = uqMan.uqName;
        devPart = uqOwner;
        uqPart = uqName;
    }
    return {
        devName: (0, tool_1.capitalCase)(devPart),
        uqName: (0, tool_1.capitalCase)(uqPart),
    };
}
exports.getNameFromUq = getNameFromUq;
//# sourceMappingURL=tools.js.map