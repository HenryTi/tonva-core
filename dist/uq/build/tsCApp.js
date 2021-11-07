"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTsCApp = void 0;
var tools_1 = require("./tools");
function buildTsCApp() {
    return (0, tools_1.buildTsHeader)() + "\nimport { CUqApp } from \"./CBase\";\nimport { res } from \"./res\";\nimport { VMain } from \"./VMain\";\nimport { setUI } from \"./uqs\";\n\nconst gaps = [10, 3,3,3,3,3,5,5,5,5,5,5,5,5,10,10,10,10,15,15,15,30,30,60];\n\nexport class CApp extends CUqApp {\n\tprotected async internalStart(isUserLogin: boolean) {\n\t\tthis.setRes(res);\n\t\tsetUI(this.uqs);\n\t\t\n\t\tthis.openVPage(VMain, undefined, this.dispose);\n\t}\n\n\tprivate timer:any;\n\tprotected onDispose() {\n\t\tclearInterval(this.timer);\n\t\tthis.timer = undefined;\n\t}\n\n\tprivate tick = 0;\n\tprivate gapIndex = 0;\n\tprivate callTick = async () => {\n\t\ttry {\n\t\t\tif (!this.user) return;\n\t\t\t++this.tick;\n\t\t\tif (this.tick<gaps[this.gapIndex]) return;\n\t\t\tthis.tick = 0;\n\t\t\tif (this.gapIndex < gaps.length - 1) ++this.gapIndex;\n\t\t\tlet ret = await this.uqs.BzHelloTonva.$poked.query(undefined, false);\n\t\t\tlet v = ret.ret[0];\n\t\t\tif (v === undefined) return;\n\t\t\tif (!v.poke) return;\n\t\t\tthis.gapIndex = 1;\n\n\t\t\t// \u6570\u636E\u670D\u52A1\u5668\u63D0\u9192\u5BA2\u6237\u7AEF\u5237\u65B0\uFF0C\u4E0B\u9762\u4EE3\u7801\u91CD\u65B0\u8C03\u5165\u7684\u6570\u636E\n\t\t\t//this.cHome.refresh();\n\t\t}\n\t\tcatch {\n\t\t}\n\t}\n}\n";
}
exports.buildTsCApp = buildTsCApp;
//# sourceMappingURL=tsCApp.js.map