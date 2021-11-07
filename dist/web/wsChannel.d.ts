import { Web } from "./Web";
export declare function setSubAppWindow(win: Window): void;
export declare function postWsToTop(msg: any): void;
export declare abstract class WsBase {
    protected web: Web;
    constructor(web: Web);
    receive(msg: any): Promise<void>;
}
export declare class WsBridge extends WsBase {
    wsBaseId: string;
}
export declare class WSChannel extends WsBase {
    wsBaseId: string;
    static centerToken: string;
    private wsHost;
    private token;
    private ws;
    constructor(web: Web, wsHost: string, token: string);
    static setCenterToken(token?: string): void;
    connect(): Promise<void>;
    close(): void;
    private wsMessage;
    sendWs(msg: any): void;
}
