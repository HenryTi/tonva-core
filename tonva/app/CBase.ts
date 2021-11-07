import _ from 'lodash';
import { ControllerCore, WebNavCore } from "../vm";
import { CAppBase, IConstructor } from "./CAppBase";

export abstract class CBase<E, A extends CAppBase<E, U>, U> extends ControllerCore<E> {
    protected readonly _uqs: U;
    protected readonly _cApp: A;

    constructor(cApp: any) {
        super(cApp.tonva);
		// this.tonva = cApp.tonva;
        this._cApp = cApp;
        this._uqs = cApp?.uqs;
		this.registerReceiveHandler();
	}
	async start(param?:any, ...params:any[]):Promise<void> {
	}

    get uqs(): U {return this._uqs}
	get cApp(): A {return this._cApp}
	get timezone():number {return this._cApp.timezone;}
	get unitTimezone():number {return this._cApp.unitTimezone;}
	async getUqRoles(uqName:string):Promise<string[]> {
		return this._cApp?.getUqRoles(uqName);
	}

	internalT(str:string):any {
		let r = super.internalT(str);
		if (r!==undefined) return r;
		return this._cApp.internalT(str);
	}

    protected newC<T extends CBase<E, A,U>>(type: IConstructor<T>, ...param:any[]):T {
		let c = new type(this.cApp);
		c.internalInit(...param);
		return c;
    }

    newSub<O extends CBase<E, A,U>, T extends CSub<E, A,U,O>>(type: IConstructor<T>, ...param:any[]):T {
		let s = new type(this);
		s.internalInit(...param);
		return s;
	}
	
	getWebNav(): WebNavCore<E, any> {
		let wn = this._cApp?.getWebNav();
		if (wn === undefined) return;
		let ret = _.clone(wn);
		_.merge(ret, this.webNav);
		return ret;
	}

    private receiveHandlerId:number;
	protected registerReceiveHandler() {
        this.receiveHandlerId = this.tonva.web.messageHub.registerReceiveHandler(this.onMessageReceive);
    }

	protected dispose = () => {
        // message listener的清理
		//nav.unregisterReceiveHandler(this.receiveHandlerId);
		this.tonva.web.messageHub.unregisterReceiveHandler(this.receiveHandlerId);
        this.onDispose();
    }

	protected onMessage(message:any):Promise<void> {
        return;
    }

    private onMessageReceive = async (message:any):Promise<void> => {
        await this.onMessage(message);
    }
}

export abstract class CSub<E, A extends CAppBase<E, U>, U, T extends CBase<E, A, U>> extends CBase<E, A,U> {
    protected _owner: T;

    constructor(owner: T) {
        super(owner.cApp);
        this._owner = owner;
	}

	internalT(str:string):any {
		let r = super.internalT(str);
		if (r!==undefined) return r;
		return this._owner.internalT(str);
	}

    protected get owner(): T {return this._owner}
	
	getWebNav(): WebNavCore<E, any> {
		let wn = this._cApp?.getWebNav();
		if (wn === undefined) return;
		let ownerWNs:WebNavCore<E, any>[] = [];
		for (let p = this.owner; p!==undefined; p = (p as any)?.owner) {
			ownerWNs.push(p.webNav);
		}
		let ret = _.clone(wn);
		for (;;) {
			let own = ownerWNs.pop();
			if (own === undefined) break;
			_.merge(ret, own);
		}
		_.merge(ret, this.webNav);
		return ret;
	}
}
