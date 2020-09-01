/// <reference types="react" />
import { User } from '../tool';
import { VPage } from './vpage';
import { View } from './view';
export interface ConfirmOptions {
    caption?: string;
    message: string | JSX.Element;
    classNames?: string;
    ok?: string;
    yes?: string;
    no?: string;
}
export declare abstract class Controller {
    readonly res: any;
    readonly x: any;
    private _t;
    readonly t: (str: string) => any;
    icon: string | JSX.Element;
    label: string;
    readonly isDev: boolean;
    get user(): User;
    get isLogined(): boolean;
    constructor(res: any);
    init(...param: any[]): void;
    internalT(str: string): any;
    protected setRes(res: any): void;
    private receiveHandlerId;
    protected dispose: () => void;
    protected onDispose(): void;
    get isRouting(): boolean;
    isMe(id: any): boolean;
    protected openVPage<C extends Controller>(vp: new (controller: C) => VPage<C>, param?: any, afterBack?: (ret: any) => void): Promise<void>;
    protected renderView<C extends Controller>(view: new (controller: C) => View<C>, param?: any): JSX.Element;
    event(type: string, value: any): Promise<void>;
    protected onEvent(type: string, value: any): Promise<void>;
    protected msg(text: string): void;
    protected errorPage(header: string, err: any): void;
    protected onMessage(message: any): Promise<void>;
    private onMessageReceive;
    protected beforeStart(): Promise<boolean>;
    protected afterStart(): Promise<void>;
    protected registerReceiveHandler(): void;
    protected abstract internalStart(param?: any, ...params: any[]): Promise<void>;
    start(param?: any, ...params: any[]): Promise<void>;
    get isCalling(): boolean;
    private _resolve_$;
    call<T>(param?: any, ...params: any[]): Promise<T>;
    vCall<C extends Controller>(vp: new (controller: C) => VPage<C>, param?: any): Promise<any>;
    returnCall(value: any): void;
    openPage(page: JSX.Element, onClosePage?: (ret: any) => void): void;
    replacePage(page: JSX.Element, onClosePage?: () => void): void;
    backPage(): void;
    closePage(level?: number): void;
    ceasePage(level?: number): void;
    go(showPage: () => void, url: string, absolute?: boolean): void;
    removeCeased(): void;
    regConfirmClose(confirmClose: () => Promise<boolean>): void;
    private topPageKey;
    protected startAction(): void;
    popToTopPage(): void;
    confirm(options: ConfirmOptions): Promise<'ok' | 'yes' | 'no' | undefined>;
}
