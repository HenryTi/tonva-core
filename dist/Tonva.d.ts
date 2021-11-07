import { AppConfig, CAppBase } from "./app";
import { Nav } from "./nav";
import { UQsMan } from "./uq";
import { Web } from "./web";
export declare class Tonva {
    private uqsConfig;
    constructor(uqsConfig: AppConfig);
    nav: Nav;
    web: Web;
    uqsMan: UQsMan;
    start<E>(CApp: new (config: AppConfig) => CAppBase<E, any>, appConfig: AppConfig, isUserLogin?: boolean): Promise<void>;
    startPage<E>(CApp: new (config: AppConfig) => CAppBase<E, any>, appConfig: AppConfig): Promise<void>;
}
