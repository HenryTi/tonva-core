// import {nav, Page, PageHeaderProps, PageWebNav} from '../components';
import { resOptions, t } from '../res';
import { User, env } from '../tool';
import { VPageCore } from './vpage';
import { ViewCore } from './view';
import { Nav } from '../nav';
import { Tonva } from '../Tonva';
import { PageHeaderPropsCore, PageWebNavCore } from '../nav';

export interface ConfirmOptionsCore<E> {
    caption?: string;
    message: string | E;
    classNames?: string;
    ok?: string;
    yes?: string;
    no?: string;
}

export interface WebNavCore<E, C extends ControllerCore<E>> {
	VNavHeader?: new (controller: C) => ViewCore<E, C>;
	VNavRawHeader?: new (controller: C) => ViewCore<E, C>;
	VNavFooter?: new (controller: C) => ViewCore<E, C>;
	VNavRawFooter?: new (controller: C) => ViewCore<E, C>;
	renderPageHeader?: (props: PageHeaderPropsCore<E>) => JSX.Element;
}

export abstract class ControllerBaseCore<E> {
    protected readonly nav: Nav;
    constructor(nav: Nav) {
        this.nav = nav;
    }

	protected res: any = {};
	t = (str: string): string|JSX.Element => this.internalT(str) || str;
    icon: string|JSX.Element;
    label:string|JSX.Element;
	readonly isDev:boolean = env.isDevelopment;
	pageWebNav: PageWebNavCore<E>;
    get user():User {return this.nav.user}
    get isLogined():boolean {
        let {user} = this.nav;
        if (!user) return false;
        return user.id > 0;
    }

	protected beforeInit() {}
	protected afterInit() {}

    internalInit(...param: any[]) {
		this.beforeInit();
        this.init(...param);
		this.pageWebNav = this.getPageWebNav();        
		this.afterInit();
    }

	init(...param: any[]) {
	}

	internalT(str:string):any {
		return this.res?.[str] ?? t(str);
	}

	get webNav(): WebNavCore<E, any> {return undefined;}

	getWebNav(): WebNavCore<E, any> {return this.webNav;}

	getPageWebNav(): PageWebNavCore<E> {return undefined;}

	get isWebNav(): boolean {return this.nav.isWebNav}
	navigate(url:string) {
		this.nav.navigate(url);
	}
	
	setRes(res: any) {
		if (res === undefined) return;
		let {$lang, $district} = resOptions;
		Object.assign(this.res, res);
		if ($lang !== undefined) {
			let l = res[$lang];
			if (l !== undefined) {
				Object.assign(this.res, l);
				let d = l[$district];
				if (d !== undefined) {
					Object.assign(this.res, d);
				}
			}
		}		
	}
	getRes():any {return this.res;}

    protected onDispose() {
	}
	
	isMe(id:any):boolean {
		if (id === null) return false;
		let {user} = this;
		let userId = user.id;
		switch (typeof id) {
			default: return false;
			case 'string': return Number(id) === userId;
			case 'number': return id === userId;
			case 'object': return id.id === userId;
		}
	}

    protected async openVPage<C extends ControllerCore<E>, P extends VPageCore<E, C>>(vp: new (controller: C)=>P, param?:any, afterBack?:(ret:any)=>void):Promise<P> {
		let ret = new vp((this as any) as C);
		await ret.open(param, afterBack);
		return ret;
    }

    protected async replaceVPage<C extends ControllerCore<E>, P extends VPageCore<E, C>>(vp: new (controller: C)=>P, param?:any, afterBack?:(ret:any)=>void):Promise<P> {
		let ret = new vp((this as any) as C);
		await ret.replaceOpen(param, afterBack);
		return ret;
    }

    protected renderView<C extends ControllerCore<E>, V extends ViewCore<E, C>>(view: new (controller: C)=>V, param?:any):E {
		let v = new view((this as any) as C);
		return v.render(param);
    }

    async event(type:string, value:any) {
        await this.onEvent(type, value);
    }

    protected async onEvent(type:string, value:any) {
    }

    protected msg(text:string) {
        alert(text);
    }

    protected abstract renderErrorPage(header:string, err:any):E;

    protected errorPage(header:string, err:any) {
        this.openPage(this.renderErrorPage(header, err));
    }

    protected async beforeStart():Promise<boolean> {
        return true;
	}
	protected async afterStart():Promise<void> {
	}

    protected abstract internalStart(param?:any, ...params:any[]):Promise<void>;
    async start(param?:any, ...params:any[]):Promise<void> {
        let ret = await this.beforeStart();
        if (ret === false) return;
		await this.internalStart(param, ...params);
		await this.afterStart();
    }

