"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFieldItem = void 0;
var tool_1 = require("../../tool");
function buildFieldItem(field, isKey) {
    var $FieldItemType, fieldItemType, widget;
    var name = field.name, type = field.type;
    switch (type) {
        case 'id':
            $FieldItemType = 'FieldItemId';
            fieldItemType = 'id';
            break;
        case 'char':
            $FieldItemType = 'FieldItemString';
            fieldItemType = 'string';
            widget = 'string';
            break;
        case 'smallint':
        case 'int':
        case 'bigint':
            $FieldItemType = 'FieldItemInt';
            fieldItemType = 'integer';
            widget = 'updown';
            break;
        case 'dec':
        case 'float':
        case 'double':
            $FieldItemType = 'FieldItemNum';
            fieldItemType = 'number';
            widget = 'number';
            break;
    }
    return {
        name: name,
        type: fieldItemType,
        isKey: isKey,
        widget: widget,
        label: (0, tool_1.capitalCase)(name),
        $FieldItemType: $FieldItemType,
    };
}
exports.buildFieldItem = buildFieldItem;
//# sourceMappingURL=fieldItem.js.map