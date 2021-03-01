import '../css/va-form.css';
import { Controller } from '../vm';
export interface Values {
    user: string;
    pwd: string;
    rePwd: string;
    country?: string;
    mobile?: string;
    email?: string;
}
export declare class RegisterController extends Controller {
    account: string;
    type: 'mobile' | 'email';
    password: string;
    verify: string;
    accountPageCaption: string;
    accountLabel: string;
    accountSubmitCaption: string;
    passwordPageCaption: string;
    passwordSubmitCaption: string;
    successText: string;
    protected internalStart(): Promise<void>;
    toVerify(account: string): void;
    toPassword(): void;
    toSuccess(accounts?: any[]): void;
    login: (account?: string) => Promise<void>;
    private regReturn;
    checkAccount(): Promise<string>;
    protected accountError(isExists: number): string;
    execute(): Promise<string>;
}
export declare class ForgetController extends RegisterController {
    accountPageCaption: string;
    accountLabel: string;
    accountSubmitCaption: string;
    passwordPageCaption: string;
    passwordSubmitCaption: string;
    successText: string;
    execute(): Promise<any>;
    protected accountError(isExists: number): string;
}
