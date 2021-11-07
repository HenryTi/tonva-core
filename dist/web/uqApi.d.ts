import { HttpChannel } from './httpChannel';
import { ApiBase } from './apiBase';
import { Web } from './Web';
export declare class UqApi extends ApiBase {
    uqOwner: string;
    uqName: string;
    uq: string;
    constructor(web: Web, basePath: string, uqOwner: string, uqName: string, showWaiting?: boolean);
    init(): Promise<void>;
    protected getHttpChannel(): Promise<HttpChannel>;
    loadEntities(): Promise<any>;
    getAdmins(): Promise<{
        id: number;
        role: number;
    }[]>;
    getRoles(): Promise<string[]>;
    getAllRoleUsers(): Promise<{
        user: number;
        admin: number;
        roles: string;
    }[]>;
    setUserRoles(theUser: number, roles: string): Promise<void>;
    deleteUserRoles(theUser: number): Promise<void>;
    allSchemas(): Promise<any>;
    schema(name: string): Promise<any>;
    queueModify(start: number, page: number, entities: string): Promise<any>;
}
export declare class UnitxApi extends UqApi {
    private unitId;
    constructor(web: Web, unitId: number);
    protected getHttpChannel(): Promise<HttpChannel>;
    private buildChannel;
}
export declare abstract class CenterApiBase extends ApiBase {
    protected getHttpChannel(): Promise<HttpChannel>;
}
export declare class UqTokenApi extends CenterApiBase {
    static clearLocal(): void;
    private localMap;
    uq(params: {
        unit: number;
        uqOwner: string;
        uqName: string;
    }): Promise<any>;
}
export declare class CallCenterApi extends CenterApiBase {
    directCall(url: string, method: string, body: any): Promise<any>;
}
export interface UqAppData {
    appName: string;
    appOwner: string;
    id: number;
    version: string;
    uqs: UqData[];
}
export interface UqData {
    id: number;
    uqOwner: string;
    ownerAlias: string;
    uqName: string;
    uqAlias: string;
    access: string;
    newVersion: boolean;
}
export interface UqServiceData {
    id: number;
    db: string;
    url: string;
    urlTest: string;
    token: string;
}
export declare class CenterAppApi extends CenterApiBase {
    appUqs(appOwner: string, appName: string): Promise<UqAppData>;
    uqs(uqs: {
        owner: string;
        name: string;
        version: string;
    }[]): Promise<UqData[]>;
    unitxUq(unit: number): Promise<UqServiceData>;
    changePassword(param: {
        orgPassword: string;
        newPassword: string;
    }): Promise<any>;
    userQuit(): Promise<void>;
}
export interface RegisterParameter {
    nick: string;
    user: string;
    pwd: string;
    country: number;
    mobile: number;
    mobileCountry: number;
    email: string;
    verify: string;
}
export declare class UserApi extends CenterApiBase {
    login(params: {
        user: string;
        pwd: string;
        guest: number;
    }): Promise<any>;
    register(params: RegisterParameter): Promise<any>;
    sendVerify(account: string, type: 'mobile' | 'email', oem: string): Promise<any>;
    checkVerify(account: string, verify: string): Promise<any>;
    isExists(account: string): Promise<any>;
    resetPassword(account: string, password: string, verify: string, type: 'mobile' | 'email'): Promise<any[]>;
    userSetProp(prop: string, value: any): Promise<void>;
    me(): Promise<any>;
    user(id: number): Promise<any>;
    fromKey(key: string): Promise<{
        id: number;
        name: string;
        nick: string;
        icon: string;
    }>;
}
