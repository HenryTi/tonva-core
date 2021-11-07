import { Uq } from '../uqMan';
export declare class IDCache {
    protected uq: Uq;
    private queue;
    private cache;
    private waitingIds;
    private timeoutHandler;
    constructor(uq: Uq);
    getValue(id: number): object;
    protected TvIdValues(waitingIds: number[]): Promise<any[]>;
    private timeOut;
    private useId;
    private moveToHead;
    remove(id: number): void;
    resetCache(id: number): void;
}
