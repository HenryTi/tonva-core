import { Web } from './Web';
import { FetchError } from './fetchError';
export interface HttpChannelUI {
    startWait(): void;
    endWait(): void;
    showError(error: FetchError): Promise<void>;
    showUpgradeUq(uq: string, version: number): Promise<void>;
}
export declare class HttpChannelNavUI implements HttpChannelUI {
    protected readonly web: Web;
    constructor(web: Web);
    startWait(): void;
    endWait(): void;
    showError(error: FetchError): Promise<void>;
    showUpgradeUq(uq: string, version: number): Promise<void>;
}
