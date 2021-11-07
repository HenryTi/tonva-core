/// <reference types="react" />
import { FieldItem } from "./fieldItem";
export declare type Render<T> = (item: T) => JSX.Element;
export interface UI {
    label: string | JSX.Element;
    fieldArr: FieldItem[];
    fields: {
        [name: string]: FieldItem;
    };
}
