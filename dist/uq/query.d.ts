import { IObservableArray } from 'mobx';
import { PageItems } from '../tool';
import { ArrFields } from './uqMan';
import { Entity } from './entity';
import { QueryQueryCaller, QueryPageCaller } from './caller';
import { Tonva } from '../Tonva';
export declare type QueryPageApi = (name: string, pageStart: any, pageSize: number, params: any) => Promise<string>;
export declare class QueryPager<T extends any> extends PageItems<T> {
    private query;
    private $page;
    protected idFieldName: any;
    constructor(tonva: Tonva, query: Query, pageSize?: number, firstSize?: number, itemObservable?: boolean);
    setReverse(): void;
    protected onLoad(): Promise<void>;
    protected loadResults(param: any, pageStart: number, pageSize: number, $$user?: number): Promise<{
        [name: string]: any[];
    }>;
    protected getPageId(item: T): any;
    refreshItems(item: T): Promise<void>;
}
export declare class UqQuery<P, R> extends Entity {
    get typeName(): string;
    private pageStart;
    private pageSize;
    private params;
    private more;
    private startField;
    list: IObservableArray;
    returns: ArrFields[];
    isPaged: boolean;
    setSchema(schema: any): void;
    resetPage(size: number, params: any): void;
    get hasMore(): boolean;
    loadPage(): Promise<void>;
    protected pageCaller(params: any, $$user?: number, showWaiting?: boolean): QueryPageCaller;
    page(params: P, pageStart: any, pageSize: number, $$user?: number, showWaiting?: boolean): Promise<R>;
    protected queryCaller(params: P, $$user?: number, showWaiting?: boolean): QueryQueryCaller;
    query(params: P, $$user?: number, showWaiting?: boolean): Promise<R>;
    table(params: P, $$user?: number, showWaiting?: boolean): Promise<any[]>;
    obj(params: P, $$user?: number, showWaiting?: boolean): Promise<any>;
    scalar(params: P, $$user?: number, showWaiting?: boolean): Promise<any>;
}
export declare class Query extends UqQuery<any, any> {
}
