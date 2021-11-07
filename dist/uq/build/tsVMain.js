"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTsVMain = void 0;
var tools_1 = require("./tools");
function buildTsVMain() {
    return (0, tools_1.buildTsHeader)() + "\nimport { VPage, Page } from 'tonva-react';\nimport { CApp } from './CApp';\n\nexport class VMain extends VPage<CApp> {\n\theader() { return 'TEST'; }\n\tcontent() {\n\t\treturn <div className=\"m-3\">\n\t\t\t<div>{this.renderMe()}</div>\n\t\t\t<div className=\"mb-5\">\u540C\u82B1\u6837\u4F8B\u4E3B\u9875\u9762</div>\n\t\t</div>;\n\t}\n}\n";
}
exports.buildTsVMain = buildTsVMain;
//# sourceMappingURL=tsVMain.js.map