interface UQ {
    a: number;
}
interface UQs {
    [uq: string]: UQ;
}
declare class BUq implements UQ {
    a: number;
    c: number;
}
declare const uqs: UQs;
declare function f(): void;
