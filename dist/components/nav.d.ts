import * as React from 'react';
import { User, Guest } from '../tool/user';
import { FetchError } from '../net/fetchError';
import { Navigo, RouteFunc, Hooks, NamedRoute } from './navigo';
import 'font-awesome/css/font-awesome.min.css';
import '../css/va-form.css';
import '../css/va.css';
import '../css/animation.css';
import { PageWebNav } from './page';
import { Login } from './login';
export declare type NavPage = (params: any) => Promise<void>;
export interface Props {
    onLogined: (isUserLogin?: boolean) => Promise<void>;
    notLogined?: () => Promise<void>;
    userPassword?: () => Promise<{
        user: string;
        password: string;
    }>;
}
export interface StackItem {
    key: number;
    view: JSX.Element;
    ceased: boolean;
    confirmClose?: () => Promise<boolean>;
    disposer?: () => void;
}
export interface NavViewState {
    notSupportedBrowser: boolean;
    stack: StackItem[];
    wait: 0 | 1 | 2;
    fetchError: FetchError;
}
export declare class NavView extends React.Component<Props, NavViewState> {
    private stack;
    private waitCount;
    private waitTimeHandler?;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    get level(): number;
    startWait(): void;
    endWait(): void;
    onError(fetchError: FetchError): Promise<void>;
    private upgradeUq;
    showUpgradeUq(uq: string, version: number): Promise<void>;
    show(view: JSX.Element, disposer?: () => void): number;
    push(view: JSX.Element, disposer?: () => void): number;
    replace(view: JSX.Element, disposer?: () => void): number;
    ceaseTop(level?: number): void;
    pop(level?: number): void;
    popTo(key: number): void;
    topKey(): number;
    removeCeased(): void;
    private popAndDispose;
    private dispose;
    clear(): void;
    regConfirmClose(confirmClose: () => Promise<boolean>): void;
    private isHistoryBack;
    navBack: () => void;
    back: (confirm?: boolean) => Promise<void>;
    confirmBox(message?: string): boolean;
    clearError: () => void;
    render(): JSX.Element;
    private refresh;
}
export interface NavSettings {
    oem?: string;
    loginTop?: JSX.Element;
    privacy?: string;
    htmlTitle?: string;
}
export declare class Nav {
    private navView;
    private wsHost;
    private local;
    private navigo;
    navSettings: NavSettings;
    user: User;
    testing: boolean;
    language: string;
    culture: string;
    resUrl: string;
    constructor();
    get guest(): number;
    set(navView: NavView): void;
    onReceive(msg: any): Promise<void>;
    private loadUnitJson;
    private getPredefinedUnitName;
    private loadPredefinedUnit;
    setSettings(settings?: NavSettings): void;
    get oem(): string;
    hashParam: string;
    private centerHost;
    private arrs;
    private unitJsonPath;
    private windowOnError;
    private windowOnUnhandledRejection;
    private windowOnClick;
    private windowOnMouseMove;
    private windowOnScroll;
    forceDevelopment: boolean;
    init(): Promise<void>;
    reloadUser: () => void;
    start(): Promise<void>;
    resolveRoute(): void;
    on(routeFunc: RouteFunc, hooks?: Hooks): Navigo;
    on(url: string, routeFunc: RouteFunc, hooks?: Hooks): Navigo;
    on(regex: RegExp, routeFunc: RouteFunc, hooks?: Hooks): Navigo;
    on(options: {
        [url: string]: RouteFunc | NamedRoute;
    }): Navigo;
    private navLogin;
    private navLogout;
    private navRegister;
    private navForget;
    navigateToLogin(): void;
    openSysPage(url: string): boolean;
    private navPageRoutes;
    private routeFromNavPage;
    onNavRoute(navPage: NavPage): void;
    private doneSysRoutes;
    private sysRoutes;
    onNavRoutes(navPageRoutes: {
        [url: string]: NavPage;
    }): void;
    private internalOnNavRoutes;
    isWebNav: boolean;
    backIcon: JSX.Element;
    closeIcon: JSX.Element;
    setIsWebNav(): void;
    pageWebNav: PageWebNav;
    navigate(url: string, absolute?: boolean): Navigo;
    go(showPage: () => void, url: string, absolute?: boolean): void;
    showAppView(isUserLogin?: boolean): Promise<void>;
    setGuest(guest: Guest): void;
    saveLocalUser(): void;
    setUqRoles(uq: string, roles: string[]): void;
    loadMe(): Promise<void>;
    private internalLogined;
    onChangeLogin: (user: User) => Promise<void>;
    logined(user: User, callback?: (user: User) => Promise<void>): Promise<void>;
    userLogined(user: User, callback?: (user: User) => Promise<void>): Promise<void>;
    loginTop(defaultTop: JSX.Element): JSX.Element;
    privacyEntry(): JSX.Element;
    private getPrivacyContent;
    showPrivacyPage: () => void;
    private privacyPage;
    private createLogin;
    setCreateLogin(createLogin: () => Promise<Login>): void;
    private login;
    private getLogin;
    showLogin(callback?: (user: User) => Promise<void>, withBack?: boolean): Promise<void>;
    showLogout(callback?: () => Promise<void>): Promise<void>;
    showRegister(): Promise<void>;
    showForget(): Promise<void>;
    logout(callback?: () => Promise<void>): Promise<void>;
    changePassword(): Promise<void>;
    userQuit(): Promise<void>;
    get level(): number;
    startWait(): void;
    endWait(): void;
    onError(error: FetchError): Promise<void>;
    showUpgradeUq(uq: string, version: number): Promise<void>;
    show(view: JSX.Element, disposer?: () => void): void;
    push(view: JSX.Element, disposer?: () => void): void;
    replace(view: JSX.Element, disposer?: () => void): void;
    pop(level?: number): void;
    topKey(): number;
    popTo(key: number): void;
    clear(): void;
    navBack(): void;
    ceaseTop(level?: number): void;
    removeCeased(): void;
    back(confirm?: boolean): Promise<void>;
    regConfirmClose(confirmClose: () => Promise<boolean>): void;
    confirmBox(message?: string): boolean;
    get logs(): string[];
    log(msg: string): void;
    logMark(): void;
    logStep(step: string): void;
    showReloadPage(msg: string): void;
    reload: () => Promise<void>;
    resetAll: () => void;
    checkVersion(): Promise<string>;
}
export declare const nav: Nav;
export declare class TonvaView extends NavView {
}
