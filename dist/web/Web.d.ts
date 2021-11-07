import { Tonva } from "../Tonva";
import { AppBridge } from "./appBridge";
import { CenterApi } from "./centerApi";
import { CallCenterApi, UnitxApi, UqAppData, UqTokenApi, UserApi } from "./uqApi";
import { HttpChannel } from './httpChannel';
import { GuestApi } from "./guestApi";
import { MessageHub } from "./messageHub";
import { WsBridge } from "./wsChannel";
import { UQsMan, TVs } from "../uq";
import { AppConfig, UqConfig } from "../app";
export interface PromiseValue<T> {
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}
export declare class Web {
    centerHost: string;
    centerToken: string | undefined;
    loginedUserId: number;
    centerChannelUI: HttpChannel;
    centerChannel: HttpChannel;
    channelUIs: {
        [name: string]: HttpChannel | (PromiseValue<any>[]);
    };
    channelNoUIs: {
        [name: string]: HttpChannel | (PromiseValue<any>[]);
    };
    channels: {
        [unitId: number]: HttpChannel;
    };
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
    constructor(tonva: Tonva);
    logoutApis(): void;
    setCenterUrl(url: string): void;
    setCenterToken(userId: number, t?: string): void;
    getCenterChannelUI(): HttpChannel;
    getCenterChannel(): HttpChannel;
    setNetToken(userId: number, token: string): void;
    clearNetToken(): void;
    isBuildingUQ: boolean;
    _uqs: any;
    uqsMan: UQsMan;
    build(appConfig: AppConfig): Promise<string[]>;
    buildUQs(uqsConfig: AppConfig): Promise<string[]>;
    private loadApp;
    loadUqs(uqConfigs: UqConfig[], version: string, tvs: TVs): Promise<string[]>;
    loadAppUqs(appOwner: string, appName: string): Promise<UqAppData>;
    private _loadUqs;
}
