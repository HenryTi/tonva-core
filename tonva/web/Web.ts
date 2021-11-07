import { Tonva } from "../Tonva";
import { AppBridge } from "./appBridge";
import { CenterApi } from "./centerApi";
import { UqData, CallCenterApi, CenterAppApi, UnitxApi, UqAppData, UqTokenApi, UserApi } from "./uqApi";
import { HttpChannel, CenterHttpChannel, UqHttpChannel } from './httpChannel';
import { GuestApi } from "./guestApi";
import { MessageHub } from "./messageHub";
import { HttpChannelNavUI } from "./httpChannelUI";
import { WsBridge, WSChannel } from "./wsChannel";
import { UQsMan, UQsManApp, TVs } from "../uq";
import { AppConfig, UqConfig } from "../app";

export interface PromiseValue<T> {
	resolve: (value?: T | PromiseLike<T>) => void;
	reject: (reason?: any) => void;
}

export class Web {
    centerHost:string;
    centerToken:string|undefined = undefined;
    loginedUserId:number = 0;    
    centerChannelUI:HttpChannel;
    centerChannel:HttpChannel;

    channelUIs:{[name:string]: HttpChannel|(PromiseValue<any>[])} = {};
    channelNoUIs:{[name:string]: HttpChannel|(PromiseValue<any>[])} = {};
    channels:{[unitId:number]: HttpChannel} = {};

    readonly tonva: Tonva;
    readonly centerApi: CenterApi;
    readonly appBridge: AppBridge;
    readonly userApi: UserApi;
    readonly uqTokenApi: UqTokenApi;
    readonly callCenterapi: CallCenterApi;
    readonly unitxApi: UnitxApi;
    readonly guestApi: GuestApi;
    readonly messageHub: MessageHub;
    readonly wsBridge: WsBridge;

    constructor(tonva: Tonva) {
        this.tonva = tonva;
        this.centerApi = new CenterApi(this, '/tv', undefined);
        this.appBridge = new AppBridge(this);
        this.userApi = new UserApi(this, 'tv/', undefined);
        this.uqTokenApi = new UqTokenApi(this, 'tv/tie/', undefined);
        this.callCenterapi = new CallCenterApi(this, '', undefined);
        let unitId: number = 0;
        this.unitxApi = new UnitxApi(this, unitId);
        this.guestApi = new GuestApi(this, 'tv/guest/', undefined);
        this.messageHub = new MessageHub(this);
        this.wsBridge = new WsBridge(this);
    }
    
    logoutApis() {
        this.channelUIs = {};
        this.channelNoUIs = {};
        this.channels = {};
        this.appBridge.logoutUqTokens();
    }

    setCenterUrl(url:string) {
        console.log('setCenterUrl %s', url);
        this.centerHost = url;
        this.centerChannel = undefined;
        this.centerChannelUI = undefined;
    }
    
    setCenterToken(userId:number, t?:string) {
        this.loginedUserId = userId;
        this.centerToken = t;
        this.centerChannel = undefined;
        this.centerChannelUI = undefined;
    }

    getCenterChannelUI():HttpChannel {
        if (this.centerChannelUI !== undefined) return this.centerChannelUI;
        this.centerChannelUI = new CenterHttpChannel(this, this.centerHost, this.centerToken, new HttpChannelNavUI(this));
    }
    
    getCenterChannel():HttpChannel {
        if (this.centerChannel !== undefined) return this.centerChannel;
        return this.centerChannel = new CenterHttpChannel(this, this.centerHost, this.centerToken);
    }

    setNetToken(userId:number, token:string) {
        this.setCenterToken(userId, token);
        WSChannel.setCenterToken(token);
    }

    clearNetToken() {
        this.setCenterToken(0, undefined);
        WSChannel.setCenterToken(undefined);
    }
    
	isBuildingUQ: boolean = false;
	_uqs: any;
	uqsMan: UQsMan;

	async build(appConfig: AppConfig) {
		let {app, uqs, tvs, version} = appConfig;
		let retErrors:string[];
		if (app) {
			retErrors = await this.loadApp(appConfig);
		}
		else if (uqs) {
			retErrors = await this.loadUqs(uqs, version, tvs);
		}
		else {
			throw new Error('either uqs or app must be defined in AppConfig');
		}
		return retErrors;
	}

	async buildUQs(uqsConfig: AppConfig) {
		let {uqs, tvs, version} = uqsConfig;
		let retErrors:string[];
		if (uqs) {
			this.isBuildingUQ = true;
			retErrors = await this.loadUqs(uqs, version, tvs);
		}
		else {
			throw new Error('either uqs or app must be defined in AppConfig');
		}
		return retErrors;
	}

	// 返回 errors, 每个uq一行
	private async loadApp(appConfig: AppConfig):Promise<string[]> {
		let {app, uqs:uqConfigs, tvs, version} = appConfig;

		let {name, dev} = app;
		let uqsMan = this.uqsMan = new UQsManApp(this, `${dev.name}/${name}`, tvs);
        let {appOwner, appName} = uqsMan;
        let {localData} = uqsMan;
        let uqAppData:UqAppData = localData.get();
        if (!uqAppData || uqAppData.version !== version) {
			uqAppData = await this.loadAppUqs(appOwner, appName);
			if (!uqAppData.id) {
				return [
					`${appOwner}/${appName}不存在。请仔细检查app全名。`
				];
			}
            uqAppData.version = version;

			if (uqConfigs) {
				let data = await this._loadUqs(uqConfigs);
				uqAppData.uqs.push(...data);
			}

            localData.set(uqAppData);
            // 
            for (let uq of uqAppData.uqs) uq.newVersion = true;
        }
        let {id, uqs} = uqAppData;
		uqsMan.id = id;
		return await uqsMan.buildUqs(uqs, version, uqConfigs);
	}

	// 返回 errors, 每个uq一行
	async loadUqs(uqConfigs: UqConfig[], version:string, tvs:TVs):Promise<string[]> {
		this.uqsMan = new UQsMan(this, tvs);
		let uqs = await this._loadUqs(uqConfigs);
		return await this.uqsMan.buildUqs(uqs, version, uqConfigs);
	}

    async loadAppUqs(appOwner:string, appName:string): Promise<UqAppData> {
        let centerAppApi = new CenterAppApi(this, 'tv/', undefined);
        let ret = await centerAppApi.appUqs(appOwner, appName);
        return ret;
    }
    
    private async _loadUqs(uqConfigs: UqConfig[]): Promise<UqData[]> {
        let uqs: {owner:string; ownerAlias: string; name:string; alias:string; version:string}[] = uqConfigs.map(
            v => {
                let {dev, name, version, alias} =v;
                let {name:owner, alias:ownerAlias} = dev;
                return {owner, ownerAlias, name, version, alias};
            }
        );
        let centerAppApi = new CenterAppApi(this, 'tv/', undefined);
        let ret:UqData[] = await centerAppApi.uqs(uqs);
        if (ret.length < uqs.length) {
            let err = `下列UQ：\n${uqs.map(v => `${v.owner}/${v.name}`).join('\n')}之一不存在`;
            console.error(err);
            throw Error(err);
        }
        for (let i=0; i<uqs.length; i++) {
            let {ownerAlias, alias} = uqs[i];
            ret[i].ownerAlias = ownerAlias;
            ret[i].uqAlias = alias;
        }
        return ret;
    }
}