    get isCalling():boolean {return this._resolve_$ !== undefined}

    private _resolve_$:((value:any) => void)[];
    async call<T>(param?:any, ...params:any[]):Promise<T> {
        if (this._resolve_$ === undefined) this._resolve_$ = [];
        return new Promise<T> (async (resolve, reject) => {
            this._resolve_$.push(resolve);
            await this.start(param, ...params);
        });
    }

    async vCall<C extends ControllerCore<E>>(vp: new (controller: C)=>VPageCore<E, C>, param?:any):Promise<any> {
        if (this._resolve_$ === undefined) this._resolve_$ = [];
        return new Promise<any> (async (resolve, reject) => {
            this._resolve_$.push(resolve);
            await (new vp(this as any)).open(param);
        });
    }

    returnCall(value:any) {
        if (this._resolve_$ === undefined) return;
        let resolve = this._resolve_$.pop();
        if (resolve === undefined) {
            alert('the Controller call already returned, or not called');
            return;
        }
        resolve(value);
    }

    openPage(page:E, onClosePage?: (ret:any)=>void) {
		let disposer: ()=>void;
		if (onClosePage !== undefined) {
			disposer = () => {
				//if (this.disposer) this.disposer();
				onClosePage(undefined);
			}
		}

        this.nav.push(page, disposer);
        //this.disposer = undefined;
    }

    replacePage(page:E, onClosePage?: ()=>void) {
        this.nav.replace(page, onClosePage);
        //this.disposer = undefined;
    }

    backPage() {
        this.nav.back();
    }

    closePage(level?:number) {
        this.nav.pop(level);
    }

    ceasePage(level?:number) {
        this.nav.ceaseTop(level);
	}
	
	go(showPage:()=>void, url:string, absolute?:boolean) {
		this.nav.go(showPage, url, absolute);
	}

    removeCeased() {
        this.nav.removeCeased();
    }

    regConfirmClose(confirmClose: ()=>Promise<boolean>) {
        this.nav.regConfirmClose(confirmClose);
	}

	private topPageKey:any;
	protected startAction() {
		this.topPageKey = this.nav.topKey();
    }
    get TopKey() {
        return this.topPageKey;
    }
    SetTopKey(key:any) {
        this.topPageKey = key;
    }
	public popToTopPage() {
		this.nav.popTo(this.topPageKey);
	}

    protected abstract renderConfirm(options: ConfirmOptionsCore<E>):E;
    /*{
        let {caption, message, ok, yes, no, classNames} = options;
        let buttons:any[] = [];
        if (ok !== undefined) {
            buttons.push(<button key="ok" className="btn btn-primary me-3" onClick={()=>close('ok')}>{ok}</button>);
        }
        if (yes !== undefined) {
            buttons.push(<button key="yes" className="btn btn-success me-3" onClick={()=>close('yes')}>{yes}</button>);
        }
        if (no !== undefined) {
            buttons.push(<button key="no" className="btn btn-outline-danger me-3" onClick={()=>close('no')}>{no}</button>);
        }
        return <Page header={caption || '请确认'} back="close">
            <div className={classNames || "rounded bg-white m-5 p-3 border"}>
                <div className="d-flex align-items-center justify-content-center">
                    {message}
                </div>
                <div className="mt-3 d-flex align-items-center justify-content-center">
                    {buttons}
                </div>
            </div>
        </Page>);
    }*/

    async confirm(options: ConfirmOptionsCore<E>): Promise<'ok'|'yes'|'no'|undefined> {
        return new Promise<'ok'|'yes'|'no'|undefined> (async (resolve, reject) => {
            let {caption, message, ok, yes, no, classNames} = options;
            let close = (res:'ok'|'yes'|'no'|undefined) => {
                this.closePage();
                resolve(res);
            }
            let buttons:any[] = [];
            if (ok !== undefined) {
                buttons.push(<button key="ok" className="btn btn-primary me-3" onClick={()=>close('ok')}>{ok}</button>);
            }
            if (yes !== undefined) {
                buttons.push(<button key="yes" className="btn btn-success me-3" onClick={()=>close('yes')}>{yes}</button>);
            }
            if (no !== undefined) {
                buttons.push(<button key="no" className="btn btn-outline-danger me-3" onClick={()=>close('no')}>{no}</button>);
            }
            this.openPage(this.renderConfirm(options));
            this.nav.regConfirmClose(async ():Promise<boolean> => {
                resolve(undefined);
                return true;
            });
        });
    }
}

export abstract class ControllerCore<E> extends ControllerBaseCore<E> {
    protected tonva: Tonva;
    constructor(tonva: Tonva) {
        super(tonva.nav);
    }
}
