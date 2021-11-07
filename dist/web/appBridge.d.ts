import { Web } from './Web';
export interface UqToken {
    name: string;
    db: string;
    url: string;
    token: string;
}
export declare class AppBridge {
    private readonly web;
    private readonly uqTokens;
    constructor(web: Web);
    addMessageListener(): void;
    logoutUqTokens(): void;
    isBridged(): boolean;
    private subFrameStarted;
    hideFrameBack(hash: string): void;
    initSubWin(message: any): Promise<void>;
    private onReceiveAppApiMessage;
    private onAppApiReturn;
    private readonly uqTokenActions;
    buildAppUq(uq: string, uqOwner: string, uqName: string): Promise<void>;
    getUqToken(uq: string): UqToken;
    private readonly brideCenterApis;
    bridgeCenterApi(url: string, method: string, body: any): Promise<any>;
    callCenterApiFromMessage(from: Window, message: any): Promise<void>;
    bridgeCenterApiReturn(message: any): void;
}
