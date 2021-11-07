import { Web } from "./Web";
export declare class MessageHub {
    web: Web;
    constructor(web: Web);
    private handlerSeed;
    private anyHandlers;
    private msgHandlers;
    registerReceiveHandler(handler: (msg: any) => Promise<void>): number;
    registerReceiveHandler(type: string, handler: (msg: any) => Promise<void>): number;
    unregisterReceiveHandler(handlerId: number): void;
    dispatch(msg: any): Promise<void>;
}
