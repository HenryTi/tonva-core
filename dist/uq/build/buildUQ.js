"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUQ = void 0;
var tool_1 = require("../../tool");
var tools_1 = require("./tools");
function buildUQ(uq, uqAlias) {
    var tsImport = "\n// eslint-disable-next-line @typescript-eslint/no-unused-vars\nimport { IDXValue, Uq";
    var ts = "\n\n";
    ts += '\n//===============================';
    ts += "\n//======= UQ " + uq.name + " ========";
    ts += '\n//===============================';
    ts += '\n';
    uq.enumArr.forEach(function (v) { return ts += uqEntityInterface(v, buildEnumInterface); });
    uq.tuidArr.forEach(function (v) { return ts += uqEntityInterface(v, buildTuidInterface); });
    uq.actionArr.forEach(function (v) { return ts += uqEntityInterface(v, buildActionInterface); });
    uq.sheetArr.forEach(function (v) { return ts += uqEntityInterface(v, buildSheetInterface); });
    uq.queryArr.forEach(function (v) { return ts += uqEntityInterface(v, buildQueryInterface); });
    uq.bookArr.forEach(function (v) { return ts += uqEntityInterface(v, buildBookInterface); });
    uq.mapArr.forEach(function (v) { return ts += uqEntityInterface(v, buildMapInterface); });
    uq.historyArr.forEach(function (v) { return ts += uqEntityInterface(v, buildHistoryInterface); });
    uq.pendingArr.forEach(function (v) { return ts += uqEntityInterface(v, buildPendingInterface); });
    uq.idArr.forEach(function (v) { return ts += uqEntityInterface(v, buildIDInterface); });
    uq.idxArr.forEach(function (v) { return ts += uqEntityInterface(v, buildIDXInterface); });
    uq.idxArr.forEach(function (v) { return ts += uqEntityInterface(v, buildIDXActParamInterface); });
    uq.ixArr.forEach(function (v) { return ts += uqEntityInterface(v, buildIXInterface); });
    ts += buildActsInterface(uq);
    ts += "\n\nexport interface UqExt extends Uq {\n\tActs(param:ParamActs): Promise<any>;\n";
    function appendArr(arr, type, tsBuild) {
        if (arr.length === 0)
            return;
        var tsLen = ts.length;
        arr.forEach(function (v) { return ts += tsBuild(v); });
        if (ts.length - tsLen > 0) {
            tsImport += ', Uq' + type;
        }
    }
    appendArr(uq.tuidArr, 'Tuid', function (v) { return uqBlock(v, buildTuid); });
    appendArr(uq.actionArr, 'Action', function (v) { return uqBlock(v, buildAction); });
    appendArr(uq.sheetArr, 'Sheet', function (v) { return uqBlock(v, buildSheet); });
    appendArr(uq.bookArr, 'Book', function (v) { return uqBlock(v, buildBook); });
    appendArr(uq.queryArr, 'Query', function (v) { return uqBlock(v, buildQuery); });
    appendArr(uq.mapArr, 'Map', function (v) { return uqBlock(v, buildMap); });
    appendArr(uq.historyArr, 'History', function (v) { return uqBlock(v, buildHistory); });
    appendArr(uq.pendingArr, 'Pending', function (v) { return uqBlock(v, buildPending); });
    appendArr(uq.idArr, 'ID', function (v) { return uqBlock(v, buildID); });
    appendArr(uq.idxArr, 'IDX', function (v) { return uqBlock(v, buildIDX); });
    appendArr(uq.ixArr, 'IX', function (v) { return uqBlock(v, buildIX); });
    ts += '\n}\n';
    ts += "\nexport function assign(uq: any, to:string, from:any): void {\n\tlet hasEntity = uq.$.hasEntity(to);\n\tif (hasEntity === false) {\n\t\treturn;\n\t}\n\tObject.assign((uq as any)[to], from);\n}\n";
    tsImport += ' } from "tonva-react";';
    return tsImport + ts;
}
exports.buildUQ = buildUQ;
function uqEntityInterface(entity, buildInterface) {
    var name = entity.name;
    if (name.indexOf('$') > 0)
        return '';
    var entityCode = buildInterface(entity);
    if (!entityCode)
        return '';
    return '\n' + entityCode + '\n';
}
function uqBlock(entity, build) {
    var name = entity.name;
    if (name.indexOf('$') > 0)
        return '';
    var entityCode = build(entity);
    if (!entityCode)
        return '';
    return '\n' + entityCode;
}
function buildFields(fields, isInID, indent) {
    if (isInID === void 0) { isInID = false; }
    if (indent === void 0) { indent = 1; }
    if (!fields)
        return '';
    var ts = '';
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var f_1 = fields_1[_i];
        ts += buildField(f_1, isInID, indent);
    }
    return ts;
}
var fieldTypeMap = {
    "char": "string",
    "text": "string",
    "id": "number",
    "textid": "string",
    "int": "number",
    "bigint": "number",
    "smallint": "number",
    "tinyint": "number",
    "dec": "number",
    "float": "number",
    "double": "number",
};
var sysFields = ['id', 'main', 'row', 'no', '$create', '$update', '$owner'];
function buildField(field, isInID, indent) {
    if (indent === void 0) { indent = 1; }
    var name = field.name, type = field.type;
    var s = fieldTypeMap[type];
    if (!s)
        s = 'any';
    var q = (isInID === true && sysFields.indexOf(name) >= 0) ? '?' : '';
    return "\n" + '\t'.repeat(indent) + name + q + ": " + s + ";";
}
function buildArrs(arrFields) {
    if (!arrFields)
        return '';
    var ts = '\n';
    for (var _i = 0, arrFields_1 = arrFields; _i < arrFields_1.length; _i++) {
        var af = arrFields_1[_i];
        ts += "\t" + (0, tool_1.camelCase)(af.name) + ": {";
        ts += buildFields(af.fields, false, 2);
        ts += '\n\t}[];\n';
    }
    return ts;
}
/*
const typeMap:{[type:string]:string} = {
    action: 'Action',
    query: 'Query',
}
*/
function buildReturns(entity, returns) {
    if (!returns)
        return;
    //let {typeName} = entity;
    //let type = typeMap[typeName] || typeName;
    var sName = entity.sName;
    sName = (0, tool_1.capitalCase)(sName);
    var ts = '';
    for (var _i = 0, returns_1 = returns; _i < returns_1.length; _i++) {
        var ret = returns_1[_i];
        var retName = (0, tool_1.capitalCase)(ret.name);
        ts += "export interface Return" + sName + retName + " {";
        ts += buildFields(ret.fields);
        ts += '\n}\n';
    }
    ts += "export interface Result" + sName + " {\n";
    for (var _a = 0, returns_2 = returns; _a < returns_2.length; _a++) {
        var ret = returns_2[_a];
        var retName = (0, tool_1.capitalCase)(ret.name);
        ts += "\t" + ret.name + ": Return" + sName + retName + "[];\n";
    }
    ts += '}';
    return ts;
}
function buildTuid(tuid) {
    var ts = "\t" + (0, tools_1.entityName)(tuid.sName) + ": UqTuid<Tuid" + (0, tool_1.capitalCase)(tuid.sName) + ">;";
    return ts;
}
function buildTuidInterface(tuid) {
    var ts = "export interface Tuid" + (0, tool_1.capitalCase)(tuid.sName) + " {";
    ts += "\n\tid?: number;";
    ts += buildFields(tuid.fields);
    ts += '\n}';
    return ts;
}
function buildAction(action) {
    var ts = "\t" + (0, tools_1.entityName)(action.sName) + ": UqAction<Param" + (0, tool_1.capitalCase)(action.sName) + ", Result" + (0, tool_1.capitalCase)(action.sName) + ">;";
    return ts;
}
function buildActionInterface(action) {
    var ts = "export interface Param" + (0, tool_1.capitalCase)(action.sName) + " {";
    ts += buildFields(action.fields);
    ts += buildArrs(action.arrFields);
    ts += '\n}\n';
    ts += buildReturns(action, action.returns);
    return ts;
}
function buildEnumInterface(enm) {
    var schema = enm.schema;
    if (!schema)
        return;
    var values = schema.values;
    var ts = "export enum " + (0, tool_1.capitalCase)(enm.sName) + " {";
    var first = true;
    for (var i in values) {
        if (first === false) {
            ts += ',';
        }
        else {
            first = false;
        }
        var v = values[i];
        ts += '\n\t' + i + ' = ';
        if (typeof v === 'string') {
            ts += '"' + v + '"';
        }
        else {
            ts += v;
        }
    }
    return ts += '\n}';
}
function buildQuery(query) {
    var sName = query.sName;
    var ts = "\t" + (0, tools_1.entityName)(sName) + ": UqQuery<Param" + (0, tool_1.capitalCase)(sName) + ", Result" + (0, tool_1.capitalCase)(sName) + ">;";
    return ts;
}
function buildQueryInterface(query) {
    var ts = "export interface Param" + (0, tool_1.capitalCase)(query.sName) + " {";
    ts += buildFields(query.fields);
    ts += '\n}\n';
    ts += buildReturns(query, query.returns);
    return ts;
}
function buildSheet(sheet) {
    var sName = sheet.sName, verify = sheet.verify;
    var cName = (0, tool_1.capitalCase)(sName);
    var v = verify ? "Verify" + cName : 'any';
    var ts = "\t" + (0, tools_1.entityName)(sName) + ": UqSheet<Sheet" + cName + ", " + v + ">;";
    return ts;
}
function buildSheetInterface(sheet) {
    var sName = sheet.sName, fields = sheet.fields, arrFields = sheet.arrFields, verify = sheet.verify;
    var ts = "export interface Sheet" + (0, tool_1.capitalCase)(sName) + " {";
    ts += buildFields(fields);
    ts += buildArrs(arrFields);
    ts += '}';
    if (verify) {
        var returns = verify.returns;
        ts += "\nexport interface Verify" + (0, tool_1.capitalCase)(sName) + " {";
        for (var _i = 0, returns_3 = returns; _i < returns_3.length; _i++) {
            var item = returns_3[_i];
            var arrName = item.name, fields_2 = item.fields;
            ts += '\n\t' + arrName + ': {';
            ts += buildFields(fields_2, false, 2);
            ts += '\n\t}[];';
        }
        ts += '\n}';
    }
    return ts;
}
function buildBook(book) {
    var sName = book.sName;
    var ts = "\t" + (0, tools_1.entityName)(sName) + ": UqBook<Param" + (0, tool_1.capitalCase)(sName) + ", Result" + (0, tool_1.capitalCase)(sName) + ">;";
    return ts;
}
function buildBookInterface(book) {
    var sName = book.sName, fields = book.fields, returns = book.returns;
    var ts = "export interface Param" + (0, tool_1.capitalCase)(sName) + " {";
    ts += buildFields(fields);
    ts += '\n}\n';
    ts += buildReturns(book, returns);
    return ts;
}
function buildMap(map) {
    var sName = map.sName;
    var ts = "\t" + (0, tools_1.entityName)(sName) + ": UqMap;";
    return ts;
}
function buildMapInterface(map) {
    /*
    let {sName, fields, returns} = map;
    let ts = `export interface Param${capitalCaseString(sName)} {`;
    ts += buildFields(fields);
    ts += '\n}\n';
    ts += buildReturns(map, returns);
    return ts;
    */
    return '';
}
function buildHistory(history) {
    var sName = history.sName;
    var ts = "\t" + (0, tools_1.entityName)(sName) + ": UqHistory<Param" + (0, tool_1.capitalCase)(sName) + ", Result" + (0, tool_1.capitalCase)(sName) + ">;";
    return ts;
}
function buildHistoryInterface(history) {
    var sName = history.sName, fields = history.fields, returns = history.returns;
    var ts = "export interface Param" + (0, tool_1.capitalCase)(sName) + " {";
    ts += buildFields(fields);
    ts += '\n}\n';
    ts += buildReturns(history, returns);
    return ts;
}
function buildPending(pending) {
    var sName = pending.sName;
    var ts = "\t" + (0, tools_1.entityName)(sName) + ": UqPending<any, any>;";
    return ts;
}
function buildPendingInterface(pending) {
    /*
    let {sName, fields, returns} = pending;
    let ts = `export interface Param${capitalCaseString(sName)} {`;
    ts += buildFields(fields);
    ts += '\n}\n';
    ts += buildReturns(pending, returns);
    return ts;
    */
    return '';
}
function buildID(id) {
    var sName = id.sName;
    var ts = "\t" + (0, tools_1.entityName)(sName) + ": UqID<any>;";
    return ts;
}
function buildIDX(idx) {
    var sName = idx.sName;
    var ts = "\t" + (0, tools_1.entityName)(sName) + ": UqIDX<any>;";
    return ts;
}
function buildIX(ix) {
    var sName = ix.sName;
    var ts = "\t" + (0, tools_1.entityName)(sName) + ": UqIX<any>;";
    return ts;
}
/*
function buildTagInterface(tag: Tag):string {
    return;
}
*/
function buildIDInterface(idEntity) {
    var sName = idEntity.sName, fields = idEntity.fields, schema = idEntity.schema;
    var schemaKeys = schema.keys;
    var keys = [], others = [];
    var _loop_1 = function (f_2) {
        var name_1 = f_2.name;
        if (name_1 === 'id')
            return "continue";
        if (schemaKeys.find(function (v) { return v.name === name_1; }))
            keys.push(f_2);
        else
            others.push(f_2);
    };
    for (var _i = 0, fields_3 = fields; _i < fields_3.length; _i++) {
        var f_2 = fields_3[_i];
        _loop_1(f_2);
    }
    var ts = "export interface " + (0, tool_1.capitalCase)(sName) + " {";
    ts += "\n\tid?: number;";
    ts += buildFields(keys, true);
    ts += buildFields(others, true);
    ts += '\n}';
    return ts;
}
function buildIDXInterface(idx) {
    var sName = idx.sName, fields = idx.fields, schema = idx.schema;
    var exFields = schema.exFields;
    var ts = "export interface " + (0, tool_1.capitalCase)(sName) + " {";
    var indent = 1;
    for (var _i = 0, fields_4 = fields; _i < fields_4.length; _i++) {
        var field = fields_4[_i];
        var name_2 = field.name, type = field.type;
        var s = fieldTypeMap[type];
        if (!s)
            s = 'any';
        ts += "\n" + '\t'.repeat(indent) + name_2;
        if (name_2 !== 'id')
            ts += '?';
        ts += ": " + s + ";";
    }
    ts += "\n\t$act?: number;";
    var hasTrack = false;
    var hasMemo = false;
    if (exFields) {
        for (var _a = 0, exFields_1 = exFields; _a < exFields_1.length; _a++) {
            var exField = exFields_1[_a];
            var track = exField.track, memo = exField.memo;
            if (track === true)
                hasTrack = true;
            if (memo === true)
                hasMemo = true;
        }
    }
    if (hasTrack === true) {
        ts += "\n\t$track?: number;";
    }
    if (hasMemo === true) {
        ts += "\n\t$memo?: string;";
    }
    ts += '\n}';
    return ts;
}
function buildIDXActParamInterface(idx) {
    var sName = idx.sName, fields = idx.fields, schema = idx.schema;
    var exFields = schema.exFields;
    var ts = "export interface ActParam" + (0, tool_1.capitalCase)(sName) + " {";
    var indent = 1;
    for (var _i = 0, fields_5 = fields; _i < fields_5.length; _i++) {
        var field = fields_5[_i];
        var name_3 = field.name, type = field.type;
        var s = fieldTypeMap[type];
        if (!s)
            s = 'any';
        ts += "\n" + '\t'.repeat(indent) + name_3;
        if (name_3 !== 'id')
            ts += '?';
        ts += ": " + s + "|IDXValue;";
    }
    ts += "\n\t$act?: number;";
    var hasTrack = false;
    var hasMemo = false;
    if (exFields) {
        for (var _a = 0, exFields_2 = exFields; _a < exFields_2.length; _a++) {
            var exField = exFields_2[_a];
            var track = exField.track, memo = exField.memo;
            if (track === true)
                hasTrack = true;
            if (memo === true)
                hasMemo = true;
        }
    }
    if (hasTrack === true) {
        ts += "\n\t$track?: number;";
    }
    if (hasMemo === true) {
        ts += "\n\t$memo?: string;";
    }
    ts += '\n}';
    return ts;
}
function buildIXInterface(ix) {
    var sName = ix.sName, fields = ix.fields;
    var ts = "export interface " + (0, tool_1.capitalCase)(sName) + " {";
    ts += buildFields(fields);
    ts += '\n}';
    return ts;
}
function buildActsInterface(uq) {
    var ts = "\nexport interface ParamActs {";
    uq.idArr.forEach(function (v) {
        var sName = v.sName;
        ts += "\n\t" + (0, tool_1.camelCase)(sName) + "?: " + (0, tool_1.capitalCase)(sName) + "[];";
    });
    uq.idxArr.forEach(function (v) {
        var sName = v.sName;
        ts += "\n\t" + (0, tool_1.camelCase)(sName) + "?: ActParam" + (0, tool_1.capitalCase)(sName) + "[];";
    });
    uq.ixArr.forEach(function (v) {
        var sName = v.sName;
        ts += "\n\t" + (0, tool_1.camelCase)(sName) + "?: " + (0, tool_1.capitalCase)(sName) + "[];";
    });
    ts += '\n}\n';
    return ts;
}
//# sourceMappingURL=buildUQ.js.map