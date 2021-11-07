/// <reference types="react" />
import { RouteFunc, Hooks, Navigo, NamedRoute } from "../nav";
import { ControllerCore, VPageCore } from '../vm';
import { TVs } from "../uq";
import { User } from "../tool";
import { Tonva } from "../Tonva";
export interface IConstructor<T> {
    new (...args: any[]): T;
}
export interface DevConfig {
    name: string;
    alias?: string;
    memo?: string;
}
export interface UqConfig {
    dev: DevConfig;
    name: string;
    alias?: string;
    version?: string;
    memo?: string;
}
export interface UqsConfig {
    app?: {
        dev: DevConfig;
        name: string;
        version?: string;
    };
    uqs?: UqConfig[];
}
export interface AppConfig extends UqsConfig {
    version: string;
    tvs?: TVs;
    loginTop?: JSX.Element;
    oem?: string;
    privacy?: string;
    noUnit?: boolean;
    htmlTitle?: string;
}
export interface Elements {
    [id: string]: (element: HTMLElement) => void;
}
export declare abstract class CAppBase<E, U> extends ControllerCore<E> {
    private appConfig;
    protected _uqs: U;
    tonva: Tonva;
    timezone: number;
    unitTimezone: number;
    constructor(tonva: Tonva, config?: AppConfig);
    get uqs(): U;
    internalT(str: string): any;
    setRes(res: any): void;
    protected afterBuiltUQs(uqs: any): void;
    private uqsUser;
    protected initUQs(): Promise<any>;
    protected abstract get VErrorsPage(): new (c: this) => VPageCore<E, this>;
    protected abstract get VStartError(): new (c: this) => VPageCore<E, this>;
    protected beforeStart(): Promise<boolean>;
    protected afterStart(): Promise<void>;
    userFromId(userId: number): Promise<any>;
    protected on(routeFunc: RouteFunc, hooks?: Hooks): Navigo;
    protected on(url: string, routeFunc: RouteFunc, hooks?: Hooks): Navigo;
    protected on(regex: RegExp, routeFunc: RouteFunc, hooks?: Hooks): Navigo;
    protected on(options: {
        [url: string]: RouteFunc | NamedRoute;
    }): Navigo;
    protected onNavRoutes(): void;
    getUqRoles(uqName: string): Promise<string[]>;
    isAdmin(roles: string[]): boolean;
    isRole(roles: string[], role: string): boolean;
    protected onChangeLogin(user: User): Promise<void>;
}
