import { KeyValueRes, Res } from './res';
export interface InputRes extends KeyValueRes {
    required: string;
    number: string;
    integer: string;
    min: string;
    max: string;
}
export declare const inputRes: Res<InputRes>;
