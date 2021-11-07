"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTsUqFolder = void 0;
var fs_1 = __importDefault(require("fs"));
var tool_1 = require("../../tool");
var buildUQ_1 = require("./buildUQ");
var fieldItem_1 = require("./fieldItem");
var tools_1 = require("./tools");
function buildTsUqFolder(uq, uqsFolder, uqAlias) {
    var uqFolder = uqsFolder + '/' + uqAlias;
    if (fs_1.default.existsSync(uqFolder) === false) {
        fs_1.default.mkdirSync(uqFolder);
    }
    var tsUq = (0, tools_1.buildTsHeader)();
    tsUq += (0, buildUQ_1.buildUQ)(uq, uqAlias);
    (0, tools_1.overrideTsFile)(uqFolder + "/" + uqAlias + ".ts", tsUq);
    saveTuidAndIDTsIndexAndRender(uqFolder, uq, uqAlias);
}
exports.buildTsUqFolder = buildTsUqFolder;
function saveTuidAndIDTsIndexAndRender(uqFolder, uq, uqAlias) {
    var imports = '', sets = '';
    var idArr = uq.idArr, idxArr = uq.idxArr, ixArr = uq.ixArr, tuidArr = uq.tuidArr;
    var coll = {};
    for (var _i = 0, tuidArr_1 = tuidArr; _i < tuidArr_1.length; _i++) {
        var i = tuidArr_1[_i];
        var sName = i.sName;
        coll[sName.toLowerCase()] = i;
        var cName = (0, tool_1.capitalCase)(sName);
        if (cName[0] === '$')
            continue;
        imports += "\nimport * as " + cName + " from './" + cName + ".ui';";
        sets += "\n\tassign(uq, '" + cName + "', " + cName + ");";
        var tsUI = "// eslint-disable-next-line @typescript-eslint/no-unused-vars\nimport { Res, setRes, TFunc, FieldItem, FieldItemNumber, FieldItemString, FieldItemId, UI, uqStringify } from \"tonva-react\";\nimport { Tuid" + cName + " } from \"./" + uqAlias + "\";\n\nconst resRaw: Res<any> = {\n\t$zh: {\n\t},\n\t$en: {\n\t}\n};\nconst res: any = {};\nsetRes(res, resRaw);\n\nexport const t:TFunc = (str:string|JSX.Element): string|JSX.Element => {\n\treturn res[str as string] ?? str;\n}\n\nexport function render(item: Tuid" + cName + "):JSX.Element {\n\treturn <>{uqStringify(item)}</>;\n};\n";
        var path = uqFolder + "/" + cName + ".ui.tsx";
        (0, tools_1.saveTsFileIfNotExists)(path, tsUI);
    }
    for (var _a = 0, _b = __spreadArray(__spreadArray(__spreadArray([], idArr, true), idxArr, true), ixArr, true); _a < _b.length; _a++) {
        var i = _b[_a];
        var sName = i.sName;
        //coll[sName.toLowerCase()] = i;
        var cName = (0, tool_1.capitalCase)(sName);
        if (cName[0] === '$')
            continue;
        coll[cName.toLocaleLowerCase()] = i;
        imports += "\nimport * as " + cName + " from './" + cName + ".ui';";
        sets += "\n\tassign(uq, '" + cName + "', " + cName + ");";
        var tsUI = "// eslint-disable-next-line @typescript-eslint/no-unused-vars\nimport { Res, setRes, TFunc, UI, uqStringify } from \"tonva-react\";\n// eslint-disable-next-line @typescript-eslint/no-unused-vars\nimport { FieldItem, FieldItemNumber, FieldItemString, FieldItemId } from \"tonva-react\";\nimport { " + cName + " } from \"./" + uqAlias + "\";\n\n/*--fields--*/\nconst fields = {\n};\n/*==fields==*/\n\nconst fieldArr: FieldItem[] = [\n];\n\nexport const ui: UI = {\n\tlabel: \"" + cName + "\",\n\tfieldArr,\n\tfields,\n};\n\nconst resRaw: Res<any> = {\n\t$zh: {\n\t},\n\t$en: {\n\t}\n};\nconst res: any = {};\nsetRes(res, resRaw);\n\nexport const t:TFunc = (str:string|JSX.Element): string|JSX.Element => {\n\treturn res[str as string] ?? str;\n}\n\nexport function render(item: " + cName + "):JSX.Element {\n\treturn <>{uqStringify(item)}</>;\n};\n";
        var path = uqFolder + "/" + cName + ".ui.tsx";
        (0, tools_1.saveTsFileIfNotExists)(path, tsUI);
        var fields = buildFields(i);
        var tsFieldArr = buildFieldArr(i);
        replaceTsFileFields(path, fields);
        var tsImportFieldItemsBegin = 'import { FieldItem, ';
        var tsImportFieldItemsEnd = ' } from "tonva-react";';
        var tsImportFieldItems = 'FieldItemInt, FieldItemNum, FieldItemString, FieldItemId';
        replaceTsFileString(path, {
            begin: tsImportFieldItemsBegin,
            end: tsImportFieldItemsEnd,
            content: tsImportFieldItemsBegin + tsImportFieldItems + tsImportFieldItemsEnd,
        });
        replaceTsFileString(path, { begin: '\nconst fieldArr: FieldItem[] = [\n', end: '\n];\n', content: tsFieldArr });
    }
    var tsIndex = "import { UqExt as Uq, assign } from './" + uqAlias + "';" + imports + "\n\t\nexport function setUI(uq: Uq) {" + sets + "\n}\nexport * from './" + uqAlias + "';\n";
    (0, tools_1.overrideTsFile)(uqFolder + "/index.ts", tsIndex);
    var files = fs_1.default.readdirSync(uqFolder);
    var suffix = '.ui.tsx';
    for (var _c = 0, files_1 = files; _c < files_1.length; _c++) {
        var file = files_1[_c];
        if (file.endsWith(suffix) === false)
            continue;
        var from = file.length - suffix.length;
        var fileEntityName = file.substring(0, from);
        var entity = coll[fileEntityName.toLocaleLowerCase()];
        if (entity === undefined || fileEntityName[0] === '$') {
            var unFile = uqFolder + "/" + file;
            fs_1.default.unlinkSync(unFile);
        }
    }
}
function buildFields(i) {
    switch (i.typeName) {
        case 'id': return buildIDFields(i);
        case 'idx': return buildIDXFields(i);
        case 'ix': return buildIXFields(i);
    }
}
;
function buildIDFields(ID) {
    var _a;
    var ret = {};
    var schema = ID.schema;
    var keys = schema.keys, fields = schema.fields;
    var _loop_1 = function (f_1) {
        var name_1 = f_1.name;
        var isKey = ((_a = keys) === null || _a === void 0 ? void 0 : _a.findIndex(function (v) { return v.name === name_1; })) >= 0;
        ret[name_1] = (0, fieldItem_1.buildFieldItem)(f_1, isKey);
    };
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var f_1 = fields_1[_i];
        _loop_1(f_1);
    }
    return ret;
}
function buildIDXFields(IDX) {
    var _a;
    var ret = {};
    var schema = IDX.schema;
    var keys = schema.keys, fields = schema.fields;
    var _loop_2 = function (f_2) {
        var name_2 = f_2.name;
        var isKey = ((_a = keys) === null || _a === void 0 ? void 0 : _a.findIndex(function (v) { return v.name === name_2; })) >= 0;
        ret[name_2] = (0, fieldItem_1.buildFieldItem)(f_2, isKey);
    };
    for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
        var f_2 = fields_2[_i];
        _loop_2(f_2);
    }
    return ret;
}
;
function buildIXFields(IX) {
    var _a;
    var ret = {};
    var schema = IX.schema;
    var keys = schema.keys, fields = schema.fields;
    var _loop_3 = function (f_3) {
        var name_3 = f_3.name;
        var isKey = ((_a = keys) === null || _a === void 0 ? void 0 : _a.findIndex(function (v) { return v.name === name_3; })) >= 0;
        ret[name_3] = (0, fieldItem_1.buildFieldItem)(f_3, isKey);
    };
    for (var _i = 0, fields_3 = fields; _i < fields_3.length; _i++) {
        var f_3 = fields_3[_i];
        _loop_3(f_3);
    }
    return ret;
}
;
function buildFieldArr(i) {
    var ts = '\nconst fieldArr: FieldItem[] = [\n\t';
    switch (i.typeName) {
        case 'id':
            ts += buildIDFieldArr(i);
            break;
        case 'idx':
            ts += buildIDXFieldArr(i);
            break;
        case 'ix':
            ts += buildIXFieldArr(i);
            break;
    }
    return ts += '\n];\n';
}
function buildIDFieldArr(i) {
    var schema = i.schema;
    var ts = '';
    for (var _i = 0, _a = schema.fields; _i < _a.length; _i++) {
        var f_4 = _a[_i];
        var name_4 = f_4.name;
        if (name_4 === 'id')
            continue;
        ts += "fields." + name_4 + ", ";
    }
    return ts;
}
function buildIDXFieldArr(i) {
    var schema = i.schema;
    var ts = '';
    for (var _i = 0, _a = schema.fields; _i < _a.length; _i++) {
        var f_5 = _a[_i];
        var name_5 = f_5.name;
        if (name_5 === 'id')
            continue;
        ts += "fields." + name_5 + ", ";
    }
    return ts;
}
function buildIXFieldArr(i) {
    var schema = i.schema;
    var ts = '';
    for (var _i = 0, _a = schema.fields; _i < _a.length; _i++) {
        var f_6 = _a[_i];
        var name_6 = f_6.name;
        if (name_6 === 'ix')
            continue;
        if (name_6 === 'id')
            continue;
        ts += "fields." + name_6 + ", ";
    }
    return ts;
}
function replaceTsFileFields(path, fields) {
    var text = fs_1.default.readFileSync(path).toString();
    var startStr = '\n/*--fields--*/';
    var endStr = '\n/*==fields==*/\n';
    var start = text.indexOf(startStr);
    if (start > 0) {
        var end = text.indexOf(endStr, start + startStr.length);
        if (end > 0) {
            var lBrace = text.indexOf('{', start + startStr.length);
            var rBrace = text.lastIndexOf('}', end);
            var oldText = text.substring(lBrace, rBrace + 1);
            var fieldsText = buildFieldsFromOldText(fields, oldText);
            text = text.substring(0, start)
                + startStr + '\nconst fields = {'
                + fieldsText
                + '\n};'
                + text.substring(end);
            fs_1.default.writeFileSync(path, text);
        }
    }
}
var fieldItemReplaceProps = ['label', 'placeholder', 'widget', 'type'];
function buildFieldsFromOldText(fields, oldText) {
    var ret = '';
    for (var i in fields) {
        var field = fields[i];
        setFieldOldProp(field, oldText);
        ret += buildFieldText(field);
    }
    return ret;
}
function setFieldOldProp(field, text) {
    var fieldStart = field.name + ':';
    var start = text.indexOf('\t' + fieldStart);
    if (start < 0)
        start = text.indexOf('\n' + fieldStart);
    if (start < 0)
        start = text.indexOf(' ' + fieldStart);
    if (start < 0)
        return;
    ++start;
    var end = text.indexOf('}', start + fieldStart.length);
    if (end < 0)
        return;
    var fieldText = text.substring(start + fieldStart.length, end + 1);
    /* eslint no-eval: 0 */
    var obj = eval('(' + fieldText + ')');
    fieldItemReplaceProps.forEach(function (v) {
        var prop = obj[v];
        if (!prop)
            return;
        if (v === 'type')
            return; // 这个是由新的schema决定的
        field[v] = prop;
    });
}
function buildFieldText(field) {
    var $FieldItemType = field.$FieldItemType;
    delete field.$FieldItemType;
    var ret = '\n\t' + field.name + ': ';
    var json = JSON.stringify(field, null, '\t\t');
    json = json.replace('}', '\t}');
    ret += json;
    return ret + ' as ' + $FieldItemType + ',';
}
;
function replaceTsFileString(path, sec) {
    var text = fs_1.default.readFileSync(path).toString();
    var begin = sec.begin, end = sec.end, content = sec.content;
    var b = text.indexOf(begin);
    if (b < 0)
        return;
    var e = text.indexOf(end, b + begin.length - 1);
    if (e < 0)
        return;
    text = text.substring(0, b) + content + text.substr(e + end.length);
    fs_1.default.writeFileSync(path, text);
}
//# sourceMappingURL=buildTsUqFolder.js.map