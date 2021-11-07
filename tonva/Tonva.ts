import { AppConfig, CAppBase } from "./app";
import { Nav } from "./nav";
import { UQsMan } from "./uq";
import { Web } from "./web";

export class Tonva {
    private uqsConfig: AppConfig;
    constructor(uqsConfig: AppConfig) {
        this.uqsConfig = uqsConfig;
    }

    nav: Nav;
    web: Web;
    uqsMan: UQsMan;

    async start<E>(CApp: new (config: AppConfig) => CAppBase<E, any>, appConfig: AppConfig, isUserLogin?:boolean) {
        if (appConfig) {
            let {htmlTitle} = appConfig;
            if (htmlTitle) {
                document.title = htmlTitle;
            }
            let html = document.getElementsByTagName('html');
            let html0 = html[0];
            if (html0) {
                let version = html0?.getAttribute('data-version');
                if (version) {
                    //appConfig.version = version;
                }
            }
        }
    
        let cApp = new CApp(appConfig);
        await cApp.start(isUserLogin);
    }

    async startPage<E>(CApp: new (config: AppConfig) => CAppBase<E, any>, appConfig: AppConfig) {
        this.nav.setSettings(appConfig);
    
        let cApp = new CApp(appConfig);
        cApp.internalInit();
        await cApp.start();
    }
}
