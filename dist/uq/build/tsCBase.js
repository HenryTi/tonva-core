"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTsCBase = void 0;
var tools_1 = require("./tools");
function buildTsCBase() {
    return (0, tools_1.buildTsHeader)() + "\nimport { CSub, CBase, CAppBase, IConstructor } from 'tonva-react';\nimport { UQs } from './uqs';\nimport { CApp } from './CApp';\n\nexport abstract class CUqBase extends CBase<CApp, UQs> {\n}\n\nexport abstract class CUqSub<A extends CAppBase<U>, U, T extends CBase<A,U>> extends CSub<A, U, T> {\n}\n\nexport abstract class CUqApp extends CAppBase<UQs> {\n\tprotected newC<T extends CUqBase>(type: IConstructor<T>, ...param:any[]): T {\n\t\tlet c = new type(this);\n\t\tc.internalInit(...param);\n\t\treturn c;\n\t}\n}\n";
}
exports.buildTsCBase = buildTsCBase;
//# sourceMappingURL=tsCBase.js.map