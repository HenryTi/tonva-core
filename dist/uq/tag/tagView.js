"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagView = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var radioStyle = { height: 'auto' };
var TagView = /** @class */ (function () {
    function TagView(tag) {
        this.tag = tag;
    }
    TagView.prototype.render = function (values) {
        var names;
        if (typeof values === 'number') {
            names = [this.tag.nameFromId(values)];
        }
        else {
            names = this.tag.namesFromIds(values);
        }
        return (0, jsx_runtime_1.jsx)("div", __assign({ className: "d-flex flex-wrap " }, { children: names.map(function (name, index) {
                return (0, jsx_runtime_1.jsx)("div", __assign({ className: "mx-2 border border-muted rounded px-3 bg-light" }, { children: name }), index);
            }) }), void 0);
    };
    TagView.prototype.renderRadios = function (value, options) {
        var _this = this;
        var content = this.tag.values.map(function (item, index) {
            return (0, jsx_runtime_1.jsx)("div", __assign({ className: "col" }, { children: _this.renderRadio(item, value, options) }), index);
        });
        return this.renderView(options, content);
    };
    TagView.prototype.renderChecks = function (values, options) {
        var _this = this;
        var arr = values === undefined ? undefined : values.split('|').map(function (v) { return Number(v); });
        var content = this.tag.values.map(function (item, index) {
            var checked = arr === undefined ? undefined : arr.indexOf(item.id) >= 0;
            return (0, jsx_runtime_1.jsx)("div", __assign({ className: "col" }, { children: _this.renderCheck(item, checked, options) }), index);
        });
        return this.renderView(options, content);
    };
    TagView.prototype.renderView = function (options, content) {
        var className = options.className, wrapClassName = options.wrapClassName;
        wrapClassName = wrapClassName ?
            'row ' + wrapClassName
            :
                'row row-cols-2 row-cols-sm-3 row-cols-md-4';
        return (0, jsx_runtime_1.jsx)("div", __assign({ className: className, style: radioStyle }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: wrapClassName }, { children: content }), void 0) }), void 0);
    };
    TagView.prototype.renderRadio = function (item, value, options) {
        var id = item.id, name = item.name;
        var inputs = options.inputs, inputName = options.inputName, onInputChange = options.onInputChange;
        var ref = inputs && (function (input) { return inputs[id] = input; });
        return (0, jsx_runtime_1.jsxs)("label", __assign({ className: "form-radio-inline" }, { children: [(0, jsx_runtime_1.jsx)("input", { ref: ref, type: "radio", name: inputName, value: id, defaultChecked: value === id, onChange: onInputChange }, void 0), name] }), void 0);
    };
    TagView.prototype.renderCheck = function (item, checked, options) {
        var id = item.id, name = item.name;
        var inputs = options.inputs, onInputChange = options.onInputChange;
        var ref = inputs && (function (input) { return inputs[id] = input; });
        return (0, jsx_runtime_1.jsxs)("label", __assign({ className: "form-radio-inline" }, { children: [(0, jsx_runtime_1.jsx)("input", { ref: ref, type: "checkbox", value: id, defaultChecked: checked, onChange: onInputChange }, void 0), name] }), void 0);
    };
    return TagView;
}());
exports.TagView = TagView;
//# sourceMappingURL=tagView.js.map