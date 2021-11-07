/// <reference types="react" />
import { User } from '../tool';
import { VPageCore } from './vpage';
import { ViewCore } from './view';
import { Nav } from '../nav';
import { Tonva } from '../Tonva';
import { PageHeaderPropsCore, PageWebNavCore } from '../nav';
export interface ConfirmOptionsCore<E> {
    caption?: string;
    message: string | E;
    classNames?: string;
    ok?: string;
    yes?: string;
    no?: string;
}
export interface WebNavCore<E, C extends ControllerCore<E>> {
    VNavHeader?: new (controller: C) => ViewCore<E, C>;
    VNavRawHeader?: new (controller: C) => ViewCore<E, C>;
    VNavFooter?: new (controller: C) => ViewCore<E, C>;
    VNavRawFooter?: new (controller: C) => ViewCore<E, C>;
    renderPageHeader?: (props: PageHeaderPropsCore<E>) => JSX.Element;
}
export declare abstract class ControllerBaseCore<E> {
    protected readonly nav: Nav;
    constructor(nav: Nav);
    protected res: any;
    t: (str: string) => string | JSX.Element;
    icon: string | JSX.Element;
    label: string | JSX.Element;
    readonly isDev: boolean;
    pageWebNav: PageWebNavCore<E>;
    get user(): User;
    get isLogined(): boolean;
    protected beforeInit(): void;
    protected afterInit(): void;
    internalInit(...param: any[]): void;
    init(...param: any[]): void;
    internalT(str: string): any;
    get webNav(): WebNavCore<E, any>;
    getWebNav(): WebNavCore<E, any>;
    getPageWebNav(): PageWebNavCore<E>;
    get isWebNav(): boolean;
    navigate(url: string): void;
    setRes(res: any): void;
    getRes(): any;
    protected onDispose(): void;
    isMe(id: any): boolean;
    protected openVPage<C extends ControllerCore<E>, P extends VPageCore<E, C>>(vp: new (controller: C) => P, param?: any, afterBack?: (ret: any) => void): Promise<P>;
    protected replaceVPage<C extends ControllerCore<E>, P extends VPageCore<E, C>>(vp: new (controller: C) => P, param?: any, afterBack?: (ret: any) => void): Promise<P>;
    protected renderView<C extends ControllerCore<E>, V extends ViewCore<E, C>>(view: new (controller: C) => V, param?: any): E;
    event(type: string, value: any): Promise<void>;
    protected onEvent(type: string, value: any): Promise<void>;
    protected msg(text: string): void;
    protected abstract renderErrorPage(header: string, err: any): E;
    protected errorPage(header: string, err: any): void;
    protected beforeStart(): Promise<boolean>;
    protected afterStart(): Promise<void>;
    protected abstract internalStart(param?: any, ...params: any[]): Promise<void>;
    start(param?: any, ...params: any[]): Promise<void>;
    get isCalling(): boolean;
    private _resolve_$;
    call<T>(param?: any, ...params: any[]): Promise<T>;
    vCall<C extends ControllerCore<E>>(vp: new (controller: C) => VPageCore<E, C>, param?: any): Promise<any>;
    returnCall(value: any): void;
    openPage(page: E, onClosePage?: (ret: any) => void): void;
    replacePage(page: E, onClosePage?: () => void): void;
    backPage(): void;
    closePage(level?: number): void;
    ceasePage(level?: number): void;
    go(showPage: () => void, url: string, absolute?: boolean): void;
    removeCeased(): void;
    regConfirmClose(confirmClose: () => Promise<boolean>): void;
    private topPageKey;
    protected startAction(): void;
    get TopKey(): any;
    SetTopKey(key: any): void;
    popToTopPage(): void;
    protected abstract renderConfirm(options: ConfirmOptionsCore<E>): E;
    confirm(options: ConfirmOptionsCore<E>): Promise<'ok' | 'yes' | 'no' | undefined>;
}
export declare abstract class ControllerCore<E> extends ControllerBaseCore<E> {
    protected tonva: Tonva;
    constructor(tonva: Tonva);
}
