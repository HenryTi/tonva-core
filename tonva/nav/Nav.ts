import { AppConfig } from "../app";
import { User } from "../tool";
import { Navigo, RouteFunc, Hooks, NamedRoute  } from "./navigo";

export class Nav {
	async init() {
		throw new Error('Method not implemented.');
	}
	setUqRoles(uq: string, roles: string[]) {
		throw new Error("Method not implemented.");
	}
	onChangeLogin: (user: User) => Promise<void>;
	resolveRoute() {
		throw new Error("Method not implemented.");
	}
	navSettings: AppConfig;
    setSettings(appConfig: AppConfig) {
        throw new Error("Method not implemented.");
    }
	reload() {
		throw new Error('Method not implemented.');
	}
	showReloadPage(msg: string) {
		throw new Error('Method not implemented.');
	}
    language: string;
    culture: string;
    logout() {
        throw new Error('Method not implemented.');
    }
    navigate(url: string) {
        throw new Error('Method not implemented.');
    }
    push<E>(page: E, disposer: () => void) {
        throw new Error('Method not implemented.');
    }
    replace<E>(page: E, onClosePage: () => void) {
        throw new Error('Method not implemented.');
    }
    back() {
        throw new Error('Method not implemented.');
    }
    pop(level: number) {
        throw new Error('Method not implemented.');
    }
    ceaseTop(level: number) {
        throw new Error('Method not implemented.');
    }
    go(showPage: () => void, url: string, absolute: boolean) {
        throw new Error('Method not implemented.');
    }
    removeCeased() {
        throw new Error('Method not implemented.');
    }
    regConfirmClose(confirmClose: () => Promise<boolean>) {
        throw new Error('Method not implemented.');
    }
    topKey(): any {
        throw new Error('Method not implemented.');
    }
    popTo(topPageKey: any) {
        throw new Error('Method not implemented.');
    }
	private navigo: Navigo;
	isWebNav:boolean = false;
    user: User;

    navBack() {
    }
    
    async onReceive(msg:any) {
    }

    async showAppView() {
    }

    startWait() {        
    }

    endWait() {
    }

    async onError(error: any) {
    }

    async showUpgradeUq(uq:string, version:number) {
    }


	on(routeFunc:RouteFunc, hooks?:Hooks):Navigo;
	on(url:string, routeFunc:RouteFunc, hooks?:Hooks):Navigo;
	on(regex:RegExp, routeFunc:RouteFunc, hooks?:Hooks):Navigo;
	on(options: {[url:string]: RouteFunc|NamedRoute}):Navigo;
	on(...args:any[]):Navigo {
		if (this.navigo === undefined) {
			this.navigo = new Navigo();
			if (this.isWebNav !== true) this.navigo.historyAPIUpdateMethod('replaceState');
		}
		return this.navigo.on(args[0], args[1], args[2]);
	}
}
