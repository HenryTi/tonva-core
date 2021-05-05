import { CenterApiBase } from './uqApi';
declare class CenterApi extends CenterApiBase {
    userAppUnits(app: number): Promise<any[]>;
    userFromId(userId: number): Promise<any>;
    userFromKey(userName: string): Promise<any>;
}
export declare const centerApi: CenterApi;
export {};
