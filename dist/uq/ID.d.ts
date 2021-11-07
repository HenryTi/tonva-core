import { TFunc } from "../res";
import { Entity } from "./entity";
import { Render, UI } from '../ui';
export interface IDXEntity<M> {
    readonly ui: UI;
    readonly render: Render<M>;
    readonly t: TFunc;
}
export declare class UqID<M extends {
    id: number;
}> extends Entity implements IDXEntity<M> {
    readonly ui: UI;
    readonly render: Render<M>;
    readonly t: TFunc;
    get typeName(): string;
    create: boolean;
    update: boolean;
    owner: boolean;
    NO(): Promise<string>;
    getIdFromObj(value: any): number;
    cacheTuids(defer: number): void;
    loadValuesFromIds(divName: string, ids: number[]): Promise<M[]>;
    cacheTuidFieldValues(value: any): void;
    unpackTuidIds(values: string[]): any[];
}
export declare class ID extends UqID<any> {
}
export declare class UqIDX<M> extends Entity implements IDXEntity<M> {
    readonly ui: UI;
    readonly render: Render<M>;
    readonly t: TFunc;
    get typeName(): string;
}
export declare class IDX extends UqIDX<any> {
}
export declare class UqIX<M> extends Entity implements IDXEntity<M> {
    readonly ui: UI;
    readonly render: Render<M>;
    readonly t: TFunc;
    get typeName(): string;
}
export declare class IX extends UqIX<any> {
}
