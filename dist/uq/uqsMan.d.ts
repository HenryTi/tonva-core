/// <reference types="react" />
import { LocalMap, LocalCache } from '../tool';
import { UqMan } from './uqMan';
import { UqConfig } from '../app';
import { Web, UqData } from '../web';
export interface TVs {
    [uqName: string]: {
        [tuidName: string]: (values: any) => JSX.Element;
    };
}
export declare class UQsMan {
    private uqMans;
    private collection;
    private readonly tvs;
    readonly web: Web;
    constructor(web: Web, tvs: TVs);
    buildUqs(uqDataArr: UqData[], version: string, uqConfigs?: UqConfig[]): Promise<string[]>;
    uq(uqName: string): UqMan;
    getUqUserRoles(uqLower: string): Promise<string[]>;
    private buildTVs;
    init(uqsData: UqData[]): Promise<void>;
    load(): Promise<string[]>;
    buildUQs(): any;
    getUqMans(): UqMan[];
    private showReload;
    setTuidImportsLocal(): string[];
    private setInner;
}
export declare class UQsManApp extends UQsMan {
    readonly appOwner: string;
    readonly appName: string;
    readonly localMap: LocalMap;
    readonly localData: LocalCache;
    id: number;
    constructor(web: Web, tonvaAppName: string, tvs: TVs);
}
