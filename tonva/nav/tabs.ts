export type TabCaption = (selected:boolean) => JSX.Element;

export interface TabProp {
    name: string;
    caption: TabCaption;
	content?: () => JSX.Element;
	page?: any; //IVPage;
    notify?: number;
    load?: () => Promise<void>;
	onShown?: () => Promise<void>;
	isSelected?: boolean;
	onScroll?: () => void;
	onScrollTop?: () => Promise<boolean>;
	onScrollBottom?: () => Promise<void>;
	className?: string;
}

export interface TabsProps {
    tabs: TabProp[];
    tabPosition?: 'top' | 'bottom';
    size?: 'sm' | 'lg' | 'md';
    tabBg?: string;
    contentBg?: string;
    sep?: string;
    selected?: string;
    borderColor?: string;
    borderWidth?: string;
}
