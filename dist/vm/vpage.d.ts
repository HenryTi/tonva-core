/// <reference types="react" />
import { ViewCore } from "./view";
import { ControllerCore } from "./controller";
import { Scroller, TabsProps } from "../nav";
export declare abstract class VPageCore<E, C extends ControllerCore<E>> extends ViewCore<E, C> {
    protected retOnClosePage: any;
    open(param?: any, onClosePage?: (ret: any) => void): Promise<void>;
    replaceOpen(param?: any, onClosePage?: (ret: any) => void): Promise<void>;
    render(param?: any): E;
    init(param?: any): void;
    header(): string | boolean | JSX.Element;
    right(): JSX.Element;
    content(): JSX.Element;
    footer(): JSX.Element;
    logout(): boolean | (() => Promise<void>);
    protected abstract renderPage(): E;
    protected onPageScroll(e: any): void;
    protected onPageScrollTop(scroller: Scroller): Promise<boolean>;
    protected onPageScrollBottom(scroller: Scroller): Promise<void>;
    protected afterBack(): void;
    protected get back(): 'close' | 'back' | 'none';
    protected get headerClassName(): string;
    protected get className(): string;
    protected get tabsProps(): TabsProps;
}
