/// <reference types="react" />
import { Tuid, TuidDiv, TuidBox } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { Map } from './map';
import { Pending } from './pending';
import { CreateBoxId } from './tuid';
import { LocalMap, LocalCache } from '../tool';
import { UQsMan } from './uqsMan';
import { UqEnum } from './enum';
import { UqConfig } from '../app';
import { ID, IX, IDX } from './ID';
import { Web, UqData, UqApi } from '../web';
export declare type FieldType = 'id' | 'tinyint' | 'smallint' | 'int' | 'bigint' | 'dec' | 'float' | 'double' | 'char' | 'text' | 'datetime' | 'date' | 'time' | 'timestamp';
export declare function fieldDefaultValue(type: FieldType): 0 | "" | "2000-1-1" | "0:00";
export interface Field {
    name: string;
    type: FieldType;
    tuid?: string;
    arr?: string;
    null?: boolean;
    size?: number;
    owner?: string;
    _tuid?: TuidBox;
}
export interface ArrFields {
    name: string;
    fields: Field[];
    id?: string;
    order?: string;
}
export interface FieldMap {
    [name: string]: Field;
}
export interface SchemaFrom {
    owner: string;
    uq: string;
}
export interface TuidModify {
    max: number;
    seconds: number;
}
interface ParamPage {
    start: number;
    end?: number;
    size: number;
}
export interface ParamActIX<T> {
    IX: IX;
    ID?: ID;
    IXs?: {
        IX: IX;
        ix: number;
    }[];
    values: {
        ix: number;
        xi: number | T;
    }[];
}
export interface ParamActIXSort {
    IX: IX;
    ix: number;
    id: number;
    after: number;
}
export interface ParamActDetail<M, D> {
    main: {
        ID: ID;
        value: M;
    };
    detail: {
        ID: ID;
        values: D[];
    };
}
export interface RetActDetail {
    main: number;
    detail: number[];
}
export interface ParamActDetail2<M, D, D2> extends ParamActDetail<M, D> {
    detail2: {
        ID: ID;
        values: D2[];
    };
}
export interface RetActDetail2 extends RetActDetail {
    detail2: number[];
}
export interface ParamActDetail3<M, D, D2, D3> extends ParamActDetail2<M, D, D2> {
    detail3: {
        ID: ID;
        values: D3[];
    };
}
export interface RetActDetail3 extends RetActDetail2 {
    detail3: number[];
}
export interface ParamQueryID {
    ID?: ID;
    IX?: (IX | string)[];
    IDX?: (ID | IDX)[];
    id?: number | number[];
    key?: {
        [key: string]: string | number;
    };
    ix?: number;
    idx?: number | number[];
    keyx?: {
        [key: string]: string | number;
    };
    page?: ParamPage;
    order?: 'desc' | 'asc';
}
export interface ParamIDNO {
    ID: ID;
}
export interface ParamIDDetailGet {
    id: number;
    main: ID;
    detail: ID;
    detail2?: ID;
    detail3?: ID;
}
export interface ParamID {
    IDX: (ID | IDX) | (ID | IDX)[];
    id: number | number[];
    order?: 'asc' | 'desc';
    page?: ParamPage;
}
export interface ParamKeyID {
    ID: ID;
    IDX?: (ID | IDX)[];
    IX?: IX[];
    key: {
        [key: string]: string | number;
    };
    ix?: number;
    page?: ParamPage;
}
export interface ParamIX {
    IX: IX;
    IX1?: IX;
    ix: number | number[];
    IDX?: (ID | IDX)[];
    page?: ParamPage;
}
export interface ParamKeyIX {
    ID: ID;
    key: {
        [key: string]: string | number;
    };
    IX: IX;
    IDX?: (ID | IDX)[];
    page?: ParamPage;
}
export interface ParamIDLog {
    IDX: (ID | IDX);
    field: string;
    id: number;
    log: 'each' | 'day' | 'week' | 'month' | 'year';
    timeZone?: number;
    far?: number;
    near?: number;
    page: ParamPage;
}
export interface ParamIDSum {
    IDX: IDX;
    field: string[];
    id: number | number[];
    far?: number;
    near?: number;
}
export interface ParamIDxID {
    ID: ID;
    IX: IX;
    ID2: ID;
    page?: ParamPage;
}
export interface IDXValue {
    value: number;
    time?: number | Date;
    setAdd: '=' | '+';
}
export interface ParamIDinIX {
    ID: ID;
    id: number;
    IX: IX;
    page?: ParamPage;
}
export interface ParamIDTree {
    ID: ID;
    parent: number;
    key: string | number;
    level?: number;
    page?: ParamPage;
}
export interface Uq {
    getAdmins(): Promise<{
        id: number;
        role: number;
    }[]>;
    $: UqMan;
    Acts(param: any): Promise<any>;
    $Acts(param: any): Promise<string>;
    ActIX<T>(param: ParamActIX<T>): Promise<number[]>;
    $ActIX<T>(param: ParamActIX<T>): Promise<string>;
    ActIXSort(param: ParamActIXSort): Promise<void>;
    $ActIXSort(param: ParamActIXSort): Promise<string>;
    ActDetail<M, D>(param: ParamActDetail<M, D>): Promise<RetActDetail>;
    $ActDetail<M, D>(param: ParamActDetail<M, D>): Promise<string>;
    ActDetail<M, D, D2>(param: ParamActDetail2<M, D, D2>): Promise<RetActDetail2>;
    $ActDetail<M, D, D2>(param: ParamActDetail2<M, D, D2>): Promise<string>;
    ActDetail<M, D, D2, D3>(param: ParamActDetail3<M, D, D2, D3>): Promise<RetActDetail3>;
    $ActDetail<M, D, D2, D3>(param: ParamActDetail3<M, D, D2, D3>): Promise<string>;
    QueryID<T>(param: ParamQueryID): Promise<T[]>;
    $QueryID<T>(param: ParamQueryID): Promise<string>;
    IDNO(param: ParamIDNO): Promise<string>;
    $IDNO(param: ParamIDNO): Promise<string>;
    IDDetailGet<M, D>(param: ParamIDDetailGet): Promise<[M[], D[]]>;
    $IDDetailGet<M, D>(param: ParamIDDetailGet): Promise<string>;
    IDDetailGet<M, D, D2>(param: ParamIDDetailGet): Promise<[M[], D[], D2[]]>;
    $IDDetailGet<M, D, D2>(param: ParamIDDetailGet): Promise<string>;
    IDDetailGet<M, D, D2, D3>(param: ParamIDDetailGet): Promise<[M[], D[], D2[], D3[]]>;
    $IDDetailGet<M, D, D2, D3>(param: ParamIDDetailGet): Promise<string>;
    ID<T>(param: ParamID): Promise<T[]>;
    $ID<T>(param: ParamID): Promise<string>;
    KeyID<T>(param: ParamKeyID): Promise<T[]>;
    $KeyID<T>(param: ParamKeyID): Promise<string>;
    IX<T>(param: ParamIX): Promise<T[]>;
    $IX<T>(param: ParamIX): Promise<string>;
    IXr<T>(param: ParamIX): Promise<T[]>;
    $IXr<T>(param: ParamIX): Promise<string>;
    KeyIX<T>(param: ParamKeyIX): Promise<T[]>;
    $KeyIX<T>(param: ParamKeyIX): Promise<string>;
    IDLog<T>(param: ParamIDLog): Promise<T[]>;
    $IDLog<T>(param: ParamIDLog): Promise<string>;
    IDSum<T>(param: ParamIDSum): Promise<T[]>;
    $IDSum<T>(param: ParamIDSum): Promise<string>;
    IDxID<T, T2>(param: ParamIDxID): Promise<[T[], T2[]]>;
    $IDxID<T, T2>(param: ParamIDxID): Promise<string>;
    IDinIX<T>(param: ParamIDinIX): Promise<T & {
        $in: boolean;
    }[]>;
    $IDinIX<T>(param: ParamIDinIX): Promise<string>;
    IDTree<T>(param: ParamIDTree): Promise<T[]>;
    $IDTree<T>(param: ParamIDTree): Promise<string>;
    IDTv(ids: number[]): Promise<any[]>;
    IDRender(id: number, render?: (value: any) => JSX.Element): JSX.Element;
    IDV<T>(id: number): T;
    IDLocalTv(ids: number[]): Promise<any[]>;
    IDLocalRender(id: number, render?: (value: any) => JSX.Element): JSX.Element;
    IDLocalV<T>(id: number): T;
}
export declare class UqMan {
    private readonly entities;
    private readonly enums;
    private readonly actions;
    private readonly queries;
    private readonly ids;
    private readonly idxs;
    private readonly ixs;
    private readonly sheets;
    private readonly books;
    private readonly maps;
    private readonly histories;
    private readonly pendings;
    private readonly tuidsCache;
    private readonly localEntities;
    private readonly tvs;
    private idCache;
    proxy: any;
    readonly localMap: LocalMap;
    readonly localModifyMax: LocalCache;
    readonly tuids: {
        [name: string]: Tuid;
    };
    readonly createBoxId: CreateBoxId;
    readonly newVersion: boolean;
    readonly uqOwner: string;
    readonly uqName: string;
    readonly name: string;
    readonly uqApi: UqApi;
    readonly id: number;
    uqVersion: number;
    config: UqConfig;
    protected web: Web;
    constructor(uqs: UQsMan, uqData: UqData, createBoxId: CreateBoxId, tvs: {
        [entity: string]: (values: any) => JSX.Element;
    });
    getID(name: string): ID;
    getIDX(name: string): IDX;
    getIX(name: string): IX;
    private createBoxIdFromTVs;
    private roles;
    getRoles(): Promise<string[]>;
    tuid(name: string): Tuid;
    tuidDiv(name: string, div: string): TuidDiv;
    action(name: string): Action;
    sheet(name: string): Sheet;
    query(name: string): Query;
    book(name: string): Book;
    map(name: string): Map;
    history(name: string): History;
    pending(name: string): Pending;
    sheetFromTypeId(typeId: number): Sheet;
    allRoles: string[];
    readonly tuidArr: Tuid[];
    readonly actionArr: Action[];
    readonly queryArr: Query[];
    readonly idArr: ID[];
    readonly idxArr: IDX[];
    readonly ixArr: IX[];
    readonly enumArr: UqEnum[];
    readonly sheetArr: Sheet[];
    readonly bookArr: Book[];
    readonly mapArr: Map[];
    readonly historyArr: History[];
    readonly pendingArr: Pending[];
    init(): Promise<void>;
    loadEntities(): Promise<string>;
    buildEntities(entities: any): void;
    private buildTuids;
    loadEntitySchema(entityName: string): Promise<any>;
    loadAllSchemas(): Promise<void>;
    getTuid(name: string): Tuid;
    private buildAccess;
    cacheTuids(defer: number): void;
    private setEntity;
    newEnum(name: string, id: number): UqEnum;
    newAction(name: string, id: number): Action;
    private newTuid;
    newQuery(name: string, id: number): Query;
    private newBook;
    private newMap;
    private newHistory;
    private newPending;
    private newSheet;
    private newID;
    private newIDX;
    private newIX;
    private fromType;
    private fromObj;
    private buildSheet;
    buildFieldTuid(fields: Field[], mainFields?: Field[]): void;
    buildArrFieldsTuid(arrFields: ArrFields[], mainFields: Field[]): void;
    pullModify(modifyMax: number): void;
    getUqKey(): string;
    getUqKeyWithConfig(): string;
    hasEntity(name: string): boolean;
    createProxy(): any;
    private showReload;
    private apiPost;
    private apiActs;
    protected Acts: (param: any) => Promise<any>;
    protected getAdmins: () => Promise<{
        id: number;
        role: number;
    }[]>;
    protected $Acts: (param: any) => Promise<any>;
    private apiActIX;
    protected ActIX: (param: ParamActIX<any>) => Promise<number[]>;
    protected $ActIX: (param: ParamActIX<any>) => Promise<string>;
    private apiActIxSort;
    protected ActIXSort: (param: ParamActIXSort) => Promise<void>;
    protected $ActIXSort: (param: ParamActIXSort) => Promise<string>;
    private apiActDetail;
    protected ActDetail: (param: ParamActDetail<any, any>) => Promise<any>;
    protected $ActDetail: (param: ParamActDetail<any, any>) => Promise<any>;
    private apiQueryID;
    protected QueryID: (param: ParamQueryID) => Promise<any[]>;
    protected $QueryID: (param: ParamQueryID) => Promise<any[]>;
    private apiIDTv;
    protected IDTv: (ids: number[]) => Promise<any[]>;
    protected $IDTv: (ids: number[]) => Promise<any>;
    private apiIDNO;
    protected IDNO: (param: ParamIDNO) => Promise<string>;
    protected $IDNO: (param: ParamIDNO) => Promise<string>;
    private apiIDDetailGet;
    protected IDDetailGet: (param: ParamIDDetailGet) => Promise<any>;
    protected $IDDetailGet: (param: ParamIDDetailGet) => Promise<any>;
    private IDXToString;
    private apiID;
    protected ID: (param: ParamID) => Promise<any[]>;
    protected $ID: (param: ParamID) => Promise<string>;
    private apiKeyID;
    protected KeyID: (param: ParamKeyID) => Promise<any[]>;
    protected $KeyID: (param: ParamKeyID) => Promise<string>;
    private apiIX;
    protected IX: (param: ParamIX) => Promise<any[]>;
    protected $IX: (param: ParamIX) => Promise<string>;
    private apiIXr;
    protected IXr: (param: ParamIX) => Promise<any[]>;
    protected $IXr: (param: ParamIX) => Promise<any[]>;
    private apiKeyIX;
    protected KeyIX: (param: ParamKeyIX) => Promise<any[]>;
    protected $KeyIX: (param: ParamKeyIX) => Promise<any[]>;
    private apiIDLog;
    protected IDLog: (param: ParamIDLog) => Promise<any[]>;
    protected $IDLog: (param: ParamIDLog) => Promise<string>;
    private apiIDSum;
    protected IDSum: (param: ParamIDSum) => Promise<any[]>;
    protected $IDSum: (param: ParamIDSum) => Promise<string>;
    private apiIDinIX;
    protected IDinIX: (param: ParamIDinIX) => Promise<any | {
        $in: boolean;
    }[]>;
    protected $IDinIX: (param: ParamIDinIX) => Promise<string>;
    private apiIDxID;
    protected IDxID: (param: ParamIDxID) => Promise<any[]>;
    protected $IDxID: (param: ParamIDxID) => Promise<string>;
    private apiIDTree;
    protected IDTree: (param: ParamIDTree) => Promise<any[]>;
    protected $IDTree: (param: ParamIDTree) => Promise<string>;
    protected IDRender: (id: number, render?: (value: any) => JSX.Element) => JSX.Element;
    protected IDV: <T extends object>(id: number) => T;
    private renderIDUnknownType;
    IDLocalTv(ids: number[]): Promise<any[]>;
    protected IDLocalV: <T extends object>(id: number) => T;
    protected IDLocalRender: (id: number, render?: (value: any) => JSX.Element) => JSX.Element;
}
export {};
