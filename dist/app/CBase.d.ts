import { ControllerCore, WebNavCore } from "../vm";
import { CAppBase, IConstructor } from "./CAppBase";
export declare abstract class CBase<E, A extends CAppBase<E, U>, U> extends ControllerCore<E> {
    protected readonly _uqs: U;
    protected readonly _cApp: A;
    constructor(cApp: any);
    start(param?: any, ...params: any[]): Promise<void>;
    get uqs(): U;
    get cApp(): A;
    get timezone(): number;
    get unitTimezone(): number;
    getUqRoles(uqName: string): Promise<string[]>;
    internalT(str: string): any;
    protected newC<T extends CBase<E, A, U>>(type: IConstructor<T>, ...param: any[]): T;
    newSub<O extends CBase<E, A, U>, T extends CSub<E, A, U, O>>(type: IConstructor<T>, ...param: any[]): T;
    getWebNav(): WebNavCore<E, any>;
    private receiveHandlerId;
    protected registerReceiveHandler(): void;
    protected dispose: () => void;
    protected onMessage(message: any): Promise<void>;
    private onMessageReceive;
}
export declare abstract class CSub<E, A extends CAppBase<E, U>, U, T extends CBase<E, A, U>> extends CBase<E, A, U> {
    protected _owner: T;
    constructor(owner: T);
    internalT(str: string): any;
    protected get owner(): T;
    getWebNav(): WebNavCore<E, any>;
}
