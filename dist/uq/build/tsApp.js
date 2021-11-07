"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTsApp = void 0;
var tools_1 = require("./tools");
function buildTsApp() {
    return (0, tools_1.buildTsHeader)() + "\nimport { NavView, start, nav } from 'tonva-react';\nimport { CApp } from './CApp';\nimport { appConfig } from './appConfig';\n\nexport const App: React.FC = () => {\n\tnav.setSettings(appConfig);\n\tconst onLogined = async (isUserLogin?:boolean) => {\n\t\tawait start(CApp, appConfig, isUserLogin);\n\t}\n\treturn <NavView onLogined={onLogined} />;\n}\n\n";
}
exports.buildTsApp = buildTsApp;
//# sourceMappingURL=tsApp.js.map