"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTsIndex = void 0;
var tools_1 = require("./tools");
function buildTsIndex() {
    return (0, tools_1.buildTsHeader)() + "\nexport { CUqApp, CUqBase, CUqSub } from './CBase';\nexport { CApp } from './CApp';\nexport * from './uqs';\nexport * from './App';\n";
}
exports.buildTsIndex = buildTsIndex;
//# sourceMappingURL=tsIndex.js.map